export default function initializeOrganizersDialog() {
  const dialog = document.querySelector("[data-organizers-dialog]");
  const openButton = document.querySelector("[data-organizers-open]");
  const closeButton = dialog?.querySelector("[data-organizers-close]");

  if (!dialog || !openButton || !closeButton) return;

  const closeDialog = () => {
    dialog.close();
    document.body.classList.remove("has-open-dialog");
  };

  openButton.addEventListener("click", () => {
    dialog.showModal();
    document.body.classList.add("has-open-dialog");
  });

  closeButton.addEventListener("click", closeDialog);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("has-open-dialog");
  });
}
