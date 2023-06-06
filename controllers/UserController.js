const User = require("../models/User");

class UserController {
	//PUT /api/users/:id
	async update(req, res, next) {
		if (req.userId !== req.params.id) return res.status(403).json({ success: false, message: "You are not authorized!" });
		try {
			const updatedUser = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
				new: true,
			});
			res.status(200).json({ success: true, updatedUser });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//DELETE /api/users/:id
	async delete(req, res, next) {
		if (!req.isAdmin) return res.status(403).json({ success: false, message: "You are not authorized!" });
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json({ success: true, message: "Delete user successfully!" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//GET /api/user/:id
	async getUser(req, res, next) {
		if (!req.isAdmin) return res.status(403).json({ success: false, message: "You are not authorized!" });
		try {
			const user = await User.findOne({ _id: req.params.id });
			res.status(200).json({ success: true, user });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//GET /api/user/
	async getAllUser(req, res, next) {
		if (!req.isAdmin) return res.status(403).json({ success: false, message: "You are not authorized!" });

		try {
			const users = await User.find();
			if (users) res.status(200).json(users);
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}
}

module.exports = new UserController();
