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

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        projectName: nextProps.name,
        members: nextProps.members
      });
    } else if (nextProps.editTask) {
      this.setState({
        taskName: nextProps.taskName
      });
    }
  }

    onChange = e => {
    if (["name", "email"].includes(e.target.name)) {
      let members = [...this.state.members];
      members[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ members });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

    addMember = e => {
    this.setState(prevState => ({
      members: [...prevState.members, { name: "", email: "" }]
    }));
  };

    deleteMember = index => {
    let array = [...this.state.members];
    array.splice(index, 1);
    this.setState({ members: array });
  };

    createProject = () => {
    let project = {
      projectName: this.state.projectName,
      members: this.state.members
    };

    this.props.createProject(project);
    this.onClose();
  };

    updateProject = async id => {
    let project = {
      id: this.props.id,
      projectName: this.state.projectName,
      members: this.state.members
    };

    await this.props.updateProject(project);

    this.onClose();
    window.location.reload();
  };

    deleteProject = id => {
    this.props.deleteProject(id, this.props.history);
    this.onClose();
  };

    deleteTask = id => {
    this.props.deleteTask(id);
    this.onClose();
  };

    onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      projectName: "",
      taskName: "",
      assignee: "",
      monthDue: "",
      dayDue: "",
      members: [{ name: "", email: "" }]
    });
  };

    onSelectChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };