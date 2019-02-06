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
		
		this.bubbleLayerHeight = this.height-this.coreButtonsUI.height;

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
		this.worldElementLayer = null;
		
		this.shooterLabel = null;
		
		if(DATA.levelIndexB != null)
			this.triggerLevelsFullLabel();
		else if(this.bubbleLayer.numMoves <= 0)
			this.triggerBuyMovesLabel();
		
		
        return true;
	},
	/*onEnter:function()
	{
		this._super();
	},*/
	
	triggerRewardOnStart:function(rewardData)
	{
		var cardImg = null;
		if(rewardData.type == "extraBonus")
		{
			if(rewardData.number == 0)
			{
				cardImg = new cc.Sprite(res.ten_moves_gold_card);
				DATA.worldBallsLeft += 10;
			}
			else if(rewardData.number == 1)
			{
				cardImg = new cc.Sprite(res.fifteen_coins_gold_card);
				DATA.setCurrencies(DATA.coins+15,0);
				DATA.worldBallsLeft += 5;
			}
			else if(rewardData.number == 2)
			{
				cardImg = new cc.Sprite(res.twentyfive_coins_gold_card);
				DATA.setCurrencies(DATA.coins+15,0);
				DATA.worldBallsLeft += 5;
			}
			else if(rewardData.number == 3)
			{
				cardImg = new cc.Sprite(res.gem_gold_card);
				DATA.setCurrencies(DATA.coins+5,0);
			}
		}
		else if(rewardData.type == "bonus")
		{
			if(rewardData.number == 1)
				cardImg = new cc.Sprite(res.one_move_card);
			else if(rewardData.number == 3)
				cardImg = new cc.Sprite(res.three_move_card);
			else if(rewardData.number == 5)
				cardImg = new cc.Sprite(res.five_move_card);
			DATA.worldBallsLeft += rewardData.number;
		}
		
		DATA.setDatabaseMoves(DATA.worldBallsLeft);
		
		cardImg.setScale(cardImg.height / this.height/2);
		cardImg.attr({
			x:0-(cardImg.width*cardImg.scale)/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(cardImg);
		
		var moveAction = cc.moveTo(.5, this.width/2, this.height/2);
		
		var callAction = cc.callFunc(this.refreshUIQuantities, this);
		var delayAction = cc.delayTime(1.5);
		var spawn = cc.spawn(callAction, delayAction);
		
		var moveActionB = cc.moveTo(.5, this.width + (cardImg.width*cardImg.scale)/2, this.height/2);
		var removeAction = cc.callFunc(cardImg.removeFromParent, cardImg);
		
		var seq = new cc.Sequence(moveAction, spawn, moveActionB, removeAction);
		cardImg.runAction(seq);
		
		
		
	},
	
	refreshUIQuantities:function()
	{
		this.bubbleLayer.ballsLeftLabel.setString(DATA.worldBallsLeft);
		this.parent.topUILayer.setCoins(DATA.coins);
		
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
			this.buyPreboosterLayer == null &&
			this.worldElementLayer == null)
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
			{cc.log("world rewards");
				var returnObj = this.worldRewardsLayer.onTouchEnd(this.convertToNodeSpace(pos));
				/*if(returnObj == "close")
				{
					this.removeChild(this.worldRewardsLayer);
					this.worldRewardsLayer = null;
					return "close";
				}*/
				if(returnObj == "open")
				{
					//this.schedule(this.closeWorldRewardsLayer, 1.5);
				}
			}
			else if(this.worldElementLayer != null && FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.worldElementLayer))
			{
				var returnObj = this.worldElementLayer.onTouchEnd(this.convertToNodeSpace(pos));
			}
			
			
			
		}
	},
	
	openWorldRewardsLayer:function()
	{
		this.worldRewardsLayer = new WorldRewardsLayer(cc.winSize.width-50,this.height-50);
		this.worldRewardsLayer.attr({
			x:cc.winSize.width*.5,y:this.height*.5,anchorX:0,anchorY:0
		});
		this.addChild(this.worldRewardsLayer, 1);
		this.worldRewardsLayer.setScale(0);
		var scaleAction = cc.scaleTo(.5,1,1);
		var moveToAction = cc.moveTo(.5, cc.p(25,25));
		var spawn = cc.spawn(scaleAction, moveToAction);
		this.worldRewardsLayer.runAction(spawn);
	},
	
	closeWorldRewardsLayer:function()
	{cc.log("CLOOOSSSIIINGNGG WORLD REWARDS YO");
		var scaleAction = cc.scaleTo(.5,0,0);
		var moveToAction = cc.moveTo(.5, cc.p(cc.winSize.width/2, this.height/2));
		var spawn = cc.spawn(scaleAction, moveToAction);
		var seq = new cc.Sequence(
			spawn, 
			//cc.callFunc(this.worldRewardsLayer.removeFromParent, this.worldRewardsLayer), 
			cc.callFunc(this.parent.openWorldMapLayerAfterCompletion, this.parent)
		);
		this.worldRewardsLayer.runAction(seq);
		this.worldRewardsLayer = null;
		
	},
	
	openWorldElementLayer:function()
	{cc.log("OPEN WORLD ELEMENT LAYER");
		if((""+DATA.worldIndex) in DATA.worldElements)
		{cc.log("NEW ELEMENT");
			this.worldElementLayer = new WorldElementLayer(cc.winSize.width-50, this.height-50);
			this.worldElementLayer.attr({
				x:cc.winSize.width/2,
				y:this.height/2,
				anchorX:0,
				anchorY:0
			});
			this.worldElementLayer.setScale(0);
			this.addChild(this.worldElementLayer);
			var moveAction = cc.moveTo(.5,25,25);
			var scaleAction = cc.scaleTo(.5,1,1);
			var spawn = cc.spawn(moveAction, scaleAction);
			this.worldElementLayer.runAction(spawn);
		}
		else
		{cc.log("LOAD WORLD");
			this.loadNextWorld();
		}
		
		
	},
	
	loadNextWorld:function()
	{
		if(this.worldElementLayer != null)
		{
			this.removeChild(this.worldElementLayer);
			this.worldElementLayer = null;
		}
		this.removeChild(this.bubbleLayer);
		this.bubbleLayer = null;
		
		var level = DATA.levels[DATA.worldIndex];
		DATA.worldBubbles = [];
		for(var i=0; i<level.bubbles.length; i++)
		{
			DATA.worldBubbles.push(level.bubbles[i]);
		}
		DATA.setWorldDatabaseBubbles(DATA.worldBubbles);
		//DATA.worldBubbles = level.bubbles;
		var maxRow = 0;
		for(var i=0; i<DATA.worldBubbles.length; i++)
		{
			if(DATA.worldBubbles[i].row > maxRow)
				maxRow = DATA.worldBubbles[i].row;
		}
		cc.log(level.bubbles);
		this.bubbleLayer = new BubbleLayer(level.bubbles, maxRow+1, DATA.worldBallsLeft, "world", cc.winSize.width, this.height-this.coreButtonsUI.height, []);	
		this.bubbleLayer.attr({
			x:0,
			y:this.coreButtonsUI.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		/*DATA.database.ref("worlds/levels/"+DATA.worldIndex).once("value").then(function(snapshot){
			var d = snapshot.val();
			var bubbles = [];
		  	var bubKeys = Object.keys(d.bubbles);
		  	for(var i=0; i<bubKeys.length; i++)
		  	{
		  		var dBub = d.bubbles[bubKeys[i]];
		  		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:dBub.colorCode};
		    	bubbles.push(bubble);
		  	}
		  	var queue = {type:d.queue.type, colors:d.queue.colors};
		  	DATA.worldLevel = {"bubbles":bubbles, "queue":queue};
		  	
		  	//var bubbles = DATA.worldLevel.bubbles;
		
			var maxRow = 0;
			for(var i=0; i<bubbles.length; i++)
			{
				if(bubbles[i].row > maxRow)
					maxRow = bubbles[i].row;
			}
			
			DATA.worldBubbles = bubbles;
			//DATA.setWorldQueue(DATA.worldLevel.queue);
			
			cc.log(this.coreButtonsUI);
			// load next world
			this.bubbleLayer = null;
			this.bubbleLayer = new BubbleLayer(DATA.worldBubbles, maxRow, DATA.worldBallsLeft, "world", cc.winSize.width, this.bubbleLayerHeight, []);	
			this.bubbleLayer.attr({
				x:0,
				y:0,//this.coreButtonsUI.height,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.bubbleLayer);
			
			
		});*/
	},
	
	openPreLayer:function()
	{
		this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height-50);
		this.preLayer.attr({x:cc.winSize.width*.5,y:25,anchorX:0,anchorY:0});
		this.addChild(this.preLayer, 1);
		this.preLayer.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveToAction = cc.moveTo(.5, cc.p(25, 25));
		var spawn = cc.spawn(scaleAction, moveToAction);
		this.preLayer.runAction(spawn);
	}
});