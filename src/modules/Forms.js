const Forms = (function () {
  const overlayBKG = document.querySelector(".overlay-bkg");
  const addCategoryFormDiv = document.getElementById("add-category");
  const addCategoryFormElement = addCategoryFormDiv.querySelector("form");
  const taskFormDiv = document.getElementById("add-edit-task");
  const taskFormElement = taskFormDiv.querySelector("form");
  const exitFormButtons = document.querySelectorAll(".overlay-form span.close-form");
  const newCategoryBtn = document.getElementById("new-category");
  const newTaskBtn = document.getElementById("add-task");

  exitFormButtons.forEach((btn) => {
    btn.addEventListener("click", hideForms);
  });

  newCategoryBtn.addEventListener("click", showCategoryForm);
  newTaskBtn.addEventListener("click", showTaskForm);

  function showCategoryForm() {
    formScreenEnter();
    addCategoryFormDiv.classList.remove("hidden");
    // Listen to if we click outside the form (to close "add form" screen)
    document.addEventListener("click", exitForm);
  }

  function showTaskForm() {
    formScreenEnter();
    taskFormDiv.classList.remove("hidden");
    // Listen to if we click outside the form (to close "add form" screen)
    document.addEventListener("click", exitForm);
  }

  function formScreenEnter() {
    overlayBKG.classList.add("enter");
    setTimeout(
      () => overlayBKG.classList.contains("enter") && overlayBKG.classList.add("active"),
      150
    );
  }

  function hideForms() {
    document.removeEventListener("click", exitForm);
    overlayBKG.classList = "overlay-bkg";

    addCategoryFormDiv.classList.add("hidden");
    addCategoryFormElement.reset();

    taskFormDiv.classList.add("hidden");
    taskFormElement.reset();
  }

  function exitForm(e) {
    if (e.target.dataset.hasOwnProperty("outside")) {
      hideForms();
    }
  }

  return {};
})();

export { Forms };
