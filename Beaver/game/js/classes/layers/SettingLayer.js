classes.layers.SettingLayer = cc.Layer.extend({
	_curLayer: null,
	_size : null,
	_board: null,
	_curSetting: 0,
	_settingChoice: null,
	_changingStatus: null,
	_curSoundStatus: true,
	_soundStatus: null,
	
	
	ctor: function (layer) {
		this.size = cc.Director.getInstance().getWinSize();
		this._super();
		this._curLayer = layer;
		this.setKeyboardEnabled(true);
		this._changingStatus = "setting";
		var mask = cc.Sprite.create(s_Mask);
		mask.setPosition(this.size.width / 2, this.size.height /2);
		this.addChild(mask, 0);
		this._board = cc.Sprite.create(s_setting_board);
		this._board.setPosition(this.size.width / 2, this.size.height /2);
		this.addChild(this._board, 1);
		this.init();	
	},
	init: function() {
		var sound = cc.Sprite.create(s_setting_sound);
		var soundSelect = cc.Sprite.create(s_setting_sound_select);
		this._soundStatus = cc.Sprite.create(s_setting_soundOn);
		this._soundStatus.setPosition((this._board.getTextureRect().width / 4 * 1),this._board.getTextureRect().height / 5 * 3);
		this._board.addChild(this._soundStatus);
		
		
		var resetData = cc.Sprite.create(s_setting_resetData);
		var resetDataSelect = cc.Sprite.create(s_setting_resetData_select);	
		
		var exit = cc.Sprite.create(s_setting_exit);
		var exitSelect = cc.Sprite.create(s_setting_exit_select);	
		
		sound.setPosition((this._board.getTextureRect().width / 4 * 1),this._board.getTextureRect().height / 5 * 1);
		resetData.setPosition((this._board.getTextureRect().width / 4 * 3),this._board.getTextureRect().height /5 * 1);
		exit.setPosition((this._board.getTextureRect().width / 8 * 7),this._board.getTextureRect().height / 10 * 1);
		this._settingChoice = [
								[sound, soundSelect],
								[resetData, resetDataSelect],
								[exit, exitSelect]
							];
		for(var i=0; i<this._settingChoice.length; i++) 
			this._board.addChild(this._settingChoice[i][0]);
			
		this.changeSetting();
		
		// var soundOn = cc.Sprite.create(s_setting_soundOn);
		// var soundOff = cc.Sprite.create(s_setting_soundOff);
		// soundOn.setPostion(this.size.width / 2, this.size.height / 2);
		// soundOff.setPosition(this.size.width / 2, this.size.height / 2);
		// this.addChild(this._settingChoice[i][0]);

		
	},
	changeSoundStatus: function(){
		if(this._curSoundStatus){ //make sound off
			this._soundStatus.initWithFile(s_setting_soundOff);
			this._curSoundStatus = false;
		}
		else{ // make sound on
			this._soundStatus.initWithFile(s_setting_soundOn);
			this._curSoundStatus = true;
		}
	},
	changeSetting : function(){
		if(this._curSetting > this._settingChoice.length-1) this._curSetting = 0;
		else if(this._curSetting < 0) this._curSetting = this._settingChoice.length -1;
		
		var changed = this._settingChoice[this._curSetting];
		this._board.removeChild(changed[0]);
		changed[1].setPosition(changed[0].getPosition());
		this._board.addChild(changed[1]);
		
		for(i = 0; i < this._settingChoice.length;i++){
			if(i !== this._curSetting && this._settingChoice[i][0].getParent() === null){
				this._board.removeChild(this._settingChoice[i][1]);
				this._board.addChild(this._settingChoice[i][0]);
			}
		}
		
		
	},
	onKeyUp: function() {
	},
	onKeyDown: function(e) {
		switch(e)
		{
			case BG.EVENT.PLAYER1.LEFT[0]:
			case BG.EVENT.PLAYER1.LEFT[1]:
				this.buttonSound("move");
				switch(this._changingStatus){
					case "setting":
						this._curSetting--;
						this.changeSetting();
					break;
					case "soundSetting": // left key_button in sound setting
						this.changeSoundStatus();
					break;
					case "resetData": // left key_button in resetData
						
					break;
					}
			break;
			
			case BG.EVENT.PLAYER1.RIGHT[0]:
			case BG.EVENT.PLAYER1.RIGHT[1]:
				switch(this._changingStatus){
					case "setting":
						this._curSetting++;
						this.changeSetting();
					break;
					case "soundSetting": // right key_button in sound setting
						this.changeSoundStatus();
					break;
					case "resetData": // right key_button in resetData
						
					break;
					}
				break;		
			case BG.EVENT.PLAYER1.ITEM[0]:
			case BG.EVENT.PLAYER1.ITEM[1]:
				if(this._changingStatus === "setting"){
					switch(this._curSetting){
						case 0: //soundSetting
							this._changingStatus = "soundSetting";
						break;
						case 1: //reset data //TODO
						break;
						case 2: //exit
							this.sellectSetting;
							this._curLayer.removeSetting();
							this.setKeyboardEnabled(false);
						break;
					}
				}
				else if(this._changingStatus === "soundSetting")
				{
					this._changingStatus = "setting"; // go to setting menu
				}
				else if(this._changingStatus === "resetData")
				{
					
				}
			break;
		}

	}
}); 