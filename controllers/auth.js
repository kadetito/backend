const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const User = require("../models/user.model");

/*

    Create user

*/
const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "el usuario ya existe",
      });
    }
    user = new User(req.body);

    //bcrypt
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //generate jsonwebtoken
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error, no se ha podido insertar el registro",
    });
  }
};

/*

    Login user

*/
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "el usuario no existe",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "el password no es correcto",
      });
    }

    //generate jsonwebtoken
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      msg: "login correcto!!",
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "no se ha podido logear",
    });
  }
};

/*

    Renew Token

*/
const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  //generate new jsonwebtoken
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    msg: "renew",
    uid,
    name,
    token,
  });
};

module.exports = { createUser, loginUser, renewToken };
