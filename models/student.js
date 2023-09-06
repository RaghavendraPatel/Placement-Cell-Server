const mongoose = require("mongoose");

//create schema for student
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roll_no: {
      type: Number,
      required: true,
      unique: true,
    },
    branch: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    score: {
      dsa: {
        type: Number,
        default: 0,
      },
      webd: {
        type: Number,
        default: 0,
      },
      react: {
        type: Number,
        default: 0,
      },
    },

    placement: {
      type: Boolean,
      default: false,
    },

    interviews: [
      {
        interview: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Interview",
        },
        result: {
          type: String,
          enum: ["Pass", "Fail", "On Hold", "Did not appear"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
