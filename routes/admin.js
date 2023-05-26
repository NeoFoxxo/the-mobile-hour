const express = require('express');
const router = express.Router();
const db = require('../dbconnection');
const path = require('path');
const bcrypt = require('bcrypt');

// middleware to check if user is logged in
const requireLogin = (req, res, next) => {

    /* if the user is not logged in and the page is not the login page 
    and if the request is not to the adminlogin endpoint, redirect the user */
    if (!req.session.user && req.url !== '/login.html' && req.url !== '/adminlogin') {
        res.redirect('login.html');
    } else {
        // if user is logged in or on the login page, continue to the next middleware or route
        next();
    }
};

// this will make the requireLogin code run before the user can access any page
router.use(requireLogin);

router.get('/', (req, res) => {

    // run a query to get all of the customers
    const sql = 'SELECT * FROM customer';
    db.query(sql, (err, result) => {
        if (err) throw err;

        // run a query to get the count of the customer, user, product, and orders tables
        const sql2 = `
            SELECT 
                (SELECT COUNT(*) FROM customer) AS customer_count, 
                (SELECT COUNT(*) FROM user) AS user_count, 
                (SELECT COUNT(*) FROM product) AS product_count, 
                (SELECT COUNT(*) FROM orders) AS order_count
        `;
        db.query(sql2, (err, result2) => {
            if (err) throw err;

            // bind the customer details and the count of each table to the page and render it
            res.render('admin/index', {
                items: result,
                customerCount: result2[0].customer_count,
                userCount: result2[0].user_count,
                productCount: result2[0].product_count,
                orderCount: result2[0].order_count
            });
        });
    });
});

router.get('/useraccounts', (req, res) => {

    // run a query to get all of the products
    const sql = 'SELECT * FROM customer';
    db.query(sql, (err, result) => {
        if (err) throw err;

        // bind that product info to the page and render it
        res.render('admin/useraccounts', { items: result });
    });
});

router.get('/changelog', (req, res) => {

    // run a query to get all of the products
    const sql = 'SELECT * FROM changelog';

    db.query(sql, (err, result) => {
        if (err) throw err;

        const sql2 = 'SELECT * FROM user';

        db.query(sql2, (err, result2) => {

            const sql3 = 'SELECT * FROM product';

            db.query(sql3, (err, result3) => {

                
                // bind that product info to the page and render it
                res.render('admin/changelog', { items: result, admin: result2, product: result3 });
            });

        });

    });
});

router.get('/products', (req, res) => {

    // run a query to get all of the products
    const sql = 'SELECT * FROM product';
    db.query(sql, (err, result) => {
        if (err) throw err;

        // run a query to get all of the features
        const sql2 = 'SELECT * FROM feature';

        db.query(sql2, (err, result2) => {
            if (err) throw err;
    
            // bind that product info to the page and render it
            res.render('admin/products', { items: result, features: result2 });
        });
    });
});

// define the logout route
router.get('/logout', (req, res) => {

    // delete all of the current login data
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } 
      else {
        console.log("user logged out")
        
        res.redirect('login.html');
      }
    });
});

// the endpoint for registering customers
router.post("/edituser", (req, res) => {

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
    let id = req.body.id;


    // if the password field is not empty, hash it and store it
    if (password != ""){

        bcrypt.hash(password, 8, (err, hash) => {

            if (err) {
                console.log(`an error occured ${err}`);
                // tell the client if the edit was successful or not
                res.json({ success: false });
            }
    
            // execute the sql with a parameterized query
            let sql = `UPDATE customer SET cust_address = ?, city = ?, cust_email = ?, firstname = ?, lastname = ?, cust_password = ?, cust_phone = ?, postcode = ?, state = ? WHERE customer_id = ?`;
            
            db.query(sql, [address, city, email, firstname, lastname, hash, phone, postcode, state, id], (err, result) => {
    
                if (err) {
                    console.log(`an error occured ${err}`);
                    // tell the client if the registration was successful or not
                    res.json({ success: false });
                } 
                else {
                    console.log(`account ${firstname} successfully edited `);
                    // tell the client if the registration was successful or not
                    res.json({ success: true });
                }
            });
        });
    }

    // if the password input is empty ignore it
    else {
        // execute the sql with a parameterized query
        let sql2 = `UPDATE customer SET cust_address = ?, city = ?, cust_email = ?, firstname = ?, lastname = ?, cust_phone = ?, postcode = ?, state = ? WHERE customer_id = ?`;
            
        db.query(sql2, [address, city, email, firstname, lastname, phone, postcode, state, id], (err, result) => {

            if (err) {
                console.log(`an error occured ${err}`);
                // tell the client if the edit was successful or not
                res.json({ success: false });
            } 
            else {
                console.log(`account ${firstname} successfully edited `);
                // tell the client if the edit was successful or not
                res.json({ success: true });
            }
        });
    }
   
});

