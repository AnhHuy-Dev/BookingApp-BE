const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
class RoomController {
	//POST /api/rooms/:hotelId
	async create(req, res, next) {
		if (!req.isAdmin) return res.status(403).json({ success: false, message: "You are not authorized!" });
		const newRoom = new Room(req.body);
		try {
			const saveRoom = await newRoom.save();

			const hotel = await Hotel.findByIdAndUpdate(req.params.hotelId, {
				$push: { rooms: saveRoom._id },
			});
			res.status(200).json({ success: true, message: "Create room successfully!", saveRoom });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//PUT /api/rooms/:id
	async updateRoom(req, res, next) {
		if (!req.isAdmin) return res.status(403).json({ success: false, message: "You are not authorized!" });
		try {
			const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
			res.status(200).json({ success: true, updatedRoom });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//DELETE /api/rooms/
	async deleteRoom(req, res, next) {
		try {
			await Room.findByIdAndDelete(req.params.id);
			await Hotel.findByIdAndUpdate(req.params.hotelId, {
				$pull: { rooms: req.params.id },
			});
			res.status(200).json({ success: true, message: "Delete room successfully!" });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//GET /api/rooms/:id
	async getRoom(req, res, next) {
		try {
			const room = await Room.findOne({ _id: req.params.id });
			if (room) res.status(200).json({ message: true, room });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//GET /api/rooms/
	async getAllRoom(req, res, next) {
		try {
			const rooms = await Room.find();
			if (rooms) res.status(200).json(rooms);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//PUT /room/availability/:id
	async updateRoomAvailability(req, res, next) {
		try {
			await Room.updateOne(
				{ "roomNumbers._id": req.params.id },
				{
					$push: {
						"roomNumbers.$.unavailableDates": req.body.dates,
					},
				}
			);
			res.status(200).json("Room status has been updated.");
		} catch (err) {
			console.log(err);
			return res.status(500).json({ success: false, message: "Server error" });
		}
	}
}

module.exports = new RoomController();
