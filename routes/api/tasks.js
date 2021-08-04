const express = require("express");
const router = express.Router();
const passport = require("passport");

const Task = require("../../models/Task");

router.get("/:id",
passport.authenticate("jwt", { session: false }),
(req, res) => {
    let id = req.params.id;

    Task.find({ project: id }).then(tasks => res.json(tasks));
  }
);