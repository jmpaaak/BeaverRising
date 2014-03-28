var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var players = [];
var disconnectedDev = [];
var Main = {
		
};
Main.button1;

Main.onLoad = function() {
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	
	// >> Register custom manager callback to receive device connect and disconnect events
	convergence.registerManagerCallback(Main.onDeviceStatusChange);

	// >> Initializes custom device profile and gets available devices
	convergence.getNServiceDevices(Main.onCustomObtained);

	this.button1=$("#button1");
	this.button1.css("background-color","green");

};

Main.onUnload = function() {

};

Main.enableKeys = function() {
	document.getElementById("anchor").focus();
};

Main.keyDown = function() {
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch (keyCode) {
	case tvKey.KEY_RETURN:
	case tvKey.KEY_PANEL_RETURN:
		alert("RETURN");
		break;
	case tvKey.KEY_LEFT:
		break;
	case tvKey.KEY_RIGHT:
		break;
	
	case tvKey.KEY_UP:
		alert("UP");
		break;
	case tvKey.KEY_DOWN:
		alert("DOWN");

		break;
	case tvKey.KEY_ENTER:
	case tvKey.KEY_PANEL_ENTER:
		alert("ENTER");
		break;
	default:
		alert("Unhandled key");
		break;
	}
};

Main.onDeviceStatusChange = function(sParam) {
	alert("#### onDeviceStatusChange - Device status change recieved ####");
	alert("#### onDeviceStatusChange - event type is " + sParam.eventType
			+ " ####");
	alert("#### onDeviceStatusChange - event device name is " + sParam.name
			+ " ####");
	alert("#### onDeviceStatusChange - event device type is "
			+ sParam.deviceType + " ####");

	switch (Number(sParam.eventType)) {
		case convergence.MGR_EVENT_DEV_CONNECT:
			if (sParam.deviceType == convergence.DEV_SMART_DEVICE)
				alert("#### onDeviceStatusChange - MGR_EVENT_DEV_CONNECT ####");

			if(classes.GameController.getInstance().getCurScene().name != "duelgame")
			{
				convergence.getNServiceDevices(Main.onNserviceDeviceObtained);
			}
			else 
			{
				convergence.getNServiceDevices(Main.obtainedInGame);
			}

			break;
		case convergence.MGR_EVENT_DEV_DISCONNECT:
			if (sParam.deviceType == convergence.DEV_SMART_DEVICE)
				alert("#### onDeviceStatusChange - MGR_EVENT_DEV_DISCONNECT ####");

			if(classes.GameController.getInstance().getCurScene().name != "duelgame")
			{
				convergence.getNServiceDevices(Main.onNserviceDeviceObtained);
			}
			else 
			{
				convergence.getNServiceDevices(Main.lostInGame);
			}

			break;
		default: 
			alert("#### onDeviceStatusChange - Unknown event ####");
			break;
	}
};

Main.onNserviceDeviceObtained = function (customs) {
		alert("#### onCustomObtained - found " + customs.length + " device(s) ####");
		for(var i = 0; i < customs.length; i++) {
			if (customs[i] != null
					&& customs[i].getType() == convergence.DEV_SMART_DEVICE) {
				alert("#### onNserviceDeviceObtained - get device instance:" + i);
				deviceInstance[i] = customs[i];
				deviceInstance[i].registerDeviceCallback(Main.onDeviceEvent);
				var local_message = new Object();
				local_message.info="player";
				local_message.order=i+"";
				deviceInstance[i].sendMessage(
						JSON.stringify(local_message)
				);
			}
		}
};

Main.obtainedInGame = function (customs) { //TODO
	for(var i=0; i<disconnectedDev.length; i++) {
		var devIndex = disconnectedDev[i].index,
			devInstance = disconnectedDev[i].instance;
		for(var j=0; j<customs.length; j++)
		{
			if(devInstance == customs[j])
			{
				deviceInstance[devIndex] = customs[j];
				deviceInstance[devIndex].registerDeviceCallback(Main.onDeviceEvent);
				var local_message = new Object();
				local_message.info="player";
				local_message.order=devIndex+"";
				deviceInstance[devIndex].sendMessage(
						JSON.stringify(local_message)
				);
				var layers = classes.GameController.getInstance().getCurScene().getChildren();
				layers[layers.length-1].addBeaverWithID(devIndex);
			}
		}
	}
};

Main.lostInGame = function (customs) {
	for(var i=0; i<deviceInstance.length; i++) {
		if(customs.length == 0) return;
		var j=0;
		while(deviceInstance[i] != customs[j])
		{
			if(j == customs.length-1)
			{
				var ddev = {};
				ddev.index = i;
				ddev.instance = deviceInstance[i];
				disconnectedDev.push(ddev);
				break;
			}
			j++;
		}
	}
};

