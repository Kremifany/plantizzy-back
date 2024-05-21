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
    sort: {
      type: String,
      enum: [
        "fruiting",//tomatoes,peppers,bush beans,sugar snap peas,cucumbers
        "fruit",
        "medicinal",
        "herb",
        "leafy greens",
        "root crop",
        "flower",//zinnias,calendula,marigolds,chamomile,anise hyssop,strawflowers
      ],
      required:[true,"Please specify the sort of plant"],
      maxlength: 15
    },
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
    companionPlants: {
      type: [String],
    },
    frostResistant: {
      type: Boolean,
      required: [true, "Please provide if frost resistant"],
    },
    area: {
      type:[Number]
    },
  },
  { timestamps: true }
);

module.exports = {
  Plant: mongoose.model("Plant", plantSchema),
  plantSchema: plantSchema, 
};
