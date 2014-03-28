classes.sprites.Item = cc.Sprite.extend({
	name: "Item",
	_typeName: null,
	_type : 0,
	_direction : 0,
	_body : null,
	_curLayer : null,
	_curPos : null,
	_angle : 0,
	_startAngle: 0,
	_updownFlag : null,
	_isOut : null,
	_loop : false,
	_crocsInitAction : null,

	ctor : function(layer, p, type) {
		this._super();
		this._type = type;
		this._curLayer = layer;
		this._updownFlag = "up";
		switch(type) {
			case BG.ITEM_TYPE.BULLET:
				this.initWithFile(s_Item_Bullet);
				this._typeName = "bullet";
				break;
			case BG.ITEM_TYPE.SHIELD:
				this.initWithFile(s_Item_Shield);
				this._typeName = "shield";
				break;
			case BG.ITEM_TYPE.LIGHTNING:
				this.initWithFile(s_Item_Lightning);
				this._typeName = "speed";
				break;
			case BG.ITEM_TYPE.DEVIL:
				this._curLayer.setDevilItemOn(true);
				this._typeName = "devil";
				this.initSprite();
				this.loop = true;
				break;
		}

		this.addItemWithType(layer.world, p);
		layer.addChild(this, 0);
		//z: 0
		this._curPos = this._body.GetPosition();

		this.schedule(this.update, 1 / 60);
	},
    initSprite : function(){
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_Item_Devil);
        var animFrames = [];
        for(var i = 1; i < 5; i++) {
            var str = "crocs" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.05);
        this._crocsInitAction = cc.RepeatForever.create(cc.Animate.create(animation));

        this.initWithSpriteFrameName("crocs1.png");
        this.runAction(this._crocsInitAction);

    },
	addItemWithType : function(world, p) {
		var tex = this;
		var x, y;
		this._direction = Math.floor((Math.random() * 10 % 4) + 1);
		switch(this._direction) {
			case 1:
				tex.setPosition(p.x, BG.GAME_UI.INNER_FRAME.HEIGHT);
				x = p.x;
				y = BG.GAME_UI.INNER_FRAME.HEIGHT;
				this._velocity = cc.p(0, -2);
				break;
			case 2:
				tex.setPosition(p.x, BG.GAME_UI.OUTTER_FRAME.HEIGHT);
				x = p.x;
				y = BG.GAME_UI.OUTTER_FRAME.HEIGHT;
				this._velocity = cc.p(0, 2);
				break;
			case 3:
				tex.setPosition(BG.GAME_UI.OUTTER_FRAME.WIDTH, p.y);
				x = BG.GAME_UI.OUTTER_FRAME.WIDTH;
				y = p.y;
				this._velocity = cc.p(2, 0);
				break;
			case 4:
				tex.setPosition(BG.GAME_UI.INNER_FRAME.WIDTH, p.y);
				x = BG.GAME_UI.INNER_FRAME.WIDTH;
				y = p.y;
				this._velocity = cc.p(-2, 0);
				break;
		}

		// Define the body.
		var b2BodyDef = Box2D.Dynamics.b2BodyDef, b2Body = Box2D.Dynamics.b2Body, b2FixtureDef = Box2D.Dynamics.b2FixtureDef, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		//type
		bodyDef.position.Set(x / PTM_RATIO, y / PTM_RATIO);
		bodyDef.userData = tex;
		var body = world.CreateBody(bodyDef);

		// Define another box shape for our dynamic body.
		var dynamicBox = new b2PolygonShape();
		dynamicBox.SetAsBox(tex.getTextureRect().width / (PTM_RATIO * 2), tex.getTextureRect().height / (PTM_RATIO * 2));

		// Define the dynamic body fixture.
		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = dynamicBox;
		fixtureDef.density = 0;
		fixtureDef.friction = 0;
		fixtureDef.isSensor = true;
		body.CreateFixture(fixtureDef);
		body.SetLinearVelocity(this._velocity);
		if(this._type == BG.ITEM_TYPE.DEVIL){
        switch(this._direction){
	        	case 1:
	        		this._startAngle = 90;
	        	break;
	        	case 2:
	        		this._startAngle = -90;
	        	break;
	        	case 3:
	        		//do nothing
	        	break;
	        	case 4:
	        		tex.runAction(cc.FlipX.create(90));
	        	break;	
        }
		}
		body.SetAngle(this._startAngle*(Math.PI/180));
		this._body = body;
	},
	getType : function() {
		return this._type;
	},
	getBody : function() {
		return this._body;
	},
	getTypeName: function () {
		return this._typeName;
	},
	destroy : function(layer) {
		if (this._type === BG.ITEM_TYPE.DEVIL) {
			if (this._isOut) this._curLayer.setDevilItemOn(false);
		}
		layer.removeChild(this);
		layer.destroyList.push(this._body);
	},
	update : function() {
		if (this._angle < this._startAngle-50)
			this._updownFlag = "up";
		if (this._angle > this._startAngle+50)
			this._updownFlag = "down";

		if (this._updownFlag === "up")
			this._angle += 3;
		else if (this._updownFlag === "down")
			this._angle -= 3;

		this.setRotation(this._angle);

		//case of getting out of screen
		if ((this._curPos.y * PTM_RATIO) > BG.GAME_UI.INNER_FRAME.HEIGHT + (BG.GAME_UI.OUTTER_FRAME.HEIGHT * 2)) {
			this._isOut = true;
			this.destroy(this._curLayer);
		} else if ((this._curPos.y * PTM_RATIO) < 0) {
			this._isOut = true;
			this.destroy(this._curLayer);
		} else if ((this._curPos.x * PTM_RATIO) > BG.GAME_UI.INNER_FRAME.WIDTH + (BG.GAME_UI.OUTTER_FRAME.WIDTH * 2)) {
			this._isOut = true;
			this.destroy(this._curLayer);
		} else if ((this._curPos.x * PTM_RATIO) < 0) {
			this._isOut = true;
			this.destroy(this._curLayer);
		}
	}
});
