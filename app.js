const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const adminRouter = require('./routes/admin');
const { db, connectToDatabase } = require('./dbconnection');
// const https = require('https');
// const fs = require('fs');

connectToDatabase();

// allow the public folder to be read
app.use(express.static("public"))

// serve static files from the 'admin' directory
app.use('/admin', express.static("admin_public"));

// allows json requests to be read
app.use(express.json());

// used to read requests
app.use(express.urlencoded({ extended: true }))

// setup express-session in order to see if a user has logged in before
app.use(session({
	secret: 'Secret40123',
	resave: false,
	saveUninitialized: true
}));

// use ejs
app.set('view engine', 'ejs');

// deal with /admin routes in the admin.js route file
app.use('/admin', adminRouter);

// serve the index page
app.get('/', (req, res) => {

	// run a query to get all of the products
	const sql = 'SELECT * FROM product';
	db.query(sql, (err, result) => {
		if (err) throw err;

		// bind that product info to the page and render it
		res.render('index', { items: result });
	});
})

// serve the shop page
app.get('/shop', (req, res) => {

	// get the selected brand from the url
	let selectedBrand = req.query.brand;

	// get the selected filter from the url
	let filter = req.query.filter;

	// get all the products and display them
	let sql = 'SELECT * FROM product';

	// if the customer chooses a brand with the radio buttons or uses the category on the front page filter the results instead
	if (selectedBrand) {
		sql += ` WHERE manufacturer = ?`;
	}
	else {
		selectedBrand = null;
	}

	// if the customer chooses a filter, filter the results based on low to high or reverse
	if (filter == "lowhigh") {
		sql += ` ORDER BY price`;
	}
	else if (filter == "highlow") {
		sql += ` ORDER BY price DESC`;
	}

	db.query(sql, selectedBrand, (err, result1) => {

		if (err) throw err;

		// this second query gets number of each product by brand so I can display it by the radio buttons
		const sql2 = 'SELECT manufacturer, COUNT(*) as count FROM product GROUP BY manufacturer ORDER BY manufacturer;'

		db.query(sql2, (err, result2) => {

			if (err) throw err;

			// render the page and bind all of the info to the page
			res.render('shop', { items: result1, brands: result2 });
		});
	});
})

// the endpoint that generates individual product pages
app.get('/product/:product_id', (req, res) => {

	// pull the product id from the url
	const id = req.params.product_id;

	// this first query gets the basic info of the product
	const sql1 = `SELECT * FROM product WHERE product.product_id = ? `;

	db.query(sql1, id, (err, result1) => {

		if (err) throw err;

		// this second query gets the features of the product through the feature id
		const sql2 = `SELECT * FROM feature WHERE feature.feature_id = ? `;

		db.query(sql2, result1[0].feature_id, (err, result2) => {

			if (err) throw err;

			// render the page and bind all of the info to the page
			res.render('single-product', { product: result1, feature: result2 });
			console.log(result1)
		});
	});
});

