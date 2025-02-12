const Refresh_tokens = require("./models/RefreshTokens");
const Users = require("./models/Users/User");
const Workers = require("./models/Users/Worker");
const Admins = require("./models/Users/Admin");
const { Document } = require("./models/Content/Document");

module.exports = { Refresh_tokens, Users, Workers, Admins, Document };
