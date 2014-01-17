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
    _twigs:[],
    _showTwigsLock: false,
    _curLayer: null,
    _savedPos: {x:0, y:0},
    _oldPos: {x:0, y:0},
    
    //count
    count: {
    	posSetCount: 0,
    },
    ctor: function (layer, p, id) {
        this._super();
        this._id = id;
        this._curLayer = layer;
        this.initWithFile(s_Beaver);
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        this.addBeaverWithCoords(this._curLayer.world, p);
        layer.addChild(this, 0); //z: 0
    },
    getID: function() {
    	return this._id;
    },
    addTwig: function(twig) {
	    this._twigs[this._twigs.length] = twig;
	    this._curLayer.removeChild(twig, true);
    	console.log("Beaver id: "+this._id+" get Twig("+twig.getType()+")");
    },
    addItem: function(item) { //TODO
    	this._itemList[this._itemList.length] = item;
    	this._curLayer.removeChild(item, true);
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
    slow: function () {
    	this._curVelocity = 1;
    	console.log("slow 2s beaver: "+this._id);
    	this.runAction(cc.Sequence.create(
    		cc.Blink.create(2, 5),
    		cc.CallFunc.create(function () {
    			this._curVelocity = 5;
    		}, this)
    	));
    },
    saveCurPos: function (p) {
    	this._savedPos = p;
    },
    getSavedPos: function () {
    	return this._savedPos;
    },
    setOldPos: function (p) {
    	this._oldPos = p;
    },
    getOldPos: function () {
    	return this._oldPos;
    },
    update: function () {
    	if(this._startFlag)
    	{
    		for (var i in this._twigs) 
				this._twigs[i].update();
			
        	this._move();
        	this._showTwigs();
        }
        else this._body.SetActive(false);
        
        if (this._leftKeyDown || this._rightKeyDown)
        {
        	if(!this._startFlag)
        	{
        		this.slow();
        		this._startFlag = true;
        	}
        	this._turn();
        }
        
        //counter proc
        if(this.count.posSetCount == 1)
        {
        	//this.saveCurPos(this._body.GetPosition()); // GetPosition is tracing!! always updating!!!!
        	this.saveCurPos(cc.p(this._body.GetPosition().x, this._body.GetPosition().y));
        }
        if(this.count.posSetCount == 5)
        {
        	this.setOldPos(this.getSavedPos());
        	this.count.posSetCount = 0;
        }
        	
        //count
        for(var prop in this.count)
        	this.count[prop]++;
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
        curVector.x = this._curVelocity*Math.cos(-curAngle*(Math.PI/180)); // 5: velocity
        curVector.y = this._curVelocity*Math.sin(-curAngle*(Math.PI/180));
        //console.log(" a: "+curAngle+" vx: "+curVector.x+" vy: "+curVector.y);
        
        this._vector = curVector;
        this._currentAngle = curAngle;
    },
    _move: function () {
        this._body.SetLinearVelocity(this._vector);
        this._body.SetActive(true);   
    },
    _showTwigs: function () {	
		for (var i in this._twigs) {
			
			if (i == 0)
				var twigOrThis = this;
			else
				var twigOrThis = this._twigs[i - 1];
			
			if (!this._twigs[i].getIsStuck()) {
				this._twigs[i].setIsStuck(true);
				var newTwig = new classes.sprites.Twig(this._curLayer, cc.p( twigOrThis.getOldPos() ), this._twigs[i].getType(), true);
				this._twigs[i] = newTwig;
				console.log("new twig!! :"+i);
			}
			else
			{
				this._twigs[i].getBody().SetPosition( twigOrThis.getOldPos() );
			}
		}
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