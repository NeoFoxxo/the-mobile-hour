function getCustEditData(rowData) {

    // get the edit form
    const form = document.querySelector('#editForm');

    // replace all of the form values with the info from the database I sent on the onclick event
    form.elements['firstname'].value = (rowData.firstname);
    form.elements['lastname'].value = (rowData.lastname);
    form.elements['address'].value = (rowData.cust_address);
    form.elements['postcode'].value = (rowData.postcode);
    form.elements['phone'].value = (rowData.cust_phone);
    form.elements['city'].value = (rowData.city);
    form.elements['email'].value = (rowData.cust_email);
    form.elements['state'].value = (rowData.state);

    // add the id to this alt text so i can send it
    form.elements['submit'].alt = (rowData.customer_id);
}
