const mongoose = require("mongoose");

const week = mongoose.Schema(
  {
    weekNo: {
      type: "string",
      required: true,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Week", week);
