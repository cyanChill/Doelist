import { createIcon } from "./utility";

/* Creates a task object */
const Task = (taskName, taskDescription, priority, project, dueDate, completedDate = "") => {
  return { taskName, taskDescription, priority, project, dueDate, completedDate };
};

/* Create Task Card (Uncompleted or Completed) */
function createTaskCard(taskObj, config) {
  const { taskName, taskDescription, priority, project, dueDate, completedDate } = taskObj;

  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  const taskInfo = document.createElement("div");
  taskInfo.classList.add("task-info");
  taskCard.appendChild(taskInfo);

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task-header");
  taskInfo.appendChild(taskHeader);

  const checkDiv = document.createElement("div");
  checkDiv.classList.add("checkbox-div");
  taskHeader.appendChild(checkDiv);

  if (!config.completed) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkDiv.appendChild(checkbox);
  }

  const taskTitle = document.createElement("p");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = taskName;
  checkDiv.appendChild(taskTitle);

  if (!config.completed) {
    const taskOptions = document.createElement("section");
    taskHeader.appendChild(taskOptions);
    taskOptions.appendChild(createIcon(`fas fa-flag icon ${priority}`));
    taskOptions.appendChild(createIcon("far fa-edit icon"));
  }

  const taskShelf = document.createElement("div");
  taskShelf.classList.add("task-shelf");
  taskInfo.appendChild(taskShelf);

  const taskDescrip = document.createElement("div");
  taskDescrip.classList.add("task-description");
  taskDescrip.textContent = taskDescription;
  taskShelf.appendChild(taskDescrip);

  const taskStats = document.createElement("div");
  taskStats.classList.add("task-stats");
  taskShelf.appendChild(taskStats);

  const topStats = document.createElement("div");
  taskStats.appendChild(topStats);

  const bottomStats = document.createElement("div");
  taskStats.appendChild(bottomStats);

  const priorityStat = document.createElement("p");
  priorityStat.innerHTML = `Priority: <span class="unfocus-text">${priority}</span>`;
  topStats.appendChild(priorityStat);

  const dueDateStat = document.createElement("p");
  dueDateStat.innerHTML = `Due Date: <span class="unfocus-text">${dueDate}</span>`;
  bottomStats.appendChild(dueDateStat);

  if (config.completed) {
    const projectStat = document.createElement("p");
    projectStat.innerHTML = `Project: <span class="unfocus-text">${project}</span>`;
    topStats.appendChild(projectStat);

    const completedDateStat = document.createElement("p");
    completedDateStat.innerHTML = `Completed: <span class="unfocus-text">${completedDate}</span>`;
    bottomStats.appendChild(completedDateStat);
  }

  if (!config.completed) {
    taskCard.addEventListener("click", (e) => {
      if ([...e.target.classList].includes("task-card")) {
        if (![...taskShelf.classList].includes("show")) {
          taskShelf.style.maxHeight = `${taskShelf.scrollHeight}px`;
        } else {
          taskShelf.style.maxHeight = 0;
        }

        taskShelf.classList.toggle("show");
      }
    });
  } else {
    taskCard.classList.add("completed");
    taskShelf.classList.add("completed");
  }

  return taskCard;
}

export { Task, createTaskCard };
