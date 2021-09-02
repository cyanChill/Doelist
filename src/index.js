import { CategoryDOM } from "./modules/Categories";
import { TaskList } from "./modules/TasksList";

const TaskListItems = TaskList.getTaskListCopy();

CategoryDOM.displayTaskCategory("Inbox", TaskListItems);
