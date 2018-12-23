var ChallengeLayer = cc.Layer.extend({
	ctor:function(bubbles, numRows, numMoves, preboosters){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		
		this.bottomUILayer = new ChallengeBottomUILayer(size.height/12);
		this.bottomUILayer.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0
		});
		this.addChild(this.bottomUILayer);
		
		this.topUILayer = new ChallengeTopUILayer(size.height/15);
		this.topUILayer.attr({
			x: 0,
			y:size.height-(size.height/15),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.topUILayer);

		

		this.bubbleLayer = new BubbleLayer(bubbles, numRows, numMoves, "challenge", size.width, size.height-this.bottomUILayer.height-this.topUILayer.height, preboosters);	
		this.bubbleLayer.attr({
			x:0,
			y:this.bottomUILayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		this.settingsLayer = null;
		this.quitConfirmLayer = null;
		this.buyBoosterLayer = null;
		
		
		var self = this;
		
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){
			    	
			    	if(!self.isPopUp())
			    	{
				   		var target = event.getCurrentTarget();
				    	var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
	
				    	if(self.bubbleLayer.pointWithin(locationInNode))
				    	{
				    		self.bubbleLayer.onTouchBegin(locationInNode);
				    	}
			    	}
			    	
			    	
			    	return true;
			    },
			    onTouchMoved: function(touch, event){
			    	
			    	var target = event.getCurrentTarget();
				    	
			    	if(!self.isPopUp())
			    	{
				    	var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
	
				    	if(self.bubbleLayer.pointWithin(locationInNode))
				    	{
				    		self.bubbleLayer.onTouchMove(locationInNode);
				    	}
			    	}
			    	
			    	return true;
			    },
			    onTouchEnded: function(touch, event){
			    	
			    	if(!self.isPopUp())
			    	{
					    var target = event.getCurrentTarget();
					    var locationInNode = self.topUILayer.convertToNodeSpace(touch.getLocation());
					    
					    if(locationInNode.y > 0)
					    {cc.log("top layer touch");
					    	var returnObj = self.topUILayer.onTouchEnd(locationInNode);cc.log(returnObj);
					    	if(returnObj == "settings")
					    	{
					    		self.settingsLayer = new SettingsLayer(size.width-50, size.height-50);
					    		self.settingsLayer.attr({
					    			x:25,
					    			y:25,
					    			anchorX:0,
					    			anchorY:0
					    		});
					    		self.addChild(self.settingsLayer);
					    	}
					    }
					    else
					    {
					    
						    locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
						    //cc.log(locationInNode);
						    if(locationInNode.y < 0)
						    {
						    	var loc = self.bottomUILayer.convertToNodeSpace(touch.getLocation());
						    	var returnObj = self.bottomUILayer.onTouchEnd(loc);
						    	if(returnObj == "bomb-booster")
						    	{
						    		self.bubbleLayer.changeShooter(1);
						    	}
						    	else if(returnObj == "bomb-booster-empty")
						    	{
						    		self.buyBoosterLayer = new BuyBoosterLayer(size.width-50, size.height-50, "bomb");
						    		self.buyBoosterLayer.attr({
						    			x:25,
						    			y:25,
						    			anchorX:0,
						    			anchorY:0
						    		});
						    		self.addChild(self.buyBoosterLayer);
						    	}
						    }
					    	/*else if(self.editButton.pointWithin(touch.getLocation()))
					    	{
					    		cc.director.runScene(new EditorScene());
					    	}*/
					    	else self.bubbleLayer.onTouchEnd(locationInNode);
				   		}
				   	}
				   	else
				   	{
				   		if(self.settingsLayer != null)
				   		{
				   			var loc = self.settingsLayer.convertToNodeSpace(touch.getLocation());
					    	var returnObj = self.settingsLayer.onTouchEnd(loc);
					    	if(returnObj == "close" || returnObj == "continue")
					    	{
					    		self.removeChild(self.settingsLayer);
					    		self.settingsLayer = null;
					    	}
					    	else if(returnObj == "quit")
					    	{
					    		self.removeChild(self.settingsLayer);
					    		self.settingsLayer = null;
					    		
					    		self.quitConfirmLayer = new QuitConfirmLayer(size.width-50, size.height-50);
					    		self.quitConfirmLayer.attr({
					    			x:25,
					    			y:25,
					    			anchorX:0,
					    			anchorY:0
					    		});
					    		self.addChild(self.quitConfirmLayer);
					    	}
					    	
				   		}
				   		else if(self.quitConfirmLayer != null)
				   		{
				   			var loc = self.quitConfirmLayer.convertToNodeSpace(touch.getLocation());
					    	var returnObj = self.quitConfirmLayer.onTouchEnd(loc);cc.log(returnObj);
					    	if(returnObj == "close" || returnObj == "continue")
					    	{
					    		self.removeChild(self.quitConfirmLayer);
					    		self.quitConfirmLayer = null;
					    	}
					    	else if(returnObj == "quit")
					    	{
					    		self.removeChild(self.quitConfirmLayer);
					    		self.quitConfirmLayer = null;
					    		
					    		if(DATA.challengeTries == DATA.streakStep)
								{
									DATA.levelIndexA = null;
									DATA.challengeTries = 0;
									DATA.streakStep = 0;
								}
								else DATA.challengeTries++;
								cc.director.runScene(new ChallengeFailScene());
					    	}
				   		}
				   		else if(self.buyBoosterLayer != null)
				   		{
				   			var loc = self.buyBoosterLayer.convertToNodeSpace(touch.getLocation());
					    	var returnObj = self.buyBoosterLayer.onTouchEnd(loc);
					    	if(returnObj == "close")
					    	{
					    		self.removeChild(self.buyBoosterLayer);
					    		self.buyBoosterLayer = null;
					    	}
					    	else if(returnObj == "buy-bomb")
					    	{
					    		DATA.coins--;
					    		DATA.boosterInventoryA++;
					    		
					    		self.removeChild(self.buyBoosterLayer);
					    		self.buyBoosterLayer = null;
					    		
					    		self.bubbleLayer.changeShooter(1);
					    	}
				   		}
				   	}
			    	return true;
			    }
		    },this);
		}
		
		
        return true;
	},
	
	isPopUp:function()
	{
		if(this.settingsLayer == null && 
			this.quitConfirmLayer == null &&
			this.buyBoosterLayer == null)
			return false;
		return true;
	}
	
});
var ChallengeScene = cc.Scene.extend({
	ctor:function(bubbles, numRows, numMoves, preBoosters){
		this._super();
		this.bubbles = bubbles;
		this.numRows = numRows;
		this.numMoves = numMoves;
		this.preBoosters = preBoosters;
	},
	onEnter:function(){
		this._super();
		var layer = new ChallengeLayer(this.bubbles, this.numRows, this.numMoves, this.preBoosters);
		this.addChild(layer);
	}
});
