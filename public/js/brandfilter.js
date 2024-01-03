// get the brand from the radio button that was clicked
function radio(brand) {

  // get the current URL
  const currentUrl = new URL(window.location.href);

  // get the value of the filter parameter
  const filter = currentUrl.searchParams.get('filter');

  // if a filter is specified in the URL, preserve its value
  if (filter) {
    currentUrl.searchParams.set('filter', filter);
  }

  // get the value of the filter parameter
  const currentBrand = currentUrl.searchParams.get('brand');

  // if the brand that was click gets click again, remove it from the url and unfilter the results
  if (currentBrand === brand) {
    window.location.href = "/shop";
  }
  else {
    // set the value of the brand parameter if it exists
    currentUrl.searchParams.set('brand', brand);
    // navigate to the updated URL
    window.location.href = currentUrl.href;
  }
}

module.exports = radio;