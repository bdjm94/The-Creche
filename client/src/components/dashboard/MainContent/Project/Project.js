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

    toggleModal = e => {
    this.setState({
      modal: !this.state.modal,
      edit: false,
      task: false,
      editTask: false
    });
  };

    toggleEditModal = (name, members, id, owner, e) => {
    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      id: id,
      owner: owner
    });
  };

    toggleTaskModal = e => {
    this.setState({
      modal: !this.state.modal,
      task: !this.state.task
    });
  };

    toggleEditTaskModal = (taskName, assignee, dateDue, id, e) => {
    this.setState({
      modal: !this.state.modal,
      editTask: !this.state.editTask,
      taskName: taskName,
      assignee: assignee,
      taskId: id,
      dateDue: dateDue
    });
  };