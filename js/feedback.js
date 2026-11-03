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
