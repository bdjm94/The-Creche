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

 // Updating project
export const updateProject = projectData => dispatch => {
  axios
    .patch("/api/projects/update", projectData)
    .then(res =>
      dispatch({
        type: UPDATE_PROJECT,
         payload: res.data
      })
    )
    .catch(err => console.log(err));
};

 // Deleting project
export const deleteProject = (id, history) => dispatch => {
  axios
    .delete(`/api/projects/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      })
    )
    .then(res => history.push("/dashboard"))
    .catch(err => console.log(err));
};

// Getting specific project by ID
export const getProject = id => dispatch => {
  dispatch(setProjectLoading());
  axios
    .get(`/api/projects/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROJECT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECT,
        payload: null
      })
    );
};

// Getting projects for a specific user
export const getProjects = () => dispatch => {
  dispatch(setProjectsLoading());
  axios
    .get("/api/projects")
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROJECTS,
        payload: null
      })
    );
};

// Project loading
export const setProjectLoading = () => {
  return {
    type: PROJECT_LOADING
  };
};

// Projects loading
export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING
  };
};