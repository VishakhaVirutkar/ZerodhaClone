const jwt = require("jsonwebtoken");
const User = require("../model/UsersModel");


// ==============================
// 1. USER VERIFICATION
// ==============================

const userVerification = async (req, res) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.json({
                status: false
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.TOKEN_KEY
        );

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.json({
                status: false
            });
        }

        return res.json({
            status: true,
            user: user.username
        });

    } catch (error) {

        return res.json({
            status: false
        });

    }
};


// ==============================
// 2. PROTECTED ROUTE
// ==============================

const protectRoute = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.TOKEN_KEY
        );

        const user = await User.findById(decoded.id)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }
};


module.exports = {
    userVerification,
    protectRoute
};