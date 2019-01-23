var GameplayLayer = cc.Layer.extend({
	ctor:function(bubbles, numRows, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		this.height = height;
        
		var size = cc.winSize;
		 
		
		this.coreButtonsUI = new CoreButtonsUI(cc.winSize.width/24, cc.winSize.height, "world");
		this.coreButtonsUI.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.coreButtonsUI);

		this.bubbleLayer = new BubbleLayer(bubbles, numRows, DATA.worldBallsLeft, "world", size.width, this.height-this.coreButtonsUI.height, []);	
		this.bubbleLayer.attr({
			x:0,
			y:this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		
		this.preLayer = null;
		this.worldRewardsLayer = null;
		this.buyBallsLayer = null;
		this.noLevelLayer = null;
		this.buyPreboosterLayer = null;
		
		this.shooterLabel = null;
		
		if(DATA.levelIndexB != null)
			this.triggerLevelsFullLabel();
		else if(this.bubbleLayer.numMoves <= 0)
			this.triggerBuyMovesLabel();
		
		
        return true;
	},
	
	triggerLevelsFullLabel:function()
	{
		this.levelsFullLabel = new cc.LabelTTF("Levels Full!","Roboto",30);
		this.levelsFullLabel.attr({
			x:cc.winSize.width/2,
			y:this.bubbleLayer.y+this.bubbleLayer.aimIndicator.y+this.bubbleLayer.aimIndicator.height/2,
			anchorX:0.5,
			anchorY:.5
		});
		this.levelsFullLabel.color=cc.color(255,0,0,255);
		this.addChild(this.levelsFullLabel);
	},
	
	triggerBuyMovesLabel:function()
	{
		this.outOfMovesLabel = new cc.LabelTTF("Buy Moves","Roboto",30);
		this.outOfMovesLabel.attr({
			x:cc.winSize.width/2,
			y:this.bubbleLayer.y+this.bubbleLayer.aimIndicator.y+this.bubbleLayer.aimIndicator.height/2,
			anchorX:0.5,
			anchorY:.5
		});
		this.outOfMovesLabel.color=cc.color(0,255,0,255);
		this.addChild(this.outOfMovesLabel);
	},
	
	removeBuyMovesLabel:function()
	{
		this.removeChild(this.outOfMovesLabel);
		this.outOfMovesLabel = null;
	},
	
	refreshLevelsUI:function()
	{
		this.coreButtonsUI.refreshLevelsUI();
	},
	
	isPopup:function()
	{
		if(this.preLayer == null &&
			this.worldRewardsLayer == null &&
			this.buyBallsLayer == null &&
			this.noLevelLayer == null &&
			this.buyPreboosterLayer == null)
		{
			return false;
		}
		return true;
	},
	
	onTouchBegan:function(pos)
	{
		if(!this.isPopup() && this.bubbleLayer.numMoves > 0 && DATA.levelIndexB == null)
	   	{
		   	var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
			if(FUNCTIONS.posWithin(locationInNode, this.bubbleLayer))
	    	{
	    		this.bubbleLayer.onTouchBegin(locationInNode);
	    	}
	    }
	},
	onTouchMoved:function(pos)
	{
		if(!this.isPopup() && this.bubbleLayer.numMoves > 0 && DATA.levelIndexB == null)
	   	{
			var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
			if(this.bubbleLayer.pointWithin(locationInNode))
	    	{
	    		this.bubbleLayer.onTouchMove(locationInNode);
	    	}
    	}
	},
	onTouchEnded:function(pos)
	{cc.log("end");
	   	var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
	   	if(!this.isPopup())
	   	{cc.log("no popup");
	   		// Bubble Layer - check for shooting-preventing popups, otherwise allow shot
			//if(FUNCTIONS.posWithin(locationInNode, this.bubbleLayer))
		   	if(FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.bubbleLayer))
		   	{cc.log("withinBub");
		   		if(DATA.levelIndexB != null)
				{
					this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height-50);
					this.preLayer.attr({x:cc.winSize.width*.5,y:25,anchorX:0,anchorY:0});
					this.addChild(this.preLayer);
					this.preLayer.setScale(0);
					var scaleAction = cc.scaleTo(.5, 1, 1);
					var moveToAction = cc.moveTo(.5, cc.p(25, 25));
					var spawn = cc.spawn(scaleAction, moveToAction);
					this.preLayer.runAction(spawn);
				}
				else if(this.bubbleLayer.numMoves == 0)
				{
					this.buyBallsLayer = new BuyBallsLayer(this.width-50,this.height-50);
					this.buyBallsLayer.attr({
						x:25,y:25,
						anchorX:0,anchorY:0
					});
					this.addChild(this.buyBallsLayer);
				}
		   		else this.bubbleLayer.onTouchEnd(locationInNode);
		   	}
		   	// Store/Challenge/Creator Button Interactions
		   	else if(FUNCTIONS.posWithin(this.coreButtonsUI.convertToNodeSpace(pos), this.coreButtonsUI))
		   	{
		   		var returnObj = this.coreButtonsUI.onTouchEnd(this.coreButtonsUI.convertToNodeSpace(pos));
		   		
		   		if(returnObj == "challengeButton" && this.preLayer == null)
		   		{
		   			if(DATA.levelIndexA!=null)
					{
						this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height-50);
						this.preLayer.attr({x:cc.winSize.width*.5,y:25,anchorX:0,anchorY:0});
						this.addChild(this.preLayer);
						this.preLayer.setScale(0);
						var scaleAction = cc.scaleTo(.5, 1, 1);
						var moveToAction = cc.moveTo(.5, cc.p(25, 25));
						var spawn = cc.spawn(scaleAction, moveToAction);
						this.preLayer.runAction(spawn);
					}
					else
					{
						this.noLevelLayer = new NoLevelLayer(cc.winSize.width-50, this.height-50);
						this.noLevelLayer.attr({x:cc.winSize.width*.5,y:25,anchorX:0,anchorY:0});
						this.addChild(this.noLevelLayer);
						this.noLevelLayer.setScale(0);
						var scaleAction = cc.scaleTo(.5, 1, 1);
						var moveToAction = cc.moveTo(.5, cc.p(25, 25));
						var spawn = cc.spawn(scaleAction, moveToAction);
						this.noLevelLayer.runAction(spawn);
					}
		   		}
		   	}
		}
		// Popup interactions
		else
		{
			// PRE-CHALLENGE POPUP
			if(this.preLayer != null && FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.preLayer))
			{
				var returnObj = this.preLayer.onTouchEnd(this.convertToNodeSpace(pos));
				
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
			else if(this.buyPreboosterLayer != null && FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.buyPreboosterLayer))
			{
				var returnObj = this.buyPreboosterLayer.onTouchEnd(this.convertToNodeSpace(pos));
				if(returnObj == "close")
				{
					this.removeChild(this.buyPreboosterLayer);
					this.buyPreboosterLayer = null;
					//return "close";
				}
				else if(returnObj == "buy-plus_five")
				{
					DATA.setPreBoosterInventories(DATA.preBoosterInventoryA+1);
					
					this.removeChild(this.buyPreboosterLayer);
					this.buyPreboosterLayer = null;
					
					this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height-50);
					this.preLayer.attr({x:25,y:25,anchorX:0,anchorY:0});
					this.addChild(this.preLayer);
					//return "openPrelayer"
				}
			}
			/*else if(this.openLevelReminderLayer != null && FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.openLevelReminderLayer))
			{
				var returnObj = this.openLevelReminderLayer.onTouchEnd(this.convertToNodeSpace(pos));cc.log(returnObj);
				if(returnObj == "close")
				{
					this.removeChild(this.openLevelReminderLayer);
					this.openLevelReminderLayer = null;
					//return "close";
				}
				else if(returnObj == "play-level")
				{
					this.removeChild(this.openLevelReminderLayer);
					this.openLevelReminderLayer = null;
					
					this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height-50);
					this.preLayer.attr({x:25,y:25,anchorX:0,anchorY:0});
					this.addChild(this.preLayer);
					//return "openPrelayer"
				}
			}*/
			else if(this.noLevelLayer != null && FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.noLevelLayer))
			{
				var returnObj = this.noLevelLayer.onTouchEnd(this.convertToNodeSpace(pos));
				if(returnObj == "close")
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
			else if(this.buyBallsLayer != null && FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.buyBallsLayer))
			{
				var returnObj = this.buyBallsLayer.onTouchEnd(this.convertToNodeSpace(pos));
				if(returnObj == "close")
				{
					this.removeChild(this.buyBallsLayer);
					this.buyBallsLayer = null;
					return "close";
				}
				else if(returnObj == "buy")
				{
					this.bubbleLayer.addMoves(5);
					DATA.worldBallsLeft = this.bubbleLayer.numMoves;
					DATA.setDatabaseMoves(this.bubbleLayer.numMoves);
					this.removeChild(this.buyBallsLayer);
					this.buyBallsLayer = null;
					
					this.removeChild(this.outOfMovesLabel);
					this.outOfMovesLabel = null;
					this.bubbleLayer.drawAimIndicator();
				}
				else if(returnObj == "watch")
				{
					this.bubbleLayer.addMoves(1);
					DATA.worldBallsLeft = this.bubbleLayer.numMoves;
					DATA.setDatabaseMoves(this.bubbleLayer.numMoves);
					this.removeChild(this.buyBallsLayer);
					this.buyBallsLayer = null;
					
					this.removeChild(this.outOfMovesLabel);
					this.outOfMovesLabel = null;
					this.bubbleLayer.drawAimIndicator();
				}
			}
			else if(this.worldRewardsLayer != null && FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.worldRewardsLayer))
			{
				var returnObj = this.worldRewardsLayer.onTouchEnd(this.convertToNodeSpace(pos));
				if(returnObj == "close")
				{
					this.removeChild(this.worldRewardsLayer);
					this.worldRewardsLayer = null;
					return "close";
				}
			}
			
			
			
		}
	},
	
	openPreLayer:function()
	{
		this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height-50);
		this.preLayer.attr({x:cc.winSize.width*.5,y:25,anchorX:0,anchorY:0});
		this.addChild(this.preLayer);
		this.preLayer.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveToAction = cc.moveTo(.5, cc.p(25, 25));
		var spawn = cc.spawn(scaleAction, moveToAction);
		this.preLayer.runAction(spawn);
	}
});