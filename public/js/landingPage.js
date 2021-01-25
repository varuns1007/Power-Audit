let appliancesList = [];
let addedAppliances = [];
let allRooms = [];
window.onload = function () {
  getRooms("all");
  getApplianceList();
};

function getApplianceList() {
  axios.get("/appliancelist").then((response) => {
    if (response.data) {
      appliancesList = response.data;
      // console.log(appliancesList);
      let applianceInput = document.getElementById("applianceInput");
      let appliancesDivision = document.getElementById("appliancesDivision");
      appliancesList.forEach((appliance) => {
        let option = document.createElement("option");
        option.innerHTML = appliance.name;
        applianceInput.appendChild(option);

        let applianceDiv = document.createElement("div");
        applianceDiv.className = "col-lg-4 col-md-4 col-12 mt-3";
        applianceDiv.innerHTML = `
        <div
                  class="card border-success mb-3 h-100"
                  style="max-width: 18rem"
                >
                  <div class="card-body text-success">
                    <h5 class="card-title align-middle">${appliance.name}</h5>
                    <h6> Power Consumption:- ${appliance.powerConsumption} kw</h6>
                  </div>
                  <div class="card-footer d-flex justify-content-center">
                    
                    <div
                    class="edit-icon "
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete Room"
                    style="cursor: pointer"
                    onclick=deleteAppliance('${appliance._id}')
                  >
                    <span class="material-icons"> delete </span>
                  </div>
                  </div>
                </div>`;
        appliancesDivision.appendChild(applianceDiv);
      });
    }
  });
}

function applianceSelected() {
  let applianceName = document.getElementById("applianceInput").value;
  appliancesList.forEach((appliance) => {
    if (appliance.name === applianceName) {
      document.getElementById("powerInput").value = appliance.powerConsumption;
    }
  });
}

function addAppliance() {
  let applianceList = document.getElementById("selectedAppliances");
  let applianceName = document.getElementById("applianceInput").value;
  let quantity = document.getElementById("quantityInput").value;
  let power = document.getElementById("powerInput").value;
  let hoursUsed = document.getElementById("hoursUsed").value;

  let id = appliancesList.find((i) => i.name === applianceName);
  console.log(id);
  let appliance = {
    details: id._id,
    count: quantity,
    hoursUsed: hoursUsed,
  };

  if (addedAppliances.some((obj) => obj["details"] === id._id)) {
    showToast("Similar Appliance Already Added");
    return false;
  }

  addedAppliances.push(appliance);
  if (applianceName && +quantity && +power && +hoursUsed) {
    let applianceDiv = document.createElement("div");
    applianceDiv.className = "appliance row no-gutters";
    applianceDiv.innerHTML = `
    <h6>${applianceName}</h6>
    <div class="col-lg-4 col-12">
      <label for="applianceInput" class="form-label">
        Quantity
      </label>
      :-
      <span>${quantity}</</span>
    </div>
    <div class="col-lg-8 col-12">
      <label for="applianceInput" class="form-label">
        Power Consumption
      </label>
      :-
      <span>${power}</span> kwH
    </div>
    <div class="col-lg-8 col-12">
      <label for="applianceInput" class="form-label">
        Hour's Used/week
      </label>
      :-
      <span>${hoursUsed}</span> Hrs
    </div>
  `;
    applianceList.appendChild(applianceDiv);
  } else {
    showToast("Please Fill all Fields");
    return false;
  }
}

function addRoom() {
  let roomName = document.getElementById("roomName").value;

  if (!roomName.length) {
    showToast("Please Add Room Name");
    return false;
  }

  if (!addedAppliances) {
    showToast("Appliance's List is Empty");
    return false;
  }

  let room = {
    roomName: roomName,
    appliances: addedAppliances,
  };

  axios.post("/createroom", { room }).then((response) => {
    console.log(response);
    if (response.data === "Room Added") {
      location.reload();
    } else if (response.data === "Room Already Exist's") {
      showToast("Room Already Exist's");
    }
  });
}

function showToast(message) {
  document.getElementById("toast").style.display = "block";
  document.getElementById("toastMessage").innerHTML = message;
  document.getElementById("toast").style.opacity = "1";
  setTimeout(function () {
    document.getElementById("toast").style.opacity = "0";
  }, 3000);
  setTimeout(function () {
    document.getElementById("toast").style.display = "none";
  }, 3700);
}

