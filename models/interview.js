const mongoose = require("mongoose");

//create interview schema
const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        result: {
          type: String,
          default: "On Hold",
          enum: ["Pass", "Fail", "On Hold", "Did not appear"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);
module.exports = Interview;
