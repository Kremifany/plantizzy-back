const Plant = require("../models/Plant");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllPlants = async (req, res) => {
  const plants = await Plant.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ plants, count: plants.length });
};

const getPlant = async (req, res) => {
  console.log(req.user, req.params);
  const {
    user: { userId },
    params: { id: plantId },
  } = req;
  console.log("printing data", plantId, userId);
  const plant = await Plant.findOne({ _id: plantId, createdBy: userId });

  if (!plant) {
    throw new NotFoundError(`No plant with id :  ${plantId}`);
  }
  res.status(StatusCodes.OK).json({ plant });
};

const createPlant = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const plant = await Plant.create(req.body);
  res.status(StatusCodes.CREATED).json({ plant });
};

const updatePlant = async (req, res) => {
  console.log(req.user, req.params);
  const {
    user: { userId },
    params: { id: plantId },
    body: { company, position },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("Company or position fields cannot be empty");
  }
  console.log("printing data", plantId, userId, company, position);
  const plant = await Plant.findByIdAndUpdate(
    { _id: plantId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!plant) {
    throw new NotFoundError(`No plant with id :  ${plantId}`);
  }

  res.status(StatusCodes.OK).json({ plant });
};

// const updatePlant = async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const studentId = req.params.id;

//     const { name, grade, tutorInfo, tutorToRemove, image } = req.body;
//     if (!name && !grade && !tutorInfo && !tutorToRemove && !image) {
//       throw new BadRequestError("Please provide at least one value to update");
//     }

//     const student = await Student.findOne({ _id: studentId, parentId: userId });

//     if (!student) {
//       throw new NotFoundError(`No student with id: ${studentId}`);
//     }

//     let updatedFields = {};

//     if (name) updatedFields.name = name;
//     if (grade) updatedFields.grade = grade;
//     if (image) updatedFields.image = image;

//     if (tutorToRemove) {
//       const { tutorId, subject } = tutorToRemove;
//       updatedFields.$pull = {
//         tutorInfo: { tutorId: tutorId, subject: subject },
//       };
//     } else if (tutorInfo && tutorInfo.length > 0) {
//       const tutor = await Tutor.findOne({
//         _id: tutorInfo[0].tutorId,
//       }).populate("userId", "firstName lastName");
//       if (!tutor) {
//         throw new NotFoundError(`No tutor with id: ${tutorInfo[0].tutorId}`);
//       }
//       tutorInfo[0].tutorName = `${tutor.userId.firstName} ${tutor.userId.lastName}`;
//       updatedFields.$push = { tutorInfo: tutorInfo[0] };
//     }

//     const updatedStudent = await Student.findByIdAndUpdate(
//       studentId,
//       updatedFields,
//       { new: true }
//     );

//     res.status(StatusCodes.OK).json({
//       student: updatedStudent,
//       msg: "Student info has been successfully updated",
//     });
//   } catch (err) {
//     console.error("Error fetching student:", err);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
//   }
// };

const deletePlant = async (req, res) => {
  console.log(req.user, req.params);
  const {
    user: { userId },
    params: { id: plantId },
  } = req;

  console.log("printing data", plantId, userId);
  const plant = await Plant.findByIdAndRemove({
    _id: plantId,
    createdBy: userId,
  });

  if (!plant) {
    throw new NotFoundError(`No plant with id :  ${plantId}`);
  }

  res.status(StatusCodes.OK).json({ plant });
};

module.exports = {
  getAllPlants,
  getPlant,
  createPlant,
  updatePlant,
  deletePlant,
};
