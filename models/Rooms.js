const mongoose = require("mongoose");

const room = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  appliances: [
    {
      appliance: {
        details: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Appliance",
        },
        count: {
          type: String,
          required: true,
        },
      },
    },
  ],
});

module.exports = mongoose.model("Room", room);
