const signupFormHandler = async (event) => {
  event.preventDefault();

  // Form selectors
  const f_name = document.querySelector('#reg-fname').value.trim();
  const l_name = document.querySelector('#reg-lname').value.trim();
  const email = document.querySelector('#reg-email').value.trim();
  const username = document.querySelector('#reg-username').value.trim();
  const password1 = document.querySelector('#reg-password1').value.trim();
  const password2 = document.querySelector('#reg-password2').value.trim();

  const form = document.querySelector('#register-form').reset();

  let password = '';
  if (password1 === password2) {
    password = password1
  } else {
    document.querySelector('#register-form #error-msg').innerHTML = `<span class="animate-pulse font-bold text-red-500 drop-shadow-md">Passwords Didn't Match</span>`;

    setTimeout(() => {
      document.querySelector('#register-form #error-msg').innerHTML = `<span>!!--No Recovery Method--!!</span>`;
    }, 5000);
    return;
  }

  if (f_name && l_name && email && username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ f_name, l_name, email, username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      const errResponse = await response.json();
      const errMessage = errResponse.errors[0].message;
      const errDiv = document.querySelector('#register-form #err-msg').innerHTML = `<span class="visible font-semibold text-red-500 drop-shadow-md">${errMessage}</span>`;

      setTimeout(() => {
        document.querySelector('#register-form #err-msg').innerHTML = `<span class="invisible font-semibold text-red-500 drop-shadow-md">Error Message</span>`;
      }, 4000);
    }
  }
};

// Dont need this anymore with Sequelize custom messages
// const checkResponse = (response) => {
//   let msg = ''
//   console.log(response.errors[0].message);
//   response.errors.forEach(element => {
//     switch (element.message) {
//       case 'Validation not on username failed':
//         msg += `!--Username can not contain special characters--!`;
//         break;
//       case 'Validation len on password failed':
//         msg += `!--Password must be at least 8 characters--!`;
//         break;
//       case 'Validation isEmail on email failed':
//         msg += `!--Not a valid email--!`;
//         break;
//       case 'email must be unique':
//         msg += `!--Not a valid email--!`;
//         break;
//       default:
//         msg = `Oops! Something went wrong`;
//     }
//   });

//   return msg;
// }


// Handle 
const modal = document.getElementById("modal");

// Get the button that opens the modal
const regBtn = document.getElementById("open-modal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const modalContent = document.querySelector('.modal-content');

// When the user clicks on the button, open the modal
regBtn.onclick = function () {
  modal.style.display = "block";
  modal.classList.toggle('hidden');
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Form
document
  .querySelector('#modal #btn')
  .addEventListener('click', signupFormHandler);
