const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/Users/Middlware.Auth");
const Docs_Controller = require("../../controllers/dashboard.controllers/Docs.controller");

router.get("/Documents", authMiddleware, Docs_Controller.GetDocs);

module.exports = router;
