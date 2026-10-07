const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required. Please login."
        });
    }

    if (token !== "Bearer student-secret-token") {
        return res.status(401).json({
            message: "Invalid authentication token."
        });
    }

    next();
};

module.exports = authMiddleware;