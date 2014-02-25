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
	_woodCount: null,
	_prePercent: 0,
	_addedPercent: 0,
	_effectFlag: false,	
	_effectCount: 0,
	
	ctor: function (layer, p, id) {
        this._super();
        this._id = id;
        this._curLayer = layer;
        this._woodCount = {
        	small: 0,
        	medium: 0,
        	big: 0
        };
      	this.initWithFile(s_BaseCamp[0]);
        this.filterGroup();
        this.addBaseCampWithType(layer.world, p);
        this._addWelcomeHome(layer.world, p);
        layer.addChild(this, 40);
        this._scoreBoard = new classes.sprites.ScoreBoard(this._curLayer,this,id);
        
        this.schedule(this.update, 1/60);
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
        fixtureDef.restitution = 5;
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
    getId : function () {
    	return this._id;
    },
    getLevel: function () {
    	return this._homeLevel;
    },
    getWoodCount: function () {
    	return this._woodCount;
    },
    setTwigsLength : function(twigs) {
    	this._finalTailIndex = twigs.length - 1; // _twigs[0].
    },    
    addingPercent: function(type) {
    	var per;
    	switch(type)
    	{
    		case BG.WOOD_TYPE.SMALL:
    			per = BG.WOOD_PERCENT.SMA;
    			this._woodCount.small++;
    			break;
    		case BG.WOOD_TYPE.MEDIUM: 
    			per = BG.WOOD_PERCENT.MED;
    			this._woodCount.medium++;
    			break;
    		case BG.WOOD_TYPE.BIG: 
    			per = BG.WOOD_PERCENT.BIG;
    			this._woodCount.big++;
    			break;
    	}
		this._prePercent += per;
	},
	realAdding: function () {
		var that = this;
		this.runAction(cc.Sequence.create(
			cc.DelayTime.create(0.5),
			cc.CallFunc.create(function () {
				that._addFlag = true;
			})
		));
	},
	levelUp: function(){
			if(this._homeLevel === 5) 
			{
				this._curLayer.gameEnd();
				return;
			}
			this._effectFlag = true;
			this.runAction(cc.Sequence.create(
				cc.CallFunc.create(function(){
					this.initWithFile(s_BaseCamp_white[this._homeLevel]);
				},this),
				cc.ScaleTo.create(1, 1.1),
				cc.CallFunc.create(function(){
					this._homeLevel++;
					this.initWithFile(s_BaseCamp[this._homeLevel]);
				},this),
				cc.ScaleTo.create(1.0, 1.0)
    		));
	},
	setColor: function () {
		this._scoreBoard.setColor();
	},
	update: function () {
		if(this._addFlag)
		{
			this._scoreBoard.realAdd(1);
			this._addedPercent += 1;
			if(this._prePercent === this._addedPercent) 
			{
				this._prePercent = 0;
				this._addedPercent = 0;
				this._addFlag = false;
			}
		}
		
		if(this._effectFlag){
			if(this._effectCount <= 120) {
				var homeEffect = cc.Sprite.create(s_homeEffect);
				var randomPosX = (Math.floor(Math.random() * 1000) % this.getTextureRect().width);
				var randomPosY = (Math.floor(Math.random() * 1000) % this.getTextureRect().height);
				homeEffect.setPosition(randomPosX, randomPosY);
				this.addChild(homeEffect);
				var delay = cc.DelayTime.create(0.2);
				var action1 = cc.FadeIn.create(0.1);
				var action1Back = action1.reverse();
				var removehomeEffect = cc.CallFunc.create(function() {
					this.removeChild(homeEffect, true);
				}, this);
				homeEffect.runAction(cc.Sequence.create(action1, delay, action1Back, removehomeEffect));
				this._effectCount++;
			}
			else{
				this._effectCount = 0;
				this._effectFlag = false;
			}
			}
	},

	//sound
	houseBuildingSound: function(){
		if (BG.SOUND) {
			cc.AudioEngine.getInstance().playEffect(se_houseBuilding);
		}
	}
	
	
});