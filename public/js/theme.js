// Run the script after the HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get both theme toggle buttons (desktop and mobile)
  const switcher = document.getElementById("theme-switcher");
  const mobileSwitcher = document.getElementById("mobile-theme-switcher");

  // Retrieve the saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");

  // Apply the dark theme by default if:
  // - No theme is saved yet (first-time visitor)
  // - Or the saved theme is explicitly "dark"
  if (savedTheme === "dark" || savedTheme === null) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark"); // Save default dark theme if not already saved
  }

  // Function to toggle between dark and light theme
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark"); // Toggle dark mode class on <html>
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light"); // Save user's preference
  };

  // Attach toggle function to both buttons (if they exist in the DOM)
  if (switcher) switcher.addEventListener("click", toggleTheme);
  if (mobileSwitcher) mobileSwitcher.addEventListener("click", toggleTheme);
});
