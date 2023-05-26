function sendCustEdit(event) {

    event.preventDefault();

    const form = document.querySelector('#editForm')

    const formData = new FormData(form);

    console.log(formData);

    // get the data from all the form entries
    const data = Object.fromEntries(formData.entries());
    data['id'] = form.elements['submit'].alt;
    
    // make the post request to the edituser endpoint
    return fetch("edituser", {
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
            console.log("user successfully edited")
            window.location.reload();
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
