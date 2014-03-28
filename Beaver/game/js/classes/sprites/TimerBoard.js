classes.sprites.TimerBoard = cc.Sprite.extend({
	_limitedTime: 0,
	_timeLabel: null,
	_curTime: 999, //init
	_curLayer: null,
	_totalTime: 0,
	_isStop: false,

	ctor: function (layer) {
		var size = cc.Director.getInstance().getWinSize();
        this._super();
        this._curLayer = layer;
        this.initWithFile(s_TimerBoard);
       	this.setPosition(cc.p(size.width/2, size.height - (BG.GAME_UI.OUTTER_FRAME.HEIGHT / 2)-5));
       	this._limitedTime = 300;
		this._totalTime = 300;
   		this._addTimeLabel();
        layer.addChild(this, 60);
        
        this.schedule(this._tick, 0.5);

    },
    _addTimeLabel: function () {
    	this._timeLabel = cc.LabelBMFont.create(""+ this._limitedTime, s_Konqa32);
        this._timeLabel.setPosition(this.getTextureRect().width / 2 , this.getTextureRect().height / 2);
        this.addChild(this._timeLabel, 60);
    },
    _tick: function (dt) {    	
		if (this._curTime === 0)
			return;
		if (this._curLayer.getIsStart() && !this._isStop) 
		{
			this._limitedTime -= dt;
			var string = this._limitedTime.toFixed(0);
			this._curTime = parseInt(string);
			this._timeLabel.setString(string);
			// var label2 = this.getChildByTag(TAG_LABEL_SPRITE12);
			// var string2 = parseInt(this.time, 10).toString();
			// label2.setString(string2);
		} else
			this._curTime = this._limitedTime;
    },
    getTime: function () {
    	return this._curTime;
    },
    getTotalTime: function(){
    	return this._totalTime;
    },
    setColor: function () {
        this._timeLabel.setColor(cc.c3(255,0,0));
    }
});