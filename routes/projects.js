/*

    proyectos Paths
    host + /api/projects

*/

const { Router } = require("express");

const { validateJWT } = require("../middlewares/validateToken");
const router = Router();

const { createProject, detailProject } = require("../controllers/project");

//create

router.post("/newproject", createProject);
router.get("/detailproject/:uid", detailProject);
module.exports = router;
