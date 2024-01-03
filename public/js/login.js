document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    await Login(data);
  });
});

async function Login(data) {
  let invalidalert = document.getElementById("alert-pop");
  try {
    // use fetch to make a POST request with the data
    const request = await fetch("/userlogin", {
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
      // add success to the url so I can tell the home page to display the goodalert popup
      window.location.href = '/?login=success';
    }
    else {
      invalidalert.classList.add("show");
    }
  }
  catch (err) {
    console.log(err)
  }
}
module.exports = Login;