// the endpoint for editing products
router.post("/editproduct", (req, res) => {

    // get the product inputs
    let name = (req.body.name);
    let price = (req.body.price);
    let brand = (req.body.brand);
    let model = (req.body.model);
    let stock = (req.body.stock);
    let productid = (req.body.productid);

    // get the feature inputs 
    let os = (req.body.os);
    let resolution = (req.body.resolution);
    let ram = (req.body.ram);
    let rearcamera = (req.body.rearcamera);
    let frontcamera = (req.body.frontcamera);
    let weight = (req.body.weight);
    let storage = (req.body.storage);
    let dimensions = (req.body.dimensions);
    let cpu = (req.body.cpu);
    let screensize = (req.body.screensize);
    let battery = (req.body.battery);
    let featureid = (req.body.featureid);

    // update the product details in the database
    let sql = `UPDATE product SET product_name = ?, product_model = ?, manufacturer = ?, price = ?, stock_on_hand = ? WHERE product_id = ?`;
    
    db.query(sql, [name, model, brand, price, stock, productid], (err, result) => {
        if (err) throw err;
    });

    // update the feature details in the database and send back a success response
    let sql2 = `UPDATE feature SET weight = ?, dimensions = ?, os = ?, screensize = ?, resolution = ?, cpu = ?, ram = ?, storage = ?, battery = ?, rear_camera = ?, front_camera = ? WHERE feature_id = ?`;

    db.query(sql2, [weight, dimensions, os, screensize, resolution, cpu, ram, storage, battery, rearcamera, frontcamera, featureid], (err, result) => {

        if (err) {
            console.log(`an error occured ${err}`);
            // tell the client if the registration was successful or not
            res.json({ success: false });
        } 
        else {
            console.log(`product ${name} successfully edited `);
            // tell the client if the registration was successful or not
            res.json({ success: true });
        }
    });

    // get the current date
    const currentDate = new Date();

    // format it to fit into a MySQL DATE type  
    const finalCurrentDate = currentDate.toISOString().substring(0, 10);

    // get the logged in users id from the session
    const userID = req.session.user

    // add this change to the changelog
    let sql3 = `INSERT changelog SET date_created = ?, date_last_modified = ?, user_id = ?, product_id = ?`;

    db.query(sql3, [finalCurrentDate, finalCurrentDate, userID, productid], (err, result) => {

        if (err) {
            console.log(`an error occured with adding changelog ${err}`);
        } 
        else {
            console.log(`product ${name} change successfully logged `);
        }
    });
});

