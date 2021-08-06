import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject } from "../../../../actions/projectsActions";
import { getTasks, deleteTask } from "../../../../actions/taskActions";

import Loading from "../../../common/LoadingIcon";
import Modal from "../Modal/Modal";

import "../MainContent.scss";
import "./Project.scss";