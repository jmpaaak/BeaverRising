classes.sprites.ScoreBoard = cc.Sprite.extend({
	_labelScore : 0,
	_totalScore : 0,
	_baseCampPos : null,
	_spriteWidth_half : null,
	_spriteWHeight_half : null,

	ctor: function (layer,Pos,id) {
        this._super();
		this._baseCampPos = Pos;
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
				var player1Recog = cc.Sprite.create(s_player1Recog);
				player1Recog.setPosition(this._spriteWidth_half * 2 + player1Recog.getTextureRect().width / 2 , this._spriteHeight_half);		
				this.addChild(player1Recog);
        		break;
        	case BG.BASECAMP.HOME3 :
       			this.setPosition( Pos.x + this._spriteWidth_half, Pos.y + this._spriteHeight_half - BG.GAME_UI.OUTTER_FRAME.HEIGHT);
				var player1Recog = cc.Sprite.create(s_player1Recog);
				player1Recog.setPosition(this._spriteWidth_half * 2 - player1Recog.getTextureRect().width / 2 , this._spriteHeight_half);		
				this.addChild(player1Recog);
        		break;
        	case BG.BASECAMP.HOME4 :
				var player1Recog = cc.Sprite.create(s_player1Recog);
				player1Recog.setPosition(this._spriteWidth_half * 2 - player1Recog.getTextureRect().width / 2 , this._spriteHeight_half);		
				this.addChild(player1Recog);
       			this.setPosition( Pos.x - this._spriteWidth_half, Pos.y + this._spriteHeight_half - BG.GAME_UI.OUTTER_FRAME.HEIGHT);
        		break;
        }
        layer.addChild(this, 60); //z: 0
   		this.init();
    },

    init : function () {
    	this._labelScore = cc.LabelBMFont.create("Score :" + this._totalScore, s_Konqa32);
        this._labelScore.setPosition(this._spriteWidth_half , this._spriteHeight_half);
        this.addChild(this._labelScore,2);
        //this._labelScore.setColor(cc.c3(255,0,0));
    },

	getScore : function(){
			return this._totalScore;
	},
	
	addScore : function (num) {
		this._totalScore+=num;
		console.log("total is "+this._totalScore);
    	this._labelScore.setString("Score :" + this._totalScore); 	
	},
	_subScore : function (num) {
			this._totalScore-=num;
	},
	setColor: function () {		
		this._labelScore.setColor(cc.c3(255,0,0));
	}
	
});