Main.onDeviceEvent = function(sParam) {
	switch (Number(sParam.eventType)) {
		case convergence.DEV_EVENT_MESSAGE_RECEIVED:
//			alert("#### onDeviceEvent -1- DEV_EVENT_MESSAGE_RECEIVED:"
//					+ sParam.eventData.message);
			// sParam.sEventData.sMessage1 -> message body; sParam.sEventData.sMessage2 -> context
			Main.onMessageReceived(sParam.eventData.message, sParam.eventData.context);
			break;
		case convergence.DEV_EVENT_JOINED_GROUP:
			break;
		case convergence.DEV_EVENT_LEFT_GROUP:
			break;
		default:
			break;
	}
}

Main.onMessageReceived = function(message, context) {
	// message -> message body
	// context -> message context (headers and etc)
	
	var temp = JSON.parse(message);

//	this.button1.text(temp.event + " || " + temp.key);
	
	if(temp.event == "disconnect") {
		for(var i=0; i<players.length; i++)
		{
			alert("temp: "+temp.phoneNumber);
			alert("play: "+players[i]);

			if(players[i] == temp.phoneNumber && classes.GameController.getInstance().getCurScene().name == "duelgame")
			{
				var layers = classes.GameController.getInstance().getCurScene().getChildren();
				layers[layers.length-1].removeBeaverWithID(i);
			}
		}
	}

	if(temp.player=="playerNumber") {
		if(temp.order == "0") {
			players[0] = temp.phoneNumber;
			return;
		}
		if(temp.order == "1") {
			players[1]=temp.phoneNumber;
			return;
		}
		if(temp.order == "2") {
			players[2]=temp.phoneNumber;
			return;
		}
		if(temp.order == "3") {
			players[3]=temp.phoneNumber;
			return;
		}
	}
	
	var arr = classes.GameController.getInstance().getCurScene().getChildren(),
		target = arr[arr.length-1];
	
	if (temp.event == "key_down") {
		if(temp.key=="item"){
			if(temp.phoneNumber==players[0]){
				target.onKeyDown(BG.EVENT.PLAYER1.ITEM[0]);
			}
			else if(temp.phoneNumber==players[1]){
				target.onKeyDown(BG.EVENT.PLAYER2.ITEM[0]);
			}
			else if(temp.phoneNumber==players[2]){
				target.onKeyDown(BG.EVENT.PLAYER3.ITEM[0]);
			}
			else if(temp.phoneNumber==players[3]){
				target.onKeyDown(BG.EVENT.PLAYER4.ITEM[0]);
			}
			else{}
		}	
		else if(temp.key=="right")
		{
			if(temp.phoneNumber==players[0]){
				target.onKeyDown(BG.EVENT.PLAYER1.RIGHT[0]);
			}
			else if(temp.phoneNumber==players[1]){
				target.onKeyDown(BG.EVENT.PLAYER2.RIGHT[0]);
			}
			else if(temp.phoneNumber==players[2]){
				target.onKeyDown(BG.EVENT.PLAYER3.RIGHT[0]);
			}
			else if(temp.phoneNumber==players[3]){
				target.onKeyDown(BG.EVENT.PLAYER4.RIGHT[0]);
			}
			else{}	
		}
		else if(temp.key=="left") {
			if(temp.phoneNumber==players[0]){
				target.onKeyDown(BG.EVENT.PLAYER1.LEFT[0]);
			}
			else if(temp.phoneNumber==players[1]) {
				target.onKeyDown(BG.EVENT.PLAYER2.LEFT[0]);
			}
			else if(temp.phoneNumber==players[2]) {
				target.onKeyDown(BG.EVENT.PLAYER3.LEFT[0]);
			}
			else if(temp.phoneNumber==players[3]) {
				target.onKeyDown(BG.EVENT.PLAYER4.LEFT[0]);
			}
			else{}
		}
	}
	else if (temp.event == "key_up") {
		if (temp.key == "right") {
			if(temp.phoneNumber==players[0]){
				target.onKeyUp(BG.EVENT.PLAYER1.RIGHT[0]);
			}
			
			else if(temp.phoneNumber==players[1]){
				target.onKeyUp(BG.EVENT.PLAYER2.RIGHT[0]);
			}
			else if(temp.phoneNumber==players[2]){
				target.onKeyUp(BG.EVENT.PLAYER3.RIGHT[0]);
			}
			else if(temp.phoneNumber==players[3]){
				target.onKeyUp(BG.EVENT.PLAYER4.RIGHT[0]);
			}
			else{}
		}
		else if (temp.key == "left") {
			if(temp.phoneNumber==players[0]){
				target.onKeyUp(BG.EVENT.PLAYER1.LEFT[0]);
			}
			else if(temp.phoneNumber==players[1]){
				target.onKeyUp(BG.EVENT.PLAYER2.LEFT[0]);
			}
			else if(temp.phoneNumber==players[2]){
				target.onKeyUp(BG.EVENT.PLAYER3.LEFT[0]);
			}
			else if(temp.phoneNumber==players[3]){
				target.onKeyUp(BG.EVENT.PLAYER4.LEFT[0]);
			}
			else{}
		}
	}
	
};