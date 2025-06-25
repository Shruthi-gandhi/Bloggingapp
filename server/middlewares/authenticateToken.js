const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]; // Corrected header case
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ msg: "Token is missing" }); // Return if no token
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ msg: "Invalid token" }); // Corrected status to 403 for invalid token
        }
        req.user = user; // Attach the user to the request object
        next(); // Pass control to the next middleware/handler
    });
};
module.exports=authenticateToken;