const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { verifyToken } = require("../middlewares/auth");

router.put("/:id", verifyToken, UserController.update);
router.delete("/:id", verifyToken, UserController.delete);
router.get("/:id", verifyToken, UserController.getUser);
router.get("/", verifyToken, UserController.getAllUser);

module.exports = router;
