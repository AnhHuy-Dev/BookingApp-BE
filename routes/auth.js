const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { verifyToken } = require("../middlewares/auth");

router.get("/", verifyToken, AuthController.check);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
