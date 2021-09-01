import { TaskListDOM } from "./modules/TasksList";

const taskListDiv = document.getElementById("task-list");

TaskListDOM.taskListHeight();

/* Divider */

import { Task } from "./modules/Tasks";
const dummyTask1 = Task("Test1", "This is a test", "low", "Inbox", "n/a");
const dummyTask4 = Task(
  "Test4",
  "This is a test",
  "low",
  "Completed",
  "n/a",
  "8/10/2021, 11:59:59 PM"
);

/* Task Title <= 25 characters */

import { TaskList } from "./modules/TasksList";

const TaskListItems = TaskList.taskList;

const testAdd = document.getElementById("add-task");

testAdd.addEventListener("click", () => {
  TaskList.addTask(dummyTask1);
  TaskList.addTask(dummyTask4);
});

/* Older stuff below */

import { displayCategory, setSelected } from "./modules/Categories";
import { closeNavOnMobile } from "./modules/NavBar";

displayCategory("Inbox", TaskListItems);

const defaultCategories = document.querySelectorAll("#main-categories .category");

defaultCategories.forEach((category) => {
  category.addEventListener("click", function () {
    displayCategory(this.dataset.category, TaskListItems);
    setSelected(this);
    closeNavOnMobile();
  });
});

import { createCategory } from "./modules/Categories";
const customCategoryList = document.getElementById("custom-category-list");

/* Limit Category Names to 17 Characters */
customCategoryList.appendChild(createCategory("Custom Category 1"));
customCategoryList.appendChild(createCategory("Custom Category 2"));
customCategoryList.appendChild(createCategory("Custom Category 3"));
customCategoryList.appendChild(createCategory("Custom Category 4"));
customCategoryList.appendChild(createCategory("Custom Category 5555"));
