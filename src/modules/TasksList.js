import { createTaskCard } from "./Tasks";

const TaskList = (function () {
  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

  function addTask(task) {
    taskList.push(task);
    updateLocalStorage();

    /* Only add task to DOM if the task belongs to the current category displayed on the DOM - can figure it out by finding the current DOM element with the "selected" class */
    TaskListDOM.addToList(task);
  }

  function updateTask(origTask, newTask) {
    const taskIdx = taskList.indexOf(origTask);
    if (taskIdx === -1) return;
    taskList.splice(taskIdx, 1, newTask);
    updateLocalStorage();

    /* Function to update page if updated item belongs to current page category - search dom for that element and update it from page instead of reloading contents */
  }

  function removeTask(task) {
    const taskIdx = taskList.indexOf(task);
    if (taskIdx === -1) return;
    taskList.splice(taskIdx, 1);
    updateLocalStorage();

    /* Function to update page if deleted item belongs to current page category - search dom for that element and delete it from page instead of reloading contents */
  }

  function updateLocalStorage() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }

  return { taskList, addTask, updateTask, removeTask };
})();

const TaskListDOM = (function () {
  const header = document.getElementById("header");
  const taskCategoryHeader = document.getElementById("task-category-header");
  const taskListDiv = document.getElementById("task-list");

  function taskListHeight() {
    const offsetHeight = header.offsetHeight + taskCategoryHeader.offsetHeight;
    taskListDiv.style.height = `max(3rem, calc(100vh - ${offsetHeight}px - 3rem))`;
  }

  function addToList(task) {
    const newTask = createTaskCard(task);
    taskListDiv.appendChild(newTask);
  }

  function removeFromList() {
    console.log("removing item");
    /* Do it like how we did it with the library app - when we click the edit button which, it will log the current element as a global variable
    (it'll find the parent element [the task card] and save it in an object for example) */
  }

  return { taskListHeight, addToList };
})();

export { TaskList, TaskListDOM };