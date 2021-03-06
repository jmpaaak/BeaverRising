classes.layers.StoryLayer = cc.LayerColor.extend({
    _story4Action: null,
    _story4Sprite: null,
    _curAction : null,
	_skipLabel: null,
	_colorSetCount: 0,
	
	init : function() {
		this._super();
		classes.SoundBox.getInstance().play("bgm_storyBGM");
		var size = cc.Director.getInstance().getWinSize();
		var controller = classes.GameController.getInstance();
		this.setKeyboardEnabled(true);
		this._skipLabel = cc.LabelBMFont.create("TOUCH 'ITEM' TO SKIP !!", s_Konqa32);
		this._skipLabel.setScale(1.0);
        this._skipLabel.setPosition(size.width*7/9, size.height*9/10); 
		this._skipLabel.setOpacity(0);
        this.addChild(this._skipLabel, 10);
		
		var story1_texture = [];
		story1_texture[0] = cc.TextureCache.getInstance().addImage(s_story101);
		story1_texture[1] = cc.TextureCache.getInstance().addImage(s_story102);
		story1_texture[2] = cc.TextureCache.getInstance().addImage(s_story103);
		story1_texture[3] = cc.TextureCache.getInstance().addImage(s_story104);
		story1_texture[4] = cc.TextureCache.getInstance().addImage(s_story105);
		story1_texture[5] = cc.TextureCache.getInstance().addImage(s_story106);
		story1_texture[6] = cc.TextureCache.getInstance().addImage(s_story107);
		story1_texture[7] = cc.TextureCache.getInstance().addImage(s_story108);

		var story2_texture = [];
		story2_texture[0] = cc.TextureCache.getInstance().addImage(s_story201);
		story2_texture[1] = cc.TextureCache.getInstance().addImage(s_story202);
		story2_texture[2] = cc.TextureCache.getInstance().addImage(s_story203);
		story2_texture[3] = cc.TextureCache.getInstance().addImage(s_story204);

		var story3_texture = [];
		story3_texture[0] = cc.TextureCache.getInstance().addImage(s_story301);
		story3_texture[1] = cc.TextureCache.getInstance().addImage(s_story302);
		story3_texture[2] = cc.TextureCache.getInstance().addImage(s_story303);
		story3_texture[3] = cc.TextureCache.getInstance().addImage(s_story304);
		story3_texture[4] = cc.TextureCache.getInstance().addImage(s_story305);
		
		var story4_texture = [];
		story4_texture[0] = cc.TextureCache.getInstance().addImage(s_story401);
		story4_texture[1] = cc.TextureCache.getInstance().addImage(s_story402);
		story4_texture[2] = cc.TextureCache.getInstance().addImage(s_story403);
		story4_texture[3] = cc.TextureCache.getInstance().addImage(s_story404);
		story4_texture[4] = cc.TextureCache.getInstance().addImage(s_story405);
		story4_texture[5] = cc.TextureCache.getInstance().addImage(s_story406);
		
		var frame = [];
        var animFrames = [];
		for(var i =0; i < 8; i++)
		{
			frame[i] = cc.SpriteFrame.createWithTexture(story1_texture[i],cc.rect(0,0,960,540));
	        animFrames.push(frame[i]);    	
		}
		this._story1Sprite = cc.Sprite.createWithSpriteFrame(frame[0]);
        this._story1Sprite.setPosition(cc.p(size.width / 2 , size.height / 2));
        this.addChild(this._story1Sprite);
        
        var animation = cc.Animation.create(animFrames, 0.3);
        var animateStory1 = cc.Animate.create(animation);

		var frame = [];
        var animFrames = [];
		for(var i =0; i < 4; i++)
		{
			frame[i] = cc.SpriteFrame.createWithTexture(story2_texture[i],cc.rect(0,0,960,540));
	        animFrames.push(frame[i]);    	
		}
        var animation = cc.Animation.create(animFrames, 0.5);
        var animateStory2 = cc.Animate.create(animation);
    	var story2FirstFrame = frame[0];

		var frame = [];
        var animFrames = [];
		for(var i =0; i < 5; i++)
		{
			frame[i] = cc.SpriteFrame.createWithTexture(story3_texture[i],cc.rect(0,0,960,540));
	        animFrames.push(frame[i]);    	
		}
        var animation = cc.Animation.create(animFrames, 2);
        var animateStory3 = cc.Animate.create(animation);
    	var story3FirstFrame = frame[0];

		var frame = [];
        var animFrames = [];
		for(var i =0; i < 6; i++)
		{
			frame[i] = cc.SpriteFrame.createWithTexture(story4_texture[i],cc.rect(0,0,960,540));
	        animFrames.push(frame[i]);    	
		}
        var animation = cc.Animation.create(animFrames, 2);
        var animateStory4 = cc.Animate.create(animation);
    	var story4FirstFrame = frame[0];
    	
		var that = this; 
        this._story1Sprite.runAction(cc.Sequence.create(
        	//story1
        	animateStory1,
        	animateStory1,
        	animateStory1,
        	animateStory1,
	       	cc.FadeOut.create(1),
	       	
	       	//story2
	       	cc.CallFunc.create(function () {
	       		that._story1Sprite.initWithSpriteFrame(story2FirstFrame);
	       	}),	       	
        	cc.FadeIn.create(1),
        	animateStory2,
        	animateStory2,
        	animateStory2,
	       	cc.FadeOut.create(1),
	       	
	       	//story3
	       	cc.CallFunc.create(function () {
	       		that._story1Sprite.initWithSpriteFrame(story3FirstFrame);
	       	}),	   
        	cc.FadeIn.create(1),
        	animateStory3,
	       	cc.FadeOut.create(1),
	       	
        	//story4
	       	cc.CallFunc.create(function () {
	       		that._story1Sprite.initWithSpriteFrame(story4FirstFrame);
	       	}),
        	cc.FadeIn.create(1),
	       	animateStory4,
	       	cc.FadeOut.create(2),
	       	//goToMainMenu
	       	cc.CallFunc.create(function () {  		
				cc.LoaderScene.preload(g_resources_game, function() {
					controller.setCurScene(classes.scenes.MainMenuScene.getInstance());
				}, this);
				return;
	       		})
        ));
   		
   		this.schedule(this._skipLabelUpdate, 0.8);

	},
	_skipLabelUpdate: function () {
		this._skipLabel.setColor(cc.c3(0,0,0));
		if(this._colorSetCount >= 2)
		{
			if(this._skipLabel.getOpacity() === 255)
			{
				this._skipLabel.setOpacity(0);
			}
			else if(this._skipLabel.getOpacity() === 0)
			{
				this._skipLabel.setOpacity(255);
			}
		}
		else
		{
			this._colorSetCount++;
		}
	},
	onKeyDown: function (e) {
		switch(e)
		{
			case BG.EVENT.PLAYER1.ITEM[0]:
			case BG.EVENT.PLAYER1.ITEM[1]:
				cc.LoaderScene.preload(g_resources_game, function() {
					classes.GameController.getInstance().setCurScene(classes.scenes.MainMenuScene.getInstance());
				}, this);
				break;
		}
	}
});