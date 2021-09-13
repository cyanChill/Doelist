import { createIcon, createSelectOption, getDisplayedCategory, isBtwTodayAndDate } from "./utility";
import { createTaskCard } from "./Tasks";
import { NavBar } from "./NavBar";
import { TaskList } from "./TasksList";
import { addDays, compareDesc, endOfToday } from "date-fns";

const Categories = (function () {
  const categoryList = JSON.parse(localStorage.getItem("categoryList")) || [
    "Inbox",
    "Today",
    "Upcoming",
    "Anytime",
    "Completed",
  ];

  function getCategoryListCopy() {
    return categoryList;
  }

  function addCategory(categoryName) {
    categoryList.push(categoryName);
    updateLocalStorage();
    CategoryDOM.addCategoryToDOM(categoryName);
  }

  function deleteCategory(categoryName) {
    const categoryIdx = categoryList.indexOf(categoryName);
    categoryList.splice(categoryIdx, 1);
    updateLocalStorage();
    /* Move tasks in deleted category to "Inbox" */
    TaskList.dealOrphanedTasks(categoryName);
    CategoryDOM.removeCategoryOption(categoryName);
  }

  function updateLocalStorage() {
    localStorage.setItem("categoryList", JSON.stringify(categoryList));
  }

  return { getCategoryListCopy, addCategory, deleteCategory };
})();

const CategoryDOM = (function () {
  const CategoryIcons = {
    Inbox: "fas fa-inbox icon",
    Today: "fas fa-star icon",
    Upcoming: "fas fa-calendar-alt icon",
    Anytime: "fas fa-layer-group icon",
    Completed: "fas fa-clipboard-check icon",
  };
  const DefaultCategories = ["Inbox", "Today", "Upcoming", "Anytime", "Completed"];

  const mainCategoryList = document.getElementById("main-categories");
  const customCategoryList = document.getElementById("custom-category-list");
  const categorySelectOptions = document.getElementById("category-select");
  const taskCategoryHeader = document.getElementById("task-category-header");
  const taskList = document.getElementById("task-list");
  const newTaskBtn = document.getElementById("add-task");

  /* DOM stuff for the categories */
  function addCategoryToDOM(categoryName) {
    const newCategory = createCategory(categoryName);

    DefaultCategories.includes(categoryName)
      ? mainCategoryList.appendChild(newCategory)
      : customCategoryList.appendChild(newCategory);

    /* Add element to option of category select list from form (disallow all default categories except for "Inbox") */
    if (!DefaultCategories.includes(categoryName) || categoryName === "Inbox") {
      const newOption = createSelectOption(categoryName);
      categorySelectOptions.appendChild(newOption);
    }
  }

  function createCategory(categoryName) {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");
    categoryDiv.dataset.category = categoryName;

    categoryDiv.appendChild(createCategoryLabel(categoryName));

    if (!DefaultCategories.includes(categoryName)) {
      const deleteCategoryBtn = createIcon("far fa-trash-alt icon");
      categoryDiv.appendChild(deleteCategoryBtn);

      deleteCategoryBtn.addEventListener("click", function () {
        categoryDiv.remove();
        Categories.deleteCategory(categoryName);

        // If we delete a category for a page we're currently on
        const currentPage = getDisplayedCategory();
        if (currentPage === categoryName) {
          displayTaskCategory("Inbox");
        }
      });
    }

    categoryDiv.addEventListener("click", function (e) {
      // Prevents displaying category that was just deleted
      if (e.target.classList.contains("category")) {
        displayTaskCategory(this.dataset.category);
        setSelected(this);
        NavBar.closeNavOnMobile();
      }
    });

    return categoryDiv;
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

  function reloadCustomCategories() {
    const selected = document.querySelector(".selected");
    categorySelectOptions.textContent = "";
    mainCategoryList.textContent = "";
    customCategoryList.textContent = "";
    Categories.getCategoryListCopy().forEach((categoryName) => {
      addCategoryToDOM(categoryName);
    });

    selected
      ? setSelected(selected)
      : setSelected(document.querySelector('[data-category="Inbox"]'));
  }

  function setCurrPageOption(task) {
    const currCat = getDisplayedCategory();
    !DefaultCategories.includes(currCat) || currCat === "Inbox"
      ? (categorySelectOptions.value = currCat)
      : (categorySelectOptions.value = task.categoryLocation);
  }

  function removeCategoryOption(categoryName) {
    const option = document.querySelector(`option[value="${categoryName}"]`);
    option.remove();
  }

  reloadCustomCategories();

  /* Section for displaying tasks belonging to a category */
  function displayTaskCategory(categoryName) {
    DefaultCategories.includes(categoryName) && categoryName !== "Inbox"
      ? newTaskBtn.classList.add("hidden")
      : newTaskBtn.classList.remove("hidden");

    updateTaskHeader(categoryName);
    taskList.textContent = "";

    const categoryTasks = filteredTasks(categoryName);

    categoryTasks.forEach((task) => {
      taskList.appendChild(createTaskCard(task));
    });
  }

  function filteredTasks(categoryName) {
    const tasksList = TaskList.getTaskListCopy();
    const rtnTasks = tasksList.filter((task) => {
      switch (categoryName) {
        case "Today":
          return isBtwTodayAndDate(task.dueDate) && !task.completedDate;
        case "Upcoming":
          return isBtwTodayAndDate(task.dueDate, addDays(endOfToday(), 3)) && !task.completedDate;
        case "Anytime":
          return !task.dueDate && !task.completedDate;
        case "Completed":
          return task.completedDate;
        default:
          return task.categoryLocation === categoryName && !task.completedDate;
      }
    });

    if (categoryName === "Completed") {
      rtnTasks.sort((a, b) => {
        return compareDesc(new Date(a.completedDate), new Date(b.completedDate));
      });
    }

    return rtnTasks;
  }

  function updateTaskHeader(categoryName) {
    taskCategoryHeader.textContent = "";
    taskCategoryHeader.appendChild(createCategoryLabel(categoryName));
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

  return { addCategoryToDOM, displayTaskCategory, removeCategoryOption, setCurrPageOption };
})();

export { CategoryDOM, Categories };
