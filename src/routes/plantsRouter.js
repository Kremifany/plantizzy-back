const express = require("express");
const router = express.Router();

const {
  getAllPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant,
} = require("../controllers/plantController");

router.route("/").post(createPlant).get(getAllPlants);
router.route("/:id").get(getPlant).delete(deletePlant).patch(updatePlant);

module.exports = router;
