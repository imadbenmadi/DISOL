const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { Users, Refresh_tokens } = require("../models/init");
const Welcome_Email = require("../jobs/Emails/Welcome");
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

    // Validate input
    if (!token || !userType) {
        return res.status(400).json({ message: "Missing data" });
    }

    // Only allow "user" type for Google authentication
    if (userType.toLowerCase() !== "user") {
        return res.status(400).json({
            message: "Google authentication is only available for users",
        });
    }

    // Set user model and secrets for "user" type
    const userModel = Users;
    const accessSecret = process.env.USER_ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.USER_REFRESH_TOKEN_SECRET;

    try {
        // Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        if (!ticket || !ticket.getPayload) {
            return res.status(401).json({ message: "Invalid Google token" });
        }
        const { name, email, picture, sub: googleId } = ticket.getPayload();

        // Split the name into first and last names
        const [firstName, ...lastNameParts] = name.split(" ");
        const lastName = lastNameParts.join(" "); // Handle cases where last name has multiple parts

        // Check if the user exists in the database
        let user = await userModel.findOne({ where: { email } });
        const is_user_created = false;
        if (!user) {
            // Create a new user if they don't exist
            user = await userModel.create({
                firstName,
                lastName,
                email,
                google_picture: picture,
                googleId,
                password: "google_auth", // Default password for Google-authenticated users
            });
            is_user_created = true;
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
        if (is_user_created) {
            await Welcome_Email(email, firstName);
        }
        // Return success response
        return res.status(200).json({
            message: "Logged in successfully with Google",
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
        console.error("Google login error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
