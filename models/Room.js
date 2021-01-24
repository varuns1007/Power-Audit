const mongoose = require("mongoose");

const room = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
  },

  appliances: [
    {
      details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appliance",
      },
      count: {
        type: String,
        required: true,
      },
      hoursUsed: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Room", room);
