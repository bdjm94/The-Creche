import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { Link, withRouter } from "react-router-dom";

import "./TopNav.scss";

class TopNav extends Component {
  state = {
    dropdown: false
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

    // Close the dropdown when clicking outside 
  handleClick = e => {
    if (this.state.dropdown && !this.node.contains(e.target)) {
      this.setState({ dropdown: !this.state.dropdown });
    }
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    window.location.href = "/";
  };

  handleProfileClick = e => {
    this.setState({ dropdown: !this.state.dropdown });
  };