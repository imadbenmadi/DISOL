const auth_controller_checkauth = require("./auth.controller.checkauth");
const auth_controller_Login = require("./auth.controller.Login");
const auth_controller_Logout = require("./auth.controller.Logout");
const auth_controller_Register = require("./auth.controller.Register");
// _________________________________________________________
const admin_auth_controller_Login = require("./dashboard/auth.controller.Login");
const admin_auth_controller_Register = require("./dashboard/auth.controller.Register");
const admin_auth_controller_Logout = require("./dashboard/auth.controller.Logout");

module.exports = {
    auth_controller_checkauth,
    auth_controller_Login,
    auth_controller_Logout,
    auth_controller_Register,
};
