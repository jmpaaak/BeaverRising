classes.sprites.Beaver = cc.Sprite.extend({
	name: "Beaver",
	_id: 0,
    
    //Key Event
    //1p
    _leftKeyDown: false,
    _rightKeyDown: false,
    _leftKeyUp: false,
    _rightKeyUp: false,
    //2p
    _qKeyDown: false,
    _wKeyDown: false,
    _qKeyUp: false,
    _wKeyUp: false,
    //3p
    _vKeyDown: false,
    _bKeyDown: false,
    _vKeyUp: false,
    _bKeyUp: false,    
    //4p
    _iKeyDown: false,
    _oKeyDown: false,
    _iKeyUp: false,
    _oKeyUp: false,
    
    _vector: null,
    _currentAngle: 0,
    _curVelocity: BG.BEAVER_SPEED.NORMAL,
    _curPos: null,
    _body: null,
    _itemList: null,
    _twigs: null,
    _positions: null,
    _curLayer: null,
    _bullet: null,
    _categoryPlayer : null,
    _outAngle : 0,
    _homeInPoint : null,
    _winSize : null,

    //state flag
	_startFlag: false,
    _setInFlag : false,
    _setOutFlag : false,
    _isHome : false,
    _lightningOn : false,
    _shieldingOn : false,
    _isStun: false,
    _returningHome: false,
    _willDevil: false,
    _isDevil: false,

    //meeting obstacles
	_turtleCountFlag : false,
    //sprite
   	_normalFileName: null,
   	_cryFileName: null,
   	_stunFileName: null,
    _curAction: null,
    _beaverInitAction: null,
    _beaverCryAction: null,
    _beaverStunAction: null,
    _devilAction: null,
    _devilCryAction: null,
    _devilStunAction: null,

    
    count: null,

    ctor: function (layer, id) {
        this._super();
        this._winSize = cc.Director.getInstance().getWinSize();
        this._id = id;
        this._curLayer = layer;
        this._categoryPlayer = Math.pow(2, this._id);
  		this.settingPoint();
   		this.initSprite();
        this.addBeaverWithCoords(this._curLayer.world, this._homeInPoint);
  		this._itemList = [];
  		this._twigs = [];
  		this._positions = [];
  		this._curPos = this._body.GetPosition();
  		
        for(var i=0; i<100; i++)
        	this._positions[i] = cc.p(0,0);
        
        //init counter	
   		this.count = {
   			savePosCount: 0,
   			moveAllowCount: 0,
   			lightningCount: 0,
   			turtleCount: 0
   		};
   		
        layer.addChild(this, 2); //z: 0
        
  		this._settingHomeIn();
        this.schedule(this.update, 1/30);
        
    },
    initSprite : function () {
    	// create beaver init sprite sheet
    	var normalPlist = null;
    	var cryPlist = null;
    	var stunPlist = null;
    	switch(this._id){
			case BG.CATEGORY.PLAYER1:
				normalPlist = p_beaver1p;
				cryPlist = p_beaver1pCry;
				stunPlist = p_beaver1pStun;
				this._normalFileName = "beaver1p_normal";
				this._cryFileName = "beaver1p_cry";
				this._stunFileName = "beaver1p_stun";
				break;
			case BG.CATEGORY.PLAYER2:
				normalPlist = p_beaver2p;
				cryPlist = p_beaver2pCry;
				stunPlist = p_beaver2pStun;
				this._normalFileName = "beaver2p_normal";
				this._cryFileName = "beaver2p_cry";
				this._stunFileName = "beaver2p_stun";
				break;
			case BG.CATEGORY.PLAYER3:
				normalPlist = p_beaver3p;
				cryPlist = p_beaver3pCry;
				stunPlist = p_beaver3pStun;
				this._normalFileName = "beaver3p_normal";
				this._cryFileName = "beaver3p_cry";
				this._stunFileName = "beaver3p_stun";
				break;
			case BG.CATEGORY.PLAYER4:
				normalPlist = p_beaver4p;
				cryPlist = p_beaver4pCry;
				stunPlist = p_beaver4pStun;
				this._normalFileName = "beaver4p_normal";
				this._cryFileName = "beaver4p_cry";
				this._stunFileName = "beaver4p_stun";
				break;
    	}
    	
        cc.SpriteFrameCache.getInstance().addSpriteFrames(normalPlist);
        var animFrames = [];
        for(var i = 1; i < 25; i++) {
            var str = this._normalFileName + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.05);
        this._beaverInitAction = cc.RepeatForever.create(cc.Animate.create(animation));
        this.initWithSpriteFrameName(this._normalFileName+"1.png");
        this.runAction(this._beaverInitAction);
        this._curAction = this._beaverInitAction;


        // create beaver crying sprite sheet ,starts at contact listener(bullet part)
        cc.SpriteFrameCache.getInstance().addSpriteFrames(cryPlist);
        var animFrames = [];
        for(var i = 1; i < 25; i++) {
            var str = this._cryFileName + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.05);
        this._beaverCryAction = cc.RepeatForever.create(cc.Animate.create(animation));
        
        
        cc.SpriteFrameCache.getInstance().addSpriteFrames(stunPlist);
        var animFrames = [];
        for(var i = 1; i < 6; i++) {
            var str = this._stunFileName + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.05);
        this._beaverStunAction = cc.RepeatForever.create(cc.Animate.create(animation));
        
        // create beaver devil sprite sheet
        cc.SpriteFrameCache.getInstance().addSpriteFrames(p_beaverDevil);
        var animFrames = [];
        for(var i = 1; i < 9; i++) {
            var str = "beaverDevil" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.05);
        this._devilAction = cc.RepeatForever.create(cc.Animate.create(animation));


        // create beaver devil sprite sheet
        cc.SpriteFrameCache.getInstance().addSpriteFrames(p_beaverDevilCry);
        var animFrames = [];
        for(var i = 1; i < 6; i++) {
            var str = "beaverDevil_cry" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.05);
        this._devilCryAction = cc.RepeatForever.create(cc.Animate.create(animation));

        // create beaver devil sprite sheet
        cc.SpriteFrameCache.getInstance().addSpriteFrames(p_beaverDevilStun);
        var animFrames = [];
        for(var i = 1; i < 6; i++) {
            var str = "beaverDevil_stun" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.05);
        this._devilStunAction = cc.RepeatForever.create(cc.Animate.create(animation));
        
    },
    changeAction: function (str) {
    	this.stopAction(this._curAction);
    	switch(str)
    	{
    		case "basic":
    			this.runAction(this._beaverInitAction);
    			this._curAction = this._beaverInitAction;
    			break;
    		case "cry":
    			this.runAction(this._beaverCryAction);
    			this._curAction = this._beaverCryAction;
    			break;
    		case "stun":
    			this.runAction(this._beaverStunAction);
    			this._curAction = this._beaverStunAction;
    			break;
    		case "devil":
    			this.runAction(this._devilAction);
    			this._curAction = this._devilAction;
    			//this.initWithFile(s_Devil);
    			//this.runAction(this._beaverAddingAction); //TODO: Lightning, lostTail, stun  
    			break;
    		case "devilCry":
    		    this.runAction(this._devilCryAction);
    			this._curAction = this._devilCryAction;
    			break;
    		case "devilStun":
    			this.runAction(this._devilStunAction);
    			this._curAction = this._devilStunAction;
    			break;
    	}

    },
    settingPoint : function(){
    	this._homeInPoint = new cc.Point();
    	switch(this._id)
    	{
    		case BG.CATEGORY.PLAYER1:
    			this._homeInPoint = cc.p(BG.GAME_UI.OUTTER_FRAME.WIDTH / PTM_RATIO , (this._winSize.height - BG.GAME_UI.OUTTER_FRAME.HEIGHT) / PTM_RATIO);
    			this._outAngle = 45;
    			break;
    		case BG.CATEGORY.PLAYER2:
    			this._homeInPoint = cc.p((this._winSize.width-BG.GAME_UI.OUTTER_FRAME.WIDTH)/PTM_RATIO, (this._winSize.height - BG.GAME_UI.OUTTER_FRAME.HEIGHT)/PTM_RATIO);
    			this._outAngle = 135;
    			break;
    		case BG.CATEGORY.PLAYER3:
    			this._homeInPoint = cc.p(BG.GAME_UI.OUTTER_FRAME.WIDTH / PTM_RATIO ,BG.GAME_UI.OUTTER_FRAME.HEIGHT / PTM_RATIO);
    			this._outAngle = 315;
    			break;
    		case BG.CATEGORY.PLAYER4:
    			this._homeInPoint = cc.p((this._winSize.width - BG.GAME_UI.OUTTER_FRAME.WIDTH) / PTM_RATIO, BG.GAME_UI.OUTTER_FRAME.HEIGHT / PTM_RATIO);
    			this._outAngle = 225;
    			break;
    	}
    },
    addTwig: function(twig) {
    	if(!this._isDevil && !this._willDevil)
    	{

			//TV MSG
			var local_message = new Object();
			local_message.sound = "eatTwig";
			deviceInstance[this._id - 1].sendMessage(
					JSON.stringify(local_message)
			);

		    this._twigs[this._twigs.length] = twig;
		    this._curLayer.removeChild(twig);
		    this._curLayer.destroyList.push(twig.getBody());
	    	twig = null;
	    	
	    	var willGetScore = cc.LabelBMFont.create("COMBO " + this._twigs.length, s_Konqa32);
	    	if(this._twigs.length >= 6 && this._twigs.length < 16) willGetScore.setColor(cc.c3(255,0,0)), willGetScore.setScale(1.2);
	    	else if(this._twigs.length >= 16) willGetScore.setColor(cc.c3(0,34,102)), willGetScore.setScale(2.0);
	    	else willGetScore.setColor(cc.c3(217,65,140));
	        willGetScore.setPosition(this._curPos.x*PTM_RATIO, this._curPos.y*PTM_RATIO+20);
	        this._curLayer.addChild(willGetScore,2);
	        //Actions
	        willGetScore.runAction(cc.Sequence.create(cc.MoveBy.create(0.5, cc.p(0,20))));
		    willGetScore.runAction(cc.Sequence.create(
		    	cc.FadeIn.create(0.3),
		    	cc.DelayTime.create(0.2),
		    	cc.CallFunc.create(function () {
		    		this._curLayer.removeChild(willGetScore, true);
		    	}, this)
		    ));
		}
		else
		{
			twig.destroy();

			//TV MSG
			var local_message = new Object();
			local_message.sound = "breakTwig";
			deviceInstance[this._id - 1].sendMessage(
					JSON.stringify(local_message)
			);
		}
    },
    addItem: function(item) {
    	if(item.getType() === BG.ITEM_TYPE.DEVIL)
    	{
    		this._curLayer.setDevilOn(true);
    		this.beDevil();
    		item.destroy(this._curLayer);
    		return;
    	}
    	if(this._itemList.length === 2) return;
    	this._itemList[this._itemList.length] = item;
    	
    	//TV MSG
    	var local_message = new Object();
		local_message.event = "getitem";
		local_message.type = item.getTypeName();
		deviceInstance[this._id - 1].sendMessage(
				JSON.stringify(local_message)
		);
		
    	item.destroy(this._curLayer);
    	console.log("Beaver id: "+this._id+" get Item("+item.getType()+")");
    	item = null;
    	//this.changeAction("add");
    },
    addBeaverWithCoords: function (world, p) {
		/*
         * add Beaver body
         */
        var tex = this;
        
        tex.setPosition(p.x, p.y);
        // Define the dynamic body.
        var b2Vec2 = Box2D.Common.Math.b2Vec2,
        	b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
			b2FilterData = Box2D.Dynamics.b2FilterData,
			b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;
			
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.linearDamping = 5;
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
        bodyDef.userData = tex;
        var body = world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(tex.getTextureRect().width / (PTM_RATIO*2), tex.getTextureRect().height / (PTM_RATIO*2));

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 0;
        fixtureDef.friction = 0;
        fixtureDef.restitution = 0.1;
        fixtureDef.filter.categoryBits = this._categoryPlayer;
        fixtureDef.filter.maskBits = ~(this._categoryPlayer);
        // fixtureDef.isSensor = true;
        body.CreateFixture(fixtureDef);
        
        this._body = body;
    },
    stun: function (str) {
	    if(!this._isStun)
	    {
			//TV MSG
			var local_message = new Object();
			local_message.sound = "stun";
			deviceInstance[this._id - 1].sendMessage(
					JSON.stringify(local_message)
			);

			this._isStun = true;
			this._curVelocity = 0;
			this.runAction(cc.Sequence.create(
			cc.CallFunc.create(function () {
				if(this._isDevil) this.changeAction("devilStun");
				else this.changeAction("stun");
				if(str === "manual") return;
			}, this),
			cc.DelayTime.create(3),
			cc.CallFunc.create(function () {						
				this._isStun = false;
				this._curVelocity = BG.BEAVER_SPEED.NORMAL;
				this._move();
				if(this._isDevil) this.changeAction("devil");
				else this.changeAction("basic");
			}, this)));
		}
    },
    cryAction: function () {
		this.runAction(cc.Sequence.create(
			cc.CallFunc.create(function(){
			if (this._isDevil)
				this.changeAction("devilCry");
			else
				this.changeAction("cry");			
			},this),
			cc.DelayTime.create(2),
			cc.CallFunc.create(function(){
			if (this._isDevil)
				this.changeAction("devil");
			else
				this.changeAction("basic");	
			},this)
			)); 
    },
    removeTailAtIndex: function (index) {
    	for(var at = index; at<this._twigs.length; at++)
    	{
    		// console.log("remove: "+at);
    		this._twigs[at].destroy();
    	}

		//TV MSG
    	var local_message = new Object();
		local_message.sound = "breakTwig";
		deviceInstance[this._id - 1].sendMessage(
				JSON.stringify(local_message)
		);

    	this._twigs.splice(index, this._twigs.length-index);
    },
    returnToBase: function () {

		//TV MSG
    	var local_message = new Object();
		local_message.sound = "die";
		deviceInstance[this._id - 1].sendMessage(
				JSON.stringify(local_message)
		);

		if (!this._returningHome) {
			this._returningHome = true;
			this._isHome = true; // avoiding repeating crying sound when beaver is hit by many twigs. 
			this.cryAction(); 
			this.removeTailAtIndex(0);
			var that = this;
			this.runAction(cc.Sequence.create(cc.CallFunc.create(function() {
				that._curVelocity = 0;
				if(!that._isDevil) that.changeAction("cry");
			}), cc.FadeOut.create(2), cc.CallFunc.create(function() {
				that._body.SetPosition(that._homeInPoint);
				that.removeTailAtIndex(0);
				if(!that._isDevil) that.changeAction("basic");
				that._returningHome = false;
				that._isHome = false; // avoiding repeating crying sound when beaver is hit by many twigs. 
			}), cc.FadeIn.create(0.2)));
		}

		},
    beDevil: function () {

		//TV MSG
    	var local_message = new Object();
		local_message.sound = "crocs";
		deviceInstance[this._id - 1].sendMessage(
				JSON.stringify(local_message)
		);
		
    	this.stun("manual");
    	this._willDevil = true;
		this.removeTailAtIndex(0);
    	var that = this;
    	var devil = function(){that.initWithSpriteFrameName("beaverDevil1.png");};
    	var normal = function(){that.initWithSpriteFrameName(that._normalFileName+"1.png");};
    	this.runAction(cc.Sequence.create(
    		cc.CallFunc.create(function () {
    			that.stopAction(that._curAction);
    		}),
	  		cc.CallFunc.create(devil),
	  		cc.DelayTime.create(0.5), //
	  		cc.CallFunc.create(normal),
	  		cc.DelayTime.create(0.4), //
	  		cc.CallFunc.create(devil),
	  		cc.DelayTime.create(0.3),
	  		cc.CallFunc.create(normal),
	  		cc.DelayTime.create(0.3), //
	  		cc.CallFunc.create(devil),	  		
	  		cc.DelayTime.create(0.2),
	  		cc.CallFunc.create(normal),
	  		cc.DelayTime.create(0.2), //
	  		cc.CallFunc.create(devil),	  		
	  		cc.DelayTime.create(0.2),
	  		cc.CallFunc.create(normal),
	  		cc.DelayTime.create(0.2),
	  		cc.CallFunc.create(devil),
	  		cc.DelayTime.create(0.2),
	  		cc.CallFunc.create(normal),
	  		cc.DelayTime.create(0.1), //
	  		cc.CallFunc.create(devil),	  		
	  		cc.DelayTime.create(0.1),
	  		cc.CallFunc.create(normal),
	  		cc.DelayTime.create(0.1),
	  		cc.CallFunc.create(devil),	  		
	  		cc.DelayTime.create(0.1),
	  		cc.CallFunc.create(normal),  		
	  		cc.DelayTime.create(0.1),
	  		cc.CallFunc.create(devil),	  		
	  		cc.DelayTime.create(0.1),
	  		cc.CallFunc.create(normal),
	  		cc.DelayTime.create(0.1),
	  		cc.CallFunc.create(devil),
	  		cc.DelayTime.create(0.1),
	  		cc.CallFunc.create(normal),
	  		cc.DelayTime.create(0.1), //
	  		cc.CallFunc.create(devil),	  		
	  		cc.DelayTime.create(0.1),
	  		cc.CallFunc.create(normal),
	  		cc.DelayTime.create(0.1),
	  		cc.CallFunc.create(devil),	  		
	  		cc.CallFunc.create(function () {
	  			//for removing manual stun
				that._isDevil = true;
				that._willDevil = false;
	  			that.changeAction("devil");
		    	that._curVelocity = BG.BEAVER_SPEED.NORMAL;
				that._isStun = false;
				that._move();
	  		})
    	));
    },
    turnNormalAndRun: function () {
    	if(!this._willDevil && this._isDevil) 
    	{
    		this._willDevil = false; 
    		this._isDevil = false;
    		this.changeAction("basic");
    		
    		//TV MSG
        	var local_message = new Object();
    		local_message.sound = "nocrocs";
    		deviceInstance[this._id - 1].sendMessage(
    				JSON.stringify(local_message)
    		);
    		
    	}
    },
    update: function () {
    	if(this._startFlag)
    	{	
	        if(this._setInFlag)
	        {
	        	this._settingHomeIn();
	        	this.settingIn(false);
	        }
	        else if(this._setOutFlag)
	        {
	        	if(this.count.moveAllowCount >= 20) {
	        		this.settingOut(false); 
	        		this.setIsHome(false);
	        	}
	        	this._settingHomeOut();
	        	this.count.moveAllowCount++;
	        }
	        else if(!this._willDevil)
	        {
	        	this._move();
	        	this.count.moveAllowCount = 0;
				this._body.SetAwake(true);
	        }
	    }
	    //game start callback
	    else if(this._curLayer.getIsStart())
	    {
			this._body.SetAwake(true);
	        this._startFlag = true;
	        this._setOutFlag = true;
	    }
	    else if(!this._curLayer.getIsStart()){}
		
        this._showTwigs();
        
        if(this._shieldingOn) {
        	for(var i=0; i<this._twigs.length; i++) 
	    	{
	    		this._twigs[i].shield();
	    	}
        }
        
        //using lightning
        if(this._lightningOn) {
        	if(this._isHome || this._isStun || this._willDevil){
        		this._lightningOn = false;
        		this.count.lightningCount = 0;
        		return;
        		} 
        	else if(this.count.lightningCount >= 30 && this.count.lightningCount < 40) {
        		this._curVelocity+= BG.BEAVER_SPEED.SUPERFAST;
        	}
        	else if(this.count.lightningCount >= 40) {
        		this.count.lightningCount = 0;
        		this._lightningOn = false;
        		this._curVelocity = BG.BEAVER_SPEED.NORMAL;
        	}

        	{	//if(Math.random() < 0.5){ //lightning prepare.
        		var lightPrepare = cc.Sprite.create(s_LightningPrepare);
        		
        		var choiceLightning = Math.floor(Math.random()*10) % 4 ;
				if(choiceLightning == 0){ //drawing in front of beaver 
		    			var randomPosX = (Math.floor(Math.random()*100) % this.getTextureRect().width) + (this.getTextureRect().width / 2);
		  				var randomPosY = (Math.floor(Math.random()*100) % this.getTextureRect().height);   						
					}
				else{ //drawing back of beaver
						var randomPosX = Math.floor(Math.random()*10) % 2 ;
        				var randomPosY = Math.floor(Math.random()*10) % 2 ;
        				
						if(randomPosX == 0) randomPosX = (this._curPos.x * PTM_RATIO) + (Math.floor(Math.random()*100) % this.getTextureRect().width);
		        		else randomPosX = (this._curPos.x * PTM_RATIO) - (Math.floor(Math.random()*100) % this.getTextureRect().width);
		  				if(randomPosY == 0) randomPosY = (this._curPos.y * PTM_RATIO) + (Math.floor(Math.random()*100) % this.getTextureRect().height);
		        		else randomPosY = (this._curPos.y * PTM_RATIO) - (Math.floor(Math.random()*100) % this.getTextureRect().height);
				}
        		lightPrepare.setPosition(randomPosX, randomPosY);		  
        		lightPrepare.setRotation(this._body.GetAngle());
        		
        		if(choiceLightning == 0){ //drawing in front of beaver // position based on canvas
        			this.addChild(lightPrepare,5);
        			var delay = cc.DelayTime.create(0.2);
			        var action1 = cc.FadeIn.create(0.1);
			        var action1Back = action1.reverse();
	    			var removeLightning = cc.CallFunc.create(function () 
	    			{this.removeChild(lightPrepare, true);}, this);
        		}
        		else{ //drawing back of beaver //// position based on beaver
        			this._curLayer.addChild(lightPrepare,0);
        			var delay = cc.DelayTime.create(0.4);
			        var action1 = cc.FadeIn.create(0.2);
			        var action1Back = action1.reverse();
	    			var removeLightning = cc.CallFunc.create(function () 
	    			{this._curLayer.removeChild(lightPrepare, true);}, this);
        		}
            	lightPrepare.runAction(cc.Sequence.create(action1, delay, action1Back, removeLightning));
        	}
        	this.count.lightningCount++;
        }
        if(this._turtleCountFlag) {
        	if(this.count.turtleCount >= 120) {
        		this._curVelocity = BG.BEAVER_SPEED.NORMAL;
        		this._turtleCountFlag = false;
        		this.count.turtleCount = 0;
        	}
        	this.count.turtleCount++;
        }

        //case of getting out of screen
        if((this._curPos.y * PTM_RATIO) > this._winSize.height - BG.GAME_UI.OUTTER_FRAME.HEIGHT + 10)
        {
			this._body.SetPosition(cc.p(this._curPos.x, BG.GAME_UI.OUTTER_FRAME.HEIGHT / PTM_RATIO));
        }
        else if((this._curPos.y * PTM_RATIO) < BG.GAME_UI.OUTTER_FRAME.HEIGHT - 10)
        {
        	this._body.SetPosition(cc.p(this._curPos.x, this._winSize.height / PTM_RATIO - (BG.GAME_UI.OUTTER_FRAME.HEIGHT / PTM_RATIO)));
        }        
        else if((this._curPos.x * PTM_RATIO) > this._winSize.width - BG.GAME_UI.OUTTER_FRAME.WIDTH + 10)
        {
        	this._body.SetPosition(cc.p(BG.GAME_UI.OUTTER_FRAME.WIDTH / PTM_RATIO,this._curPos.y));
        }        
        else if((this._curPos.x * PTM_RATIO) < BG.GAME_UI.OUTTER_FRAME.WIDTH - 10)
        {
        	this._body.SetPosition(cc.p(this._winSize.width / PTM_RATIO - (BG.GAME_UI.OUTTER_FRAME.WIDTH / PTM_RATIO),this._curPos.y));
        }

       // count
       this.count.savePosCount++;
    },
    handleKeyDown: function (e) {
    	if(this._id === 1)
    	{
	        if (!this._leftKeyDown || !this._rightKeyDown) {
	            if (e === BG.EVENT.PLAYER1.LEFT[0] || 
		            e === BG.EVENT.PLAYER1.LEFT[1]) this._leftKeyDown = true, this._leftKeyUp = false;
		        else if (e === BG.EVENT.PLAYER1.RIGHT[0] ||
		            	 e === BG.EVENT.PLAYER1.RIGHT[1]) this._rightKeyDown = true, this._rightKeyUp = false;
	        }
	        if(e === BG.EVENT.PLAYER1.ITEM[0] || e === BG.EVENT.PLAYER1.ITEM[1])
	        	this._useItem();
	    }
	    else if(this._id === 2)
	    {
	    	if (!this._qKeyDown || !this._wKeyDown) {
	            if (e === BG.EVENT.PLAYER2.LEFT[0] || 
		            e === BG.EVENT.PLAYER2.LEFT[1]) this._qKeyDown = true, this._qKeyUp = false;
		        else if (e === BG.EVENT.PLAYER2.RIGHT[0] ||
		            	 e === BG.EVENT.PLAYER2.RIGHT[1]) this._wKeyDown = true, this._wKeyUp = false;
	        }
	        if(e === BG.EVENT.PLAYER2.ITEM[0] || e === BG.EVENT.PLAYER2.ITEM[1])
	        	this._useItem();
	    }
	    else if(this._id === 3)
	    {
	    	if (!this._vKeyDown || !this._bKeyDown) {
	            if (e === BG.EVENT.PLAYER3.LEFT[0] || 
		            e === BG.EVENT.PLAYER3.LEFT[1]) this._vKeyDown = true, this._vKeyUp = false;
		        else if (e === BG.EVENT.PLAYER3.RIGHT[0] ||
		            	 e === BG.EVENT.PLAYER3.RIGHT[1]) this._bKeyDown = true, this._bKeyUp = false;
	        }
	        if(e === BG.EVENT.PLAYER3.ITEM[0] || e === BG.EVENT.PLAYER3.ITEM[1])
	        	this._useItem();
	    }
	    else if(this._id === 4)
	    {
	    	if (!this._iKeyDown || !this._oKeyDown) {
	            if (e === BG.EVENT.PLAYER4.LEFT[0] || 
		            e === BG.EVENT.PLAYER4.LEFT[1]) this._iKeyDown = true, this._iKeyUp = false;
		        else if (e === BG.EVENT.PLAYER4.RIGHT[0] ||
		            	 e === BG.EVENT.PLAYER4.RIGHT[1]) this._oKeyDown = true, this._oKeyUp = false;
	        }
	        if(e === BG.EVENT.PLAYER4.ITEM[0] || e === BG.EVENT.PLAYER4.ITEM[1])
	        	this._useItem();
	    }
    },
    handleKeyUp: function (e) {
    	if(this._id === 1)
    	{
        	if (!this._leftKeyUp || !this._rightKeyUp) {
	            if (e === BG.EVENT.PLAYER1.LEFT[0] || 
	            	e === BG.EVENT.PLAYER1.LEFT[1]) this._leftKeyUp = true, this._leftKeyDown = false;
	            else if (e === BG.EVENT.PLAYER1.RIGHT[0] ||
	            		 e === BG.EVENT.PLAYER1.RIGHT[1]) this._rightKeyUp = true, this._rightKeyDown = false;
	        }
        }
        else if(this._id === 2)
        {
       		if (!this._qKeyUp || !this._wKeyUp) {
	            if (e === BG.EVENT.PLAYER2.LEFT[0] || 
	            	e === BG.EVENT.PLAYER2.LEFT[1]) this._qKeyUp = true, this._qKeyDown = false;
	            else if (e === BG.EVENT.PLAYER2.RIGHT[0] ||
	            		 e === BG.EVENT.PLAYER2.RIGHT[1]) this._wKeyUp = true, this._wKeyDown = false;
	        }
        }
        else if(this._id === 3)
		{
       		if (!this._vKeyUp || !this._bKeyUp) {
	       		if (e === BG.EVENT.PLAYER3.LEFT[0] || 
		            e === BG.EVENT.PLAYER3.LEFT[1]) this._vKeyUp = true, this._vKeyDown = false;
		        else if (e === BG.EVENT.PLAYER3.RIGHT[0] ||
		            	 e === BG.EVENT.PLAYER3.RIGHT[1]) this._bKeyUp = true, this._bKeyDown = false;
		    }
        }
        else if(this._id === 4)
        {
       		if (!this._iKeyUp || !this._oKeyUp) {
	            if (e === BG.EVENT.PLAYER4.LEFT[0] || 
		            e === BG.EVENT.PLAYER4.LEFT[1]) this._iKeyUp = true, this._iKeyDown = false;
		        else if (e === BG.EVENT.PLAYER4.RIGHT[0] ||
		            	 e === BG.EVENT.PLAYER4.RIGHT[1]) this._oKeyUp = true, this._oKeyDown = false;
	        }
        }
    },
    _useItem: function () {
    	if(this._itemList.length === 0 || this._isStun || this._willDevil) return;
    	switch(this._itemList[0].getType())
    	{
    		case BG.ITEM_TYPE.BULLET:
    			this._shoot();
				//TV MSG
				var local_message = new Object();
				local_message.sound = "shootFish";
				deviceInstance[this._id - 1].sendMessage(
						JSON.stringify(local_message)
				);
    			break;
    		case BG.ITEM_TYPE.SHIELD:
    			this.shielding();
				//TV MSG
				var local_message = new Object();
				local_message.sound = "shieldSound";
				deviceInstance[this._id - 1].sendMessage(
						JSON.stringify(local_message)
				);
    			break;
    		case BG.ITEM_TYPE.LIGHTNING:
    			this._lightningOn = true;
				//TV MSG
				var local_message = new Object();
				local_message.sound = "lightning";
				deviceInstance[this._id - 1].sendMessage(
						JSON.stringify(local_message)
				);
    			break;
    	}
    	this._itemList.splice(0,1);
    },
    _move: function () {
	    	if(!this._vector) this._vector = new cc.Point();
	        var curVector = this._vector;
	        var curAngle = this._currentAngle;
	        switch(this._id)
	        {
	        	case 1:
	        		if(this._leftKeyDown) curAngle-=10, this._body.SetAngle(curAngle*(Math.PI/180));
	        		if(this._rightKeyDown) curAngle+=10, this._body.SetAngle(curAngle*(Math.PI/180));
	        		if(this._leftKeyUp);
	        		if(this._rightKeyUp);
	        		break;
	        	case 2:
	        		if(this._qKeyDown) curAngle-=10, this._body.SetAngle(curAngle*(Math.PI/180));
	        		if(this._wKeyDown) curAngle+=10, this._body.SetAngle(curAngle*(Math.PI/180));
	        		if(this._qKeyUp);
	        		if(this._wKeyUp);	        		
	        		break;
	        	case 3:
	        		if(this._vKeyDown) curAngle-=10, this._body.SetAngle(curAngle*(Math.PI/180));
	        		if(this._bKeyDown) curAngle+=10, this._body.SetAngle(curAngle*(Math.PI/180));
	        		if(this._vKeyUp);
	        		if(this._bKeyUp);
	        		break;
	        	case 4:
	        		if(this._iKeyDown) curAngle-=10, this._body.SetAngle(curAngle*(Math.PI/180));
	        		if(this._oKeyDown) curAngle+=10, this._body.SetAngle(curAngle*(Math.PI/180));
	        		if(this._iKeyUp);
	        		if(this._oKeyUp);
	        		break;
	        }
			if(curAngle < 0) curAngle = 350;
			else if(curAngle > 360) curAngle = 10;
	        curVector.x = this._curVelocity*Math.cos(-curAngle*(Math.PI/180));
	        curVector.y = this._curVelocity*Math.sin(-curAngle*(Math.PI/180));
	        this._vector = curVector;
	        this._currentAngle = curAngle;
	        this._body.SetLinearVelocity(this._vector);
    },
    _showTwigs: function () {
    	if(this.count.savePosCount >= 2 && !this._isStun)
	    {

			this._positions.unshift(cc.p(this._curPos.x, this._curPos.y));
			if (this._positions.length >= ((this._twigs.length + 3) * 5) + 6) //origin
				this._positions.pop();
				
        	if(this._isHome)
        		this.count.savePosCount = 3;
        	else
        		this.count.savePosCount = 0;
        		
			for(var i=0; i<this._twigs.length; i++) 
	    	{
	    		if (!this._twigs[i].getIsStuck()) {
					this._twigs[i].setIsStuck(true);
					
					var woodType = null;
					
					if(this._twigs.length <= BG.WOOD_LENGTH.MEDIUM){
						woodType = BG.WOOD_TYPE.SMALL; 
					}
					else if(this._twigs.length > BG.WOOD_LENGTH.MEDIUM 
						 && this._twigs.length < BG.WOOD_LENGTH.BIG ){
						woodType = 	BG.WOOD_TYPE.MEDIUM; 
					}
					else{
						woodType = 	BG.WOOD_TYPE.BIG;						
					}
					var newTwig = new classes.sprites.Twig(this._curLayer, this._positions[(i*2)+2], woodType, true, this._id);
					newTwig.setTailIndex(i);
					this._twigs[i] = newTwig;
				}
				var p = this._positions[(i*2)+2];
				this._twigs[i].getBody().SetPosition(p);
				this._twigs[i].setRotate();
	    	}
	    }
    },
    
    ///// Item effects/////
    _shoot: function () {
    	var x = PTM_RATIO*this._curPos.x,
    		y = PTM_RATIO*this._curPos.y;
    	var bullet = new classes.sprites.Bullet(this._curLayer, cc.p(x,y), this);
    	bullet.fire();
	},

	_lightening : function() {
		this._lighteningOn = true;
		this._curVelocity = BG.BEAVER_SPEED.SUPERFAST;
	},
	shielding: function () {
		if(this._twigs.length === 0) return;
		var that = this;
		this._shieldingOn = true;
		this.runAction(cc.Sequence.create(
    		cc.DelayTime.create(5.0),
    		cc.CallFunc.create(function () {
    			that._shieldingOn = false;
	        	for(var i=0; i<that._twigs.length; i++) 
		    	{
		    		that._twigs[i].unshield();
		    	}
    		})
    	));

	},
	getID: function () {
    	return this._id;
    },
    getVector: function () {
    	return this._vector;
    },
    getAngle: function () {
    	return this._currentAngle;
    },
    setIsStart: function (bool) {
		this._startFlag = bool;
	},
    setStartFlag: function(bool) {
    	this._startFlag = bool;
    },
    getIsStart: function () {
    	return this._startFlag;
    },
    getIsDevil: function () {
    	return this._isDevil;
    },
    getWillDevil: function () {
    	return this._willDevil;
    },
    getTwigs : function () {
    	return this._twigs;
    },
    getIsShielding: function () {
    	return this._isShielding;
    },
    settingIn : function (bool) {
    	this._setInFlag = bool;
    },
    settingOut : function (bool) {
    	this._setOutFlag = bool;
    },
    getInFlag : function () {
    	return this._setInFlag;
    },
    setIsHome : function(bool) {
    	this._isHome = bool;
    },
    getIsHome : function () {
    	return this._isHome;
    },
	getHomeInPoint: function () {
		return this._homeInPoint;
	},
    _settingHomeIn : function () {
		
		//TV MSG
    	var local_message = new Object();
		local_message.sound = "goHome";
		deviceInstance[this._id - 1].sendMessage(
				JSON.stringify(local_message)
		);

    	if(!this._isHome) this._isHome = true;
    	this._body.SetPosition(this._homeInPoint);
    	this._curVelocity = 0;
	    var curVector = {x:0,y:0};
	    curVector.x = this._curVelocity;
	    curVector.y = this._curVelocity;
	    
	    this._vector = curVector;
	    this._body.SetLinearVelocity(this._vector);
    },
    _settingHomeOut : function () {
	    var curVector = this._vector;
	    var curAngle = this._outAngle;
		if(this._curVelocity == 0) this._curVelocity = BG.BEAVER_SPEED.NORMAL;
	    this._body.SetAngle(curAngle*(Math.PI/180));
	    
	    curVector.x = this._curVelocity * Math.cos(-curAngle*(Math.PI/180));
	    curVector.y = this._curVelocity * Math.sin(-curAngle*(Math.PI/180));
	    
	    this._vector = curVector;
	    this._currentAngle = curAngle;
	    this._body.SetLinearVelocity(this._vector);
    },
    meetingTurtle : function () {

		//TV MSG
    	var local_message = new Object();
		local_message.sound = "meetTurtle";
		deviceInstance[this._id - 1].sendMessage(
				JSON.stringify(local_message)
		);

    	if(this._isDevil || this._isStun) return; 
    	this._curVelocity = BG.BEAVER_SPEED.SLOW;
    	this._turtleCountFlag = true;
    },
	getBody: function () {
		return this._body;
	}
});