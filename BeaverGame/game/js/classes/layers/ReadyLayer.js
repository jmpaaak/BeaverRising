classes.layers.ReadyLayer = cc.Layer.extend({
	_bgReady : null,
	_bgStart : null,
	init : function() {
		var that = this;
		var size = cc.Director.getInstance().getWinSize();
		this._super();
		this.setPosition(cc.p(0, 0));

		this._bgReady = cc.Sprite.create(s_bgReady);
		this._bgReady.setPosition(size.width / 2, size.height / 2);
		this._bgStart = cc.Sprite.create(s_bgStart);
		this._bgStart.setPosition(size.width / 2, size.height / 2);

		this.addChild(this._bgReady, 1);

		this._bgReady.runAction(cc.Sequence.create(
			cc.FadeOut.create(2.0), 
			cc.CallFunc.create(function() {
				this.removeChild(this._bgReady);
				this.addChild(this._bgStart, 1);
				this._bgStart.runAction(cc.Sequence.create(
					cc.Blink.create(1.5, 5),
					cc.CallFunc.create(function() {
						var parent = that.getParent();
						parent.removeChild(that);
						var gameLayer = parent.getChildren();
						gameLayer[0].start();
					})
				));
		}, this)));
		
		return true;
	},
	update : function(dt) {
	},
	onKeyUp : function() {
	},
	onKeyDown : function(e) {
	}
}); 