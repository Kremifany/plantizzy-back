const express = require("express");
const router = express.Router();

const {
  getAllGardens,
  getGarden,
  createGarden,
  updateGarden,
  deleteGarden,
} = require("../controllers/gardenController");

router.route("/").post(createGarden).get(getAllGardens);
router.route("/:id").get(getGarden).delete(deleteGarden).patch(updateGarden);

module.exports = router;
