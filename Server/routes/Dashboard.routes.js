const express = require("express");

const router = express.Router();
const Files_Routes = require("./dasboard/Files.routes");
const authMiddleware = require("../middleware/Users/Middlware.Auth");
router.use(authMiddleware);
router.use(Files_Routes);
// router.get("/", dashboardController.getDashboard);

module.exports = router;
