const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const qrModal = document.querySelector("#app-qr-modal");
const qrOpeners = document.querySelectorAll(".qr-trigger");
const qrClosers = document.querySelectorAll(".qr-close, .qr-backdrop");
const feedbackModal = document.querySelector("#feedback-modal");
const feedbackOpeners = document.querySelectorAll(".feedback-trigger");
const feedbackClosers = document.querySelectorAll(".feedback-close, .feedback-backdrop");
const feedbackForm = document.querySelector(".feedback-form");
const feedbackStatus = document.querySelector(".feedback-status");

function setQrModal(open) {
  if (!qrModal) return;
  qrModal.classList.toggle("is-open", open);
  qrModal.setAttribute("aria-hidden", String(!open));
  syncModalLock();
}

function syncModalLock() {
  const qrOpen = qrModal?.classList.contains("is-open");
  const feedbackOpen = feedbackModal?.classList.contains("is-open");
  document.body.classList.toggle("modal-open", Boolean(qrOpen || feedbackOpen));
}

function setFeedbackModal(open) {
  if (!feedbackModal) return;
  feedbackModal.classList.toggle("is-open", open);
  feedbackModal.setAttribute("aria-hidden", String(!open));
  syncModalLock();
}

qrOpeners.forEach((button) => {
  button.addEventListener("click", () => setQrModal(true));
});

qrClosers.forEach((button) => {
  button.addEventListener("click", () => {
    setQrModal(false);
    syncModalLock();
  });
});

feedbackOpeners.forEach((button) => {
  button.addEventListener("click", () => setFeedbackModal(true));
});

feedbackClosers.forEach((button) => {
  button.addEventListener("click", () => setFeedbackModal(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setQrModal(false);
    setFeedbackModal(false);
    syncModalLock();
  }
});

if (feedbackForm && feedbackStatus) {
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    feedbackStatus.textContent = "已记录。正式上线时需要接入后端保存反馈内容和图片。";
  });
}

const coworkDownloadTrigger = document.querySelector(".cowork-download-trigger");
const coworkDownloadOptions = document.querySelector("#cowork-download-options");

if (coworkDownloadTrigger && coworkDownloadOptions) {
  coworkDownloadTrigger.addEventListener("click", () => {
    const isOpen = coworkDownloadOptions.classList.toggle("is-open");
    coworkDownloadTrigger.setAttribute("aria-expanded", String(isOpen));
    coworkDownloadOptions.setAttribute("aria-hidden", String(!isOpen));
  });
}

const homeSlides = document.querySelectorAll(".home-slide");
if (homeSlides.length > 1) {
  let activeIndex = 0;
  setInterval(() => {
    homeSlides[activeIndex].classList.remove("is-active");
    activeIndex = (activeIndex + 1) % homeSlides.length;
    homeSlides[activeIndex].classList.add("is-active");
  }, 2000);
}
