const { Admin } = require("../models/init");

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
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = superAdmin;
