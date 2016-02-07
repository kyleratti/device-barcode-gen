var arrIMEI = {};
var arrSKUs = {
  "885909971343": "iPhone 6+ Space Gray 16GB",
  "885909971367": "iPhone 6+ Gold 16GB",
  "885909971350": "iPhone 6+ Silver 16GB",

  // begin iPhone 6s

  "888462500401": "iPhone 6s Rose Gold 16GB",
  "888462500395": "iPhone 6s Gold 16GB",
  "888462500388": "iPhone 6s Silver 16GB",
  "888462500371": "iPhone 6s Space Gray 16GB",

  "888462500418": "iPhone 6s Space Gray 64GB",
  "888462500432": "iPhone 6s Gold 64GB",

  "888462501545": "iPhone 6s+ Rose Gold 16GB",
  "888462501521": "iPhone 6s+ Silver 16GB",
  "888462501514": "iPhone 6s+ Space Gray 16GB",

  "888462501552": "iPhone 6s+ Space Gray 64GB",
  "888462501583": "iPhone 6s+ Rose Gold 64GB",
  "888462501576": "iPhone 6s+ Gold 64GB"
};

var strInProgressSKU = null;

$(function() {
  var objDeviceInput = $("#deviceInput");

  objDeviceInput.focus();
});

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
  $("#deviceInput").focus();
});

function processDeviceInputEntry() {
  var objDeviceInput = $("#deviceInput");
  var strDeviceText = objDeviceInput.val();

  if (strDeviceText.length == 12) {
    console.log("detected sku " + strDeviceText);

    if(arrSKUs[strDeviceText] != null) {
      strInProgressSKU = strDeviceText;
      console.log("matched sku " + strDeviceText + " to " + arrSKUs[strDeviceText]);
    }

    objDeviceInput.val("");
  } else if(strDeviceText.length == 15) {
    console.log("detected imei " + strDeviceText);
    var objDeviceList = $("#deviceList");
    objDeviceList.after('<div class="device" id="' + strDeviceText + '"></div>');

    var objBarcode = $("#" + strDeviceText).barcode(strDeviceText, "code128", {
      barHeight: 30
    });

    if(strInProgressSKU != null && strInProgressSKU != "") {
      objBarcode.prepend('<span class="deviceName">' + arrSKUs[strInProgressSKU] + '</span>');
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
