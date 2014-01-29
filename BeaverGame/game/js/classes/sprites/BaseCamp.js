classes.sprites.BaseCamp = cc.Sprite.extend({
	name : "Home",
	_id : 0,
	_bodyBCamp: null,
	_bodyHome: null,
	_categoryPlayer : null,
	_curLayer : null,
	_scoreBoard : null,
	
	ctor: function (layer, p, id) {
        this._super();
        this._id = id;
        this._curLayer = layer;
        this.initWithFile(s_BaseCamp1);
        this.filterGroup();
        this.addBaseCampWithType(layer.world, p);
        this._addWelcomeHome(layer.world, p);
        this._scoreBoard = new classes.sprites.ScoreBoard(this._curLayer,this.getPosition(),id);
        layer.addChild(this, 1);
    },
	
	addBaseCampWithType : function (world, p) {
		var tex = this;
        tex.setPosition(p.x, p.y);

        // Define the body.
        var b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
			b2FilterData = Box2D.Dynamics.b2FilterData;
			
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody; //type
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
        bodyDef.userData = tex;
        var body = world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicCircle = new b2CircleShape(4);

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicCircle;
        fixtureDef.density = 0;
        fixtureDef.friction = 0;
        fixtureDef.restitution = 10;
        fixtureDef.filter.categoryBits = _categoryPlayer;
        fixtureDef.filter.maskBits = ~(_categoryPlayer);
    
        body.CreateFixture(fixtureDef);
        
        this._bodyBCamp = body;
	},
	
	_addWelcomeHome : function (world, p){
		
		var tex = this;
        tex.setPosition(p.x, p.y);
        
        // Define the body.
        var b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
			
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody; //type
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
		bodyDef.userData = this;
        var body = world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicCircle = new b2CircleShape(3.5);

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicCircle;
        fixtureDef.density = 0;
        fixtureDef.friction = 0;
        fixtureDef.isSensor = true;
        body.CreateFixture(fixtureDef);
        
        this._bodyHome = body;
	},	
	
	filterGroup: function(){
    	_categoryPlayer = Math.pow(2, this._id);
    	console.log("the category home is " + this._id + "-  " + _categoryPlayer);
    	console.log("the ~ category home is " + this._id + "-  " + (~(_categoryPlayer)));
   },
    
    getId : function(){
    	return this._id;
    },
    
    twigBecomeScore : function(beaver) {
    	
    	for(var i = 0; i < beaver._twigs.length; i++)
    	{
    		console.log("remove: "+i);
    		beaver._curLayer.removeChild(beaver._twigs[i]);
    		beaver._curLayer.destroyList.push(beaver._twigs[i].getBody());
    		this._scoreBoard.addScore(i+1); //each twig: 1 2 3 4 5
    	}
    	beaver._twigs.splice(0, beaver._twigs.length);
    	
		console.log("beaver got home. now twigs following beaver are changed to score.");
		
	}
		

    
});