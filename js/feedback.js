const comments = document.getElementById("comments");
const charCounter = document.getElementById("charCounter");

function updateCharacterCounter() {
    const count = comments.value.length;
    const minimumReached = count >= 15;

    charCounter.textContent = `${count} characters (minimum 15) - ${minimumReached ? "minimum reached" : "minimum not yet reached"}`;
    charCounter.style.color = minimumReached ? "green" : "red";
}

comments.addEventListener("input", updateCharacterCounter);
updateCharacterCounter();

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const topic = document.getElementById("topic");
const topicError = document.getElementById("topicError");
const commentsError = document.getElementById("commentsError");
const website = document.getElementById("website");
const websiteError = document.getElementById("websiteError");

function showValidationResult(input, errorElement, message) {
    const isValid = message === "";

    errorElement.textContent = message;
    input.setAttribute("aria-invalid", String(!isValid));
    return isValid;
}

function validateFullName() {
    const value = fullName.value.trim().normalize("NFC");
    let message = "";

    if (value === "") {
        message = "Please enter your full name.";
    } else if (Array.from(value).length < 2) {
        message = "Your name must contain at least 2 characters.";
    } else if (!/^\p{L}[\p{L}\p{M} '\u2019-]*$/u.test(value)) {
        message = "Use letters, spaces, apostrophes or hyphens for your name.";
    }

    return showValidationResult(fullName, nameError, message);
}

function validateEmail() {
    const value = email.value.trim();
    let message = "";

    if (value === "") {
        message = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value)) {
        message = "Enter an email address with a domain, such as name@example.com.";
    }

    return showValidationResult(email, emailError, message);
}

function validateTopic() {
    const selectedOption = topic.selectedOptions[0];
    const isValid = selectedOption && !selectedOption.disabled && topic.value !== "";
    const message = isValid ? "" : "Please select a topic of interest.";

    return showValidationResult(topic, topicError, message);
}

function validateComments() {
    const message = comments.value.length >= 15
        ? ""
        : "Please enter at least 15 characters in your comments.";

    return showValidationResult(comments, commentsError, message);
}

function validateWebsite() {
    const isValid = website.value === "" || website.validity.valid;
    const message = isValid ? "" : "Enter a complete URL, such as https://example.com, or leave this field empty.";

    return showValidationResult(website, websiteError, message);
}

topic.addEventListener("blur", validateTopic);
topic.addEventListener("change", validateTopic);
comments.addEventListener("blur", validateComments);
website.addEventListener("blur", validateWebsite);

comments.addEventListener("input", () => {
    if (comments.hasAttribute("aria-invalid")) {
        validateComments();
    }
});

website.addEventListener("input", () => {
    if (website.hasAttribute("aria-invalid")) {
        validateWebsite();
    }
});

fullName.addEventListener("blur", validateFullName);
email.addEventListener("blur", validateEmail);

fullName.addEventListener("input", () => {
    if (fullName.hasAttribute("aria-invalid")) {
        validateFullName();
    }
});

email.addEventListener("input", () => {
    if (email.hasAttribute("aria-invalid")) {
        validateEmail();
    }
});
