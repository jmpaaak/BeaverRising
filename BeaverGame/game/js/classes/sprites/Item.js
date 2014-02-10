classes.sprites.Item = cc.Sprite.extend({
	name : "Item",
	_type: 0,
	_direction: 0,
    _body: null,
    _curLayer: null,
    _curPos: null,
    _angle: 0,
    _updownFlag: null,
    ctor: function (layer, p, type) {
        this._super();
        this._type = type;
        this._curLayer = layer;
        this._angle = 0;
        this._updownFlag = "up";
        switch(type)
        {
        	case BG.ITEM_TYPE.BULLET:
        		this.initWithFile(s_Item_Bullet);
        		break;
        	case BG.ITEM_TYPE.SHIELD:
        		this.initWithFile(s_Item_Shield);
        		break;
        	case BG.ITEM_TYPE.LIGHTNING:
        		this.initWithFile(s_Item_Lightning);
        		break;
        }

        this.addItemWithType(layer.world, p);
        layer.addChild(this, 0); //z: 0
        this._curPos = this._body.GetPosition();
        this.schedule(this.update, 1/60);
    },
    addItemWithType: function (world, p) {
        var tex = this;
        var x, y;
        this._direction =   Math.floor((Math.random()*10 % 4) + 1);
        switch(this._direction){
        	case 1:
        		tex.setPosition(p.x, BG.GAME_UI.INNER_FRAME.HEIGHT);
        		x = p.x;
        		y = BG.GAME_UI.INNER_FRAME.HEIGHT;
        		this._velocity = cc.p(0, -4);
        		break;
        	case 2:
        		tex.setPosition(p.x, BG.GAME_UI.OUTTER_FRAME.HEIGHT);
        		x = p.x;
        		y = BG.GAME_UI.OUTTER_FRAME.HEIGHT;
        		this._velocity = cc.p(0, 4);
        		break;
        	case 3:
        		tex.setPosition(BG.GAME_UI.OUTTER_FRAME.WIDTH, p.y);
        		x = BG.GAME_UI.OUTTER_FRAME.WIDTH;
        		y = p.y;
        		this._velocity = cc.p(4, 0);
        		break;
        	case 4: 
        		tex.setPosition(BG.GAME_UI.INNER_FRAME.WIDTH, p.y);
        		x = BG.GAME_UI.INNER_FRAME.WIDTH;
        		y = p.y;
        		this._velocity = cc.p(-4, 0);
        		break;
        }

        // Define the body.
        var b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody; //type
        bodyDef.position.Set(x / PTM_RATIO, y / PTM_RATIO);
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
    getType: function () {
    	return this._type;
    },
    getBody: function () {
    	return this._body;
    },
    destroy: function (layer) {
    	layer.removeChild(this);
    	layer.destroyList.push(this._body);
    },
    update: function () {
    	if(this._angle < -60)
    		this._updownFlag = "up";
    	if(this._angle > 60)
    		this._updownFlag = "down";
    		
    	if(this._updownFlag === "up")
    		this._angle += 3;    		
    	else if(this._updownFlag === "down")
    		this._angle -= 3;
    		
		this.setRotation(this._angle);

    	
    	//case of getting out of screen
        if((this._curPos.y * PTM_RATIO) > BG.GAME_UI.INNER_FRAME.HEIGHT + (BG.GAME_UI.OUTTER_FRAME.HEIGHT * 2)){
        	this.destroy(this._curLayer);
        }
        else if((this._curPos.y * PTM_RATIO) < 0){
        	this.destroy(this._curLayer);
        }
        else if((this._curPos.x * PTM_RATIO) > BG.GAME_UI.INNER_FRAME.WIDTH + (BG.GAME_UI.OUTTER_FRAME.WIDTH * 2)){
        	this.destroy(this._curLayer);
        }
        else if((this._curPos.x * PTM_RATIO) < 0){
        	this.destroy(this._curLayer);  
        }
    }
});