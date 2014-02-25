classes.SoundBox = cc.Class.extend({
	_sounds: null,
	
	preload: function(argo) {
		this._sounds = new Object();
		for (var prop in argo) {
			var src = soundPath + argo[prop];
			this._sounds[prop] = new Audio(src);
			this._sounds[prop].preload = "none";
			//this._sounds[prop].load();
			alert(prop+" is loaded!");
		}
	},
	
	/**
	 * Play sound 
 	 * @param {String} prop The sound obj's property
 	 * @param {Boolean} bool The looping state
	 */ 
	play: function (prop, bool) {
		bool = bool || false;
		this._sounds[prop].play();
		this._sounds[prop].loop = bool;
	},
	
	/**
	 * Pause sound 
 	 * @param {String} prop The sound obj's property
	 */
	pause: function (prop) {
		//this._sounds[prop].pause(); //ERROR IN TV EMULATOR
		this._sounds[prop].currentTime = 0;
	},
	
	end: function () {
		for(var prop in this._sounds)
		{
			if(!this._sounds[prop].paused)
				this._sounds[prop].pause();
				
			this._sounds[prop].currentTime = 0;
		}
	}
});

classes.SoundBox.getInstance = function() {
    if (!this._shared) {
        this._shared = new classes.SoundBox();
        return this._shared;        
    } else {
        return this._shared;
    }
    return null;
};
classes.SoundBox._shared= null;