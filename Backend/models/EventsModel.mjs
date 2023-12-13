import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    validate: [
      {
        validator: function (value) {
          const words = value.split(" ");

          return words.length <= 50;
        },
        message: "Description must not exceed 50 words.",
      },
    ],
  },
  category: {
    type: String,
    enum: ["professional development", "networking", "campus events"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timeFrom: {
    type: String,
    required: true,
  },
  timeTo: {
    type: String,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const EventModel = mongoose.model("Events", eventSchema);

export default EventModel;
