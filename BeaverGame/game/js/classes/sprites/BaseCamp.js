classes.sprites.BaseCamp = cc.Sprite.extend({
	name : "Home",
	_id : 0,
	_bodyBCamp: null,
	_bodyHome: null,
	_categoryPlayer : null,
	_curLayer : null,
	_scoreBoard : null,
	_homeLevel : 0,
	_targetHome : 5,
	_finalTailIndex : 0,

	ctor: function (layer, p, id) {
        this._super();
        this._id = id;
        this._curLayer = layer;
      	this.spriteChanger();
        this.filterGroup();
        this.addBaseCampWithType(layer.world, p);
        this._addWelcomeHome(layer.world, p);
        layer.addChild(this, 40);
        this._scoreBoard = new classes.sprites.ScoreBoard(this._curLayer,this.getPosition(),id);
    },
	
	addBaseCampWithType : function (world, p) {
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
        var dynamicCircle = new b2CircleShape((this.getTextureRect().width/ 2) / PTM_RATIO);

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
        var dynamicCircle = new b2CircleShape(((this.getTextureRect().width / 2) -10) / PTM_RATIO);

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
		console.log(this._homeLevel);
		if(this._scoreBoard.getScore() > this._targetHome && this._homeLevel <= 4 ) {
			this.spriteChanger();
		}
	},
	spriteChanger: function(){
			this.initWithFile(s_BaseCamp[this._homeLevel]);
			this._targetHome+= 10;
			this._homeLevel++;
	},
	setColor: function () {
		this._scoreBoard.setColor();
	},

	
	
	
});