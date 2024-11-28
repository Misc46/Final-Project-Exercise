const express = require("express");
const router = express.Router();
const {getUser, createUser, deleteUser, login, editUser,getList,addToList,removeFromList} = require('../controllers/user.controller');

router.get("/", getUser);

router.post("/signup", createUser);

router.post("/login",login);

router.delete("/",deleteUser);

router.put("/",editUser);

router.get("/:id/list",getList)

router.post("/:id/list",addToList);

router.delete("/:id/list",removeFromList);

module.exports = router;