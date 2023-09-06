const Student = require("../models/student");
const Interview = require("../models/interview");

//get all students
module.exports.getAllStudents = async function (req, res) {
  try {
    let students = await Student.find({}).populate("interviews.interview", {
      students: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    return res.status(200).json({
      message: "List of Students",
      students: students,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error fetching students",
    });
  }
};

//get student profile
module.exports.profile = async function (req, res) {
  try {
    let student = await Student.findById(req.params.id).populate(
      "interviews.interview"
    );
    return res.status(200).json({
      message: "Student profile",
      student: student,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error fetching student profile",
    });
  }
};

//update student profile
module.exports.update = async function (req, res) {
  console.log(req.body);
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
      message: "Student profile updated",
      student: student,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error updating student profile",
    });
  }
};

//create student profile
module.exports.create = async function (req, res) {
  try {
    let student = await Student.findOne({ email: req.body.email });
    if (!student) {
      await Student.create(req.body);
      return res.status(200).json({
        message: "Student created successfully",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Student already exists",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error creating student",
      success: false,
    });
  }
};

//delete student profile
module.exports.delete = async function (req, res) {
  console.log(req.params.id);
  try {
    await Student.findById(req.params.id).then(async (student) => {
      for (let i = 0; i < student.interviews.length; i++) {
        await Interview.findByIdAndUpdate(student.interviews[i].interview, {
          $pull: { students: { student: req.params.id } },
        });
      }
    });

    await Student.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error deleting student",
    });
  }
};
