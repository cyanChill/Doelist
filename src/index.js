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
