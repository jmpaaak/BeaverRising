classes.scenes.DuelGameScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var readyLayer = new classes.layers.ReadyLayer();
		var gameLayer = new classes.layers.DuelGameLayer();
		readyLayer.init();
		gameLayer.init();
		this.addChild(readyLayer, 1);
		this.addChild(gameLayer, 0);
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
