const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const Project = require("../models/project.model");

/*

    Create 

*/
const createProject = async (req, res = response) => {
  const { projectname, expect, whowantto, our, helps, unlike } = req.body;
  try {
    project = new Project(req.body);
    await project.save();
    res.status(201).json({
      ok: true,
      uid: project.id,
      projectname: project.projectname,
      expect: project.expect,
      whowantto: project.whowantto,
      our: project.our,
      helps: project.helps,
      unlike: project.unlike,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, no se ha podido insertar el registro",
    });
  }
};

/*

    Detail 

*/

const detailProject = async (req, res = response) => {
  const { uid } = req.params;

  const project = await Project.findById(uid);

  res.json({
    ok: true,
    msg: "detail",
    project,
  });
};

module.exports = { createProject, detailProject };
