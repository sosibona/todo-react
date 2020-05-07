import * as tasksGateway from "./taskGateway";
import { taskListSelector } from "./tasks.selectors";

export const TASK_LIST_RECIEVED = "TASK_LIST_RECIEVED";

export const taskListRecieved = taskList => {
  return {
    type: TASK_LIST_RECIEVED,
    payload: {
      taskList,
    }
  }
}

export const getTaskList = () => {
  return function (dispatch) {
    tasksGateway.fetchTasksList()
      .then(taskList => dispatch(taskListRecieved(taskList)));
  }
}

export const updateTask = (taskId) => {
  return function (dispatch, getState) {
    const tasks = getState();
    const task = taskListSelector(tasks).find((task) => task.id === taskId);
    const updatedTask = {
      ...task,
      done: !task.done,
    };
    tasksGateway.updateTask(taskId, updatedTask)
      .then(() => dispatch(getTaskList()));
  }
}

export const deleteTask = (taskId) => {
  return function (dispatch) {
    tasksGateway.deleteTask(taskId)
      .then(() => dispatch(getTaskList()));
  }
}

export const crateTask = (text) => {
  return function (dispatch) {
    const newTask = {
      text,
      done: false,
      createAt: new Date().toISOString(),
    };
    tasksGateway.createTask(newTask)
      .then(() => dispatch(getTaskList()));
  }
}