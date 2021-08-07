import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

import "./SideNav.scss";

class SideNav extends Component {
  onLogoutClick = e => {
    this.props.logoutUser(this.props.history);
    window.location.href = "/";
  };