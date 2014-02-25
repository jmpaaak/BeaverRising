classes.layers.MainMenuLayer = cc.LayerColor.extend({
	_bg: null,
	_logo: null,
	_menus: null,
	_curMenu: 0,
	_creditBoard: null,
	_howToPlayBoard: null,
	_singlePlayBoard: null,
	_settingBoard: null,

	init: function() {
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this.setKeyboardEnabled(true);
		this.setPosition(cc.p(0,0));
		this.setColor(cc.c3b(255,255,255));
		this.playBgmSound("on");
		//TESTING TITLE
		// var label = cc.LabelTTF.create("MainMenuScreen Test:", "Marker Felt", 32);
        // this.addChild(label, 1);
        // label.setColor(cc.c3b(255, 0, 255));
        // label.setPosition(size.width / 2, size.height - 50);
        
        this._bg = cc.Sprite.create(s_bgMainMenu);
        this._bg.setPosition(size.width/2, size.height/2);
        this.addChild(this._bg);
        
        // var temp = cc.Sprite.create(s_TempMenu);
        // temp.setPosition(size.width/2, size.height/2);
        // this.addChild(temp, 5);
        
        this._logo = cc.Sprite.create(s_Title1);
        this._logo.setPosition(size.width/2, (size.height/10) * 8);
        this.addChild(this._logo);
        
        var bigger = cc.ScaleBy.create(0.5, 1.2, 0.9);
        var smaller = bigger.reverse();
        var delay = cc.DelayTime.create(0.2);
        var action = cc.RepeatForever.create(cc.Sequence.create(bigger, delay, smaller));
        this._logo.runAction(action);
        
        var singleGameNormal = cc.Sprite.create(s_Button_SinglePlay_Normal);
        var singleGameSelected = cc.Sprite.create(s_Button_SinglePlay_Selected);
        
        var duelGameNormal = cc.Sprite.create(s_Button_MultiPlay_Normal);
        var duelGameSelected = cc.Sprite.create(s_Button_MultiPlay_Selected);
        
        var howToPlayNormal = cc.Sprite.create(s_Button_HowToPlay_Normal);
        var howToPlaySelected = cc.Sprite.create(s_Button_HowToPlay_Selected);
         
        var creditNormal = cc.Sprite.create(s_Button_Credit_Normal);
        var creditSelected = cc.Sprite.create(s_Button_Credit_Selected);
         
        var optionNormal = cc.Sprite.create(s_Button_Option_Normal);
        var optionSelected = cc.Sprite.create(s_Button_Option_Selected);
        
        this._menus = [
        				[singleGameNormal, singleGameSelected],
        				[duelGameNormal, duelGameSelected],
        				[howToPlayNormal, howToPlaySelected],
        				[creditNormal, creditSelected],
        				[optionNormal, optionSelected]
        			  ];

		singleGameNormal.setPosition((size.width/10) * 2, (size.height/10) * 3);
		duelGameNormal.setPosition((size.width/10) * 5 - 50, (size.height/10) * 3);
		howToPlayNormal.setPosition((size.width/10) * 7, (size.height/10) * 3);
		creditNormal.setPosition((size.width/10) * 8, (size.height/10) * 5);
		optionNormal.setPosition((size.width/10) * 9, (size.height/10) * 3);
		
		for(var i=0; i<this._menus.length; i++)
			this.addChild(this._menus[i][0]);
		
		this._changeMenu();
        
		//this.scheduleUpdate(); //update 60fps in Layer
		
		return true;
	},
	_changeMenu: function() {
		if(this._curMenu < 0) this._curMenu = this._menus.length-1;
		if(this._curMenu > this._menus.length-1) this._curMenu = 0;
		
		var changed = this._menus[this._curMenu];
		this.removeChild(changed[0]);
		changed[1].setPosition(changed[0].getPosition());
		this.addChild(changed[1]);
		
		for(var i=0; i<this._menus.length; i++)
		{
			if(i !== this._curMenu && this._menus[i][0].getParent() === null)
			{
				this.removeChild(this._menus[i][1]);
				this.addChild(this._menus[i][0]);
			}
		}
	},
	onKeyUp: function(e) {
	},
	onKeyDown: function(e) {
		switch(e)
		{
			//player1		
			case BG.EVENT.PLAYER1.LEFT[0]:
			case BG.EVENT.PLAYER1.LEFT[1]:
				this._curMenu--;
				this._changeMenu();
				break;
			case BG.EVENT.PLAYER1.RIGHT[0]:
			case BG.EVENT.PLAYER1.RIGHT[1]:
				this._curMenu++;
				this._changeMenu();
				break;
			case BG.EVENT.PLAYER1.ITEM[0]:
			case BG.EVENT.PLAYER1.ITEM[1]:
				switch(this._curMenu)
				{
					case 0:
						//single
						this.setKeyboardEnabled(false);
						this._singlePlayBoard = new classes.layers.SinglePlay(this);
						this.addChild(this._singlePlayBoard, 0);
						break;
					case 1:
						//multi
						classes.GameController.getInstance().setCurScene(new classes.scenes.DuelGameScene());
						break;
					case 2:
						//howtoPlay
						this.setKeyboardEnabled(false);
						this._howToPlayBoard = new classes.layers.HowToPlayLayer(this);
						this.addChild(this._howToPlayBoard, 0);
						break;
					case 3:
						//credit button
						this.setKeyboardEnabled(false);
						this._creditBoard = new classes.layers.CreditsLayer(this);
						this.addChild(this._creditBoard, 0);
						break;
					case 4:
						//setting button
						this.setKeyboardEnabled(false);
						this._settingBoard = new classes.layers.SettingLayer(this);
						this.addChild(this._settingBoard, 0);
						break;
				}
				break;
		}
	},
	removeSinglePlay: function(){
		this.removeChild(this._singlePlayBoard);
		this.setKeyboardEnabled(true);
	},
	removeCredit: function(){
		this.removeChild(this._creditBoard);
		this.setKeyboardEnabled(true);
	},
	removeHowToPlay: function(){
		this.removeChild(this._howToPlayBoard);
		this.setKeyboardEnabled(true);
	},
	removeSetting: function(){
		this.removeChild(this._settingBoard);
		this.setKeyboardEnabled(true);
	},
	playBgmSound: function(str){
		if(str == "on") classes.SoundBox.getInstance().play("bgm_mainBGM", true);
	}
});