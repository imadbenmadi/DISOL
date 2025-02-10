const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { Users, Refresh_tokens } = require("../models/init");

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to generate tokens
const generateTokens = (userId, userType, accessSecret, refreshSecret) => {
    const accessToken = jwt.sign({ userId, userType }, accessSecret, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId, userType }, refreshSecret, {
        expiresIn: "1d",
    });
    return { accessToken, refreshToken };
};

// Function to set cookies
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

// Combined Register/Login Logic
const handleGoogleAuth = async (req, res) => {
    const { token, userType } = req.body;

    if (!token || userType?.toLowerCase() !== "user") {
        return res.status(400).json({ message: "Invalid data or user type" });
    }

    try {
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(401).json({ message: "Invalid Google token" });
        }

        const { email, name, picture, sub: googleId } = payload;

        // Check if user exists or create a new user
        let user = await Users.findOne({ where: { email } });
        if (!user) {
            // User does not exist, so create a new one (Register)
            const [firstName, ...lastNameParts] = name.split(" ");
            const lastName = lastNameParts.join(" ");
            user = await Users.create({
                firstName,
                lastName,
                email,
                google_picture: picture,
                googleId,
                password: "google_auth", // Password isn't relevant for Google users
            });
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(
            user.id,
            userType,
            process.env.USER_ACCESS_TOKEN_SECRET,
            process.env.USER_REFRESH_TOKEN_SECRET
        );

        // Save refresh token in database
        await Refresh_tokens.create({ userId: user.id, token: refreshToken });

        // Set cookies
        setCookies(res, accessToken, refreshToken);

        // Debug: Log cookies to verify
        console.log("Cookies from Google Auth:", {
            accessToken,
            refreshToken,
        });

        return res.status(200).json({
            message:
                user.createdAt === user.updatedAt
                    ? "User registered and logged in successfully"
                    : "User logged in successfully",
            userId: user.id,
            userType,
        });
    } catch (error) {
        console.error("Google Auth error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Endpoint for Google Register/Login
router.post("/google-auth-register", handleGoogleAuth);
router.post("/google-auth-login", handleGoogleAuth);

module.exports = router;
