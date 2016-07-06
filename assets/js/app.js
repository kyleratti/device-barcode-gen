var COLOR_GOLD      = "colorGold";
var COLOR_ROSEGOLD  = "colorRoseGold";
var COLOR_SILVER    = "colorSilver";
var COLOR_SPACEGRAY = "colorSpaceGray";

var colorToDisplay = {
  [COLOR_GOLD]      : "Gold",
  [COLOR_ROSEGOLD]  : "Rose Gold",
  [COLOR_SILVER]    : "Silver",
  [COLOR_SPACEGRAY] : "Space Gray"
};

var MEM_16  = "mem16";
var MEM_32  = "mem32";
var MEM_64  = "mem64";
var MEM_128 = "mem128";

var memToDisplay = {
  [MEM_16]  : "16GB",
  [MEM_32]  : "32GB",
  [MEM_64]  : "64GB",
  [MEM_128] : "128GB"
};

var arrSKUs = {};
var arrIMEI = {};
var objInProgressSKU = null;

function SKU(strSKU, strName, strColor, strMemSize) {
  this.m_strSKU   = strSKU;
  this.m_strName  = strName;
  this.m_strColor = strColor;
  this.m_strMemSize = strMemSize;
}

SKU.prototype.getSKU        = function() {
  return this.m_strSKU;
}

SKU.prototype.getName       = function() {
  return this.m_strName;
}

SKU.prototype.getFullName    = function() {
  return this.m_strName + " " + this.getDisplayColor() + " " + this.getDisplayMemorySize();
}

SKU.prototype.getColor      = function() {
  return this.m_strColor;
}

SKU.prototype.getDisplayColor = function() {
  return colorToDisplay[this.getColor()];
}

SKU.prototype.getMemorySize = function() {
  return this.m_strMemSize;
}

SKU.prototype.getDisplayMemorySize  = function() {
  return memToDisplay[this.getMemorySize()];
}

SKU.prototype.getStyledName = function() {
  return '<span class="label label-default ' + this.getColor() + '">' + this.getName() + '</span>';
}

SKU.prototype.getStyledMemSize  = function() {
  return '<span class="label label-default ' + this.getMemorySize() + '">' + this.getDisplayMemorySize() + '</span>';
}

function registerSKU(strSKU, strName, strColor, strMemSize) {
  var objSKU = new SKU(strSKU, strName, strColor, strMemSize);
  if(objSKU == null) throw new Error("Tried registering SKU without providing SKU");

  arrSKUs[objSKU.getSKU()] = objSKU;
  console.log("Registered SKU " + objSKU.getSKU(), objSKU);
}

{
  { // iPhone 6
    // 16GB
    registerSKU("885909950751", "iPhone 6", COLOR_SILVER, MEM_16);
    registerSKU("885909950744", "iPhone 6", COLOR_SPACEGRAY, MEM_16);
  }

  { // iPhone 6+
    // 16GB
    registerSKU("885909971367", "iPhone 6 Plus", COLOR_GOLD, MEM_16);
    registerSKU("885909971350", "iPhone 6 Plus", COLOR_SILVER, MEM_16);
    registerSKU("885909971343", "iPhone 6 Plus", COLOR_SPACEGRAY, MEM_16);
  }

  { // iPhone 6s
    // 16GB
    registerSKU("888462500395", "iPhone 6s", COLOR_GOLD, MEM_16);
    registerSKU("888462500401", "iPhone 6s", COLOR_ROSEGOLD, MEM_16);
    registerSKU("888462500388", "iPhone 6s", COLOR_SILVER, MEM_16);
    registerSKU("888462500371", "iPhone 6s", COLOR_SPACEGRAY, MEM_16);

    // 64GB
    registerSKU("888462500432", "iPhone 6s", COLOR_GOLD, MEM_64);
    registerSKU("888462500449", "iPhone 6s", COLOR_ROSEGOLD, MEM_64);
    registerSKU("888462500425", "iPhone 6s", COLOR_SILVER, MEM_64);
    registerSKU("888462500418", "iPhone 6s", COLOR_SPACEGRAY, MEM_64);
  }

  { // iPhone 6s+
    // 16GB
    registerSKU("888462501538", "iPhone 6s Plus", COLOR_GOLD, MEM_16);
    registerSKU("888462501545", "iPhone 6s Plus", COLOR_ROSEGOLD, MEM_16);
    registerSKU("888462501521", "iPhone 6s Plus", COLOR_SILVER, MEM_16);
    registerSKU("888462501514", "iPhone 6s Plus", COLOR_SPACEGRAY, MEM_16);

    // 64GB
    registerSKU("888462501576", "iPhone 6s Plus", COLOR_GOLD, MEM_64);
    registerSKU("888462501583", "iPhone 6s Plus", COLOR_ROSEGOLD, MEM_64);
    registerSKU("888462501569", "iPhone 6s Plus", COLOR_SILVER, MEM_64);
    registerSKU("888462501552", "iPhone 6s Plus", COLOR_SPACEGRAY, MEM_64);
  }

  { // iPhone SE
    // 16GB
    registerSKU("888462803892", "iPhone SE", COLOR_GOLD, MEM_16);
    registerSKU("888462803908", "iPhone SE", COLOR_ROSEGOLD, MEM_16);
    registerSKU("888462734844", "iPhone SE", COLOR_SPACEGRAY, MEM_16);
    
    // 64GB
    registerSKU("888462803915", "iPhone SE", COLOR_GOLD, MEM_64);
    registerSKU("888462803922", "iPhone SE", COLOR_ROSEGOLD, MEM_64);
    registerSKU("888462773102", "iPhone SE", COLOR_SPACEGRAY, MEM_64);
  }

  { // iPad Pro
    // 9.7 inch
      // 32GB
      registerSKU("888462835268", "iPad Pro 9.7\"", COLOR_ROSEGOLD, MEM_32);
  }
}

