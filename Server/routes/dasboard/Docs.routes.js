const express = require("express");
const authController = require("../../controllers/auth.controllers/auth.controller");
const router = express.Router();
const authMiddleware = require("../../middleware/Users/Middlware.Auth");
const Docs_Controller = require("../../controllers/dashboard.controllers/Docs.controller");

router.get("/", authMiddleware, Docs_Controller.GetDocs);

const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());
router.post("/Add", authMiddleware, Docs_Controller.AddDoc);
router.delete("/Delete/:id", authMiddleware, Docs_Controller.DeleteDoc);
module.exports = router;
