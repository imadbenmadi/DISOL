const express = require("express");
const jwt = require("jsonwebtoken");
const { Admin, Workers, Users, Refresh_tokens } = require("../../models/init");

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

const handleLogin = async (req, res) => {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
        return res.status(400).json({ message: "Missing data" });
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    let userModel;
    let accessSecret;
    let refreshSecret;

    switch (userType.toLowerCase()) {
        case "admin":
            userModel = Admin;
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
        const user = await userModel.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const { accessToken, refreshToken } = generateTokens(
            user.id,
            userType,
            accessSecret,
            refreshSecret
        );

        await Refresh_tokens.create({
            userId: user.id,
            token: refreshToken,
            userType: userType.toLowerCase(),
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        setCookies(res, accessToken, refreshToken);

        return res.status(200).json({
            message: "Logged in successfully",
            userId: user.id,
            userType,
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = handleLogin;
