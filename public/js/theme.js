// Run the script after the HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get both theme toggle buttons (desktop and mobile)
  const switcher = document.getElementById("theme-switcher");
  const mobileSwitcher = document.getElementById("mobile-theme-switcher");

  // Retrieve the saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");

  // Apply dark theme by default if:
  // - No theme is saved yet (first-time visit)
  // - Or the saved theme is explicitly set to "dark"
  if (savedTheme === "dark" || savedTheme === null) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark"); // Persist the default theme
  }

  // Function to toggle between dark and light theme
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // Attach the toggle function to both switchers if they exist
  if (switcher) switcher.addEventListener("click", toggleTheme);
  if (mobileSwitcher) mobileSwitcher.addEventListener("click", toggleTheme);
});
