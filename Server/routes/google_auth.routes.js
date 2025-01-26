const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { Admins, Workers, Users, Refresh_tokens } = require("../models/init");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to generate tokens
const generateTokens = (userId, userType, accessSecret, refreshSecret) => {
    const accessToken = jwt.sign({ userId, userType }, accessSecret, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId, userType }, refreshSecret, {
        expiresIn: "1d",
    });
    return { accessToken, refreshToken };
};

// Helper function to set cookies
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

router.post("/google-auth", async (req, res) => {
    const { token, userType } = req.body;

    if (!token || !userType) {
        return res.status(400).json({ message: "Missing data" });
    }

    let userModel;
    let accessSecret;
    let refreshSecret;

    switch (userType.toLowerCase()) {
        case "admin":
            userModel = Admins;
            accessSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;
            refreshSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET;
            break;
        case "worker":
            userModel = Workers;
            accessSecret = process.env.WORKER_ACCESS_TOKEN_SECRET;
            refreshSecret = process.env.WORKER_REFRESH_TOKEN_SECRET;
            break;
        case "user":
            userModel = Users;
            accessSecret = process.env.USER_ACCESS_TOKEN_SECRET;
            refreshSecret = process.env.USER_REFRESH_TOKEN_SECRET;
            break;
        default:
            return res.status(400).json({ message: "Invalid user type" });
    }

    try {
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, picture, sub: googleId } = ticket.getPayload();

        // Check if the user exists in the database
        let user = await userModel.findOne({ where: { email } });

        if (!user) {
            // Create a new user if they don't exist
            user = await userModel.create({
                name,
                email,
                google_picture: picture,
                googleId,
                password: "google_auth",
            });
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(
            user.id,
            userType,
            accessSecret,
            refreshSecret
        );

        // Save the refresh token in the database
        await Refresh_tokens.create({ userId: user.id, token: refreshToken });

        // Set cookies
        setCookies(res, accessToken, refreshToken);

        // Return success response
        return res.status(200).json({
            message: "Logged in successfully with Google",
            userId: user.id,
            userType,
        });
    } catch (error) {
        console.error("Google login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
