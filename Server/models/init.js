const Refresh_tokens = require("./models/RefreshTokens");
const Users = require("./models/Users/User");
const Workers = require("./models/Users/Worker");
const Admin = require("./models/Users/Admin");
const { File, Folder } = require("./models/File");
const { Content } = require("./models/Content/Content");
const init_models = {
    Refresh_tokens,
    Users,
    Workers,
    Admin,
    File,
    Folder,
    Content,
};
module.exports = {
    Refresh_tokens,
    Users,
    Workers,
    Admin,
    File,
    Folder,
    init_models,
    Content,
};
