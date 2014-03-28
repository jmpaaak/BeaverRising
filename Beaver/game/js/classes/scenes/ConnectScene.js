classes.scenes.ConnectScene = cc.Scene.extend({
	name:null,
	onEnter: function() {
		this.name = "connect";
		this._super();
		var layer = new classes.layers.ConnectLayer();
		layer.init();
		this.addChild(layer);
	}
});

classes.scenes.ConnectScene.getInstance = function() {
    if (!this._shared) {
        this._shared = new classes.scenes.ConnectScene();
        return this._shared;
    } else {
        return this._shared;
    }
    return null;
};
classes.scenes.ConnectScene._shared = null;