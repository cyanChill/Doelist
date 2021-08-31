const header = document.getElementById("header");
const taskHeader = document.getElementById("task-header");
const taskListDiv = document.getElementById("task-list");

function taskListHeight() {
  const offsetHeight = header.offsetHeight + taskHeader.offsetHeight;
  taskListDiv.style.height = `max(3rem, calc(100vh - ${offsetHeight}px - 3rem))`;
}

/* 
  Make a "TaskList" object to keep track of all the tasks - update local storage when we add/update/remove an Task
*/

const TaskList = () => {
  let taskList = [];

  const addTask = () => {};

  const updateTask = () => {};

  const removeTask = () => {};

  return { taskList, addTask, updateTask, removeTask };
};

export { taskListHeight };
