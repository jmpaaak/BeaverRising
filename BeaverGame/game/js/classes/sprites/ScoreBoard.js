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
        this._spriteWHeight_half = this.getTextureRect().height / 2;
        
        switch(id)
        {
        	case BG.BASECAMP.HOME1 : 
       			this.setPosition( Pos.x + this._spriteWidth_half, Pos.y - this._spriteWHeight_half );
        		break;
        	case BG.BASECAMP.HOME2 :
       			this.setPosition( Pos.x - this._spriteWidth_half, Pos.y - this._spriteWHeight_half );
        		break;
        	case BG.BASECAMP.HOME3 :
       			this.setPosition( Pos.x + this._spriteWidth_half, Pos.y + this._spriteWHeight_half );
        		break;
        	case BG.BASECAMP.HOME4 :
       			this.setPosition( Pos.x - this._spriteWidth_half, Pos.y + this._spriteWHeight_half );
        		break;
        }
        layer.addChild(this, 2); //z: 0
   		this.init();
    },
    init : function () {
    	this._labelScore = cc.LabelBMFont.create("Score :" + this._totalScore, s_Konqa32);
        this._labelScore.setPosition(this._spriteWidth_half , this._spriteWHeight_half);
        this.addChild(this._labelScore,2);
        //this._labelScore.setColor(cc.c3(255,0,0));
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
