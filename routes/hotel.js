const express = require("express");
const router = express.Router();
const HotelController = require("../controllers/HotelController");
const { verifyToken } = require("../middlewares/auth");

router.post("/", verifyToken, HotelController.create);
router.put("/:id", verifyToken, HotelController.update);
router.delete("/:id", verifyToken, HotelController.delete);
router.get("/find/:id", HotelController.getHotel);
router.get("/", HotelController.getAllHotels);
router.get("/countByCity", HotelController.countByCity);
router.get("/countByType", HotelController.countByType);
router.get("/room/:id", HotelController.getHotelRooms);

module.exports = router;
