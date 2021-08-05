import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT,
  PROJECT_LOADING,
  GET_PROJECTS,
  PROJECTS_LOADING
} from "../actions/types";

const initialState = {
  projects: [],
  project: [],
  projectLoading: false,
  projectsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };