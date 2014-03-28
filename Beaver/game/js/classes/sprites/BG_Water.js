classes.sprites.BG_Water = cc.Sprite.extend({
	_curLayer: null,
    _bgAction: null,
    _bgSprite: null,
    
	ctor: function(layer){
		this._super();
		this._curLayer = layer;
		this.init();
	},
	
	init: function(){
		var size = cc.Director.getInstance().getWinSize();
		var BG_texture = [];
		
		BG_texture[0] = cc.TextureCache.getInstance().addImage(bg_Water01);
		BG_texture[1] = cc.TextureCache.getInstance().addImage(bg_Water02);
		BG_texture[2] = cc.TextureCache.getInstance().addImage(bg_Water03);
		
		var frame = [];
		for(var i =0; i < 3; i++)
		{
			frame[i] = cc.SpriteFrame.createWithTexture(BG_texture[i],cc.rect(0,0,960,540));
		}

		this._bgSprite = cc.Sprite.createWithSpriteFrame(frame[0]);
        this._bgSprite.setPosition(cc.p(size.width / 2 , size.height / 2));
        this._curLayer.addChild(this._bgSprite);

        var animFrames = [];
        for(var i = 0; i < 3 ; i++){
	        animFrames.push(frame[i]);    	
        }
        
        var animation = cc.Animation.create(animFrames, 0.5);
        var animate = cc.Animate.create(animation);
        
		this._bgAction = cc.RepeatForever.create(animate);
		
       // this._bgSprite.runAction(this._bgAction);
		

	}

});