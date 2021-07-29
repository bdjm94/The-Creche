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

router.get("/:id", 
passport.authenticate("jwt", { session: false }),
(req, res) => {
    let id = req.params.id;

    Project.findById(id).then(project => res.json(project));
});

router.post("/create",
passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const OWNER = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    };

    const NEW_PROJECT = await new Project({
        owner: OWNER,
        name: req.body.projectName,
        teamMembers: req.body.members
    });

    NEW_PROJECT.save().then(project => res.json(project));
});