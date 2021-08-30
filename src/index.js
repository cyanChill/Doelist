const navToggler = document.getElementById("nav-toggle");
const navTogglerLabel = document.getElementById("nav-toggle-label");
const navBar = document.getElementById("side-nav-bar");

navToggler.addEventListener("change", (e) => {
  navBar.classList.toggle("active");
  if (e.target.checked) {
    navTogglerLabel.innerHTML = '<i class="fas fa-times icon"></i>';
    fixDOMonNav();
  } else {
    navTogglerLabel.innerHTML = '<i class="fas fa-bars icon"></i>';
    unFixDOMonNav();
  }
});

function fixDOMonNav() {
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = "fixed";
}

function unFixDOMonNav() {
  const scrollY = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
}
