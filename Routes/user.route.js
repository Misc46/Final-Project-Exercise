const express = require("express");
const router = express.Router();
const {getUser, createUser, deleteUser, login, editUser} = require('../controllers/usercontroller');

router.get("/", getUser);

router.post("/signup", createUser);

router.post("/login",login);

router.delete("/",deleteUser);

router.put("/",editUser);

module.exports = router;