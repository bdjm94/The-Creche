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

    createTask = e => {
    e.preventDefault();

    let fullDate =
      this.state.monthDue +
      "-" +
      this.state.dayDue +
      "-" +
      Date().split(" ")[3];

    let momentDate = moment(fullDate, "MM-DD-YYYY")
      ._d.toString()
      .split(" ");

    let finalDate = momentDate[1] + " " + momentDate[2];

    const data = {
      project: this.props.projects.project._id,
      taskName: this.state.taskName,
      assignee: this.state.assignee,
      dateDue: finalDate
    };

    this.props.createTask(data);

    this.onClose();
  };

    updateTask = id => {
    let finalDate;

    let dates = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
        if (!this.state.monthDue && !this.state.dayDue) {
      finalDate = this.props.dateDue;
    } else if (
      this.props.dateDue &&
      this.props.dateDue !== "Date undefined" &&
      !this.state.monthDue &&
      this.state.dayDue
    ) {
      let fullDate =
        dates.indexOf(this.props.dateDue.split(" ")[0]) +
        1 +
        "-" +
        this.state.dayDue +
        "-" +
        Date().split(" ")[3];

      let momentDate = moment(fullDate, "MM-DD-YYYY")
        ._d.toString()
        .split(" ");

              finalDate = momentDate[1] + " " + momentDate[2];
    } else if (
      this.props.dateDue &&
      this.props.dateDue !== "Date undefined" &&
      !this.state.dayDue &&
      this.state.monthDue
    ) {
      let fullDate =
        this.state.monthDue +
        "-" +
        this.props.dateDue.split(" ")[1] +
        "-" +
        Date().split(" ")[3];

      let momentDate = moment(fullDate, "MM-DD-YYYY")
        ._d.toString()
        .split(" ");

      finalDate = momentDate[1] + " " + momentDate[2];
    } else {
      let fullDate =
        this.state.monthDue +
        "-" +
        this.state.dayDue +
        "-" +
        Date().split(" ")[3];

      let momentDate = moment(fullDate, "MM-DD-YYYY")
        ._d.toString()
        .split(" ");

      finalDate = momentDate[1] + " " + momentDate[2];
    }

        let task = {
      id: id,
      taskName: this.state.taskName,
      dateDue: finalDate,
      assignee: this.state.assignee || this.props.assignee
    };

    this.props.updateTask(task);

    this.onClose();
  };

    render() {
    if (!this.props.modal) {
      return null;
    }

    document.onkeyup = e => {
      if (e.keyCode === 27 && this.props.modal) {
        this.onClose();
      }
    };

        let { members } = this.state;

    // Create task modal
    if (this.props.task) {
      const { teamMembers } = this.props.projects.project;
      const { name, email } = this.props.auth.user;

            // Assign team member in dropdown in Modal
      let membersOptions = teamMembers.map((member, index) => (
        <option key={index} value={member.email}>
          {member.name}
        </option>
      ));

            // Due date dropdown in Modal
      const MONTHS = new Array(12).fill(1);
      const DAYS = new Array(31).fill(1);

      let monthsOptions = MONTHS.map((month, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      let daysOptions = DAYS.map((day, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

            return (
        <form onSubmit={this.createTask} className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create task</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Task Name (required)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.taskName}
                id="taskName"
                type="text"
                placeholder={"What is the task?"}
                className="form-input"
              />
            </label>
          </div>