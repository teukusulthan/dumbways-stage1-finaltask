// Run the script after the HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get both theme toggle buttons
  const switcher = document.getElementById("theme-switcher");
  const mobileSwitcher = document.getElementById("mobile-theme-switcher");

  // If user previously chose dark mode, apply it on page load
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }

  // Function to toggle theme and save preference
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // Add event listeners to both buttons if they exist
  if (switcher) switcher.addEventListener("click", toggleTheme);
  if (mobileSwitcher) mobileSwitcher.addEventListener("click", toggleTheme);
});
