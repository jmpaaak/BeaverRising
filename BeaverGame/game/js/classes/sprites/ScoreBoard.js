classes.sprites.ScoreBoard = cc.Sprite.extend({
	_labelScore: null,
	_totalScore: null,
	_curLayer: null,
	ctor: function (layer, p) {
        this._super();
        this._curLayer = layer;
        this.initWithFile(s_BaseCamp1);
        this.setPosition(p.x+300, p.y-100);
        this.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        layer.addChild(this, 1); //z: 0
        
        this.init();
    },
    init : function () {
    	size = cc.Director.getInstance().getWinSize();
    	this._labelScore = cc.LabelTTF.create("Score :" + this._getScore(), "Helvetica", 20);
        this._labelScore.setColor(cc.c3(255,0,0));//black color
        this._labelScore.setPosition(this.getTextureRect().width/2, this.getTextureRect().height/2);
        this.addChild(this._labelScore, 1);
    },
    _changeScore : function(){
    	console.log("change proc!");
    	this._labelScore.setString("hello" + this._getScore()); 	
    },
	_getScore : function(){
			return this._totalScore;
	},
	
	addScore : function(num){
			this._totalScore+=num;
			this._changeScore();
			console.log("total is "+this._totalScore);
	},
	
	subScore : function(num){
			this._totalScore-=num;
	}
	
});
