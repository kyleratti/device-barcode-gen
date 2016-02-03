var arrIMEI = {};
var iErrorNum = 0;

$(function() {
  var objSKU = $("#deviceSKU");
  var objIMEI = $("#deviceIMEI");

  objIMEI.focus();
});

function addError(strError) {
  $("#error-log").append('<li id="error' + iErrorNum + '">' + strError + '</li>')
  $("#errors").removeClass("hidden");
  $("#error" + iErrorNum).delay(5000).fadeOut('slow');
  iErrorNum++;
}

function processIMEIEntry() {
  var objIMEI = $("#deviceIMEI");
  var strText = objIMEI.val();

  if(strText.length == 15) {
    if(arrIMEI[strText] == true) {
      addError("IMEI <b>" + strText + "</b> has already been added");
    } else {
      addDevice(strText);
    }

    objIMEI.val("");
    objIMEI.focus();
  }
}

$("#deviceIMEI").on("input", processIMEIEntry);
$("#generator").submit(processIMEIEntry);

function addDevice(strIMEI) {
  var objDeviceList = $("#deviceList");
  objDeviceList.after('<div class="device" id="' + strIMEI + '" href="#"></div>');

  $("#" + strIMEI).barcode(strIMEI, "code128", {
    barHeight: 30
  });

  arrIMEI[strIMEI] = true;
}
