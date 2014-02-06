classes.scenes.SplashScreenScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new classes.layers.SplashScreenLayer();
		layer.init();
		this.addChild(layer);
	}
});

classes.scenes.SplashScreenScene.getInstance = function() {
    if (!this._shared) {
        this._shared = new classes.scenes.SplashScreenScene();
        return this._shared;        
    } else {
        return this._shared;
    }
    return null;
};
classes.scenes.SplashScreenScene._shared = null;