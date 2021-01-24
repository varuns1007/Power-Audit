const Room = require("../models/Room");
const Appliance = require("../models/Appliance");

module.exports.createRoom = async (req, res) => {
  let room = new Room({
    roomName: req.body.room.roomName,
    appliances: req.body.room.appliances,
  });

  await room.save((err, result) => {
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        res.send("Room Already Exist's");
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

module.exports.getApplianceList = async (req, res) => {
  await Appliance.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
