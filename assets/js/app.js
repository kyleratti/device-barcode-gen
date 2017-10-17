var app = new StateManager();
var inventory = new InventoryManager();
app.setInventoryManager(inventory);

var arrSKUs = {};
var arrIMEI = {};
var objInProgressSKU = null;

function registerDevice(strIdentifier, strName, strColor, strMemSize) {
	var objDevice = new Device(strIdentifier, strName, strColor, strMemSize);
	if(objDevice == null) throw new Error("Tried registering device but failed");

	inventory.registerDevice(objDevice);
}

{
	{ // iPhone 6
		// 16GB
		registerDevice("885909950751", "iPhone 6", COLOR_SILVER, MEM_16);
		registerDevice("885909950744", "iPhone 6", COLOR_SPACEGRAY, MEM_16);
	}

	{ // iPhone 6+
		// 16GB
		registerDevice("885909971367", "iPhone 6 Plus", COLOR_GOLD, MEM_16);
		registerDevice("885909971350", "iPhone 6 Plus", COLOR_SILVER, MEM_16);
		registerDevice("885909971343", "iPhone 6 Plus", COLOR_SPACEGRAY, MEM_16);
	}

	{ // iPhone 6s
		// 16GB
		registerDevice("888462500395", "iPhone 6s", COLOR_GOLD, MEM_16);
		registerDevice("888462500401", "iPhone 6s", COLOR_ROSEGOLD, MEM_16);
		registerDevice("888462500388", "iPhone 6s", COLOR_SILVER, MEM_16);
		registerDevice("888462500371", "iPhone 6s", COLOR_SPACEGRAY, MEM_16);
		
		// 32GB
		registerDevice("190198058584", "iPhone 6s", COLOR_ROSEGOLD, MEM_32);
		registerDevice("190198058553", "iPhone 6s", COLOR_SPACEGRAY, MEM_32);

		// 64GB
		registerDevice("888462500432", "iPhone 6s", COLOR_GOLD, MEM_64);
		registerDevice("888462500449", "iPhone 6s", COLOR_ROSEGOLD, MEM_64);
		registerDevice("888462500425", "iPhone 6s", COLOR_SILVER, MEM_64);
		registerDevice("888462500418", "iPhone 6s", COLOR_SPACEGRAY, MEM_64);
	}

	{ // iPhone 6s+
		// 16GB
		registerDevice("888462501538", "iPhone 6s Plus", COLOR_GOLD, MEM_16);
		registerDevice("888462501545", "iPhone 6s Plus", COLOR_ROSEGOLD, MEM_16);
		registerDevice("888462501521", "iPhone 6s Plus", COLOR_SILVER, MEM_16);
		registerDevice("888462501514", "iPhone 6s Plus", COLOR_SPACEGRAY, MEM_16);
		
		// 32GB
		registerDevice("190198062277", "iPhone 6s Plus", COLOR_SPACEGRAY, MEM_32);
		registerDevice("190198062307", "iPhone 6s Plus", COLOR_ROSEGOLD, MEM_32);

		// 64GB
		registerDevice("888462501576", "iPhone 6s Plus", COLOR_GOLD, MEM_64);
		registerDevice("888462501583", "iPhone 6s Plus", COLOR_ROSEGOLD, MEM_64);
		registerDevice("888462501569", "iPhone 6s Plus", COLOR_SILVER, MEM_64);
		registerDevice("888462501552", "iPhone 6s Plus", COLOR_SPACEGRAY, MEM_64);
	}

	{ // iPhone SE
		// 16GB
		registerDevice("888462803892", "iPhone SE", COLOR_GOLD, MEM_16);
		registerDevice("888462803908", "iPhone SE", COLOR_ROSEGOLD, MEM_16);
		registerDevice("888462734844", "iPhone SE", COLOR_SPACEGRAY, MEM_16);
		
		// 64GB
		registerDevice("888462803915", "iPhone SE", COLOR_GOLD, MEM_64);
		registerDevice("888462803922", "iPhone SE", COLOR_ROSEGOLD, MEM_64);
		registerDevice("888462773102", "iPhone SE", COLOR_SPACEGRAY, MEM_64);
	}
	
	{ // iPhone 7
		// 32GB
		registerDevice("190198071934", "iPhone 7", COLOR_BLACK, MEM_32);
		registerDevice("190198071958", "iPhone 7", COLOR_GOLD, MEM_32);
		registerDevice("190198071965", "iPhone 7", COLOR_ROSEGOLD, MEM_32);
		registerDevice("190198071941", "iPhone 7", COLOR_SILVER, MEM_32);

		// 128GB
		registerDevice("190198071972", "iPhone 7", COLOR_BLACK, MEM_128);
		registerDevice("190198072009", "iPhone 7", COLOR_ROSEGOLD, MEM_128);
		registerDevice("190198072016", "iPhone 7", COLOR_JETBLACK, MEM_128);
	}
	
	{ // iPhone 7 Plus
		// 32GB
		registerDevice("190198157386", "iPhone 7 Plus", COLOR_ROSEGOLD, MEM_32);
		registerDevice("190198157355", "iPhone 7 Plus", COLOR_BLACK, MEM_32);
		registerDevice("190198157379", "iPhone 7 Plus", COLOR_GOLD, MEM_32);
	       
		// 128GB
		registerDevice("190198047748", "iPhone 7 Plus", COLOR_JETBLACK, MEM_128);
		registerDevice("190198047731", "iPhone 7 Plus", COLOR_ROSEGOLD, MEM_128);
	}
	
	{ // iPhone 8
		// 64GB
		registerDevice("190198451958", "iPhone 8", COLOR_SPACEGRAY, MEM_64);
	}

	{ // iPad Pro
		// 9.7 inch
			// 32GB
			registerDevice("888462835268", "iPad Pro 9.7\"", COLOR_ROSEGOLD, MEM_32);
	}

  { // Note7
    registerDevice("v1", "Note7 V1", COLOR_RED, MEM_64);
    registerDevice("v2", "Note7 V2", COLOR_GREEN, MEM_64);
  }
}

