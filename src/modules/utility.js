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

export { createIcon, createSelectOption, getDisplayedCategory };
