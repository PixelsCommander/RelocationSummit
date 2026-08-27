const DISMISS_STORAGE_KEY = "priceBannerSep15DismissedUntil";
const DISMISS_DURATION_MS = 3 * 24 * 60 * 60 * 1000;
const DISPLAY_WINDOW_MS = 15 * 24 * 60 * 60 * 1000;
const PRICE_INCREASE_DEADLINE = new Date(2026, 8, 15, 23, 0, 0, 0);

const wasRecentlyDismissed = (now) => {
  try {
    const dismissedUntil = Number(localStorage.getItem(DISMISS_STORAGE_KEY));
    return Number.isFinite(dismissedUntil) && dismissedUntil > now.getTime();
  } catch {
    return false;
  }
};

const formatTimeLeft = (milliseconds) => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value) => String(value).padStart(2, "0");

  return `${days} д ${pad(hours)} ч ${pad(minutes)} м ${pad(seconds)} с`;
};

const initializePriceBanner = () => {
  const banner = document.querySelector("[data-price-banner]");
  if (!banner) return;

  const now = new Date();
  const deadline = PRICE_INCREASE_DEADLINE;
  const timeLeft = deadline.getTime() - now.getTime();

  if (
    timeLeft <= 0 ||
    timeLeft > DISPLAY_WINDOW_MS ||
    wasRecentlyDismissed(now)
  ) {
    return;
  }

  const timerElement = banner.querySelector("[data-price-banner-timer]");
  const closeButton = banner.querySelector("[data-price-banner-close]");

  let timerInterval;

  const updateTimer = () => {
    const remaining = deadline.getTime() - Date.now();
    timerElement.textContent = formatTimeLeft(remaining);

    if (remaining <= 0) {
      banner.hidden = true;
      clearInterval(timerInterval);
    }
  };

  closeButton.addEventListener("click", () => {
    banner.hidden = true;
    clearInterval(timerInterval);

    try {
      localStorage.setItem(
        DISMISS_STORAGE_KEY,
        String(Date.now() + DISMISS_DURATION_MS)
      );
    } catch {
      // The banner still closes when storage is unavailable.
    }
  });

  banner.hidden = false;
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
};

export default initializePriceBanner;
