import { TASK_LIST_RECIEVED } from "./tasks.actions";


const initialState = {
  taskList: [],
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_LIST_RECIEVED: {
      return {
        ...state,
        taskList: action.payload.taskList,
      }
    }
    default:
      return state;
  }
}