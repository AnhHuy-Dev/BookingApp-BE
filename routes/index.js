const hotelRouter = require("./hotel");
const authRouter = require("./auth");
const userRouter = require("./user");
const roomRouter = require("./room");

function route(app) {
	app.use("/api/hotels", hotelRouter);
	app.use("/api/auth", authRouter);
	app.use("/api/users", userRouter);
	app.use("/api/rooms", roomRouter);
	app.get("/favicon.ico", function (req, res) {
		res.status(204);
		res.end();
	});
	app.get("/api", (req, res) => {
		res.send("Hello");
	});
}

module.exports = route;
