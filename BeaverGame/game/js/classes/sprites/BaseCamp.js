classes.sprites.BaseCamp = cc.Sprite.extend({
	name : "Home",
	_id : 0,
	_bodyBCamp: null,
	_bodyHome: null,
	_categoryPlayer : null,
	_curLayer : null,
	_scoreBoard : null,
	_finalTailIndex : 0,

	ctor: function (layer, p, id){
        this._super();
        this._id = id;
        this._curLayer = layer;
        this.initWithFile(s_BaseCamp1);
        this.filterGroup();
        this.addBaseCampWithType(layer.world, p);
        this._addWelcomeHome(layer.world, p);
        this._scoreBoard = new classes.sprites.ScoreBoard(this._curLayer,this.getPosition(),id);
        layer.addChild(this, 10); //z: 0
    },
	
	addBaseCampWithType : function (world, p){
		var tex = this;
        tex.setPosition(p.x, p.y);

        // Define the body.
        var b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
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
        fixtureDef.filter.categoryBits = this._categoryPlayer;
        fixtureDef.filter.maskBits = ~(this._categoryPlayer);
    
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
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
			
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody; //type
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
		bodyDef.userData = tex;
        var body = world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicCircle = new b2CircleShape(3.8);

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
    	this._categoryPlayer = Math.pow(2, this._id);
    	console.log("the category home is " + this._id + "-  " + this._categoryPlayer);
    	console.log("the ~ category home is " + this._id + "-  " + (~(this._categoryPlayer)));
    },
    getId : function(){
    	return this._id;
    },
    setTwigsLength : function(twigs){
    	this._finalTailIndex = twigs.length - 1; // _twigs[0].
    },
    
    twigBecomeScore : function(tailIndex) {
    	this._scoreBoard.addScore(tailIndex+1); //each twig: 1 2 3 4 5
		console.log("-->" + this._finalTailIndex);
	}
	
});