classes.scenes.SplashScreenScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new classes.layers.SplashScreenLayer();
		layer.init();
		this.addChild(layer);
	}
});
