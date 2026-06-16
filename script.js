const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const proposalPage = document.getElementById("proposalPage");
const celebrationPage = document.getElementById("celebrationPage");

const safePadding = 18;
const escapeDistance = 120;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function moveNoButton() {
  const buttonRect = noButton.getBoundingClientRect();
  const maxX = Math.max(safePadding, window.innerWidth - buttonRect.width - safePadding);
  const maxY = Math.max(safePadding, window.innerHeight - buttonRect.height - safePadding);

  noButton.classList.add("is-running");
  noButton.style.left = `${randomBetween(safePadding, maxX)}px`;
  noButton.style.top = `${randomBetween(safePadding, maxY)}px`;
}

function isPointerCloseToNoButton(event) {
  const rect = noButton.getBoundingClientRect();
  const pointerX = event.clientX;
  const pointerY = event.clientY;
  const closestX = Math.max(rect.left, Math.min(pointerX, rect.right));
  const closestY = Math.max(rect.top, Math.min(pointerY, rect.bottom));
  const distance = Math.hypot(pointerX - closestX, pointerY - closestY);

  return distance < escapeDistance;
}

function createHeart() {
  const heart = document.createElement("span");
  const hearts = ["💖", "💕", "💘", "❤️", "💗", "🌹"];

  heart.className = "falling-heart";
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${randomBetween(0, 100)}vw`;
  heart.style.fontSize = `${randomBetween(1.2, 2.4)}rem`;
  heart.style.animationDuration = `${randomBetween(3.2, 6.4)}s`;
  heart.style.setProperty("--drift", `${randomBetween(-90, 90)}px`);

  document.body.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove(), { once: true });
}

function startCelebration() {
  proposalPage.classList.add("hidden");
  celebrationPage.classList.remove("hidden");

  for (let index = 0; index < 34; index += 1) {
    setTimeout(createHeart, index * 75);
  }

  setInterval(createHeart, 280);
}

document.addEventListener("mousemove", (event) => {
  if (!celebrationPage.classList.contains("hidden")) {
    return;
  }

  if (isPointerCloseToNoButton(event)) {
    moveNoButton();
  }
});

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("focus", moveNoButton);
noButton.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});

yesButton.addEventListener("click", startCelebration);
