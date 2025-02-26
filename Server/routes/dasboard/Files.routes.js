const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/Users/Middlware.Auth");
const Files_Controller = require("../../controllers/dashboard.controllers/Files.controller");

router.get("/Files", authMiddleware, Files_Controller.GetFiles);
router.get("/Files/Unused", authMiddleware, Files_Controller.Get_unused_files);
router.get("/Folders", authMiddleware, Files_Controller.GetFolders);
router.get("/Folders/:id", authMiddleware, Files_Controller.GetFolder);

const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());

router.post("/Files", authMiddleware, Files_Controller.Create_File);
router.post("/Folders", authMiddleware, Files_Controller.Create_folder);

router.delete("/Files/:id", authMiddleware, Files_Controller.Delete_File);
router.delete("/Folders/:id", authMiddleware, Files_Controller.Delete_folder);
router.put("/Folders/:id", authMiddleware, Files_Controller.update_folder_name);
router.post("/Files/:id", authMiddleware, Files_Controller.move_file);

module.exports = router;
