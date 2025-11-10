import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRiQilSMsCtkRfU8eE_-ZoGPBb3mAyHZc",
  authDomain: "big-bucks-project.firebaseapp.com",
  projectId: "big-bucks-project",
  storageBucket: "big-bucks-project.firebasestorage.app",
  messagingSenderId: "936438266969",
  appId: "1:936438266969:web:28d5049a770947ed230548",
  measurementId: "G-CVC6B08RW5"
};

let firestore = null;

try {
  const app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
} catch (error) {
  console.error("Firebase init failed. Check config values.", error);
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const saveFormData = async (collectionName, payload) => {
  if (!firestore) {
    throw new Error("Firestore not initialized");
  }

  await addDoc(collection(firestore, collectionName), {
    ...payload,
    createdAt: serverTimestamp(),
    source: "landing-page",
  });
};

const attachFormHandler = (formId, statusId, collectionName) => {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);

  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    showStatus(status, "Sending...", "info");

    try {
      await saveFormData(collectionName, payload);
      showStatus(status, "Message received! We’ll be in touch shortly.", "success");
      form.reset();
    } catch (error) {
      console.error(`Failed to submit ${collectionName}`, error);
      showStatus(
        status,
        "Something went wrong. Please try again or email us directly.",
        "error"
      );
    }
  });
};

attachFormHandler("waitlist-form", "waitlist-status", "waitlist");
attachFormHandler("contact-form", "contact-status", "contactMessages");

const initAnswerToggles = () => {
  const buttons = document.querySelectorAll("[data-answer-target]");
  buttons.forEach((button) => {
    const targetId = button.getAttribute("data-answer-target");
    const target = document.getElementById(targetId);
    if (!target) return;

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeAnswer(button, target);
      } else {
        openAnswer(button, target);
      }
    });
  });
};

initAnswerToggles();

const STATUS_TIMEOUT = 3500;

function openAnswer(button, panel) {
  panel.hidden = false;
  panel.classList.add("hero__answer--open");
  button.setAttribute("aria-expanded", "true");
  button.textContent = "Hide markscheme + AI explanation";

  const fullHeight = panel.scrollHeight;
  panel.style.maxHeight = `${fullHeight}px`;

  const onTransitionEnd = (event) => {
    if (event.target !== panel) return;
    panel.style.maxHeight = "none";
    panel.removeEventListener("transitionend", onTransitionEnd);
  };

  panel.addEventListener("transitionend", onTransitionEnd);
}

function closeAnswer(button, panel) {
  button.setAttribute("aria-expanded", "false");
  button.textContent = "Reveal markscheme + AI explanation";

  // if currently set to 'none', capture height first
  if (panel.style.maxHeight === "none" || panel.style.maxHeight === "") {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  }

  // allow browser to apply the height before shrinking
  requestAnimationFrame(() => {
    panel.classList.remove("hero__answer--open");
    panel.style.maxHeight = "0px";
  });

  const onTransitionEnd = (event) => {
    if (event.target !== panel) return;
    panel.hidden = true;
    panel.style.maxHeight = "";
    panel.removeEventListener("transitionend", onTransitionEnd);
  };

  panel.addEventListener("transitionend", onTransitionEnd);
}

function showStatus(element, message, type) {
  const types = ["success", "error", "info"];
  types.forEach((t) => element.classList.remove(`form-status--${t}`));
  element.classList.remove("form-status--show");

  // force reflow to restart animation
  void element.offsetWidth;

  element.textContent = message;
  element.classList.add("form-status--show");
  element.classList.add(`form-status--${type || "info"}`);

  if (element.dataset.timeoutId) {
    clearTimeout(Number(element.dataset.timeoutId));
  }

  const timeoutId = window.setTimeout(() => {
    element.classList.remove("form-status--show");
    element.classList.remove(`form-status--${type || "info"}`);
    element.textContent = "";
    delete element.dataset.timeoutId;
  }, STATUS_TIMEOUT);

  element.dataset.timeoutId = timeoutId;
}
