window.addEventListener('DOMContentLoaded', () => {

    // check if the url has "success" if it does add the good alert popup to the page
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('register') === 'success' ) {

      // if the admin account creation was successful show a success message
      const goodalert = document.querySelector('#alert-pop')
      
      goodalert.classList.add('show');
    }
});