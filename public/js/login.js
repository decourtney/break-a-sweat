const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  const form = document.querySelector('#login-form').reset();

  console.log(username, password)
  try {
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the homepage
        document.location.replace('/profile');
      } else {
        // const errRes = await response.json();
        const errMsg = 'Wrong username/password.'
        const errDiv = document.querySelector('#login-form #err-msg').innerHTML = `<span class="visible font-semibold text-red-500 drop-shadow-md">${errMsg}</span>`

        setTimeout(() => {
          document.querySelector('#login-form #err-msg').innerHTML = `<span class="invisible font-semibold text-red-500 drop-shadow-md">Error Message</span>`;
        }, 4000);
      }
    }
  } catch (error) {
    console.error(error);
    const errDiv = document.querySelector('#login-form #err-msg').innerHTML = `<span class="visible font-semibold text-red-500 drop-shadow-md">Oops! Something went wrong.</span>`
    setTimeout(() => {
      document.querySelector('#login-form #err-msg').innerHTML = `<span class="invisible font-semibold text-red-500 drop-shadow-md">Error Message Placeholder</span>`;
    }, 4000);
  };
}

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);