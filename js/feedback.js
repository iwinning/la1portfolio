// Element selections
const feedbackForm = document.getElementById("feedbackForm");
const formStatus = document.getElementById("formStatus");
const clearButton = document.getElementById("clearButton");
const comments = document.getElementById("comments");
const charCounter = document.getElementById("charCounter");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const topic = document.getElementById("topic");
const topicError = document.getElementById("topicError");
const commentsError = document.getElementById("commentsError");
const website = document.getElementById("website");
const websiteError = document.getElementById("websiteError");

// Remember the timer so Clear or a new success can cancel it.
let successMessageTimer;

// Functions
function updateCharacterCounter() {
    const count = comments.value.length;

    if (count >= 15) {
        charCounter.textContent = `${count} characters (minimum 15) - minimum reached`;
        charCounter.style.color = "green";
    } else {
        charCounter.textContent = `${count} characters (minimum 15) - minimum not yet reached`;
        charCounter.style.color = "red";
    }
}

function showValidationResult(input, errorElement, message) {
    const isValid = message === "";

    errorElement.textContent = message;
    input.setAttribute("aria-invalid", String(!isValid));
    return isValid;
}

function validateFullName() {
    // Normalize accented letters before checking the name and its length.
    const value = fullName.value.trim().normalize("NFC");
    // \p{L} allows international letters; \p{M} allows combining accent marks.
    const namePattern = /^\p{L}[\p{L}\p{M} '\u2019-]*$/u;
    let message = "";

    if (value === "") {
        message = "Please enter your full name.";
    } else if (Array.from(value).length < 2) {
        message = "Your name must contain at least 2 characters.";
    } else if (!namePattern.test(value)) {
        message = "Use letters, spaces, apostrophes or hyphens for your name.";
    }

    return showValidationResult(fullName, nameError, message);
}

function validateEmail() {
    const value = email.value.trim();
    let message = "";

    if (value === "") {
        message = "Please enter your email address.";
    } else if (!email.validity.valid || !/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value)) {
        message = "Enter an email address with a domain, such as name@example.com.";
    }

    return showValidationResult(email, emailError, message);
}

function validateTopic() {
    const selectedOption = topic.selectedOptions[0];
    const isValid = selectedOption && !selectedOption.disabled && topic.value !== "";
    let message = "";

    if (!isValid) {
        message = "Please select a topic of interest.";
    }

    return showValidationResult(topic, topicError, message);
}

function validateComments() {
    let message = "";

    if (comments.value.length < 15) {
        message = "Please enter at least 15 characters in your comments.";
    }

    return showValidationResult(comments, commentsError, message);
}

function validateWebsite() {
    const isValid = website.value === "" || website.validity.valid;
    let message = "";

    if (!isValid) {
        message = "Enter a complete URL, such as https://example.com, or leave this field empty.";
    }

    return showValidationResult(website, websiteError, message);
}

function resetForm() {
    clearTimeout(successMessageTimer);

    // Restore the empty fields and the topic placeholder from the HTML.
    feedbackForm.reset();

    const fields = [fullName, email, topic, comments, website];
    const errorMessages = [nameError, emailError, topicError, commentsError, websiteError];

    // Removing aria-invalid also removes the red or green validation border.
    for (const field of fields) {
        field.removeAttribute("aria-invalid");
    }

    for (const errorMessage of errorMessages) {
        errorMessage.textContent = "";
    }

    formStatus.textContent = "";
    updateCharacterCounter();
}

// Event listeners
clearButton.addEventListener("click", resetForm);

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formStatus.textContent = "";

    // Check each field separately so every validator runs.
    const fullNameValid = validateFullName();
    const emailValid = validateEmail();
    const topicValid = validateTopic();
    const commentsValid = validateComments();
    const websiteValid = validateWebsite();

    if (fullNameValid && emailValid && topicValid && commentsValid && websiteValid) {
        // Save the name before resetting the fields, then display the message.
        const submittedName = fullName.value.trim();
        resetForm();
        formStatus.textContent = `Thanks for your feedback, ${submittedName}!`;
        successMessageTimer = setTimeout(function () {
            formStatus.textContent = "";
        }, 4000);
    }
});

comments.addEventListener("input", updateCharacterCounter);
topic.addEventListener("blur", validateTopic);
topic.addEventListener("change", validateTopic);
comments.addEventListener("blur", validateComments);
website.addEventListener("blur", validateWebsite);

// aria-invalid is added only after validation, so untouched fields stay neutral.
// Recheck a field while typing only if it has already been checked.
comments.addEventListener("input", function () {
    if (comments.hasAttribute("aria-invalid")) {
        validateComments();
    }
});

website.addEventListener("input", function () {
    if (website.hasAttribute("aria-invalid")) {
        validateWebsite();
    }
});

fullName.addEventListener("blur", validateFullName);
email.addEventListener("blur", validateEmail);

fullName.addEventListener("input", function () {
    if (fullName.hasAttribute("aria-invalid")) {
        validateFullName();
    }
});

email.addEventListener("input", function () {
    if (email.hasAttribute("aria-invalid")) {
        validateEmail();
    }
});

// Set the counter's initial text and color when the page loads.
updateCharacterCounter();
