function InventoryManager() {
	this.m_arrDevices = {};
}

InventoryManager.prototype.registerDevice = function(objDevice) {
	this.m_arrDevices[objDevice.getIdentifier()] = objDevice;
	return objDevice;
}

InventoryManager.prototype.hasDevice = function(strInput) {
	return this.m_arrDevices[strInput] !== null;
}

InventoryManager.prototype.getDevice = function(strIdentifier) {
	return this.m_arrDevices[strIdentifier];
}

InventoryManager.prototype.getNumDevices = function() {
	return Object.keys(this.m_arrDevices).length;
}

function Device(strIdentifier, strName, strColor, strMemSize) {
	this.m_strIdentifier			= strIdentifier;
	this.m_objIdentifierType	= getInputType(strIdentifier);
	this.m_strName						= strName;
	this.m_strColor						= strColor;
	this.m_strMemSize					= strMemSize;
}

Device.prototype.getIdentifier = function() {
	return this.m_strIdentifier;
}

Device.prototype.getIdentifierType = function() {
	return this.m_objIdentifierType;
}

Device.prototype.getName = function() {
	return this.m_strName;
}

Device.prototype.getFullName = function() {
	return this.m_strName + " " + this.getDisplayColor() + " " + this.getDisplayMemorySize();
}

Device.prototype.getColor = function() {
	return this.m_strColor;
}

Device.prototype.getDisplayColor = function() {
	return colorToDisplay[this.getColor()];
}

Device.prototype.getMemorySize = function() {
	return this.m_strMemSize;
}

Device.prototype.getDisplayMemorySize = function() {
	return memToDisplay[this.getMemorySize()];
}

Device.prototype.getStyledName = function() {
	return '<span class="label label-default ' + this.getColor() + '">' + this.getName() + '</span>';
}

Device.prototype.getStyledMemSize = function() {
	return '<span class="label label-default ' + this.getMemorySize() + '">' + this.getDisplayMemorySize() + '</span>';
}
