var MainContainerLayer = cc.Layer.extend({
	ctor:function(bubbles, maxRow){
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
		
		this.curTabName = "gameplay";
		
		this.bubbles = bubbles;
		this.maxRow = maxRow;
		
		this.gameplayLayer = new GameplayLayer(bubbles, maxRow, cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight);
		this.gameplayLayer.attr({
			x:0,
			y:DATA.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.gameplayLayer);
		
		this.curMainLayer = this.gameplayLayer;
		
		this.challengeLayer = new ChallengeMenuDisplayLayer(cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight);
		this.challengeLayer.attr({
			x:cc.winSize.width*-1,
			y:DATA.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.challengeLayer);
		
		this.meLayer = new MeDisplayLayer(cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight);
		this.meLayer.attr({
			x:cc.winSize.width*-2,
			y:DATA.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.meLayer);
		
		this.friendsLayer = new FriendsDisplayLayer(cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight);
		this.friendsLayer.attr({
			x:cc.winSize.width,
			y:DATA.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.friendsLayer);
		
		this.leagueLayer = new LeagueDisplayLayer(cc.winSize.height-DATA.bottomUIHeight-DATA.topUIHeight);
		this.leagueLayer.attr({
			x:cc.winSize.width*2,
			y:DATA.bottomUIHeight,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.leagueLayer);
		
		this.settingsLayer = null;
		this.worldMapLayer = null;
		
		var self = this;
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){
			   		var target = event.getCurrentTarget();
			    	var locationInNode = self.curMainLayer.convertToNodeSpace(touch.getLocation());

					if(!self.isPopup())
					{
				    	if(FUNCTIONS.posWithin(locationInNode, self.curMainLayer))
				    	{
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
			    	var locationInNode = self.curMainLayer.convertToNodeSpace(touch.getLocation());

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
							var returnObj = self.worldMapLayer.onTouchMoved(touch.getLocation());
							
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
				    		botReturn = self.bottomUILayer.onTouchEnd(locationInNode);
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
			    				
			    				self.curMainLayer = self.challengeLayer;
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
				    			
			    				//var seq = new cc.Sequence(moveLeftAction, cc.callFunc( self.challengeLayer.removeFromParent, self.challengeLayer ) );
		
			    				self.curMainLayer = self.gameplayLayer;
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
				    			
				    			self.curMainLayer = self.meLayer;
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
				    			}
				    			else if(self.curTabName == "league")
				    			{
				    				moveDistance = cc.winSize.width;
				    			}
				    			
				    			self.slideTabs(moveDistance);
				    			
				    			self.curMainLayer = self.friendsLayer;
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
				    			}
				    			else if(self.curTabName == "friends")
				    			{
				    				moveDistance = cc.winSize.width*-1;
				    			}
				    			
				    			self.slideTabs(moveDistance);
				    			
				    			self.curMainLayer = self.leagueLayer;
				    			self.curTabName = "league";
				    			self.bottomUILayer.selectButton(self.curTabName);
				    		}
				    	}
				    	else if(FUNCTIONS.posWithin(touch.getLocation(), self.topUILayer))
				    	{cc.log("topUI");
				    		//self.openWorldMapLayer();
				    		self.topUILayer.onTouchEnd(touch.getLocation());
				    	}
				    	else if(FUNCTIONS.posWithin(/*self.curMainLayer.convertToNodeSpace(touch.getLocation())*/touch.getLocation(), self.curMainLayer))
				    	{cc.log("curLayerrrrrr");
				    		self.curMainLayer.onTouchEnded(touch.getLocation());
				    	}
					 	
					 	cc.log(self.curMainLayer.x+" "+
					 			self.curMainLayer.y+" "+
					 			self.curMainLayer.width+" "+
					 			self.curMainLayer.height);
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
					}
					
			    	return true;
			    }
		    },this);
		}
		
        //return true;
	},
	
	isPopup:function()
	{
		if(this.settingsLayer != null || this.worldMapLayer != null)
			return true;
		return false;
	},
	
	openSettingsLayer:function()
	{
		
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
	
	slideTabs:function(moveDistance)
	{
		var moveAction = cc.moveBy(.5, cc.p(moveDistance, 0));
		//var seq = new cc.Sequence(moveRightAction, cc.callFunc( self.gameplayLayer.removeFromParent, self.gameplayLayer ) );
		this.gameplayLayer.runAction(moveAction);
		
		var moveActionB = cc.moveBy(.5, cc.p(moveDistance, 0));
		this.challengeLayer.runAction(moveActionB);
		
		var moveActionC = cc.moveBy(.5, cc.p(moveDistance, 0));
		this.meLayer.runAction(moveActionC);
		
		var moveActionD = cc.moveBy(.5, cc.p(moveDistance, 0));
		this.friendsLayer.runAction(moveActionD);
		
		var moveActionE = cc.moveBy(.5, cc.p(moveDistance, 0));
		this.leagueLayer.runAction(moveActionE);
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