function setInputFocus() {
	$("#txtScanInput").focus();
}

function processSKUInput(strIdentifier) {
	if(getInputType(strIdentifier) != TYPE_SKU && getInputType(strIdentifier) != TYPE_UPC) {
		alert("attempted to process a SKU that wasn't a SKU (???)");
		return;
	}

	app.setDeviceInProgress(strIdentifier);
	app.rebuild();
}

function processNote7Input(strIdentifier) {
  if(getInputType(strIdentifier) != TYPE_NOTE7) {
    alert("attempted to process a Note7 that wasn't a Note7. How?");
    return;
  }

  app.setDeviceInProgress(strIdentifier);
  app.rebuild();
}

function proccessIMEIInput(strIMEI) {
	if(getInputType(strIMEI) != TYPE_IMEI) {
		alert("attempted to process an IMEI that wasn't an IMEI (?????????)");
		return;
	}

	var objDevice = inventory.getDevice(app.getDeviceInProgress());
	var objDeviceList = $("#deviceList");
	var objNewDevice = objDeviceList.after('<div class="device" id="' + strIMEI + '" data-imei="' + strIMEI + '"></div>');
	objNewDevice.data("imei", strIMEI);

	var objBarcode = $("#" + strIMEI).barcode(strIMEI, "code128", {
		barHeight: 27
	});

	if(app.isDeviceInProgress()) {
		var strText = '<div class="deviceNameBox">' + objDevice.getStyledName() + ' ' + objDevice.getStyledMemSize() + '</div>';
		objBarcode.prepend(strText);
		objNewDevice.data("identifier", objDevice.getIdentifier());
	}

	app.clearDeviceInProgress();
	app.rebuild();
}

function processInputEntry() {
	var txtScanInput = $("#txtScanInput");
	var strInputText = txtScanInput.val();

	var objInputType = getInputType(strInputText);

	if(objInputType == TYPE_NOTE7)
    processNote7Input(strInputText);
  else if(objInputType == TYPE_SKU || objInputType == TYPE_UPC)
		processSKUInput(strInputText);
	else if(objInputType == TYPE_IMEI)
		proccessIMEIInput(strInputText);
	else if(objInputType == TYPE_SIM)
		alert("Whoops, you accidentally scanned a SIM card");
	else
		alert("Unknown data type submitted. Please try again (or if you're not doing anything wrong, report this error)");

	txtScanInput.val("");
}

$("#generator").submit(function(objEvent) {
	processInputEntry();
	objEvent.preventDefault();
});

$(function() {
	var objDeviceStatus = $("#deviceStatus");
	var iNumDevices = inventory.getNumDevices();
	objDeviceStatus.html('currently supporting <span class="label label-warning">' + iNumDevices + '</span> device' + (iNumDevices == 1 ? '' : 's')).show();
	app.rebuild();
	setInputFocus();
});
