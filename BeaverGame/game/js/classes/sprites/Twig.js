classes.sprites.Twig = cc.Sprite.extend({
	name : "Twig",
	_type: 0,
    _body: null,
    _curPos: null,
	_shieldTex: null,
    _isStuck: false,
    _tailIndex: 0,
    _angle : 0,
    _curLayer: null,
	_destroyAction: null,
	_initAction: null,
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
        this.initSprite();
        this.initDestroySprite();
        switch(type)
        {
<<<<<<< HEAD
        	case BG.TWIG_TYPE.NORMAL:
        		this.initWithSpriteFrameName("Branch_001.png");
=======
        	case BG.WOOD_TYPE.SMALL:
        		this.initWithFile(s_woodSmall);
        		break;
<<<<<<< HEAD
        	case BG.WOOD_TYPE.MEDIUM:
        		this.initWithFile(s_woodMedium);
>>>>>>> 4a3088f21f32a700a2d824dad50d18081895bbb4
        		break;
        	case BG.WOOD_TYPE.BIG:
        		this.initWithFile(s_woodBig);
=======
        	case BG.TWIG_TYPE.WEEK:
<<<<<<< HEAD
        		this.initWithSpriteFrameName("weak_001.png");
=======
        		this.initWithFile(s_Twig_Weak);
>>>>>>> ce703108632ca78bae10a29a4bcf91908412f1ff
>>>>>>> 4a3088f21f32a700a2d824dad50d18081895bbb4
        		break;
        }
		this._shieldTex = cc.Sprite.create(s_Shield);
        if(this._isStuck === false)
        	this._addTwigWithType(layer.world, p);
        else if(this._isStuck === true)
        	this._addTailTwig(layer.world, p);
        layer.addChild(this, 1); //z: 1
        this._curPos = this._body.GetPosition();
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
        var rand = 360*Math.random();
        
        this._body.SetAngle(rand);
    },
    _addTailTwig: function (world, p) {
    	var tex = this;
        tex.setPosition(p.x, p.y);

        // Define the body.
        var b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody; //type
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
        fixtureDef.isSensor = true;
        body.CreateFixture(fixtureDef);
        
        this._body = body;
    },
    initSprite: function () {
    	if(this._type === BG.TWIG_TYPE.NORMAL)
    	{
	    	// create twig sprite sheet
	        cc.SpriteFrameCache.getInstance().addSpriteFrames(p_Twig_Normal);
	        var animFrames = [];
	        for(var i = 1; i < 7; i++) {
	            var str = "Branch_00" + i + ".png";
	            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
	            animFrames.push(frame);
	        }
	        var animation = cc.Animation.create(animFrames, 0.5);
	        this._initAction = cc.RepeatForever.create(cc.Animate.create(animation));
		    this.runAction(this._initAction);
        }
        else if(this._type === BG.TWIG_TYPE.WEEK)
        {
	        // create weak twig sprite sheet
	        cc.SpriteFrameCache.getInstance().addSpriteFrames(p_Twig_Weak);
	        var animFrames = [];
	        for(var i = 1; i < 5; i++) {
	            var str = "weak_00" + i + ".png";
	            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
	            animFrames.push(frame);
	        }
	        var animation = cc.Animation.create(animFrames, 0.5);
	        this._initAction = cc.RepeatForever.create(cc.Animate.create(animation));
		    this.runAction(this._initAction);
	    }
    },
    initDestroySprite: function () {
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
	        for(var i = 1; i < 6; i++) {
	            var str = "brokenWeak_00" + i + ".png";
	            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
	            animFrames.push(frame);
	        }
	        var animation = cc.Animation.create(animFrames, 0.2);
	        this._destroyAction = cc.Repeat.create(cc.Animate.create(animation), 1);
	    }
    },
    destroy: function () {
    	if(this._isShielding) this.unshield();
    	var that = this;

		//sound effect
		if (BG.SOUND) {
			cc.AudioEngine.getInstance().playEffect(se_breakTwig);
		}

    	this._curLayer.destroyList.push(this._body);
		this.runAction(cc.Sequence.create(
			that._destroyAction,
			that.stopAction(that._initAction),
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
    	if(this._isStuck)
    	{
			this._shieldTex.setPosition(this._curPos.x*PTM_RATIO, this._curPos.y*PTM_RATIO);
			this._curLayer.addChild(this._shieldTex);
    	}			
    },
    unshield: function () {
    	this._isShielding = false;
		this._curLayer.removeChild(this._shieldTex);
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