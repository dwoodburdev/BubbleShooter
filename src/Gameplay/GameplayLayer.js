var GameplayLayer = cc.Layer.extend({
	ctor:function(bubbles, numRows, height, meta){
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

		this.bubbleLayer = new BubbleLayer(bubbles, numRows, DATA.worldBallsLeft, "world", size.width, this.height-this.coreButtonsUI.height, [], meta);	
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
		
											// Start - animate finger dragging side-side
		this.tutorialA = null;		// Initial "hold", then "release" allowed any direction
											// Single Row - Match
		this.tutorialB = null;	// Initital "hold", then "drag/release" in left or right
											// Shoot through Single Row for Soap Drop
		this.tutorialC = null;		// Repeat "hold/drag/release" if player releases in wrong area, display large X if fail
											// Double Row - Make match, allow to fail (eventually, add same assist tutorial if fail twice)
											// Swap Tutorial - Player must swap, big red circle and big arrow (Player given unneeded color at head)
		this.tutorialD = null;
									// Star Tutorial - must hit star, other aims will be denied with big X
		this.tutorialE = null;
									// First Level - Player must tap Green Button (usually auto), and must play level.
		this.tutorialF = null;
									// (3 color level, little longer than top section, leading to soap drop)
									
									// If Win, (might not have to add tutorialization to win flow?)
									// Back home, Tutorial for highlighting Streak (Quick visual of what streak means (get extra try, earn more moves), point to indicator on green button)
		
									// If Lose
									// Back home (FIRST LEVEL ONLY), show visual (Beat levels to earn moves)
									
									// If Lose Streak
									// Back home, show visual (You are back to zero)
									
									
									
									// In Final section, right side with star takes more 
									
									
									
									//Other
									// +5 moves prebooster (After first fail, only in prelevel)
									// Swords Tutorial - Beat level in X swords for reward (3 swords) (First Sword level (W2?))
									// Bomb Tutorial - Beat level in X bombs for reward (3 bombs) (First Bomb level (W4?))
									// Beachball Tutorial - Beat level in X beachballs for reward (3 beachballs) (First Beachball level (W 7?))
									// Ext. Aim prebooster (Considering removing ext. aim for full world before) (do I even want to do this??)
									
									// Editor - Add exclamation when player unlocks Emoji (After World 2 when intro'd?), whenever emoji unlocked
									// First time opening Editor, Show visual highlighting features (make levels, challenge friends, become famous creator)
									
									
									// Watch Ad / Buy Moves Tutorial - When players run out of moves first time
									// Daily Chest/Challenges - Intro'd when players run out of moves for first time, or if they play
		
									
					// Worlds
					// 1 - General Tutorial, 3-color Soap / 2 mins
					// 		-- 2 levels
					// 2 - Sword Tutorial, 4-color / 2.5 mins
					// 		-- 2 levels?
					//		-- first challenge is infinite-sword level, LEVEL CHALLENGE use less than X to get +5 moves
					//		-- last challenge, or first free from here, is special mode - clean the poop timed(?) challenge, unlocks obstacle
					// 3 - Bulb Tutorial, 4-color / 4 mins
					// 		-- should be lil longer than prev, players could lose here, intro to Daily Challenges
					//		-- if run out (casuals), aim for Watch Ad / Buy Moves Tutorial
					// 4 - Bomb Tutorial, 4-color / 4 mins
					//		-- first challenge is infinite-bomb level, LEVEL CHALLENGE use less than X to get +5 moves
					//		
					// 5 - Dice Tutorial - 5-color / 4.5 mins
					//		-- Aim For Star-Goal to end here, towards unlocking Event Mode
					//
					// 6 - Beachball Tutorial - 4-color / 4 mins
					//		-- first challenge is infinite-beachball level, LEVEL CHALLENGE use less than X to get +5 moves
					//
					// 7 - Dagger Tutorial - 
					//		-- would be cool to have a world challenge, chain X together
					//
					// 8 - Clone Tutorial
					//		-- 
					//
					// 9 - 
					//		-- new challenge set?
					//
					// 10 - Snail Tutorial (maybe something else special?) - 
					// 
					//
					// 11 - 
					//
					//
					// 12 - Egg
					//
					//
					// 13 - 
					//
					//
					// 14 - Lantern
					//
					//
					// 15 - 
					//
					//
					// 16 - Balloon
					//
					//
					// 17 - 
					//
					//
					// 18 - Soapbar
					//
					//
					// 19 - 
					//
					//
					// 20 - x (maybe some kind of super)
					//
					//
					// 21 - 
					//
					//
					// 22 - Siren (changes colors around it?)
					//
					//
					// 23 - 
					//
					//
					// 24 - 
					//
					//
					// 25 - Ghost (something else special?)
					//
					//
					// 26 - 
					//
					//
					// 27 - 
					//
					//
					// 28 - (obstacle)
					//
					//
					//
					//
					
					
									
									
									// 5 (CHANGED TO LEVEL-UNLCOKED OBSTACTLE) - Poop Tutorial, Banking Reinforcement - First shot must bank to hit Poop
									//
									
									// Still need to think about new colored emojis, how to use
		
		
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
	
	executeTutorial:function(tutorial)
	{
		if(tutorial.type == "daily-challenges")
		{
			
		}
	},
	
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
		this.bubbleLayer = new BubbleLayer(level.bubbles, maxRow+1, DATA.worldBallsLeft, "world", cc.winSize.width, this.height-this.coreButtonsUI.height, [], DATA.worldMeta);	
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