(() => {
  // js/emailsignup.js
  var emailsignup_default = () => {
    var contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      var email = document.getElementById("email");
      var successMessage = document.getElementById("submitSuccessMessage");
      var errorMessage = document.getElementById("submitErrorMessage");
      var invalidFeedback = email.nextElementSibling;
      email.classList.remove("is-invalid");
      invalidFeedback.classList.add("d-none");
      successMessage.classList.add("d-none");
      errorMessage.classList.add("d-none");
      if (!validateEmail(email.value)) {
        email.classList.add("is-invalid");
        invalidFeedback.classList.remove("d-none");
        invalidFeedback.textContent = "Email is not valid.";
      } else {
        email.classList.remove("is-invalid");
        invalidFeedback.classList.add("d-none");
        saveEmail(email.value, (result) => {
          if (result.success) {
            console.log("Email saved successfully");
            contactForm.classList.add("d-none");
            successMessage.classList.remove("d-none");
          } else {
            console.log("Failed to save email");
            errorMessage.classList.remove("d-none");
            errorMessage.textContent = result.message;
          }
        });
      }
    });
  };
  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  function saveEmail(email, callback) {
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_key: "7bc48bf0-4655-489c-869e-504959b78c33",
        // Replace with your Web3Forms access key
        email
      })
    }).then((response) => response.json()).then((data) => {
      if (data.success) {
        callback({ success: true });
      } else {
        callback({ success: false, message: data.message || "Failed to save email. Please try again." });
      }
    }).catch((error) => {
      callback({ success: false, message: "Failed to save email. Please try again." });
      console.error("There was a problem with the fetch operation:", error);
    });
  }

  // js/index.js
  console.log("index.js is loaded");
  document.addEventListener("DOMContentLoaded", () => {
    emailsignup_default();
  });
})();
/*!
* Start Bootstrap - Coming Soon v6.0.7 (https://startbootstrap.com/theme/coming-soon)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-coming-soon/blob/master/LICENSE)
*/
//# sourceMappingURL=bundle.js.map
