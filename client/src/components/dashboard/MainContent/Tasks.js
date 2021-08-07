import React, { Component } from "react";
import "./MainContent.scss";
import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Tasks extends Component {
  state = {
    modal: false
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal });
  };