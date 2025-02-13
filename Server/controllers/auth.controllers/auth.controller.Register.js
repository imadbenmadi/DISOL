const { Users, Admin, Workers } = require("../../models/init");
const Welcome_Email = require("../../jobs/Emails/Welcome");
const handleRegister = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(409).json({ message: "Missing Data" });
        } else if (firstName.length < 3) {
            return res.status(409).json({
                message: "First Name must be more that 3 chars",
            });
        } else if (lastName.length < 3) {
            return res.status(409).json({
                message: "Last Name must be more that 3 chars",
            });
        } else if (firstName.length > 14) {
            return res.status(409).json({
                message: "First Name must be less than 14 chars",
            });
        } else if (lastName.length > 14) {
            return res.status(409).json({
                message: "lastName must be less than 14 chars",
            });
        } else if (password.length < 8) {
            return res.status(409).json({
                message: "password must be at least 8 characters",
            });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            return res.status(409).json({ message: "Invalid email" });
        }
        // if (!(await isemailValid(email))) {
        //     return res.status(409).json({ message: "Invalid email domain" });
        // }
        const exist_user = await Users.findOne({
            where: { email: email },
        });
        const exist_worker = await Workers.findOne({
            where: { email: email },
        });
        const exist_Admin = await Admin.findOne({
            where: { email: email },
        });

        if (exist_Admin || exist_user || exist_worker) {
            return res.status(400).json({
                message: "email already exists , please use another email.",
            });
        }
        let newUser = null;
        const userType = req.body.userType;
        if (!userType) {
            return res.status(409).json({ message: "User Type is required" });
        } else if (userType === "admin") {
            newUser = await Admin.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });
        } else if (userType === "worker") {
            newUser = await Workers.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });
        } else if (userType === "user") {
            newUser = await Users.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            });
        } else {
            return res.status(409).json({ message: "Invalid User Type" });
        }

        if (!newUser) {
            return res.status(500).json({ message: "Error Creating User" });
        }
        // Send Welcome Email
        // Welcome_Email(email, firstName);

        return res.status(200).json({
            message: "Account Created Successfully",
            id: newUser.id,
        });
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json({ message: err });
    }
};

module.exports = handleRegister;
