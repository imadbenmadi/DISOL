const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/Users/Middlware.Auth");
const Files_Controller = require("../../controllers/dashboard.controllers/Files.controller");

router.get("/Files", authMiddleware, Files_Controller.GetFiles);
router.get("/Files/Unused", authMiddleware, Files_Controller.Get_unused_files);

const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());
// router.post("/Files", authMiddleware, Files_Controller.AddDoc);
// router.delete("/Files/:fileId", authMiddleware, Files_Controller.DeleteDoc);
module.exports = router;
