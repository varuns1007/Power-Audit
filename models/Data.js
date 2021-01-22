const mongoose = require("mongoose");

const week = mongoose.Schema(
  {
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("Week", week);
