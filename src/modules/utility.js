import { format, compareAsc, isToday, isBefore, startOfToday } from "date-fns";

function createIcon(iconClass) {
  const icon = document.createElement("i");
  icon.classList = iconClass;
  return icon;
}

function createSelectOption(optName) {
  const option = document.createElement("option");
  option.value = optName;
  option.textContent = optName;

  return option;
}

function getDisplayedCategory() {
  const taskCategoryHeader = document.getElementById("task-category-header");
  return taskCategoryHeader.querySelector("span").textContent;
}

function getNiceTime(timeStr) {
  return format(new Date(timeStr), "Pp");
}

function isBtwTodayAndDate(inDate, dueDate) {
  if (!inDate || isBefore(new Date(inDate), startOfToday())) return false;
  if (!dueDate) return isToday(new Date(inDate));

  /* If we get 1, it means inDate is after dueDate */
  return compareAsc(new Date(inDate), new Date(dueDate)) === 1 ? false : true;
}

export { createIcon, createSelectOption, getDisplayedCategory, getNiceTime, isBtwTodayAndDate };
