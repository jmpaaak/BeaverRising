classes.layers.CreditsLayer = cc.Layer.extend({
	_curLayer: null,

	ctor: function (layer) {
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this._curLayer = layer;
		this.setKeyboardEnabled(true);
		var board = cc.Sprite.create(s_creditsBoard);
		board.setPosition(size.width / 2, size.height /2);
		this.addChild(board);
		this.init();
	},
	init: function() {
		var size = cc.Director.getInstance().getWinSize();
		var credits = cc.Sprite.create(s_credits);
		credits.setPosition(size.width / 2, 0);
		this.addChild(credits,5);
		
		var actionTo = cc.MoveTo.create(2, cc.p(size.width / 2 , size.height));
		credits.runAction(actionTo);
		
		
	},
	onKeyUp: function() {
	},
	onKeyDown: function(e) {
		switch(e)
		{
			case BG.EVENT.PLAYER1.ITEM[0]:
			case BG.EVENT.PLAYER1.ITEM[1]:
				this._curLayer.removeCredit();
			break;
		}

	}
}); 