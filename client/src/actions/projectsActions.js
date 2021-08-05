import axios from "axios";

import {
    CREATE_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    GET_PROJECT,
    PROJECT_LOADING,
    GET_PROJECTS,
    PROJECTS_LOADING
  } from "./types";

  // Creating project
export const createProject = projectData => dispatch => {
  axios
    .post("/api/projects/create", projectData)
    .then(res =>
      dispatch({
        type: CREATE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};