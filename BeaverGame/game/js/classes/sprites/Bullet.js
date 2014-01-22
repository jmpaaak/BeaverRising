classes.sprites.Bullet = cc.Sprite.extend({
	name: "Bullet",
	_id: 0,
	_vector: new Box2D.Common.Math.b2Vec2(),
	_velocity: 10,
    _body: null,
    _categoryPlayer: null,
    ctor: function (layer, p, beaver) {
        this._super();
        this.initWithFile(s_Item_Speed);
        this._id = beaver.getID();
        this._vector = beaver.getVector();
        this.filterGroup();
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        this.addBulletBody(layer.world, p);
        layer.addChild(this, 0); //z: 0
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
        dynamicBox.SetAsBox(tex.getTextureRect().width / (PTM_RATIO*2), tex.getTextureRect().height / (PTM_RATIO*2));

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
    getBody: function () {
    	return this._body;
    },
    fire: function () { 	
		this._vector.x = this._velocity * this._vector.x;
		this._vector.y = this._velocity * this._vector.y;
    	this._body.SetLinearVelocity(this._vector);
    },
    filterGroup: function () {
    	this._categoryPlayer = Math.pow(2, this._id);
    	console.log("the category home is " + this._id + "-  " + this._categoryPlayer);
    	console.log("the ~ category home is " + this._id + "-  " + (~(this._categoryPlayer)));
    }
});