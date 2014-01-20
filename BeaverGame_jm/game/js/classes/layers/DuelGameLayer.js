classes.layers.DuelGameLayer = cc.Layer.extend({
	_beavers: [],
	_itemPopCount: 0,
	_twigPopCount: 0,
	destroyList: [],
	init: function() {
		var that = this;
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this.setTouchEnabled(true);
		this.setKeyboardEnabled(true);
		this.setPosition(cc.p(0,0));
		this.scheduleUpdate(); //update 60fps in Layer
		
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
        		
        	if(dataA.name === "Beaver" || dataB.name === "Beaver")
        	{
        		if(dataA.name === "Beaver")
        		{
        			var beaver = contact.GetFixtureA().GetBody().GetUserData(),
        				target = contact.GetFixtureB().GetBody().GetUserData();
        		}
        		else if(dataB.name === "Beaver")
        		{
        			var beaver = contact.GetFixtureB().GetBody().GetUserData(),
        				target = contact.GetFixtureA().GetBody().GetUserData();
        		}
        			
				if(!contact.IsSensor()) //is NOT sensor
				{
					switch(target.name) {
						case "Home":
							break;
						case "Twig":
							beaver.addTwig(target);
							break;
						case "Beaver":
							beaver.slow();
							target.slow();
							break;
					}
				} 
				else //is sensor
				{
					switch(target.name) {
						case "Item":
							beaver.addItem(target);
							break;
						case "Twig":
							beaver.removeTailAtIndex(target.getTailIndex());
							break;
						case "Beaver":
							beaver.slow();
							target.slow();
							break;
					}
				}
			}
	    };
	    contactListener.EndContact = function(contact) {};
	    contactListener.PostSolve = function(contact, impulse) {};
	    contactListener.PreSolve = function(contact, oldManifold) {};
	    
       	// Construct a world object, which will hold and simulate the rigid bodies.
        this.world = new b2World(new b2Vec2(0.1, 0.1), true);
        this.world.SetContinuousPhysics(true);
		this.world.SetContactListener(contactListener);
        	
		//TESTING TITLE 
		var label = cc.LabelTTF.create("Beaver Moving Test", "Marker Felt", 32);
        this.addChild(label, 1); //z === 1 : UI
        label.setColor(cc.c3b(0, 0, 255));
        label.setPosition(size.width / 2, size.height - 50);
        
        //Adding Beavers
        for(var i=0; i<4; i++)
	       this._beavers[i] = new classes.sprites.Beaver(this, cc.p(300,100+150*i), i);

		
		return true;
	},
	popItem: function() {
		if(Math.random() <= 0.5)
		{
			var size = cc.Director.getInstance().getWinSize();
			do {
				var randX = Math.random();
				var randY = Math.random();
			} while( (0.2 >= randX || randX >= 0.8) ||
					  (0.2 >= randY || randY >= 0.8) );
					 
			var x = randX*size.width, y = randY*size.height;
			
			new classes.sprites.Item(this, cc.p(x, y), BG.ITEM_TYPE.SPEED);
		}
	},
	popTwig: function() {
		if(Math.random() <= 0.5) //TODO
		{
			var size = cc.Director.getInstance().getWinSize();
			do {
				var randX = Math.random();
				var randY = Math.random();
			} while( (0.2 >= randX || randX >= 0.8) ||
					  (0.2 >= randY || randY >= 0.8) );
					 
			var x = randX*size.width, y = randY*size.height;
			
			new classes.sprites.Twig(this, cc.p(x, y), BG.TWIG_TYPE.NORMAL, false);
		}
	},
	update: function(dt) {
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
			if(b.GetUserData() != null) 
			{
				//Synchronize the AtlasSprites position and rotation with the corresponding body
				var myActor = b.GetUserData();
				myActor.setPosition(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO);
				myActor.setRotation(cc.RADIANS_TO_DEGREES(b.GetAngle()));
			}
		}
		
		//Destroy Body
		for (var i in this.destroyList) {
			this.world.DestroyBody(this.destroyList[i]);
		}
		// Reset the array
		this.destroyList.length = 0; 

	
		//for(var i=0; i<4; i++) //TODO
			this._beavers[0].update();
		
		if(this._itemPopCount === 300) //every 2s (p=0.5) 
			this._itemPopCount = 0, this.popItem();
		this._itemPopCount++;
		
		if(this._twigPopCount === 120) //every 2s (p=0.5) 
			this._twigPopCount = 0, this.popTwig();
		this._twigPopCount++;
		
	},
	onKeyUp: function() {
 		this._beavers[0].handleKeyUp();
	},
	onKeyDown: function(e) {
		this._beavers[0].handleKeyDown(e);
	}
});
