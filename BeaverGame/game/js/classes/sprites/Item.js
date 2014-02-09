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
        	case BG.ITEM_TYPE.DEVIL:
        		this._curLayer.setDevilItemOn(true);
        		this.initWithFile(s_Item_Devil);
        		break;
        }
      	var rand = Math.random();
      	if(rand <= 0.25)
      		this._direction = 1;
      	else if(rand <= 0.5)
      		this._direction = 2;      	
      	else if(rand <= 0.75)
      		this._direction = 3;
      	else
      		this._direction = 4;

        this.addItemWithType(layer.world, p);
        layer.addChild(this, 0); //z: 0
        this._curPos = this._body.GetPosition();
        this.schedule(this.update, 1/60);
    },
    addItemWithType: function (world, p) {
        var tex = this;
        var x, y;
        switch(this._direction)
        {
        	case 1:
		        tex.setPosition(p.x, 1080+tex.getTextureRect().height/2);
		        x = p.x, y = 1080+tex.getTextureRect().height/2;
		        break;
        	case 2:
		        tex.setPosition(p.x, -tex.getTextureRect().height/2);
		        x = p.x, y = -tex.getTextureRect().height/2;
		        break;
        	case 3:
		        tex.setPosition(-tex.getTextureRect().width/2, p.y);
		        y = p.y, x = -tex.getTextureRect().width/2;
		        break;
        	case 4:
		        tex.setPosition(1920+tex.getTextureRect().width/2, p.y);
		        y = p.y, x = 1920+tex.getTextureRect().width/2;
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
    	if(this._type === BG.ITEM_TYPE.DEVIL) this._curLayer.setDevilItemOn(false);
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
    		
    	switch(this._direction)
        {
        	case 1:
		        this._body.SetLinearVelocity(cc.p(0, -5));
		        break;
        	case 2:
		        this._body.SetLinearVelocity(cc.p(0, 5));
		        break;
        	case 3:
		        this._body.SetLinearVelocity(cc.p(5, 0));
		        break;
        	case 4:
		        this._body.SetLinearVelocity(cc.p(-5, 0));
		        break;
	    }
    	
    	//case of getting out of screen
        if((this._curPos.y * PTM_RATIO) > 1080+50)
			this.destroy(this._curLayer);
        else if((this._curPos.y * PTM_RATIO) < 0-50)
        	this.destroy(this._curLayer);
        else if((this._curPos.x * PTM_RATIO) > 1920+50)
        	this.destroy(this._curLayer);        
        else if((this._curPos.x * PTM_RATIO) < 0-50)
        	this.destroy(this._curLayer);
    }
});