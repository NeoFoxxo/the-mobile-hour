document.addEventListener('DOMContentLoaded', () => {


  document.querySelector('#loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    // Get a reference to the form element
    const loginForm = document.getElementById('loginForm');

    // Get references to the input elements
    const username = loginForm.querySelector('input[type="text"]');
    const password = loginForm.querySelector('input[type="password"]');

    // Create a JavaScript object with the input values
    const data = {
      username: username.value,
      password: password.value
    };

    Login(data);
  });


  function Login(data) {

    // use fetch to make a POST request with the data
    console.log(data);

    const invalidalert = document.getElementById("alert-pop");

    // make the post request to the register endpoint
    return fetch("adminlogin", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // convert the data to json
      body: JSON.stringify(data)
    })

      .then(response => response.json())

      .then(response => {

        console.log(response);

        if (response.success) {
          // add success to the url so I can tell the home page to display the goodalert popup
          window.location.href = '/admin';
        } else {
          invalidalert.classList.add("show");
        }
      })

      // catch errors
      .catch(error => {
        console.log(error);
      });
  }

});