classes.sprites.Twig = cc.Sprite.extend({
	name : "Twig",
	_type: 0,
    _body: null,
    _isStuck: false,
    _tailIndex: 0,
    _angle : 0,
    _curLayer: null,
	_destroyAction: null,
    _isShielding: false,
    beaverID: 0,
    
    count: {
    },
    ctor: function (layer, p, type, isStuck, beaverID) {
        this._super();
        this._type = type;
        this._isStuck = isStuck;
        this._beaverID = beaverID;
        this._curLayer = layer;
        this.initDestroySprite();
        switch(type)
        {
        	case BG.TWIG_TYPE.NORMAL:
        		this.initWithFile(s_Twig_Thorn);
        		break;
        	case BG.TWIG_TYPE.WEEK:
        		this.initWithFile(s_Twig_Normal);
        		break;
        }
        //this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
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
        bodyDef.angle = 0;
        bodyDef.userData = tex;
        bodyDef.linearDamping = 0;
        bodyDef.angularDamping = 0;
        var body = world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(tex.getTextureRect().width / (PTM_RATIO*2), tex.getTextureRect().height / (PTM_RATIO*2));

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 0;
        fixtureDef.friction = 0;
        fixtureDef.restitution = 0;
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
        bodyDef.type = b2Body.b2_dynamicBody; //type
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
    initDestroySprite: function(){
    	if(this._type === BG.TWIG_TYPE.NORMAL)
    	{
	    	// create broken twig sprite sheet
	        cc.SpriteFrameCache.getInstance().addSpriteFrames(p_Twig_Normal_Broken);
	        var animFrames = [];
	        for(var i = 1; i < 5; i++) {
	            var str = "brokenBranch_00" + i + ".png";
	            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
	            animFrames.push(frame);
	        }
	        var animation = cc.Animation.create(animFrames, 0.2);
	        this._destroyAction = cc.Repeat.create(cc.Animate.create(animation), 1);
        }
        else if(this._type === BG.TWIG_TYPE.WEEK)
        {
	        // create broken week twig sprite sheet
	        cc.SpriteFrameCache.getInstance().addSpriteFrames(p_Twig_Week_Broken);
	        var animFrames = [];
	        for(var i = 1; i < 5; i++) {
	            var str = "brokenBranch2_00" + i + ".png";
	            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
	            animFrames.push(frame);
	        }
	        var animation = cc.Animation.create(animFrames, 0.2);
	        this._destroyAction = cc.Repeat.create(cc.Animate.create(animation), 1);
	    }
    },
    destroy: function () {
    	var that = this;
    	this._curLayer.destroyList.push(this._body);
		this.runAction(cc.Sequence.create(
			that._destroyAction,
			cc.FadeOut.create(0.2),
			cc.CallFunc.create(function () {
				that._curLayer.removeChild(that);
			}))
		);
    },
    setTailIndex: function (index) {
    	this._tailIndex = index;
    },
    setIsStuck: function (bool) {
    	this._isStuck = bool;
    },
    shield: function () {
    	this._isShielding = true;
    	switch(this._type)
        {
        	case BG.TWIG_TYPE.NORMAL:
        		this.initWithFile(s_Twig_Thorn_Shield);
        		break;
        	case BG.TWIG_TYPE.WEEK:
        		this.initWithFile(s_Twig_Normal_Shield);
        		break;
        }
    },
    unshield: function () {
    	this._isShielding = false;
		switch(this._type) {
			case BG.TWIG_TYPE.NORMAL:
				this.initWithFile(s_Twig_Thorn);
				break;
			case BG.TWIG_TYPE.WEEK:
				this.initWithFile(s_Twig_Normal);
				break;
		}
    },
    getType: function () {
    	return this._type;
    },
    getIsShielding: function () {
    	return this._isShielding;
    },
    getBody: function () {
    	return this._body;
    },
    getIsStuck: function () {
    	return this._isStuck;
    },
    getTailIndex: function () {
    	return this._tailIndex;
    },
    getBeaverID: function () {
    	return this._beaverID;
    },
    update: function () {
    },
    setRotate : function(){
    	this._angle+=0.1;
    	if(this._angle >360) this._angle = 0.1; 
    	this._body.SetAngle(this._angle);
    }
});