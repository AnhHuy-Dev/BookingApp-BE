const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/RoomController");
const { verifyToken } = require("../middlewares/auth");

router.post("/:hotelId", verifyToken, RoomController.create);
router.put("/:id", verifyToken, RoomController.updateRoom);
router.delete("/:id/:hotelId", verifyToken, RoomController.deleteRoom);

router.get("find/:id", RoomController.getRoom);
router.get("/", RoomController.getAllRoom);
router.put("/availability/:id", RoomController.updateRoomAvailability);

module.exports = router;
