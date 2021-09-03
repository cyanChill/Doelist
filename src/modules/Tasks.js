import { Forms } from "./Forms";
import { TaskList } from "./TasksList";
import { getNiceTime } from "./utility";

// Creates a task object
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

// Create Task Card (Uncompleted or Completed)
function createTaskCard(taskObj) {
  const { taskName, taskDescription, priority, categoryLocation, dueDate, completedDate } = taskObj;
  const isCompleted = !!completedDate;

  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  taskCard.innerHTML = `
    <div class="task-header">
      <div class="checkbox-div">
        <input type="checkbox">
        <p class="task-title"></p>
      </div>
      <section>
        ${
          !isCompleted
            ? `<i class="fas fa-flag icon ${priority}"></i>
               <i class="far fa-edit icon"></i>`
            : ""
        }
        <i class="far fa-trash-alt icon"></i>
      </section>
    </div>
    <div class="task-shelf">
        <div class="task-description"></div>
        <div class="task-stats">
          <div>
            <p>
              Priority: 
              <span class="unfocus-text">${priority}</span>
            </p>
            ${
              isCompleted
                ? `<p>
                  Category: 
                  <span class="unfocus-text tc-category-field"></span>
                </p>`
                : ""
            }
          </div>
          <div>
            <p>
              Due Date: 
              <span class="unfocus-text"> ${dueDate ? getNiceTime(dueDate) : "n/a"}</span>
            </p>
            ${
              isCompleted
                ? `<p>
                  Completed: 
                  <span class="unfocus-text"> ${getNiceTime(completedDate)}</span>
                </p>`
                : ""
            }
          </div>
        </div>
    </div>
  `;

  // Delete Task Event
  taskCard.querySelector(".fa-trash-alt").addEventListener("click", function () {
    taskCard.remove();
    TaskList.removeTask(taskObj);
  });

  // Show Shelf Event
  taskCard.addEventListener("click", (e) => {
    const taskShelf = taskCard.querySelector(".task-shelf");
    if ([...e.target.classList].includes("task-card")) {
      if (![...taskShelf.classList].includes("show")) {
        taskShelf.style.maxHeight = `${taskShelf.scrollHeight}px`;
      } else {
        taskShelf.style.maxHeight = 0;
      }
      taskShelf.classList.toggle("show");
    }
  });

  if (!isCompleted) {
    // Complete Task Event
    taskCard.querySelector('input[type="checkbox"]').addEventListener("change", function () {
      const completedTask = {
        ...taskObj,
        completedDate: new Date(),
      };
      TaskList.updateTask(taskObj, completedTask);
      taskCard.remove();
    });

    // Edit Task Event
    taskCard.querySelector(".fa-edit").addEventListener("click", () => {
      Forms.displayUpdateForm(taskObj, taskCard);
    });
  } else {
    taskCard.querySelector(".tc-category-field").textContent = categoryLocation;
  }

  taskCard.querySelector(".task-title").textContent = taskName;
  taskCard.querySelector(".task-description").textContent = taskDescription;

  return taskCard;
}

export { Task, createTaskCard };