function addNewAppliance() {
  applianceName = document.getElementById("applianceName").value;
  powerConsumption = document.getElementById("powerConsumption").value;

  if (!applianceName.length) {
    showToast("Please Give a Appliance Name");
    return false;
  }

  if (!powerConsumption.length) {
    showToast("Please Give a Power Consumption ");
    return false;
  }

  let appliance = {
    name: applianceName,
    powerConsumption: powerConsumption,
  };

  axios.post("/addNewAppliance", { appliance }).then((response) => {
    console.log(response);
    if (response.data === "Appliance Added") {
      location.reload();
    } else if (response.data === "Appliance Already Exist's") {
      showToast("Room Already Exist's");
    }
  });
}

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

function getRooms(filter) {
  document.getElementById("roomsContainer").innerHTML = "";
  axios.get(`/getroomslist/${filter}`).then((response) => {
    // console.log(response);
    if (response) {
      allRooms = response.data;
      let roomsContainer = document.getElementById("roomsContainer");
      response.data.forEach((room) => {
        let roomDiv = document.createElement("div");
        roomDiv.className = "col";
        roomDiv.innerHTML = `
                <div
                  class="card border-success mb-3 h-100"
                  style="max-width: 18rem"
                >
                  <div class="card-body text-success">
                    <h5 class="card-title align-middle">${room.roomName}</h5>
                  </div>
                  <div class="card-footer d-flex justify-content-between">
                    <div
                      class="info-icon "
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Power usage of the Room"
                      style="cursor: pointer"
                      onclick='showInfo("${room._id}")'
                    >
                      <span class="material-icons"> info </span>
                    </div>
                    <div
                    class="edit-icon "
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete Room"
                    style="cursor: pointer"
                    onclick=deleteRoom('${room._id}')
                  >
                    <span class="material-icons"> delete </span>
                  </div>
                  </div>
                </div>
              `;
        roomsContainer.appendChild(roomDiv);

        // Add Room option in Search bar
        let datalist = document.getElementById("roomsList");
        let option = document.createElement("option");
        option.innerHTML = room.roomName;
        datalist.appendChild(option);
      });
    } else {
      // getRooms('all')
    }
  });
}

function deleteRoom(roomId) {
  debugger;
  axios.post("/deleteroom", { roomId }).then((response) => {
    if (response.data === "Room Deleted") {
      showToast("Room Deleted successfully");
      setTimeout(function () {
        location.reload();
      }, 3500);
    }
  });
}

function deleteAppliance(applianceId) {
  debugger;
  axios.post("/deleteappliance", { applianceId }).then((response) => {
    if (response.data === "Appliance Deleted") {
      showToast("Appliance Deleted successfully");
      setTimeout(function () {
        location.reload();
      }, 3500);
    }
  });
}

function searchRoom() {
  filter = document.getElementById("searchRoomInput").value;
  if(filter.length){
    getRooms(filter);
  } else{
    getRooms('all');

  }
}

function showInfo(roomId) {
  console.log(roomId);
  console.log(allRooms);
  let roomInfo = allRooms.find((room) => room._id === roomId);
  console.log(roomInfo);

  let modalHeaderDiv = document.getElementById("modalHeader");
  modalHeaderDiv.innerHTML = roomInfo.roomName;

  document.getElementById("displayAppliances").innerHTML = "<h4>Appliances List</h4>";
  roomInfo.appliances.forEach((appliance) => {
    let applianceDiv = document.createElement("div");
    applianceDiv.className = "appliance row no-gutters";
    applianceDiv.innerHTML = `
    <h6>${appliance.details.name}</h6>
    <div class="col-lg-4 col-12">
      <label for="applianceInput" class="form-label">
        Quantity
      </label>
      :-
      <span>${appliance.count}</</span>
    </div>
    <div class="col-lg-8 col-12">
      <label for="applianceInput" class="form-label">
        Power Consumption
      </label>
      :-
      <span>${appliance.details.powerConsumption}</span> kwH
    </div>
    <div class="col-lg-8 col-12">
      <label for="applianceInput" class="form-label">
        Hour's Used/week
      </label>
      :-
      <span>${appliance.hoursUsed}</span> Hrs
    </div>
  `;
    document.getElementById("displayAppliances").appendChild(applianceDiv);
  });

  $("#infoModal").modal("show");
}
