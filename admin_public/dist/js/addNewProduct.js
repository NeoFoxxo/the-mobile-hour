function addNewProduct(event) {
    
    event.preventDefault();

    const form = document.querySelector('#addProductForm');
    const formData = new FormData(form);
  
    // get the data from all the form entries
    const data = Object.fromEntries(formData.entries());

    const invalidalert = document.getElementById('alert-pop');
  
    // if the user does not select a brand show an error message
    if (formData.get('brand') === "0") {
      invalidalert.classList.add("show");
      return;
    }
  
    // use fetch to make a POST request with the form data
    fetch('addproduct', {
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
        console.log('product successfully added');
        window.location.reload();
      } 
      else {
        // display the error alert if something happens
        console.log('error');
      }
    })
    .catch(error => {
      console.log(error);
    });
}