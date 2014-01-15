classes.sprites.Item = cc.Sprite.extend({
	name: "Item",
	_type: 0,
    _body: null,
    ctor: function (layer, p, type) {
        this._super();
        this._type = type;
        switch(type)
        {
        	case BG.ITEM_TYPE.SPEED:
        		this.initWithFile(s_Item_Speed);
        		break;
        	case BG.ITEM_TYPE.SHIELD:
        		//this.initWithFile(s_Item_Shield);
        		break;
        		
        	//TODO
        }
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        this.addItemWithType(layer.world, p);
        layer.addChild(this, 0); //z: 0
    },
    addItemWithType: function (world, p) {
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
    getType: function() {
    	return this._type;
    },
    update: function () {
    }
});