// Initialize all modules after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  import("./nav.js");
  import("./sticky-header.js");
  import("./carousels.js");
  import("./price-banner.js").then(({ default: initializePriceBanner }) => {
    initializePriceBanner();
  });
  import("./organizers-dialog.js").then(({ default: initializeOrganizersDialog }) => {
    initializeOrganizersDialog();
  });
});

const observer = new MutationObserver(() => {
  const found = Array.from(document.querySelectorAll("*")).some(
    (el) =>
      el.childNodes.length === 1 &&
      el.childNodes[0].nodeType === Node.TEXT_NODE &&
      el.childNodes[0].textContent.trim() === "Subscribed successfully"
  );
  if (found) {
    gtag("event", "newsletter_signup");
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
