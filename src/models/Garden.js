const mongoose = require("mongoose");
const GardenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please provide Id for the garden"],
      maxlength: 50,
    },
    location: {
      type: [Number],
      required: [true, "Please provide location"],
      maxlength: 4,
    },
    size: {
      type: [Number],
      required: [true, "Please provide size"],
      maxlength: 2,
    },
    lastDateWatered: [Number],
    plants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Plant",
        unique: "false",
        count: [Number],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Garden", GardenSchema);
