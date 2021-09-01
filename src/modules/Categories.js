import { createIcon } from "./utility";
import { createTaskCard } from "./Tasks";
import { closeNavOnMobile } from "./NavBar";

const taskCategoryHeader = document.getElementById("task-category-header");
const taskList = document.getElementById("task-list");

const CategoryIcons = {
  Inbox: "fas fa-inbox icon",
  Today: "fas fa-star icon",
  Upcoming: "fas fa-calendar-alt icon",
  Anytime: "fas fa-layer-group icon",
  Completed: "fas fa-clipboard-check icon",
};

function displayCategory(categoryName, tasksList) {
  updateTaskHeader(categoryName);
  taskList.textContent = "";

  const categoryTasks = tasksList.filter((task) => {
    return task.categoryLocation === categoryName;
  });

  if (categoryName !== "Completed") {
    categoryTasks.forEach((task) => {
      taskList.appendChild(createTaskCard(task));
    });
  } else {
    categoryTasks.forEach((task) => {
      taskList.appendChild(createTaskCard(task));
    });
  }
}

function updateTaskHeader(categoryName) {
  taskCategoryHeader.textContent = "";
  taskCategoryHeader.appendChild(createCategoryLabel(categoryName));
}

function createCategoryLabel(categoryName) {
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("category-label");
  categoryDiv.appendChild(createIcon(CategoryIcons[categoryName] || "fas fa-list icon"));

  const categoryLabel = document.createElement("span");
  categoryLabel.textContent = categoryName;
  categoryDiv.appendChild(categoryLabel);

  return categoryDiv;
}

function setSelected(node) {
  unSelectCategories();
  node.classList.add("selected");
}

function unSelectCategories() {
  const categories = document.querySelectorAll(".category");
  categories.forEach((category) => {
    category.classList.remove("selected");
  });
}

function createCategory(categoryName) {
  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("category");
  categoryDiv.dataset.category = categoryName;

  categoryDiv.appendChild(createCategoryLabel(categoryName));
  categoryDiv.appendChild(createIcon("far fa-trash-alt icon"));

  categoryDiv.addEventListener("click", function () {
    displayCategory(this.dataset.category, []);
    setSelected(this);
    closeNavOnMobile();
  });
  return categoryDiv;
}

const Categories = (function () {
  const categoryList = JSON.parse(localStorage.getItem("categoryList")) || [
    "Inbox",
    "Today",
    "Upcoming",
    "Anytime",
    "Completed",
  ];

  function addCategory(categoryName) {
    console.log("category added");
    updateLocalStorage();
  }

  function deleteCategory(categoryName) {
    console.log("category added");
    updateLocalStorage();
  }

  function updateLocalStorage() {
    localStorage.setItem("categoryList", JSON.stringify(categpryList));
  }

  return { categoryList, addCategory, deleteCategory };
})();

const CategoryForm = (function () {
  
  console.log("");
})();

export { displayCategory, setSelected, createCategory };
