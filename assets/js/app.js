var arrIMEI = {};

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
      //alert(strText + " already added");
    } else {
      addDevice(strText);
    }

    objIMEI.val("");
  }
}

$("#deviceIMEI").on("input", processIMEIEntry);
$("#generator").submit(processIMEIEntry);

function addDevice(strIMEI) {
  var objTable = $("#deviceTable tr:last");
  objTable.after('<tr><td>' + strIMEI + '</td> <td id="' + strIMEI + '"></td> <td><a href="#" id="del' + strIMEI + '"><span class="glyphicon glyphicon-remove"></span></a></td></tr>');

  $("#" + strIMEI).barcode(strIMEI, "code128");

  arrIMEI[strIMEI] = true;
}

function removeDevice(strIMEI) {
  //
}
