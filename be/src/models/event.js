const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: {
    place: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
