classes.layers.DuelGameLayer = cc.Layer.extend({
	_beavers: [],
	_baseCamp: [],
	_bgWater : null,
	_timer: null,
	_itemPopCount: 0,
	_twigPopCount: 0,
	destroyList: [],
	_isStart: false,
	_devilOn: false,
	_devilItemOn: false,
	_turtleSoundOn: false,
	_timerWarningOn: false,
	//sound
	_timerSoundID: null,
	_bgmID: null,
    _turtleSoundID: null,

	turtleCount: 0,
	
	init: function() {
		console.log(cc.AudioEngine.getInstance().isFormatSupported("wav"));
		var that = this;		
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		
		// Frame creation
		var gameFrame= cc.Sprite.create(s_gameFrame);
        gameFrame.setPosition(size.width / 2 , size.height / 2);		
		this.addChild(gameFrame,50);
		// Frame creation finish
		
		this.setTouchEnabled(true);
		this.setKeyboardEnabled(true);
		this.setPosition(cc.p(0,0));
		this.schedule(this.update, 1/60);
		//this.scheduleUpdate(); //update 60fps in Layer
		//box2d  (32px === 1m !!)
		var PTM_RATIO = 32;
		var b2Vec2 = Box2D.Common.Math.b2Vec2
            , b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2World = Box2D.Dynamics.b2World
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
            
        //ContactListener
        var contactListener = new Box2D.Dynamics.b2ContactListener;
        contactListener.BeginContact = function(contact) {
        	var dataA = contact.GetFixtureA().GetBody().GetUserData(),
        		dataB = contact.GetFixtureB().GetBody().GetUserData();

        	/*
			 * Beaver Listener
			 * 
			 *
			 */
        	if(dataA.name === "Beaver" || dataB.name === "Beaver")
        	{
        		if(dataA.name === "Beaver")
        		{
        			var beaver = contact.GetFixtureA().GetBody().GetUserData(),
        				target = contact.GetFixtureB().GetBody().GetUserData();
        				var targetFix = contact.GetFixtureB();
        		}
        		else if(dataB.name === "Beaver")
        		{
        			var beaver = contact.GetFixtureB().GetBody().GetUserData(),
        				target = contact.GetFixtureA().GetBody().GetUserData();
        			var targetFix = contact.GetFixtureA();
        		}
        			
				if(!targetFix.IsSensor()) //is NOT sensor
				{
					switch(target.name) {
						case "Home":
							beaver.stun();
							//sound effect
							if (BG.SOUND) {
								cc.AudioEngine.getInstance().playEffect(se_beaverStun);
							}
							break;
						case "Twig":
							beaver.addTwig(target);
							//sound effect
							if (BG.SOUND) {
								cc.AudioEngine.getInstance().playEffect(se_getTwig);
							}

							break;
						case "Beaver":
							if(beaver.getWillDevil() && !beaver.getIsDevil()) 
							{
								target.turnNormalAndRun();
								return;
							}
							if(target.getWillDevil() && !target.getIsDevil()) 
							{
								beaver.turnNormalAndRun();
								return;
							}
							
							if(beaver.getIsDevil())
							{
								console.log("cg devil!!");
								target.beDevil();
								//sound effect
								if (BG.SOUND) {
									cc.AudioEngine.getInstance().playEffect(se_beaverTagger);
								}
								beaver.turnNormalAndRun();
							}
							else if(target.getIsDevil())
							{
								console.log("cg devil!!");
								beaver.beDevil();
								target.turnNormalAndRun();
							}
							else
							{
								beaver.stun();
								target.stun();
								//sound effect
								if (BG.SOUND) {
									cc.AudioEngine.getInstance().playEffect(se_beaverStun);
								}
							}
							break;
					}
				} 
				else //is sensor
				{
					switch(target.name) {
						case "Bullet":
							if(beaver.getID() === target.getID()) return;
							beaver.removeTailAtIndex(0);
							beaver.stun();
							target.destroy(that);

							//sound effect
							if (BG.SOUND) {
								cc.AudioEngine.getInstance().playEffect(se_beaverGetShot);
							}

							break;
						case "Item":
							beaver.addItem(target);
							//sound effect
							if (BG.SOUND) {
								cc.AudioEngine.getInstance().playEffect(se_getItem);
							}
							break;
						case "Twig":
							if(!beaver.getIsHome() && !target.getIsShielding())
							{
								if((target.getBeaverID() == beaver.getID() && target.getTailIndex() == 0) ||
								(target.getBeaverID() == beaver.getID() && target.getTailIndex() == 1)
								) return;
<<<<<<< HEAD
								beaver.returnToBase();
								//sound effect
								if(BG.SOUND){
									cc.AudioEngine.getInstance().playEffect(se_beaverOver);    	
								}
							}
=======
								
								// if(target.getType() === BG.TWIG_TYPE.WEEK)
								// {
									// var i = target.getBeaverID();
									// that._beavers[i].removeTailAtIndex(target.getTailIndex());
								// }
								// else if(target.getType() === BG.TWIG_TYPE.NORMAL)
								// {
									beaver.returnToBase();
<<<<<<< HEAD
								// }
							}
							else if(!beaver.getIsHome() && target.getIsShielding())
							{
								if((target.getBeaverID() == beaver.getID() && target.getTailIndex() == 0) ||
								(target.getBeaverID() == beaver.getID() && target.getTailIndex() == 1)
								) return;
								beaver.returnToBase();
=======
								}
>>>>>>> ce703108632ca78bae10a29a4bcf91908412f1ff
>>>>>>> 4a3088f21f32a700a2d824dad50d18081895bbb4
							}
							break;
						case "Home":
							if(!beaver.getIsHome()) 
							{
								if(!beaver.getIsStart());
								else
								{
<<<<<<< HEAD
									if(beaver._twigs.length == 0)
									{
										beaver.settingOut(true);
										return;
									}
									else
									{
										target.setTwigsLength(beaver.getTwigs());
										beaver.settingIn(true);
									}
									beaver.shielding();
=======
									target.setTwigsLength(beaver.getTwigs());
									beaver.settingIn(true);
									//sound effect
									if (BG.SOUND) {
										cc.AudioEngine.getInstance().playEffect(se_enteringHome);
									}
>>>>>>> 4a3088f21f32a700a2d824dad50d18081895bbb4
								}
							}
							break;
						case "Turtle":
							//sound effect
							if(BG.SOUND){
								cc.AudioEngine.getInstance().playEffect(se_beaverMeetTurtle);    	
							}
							beaver.meetingTurtle();
							console.log("hi turtle");
							break;
					}
				}
			}
			
			/*
			 * Bullet Listener
			 * 
			 *
			 */
			if(dataA.name === "Bullet" || dataB.name === "Bullet")
        	{
        		if(dataA.name === "Bullet")
        		{
        			var bullet = contact.GetFixtureA().GetBody().GetUserData(),
        				target = contact.GetFixtureB().GetBody().GetUserData();
        				var targetFix = contact.GetFixtureB();
        		}
        		else if(dataB.name === "Bullet")
        		{
        			var bullet = contact.GetFixtureB().GetBody().GetUserData(),
        				target = contact.GetFixtureA().GetBody().GetUserData();
        				var targetFix = contact.GetFixtureA();
        		}
        			
				if(!targetFix.IsSensor()) //is NOT sensor
				{
					// switch(target.name) {
					// }
				} 
				else //is sensor
				{
					switch(target.name) {
						case "Twig":
							if(!target.getIsShielding())
							{
								//sound effect
								if(BG.SOUND){
									cc.AudioEngine.getInstance().playEffect(se_beaverGetShot);    	
								}
								var i = target.getBeaverID();
								console.log(contact.IsSensor());
								that._beavers[i].removeTailAtIndex(target.getTailIndex());
								bullet.destroy(that);
							}
							else
							{
								bullet.destroy(that);
							}
							break;
					} 
				}
			}
			
			/* 
			 * Home Listener
			 * 
			 * only for effect
			 */
			if(dataA.name === "Home" || dataB.name === "Home")
        	{
        		if(dataA.name === "Home")
        		{
        			var Home = contact.GetFixtureA().GetBody().GetUserData(),
        				target = contact.GetFixtureB().GetBody().GetUserData();
        			var HomeFix = contact.GetFixtureA();
        			var targetFix = contact.GetFixtureB();
        		}
        		else if(dataB.name === "Home")
        		{
        			var Home = contact.GetFixtureB().GetBody().GetUserData(),
        				target = contact.GetFixtureA().GetBody().GetUserData();
        			var HomeFix = contact.GetFixtureB();
        			var targetFix = contact.GetFixtureA();
        		}
        		

        		if(!targetFix.IsSensor()) //is NOT sensor
				{

				} 
				else //is sensor
				{
										
					switch(target.name) {
						case "Twig":
						if(HomeFix.IsSensor())
						{
							Home.twigBecomeScore(target._tailIndex);
							if(Home._finalTailIndex == target._tailIndex)
							{
								var index = target.getBeaverID();
								that._beavers[index].removeTailAtIndex(0);
								that._beavers[index].settingOut(true);
								//sound effect
								if (BG.SOUND) {
									cc.AudioEngine.getInstance().playEffect(se_houseBuilding);
								}
							}
						}
						break;
					} 
				}
        	}
	    };
	    contactListener.EndContact = function(contact) {};
	    contactListener.PostSolve = function(contact, impulse) {};
	    contactListener.PreSolve = function(contact, oldManifold) {};
        
       	// Construct a world object, which will hold and simulate the rigid bodies.
        this.world = new b2World(new b2Vec2(0, 0), true); //no gravity
        this.world.SetContinuousPhysics(true);
		this.world.SetContactListener(contactListener);
		
		//TESTING TITLE 
		var label = cc.LabelTTF.create("Beaver Moving Test", "Marker Felt", 32);
        this.addChild(label, 1); //z === 1 : UI
        label.setColor(cc.c3(0, 0, 255));
        label.setPosition(size.width / 2, size.height - 50);
        
		var fixDef = new b2FixtureDef;
        fixDef.density = 0;
        fixDef.friction = 0;
        fixDef.restitution = 0;

        var bodyDef = new b2BodyDef;

        //create ground //w:60 40, h:33.75 22.5
        //create ground //w:40, h:22.5
        ////w:60, h:33.75
        bodyDef.type = b2Body.b2_staticBody;
        var wallObject = {name:"wall"};
        
        bodyDef.userData = wallObject;
        
        fixDef.shape = new b2PolygonShape;
        
        // fixDef.shape.SetAsBox(1, 4.5);
        // //Home1
        // bodyDef.position.Set(-1, 33.75);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // //Home2
        // bodyDef.position.Set(60 +1, 33.75);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // //Home3
        // bodyDef.position.Set(-1, 0);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);    
        // //Home4
        // bodyDef.position.Set(60 +1, 0);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);
//         
        // //horizontal Box 
        // fixDef.shape.SetAsBox(4.5, 1);
        // //Home1
        // bodyDef.position.Set(0, 33.75 +1);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // //Home2
        // bodyDef.position.Set(60, 33.75 +1);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // //Home3
        // bodyDef.position.Set(0, -1);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);    
        // //Home4
        // bodyDef.position.Set(60, -1);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);
		
		this._bgWater = new classes.sprites.BG_Water(this);
		
        //Adding Beavers
        for(var i=1; i<5; i++)
	       this._beavers[i] = new classes.sprites.Beaver(this, i);
	       

	    this._baseCamp[0] = new classes.sprites.BaseCamp(this,cc.p(BG.GAME_UI.OUTTER_FRAME.WIDTH, size.height - BG.GAME_UI.OUTTER_FRAME.HEIGHT), BG.BASECAMP.HOME1);
	    this._baseCamp[1] = new classes.sprites.BaseCamp(this,cc.p(size.width - BG.GAME_UI.OUTTER_FRAME.WIDTH ,size.height - BG.GAME_UI.OUTTER_FRAME.HEIGHT), BG.BASECAMP.HOME2);
	    this._baseCamp[2] = new classes.sprites.BaseCamp(this,cc.p(BG.GAME_UI.OUTTER_FRAME.WIDTH, BG.GAME_UI.OUTTER_FRAME.HEIGHT), BG.BASECAMP.HOME3);
	    this._baseCamp[3] = new classes.sprites.BaseCamp(this,cc.p(size.width - BG.GAME_UI.OUTTER_FRAME.WIDTH, BG.GAME_UI.OUTTER_FRAME.HEIGHT), BG.BASECAMP.HOME4);
	   
	    this._timer = new classes.sprites.TimerBoard(this);

		return true;

	},
	popItem: function() {
		if(Math.random() <= 1)
		{
			var size = cc.Director.getInstance().getWinSize();
			do {
				var randX = Math.random();
				var randY = Math.random();
			} while( ((0.25 >= randX || randX >= 0.85) ||
					  (0.25 >= randY || randY >= 0.85)) );
			var x = randX * size.width, y = randY * size.height;
			var itemChoice = Math.floor((Math.random()*10 % 4) + 1);
			switch(itemChoice) 
			{
				case BG.ITEM_TYPE.BULLET:
					new classes.sprites.Item(this, cc.p(x, y), BG.ITEM_TYPE.BULLET);
					break;
				case BG.ITEM_TYPE.SHIELD:
					new classes.sprites.Item(this, cc.p(x, y), BG.ITEM_TYPE.SHIELD);
					break;
				case BG.ITEM_TYPE.LIGHTNING:
					new classes.sprites.Item(this, cc.p(x, y), BG.ITEM_TYPE.LIGHTNING);
					break;
				case BG.ITEM_TYPE.DEVIL:
					if(!this._devilOn && !this._devilItemOn)
					{
						console.log("devil coming!!!");
						new classes.sprites.Item(this, cc.p(x, y), BG.ITEM_TYPE.DEVIL);
					}
					break;
			}
		}
	},
	popTwig: function() 
	{
		if (Math.random() <= 0.5) {
			var size = cc.Director.getInstance().getWinSize();
			do {
				var randX = Math.random();
				var randY = Math.random();
			} while( ((0.15 >= randX || randX >= 0.85) ||
			          (0.15 >= randY || randY >= 0.85)) );
			var x = randX * size.width, y = randY * size.height;
			var twigProb = Math.random(); 
			if(twigProb < 0.9) new classes.sprites.Twig(this, cc.p(x, y), BG.TWIG_TYPE.NORMAL, false); 
			else new classes.sprites.Twig(this, cc.p(x, y), BG.TWIG_TYPE.WEEK, false);
		}
	},
	popObstacle: function(){
		if (Math.random() <= 0.5) {
			if(this.turtleCount >= 2) return;
			else{
					var size = cc.Director.getInstance().getWinSize();
					do {
						var randX = Math.random();
						var randY = Math.random();
					} while( ((0.25 >= randX || randX >= 0.85) ||
					(0.25 >= randY || randY >= 0.85)) );
					var x = randX * size.width, y = randY * size.height;
					new classes.sprites.Obstacle(this, cc.p(x, y), BG.OBSTACLE.TURTLE);
					
					this.turtleCount++;
					if (BG.SOUND && !this._turtleSoundOn) {
					this._turtleSoundId = cc.AudioEngine.getInstance().playEffect(se_turtleComing,true);
					this._turtleSoundOn = true;
					}

			}
		}
	},
	start: function () {
		this._isStart = true;
		this._bgmID = cc.AudioEngine.getInstance().playMusic(bgm_gameBGM,true);
	},
	getIsStart: function () {
		return this._isStart;
	},
	getBeavers: function () {
		return this._beavers;
	},
	setDevilItemOn: function (bool) {
		this._devilItemOn = bool;
	},
	setDevilOn: function (bool) {
		this._devilItemOn = bool;
	},
	setTurtleSound: function(bool){
		this._turtleSoundOn = bool;
	},
	
	update: function(dt) {
		if(this._timer.getTime() === 300)
		{
			this._baseCamp[0].setColor();
			this._baseCamp[1].setColor();
			this._baseCamp[2].setColor();
			this._baseCamp[3].setColor();
			this._timer.setColor();
		}
		if(this._timer.getTime() === 30 && !this._timerWarningOn)
		{
			var that = this;
			if (BG.SOUND) {
				this.runAction(cc.Sequence.create(cc.CallFunc.create(function() {
					if (BG.SOUND) {
						cc.AudioEngine.getInstance().playEffect(se_timeShortMessage);
					}
				}), 
				cc.DelayTime.create(1.0),
				 cc.CallFunc.create(function() {
					if (BG.SOUND) {
						that._timerSoundID = cc.AudioEngine.getInstance().playEffect(se_timeRunShort, true);
					}
				})));
			}
			this._timerWarningOn = true;
		}
		
		if(this._timer.getTime() === 0){
    		cc.AudioEngine.getInstance().stopEffect(this._timerSoundID);
		}
		//It is recommended that a fixed time step is used with Box2D for stability
		//of the simulation, however, we are using a variable time step here.
		//You need to make an informed choice, the following URL is useful
		//http://gafferongames.com/game-physics/fix-your-timestep/

		var velocityIterations = 6;
		var positionIterations = 2;

		// Instruct the world to perform a single step of simulation. It is
		// generally best to keep the time step and iterations fixed.
		this.world.Step(dt, velocityIterations, positionIterations);
	
		//Iterate over the bodies in the physics world
		for (var b = this.world.GetBodyList(); b; b = b.GetNext()) {
			if (b.GetUserData() != null && b.GetUserData().name != "wall") {
				//Synchronize the AtlasSprites position and rotation with the corresponding body
				var myActor = b.GetUserData();
				myActor.setPosition(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO);
				myActor.setRotation(cc.RADIANS_TO_DEGREES(b.GetAngle()));
			}
		}
		
		//Destroy Body
		for (var i=0; i<this.destroyList.length; i++) {
			this.world.DestroyBody(this.destroyList[i]);
		}
		//Reset the array
		this.destroyList.length = 0; 
		
		if(this._itemPopCount === 60) //every 2s (p=0.5) 
			this._itemPopCount = 0, this.popItem(), this.popObstacle();
		this._itemPopCount++;
		
		if(this._twigPopCount === 60) //every 2s (p=0.5) 
			this._twigPopCount = 0, this.popTwig();
		this._twigPopCount++;		
		
	},
	onKeyUp: function(e) {
		this._beavers[1].handleKeyUp(e);
		this._beavers[2].handleKeyUp(e);
		this._beavers[3].handleKeyUp(e);
		this._beavers[4].handleKeyUp(e);
	},
	onKeyDown: function(e) {
		this._beavers[1].handleKeyDown(e);
		this._beavers[2].handleKeyDown(e);
		this._beavers[3].handleKeyDown(e);
		this._beavers[4].handleKeyDown(e);
	}
});
