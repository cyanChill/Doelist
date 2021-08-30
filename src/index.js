const navToggler = document.getElementById("nav-toggle");
const navTogglerLabel = document.getElementById("nav-toggle-label");
const navBar = document.getElementById("side-nav-bar");
const taskContainer = document.getElementById("task-container");

navToggler.addEventListener("change", (e) => {
  navBar.classList.toggle("active");
  if (e.target.checked) {
    navTogglerLabel.innerHTML = '<i class="fas fa-times icon"></i>';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = "fixed";
  } else {
    navTogglerLabel.innerHTML = '<i class="fas fa-bars icon"></i>';
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0"));
  }
});
