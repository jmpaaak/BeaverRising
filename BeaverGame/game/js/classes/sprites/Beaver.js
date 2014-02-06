classes.sprites.Beaver = cc.Sprite.extend({
	name: "Beaver",
	_id: 0,
    
    //Key Event
    _leftKeyDown: false,
    _rightKeyDown: false,
    _qKeyDown: false,
    _wKeyDown: false,
    _leftKeyUp: false,
    _rightKeyUp: false,
    _qKeyUp: false,
    _wKeyUp: false,
    
    _vector: null,
    _currentAngle: 0,
    _curVelocity: BG.BEAVER_SPEED.NORMAL,
    _curPos: null,
    _body: null,
    _itemList: null,
    _twigs: null,
    _positions: null,
    _curLayer: null,
    _bullet: null,
    _categoryPlayer : null,
    _outAngle : 0,
    _homeInPoint : null,
    _winSize : null,

    //state flag
	_startFlag: false,
    _setInFlag : false,
    _setOutFlag : false,
    _isHome : false,
    _lightningOn : false,
    _shieldingOn : false,
    _isStun: false,
    _goHomeFlag: false,
    
    count: null,
    // count: {
    	// savePosCount: 0
    // },
    ctor: function (layer, p, id) {
        this._super();
        this._winSize = cc.Director.getInstance().getWinSize();
        this._id = id;
        this._curLayer = layer;
        this._categoryPlayer = Math.pow(2, this._id);
        this.initWithFile(s_Beaver);
        this.addBeaverWithCoords(this._curLayer.world, p);
  		this._itemList = [];
  		this._twigs = [];
  		this._positions = [];
  		this.settingPoint();
  		this._curPos = this._body.GetPosition();
        for(var i=0; i<100; i++)
        	this._positions[i] = cc.p(0,0);
        
        //init counter	
   		this.count = {
   			savePosCount: 0,
   			moveAllowCount: 0,
   			lightningCount: 0
   		};
   		
        layer.addChild(this, 2); //z: 0
        
        this.schedule(this.update, 1/60);
        
    },
    settingPoint : function(){
    	this._homeInPoint = new cc.Point();
    	switch(this._id)
    	{
    		case BG.CATEGORY.PLAYER1:
    			this._homeInPoint= cc.p(BG.GAME_UI.OUTTER_FRAME.WIDTH / PTM_RATIO , (this._winSize.height - BG.GAME_UI.OUTTER_FRAME.HEIGHT) / PTM_RATIO);
    			this._outAngle = 45;
    			break;
    		case BG.CATEGORY.PLAYER2:
    			this._homeInPoint= cc.p((this._winSize.width-BG.GAME_UI.OUTTER_FRAME.WIDTH)/PTM_RATIO, (this._winSize.height - BG.GAME_UI.OUTTER_FRAME.HEIGHT)/PTM_RATIO);
    			this._outAngle = 135;
    			break;
    		case BG.CATEGORY.PLAYER3:
    			this._homeInPoint= cc.p(BG.GAME_UI.OUTTER_FRAME.WIDTH / PTM_RATIO ,BG.GAME_UI.OUTTER_FRAME.HEIGHT / PTM_RATIO);
    			this._outAngle = 225;
    			break;
    		case BG.CATEGORY.PLAYER4:
    			this._homeInPoint= cc.p((this._winSize.width - BG.GAME_UI.OUTTER_FRAME.WIDTH) / PTM_RATIO, BG.GAME_UI.OUTTER_FRAME.HEIGHT / PTM_RATIO);
    			this._outAngle = 315;
    			break;
    	}
    },
    addTwig: function(twig) {
	    this._twigs[this._twigs.length] = twig;
	    this._curLayer.removeChild(twig);
	    this._curLayer.destroyList.push(twig.getBody());
    	console.log("Beaver id: "+this._id+" get Twig("+twig.getType()+")");
    	twig = null;
    	
    	var willGetScore = cc.LabelBMFont.create("+" + this._twigs.length, s_Konqa32);
    	if(this._twigs.length >= 5) willGetScore.setColor(cc.c3(255,0,0));
    	else willGetScore.setColor(cc.c3(255,255,255));
        willGetScore.setPosition(this._curPos.x*PTM_RATIO, this._curPos.y*PTM_RATIO+20);
        this._curLayer.addChild(willGetScore,2);
        //Actions
        willGetScore.runAction(cc.Sequence.create(cc.MoveBy.create(0.5, cc.p(0,20))));
	    willGetScore.runAction(cc.Sequence.create(
	    	cc.FadeIn.create(0.3),
	    	cc.DelayTime.create(0.2),
	    	cc.CallFunc.create(function () {
	    		this._curLayer.removeChild(willGetScore, true);
	    	}, this)
	    ));
    },
    addItem: function(item) { //TODO
    	if(this._itemList.length === 2) return;
    	this._itemList[this._itemList.length] = item;
    	this._curLayer.removeChild(item);
    	this._curLayer.destroyList.push(item.getBody());
    	console.log("Beaver id: "+this._id+" get Item("+item.getType()+")");
    	item = null;
    },
    addBeaverWithCoords: function (world, p) {
		/*
         * add Beaver body
         */
        var tex = this;
        tex.setPosition(p.x, p.y);
        // Define the dynamic body.
        var b2Vec2 = Box2D.Common.Math.b2Vec2,
        	b2BodyDef = Box2D.Dynamics.b2BodyDef,
            b2Body = Box2D.Dynamics.b2Body,
            b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
			b2FilterData = Box2D.Dynamics.b2FilterData,
			b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;
			
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
        // fixtureDef.isSensor = true;
        body.CreateFixture(fixtureDef);
        
        this._body = body;
    },
    stun: function () {
    	if(!this._isStun)
    	{
	    	this._isStun = true;
	    	this._curVelocity = 0;
	    	console.log("stun 2s beaver: "+this._id);
	    	this.runAction(cc.Sequence.create(
	    		cc.Blink.create(1.5, 5),
	    		cc.CallFunc.create(function () {
	    			this._curVelocity = BG.BEAVER_SPEED.NORMAL;
	    			this.setOpacity(255);
	    			this._isStun = false;
	    			this._move();
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
    		this._twigs[at] = null;
    	}
    	this._twigs.splice(index, this._twigs.length-index);
    },
    returnToBase: function () {
    	this._goHomeFlag = true;
    	this.removeTailAtIndex(0);
    },
    update: function () {
    	if(this._startFlag)
    	{	
	        if(this._setInFlag)
	        {
	        	this._settingHomeIn();
	        	this.settingIn(false);
	        }
	        else if(this._setOutFlag)
	        {
	        	if(this.count.moveAllowCount >= 20) {
	        		this.settingOut(false); 
	        		this.setIsHome(false);	
	        	}
	        	this._settingHomeOut();
	        	this.count.moveAllowCount++;
	        }
	        else if(this._goHomeFlag)
	        {
	        	this._body.SetPosition(this._homeInPoint);
	        	this.runAction(cc.Blink.create(2, 7));
	        	this.setOpacity(255);
				this._goHomeFlag = false;	        	
	        }
	        else
	        {
	        	this._move();
				this._body.SetAwake(true);
	        	this.count.moveAllowCount = 0;
	        }
	        
       		this._showTwigs();
       		
	        if(this._lighteningOn){
	        	if(this.count.lighteningCount == 20){
	        		this.count.lighteningCount = 0;
	        		this._lighteningOn = false;
	        		this._curVelocity = BG.BEAVER_SPEED.NORMAL;
	        	}
	        	this.count.lighteningCount++;
	        }
	    }
	    else if(this._curLayer.getIsStart())
	    {
	    	this.stun();
	    	this._startFlag = true;
	    }

        this._showTwigs();
        
        if(this._shieldingOn) {
        	for(var i=0; i<this._twigs.length; i++) 
	    	{
	    		this._twigs[i].shield();
	    	}
        }
        
        //using lightning
        if(this._lightningOn) {
        	
        	if(this.count.lightningCount == 30) {
        		this._curVelocity = BG.BEAVER_SPEED.SUPERFAST;
        	}
        	else if(this.count.lightningCount == 40) {
        		this.count.lightningCount = 0;
        		this._lightningOn = false;
        		this._curVelocity = BG.BEAVER_SPEED.NORMAL;
        	}
        	else 
        	{	//if(Math.random() < 0.5){ //lightning prepare.
        		var lightPrepare = cc.Sprite.create(s_LightningPrepare);
        		
        		var choiceLightning = Math.floor(Math.random()*10) % 4 ;
				if(choiceLightning == 0){ //drawing in front of beaver 
		    			var randomPosX = (Math.floor(Math.random()*100) % this.getTextureRect().width) + (this.getTextureRect().width / 2);
		  				var randomPosY = (Math.floor(Math.random()*100) % this.getTextureRect().height);   						
					}
				else{ //drawing back of beaver
						var randomPosX = Math.floor(Math.random()*10) % 2 ;
        				var randomPosY = Math.floor(Math.random()*10) % 2 ;
        				
						if(randomPosX == 0) randomPosX = (this._curPos.x * PTM_RATIO) + (Math.floor(Math.random()*100) % this.getTextureRect().width);
		        		else randomPosX = (this._curPos.x * PTM_RATIO) - (Math.floor(Math.random()*100) % this.getTextureRect().width);
		  				if(randomPosY == 0) randomPosY = (this._curPos.y * PTM_RATIO) + (Math.floor(Math.random()*100) % this.getTextureRect().height);
		        		else randomPosY = (this._curPos.y * PTM_RATIO) - (Math.floor(Math.random()*100) % this.getTextureRect().height);
				}
        		lightPrepare.setPosition(randomPosX, randomPosY);		  
        		lightPrepare.setRotation(this._body.GetAngle());
        		
        		if(choiceLightning == 0){ //drawing in front of beaver // position based on canvas
        			this.addChild(lightPrepare,5);
        			var delay = cc.DelayTime.create(0.2);
			        var action1 = cc.FadeIn.create(0.1);
			        var action1Back = action1.reverse();
	    			var removeLightning = cc.CallFunc.create(function () 
	    			{this.removeChild(lightPrepare, true);}, this);	
        		}
        		else{ //drawing back of beaver //// position based on beaver
        			this._curLayer.addChild(lightPrepare,0);
        			var delay = cc.DelayTime.create(0.4);
			        var action1 = cc.FadeIn.create(0.2);
			        var action1Back = action1.reverse();
	    			var removeLightning = cc.CallFunc.create(function () 
	    			{this._curLayer.removeChild(lightPrepare, true);}, this);
        		}
            	lightPrepare.runAction(cc.Sequence.create(action1, delay, action1Back, removeLightning));
        	}
        	this.count.lightningCount++;
        	
        }
        	
        	
        if(this._id === 1)
        {
	        if (this._leftKeyDown || this._rightKeyDown)
	        {
	        }
	    }
	    else if(this._id === 2)
	    {
	    	if (this._qKeyDown || this._wKeyDown)
	        {
	        }
	    }
        //case of getting out of screen
        if((this._curPos.y * PTM_RATIO) > this._winSize.height - BG.GAME_UI.OUTTER_FRAME.HEIGHT + 10)
        {
			this._body.SetPosition(cc.p(this._curPos.x, BG.GAME_UI.OUTTER_FRAME.HEIGHT / PTM_RATIO));
        }
        else if((this._curPos.y * PTM_RATIO) < BG.GAME_UI.OUTTER_FRAME.HEIGHT - 10)
        {
        	this._body.SetPosition(cc.p(this._curPos.x, this._winSize.height / PTM_RATIO - (BG.GAME_UI.OUTTER_FRAME.HEIGHT / PTM_RATIO)));
        }        
        else if((this._curPos.x * PTM_RATIO) > this._winSize.width - BG.GAME_UI.OUTTER_FRAME.WIDTH + 10)
        {
        	this._body.SetPosition(cc.p(BG.GAME_UI.OUTTER_FRAME.WIDTH / PTM_RATIO,this._curPos.y));
        }        
        else if((this._curPos.x * PTM_RATIO) < BG.GAME_UI.OUTTER_FRAME.WIDTH - 10)
        {
        	this._body.SetPosition(cc.p(this._winSize.width / PTM_RATIO - (BG.GAME_UI.OUTTER_FRAME.WIDTH / PTM_RATIO),this._curPos.y));
        }

       // count
       this.count.savePosCount++;
    },
    handleKeyDown: function (e) {
    	if(this._id === 1)
    	{
    		this._leftKeyUp = false;
        	this._rightKeyUp = false;
	        if (!this._leftKeyDown || !this._rightKeyDown) {
	            if (e === cc.KEY.left) this._leftKeyDown = true;
	            else if (e === cc.KEY.right) this._rightKeyDown = true;
	        }
	        if(e === cc.KEY.ctrl)
	        	this._useItem();
	    }
	    else if(this._id === 2)
	    {
	    	this._leftKeyUp = false;
        	this._rightKeyUp = false;
	    	if (!this._qKeyDown || !this._wKeyDown) {
	            if (e === cc.KEY.q) this._qKeyDown = true;
	            else if (e === cc.KEY.w) this._wKeyDown = true;
	        }
	        if(e === cc.KEY.e)
	        	this._useItem();
	    }
    },
    handleKeyUp: function (e) {
    	if(this._id === 1)
    	{
        	this._leftKeyDown = false;
        	this._rightKeyDown = false;
        	if (!this._leftKeyUp || !this._rightKeyUp) {
	            if (e === cc.KEY.left) this._leftKeyUp = true;
	            else if (e === cc.KEY.right) this._rightKeyUp = true;
	        }
        }
        else if(this._id === 2)
        {
       		this._qKeyDown = false;
       		this._wKeyDown = false;
       		if (!this._qKeyUp || !this._wKeyUp) {
	            if (e === cc.KEY.q) this._qKeyUp = true;
	            else if (e === cc.KEY.w) this._wKeyUp = true;
	        }
        }
    },
    _useItem: function () {
    	if(this._itemList.length === 0) return;
    	switch(this._itemList[0].getType())
    	{
    		case BG.ITEM_TYPE.BULLET:
    			this._shoot();
    			break;
    		case BG.ITEM_TYPE.SHIELD:
    			this.shielding();
    			break;
    		case BG.ITEM_TYPE.LIGHTNING:
    			this._lightningOn = true;
    			break;
    	}
    	this._itemList.splice(0,1);
    },
    _move: function () {
	    	if(!this._vector) this._vector = new cc.Point();
	        var curVector = this._vector;
	        var curAngle = this._currentAngle;
	        
	        if(this._id === 1)
	        {
		        if(this._leftKeyDown) curAngle-=5, this._body.SetAngle(curAngle*(Math.PI/180));
		        if(this._rightKeyDown) curAngle+=5, this._body.SetAngle(curAngle*(Math.PI/180));
		        if(this._leftKeyUp);
		        if(this._rightKeyUp);
		    }
		    else if(this._id === 2)
		    {
		    	if(this._qKeyDown) curAngle-=5, this._body.SetAngle(curAngle*(Math.PI/180));
		        if(this._wKeyDown) curAngle+=5, this._body.SetAngle(curAngle*(Math.PI/180));
		        if(this._qKeyUp);
		        if(this._wKeyUp);
		    }
			if(curAngle < 0) curAngle = 355;
			if(curAngle > 360) curAngle = 5;
	        curVector.x = this._curVelocity*Math.cos(-curAngle*(Math.PI/180));
	        curVector.y = this._curVelocity*Math.sin(-curAngle*(Math.PI/180));
	        //console.log(" a: "+curAngle+" vx: "+curVector.x+" vy: "+curVector.y);
	        this._vector = curVector;
	        this._currentAngle = curAngle;
	        this._body.SetLinearVelocity(this._vector);
    },
    
    _showTwigs: function () {
    	if(this.count.savePosCount >= 4 && !this._isStun)
	    {
			//console.log("p "+this._id+" "+this._curPos.x+" "+this._curPos.y);
			//console.log(this._id+" "+this._twigs.length);
			this._positions.unshift(cc.p(this._curPos.x, this._curPos.y));
			if (this._positions.length >= ((this._twigs.length + 3) * 5) + 6)
				this._positions.pop();
				
        	if(this._isHome)
        		this.count.savePosCount = 3;
        	else
        		this.count.savePosCount = 0;
        		
			for(var i=0; i<this._twigs.length; i++) 
	    	{
	    		if (!this._twigs[i].getIsStuck()) {
					this._twigs[i].setIsStuck(true);
					var newTwig = new classes.sprites.Twig(this._curLayer, this._positions[(i*5)+4], this._twigs[i].getType(), true, this._id);
					newTwig.setTailIndex(i);
					this._twigs[i] = newTwig;
				}
				var p = this._positions[(i*5)+4];
				// console.log(this._id+" "+p.x+" "+p.y);
				this._twigs[i].getBody().SetPosition(p);
				this._twigs[i].setRotate();
	    	}
	    }
    },
    
    ///// Item effects/////
    _shoot: function () {
    	var x = PTM_RATIO*this._curPos.x,
    		y = PTM_RATIO*this._curPos.y;
    	var bullet = new classes.sprites.Bullet(this._curLayer, cc.p(x,y), this);
    	bullet.fire();
	},

	_lightening : function() {
		this._lighteningOn = true;
		this._curVelocity = BG.BEAVER_SPEED.SUPERFAST;
	},
	shielding: function () {
		if(this._twigs.length === 0) return;
		var that = this;
		this._shieldingOn = true;
		this.runAction(cc.Sequence.create(
    		cc.DelayTime.create(5.0),
    		cc.CallFunc.create(function () {
    			that._shieldingOn = false;
	        	for(var i=0; i<that._twigs.length; i++) 
		    	{
		    		that._twigs[i].unshield();
		    	}
    		})
    	));
	},
	getID: function () {
    	return this._id;
    },
    getVector: function () {
    	return this._vector;
    },
    getIsStart: function () {
    	return this._starFlag;
    },
    getTwigs : function () {
    	return this._twigs;
    },
    getIsShielding: function () {
    	return this._isShielding;
    },
    settingIn : function(bool){
    	this._setInFlag = bool;
    },
    settingOut : function(bool){
    	this._setOutFlag = bool;
    },
    getInFlag : function(){
    	return this._setInFlag;
    },
    
    setIsHome : function(bool){
    	this._isHome = bool;
    },
    getIsHome : function(){
    	return this._isHome;
    },
    
    _settingHomeIn : function(){
    	if(this._lightningOn == true) this._lightningOn = false;
    	this._body.SetPosition(this._homeInPoint);
    	this._curVelocity = 0;
    },
    _settingHomeOut : function(){
	    var curVector = this._vector;
	    var curAngle = this._outAngle;
		if(this._curVelocity == 0) this._curVelocity = BG.BEAVER_SPEED.NORMAL;
	    this._body.SetAngle(curAngle*(Math.PI/180));
	    
	    curVector.x = this._curVelocity * Math.cos(-curAngle*(Math.PI/180));
	    curVector.y = this._curVelocity * Math.sin(-curAngle*(Math.PI/180));
	    
	    this._vector = curVector;
	    this._currentAngle = curAngle;
	    this._body.SetLinearVelocity(this._vector);
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