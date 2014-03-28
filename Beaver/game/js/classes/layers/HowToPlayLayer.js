classes.layers.HowToPlayLayer = cc.Layer.extend({
	_curLayer: null,
	_pageNow: 0,
	_curPage: null,
	ctor: function (layer) {
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this.setKeyboardEnabled(true);
		
		this._curLayer = layer;
		this._curPage = cc.Sprite.create(s_howToPlay[0]);
		var mask = cc.Sprite.create(s_Mask);
		mask.setPosition(size.width / 2, size.height /2);
		this.addChild(mask, 0);
		this.addChild(this._curPage, 1);
		this._curPage.setPosition(size.width / 2, size.height /2);
		
	},
	pageChange: function(){
		
		if(this._pageNow > 11) this._pageNow = 0;
		else if (this._pageNow < 0) this._pageNow = 11;
		
		this._curPage.initWithFile(s_howToPlay[this._pageNow]);
	},
	onKeyUp: function() {
	},
	onKeyDown: function(e) {
		switch(e)
		{
			case BG.EVENT.PLAYER1.LEFT[0]:
			case BG.EVENT.PLAYER1.LEFT[1]:
				this._pageNow--;
				this.pageChange();
				break;
				
			case BG.EVENT.PLAYER1.RIGHT[0]:
			case BG.EVENT.PLAYER1.RIGHT[1]:
				this._pageNow++;
				this.pageChange();
				break;
				
			case BG.EVENT.PLAYER1.ITEM[0]:
			case BG.EVENT.PLAYER1.ITEM[1]:
				this._curLayer.removeHowToPlay();
				this.setKeyboardEnabled(false);
			break;
		}

	}
}); 