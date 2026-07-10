window.addEventListener("DOMContentLoaded", () => {
  const frame = document.getElementById("toolFrame");
  const navButtons = Array.from(document.querySelectorAll(".nav-btn[data-target]"));

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      navButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      frame.src = button.dataset.target;
    });
  });
});