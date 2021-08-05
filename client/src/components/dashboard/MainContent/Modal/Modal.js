import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createProject,
  updateProject,
  deleteProject
} from "../../../../actions/projectsActions";

import {
  createTask,
  deleteTask,
  updateTask
} from "../../../../actions/taskActions";

import moment from "moment";

import "./Modal.scss";

class Modal extends Component {
  state = {
    projectName: "",
    members: [{ name: "", email: "" }],
    taskName: "",
    assignee: "",
    monthDue: "",
    dayDue: "",
    taskId: ""
  };