// the endpoint for registering customers
app.post("/register", (req, res) => {
	// get the form inputs from the frontend
	let address = req.body.address;
	let city = req.body.city;
	let email = req.body.email;
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let password = req.body.password;
	let phone = req.body.phone;
	let postcode = req.body.postcode;
	let state = req.body.state;

	// hash the password with bcrypt so that it is secure in the database
	bcrypt.hash(password, 8, (err, hash) => {

		if (err) {
			console.log(`an error occured ${err}`);
			// tell the client if the registration was successful or not
			res.json({ success: false });
		}

		// execute the sql with a parameterized query
		let sql = `INSERT INTO customer (cust_address, city, cust_email, firstname, lastname, cust_password, cust_phone, postcode, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

		db.query(sql, [address, city, email, firstname, lastname, hash, phone, postcode, state], (err, result) => {

			if (err) {
				console.log(`an error occured ${err}`);
				// tell the client if the registration was successful or not
				res.json({ success: false });
			}
			else {
				console.log(`account ${firstname} successfully created `);
				// tell the client if the registration was successful or not
				res.json({ success: true });
			}
		});
	});
});

// the endpoint for logging in customers
app.post("/userlogin", (req, res) => {

	// get the form inputs from the frontend
	let email = req.body.email;
	let password = req.body.password;

	// search for the user by their email using a parameterized query
	let sql = `SELECT * FROM customer WHERE cust_email = ?`;

	db.query(sql, [email], (err, result) => {

		if (err) throw err;

		// if there is a row the user is in the database
		if (result.length > 0) {

			// get that user
			let user = result[0];

			// compare the login password with the hashed customer password
			bcrypt.compare(password, user.cust_password, (err, match) => {

				if (err) throw err;

				if (match) {
					console.log(`${user.firstname} successfully logged in`);

					// when the user logs in save their id to the session so we remember that they have logged in
					req.session.customer = user.customer_id;

					// tell the client if the login was successful or not
					res.json({ success: true });
				}
				else {
					console.log("invalid credentials, try again");
					res.json({ success: false });
				}
			});
		}
		else {
			console.log("invalid credentials, try again");
			res.json({ success: false });
		}
	});
});

// this variable allows us to take the request made to the /order POST route and use it in the /confirmation GET route
let sharedData;

// use middleware for the order endpoint so that i can use the data in the confirmation get endpoint
app.use((req, res, next) => {

	// this route checks if the user is logged in before creating an order
	if (req.method === 'POST' && req.path === '/order') {

		// check if the user is logged in
		if (req.session.customer) {

			res.json({ success: true });
		}

		// if the user is not logged in
		else {
			res.json({ success: false });
		}

		// assign the request data to a variable we can use in the /confirmation endpoint
		sharedData = req.body;
	}
	next();
});

app.get("/confirmation", (req, res) => {

	// get the logged in customer's ID
	let customer_id_raw = req.session.customer;

	// convert the customer id to a string
	let customer_id = customer_id_raw.toString();

	// get the order total price by multiplying the product price with the product quantity
	const totalPrice = parseInt(sharedData.price) * parseInt(sharedData.quantity);

	// get the current date
	const currentDate = new Date();

	// format it to fit into a MySQL DATE type  
	const finalCurrentDate = currentDate.toISOString().substring(0, 10);

	// initialise another Date method for the shipping date
	const shippingDate = new Date();

	// add 7 days to the current date to get the shipping date
	shippingDate.setDate(currentDate.getDate() + 7);

	// format it to fit the DATE MySQL data type
	const finalShippingDate = shippingDate.toISOString().substring(0, 10);

	// add the order created to the orders table
	// the SELECT LAST_INSERT_ID() allows me to get the order_number pk of the table so I can use it in the next SQL query
	let sql = `INSERT INTO orders (order_date, order_delivery_date, customer_id) VALUES (?, ?, ?); SELECT LAST_INSERT_ID() AS order_number;`;

	db.query(sql, [finalCurrentDate, finalShippingDate, customer_id], (err, result) => {

		if (err) {
			console.log(`an error occured ${err}`);
		}
		else {

			// get the order_number PK
			let orderNumber = result[1][0].order_number;

			console.log(`order ${orderNumber} successfully added to the database`);

			// run another sql query to add information to the order_detail table
			let sql2 = `INSERT INTO order_detail (product_id, quantity, price_sold, order_number) VALUES (?, ?, ?, ?)`;

			db.query(sql2, [sharedData.product_id, sharedData.quantity, totalPrice, orderNumber], (err, result) => {

				if (err) {
					console.log(`an error occured ${err}`);
				}
				else {
					// run the third and final query to get the customer's address
					let sql3 = `SELECT * FROM customer WHERE customer_id = ?`;

					db.query(sql3, [customer_id], (err, result) => {

						if (err) {
							console.log(`an error occured ${err}`);
						}

						// get the order details from the shared variable and other places and put them in an object
						const info = {
							quantity: sharedData.quantity,
							price: sharedData.price,
							product_id: sharedData.product_id,
							cust_id: customer_id,
							product_name: sharedData.name,
							order_date: finalCurrentDate,
							shipping_date: finalShippingDate,
							total_price: totalPrice,
							order_number: orderNumber
						};

						console.log(info)

						res.render('confirmation', { items: info, address: result });
					});
				}
			});
		}
	});
});

// dynamic routing for pages that dont have dedicated routes
app.get('/:page', (req, res) => {
	const page = req.params.page;
	res.sendFile(path.join(__dirname, `views/${page}`));
	console.log(`navigated to ${page}`)
});

// if using https uncomment this

// // get the certificates and key for using https
// const server = https.createServer({
//     key: fs.readFileSync('https/private.key'),
//     cert: fs.readFileSync('https/certificate.crt')
// }, app);

// // start the server with https and console log
// server.listen(443, () => {
//     console.log('server listening on port 443 https://localhost');
// });

/* 
	if the server is being tested choose a random port to prevent port clashing 
	https://stackoverflow.com/questions/54422849/jest-testing-multiple-test-file-port-3000-already-in-use
*/
if (process.env.NODE_ENV !== 'test') {
	app.listen(3001);
	console.log('server listening on port 3001 http://localhost:3001');
}


module.exports = app;