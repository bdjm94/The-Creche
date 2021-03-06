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

 // Deleting Tasks
export const deleteTask = id => dispatch => {
  axios
    .delete(`/api/tasks/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    )
    .catch(err => console.log(err));
};

 // Updating Tasks
export const updateTask = taskData => dispatch => {
  axios
    .patch("/api/tasks/update", taskData)
    .then(res =>
      dispatch({
        type: UPDATE_TASK,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Tasks loading
export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING
  };
};