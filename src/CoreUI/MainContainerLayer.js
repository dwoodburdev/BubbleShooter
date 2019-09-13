var MainContainerLayer = cc.Layer.extend({
	ctor:function(bubbles, maxRow, meta){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		DATA.bottomUIHeight = size.height/12;
		this.bottomUILayer = new BottomUILayer(size.height/12);
		this.bottomUILayer.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0
		});
		this.bottomUILayer.selectButton("gameplay");
		
		DATA.topUIHeight = size.height/15;
		this.topUILayer = new TopUILayer(size.height/15);
		this.topUILayer.attr({
			x: 0,
			y:size.height-(size.height/15),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.topUILayer, 8);
		
		
		
		this.coreButtonsUI = new CoreButtonsUI(cc.winSize.width/24, cc.winSize.height, "world");
		this.coreButtonsUI.attr({
			x:0,
			y:DATA.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.coreButtonsUI);
		
		
		this.curTabName = "gameplay";
		this.menuMode = "game";
		
		this.bubbles = bubbles;
		this.maxRow = maxRow;
		cc.log(meta);
		this.gameplayLayer = new GameplayLayer(bubbles, maxRow, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height, meta);
		this.gameplayLayer.attr({
			x:0,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.gameplayLayer);
		
		if(DATA.gameplayRewardOnReturn != null)
		{
			this.gameplayLayer.triggerRewardOnStart(DATA.gameplayRewardOnReturn);
			DATA.gameplayRewardOnReturn = null;
		}
		
		this.curMainLayer = this.gameplayLayer;
		
		
		
		
		
		
		
		this.mainEditorLayer = new EditorLayer(cc.winSize.width, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight);
		this.mainEditorLayer.attr({
			x:0,
			y:DATA.bottomUIHeight,//+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		
		this.editorCreatorsLayer = new CreatorsDisplayLayer(cc.winSize.width, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight);
		this.editorCreatorsLayer.attr({
			x:cc.winSize.width*2,
			y:DATA.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		this.editorEventLayer = new CreatorEventLayer(cc.winSize.width, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight);
		this.editorEventLayer.attr({
			x:cc.winSize.width*1,
			y:DATA.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		
		this.editorRewardsLayer = new CreatorRewardsLayer(cc.winSize.width, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight);
		this.editorRewardsLayer.attr({
			x:cc.winSize.width*-1,
			y:DATA.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		
		this.editorShopLayer = new CreatorsDisplayLayer(cc.winSize.width, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight);
		this.editorShopLayer.attr({
			x:cc.winSize.width*-2,
			y:DATA.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		
		
		
		this.challengeLayer = new ChallengeMenuDisplayLayer(cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height);
		this.challengeLayer.attr({
			x:cc.winSize.width*-1,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.challengeLayer);
		
		this.meLayer = new MeDisplayLayer(cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height);
		this.meLayer.attr({
			x:cc.winSize.width*-2,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.meLayer);
		
		this.friendsLayer = new FriendsDisplayLayer(cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height);
		this.friendsLayer.attr({
			x:cc.winSize.width*2,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.friendsLayer);
		
		this.leagueLayer = new LeagueDisplayLayer(cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height);
		this.leagueLayer.attr({
			x:cc.winSize.width*1,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.leagueLayer);
		
		this.phoneMode = "emoji";
		
		this.phoneBG = new cc.Sprite(res.phone_up);
    	this.phoneBG.setScale(DATA.bubbleR*5 / this.phoneBG.height)
    	this.phoneBG.attr({
    		x:this.gameplayLayer.bubbleLayer.queueBubble.x,
    		y:this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y - (this.phoneBG.height*this.phoneBG.scale)*.1,
    		anchorX:.5,
    		anchorY:.5
    	});
    	this.addChild(this.phoneBG);
    	
    	if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "red")
    		this.queuePhoneOverlay = new cc.Sprite(res.angry_emoji);
    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "yellow")
    		this.queuePhoneOverlay = new cc.Sprite(res.smile_emoji);
    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "green")
    		this.queuePhoneOverlay = new cc.Sprite(res.sick_emoji);
    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "blue")
    		this.queuePhoneOverlay = new cc.Sprite(res.sad_emoji);
    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "pink")
    		this.queuePhoneOverlay = new cc.Sprite(res.love_emoji);
    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "purple")
    		this.queuePhoneOverlay = new cc.Sprite(res.evil_emoji);
    	
		this.queuePhoneOverlay.setScale(DATA.bubbleR*2 / this.queuePhoneOverlay.width);
		this.queuePhoneOverlay.attr({
			x:this.gameplayLayer.x+this.gameplayLayer.bubbleLayer.x+this.gameplayLayer.bubbleLayer.queueBubble.x,
			y:this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.queuePhoneOverlay);
		
		this.emojiMoveLabel = new cc.LabelTTF(this.gameplayLayer.bubbleLayer.numMoves);
    	this.emojiMoveLabel.attr({
    		x:this.phoneBG.x,
    		y:this.queuePhoneOverlay.y-DATA.bubbleR-1,
    		anchorX:.5,
    		anchorY:1
    	});
    	this.emojiMoveLabel.color = cc.color(0,0,0,255);
    	this.addChild(this.emojiMoveLabel);
    	
		
		
		
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
			   		
				    	self.onDownEvent(touch);
				    	return true;
			    },
			    onTouchMoved: function(touch, event){cc.log("MOVE");
			    			self.onMoveEvent(touch);
			    			return true;
			   
			    },
			    onTouchEnded: function(touch, event){cc.log("touchend main");
			    		self.onUpEvent(touch);
			    		return true;
				    
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
		    	if(FUNCTIONS.posWithin(locationInNode, this.curMainLayer))
		    	{
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
		    	if(FUNCTIONS.posWithin(locationInNode, this.curMainLayer))
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
		    	if(FUNCTIONS.posWithin(locationInNode, this.bottomUILayer))
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
		    	else if(FUNCTIONS.posWithin(touch.getLocation(), this.topUILayer))
		    	{
		    		this.topUILayer.onTouchEnd(touch.getLocation());
		    	}
		    	else if( FUNCTIONS.posWithin(touch.getLocation(), this.curMainLayer))
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
								
								
								DATA.setLevelQueue(DATA.challenges[1].queue);
								
								
							
					    		cc.director.runScene( new cc.TransitionSlideInB( 1.0, new PlaytestScene(bubbles, maxRow+1, numMoves, {}) ) );
			    			}
		    			}
		    		}
		    	}
		    	else if(FUNCTIONS.posWithin(touch.getLocation(), this.coreButtonsUI))
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
			
			if(this.menuMode == "game")
				this.movePhoneDown();
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
			
			if(this.menuMode == "game")
				this.movePhoneDown();
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
		
		this.movePhoneUp();
		
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
			
			if(this.menuMode == "game")
				this.movePhoneDown();
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
			
			if(this.menuMode == "game")
				this.movePhoneDown();
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
	
	pulsePhone:function()
	{
		var dur = .15;
		var maxScale = 1.5;
		var scaleAction = cc.scaleTo(dur, maxScale*this.phoneBG.scale, maxScale*this.phoneBG.scale);
		var scaleBack = cc.scaleTo(dur, 1*this.phoneBG.scale, 1*this.phoneBG.scale);
		
		this.phoneBG.runAction(new cc.Sequence(scaleAction, scaleBack));
			
	},
	
	indicatePhoneAnim:function()
	{
		var phoneScaleUpAction = cc.scaleTo(.5,1.5*this.phoneBG.scale,1.5*this.phoneBG.scale);
		var phoneScaleDownAction = cc.scaleTo(.5,1*this.phoneBG.scale,this.phoneBG.scale);
		var phoneSeq = new cc.Sequence(phoneScaleUpAction, phoneScaleDownAction);
		this.phoneBG.runAction(new cc.RepeatForever(phoneSeq));
		
		var queueScaleUpAction = cc.scaleTo(.5,1.5*this.queuePhoneOverlay.scale,1.5*this.queuePhoneOverlay.scale);
		var queueScaleDownAction = cc.scaleTo(.5,this.queuePhoneOverlay.scale,this.queuePhoneOverlay.scale);
		var queueSeq = new cc.Sequence(queueScaleUpAction, queueScaleDownAction);
		this.queuePhoneOverlay.runAction(new cc.RepeatForever(queueSeq));
		
		var curMovesY = this.emojiMoveLabel.y
		var movesDownAction = cc.moveTo(.5,this.emojiMoveLabel.x, this.queuePhoneOverlay.y-(this.queuePhoneOverlay.height*this.queuePhoneOverlay.scale*1.5)/2);
		var movesUpAction = cc.moveTo(.5,this.emojiMoveLabel.x, curMovesY);
		var movesSeq = new cc.Sequence(movesDownAction, movesUpAction);
		this.emojiMoveLabel.runAction(new cc.RepeatForever(movesSeq));
		
	},
	
	stopPhoneIndication:function()
	{
		//this.phoneBG.stopAction(this.curPhoneAction);
		this.phoneBG.stopAllActions();
		this.phoneBG.setScale(DATA.bubbleR*5 / this.phoneBG.height)
		
		this.emojiMoveLabel.stopAllActions();
		this.emojiMoveLabel.attr({
			y:this.queuePhoneOverlay.y-(this.queuePhoneOverlay.height*this.queuePhoneOverlay.scale)/2
		});
	},
	
	updatePhoneQueueBubble:function()
	{
		if(this.queuePhoneOverlay != null)
			this.removeChild(this.queuePhoneOverlay);
		this.queuePhoneOverlay = null;
		
		if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "red")
    		this.queuePhoneOverlay = new cc.Sprite(res.angry_emoji);
    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "yellow")
    		this.queuePhoneOverlay = new cc.Sprite(res.smile_emoji);
    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "green")
    		this.queuePhoneOverlay = new cc.Sprite(res.sick_emoji);
    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "blue")
    		this.queuePhoneOverlay = new cc.Sprite(res.sad_emoji);
    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "pink")
    		this.queuePhoneOverlay = new cc.Sprite(res.love_emoji);
    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "purple")
    		this.queuePhoneOverlay = new cc.Sprite(res.evil_emoji);
    	
		this.queuePhoneOverlay.setScale(DATA.bubbleR*2 / this.queuePhoneOverlay.width);
		this.queuePhoneOverlay.attr({
			x:this.gameplayLayer.x+this.gameplayLayer.bubbleLayer.x+this.gameplayLayer.bubbleLayer.queueBubble.x,
			y:this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.queuePhoneOverlay);
	},
	
	removePhoneQueueBubble:function()
	{
		this.removeChild(this.queuePhoneOverlay);
		this.queuePhoneOverlay = null;
	},
	
	movePhoneToCenter:function()
	{
		var yOff = this.queuePhoneOverlay.y - this.phoneBG.y;
		var yTarget = this.coreButtonsUI.y + (this.phoneBG.height*this.phoneBG.scale)/2 - (this.phoneBG.height*this.phoneBG.scale)*.1;
		//var xTarget = this.coreButtonsUI.challengeButton.x+(this.phoneBG.width*this.phoneBG.scale)/2;
		var xTarget = this.width*4/5;
	
		var moveAction = cc.moveTo(.3, xTarget, yTarget + yOff);
		var movePhoneSeq = new cc.Sequence(moveAction, cc.callFunc(this.initPhoneUpdate, this));
		this.queuePhoneOverlay.runAction(movePhoneSeq);
		
		var moveLabelAction = cc.moveTo(.3, xTarget, yTarget + yOff - DATA.bubbleR-1);
		this.emojiMoveLabel.runAction(moveLabelAction);
		
		var phoneMoveAction = cc.moveTo(.3, xTarget, yTarget);
		this.phoneBG.runAction(phoneMoveAction);
	},
	
	movePhoneDown:function()
	{cc.log("PHONE DOWN");
		var yOff = this.queuePhoneOverlay.y - this.phoneBG.y;
		var yTarget = this.coreButtonsUI.y + (this.phoneBG.height*this.phoneBG.scale)/2 - (this.phoneBG.height*this.phoneBG.scale)*.1;
		
	
		var moveAction = cc.moveTo(.3, this.queuePhoneOverlay.x, yTarget + yOff);
		var movePhoneSeq = new cc.Sequence(moveAction, cc.callFunc(this.initPhoneUpdate, this));
		this.queuePhoneOverlay.runAction(movePhoneSeq);
		
		var moveLabelAction = cc.moveTo(.3, this.emojiMoveLabel.x, yTarget + yOff - DATA.bubbleR-1);
		this.emojiMoveLabel.runAction(moveLabelAction);
		
		var phoneMoveAction = cc.moveTo(.3, this.queuePhoneOverlay.x, yTarget);
		this.phoneBG.runAction(phoneMoveAction);
	},
	movePhoneUp:function()
	{cc.log("PHONE UP");
		if(this.phoneMode == "moves")
		{
			this.phoneMode = "emoji";
			var origX = this.movesPhoneOverlay.x;
			var origY = this.movesPhoneOverlay.y;
			
			this.removeChild(this.movesPhoneOverlay);
			this.movesPhoneOverlay = null;
			
			if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "red")
	    		this.queuePhoneOverlay = new cc.Sprite(res.angry_emoji);
	    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "yellow")
	    		this.queuePhoneOverlay = new cc.Sprite(res.smile_emoji);
	    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "green")
	    		this.queuePhoneOverlay = new cc.Sprite(res.sick_emoji);
	    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "blue")
	    		this.queuePhoneOverlay = new cc.Sprite(res.sad_emoji);
	    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "pink")
	    		this.queuePhoneOverlay = new cc.Sprite(res.love_emoji);
	    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "purple")
	    		this.queuePhoneOverlay = new cc.Sprite(res.evil_emoji);
	    	
			this.queuePhoneOverlay.setScale(DATA.bubbleR*2 / this.queuePhoneOverlay.width);
			this.queuePhoneOverlay.attr({
				x:this.gameplayLayer.x+this.gameplayLayer.bubbleLayer.x+this.gameplayLayer.bubbleLayer.queueBubble.x,
				//x:origX,
				y:this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y,
				//y:origY,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.queuePhoneOverlay);
			
			/*this.emojiMoveLabel = new cc.LabelTTF(this.gameplayLayer.bubbleLayer.numMoves);
	    	this.emojiMoveLabel.attr({
	    		x:this.phoneBG.x,
	    		y:this.queuePhoneOverlay.y-DATA.bubbleR-1,
	    		anchorX:.5,
	    		anchorY:1
	    	});
	    	this.emojiMoveLabel.color = cc.color(0,0,0,255);
	    	this.addChild(this.emojiMoveLabel);*/
			
		}
		
		var moveAction = cc.moveTo(.3, this.width*.17, this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y/* - (this.phoneBG.height*this.phoneBG.scale)*.1*/)
		this.queuePhoneOverlay.runAction(moveAction);
		
		var moveLabelAction = cc.moveTo(.3, this.width*.17, this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y /*- (this.phoneBG.height*this.phoneBG.scale)*.1*/ - DATA.bubbleR-1)
		this.emojiMoveLabel.runAction(moveLabelAction);
		
		
		this.unschedule(this.updatePhone);
		
		var phoneMoveAction = cc.moveTo(.3, this.width*.17, this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y - (this.phoneBG.height*this.phoneBG.scale)*.1)
		this.phoneBG.runAction(phoneMoveAction);
	},
	
	initPhoneUpdate:function()
	{
		//this.schedule(this.updatePhone, 3);
	},
	
	updatePhone:function()
	{
		// Change to moves left.
		if(this.phoneMode == "emoji")
		{cc.log("switch to moves");
			this.removeChild(this.queuePhoneOverlay);
			this.queuePhoneOverlay = null;
			this.removeChild(this.emojiMoveLabel);
			this.emojiMoveLabel = null;
			
			this.movesPhoneOverlay = new cc.LabelTTF("15/5","Arial",20);
			this.movesPhoneOverlay.attr({
				x:this.curMainLayer.x+this.gameplayLayer.bubbleLayer.queueBubble.x,
				y:this.curMainLayer.y-this.coreButtonsUI.height+this.gameplayLayer.bubbleLayer.queueBubble.y,
				anchorX:.5,
				anchorY:.5
			});
			this.movesPhoneOverlay.color = cc.color(255,0,0,255);
			this.addChild(this.movesPhoneOverlay);
			this.phoneMode = "moves";
		}
		// Change to queued emoji.
		else if(this.phoneMode == "moves")
		{cc.log("switch to emoji");
			this.removeChild(this.movesPhoneOverlay);
			this.movesPhoneOverlay = null;
			
			if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "red")
	    		this.queuePhoneOverlay = new cc.Sprite(res.angry_emoji);
	    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "yellow")
	    		this.queuePhoneOverlay = new cc.Sprite(res.smile_emoji);
	    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "green")
	    		this.queuePhoneOverlay = new cc.Sprite(res.sick_emoji);
	    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "blue")
	    		this.queuePhoneOverlay = new cc.Sprite(res.sad_emoji);
	    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "pink")
	    		this.queuePhoneOverlay = new cc.Sprite(res.love_emoji);
	    	else if(this.gameplayLayer.bubbleLayer.queueBubble.colorCode == "purple")
	    		this.queuePhoneOverlay = new cc.Sprite(res.evil_emoji);
	    	
			this.queuePhoneOverlay.setScale(DATA.bubbleR*2 / this.queuePhoneOverlay.width);
			this.queuePhoneOverlay.attr({
				x:this.curMainLayer.x+this.gameplayLayer.bubbleLayer.queueBubble.x,
				y:this.curMainLayer.y-this.coreButtonsUI.height+this.gameplayLayer.bubbleLayer.queueBubble.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.queuePhoneOverlay);
			
			this.emojiMoveLabel = new cc.LabelTTF(this.gameplayLayer.bubbleLayer.numMoves);
	    	this.emojiMoveLabel.attr({
	    		x:this.phoneBG.x,
	    		y:this.queuePhoneOverlay.y-DATA.bubbleR-1,
	    		anchorX:.5,
	    		anchorY:1
	    	});
	    	this.emojiMoveLabel.color = cc.color(0,0,0,255);
	    	this.addChild(this.emojiMoveLabel);
			
			
			this.phoneMode = "emoji";
		}
		// Change to countdown timer (SKIP FOR NOW)
		else if(this.phoneMode == "countdown")
		{
			this.removeChild(this.queuePhoneOverlay);
			this.queuePhoneOverlay = null;
			
			
			
			this.phoneMode = "emoji";
		}
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
			
			this.movePhoneToCenter();
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
			
			this.movePhoneUp();
			//this.coreButtonsUI.showLevelsButton();
			this.menuMode = "game";
			
			this.addChild(this.coreButtonsUI);
		}
	},
	
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
	},
	
	openNoLevelLayer:function()
	{
		this.noLevelLayer = new NoLevelLayer(cc.winSize.width-50, this.height-DATA.bottomUIHeight-DATA.topUIHeight-20);
		this.noLevelLayer.attr({x:cc.winSize.width*.5,y:25,anchorX:0,anchorY:0});
		this.addChild(this.noLevelLayer);
		this.noLevelLayer.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveToAction = cc.moveTo(.5, cc.p(25, DATA.bottomUIHeight+10));
		var spawn = cc.spawn(scaleAction, moveToAction);
		this.noLevelLayer.runAction(spawn);
	},
	
	openWorldMapLayer:function()
	{
		this.worldMapLayer = new WorldMapLayer(cc.winSize.width-50,cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-20, "normal");
		this.worldMapLayer.attr({
			x:this.topUILayer.mapButton.x+(this.topUILayer.mapButton.width*this.topUILayer.mapButton.scale)/2,
			y:this.topUILayer.y+this.topUILayer.mapButton.y+(this.topUILayer.mapButton.height*this.topUILayer.mapButton.scale)/2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.worldMapLayer, 9);
		this.worldMapLayer.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveToAction = cc.moveTo(.5, cc.p(25, DATA.bottomUIHeight+10));
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
	}
	
});
var MainContainerScene = cc.Scene.extend({
	ctor:function(bubbles, maxRow){
		this._super();
		this.bubbles = bubbles;
		this.maxRow = maxRow;
	},
	onEnter:function(){
		this._super();
		var layer = new MainContainerLayer(this.bubbles, this.maxRow);
		this.addChild(layer);
	}
});