$(function() {
  setInputFocus();
});

function setInputFocus() {
  $("#deviceInput").focus();
}

function updateDetectedSKU() {
  var objDetectedSKU = $("#detectedSKU");
  var objDetectedDeviceName = $("#detectedDeviceName");

  if(objInProgressSKU == null) {
    objDetectedSKU.hide();
  } else {
    objDetectedDeviceName.text(objInProgressSKU.getFullName());
    objDetectedSKU.show();
  }
}

$("#detectedSKU").click(function() {
  objInProgressSKU = null;
  updateDetectedSKU();
  setInputFocus();
});

function processDeviceInputEntry() {
  var objDeviceInput = $("#deviceInput");
  var strInput = objDeviceInput.val();

  // SKU detected
  if (strInput.length == 12) {
    console.log("detected SKU " + strInput);
    objInProgressSKU = arrSKUs[strInput];

    if(objInProgressSKU != null) {
      console.log("matched SKU " + strInput + " to " + objInProgressSKU.getFullName());
    }

    objDeviceInput.val("");
  }
  // IMEI detected
  else if(strInput.length == 15) {
    console.log("detected IMEI " + strInput);
    var objDeviceList = $("#deviceList");
    var objNewDevice = objDeviceList.after('<div class="device" id="' + strInput + '" data-imei="' + strInput + '"></div>');
    objNewDevice.data("imei", strInput);

    var objBarcode = $("#" + strInput).barcode(strInput, "code128", {
      barHeight: 27
    });

    console.log(objInProgressSKU);
    if(objInProgressSKU != null) {
      var strText = '<div class="deviceNameBox">' + objInProgressSKU.getStyledName() + ' ' + objInProgressSKU.getStyledMemSize() + '</div>';
      objBarcode.prepend(strText);
      objNewDevice.data("sku", objInProgressSKU.getSKU());
    }

    arrIMEI[strInput] = true;
    objInProgressSKU = null;
    objDeviceInput.val("");
  }

  updateDetectedSKU();
}

$("#generator").submit(function(event) {
  processDeviceInputEntry();
  event.preventDefault();
});

function addDevice(strSKU, strIMEI) {
  var objDeviceList = $("#deviceList");
  var strSKU = $("#deviceSKU").val();
  var strDeviceName = arrSKUs[strSKU] || "";
  objDeviceList.after('<div class="device" id="' + strIMEI + '" href="#"></div>');

  var objBarcode = $("#" + strIMEI).barcode(strIMEI, "code128", {
    barHeight: 30
  });

  if(strDeviceName != "") {
    objBarcode.prepend('<span class="deviceName">' + strDeviceName + '</span>');
  }

  arrIMEI[strIMEI] = true;
}
