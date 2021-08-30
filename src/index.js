const navToggler = document.getElementById("nav-toggle");
const navTogglerLabel = document.getElementById("nav-toggle-label");
const navBar = document.getElementById("side-nav-bar");
const header = document.getElementById("header");
const taskHeader = document.getElementById("task-header");
const taskList = document.getElementById("task-list");

navToggler.addEventListener("change", (e) => {
  changeNavVis();
});

function changeNavVis() {
  if (navToggler.checked) {
    navTogglerLabel.innerHTML = '<i class="fas fa-times icon"></i>';
  } else {
    navTogglerLabel.innerHTML = '<i class="fas fa-bars icon"></i>';
  }
  navBar.classList.toggle("active");
}

function todosListHeight() {
  const offsetHeight = header.offsetHeight + taskHeader.offsetHeight;
  taskList.style.height = `max(3rem, calc(100vh - ${offsetHeight}px - 3rem))`;
}

let prevWidth = window.innerWidth;

window.addEventListener("resize", () => {
  todosListHeight();
  if (window.innerWidth > 725 && window.innerWidth < 775) {
    if (
      (window.innerWidth <= 750 && prevWidth > window.innerWidth && navToggler.checked) ||
      (window.innerWidth >= 750 && prevWidth < window.innerWidth && !navToggler.checked)
    ) {
      navToggler.checked = !navToggler.checked;
      changeNavVis();
    }
  }
  prevWidth = window.innerWidth;
});

todosListHeight();
