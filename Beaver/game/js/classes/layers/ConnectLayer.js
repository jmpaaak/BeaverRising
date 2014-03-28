classes.layers.ConnectLayer = cc.LayerColor.extend({
	_connected: false,
	_bgNotConnected: null,
	_bgConnected: null,
	init: function() {
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this.setKeyboardEnabled(true);
		this.setPosition(cc.p(0,0));
		this.setColor(cc.c3b(255,255,255));
		
        this._bgNotConnected = cc.Sprite.create(s_bgNotConnected);
        this._bgConnected = cc.Sprite.create(s_bgConnected);
        
		this._bgNotConnected.setPosition(size.width/2, size.height/2);
		this._bgConnected.setPosition(size.width/2, size.height/2);
		
		this.addChild(this._bgNotConnected);
        
		this.schedule(this._findDevices, 0.5);
		
		return true;
	},
	_findDevices: function () {
		if(!this._connected)
		{
			if(deviceInstance.length > 0)
			{
				this.removeChild(this._bgNotConnected);
				this.addChild(this._bgConnected);
				this._connected = true;
			}
		}
	},
	onKeyDown: function(e) {
		if(this._connected)
		{
			switch(e)
			{
				case BG.EVENT.PLAYER1.ITEM[0]:
				case BG.EVENT.PLAYER1.ITEM[1]:
					cc.LoaderScene.preload(g_resources_story, function() {
						classes.GameController.getInstance().setCurScene(classes.scenes.StoryScene.getInstance());
					}, this);
					break;
			}
		}
	}
});