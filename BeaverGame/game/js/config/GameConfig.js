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
	INNER_WINDOW : {
		WIDTH : 1860,
		HEIGHT : 940
	}
	
	
};

//item types
BG.ITEM_TYPE = {
    BULLET:1,
    SHIELD:2,
    LIGHTNING:3,
    //TODO
};

BG.OBSTACLE_TYPE = {
	//TODO
};

BG.BEAVER_SPEED ={
	SLOW : 0.5,
	NORMAL :6.7,
	FAST : 10,
	SUPERFAST : 40
};

//branch types
BG.TWIG_TYPE = {
    NORMAL:1,
    WEEK:2
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