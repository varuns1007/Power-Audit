let appliancesList = [];
let addedAppliances = [];
window.onload = function () {
  getApplianceList();
};

function getApplianceList() {
  axios.get("/appliancelist").then((response) => {
    if (response.data) {
      appliancesList = response.data;
      console.log(appliancesList);
      let applianceInput = document.getElementById("applianceInput");
      appliancesList.forEach((appliance) => {
        let option = document.createElement("option");
        option.innerHTML = appliance.name;
        applianceInput.appendChild(option);
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
    return;
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
    return;
  }
}

function addRoom() {
  let roomName = document.getElementById("roomName").value;

  if (!roomName.length) {
    showToast("Please Add Room Name");
    return;
  }

  if (!addedAppliances) {
    showToast("Appliance's List is Empty");
    return;
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
    return;
  }

  if (!powerConsumption.length) {
    showToast("Please Give a Power Consumption ");
    return;
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
