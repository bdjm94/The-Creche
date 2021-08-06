import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject } from "../../../../actions/projectsActions";
import { getTasks, deleteTask } from "../../../../actions/taskActions";

import Loading from "../../../common/LoadingIcon";
import Modal from "../Modal/Modal";

import "../MainContent.scss";
import "./Project.scss";

class Project extends Component {
    state = {
      modal: false,
      edit: false,
      editTask: false,
      task: false,
      name: "",
      members: [],
      id: "",
      owner: {},
      tasks: [],
      date: "",
      taskName: "",
      assignee: "",
      taskId: "",
      dateDue: ""
    };