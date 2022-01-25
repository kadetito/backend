/*

    Authentication Paths
    host + /api/auth

*/

const { Router } = require("express");

const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validation");
const { validateJWT } = require("../middlewares/validateToken");
const router = Router();

const { createUser, loginUser, renewToken } = require("../controllers/auth");

//create user
router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El nombre es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio y debe tener un mínimo de 6 carácteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

//authentication login
router.post(
  "/",
  [
    check("email", "El e-mail es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio y debe tener un mínimo de 6 carácteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

//token renove
router.get("/renew", validateJWT, renewToken);

module.exports = router;
