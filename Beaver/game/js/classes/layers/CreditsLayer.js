classes.layers.CreditsLayer = cc.Layer.extend({
	_curLayer: null,
	_clipper: null,

	ctor: function (layer) {
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this._curLayer = layer;
		this.setKeyboardEnabled(true);
		var board = cc.Sprite.create(s_creditsBoard);
		var mask = cc.Sprite.create(s_Mask);
		board.setPosition(size.width / 2, size.height /2);
		mask.setPosition(size.width / 2, size.height /2);
		this.addChild(mask, 0);
		this.addChild(board, 1);
		this.init();
	},
	init: function() {
		var size = cc.Director.getInstance().getWinSize();
		var width = 400, height = 400;

   		// Create clipping node
        this._clipper = cc.ClippingNode.create();
        this._clipper.setContentSize(width, height);
        this._clipper.setAnchorPoint(0.5, 0.5);
        this._clipper.setPosition(size.width / 2, size.height / 2);
        // Add to layer
        this.addChild(this._clipper, 2);

        // Draw a rectangle stencil with DrawNode
        var stencil = cc.DrawNode.create();
        var rectangle = [cc.p(0, 0), cc.p(width, 0), cc.p(width, height), cc.p(0, height)];
        // var white = cc.c4f(1, 1, 1, 1);
        stencil.drawPoly(rectangle, 0, 1, 0);
        // Set the stencil
        this._clipper.setStencil(stencil);

        // Clipping node content
        var credits = cc.Sprite.create(s_credits);
        // Add content as a child of clipping node
        this._clipper.addChild(credits);
        credits.setPosition(width / 2, -(credits.getTextureRect().height / 2));
		var actionTo = cc.MoveTo.create(50, cc.p(width / 2 , credits.getTextureRect().height));
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
				this.setKeyboardEnabled(false);
			break;
		}

	}
}); 