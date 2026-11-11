

const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    const darkModeOn = document.body.classList.contains("dark-mode");

    if (darkModeOn) {
        themeButton.textContent = "☀️ Light Mode";
        themeButton.setAttribute("aria-pressed", "true");
    } else {
        themeButton.textContent = "ᵔᴥᵔ Dark Mode";
        themeButton.setAttribute("aria-pressed", "false");
    }
});



const rsvpForm = document.getElementById("rsvp-form");

let count = 5;


const addParticipant = (person) => {

    const newParticipant = document.createElement("p");

    newParticipant.textContent =
        "🎟️ " + person.name + " and " +
        person.animalName + " are reserved for treats!";

    const participantsDiv =
        document.getElementById("rsvp-participants");

    const oldCounter = document.getElementById("rsvp-count");
    oldCounter.remove();

    participantsDiv.appendChild(newParticipant);

    count = count + 1;

    const newCounter = document.createElement("p");
    newCounter.id = "rsvp-count";

    newCounter.textContent =
        "⭐ " + count + " people have RSVP'd to this event!";

    participantsDiv.appendChild(newCounter);
};


const rsvpInputs = document.querySelectorAll("#rsvp-form input");


const validateForm = (event) => {

    event.preventDefault();

    let containsErrors = false;

    for (let i = 0; i < rsvpInputs.length; i++) {

        const currentInput = rsvpInputs[i];

        if (currentInput.value.trim().length < 2) {
            containsErrors = true;
            currentInput.classList.add("error");
        } else {
            currentInput.classList.remove("error");
        }
    }

    const emailInput = document.getElementById("email");

    if (!emailInput.value.includes("@")) {
        containsErrors = true;
        emailInput.classList.add("error");
    }

    if (containsErrors === false) {

        const person = {
            name: document.getElementById("name").value.trim(),
            email: emailInput.value.trim(),
            animalName: document.getElementById("animal-name").value.trim()
        };

        addParticipant(person);

        showRSVPModal(person);

        for (let i = 0; i < rsvpInputs.length; i++) {
            rsvpInputs[i].value = "";
            rsvpInputs[i].classList.remove("error");
        }
    }
};


rsvpForm.addEventListener("submit", validateForm);

const successModal = document.getElementById("success-modal");
const modalMessage = document.getElementById("modal-message");
const modalPicture = document.getElementById("modal-picture");
const closeModalButton = document.getElementById("close-modal-button");

let modalAnimation;
let modalTimeout;


const showRSVPModal = (person) => {

    modalMessage.textContent =
        "Thank you, " + person.name +
        "! " + person.animalName +
        " is officially joining the Frenchie gang! 🐶🎉";

    successModal.classList.add("show");

    startModalAnimation();

    clearTimeout(modalTimeout);

    modalTimeout = setTimeout(() => {
        closeRSVPModal();
    }, 6000);
};


const startModalAnimation = () => {

    clearInterval(modalAnimation);

    let enlarged = false;

    modalAnimation = setInterval(() => {

        if (document.body.classList.contains("reduce-motion")) {
            modalPicture.style.transform = "none";
            return;
        }

        if (enlarged === false) {
            modalPicture.style.transform = "scale(1.15) rotate(8deg)";
            enlarged = true;
        } else {
            modalPicture.style.transform = "scale(0.9) rotate(-8deg)";
            enlarged = false;
        }

    }, 500);
};


const closeRSVPModal = () => {

    successModal.classList.remove("show");

    clearInterval(modalAnimation);
    clearTimeout(modalTimeout);

    modalPicture.style.transform = "none";
};


closeModalButton.addEventListener("click", closeRSVPModal);



const revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {

    if (document.body.classList.contains("reduce-motion")) {
        return;
    }

    for (let i = 0; i < revealableContainers.length; i++) {

        const current = revealableContainers[i];

        const windowHeight = window.innerHeight;
        const topOfRevealableContainer =
            current.getBoundingClientRect().top;

        const revealDistance = parseInt(
            getComputedStyle(current).getPropertyValue("--reveal-distance"),
            10
        );

        if (
            topOfRevealableContainer < windowHeight - revealDistance &&
            topOfRevealableContainer + current.offsetHeight > 0
        ) {
            current.classList.add("active");
        } else {
            current.classList.remove("active");
        }
    }
};


window.addEventListener("scroll", reveal);

reveal();



const reduceMotionButton =
    document.getElementById("reduce-motion-button");

reduceMotionButton.addEventListener("click", () => {

    document.body.classList.toggle("reduce-motion");

    if (!document.body.classList.contains("reduce-motion")) {
        reveal();
    }
});
