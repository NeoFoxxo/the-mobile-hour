function deleteProduct(id) {

    // get the delete button and and make it run the submitDelete function if it is clicked
    document.querySelector('#deleteSubmit').addEventListener('click', submitDelete);

    function submitDelete() {
        const data = { id: id };

        // make the post request to the deleteproduct endpoint
        return fetch('deleteproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            // convert the data to json
            body: JSON.stringify(data)
        })

        .then(response => response.json())

        .then(response => {
            console.log(response);

            if (response.success) {
            console.log('product successfully deleted');
            window.location.reload();
            } 
            else {
                // display the error alert if something happens
                console.log('error');
            }
        })
        
        // catch errors
        .catch(error => {
            console.log(error);
        });
    }
}
  