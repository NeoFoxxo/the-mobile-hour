function createAdmin(event) {

    // stop the form refreshing the page on submit
    event.preventDefault();

    const form = document.querySelector('#addAdminForm')

    const formData = new FormData(form);

    // get the data from all the form entries
    const data = Object.fromEntries(formData.entries());

    // make the post request to the createadmin endpoint
    return fetch("createadmin", {
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
            console.log("admin successfully created")

            // add success to the url so i can display the success message on refresh
            window.location.href = 'addadmin?register=success';
        } else {

            // display the error alert if something happens
            console.log("error")
        }
    })

    // catch errors
    .catch(error => {
        console.log(error);
    });
}
