classes.scenes.DuelGameResultScene = cc.Scene.extend({
	name:null,
	_houses: null,
	ctor: function (houses) {
		this.name = "duelgameresult";
		this._super();
		this._houses = houses;
	},
	onEnter: function () {
		this._super();
		var resultLayer = new classes.layers.DuelGameResultLayer(this._houses);
		resultLayer.init();
		this.addChild(resultLayer, 0);
	}
});