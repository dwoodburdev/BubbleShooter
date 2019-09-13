/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
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

/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
    // In this way, your resources will be force updated even if the browser holds a cache of it.
    // It's very useful for mobile browser debugging.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function(){
    var sys = cc.sys;
    if(!sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false);

    // Disable auto full screen on baidu and wechat, you might also want to eliminate sys.BROWSER_TYPE_MOBILE_QQ
    if (sys.isMobile && 
        sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
        sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
        cc.view.enableAutoFullScreen(true);
    }

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(cc.view.getFrameSize().width, cc.view.getFrameSize().height, cc.ResolutionPolicy.SHOW_ALL);
	
	// For splitting into 3 screens
	//cc.view.setDesignResolutionSize(cc.view.getFrameSize().height*(750/1334), cc.view.getFrameSize().height, cc.ResolutionPolicy.SHOW_ALL);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
    	//var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
    	
    	
    	
    	
    		this.startExistingUser = function(starterParams)
    		{cc.log(starterParams);
    			var userId = cc.sys.localStorage.getItem("userID");
			
			fire_database.ref("users/"+userId).once("value").then(function(snapshot){
				var d = snapshot.val();cc.log(d.world);
				var editor_data = {
					challengeTries:d.challengeTries,
					colorA:d.colorA,
					colorB:d.colorB,
					dailyResetTime:d.dailyResetTime,
					dailyStreak:d.dailyStreak,
					feature:d.feature,
					numLevelsBeat:d.numLevelsBeat,
					numStars:d.numStars,
					resetTime:d.resetTime,
					streak:d.streak,
					userId:userId,
					userLevels:[],
					world:d.world,
					worldQueue:d.worldQueue,
					worldQueueActive:d.worldQueueActive,
					
					starterParams:starterParams
				};
				fire_database.ref("levels/userLevels/"+userId).once("value").then(function(snapshot){
					var dLevels = snapshot.val();
					if(dLevels != undefined)
					{
						var levelKeys = Object.keys(dLevels);
						for(var i=0; i<levelKeys.length; i++)
						{
							
							var newLevelData = dLevels[levelKeys[i]];cc.log(newLevelData);
							if(newLevelData != 0)
							{
								editor_data.userLevels.push(newLevelData);
								editor_data.userLevels[editor_data.userLevels.length-1].code = levelKeys[i];
							}
						}
					}
					cc.director.runScene(new EditorScene(editor_data, fire_database));
				});
			});
    		};
    		
    		this.startNewUser = function(starterParams)
    		{
    			var editor_data = {
				challengeTries:0,
				colorA:"yellow",
				colorB:"blue",
				dailyResetStreak:0,
				dailyStreak:0,
				feature:
				
				{  "bubbles" : [ {    "col" : 0,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  }, {    "col" : 0,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 2,    "type" : 0  }, {    "col" : 2,    "colorCode" : "yellow",    "row" : 2,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 3,    "type" : 0  }, {    "col" : 2,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  }, {    "col" : 2,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  }, {    "col" : 3,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  }, {    "col" : 4,    "colorCode" : "red",    "row" : 0,    "type" : 0  }, {    "col" : 4,    "colorCode" : "red",    "row" : 1,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 2,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 3,    "type" : 0  }, {    "col" : 6,    "colorCode" : "red",    "row" : 2,    "type" : 0  }, {    "col" : 6,    "colorCode" : "red",    "row" : 1,    "type" : 0  }, {    "col" : 6,    "colorCode" : "red",    "row" : 0,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 0,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 1,    "type" : 0  }, {    "col" : 7,    "colorCode" : "red",    "row" : 0,    "type" : 0  }, {    "col" : 8,    "colorCode" : "blue",    "row" : 0,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 0,    "type" : 0  }, {    "col" : 10,    "colorCode" : "blue",    "row" : 0,    "type" : 0  }, {    "col" : 11,    "colorCode" : "blue",    "row" : 0,    "type" : 0  }, {    "col" : 10,    "colorCode" : "blue",    "row" : 1,    "type" : 0  }, {    "col" : 10,    "colorCode" : "blue",    "row" : 2,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 3,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 2,    "type" : 0  }, {    "col" : 8,    "colorCode" : "blue",    "row" : 1,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 1,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 1,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 2,    "type" : 0  }, {    "col" : 4,    "colorCode" : "blue",    "row" : 2,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 3,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  }, {    "col" : 8,    "colorCode" : "yellow",    "row" : 2,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 3,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 2,    "type" : 0  }, {    "col" : 4,    "colorCode" : "yellow",    "row" : 3,    "type" : 0  }, {    "col" : 4,    "colorCode" : "yellow",    "row" : 4,    "type" : 0  }, {    "col" : 5,    "colorCode" : "yellow",    "row" : 4,    "type" : 0  }, {    "col" : 4,    "colorCode" : "yellow",    "row" : 5,    "type" : 0  }, {    "col" : 10,    "colorCode" : "yellow",    "row" : 3,    "type" : 0  }, {    "col" : 11,    "colorCode" : "yellow",    "row" : 4,    "type" : 0  }, {    "col" : 10,    "colorCode" : "yellow",    "row" : 5,    "type" : 0  }, {    "col" : 10,    "colorCode" : "yellow",    "row" : 4,    "type" : 0  }, {    "col" : 6,    "colorCode" : "blue",    "row" : 3,    "type" : 0  }, {    "col" : 7,    "colorCode" : "blue",    "row" : 4,    "type" : 0  }, {    "col" : 6,    "colorCode" : "blue",    "row" : 5,    "type" : 0  }, {    "col" : 6,    "colorCode" : "blue",    "row" : 4,    "type" : 0  }, {    "col" : 1,    "colorCode" : "blue",    "row" : 4,    "type" : 0  }, {    "col" : 0,    "colorCode" : "blue",    "row" : 3,    "type" : 0  }, {    "col" : 0,    "colorCode" : "blue",    "row" : 4,    "type" : 0  }, {    "col" : 0,    "colorCode" : "blue",    "row" : 5,    "type" : 0  }, {    "col" : 2,    "colorCode" : "red",    "row" : 5,    "type" : 0  }, {    "col" : 2,    "colorCode" : "red",    "row" : 4,    "type" : 0  }, {    "col" : 3,    "colorCode" : "red",    "row" : 4,    "type" : 0  }, {    "col" : 2,    "colorCode" : "red",    "row" : 3,    "type" : 0  }, {    "col" : 8,    "colorCode" : "red",    "row" : 4,    "type" : 0  }, {    "col" : 9,    "colorCode" : "red",    "row" : 4,    "type" : 0  }, {    "col" : 8,    "colorCode" : "red",    "row" : 5,    "type" : 0  }, {    "col" : 8,    "colorCode" : "red",    "row" : 3,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 5,    "type" : 0  }, {    "col" : 6,    "colorCode" : "red",    "row" : 6,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 6,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 7,    "type" : 0  }, {    "col" : 4,    "colorCode" : "blue",    "row" : 6,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 6,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 5,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 7,    "type" : 0  }, {    "col" : 10,    "colorCode" : "blue",    "row" : 6,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 7,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 6,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 5,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 5,    "type" : 0  }, {    "col" : 8,    "colorCode" : "yellow",    "row" : 6,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 6,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 7,    "type" : 0  }, {    "col" : 2,    "colorCode" : "yellow",    "row" : 6,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 6,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 7,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 5,    "type" : 0  } ], "numRows":8, "numMoves":20, "colors":{"red":22,"blue":30,"yellow":30}, "queue" : {    "colors" : [ 1, 1, 1, 1, 1, 1 ],    "type" : "bucket"  }},
				levelsBeaten:[[],[],[],[],[]],
				numLevelsBeat:0,
				numStars:0,
				resetTime:0,
				streak:1,
				userId:null,
				userLevels:[],
				world:{  "bubbles" : [ {    "col" : 0,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  }, {    "col" : 0,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 2,    "type" : 0  }, {    "col" : 2,    "colorCode" : "yellow",    "row" : 2,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 3,    "type" : 0  }, {    "col" : 2,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  }, {    "col" : 2,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  }, {    "col" : 3,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  }, {    "col" : 4,    "colorCode" : "red",    "row" : 0,    "type" : 0  }, {    "col" : 4,    "colorCode" : "red",    "row" : 1,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 2,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 3,    "type" : 0  }, {    "col" : 6,    "colorCode" : "red",    "row" : 2,    "type" : 0  }, {    "col" : 6,    "colorCode" : "red",    "row" : 1,    "type" : 0  }, {    "col" : 6,    "colorCode" : "red",    "row" : 0,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 0,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 1,    "type" : 0  }, {    "col" : 7,    "colorCode" : "red",    "row" : 0,    "type" : 0  }, {    "col" : 8,    "colorCode" : "blue",    "row" : 0,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 0,    "type" : 0  }, {    "col" : 10,    "colorCode" : "blue",    "row" : 0,    "type" : 0  }, {    "col" : 11,    "colorCode" : "blue",    "row" : 0,    "type" : 0  }, {    "col" : 10,    "colorCode" : "blue",    "row" : 1,    "type" : 0  }, {    "col" : 10,    "colorCode" : "blue",    "row" : 2,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 3,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 2,    "type" : 0  }, {    "col" : 8,    "colorCode" : "blue",    "row" : 1,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 1,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 1,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 2,    "type" : 0  }, {    "col" : 4,    "colorCode" : "blue",    "row" : 2,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 3,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  }, {    "col" : 8,    "colorCode" : "yellow",    "row" : 2,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 3,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 2,    "type" : 0  }, {    "col" : 4,    "colorCode" : "yellow",    "row" : 3,    "type" : 0  }, {    "col" : 4,    "colorCode" : "yellow",    "row" : 4,    "type" : 0  }, {    "col" : 5,    "colorCode" : "yellow",    "row" : 4,    "type" : 0  }, {    "col" : 4,    "colorCode" : "yellow",    "row" : 5,    "type" : 0  }, {    "col" : 10,    "colorCode" : "yellow",    "row" : 3,    "type" : 0  }, {    "col" : 11,    "colorCode" : "yellow",    "row" : 4,    "type" : 0  }, {    "col" : 10,    "colorCode" : "yellow",    "row" : 5,    "type" : 0  }, {    "col" : 10,    "colorCode" : "yellow",    "row" : 4,    "type" : 0  }, {    "col" : 6,    "colorCode" : "blue",    "row" : 3,    "type" : 0  }, {    "col" : 7,    "colorCode" : "blue",    "row" : 4,    "type" : 0  }, {    "col" : 6,    "colorCode" : "blue",    "row" : 5,    "type" : 0  }, {    "col" : 6,    "colorCode" : "blue",    "row" : 4,    "type" : 0  }, {    "col" : 1,    "colorCode" : "blue",    "row" : 4,    "type" : 0  }, {    "col" : 0,    "colorCode" : "blue",    "row" : 3,    "type" : 0  }, {    "col" : 0,    "colorCode" : "blue",    "row" : 4,    "type" : 0  }, {    "col" : 0,    "colorCode" : "blue",    "row" : 5,    "type" : 0  }, {    "col" : 2,    "colorCode" : "red",    "row" : 5,    "type" : 0  }, {    "col" : 2,    "colorCode" : "red",    "row" : 4,    "type" : 0  }, {    "col" : 3,    "colorCode" : "red",    "row" : 4,    "type" : 0  }, {    "col" : 2,    "colorCode" : "red",    "row" : 3,    "type" : 0  }, {    "col" : 8,    "colorCode" : "red",    "row" : 4,    "type" : 0  }, {    "col" : 9,    "colorCode" : "red",    "row" : 4,    "type" : 0  }, {    "col" : 8,    "colorCode" : "red",    "row" : 5,    "type" : 0  }, {    "col" : 8,    "colorCode" : "red",    "row" : 3,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 5,    "type" : 0  }, {    "col" : 6,    "colorCode" : "red",    "row" : 6,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 6,    "type" : 0  }, {    "col" : 5,    "colorCode" : "red",    "row" : 7,    "type" : 0  }, {    "col" : 4,    "colorCode" : "blue",    "row" : 6,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 6,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 5,    "type" : 0  }, {    "col" : 3,    "colorCode" : "blue",    "row" : 7,    "type" : 0  }, {    "col" : 10,    "colorCode" : "blue",    "row" : 6,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 7,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 6,    "type" : 0  }, {    "col" : 9,    "colorCode" : "blue",    "row" : 5,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 5,    "type" : 0  }, {    "col" : 8,    "colorCode" : "yellow",    "row" : 6,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 6,    "type" : 0  }, {    "col" : 7,    "colorCode" : "yellow",    "row" : 7,    "type" : 0  }, {    "col" : 2,    "colorCode" : "yellow",    "row" : 6,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 6,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 7,    "type" : 0  }, {    "col" : 1,    "colorCode" : "yellow",    "row" : 5,    "type" : 0  } ], "numRows":8, "numMoves":20, "colors":{"red":22,"blue":30,"yellow":30}, "queue" : {    "colors" : [ 1, 1, 1, 1, 1, 1 ],    "type" : "bucket"  }},
				worldQueue: [1,1,1,0,0,0],
				worldQueueActive: [1,1,1,0,0,0],
				
				starterParams:starterParams
			};
			cc.director.runScene(new EditorScene(editor_data, fire_database));

    		};
    	
    	
    	
    		
    		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		    vars[key] = value;
		});
    		cc.log(parts);
	    		console.log("PARAMETERS");
	  	cc.log(vars);
	  	
	  	
	  	
    		
		var fire_database = firebase.database();
    		
    		if(Object.keys(vars).length >= 1 && Object.keys(vars).indexOf("userId") != -1 && Object.keys(vars).indexOf("levelId") != -1)
    		{
    			var self = this;
    			fire_database.ref("levels/userLevels/"+vars.userId+"/"+vars.levelId).once("value").then(function(snapshot){
    				var d = snapshot.val();
    				cc.log("FOUND LEVEL");
    				if(cc.sys.localStorage.getItem("userID") != null)
				{
					self.startExistingUser({"userLevel":d});
				}
				// IF YOU NEED TO SET UP A DUMMY USER FOR NOW
				else
				{
					self.startNewUser({"userLevel":d});
				}
    				
    				
    			}).catch(function(error){
				var errorCode = error.code;
				var errorMessage = error.message;
				cc.log(errorMessage);
				// Unable to find level
				cc.log("CRASHED FINDING LEVEL");
				if(cc.sys.localStorage.getItem("userID") != null)
				{
					self.startExistingUser({});
				}
				// IF YOU NEED TO SET UP A DUMMY USER FOR NOW
				else
				{
					self.startNewUser({});
				}

				
				
			});
    		}
    		else
    		{
    			cc.log("EXISTING USERID: " + cc.sys.localStorage.getItem("userID"));
			// IF YOU NEED TO LOG EXISTING USER IN
			if(cc.sys.localStorage.getItem("userID") != null)
			{
				
				this.startExistingUser();
				
	
				
			}
			// IF YOU NEED TO SET UP A DUMMY USER FOR NOW
			else
			{
				this.startNewUser();
			}
    		}
    		
    		
    	
		
		
		
		
		
		
		
		

    }, this);
};
cc.game.run();