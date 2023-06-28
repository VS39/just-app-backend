const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/signUp", UserController.signUp);
router.get("/allUsers", UserController.allUsers);
router.get("/:id", UserController.viewUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
