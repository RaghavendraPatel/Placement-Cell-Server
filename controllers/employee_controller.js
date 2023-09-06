const Employee = require("../models/employee");

module.exports.create = async (req, res) => {
  try {
    let employee = await Employee.findOne({ email: req.body.email });
    if (!employee) {
      await Employee.create(req.body);
      return res.status(200).json({
        success: true,
        message: "Employee created successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error creating Employee",
    });
  }
};

module.exports.createSession = async (req, res) => {
  try {
    const id = req.session.passport.user;
    const employee = await Employee.findById(id).select({
      name: 1,
      email: 1,
      _id: 1,
    });
    if (employee) {
      return res.status(200).json({
        message: "Sign in successful",
        success: true,
        user: employee,
      });
    } else {
      return res.status(400).json({
        message: "Error signing in",
        success: false,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error signing in",
      success: false,
    });
  }
};

module.exports.destroySession = (req, res) => {
  req.logout(() => {
    return res.status(200).json({
      message: "Successfully logged out",
      success: true,
    });
  });
};
