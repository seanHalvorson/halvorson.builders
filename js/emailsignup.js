export default () => {
    var contactForm = document.getElementById('contactForm');
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevents the form from reloading the page

        var email = document.getElementById("email");
        var successMessage = document.getElementById("submitSuccessMessage");
        var errorMessage = document.getElementById("submitErrorMessage");
        var invalidFeedback = email.nextElementSibling; // Assuming the first invalid-feedback div is for required field

        // Clear previous feedback
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

            // Call the function to save the email
            saveEmail(email.value, (result) => {
                if (result.success) {
                    console.log("Email saved successfully"); // Debugging statement
                    contactForm.classList.add("d-none"); // Hide the form
                    successMessage.classList.remove("d-none"); // Show the success message
                } else {
                    console.log("Failed to save email"); // Debugging statement
                    errorMessage.classList.remove("d-none"); // Show the error message
                    errorMessage.textContent = result.message;
                }
            });
        }
    });
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function saveEmail(email, callback) {
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            access_key: '7bc48bf0-4655-489c-869e-504959b78c33', // Replace with your Web3Forms access key
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            callback({ success: true });
        } else {
            callback({ success: false, message: data.message || "Failed to save email. Please try again." });
        }
    })
    .catch(error => {
        callback({ success: false, message: "Failed to save email. Please try again." });
        console.error('There was a problem with the fetch operation:', error);
    });
}