const Interview = require("../models/interview");
const Student = require("../models/student");

//get all interviews
module.exports.getAllInterviews = async function (req, res) {
  try {
    let interviews = await Interview.find({}).populate("students.student", {
      interviews: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    return res.status(200).json({
      message: "List of Interviews",
      interviews: interviews,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error fetching interviews",
    });
  }
};

//get interview details
module.exports.details = async function (req, res) {
  try {
    let interview = await Interview.findById(req.params.id);
    return res.status(200).json({
      message: "Interview details",
      interview: interview,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error fetching interview details",
    });
  }
};

//update interview details
module.exports.update = async function (req, res) {
  try {
    let interview = await Interview.findByIdAndUpdate(req.params.id, req.body);
    interview.save();
    return res.status(200).json({
      message: "Interview details updated",
      interview: interview,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error updating interview details",
    });
  }
};

//create interview
module.exports.create = async function (req, res) {
  console.log(req.body);
  try {
    await Interview.create(req.body);
    return res.status(200).json({
      message: "Interview created",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error creating interview",
    });
  }
};

//delete interview
module.exports.delete = async function (req, res) {
  try {
    const interview = await Interview.findById(req.params.id);
    // console.log(interview);
    // interview.students.forEach(async (student) => {
    //   await Student.findByIdAndUpdate(student.student, {
    //     $pull: { interviews: { interview: req.params.id } },
    //   });
    // });
    if (interview.students.length > 0) {
      return res.status(400).json({
        message: "Can not delete interview, Interview has students",
      });
    }
    await Interview.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Interview deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error deleting interview",
    });
  }
};

//add student to interview
module.exports.addStudent = async function (req, res) {
  try {
    let interview = await Interview.findById(req.params.id);
    let student = await Student.findOne({ email: req.body.email });
    let studentObject = { student: student._id, result: req.body.result };
    let interviewObject = {
      interview: interview._id,
      result: req.body.result,
    };

    interview.students.push(studentObject);
    interview.save();
    student.interviews.push(interviewObject);
    student.save();

    return res.status(200).json({
      message: "Student added to interview",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error adding student to interview",
    });
  }
};

//update student result in interview
module.exports.updateStudent = async function (req, res) {
  try {
    let interview = await Interview.findById(req.params.id);
    interview.students.forEach((student) => {
      if (student._id == req.body.studentId) {
        student.result = req.body.result;
      }
    });
    interview.save();
    await Student.findOne({ email: req.body.email }).then((student) => {
      student.interviews.forEach((interview) => {
        if (interview.interview._id == req.params.id) {
          interview.result = req.body.result;
          student.save();
        }
      });
    });
    return res.status(200).json({
      message: "Student result updated",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error updating student result",
    });
  }
};

//remove student from interview
module.exports.removeStudent = async function (req, res) {
  console.log(req.params.id, req.body);
  try {
    await Interview.findByIdAndUpdate(req.params.id, {
      $pull: { students: { student: req.body.studentId } },
    });
    await Student.findByIdAndUpdate(req.body.studentId, {
      $pull: { interviews: { interview: req.params.id } },
    });
    return res.status(200).json({
      message: "Student removed from interview",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error removing student from interview",
    });
  }
};

//get all students in interview
module.exports.getAllStudents = async function (req, res) {
  try {
    let interview = await Interview.findById(req.params.id).populate(
      "students"
    );
    return res.status(200).json({
      message: "List of students in interview",
      students: interview.students,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error fetching students in interview",
    });
  }
};
