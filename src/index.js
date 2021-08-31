import { taskListHeight } from "./modules/TasksList";

const taskListDiv = document.getElementById("task-list");

taskListHeight();

/* Divider */

import { Task, createTaskCard } from "./modules/Tasks";
const dummyTask1 = Task("Test1", "This is a test", "low", "Inbox", "n/a");
const dummyTask2 = Task(
  "1234567890123456789012345",
  "This is another test",
  "medium",
  "Inbox",
  "8/10/2021, 11:59:59 PM"
);
const dummyTask3 = Task("Test3", "This is a final test", "high", "Inbox", "n/a");

const dummyTaskCard1 = createTaskCard(dummyTask1, { completed: false });
const dummyTaskCard2 = createTaskCard(dummyTask2, { completed: false });
const dummyTaskCard3 = createTaskCard(dummyTask3, { completed: false });

const dummyTask4 = Task(
  "Test4",
  "This is a test",
  "low",
  "Completed",
  "n/a",
  "8/10/2021, 11:59:59 PM"
);
const dummyTask5 = Task(
  "Test5",
  "This is another test",
  "medium",
  "Completed",
  "8/10/2021, 11:59:59 PM",
  "8/10/2021, 11:59:59 PM"
);
const dummyTask6 = Task(
  "1234567890123456789012345",
  "This is a final test",
  "high",
  "Completed",
  "n/a",
  "8/10/2021, 11:59:59 PM"
);

const dummyTaskCard4 = createTaskCard(dummyTask4, { completed: true });
const dummyTaskCard5 = createTaskCard(dummyTask5, { completed: true });
const dummyTaskCard6 = createTaskCard(dummyTask6, { completed: true });

taskListDiv.append(
  dummyTaskCard1,
  dummyTaskCard2,
  dummyTaskCard3,
  dummyTaskCard4,
  dummyTaskCard5,
  dummyTaskCard6
);

/* Task Title <= 25 characters */

import { displayCategory, setSelected } from "./modules/Categories";
import { closeNavOnMobile } from "./modules/NavBar";
const TaskList = [dummyTask1, dummyTask2, dummyTask3, dummyTask4, dummyTask5, dummyTask6];

displayCategory("Inbox", TaskList);

const defaultCategories = document.querySelectorAll("#main-categories .category");

defaultCategories.forEach((category) => {
  category.addEventListener("click", function () {
    displayCategory(this.dataset.category, TaskList);
    setSelected(this);
    closeNavOnMobile();
  });
});

import { createCategory } from "./modules/Categories";
const customCategoryList = document.getElementById("custom-category-list");

customCategoryList.appendChild(createCategory("Custom Category 1"));
customCategoryList.appendChild(createCategory("Custom Category 2"));
customCategoryList.appendChild(createCategory("Custom Category 3"));
customCategoryList.appendChild(createCategory("Custom Category 4"));
customCategoryList.appendChild(createCategory("Custom Category 5"));
