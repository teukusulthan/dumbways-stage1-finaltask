document.addEventListener("DOMContentLoaded", () => {
  initMobileDrawer();
});

/**
 * Initializes mobile drawer functionality:
 * - Handles opening/closing
 * - Disables background scroll
 * - Adds transitions and accessibility features
 */
function initMobileDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  const drawerContent = drawer.querySelector(".absolute.right-0");
  const backdrop = drawer.querySelector(".absolute.inset-0.bg-black");
  const openBtn = document.getElementById("mobile-menu-button");
  const closeBtn = document.getElementById("close-drawer");
  const drawerLinks = drawer.querySelectorAll("a");

  /**
   * Opens the mobile drawer with transition
   */
  function openDrawer() {
    drawer.classList.remove("invisible"); // Make drawer visible
    document.body.style.overflow = "hidden"; // Prevent background scroll

    requestAnimationFrame(() => {
      backdrop.classList.remove("opacity-0"); // Fade in backdrop
      drawerContent.classList.remove("translate-x-full"); // Slide drawer in
    });
  }

  /**
   * Closes the mobile drawer with transition
   */
  function closeDrawer() {
    backdrop.classList.add("opacity-0"); // Fade out backdrop
    drawerContent.classList.add("translate-x-full"); // Slide drawer out
    document.body.style.overflow = ""; // Restore scroll

    // Hide drawer after transition ends
    setTimeout(() => {
      drawer.classList.add("invisible");
    }, 300); // Matches Tailwind's default transition duration
  }

  // === Event Listeners ===

  // Open drawer when menu button is clicked
  openBtn?.addEventListener("click", openDrawer);

  // Close drawer when close button or backdrop is clicked
  closeBtn?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);

  // Close drawer on ESC key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Close drawer when any link inside it is clicked
  drawerLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}
