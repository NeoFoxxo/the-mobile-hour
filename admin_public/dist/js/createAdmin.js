document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#addAdminForm').addEventListener('submit', async (event) => {
    // stop the form refreshing the page on submit
    event.preventDefault();

    const form = document.querySelector('#addAdminForm')

    const formData = new FormData(form);

    // get the data from all the form entries
    const data = Object.fromEntries(formData.entries());

    await createAdmin(data);
  });
});

async function createAdmin(data) {

  try {
    const request = await fetch("createadmin", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // convert the data to json
      body: JSON.stringify(data)
    });

    const response = await request.json();

    if (response.success) {
      console.log("admin successfully created")

      // add success to the url so i can display the success message on refresh
      window.location.href = 'addadmin?register=success';
    } else {

      // display the error alert if something happens
      console.log("error")
    }
  }
  catch (err) {
    // catch errors
    console.log(err);
  }
}

module.exports = createAdmin;