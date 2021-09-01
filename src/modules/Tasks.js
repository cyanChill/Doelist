import { createIcon } from "./utility";

/* Creates a task object */
const Task = (
  taskName,
  taskDescription,
  priority,
  categoryLocation,
  dueDate,
  completedDate = ""
) => {
  return { taskName, taskDescription, priority, categoryLocation, dueDate, completedDate };
};

const convertToTask = (obj) => {
  return Task(
    obj.taskName,
    obj.taskDescripion,
    obj.priority,
    obj.categoryLocation,
    obj.dueDate,
    obj.completedDate
  );
};

/* Create Task Card (Uncompleted or Completed) */
function createTaskCard(taskObj) {
  const { taskName, taskDescription, priority, categoryLocation, dueDate, completedDate } = taskObj;
  const isCompleted = categoryLocation === "Completed";

  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  const taskHeader = document.createElement("div");
  taskHeader.classList.add("task-header");
  taskCard.appendChild(taskHeader);

  const checkDiv = document.createElement("div");
  checkDiv.classList.add("checkbox-div");
  taskHeader.appendChild(checkDiv);

  if (!isCompleted) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkDiv.appendChild(checkbox);
  }

  const taskTitle = document.createElement("p");
  taskTitle.classList.add("task-title");
  taskTitle.textContent = taskName;
  checkDiv.appendChild(taskTitle);

  if (!isCompleted) {
    const taskOptions = document.createElement("section");
    taskHeader.appendChild(taskOptions);
    taskOptions.appendChild(createIcon(`fas fa-flag icon ${priority}`));

    let editBtn = createIcon("far fa-edit icon");
    taskOptions.appendChild(editBtn);

    editBtn.addEventListener("click", () => {
      console.log("clicked edit button & save DOM element into an object");
    });
  }

  const taskShelf = document.createElement("div");
  taskShelf.classList.add("task-shelf");
  taskCard.appendChild(taskShelf);

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

  if (isCompleted) {
    const categoryStat = document.createElement("p");
    categoryStat.innerHTML = `Category: <span class="unfocus-text">${categoryLocation}</span>`;
    topStats.appendChild(categoryStat);

    const completedDateStat = document.createElement("p");
    completedDateStat.innerHTML = `Completed: <span class="unfocus-text">${completedDate}</span>`;
    bottomStats.appendChild(completedDateStat);
  }

  if (!isCompleted) {
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

export { Task, convertToTask, createTaskCard };