// get a reference to the order button
const orderButton = document.getElementById("order-btn");

document.addEventListener('DOMContentLoaded', () => {

	// add an event listener to the order button
	orderButton.addEventListener('click', async () => {

		// get a reference to the quantity input box
		const quantityInput = document.getElementById('sst');

		// get the current value of the quantity input box
		const quantity = quantityInput.value;

		// get the element that has the price
		const priceElement = document.getElementById('price');

		// get the element that has the name
		const nameElement = document.getElementById('prodName');

		// get the product id from the current page url
		const url = window.location.href;

		// split the url into segments based on the "/"
		const segments = url.split('/');

		// get the last segment since that will be the product id
		const id = segments[segments.length - 1];

		// get the price from the element and use slice to remove the dollar sign from the value
		const price = priceElement.textContent.slice(1);

		// get the product name from the element
		const name = nameElement.textContent;

		// put the data in json to POST to the backend
		const data = {
			quantity: quantity,
			price: price,
			product_id: id,
			name: name
		};

		await orderProduct(data);
	});
});

async function orderProduct(data) {
	console.log(data);
	try {
		// use fetch to make a POST request with the data
		const request = await fetch("/order", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			// convert the data to json
			body: JSON.stringify(data)
		});
		const response = await request.json();
		if (response.success) {
			console.log("user is logged in, placing order...")
			window.location.href = '/confirmation';
		}
		else {
			// if the user is not logged in redirect to the login page and display a message
			window.location.href = '/login.html?from=order';
		}
	}
	catch (err) {
		console.log(err)
	}
}

module.exports = orderProduct;