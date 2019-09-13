var MainContainerLayer = cc.Layer.extend({
	//ctor:function(bubbles, maxRow, meta){
	ctor:function(editorData, database){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		this.editorData = editorData; cc.log("EDITOR DATA");cc.log(editorData);
		this.database = database;
		
		
		
		var size = cc.winSize;
		
		this.bubbleR = size.width/24;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.bottomUIHeight = size.height/12;
		this.bottomUILayer = new BottomUILayer(size.height/12);
		this.bottomUILayer.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0
		});
		this.bottomUILayer.selectButton("gameplay");
		
		this.topUIHeight = size.height/15;
		this.topUILayer = new TopUILayer(size.height/15);
		this.topUILayer.attr({
			x: 0,
			y:size.height-(size.height/15),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.topUILayer, 8);
		
		
		
		this.coreButtonsUI = new CoreButtonsUI(cc.winSize.width/24, cc.winSize.height*.1, "world");
		this.coreButtonsUI.attr({
			x:0,
			y:this.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.coreButtonsUI);
		
		
		this.curTabName = "gameplay";
		this.menuMode = "game";
		
		//this.bubbles = this.editorData.feature.bubbles;
		this.bubbles = this.editorData.world.bubbles;
		this.dailyBubbles = this.editorData.feature.bubbles;
		
		this.maxRow = 0;
		for(var i=0; i<Object.values(this.bubbles).length; i++)
		{
			if(Object.values(this.bubbles)[i].row > this.maxRow)
				this.maxRow = Object.values(this.bubbles)[i].row;
		}
		this.maxRow++;
cc.log("WORLD COLORS");
cc.log(this.editorData.colorA);
cc.log(this.editorData.colorB);

		var meta = {};
		this.gameplayLayer = new GameplayLayer(Object.values(this.bubbles), this.maxRow, cc.winSize.height-this.bottomUIHeight-this.topUIHeight-this.coreButtonsUI.height, 
		meta, this.editorData.colorA, this.editorData.colorB, this.editorData.queueColors, this.editorData.queueBlueprint, this.database, this.editorData.userId);
		this.gameplayLayer.attr({
			x:0,
			y:this.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.gameplayLayer);
		
		/*if(this.gameplayRewardOnReturn != null)
		{
			this.gameplayLayer.triggerRewardOnStart(this.gameplayRewardOnReturn);
			this.gameplayRewardOnReturn = null;
		}*/
		
		this.curMainLayer = this.gameplayLayer;
		
		
		
		
		
		
		
		this.mainEditorLayer = new EditorLayer(cc.winSize.width, cc.winSize.height-this.bottomUIHeight-this.topUIHeight);
		this.mainEditorLayer.attr({
			x:0,
			y:this.bottomUIHeight,//+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		
		this.editorCreatorsLayer = new CreatorsDisplayLayer(cc.winSize.width, cc.winSize.height-this.bottomUIHeight-this.topUIHeight);
		this.editorCreatorsLayer.attr({
			x:cc.winSize.width*2,
			y:this.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		this.editorEventLayer = new CreatorEventLayer(cc.winSize.width, cc.winSize.height-this.bottomUIHeight-this.topUIHeight);
		this.editorEventLayer.attr({
			x:cc.winSize.width*1,
			y:this.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		
		this.editorRewardsLayer = new CreatorRewardsLayer(cc.winSize.width, cc.winSize.height-this.bottomUIHeight-this.topUIHeight);
		this.editorRewardsLayer.attr({
			x:cc.winSize.width*-1,
			y:this.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		
		this.editorShopLayer = new CreatorsDisplayLayer(cc.winSize.width, cc.winSize.height-this.bottomUIHeight-this.topUIHeight);
		this.editorShopLayer.attr({
			x:cc.winSize.width*-2,
			y:this.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		
		
		
		var dailyMaxRow = 0;
		for(var i=0; i<Object.values(this.dailyBubbles).length; i++)
		{
			if(Object.values(this.dailyBubbles)[i].row > this.maxRow)
				dailyMaxRow = Object.values(this.dailyBubbles)[i].row;
		}
		dailyMaxRow++;
		
		
		
		//this.challengeLayer = new ChallengeMenuDisplayLayer(cc.winSize.height-this.bottomUIHeight-this.topUIHeight-this.coreButtonsUI.height);
		this.challengeLayer = new CommunityDisplayLayer(cc.winSize.height-this.bottomUIHeight-this.topUIHeight-this.coreButtonsUI.height,
			Object.values(this.dailyBubbles), dailyMaxRow, meta, this.editorData.queueCount, this.editorData.queueBlueprint, this.database, this.editorData.userId);
		this.challengeLayer.attr({
			x:cc.winSize.width*-1,
			y:this.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.challengeLayer);
		
		// Social Media
		this.meLayer = new MeDisplayLayer(cc.winSize.height-this.bottomUIHeight-this.topUIHeight-this.coreButtonsUI.height);
		this.meLayer.attr({
			x:cc.winSize.width*-2,
			y:this.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.meLayer);
	
		//this.leagueLayer = new FolderListLayer(cc.winSize.width, cc.winSize.height-this.bottomUIHeight-this.topUIHeight-this.coreButtonsUI.height, [this.feature]);
		this.leagueLayer = new TaskDisplayLayer(cc.winSize.height-this.bottomUIHeight-this.topUIHeight-this.coreButtonsUI.height);
		this.leagueLayer.attr({
			x:cc.winSize.width*1,
			y:this.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.leagueLayer);
		
    		
		//this.friendsLayer = new FolderListLayer(cc.winSize.width, cc.winSize.height-this.bottomUIHeight-this.topUIHeight-this.coreButtonsUI.height, [this.feature]);
		this.friendsLayer = new EditorLayer(cc.winSize.width, cc.winSize.height-this.bottomUIHeight-this.topUIHeight);
		this.friendsLayer.attr({
			x:cc.winSize.width*2,
			y:this.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.friendsLayer);
		
		
		this.addChild(this.bottomUILayer);
		
		
		this.preLayer = null;
		this.settingsLayer = null;
		this.worldMapLayer = null;
		this.noLevelLayer = null;
		
		this.mouseDownFlag = false;
		
		var self = this;
		
		if(cc.sys.capabilities.hasOwnProperty('mouse')) {
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				
				onMouseDown:function(event)
				{
					self.onDownEvent(event);
					self.mouseDownFlag = true;
					return false;
				},
				onMouseMove:function(event)
				{
					if(self.mouseDownFlag)
						self.onMoveEvent(event);
					return false;
				},
				onMouseUp:function(event)
				{
					self.mouseDownFlag = false;
					self.onUpEvent(event);
					return false;
				}
			}, this);
		}
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){cc.log("TOUCHSTART");
			   		/*
			   		var target = event.getCurrentTarget();
			    		var locationInNode = self.convertToNodeSpace(touch.getLocation());
					cc.log(locationInNode);
					cc.log(self.curMainLayer);
					if(!self.isPopup())
					{cc.log("nopopup");cc.log(self.curMainLayer);
					    	if(this.posWithin(locationInNode, self.curMainLayer))
					    	{cc.log("IN CUR LAYER");
					    		//self.curMainLayer.onTouchBegan(touch.getLocation());
					    		self.curMainLayer.onTouchBegan(touch.getLocation());
					    	}
				    	}
				    	else
				    	{
				    		if(self.worldMapLayer != null)
							{	
								var returnObj = self.worldMapLayer.onTouchStarted(touch.getLocation());
								
							}
				    	}
				    	
				    	return true;
				    	*/
				    	self.onDownEvent(touch);
				    	return true;
			    },
			    onTouchMoved: function(touch, event){cc.log("MOVE");
			    			self.onMoveEvent(touch);
			    			return true;
			    	/*
			    		var target = event.getCurrentTarget();
			    		var locationInNode = self.convertToNodeSpace(touch.getLocation());

					if(!self.isPopup())
					{
					    	if(this.posWithin(locationInNode, self.curMainLayer))
					    	{
					    		self.curMainLayer.onTouchMoved(touch.getLocation());
					    	}
				    	}
				    	else
				    	{
				    		if(self.worldMapLayer != null)
							{	
								var returnObj = self.worldMapLayer.onTouchMoved(locationInNode);
								
							}
				    	}
				    	return true;
				    	*/
			    },
			    onTouchEnded: function(touch, event){cc.log("touchend main");
			    		self.onUpEvent(touch);
			    		return true;
				    /*
				    var target = event.getCurrentTarget();
				    var locationInNode = self.bottomUILayer.convertToNodeSpace(touch.getLocation());
			    	
			    		if(!self.isPopup())
					{
					    	if(this.posWithin(locationInNode, self.bottomUILayer))
					    	{cc.log("bottom");
					    		var botReturn = null;
					    		botReturn = self.bottomUILayer.onTouchEnd(touch.getLocation());
					    		
					    		if(botReturn == self.curTabName)
					    		{
					    			if(self.menuMode == "creator")
					    			{
					    				self.bottomUILayer.changeToGame();
					    				self.topUILayer.changeToGame();
					    				self.coreButtonsUI.changeToGame();
					    			}
					    			else if(self.menuMode == "game")
					    			{
					    				self.bottomUILayer.changeToEditor();
					    				self.topUILayer.changeToEditor();
					    				self.coreButtonsUI.changeToEditor();
					    			}
					    			self.swapCreatorMode();
					    		}
					    		else
					    		{
						    		if(botReturn == "challenge")
						    		{
						    			self.uiSlideToChallenge();
						    		}
						    		else if(botReturn == "gameplay")
						    		{
						    			self.uiSlideToGame();
						    		}
						    		else if(botReturn == "me")
						    		{
						    			self.uiSlideToMe();
						    		}
						    		else if(botReturn == "league")
						    		{
						    			self.uiSlideToLeague();
						    		}
						    		else if(botReturn == "friends")
						    		{
						    			self.uiSlideToFriends();
						    		}
					    		}
					    	}
					    	else if(this.posWithin(touch.getLocation(), self.topUILayer))
					    	{cc.log("topUI");
					    		self.topUILayer.onTouchEnd(touch.getLocation());
					    	}
					    	else if( this.posWithin(touch.getLocation(), self.curMainLayer))
					    	{cc.log("curLayerrrrrr");
					    		var returnObj = self.curMainLayer.onTouchEnded(touch.getLocation());
					    		if(self.curTabName=="challenge" && self.menuMode=="creator")
					    		{
					    			if(returnObj != null)
					    			{
						    			if(returnObj.type == "edit")
						    			{
						    				var newLevelNum = returnObj.number;
						    				self.mainEditorLayer.openCreatedLevel(newLevelNum);
						    				
						    				
						    				
						    				self.uiSlideToGame();
						    			}
						    			else if(returnObj.type == "test")
						    			{
						    				var testLevelNum = returnObj.number;
						    				
						    				var bubData = self.editorRewardsLayer.bubbleLayer.getBubbles();
						    				var bubbles = [];
								    		var numMoves = 0;
							    			for(var i=0; i<bubData.length; i++)
							    			{
							    				var dBub = bubData[i];
										  		
										  		var colorCode = null;
										  		var metaData = null;
										  		if(dBub.type == 7)
										  		{
										  			colorCode = [];
										  			var colorKeys = Object.keys(dBub.colorCode);
										  			for(var j=0; j<colorKeys.length; j++)
										  			{
										  				colorCode.push(dBub.colorCode[colorKeys[j]]);
										  			}
										  		}
										  		else colorCode = dBub.colorCode;
										  		
										  		
										  		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:colorCode, binary:dBub.binary, meta:metaData};
							    				bubbles.push(bubble);
							    			}
							
							    			numMoves = 99;
							    		
								    		
								    		var maxRow = 0;
								    		var bubbleData = [];
								    		for(var i=0; i<bubbles.length; i++)
								    		{
								    			if(bubbles[i].row > maxRow)
								    				maxRow = bubbles[i].row;
								    		}
											
											
											DATA.setLevelQueue(DATA.challenges[1].queue);
											
											
										
								    		cc.director.runScene( new cc.TransitionSlideInB( 1.0, new PlaytestScene(bubbles, maxRow+1, numMoves, {}) ) );
						    			}
					    			}
					    		}
					    	}
					    	else if(this.posWithin(touch.getLocation(), self.coreButtonsUI))
					    	{
					    		cc.log("CORE BUTTONS YO");
					    		self.curMainLayer.coreUITouched(touch.getLocation());
					    	}
					 	
					 	cc.log(self.curMainLayer);
					}
					else
					{
						if(self.worldMapLayer != null)
						{	
							var returnObj = self.worldMapLayer.onTouchEnded(touch.getLocation());
							if(returnObj == "close")
							{
								self.removeChild(self.worldMapLayer);
								self.worldMapLayer = null;
							}
							else if(returnObj == "next")
							{
								
								self.closeWorldMapAfterCompletion();
								
								
								
							}
						}
						else if(self.preLayer != null)
						{cc.log("CLICK IN PRELAYER");
							var returnObj = self.preLayer.onTouchEnd(touch.getLocation());
							if(returnObj == "close")
							{
								var scaleAction = cc.scaleTo(.5, 0, 0);
								var moveToAction = cc.moveTo(.5, cc.p(cc.winSize.width*.5,25));
								var spawn = cc.spawn(scaleAction,moveToAction);
								self.preLayer.setCascadeOpacityEnabled(true);
								var seq = new cc.Sequence(spawn, cc.callFunc( self.preLayer.removeFromParent, self.preLayer ) );
								self.preLayer.runAction(seq);
								self.preLayer = null;
							}
							else if(returnObj == "buy-prebooster")
							{
								self.removeChild(self.preLayer);
								self.preLayer = null;
								
								self.buyPreboosterLayer = new BuyBoosterLayer(cc.winSize.width-50,self.height-50,"plus_five");
								self.buyPreboosterLayer.attr({
									x:25,
									y:25,
									anchorX:0,
									anchorY:0
								});
								self.addChild(self.buyPreboosterLayer);
							}
							
						}
						else if(self.noLevelLayer != null)
						{
							var returnObject = self.noLevelLayer.onTouchEnd(touch.getLocation());
							if(returnObject == "close")
							{
								var scaleAction = cc.scaleTo(.5, 0, 0);
								var moveToAction = cc.moveTo(.5, cc.p(cc.winSize.width*.5,25));
								var spawn = cc.spawn(scaleAction,moveToAction);
								self.noLevelLayer.setCascadeOpacityEnabled(true);
								var seq = new cc.Sequence(spawn, cc.callFunc( self.noLevelLayer.removeFromParent, self.noLevelLayer ) );
								self.noLevelLayer.runAction(seq);
								self.noLevelLayer = null;
							}
						}
						
					}
					
			    	return true;
			    	*/
			    }
			    
		    },this);
		}
		
	},
	
	onDownEvent:function(touch)
	{cc.log("DOWN EVENT");cc.log(touch);
    		var locationInNode = this.convertToNodeSpace(touch.getLocation());
		cc.log(locationInNode);
		cc.log(this.curMainLayer);
		if(!this.isPopup())
		{
		    	if(this.posWithin(locationInNode, this.curMainLayer))
		    	{cc.log("TOUCH WITHIN YO");
		    		this.curMainLayer.onTouchBegan(touch.getLocation());
		    	}
	    	}
	    	else
	    	{
	    		if(this.worldMapLayer != null)
				{	
					var returnObj = this.worldMapLayer.onTouchStarted(touch.getLocation());
					
				}
	    	}
	    	
	    //	return true;
	},
	onMoveEvent:function(touch)
	{cc.log("MOVE EVENT");cc.log(touch);
    		var locationInNode = this.convertToNodeSpace(touch.getLocation());

		if(!this.isPopup())
		{
		    	if(this.posWithin(locationInNode, this.curMainLayer))
		    	{
		    		this.curMainLayer.onTouchMoved(touch.getLocation());
		    	}
	    	}
	    	else
	    	{
	    		if(this.worldMapLayer != null)
				{	
					var returnObj = this.worldMapLayer.onTouchMoved(locationInNode);
					
				}
	    	}
	    //	return true;
	},
	onUpEvent:function(touch)
	{cc.log("UP EVENT");cc.log(touch);
	    var locationInNode = this.bottomUILayer.convertToNodeSpace(touch.getLocation());
    	
    		if(!this.isPopup())
		{
		    	if(this.posWithin(locationInNode, this.bottomUILayer))
		    	{
		    		var botReturn = null;
		    		botReturn = this.bottomUILayer.onTouchEnd(touch.getLocation());
		    		
		    		if(botReturn == this.curTabName)
		    		{
		    			if(this.menuMode == "creator")
		    			{
		    				this.bottomUILayer.changeToGame();
		    				this.topUILayer.changeToGame();
		    				this.coreButtonsUI.changeToGame();
		    			}
		    			else if(this.menuMode == "game")
		    			{
		    				this.bottomUILayer.changeToEditor();
		    				this.topUILayer.changeToEditor();
		    				this.coreButtonsUI.changeToEditor();
		    			}
		    			this.swapCreatorMode();
		    		}
		    		else
		    		{
			    		if(botReturn == "challenge")
			    		{
			    			this.uiSlideToChallenge();
			    		}
			    		else if(botReturn == "gameplay")
			    		{
			    			this.uiSlideToGame();
			    		}
			    		else if(botReturn == "me")
			    		{
			    			this.uiSlideToMe();
			    		}
			    		else if(botReturn == "league")
			    		{
			    			this.uiSlideToLeague();
			    		}
			    		else if(botReturn == "friends")
			    		{
			    			this.uiSlideToFriends();
			    		}
		    		}
		    	}
		    	else if(this.posWithin(touch.getLocation(), this.topUILayer))
		    	{
		    		this.topUILayer.onTouchEnd(touch.getLocation());
		    	}
		    	else if( this.posWithin(touch.getLocation(), this.curMainLayer))
		    	{
		    		var returnObj = this.curMainLayer.onTouchEnded(touch.getLocation());
		    		if(this.curTabName=="challenge" && this.menuMode=="creator")
		    		{
		    			if(returnObj != null)
		    			{
			    			if(returnObj.type == "edit")
			    			{
			    				var newLevelNum = returnObj.number;
			    				this.mainEditorLayer.openCreatedLevel(newLevelNum);
			    				
			    				
			    				
			    				this.uiSlideToGame();
			    			}
			    			else if(returnObj.type == "test")
			    			{
			    				var testLevelNum = returnObj.number;
			    				
			    				var bubData = this.editorRewardsLayer.bubbleLayer.getBubbles();
			    				var bubbles = [];
					    		var numMoves = 0;
				    			for(var i=0; i<bubData.length; i++)
				    			{
				    				var dBub = bubData[i];
							  		
							  		var colorCode = null;
							  		var metaData = null;
							  		if(dBub.type == 7)
							  		{
							  			colorCode = [];
							  			var colorKeys = Object.keys(dBub.colorCode);
							  			for(var j=0; j<colorKeys.length; j++)
							  			{
							  				colorCode.push(dBub.colorCode[colorKeys[j]]);
							  			}
							  		}
							  		else colorCode = dBub.colorCode;
							  		
							  		
							  		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:colorCode, binary:dBub.binary, meta:metaData};
				    				bubbles.push(bubble);
				    			}
				
				    			numMoves = 99;
				    		
					    		
					    		var maxRow = 0;
					    		var bubbleData = [];
					    		for(var i=0; i<bubbles.length; i++)
					    		{
					    			if(bubbles[i].row > maxRow)
					    				maxRow = bubbles[i].row;
					    		}
								
								
								//DATA.setLevelQueue(DATA.challenges[1].queue);
								
								
							
					    		cc.director.runScene( new cc.TransitionSlideInB( 1.0, new PlaytestScene(bubbles, maxRow+1, numMoves, {}) ) );
			    			}
		    			}
		    		}
		    	}
		    	else if(this.posWithin(touch.getLocation(), this.coreButtonsUI))
		    	{
		    		cc.log("CORE BUTTONS YO");
		    		this.curMainLayer.coreUITouched(touch.getLocation());
		    	}
		 	
		 	cc.log(this.curMainLayer);
		}
		else
		{
			if(this.worldMapLayer != null)
			{	
				var returnObj = this.worldMapLayer.onTouchEnded(touch.getLocation());
				if(returnObj == "close")
				{
					this.removeChild(this.worldMapLayer);
					this.worldMapLayer = null;
				}
				else if(returnObj == "next")
				{
					
					this.closeWorldMapAfterCompletion();
					
					
					
				}
			}
			else if(this.preLayer != null)
			{cc.log("CLICK IN PRELAYER");
				var returnObj = this.preLayer.onTouchEnd(touch.getLocation());
				if(returnObj == "close")
				{
					var scaleAction = cc.scaleTo(.5, 0, 0);
					var moveToAction = cc.moveTo(.5, cc.p(cc.winSize.width*.5,25));
					var spawn = cc.spawn(scaleAction,moveToAction);
					this.preLayer.setCascadeOpacityEnabled(true);
					var seq = new cc.Sequence(spawn, cc.callFunc( this.preLayer.removeFromParent, this.preLayer ) );
					this.preLayer.runAction(seq);
					this.preLayer = null;
				}
				else if(returnObj == "buy-prebooster")
				{
					this.removeChild(this.preLayer);
					this.preLayer = null;
					
					this.buyPreboosterLayer = new BuyBoosterLayer(cc.winSize.width-50,this.height-50,"plus_five");
					this.buyPreboosterLayer.attr({
						x:25,
						y:25,
						anchorX:0,
						anchorY:0
					});
					this.addChild(this.buyPreboosterLayer);
				}
				
			}
			else if(this.noLevelLayer != null)
			{
				var returnObject = this.noLevelLayer.onTouchEnd(touch.getLocation());
				if(returnObject == "close")
				{
					var scaleAction = cc.scaleTo(.5, 0, 0);
					var moveToAction = cc.moveTo(.5, cc.p(cc.winSize.width*.5,25));
					var spawn = cc.spawn(scaleAction,moveToAction);
					this.noLevelLayer.setCascadeOpacityEnabled(true);
					var seq = new cc.Sequence(spawn, cc.callFunc( this.noLevelLayer.removeFromParent, this.noLevelLayer ) );
					this.noLevelLayer.runAction(seq);
					this.noLevelLayer = null;
				}
			}
			
		}
		
    //	return true;
    
	},
	
	uiSlideToChallenge:function()
	{
		var moveDistance = 0;
		if(this.curTabName == "me")
		{
			moveDistance = cc.winSize.width*-1;
		}
		else if(this.curTabName == "gameplay")
		{
			moveDistance = cc.winSize.width*1;
			
		}
		else if(this.curTabName == "league")
		{
			moveDistance = cc.winSize.width*2;
		}
		else if(this.curTabName == "friends")
		{
			moveDistance = cc.winSize.width*3;
		}
		
		this.slideTabs(moveDistance);
		
		if(this.menuMode == "game")
			this.curMainLayer = this.challengeLayer;
		else if(this.menuMode == "creator")
			this.curMainLayer = this.editorRewardsLayer;
		this.curTabName = "challenge";
		this.bottomUILayer.selectButton(this.curTabName);
	},
	
	uiSlideToMe:function()
	{
		var moveDistance = 0;
		if(this.curTabName == "challenge")
		{
			moveDistance = cc.winSize.width;
		}
		else if(this.curTabName == "gameplay")
		{
			moveDistance = cc.winSize.width*2;
			
		}
		else if(this.curTabName == "league")
		{
			moveDistance = cc.winSize.width*3;
		}
		else if(this.curTabName == "friends")
		{
			moveDistance = cc.winSize.width*4;
		}
		
		this.slideTabs(moveDistance);
		
		
		if(this.menuMode == "game")
			this.curMainLayer = this.meLayer;
		else if(this.menuMode == "creator")
			this.curMainLayer = this.editorShopLayer;
		this.curTabName = "me";
		this.bottomUILayer.selectButton(this.curTabName);
	},
	
	uiSlideToGame:function()
	{
		var moveDistance = 0;
		if(this.curTabName == "me")
		{
			moveDistance = cc.winSize.width*-2;
		}
		else if(this.curTabName == "challenge")
		{
			moveDistance = cc.winSize.width*-1;
		}
		else if(this.curTabName == "league")
		{
			moveDistance = cc.winSize.width;
		}
		else if(this.curTabName == "friends")
		{
			moveDistance = cc.winSize.width*2;
		}
		
		this.slideTabs(moveDistance);
		
		//var seq = new cc.Sequence(moveLeftAction, cc.callFunc( this.challengeLayer.removeFromParent, this.challengeLayer ) );

		if(this.menuMode == "game")
			this.curMainLayer = this.gameplayLayer;
		else if(this.menuMode == "creator")
			this.curMainLayer = this.mainEditorLayer;
		this.curTabName = "gameplay";
		this.bottomUILayer.selectButton(this.curTabName);
	},
	uiSlideToLeague:function()
	{
		var moveDistance = 0;
		if(this.curTabName == "me")
		{
			moveDistance = cc.winSize.width*-3;
		}
		else if(this.curTabName == "challenge")
		{
			moveDistance = cc.winSize.width*-2;
		}
		else if(this.curTabName == "gameplay")
		{
			moveDistance = cc.winSize.width*-1;
			
		}
		else if(this.curTabName == "friends")
		{
			moveDistance = cc.winSize.width;
		}
		
		this.slideTabs(moveDistance);
		
		if(this.menuMode == "game")
			this.curMainLayer = this.friendsLayer;
		else if(this.menuMode == "creator")
			this.curMainLayer = this.editorCreatorsLayer;
		this.curTabName = "league";
		this.bottomUILayer.selectButton(this.curTabName);
	},
	uiSlideToFriends:function()
	{
		var moveDistance = 0;
		if(this.curTabName == "me")
		{
			moveDistance = cc.winSize.width*-4;
		}
		else if(this.curTabName == "challenge")
		{
			moveDistance = cc.winSize.width*-3;
		}
		else if(this.curTabName == "gameplay")
		{
			moveDistance = cc.winSize.width*-2;
			
		}
		else if(this.curTabName == "league")
		{
			moveDistance = cc.winSize.width*-1;
		}
		
		this.slideTabs(moveDistance);
		
		if(this.menuMode == "game")
			this.curMainLayer = this.leagueLayer;
		else if(this.menuMode == "creator")
			this.curMainLayer = this.editorEventLayer;
		this.curTabName = "friends";
		this.bottomUILayer.selectButton(this.curTabName);
	},

	
	/*onEnter:function()
	{
		//this._super();
		cc.log("ON ENTER !!!!!!!!!!!!!!!!!!");
	},*/
	
	isPopup:function()
	{
		if(this.preLayer != null || this.settingsLayer != null || this.worldMapLayer != null || this.noLevelLayer != null)
			return true;
		return false;
	},
	
	openSettingsLayer:function()
	{
		
	},
	
	swapCreatorMode:function()
	{
		if(this.menuMode == "game")
		{
			this.mainEditorLayer.x = this.gameplayLayer.x;cc.log(this.mainEditorLayer.x);
			this.editorCreatorsLayer.x = this.friendsLayer.x;cc.log(this.editorCreatorsLayer.x);
			this.editorEventLayer.x = this.leagueLayer.x;cc.log(this.editorEventLayer.x);
			this.editorRewardsLayer.x = this.challengeLayer.x;cc.log(this.editorRewardsLayer.x);
			this.editorShopLayer.x = this.meLayer.x;cc.log(this.editorShopLayer.x);
			
			this.removeChild(this.gameplayLayer);
			this.removeChild(this.challengeLayer);
			this.removeChild(this.leagueLayer);
			this.removeChild(this.friendsLayer);
			this.removeChild(this.meLayer);
			
			this.addChild(this.mainEditorLayer);
			this.addChild(this.editorCreatorsLayer);
			this.addChild(this.editorEventLayer);
			this.addChild(this.editorRewardsLayer);
			this.addChild(this.editorShopLayer);
			
			if(this.curTabName == "gameplay")
				this.curMainLayer = this.mainEditorLayer;
			else if(this.curTabName == "me")
				this.curMainLayer = this.editorShopLayer;
			else if(this.curTabName == "friends")
				this.curMainLayer = this.editorCreatorsLayer;
			else if(this.curTabName == "league")
				this.curMainLayer = this.editorEventLayer;
			else if(this.curTabName == "challenge")
				this.curMainLayer = this.editorRewardsLayer;
			
			cc.log(this.curMainLayer);
			
			this.bottomUILayer.changeToEditor();
			this.topUILayer.changeToEditor();
			
			//this.coreButtonsUI.hideLevelsButton();
			this.menuMode = "creator";
			
			this.removeChild(this.coreButtonsUI);
		}
		else if(this.menuMode == "creator")
		{
			this.gameplayLayer.x = this.mainEditorLayer.x;
			this.friendsLayer.x = this.editorCreatorsLayer.x;
			this.leagueLayer.x = this.editorEventLayer.x;
			this.challengeLayer.x = this.editorRewardsLayer.x;
			this.meLayer.x = this.editorShopLayer.x;
			
			this.removeChild(this.mainEditorLayer);
			this.removeChild(this.editorCreatorsLayer);
			this.removeChild(this.editorEventLayer);
			this.removeChild(this.editorRewardsLayer);
			this.removeChild(this.editorShopLayer);
			
			
			this.addChild(this.gameplayLayer);
			this.addChild(this.challengeLayer);
			this.addChild(this.leagueLayer);
			this.addChild(this.friendsLayer);
			this.addChild(this.meLayer);
			
			if(this.curTabName == "gameplay")
				this.curMainLayer = this.gameplayLayer;
			else if(this.curTabName == "me")
				this.curMainLayer = this.meLayer;
			else if(this.curTabName == "friends")
				this.curMainLayer = this.friendsLayer;
			else if(this.curTabName == "league")
				this.curMainLayer = this.leagueLayer;
			else if(this.curTabName == "challenge")
				this.curMainLayer = this.challengeLayer;
			
			this.bottomUILayer.changeToGame();
			this.topUILayer.changeToGame();
			
			//this.coreButtonsUI.showLevelsButton();
			this.menuMode = "game";
			
			this.addChild(this.coreButtonsUI);
		}
	},
	/*
	openPreLayer:function()
	{
		if(DATA.levelIndexAType == "challenge")
		{
			this.preLayer = new PreChallengePinkLayer(DATA.levelIndexA,cc.winSize.width-50,this.height-DATA.bottomUIHeight-DATA.topUIHeight-20);
		
		}
		else
		{
			this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height-DATA.bottomUIHeight-DATA.topUIHeight-20);
		}
		this.preLayer.attr({x:cc.winSize.width*.5,y:DATA.bottomUIHeight+10,anchorX:0,anchorY:0});
		this.addChild(this.preLayer, 1);
		this.preLayer.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveToAction = cc.moveTo(.5, cc.p(25, DATA.bottomUIHeight+10));
		var spawn = cc.spawn(scaleAction, moveToAction);
		this.preLayer.runAction(spawn);
	},*/
	
	openNoLevelLayer:function()
	{
		this.noLevelLayer = new NoLevelLayer(cc.winSize.width-50, this.height-this.bottomUIHeight-this.topUIHeight-20);
		this.noLevelLayer.attr({x:cc.winSize.width*.5,y:25,anchorX:0,anchorY:0});
		this.addChild(this.noLevelLayer);
		this.noLevelLayer.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveToAction = cc.moveTo(.5, cc.p(25, this.bottomUIHeight+10));
		var spawn = cc.spawn(scaleAction, moveToAction);
		this.noLevelLayer.runAction(spawn);
	},
	
	openWorldMapLayer:function()
	{
		this.worldMapLayer = new WorldMapLayer(cc.winSize.width-50,cc.winSize.height-this.bottomUIHeight-this.topUIHeight-20, "normal");
		this.worldMapLayer.attr({
			x:this.topUILayer.mapButton.x+(this.topUILayer.mapButton.width*this.topUILayer.mapButton.scale)/2,
			y:this.topUILayer.y+this.topUILayer.mapButton.y+(this.topUILayer.mapButton.height*this.topUILayer.mapButton.scale)/2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.worldMapLayer, 9);
		this.worldMapLayer.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveToAction = cc.moveTo(.5, cc.p(25, this.bottomUIHeight+10));
		var spawn = cc.spawn(scaleAction, moveToAction);
		this.worldMapLayer.runAction(spawn);
		
		
	},
	
	openWorldMapLayerAfterCompletion:function()
	{
		this.worldMapLayer = new WorldMapLayer(this.width-50, this.height-50, "complete");
		this.worldMapLayer.attr({
			x:25,
			y:25,
			anchorX:0,
			anchorY:0
		});
		this.worldMapLayer.setScale(0);
		this.addChild(this.worldMapLayer);
		
		var scaleAction = cc.scaleTo(.5,1,1);
		var moveToAction = cc.moveTo(.5, cc.p(25,25));
		var spawn = cc.spawn(scaleAction, moveToAction);
		var seq = new cc.Sequence(
			spawn, 
			cc.callFunc(this.worldMapLayer.advanceAvatar, this.worldMapLayer)
			
		);
		this.worldMapLayer.runAction(seq);
	},
	
	closeWorldMapAfterCompletion:function()
	{
		var moveAction = cc.moveTo(.5, cc.winSize.width/2, cc.winSize.height/2);
		var scaleAction = cc.scaleTo(.5, 0,0);
		var spawn = cc.spawn(moveAction, scaleAction);
		var seq = new cc.Sequence(
			spawn, 
			cc.callFunc(this.worldMapLayer.removeFromParent, this.worldMapLayer),
			cc.callFunc(this.gameplayLayer.openWorldElementLayer, this.gameplayLayer)
		);
		this.worldMapLayer.runAction(seq);
		this.worldMapLayer = null;
	},
	
	slideTabs:function(moveDistance)
	{
		var moveAction = cc.moveBy(.5, cc.p(moveDistance, 0));
		//var seq = new cc.Sequence(moveRightAction, cc.callFunc( self.gameplayLayer.removeFromParent, self.gameplayLayer ) );
		
		var moveActionB = cc.moveBy(.5, cc.p(moveDistance, 0));
		
		var moveActionC = cc.moveBy(.5, cc.p(moveDistance, 0));
		
		var moveActionD = cc.moveBy(.5, cc.p(moveDistance, 0));
		
		var moveActionE = cc.moveBy(.5, cc.p(moveDistance, 0));
		
		if(this.menuMode == "game")
		{
			this.gameplayLayer.runAction(moveAction);
			this.challengeLayer.runAction(moveActionB);
			this.meLayer.runAction(moveActionC);
			this.friendsLayer.runAction(moveActionD);
			this.leagueLayer.runAction(moveActionE);
		}
		else if(this.menuMode == "creator")
		{
			this.mainEditorLayer.runAction(moveAction);
			this.editorRewardsLayer.runAction(moveActionB);
			this.editorShopLayer.runAction(moveActionC);
			this.editorCreatorsLayer.runAction(moveActionD);
			this.editorEventLayer.runAction(moveActionE);
		}
	},
	
	posWithin:function(a,b)
	{
		if(a.x > b.x && a.x < b.x+b.width && a.y>b.y && a.y<b.y+b.height)
			return true;
		return false;
	}
	
});
