classes.GameController = cc.Class.extend({
	_curScene: null,
	_scenes: [],
    _gameState: BG.GAME_STATE.SPLASH_SCREEN,
    _selectPlayMode: 0, //0: null
    setCurScene: function(s) {
        if (this._curScene != s) {
            if (this._curScene !== null) {
                this._curScene.onExit();
            }
            this._curScene = s;
            if (this._curScene) {
                cc.Director.getInstance().replaceScene(s);
            }
        }
    },
    getCurScene: function() {
        return this._curScene;
    },
    pause:function() {
    },
});

classes.GameController.getInstance = function() {
    if (!this._shared) {
        this._shared = new classes.GameController();
        return this._shared;        
    } else {
        return this._shared;
    }
    return null;
};
classes.GameController._shared= null;