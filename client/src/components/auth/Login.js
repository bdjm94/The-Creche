import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import "./Auth.scss";

class Login extends Component {
    constructor() {
      super();
      this.state = {
        email: "",
        password: "",
        errors: {}
      };
    }
  
    componentDidMount() {
      // If logged in and user navigates to Login page then they will be redirected to the dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }

        onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  fillDemoEmail = () => {
    this.setState({ email: "test@email.com" });
  };

  fillDemoPassword = () => {
    this.setState({ password: "test123" });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="base-wrapper">
        <div className="auth-header">Sign In</div>
        <form className="auth-form" noValidate onSubmit={this.onSubmit}>
          <div className="auth-group">
            <label>
              <div className="auth-label">Email Address</div>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className="auth-input"
              />
              <div className="auth-error">
                {errors.email}
                {errors.emailnotfound}
              </div>
            </label>
          </div>

          <div className="auth-group">
            <label>
              <div className="auth-label">Password</div>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className="auth-input"
              />
              <div className="auth-error">
                {errors.password}
                {errors.passwordincorrect}
              </div>
            </label>
          </div>