const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		maxPeople: {
			type: Number,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
	},
	{ timestamps: true }
);

// [
// {number: 101, unavailableDates: [02.04.2023, 05.04.20023]}
// {number: 101, unavailableDates: [02.04.2023, 05.04.20023]}
// {number: 101, unavailableDates: [02.04.2023, 05.04.20023]}
// ]
module.exports = mongoose.model("rooms", RoomSchema);
