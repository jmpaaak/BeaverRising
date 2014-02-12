classes.sprites.Obstacle = cc.Sprite.extend({
	name : null,
	_direction : 0,
	_velocity : null,
    _body: null,
    _curLayer: null,
    _curPos: null,
    _angle: null,
    _turtleSpeed: null,
    _animationSpeed: null,
    //sprite
    _turtleInitAction: null,
    
    //sound


	ctor: function (layer, p, type){
        this._super();
        this._type = type;
        this._curLayer = layer;
        switch(type)
        {
        	case BG.OBSTACLE.TURTLE:
        		this._addTurtle(layer.world, p);
        		this.name = "Turtle";
        		break;
        }
   		this.initSprite();
		var size = cc.Director.getInstance().getWinSize();
        this._curPos = this._body.GetPosition();
        layer.addChild(this, 0); //z: 0
        this.schedule(this.update, 1/60);
    },
    initSprite : function(){
    	// create beaver init sprite sheet
        cc.SpriteFrameCache.getInstance().addSpriteFrames(p_turtle);
        var animFrames = [];
        for(var i = 1; i < 5; i++) {
            var str = "turtle0" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, this._animationSpeed);
        this._turtleInitAction = cc.RepeatForever.create(cc.Animate.create(animation));

        this.initWithSpriteFrameName("turtle01.png");
        this.runAction(this._turtleInitAction);

    },
    _addTurtle: function (world, p) {
        var tex = this;
        var x , y = null;
        this._direction =   Math.floor((Math.random()*10 % 4) + 1);
        var turtleChoice = Math.floor((Math.random()*10 % 2));
        if(turtleChoice == 0) //fast turtle
        {
        	this._turtleSpeed = 5;
        	this._animationSpeed = 0.05;
        }
        else
        {
        	this._turtleSpeed = 3;
        	this._animationSpeed = 0.15;
        }
        
        switch(this._direction){
        	case 1:
        		tex.setPosition(p.x, BG.GAME_UI.INNER_FRAME.HEIGHT);
        		x = p.x;
        		y = BG.GAME_UI.INNER_FRAME.HEIGHT;
        		this._velocity = cc.p(0, -this._turtleSpeed );
        		this._angle = 90 ;
        		break;
        	case 2:
        		tex.setPosition(p.x, BG.GAME_UI.OUTTER_FRAME.HEIGHT);
        		x = p.x;
        		y = BG.GAME_UI.OUTTER_FRAME.HEIGHT;
        		this._velocity = cc.p(0, this._turtleSpeed );
        		this._angle = -90;
        		break;
        	case 3:
        		tex.setPosition(BG.GAME_UI.OUTTER_FRAME.WIDTH, p.y);
        		x = BG.GAME_UI.OUTTER_FRAME.WIDTH;
        		y = p.y;
        		this._velocity = cc.p(this._turtleSpeed , 0);
        		break;
        	case 4: 
        		tex.setPosition(BG.GAME_UI.INNER_FRAME.WIDTH, p.y);
        		x = BG.GAME_UI.INNER_FRAME.WIDTH;
        		y = p.y;
        		this._velocity = cc.p(-this._turtleSpeed , 0);
        		this._angle = 180;
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

        bodyDef.angle = 0;
        bodyDef.userData = tex;
        bodyDef.linearDamping = 0;
        bodyDef.angularDamping = 0;
        var body = world.CreateBody(bodyDef);

        // Define another box shape for our dynamic body.
        var dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(tex.getTextureRect().width / (PTM_RATIO*2), tex.getTextureRect().height / (PTM_RATIO*2));

        // Define the dynamic body fixture.
        var fixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;
        fixtureDef.density = 0;
        fixtureDef.restitution = 0;
        fixtureDef.isSensor = true;
        body.CreateFixture(fixtureDef);
        body.SetLinearVelocity(this._velocity);
        body.SetAngle(this._angle*(Math.PI/180));	
        
        this._body = body;
    },

    destroy: function (layer) {
    	this._curLayer.turtleCount--;
    	if(this._curLayer.turtleCount <= 0 ){
    		cc.AudioEngine.getInstance().stopEffect(this._curLayer._turtleSoundId);
    		this._curLayer.setTurtleSound(false);
    	}
    	layer.removeChild(this);
    	layer.destroyList.push(this._body);
    },
	update: function () {
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