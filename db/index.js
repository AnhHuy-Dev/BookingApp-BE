require("dotenv").config();
async function connect() {
	try {
		const mongoose = require("mongoose");
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("Success");
	} catch (error) {
		console.log(error);
	}
}

module.exports = { connect };
