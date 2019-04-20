var GameplayLayer = cc.Layer.extend({
	ctor:function(bubbles, numRows, height, meta){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		this.height = height;
        
		var size = cc.winSize;
		 
		this.cardImg = null;
		
		//cc.log(bubbles);cc.log(meta);
		
		this.bubbleLayerHeight = this.height;

		this.bubbleLayer = new BubbleLayer(bubbles, numRows, DATA.worldBallsLeft, "world", size.width, this.height, [], meta);	
		this.bubbleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.preLayer = null;
		this.worldRewardsLayer = null;
		this.buyBallsLayer = null;
		this.noLevelLayer = null;
		this.buyPreboosterLayer = null;
		this.worldElementLayer = null;
		
		this.cardTutorial = false;
		
		this.shooterLabel = null;
		
		if(DATA.levelIndexB != null)
			this.triggerLevelsFullLabel();
		else if(this.bubbleLayer.numMoves <= 0)
			this.triggerBuyMovesLabel();
			
		this.rewardData = null;
		

		
		
        return true;
	},
	/*onEnter:function()
	{
		this._super();
	},*/
	
	getChallengeButton:function()
	{
		return this.parent.coreButtonsUI.challengeButton;
	},
	
	executeTutorial:function(tutorial)
	{
		if(tutorial.type == "daily-challenges")
		{
			
		}
	},
	
	triggerRewardOnStart:function(rewardData)
	{
		
		
		
		this.cardImg = null;
		if(rewardData.type == "extraBonus")
		{
			if(rewardData.number == 0)
			{
				this.cardImg = new cc.Sprite(res.ten_moves_gold_card);
				DATA.worldBallsLeft += 10;
				this.rewardData = 10;
			}
			else if(rewardData.number == 1)
			{
				this.cardImg = new cc.Sprite(res.fifteen_coins_gold_card);
				DATA.setCurrencies(DATA.coins+15,0);
				DATA.worldBallsLeft += 5;
				this.rewardData = 5;
			}
			else if(rewardData.number == 2)
			{
				this.cardImg = new cc.Sprite(res.twentyfive_coins_gold_card);
				DATA.setCurrencies(DATA.coins+15,0);
				DATA.worldBallsLeft += 5;
				this.rewardData = 5;
			}
			else if(rewardData.number == 3)
			{
				this.cardImg = new cc.Sprite(res.gem_gold_card);
				DATA.setCurrencies(DATA.coins+5,0);
				this.rewardData = 1;
			}
		}
		else if(rewardData.type == "bonus")
		{
			if(rewardData.number == 1)
				this.cardImg = new cc.Sprite(res.one_move_card);
			else if(rewardData.number == 3)
				this.cardImg = new cc.Sprite(res.three_move_card);
			else if(rewardData.number == 5)
				this.cardImg = new cc.Sprite(res.five_move_card);
			DATA.worldBallsLeft += rewardData.number;
			this.rewardData = rewardData.number;
		}
		
		DATA.setDatabaseMoves(DATA.worldBallsLeft);
		
		this.cardImg.setScale(this.cardImg.height / this.height/2);
		this.cardImg.attr({
			x:0-(this.cardImg.width*this.cardImg.scale)/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.cardImg);
		
		this.okCardImg = new cc.Sprite(res.next_button);
		this.okCardImg.setScale((this.cardImg.width*this.cardImg.scale)*.5 / this.okCardImg.width);
		this.okCardImg.attr({
			x:this.cardImg.x/*+(this.cardImg.width*this.cardImg.scale)/2*/,
			y:this.cardImg.y-((this.cardImg.height*this.cardImg.scale)/2) + (this.cardImg.height*this.cardImg.scale)*.08,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.okCardImg);
		
		var moveAction = cc.moveTo(.5, this.width/2, this.height/2);
		
		/*var callAction = cc.callFunc(this.refreshUIQuantities, this);
		var delayAction = cc.delayTime(1.5);
		var spawn = cc.spawn(callAction, delayAction);
		
		var moveActionB = cc.moveTo(.5, this.width + (this.cardImg.width*this.cardImg.scale)/2, this.height/2);
		var removeAction = cc.callFunc(this.clearRewardAnim, this);
		
		var seq = new cc.Sequence(moveAction, spawn, moveActionB, removeAction);
		*/
		//this.cardImg.runAction(seq);
		this.cardImg.runAction(new cc.Sequence(cc.delayTime(1), moveAction));
		
		
		
		var okMoveAction = cc.moveTo(.5, this.width/2, this.okCardImg.y);
		this.okCardImg.runAction(new cc.Sequence(cc.delayTime(1), okMoveAction));
		
		
		if(DATA.worldIndex == 0 && this.bubbleLayer.bubbles.length > 100)
		{
			this.cardTutorial = true;
			this.popupDn = new cc.DrawNode();
			this.tutorialStreakTextA = null;
			this.tutorialStreakTextB = null;
			
			cc.log(DATA.worldBubbles.length);
			if(DATA.worldIndex == 0 && this.bubbleLayer.bubbles.length > 100/*&& DATA.worldBubbles.length > 120*/)
			{
					//Tutorial Popup
				/*this.addChild(this.popupDn);
				var botPosY = this.y + 3;
				this.dn.drawRect(cc.p(20,botPosY),
					cc.p(this.width-20, this.cardImg.y-(this.cardImg.height*this.cardImg.scale)/2 - 3),
					cc.color(255,255,255,255),4,cc.color(0,0,0,255)
				);
					
				this.tutorialStreakTextA = new cc.LabelTTF("You won extra moves!","Roboto",24);
				this.tutorialStreakTextA.attr({
					x:this.width/2,
					y:this.cardImg.y-(this.cardImg.height*this.cardImg.scale)/2 -10,
					anchorX:.5,
					anchorY:1
				});
				this.tutorialStreakTextA.color = cc.color(0,0,0,255);
				this.addChild(this.tutorialStreakTextA);
				this.tutorialStreakTextB = new cc.LabelTTF("","Roboto",24);
				this.tutorialStreakTextB.attr({
					x:this.width/2,
					y:this.tutorialStreakTextA.y-this.tutorialStreakTextA.height-3,
					anchorX:.5,
					anchorY:1
				});
				this.tutorialStreakTextB.color = cc.color(0,0,0,255);
				this.addChild(this.tutorialStreakTextB);
				
				this.tutFace = new cc.Sprite(res.nerd_emoji);
				this.tutFace.setScale(DATA.bubbleR*2.5 / this.tutFace.width);
				this.tutFace.attr({
					x:this.width-3,
					y:botPosY,
					anchorX:1,
					anchorY:.5
				});
				this.addChild(this.tutFace);*/
			}
		}
		
		
		
	},
	
	clearRewardAnim:function()
	{
		if(this.cardImg != null)
			this.removeChild(this.cardImg);
		if(this.okCardImg != null)
			this.removeChild(this.okCardImg);
		this.cardImg = null;
		this.okCardImg = null;
		
		if(this.tutorialStreakTextA != null)
		{
			this.removeChild(this.tutorialStreakTextA);
			this.tutorialStreakTextA = null;
		}
		if(this.tutorialStreakTextB != null)
		{
			this.removeChild(this.tutorialStreakTextB);
			this.tutorialStreakTextB = null;
		}
		if(this.tutFace != null)
		{
			this.removeChild(this.tutFace);
			this.tutFace = null;
		}
		this.dn.clear();
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
		this.parent.coreButtonsUI.refreshLevelsUI();
	},
	
	isPopup:function()
	{
		if(/*this.preLayer == null &&*/
			this.worldRewardsLayer == null &&
			this.buyBallsLayer == null &&
			this.noLevelLayer == null &&
			this.buyPreboosterLayer == null &&
			this.worldElementLayer == null &&
			this.cardImg == null)
		{
			return false;
		}
		return true;
	},
	
	onTouchBegan:function(pos)
	{cc.log("GAMEPLAY TOUCH BEGIN");
		if(!this.isPopup() && this.bubbleLayer.numMoves > 0 && DATA.levelIndexB == null)
	   	{
		   	var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
		   	cc.log(locationInNode);
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
					
					this.openPreLayer();
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
		   	
		   	
		}
		// Popup interactions
		else
		{
			// PRE-CHALLENGE POPUP
			/*if(this.preLayer != null && FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.preLayer))
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
			else */if(this.buyPreboosterLayer != null && FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.buyPreboosterLayer))
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
					
					this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height);
					this.preLayer.attr({x:25,y:0,anchorX:0,anchorY:0});
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
					var moveToAction = cc.moveTo(.5, cc.p(cc.winSize.width*.5,0));
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
			else if(this.okCardImg != null && FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.okCardImg))
			{
				
				var actions = [];
				for(var i=0; i<this.rewardData; i++)
				{
					actions.push(cc.callFunc(this.animateMoveReward, this));
					actions.push(cc.delayTime(.2));
				}
				
				actions.push(cc.delayTime(.3));
				actions.push(cc.callFunc(this.removeCard, this));
				
				var addMovesSeq = new cc.Sequence(actions);
				this.cardImg.runAction(addMovesSeq);
				
				/*
				var callAction = cc.callFunc(this.refreshUIQuantities, this);
				var delayAction = cc.delayTime(1.5);
				var spawn = cc.spawn(callAction, delayAction);
				
				var moveActionB = cc.moveTo(.5, this.width + (this.cardImg.width*this.cardImg.scale)/2, this.okCardImg.y);
				var removeAction = cc.callFunc(this.clearRewardAnim, this);
				
				var seq = new cc.Sequence(spawn, moveActionB, removeAction);
				this.cardImg.runAction(seq);
				
				this.okCardImg.runAction(seq);*/
			}
			
			
		}
	},
	animateMoveReward:function()
	{
		var bonusMoveImg = new cc.Sprite(res.smile_emoji);
		bonusMoveImg.setScale(DATA.bubbleR*2 / bonusMoveImg.width);
		bonusMoveImg.attr({
			x:this.cardImg.x,
			y:this.cardImg.y,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(bonusMoveImg);
		
		var moveAction = cc.moveTo(.5, this.bubbleLayer.queueBubble.x, this.bubbleLayer.queueBubble.y);
		var removeAction = cc.callFunc(bonusMoveImg.removeFromParent, bonusMoveImg);
		var updateLabelAction = cc.callFunc(this.bubbleLayer.addMoveAnim, this.bubbleLayer);
		var endMoveSpawn = cc.spawn(removeAction, updateLabelAction);
		var seq = new cc.Sequence(moveAction, endMoveSpawn)
		bonusMoveImg.runAction(seq);
	},
	removeCard:function()
	{
		var moveCard = cc.moveTo(.5, this.width+(this.cardImg.width*this.cardImg.scale)/2, this.cardImg.y);
		var moveOK = cc.moveTo(.5, this.width+(this.cardImg.width*this.cardImg.scale)/2, this.okCardImg.y);
		
		var remCardSeq = new cc.Sequence(moveCard, cc.callFunc(this.remCard, this));
		var remOKSeq = new cc.Sequence(moveOK, cc.callFunc(this.remOKCard, this));
		this.cardImg.runAction(remCardSeq);
		this.okCardImg.runAction(remOKSeq);
	},
	remCard:function()
	{
		this.removeChild(this.cardImg);
		this.cardImg = null;
	},
	remOKCard:function(){
		this.removeChild(this.okCardImg);
		this.okCardImg = null;
	},
	coreUITouched:function(pos)
	{
		//else if(FUNCTIONS.posWithin(this.parent.coreButtonsUI.convertToNodeSpace(pos), this.parent.coreButtonsUI))
		//   	{
		   		cc.log(this.parent);
		   		var returnObj = this.parent.coreButtonsUI.onTouchEnd(this.parent.coreButtonsUI.convertToNodeSpace(pos));
		   		
		   		if(returnObj == "challengeButton" && this.preLayer == null)
		   		{
		   			if(DATA.levelIndexA!=null)
					{
						/*this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height);
						this.preLayer.attr({x:cc.winSize.width*.5,y:0,anchorX:0,anchorY:0});
						this.addChild(this.preLayer);
						this.preLayer.setScale(0);
						var scaleAction = cc.scaleTo(.5, 1, 1);
						var moveToAction = cc.moveTo(.5, cc.p(25, 0));
						var spawn = cc.spawn(scaleAction, moveToAction);
						this.preLayer.runAction(spawn);*/
						this.openPreLayer();
					}
					else
					{
						this.parent.openNoLevelLayer();
					}
		   		}
		   		else if(returnObj == "creator")
		   		{
		   			this.parent.swapCreatorMode();
		   		}
		   	//}
	},
	/*deleteCardData:function()
	{
		if(this.cardImg != null)
			this.removeChild(this.cardImg);
		if(this.okCardImg != null)
			this.removeChild(this.okCardImg);
		
		this.cardImg = null;
		this.okCardImg = null;
	},*/
	
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
		DATA.worldQueue = {type:"bucket",colors:[]};
		for(var i=0; i<level.queue.colors.length; i++)
		{
			var newColor = level.queue.colors[i];
			DATA.worldQueue.colors.push(newColor);
		}
		
		cc.log(level);
		
		DATA.worldMeta = {bulbData:[]};
		if("meta" in level)
		{
			if("bulbData" in level.meta)
			{
			
				for(var i=0; i<level.meta.bulbData.length; i++)
				{
					DATA.worldMeta.bulbData.push([]);
					for(var j=0; j<level.meta.bulbData[i].length; j++)
					{
						DATA.worldMeta.bulbData[i].push(level.meta.bulbData[i][j]);
					}
				}
			}
		}
		
		DATA.setWorldDatabaseBubbles(DATA.worldBubbles, DATA.worldQueue, DATA.worldMeta);
		
		//var queue = {type:level.queue.type, colors:level.queue.colors};
		//DATA.worldLevel = {"bubbles":DATA.worldBubbles, "queue":queue};
		
		
		DATA.worldActiveQueue = [1,1,1,1,0,0];
		DATA.worldQueue = [1,1,1,1,0,0];
		
		
		//DATA.worldBubbles = level.bubbles;
		var maxRow = 0;
		for(var i=0; i<DATA.worldBubbles.length; i++)
		{
			if(DATA.worldBubbles[i].row > maxRow)
				maxRow = DATA.worldBubbles[i].row;
		}
		cc.log(level.bubbles);
		this.bubbleLayer = new BubbleLayer(level.bubbles, maxRow+1, DATA.worldBallsLeft, "world", cc.winSize.width, this.height, [], DATA.worldMeta);	
		this.bubbleLayer.attr({
			x:0,
			y:0,
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
		/*this.preLayer = new PreChallengeLayer(DATA.levelIndexA,cc.winSize.width-50,this.height);
		this.preLayer.attr({x:cc.winSize.width*.5,y:0,anchorX:0,anchorY:0});
		this.addChild(this.preLayer, 1);
		this.preLayer.setScale(0);
		var scaleAction = cc.scaleTo(.5, 1, 1);
		var moveToAction = cc.moveTo(.5, cc.p(25, 0));
		var spawn = cc.spawn(scaleAction, moveToAction);
		this.preLayer.runAction(spawn);*/
		this.parent.openPreLayer();
	}
});