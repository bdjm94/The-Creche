const express = require("express");
const router = express.Router();
const passport = require("passport");

const Project = require("../../models/Project");

router.get("/",
passport.authenticate("jwt", { session: false }),
async (req, res) => {
    let projectsArr = [];
    await Project.find({})
    .then(projects => {
        projects.map(project => {
            project.teamMembers && project.teamMembers.map(member => {
                if (member.email == req.user.email) {
                    projectsArr.push(project);
                }
            });
        });
    })
    .catch(err => console.log(err));

    const OWNER = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    };

    await Project.find({ owner: OWNER })
    .then(projects => {
        let finalArr = [...projects, ...projectsArr];
        res.json(finalArr);
    })
    .catch(err => console.log(err));
});