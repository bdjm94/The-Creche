import axios from "axios";

import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASKS,
  TASKS_LOADING
} from "./types";

 // Creating a task
export const createTask = taskData => dispatch => {
  axios
    .post("/api/tasks/create", taskData)
    .then(res =>
      dispatch({
        type: CREATE_TASK,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};