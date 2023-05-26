document.addEventListener('DOMContentLoaded', () => {


    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        Login(data);
    });

    
    function Login(data) {

        // use fetch to make a POST request with the data

        invalidalert = document.getElementById("alert-pop");

        // make the post request to the register endpoint
        return fetch("/userlogin", {
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
                window.location.href = '/?login=success';
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