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

router.post("/create",
passport.authenticate("jwt", { session: false }),
(req, res) => {
    const NEW_TASK = new Task({
      project: req.body.project,
      taskName: req.body.taskName,
      dateDue: req.body.dateDue,
      assignee: req.body.assignee
    });

    NEW_TASK.save()
      .then(task => res.json(task))
      .catch(err => console.log(err));
  }
);

router.delete("/delete/:id",
passport.authenticate("jwt", { session: false }),
(req, res) => {
    Task.findById(req.params.id).then(task => {
      task.remove().then(() => res.json({ success: true }));
    });
  }
);