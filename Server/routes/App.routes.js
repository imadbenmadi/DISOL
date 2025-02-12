const express = require("express");
const authRoutes = require("./Auth.routes");
const dashboardRoutes = require("./Dashboard.routes");
const userRoutes = require("./User.routes");
const google_auth_rout = require("./google_auth.routes");
const router = express.Router();
const authMiddleware = require("../middleware/Users/Middlware.Auth");

router.use(Files_Routes);
router.use(authRoutes);
router.use(google_auth_rout);
router.use("/dashboard", authMiddleware, dashboardRoutes);
// router.use("/user", userRoutes);

// router.use("/check_Auth", require("./Auth/check_Auth"));
// router.use("/Login", require("./Auth/Login"));
// router.use("/Register", require("./Auth/Register"));
// router.use("/Logout", require("./Auth/Logout"));
// router.use("/Contact", require("./Contact"));

// // _________________________________________________________
// router.use("/Students", require("./Students"));
// router.use("/Teachers", require("./Teachers"));
// router.use("/upload", require("./Uploads/Upload"));
// router.use("/Geust", require("./Geust"));

// // _________________________________________________________
// router.use("/Admin", require("./Admin/Admin"));
// router.use("/Admin_Login", require("./Auth/Admin/Admin_Login"));
// router.use("/Add_Admin", require("./Auth/Admin/Admin_Add"));
// router.use("/Admin_Logout", require("./Auth/Admin/Admin_Logout"));
// router.use("/Admin_CheckAuth", require("./Auth/Admin/Admin_CheckAuth"));

module.exports = router;
