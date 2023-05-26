// get the value of the brand parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const brand = urlParams.get('brand');
const filterurl = urlParams.get('filter');

// if a brand is specified in the URL, make that radio button checked
if (brand) {
  document.getElementById(brand).checked = true;
}

// if a filter is specified in the URL, make that filter the current filter on screen
if (filterurl) {

  // get a reference to the select element which is a jQuery plugin used by the template
  const selectElement = $('select');

  // set the value of the select element to the selected filter
  selectElement.val(filterurl);

  // update the menu to display the selected filter
  selectElement.niceSelect('update');

}