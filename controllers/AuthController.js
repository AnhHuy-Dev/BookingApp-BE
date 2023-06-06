const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

class AuthController {
	//GET /api/auth
	async check(req, res, next) {
		try {
			const user = await User.findOne({ _id: req.userId });
			if (!user) return res.status(403).json({ success: false, message: "User not found" });
			res.json({ success: true, user });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}
	//POST /api/auth/login
	async login(req, res, next) {
		const { email, password } = req.body;
		if (!email || !password) return res.status(400).json({ success: false, message: "Missing email or/and password" });

		try {
			const user = await User.findOne({ email });
			if (!user) return res.status(400).json({ success: false, message: "User not found!" });
			const checkPassword = await argon2.verify(user.password, password);
			if (!checkPassword) return res.status(400).json({ success: false, message: "Incorrect username or/and password!" });

			const accessToken = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.ACEESS_TOKEN);
			res.status(200).json({ success: true, accessToken, isAdmin: user.isAdmin });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//POST /api/auth/register
	async register(req, res, next) {
		const { username, password, email, ...rest } = req.body;
		if (!username || !password || !email) return res.status(400).json({ success: false, message: "Missing username or/and password, email" });

		try {
			const emailUser = await User.findOne({ email });
			if (emailUser) return res.status(400).json({ success: false, message: "Duplicate email" });
			const hashPassword = await argon2.hash(password);
			const newUser = new User({
				username,
				password: hashPassword,
				email,
				isAdmin: false,
				...rest,
			});

			await newUser.save();

			const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACEESS_TOKEN);
			res.status(200).json({ success: true, message: "Create user successfully!", accessToken });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}
}

module.exports = new AuthController();
