classes.sprites.Twig = cc.Sprite.extend({
	name: "Twig",
	_type: 0,
    _body: null,
    _isStuck: false,
    _savedPos: {x:0, y:0},
    _oldPos: {x:0, y:0},
    
     //count
    count: {
    	posSetCount: 0,
    },
    ctor: function (layer, p, type, isStuck) {
        this._super();
        this._type = type;
        this._isStuck = isStuck;
        switch(type)
        {
        	case BG.TWIG_TYPE.NORMAL:
        		this.initWithFile(s_Twig_Normal);
        		break;
        	case BG.TWIG_TYPE.STRONG:
        		//this.initWithFile(s_Twig_Strong);
        		break;
        }
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        
        if(this._isStuck === false)
        	this._addTwigWithType(layer.world, p);
        else if(this._isStuck === true)
        	this._addTailTwig(layer.world, p);
        	
        layer.addChild(this, 0); //z: 0
    },
    _addTwigWithType: function (world, p) {
        var tex = this;
        tex.setPosition(p.x, p.y);

        // Define the body.
        var b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody; //type
        bodyDef.position.Set(p.x / PTM_RATIO, p.y / PTM_RATIO);
        bodyDef.userData = tex;
        bodyDef.linearDamping = 2;
        bodyDef.angularDamping = 1;
        var body = world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(tex.getTextureRect().width / (PTM_RATIO*2), tex.getTextureRect().height / (PTM_RATIO*2));

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 0;
        fixtureDef.friction = 0;
        fixtureDef.restitution = 1;
        body.CreateFixture(fixtureDef);
        
        this._body = body;
    },
    _addTailTwig: function (world, p) {
    	var tex = this;
        tex.setPosition(p.x, p.y);

        // Define the body.
        var b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody; //type
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
        fixtureDef.isSensor = true;
        body.CreateFixture(fixtureDef);
        
        this._body = body;
    },
    saveCurPos: function (p) {
    	this._savedPos = p;
    },
    setOldPos: function (p) {
    	this._oldPos = p;
    },
    setIsStuck: function (bool) {
    	this._isStuck = bool;
    },
    getSavedPos: function () {
    	return this._savedPos;
    },
    getOldPos: function () {
    	return this._oldPos;
    },
    getType: function () {
    	return this._type;
    },
    getBody: function () {
    	return this._body;
    },
    getIsStuck: function () {
    	return this._isStuck;
    },
    update: function () {
    	 //counter proc
        if(this.count.posSetCount == 1)
        {
        	this.saveCurPos(cc.p(this._body.GetPosition().x, this._body.GetPosition().y));
        	//console.log("@twig save pos!");
        }
        if(this.count.posSetCount == 11)
        {
        	this.setOldPos(this.getSavedPos());
        	this.count.posSetCount = 0;
        	//console.log("@twig set old pos! "+this.getSavedPos().x+" "+this.getSavedPos().y);
        	
        }
        
        //count
        for(var prop in this.count)
        	this.count[prop]++;
    }
});