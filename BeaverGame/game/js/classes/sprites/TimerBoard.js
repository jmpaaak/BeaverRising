classes.sprites.TimerBoard = cc.Sprite.extend({
	_limitedTime: 0,
	_timeLabel: null,
	_curTime: 0,
	_curLayer: null,
	_timeOver : false,
	_runningTime : 300,
	
	ctor: function (layer) {
		var size = cc.Director.getInstance().getWinSize();
        this._super();
        this._curLayer = layer;
        this.initWithFile(s_TimerBoard);
       	this.setPosition(cc.p(size.width/2, size.height - (BG.GAME_UI.OUTTER_FRAME.HEIGHT / 2) -10 ) ); //TODO: -40
       	this._limitedTime = this._runningTime;
   		this._addTimeLabel();
        layer.addChild(this, 60);
        
        this.schedule(this._tick, 1/60);

    },
    _addTimeLabel: function () {
    	this._timeLabel = cc.LabelBMFont.create("" + this._limitedTime, s_Konqa32);
        this._timeLabel.setPosition(this.getTextureRect().width / 2 , this.getTextureRect().height / 2);
        this.addChild(this._timeLabel, 60);
    },
    _tick: function (dt) {
    	if(this._curLayer.getIsStart() && !this._timeOver)
    	{
	    	this._limitedTime -= dt;
	        var string = this._limitedTime.toFixed(0);
	        this._curTime = parseInt(string);
	        this._timeLabel.setString(string);
	
	        // var label2 = this.getChildByTag(TAG_LABEL_SPRITE12);
	        // var string2 = parseInt(this.time, 10).toString();
	        // label2.setString(string2);
	    }
	    else this._curTime = this._limitedTime;
    },
    getTime: function () {
    	return this._curTime;
    },
    getTotalTime: function(){
    	return this._runningTime;
    },
    timeOver: function (bool){
    	this._timeOver = bool;
    },
    setColor: function () {
        this._timeLabel.setColor(cc.c3(255,0,0));
    }
});