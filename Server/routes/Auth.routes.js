const express = require("express");
const authController = require("../controllers/auth.controllers/auth.controller");
const router = express.Router();

router.post("/Login", authController.auth_controller_Login);
router.post("/Register", authController.auth_controller_Register);
router.post("/Logout", authController.auth_controller_Logout);
router.get("/Check_Auth", authController.auth_controller_checkauth);

router.post("/dashboard/Login", authController.auth_controller_Login);
router.post("/dashboard/Register", authController.auth_controller_Register);

module.exports = router;
