import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  TASKS_LOADING
} from "../actions/types";

const initialState = {
  tasks: [],
  tasksLoading: false
};