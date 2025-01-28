const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { Users, Refresh_tokens } = require("../models/init");
const Welcome_Email = require("../jobs/Emails/Welcome");

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper functions
const generateTokens = (userId, userType, accessSecret, refreshSecret) => {
    const accessToken = jwt.sign({ userId, userType }, accessSecret, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId, userType }, refreshSecret, {
        expiresIn: "1d",
    });
    return { accessToken, refreshToken };
};

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
};

const verifyGoogleToken = async (token) => {
    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket?.getPayload();
};

const handleGoogleUser = async (payload) => {
    const { name, email, picture, sub: googleId } = payload;
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ");

    let user = await Users.findOne({ where: { email } });
    let isUserCreated = false;

    if (!user) {
        user = await Users.create({
            firstName,
            lastName,
            email,
            google_picture: picture,
            googleId,
            password: "google_auth",
        });
        isUserCreated = true;
    }

    return { user, isUserCreated };
};

// Routes
const handleAuth = async (req, res, isRegister) => {
    const { token, userType } = req.body;

    if (!token || userType?.toLowerCase() !== "user") {
        return res.status(400).json({ message: "Invalid data or user type" });
    }

    try {
        const payload = await verifyGoogleToken(token);
        if (!payload)
            return res.status(401).json({ message: "Invalid Google token" });

        if (isRegister) {
            const existingUser = await Users.findOne({
                where: { email: payload.email },
            });
            if (existingUser) {
                return res.status(422).json({
                    message: "User already exists. Please log in instead.",
                });
            }
        }

        const { user, isUserCreated } = await handleGoogleUser(payload);

        const { accessToken, refreshToken } = generateTokens(
            user.id,
            userType,
            process.env.USER_ACCESS_TOKEN_SECRET,
            process.env.USER_REFRESH_TOKEN_SECRET
        );

        await Refresh_tokens.create({ userId: user.id, token: refreshToken });
        setCookies(res, accessToken, refreshToken);

        if (isUserCreated) Welcome_Email(user.email, user.firstName);

        return res.status(200).json({
            message: "Authentication successful",
            userId: user.id,
            userType,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                google_picture: user.google_picture,
            },
        });
    } catch (error) {
        console.error("Google authentication error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

router.post("/google-auth-login", (req, res) => handleAuth(req, res, false));
router.post("/google-auth-register", (req, res) => handleAuth(req, res, true));

module.exports = router;
