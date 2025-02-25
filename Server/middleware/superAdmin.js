const { Admin } = require("../models/init");
const errorLogger = require("../utils/ErrorLogger");

const superAdmin = async (req, res, next) => {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({
            where: {
                email,
                role: "superadmin",
            },
        });

        if (!admin) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        next();
    } catch (error) {
        console.error(error);

        errorLogger.logDetailedError("SUPER_ADMIN_ERROR", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = superAdmin;
