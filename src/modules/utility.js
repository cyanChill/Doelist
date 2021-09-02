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

export { createIcon, createSelectOption };
