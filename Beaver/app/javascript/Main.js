var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var playerNumber=0;


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
	case convergence.MGR_EVENT_DEV_CONNECT: {
		alert("#### onDeviceStatusChange - MGR_EVENT_DEV_CONNECT ####");
		if (sParam.deviceType == convergence.DEV_SMART_DEVICE)
			break;
	}
	case convergence.MGR_EVENT_DEV_DISCONNECT: {
		alert("#### onDeviceStatusChange - MGR_EVENT_DEV_DISCONNECT ####");
		if (sParam.deviceType == convergence.DEV_SMART_DEVICE)
			alert("#### onDeviceStatusChange - MGR_EVENT_DEV_DISCONNECT ####");
		break;
	}
	default: {
		alert("#### onDeviceStatusChange - Unknown event ####");
		break;
	}
	}
	convergence.getNServiceDevices(Main.onNserviceDeviceObtained);
};

Main.onNserviceDeviceObtained = function(customs) {
	alert("#### onCustomObtained - found " + customs.length + " device(s) ####");
	for ( var i = 0; i < customs.length; i++) {
		if (customs[i] != null
				&& customs[i].getType() == convergence.DEV_SMART_DEVICE) {
			alert("#### onNserviceDeviceObtained - get device instance:" + i);
			deviceInstance[i] = customs[i];
			deviceInstance[i].registerDeviceCallback(Main.onDeviceEvent);
			var local_message=new Object();
			local_message.info="player";
			local_message.order=i+"";
			deviceInstance[i].sendMessage(
					JSON.stringify(local_message)
			);
		}
	}
}
Main.onDeviceEvent = function(sParam) {
	switch (Number(sParam.eventType)) {
	case convergence.DEV_EVENT_MESSAGE_RECEIVED:
		alert("#### onDeviceEvent -1- DEV_EVENT_MESSAGE_RECEIVED:"
				+ sParam.eventData.message);
		// sParam.sEventData.sMessage1 -> message body; sParam.sEventData.sMessage2 -> context
		Main.onMessageReceived(sParam.eventData.message,
				sParam.eventData.context);
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
	
	
	this.button1.text(temp.event + "  || "  + temp.key);
	
	
	
	if(temp.player=="playerNumber"){
		if(playerNumber==0){
			
			player1=temp.phoneNumber;
			
			playerNumber++;
		//	customs.length=1;
		}
		else if(playerNumber==1){
			
			player2=temp.phoneNumber;
			
			playerNumber++;
		//	customs.length=2;
		}
else if(playerNumber==2){
			
	player3=temp.phoneNumber;
	
	playerNumber++;
	//customs.length=3;
		}
else if(playerNumber==3){
	
	player4=temp.phoneNumber;
	
	playerNumber++;
//	customs.length=4;
}
else{
	
}
	}
	
	
	if (temp.event == "key_down") {
		
		alert(player1);
		alert(temp.phoneNumber);
		alert(playerNumber);
		
		
		if(temp.key=="item"){
			if(temp.phoneNumber==player1){
				var ev = new Event('keydown');
				ev.keyCode = 38;
				cc.canvas.dispatchEvent(ev);
				alert("sendMessage");
			}
			else if(temp.phoneNumber==player2){
				var ev = new Event('keydown');
				ev.keyCode = 69;
				cc.canvas.dispatchEvent(ev);
				alert("sendMessage");
			}
			else if(temp.phoneNumber==player3){
				var ev = new Event('keydown');
				ev.keyCode = 78;
				cc.canvas.dispatchEvent(ev);
				alert("sendMessage");
			}
			else if(temp.phoneNumber==player4){
				var ev = new Event('keydown');
				ev.keyCode = 80;
				cc.canvas.dispatchEvent(ev);
				alert("sendMessage");
			}
			else{}
		}	
		else if(temp.key=="right")
		{
			if(temp.phoneNumber==player1){
				var ev = new Event('keydown');
				ev.keyCode = 39;
				cc.canvas.dispatchEvent(ev);
			}
			
				else if(temp.phoneNumber==player2){
				var ev = new Event('keydown');
				ev.keyCode = 87;
				cc.canvas.dispatchEvent(ev);
			}
			else if(temp.phoneNumber==player3){
				var ev = new Event('keydown');
				ev.keyCode = 66;
				cc.canvas.dispatchEvent(ev);
			}
			else if(temp.phoneNumber==player4){
				var ev = new Event('keydown');
				ev.keyCode = 79;
				cc.canvas.dispatchEvent(ev);
			}
			else{}	
		}
		else if(temp.key=="left"){
			if(temp.phoneNumber==player1){
				var ev = new Event('keydown');
				ev.keyCode = 37;
				cc.canvas.dispatchEvent(ev);
			}
			
			else if(temp.phoneNumber==player2){
				var ev = new Event('keydown');
				ev.keyCode = 81;
				cc.canvas.dispatchEvent(ev);
			}
			else if(temp.phoneNumber==player3){
				var ev = new Event('keydown');
				ev.keyCode = 86;
				cc.canvas.dispatchEvent(ev);
			}
			else if(temp.phoneNumber==player4){
				var ev = new Event('keydown');
				ev.keyCode = 73;
				cc.canvas.dispatchEvent(ev);
			}
			else{}
		}
	}
	else if (temp.event == "key_up") {
		if (temp.key == "right") {
			if(temp.phoneNumber==player1){
				var ev = new Event('keyup');
				ev.keyCode = 39;
				cc.canvas.dispatchEvent(ev);
			}
			
			else if(temp.phoneNumber==player2){
				var ev = new Event('keyup');
				ev.keyCode = 87;
				cc.canvas.dispatchEvent(ev);
			}
			else if(temp.phoneNumber==player3){
				var ev = new Event('keyup');
				ev.keyCode = 66;
				cc.canvas.dispatchEvent(ev);
			}
			else if(temp.phoneNumber==player4){
				var ev = new Event('keyup');
				ev.keyCode = 79;
				cc.canvas.dispatchEvent(ev);
			}
			else{}
		}
		else if (temp.key == "left") {
			if(temp.phoneNumber==player1){
				var ev = new Event('keyup');
				ev.keyCode = 37;
				cc.canvas.dispatchEvent(ev);
			}
			
			else if(temp.phoneNumber==player2){
				var ev = new Event('keyup');
				ev.keyCode = 81;
				cc.canvas.dispatchEvent(ev);
			}
			else if(temp.phoneNumber==player3){
				var ev = new Event('keyup');
				ev.keyCode = 86;
				cc.canvas.dispatchEvent(ev);
			}
			else if(temp.phoneNumber==player4){
				var ev = new Event('keyup');
				ev.keyCode = 73;
				cc.canvas.dispatchEvent(ev);
			}
			else{}
		}
	}
	
};