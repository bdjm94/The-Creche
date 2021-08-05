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

 // Getting tasks by project ID
export const getTasks = id => dispatch => {
  dispatch(setTasksLoading());
  axios
    .get(`/api/tasks/${id}`)
    .then(res =>
      dispatch({
        type: GET_TASKS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TASKS,
        payload: null
      })
    );
};