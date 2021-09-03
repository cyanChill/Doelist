import { createTaskCard } from "./Tasks";
import { getDisplayedCategory } from "./utility";

const TaskList = (function () {
  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];

  function getTaskListCopy() {
    return taskList;
  }

  function addTask(task) {
    taskList.push(task);
    updateLocalStorage();

    // Add task to DOM if task belongs to category currently being displayed
    if (getDisplayedCategory() === task.categoryLocation) TaskListDOM.addToList(task);
  }

  function updateTask(origTask, newTask, taskCard) {
    const taskIdx = taskList.indexOf(origTask);
    if (taskIdx === -1) return;
    taskList.splice(taskIdx, 1, newTask);
    updateLocalStorage();

    /* 
      If we accept a taskCard, update that card - otherwise add the current 
      task to the "Inbox" page if we're currently on it 
    */
    if (taskCard) {
      TaskListDOM.updateList(taskCard, newTask);
    } else if (getDisplayedCategory() === "Inbox" && !newTask.completedDate) {
      TaskListDOM.addToList(newTask);
    }
  }

  function removeTask(task) {
    const taskIdx = taskList.indexOf(task);
    if (taskIdx === -1) return;
    taskList.splice(taskIdx, 1);
    updateLocalStorage();
  }

  function dealOrphanedTasks(categoryName) {
    const orphanedTasks = taskList.filter((task) => task.categoryLocation === categoryName);
    orphanedTasks.forEach((task) => {
      updateTask(task, { ...task, categoryLocation: "Inbox" });
    });
  }

  function updateLocalStorage() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }

  return { getTaskListCopy, addTask, updateTask, removeTask, dealOrphanedTasks };
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

  function updateList(taskCard, task) {
    const newCard = createTaskCard(task);

    // If we moved this task to a different category
    getDisplayedCategory() !== task.categoryLocation
      ? taskCard.remove()
      : taskListDiv.replaceChild(newCard, taskCard);
  }

  taskListHeight();

  return { taskListHeight, addToList, updateList };
})();

export { TaskList, TaskListDOM };
