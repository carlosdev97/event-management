const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventTime: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
