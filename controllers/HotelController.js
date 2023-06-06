const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
class HotelController {
	//POST /api/hotels
	async create(req, res, next) {
		if (!req.isAdmin) return res.status(403).json({ success: false, message: "You are not authorized!" });

		const newHotel = new Hotel(req.body);
		try {
			const savedHotel = await newHotel.save();
			res.status(200).json({ success: true, message: "Create hotel successfully!", savedHotel });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//PUT /api/hotels/:id
	async update(req, res, next) {
		if (!req.isAdmin) return res.status(403).json({ success: false, message: "You are not authorized!" });
		try {
			const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
			res.status(200).json({ succes: true, updatedHotel });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//DELETE /api/hotels/:id
	async delete(req, res, next) {
		if (!req.isAdmin) return res.status(403).json({ success: false, message: "You are not authorized!" });
		try {
			await Hotel.findByIdAndDelete(req.params.id);
			res.status(200).json({ succes: true });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//GET /api/hotels/find/:id
	async getHotel(req, res, next) {
		try {
			const hotel = await Hotel.findOne({ _id: req.params.id });
			res.status(200).json(hotel);
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}
	//GET /api/hotels/
	async getAllHotels(req, res, next) {
		const { min, max, limit, ...others } = req.query;
		try {
			const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 999 } }).limit(limit);
			res.status(200).json(hotels);
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Server error" });
		}
	}
	//GET /api/hotels/countByCiTy
	async countByCity(req, res, next) {
		const cities = req.query.cities.split(",");
		try {
			const list = await Promise.all(
				cities.map((city) => {
					return Hotel.countDocuments({ city: city });
				})
			);
			res.status(200).json(list);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//GET /api/hotels/countByType
	async countByType(req, res, next) {
		try {
			const countHotels = await Hotel.countDocuments({ type: "hotel" });
			const countApartments = await Hotel.countDocuments({ type: "apartment" });
			const countResorts = await Hotel.countDocuments({ type: "resort" });
			const countVillas = await Hotel.countDocuments({ type: "villa" });
			res.status(200).json([
				{ type: "hotel", count: countHotels },
				{ type: "apartment", count: countApartments },
				{ type: "resort", count: countResorts },
				{ type: "villa", count: countVillas },
			]);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ success: false, message: "Server error" });
		}
	}

	//GET /hotels/room/:id
	async getHotelRooms(req, res, next) {
		try {
			const hotel = await Hotel.findById(req.params.id);
			const list = await Promise.all(
				hotel.rooms.map((room) => {
					return Room.findById(room);
				})
			);
			res.status(200).json(list);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ success: false, message: "Server error" });
		}
	}
}

module.exports = new HotelController();
