classes.layers.DuelGameLayer = cc.Layer.extend({
	_beavers: [],
	_itemPopCount: 0,
	_twigPopCount: 0,
	init: function() {
		var that = this;
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this.setTouchEnabled(true);
		this.setKeyboardEnabled(true);
		this.setPosition(cc.p(0,0));
		
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
        	if(contact.GetFixtureA().GetBody().GetUserData().name === "Beaver")
        	{
	        	if(!contact.IsSensor()) 
	        	{
	        		if(contact.GetFixtureB().GetBody().GetUserData().name === "Home")
	        		{
	        			
	        		}
	        		else(contact.GetFixtureB().GetBody().GetUserData().name === "Twig")
	        		{
	        			
	        		}
	        	}
	        	else
	        	{
		        	var beaver = contact.GetFixtureA().GetBody().GetUserData();
		        	var item = contact.GetFixtureB().GetBody().GetUserData();
		        	
		        	if(!item) 
		        	{
		        		console.log("todo: return!");
		        		return;
		        	}
		        	
			        switch(item.getType())
			        {
			        	case BG.ITEM_TYPE.SPEED:
			        		beaver.addItem(item);
			        		that.removeChild(item, true);
			        		break;
			        	case BG.ITEM_TYPE.SHIELD:
			       			break;
						//TODO
			       	}
		       	}
			}
	    };
	    contactListener.EndContact = function(contact) {};
	    contactListener.PostSolve = function(contact, impulse) {};
	    contactListener.PreSolve = function(contact, oldManifold) {};
        
       	// Construct a world object, which will hold and simulate the rigid bodies.
        this.world = new b2World(new b2Vec2(0.1, 0.1), true); //no gravity
        this.world.SetContinuousPhysics(true);
		this.world.SetContactListener(contactListener);
		
		// var fixDef = new b2FixtureDef;
        // fixDef.density = 0;
        // fixDef.friction = 0;
        // fixDef.restitution = 0;
// 
        // var bodyDef = new b2BodyDef;
// 
        // //create ground //w:40, h:22.5
        // bodyDef.type = b2Body.b2_staticBody;
        // fixDef.shape = new b2PolygonShape;
        // fixDef.shape.SetAsBox(40, 2);
        // // upper
        // bodyDef.position.Set(20, 22.5 + 1);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // // bottom
        // bodyDef.position.Set(40, -1);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);
//         
        // fixDef.shape.SetAsBox(2, 22.5);
        // // left
        // bodyDef.position.Set(-1, 11.25);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);
        // // right
        // bodyDef.position.Set(41, 11.25);
        // this.world.CreateBody(bodyDef).CreateFixture(fixDef);
// 		
		//TESTING TITLE 
		var label = cc.LabelTTF.create("Beaver Moving Test", "Marker Felt", 32);
        this.addChild(label, 1); //z === 1 : UI
        label.setColor(cc.c3b(0, 0, 255));
        label.setPosition(size.width / 2, size.height - 50);
        
        //Adding Beavers
        for(var i=0; i<4; i++)
	       this._beavers[i] = new classes.sprites.Beaver(this, cc.p(300,100+150*i), i);

		this.scheduleUpdate(); //update 60fps in Layer
		
		return true;
	},
	popItem: function() {
		if(Math.random() <= 0.5)
		{
			var size = cc.Director.getInstance().getWinSize();
			do {
				var randX = Math.random();
				var randY = Math.random();
			} while( (0.2 >= randX || randX >= 0.8) &&
					  (0.2 >= randY || randY >= 0.8) );
					 
			var x = randX*size.width, y = randY*size.height;
			
			new classes.sprites.Item(this, cc.p(x, y), BG.ITEM_TYPE.SPEED);
		}
	},
	
	
	popTwig: function() {
		if(Math.random() <= 0.5)
		{
			var size = cc.Director.getInstance().getWinSize();
			do {
				var randX = Math.random();
				var randY = Math.random();
			} while( (0.2 >= randX || randX >= 0.8) &&
					  (0.2 >= randY || randY >= 0.8) );
					 
			var x = randX*size.width, y = randY*size.height;
			
			new classes.sprites.Twig(this, cc.p(x, y), BG.TWIG_TYPE.NORMAL);
		}
	},
	
	update: function(dt) {

		for(var i=0; i<4; i++)
			this._beavers[i].update();
		
		if(this._itemPopCount === 300) //every 2s (p=0.5) 
			this._itemPopCount = 0, this.popItem();
		this._itemPopCount++;
		
		if(this._twigPopCount === 120) //every 2s (p=0.5) 
			this._twigPopCount = 0, this.popTwig();
		this._twigPopCount++;		
		
		
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
			if (b.GetUserData() != null) {
				//Synchronize the AtlasSprites position and rotation with the corresponding body
				var myActor = b.GetUserData();
				myActor.setPosition(b.GetPosition().x * PTM_RATIO, b.GetPosition().y * PTM_RATIO);
				myActor.setRotation(cc.RADIANS_TO_DEGREES(b.GetAngle()));
			}
		}
	},
	onKeyUp: function() {
 		this._beavers[0].handleKeyUp();
	},
	onKeyDown: function(e) {
		this._beavers[0].handleKeyDown(e);
	}
});
