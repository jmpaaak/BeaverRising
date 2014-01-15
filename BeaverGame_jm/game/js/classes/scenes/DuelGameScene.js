classes.scenes.DuelGameScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new classes.layers.DuelGameLayer();
		layer.init();
		this.addChild(layer);
	}
});

classes.scenes.DuelGameScene.getInstance = function() {
    if (!this._shared) {
        this._shared = new classes.scenes.DuelGameScene();
        return this._shared;        
    } else {
        return this._shared;
    }
    return null;
};
classes.scenes.DuelGameScene._shared = null;
