const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { Users, Refresh_tokens } = require("../models/init");
const Welcome_Email = require("../jobs/Emails/Welcome");

const app = express();
const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// CORS Configuration
const corsOptions = {
    origin: "http://your-frontend-domain.com", // Replace with your frontend domain
    credentials: true,
};

app.use(cors(corsOptions));

// Helper function to generate tokens
const generateTokens = (userId, userType, accessSecret, refreshSecret) => {
    const accessToken = jwt.sign({ userId, userType }, accessSecret, {
        expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId, userType }, refreshSecret, {
        expiresIn: "1d",
    });
    // console.log("generateTokens:", accessToken, refreshToken);
    // console.log("__________________________");

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
    console.log("setCookies:", res.cookies);
    console.log("__________________________");
};

// Helper function to verify Google token
const verifyGoogleToken = async (token) => {
    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket?.getPayload();
};

// Helper function to handle Google user
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

// Unified function to handle Google authentication
const handleAuth = async (req, res, isRegister) => {
    const { token, userType } = req.body;

    // Validate input
    if (!token || userType?.toLowerCase() !== "user") {
        return res.status(400).json({ message: "Invalid data or user type" });
    }

    try {
        // Verify Google token
        const payload = await verifyGoogleToken(token);
        if (!payload)
            return res.status(401).json({ message: "Invalid Google token" });

        // Handle registration-specific logic
        // if (isRegister) {
        //     const existingUser = await Users.findOne({
        //         where: { email: payload.email },
        //     });
        //     if (existingUser) {
        //         // return res.status(422).json({
        //         //     message: "User already exists. Please log in instead.",
        //         // });

        //     }
        // }

        // Handle Google user
        const { user, isUserCreated } = await handleGoogleUser(payload);

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(
            user.id,
            userType,
            process.env.USER_ACCESS_TOKEN_SECRET,
            process.env.USER_REFRESH_TOKEN_SECRET
        );

        // Save refresh token in DB
        const register_refresh_token = await Refresh_tokens.create({
            userId: user.id,
            token: refreshToken,
        });
        if (!register_refresh_token)
            return res
                .status(500)
                .json({ message: "Failed to save refresh token" });
        // Set cookies
        setCookies(res, accessToken, refreshToken);

        // Send welcome email for new users
        // if (isUserCreated) Welcome_Email(user.email, user.firstName);
        console.log("Cookies from google auth:", res.cookies);
        console.log("__________________________");

        // Send response
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

// Define routes for Google login and register
router.post("/google-auth-login", (req, res) => handleAuth(req, res, false));
router.post("/google-auth-register", (req, res) => handleAuth(req, res, true));

module.exports = router;
