const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Refresh_tokens, Admin, Users, Workers } = require("../../models/init");

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

// Helper function to verify a JWT token
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        });
    });
};

// Helper function to get user model and secrets based on user type
const getUserDetails = (userType) => {
    switch (userType.toLowerCase()) {
        case "admin":
            return {
                model: Admin,
                accessTokenSecret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
                refreshTokenSecret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
            };
        case "user":
            return {
                model: Users,
                accessTokenSecret: process.env.USER_ACCESS_TOKEN_SECRET,
                refreshTokenSecret: process.env.USER_REFRESH_TOKEN_SECRET,
            };
        case "worker":
            return {
                model: Workers,
                accessTokenSecret: process.env.WORKER_ACCESS_TOKEN_SECRET,
                refreshTokenSecret: process.env.WORKER_REFRESH_TOKEN_SECRET,
            };
        default:
            return null;
    }
};

// Middleware to verify authentication for all user types
const verifyUser = async (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;

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

        const { userType, userId } = decodedAccessToken;

        // Get user details (model and secrets) based on user type
        const userDetails = getUserDetails(userType);
        if (!userDetails) {
            clearCookies(res);
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid user type" });
        }

        const { model, accessTokenSecret, refreshTokenSecret } = userDetails;

        // Verify the access token
        const decoded = await verifyToken(accessToken, accessTokenSecret);

        // Check if the user exists in the database
        const user = await model.findOne({ where: { id: userId } });
        if (!user) {
            clearCookies(res);
            return res
                .status(401)
                .json({ message: "Unauthorized: User not found" });
        }

        // Attach decoded token and user type to the request object
        req.decoded = decoded;
        req.userType = userType;
        req.userId = userId;

        return next();
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

            const { userType, userId } = decodedRefreshToken;

            // Get user details (model and secrets) based on user type
            const userDetails = getUserDetails(userType);
            if (!userDetails) {
                clearCookies(res);
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Invalid user type" });
            }

            const { model, accessTokenSecret, refreshTokenSecret } =
                userDetails;

            // Verify the refresh token
            try {
                const foundInDB = await Refresh_tokens.findOne({
                    where: { token: refreshToken, userId },
                });

                if (!foundInDB) {
                    clearCookies(res);
                    return res.status(401).json({
                        message: "Unauthorized: Invalid refresh token",
                    });
                }

                const decodedRefresh = await verifyToken(
                    refreshToken,
                    refreshTokenSecret
                );

                // Generate a new access token
                const newAccessToken = jwt.sign(
                    { userId: decodedRefresh.userId, userType },
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

                // Attach decoded token and user type to the request object
                req.decoded = decodedRefresh;
                req.userType = userType;
                req.userId = userId;

                return next();
            } catch (refreshErr) {
                clearCookies(res);
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Invalid refresh token" });
            }
        } else {
            clearCookies(res);
            return res
                .status(401)
                .json({ message: "Unauthorized: Invalid access token" });
        }
    }
};

module.exports = verifyUser;
