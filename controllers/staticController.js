const Room = require("../models/Room");
const Appliance = require("../models/Appliance");
const Data = require("../models/Data");
var schedule = require('node-schedule');

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
  console.log(req.params.filter);
  if(req.params.filter === 'all'){
    await Room.find({}).populate({
      path:'appliances',
      populate: {
        path:'details'
      }
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(result);
        console.log(err);
      });
  } else{
    await Room.find({roomName:req.params.filter})
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        res.send(result);
        console.log(err);
    });
  }
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

module.exports.deleteAppliance = async (req, res) => {
  console.log(req.body.applianceId);
  await Appliance.findOneAndDelete({ _id: req.body.applianceId })
    .then((result) => {
      console.log(result);
      res.send("Appliance Deleted");
    })
    .catch((err) => {
      res.send(result);
      console.log(err);
    });
};

module.exports.weeklyreportPage = async (req, res) => {
  await Data.find({})
    .populate({
      path: "rooms",
      populate: {
        path: "appliances",
        populate: {
          path: "details",
        },
      },
    })
    .then((result) => {
      // console.log(result);
      // Week
      result.forEach((week) => {
        // Rooms
        week.rooms.forEach((room) => {
          let totalPowerConsumption = 0;
          // console.log("room", room);
          // Appliances in Room
          room.appliances.forEach((appliance) => {
            totalPowerConsumption +=
              appliance.details.powerConsumption *
              appliance.count *
              appliance.hoursUsed;
          });
          // console.log("totalPowerConsumption", totalPowerConsumption);
          room.totalPowerConsumption = totalPowerConsumption;
        });
      });
      // console.log(result);
      res.render("week report", { data: result });
      // res.send(result);
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

// module.exports.search = async (req,res) => {
//   let query = req.query.text;
//   await Room.find({ $text: { $search: query } })
//   .then((result)=>{
//     res.send(result);
//   })
//   .catch((err)=>{
//     res.send(err);
//   })
// }

async function createWeeklyReport(){
  let rooms = await Room.find({});
  // console.log(rooms);
  
  let weeks = await Data.countDocuments();
  // console.log("weeks", weeks);
  
  let weekData = new Data({
    weekNo: weeks + 1,
    rooms: rooms,
  });
  // console.log("data", weekData);
  
  weekData.save().then((result)=>{
    console.log('Saved');
  }).catch((err)=>{
    console.log(err);
  });
}

var j = schedule.scheduleJob({hour: 11, minute: 16, dayOfWeek: 1}, function(){
  createWeeklyReport()
  console.log('Weekly Report Saved');
});
