const express = require("express");
const router = express.Router();
const {getUser,getOneUser, createUser, deleteUser, login, editUser,getList,addToList,removeFromList} = require('../Controllers/user.controller');

router.get("/", getUser);

router.get("/getOne", getOneUser);

router.post("/signup", createUser);

router.post("/login",login);

router.delete("/",deleteUser);

router.put("/",editUser);

router.get("/:id/list",getList)

router.post("/:id/list",addToList);

router.delete("/:id/list",removeFromList);

module.exports = router;