classes.sprites.ScoreBoard = cc.Sprite.extend({
	_labelScore : null,
	_totalScore : null,

	ctor: function (layer) {
        this._super();
        this.init();
        this.initWithFile(s_BaseCamp1);
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        layer.addChild(this,1); //z: 0
   
    },
    init : function(){
    	size = cc.Director.getInstance().getWinSize();
    	this._labelScore = cc.LabelTTF.create("Score :" + this._getScore(), "Helvetica", 20);
        this._labelScore.setColor(cc.c3(255,0,0));//black color
        this._labelScore.setPosition(size.width * (30 / 100) , size.height * (90 / 100) );
        this.addChild(this._labelScore,2);

    },
    _changeScore : function(){
    	this._labelScore.setString("hello" + this._getScore()); 	
    },
	_getScore : function(){
			return this._totalScore;
	},
	
	_addScore : function(num){
			this._changeScore();
			this._totalScore+=num;
			console.log("total is "+this._totalScore);
	},
	
	_subScore : function(num){
			this._totalScore-=num;
	}
	
});
