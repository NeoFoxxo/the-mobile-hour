// get the filter from the dropdown option that was clicked
function filter(selectedFilter) {

    // get the current URL
    const currentUrl = new URL(window.location.href);

    // get the value of the brand parameter if it exists
    const brand = currentUrl.searchParams.get('brand');

    // set the value of the filter parameter
    currentUrl.searchParams.set('filter', selectedFilter);

    // if a brand is specified in the URL, keep its value
    if (brand) {
        currentUrl.searchParams.set('brand', brand);
    }

    // navigate to the updated URL
    window.location.href = currentUrl.href;
}

module.exports = filter;