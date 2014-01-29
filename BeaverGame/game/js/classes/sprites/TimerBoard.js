classes.sprites.TimerBoard = cc.Sprite.extend({
	_limitedTime: 0,
	_timeLabel: null,

	ctor: function (layer) {
		var size = cc.Director.getInstance().getWinSize();
        this._super();
        this.initWithFile(s_TimerBoard);
       	this.setPosition(cc.p(size.width/2, size.height-50));
       	this._limitedTime = 100;
   		this._addTimeLabel();
        layer.addChild(this, 2);
        
        this.schedule(this._tick, 1/30);

    },
    _addTimeLabel: function () {
    	this._timeLabel = cc.LabelBMFont.create("" + this._limitedTime, s_Konqa32);
        this._timeLabel.setPosition(this.getTextureRect().width / 2 , this.getTextureRect().height / 2);
        this._timeLabel.setColor(cc.c3(0,0,0));
        this.addChild(this._timeLabel, 2);
    },
    _tick: function (dt) {
    	this._limitedTime -= dt;
        var string = this._limitedTime.toFixed(0);
        this._timeLabel.setString(string);

        // var label2 = this.getChildByTag(TAG_LABEL_SPRITE12);
        // var string2 = parseInt(this.time, 10).toString();
        // label2.setString(string2);
    }
});