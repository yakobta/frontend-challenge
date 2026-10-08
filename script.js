/* =========================================================
   ELEMENTS
========================================================= */
const stage       = document.getElementById("stage");
const ropeBall    = document.getElementById("ropeBall");
const rope        = document.getElementById("rope");
const reset       = document.getElementById("reset");
const loginForm   = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");


/* =========================================================
   ROPE DRAGGING
========================================================= */
let dragging     = false;
let startY       = 0;
let pullDistance = 0;
let wasDragged   = false;

const maxPull = 100;


ropeBall.addEventListener("pointerdown", (event) => {
    dragging   = true;
    wasDragged = false;
    startY     = event.clientY;

    ropeBall.setPointerCapture(event.pointerId);
});


ropeBall.addEventListener("pointermove", (event) => {
    if (!dragging) return;

    let distance = event.clientY - startY;

    // Only allow downward movement
    if (distance < 0) distance = 0;

    // Limit rope movement
    distance = Math.min(distance, maxPull);

    pullDistance = distance;

    if (distance > 5) wasDragged = true;

    // Move rope ball
    ropeBall.style.transform =
        `translateX(-50%) translateY(${distance}px)`;

    // Stretch rope
    rope.style.height = `${170 + distance}px`;
});


ropeBall.addEventListener("pointerup", (event) => {
    if (!dragging) return;

    dragging = false;
    ropeBall.releasePointerCapture(event.pointerId);

    // If pulled far enough → open the interface
    if (pullDistance > 35) {
        openInterface();
    }

    // Return rope to original position
    setTimeout(() => {
        ropeBall.style.transform = "translateX(-50%)";
        rope.style.height        = "170px";
        pullDistance             = 0;
    }, 180);
});


ropeBall.addEventListener("pointercancel", () => {
    dragging = false;
    ropeBall.style.transform = "translateX(-50%)";
    rope.style.height        = "170px";
    pullDistance             = 0;
});


/* =========================================================
   CLICK / KEYBOARD ACTIVATION
========================================================= */
ropeBall.addEventListener("click", () => {
    if (wasDragged) {
        wasDragged = false;
        return;
    }
    openInterface();
});


ropeBall.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openInterface();
    }
});


/* =========================================================
   OPEN INTERFACE
========================================================= */
function openInterface() {
    stage.classList.add("open");
}


/* =========================================================
   RESET
========================================================= */
reset.addEventListener("click", () => {
    stage.classList.remove("open");

    ropeBall.style.transform = "translateX(-50%)";
    rope.style.height        = "170px";
    pullDistance             = 0;
    wasDragged               = false;
    loginButton.textContent  = "SIGN IN";
});


/* =========================================================
   LOGIN FORM
========================================================= */
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    loginButton.textContent = "SIGNED IN";

    setTimeout(() => {
        loginButton.textContent = "SIGN IN";
    }, 1800);
});


/* =========================================================
   BOTTOM NAVIGATION
========================================================= */
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        navItems.forEach((nav) => nav.classList.remove("active"));
        item.classList.add("active");
    });
});