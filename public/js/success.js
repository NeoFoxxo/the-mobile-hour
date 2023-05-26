window.addEventListener('DOMContentLoaded', () => {

    // check if the url has "success" if it does add the good alert popup to the page
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get('register') === 'success' ) {
      // login or register was successful
      const goodalert = document.querySelector('#alert-pop')

      // change the text of the alert message if the registration is successful
      document.querySelector('#alert-pop strong').innerHTML = 'Account Successfully Created';
      goodalert.classList.add('show');
    }
    else if (urlParams.get('login') === 'success') {
      // login was successful
      const goodalert = document.querySelector('#good-alert-pop')
      goodalert.classList.add('show');
    }
    else if (urlParams.get('from') === 'order'){
      const goodalert = document.querySelector('#alert-pop')

      // change the text of the alert message if the user is not logged in and attempts to make an order
      document.querySelector('#alert-pop strong').innerHTML = 'You must be logged in to create an order';
      goodalert.classList.add('show');
    }
});