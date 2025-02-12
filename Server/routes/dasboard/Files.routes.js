const express = require("express");
const authController = require("../../controllers/auth.controllers/auth.controller");
const router = express.Router();
const authMiddleware = require("../../middleware/Users/Middlware.Auth");
const Files_Controller = require("../../controllers/dashboard.controllers/Files.controller");
router.get("/", authMiddleware, Files_Controller);
module.exports = router;
