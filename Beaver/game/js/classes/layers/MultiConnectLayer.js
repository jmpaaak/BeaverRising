classes.layers.MultiConnectLayer = cc.Layer.extend({
	_connect1pImg: null,
	_connect2pImg: null,
	_connect3pImg: null,
	_connect3pImg: null,
	_connected: false,
	_curLayer: null,
	_mask: null,
	_devs: 1,
	ctor: function (layer) {
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this._curLayer = layer;
		this.setKeyboardEnabled(true);
		this.setPosition(cc.p(0,0));
		
        this._connect1pImg = cc.Sprite.create(s_Connect1pImg);
        this._connect2pImg = cc.Sprite.create(s_Connect2pImg);
        this._connect3pImg = cc.Sprite.create(s_Connect3pImg);
        this._connect4pImg = cc.Sprite.create(s_Connect4pImg);
		this._mask = cc.Sprite.create(s_Mask);
         
		this._connect1pImg.setPosition(size.width/2, size.height/2);
		this._connect2pImg.setPosition(size.width/2, size.height/2);
		this._connect3pImg.setPosition(size.width/2, size.height/2);
		this._connect4pImg.setPosition(size.width/2, size.height/2);
		this._mask.setPosition(size.width/2, size.height/2);
		
		this.addChild(this._mask, 1);
		this.addChild(this._connect1pImg, 2);
        
		this.schedule(this._findDevices, 0.1);
		
		return true;
	},
	_findDevices: function () {
		if(deviceInstance.length > 1)
		{
			if(this._devs == deviceInstance.length) return;
			var childs = this.getChildren();
			switch(deviceInstance.length)
			{
				case 2:
					this.removeChild(childs[0]);
					this.addChild(this._connect2pImg, 2);
					this._devs = 2;
					
					//TV MSG
		        	var local_message = new Object();
		    		local_message.sound = "ingame";
		    		deviceInstance[1].sendMessage(
		    				JSON.stringify(local_message)
		    		);
		    		
					break;
				case 3:
					this.removeChild(childs[0]);
					this.addChild(this._connect3pImg, 2);
					this._devs = 3;
					
					//TV MSG
		        	var local_message = new Object();
		    		local_message.sound = "ingame";
		    		deviceInstance[2].sendMessage(
		    				JSON.stringify(local_message)
		    		);
					
					break;				
				case 4:
					this.removeChild(childs[0]);
					this.addChild(this._connect4pImg, 2);
					this._devs = 4;
					
					//TV MSG
		        	var local_message = new Object();
		    		local_message.sound = "ingame";
		    		deviceInstance[3].sendMessage(
		    				JSON.stringify(local_message)
		    		);
					
					break;									
			}
			this._connected = true;
		}
	},
	onKeyDown: function(e) {
		if(this._connected)
		{
			switch(e)
			{
				case BG.EVENT.PLAYER1.ITEM[0]:
				case BG.EVENT.PLAYER1.ITEM[1]:
					this._curLayer.removeMultiConnect();
					this.removeChild(this._mask);
					classes.GameController.getInstance().setCurScene(new classes.scenes.DuelGameScene());
					break;
			}
		}
	}
});