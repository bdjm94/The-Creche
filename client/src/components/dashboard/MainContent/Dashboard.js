import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";

import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    members: [],
    id: "",
    owner: {}
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name, members, id, owner, e) => {
    e.stopPropagation();

    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      id: id,
      owner: owner
    });
  };

    render() {
    const { projects } = this.props.projects;

    let content;

    let projectData = projects.sort().map(project => (
      <div
        key={project._id}
        className="project-icon"
        onClick={() => this.props.history.push(`/projects/${project._id}`)}
      >
        <div className="project-name">{project.name}</div>
        <div
          className="project-info-button"
          onClick={this.toggleEditModal.bind(
            this,
            project.name,
            project.teamMembers,
            project._id,
            project.owner
          )}
        >
          Edit project
        </div>
        <div className="project-info-button">Go to project</div>
      </div>
    ));