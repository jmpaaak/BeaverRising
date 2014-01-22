classes.sprites.Beaver = cc.Sprite.extend({
	name: "Beaver",
	_id: 0,
	_startFlag: false,
    _texture: null,
    
    //Key Event
    _leftKeyDown: false,
    _rightKeyDown: false,
    _qKeyDown: false,
    _wKeyDown: false,
    
    _vector: new Box2D.Common.Math.b2Vec2(),
    _currentAngle: 0,
    _curVelocity: 6.7,
    _curPos:{x:0, y:0},
    _body: null,
    _itemList: [],
    _twigs: [],
    _positions: [],
    _curLayer: null,
    _isSlow: false,
    _bullet: null,
    _categoryPlayer : null,
    
    
    count: {
    	savePosCount: 0
    },
    ctor: function (layer, p, id) {
        this._super();
        this._id = id;
        this._curLayer = layer;
        this._categoryPlayer = Math.pow(2, this._id);
        this.initWithFile(s_Beaver);
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        this.addBeaverWithCoords(this._curLayer.world, p);
        this._curPos = this._body.GetPosition();
        layer.addChild(this, 1); //z: 0
    },
    addTwig: function(twig) {
	    this._twigs[this._twigs.length] = twig;
	    this._curLayer.removeChild(twig);
	    this._curLayer.destroyList.push(twig.getBody());
    	console.log("Beaver id: "+this._id+" get Twig("+twig.getType()+")");
    },
    addItem: function(item) { //TODO
    	if(this._itemList.length === 2) return;
    	this._itemList[this._itemList.length] = item;
    	this._curLayer.removeChild(item);
    	this._curLayer.destroyList.push(item.getBody());
    	console.log("Beaver id: "+this._id+" get Item("+item.getType()+")");
    },
    addBeaverWithCoords: function (world, p) {
        var tex = this;
        tex.setPosition(p.x, p.y);

        // Define the dynamic body.
        var b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
			b2FilterData = Box2D.Dynamics.b2FilterData;
			
        var bodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.linearDamping = 5;
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
        fixtureDef.restitution = 0.1;
        fixtureDef.filter.categoryBits = this._categoryPlayer;
        fixtureDef.filter.maskBits = ~(this._categoryPlayer);
        console.log("the category beaver is " + this._id + "-  " + fixtureDef.filter.categoryBits);
		console.log("the ~ mask beaver is " + this._id + "-  " + fixtureDef.filter.maskBits);

        //fixtureDef.isSensor = true;
        body.CreateFixture(fixtureDef);
        
        this._body = body;
    },
    slow: function () {
    	if(!this._isSlow)
    	{
	    	this._isSlow = true;
	    	this._curVelocity = 0.5;
	    	console.log("slow 2s beaver: "+this._id);
	    	this.runAction(cc.Sequence.create(
	    		cc.Blink.create(1.5, 5),
	    		cc.CallFunc.create(function () {
	    			this._curVelocity = 6.7;
	    			this._move();
	    			this.setOpacity(255);
	    			this._isSlow = false;
	    		}, this)
	    	));
	    }
    },
    removeTailAtIndex: function (index) {
    	for(var at = index; at<this._twigs.length; at++)
    	{
    		console.log("remove: "+at);
    		this._curLayer.removeChild(this._twigs[at]);
    		this._curLayer.destroyList.push(this._twigs[at].getBody());
    	}
    	this._twigs.splice(index, this._twigs.length-index);
    },
    update: function () {
    	if(this._startFlag)
    	{	
        	this._move();
        	this._showTwigs();
        }
        else this._body.SetActive(false);
        
        if(this._id === 1)
        {
	        if (this._leftKeyDown || this._rightKeyDown)
	        {
	        	if(!this._startFlag)
	        	{
	        		this._startFlag = true;
	        		this.slow();
	        	}
	        }
	    }
	    else if(this._id === 2)
	    {
	    	if (this._qKeyDown || this._wKeyDown)
	        {
	        	if(!this._startFlag)
	        	{
	        		this._startFlag = true;
	        		this.slow();
	        	}
	        }
	    }
        //case of getting out of screen
        if((this._curPos.y * PTM_RATIO) > 720)
        {
			this._body.SetPosition(cc.p(this._curPos.x,0));
        }
        else if((this._curPos.y * PTM_RATIO) < 0)
        {
        	this._body.SetPosition(cc.p(this._curPos.x,720 / PTM_RATIO));
        }        
        else if((this._curPos.x * PTM_RATIO) > 1280)
        {
        	this._body.SetPosition(cc.p(0,this._curPos.y));
        }        
        else if((this._curPos.x * PTM_RATIO) < 0)
        {
        	this._body.SetPosition(cc.p(1280 / PTM_RATIO,this._curPos.y));
        }
        
        //count
        for(var prop in this.count)
        	this.count[prop]++;
    },
    handleKeyDown: function (e) {
    	if(this._id === 1)
    	{
	        if (!this._leftKeyDown || !this._rightKeyDown) {
	            if (e === cc.KEY.left) this._leftKeyDown = true;
	            else if (e === cc.KEY.right) this._rightKeyDown = true;
	        }
	        if(e === cc.KEY.ctrl)
	        	this._useItem();
	    }
	    else if(this._id === 2)
	    {
	    	if (!this._qKeyDown || !this._wKeyDown) {
	            if (e === cc.KEY.q) this._qKeyDown = true;
	            else if (e === cc.KEY.w) this._wKeyDown = true;
	        }
	        if(e === cc.KEY.e)
	        	this._useItem();
	    }
    },
    handleKeyUp: function () {
    	if(this._id === 1)
    	{
        	this._leftKeyDown = false;
        	this._rightKeyDown = false;
       }
       else if(this._id === 2)
       {
       		this._qKeyDown = false;
       		this._wKeyDown = false;
       }
    },
    _useItem: function () {
    	if(this._itemList.length === 0) return;
    	switch(this._itemList[0].getType())
    	{
    		case BG.ITEM_TYPE.SPEED:
    			this._shoot();
    			break;
    		case BG.ITEM_TYPE.SHIELD:
    			break;
    	}
    	this._itemList.splice(0,1);
    },
    _move: function () {
        var curVector = this._vector;
        var curAngle = this._currentAngle;
        
        if(this._id === 1)
        {
	        if (this._leftKeyDown) curAngle-=5, this._body.SetAngle(curAngle*(Math.PI/180));
	        if (this._rightKeyDown) curAngle+=5, this._body.SetAngle(curAngle*(Math.PI/180));
	    }
	    else if(this._id === 2)
	    {
	    	if (this._qKeyDown) curAngle-=5, this._body.SetAngle(curAngle*(Math.PI/180));
	        if (this._wKeyDown) curAngle+=5, this._body.SetAngle(curAngle*(Math.PI/180));
	    }
		if(curAngle < 0) curAngle = 355;
		if(curAngle > 360) curAngle = 5;
        curVector.x = this._curVelocity*Math.cos(-curAngle*(Math.PI/180)); // 5: velocity
        curVector.y = this._curVelocity*Math.sin(-curAngle*(Math.PI/180));
        //console.log(" a: "+curAngle+" vx: "+curVector.x+" vy: "+curVector.y);
        this._vector = curVector;
        this._currentAngle = curAngle;
        
        this._body.SetLinearVelocity(this._vector);
        this._body.SetActive(true);
        
        if(this.count.savePosCount >= 4 && !this._isSlow)
        {
        	this._positions.unshift(cc.p(this._curPos.x, this._curPos.y)); 
        	if(this._positions.length == ((this._twigs.length+3)*5)+6) this._positions.pop(); 
        	this.count.savePosCount = 0;
        }
    },
    _showTwigs: function () {
    	for(var i in this._twigs) {
    		if (!this._twigs[i].getIsStuck()) {
				this._twigs[i].setIsStuck(true);
				var newTwig = new classes.sprites.Twig(this._curLayer, this._positions[(i*5)+4], this._twigs[i].getType(), true);
				newTwig.setTailIndex(i);
				this._twigs[i] = newTwig;
			}
			//this._twigs[i].getBody().SetPosition(this._positions[(i*5)+4]);
			this._twigs[i].setPosition(this._positions[(i*5)+4].x * PTM_RATIO, this._positions[(i*5)+4].y * PTM_RATIO);
    	}
    },
    _shoot: function () {
    	var x = PTM_RATIO*this._curPos.x,
    		y = PTM_RATIO*this._curPos.y;
    	var bullet = new classes.sprites.Bullet(this._curLayer, cc.p(x,y), this);
    	bullet.fire();
	},
	getID: function () {
    	return this._id;
    },
    getVector: function () {
    	return this._vector;
    },
    getIsStart: function () {
    	return this._starFlag;
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