/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.AppController.shareAppController().didFinishLaunchingWithOptions();
    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();

        var searchPaths = [];
        var resDirOrders = [];

        searchPaths.push("game/resources");
        cc.FileUtils.getInstance().setSearchPaths(searchPaths);

        // var platform = cc.Application.getInstance().getTargetPlatform();
        // if (platform == cc.TARGET_PLATFORM.MOBILE_BROWSER) {
            // resDirOrders.push("HD");
        // }
        // else if (platform == cc.TARGET_PLATFORM.PC_BROWSER) {
            // if (screenSize.height >= 600) { //real height!!
                // resDirOrders.push("HD");
            // }
            // else {
                // // resourceSize = cc.size(320, 480);
                // // designSize = cc.size(320, 480);
                // resDirOrders.push("Normal");
            // }
        // }
        // cc.FileUtils.getInstance().setSearchResolutionsOrder(resDirOrders);



		// var resourceSize = cc.size(1920, 1080);
		// var designSize = cc.size(960, 540);
<<<<<<< HEAD
		// director.setContentScaleFactor(resourceSize.width / designSize.width);
=======
		// director.setContentScaleFactor(resourceSize.width / designSize.width);	
>>>>>>> d6d43478809ed6fe6d1ed1f0fbaed0b00512e4a0
		//cc.EGLView.getInstance().setDesignResolutionSize(designSize.width, designSize.height, cc.RESOLUTION_POLICY.SHOW_ALL); 

        cc.EGLView.getInstance().setDesignResolutionSize(1920, 1080, cc.RESOLUTION_POLICY.SHOW_ALL);
        cc.EGLView.getInstance().resizeWithBrowserSize(true);

        
        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        
        director.setAnimationInterval(1.0 / this.config['frameRate']);
        
        //load only Menu, Splash sreen resources
        cc.Loader.preload(g_resources_splash, function () {
            director.runWithScene(this.startScene()); //director.replaceScene(this.startScene());
        }, this);

        return true;
    }
});

var myApp = new cocos2dApp(classes.scenes.SplashScreenScene.getInstance);  //classes.scenes.DuelGameScene.getInstance
