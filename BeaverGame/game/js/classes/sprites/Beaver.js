classes.sprites.Beaver = cc.Sprite.extend({
	name: "Beaver",
	_id: 0,
	_startFlag: false,
    _texture: null,
    _leftKeyDown: false,
    _rightKeyDown: false,
    _vector: new Box2D.Common.Math.b2Vec2(),
    _currentAngle: 0,
    _curVelocity: 5,
    _body: null,
    _itemList: [],
    ctor: function (layer, p, id) {
        this._super();
        this._id = id;
        this.initWithFile(s_Beaver);
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        this.addBeaverWithCoords(layer.world, p);
        layer.addChild(this, 0); //z: 0
    },
    getID: function() {
    	return this._id;
    },
    addItem: function(item) {
    	this._itemList[this._itemList.length-1] = item;
    	console.log("Beaver id: "+this._id+" get Item("+item.getType()+")");
    },
    addBeaverWithCoords: function (world, p) {
        var tex = this;
        tex.setPosition(p.x, p.y);

        // Define the dynamic body.
        var b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
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
        //fixtureDef.isSensor = true;
        body.CreateFixture(fixtureDef);
        
        this._body = body;
    },
    update: function () {
    	if(this._startFlag)
        	this._move();
        if (this._leftKeyDown || this._rightKeyDown)
        {
        	if(!this._startFlag) 
        		this._startFlag = true;
        	this._turn();
        }
    },
    handleKeyDown: function (e) {
        if (!this._leftKeyDown || !this._rightKeyDown) {
            if (e === cc.KEY.left) this._leftKeyDown = true;
            else if (e === cc.KEY.right) this._rightKeyDown = true;
        }
    },
    handleKeyUp: function () {
        this._leftKeyDown = false;
        this._rightKeyDown = false;
    },
    _turn: function () {
        var curVector = this._vector;
        var curAngle = this._currentAngle;
        
        if (this._leftKeyDown) curAngle-=5, this._body.SetAngle(curAngle*(Math.PI/180));
        if (this._rightKeyDown) curAngle+=5, this._body.SetAngle(curAngle*(Math.PI/180));
		if(curAngle < 0) curAngle = 355;
		if(curAngle > 360) curAngle = 5;
        //curVector = new Box2D.Common.Math.b2Vec2();
        curVector.x = this._curVelocity*Math.cos(-curAngle*(Math.PI/180)); // 5: velocity
        curVector.y = this._curVelocity*Math.sin(-curAngle*(Math.PI/180));
        //console.log(" a: "+curAngle+" vx: "+curVector.x+" vy: "+curVector.y);
        
        this._vector = curVector;
        this._currentAngle = curAngle;
    },
    _move: function () {
        this._body.SetLinearVelocity(this._vector);
        this._body.SetAwake(true);
    }
});



// this._currentRotation--;
// this.runAction(cc.Sequence.create(
// cc.MoveBy.create(0.01, cc.p(-10, 0)),
// cc.CallFunc.create(function() {
// that.setScaleX(0.5);
// that.setScaleY(2.0);
// }),
// cc.DelayTime.create(0.5),
// cc.CallFunc.create(this.beFreak, this)
// ));
// this.setScaleX(0.5);
// this.setScaleY(2.0);	 

// handleTouch:function(touchLocation)
// {
// if(touchLocation.x < 300)
// this._currentRotation = 0;
// else
// this._currentRotation = 180;
// },
// handleTouchMove:function(touchLocation){
// // Gross use of hardcoded width,height params.
// var angle = Math.atan2(touchLocation.x-300,touchLocation.y-300);
// 
// angle = angle * (180/Math.PI);
// this._currentRotation = angle;
// 
// },
// beFreak: function() {
// this.setScaleX(1.0);
// this.setScaleY(1.0);
// }