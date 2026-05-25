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

function setQrModal(open) {
  if (!qrModal) return;
  qrModal.classList.toggle("is-open", open);
  qrModal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("modal-open", open);
}

qrOpeners.forEach((button) => {
  button.addEventListener("click", () => setQrModal(true));
});

qrClosers.forEach((button) => {
  button.addEventListener("click", () => setQrModal(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setQrModal(false);
});

const coworkDownloadTrigger = document.querySelector(".cowork-download-trigger");
const coworkDownloadOptions = document.querySelector("#cowork-download-options");

if (coworkDownloadTrigger && coworkDownloadOptions) {
  coworkDownloadTrigger.addEventListener("click", () => {
    const isOpen = coworkDownloadOptions.classList.toggle("is-open");
    coworkDownloadTrigger.setAttribute("aria-expanded", String(isOpen));
    coworkDownloadOptions.setAttribute("aria-hidden", String(!isOpen));
  });
}
