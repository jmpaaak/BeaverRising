classes.scenes.MainMenuScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new classes.layers.MainMenuLayer();
		layer.init();
		this.addChild(layer);
	}
});

classes.scenes.MainMenuScene.getInstance = function() {
    if (!this._shared) {
        this._shared = new classes.scenes.MainMenuScene();
        return this._shared;        
    } else {
        return this._shared;
    }
    return null;
};
classes.scenes.MainMenuScene._shared = null;