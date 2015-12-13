var arrIMEI = {};
var iErrorNum = 0;

function addError(strError) {
  $("#error-log").append('<li id="error' + iErrorNum + '">' + strError + '</li>')
  $("#errors").removeClass("hidden");
  $("#error" + iErrorNum).delay(5000).fadeOut('slow');
  iErrorNum++;
}

$(function() {
  var objSKU = $("#deviceSKU");
  var objIMEI = $("#deviceIMEI");

  objIMEI.focus();
});

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
  var objTable = $("#deviceTable tr:last");
  objTable.after('<tr><td id="' + strIMEI + '"></td> <td><a href="#" id="del' + strIMEI + '"><span class="glyphicon glyphicon-remove"></span></a></td></tr>');

  $("#" + strIMEI).barcode(strIMEI, "code128");

  arrIMEI[strIMEI] = true;
}

function removeDevice(strIMEI) {
  //
}
