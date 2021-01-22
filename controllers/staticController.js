const Room = require("../models/Room");
const Appliance = require("../models/Appliance");

module.exports.createRoom = async (req, res) => {
  let room = new Room({
    roomName: req.body.roomName,
    appliances: req.body.appliances,
  });

  await room.save((err, result) => {
    if (err) {
      if (err.code === 11000) {
        res.send("Item Already Exist's");
      } else {
        res.send(err);
      }
    } else {
      res.send("Room Added");
    }
  });
};

module.exports.createAppliance = async (req, res) => {
  let appliance = new Appliance({
    name: req.body.name,
    powerConsumption: req.body.powerConsumption,
  });

  await appliance.save((err, result) => {
    if (err) {
      if (err.code === 11000) {
        res.send("Item Already Exist's");
      } else {
        res.send(err);
      }
    } else {
      res.send("Appliance Added");
    }
  });
};
