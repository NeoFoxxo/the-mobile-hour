function sendProdEdit(event) {

    event.preventDefault();

    const form = document.querySelector('#editForm')

    const formData = new FormData(form);
    
    // get the data from all the form entries
    const data = Object.fromEntries(formData.entries());
    data['productid'] = form.elements['submit'].alt;
    data['featureid'] = form.elements['close'].alt;

    // use fetch to make a POST request with the data
    
    // make the post request to the register endpoint
    return fetch("editproduct", {
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
