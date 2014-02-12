classes.sprites.Bullet = cc.Sprite.extend({
	name: "Bullet",
	_id: 0,
	_vector: new Box2D.Common.Math.b2Vec2(),
	_velocity: 0,
    _body: null,
    _categoryPlayer: null,
    _curPos: null,
    _curLayer: null,
    _isOut: false,
    
    //actions
    _bombAction: null,
    _fishAction: null,
    ctor: function (layer, p, beaver) {
        this._super();
        this.initWithFile(s_Item_Bullet);
        this._id = beaver.getID();
        this._vector = beaver.getVector();
        this.filterGroup();
        this.addBulletBody(layer.world, p); //add Body
        layer.addChild(this, 5);
        this._curPos = this._body.GetPosition();
        this._curLayer = layer;
        this.initSprite();
        this._velocity = 4;
        this.schedule(this.update, 1/30);
    },
    initSprite: function(){
		// create broken twig sprite sheet
		cc.SpriteFrameCache.getInstance().addSpriteFrames(p_fishMotion);
		var animFrames = [];
		for (var i = 1; i < 3; i++) {
			var str = "fishMotion_00" + i + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animation = cc.Animation.create(animFrames, 0.2);
		this._fishAction = cc.RepeatForever.create(cc.Animate.create(animation));

		// create broken week twig sprite sheet
		cc.SpriteFrameCache.getInstance().addSpriteFrames(p_waterBomb);
		var animFrames = [];
		for (var i = 1; i < 10; i++) {
			var str = "waterBomb_00" + i + ".png";
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
			animFrames.push(frame);
		}
		var animation = cc.Animation.create(animFrames, 0.3);
		this._bombAction = cc.Repeat.create(cc.Animate.create(animation), 1); 	
		
		this.runAction(this._fishAction);    
    },
    addBulletBody: function (world, p) {
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
        dynamicBox.SetAsBox(tex.getTextureRect().width / (PTM_RATIO*2), tex.getTextureRect().height / (PTM_RATIO*4)); //TODO: test 

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 0;
        fixtureDef.friction = 0;
        fixtureDef.isSensor = true;
        fixtureDef.filter.categoryBits = this._categoryPlayer;
        fixtureDef.filter.maskBits = ~(this._categoryPlayer);
        body.CreateFixture(fixtureDef);
        
        this._body = body;
    },
    destroy: function (layer) {
    	var that = this;
    	this.stopAction(this._fishAction);
    	layer.destroyList.push(this._body);
    	if(!this._isOut)
    	{
			this.runAction(cc.Sequence.create(
				that._bombAction,
				//cc.FadeOut.create(0.2),
				cc.CallFunc.create(function () {
					layer.removeChild(that);
				}))
			);
		}
    },
    update: function () {
    	//case of getting out of screen
        if((this._curPos.y * PTM_RATIO) > 1080)
        {
	    	this._isOut = true;
			this.destroy(this._curLayer);
		}
        else if((this._curPos.y * PTM_RATIO) < 0)
      	{
	    	this._isOut = true;
        	this.destroy(this._curLayer);
        }
        else if((this._curPos.x * PTM_RATIO) > 1920)
        {
	    	this._isOut = true;
        	this.destroy(this._curLayer);
        }
        else if((this._curPos.x * PTM_RATIO) < 0)
        {
	    	this._isOut = true;
        	this.destroy(this._curLayer); 
        }
    },
    getBody: function () {
    	return this._body;
    },
    getID: function () {
    	return this._id;
    },
    fire: function () { 	
		this._vector.x = this._velocity * this._vector.x;
		this._vector.y = this._velocity * this._vector.y;
		var beavers = this._curLayer.getBeavers();
		console.log("angle: "+beavers[this._id].getAngle());
		var angle = beavers[this._id].getAngle();
		this._body.SetAngle(angle*(Math.PI/180));
    	this._body.SetLinearVelocity(this._vector);
    },
    filterGroup: function(){
    	this._categoryPlayer = Math.pow(2, this._id);
    	console.log("the category home is " + this._id + "-  " + this._categoryPlayer);
    	console.log("the ~ category home is " + this._id + "-  " + (~(this._categoryPlayer)));
    }
});