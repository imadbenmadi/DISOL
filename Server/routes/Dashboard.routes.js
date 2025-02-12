const express = require("express");

const router = express.Router();
const Docs_Routes = require("./dasboard/Docs.routes");
const authMiddleware = require("../middleware/Users/Middlware.Auth");
router.use(authMiddleware);
router.use(Docs_Routes);
// router.get("/", dashboardController.getDashboard);

module.exports = router;
