const Garden = require("../models/Garden");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllGardens = async (req, res) => {
  const gardens = await Garden.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ gardens, count: gardens.length });
};

const getGarden = async (req, res) => {
  console.log(req.user, req.params);
  const {
    user: { userId },
    params: { id: gardenId },
  } = req;
  console.log("printing data", gardenId, userId);
  const garden = await Garden.findOne({ _id: gardenId, createdBy: userId });

  if (!garden) {
    throw new NotFoundError(`No garden with id :  ${gardenId}`);
  }
  res.status(StatusCodes.OK).json({ garden });
};

const createGarden = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const garden = await garden.create(req.body);
  res.status(StatusCodes.CREATED).json({ garden });
};

const updateGarden = async (req, res) => {
  console.log(req.user, req.params);
  const {
    user: { userId },
    params: { id: gardenId },
    body: { company, position },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("Company or position fields cannot be empty");
  }
  console.log("printing data", gardenId, userId, company, position);
  const garden = await Garden.findByIdAndUpdate(
    { _id: gardenId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!garden) {
    throw new NotFoundError(`No garden with id :  ${gardenId}`);
  }

  res.status(StatusCodes.OK).json({ garden });
};

const deleteGarden = async (req, res) => {
  console.log(req.user, req.params);
  const {
    user: { userId },
    params: { id: gardenId },
  } = req;

  console.log("printing data", gardenId, userId);
  const garden = await Garden.findByIdAndRemove({
    _id: gardenId,
    createdBy: userId,
  });

  if (!garden) {
    throw new NotFoundError(`No garden with id :  ${gardenId}`);
  }

  res.status(StatusCodes.OK).json({ garden });
};

module.exports = {
  getAllGardens,
  getGarden,
  createGarden,
  updateGarden,
  deleteGarden,
};
