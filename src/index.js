import "./styles/Nav.css";
import "./styles/PageOverlay.css";
import "./styles/style.css";
import "./styles/TaskCard.css";
import "./styles/TasksSection.css";

import { CategoryDOM } from "./modules/Categories";
import { TaskList } from "./modules/TasksList";

const TaskListItems = TaskList.getTaskListCopy();

CategoryDOM.displayTaskCategory("Inbox", TaskListItems);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function () {
        console.log("Service worker registered!");
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}
