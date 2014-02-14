classes.layers.MainMenuLayer = cc.LayerColor.extend({
	_bg: null,
	_logo: null,
	_menus: null,
	_curMenu: 0,
	_mainSoundID: null,
	init: function() {
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this.setTouchEnabled(true);
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
	_changeMenu: function(dt) {
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
			case cc.KEY.left:
				this._curMenu--;
				this.buttonSound("move");
				this._changeMenu();
				break;
			case cc.KEY.right:
				this._curMenu++;
				this.buttonSound("move");
				this._changeMenu();
				break;
			case cc.KEY.ctrl:
				switch(this._curMenu)
				{
					case 0:
						break;
					case 1:
						this.buttonSound("select");
						this.playBgmSound("off");
						classes.GameController.getInstance().setCurScene(classes.scenes.DuelGameScene.getInstance());
						break;
					case 2:
						break;
					case 3:
						break;
					case 4:
						break;
				}
				break;
		}
	},
	playBgmSound: function(str){
		if(str == "on") this._mainSoundID = cc.AudioEngine.getInstance().playMusic(bgm_mainBGM,true);
		else cc.AudioEngine.getInstance().stopMusic(this._mainSoundID);
	},
	
	buttonSound: function(str){
		if(str == "move"){
			cc.AudioEngine.getInstance().playEffect(se_buttonMove);
		}
		else{
			cc.AudioEngine.getInstance().playEffect(se_buttonSelect);
		}
	}
});


/*
var SysMenu = cc.Layer.extend({
    _ship:null,

    init:function () {
        var bRet = false;
        if (this._super()) {
            cc.SpriteFrameCache.getInstance().addSpriteFrames(res.textureTransparentPack_plist);

            winSize = cc.Director.getInstance().getWinSize();
            var sp = cc.Sprite.create(res.loading_png);
            sp.setAnchorPoint(0,0);
            this.addChild(sp, 0, 1);

            var logo = cc.Sprite.create(res.logo_png);
            logo.setAnchorPoint(0, 0);
            logo.setPosition(0, 250);
            this.addChild(logo, 10, 1);

            var newGameNormal = cc.Sprite.create(res.menu_png, cc.rect(0, 0, 126, 33));
            var newGameSelected = cc.Sprite.create(res.menu_png, cc.rect(0, 33, 126, 33));
            var newGameDisabled = cc.Sprite.create(res.menu_png, cc.rect(0, 33 * 2, 126, 33));

            var gameSettingsNormal = cc.Sprite.create(res.menu_png, cc.rect(126, 0, 126, 33));
            var gameSettingsSelected = cc.Sprite.create(res.menu_png, cc.rect(126, 33, 126, 33));
            var gameSettingsDisabled = cc.Sprite.create(res.menu_png, cc.rect(126, 33 * 2, 126, 33));

            var aboutNormal = cc.Sprite.create(res.menu_png, cc.rect(252, 0, 126, 33));
            var aboutSelected = cc.Sprite.create(res.menu_png, cc.rect(252, 33, 126, 33));
            var aboutDisabled = cc.Sprite.create(res.menu_png, cc.rect(252, 33 * 2, 126, 33));
            var flare = cc.Sprite.create(res.flare_jpg);
            this.addChild(flare);
            flare.setVisible(false);
            var newGame = cc.MenuItemSprite.create(newGameNormal, newGameSelected, newGameDisabled, function () {
                this.onButtonEffect();
                //this.onNewGame();
                flareEffect(flare, this, this.onNewGame);
            }.bind(this));
            var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
            var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

            var menu = cc.Menu.create(newGame, gameSettings, about);
            menu.alignItemsVerticallyWithPadding(10);
            this.addChild(menu, 1, 2);
            menu.setPosition(winSize.width / 2, winSize.height / 2 - 80);
            this.schedule(this.update, 0.1);

            this._ship = cc.Sprite.createWithSpriteFrameName("ship01.png");
            this.addChild(this._ship, 0, 4);
            var pos = cc.p(Math.random() * winSize.width, 0);
            this._ship.setPosition( pos );
            this._ship.runAction(cc.MoveBy.create(2, cc.p(Math.random() * winSize.width, pos.y + winSize.height + 100)));

            if (MW.SOUND) {
                cc.AudioEngine.getInstance().setMusicVolume(0.7);
                cc.AudioEngine.getInstance().playMusic(res.mainMainMusic_mp3, true);
            }

            bRet = true;
        }
        return bRet;
    },
    onNewGame:function (pSender) {
        //load resources
        cc.LoaderScene.preload(g_maingame, function () {
            var scene = cc.Scene.create();
            scene.addChild(GameLayer.create());
            scene.addChild(GameControlMenu.create());
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    },
    onSettings:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.create();
        scene.addChild(SettingsLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    onAbout:function (pSender) {
        this.onButtonEffect();
        var scene = cc.Scene.create();
        scene.addChild(AboutLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    update:function () {
        if (this._ship.getPosition().y > 480) {
            var pos = cc.p(Math.random() * winSize.width, 10);
            this._ship.setPosition( pos );
            this._ship.runAction( cc.MoveBy.create(
                parseInt(5 * Math.random(), 10),
                cc.p(Math.random() * winSize.width, pos.y + 480)));
        }
    },
    onButtonEffect:function(){
        if (MW.SOUND) {
            var s = cc.AudioEngine.getInstance().playEffect(res.buttonEffet_mp3);
        }
    }
});

SysMenu.create = function () {
    var sg = new SysMenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

SysMenu.scene = function () {
    var scene = cc.Scene.create();
    var layer = SysMenu.create();
    scene.addChild(layer);
    return scene;
};*/
