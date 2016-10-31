var TYPE_SKU			= 1;
var TYPE_UPC			= 2;
var TYPE_IMEI			= 3;
var TYPE_SIM			= 4;
var TYPE_NOTE7    = 5;
var TYPE_UNKNOWN	= 6;

var COLOR_GOLD			= "colorGold";
var COLOR_ROSEGOLD	= "colorRoseGold";
var COLOR_SILVER		= "colorSilver";
var COLOR_SPACEGRAY	= "colorSpaceGray";
var COLOR_BLACK			= "colorBlack";
var COLOR_JETBLACK	= "colorJetBlack";
var COLOR_RED       = "colorRed";
var COLOR_GREEN     = "colorGreen";

var MEM_16	= "mem16";
var MEM_32	= "mem32";
var MEM_64	= "mem64";
var MEM_128	= "mem128";
var MEM_256	= "mem256";

var colorToDisplay = {
	[COLOR_GOLD]			: "Gold",
	[COLOR_ROSEGOLD]	: "Rose Gold",
	[COLOR_SILVER]		: "Silver",
	[COLOR_SPACEGRAY]	: "Space Gray",
	[COLOR_BLACK]			: "Black",
	[COLOR_JETBLACK]	: "Jet Black",
  [COLOR_RED]       : "V1",
  [COLOR_GREEN]     : "V2"
};

var memToDisplay = {
	[MEM_16]	: "16GB",
	[MEM_32]	: "32GB",
	[MEM_64]	: "64GB",
	[MEM_128]	: "128GB",
	[MEM_256]	: "256GB",
};

function getInputType(strText) {
	//if($.isNumeric(strText)) {
    if(strText.length == 2 && (strText == "v1" || strText == "v2"))
      return TYPE_NOTE7;
		else if(strText.length == 8)
			return TYPE_SKU;
		else if(strText.length == 12)
			return TYPE_UPC;
		else if(strText.length == 15)
			return TYPE_IMEI;
		else if(strText.length == 19 && strText.substr(18, 18) == "F")
			return TYPE_SIM;
	//}

	return TYPE_UNKNOWN;
}

function StateManager() {
	this.m_strDevice						= null;
	this.m_objInventoryManager	= null;
}

StateManager.prototype.setInventoryManager = function(objInventoryManager) {
	this.m_objInventoryManager = objInventoryManager;
}

StateManager.prototype.getInventoryManager = function() {
	return this.m_objInventoryManager;
}

StateManager.prototype.setDeviceInProgress = function(strDevice) {
	this.m_strDevice = strDevice;
}

StateManager.prototype.clearDeviceInProgress = function() {
	this.m_strDevice = null;
}

StateManager.prototype.isDeviceInProgress = function() {
	return this.m_strDevice != null;
}

StateManager.prototype.getDeviceInProgress = function() {
	return this.m_strDevice;
}

StateManager.prototype.rebuild = function() {
	var objMatchedDeviceName = $("#lblMatchedDeviceName");

	if(this.isDeviceInProgress()) {
		var objDevice = this.getInventoryManager().getDevice(this.getDeviceInProgress());

    if(objDevice == null) {
      console.error("No device found", this.getDeviceInProgress(), this.getInventoryManager(), objDevice);
      alert("Internal error; please check console for details. Attempting recovery (but no promises!)");
      objMatchedDeviceName.html('');
    }
    else {
      objMatchedDeviceName.html(objDevice.getStyledName() + ' ' + objDevice.getStyledMemSize());
    }
	} else {
		objMatchedDeviceName.html('<span class="glyphicon glyphicon-barcode"></span>');
	}
}
