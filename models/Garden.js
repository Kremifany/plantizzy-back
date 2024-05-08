const mongoose = require("mongoose");

const GardenSchema = new mongoose.Schema(
  {
    logicId: {
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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    plants: {
      type: [Plant],
      maxlength: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Garden", GardenSchema);
