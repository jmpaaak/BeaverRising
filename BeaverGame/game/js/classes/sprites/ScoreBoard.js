classes.sprites.ScoreBoard = cc.Sprite.extend({
	_baseCamp: null,
	_baseCampPos: null,
	_spriteWidth_half: null,
	_spriteWHeight_half: null,
	
	_bar: null,
	_barSprite: null,
	_percentage: 0,
	ctor: function (layer,home,id) {
        this._super();
        this._baseCamp = home;
		this._baseCampPos = home.getPosition();
		var Pos = this._baseCampPos;
        this.initWithFile(s_ScoreBoard);
        
        this._spriteWidth_half = this.getTextureRect().width / 2;
        this._spriteHeight_half = this.getTextureRect().height / 2;
        
        switch(id)
        {
        	case BG.BASECAMP.HOME1 : 
        		// get posX from basecamp position -> add (sprite.width / 2) because posX is center point of basecamp sprite.
        		// + BG.GAME_UI.OUTTER_FRAME.HEIGHT is to raise the scoreboard upto game frame.				 
       			this.setPosition( Pos.x + this._spriteWidth_half, Pos.y - this._spriteHeight_half + BG.GAME_UI.OUTTER_FRAME.HEIGHT);
				//create player recognition board sprite
				var player1Recog = cc.Sprite.create(s_player1Recog);
				player1Recog.setPosition(this._spriteWidth_half * 2 + player1Recog.getTextureRect().width / 2 , this._spriteHeight_half);		
				this.addChild(player1Recog);
				//finish creating player recogBoard
        		break;
        	case BG.BASECAMP.HOME2 :
       			this.setPosition( Pos.x - this._spriteWidth_half, Pos.y - this._spriteHeight_half + BG.GAME_UI.OUTTER_FRAME.HEIGHT);
				var player2Recog = cc.Sprite.create(s_player2Recog);
				player2Recog.setPosition(-player2Recog.getTextureRect().width / 2, +player2Recog.getTextureRect().height / 2);		
				this.addChild(player2Recog);
        		break;
        	case BG.BASECAMP.HOME3 :
       			this.setPosition( Pos.x + this._spriteWidth_half, Pos.y + this._spriteHeight_half - BG.GAME_UI.OUTTER_FRAME.HEIGHT);
				var player3Recog = cc.Sprite.create(s_player3Recog);
				player3Recog.setPosition(this._spriteWidth_half * 2 + player3Recog.getTextureRect().width / 2 , this._spriteHeight_half);		
				this.addChild(player3Recog);
        		break;
        	case BG.BASECAMP.HOME4 :
        		this.setPosition( Pos.x - this._spriteWidth_half, Pos.y + this._spriteHeight_half - BG.GAME_UI.OUTTER_FRAME.HEIGHT);
				var player4Recog = cc.Sprite.create(s_player4Recog);
				player4Recog.setPosition(-player4Recog.getTextureRect().width / 2, +player4Recog.getTextureRect().height / 2);		
				this.addChild(player4Recog);
       			
        		break;
        }
        layer.addChild(this, 60); //z: 0
   		this.init();
    },

    init : function () {
    	this._labelScore = cc.LabelBMFont.create("Beaver Rising", s_Konqa32);
        this._labelScore.setPosition(this._spriteWidth_half, this._spriteHeight_half);
        this._barSprite = new cc.Sprite.create(s_Bar[0]);
        this._bar = cc.ProgressTimer.create(this._barSprite);
        this._bar.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        this._bar.setMidpoint(cc.p(0,1));
        this._bar.setBarChangeRate(cc.p(1,0));
        this._bar.setPosition(this._spriteWidth_half, this._spriteHeight_half);
        this._bar.addChild(this._labelScore, 300);
        this.addChild(this._bar, 2);
    },
	realAdd: function (num) {
		var scaleAction = cc.ScaleTo.create(0.1, 1.5);
		var reScale = cc.ScaleTo.create(0.1, 1);
		this._percentage += num;
		if(this._percentage >= 100)
		{
			this._percentage = this._percentage - 100;
			this._baseCamp.levelUp();
			var lev = this._baseCamp.getLevel();
			if(lev === 5) return; //TODO: game END
			var newBar = cc.Sprite.create(s_Bar[lev]);
			this._bar.setSprite(newBar);
		}
		this._bar.setPercentage(this._percentage);
    	this._labelScore.setString("COMPLETE " + this._percentage+"%");
    	this._labelScore.runAction(cc.Sequence.create(
    		scaleAction,
    		reScale
    	));
	},
	setColor: function () {		
		this._labelScore.setColor(cc.c3(0,0,0));
	}
	
});
