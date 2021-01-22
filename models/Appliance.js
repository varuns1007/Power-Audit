const mongoose = require("mongoose");

const appliance = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  //In kWh
  powerConsumption: {
    type: Number,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Appliance", appliance);
