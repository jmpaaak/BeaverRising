BG = {};
//game state
BG.GAME_STATE = {
	SPLASH_SCREEN: 1,
	INTRO: 2,
	HOME_MENU: {
		MAIN: 3,
		OPTION: 4,
		HELP: 5,
		CREDIT:6
	},
	PLAY: {
		SINGLE: 7,
		DUEL: 8
	},
	OVER: 9
};

//keys
BG.KEYS = [];

//limited time
BG.TIME = 180;

//score
BG.SCORE = 0;

//sound
BG.SOUND = true;

//game UI size
BG.GAME_UI = {
	OUTTER_FRAME: {
		WIDTH : 30,
		HEIGHT : 70
	},
	INNER_FRAME : {
		WIDTH : 1860,
		HEIGHT : 940
	}
};

//item types
BG.ITEM_TYPE = {
    BULLET:1,
    SHIELD:2,
    LIGHTNING:3,
    DEVIL:4
    //TODO
};

BG.OBSTACLE = {
	TURTLE:1
};

BG.BEAVER_SPEED ={
	SLOW : 5,
	NORMAL :9,
	FAST : 10,
	SUPERFAST : 30
};

//branch types
BG.WOOD_TYPE = {
    SMALL:1,
    MEDIUM:2,
    BIG:3
};



BG.CATEGORY = {
	PLAYER1:1,
	PLAYER2:2,
	PLAYER3:3,
	PLAYER4:4
};
//Beaver's home (basecamp)
BG.BASECAMP = {
    HOME1:1,
    HOME2:2,
    HOME3:3,
    HOME4:4
};
//play state
BG.PLAY_STATE = {
    NORMAL:1,
    SUDDEN:2
};

BG.TARGET_BRANCHES = [1, 2, 4, 7]; //TODO

//gain score per branches //TODO
BG.SCORE_PER_BRANCHES = [0, 0, 0, 0];

//container
BG.CONTAINER = {
    BEAVERS:[],
    BRANCHES:[],
    ITEMS:[],
    OBSTACLES:[]
};

BG.EVENT = {
	PLAYER1: {
		RIGHT:[39,1001],
		LEFT:[37,1002],
		ITEM:[38,1003],
	},
	PLAYER2: {
		RIGHT:[87,1011],
		LEFT:[81,1012],
		ITEM:[69,1013]
	},
	PLAYER3: {
		RIGHT:[66,1021],
		LEFT:[86,1022],
		ITEM:[78,1023]
	},
	PLAYER4: {
		RIGHT:[79,1031],
		LEFT:[73,1032],
		ITEM:[80,1033]
	}
};
