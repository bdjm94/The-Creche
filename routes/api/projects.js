const express = require("express");
const router = express.Router();
const passport = require("passport");

const Project = require("../../models/Project");

router.get("/",
passport.authenticate("jwt", { session: false }),
async (req, res) => {
    let projectsArr = [];
})