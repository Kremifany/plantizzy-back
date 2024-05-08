const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide plant name"],
      maxlength: 50,
    },
    plantNameInLatin: {
      type: String,
      maxlength: 100,
    },
    sort: {},
    image: {
      type: String,
    },
    soil: {
      type: String,
      enum: [
        "acidic",
        "non acidic",
        "top soil",
        "well drained",
        "compost",
        "manure",
      ],
      default: "top soil",
    },
    suppliesNeeded: {
      type: String,
      enum: ["trellis", "cage"],
      required: false,
    },
    daysToharvest: {
      type: Number,
      ref: "User",
      required: [true, "Please provide days to harvest"],
    },
    daysBetweenWatering: {
      type: Number,
      ref: "User",
      required: [true, "Please provide days between watering"],
    },
    companionPlants: {},
    frostReasistant: {
      Type: bool,
      required: [true, "Please provide if frost resistant"],
    },
    sizeOfPlant: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plant", PlantSchema);
