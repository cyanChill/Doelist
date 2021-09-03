import { Categories } from "./Categories";
import { TaskList } from "./TasksList";
import { Task } from "./Tasks";
import { CategoryDOM } from "./Categories";

const Forms = (function () {
  const overlayBKG = document.querySelector(".overlay-bkg");

  const addCategoryFormDiv = document.getElementById("add-category");
  const addCategoryFormElement = addCategoryFormDiv.querySelector("form");
  const categoryErrorField = addCategoryFormDiv.querySelector(".errorField");

  const taskFormDiv = document.getElementById("add-edit-task");
  const taskFormElement = taskFormDiv.querySelector("form");
  const taskErrorField = taskFormDiv.querySelector(".errorField");
  const addUpdateTaskBtn = taskFormElement.querySelector('input[type="submit"]');

  const exitFormButtons = document.querySelectorAll(".overlay-form span.close-form");
  const newCategoryBtn = document.getElementById("new-category");
  const newTaskBtn = document.getElementById("add-task");

  let updTaskComponents = "";

  exitFormButtons.forEach((btn) => {
    btn.addEventListener("click", hideForms);
  });

  newCategoryBtn.addEventListener("click", () => {
    displayForm("categoryForm");
  });
  newTaskBtn.addEventListener("click", () => {
    displayForm("add-editForm");
  });

  document.addEventListener("submit", handleSubmit);

  function displayFormError(msg) {
    categoryErrorField.textContent = msg;
    taskErrorField.textContent = msg;
  }

  function clearFormError() {
    categoryErrorField.textContent = "";
    taskErrorField.textContent = "";
  }

  function displayForm(formName, task = "") {
    formScreenEnter();
    if (formName === "categoryForm") {
      addCategoryFormDiv.classList.remove("hidden");
    } else if (formName === "add-editForm") {
      CategoryDOM.setCurrPageOption(task);
      taskFormDiv.classList.remove("hidden");
    }
    // Listen to if we click outside the form (to close "add form" screen)
    document.addEventListener("click", exitForm);
  }

  function displayUpdateForm(task, taskCard) {
    updTaskComponents = { task, taskCard };
    // Populate form fields
    taskFormElement["task-name"].value = task.taskName;
    taskFormElement["task-description"].value = task.taskDescription;
    taskFormElement["due-date"].value = task.dueDate;
    taskFormElement["priority-select"].value = task.priority;
    taskFormElement["category-select"].value = task.categoryLocaiton;

    addUpdateTaskBtn.value = "Update Task";
    displayForm("add-editForm", task);
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
    addUpdateTaskBtn.value = "Add Task";
    updTaskComponents = "";
    clearFormError();
  }

  function exitForm(e) {
    if (e.target.dataset.hasOwnProperty("outside")) hideForms();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formName = e.target.dataset.form;

    if (formName === "add-category") {
      const categoryInVal = e.target["category-name"].value;

      Categories.getCategoryListCopy().includes(categoryInVal)
        ? displayFormError("Error: Task Category Already Exists")
        : Categories.addCategory(categoryInVal);
    } else if (formName === "add-edit-task") {
      const newTask = Task(
        e.target["task-name"].value,
        e.target["task-description"].value,
        e.target["priority-select"].value,
        e.target["category-select"].value,
        e.target["due-date"].value
      );

      updTaskComponents
        ? // If this isn't empty, means we updated a task
          TaskList.updateTask(updTaskComponents.task, newTask, updTaskComponents.taskCard)
        : TaskList.addTask(newTask);
    }
    hideForms();
  }

  return { displayUpdateForm };
})();

export { Forms };
