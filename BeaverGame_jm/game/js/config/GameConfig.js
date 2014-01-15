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

//item types
BG.ITEM_TYPE = {
    SPEED:1,
    SHIELD:2,
    //TODO
};

BG.OBSTACLE_TYPE = {
	//TODO
};

//branch types
BG.TWIG_TYPE = {
    NORMAL:1,
    STRONG:2
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