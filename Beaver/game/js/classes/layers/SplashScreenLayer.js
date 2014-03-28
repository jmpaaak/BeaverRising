classes.layers.SplashScreenLayer = cc.LayerColor.extend({
	_screens: [],
	_curScreen: 0,
	init: function() {
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this.setKeyboardEnabled(true);
		this.setPosition(cc.p(0,0));
		this.setColor(cc.c3b(255,255,255));
		
        this._screens[0] = cc.Sprite.create(s_SplashScreen1); // team name
        this._screens[1] = cc.Sprite.create(s_SplashScreen2); // media
        //this._screens[2] = cc.Sprite.create(s_SplashScreen3); // etc
        for(var s in this._screens)
        	this._screens[s].setPosition(size.width/2, size.height/2);
        
        classes.SoundBox.getInstance().play("se_beaverStart");
        this._splash();
        
		//this.scheduleUpdate(); //update 60fps in Layer
		
		return true;
	},
	_splash: function() {
		var controller = classes.GameController.getInstance();
		if(this._curScreen === 0)
			this.addChild(this._screens[this._curScreen], 0);
		else
		{
			if(this._curScreen === this._screens.length) 
			{
				controller.setCurScene(classes.scenes.ConnectScene.getInstance());
				return;
			}
			this.addChild(this._screens[this._curScreen], 0);
		}
		this._screens[this._curScreen].runAction(cc.Sequence.create(
				cc.DelayTime.create(2.0),
				cc.FadeOut.create(2.0),
				cc.CallFunc.create(function(){this._curScreen++, this._splash();}, this)
		));
	}
});


// onTouchEnded: function() {
		// this._bib.handleTouch(pTouch[0].getLocation());
	// },
	// onTouchMoved: function() {
		// this._bib.handleTouchMove(pTouch[0].getLocation());
	// },