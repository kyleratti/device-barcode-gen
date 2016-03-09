var arrIMEI = {};
var arrSKUs = {
  // iPhone 5s

  // iPhone 6
    // 16GB
    // iPhone 6 Gold 16GB
    "885909950751": "iPhone 6 Silver 16GB",
    "885909950744": "iPhone 6 Space Gray 16GB",
    
    // 64GB
    // iPhone 6 Gold 64GB
    // iPhone 6 Silver 64GB
    // iPhone 6 Space Gray 64GB

  // iPhone 6+
    // 16GB
    "885909971367": "iPhone 6+ Gold 16GB",
    "885909971350": "iPhone 6+ Silver 16GB",
    "885909971343": "iPhone 6+ Space Gray 16GB",

  // iPhone 6s
    // 16GB
    "888462500395": "iPhone 6s Gold 16GB",
    "888462500401": "iPhone 6s Rose Gold 16GB",
    "888462500388": "iPhone 6s Silver 16GB",
    "888462500371": "iPhone 6s Space Gray 16GB",

    // 64GB
    "888462500432": "iPhone 6s Gold 64GB",
    "888462500449": "iPhone 6s Rose Gold 64GB",
    "888462500425": "iPhone 6s Silver 64GB",
    "888462500418": "iPhone 6s Space Gray 64GB",

  // iPhone 6s+
    // 16GB
    "888462501538": "iPhone 6s+ Gold 16GB",
    "888462501545": "iPhone 6s+ Rose Gold 16GB",
    "888462501521": "iPhone 6s+ Silver 16GB",
    "888462501514": "iPhone 6s+ Space Gray 16GB",

    // 64GB
    "888462501576": "iPhone 6s+ Gold 64GB",
    "888462501583": "iPhone 6s+ Rose Gold 64GB",
    "888462501569": "iPhone 6s+ Silver 64GB",
    "888462501552": "iPhone 6s+ Space Gray 64GB"
};

var strInProgressSKU = null;

$(function() {
  setInputFocus();
});

function setInputFocus() {
  $("#deviceInput").focus();
}

function updateDetectedSKU() {
  var objDetectedSKU = $("#detectedSKU");
  var objDetectedDeviceName = $("#detectedDeviceName");

  if(strInProgressSKU == null || arrSKUs[strInProgressSKU] == null) {
    objDetectedSKU.hide();
  } else {
    objDetectedDeviceName.text(arrSKUs[strInProgressSKU]);
    objDetectedSKU.show();
  }
}

$("#detectedSKU").click(function() {
  strInProgressSKU = null;
  updateDetectedSKU();
  setInputFocus();
});

function processDeviceInputEntry() {
  var objDeviceInput = $("#deviceInput");
  var strDeviceText = objDeviceInput.val();

  // SKU detected
  if (strDeviceText.length == 12) {
    console.log("detected SKU " + strDeviceText);

    if(arrSKUs[strDeviceText] != null) {
      strInProgressSKU = strDeviceText;
      console.log("matched SKU " + strDeviceText + " to " + arrSKUs[strDeviceText]);
    }

    objDeviceInput.val("");
  }
  // IMEI detected
  else if(strDeviceText.length == 15) {
    console.log("detected IMEI " + strDeviceText);
    var objDeviceList = $("#deviceList");
    var objNewDevice = objDeviceList.after('<div class="device" id="' + strDeviceText + '" data-imei="' + strDeviceText + '"></div>');
    objNewDevice.data("imei", strDeviceText);

    var objBarcode = $("#" + strDeviceText).barcode(strDeviceText, "code128", {
      barHeight: 27
    });

    if(strInProgressSKU != null && strInProgressSKU != "") {
      objBarcode.prepend('<span class="deviceName">' + arrSKUs[strInProgressSKU] + '</span>');
      objNewDevice.data("sku", strInProgressSKU);
    }

    arrIMEI[strDeviceText] = true;
    strInProgressSKU = null;
    objDeviceInput.val("");
  }

  updateDetectedSKU();
}

$("#generator").submit(function(event) {
  processDeviceInputEntry();
  event.preventDefault();
});

$(document).on("click", ".device", function(event) {
  var objDevice = $(this);
  var objIMEI = objDevice.data("imei");
  var objSKU = objDevice.data("sku");

  arrSKUs[objIMEI] = null;
  event.preventDefault();
  setInputFocus();
  objDevice.fadeOut(function() {
    objDevice.remove();
  });
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
