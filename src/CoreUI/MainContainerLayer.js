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
		this.addChild(this.bottomUILayer);
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
		
		
		
		
		
		
		
		this.mainEditorLayer = new EditorLayer(cc.winSize.width, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height);
		this.mainEditorLayer.attr({
			x:0,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		
		this.editorCreatorsLayer = new CreatorsDisplayLayer(cc.winSize.width, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height);
		this.editorCreatorsLayer.attr({
			x:cc.winSize.width*1,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.editorEventLayer = new CreatorEventLayer(cc.winSize.width, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height);
		this.editorEventLayer.attr({
			x:cc.winSize.width*2,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		
		this.editorRewardsLayer = new CreatorRewardsLayer(cc.winSize.width, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height);
		this.editorRewardsLayer.attr({
			x:cc.winSize.width*-1,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		
		this.editorShopLayer = new CreatorsDisplayLayer(cc.winSize.width, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height);
		this.editorShopLayer.attr({
			x:cc.winSize.width*-2,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
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
			x:cc.winSize.width,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.friendsLayer);
		
		this.leagueLayer = new LeagueDisplayLayer(cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight-this.coreButtonsUI.height);
		this.leagueLayer.attr({
			x:cc.winSize.width*2,
			y:DATA.bottomUIHeight+this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.leagueLayer);
		
		this.phoneMode = "emoji";
		
		this.phoneBG = new cc.Sprite(res.phone);
    	this.phoneBG.setScale(DATA.bubbleR*3 / this.phoneBG.height)
    	this.phoneBG.attr({
    		x:this.gameplayLayer.bubbleLayer.queueBubble.x,
    		y:this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y,
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
		
		
		
		
		this.preLayer = null;
		this.settingsLayer = null;
		this.worldMapLayer = null;
		
		var self = this;
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){cc.log("TOUCHSTART");
			   		var target = event.getCurrentTarget();
			    	var locationInNode = self.convertToNodeSpace(touch.getLocation());
					cc.log(locationInNode);
					cc.log(self.curMainLayer);
					if(!self.isPopup())
					{cc.log("nopopup");cc.log(self.curMainLayer);
				    	if(FUNCTIONS.posWithin(locationInNode, self.curMainLayer))
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
			    },
			    onTouchMoved: function(touch, event){
			    	var target = event.getCurrentTarget();
			    	var locationInNode = self.convertToNodeSpace(touch.getLocation());

					if(!self.isPopup())
					{
				    	if(FUNCTIONS.posWithin(locationInNode, self.curMainLayer))
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
			    },
			    onTouchEnded: function(touch, event){cc.log("touchend main");
				    var target = event.getCurrentTarget();
				    var locationInNode = self.bottomUILayer.convertToNodeSpace(touch.getLocation());
			    	
			    	if(!self.isPopup())
					{
				    	if(FUNCTIONS.posWithin(locationInNode, self.bottomUILayer))
				    	{cc.log("bottom");
				    		var botReturn = null;
				    		botReturn = self.bottomUILayer.onTouchEnd(touch.getLocation()/*locationInNode*/);
				    		
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
					    			var moveDistance = 0;
					    			if(self.curTabName == "me")
					    			{
					    				moveDistance = cc.winSize.width*-1;
					    			}
					    			else if(self.curTabName == "gameplay")
					    			{
					    				moveDistance = cc.winSize.width*1;
					    				
					    				if(self.menuMode == "game")
					    					self.movePhoneDown();
					    			}
					    			else if(self.curTabName == "friends")
					    			{
					    				moveDistance = cc.winSize.width*2;
					    			}
					    			else if(self.curTabName == "league")
					    			{
					    				moveDistance = cc.winSize.width*3;
					    			}
					    			
				    				self.slideTabs(moveDistance);
				    				
				    				if(self.menuMode == "game")
				    					self.curMainLayer = self.challengeLayer;
				    				else if(self.menuMode == "creator")
				    					self.curMainLayer = self.editorRewardsLayer;
				    				self.curTabName = "challenge";
					    			self.bottomUILayer.selectButton(self.curTabName);
					    		}
					    		else if(botReturn == "gameplay")
					    		{
					    			var moveDistance = 0;
					    			if(self.curTabName == "me")
					    			{
					    				moveDistance = cc.winSize.width*-2;
					    			}
					    			else if(self.curTabName == "challenge")
					    			{
					    				moveDistance = cc.winSize.width*-1;
					    			}
					    			else if(self.curTabName == "friends")
					    			{
					    				moveDistance = cc.winSize.width;
					    			}
					    			else if(self.curTabName == "league")
					    			{
					    				moveDistance = cc.winSize.width*2;
					    			}
					    			
					    			self.slideTabs(moveDistance);
					    			
					    			self.movePhoneUp();
					    			
				    				//var seq = new cc.Sequence(moveLeftAction, cc.callFunc( self.challengeLayer.removeFromParent, self.challengeLayer ) );
			
									if(self.menuMode == "game")
				    					self.curMainLayer = self.gameplayLayer;
				    				else if(self.menuMode == "creator")
				    					self.curMainLayer = self.mainEditorLayer;
				    				self.curTabName = "gameplay";
					    			self.bottomUILayer.selectButton(self.curTabName);
					    		}
					    		else if(botReturn == "me")
					    		{
					    			var moveDistance = 0;
					    			if(self.curTabName == "challenge")
					    			{
					    				moveDistance = cc.winSize.width;
					    			}
					    			else if(self.curTabName == "gameplay")
					    			{
					    				moveDistance = cc.winSize.width*2;
					    				
					    				if(self.menuMode == "game")
					    					self.movePhoneDown();
					    			}
					    			else if(self.curTabName == "friends")
					    			{
					    				moveDistance = cc.winSize.width*3;
					    			}
					    			else if(self.curTabName == "league")
					    			{
					    				moveDistance = cc.winSize.width*4;
					    			}
					    			
					    			self.slideTabs(moveDistance);
					    			
					    			
					    			if(self.menuMode == "game")
					    				self.curMainLayer = self.meLayer;
				    				else if(self.menuMode == "creator")
				    					self.curMainLayer = self.editorShopLayer;
					    			self.curTabName = "me";
					    			self.bottomUILayer.selectButton(self.curTabName);
					    		}
					    		else if(botReturn == "friends")
					    		{
					    			var moveDistance = 0;
					    			if(self.curTabName == "me")
					    			{
					    				moveDistance = cc.winSize.width*-3;
					    			}
					    			else if(self.curTabName == "challenge")
					    			{
					    				moveDistance = cc.winSize.width*-2;
					    			}
					    			else if(self.curTabName == "gameplay")
					    			{
					    				moveDistance = cc.winSize.width*-1;
					    				
					    				if(self.menuMode == "game")
					    					self.movePhoneDown();
					    			}
					    			else if(self.curTabName == "league")
					    			{
					    				moveDistance = cc.winSize.width;
					    			}
					    			
					    			self.slideTabs(moveDistance);
					    			
					    			if(self.menuMode == "game")
					    				self.curMainLayer = self.friendsLayer;
				    				else if(self.menuMode == "creator")
				    					self.curMainLayer = self.editorCreatorsLayer;
					    			self.curTabName = "friends";
					    			self.bottomUILayer.selectButton(self.curTabName);
					    		}
					    		else if(botReturn == "league")
					    		{
					    			var moveDistance = 0;
					    			if(self.curTabName == "me")
					    			{
					    				moveDistance = cc.winSize.width*-4;
					    			}
					    			else if(self.curTabName == "challenge")
					    			{
					    				moveDistance = cc.winSize.width*-3;
					    			}
					    			else if(self.curTabName == "gameplay")
					    			{
					    				moveDistance = cc.winSize.width*-2;
					    				
					    				if(self.menuMode == "game")
					    					self.movePhoneDown();
					    			}
					    			else if(self.curTabName == "friends")
					    			{
					    				moveDistance = cc.winSize.width*-1;
					    			}
					    			
					    			self.slideTabs(moveDistance);
					    			
					    			if(self.menuMode == "game")
					    				self.curMainLayer = self.leagueLayer;
				    				else if(self.menuMode == "creator")
				    					self.curMainLayer = self.editorEventLayer;
					    			self.curTabName = "league";
					    			self.bottomUILayer.selectButton(self.curTabName);
					    		}
				    		}
				    	}
				    	else if(FUNCTIONS.posWithin(touch.getLocation(), self.topUILayer))
				    	{cc.log("topUI");
				    		//self.openWorldMapLayer();
				    		self.topUILayer.onTouchEnd(touch.getLocation());
				    	}
				    	else if(/*FUNCTIONS.posWithin(touch.getLocation(), self.coreButtonsUI) ||*/ FUNCTIONS.posWithin(touch.getLocation(), self.curMainLayer))
				    	{cc.log("curLayerrrrrr");
				    		self.curMainLayer.onTouchEnded(touch.getLocation());
				    	}
				    	else if(FUNCTIONS.posWithin(touch.getLocation(), self.coreButtonsUI))
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
						
					}
					
			    	return true;
			    }
		    },this);
		}
		
        //return true;
	},
	
	updatePhoneQueueBubble:function()
	{
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
	
	movePhoneDown:function()
	{cc.log("PHONE DOWN");
		var moveAction = cc.moveTo(.3, this.queuePhoneOverlay.x, this.coreButtonsUI.y+(this.coreButtonsUI.height/2));
		var movePhoneSeq = new cc.Sequence(moveAction, cc.callFunc(this.initPhoneUpdate, this));
		this.queuePhoneOverlay.runAction(movePhoneSeq);
		
		
		var phoneMoveAction = cc.moveTo(.3, this.queuePhoneOverlay.x, this.coreButtonsUI.y+(this.coreButtonsUI.height/2));
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
				//x:this.gameplayLayer.x+this.gameplayLayer.bubbleLayer.x+this.gameplayLayer.bubbleLayer.queueBubble.x,
				x:origX,
				//y:this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y,
				y:origY,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.queuePhoneOverlay);
			
		}
		
		var moveAction = cc.moveTo(.3, this.queuePhoneOverlay.x, this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y)
		this.queuePhoneOverlay.runAction(moveAction);
		
		
		this.unschedule(this.updatePhone);
		
		var phoneMoveAction = cc.moveTo(.3, this.queuePhoneOverlay.x, this.gameplayLayer.y+this.gameplayLayer.bubbleLayer.y+this.gameplayLayer.bubbleLayer.queueBubble.y)
		this.phoneBG.runAction(phoneMoveAction);
	},
	
	initPhoneUpdate:function()
	{
		this.schedule(this.updatePhone, 3);
	},
	
	updatePhone:function()
	{
		// Change to moves left.
		if(this.phoneMode == "emoji")
		{cc.log("switch to moves");
			this.removeChild(this.queuePhoneOverlay);
			this.queuePhoneOverlay = null;
			
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
		if(this.preLayer != null || this.settingsLayer != null || this.worldMapLayer != null)
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
			
			this.coreButtonsUI.hideLevelsButton();
			this.menuMode = "creator";
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
			
			this.coreButtonsUI.showLevelsButton();
			this.menuMode = "game";
		}
	},
	
	openPreLayer:function()
	{
		this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height-DATA.bottomUIHeight-DATA.topUIHeight-20);
		this.preLayer.attr({x:cc.winSize.width*.5,y:DATA.bottomUIHeight+10,anchorX:0,anchorY:0});
		this.addChild(this.preLayer, 1);
		this.preLayer.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveToAction = cc.moveTo(.5, cc.p(25, DATA.bottomUIHeight+10));
		var spawn = cc.spawn(scaleAction, moveToAction);
		this.preLayer.runAction(spawn);
	},
	
	openWorldMapLayer:function()
	{
		this.worldMapLayer = new WorldMapLayer(cc.winSize.width-50,cc.winSize.height-50);
		this.worldMapLayer.attr({
			x:25,
			y:25,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.worldMapLayer, 9);
		
		
	},
	
	openWorldMapLayerAfterCompletion:function()
	{
		this.worldMapLayer = new WorldMapLayer(this.width-50, this.height-50);
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
