document.addEventListener('DOMContentLoaded', () => {


    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        
        // validate the form data
        if (data.state === '0') {

            let invalidalert = document.getElementById('alert-pop');

            let strongElement = invalidalert.querySelector('strong');

            strongElement.textContent = 'You must select a state!';

            invalidalert.classList.add("show");

        } 
        else {
            // valid state selected
            // submit the form
            Register(data);
        }
    });
    
    function Register(data) {

        // use fetch to make a POST request with the data
        console.log(data);

        invalidalert = document.getElementById("alert-pop");
        
        // make the post request to the register endpoint
        return fetch("/register", {
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
                window.location.href = '/login.html?register=success';
            } else {
                // display the error alert if something happens
                invalidalert.classList.add("show");
            }
          })

        // catch errors
        .catch(error => {
            console.log(error);
        });
    }


});