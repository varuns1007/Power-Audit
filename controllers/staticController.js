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
    name: req.body.appliance.name,
    powerConsumption: req.body.appliance.powerConsumption,
  });

  await appliance.save((err, result) => {
    if (err) {
      if (err.code === 11000) {
        res.send("Appliance Already Exist's");
      } else {
        res.send(err);
      }
    } else {
      console.log(result);
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

module.exports.getRoomsList = async (req, res) => {
  await Room.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(result);
      console.log(err);
    });
};

module.exports.deleteRoom = async (req, res) => {
  console.log(req.body.roomId);
  await Room.findOneAndDelete({ _id: req.body.roomId })
    .then((result) => {
      console.log(result);
      res.send("Room Deleted");
    })
    .catch((err) => {
      res.send(result);
      console.log(err);
    });
};

module.exports.getRoom = async(req,res) => {
  let roomId = req.params.roomId;
  await Room.findOne({_id: roomId}).populate({
    path: 'appliances',
    populate: {
      path: 'details'
    }
  })
    .then((result)=> {
      // console.log(result)
      res.send(result)
    })
    .catch((err)=> {
      // console.log(err);
      res.send(err)
    })
}

module.exports.search = async (req,res) => {
  let query = req.query.text;
  await Room.find({ $text: { $search: query } })
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    res.send(err);
  })
}