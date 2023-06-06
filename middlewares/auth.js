const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
	const authHeader = req.header("Authorization");
	const token = authHeader && authHeader.split(" ")[1];
	if (!token) return res.status(401).json({ success: false, message: "Token not found!" });

	try {
		const decoded = jwt.verify(token, process.env.ACEESS_TOKEN);
		req.userId = decoded.userId;
		req.isAdmin = decoded.isAdmin;
		next();
	} catch (error) {
		console.log(error);
		return res.status(403).json({ success: false, message: "Invalid Token" });
	}
};

module.exports = { verifyToken };
