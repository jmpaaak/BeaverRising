classes.layers.SinglePlay = cc.Layer.extend({
	_curLayer: null,
	_comingSoonBoard: null,

	ctor: function (layer) {
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this.setKeyboardEnabled(true);
		
		this._curLayer = layer;
		this._comingSoonBoard = cc.Sprite.create(s_singlePlay);
		this.addChild(this._comingSoonBoard);
		this._comingSoonBoard.setPosition((size.width/10) * 2, (size.height/10) * 5);
		
 		var actionUp = cc.JumpBy.create(2, cc.p(0, 0), 80, 4);
 		var delay = cc.DelayTime.create(0.25);
 		this._comingSoonBoard.runAction(cc.RepeatForever.create(
            cc.Sequence.create(actionUp, delay.clone() )
        ) );
	},

	onKeyUp: function() {
	},
	onKeyDown: function(e) {
		switch(e)
		{
			case BG.EVENT.PLAYER1.ITEM[0]:
			case BG.EVENT.PLAYER1.ITEM[1]:
				this._curLayer.removeSinglePlay();
				this.setKeyboardEnabled(false);
			break;
		}

	}
}); 