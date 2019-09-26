
var EditorScene = cc.Scene.extend({
	ctor:function(editorData, database)
	{
		this._super();
		this.editorData = editorData;cc.log("EDITOR DATA");cc.log(editorData);
		this.database = database;
	},
	onEnter:function()
	{
		this._super();
		
		this.dataManager = new DataManager(this.editorData);
		this.addChild(this.dataManager);
		cc.log(this.editorData);
		this.mode = "play";
		this.playType = "world";
		
		this.currentCreatedLevel = {};
		
		this.challengeTries = this.editorData.challengeTries;
		this.dailyStreak = this.editorData.dailyStreak;
		this.dailyResetTime = this.editorData.dailyResetTime;
		this.feature = this.editorData.feature;
		this.streak = this.editorData.streak;
		this.numStars = this.editorData.numStars;
		this.resetTime = this.editorData.resetTime;
		this.userId = this.editorData.userId;
		this.userLevels = this.editorData.userLevels;
		this.numLevelsBeat = this.editorData.numLevelsBeat;
		this.world = this.editorData.world;cc.log(this.world);
		
		this.starterParams = this.editorData.starterParams;cc.log(this.editorData.starterParams);
		
		this.surfacedNumStars = this.numStars;
		this.surfacedStreak = this.streak;
		
		if(this.challengeTries >= this.streak)
		{
			this.updateChallengeTries(0);
			this.updateStreak(1);
		}
		
		this.stage = 0;
		if(this.numStars >= 31)
		{
			this.stage = 5;
		}
		else if(this.numStars >= 16)
		{
			this.stage = 4;
		}
		else if(this.numStars >= 6)
		{
			this.stage = 3;
		}
		else if(this.numStars >= 3)
		{
			this.stage = 2;
		}
		else if(this.numStars >= 1)
		{
			this.stage = 1;
		}
		else if(this.numStars == 0)
		{
			this.stage = 0;
		}
		
		
				//this.dbUpdateFeature(this.features[i], i);
				
				// add code to list
				//this.dbAddLevelBeaten(this.features[i].code, this.levelsBeaten.indexOf(this.features[i].code));
				//this.features[i].isNew = false;
			
		
		
		this.oldStars = this.numStars;
		
		this.curCreatedBubbles = [];
		this.curCreatedMoves = 10;
		this.curCreatedRows = 1;
		
		this.curSelectedLevelIndex = -1;
		
		this.userLevelIndex = -1;
		
		this.featureInProg = false;
		this.curUnsavedProg = false;
		this.quitWithoutSavingAction = null;
		this.quitWithoutFinishingAction = null;
		
		
		this.panelLayer = new EditorPanel(cc.winSize.width/3, cc.winSize.height, this.editorData, this.curCreatedMoves);
		this.panelLayer.attr({x:0, y:0});
		this.addChild(this.panelLayer);
		
		
		
		this.levelsPanel = new EditorLevelsPanel(cc.winSize.width/3, cc.winSize.height, this.editorData);
		this.levelsPanel.attr({x:cc.winSize.width*2/3, y:0});
		this.addChild(this.levelsPanel);
		
		
		this.playTutorial = null;
		this.createTutorial = null;
		
		
		//this.levelsPanel.levelListLayer.listLayer.updateEmptyBoxes();
		var self = this;
		cc.log(this.starterParams);
		if(this.starterParams != undefined && Object.keys(this.starterParams).length > 0 && Object.keys(this.starterParams).indexOf("userLevel") != -1)
		{cc.log("BUILDING LEVEL");
		
			var newLevel = this.starterParams.userLevel;
			var bubKeys = Object.keys(newLevel.bubbles);
			var newBubbles = [];
			for(var i=0; i<bubKeys.length; i++)
			{
				var dBub = newLevel.bubbles[bubKeys[i]];
				var newBub = {row:dBub.row, col:dBub.col, type:dBub.type};
				var newColor = null;
				if("colorCode" in dBub)
					newColor = dBub.colorCode;
				newBub.colorCode = newColor;
				if("orientation" in newBub)
					newBub.orientation = dBub.orientation;
				if("binary" in newBub)
					newBub.binary = dBub.binary;
				newBubbles.push(newBub);
			}
			var loadedLevel = {
				bubbles:newBubbles,
				numMoves:newLevel.numMoves,
				numRows:newLevel.numRows,
				queue:{type:"bucket",colors:[1,1,1,1,1,1]},
				colors:newLevel.colors
			};cc.log(loadedLevel);
			
			
			
			self.editorLayer = new EditorLayer(cc.winSize.width/3, cc.winSize.height, self.editorData, {}, self.curCreatedRows);
			self.editorLayer.attr({x:cc.winSize.width/3, y:0});
			self.addChild(self.editorLayer);
		
			//self.loadIdentifiedLevel(loadedLevel);
			self.playForeignLevel(loadedLevel);
		
		
			
		}
		else
		{cc.log("NO PARAM");
			
			this.editorLayer = new EditorLayer(cc.winSize.width/3, cc.winSize.height, this.editorData, {}, this.curCreatedRows);
			this.editorLayer.attr({x:cc.winSize.width/3, y:0});
			//this.addChild(this.editorLayer);
			
			
			var maxNumRow = 0;
			var emojiGoals = {};
			for(var i=0; i<Object.values(this.world.bubbles).length; i++)
			{
				var bub = Object.values(this.world.bubbles)[i];
				
				if(bub.row > maxNumRow)
				{
					maxNumRow = bub.row;
				}
				
				if(emojiGoals.hasOwnProperty(bub.colorCode))
				{
					emojiGoals[bub.colorCode]++;
				}
				else emojiGoals[bub.colorCode] = 0;
			}cc.log(emojiGoals);
			
			this.worldNumRows = maxNumRow+1;
			this.worldNumMoves = 10;
			cc.log(Object.values(this.world.bubbles));
			this.gameLayer = new GameplayLayer(Object.values(this.world.bubbles), maxNumRow+1/*this.editorLayer.bubbleLayer.getNumRows()*//*this.editorLayer.bubbleLayer.numRows*/, cc.winSize.height, {}, cc.winSize.width/3, 10, "feature", emojiGoals, this.numStars, this.database, this.userId);
			this.gameLayer.attr({
				x:cc.winSize.width/3,
				y:0,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.gameLayer);
		}
	
		
		
		this.playLevelTut = null;
		this.makeLevelTut = null;
		this.loginTut = null;
		
		if(this.userId == null)
		{
			self.openSocialLoginPopup();
			
			/*
			this.playLevelTut = new TutorialBox( (cc.winSize.width/3)*.45, this.height*.2, "play");
			this.playLevelTut.attr({
				x:this.levelsPanel.x-this.playLevelTut.width-5,
				y:this.panelLayer.bubblePanelLayer.y+(this.panelLayer.bubblePanelLayer.height/2),
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.playLevelTut);
			
			this.makeLevelTut = new TutorialBox( (cc.winSize.width/3)*.45, this.height*.2, "make");
			this.makeLevelTut.attr({
				x:this.panelLayer.x+this.panelLayer.width+5,
				//y:this.levelsPanel.levelListLayer.listLayer.y+(this.levelsPanel.levelListLayer.listLayer.height/2),
				y:this.playLevelTut.y,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.makeLevelTut);
			
			this.loginTut = new TutorialBox( (cc.winSize.width/3)*.75, this.height*.2, "login");
			this.loginTut.attr({
				x:this.levelsPanel.x-this.loginTut.width-5,
				y:5,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.loginTut);
			
			*/
			
		}
		
		var self = this;
		
		if(cc.sys.capabilities.hasOwnProperty('mouse')) {
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				
				onMouseDown:function(event)
				{
					//self.onDownEvent(event);
					self.onTouchBegan(event.getLocation());
					//self.mouseDownFlag = true;
					return false;
				},
				onMouseMove:function(event)
				{
					//if(self.mouseDownFlag)
					self.onTouchMoved(event.getLocation());
						//self.onMoveEvent(event);
					return false;
				},
				onMouseUp:function(event)
				{
					//self.mouseDownFlag = false;
					//self.onUpEvent(event);
					self.onTouchEnded(event.getLocation());
		
					return false;
				}
			}, this);
		}
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){cc.log("TOUCHSTART");
			   		
				    	//self.onDownEvent(touch);
				    self.onTouchBegan(touch);
				    	return true;
			    },
			    onTouchMoved: function(touch, event){cc.log("MOVE");
			    		//self.onMoveEvent(touch);
			    		self.onTouchMoved(touch);
			    		return true;
			   
			    },
			    onTouchEnded: function(touch, event){cc.log("touchend main");
			    		//self.onUpEvent(touch);
			    		self.onTouchEnded(touch);
			    		return true;
				    
			    }
			    
		    },this);
		}
		
		
		
		
	},
	
	loginFacebook:function()
	{
		//this.database.ref("levels/userLevels/"+vars["userId"]+"/"+vars["levelId"]).once("value").then(function(snapshot){
		//	var d = snapshot.val();
			
			  var provider = new firebase.auth.FacebookAuthProvider();
			  
			//  provider.setCustomParameters({
			//  'display': 'popup'
			//});
			  var self = this;
			  
			  firebase.auth().signInWithPopup(provider).then(function(result) {
			  	
			  	console.log("success FB login");
				  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
				  var token = result.credential.accessToken;
				  // The signed-in user info.
				  var user = result.user;
				  // ...
				  
				  
				  cc.log(user.uid);
				  self.userId = user.uid;
				  
				   self.database.ref("users/"+self.userId).once("value").then(function(snapshot){
	  					var d = snapshot.val();
	  		
						cc.sys.localStorage.setItem("userID", self.userId);

	  					if(d == null)
	  					{cc.log("new user");
	  						self.database.ref("users/"+self.userId).set(
						  	{
								challengeTries:self.challengeTries,
								feature:// work on this
									self.feature
								,
								levelsBeaten:{"0":[], "1":[], "2":[],"3":[],"4":[]},
	  							likedLevels:{"main":[],"creators":[]},
								numLevelsBeat:self.numLevelsBeat,
								numStars:self.numStars,
								resetTime:self.resetTime,
								streak:self.streak
							});
							
							var madeLevelsObj = {};
							for(var i=0; i<self.userLevels.length; i++)
							{
								madeLevelsObj[""+i] = self.userLevels[i];
							}
							
							var loadedData = {
	  							challengeTries:self.challengeTries,
	  							feature:self.feature,
	  							levelsBeaten:[[],[],[],[],[],[]],
	  							likedLevels:{"main":[],"creators":[]},
	  							numLevelsBeat:self.numLevelsBeat,
	  							numStars:self.numStars,
	  							resetTime:0,
	  							streak:self.streak,
	  							
	  							userId:self.userId,
	  							userLevels:self.userLevels,
	  						}
						
							self.database.ref("levels/userLevels/"+self.userId).set(madeLevelsObj);
							cc.log("about to run editorscene");
							cc.director.runScene(new EditorScene(loadedData, self.database));
	  						
	  					}
	  					else
	  					{cc.log("old user");
	  						cc.sys.localStorage.setItem("userID", self.userId);
	  						//self.editorData.userId = self.userId;
	  						
	  						var loadedData = {
	  							challengeTries:d.challengeTries,
	  							feature:d.feature,
	  							levelsBeaten:[[],[],[],[],[],[]],
	  							likedLevels:{"main":[],"creators":[]},
	  							numLevelsBeat:d.numLevelsBeat,
	  							numStars:d.numStars,
	  							resetTime:0,
	  							streak:d.streak,
	  							
	  							userId:self.userId,
	  							userLevels:[],
	  						}
	  						
	  						self.database.ref("levels/userLevels/"+self.userId).once("value").then(function(snapshot){
	  							var dLevels = snapshot.val();
	  							var levelKeys = Object.keys(dLevels);
	  							for(var i=0; i<levelKeys.length; i++)
	  							{
	  								loadedData.userLevels.push(dLevels[levelKeys[i]]);
	  							}
	  							cc.director.runScene(new EditorScene(loadedData, self.database));
	  						});
	  						
	  						
						 // DATA.initUserWebData(self.userId);
						 	
	  					}
	  					
	  					
	  					
	  					
					}).catch(function(error){
						var errorCode = error.code;
						var errorMessage = error.message;
						console.log(errorMessage);
						
						
						
					});
					
					
				  //this.editorData.userId = user.id;
				  //this.runScene(new EditorScene(this.editorData, this.database))
				 
				  
			  
			}).catch(function(error) {
				console.log("error");
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
			  
			  cc.log(errorMessage);
			});
			
			
			
		//});
	},
	
	loginGoogle:function()
	{
		//this.database.ref("levels/userLevels/"+vars["userId"]+"/"+vars["levelId"]).once("value").then(function(snapshot){
		//	var d = snapshot.val();
			
			  var provider = new firebase.auth.GoogleAuthProvider();
			  
			//  provider.setCustomParameters({
			//  'display': 'popup'
			//});
			  var self = this;
			  
			  firebase.auth().signInWithPopup(provider).then(function(result) {
			  	
			  	console.log("success FB login");
				  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
				  var token = result.credential.accessToken;
				  // The signed-in user info.
				  var user = result.user;
				  // ...
				  
				  
				  cc.log(user.uid);
				  self.userId = user.uid;
				  
				   self.database.ref("users/"+self.userId).once("value").then(function(snapshot){
	  					var d = snapshot.val();
	  		cc.log(d);
	  					if(d == null)
	  					{cc.log("new user");
	  						self.database.ref("users/"+self.userId).set(
						  	{
								features:{
									"0":{ "bubbles" : [ { "col" : 0, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 0, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 2, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 5, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 8, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 11, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 0, "row" : 2, "type" : 4 }, { "col" : 1, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 2, "type" : 4 }, { "col" : 3, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 1, "type" : 4 }, { "col" : 2, "row" : 3, "type" : 4 }, { "col" : 4, "row" : 2, "type" : 4 }, { "col" : 5, "row" : 2, "type" : 4 }, { "col" : 6, "row" : 2, "type" : 4 }, { "col" : 7, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 2, "type" : 4 }, { "col" : 9, "row" : 2, "type" : 4 }, { "col" : 10, "row" : 2, "type" : 4 }, { "col" : 11, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 1, "type" : 4 }, { "col" : 8, "row" : 3, "type" : 4 }, { "col" : 5, "row" : 1, "type" : 4 }, { "col" : 5, "row" : 3, "type" : 4 }, { "col" : 1, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 2, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 5, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 8, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 11, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 0, "row" : 6, "type" : 4 }, { "col" : 1, "row" : 6, "type" : 4 }, { "col" : 2, "row" : 6, "type" : 4 }, { "col" : 3, "row" : 6, "type" : 4 }, { "col" : 4, "row" : 6, "type" : 4 }, { "col" : 5, "row" : 6, "type" : 4 }, { "col" : 6, "row" : 6, "type" : 4 }, { "col" : 7, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 6, "type" : 4 }, { "col" : 9, "row" : 6, "type" : 4 }, { "col" : 10, "row" : 6, "type" : 4 }, { "col" : 11, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 5, "type" : 4 }, { "col" : 8, "row" : 7, "type" : 4 }, { "col" : 5, "row" : 5, "type" : 4 }, { "col" : 5, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 5, "type" : 4 }, { "col" : 1, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 0, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 4, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 3, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 6, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 7, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 9, "colorCode" : "blue", "row" : 7, "type" : 0 }, { "col" : 10, "colorCode" : "blue", "row" : 7, "type" : 0 } ], "colors":{"red":14, "yellow":14, "blue":14, "green":14}, "meta" : { "bulbData" : [ [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ] }, "numMoves" : 15, "numRows" : 8, "queue" : { "colors" : [ 1, 1, 1, 1, 1, 1 ], "type" : "bucket" }, "timePlayed":(new Date()).getTime(), "type" : "ready" },
									"1":{ "bubbles" : [ { "col" : 0, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 0, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 2, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 5, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 8, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 11, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 0, "row" : 2, "type" : 4 }, { "col" : 1, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 2, "type" : 4 }, { "col" : 3, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 1, "type" : 4 }, { "col" : 2, "row" : 3, "type" : 4 }, { "col" : 4, "row" : 2, "type" : 4 }, { "col" : 5, "row" : 2, "type" : 4 }, { "col" : 6, "row" : 2, "type" : 4 }, { "col" : 7, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 2, "type" : 4 }, { "col" : 9, "row" : 2, "type" : 4 }, { "col" : 10, "row" : 2, "type" : 4 }, { "col" : 11, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 1, "type" : 4 }, { "col" : 8, "row" : 3, "type" : 4 }, { "col" : 5, "row" : 1, "type" : 4 }, { "col" : 5, "row" : 3, "type" : 4 }, { "col" : 1, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 2, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 5, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 8, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 11, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 0, "row" : 6, "type" : 4 }, { "col" : 1, "row" : 6, "type" : 4 }, { "col" : 2, "row" : 6, "type" : 4 }, { "col" : 3, "row" : 6, "type" : 4 }, { "col" : 4, "row" : 6, "type" : 4 }, { "col" : 5, "row" : 6, "type" : 4 }, { "col" : 6, "row" : 6, "type" : 4 }, { "col" : 7, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 6, "type" : 4 }, { "col" : 9, "row" : 6, "type" : 4 }, { "col" : 10, "row" : 6, "type" : 4 }, { "col" : 11, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 5, "type" : 4 }, { "col" : 8, "row" : 7, "type" : 4 }, { "col" : 5, "row" : 5, "type" : 4 }, { "col" : 5, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 5, "type" : 4 }, { "col" : 1, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 0, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 4, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 3, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 6, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 7, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 9, "colorCode" : "blue", "row" : 7, "type" : 0 }, { "col" : 10, "colorCode" : "blue", "row" : 7, "type" : 0 } ], "colors":{"red":14, "yellow":14, "blue":14, "green":14}, "meta" : { "bulbData" : [ [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ] }, "numMoves" : 15, "numRows" : 8, "queue" : { "colors" : [ 1, 1, 1, 1, 1, 1 ], "type" : "bucket" }, "timePlayed":(new Date()).getTime(), "type" : "ready" },
									"2":{ "bubbles" : [ { "col" : 0, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 0, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 2, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 5, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 8, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 11, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 0, "row" : 2, "type" : 4 }, { "col" : 1, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 2, "type" : 4 }, { "col" : 3, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 1, "type" : 4 }, { "col" : 2, "row" : 3, "type" : 4 }, { "col" : 4, "row" : 2, "type" : 4 }, { "col" : 5, "row" : 2, "type" : 4 }, { "col" : 6, "row" : 2, "type" : 4 }, { "col" : 7, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 2, "type" : 4 }, { "col" : 9, "row" : 2, "type" : 4 }, { "col" : 10, "row" : 2, "type" : 4 }, { "col" : 11, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 1, "type" : 4 }, { "col" : 8, "row" : 3, "type" : 4 }, { "col" : 5, "row" : 1, "type" : 4 }, { "col" : 5, "row" : 3, "type" : 4 }, { "col" : 1, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 2, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 5, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 8, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 11, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 0, "row" : 6, "type" : 4 }, { "col" : 1, "row" : 6, "type" : 4 }, { "col" : 2, "row" : 6, "type" : 4 }, { "col" : 3, "row" : 6, "type" : 4 }, { "col" : 4, "row" : 6, "type" : 4 }, { "col" : 5, "row" : 6, "type" : 4 }, { "col" : 6, "row" : 6, "type" : 4 }, { "col" : 7, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 6, "type" : 4 }, { "col" : 9, "row" : 6, "type" : 4 }, { "col" : 10, "row" : 6, "type" : 4 }, { "col" : 11, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 5, "type" : 4 }, { "col" : 8, "row" : 7, "type" : 4 }, { "col" : 5, "row" : 5, "type" : 4 }, { "col" : 5, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 5, "type" : 4 }, { "col" : 1, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 0, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 4, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 3, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 6, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 7, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 9, "colorCode" : "blue", "row" : 7, "type" : 0 }, { "col" : 10, "colorCode" : "blue", "row" : 7, "type" : 0 } ], "colors":{"red":14, "yellow":14, "blue":14, "green":14}, "meta" : { "bulbData" : [ [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ] }, "numMoves" : 15, "numRows" : 8, "queue" : { "colors" : [ 1, 1, 1, 1, 1, 1 ], "type" : "bucket" }, "timePlayed":(new Date()).getTime(), "type" : "ready" },
									"3":{ "bubbles" : [ { "col" : 0, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 0, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 2, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 5, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 8, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 11, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 0, "row" : 2, "type" : 4 }, { "col" : 1, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 2, "type" : 4 }, { "col" : 3, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 1, "type" : 4 }, { "col" : 2, "row" : 3, "type" : 4 }, { "col" : 4, "row" : 2, "type" : 4 }, { "col" : 5, "row" : 2, "type" : 4 }, { "col" : 6, "row" : 2, "type" : 4 }, { "col" : 7, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 2, "type" : 4 }, { "col" : 9, "row" : 2, "type" : 4 }, { "col" : 10, "row" : 2, "type" : 4 }, { "col" : 11, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 1, "type" : 4 }, { "col" : 8, "row" : 3, "type" : 4 }, { "col" : 5, "row" : 1, "type" : 4 }, { "col" : 5, "row" : 3, "type" : 4 }, { "col" : 1, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 2, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 5, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 8, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 11, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 0, "row" : 6, "type" : 4 }, { "col" : 1, "row" : 6, "type" : 4 }, { "col" : 2, "row" : 6, "type" : 4 }, { "col" : 3, "row" : 6, "type" : 4 }, { "col" : 4, "row" : 6, "type" : 4 }, { "col" : 5, "row" : 6, "type" : 4 }, { "col" : 6, "row" : 6, "type" : 4 }, { "col" : 7, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 6, "type" : 4 }, { "col" : 9, "row" : 6, "type" : 4 }, { "col" : 10, "row" : 6, "type" : 4 }, { "col" : 11, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 5, "type" : 4 }, { "col" : 8, "row" : 7, "type" : 4 }, { "col" : 5, "row" : 5, "type" : 4 }, { "col" : 5, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 5, "type" : 4 }, { "col" : 1, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 0, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 4, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 3, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 6, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 7, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 9, "colorCode" : "blue", "row" : 7, "type" : 0 }, { "col" : 10, "colorCode" : "blue", "row" : 7, "type" : 0 } ], "colors":{"red":14, "yellow":14, "blue":14, "green":14}, "meta" : { "bulbData" : [ [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ] }, "numMoves" : 15, "numRows" : 8, "queue" : { "colors" : [ 1, 1, 1, 1, 1, 1 ], "type" : "bucket" }, "timePlayed":(new Date()).getTime(), "type" : "ready" }
								},
								levelsBeaten:{"0":[{"0":"level1"},{"1":"level2"},{"2":"level3"},{"3":"level4"}]},
								//levelsBeaten:["level1","level2","level3","level4"],
								numStars:1,
								stage:0,
								streak:1
							});
						
							self.database.ref("levels/userLevels/"+self.userId).set({"0":0});
				
	  					}
	  					else
	  					{cc.log("old user");
	  						//self.editorData.userId = self.userId;
	  						//cc.director.runScene(new EditorScene(self.editorData, self.database));
						  DATA.initUserWebData(self.userId);
	  					}
	  					
	  					
	  					cc.sys.localStorage.setItem("userID", self.userId);
	  					
					}).catch(function(error){
						var errorCode = error.code;
						var errorMessage = error.message;
						console.log(errorMessage);
						
						
						
					});
					
					
				  //this.editorData.userId = user.id;
				  //this.runScene(new EditorScene(this.editorData, this.database))
				 
				  
			  
			}).catch(function(error) {
				console.log("error");
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
			  
			  cc.log(errorMessage);
			});
			
			
			
		//});
	},
	
	loginTwitter:function()
	{
		//this.database.ref("levels/userLevels/"+vars["userId"]+"/"+vars["levelId"]).once("value").then(function(snapshot){
		//	var d = snapshot.val();
			
			  var provider = new firebase.auth.TwitterAuthProvider();
			  
			//  provider.setCustomParameters({
			//  'display': 'popup'
			//});
			  var self = this;
			  
			  firebase.auth().signInWithPopup(provider).then(function(result) {
			  	
			  	console.log("success FB login");
				  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
				  var token = result.credential.accessToken;
				  // The signed-in user info.
				  var user = result.user;
				  // ...
				  
				  
				  cc.log(user.uid);
				  self.userId = user.uid;
				  
				   self.database.ref("users/"+self.userId).once("value").then(function(snapshot){
	  					var d = snapshot.val();
	  		cc.log(d);
	  					if(d == null)
	  					{cc.log("new user");
	  						self.database.ref("users/"+self.userId).set(
						  	{
								features:{
									"0":{ "bubbles" : [ { "col" : 0, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 0, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 2, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 5, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 8, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 11, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 0, "row" : 2, "type" : 4 }, { "col" : 1, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 2, "type" : 4 }, { "col" : 3, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 1, "type" : 4 }, { "col" : 2, "row" : 3, "type" : 4 }, { "col" : 4, "row" : 2, "type" : 4 }, { "col" : 5, "row" : 2, "type" : 4 }, { "col" : 6, "row" : 2, "type" : 4 }, { "col" : 7, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 2, "type" : 4 }, { "col" : 9, "row" : 2, "type" : 4 }, { "col" : 10, "row" : 2, "type" : 4 }, { "col" : 11, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 1, "type" : 4 }, { "col" : 8, "row" : 3, "type" : 4 }, { "col" : 5, "row" : 1, "type" : 4 }, { "col" : 5, "row" : 3, "type" : 4 }, { "col" : 1, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 2, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 5, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 8, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 11, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 0, "row" : 6, "type" : 4 }, { "col" : 1, "row" : 6, "type" : 4 }, { "col" : 2, "row" : 6, "type" : 4 }, { "col" : 3, "row" : 6, "type" : 4 }, { "col" : 4, "row" : 6, "type" : 4 }, { "col" : 5, "row" : 6, "type" : 4 }, { "col" : 6, "row" : 6, "type" : 4 }, { "col" : 7, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 6, "type" : 4 }, { "col" : 9, "row" : 6, "type" : 4 }, { "col" : 10, "row" : 6, "type" : 4 }, { "col" : 11, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 5, "type" : 4 }, { "col" : 8, "row" : 7, "type" : 4 }, { "col" : 5, "row" : 5, "type" : 4 }, { "col" : 5, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 5, "type" : 4 }, { "col" : 1, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 0, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 4, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 3, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 6, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 7, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 9, "colorCode" : "blue", "row" : 7, "type" : 0 }, { "col" : 10, "colorCode" : "blue", "row" : 7, "type" : 0 } ], "colors":{"red":14, "yellow":14, "blue":14, "green":14}, "meta" : { "bulbData" : [ [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ] }, "numMoves" : 15, "numRows" : 8, "queue" : { "colors" : [ 1, 1, 1, 1, 1, 1 ], "type" : "bucket" }, "timePlayed":(new Date()).getTime(), "type" : "ready" },
									"1":{ "bubbles" : [ { "col" : 0, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 0, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 2, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 5, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 8, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 11, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 0, "row" : 2, "type" : 4 }, { "col" : 1, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 2, "type" : 4 }, { "col" : 3, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 1, "type" : 4 }, { "col" : 2, "row" : 3, "type" : 4 }, { "col" : 4, "row" : 2, "type" : 4 }, { "col" : 5, "row" : 2, "type" : 4 }, { "col" : 6, "row" : 2, "type" : 4 }, { "col" : 7, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 2, "type" : 4 }, { "col" : 9, "row" : 2, "type" : 4 }, { "col" : 10, "row" : 2, "type" : 4 }, { "col" : 11, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 1, "type" : 4 }, { "col" : 8, "row" : 3, "type" : 4 }, { "col" : 5, "row" : 1, "type" : 4 }, { "col" : 5, "row" : 3, "type" : 4 }, { "col" : 1, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 2, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 5, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 8, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 11, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 0, "row" : 6, "type" : 4 }, { "col" : 1, "row" : 6, "type" : 4 }, { "col" : 2, "row" : 6, "type" : 4 }, { "col" : 3, "row" : 6, "type" : 4 }, { "col" : 4, "row" : 6, "type" : 4 }, { "col" : 5, "row" : 6, "type" : 4 }, { "col" : 6, "row" : 6, "type" : 4 }, { "col" : 7, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 6, "type" : 4 }, { "col" : 9, "row" : 6, "type" : 4 }, { "col" : 10, "row" : 6, "type" : 4 }, { "col" : 11, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 5, "type" : 4 }, { "col" : 8, "row" : 7, "type" : 4 }, { "col" : 5, "row" : 5, "type" : 4 }, { "col" : 5, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 5, "type" : 4 }, { "col" : 1, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 0, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 4, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 3, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 6, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 7, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 9, "colorCode" : "blue", "row" : 7, "type" : 0 }, { "col" : 10, "colorCode" : "blue", "row" : 7, "type" : 0 } ], "colors":{"red":14, "yellow":14, "blue":14, "green":14}, "meta" : { "bulbData" : [ [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ] }, "numMoves" : 15, "numRows" : 8, "queue" : { "colors" : [ 1, 1, 1, 1, 1, 1 ], "type" : "bucket" }, "timePlayed":(new Date()).getTime(), "type" : "ready" },
									"2":{ "bubbles" : [ { "col" : 0, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 0, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 2, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 5, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 8, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 11, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 0, "row" : 2, "type" : 4 }, { "col" : 1, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 2, "type" : 4 }, { "col" : 3, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 1, "type" : 4 }, { "col" : 2, "row" : 3, "type" : 4 }, { "col" : 4, "row" : 2, "type" : 4 }, { "col" : 5, "row" : 2, "type" : 4 }, { "col" : 6, "row" : 2, "type" : 4 }, { "col" : 7, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 2, "type" : 4 }, { "col" : 9, "row" : 2, "type" : 4 }, { "col" : 10, "row" : 2, "type" : 4 }, { "col" : 11, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 1, "type" : 4 }, { "col" : 8, "row" : 3, "type" : 4 }, { "col" : 5, "row" : 1, "type" : 4 }, { "col" : 5, "row" : 3, "type" : 4 }, { "col" : 1, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 2, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 5, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 8, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 11, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 0, "row" : 6, "type" : 4 }, { "col" : 1, "row" : 6, "type" : 4 }, { "col" : 2, "row" : 6, "type" : 4 }, { "col" : 3, "row" : 6, "type" : 4 }, { "col" : 4, "row" : 6, "type" : 4 }, { "col" : 5, "row" : 6, "type" : 4 }, { "col" : 6, "row" : 6, "type" : 4 }, { "col" : 7, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 6, "type" : 4 }, { "col" : 9, "row" : 6, "type" : 4 }, { "col" : 10, "row" : 6, "type" : 4 }, { "col" : 11, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 5, "type" : 4 }, { "col" : 8, "row" : 7, "type" : 4 }, { "col" : 5, "row" : 5, "type" : 4 }, { "col" : 5, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 5, "type" : 4 }, { "col" : 1, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 0, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 4, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 3, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 6, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 7, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 9, "colorCode" : "blue", "row" : 7, "type" : 0 }, { "col" : 10, "colorCode" : "blue", "row" : 7, "type" : 0 } ], "colors":{"red":14, "yellow":14, "blue":14, "green":14}, "meta" : { "bulbData" : [ [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ] }, "numMoves" : 15, "numRows" : 8, "queue" : { "colors" : [ 1, 1, 1, 1, 1, 1 ], "type" : "bucket" }, "timePlayed":(new Date()).getTime(), "type" : "ready" },
									"3":{ "bubbles" : [ { "col" : 0, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 0, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 1, "colorCode" : "red", "row" : 1, "type" : 0 }, { "col" : 2, "colorCode" : "red", "row" : 0, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 5, "colorCode" : "yellow", "row" : 0, "type" : 0 }, { "col" : 4, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 3, "colorCode" : "yellow", "row" : 1, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 6, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 1, "type" : 0 }, { "col" : 8, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 7, "colorCode" : "blue", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 9, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 1, "type" : 0 }, { "col" : 11, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 10, "colorCode" : "green", "row" : 0, "type" : 0 }, { "col" : 0, "row" : 2, "type" : 4 }, { "col" : 1, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 2, "type" : 4 }, { "col" : 3, "row" : 2, "type" : 4 }, { "col" : 2, "row" : 1, "type" : 4 }, { "col" : 2, "row" : 3, "type" : 4 }, { "col" : 4, "row" : 2, "type" : 4 }, { "col" : 5, "row" : 2, "type" : 4 }, { "col" : 6, "row" : 2, "type" : 4 }, { "col" : 7, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 2, "type" : 4 }, { "col" : 9, "row" : 2, "type" : 4 }, { "col" : 10, "row" : 2, "type" : 4 }, { "col" : 11, "row" : 2, "type" : 4 }, { "col" : 8, "row" : 1, "type" : 4 }, { "col" : 8, "row" : 3, "type" : 4 }, { "col" : 5, "row" : 1, "type" : 4 }, { "col" : 5, "row" : 3, "type" : 4 }, { "col" : 1, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 3, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 1, "colorCode" : "blue", "row" : 5, "type" : 0 }, { "col" : 2, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 0, "colorCode" : "blue", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 5, "type" : 0 }, { "col" : 4, "colorCode" : "green", "row" : 3, "type" : 0 }, { "col" : 3, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 5, "colorCode" : "green", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 6, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 5, "type" : 0 }, { "col" : 8, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 3, "type" : 0 }, { "col" : 7, "colorCode" : "yellow", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 11, "colorCode" : "red", "row" : 4, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 10, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 5, "type" : 0 }, { "col" : 9, "colorCode" : "red", "row" : 3, "type" : 0 }, { "col" : 0, "row" : 6, "type" : 4 }, { "col" : 1, "row" : 6, "type" : 4 }, { "col" : 2, "row" : 6, "type" : 4 }, { "col" : 3, "row" : 6, "type" : 4 }, { "col" : 4, "row" : 6, "type" : 4 }, { "col" : 5, "row" : 6, "type" : 4 }, { "col" : 6, "row" : 6, "type" : 4 }, { "col" : 7, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 6, "type" : 4 }, { "col" : 9, "row" : 6, "type" : 4 }, { "col" : 10, "row" : 6, "type" : 4 }, { "col" : 11, "row" : 6, "type" : 4 }, { "col" : 8, "row" : 5, "type" : 4 }, { "col" : 8, "row" : 7, "type" : 4 }, { "col" : 5, "row" : 5, "type" : 4 }, { "col" : 5, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 7, "type" : 4 }, { "col" : 2, "row" : 5, "type" : 4 }, { "col" : 1, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 0, "colorCode" : "yellow", "row" : 7, "type" : 0 }, { "col" : 4, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 3, "colorCode" : "red", "row" : 7, "type" : 0 }, { "col" : 6, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 7, "colorCode" : "green", "row" : 7, "type" : 0 }, { "col" : 9, "colorCode" : "blue", "row" : 7, "type" : 0 }, { "col" : 10, "colorCode" : "blue", "row" : 7, "type" : 0 } ], "colors":{"red":14, "yellow":14, "blue":14, "green":14}, "meta" : { "bulbData" : [ [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0 ] ] }, "numMoves" : 15, "numRows" : 8, "queue" : { "colors" : [ 1, 1, 1, 1, 1, 1 ], "type" : "bucket" }, "timePlayed":(new Date()).getTime(), "type" : "ready" }
								},
								levelsBeaten:{"0":[{"0":"level1"},{"1":"level2"},{"2":"level3"},{"3":"level4"}]},
								//levelsBeaten:["level1","level2","level3","level4"],
								numStars:1,
								stage:0,
								streak:1
							});
						
							self.database.ref("levels/userLevels/"+self.userId).set({"0":0});
				
	  					}
	  					else
	  					{cc.log("old user");
	  						//self.editorData.userId = self.userId;
	  						//cc.director.runScene(new EditorScene(self.editorData, self.database));
						  DATA.initUserWebData(self.userId);
	  					}
	  					
					}).catch(function(error){
						var errorCode = error.code;
						var errorMessage = error.message;
						console.log(errorMessage);
						
						
						
					});
					
					
				  //this.editorData.userId = user.id;
				  //this.runScene(new EditorScene(this.editorData, this.database))
				 
				  
			  
			}).catch(function(error) {
				console.log("error");
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
			  
			  cc.log(errorMessage);
			});
			
			
			
		//});
	},
	
	runFeaturedRewardSeq:function()
	{cc.log("Streak: " + this.streak);
		//this.oldStars = this.numStars;
		//this.numStars += this.streak;cc.log("New stars: " + this.numStars);
		//this.animateStars();
		this.flyingStars = [];
		for(var i=0; i<this.winPopup.stars.length; i++)
		{
			var newStar = new cc.Sprite(res.yellow_star_emoji);
			newStar.setScale(this.winPopup.stars[i].scale);
			newStar.attr({
				x:this.winPopup.x+this.winPopup.stars[i].x,
				y:this.winPopup.y+this.winPopup.stars[i].y,
				anchorX:this.winPopup.stars[i].anchorX,
				anchorY:this.winPopup.stars[i].anchorY
			});
			this.addChild(newStar, 5);
			this.flyingStars.push(newStar);
		}
		
		var oldFace = this.winPopup.rewardFace;
		var newFace = null;
		if(this.streak == 2)
			newFace = new cc.Sprite(res.sunglass_face);
		else if(this.streak > 2)
			newFace = new cc.Sprite(res.crown_face);
		newFace.setScale((this.width/3)*.9 * .4 / newFace.width);
		newFace.attr({
			x:this.winPopup.x+oldFace.x,
			y:this.winPopup.y+oldFace.y,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(newFace);
		
		
		//var targetStar = this.panelLayer.bubblePanelLayer.nextObstacleLayer.starImg;
		var targetStar = this.levelsPanel.levelListLayer.listLayer.starGoalImg;
		for(var i=0; i<this.flyingStars.length; i++)
		{
			var moveAct = cc.moveTo(.5, this.levelsPanel.x+this.levelsPanel.levelListLayer.x+this.levelsPanel.levelListLayer.listLayer.x+targetStar.x, this.levelsPanel.y+this.levelsPanel.levelListLayer.y+this.levelsPanel.levelListLayer.listLayer.y+targetStar.y);
			var clearAction = cc.callFunc(this.flyingStars[i].removeFromParent, this.flyingStars[i]);
			var bumpStars = cc.callFunc(this.levelsPanel.levelListLayer.listLayer.bumpStars, this.levelsPanel.levelListLayer.listLayer);
			var starSeqList = [moveAct, clearAction, bumpStars];
			/*if(i == this.flyingStars.length-1)
			{
				starSeqList.push(cc.callFunc(this.readyClosePopup, this));
			}*/
			if(i == this.flyingStars.length-1)
			{cc.log("SHOULD BE CLOSING WIN STREAK SEQ");
				var seqList = [
					//cc.callFunc(this.updateNextObstacleVis, this),
					//cc.callFunc(this.updateWinStreakVis, this),
					cc.delayTime(1), 
					cc.callFunc(this.closePopup, this)
				];
				this.runAction(new cc.Sequence(seqList ));
				//this.updateStreak(Math.min(this.streak+1,3));
			}
			//this.closePopup();
			var moveStarSeq = new cc.Sequence(starSeqList);
			
			this.flyingStars[i].runAction(moveStarSeq);
		}
		
		var targetFace = this.levelsPanel.levelListLayer.listLayer.streakFace;
		newFace.runAction( new cc.Sequence( 
			cc.spawn(
				cc.moveTo(.75, this.levelsPanel.x+this.levelsPanel.levelListLayer.x+this.levelsPanel.levelListLayer.listLayer.x+targetFace.x, this.levelsPanel.y+this.levelsPanel.levelListLayer.y+this.levelsPanel.levelListLayer.listLayer.y+targetFace.y),
				cc.scaleTo(.75, targetFace.scale*targetFace.width / newFace.width, targetFace.scale*targetFace.height / newFace.height)
			),
			cc.callFunc(newFace.removeFromParent, newFace)
		));
		this.runAction(new cc.Sequence(
			cc.delayTime(.75),
			cc.callFunc(this.levelsPanel.levelListLayer.listLayer.updatePostWin, this.levelsPanel.levelListLayer.listLayer)
		));
		
		
		//this.backToEditor();
		//this.closePopup();
		
		//this.checkObstacleUnlock(this.oldStars);
		//this.oldStars = this.numStars;
	},
	
	runFeaturedLossSeq:function()
	{
		this.levelsPanel.levelListLayer.listLayer.delayLevel(1000*60*10);
		this.backToEditor();
		this.panelBackToEditor();
		this.closePopup();
	},
	
	runFeaturedTryAgainSeq:function()
	{
		this.closePopup();
		this.backToEditor();
		this.panelBackToEditor();
		this.levelsPanel.levelListLayer.listLayer.updatePostWin();
		this.showFeature();
	},
	
	increaseStars:function()
	{cc.log("here yo");
		this.updateStarCount(this.numStars+1);
		
		cc.log("Now " + this.numStats + " stars");
	},
	
	completeLevel:function()
	{
		//this.levelsPanel.levelListLayer.listLayer.completeLevel();
		
		//var featureNum = this.levelsPanel.levelListLayer.listLayer.selectedIndex;
	
		//this.dbUpdateFeature({type:"empty",timePlayed:0});
		// STUB Need to get new level
		
	},
	
	replaceFeature:function(newLevel)
	{cc.log("replacing feature");cc.log(newLevel);
		//this.features[num] = newLevel;
		
		//this.dbUpdateFeature(newLevel, num);
		
		//this.dbUpdateTrackingList(newLevel.code);
		
		//this.futureLevels[num] = null;
		this.feature = newLevel;
		cc.log("NEW FEATURE: ");cc.log(newLevel);
	},
	
	getNewLevel:function()
	{cc.log("future levels");cc.log(this.futureLevels);
		//var newLevel = this.futureLevels[0];
		//this.futureLevels.splice(0,1);
		//return newLevel;
	},
	
	getFeatureNum:function()
	{
		return this.levelsPanel.levelListLayer.listLayer.selectedIndex;
	},
	
	
	openWinPopup:function()
	{
		var type = "featured";
		this.winPopup = new WinPopup(cc.winSize.width*.3, this.height*.9, type, this.surfacedStreak);
		this.winPopup.attr({
			//x:this.width/2-(this.winPopup.width/2),
			//y:this.height/2-(this.winPopup.height/2),
			x:this.width/2,
			y:this.height/2,
			anchorX:0,
			anchorY:0
		});
		
		this.winPopup.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveAction = cc.moveTo(.5, this.width/2-(this.winPopup.width/2), this.height/2-(this.winPopup.height/2));
		var spawn = cc.spawn(scaleAction, moveAction);
		
		this.addChild(this.winPopup);
		this.winPopup.runAction(spawn);
		
		
		//this.panelBackToEditor();
	},
	
	openLosePopup:function()
	{
		this.losePopup = new LosePopup(cc.winSize.width*.3, this.height*.9, this.streak, this.challengeTries);
		this.losePopup.attr({
			//x:this.width/2-(this.losePopup.width/2),
			//y:this.height/2-(this.losePopup.height/2),
			x:this.width/2,
			y:this.height/2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.losePopup);
		
		this.losePopup.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveAction = cc.moveTo(.5, this.width/2-(this.losePopup.width/2), this.height/2-(this.losePopup.height/2));
		var spawn = cc.spawn(scaleAction, moveAction);
		
		this.addChild(this.losePopup);
		this.losePopup.runAction(spawn);
		
		
		//this.panelBackToEditor();
	},
	
	openQuitWithoutSavingPopup:function(actionObj)
	{cc.log("OPENING QUITWITHOUTSAVING");
		this.quitWithoutSavingPopup = new QuitWithoutSavingPopup(this.width*.3, this.height*.2);
		this.quitWithoutSavingPopup.attr({
			x:this.width/2 - this.quitWithoutSavingPopup.width/2,
			y:this.height/2 - this.quitWithoutSavingPopup.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.quitWithoutSavingPopup);
		
		this.quitWithoutSavingAction = actionObj;
		
	},
	
	openSocialLoginPopup:function()
	{
		this.socialLoginPopup = new SocialLoginPopup(cc.winSize.width*.3, this.height*.9);
		this.socialLoginPopup.attr({
			//x:this.width/2-(this.losePopup.width/2),
			//y:this.height/2-(this.losePopup.height/2),
			x:this.width/2,
			y:this.height/2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.socialLoginPopup);
		
		this.socialLoginPopup.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveAction = cc.moveTo(.5, this.width/2-(this.socialLoginPopup.width/2), this.height/2-(this.socialLoginPopup.height/2));
		var spawn = cc.spawn(scaleAction, moveAction);
		
		this.addChild(this.socialLoginPopup);
		this.socialLoginPopup.runAction(spawn);
		
		
		//this.panelBackToEditor();
	},
	
	executeQuitAction:function()
	{cc.log(this.quitWithoutSavingAction);
		if(this.quitWithoutSavingAction != null)
		{
			if(this.quitWithoutSavingAction.type == "folder")
			{
				this.loadLevel("created", this.quitWithoutSavingAction.number);
			}
			else if(this.quitWithoutSavingAction.type == "featured")
			{
				this.showFeature();
				//this.levelsPanel.levelListLayer.listLayer.openButCheckForWatch(this.quitWithoutSavingAction.number);
				
			}
		}
		this.quitWithoutSavingAction = null;
		this.closePopup();
	},
	
	
	openSavePopup:function()
	{
		this.savePopup = new SavePopup(cc.winSize.width*.3, this.height*.9);
		this.savePopup.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.savePopup);
		
		this.savePopup.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveAction = cc.moveTo(.5, this.width/2-(this.savePopup.width/2), this.height/2-(this.savePopup.height/2));
		var spawn = cc.spawn(scaleAction, moveAction);
		
		this.addChild(this.savePopup);
		this.savePopup.runAction(spawn);
	},
	
	openWhenGonePopup:function()
	{
		this.whenGonePopup = new WhenGonePopup(cc.winSize.width*.3, this.height*.9);
		this.whenGonePopup.attr({
			//x:this.width/2-(this.whenGonePopup.width/2),
			//y:this.height/2-(this.whenGonePopup.height/2),
			x:this.width/2,
			y:this.height/2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.whenGonePopup);
		
		this.whenGonePopup.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveAction = cc.moveTo(.5, this.width/2-(this.whenGonePopup.width/2), this.height/2-(this.whenGonePopup.height/2));
		var spawn = cc.spawn(scaleAction, moveAction);
		
		this.addChild(this.whenGonePopup);
		this.whenGonePopup.runAction(spawn);
	},
	
	openObstaclePopup:function(num)
	{cc.log("opening obstacle popup");
		this.newObstaclePopup = new NewObstaclePopup(cc.winSize.width*.3, this.height*.9, num);
		this.newObstaclePopup.attr({
			//x:this.width/2-(this.newObstaclePopup.width/2),
			//y:this.height/2-(this.newObstaclePopup.height/2),
			x:this.width/2,
			y:this.height/2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.newObstaclePopup);
		
		this.newObstaclePopup.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveAction = cc.moveTo(.5, this.width/2-(this.newObstaclePopup.width/2), this.height/2-(this.newObstaclePopup.height/2));
		var spawn = cc.spawn(scaleAction, moveAction);
		
		this.addChild(this.newObstaclePopup);
		this.newObstaclePopup.runAction(spawn);
	},
	
	openInfoPopup:function()
	{
		this.infoPopup = new InfoPopup(cc.winSize.width*.3, this.height*.9);
		this.infoPopup.attr({
			//x:this.width/2-(this.infoPopup.width/2),
			//y:this.height/2-(this.infoPopup.height/2),
			x:this.width/2,
			y:this.height/2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.infoPopup);
		
		this.infoPopup.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveAction = cc.moveTo(.5, this.width/2-(this.infoPopup.width/2), this.height/2-(this.infoPopup.height/2));
		var spawn = cc.spawn(scaleAction, moveAction);
		
		this.addChild(this.infoPopup);
		this.infoPopup.runAction(spawn);
	},
	
	openQuitPopup:function()
	{
		this.quitPopup = new QuitPopup(cc.winSize.width*.3, this.height*.9);
		this.quitPopup.attr({
			//x:this.width/2-(this.quitPopup.width/2),
			//y:this.height/2-(this.quitPopup.height/2),
			x:this.width/2,
			y:this.height/2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.quitPopup);
		
		this.quitPopup.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveAction = cc.moveTo(.5, this.width/2-(this.quitPopup.width/2), this.height/2-(this.quitPopup.height/2));
		var spawn = cc.spawn(scaleAction, moveAction);
		
		this.addChild(this.quitPopup);
		this.quitPopup.runAction(spawn);
	},
	
	openWatchPopup:function()
	{
		this.watchPopup = new WatchAdPopup(cc.winSize.width*.3, this.height*.9);
		this.watchPopup.attr({
			//x:this.width/2-(this.watchPopup.width/2),
			//y:this.height/2-(this.watchPopup.height/2),
			x:this.width/2,
			y:this.height/2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.watchPopup);
		
		this.watchPopup.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveAction = cc.moveTo(.5, this.width/2-(this.watchPopup.width/2), this.height/2-(this.watchPopup.height/2));
		var spawn = cc.spawn(scaleAction, moveAction);
		
		this.addChild(this.watchPopup);
		this.watchPopup.runAction(spawn);
	},
	
	postWinClose:function()
	{
		var seqList = [
			cc.callFunc(this.backToEditor, this),
			cc.callFunc(this.panelBackToEditor, this),
			cc.callFunc(this.checkObstacleUnlock, this),
			cc.callFunc(this.resetOldData, this)
		];
		this.runAction(new cc.Sequence(seqList));
	},
	
	resetOldData:function()
	{	
		this.surfacedStreak = this.streak;
		this.surfacedNumStars = this.numStars;
	},
	
	updateNextObstacleVis:function()
	{
		//this.panelLayer.bubblePanelLayer.nextObstacleLayer.refresh(this.numStars);
		this.newObstaclePopup = null;
		
	},
	
	updateWinStreakVis:function()
	{
	//	this.levelsPanel.levelListLayer.listLayer.updateStreakVis(this.streak, this.challengeTries, this.numLevelsBeat);
	
	},
	
	isPopup:function()
	{
		if(this.winPopup != null || this.losePopup != null || this.quitWithoutSavingPopup != null || this.socialLoginPopup != null || this.whenGonePopup != null || this.newObstaclePopup != null || this.infoPopup != null || this.quitPopup != null || this.watchPopup != null)
		{
			return true;
		}
		return false;
	},
	
	closePopup:function()
	{cc.log(this.socialLoginPopup);
		if(this.winPopup != null)
		{cc.log("REMOVING WIN POPUP YO");
			var moveAction = cc.moveTo(.5, this.width/2, this.height/2);
			var scaleAction = cc.scaleTo(.5, 0, 0);
			var goAwaySpawn = cc.spawn(moveAction, scaleAction);
			var clearAction = cc.callFunc(this.winPopup.removeFromParent, this.winPopup);
			var goBackAction = cc.callFunc(this.postWinClose, this);
			var seq = new cc.Sequence(goAwaySpawn, clearAction, goBackAction);
			this.winPopup.runAction(seq);
			
			
					
			
			//this.removeChild(this.winPopup);
			this.winPopup = null;
			
		}
		else if(this.losePopup != null)
		{
			var moveAction = cc.moveTo(.5, this.width/2, this.height/2);
			var scaleAction = cc.scaleTo(.5, 0, 0);
			var goAwaySpawn = cc.spawn(moveAction, scaleAction);
			var clearAction = cc.callFunc(this.losePopup.removeFromParent, this.losePopup);
			var seq = new cc.Sequence(goAwaySpawn, clearAction);
			this.losePopup.runAction(seq);
			
			
			
			//this.removeChild(this.losePopup);
			this.losePopup = null;
		}
		else if(this.quitWithoutSavingPopup != null)
		{
			this.removeChild(this.quitWithoutSavingPopup);
			this.quitWithoutSavingPopup = null;
		}
		else if(this.whenGonePopup != null)
		{
			var moveAction = cc.moveTo(.5, this.width/2, this.height/2);
			var scaleAction = cc.scaleTo(.5, 0, 0);
			var goAwaySpawn = cc.spawn(moveAction, scaleAction);
			var clearAction = cc.callFunc(this.whenGonePopup.removeFromParent, this.whenGonePopup);
			var seq = new cc.Sequence(goAwaySpawn, clearAction);
			this.whenGonePopup.runAction(seq);
			
			//this.removeChild(this.whenGonePopup);
			this.whenGonePopup = null;
		}
		else if(this.socialLoginPopup != null)
		{cc.log("CLOSE SOCIAL LOGIN");
			var moveAction = cc.moveTo(.5, this.width/2, this.height/2);
			var scaleAction = cc.scaleTo(.5, 0, 0);
			var goAwaySpawn = cc.spawn(moveAction, scaleAction);
			var clearAction = cc.callFunc(this.socialLoginPopup.removeFromParent, this.quitPopup);
			//var callPlayTutorial = cc.callFunc(this.addPlayTutorial, this);
			var seq = new cc.Sequence(goAwaySpawn, clearAction/*, callPlayTutorial*/);
			this.socialLoginPopup.runAction(seq);
			
			//this.removeChild(this.quitPopup);
			this.socialLoginPopup = null;
		}
		else if(this.newObstaclePopup != null)
		{
			//run sequence animating obstacle addition
			//then call function which runs closing sequence
			var row = 0;
			var col = 0;
			var obstIndex = this.newObstaclePopup.obstacleNum;
			var obstSprite = null;
			if(obstIndex == 1)
			{
				row = 1;
				col = 0;
				obstSprite = new cc.Sprite(res.soap_emoji);
			}
			else if(obstIndex == 2)
			{
				row = 1;
				col = 1;
				obstSprite = new cc.Sprite(res.bomb_emoji);
			}
			else if(obstIndex == 3)
			{
				row = 1;
				col = 2;
				obstSprite = new cc.Sprite(res.red_snail_emoji);
			}
			else if(obstIndex == 4)
			{
				row = 1;
				col = 3;
				obstSprite = new cc.Sprite(res.bubble_wrap_emoji);
			}
			else if(obstIndex == 5)
			{
				row = 1;
				col = 4;
				obstSprite = new cc.Sprite(res.red_die_emoji);
			}
			else if(obstIndex == 6)
			{
				row = 1;
				col = 5;
				obstSprite = new cc.Sprite(res.cloud_emoji);
			}
			else if(obstIndex == 7)
			{
				row = 1;
				col = 6;
				obstSprite = new cc.Sprite(res.neutral_orb_emoji);
			}
			else if(obstIndex == 8)
			{
				row = 2;
				col = 0;
				obstSprite = new cc.Sprite(res.red_egg);
			}
			else if(obstIndex == 9)
			{
				row = 2;
				col = 1;
				obstSprite = new cc.Sprite(res.left_dagger_emoji);
			}
			else if(obstIndex == 10)
			{
				row = 2;
				col = 2;
				obstSprite = new cc.Sprite(res.red_bulb_emoji);
			}
			else if(obstIndex == 11)
			{
				row = 2;
				col = 3;
				obstSprite = new cc.Sprite(res.red_ghost_emoji);
			}
			else if(obstIndex == 12)
			{
				row = 2;
				col = 4;
				obstSprite = new cc.Sprite(res.red_balloon_emoji);
			}
			else if(obstIndex == 13)
			{
				row = 2;
				col = 5;
				obstSprite = new cc.Sprite(res.red_soapbar_emoji);
			}
			
			var oldObst = this.newObstaclePopup.obstacleImg;
			
			obstSprite.setScale(oldObst.scale);
			obstSprite.attr({
				x:this.newObstaclePopup.x+oldObst.x,
				y:this.newObstaclePopup.y+oldObst.y,
				anchorX:oldObst.anchorX,
				anchorY:oldObst.anchorY
			});
			this.addChild(obstSprite);
			
			// actions to move obstacleImg
			//var moveAct = cc.moveTo(.5, this.panelLayer.x+this.panelLayer.bubblePanelLayer.x+this.panelLayer.bubblePanelLayer.nextObstacleLayer.x+targetStar.x, this.panelLayer.y+this.panelLayer.bubblePanelLayer.y+this.panelLayer.bubblePanelLayer.nextObstacleLayer.y+targetStar.y);
			var bubSize = this.panelLayer.bubblePanelLayer.drawLayer.bubbleSize;
			cc.log("xOffset: "+bubSize*col);
			cc.log(this.panelLayer.x+this.panelLayer.bubblePanelLayer.x+this.panelLayer.bubblePanelLayer.drawLayer.x/*+(col*bubSize)*/);
			var moveObstAction = cc.moveTo(1, 
				this.panelLayer.x+this.panelLayer.bubblePanelLayer.x+this.panelLayer.bubblePanelLayer.drawLayer.x+(col*bubSize)+(bubSize),
				this.panelLayer.y+this.panelLayer.bubblePanelLayer.y+this.panelLayer.bubblePanelLayer.drawLayer.y+this.panelLayer.bubblePanelLayer.drawLayer.height-bubSize
			);
			//var dumImg = new cc.Sprite(res.smile_emoji);
			//var smallScale = this.panelLayer.bubblePanelLayer.drawLayer.bubbleSize / dumImg.width;
			var dumEmoji = this.panelLayer.bubblePanelLayer.drawLayer.emojis[0][0];
			
			var scaleObstAction = cc.scaleTo(1, bubSize / obstSprite.width, bubSize / obstSprite.height);
			//var scaleObstAction = cc.scaleTo(.5, .1, .1);
			
			var moveSpawn = cc.spawn(moveObstAction, scaleObstAction);
			var obstSeq = new cc.Sequence(moveSpawn, cc.callFunc(obstSprite.removeFromParent, obstSprite));
			obstSprite.runAction(obstSeq);
			//obstSprite.runAction(moveSpawn);
			
			
			this.runAction(new cc.Sequence(cc.delayTime(1), cc.callFunc(this.addObstacleToPanel, this)/*, cc.callFunc(this.updateNextObstacleVis, this)*/ ));
			
			var movePopupAction = cc.moveTo(.5, this.width/2, this.height/2);
			var scalePopupAction = cc.scaleTo(.5, 0, 0);
			var goAwaySpawn = cc.spawn(movePopupAction, scalePopupAction);
			var clearPopupAction = cc.callFunc(this.newObstaclePopup.removeFromParent, this.newObstaclePopup);
			var seq = new cc.Sequence(cc.delayTime(1.5), goAwaySpawn, clearPopupAction);
			this.newObstaclePopup.runAction(seq);
			
			this.newObstaclePopup = null;
			//(this.numStars);
			
			
			//this.removeChild(this.newObstaclePopup);
			//this.newObstaclePopup = null;
		}
		else if(this.infoPopup != null)
		{
			var moveAction = cc.moveTo(.5, this.width/2, this.height/2);
			var scaleAction = cc.scaleTo(.5, 0, 0);
			var goAwaySpawn = cc.spawn(moveAction, scaleAction);
			var clearAction = cc.callFunc(this.infoPopup.removeFromParent, this.infoPopup);
			var seq = new cc.Sequence(goAwaySpawn, clearAction);
			this.infoPopup.runAction(seq);
			
			//this.removeChild(this.infoPopup);
			this.infoPopup = null;
		}
		else if(this.quitPopup != null)
		{
			var moveAction = cc.moveTo(.5, this.width/2, this.height/2);
			var scaleAction = cc.scaleTo(.5, 0, 0);
			var goAwaySpawn = cc.spawn(moveAction, scaleAction);
			var clearAction = cc.callFunc(this.quitPopup.removeFromParent, this.quitPopup);
			var seq = new cc.Sequence(goAwaySpawn, clearAction);
			this.quitPopup.runAction(seq);
			
			//this.removeChild(this.quitPopup);
			this.quitPopup = null;
			
			if(this.quitWithoutFinishingAction != null)
			{
				if(this.quitWithoutFinishingAction.type == "folder")
				{
					this.loadLevel("created", this.quitWithoutFinishingAction.number);
				}
				
				
				this.quitWithoutFinishingAction = null;
			}
		}
		else if(this.watchPopup != null)
		{
			var moveAction = cc.moveTo(.5, this.width/2, this.height/2);
			var scaleAction = cc.scaleTo(.5, 0, 0);
			var goAwaySpawn = cc.spawn(moveAction, scaleAction);
			var clearAction = cc.callFunc(this.watchPopup.removeFromParent, this.watchPopup);
			var seq = new cc.Sequence(goAwaySpawn, clearAction);
			this.watchPopup.runAction(seq);
			
			//this.removeChild(this.watchPopup);
			this.watchPopup = null;
		}
	},
	
	addPlayTutorial:function()
	{
		
		
		var playButton = this.levelsPanel.levelListLayer.listLayer.playButton;
		var playButtonX = this.levelsPanel.x+this.levelsPanel.levelListLayer.x+this.levelsPanel.levelListLayer.listLayer.x+this.levelsPanel.levelListLayer.listLayer.playButton.x;
		var playTutWidth = this.width/2.7;
		var playTutHeight = (playButton.height*playButton.scale)*1.5;
		var rightPoint = this.levelsPanel.x+this.levelsPanel.levelListLayer.x;
		var leftPoint = rightPoint-playTutWidth;
		var midPoint = this.levelsPanel.y+this.levelsPanel.levelListLayer.y+this.levelsPanel.levelListLayer.listLayer.y+playButton.y+(playButton.height*playButton.scale/2);
		
		this.playTutorialDn = new cc.DrawNode();
		this.addChild(this.playTutorialDn);
		this.playTutorialDn.drawRect(
			cc.p(leftPoint, midPoint-playTutHeight/2),
			cc.p(rightPoint, midPoint+playTutHeight/2),
			cc.color(255,255,255,255),
			4,cc.color(0,0,0,255)
		);
		
		this.playTutorial = new cc.LabelTTF("Click here to play!", "HeaderFont", Math.floor(this.height*.07));
		this.playTutorial.color = cc.color(0,0,0,255);
		this.playTutorial.attr({
			x:leftPoint+playTutWidth/2,
			y:midPoint+Math.floor(this.height*.07)/2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.playTutorial);
		
		this.playTutorialArrow = new cc.Sprite(res.tutorial_arrow_left);
		this.playTutorialArrow.flippedX = true;
		this.playTutorialArrow.setScale(playTutHeight*.9 / this.playTutorialArrow.height);
		this.playTutorialArrow.attr({
			x:rightPoint,
			y:midPoint,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.playTutorialArrow);
		
		this.playTutorialArrow.runAction(
			new cc.RepeatForever(new cc.Sequence(
				cc.moveTo(.5, playButtonX-(playButton.width*playButton.scale/2), midPoint),
				cc.moveTo(.5, rightPoint, midPoint)
			))	
		);
		
		
		
	},
	
	addObstacleToPanel:function()
	{
		
		//this.panelLayer.bubblePanelLayer.drawLayer.addObstacle(this.numStars);
		this.panelLayer.bubblePanelLayer.resetDrawLayer();
		
		this.levelsPanel.levelListLayer.listLayer.initNextObstacle();
		
		
	},
	
	onTouchBegan:function(pos)
	{this.touchDownFlag = true;
		
		if(this.isPopup())
		{
			
		}
		else if(pos.x < this.panelLayer.width)
		{
			this.panelLayer.onTouchBegan(this.panelLayer.convertToNodeSpace(pos));
		}
		else if(pos.x < this.editorLayer.x+this.editorLayer.width)
		{
			if(this.mode == "edit")
				this.editorLayer.onTouchBegan(pos);//(this.editorLayer.convertToNodeSpace(pos));
			else if(this.mode == "play")
				this.gameLayer.onTouchBegan(pos);
		}
		else if(pos.x < this.levelsPanel.x+this.levelsPanel.width)
		{
			
		}
	},
	
	onTouchMoved:function(pos)
	{
		if(this.isPopup())
		{
			
		}
		else if(this.touchDownFlag)
		{
			if(pos.x < this.panelLayer.width)
			{
				this.panelLayer.onTouchMoved(this.panelLayer.convertToNodeSpace(pos));
			}
			else if(pos.x < this.editorLayer.x+this.editorLayer.width)
			{
				if(this.mode == "edit")
					this.editorLayer.onTouchMoved(pos);//(this.editorLayer.convertToNodeSpace(pos));
				else if(this.mode == "play")
					this.gameLayer.onTouchMoved(pos);
			}
			else if(pos.x < this.levelsPanel.x+this.levelsPanel.width)
			{
				
			}
		}
	},
	
	onTouchEnded:function(pos)
	{this.touchDownFlag = false;
		
		if(this.playTutorial != null)
		{
			this.removeChild(this.playTutorial);
			this.playTutorialDn.clear();
			this.removeChild(this.playTutorialDn);
			this.playTutorialArrow.stopAllActions();
			this.removeChild(this.playTutorialArrow);
			
			this.playTutorial = null;
			this.playTutorialDn = null;
			this.playTutorialArrow = null;
		}
		
		if(this.isPopup())
		{cc.log("is popup");
		
			if(pos.x < this.editorLayer.x || pos.x > this.editorLayer.x+this.editorLayer.width)
			{
				if(this.watchPopup != null)
				{
					this.backToEditor();
					this.panelLayer.replacePlayWithEditor();
				}
				this.closePopup();
				
				
			}
			else
			{
				if(this.winPopup != null)
				{
					this.winPopup.onTouchEnded(this.winPopup.convertToNodeSpace(pos));
				}
				else if(this.losePopup != null)
				{
					this.losePopup.onTouchEnded(this.losePopup.convertToNodeSpace(pos));
				}
				else if(this.quitWithoutSavingPopup != null)
				{
					this.quitWithoutSavingPopup.onTouchEnded(this.quitWithoutSavingPopup.convertToNodeSpace(pos));
				}
				else if(this.whenGonePopup != null)
				{
					this.whenGonePopup.onTouchEnded(this.whenGonePopup.convertToNodeSpace(pos));
				}
				else if(this.socialLoginPopup != null)
				{
					this.socialLoginPopup.onTouchEnded(this.socialLoginPopup.convertToNodeSpace(pos));
				}
				else if(this.newObstaclePopup != null)
				{
					this.newObstaclePopup.onTouchEnded(this.newObstaclePopup.convertToNodeSpace(pos));
				}
				else if(this.infoPopup != null)
				{
					this.infoPopup.onTouchEnded(this.infoPopup.convertToNodeSpace(pos));
				}
				else if(this.quitPopup != null)
				{
					this.quitPopup.onTouchEnded(this.quitPopup.convertToNodeSpace(pos));
				}
				else if(this.watchPopup != null)
				{
					this.watchPopup.onTouchEnded(this.watchPopup.convertToNodeSpace(pos));
				}
			}
		}
		else if(pos.x < this.panelLayer.width)
		{
			
				if(this.loginTut != null)
				{
					this.removeChild(this.loginTut);
					this.removeChild(this.makeLevelTut);
					this.removeChild(this.playLevelTut);
					this.loginTut = null;
					this.makeLevelTut = null;
					this.playLevelTut = null;
				}
				this.panelLayer.onTouchEnded(this.panelLayer.convertToNodeSpace(pos));
	
			
		}
		else if(pos.x < this.editorLayer.x+this.editorLayer.width)
		{
			if(this.mode == "edit")
				this.editorLayer.onTouchEnded(pos);//(this.editorLayer.convertToNodeSpace(pos));
			else if(this.mode == "play")
				this.gameLayer.onTouchEnded(pos);
		}
		else if(pos.x < this.levelsPanel.x+this.levelsPanel.width)
		{
			
				if(this.loginTut != null)
				{
					this.removeChild(this.loginTut);
					this.removeChild(this.makeLevelTut);
					this.removeChild(this.playLevelTut);
					this.loginTut = null;
					this.makeLevelTut = null;
					this.playLevelTut = null;
				}
				this.levelsPanel.onTouchEnded(this.levelsPanel.convertToNodeSpace(pos));
			}
		
		
	},
	// generic call to save drawn level (ex: from menubar)
	saveLevel:function()
	{cc.log("SAVE LEVEL");
		if(this.editorLayer.levelId == null)
		{
			// save as new level
			this.editorLayer.saveAsNewLevel();
		}
		else
		{
			// override level
			//this.editorLayer.overwriteLevel(this.editorLayer.levelId);
			this.updateOldCreatedLevel();
		}
		
		
		if(this.quitWithoutSavingAction == null)
		{
			if(this.levelsPanel.levelListLayer.selectedIndex != 3)
			{
				//this.levelsPanel.levelListLayer.removeFriendsUI();//removeswhatever
				//this.levelsPanel.levelListLayer.addFolderUI();
				this.levelsPanel.levelListLayer.onTouchEnded({x:this.levelsPanel.levelListLayer.folderImg.x-5, y:this.levelsPanel.levelListLayer.folderImg.y-5});
			}
		}
		
		
	},
	
	
	
	getSelectedLevelCode:function()
	{
		//if(this.levelsPanel.levelListLayer.selectedIndex == 3)
		//{
			cc.log(this.levelsPanel.levelListLayer.listLayer.curSelected);
			cc.log(this.userLevels);
			return ""+this.userLevels[this.levelsPanel.levelListLayer.listLayer.curSelected].code;
			
			
		//}
	},
	
	editLevel:function()
	{
		var levelIndex = this.levelsPanel.levelListLayer.listLayer.curSelected;
		var userLevel = this.userLevels[levelIndex];
		
		this.editorLayer.turnBrowserIntoEditor(userLevel);
		
		this.panelBackToEditor();
		this.editorLayer.resetMenuBar();
	},
	
	shareLevel:function(link)
	{cc.log(link);
		openShareForm(link);
	},
	
	
	playForeignLevel:function(levelData)
	{cc.log(levelData);
		this.mode = "play";
		this.gameLayer = new GameplayLayer(levelData.bubbles, levelData.numRows, this.editorLayer.height, {}, cc.winSize.width/3, levelData.numMoves, "created", levelData.colors, this.numStars, this.database, this.userId);
		this.gameLayer.attr({
			x:cc.winSize.width/3,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.gameLayer);
		
		this.removeChild(this.editorLayer);
		
		this.foreignLevel = levelData;
		
		this.panelLayer.replaceEditorWithPlay("test", -2);
	},
	
	playLevel:function(type)
	{
		this.playType = type;
		this.mode = "play";
		this.removeChild(this.editorLayer);
		cc.log(this.playType);
		
		if(this.playType == "new")
		{
			var numMoves = this.curCreatedMoves;
			//numMoves = this.panelLayer.bubblePanelLayer.numMoves;
			
			
			
			
			this.gameLayer = new GameplayLayer(this.editorLayer.bubbleLayer.bubbles, this.curCreatedRows/*this.editorLayer.bubbleLayer.getNumRows()*//*this.editorLayer.bubbleLayer.numRows*/, this.editorLayer.height, {}, cc.winSize.width/3, numMoves, "created", this.editorLayer.bubbleLayer.emojiGoals, this.numStars, this.database, this.userId);
			this.gameLayer.attr({
				x:cc.winSize.width/3,
				y:0,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.gameLayer);
			
			this.panelLayer.replaceEditorWithPlay("test", -1);
		
		
		}
		else if(this.playType == "feature")
		{
			//wwwwwwwwww
			
			if(!this.featureInProg)
			{
				this.gameLayer = new GameplayLayer(this.editorLayer.bubbleLayer.bubbles, this.editorLayer.bubbleLayer.numRows, this.editorLayer.height, {}, cc.winSize.width/3, this.editorData.features[number].numMoves, "featured", this.editorData.features[number].colors, this.numStars, this.database, this.userId);	// I CHANGED THIS USED SIZE
				this.gameLayer.attr({
					x:cc.winSize.width/3,
					y:0,
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.gameLayer);
				
				this.panelLayer.replaceEditorWithPlay("featured", this.curSelectedLevelIndex);
			}
			else
			{
				cc.log("STUB! POPUP ARE YOU SURE YOU WANT TO QUIT");
			}
		
		}
		else if(this.playType == "world")
		{
			if(!this.featureInProg)
			{
				this.gameLayer = new GameplayLayer(this.world.bubbles, this.worldNumRows, cc.winSize.height, {}, cc.winSize.width/3, this.worldNumMoves, "world", ["red","yellow","blue"], this.numStars, this.database, this.userId);	// I CHANGED THIS USED SIZE
				this.gameLayer.attr({
					x:cc.winSize.width/3,
					y:0,
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.gameLayer);
				
				this.panelLayer.replaceEditorWithPlay("featured", this.curSelectedLevelIndex);
			}
			else
			{
				cc.log("STUB! POPUP ARE YOU SURE YOU WANT TO QUIT");
			}
		}
		else if(this.playType == "created")
		{
			if(!this.featureInProg)
			{
			
				var copyBubbles = [];
				for(var i=0; i<this.userLevels[this.curSelectedLevelIndex].bubbles.length; i++)
				{
					var bub = this.userLevels[this.curSelectedLevelIndex].bubbles[i];
					
					var newBub = {"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":bub.colorCode,"meta":bub.meta};
					copyBubbles.push(newBub);
				}
				
				
				this.gameLayer = new GameplayLayer(copyBubbles, this.userLevels[this.curSelectedLevelIndex].numRows, this.editorLayer.height, {}, cc.winSize.width/3, this.userLevels[this.curSelectedLevelIndex].numMoves, "created", this.userLevels[this.curSelectedLevelIndex].colors, this.numStars, this.database, this.userId);	// I CHANGED THIS USED SIZE
				this.gameLayer.attr({
					x:cc.winSize.width/3,
					y:0,
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.gameLayer);
				
				this.panelLayer.replaceEditorWithPlay("test", this.curSelectedLevelIndex);
			
			}
			else
			{
				cc.log("STUB! POPUP ARE YOU SURE YOU WANT TO QUIT");
			}
			
		}
	},
	
	showFeature:function()
	{cc.log(this.feature);
		this.playType = "feature";

		if(this.mode == "edit")
		{
			this.removeChild(this.editorLayer);
			//this.editorLayer = null;
		}
		else if(this.mode == "play")
		{
			this.removeChild(this.gameLayer);
			//this.gameLayer = null;
		}
		this.mode = "play";
		//this.removeChild(this.levelsPanel);
		//this.gameLayer = new GameplayLayer(this.editorLayer.bubbleLayer.bubbles, this.editorLayer.bubbleLayer.numRows, this.editorLayer.height, {}, cc.winSize.width/3);
		
		cc.log(this.feature);
		
		var newBubbles = [];
		for(var i=0; i<this.feature.bubbles.length; i++)
		{
			var dBub = this.feature.bubbles[i];
			var newBub = {row:dBub.row, col:dBub.col, type:dBub.type};
			var colorCode = dBub.colorCode;
			if(colorCode === undefined)
				colorCode = null;
			newBub.colorCode = colorCode;
			
			if("orientation" in dBub)
				newBub.orientation = dBub.orientation;
			if("binary" in dBub)
				newBub.binary = dBub.binary;
			
			newBubbles.push(newBub);
			
		}
		
		this.gameLayer = new GameplayLayer(newBubbles,this.feature.numRows, cc.winSize.height, {}, cc.winSize.width/3, this.feature.numMoves, "feature", this.feature.colors, this.numStars, this.database, this.userId);
		this.gameLayer.attr({
			x:cc.winSize.width/3,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.gameLayer);
		/*this.gameLayer = new BubbleLayer(this.editorLayer.bubbleLayer.bubbles, this.editorLayer.bubbleLayer.numRows, this.editorData.features[number].numMoves, "world", cc.winSize.width/3, this.height, [], {});
		this.gameLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.gameLayer);*/
		
		this.panelLayer.replaceEditorWithPlay("feature", -1);
		this.levelsPanel.levelListLayer.listLayer.initMoveCount(this.feature.numMoves);
	},
	
	loadLevel:function(type, number)
	{cc.log("loading level");
		this.curSelectedLevelIndex = number;
		if(type == "feature")
		{
			this.editorLayer.openFeatureLevel(number, this.featureInProg);
		}
		else if(type == "created")
		{
			
			cc.log("loading created level");//cc.log(DATA.createdLevels[number]);
			//this.editorLayer.bubbleLayer.addBubbles(DATA.createdLevels[number]);
			//this.editorLayer.bubbleLayer.initLevel(DATA.createdLevels[number]);
			
			this.editorLayer.openCreatedLevel(number);
			
			this.panelLayer.replaceEditorWithPlay("test",number);
			//this.panelLayer.replaceEditorWith
			
			
			this.editorLayer.menuBarLayer.addPlayButton();
			this.editorLayer.menuBarLayer.addEditButton();
			this.editorLayer.menuBarLayer.addShareButton();
			this.editorLayer.menuBarLayer.changeType("edit");
			
			//this.editorLayer.menuBarLayer.ready
		}
	},
	
	/*loadIdentifiedLevel:function(levelData)
	{
		this.editorLayer.openIdentifiedLevel(levelData);
	},*/
	
	firstMoveMade:function()
	{
		if(this.playType != "created")
		{
			var dt = new Date();
			//this.dbUpdateFeatureAttempt(this.getFeatureNum(), "wait", dt.getTime());
			//this.dbUpdateStreak(1);
			
			//this.levelsPanel.levelListLayer.setLevelInProgress();
			
			if(!this.featureInProg)
			{
				this.updateChallengeTries(this.challengeTries+1);
				
				var streakOff = 0;
				//if(this.streak == 2)
				//	streakOff+=1;
				
				if(this.challengeTries >= this.streak+streakOff)
				{
					this.updateResetTime((new Date()).getTime()+(1000*60*10));
				}
				//this.dbPretendPlayerLost();
			}
			
			
			this.featureInProg = true;
		}
	},
	/*
	dbPretendPlayerLost:function()
	{
		
		var newChallengeTries = this.challengeTries+1;
		var newStreak = this.streak;
		if(newChallengeTries >= newStreak)
		{
			newStreak = 1;
			newChallengeTries = 0;
			this.database.ref("users/"+this.userId+"/resetTime").set( (new Date()).getTime() + (1000*60*10)   );
		
			//this.updateFeatureAfterWin();
			if(this.streak != newStreak)
				this.database.ref("users/"+this.userId+"/streak").set(newStreak);
		}
		this.database.ref("users/"+this.userId+"/challengeTries").set(newChallengeTries);
		
	},
	*/
	quitTestLevel:function()
	{
		this.backToEditor();
		this.panelBackToEditor();
	},
	
	backToEditor:function()
	{
		this.mode = "edit";
		
		
		if(this.gameLayer != null)
			this.removeChild(this.gameLayer);
		else if(this.editorLayer != null)
			this.removeChild(this.editorLayer);
		
		cc.log(this.editorData);
		this.editorLayer = new EditorLayer(cc.winSize.width/3, cc.winSize.height, this.editorData, this.curCreatedBubbles, this.curCreatedRows);
		this.editorLayer.attr({x:cc.winSize.width/3, y:0});
		this.addChild(this.editorLayer);
		
		if(this.gameLayer != null)
			this.gameLayer = null;
		
		//this.panelLayer = new EditorPanel(cc.winSize.width/3, cc.winSize.height);
		//this.panelLayer.attr({x:0, y:0});
		//this.addChild(this.panelLayer);
		
		this.featureInProg = false;
		
	},
	
	addEditorBubble:function(row, col, bubble)
	{
		this.curCreatedBubbles[""+row+"_"+col] = bubble;
		cc.log(this.curCreatedBubbles);
		
		if(row+1 > this.curCreatedRows)
		{
			this.curCreatedRows = row+1;
		}
	},
	
	removeEditorBubble:function(row, col)
	{
		delete this.curCreatedBubbles[""+row+"_"+col];
	},
	
	getMatchTarget:function(colorCode)
	{
		//var emojiImg = this.panelLayer.playSideLayer.getEmojiImgOfColor(colorCode);
		
		//return {x:emojiImg.x-this.panelLayer.playSideLayer.width, y:this.panelLayer.y+this.panelLayer.playSideLayer.y+emojiImg.y}
		return {x:50, y:50};
	},
	
	isAnEmojiEliminated:function()
	{
		return this.panelLayer.playSideLayer.isAnEmojiEliminated();
	},
	
	tickMoves:function(numMoves)
	{cc.log(this.playType);
		if(this.playType == "featured" || this.playType == "feature")
		{
			if(this.panelLayer.playSideLayer != null)
				this.panelLayer.playSideLayer.updateNumMoves(numMoves);
				
			//this.levelsPanel.levelListLayer.listLayer.updateMoveCount(numMoves);
			this.levelsPanel.levelListLayer.listLayer.numMoves = numMoves;
			
			if(this.levelsPanel.levelListLayer.selectedIndex != 0)
			{cc.log("not 0");
			/*
				if(this.levelsPanel.levelListLayer.selectedIndex == 1)
					this.levelsPanel.levelListLayer.removeFriendsUI();
				else if(this.levelsPanel.levelListLayer.selectedIndex == 2)
					this.levelsPanel.levelListLayer.removeCreatorsUI();
				else if(this.levelsPanel.levelListLayer.selectedIndex == 3)
					this.levelsPanel.levelListLayer.removeFolderUI();
				
				this.levelsPanel.levelListLayer.addTrendsUI();
				this.levelsPanel.levelListLayer.selectedIndex = 0;
				*/
				this.levelsPanel.levelListLayer.onTouchEnded({x:this.levelsPanel.levelListLayer.dailyImg.x+5, y:this.levelsPanel.levelListLayer.dailyImg.y-5});
			}
			else
				this.levelsPanel.levelListLayer.listLayer.updateMoveCount(numMoves);
		
		}
		else
		{
			if(this.panelLayer.playSideLayer != null)
				this.panelLayer.playSideLayer.updateNumMoves(numMoves);
		}
		
	},
	
	updatePlaySideProgress:function(colorCode)
	{
		if(this.panelLayer.playSideLayer != null)
		{
			this.panelLayer.playSideLayer.tickColorProg(colorCode);
			this.panelLayer.playSideLayer.drawProgBar();
		}
	},
	
	readySave:function()
	{
		this.editorLayer.menuBarLayer.addSaveButton();
	},
	
	readyCreatedPlay:function()
	{
		this.editorLayer.menuBarLayer.addPlayButton();
	},
	
	preventCreatedPlay:function()
	{
		this.editorLayer.menuBarLayer.removePlayButton();
	},
	
	panelBackToEditor:function()
	{
		this.panelLayer.replacePlayWithEditor();
	},
	
	onFeatureWin:function()
	{cc.log(this.streak);
		this.recordWin();cc.log(this.streak);
		this.openWinPopup();
		//this.completeLevel();
		
		
	},
	
	recordWin:function()
	{cc.log("rec win. streak:");cc.log(this.streak);
		//var oldStars = this.numStars;
		//this.updateStarCount(this.numStars+this.streak);
		//this.dbUpdateStarCount(this.numStars+this.streak);
		//this.updateStreak(Math.min(this.streak+1,3));
		//this.dbUpdateStreak(Math.min(this.streak+1,3));
		this.updateNumStars(this.numStars+this.streak);
		this.updateStreak(Math.min(this.streak+1, 3));
		this.updateChallengeTries(0);
		this.updateNumLevelsBeat(this.numLevelsBeat+1);
		this.updateFeatureAfterWin();
		
		this.levelsPanel.levelListLayer.listHeader.updateStreak(this.streak);
		cc.log(this.numStars);
		cc.log("streak now: " + this.streak);
		
		this.levelsPanel.levelListLayer.listLayer.revertBackToReady();
		
		this.updateResetTime(0);
				
		
		this.featureInProg = false;
	},
	
	onLoss:function()
	{//zzzzzzzzzz
		cc.log(this.playType);
		if(this.playType == "feature")
		{
			this.recordLoss();
			this.openLosePopup();
			//this.updateWinStreakVis(this.streak, this.challengeTries);
			this.featureInProg = false;
		}
		else if(this.playType == "created")
		{
			this.backToEditor();
			this.panelBackToEditor();
		}
		else cc.log("ERROR NO MODE FOR LOSS")
	},
	
	
	onCreatedWin:function()
	{cc.log("reset to editor after win");
		this.backToEditor();
		this.panelBackToEditor();
	},
	
	recordLoss:function()
	{
		
		
		
		if(this.challengeTries >= this.streak)
		{
			//this.levelsPanel.levelListLayer.listLayer.delayLevel(50000);
			
			this.updateStreak(1);
			
			
			this.updateChallengeTries(0);
			
			this.updateResetTime((new Date()).getTime()+(1000*60*10));
		
			this.updateFeatureAfterWin();
		}
		//else this.updateChallengeTries(this.challengeTries+1);
		
		
		
		this.featureInProg = false;
		
		
		this.levelsPanel.levelListLayer.listHeader.updateStreak(this.streak);
		this.levelsPanel.levelListLayer.listLayer.updateStreakVis(1,0,this.numLevelsBeat);
	},
	
	ensureReadyForRespawnedLevel:function()
	{
		this.updateStreak(1);
		this.updateChallengeTries(0);
		this.levelsPanel.levelListLayer.listLayer.updateStreakVis(1,0,this.numLevelsBeat);

		
	},
	
	checkObstacleUnlock:function()
	{cc.log(this.oldStars);cc.log("numStars: "+this.numStars);
		if(this.numStars == 1)
		{
			this.openObstaclePopup(1);
		}
		else if(this.oldStars < 3 && this.numStars >= 3)
		{
			this.openObstaclePopup(2);
		}
		else if(this.oldStars < 6 && this.numStars >= 6)
		{
			this.openObstaclePopup(3);
		}
		else if(this.oldStars < 11 && this.numStars >= 11)
		{
			this.openObstaclePopup(4);
		}
		else if(this.oldStars < 18 && this.numStars >= 18)
		{
			this.openObstaclePopup(5);
		}
		else if(this.oldStars < 28 && this.numStars >= 28)
		{
			this.openObstaclePopup(6);
		}
		else if(this.oldStars < 41 && this.numStars >= 41)
		{
			this.openObstaclePopup(7);
		}
		else if(this.oldStars < 67 && this.numStars >= 67)
		{
			this.openObstaclePopup(8);
		}
		else if(this.oldStars < 87 && this.numStars >= 87)
		{
			this.openObstaclePopup(9);
		}
		else if(this.oldStars < 112 && this.numStars >= 112)
		{
			this.openObstaclePopup(10);
		}
		else if(this.oldStars < 142 && this.numStars >= 142)
		{
			this.openObstaclePopup(11);
		}
		else if(this.oldStars < 177 && this.numStars >= 177)
		{
			this.openObstaclePopup(12);
		}
		else if(this.oldStars < 217 && this.numStars >= 217)
		{
			this.openObstaclePopup(13);
		}	
		this.oldStars = this.numStars;
	},
	
	
	
	updateNumStars:function(num)
	{
		this.numStars = num;
		if(this.userId != null)
		{
			this.database.ref("users/"+this.userId+"/numStars").set(num);
		}
	},
	
	updateStreak:function(num)
	{
		this.streak = num;
		if(this.userId != null)
		{
			this.database.ref("users/"+this.userId+"/streak").set(this.streak);
		}
	},
	
	updateChallengeTries:function(num)
	{
		this.challengeTries = num;
		if(this.userId != null)
		{
			this.database.ref("users/"+this.userId+"/challengeTries").set(this.challengeTries);
		}
	},
	
	updateNumLevelsBeat:function(num)
	{
		this.numLevelsBeat = num;
		if(this.userId != null)
		{
			this.database.ref("users/"+this.userId+"/numLevelsBeat").set(this.numLevelsBeat);
		}
	},
	
	
	updateFeatureAfterWin:function()
	{cc.log("UPDATE FEATURE");cc.log(this.levelsBeaten);cc.log(this.stage);cc.log(this.feature);
		//record beaten feature id
		
		//this.levelsBeaten[this.stage].push(this.feature.code);
		
		//this.feature = null;
		cc.log(this.numStars);
		this.stage = 0;
		if(this.numStars >= 31)
		{
			this.stage = 5;
		}
		else if(this.numStars >= 16)
		{
			this.stage = 4;
		}
		else if(this.numStars >= 6)//dice levels
		{
			this.stage = 3;
		}
		else if(this.numStars >= 3)//bomb levels
		{
			this.stage = 2;
		}
		else if(this.numStars >= 1)// soap levels
		{
			this.stage = 1;
		}
		else if(this.numStars == 0)
		{
			this.stage = 0;
		}
		
		this.dataManager.getNewLevel(this.stage, this.levelsBeaten);
		//cc.log(this.feature);
		//if(this.userId != null)
		//	this.database.ref("users/"+this.userId+"/feature").set(this.feature);
		
		
	},
	
	updateNewCreatedLevel:function(level)
	{
		this.userLevels.push(level
	  					);
		
		var self = this;
		this.database.ref("levels/userLevels/"+this.userId).once("value").then(function(snapshot){
	  		var d = snapshot.val();
	  		
	  		var bubbleContainer = {};
	  		for(var i=0; i<level.bubbles.length; i++)
	  		{
	  			bubbleContainer[""+i] = level.bubbles[i];
	  		}
	  		var newLevel = {"queue":level.queue,
	  						"bubbles":bubbleContainer,
	  						"meta":level.meta,
	  						"numRows":level.numRows,
	  						"numMoves":level.numMoves,
	  						"levelTypes":level.levelTypes,
	  						"colors":level.colors
	  					};
	  		
	  		cc.log(self.userLevels);
			self.database.ref("levels/userLevels/"+self.userId+"/"+self.userLevels.length).set(newLevel);
	  		
	  	});
	},
	
	updateOldCreatedLevel:function()
	{
		//var bubbles = this.editorLayer.bubbleLayer.getBubbles();
		var bubbles = this.editorLayer.bubbleLayer.getBubbleData();
		
		var replaceTypes = [];
		var replaceColors = {};
		var bubbleContainer = {};
  		for(var i=0; i<bubbles.length; i++)
  		{
  			bubbleContainer[""+i] = bubbles[i];
  			if(replaceTypes.indexOf(bubbles[i].type) == -1)
  			{
  				replaceTypes.push(bubbles[i].type);
  			}
  			if(bubbles[i].type == 0)
  			{
  				if(Object.keys(replaceColors).indexOf(bubbles[i].colorCode) != -1)
  				{
  					replaceColors[bubbles[i].colorCode]++;
  				}
  				else
  				{
  					replaceColors[bubbles[i].colorCode] = 1;
  				}
  			}
  		}
	  	
	  	var replaceLevel = {
	  		"queue":{type:"bucket",colors:[1,1,1,1,1,1]},
			"bubbles":bubbles,
			"meta":{"0":0},
			"numRows":this.curCreatedRows,
			"numMoves":this.curCreatedMoves,
			"levelTypes":replaceTypes,
			"colors":replaceColors
		};cc.log(replaceLevel);
	  	
	  	this.updateUserLevel(replaceLevel,this.userLevelIndex);
	  	
	  
	},
	
	updateUserLevel:function(level, index)
  	{
  		var code = this.userLevels[index].code;
  		level.code = code;
  		this.userLevels[index] = level;
  		this.database.ref("levels/userLevels/"+this.userId+"/"+code).set(level);
  	},

	updateResetTime:function(time)
	{
		this.database.ref("users/"+this.userId+"/resetTime").set(time);
	}
	
	
	
	/*
	dbUpdateFeature:function(feature, index)
	{cc.log("updating feature");
		// timePlayed, type, 
		
		
		var dLevel = feature;
		
		if(dLevel.type == "empty")
		{
			var newLevelUpload = dLevel;
		}
		else
		{
		var newBubbles = [];
		
		var bubbleKeys = Object.keys(dLevel.bubbles);
		
		DATA.createdLevelColors.push({});
		var typeKeys = {};
		
		for(var j=0; j<bubbleKeys.length; j++)
		{
			var bub = dLevel.bubbles[bubbleKeys[j]];
			var newBub = {"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":bub.colorCode};
			if(!("colorCode" in bub) || typeof bub.colorCode == "undefined")
			{
				//newBub.colorCode = null;
				delete newBub.colorCode;
			}
			if(!("meta" in bub) || typeof bub.meta == "undefined")
			{
				//newBub.meta = null;
				delete newBub.meta;
			}
			cc.log(newBub);
			
			newBubbles.push(newBub);
		}
		
		var queue = {};
		queue.type = dLevel.queue.type;
		queue.colors = [dLevel.queue.colors["0"], dLevel.queue.colors["1"], dLevel.queue.colors["2"], 
			dLevel.queue.colors["3"], dLevel.queue.colors["4"], dLevel.queue.colors["5"]];
			
		var meta = {};
		if(dLevel.meta != null)
		{
			if(dLevel.meta.bulbData != null)
			{
						meta.bulbData = [];
						var bulbKeys = Object.keys(dLevel.meta.bulbData);
						for(var j=0; j<bulbKeys.length; j++)
						{
							meta.bulbData.push([]);
							var iterKeys = Object.keys(dLevel.meta.bulbData[bulbKeys[j]]);
							for(var k=0; k<iterKeys.length; k++)
							{
								meta.bulbData[j].push(dLevel.meta.bulbData[bulbKeys[j]][iterKeys[k]])
							}
						}
					}
				}
	
			var type = dLevel.type;
			var numMoves = dLevel.numMoves;
			var timePlayed = (new Date()).getTime();
			var colors = dLevel.colors;
			var numRows = dLevel.numRows;
	
			var newLevelUpload = {"bubbles":newBubbles, "queue":queue, "meta":meta, "type":type, "numMoves":numMoves, "timePlayed":timePlayed, "colors":colors, "numRows":numRows};
	
		}
		
		
		
		
		this.database.ref("users/"+this.userId+"/features/"+index).set(newLevelUpload);
	},*/
	
	
	/*dbUpdateTrackingList:function(code)
	{
		this.database.ref("users/"+this.userId+"/levelsBeaten/"+this.levelsBeaten.length).set(code);
		this.levelsBeaten.push(code);
	},*/
	
	/*dbUploadNewUserLevel:function(newBubbles, newWorldMeta)
	{cc.log(this.userLevels);
		var self = this;
		this.database.ref("levels/userLevels/"+this.userID).once("value").then(function(snapshot){
  		var d = snapshot.val();
  		
  		var bubbleContainer = {};
  		for(var i=0; i<newBubbles.length; i++)
  		{
  			bubbleContainer[""+i] = newBubbles[i];
  		}
  		var newLevel = {"queue":{"type":"bucket","colors":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1}},
  						"bubbles":newBubbles,
  						"meta":newWorldMeta};
  		
  		cc.log(self.userLevels);
		self.database.ref("levels/userLevels/"+DATA.userID+"/"+self.userLevels.length).set(newLevel);
  		
  	});
	}*/
	
});
