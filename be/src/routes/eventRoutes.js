const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const middlewareAuth = require("../middlewares/authMiddleware");

router.post("/create", middlewareAuth, eventController.createEvent);
router.get("/all", eventController.getAllEvents);
router.get("/filter", eventController.filterEvents);
router.get("/:userId", middlewareAuth, eventController.getUserEvents);
router.put("/:eventId", middlewareAuth, eventController.updateEvent);

module.exports = router;
