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

    /* 
      Only add task to DOM if the task belongs to the current category displayed on the DOM - can figure it out by finding the current DOM element with the "selected" class 
    */
    /* 
      Make the following a function in TaskDOM? since we're doing querying n stuff
    */
    const currCategory = document.querySelector("#task-category-header .category-label span");
    if (currCategory.textContent === task.categoryLocation) {
      TaskListDOM.addToList(task);
    }
  }

  function updateTask(origTask, newTask, taskCard) {
    const taskIdx = taskList.indexOf(origTask);
    if (taskIdx === -1) return;
    taskList.splice(taskIdx, 1, newTask);
    updateLocalStorage();

    /* If we accept a taskCard, update that card - otherwise add the current task to the "Inbox" page if we're currently on it */
    if (taskCard) {
      TaskListDOM.updateList(taskCard, newTask);
    } else if (getDisplayedCategory() === "Inbox") {
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
    console.log("updating task in DOM");
    taskCard.querySelector(".task-title").textContent = task.taskName;
    taskCard.querySelector(".task-description").textContent = task.taskDescription;
    taskCard.querySelector(".priority-level span").textContent = task.priority;
    taskCard.querySelector(".fa-flag").classList = `fas fa-flag icon ${task.priority}`;
    taskCard.querySelector(".due-date span").textContent = task.dueDate;

    /* We moved this task to a different category */
    if (getDisplayedCategory() !== task.categoryLocation) {
      taskCard.remove();
    }
  }

  taskListHeight();

  return { taskListHeight, addToList, updateList };
})();

export { TaskList, TaskListDOM };
