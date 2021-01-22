const mongoose = require("mongoose");

const appliance = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  powerConsumption: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Appliance", appliance);
