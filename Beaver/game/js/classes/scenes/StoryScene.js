classes.scenes.StoryScene = cc.Scene.extend({
	name: null,
	onEnter: function() {
		this.name = "story";
		this._super();
		var layer = new classes.layers.StoryLayer();
		layer.init();
		this.addChild(layer);
	}
});

classes.scenes.StoryScene.getInstance = function() {
    if (!this._shared) {
        this._shared = new classes.scenes.StoryScene();
        return this._shared;        
    } else {
        return this._shared;
    }
    return null;
};
classes.scenes.StoryScene._shared = null;