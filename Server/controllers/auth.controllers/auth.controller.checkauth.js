const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Refresh_tokens } = require("../../models/init");

// Helper function to verify a JWT token
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        });
    });
};

// Helper function to clear cookies securely
const clearCookies = (res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
    });
};

// Helper function to handle token expiration and refresh
const handleTokenExpired = async (
    refreshToken,
    refreshTokenSecret,
    accessTokenSecret,
    userType,
    res
) => {
    if (!refreshToken) {
        clearCookies(res);
        return res
            .status(401)
            .json({ message: "Unauthorized: Refresh token is missing" });
    }

    // Check if the refresh token exists in the database
    const foundInDB = await Refresh_tokens.findOne({
        where: { token: refreshToken },
    });
    if (!foundInDB) {
        clearCookies(res);
        return res
            .status(401)
            .json({ message: "Unauthorized: Invalid refresh token" });
    }

    try {
        // Verify the refresh token
        const decoded = await verifyToken(refreshToken, refreshTokenSecret);

        // Generate a new access token
        const newAccessToken = jwt.sign(
            { userId: decoded.userId, userType },
            accessTokenSecret,
            { expiresIn: "1h" }
        );

        // Set the new access token in cookies
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        return res.status(200).json({
            message: "Access token refreshed successfully",
            userType,
            userId: decoded.userId,
        });
    } catch (err) {
        clearCookies(res);
        return res
            .status(401)
            .json({ message: "Unauthorized: Invalid refresh token" });
    }
};

// Helper function to determine user type and secrets
const getUserSecrets = (userType) => {
    switch (userType.toLowerCase()) {
        case "admin":
            return {
                accessTokenSecret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
                refreshTokenSecret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
            };
        case "worker":
            return {
                accessTokenSecret: process.env.WORKER_ACCESS_TOKEN_SECRET,
                refreshTokenSecret: process.env.WORKER_REFRESH_TOKEN_SECRET,
            };
        case "user":
            return {
                accessTokenSecret: process.env.USER_ACCESS_TOKEN_SECRET,
                refreshTokenSecret: process.env.USER_REFRESH_TOKEN_SECRET,
            };
        default:
            return null;
    }
};

// Main route to check authentication
// router.get("/", async (req, res) => {
const checkAuth = async (req, res) => {
    const { accessToken, refreshToken } = req.cookies;
    console.log("Incoming cookies:", req.cookies); // Log the received cookies

    if (!accessToken || !refreshToken) {
        clearCookies(res);
        return res
            .status(401)
            .json({ message: "Unauthorized: No tokens found" });
    }

    try {
        // Decode the access token to determine the user type
        const decodedAccessToken = jwt.decode(accessToken);
        if (!decodedAccessToken || !decodedAccessToken.userType) {
            clearCookies(res);
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid access token" });
        }

        const { userType } = decodedAccessToken;

        // Get the appropriate secrets for the user type
        const { accessTokenSecret, refreshTokenSecret } =
            getUserSecrets(userType);
        if (!accessTokenSecret || !refreshTokenSecret) {
            clearCookies(res);
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid user type" });
        }

        // Verify the access token
        const decoded = await verifyToken(accessToken, accessTokenSecret);
        return res.status(200).json({
            message: "Access token is valid",
            userType,
            userId: decoded.userId,
        });
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            // Decode the refresh token to determine the user type
            const decodedRefreshToken = jwt.decode(refreshToken);
            if (!decodedRefreshToken || !decodedRefreshToken.userType) {
                clearCookies(res);
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Invalid refresh token" });
            }

            const { userType } = decodedRefreshToken;

            // Get the appropriate secrets for the user type
            const { accessTokenSecret, refreshTokenSecret } =
                getUserSecrets(userType);
            if (!accessTokenSecret || !refreshTokenSecret) {
                clearCookies(res);
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Invalid user type" });
            }

            // Handle token expiration by refreshing the access token
            return await handleTokenExpired(
                refreshToken,
                refreshTokenSecret,
                accessTokenSecret,
                userType,
                res
            );
        } else {
            clearCookies(res);
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid access token" });
        }
    }
};
module.exports = checkAuth;