// the endpoint for adding products
router.post("/addproduct", (req, res) => {

    // get the product inputs
    let name = req.body.name;
    let price = req.body.price;
    let brand = req.body.brand;
    let model = req.body.model;
    let stock = req.body.stock;

    // get the feature inputs 
    let os = req.body.os;
    let resolution = req.body.resolution;
    let ram = req.body.ram;
    let rearcamera = req.body.rearcamera;
    let frontcamera = req.body.frontcamera;
    let weight = req.body.weight;
    let storage = req.body.storage;
    let dimensions = req.body.dimensions;
    let cpu = req.body.cpu;
    let screensize = req.body.screensize;
    let battery = req.body.battery;

    // update the feature details in the database and send back a success response
    let sql = `INSERT feature SET weight = ?, dimensions = ?, os = ?, screensize = ?, resolution = ?, cpu = ?, ram = ?, storage = ?, battery = ?, rear_camera = ?, front_camera = ?`;

    db.query(sql, [weight, dimensions, os, screensize, resolution, cpu, ram, storage, battery, rearcamera, frontcamera], (err, result) => {
        if (err) {
            console.log(`an error occured ${err}`);
        } 
        else {
            console.log(`feature successfully created`);

            const featureid = result.insertId; // get the feature_id from first query

            // update the product details in the database
            let sql2 = `INSERT product SET product_name = ?, product_model = ?, manufacturer = ?, price = ?, stock_on_hand = ?, feature_id = ?`; // modified SQL query to include image

            db.query(sql2, [name, model, brand, price, stock, featureid], (err, result) => {
                if (err) throw err;
                console.log(`product ${name} successfully created `);
                // tell the client if the new product was added successfully
                res.json({ success: true });
            });
        }
    });
});

// the endpoint for adding products
router.post("/createadmin", (req, res) => {

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const password = req.body.password
    const role = req.body['radio-stacked']
    const username = req.body.username

    // hash the password with bcrypt so that it is secure in the database
    bcrypt.hash(password, 8, (err, hash) => {

        if (err) {
            console.log(`an error occured ${err}`);
            // tell the client if the registration was successful or not
            res.json({ success: false });
        }

        // execute the sql with a parameterized query
        let sql = `INSERT user SET firstname = ?, lastname = ?, user_role = ?, user_password = ?, username = ?`;
        
        db.query(sql, [firstname, lastname, role, hash, username], (err, result) => {

            if (err) {
                console.log(`an error occured ${err}`);
                // tell the client if the admin account creation was successful or not
                res.json({ success: false });
            } 
            else {
                console.log(`admin ${firstname} successfully created `);
                // tell the client if the admin account creation was successful or not
                res.json({ success: true });
            }
        });
    });
});

router.get("/addadmin", (req, res) => {

    // if the user's role is admin, they will see a insuffiecent privelages page
    if (req.session.role === 0) {
        res.sendFile(path.resolve(__dirname, '..', 'views', 'admin', 'addadminrestricted.html'));
    }

    // if the user's role is manager, they will see the real page
    else {
        res.sendFile(path.resolve(__dirname, '..', 'views', 'admin', 'addadmin.html'));
    } 
});

// the endpoint for deleting products
router.post("/deleteproduct", (req, res) => {

    let id = req.body.id;
    
    // execute the sql with a parameterized query
    let sql = `DELETE FROM feature WHERE feature_id = ?`;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(`an error occured ${err}`);
            // tell the client if the product deletion was successful or not
            res.json({ success: false });
        } 
        else {
            console.log(`product ${id} successfully deleted `);
            // tell the client if the product deletion was successful or not
            res.json({ success: true });
        }
    });
});

// the endpoint for logging in customers
router.post("/adminlogin", (req, res) => {
    
// get the form inputs from the frontend
let username = req.body.username;
let password = req.body.password;
    
    // search for the user by their email using a parameterized query
    let sql = `SELECT * FROM user WHERE username = ?`;

    db.query(sql, [username], (err, result) => {
        
        if (err) throw err;

        // if there is a row the user is in the database
        if (result.length > 0) {

            // get that user
            let user = result[0];
            
                // compare the login password with the hashed customer password
                bcrypt.compare(password, user.user_password, (err, match) => {

                    if (err) throw err;

                    if (match) {
                        console.log(`${user.firstname} successfully logged in`);

                        // when the user logs in save their id to the session so we remember that they have logged in
                        req.session.user = user.user_id;
                        req.session.role = user.user_role;

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

// dynamic routing for pages that dont have dedicated routes
router.get('/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.resolve(__dirname, '..', 'views', 'admin', page));
    console.log(`navigated to ${page}`)
});

module.exports = router;