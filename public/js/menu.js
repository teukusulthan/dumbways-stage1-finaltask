document.addEventListener("DOMContentLoaded", () => {
  initMobileDrawer();
});

// Mobile drawer functionality
function initMobileDrawer() {
  const drawer = document.getElementById("mobile-drawer");
  const drawerContent = drawer.querySelector(".absolute.right-0");
  const backdrop = drawer.querySelector(".absolute.inset-0.bg-black");
  const openButton = document.getElementById("mobile-menu-button");
  const closeButton = document.getElementById("close-drawer");

  function openDrawer() {
    drawer.classList.remove("invisible");
    document.body.style.overflow = "hidden"; // Prevent scrolling when drawer is open
    requestAnimationFrame(() => {
      backdrop.classList.remove("opacity-0");
      drawerContent.classList.remove("translate-x-full");
    });
  }

  function closeDrawer() {
    backdrop.classList.add("opacity-0");
    drawerContent.classList.add("translate-x-full");
    document.body.style.overflow = ""; // Re-enable scrolling
    setTimeout(() => {
      drawer.classList.add("invisible");
    }, 300);
  }

  // Event Listeners
  openButton?.addEventListener("click", openDrawer);
  closeButton?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);

  // Close drawer when pressing escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Close drawer when clicking navigation links
  const drawerLinks = drawer.querySelectorAll("a");
  drawerLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}
