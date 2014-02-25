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
		BG_texture[3] = cc.TextureCache.getInstance().addImage(bg_Water04);
		BG_texture[4] = cc.TextureCache.getInstance().addImage(bg_Water05);
		BG_texture[5] = cc.TextureCache.getInstance().addImage(bg_Water06);
		BG_texture[6] = cc.TextureCache.getInstance().addImage(bg_Water07);
		BG_texture[7] = cc.TextureCache.getInstance().addImage(bg_Water08);
		BG_texture[8] = cc.TextureCache.getInstance().addImage(bg_Water09);
		BG_texture[9] = cc.TextureCache.getInstance().addImage(bg_Water10);
		BG_texture[10] = cc.TextureCache.getInstance().addImage(bg_Water11);
		BG_texture[11] = cc.TextureCache.getInstance().addImage(bg_Water12);
		BG_texture[12] = cc.TextureCache.getInstance().addImage(bg_Water13);
		BG_texture[13] = cc.TextureCache.getInstance().addImage(bg_Water14);
		BG_texture[14] = cc.TextureCache.getInstance().addImage(bg_Water15);
		
		var frame = [];
		for(var i =0; i < 15; i++)
		{
			frame[i] = cc.SpriteFrame.createWithTexture(BG_texture[i],cc.rect(0,0,size.width,size.height));
		}

		this._bgSprite = cc.Sprite.createWithSpriteFrame(frame[0]);
        this._bgSprite.setPosition(cc.p(size.width / 2 , size.height / 2));
        this._curLayer.addChild(this._bgSprite);

        var animFrames = [];
        for(var i = 0; i < 15 ; i++){
	        animFrames.push(frame[i]);    	
        }
        
        var animation = cc.Animation.create(animFrames, 0.5);
        var animate = cc.Animate.create(animation);
        
		this._bgAction = cc.RepeatForever.create(animate);
		
        this._bgSprite.runAction(this._bgAction);
		

	}

});