//SplashScreen
var s_SplashScreen1 = "images/BeaverGame_splashscreen.png";
var s_SplashScreen2 = "images/DigitalMedia_splashscreen.png";

//MainMenu
var s_bgMainMenu = "images/mainmenu/bgMainMenu.png";
var s_Title1 = "images/mainmenu/Title1.png";
var s_Button_SinglePlay_Normal = "images/mainmenu/Button_SinglePlay_Normal.png";
var s_Button_MultiPlay_Normal = "images/mainmenu/Button_MultiPlay_Normal.png";
var s_Button_HowToPlay_Normal = "images/mainmenu/Button_HowToPlay_Normal.png";
var s_Button_Credit_Normal = "images/mainmenu/Button_Credit_Normal.png";
var s_Button_Option_Normal = "images/mainmenu/Button_Option_Normal.png";

var s_Button_SinglePlay_Selected = "images/mainmenu/Button_SinglePlay_Selected.png";
var s_Button_MultiPlay_Selected = "images/mainmenu/Button_MultiPlay_Selected.png";
var s_Button_HowToPlay_Selected = "images/mainmenu/Button_HowToPlay_Selected.png";
var s_Button_Credit_Selected = "images/mainmenu/Button_Credit_Selected.png";
var s_Button_Option_Selected = "images/mainmenu/Button_Option_Selected.png";

//GameLayer
var s_Mask = "images/Mask.png"
var s_bgDuelGameLayer = "images/bgDuelGameLayer.png";
var s_bgReady = "images/bgReady.png";
var s_bgStart = "images/bgStart.png";

// var s_beaver1 = "images/Beaver/beaver_normal.png";
var p_beaver1 = "images/Beaver/beaver_normal.plist";
var p_beaverDevil = "images/Beaver/beaver_devil.plist";
var p_Twig_Normal = "images/Twig_Normal.plist";
var p_Twig_Weak = "images/Twig_Weak.plist"
var p_Twig_Normal_Broken = "images/Twig_Thorn_Broken.plist";
var p_Twig_Week_Broken = "images/Twig_Week_Broken.plist";
var p_fishMotion = "images/fishMotion.plist";
var p_waterBomb = "images/waterBomb.plist";

var s_gameFrame = "images/gameFrame.png";

var s_player1Recog = "images/game_frame/playerRecog1.png";
var s_player2Recog = "images/game_frame/playerRecog2.png";
var s_player3Recog = "images/game_frame/playerRecog3.png";
var s_player4Recog = "images/game_frame/playerRecog4.png";

var s_Twig_Weak = "images/Twig_Weak.png";
var s_Twig_Thorn = "images/Twig_Thorn.png";
var s_Twig_Normal_Shield = "images/Twig_Normal_Shield.png";
var s_Twig_Thorn_Shield = "images/Twig_Thorn_Shield.png";
var s_ScoreBoard = "images/ScoreBoard.png";

var s_BaseCamp = [];
s_BaseCamp[0] = "images/BaseCamp1.png";
s_BaseCamp[1] = "images/BaseCamp2.png";
s_BaseCamp[2] = "images/BaseCamp3.png";
s_BaseCamp[3] = "images/BaseCamp4.png";
s_BaseCamp[4] = "images/BaseCamp5.png";
s_BaseCamp[5] = "images/BaseCamp6.png";
//var s_BaseCamp1 = "images/BaseCamp1.png";
//var s_BaseCamp1 = "images/BaseCamp1.png";

var s_Item_Bullet = "images/Item_Bullet.png";
var s_Item_Shield = "images/Item_Shield.png";
var s_Shield = "images/Shield.png";
var s_Item_Lightning = "images/Item_Lightning.png";
var s_Item_Devil = "images/Item_Devil.png";
var s_LightningPrepare = "images/Lightning_Prepare.png";
var s_Bar = "images/Bar.png";
var s_TimerBoard = "images/TimerBoard.png";

//GameBackground
var bg_Water01 = "images/BG_water/sea001.png";
var bg_Water02 = "images/BG_water/sea002.png";
var bg_Water03 = "images/BG_water/sea003.png";
var bg_Water04 = "images/BG_water/sea004.png";
var bg_Water05 = "images/BG_water/sea005.png";
var bg_Water06 = "images/BG_water/sea006.png";
var bg_Water07 = "images/BG_water/sea007.png";
var bg_Water08 = "images/BG_water/sea008.png";
var bg_Water09 = "images/BG_water/sea009.png";
var bg_Water10 = "images/BG_water/sea010.png";
var bg_Water11 = "images/BG_water/sea011.png";
var bg_Water12 = "images/BG_water/sea012.png";
var bg_Water13 = "images/BG_water/sea013.png";
var bg_Water14 = "images/BG_water/sea014.png";
var bg_Water15 = "images/BG_water/sea015.png";

//obstacle
var p_turtle = "images/Obstacles/turtle.plist";

//Font
var s_Konqa32 = "fonts/konqa32.fnt";
var s_TempMenu = "images/temp.png";//TODO:REMOVE

//var s_BaseCamp2 = "BaseCamp2.png";
//var s_BaseCamp3 = "BaseCamp3.png";
//var s_BaseCamp4 = "BaseCamp4.png";


var g_resources_splash = [
	{src:s_SplashScreen1},
	{src:s_SplashScreen2}
];

var g_resources_game = [
    {src:s_bgMainMenu},
	{src:s_Title1},
	{src:s_Button_SinglePlay_Normal},
	{src:s_Button_MultiPlay_Normal},
	{src:s_Button_HowToPlay_Normal},
	{src:s_Button_Credit_Normal},
	{src:s_Button_Option_Normal},
	{src:s_TempMenu},//TODO:REMOVE
    //image
	{src:s_bgReady},
	{src:s_bgStart},
	{src:s_bgDuelGameLayer},
	{src:s_Mask},
	
	{src:s_gameFrame},
	{src:s_player1Recog},
	{src:s_player2Recog},
	{src:s_player3Recog},
	{src:s_player4Recog},

	{src:s_Item_Bullet},
	{src:s_Item_Shield},
	{src:s_Shield},
	{src:s_Item_Lightning},
	{src:s_LightningPrepare},

	{src:s_ScoreBoard},
	{src:s_TimerBoard},

	{src:s_BaseCamp[0]},
	{src:s_BaseCamp[1]},
	{src:s_BaseCamp[2]},
	{src:s_BaseCamp[3]},
	{src:s_BaseCamp[4]},
	{src:s_BaseCamp[5]},

    //background Img
	{src:bg_Water01},
	{src:bg_Water02},
	{src:bg_Water03},
	{src:bg_Water04},
	{src:bg_Water05},
	{src:bg_Water06},
	{src:bg_Water07},
	{src:bg_Water08},
	{src:bg_Water09},
	{src:bg_Water10},
	{src:bg_Water11},
	{src:bg_Water12},
	{src:bg_Water13},
	{src:bg_Water14},
	{src:bg_Water15},
	{src:s_Item_Devil},
	{src:s_Bar},
	//obstacle
	{src:p_turtle},
	
    //plist
    {src:p_beaver1},
    {src:p_beaverDevil},
    {src:p_Twig_Normal_Broken},
    {src:p_Twig_Week_Broken},
	{src:p_waterBomb},
	{src:p_fishMotion},
	{src:p_Twig_Normal},
	{src:p_Twig_Weak},

    //fnt
	{src:s_Konqa32}
	
    //tmx

    //bgm

    //effect
];