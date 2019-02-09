
var BubbleLayer = cc.Layer.extend({
	
///////////////////////////////////////////////////////////	
// 1. Level Initialization
//	-ctor()
//	-onEnter()
//	-initLevel()
	
	ctor:function(bubbles, numRows, numMoves, modeType, width, height, preboosters){
		this._super();

		this.bubbles = bubbles;
		
		this.modeType = modeType;
		
		this.width = width;
		this.height = height;
		
		
		this.numRows = numRows;
		this.numMoves = numMoves;
		
		this.inputFrozen = false;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.bgColor = cc.color(255,255,255,255);
		if(this.modeType == "challenge")
			this.bgColor = cc.color(220,220,220,255);
		this.draw = function(){this.dn.drawRect(cc.p(this.x,this.y), cc.p(this.width,this.height), this.bgColor, 0, cc.color(0,0,0,255));};
		this.draw();
		
		this.aimDN = new cc.DrawNode();
		this.addChild(this.aimDN);
		
		this.evenRowAdjacents = [{"x":-1,"y":0}, {"x":1,"y":0}, {"x":0,"y":1}, {"x":-1,"y":1}, {"x":0,"y":-1}, {"x":-1,"y":-1}];
		this.oddRowAdjacents = [{"x":-1,"y":0}, {"x":1,"y":0}, {"x":0,"y":1}, {"x":1,"y":1}, {"x":0,"y":-1}, {"x":1,"y":-1}];
		
		this.numCols = 12;
		this.maxRows = 11;
		this.curRow = 0;
		
		this.collisionRatio = .8;
		
		this.timerMinutes = 0;
		this.timerSeconds = 0;
		
		//this.bubbles = [];
		this.bubbleMap = [];
		
		this.possibleColors = ["red","orange","yellow","green","blue","pink","purple"];
		this.bubbleR = this.width/this.numCols / 2;
		DATA.bubbleR = this.bubbleR;
		this.rowHeight = Math.pow(3, .5) * this.bubbleR;
		
       	this.aimLine = null;
       	
       	this.bottomMostBubbleY = 0;
       	
       	//this.nextShooterColor = this.possibleColors[Math.floor(Math.random()*this.possibleColors.length)];
       	//this.shooterColor = this.possibleColors[Math.floor(Math.random()*this.possibleColors.length)];
       	
       	this.shooterMod = null;
       	
       	//DATA.setQueueColors(this.possibleColors);
       	
       	//this.bubbleLayerUI = null;
       	
       	this.rowsAdded = 0;
       	this.rowsCulled = 0;
       	
       	
       	if(this.modeType == "world")
       	{
       		/*this.bubbleLayerUI = new CoreButtonsUI(this.bubbleR, this.height, "world");
			this.bubbleLayerUI.attr({
				x:0,
				y:0,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.bubbleLayerUI,3);*/
	       	
       		//this.bubbleStartHeight = this.bubbleLayerUI.storeButton.y+this.bubbleLayerUI.storeButton.height+this.bubbleR*2;
       		this.bubbleStartHeight = this.y+this.bubbleR*2;
       		
       		if(DATA.worldBallAColor == null)
       			DATA.setWorldShooterColor();
       		if(DATA.worldBallBColor == null)
       			DATA.setWorldQueueColor();
       			
       		if(DATA.levelIndexB != null)
			{
				//this.bubbleLayerUI.setShooterLabel("Levels Full",cc.color(255,0,0,255),this.bubbleStartHeight);
			}
       	}
       	else if(this.modeType == "challenge" || this.modeType == "playtest")
       	{
       		this.bubbleStartHeight = this.bubbleR*3
       		
       		if(DATA.levelBallAColor == null)
       			DATA.setLevelShooterColor();
       		if(DATA.levelBallBColor == null)
       			DATA.setLevelQueueColor();
       	}
       	
       	
       	this.queueBubble = null;
       	this.ballsLeftLabel = null;
       	this.shooter = null;
       	
       	this.timerLabel = null;
       	
       	
       	if(this.modeType != "preview")
	    {cc.log(DATA.getQueueColor(this.modeType));
	       	this.queueBubble = new Bubble(this.bubbleR, DATA.getQueueColor(this.modeType), 0, null, null, null, null, null);
	       	this.queueBubble.attr({
	       		x:this.width*.25,
	       		y:this.bubbleStartHeight,
	       		anchorX:.5,
	       		anchorY:.5
	       	});
	       	this.queueBubble.active = true;
	       	this.addChild(this.queueBubble);
	       	
	       	this.ballsLeftLabel = new cc.LabelTTF(""+this.numMoves, "Roboto", 30);
			this.ballsLeftLabel.attr({
				"x":this.queueBubble.x-40,
				"y":this.queueBubble.y,
				"anchorX":.5,
				"anchorY":.5
			});
			this.ballsLeftLabel.color = cc.color(0,0,0,255);
			this.addChild(this.ballsLeftLabel);
			cc.log(DATA.getShooterColor(this.modeType));
	       	this.shooter = new Bubble(this.bubbleR, DATA.getShooterColor(this.modeType), 0, null, null, null, null, null);
	       	this.shooter.attr({
	       		x: this.width/2,
	       		y: this.bubbleStartHeight,
	       		anchorX:.5,
	       		anchorY:.5
	       	});
	       	this.shooter.active = true;
	       	this.addChild(this.shooter);
	       	
	       	this.aimIndicator = {x:0, y:this.shooter.y+this.bubbleR*2, width:cc.winSize.width, height:(this.height-(this.bubbleR*21)) - (this.shooter.y+this.bubbleR*2) };
		    this.drawAimIndicator();
		    
		    
		    
		    this.schedule(this.triggerRandomIdle, .1);
		    
		    
		}
       	//this.outOfMovesWarningLabel = null;
       	
       	if(this.modeType == "world" && this.numMoves < 5)
       	{
       		//DATA.setLastTimeMoveSpawned();
			this.initMoveTimer();
       	}
       	
       	this.plusFivePreboosterIcon = null;
		
		if(this.modeType == "challenge" && preboosters != null)
		{
		for(var i=0; i<preboosters.length; i++)
		{
			if(preboosters[i] == "plus_five")
			{
				this.plusFivePreboosterIcon = new cc.Sprite(res.plus_five_moves_icon);
				this.plusFivePreboosterIcon.setScale(DATA.bubbleR*2 / this.plusFivePreboosterIcon.width);
				this.plusFivePreboosterIcon.attr({
					x: this.ballsLeftLabel.x-this.bubbleR-3,
					y: this.shooter.y,
					anchorX: 1,
					anchorY: .5
				});
				this.addChild(this.plusFivePreboosterIcon);
			}
		}
       }
       	
       	
       	this.prevShooterColor = DATA.getShooterColor(this.modeType);
       	this.targetHex = null;
		//this.previewBubble = null;
       	
       	this.turnNumber = 0;
       	
       	this.futureActionQueue = [];
       	
       	//this.prevShooterColor = null;
       	
		if(this.bubbles.length == 0)
			this.initLevel();
		else
		{
			this.bottomActiveRow = this.numRows-1;
			this.topActiveRow = this.numRows - this.maxRows-1;
			/*var overflowOffset = Math.max(this.numRows - this.maxRows, 0) * this.rowHeight;
       		if(overflowOffset > 0)
       			overflowOffset -= this.rowHeight/2;*/
       		var overflowOffset = this.getOverflowOffset();
			
			for(var i=0; i<this.numRows; i++)
			{
				var bubbleRow = [];
				for(var j=0; j<this.numCols-(i%2); j++)
				{
					bubbleRow.push(-1);
				}
				this.bubbleMap.push(bubbleRow);
			}
			
			for(var i=0; i<this.bubbles.length; i++)
			{
				//var bub = this.bubbles[i];cc.log(bub.row);cc.log(bub)
				var bub = new Bubble(this.bubbleR, this.bubbles[i].colorCode, this.bubbles[i].type, null, null, null, this.bubbles[i].row, this.bubbles[i].col);
				this.bubbles[i] = bub;
				bub.attr({
	       			x: this.bubbleR+bub.col*this.bubbleR*2 + (bub.row%2)*this.bubbleR,
	       			y: this.height - bub.row*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
	       			anchorX:.5,
	       			anchorY:.5
	       		});
				this.bubbleMap[bub.row][bub.col] = i;
				if(bub.row >= this.topActiveRow && bub.row <= this.bottomActiveRow)
				{
					bub.active = true;
					this.addChild(bub);
				}
				
				if(bub.y < this.bottomMostBubbleY)
					this.bottomMostBubbleY = bub.y;
			}
		}
		
		
		DATA.registerEvent({"type":"init","progress":this.bubbles.length});
	},
	onEnter:function(){
		this._super();
		
	
		    
	},
	
	triggerRandomIdle:function()
	{
		/*var randomBubbleIndex = Math.floor(Math.random()*this.bubbles.length);
		
		if(this.bubbles[randomBubbleIndex].turnAnimation != null && this.bubbles[randomBubbleIndex].colorCode == "yellow")
		{
			var animateAction = cc.Animate.create(this.bubbles[randomBubbleIndex].turnAnimation);
			this.bubbles[randomBubbleIndex].bubbleImg.runAction(animateAction);
		}
		else if(this.bubbles[randomBubbleIndex].idleAnimation != null)
		{
			var animateAction = cc.Animate.create(this.bubbles[randomBubbleIndex].idleAnimation);
			this.bubbles[randomBubbleIndex].bubbleImg.runAction(animateAction);
		}
		*/
	
	},
	
	drawAimIndicator:function()
	{
		this.aimDN.clear();
		if(this.modeType == "challenge" || (this.modeType == "world" && DATA.levelIndexB == null && this.numMoves > 0))
		{
			if(this.aimLine == null)
				this.aimDN.drawRect(cc.p(this.aimIndicator.x+5, this.aimIndicator.y), cc.p(this.aimIndicator.x+this.aimIndicator.width-5, this.aimIndicator.y+this.aimIndicator.height), cc.color(0,0,0,100),1,cc.color(0,0,0,255));
			else
				this.aimDN.drawRect(cc.p(this.aimIndicator.x+5, this.aimIndicator.y), cc.p(this.aimIndicator.x+this.aimIndicator.width-5, this.aimIndicator.y+this.aimIndicator.height), cc.color(0,0,0,50),5,cc.color(0,0,0,255));
		}
	},
	clearAimIndicator:function()
	{
		this.aimDN.clear();
	},
	
	initMoveTimer:function()
	{
		var timeTilMoveSpawn = DATA.timeLastMoveSpawned+(1000*60*5);
   		var timeElapsed = timeTilMoveSpawn - (new Date()).getTime();
   		var minutes = Math.floor(timeElapsed/(1000*60));
   		var seconds = Math.floor((timeElapsed - (minutes*60*1000))/(1000));
   		this.timerMinutes = minutes;
   		this.timerSeconds = seconds;
   		var secondsStr = ""+seconds;
   		if(seconds <= 9)
   			secondsStr = "0"+seconds
   		this.timerLabel = new cc.LabelTTF(""+minutes+":"+secondsStr,"Roboto",30);
		this.timerLabel.attr({
			x:this.queueBubble.x,
			y:this.queueBubble.y,
			anchorX:0.5,
			anchorY:0
		});
		this.timerLabel.color=cc.color(255,0,0,255);
		this.addChild(this.timerLabel);
		this.schedule(this.updateMoveTimer, 1);
	   	cc.director.getScheduler().resumeTarget(this);
	},
	
	updateMoveTimer:function()
	{
		this.timerSeconds--;
		//this.timerMinutes;
		if(this.timerSeconds < 0)
		{
			this.timerSeconds = 59;
			this.timerMinutes--;
			if(this.timerMinutes < 0)
			{
				this.timerMinutes = 4;
				
				this.numMoves++;
				DATA.worldBallsLeft++;
				DATA.setDatabaseMoves(DATA.worldBallsLeft);
				this.ballsLeftLabel.setString(this.numMoves);
				if(this.numMoves == 1)
				{
					this.parent.removeBuyMovesLabel();
				}
			}
		}
		var secString = "";
		if(this.timerSeconds > 9)
			secString = ""+this.timerSeconds;
		else secString = "0"+this.timerSeconds;
		
		this.timerLabel.setString(""+this.timerMinutes+":"+secString);
		//this.unschedule(this.updateMoveTimer);
		
		//this.schedule(this.updateMoveTimer, 1.0);
		if(this.numMoves == 5)
		{
			this.removeChild(this.timerLabel);
			this.unschedule(this.updateMoveTimer, 1.0);
		}
		else
		{
			//this.schedule(this.updateMoveTimer, 1.0);
		   		//cc.director.getScheduler().resumeTarget(this);
		}
	},
	
	addMoves:function(num)
	{
		this.numMoves += num;
		this.ballsLeftLabel.setString(this.numMoves);
		//this.removeChild(this.ballsLeftLabel);
		//this.addChild(this.ballsLeftLabel);
	},
	
	onEnter:function(){cc.log("enter");
		this._super();
		
	},
	
	getOverflowOffset:function()
	{
		var overflowOffset = Math.max((this.numRows-this.curRow) - this.maxRows, 0) * this.rowHeight;//cc.log(Math.max((this.numRows-this.curRow) - this.maxRows, 0));
   		//if(overflowOffset > 0)
   		
   		if(Math.max((this.numRows-this.curRow) - this.maxRows, 0) > 1)
   			overflowOffset -= this.rowHeight/2;
   		return overflowOffset;
	},
	
	initLevel:function()
	{
		this.numRows = 100;
		this.bottomActiveRow = this.numRows-1;
		this.topActiveRow = this.numRows - this.maxRows-1;
		var obstacleWeights = [
   			[
       			1,	// Solid bubble
       			0,	// 1-r bomb
       			0,	// Anvil (indestructable rock)
       			0,	// Jawbreaker (destructable rock)
       			0,	// Egg (Poof)
       			0,	// Soap
       			0,	// Pin (NOT WORKING)
       			1,	// Pinwheel
       			1,	// Dice
       			1	// Orb
       		],
       		[
       			2,	// Solid bubble
       			1,	// 1-r bomb
       			0,	// Anvil (indestructable rock)
       			1,	// Jawbreaker (destructable rock)
       			0,	// Egg (Poof)
       			0,	// Soap
       			0,	// Pin (NOT WORKING)
       			0,	// Pinwheel
       			0,	// Dice
       			0	// Orb
       		],
       		[
       			2,	// Solid bubble
       			0,	// 1-r bomb
       			0,	// Anvil (indestructable rock)
       			0,	// Jawbreaker (destructable rock)
       			0,	// Egg (Poof)
       			1,	// Soap
       			0,	// Pin (NOT WORKING)
       			0,	// Pinwheel
       			0,	// Dice
       			0	// Orb
       		],
       		[
       			1,	// Solid bubble
       			1,	// 1-r bomb
       			0,	// Anvil (indestructable rock)
       			1,	// Jawbreaker (destructable rock)
       			1,	// Egg (Poof)
       			1,	// Soap
       			0,	// Pin (NOT WORKING)
       			0,	// Pinwheel
       			0,	// Dice
       			0	// Orb
       		],
       		[
       			1,	// Solid bubble
       			0,	// 1-r bomb
       			0,	// Anvil (indestructable rock)
       			0,	// Jawbreaker (destructable rock)
       			0,	// Egg (Poof)
       			0,	// Soap
       			0,	// Pin (NOT WORKING)
       			1,	// Pinwheel
       			0,	// Dice
       			0	// Orb
       		],
       		[
       			1,	// Solid bubble
       			0,	// 1-r bomb
       			0,	// Anvil (indestructable rock)
       			0,	// Jawbreaker (destructable rock)
       			0,	// Egg (Poof)
       			0,	// Soap
       			0,	// Pin (NOT WORKING)
       			0,	// Pinwheel
       			1,	// Dice
       			1	// Orb
       		],
       		[
       			0,	// Solid bubble
       			1,	// 1-r bomb
       			0,	// Anvil (indestructable rock)
       			0,	// Jawbreaker (destructable rock)
       			0,	// Egg (Poof)
       			0,	// Soap
       			0,	// Pin (NOT WORKING)
       			0,	// Pinwheel
       			0,	// Dice
       			0	// Orb
       		],
       		[
       			0,	// Solid bubble
       			0,	// 1-r bomb
       			0,	// Anvil (indestructable rock)
       			0,	// Jawbreaker (destructable rock)
       			0,	// Egg (Poof)
       			0,	// Soap
       			0,	// Pin (NOT WORKING)
       			0,	// Pinwheel
       			0,	// Dice
       			1	// Orb
       		]
       		 
       		
       		//[0,1,0,0,0,1,0,0,0,0]
   		];
   		var weights  = obstacleWeights[Math.floor(Math.random()*obstacleWeights.length)];
   		var sumWeight = 0;
   		var typesToSpawn = [];
   		for(var i=0; i<weights.length; i++)
   		{
   			sumWeight += weights[i];
   			if(weights[i] > 0)
   				typesToSpawn.push(i);
   		}
   		var typeOdds = [];
   		var cumWeight = 0;
   		for(var i=0; i<typesToSpawn.length; i++)
   		{
   			cumWeight += weights[typesToSpawn[i]] / sumWeight
   			typeOdds.push(cumWeight);
   		}
   		
		for(var i=0; i<this.numRows; i++)
		{
			var bubbleRow = [];
			for(var j=0; j<this.numCols-(i%2); j++)
			{
				bubbleRow.push(-1);
			}
			this.bubbleMap.push(bubbleRow);
		}
		
		for(var i=0; i<this.numRows; i++)
		{
	       	for(var j=0; j<this.numCols-(i%2); j++)
	       	{
	       		var overflowOffset = this.getOverflowOffset();
	       		
	       		var type = 0;
	       		var color = null;
	       		var orientation = null;
	       		var binary = null;
	       		var meta = null;
	       		
	       		var typeFound = false;
	       		for(var k=0; k<typeOdds.length && !typeFound; k++)
	       		{
	       			var r = Math.random();
	       			if(r < typeOdds[k])
	       			{
	       				type = typesToSpawn[k];
	       				typeFound = true;
	       				if(type == 0)
	       				{
	       					color = this.possibleColors[Math.floor(Math.random()*this.possibleColors.length)];
	       				}
	       				else if(type == 1)
	       				{
	       					
	       				}
	       			}
	       		}
	       		
	       		
	       		var bubble = new Bubble(this.bubbleR, color, type, orientation, binary, meta, i, j);
	       		bubble.attr({
	       			x: this.bubbleR+j*this.bubbleR*2 + (i%2)*this.bubbleR,
	       			y: this.height - i*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
	       			anchorX:.5,
	       			anchorY:.5
	       		});
	       		this.bubbles.push(bubble);
	       		this.bubbleMap[i][j] = this.bubbles.length-1;
	       		//if(i >= this.numRows-this.maxRows-1)
	       		if(i >= this.topActiveRow && i <= this.bottomActiveRow)
	       		{
	       			bubble.active = true;
	       			this.addChild(bubble);
	       		}
	       		
	       		if(bubble.y < this.bottomMostBubbleY)
					this.bottomMostBubbleY = bubble.y;
	       		
	       	}
       	}
       	
	},

///////////////////////////////////////////////////////////
// 2. Controls
//	-onTouchBegin(loc)
//	-onTouchMove(loc)
//	-onTouchEnd(loc)
//	-moveShooter(dt)
//	-resetShooter()

	removeWarningLabel:function()
	{cc.log("CALLED");
		if(this.outOfMovesWarningLabel != null)
		{
			//this.outOfMovesWarningLabel.clear();
			//this.removeChild(this.outOfMovesWarningLabel);
			//this.outOfMovesWarningLabel = null;
			//this.unschedule(this.removeWarningLabel);
		}
	},
	
	isPopupLayer:function()
	{
		/*if(this.bubbleLayerUI != null &&
			this.bubbleLayerUI.preLayer == null &&
			this.bubbleLayerUI.worldRewardsLayer == null &&
			this.bubbleLayerUI.buyBallsLayer == null &&
			this.bubbleLayerUI.openLevelReminderLayer == null &&
			this.bubbleLayerUI.noLevelLayer == null)
		{*/
			return false;
		//}
		return true;
	},

	onTouchBegin:function(loc){cc.log("touchstart");
		if(this.inputFrozen)
			return;
		
		if(!this.isPopupLayer() || this.modeType == "challenge" || this.modeType == "playtest")
		{
			if(loc.y > this.shooter.y+this.bubbleR)
			{
				if(this.numMoves <= 0 && this.outOfMovesWarningLabel == null)
				{cc.log("OUT OF MOVES");
					
					return;
				}
				
				this.aimLine = new AimLine({"x":this.shooter.x, "y":this.shooter.y},{"x":loc.x, "y":loc.y}, cc.color(122,0,122,255));
		    	this.aimLine.attr({
		    		x:0,
		    		y:0,
		    		anchorX:0,
		    		anchorY:0
		    	});
		    	this.addChild(this.aimLine);
		    	
		    	var overflowOffset = this.getOverflowOffset();
		    	
		    	var trajectory = this.shooter.initShotPrediction(loc);
		    	this.targetHex = this.predictTarget(trajectory);
		    	
		    	this.targetBubble = new Bubble(this.bubbleR, null, -1, null, null, null, this.targetHex.x, this.targetHex.y);
		   		this.targetBubble.attr({
		   			x: this.bubbleR+this.targetHex.x*this.bubbleR*2 + (this.targetHex.y%2)*this.bubbleR,
		   			y: this.height - this.targetHex.y*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
		   			anchorX:.5,
		   			anchorY:.5
		   		});
		   		
		   		/*this.aimLine = new AimLine({"x":this.shooter.x, "y":this.shooter.y},{"x":this.targetBubble.x, "y":this.targetBubble.y}, cc.color(122,0,122,255));
		    	this.aimLine.attr({
		    		x:0,
		    		y:0,
		    		anchorX:0,
		    		anchorY:0
		    	});
		    	this.addChild(this.aimLine);*/
		   		
		   		this.addChild(this.targetBubble);
		   	}
		 }
		 
		 if(FUNCTIONS.posWithin(loc, this.aimIndicator))
		 	this.drawAimIndicator();
		 else if(this.aimLine != null)
		{
			this.aimLine.clear();
	   		this.removeChild(this.aimLine);
	   		this.aimLine = null;
	   		
	   		this.removeChild(this.targetBubble);
	   		this.targetBubble = null;
			
			this.drawAimIndicator();
		}
		
		
    	
   	},
   	
   	
   	
	onTouchMove:function(loc){
		if(this.inputFrozen)
			return;
			
		if(!this.isPopupLayer() || this.modeType == "challenge" || this.modeType == "playtest")
		{
			if(loc.y > this.shooter.y+this.bubbleR)
			{
				if(this.numMoves <= 0 && this.outOfMovesWarningLabel == null)
				{
					
					return;
				}
				else if(this.aimLine == null)
				{
					this.onTouchBegin(loc);
				}
				else
				{
					this.aimLine.moveTargetTo(loc);
					
			    	var overflowOffset = this.getOverflowOffset();
			    	var trajectory = this.shooter.initShotPrediction(loc);
			    	this.targetHex = this.predictTarget(trajectory);
			    	
			    	this.targetBubble.attr({
			   			x: this.bubbleR+this.targetHex.x*this.bubbleR*2 + (this.targetHex.y%2)*this.bubbleR,
			   			y: this.height - this.targetHex.y*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
			   			anchorX:.5,
			   			anchorY:.5
			   		});
			   	}
		   	}
	   		else if(this.aimLine != null)
	   		{
	   			this.aimLine.clear();
		   		this.removeChild(this.aimLine);
		   		this.aimLine = null;
		   		
		   		this.removeChild(this.targetBubble);
		   		this.targetBubble = null;
	   		}
	   	}
	   	
	   	if(FUNCTIONS.posWithin(loc, this.aimIndicator))
		 	this.drawAimIndicator();
		else if(this.aimLine != null)
		{
			this.aimLine.clear();
	   		this.removeChild(this.aimLine);
	   		this.aimLine = null;
	   		
	   		this.removeChild(this.targetBubble);
	   		this.targetBubble = null;
			
			this.drawAimIndicator();
		}
	},
	onTouchEnd:function(loc){cc.log("touchEnd");
		if(this.aimLine != null)
		{
			this.inputFrozen = true;
			
			if(this.bubbleLayerUI != null)
				this.bubbleLayerUI.showMinorUI();
			
			// remove aim line
	   		this.aimLine.clear();
	   		this.removeChild(this.aimLine);
	   		this.aimLine = null;
	   		
	   		// fire bubble
	   		this.shooter.initShot(loc, this.targetHex);
	   		//this.shooter.initShotAnim(loc, this.targetHex, this.numRows, this.maxRows, this.rowHeight, this.bottomMostBubbleY);
	   		this.schedule(this.moveShooter);
	   		cc.director.getScheduler().resumeTarget(this);
	   		
	   		
	   		this.removeChild(this.targetBubble);
	   }
	   else if(loc.y > this.queueBubble.y-this.bubbleR && loc.y < this.queueBubble.y+this.bubbleR)
	   {cc.log("queue");
		   if(loc.x > this.queueBubble.x-this.bubbleR && loc.x < this.queueBubble.x+this.bubbleR)
		   {
		   		this.removeChild(this.shooter);
		   		this.removeChild(this.queueBubble);
		   		
		   		//var nextColor = this.nextShooterColor;
		   		//this.nextShooterColor = this.shooterColor;
		   		//this.shooterColor = nextColor;
		   		DATA.swapBubbleColors(this.modeType);
		   		this.prevShooterColor = DATA.getShooterColor(this.modeType);
		   		cc.log("SHOOTER BUBBLE");
		   		this.shooter = new Bubble(this.bubbleR, DATA.getShooterColor(this.modeType), 0, null, null, null, null, null);
		       	this.shooter.attr({
		       		x: this.width/2,
		       		y: this.bubbleStartHeight,
		       		anchorX:.5,
		       		anchorY:.5
		       	});
		       	this.shooter.active = true;
		       	this.addChild(this.shooter);
				
		       	this.queueBubble = new Bubble(this.bubbleR, DATA.getQueueColor(this.modeType), 0, null, null, null, null, null);
		       	this.queueBubble.attr({
		       		x:this.width/4,
		       		y:this.bubbleStartHeight,
		       		anchorX:.5,
		       		anchorY:.5
		       	});
		       	this.queueBubble.active = true;
		       	this.addChild(this.queueBubble);
		   }
		   /*else if(this.levelAImg != null && loc.x > this.levelAImg.x-this.bubbleR && loc.x < this.levelAImg.x+this.bubbleR)
		   {
		   		cc.log("PLAY LEVEL CHALLENGE");
		   		cc.director.runScene(new PreChallengeScene(DATA.levelIndexA));
		   }*/
	   }
	
		if(FUNCTIONS.posWithin(loc, this.aimIndicator))
		 	this.clearAimIndicator();
		
	},
	
	predictTarget:function(trajectory)
	{
		/*var overflowOffset = Math.max(this.numRows - this.maxRows, 0) * this.rowHeight;
   		if(overflowOffset > 0)
   			overflowOffset -= this.rowHeight/2;
		*/
		var overflowOffset = this.getOverflowOffset();
		
		var centerRow = 0;
		var centerCol = 0;
		
		var dx = trajectory.dx;
		var dy = trajectory.dy;
		var lastCheck = null;
		var steps = 0;
		var collisionFound = false;
		var x = this.shooter.x;
		var y = this.shooter.y;
		var r = this.shooter.r;
		do
		{
			x += dx;
			y += dy;
			if((x+this.shooter.r >= this.width && dx > 0) || (x-this.shooter.r <= 0 && dx < 0))
				dx *= -1;
			
			centerRow = Math.floor((this.height-y + overflowOffset) / (this.rowHeight));
			//var centerRow = Math.floor((this.height-y) / (this.rowHeight)) + Math.max(this.numRows-this.maxRows, 0);
			centerCol = Math.abs( Math.floor( (x - (centerRow%2)*r ) / (r*2) ));
		
			var adjacents = this.getAdjacents(centerRow, centerCol);
			
			var collisionFound = false;
			for(var i=0; i<adjacents.length && !collisionFound; i++)
			{
				var adjX = adjacents[i].x;
				var adjY = adjacents[i].y;
				if(this.bubbles[this.bubbleMap[adjY][adjX]] == null)
				{
					cc.log("UNDEFINED AT " + adjX + ", " + adjY);
					cc.log(this.bubbleMap[adjY][adjX]);
					cc.log(this.bubbles.length-1);
				}
				if(this.dist(this.bubbles[this.bubbleMap[adjY][adjX]], {"x":x,"y":y}) <= r*2*this.collisionRatio)
				{
					collisionFound = true;
					//cc.log("TARGET: row "+centerRow+" col "+centerCol);
				}
			}
			
			//if(!collisionFound && y )
			steps++;
		} while(!collisionFound && y < this.height)
		
		// IN FUTURE, MIGHT HAVE TO REWIND X VAR W/ MORE PRECISION
		if(y >= this.height)
		{
			y = this.height-r;
			x -= dx;
			centerRow = Math.floor((this.height-y + overflowOffset) / (this.rowHeight));
			centerCol = Math.abs( Math.floor( (x - (centerRow%2)*r ) / (r*2) ));
			
			centerRow = 0;
		}
		return {"x":centerCol,"y":centerRow};
	},
	
	moveShooter:function(dt)
	{
		this.shooter.x += this.shooter.dx*dt*150;
		this.shooter.y += this.shooter.dy*dt*150;
		
		if((this.shooter.x+this.shooter.r >= this.width && this.shooter.dx > 0) || (this.shooter.x-this.shooter.r <= 0 && this.shooter.dx < 0))
		{
			if(this.shooter.dx > 0)
				this.shooter.x -= (this.shooter.x+this.shooter.r)-this.width;
			else if(this.shooter.dx < 0)
				this.shooter.x += (this.shooter.x-this.shooter.r);
			this.shooter.dx *= -1;
			
		}
		
		var overflowOffset = this.getOverflowOffset();
		
		var centerRow = Math.floor((this.height-this.shooter.y + overflowOffset) / (this.rowHeight));
		var centerCol = Math.abs( Math.floor( (this.shooter.x - (centerRow%2)*this.shooter.r ) / (this.shooter.r*2) ));
		
		
		if(centerRow < 0)
		{
			centerRow = 0;
			
			collisionFound = true;
				
			this.shooter.dx = 0;
			this.shooter.dy = 0;
			
			//cc.director.getScheduler().pauseTarget(this);
			this.unschedule(this.moveShooter);
			
       		
			this.shooter.x = this.bubbleR+centerCol*this.bubbleR*2 + (centerRow%2)*this.bubbleR;
			this.shooter.y = this.height - centerRow*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset;
			this.shooter.row = centerRow;
			this.shooter.col = centerCol;
			
			this.updateBubble(this.shooter, centerRow, centerCol);
			this.triggerImpact(centerRow, centerCol);
			this.resetShooter();
			
			
			
			return;
		}
		
		
		var adjacents = this.getAdjacents(centerRow, centerCol);
		
		var collisionFound = false;
		for(var i=0; i<adjacents.length && !collisionFound; i++)
		{
			var x = adjacents[i].x;
			var y = adjacents[i].y;
			if(this.bubbles[this.bubbleMap[y][x]] == null)
			{
				cc.log("UNDEFINED AT " + x + ", " + y);
				cc.log(this.bubbleMap[y][x]);
				cc.log(this.bubbles.length-1);
			}
			if(this.dist(this.bubbles[this.bubbleMap[y][x]], this.shooter) <= this.shooter.r*2*this.collisionRatio)
			{
				collisionFound = true;
				
				this.shooter.dx = 0;
				this.shooter.dy = 0;
				
				//cc.director.getScheduler().pauseTarget(this);
				this.unschedule(this.moveShooter);
				
	       		
				this.shooter.x = this.bubbleR+centerCol*this.bubbleR*2 + (centerRow%2)*this.bubbleR;
				this.shooter.y = this.height - centerRow*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset;
				this.shooter.row = centerRow;
				this.shooter.col = centerCol;
				
				this.updateBubble(this.shooter, centerRow, centerCol);
				this.triggerImpact(centerRow, centerCol);
				this.resetShooter();
			}
		}
	},
	
	resetShooter:function()
	{
		DATA.colorNextTurn(this.modeType);
		DATA.setDatabaseColors();
		
		//this.removeChild(this.shooter);
		this.shooter = null;
       	this.shooter = new Bubble(this.bubbleR, DATA.getShooterColor(this.modeType), 0, null, null, null, null, null);
       	this.shooter.attr({
       		x: this.width/2,
       		y: this.bubbleStartHeight,
       		anchorX:.5,
       		anchorY:.5
       	});
       	this.shooter.active = true;
       	this.addChild(this.shooter);
       	
		this.prevShooterColor = DATA.getShooterColor(this.modeType);
		//this.shooterColor = this.nextShooterColor;
		//this.nextShooterColor = this.possibleColors[Math.floor(Math.random()*this.possibleColors.length)];
		
		
       	this.removeChild(this.queueBubble);
       	this.queueBubble = new Bubble(this.bubbleR, DATA.getQueueColor(this.modeType), 0, null, null, null, null, null);
       	this.queueBubble.attr({
       		x:this.width/4,
       		y:this.bubbleStartHeight,
       		anchorX:.5,
       		anchorY:.5
       	});
       	this.queueBubble.active = true;
       	this.addChild(this.queueBubble);
	},
	
////////////////////////////////////////////////////////	
//	3. Action Triggers
//	-triggerImpact(row, col)
//	-executeMatch(row, col)
//	-executeTrigger(row, col, trigger)
//	-cullUnconnected()

	// Tracks chain of events after player makes a move.
	triggerImpact:function(row, col)
	{
		if(this.modeType == "world")
		{
			var newBubbles = [{"y":row,"x":col,"type":this.shooter.type,"colorCode":this.shooter.colorCode}];
			DATA.setAddDatabaseBubbles(newBubbles);
			
		}
		
		
		if(this.shooterMod == null)
			this.futureActionQueue = [ [{"type":"match", "position":{"x":col, "y":row} }, {"type":"hit", "position":{"x":col, "y":row} }], [] ];
		else if(this.shooterMod == "bomb")
			this.futureActionQueue = [ [ {"type":"clear", "position":{"x":col, "y":row} } ], [] ];
		this.actionStep();
	},
	
	actionStep:function()
	{//cc.log("ACTION STEP");
		
		var actionQueue = this.futureActionQueue[0];
		//cc.log("--"+this.futureActionQueue[0].length + " actions--");
		for(var i=0; i<this.futureActionQueue[0].length; i++)
		{
			//cc.log("TYPE: " + this.futureActionQueue[0][i].type);
		}

		var exploredHexes = [];
		var eventQueue = [];		// Track actions for animation (art, removing bubbles)
		
		var trackIndex = 0;
		
		var destroyedHexes = [];
		
		var databasePositionsToDestroy = [];
		
		if(actionQueue.length > 0)
		{
			var curStepEvents = [];
			
			for(var q=0; q<actionQueue.length; q++)
			{	
				if(actionQueue[q].position.y >= 0 && actionQueue[q].position.y < this.bubbleMap.length && ((actionQueue[q].type != "clear" && actionQueue[q].type != "transform" && actionQueue[q].type != "match") || this.bubbleMap[actionQueue[q].position.y][actionQueue[q].position.x] >= 0))
				{
					// Execute action
					var action = actionQueue[q];
					var affectedIndices = [];
					cc.log(action.type);
					if(action.type == "match")
					{
						if(this.bubbles[this.bubbleMap[action.position.y][action.position.x]].type == 11)
						{cc.log("rainbow match exec");cc.log(action.position);
							affectedIndices = {"destroyed":[],"triggered":[],"triggers":[]};
							var colors = ["red","yellow","green","blue"];
							for(var i=0; i<colors.length; i++)
							{cc.log(colors[i]);
								this.bubbles[this.bubbleMap[action.position.y][action.position.x]].colorCode = colors[i];
								var newAffectedIndices = this.executeMatch(action.position.y, action.position.x);
								var affectedKeys = Object.keys(newAffectedIndices);
								for(var j=0; j<affectedKeys.length; j++)
								{
									affectedIndices[affectedKeys[j]] = affectedIndices[affectedKeys[j]].concat(newAffectedIndices[affectedKeys[j]]);
								}
							}
							for(var i=affectedIndices.destroyed.length-1; i>=0; i--)
							{
								if(affectedIndices.destroyed[i] == this.bubbleMap[action.position.y][action.position.x])
								affectedIndices.destroyed.splice(i,1);
							}
							affectedIndices.destroyed.push(this.bubbleMap[action.position.y][action.position.x]);
						}
						else 
						{
							affectedIndices = this.executeMatch(action.position.y, action.position.x);
							if(affectedIndices.destroyed.length > 0)
								DATA.registerEvent({"type":"match-size","progress":1,"size":affectedIndices.destroyed.length});
						}
						cc.log(affectedIndices);
						
						var subIndices = this.executeOnAdjMatch(affectedIndices.destroyed);
						affectedIndices.destroyed = affectedIndices.destroyed.concat(subIndices.destroyed);
						affectedIndices.triggered = affectedIndices.triggered.concat(subIndices.triggered);
						affectedIndices.triggers = affectedIndices.triggers.concat(subIndices.triggers);
					}
					/*else if(action.type == "rainbow")
					{
						var colors = ["red","blue","yellow","green"]
						for(var i=0; i<)
					}*/
					else if(action.type == "hit")
					{
						affectedIndices = this.executeHit(action.position.y, action.position.x, destroyedHexes);
					}
					else if(action.type == "clear")
					{
						affectedIndices = this.executeClear(action.position.y, action.position.x, destroyedHexes);
					}
					else if(action.type == "destroy")
					{
						affectedIndices = this.executeDestroy(action.position.y, action.position.x);
					}
					else if(action.type == "transform")
					{
						affectedIndices = this.executeTransform(action.position.y, action.position.x);
					}
					else if(action.type == "meta")
					{
						affectedIndices = this.executeMeta(action.position.y, action.position.x);
					}
						
					// Set up future reactions from executed action. Mark bubbles as explored.
					for(var i=0; i<affectedIndices.triggered.length; i++)
					{
						var bub = this.bubbles[affectedIndices.triggered[i]];
						if(bub != null)
						{
							exploredHexes.push(this.createKey({"x":bub.col, "y":bub.row}));
							curStepEvents.push({"type":affectedIndices.triggers[i], "position":{"x":bub.col,"y":bub.row} });
						}
					}
					
					// Delete destroyed bubbles from executed action.
					if(affectedIndices.destroyed.length>0)
					{
						DATA.registerEvent({"type":"delete","progress":affectedIndices.destroyed.length});
						
						var destroyedBubPositions = [];
						for(var i=0; i<affectedIndices.destroyed.length; i++)
						{
							//destroyedHexes[this.createKey(affectedIndices.destroyed[i])] = 0; // THIS IS WRONG!!
							var bub = this.bubbles[affectedIndices.destroyed[i]];
							destroyedHexes[this.createKey({"x":bub.col,"y":bub.row})] = 0;
							destroyedBubPositions.push({"x":bub.col,"y":bub.row});
						}
						databasePositionsToDestroy = databasePositionsToDestroy.concat(destroyedBubPositions);
						
						//curStepEvents.push({"type":"destroy", "positions":affectedIndices.destroyed});
						this.destroyBubbles(affectedIndices.destroyed);
					}
					
				}
				else cc.log("BUG");
				
			}
			trackIndex++;			// tracking number of steps for reaction
			this.futureActionQueue.splice(0,1);
			this.futureActionQueue[0] = curStepEvents;	// push list of events to trigger that step
			this.futureActionQueue.push([]);
		
			databasePositionsToDestroy = databasePositionsToDestroy.concat(this.cullUnconnected());
			
			// Remove bubbles from database
			if(this.modeType == "world")
			{
				DATA.removeBubblesFromDatabase(databasePositionsToDestroy);
			}
			
			this.cullEmptyRows();
			
			/*if(this.rowsAdded > 0 && this.rowsCulled == 0)
			{
				
				
			}*/
			
			//DATA.updateWorldBubblesDatabase(this.bubbles);
					
			if(curStepEvents.length == 0)
			{
				this.unschedule(this.actionStep);
				
				this.checkLevelOver();
				this.checkColorElimination();
				this.initNextTurn();
				
				if(this.rowsAdded > 0 && this.rowsCulled == 0)
				{
					var overflowOffset = this.getOverflowOffset();
		
					if(this.rowsAdded > 0)
					{
						var rowNum = 0;
						for(var i=this.bubbleMap.length-1; i>=0 && rowNum <= 12; i--)
						{
							for(var j=0; j<this.bubbleMap[i].length; j++)
							{
								if(this.bubbleMap[i][j] != -1)
								{
									/*this.bubbles[this.bubbleMap[i][j]].attr({
						       			x: this.bubbleR+j*this.bubbleR*2 + (i%2)*this.bubbleR,
						       			y: this.height - i*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
						       			anchorX:.5,
						       			anchorY:.5
						       		});*/
						       		//cc.log(this.bubbleR+j*this.bubbleR*2 + (i%2)*this.bubbleR);
						       		//cc.log(this.height - i*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset);
									//cc.director.getScheduler().unscheduleAllCallbacks();
						       		
									//cc.director.getScheduler().resumeTarget(this);
						       		
						       		if(!this.bubbles[this.bubbleMap[i][j]].active)
						       		{
						       			this.bubbles[this.bubbleMap[i][j]].active = true;
						       			//this.addChild(this.bubbles[this.bubbleMap[i][j]]);
						       		}
						       		
						       		var actionMove = cc.MoveTo.create(.15, cc.p(this.bubbleR+j*this.bubbleR*2 + (i%2)*this.bubbleR,
						       			this.height - i*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset));
						       		this.bubbles[this.bubbleMap[i][j]].runAction(actionMove);
						       		
					   		cc.director.getScheduler().resumeTarget(this);
						       		//cc.director.getScheduler().resumeTarget(this);
						       		//cc.log(cc.director.getScheduler());
								}
							}
							rowNum++;
						}
					}
				}
				
				
					
				this.rowsCulled = 0;
				this.rowsAdded = 0;
				/*
				
				
				
				
				
				*/
				
				
			}
			else 
			{
				//this.unschedule(this.actionStep);
				this.schedule(this.actionStep, .3);
   			}
		}
		else
		{
			
   		//cc.director.getScheduler().pauseTarget(this);
		}
		
		
	},
	
	
	executeOnAdjMatch:function(matchedBubbleIndices)
	{
		var triggeredBubbleIndices = [];
		var triggersList = [];
		
		var exploredHexes = [];
		for(var i=0; i<matchedBubbleIndices.length; i++)
		{
			var bub = this.bubbles[matchedBubbleIndices[i]];
			exploredHexes[this.createKey({"x":bub.col,"y":bub.row})] = 0;
			var adjacents = this.getAdjacentsExcluding(bub.row, bub.col, exploredHexes);
			for(var j=0; j<adjacents.length; j++)
			{
				var adj = adjacents[j];
				var adjBub = this.bubbles[this.bubbleMap[adj.y][adj.x]];
				exploredHexes[this.createKey({"x":adjBub.col,"y":adjBub.row})] = 0;
				if(adjBub.onAdjMatch != null)
				{
					if(adjBub.type == 15)
					{
						adjBub.triggerOnAdjMatch(this.shooter.colorCode);
						triggeredBubbleIndices.push(this.bubbleMap[adj.y][adj.x]);
						triggersList.push("transform");
					}
					else
					{
						adjBub.triggerOnAdjMatch(this.shooter.colorCode);
						triggeredBubbleIndices.push(this.bubbleMap[adj.y][adj.x]);
						triggersList.push("clear");
					}
				}
			}
		}
		return {"destroyed":[], "triggered":triggeredBubbleIndices, "triggers":triggersList};
	},
	
	initNextTurn:function()
	{
		this.turnNumber++;
		this.numMoves--;
		if(this.modeType == "world")
		{
			DATA.worldBallsLeft--;
			DATA.setDatabaseMoves(DATA.worldBallsLeft);
			if(this.timerLabel == null && this.numMoves == 4)
			{
				DATA.setLastTimeMoveSpawned();
				this.initMoveTimer();
			}
			if(this.numMoves > 0)
				this.ballsLeftLabel.setString(this.numMoves);
			else
			{
				//this.buyMovesButton = ;
				//this.
				//this.removeChild(this.ballsLeftLabel);
				this.ballsLeftLabel.setString(this.numMoves);
				
				this.buyMovesButton = new cc.Sprite(res.buy_button);
				this.buyMovesButton.setScale(this.bubbleR*3 / this.buyMovesButton.width);
				this.buyMovesButton.attr({
					x: this.width*.25,
	       			y:this.bubbleStartHeight+this.bubbleR+3,
					anchorX: .5,
					anchorY: 0
				});
				this.addChild(this.buyMovesButton);
				
				if(DATA.levelIndexB == null)
					this.parent.triggerBuyMovesLabel();
				
			}
		}
		else if(this.modeType == "challenge")
		{
			if(this.numMoves > 0)
				this.ballsLeftLabel.setString(this.numMoves);
		}
		
		// Note: Might have to put this in actionQueue system if want it to have chain reactions
		
		for(var i=0; i<this.bubbles.length; i++)
		{
			if(this.bubbles[i].onTurn != null)
			{
				this.bubbles[i].triggerOnTurn(this.turnNumber);
			}
		}
		
		this.inputFrozen = false;
		this.drawAimIndicator();
	},
	
	checkLevelOver:function()
	{
		if(this.modeType == "world")
		{
			if(this.bubbles.length == 0)
			{
				DATA.updateWorldIndexDatabase(DATA.worldIndex+1);
				this.unschedule(this.triggerRandomIdle);
				//cc.director.runScene(new RewardScene());
				this.parent.openWorldRewardsLayer();
				//DATA.worldColorsEliminated = [];
				DATA.resetForNewWorld();

			}
			
			/*if(this.numMoves <= 0)
			{
				this.buyMovesButton = new cc.Sprite(res.buy_button);
				this.buyMovesButton.setScale(this.bubbleR*3 / this.buyMovesButton.width);
				this.buyMovesButton.attr({
					x: this.width*.25,
	       			y:this.bubbleStartHeight,
					anchorX: .5,
					anchorY: .5
				});
				this.addChild(this.buyMovesButton);
			}*/
		}
		else if(this.modeType == "challenge")
		{
			if(this.bubbles.length == 0)
			{
				DATA.levelIndexA = null;
				if(DATA.levelIndexB != null)
				{
					DATA.levelIndexA = DATA.levelIndexB;
					DATA.levelIndexB = null;
				}
				
				DATA.updateDatabaseLevelIndices();
				
				
				//var rankReturn = DATA.checkRankUp();
				
				//var rewardScene = new ChallengeRewardScene();
				
				
				DATA.streakStep = Math.min(DATA.streakStep+1, 2);
				DATA.challengeTries = 0;
				
				DATA.updateDatabaseStreak();
				
				DATA.registerEvent({"type":"level","progress":1});
				
				//cc.director.runScene(rewardScene);
				
				this.parent.openChallengeRewardLayer();
			}
			else if(this.numMoves <= 1)
			{
				if(this.plusFivePreboosterIcon != null)
				{
					this.numMoves += 5;
					this.removeChild(this.plusFivePreboosterIcon);
					this.plusFivePreboosterIcon = null;
				}
				else
				{
					if(DATA.challengeTries == DATA.streakStep)
					{
						DATA.levelIndexA = null;
						if(DATA.levelIndexB != null)
						{
							DATA.levelIndexA = DATA.levelIndexB;
							DATA.levelIndexB = null;
						}
						DATA.challengeTries = 0;
						DATA.streakStep = 0;
					}
					else DATA.challengeTries++;
					
					DATA.updateDatabaseLevelIndices();
					DATA.updateDatabaseStreak();
					
					cc.director.runScene(new ChallengeFailScene());
				}
			}
		}
		else if(this.modeType == "playtest")
		{cc.log("Playtest check game over")
			
		}
	},
	
	checkColorElimination:function()
	{
		if(this.modeType == "world")
		{
			var colors = ["red","orange","yellow","green","blue","pink","purple"];
			var colorsFound = [];
			
			// Get colors that were active last turn
			var curColors = [];
			for(var i=0; i<DATA.worldQueue.length; i++)
			{
				var queueSlot = DATA.worldQueue[i];
				if(queueSlot > 0 && DATA.worldColorsEliminated.indexOf(colors[i]) == -1)
					curColors.push(colors[i]);
			}
			
			// Get the colors present this turn
			for(var i=0; i<this.bubbles.length && colorsFound.length<curColors.length; i++)
			{
				var bub = this.bubbles[i];
				if(bub.colorCode != null)
				{
					if(colorsFound.indexOf(bub.colorCode) == -1)
					{
						colorsFound.push(bub.colorCode);
					}
				}
			}
			
			// eliminate colors no longer in puzzle
			if(colorsFound.length != curColors.length)
			{cc.log(DATA.worldActiveQueue);
				// eliminate colors, replace queue bubbles
				for(var i=0; i<curColors.length; i++)
				{cc.log(DATA.worldColorsEliminated.length);cc.log(DATA.numColors-1);
					if(colorsFound.indexOf(curColors[i]) == -1 && DATA.worldColorsEliminated.length < DATA.numColors-1)
					{
						DATA.worldColorsEliminated.push(curColors[i]);
						DATA.worldQueue[colors.indexOf(curColors[i])] = 0;
						DATA.worldActiveQueue[colors.indexOf(curColors[i])] = 0;
						
						if(colorsFound.indexOf(DATA.worldBallAColor) == -1)
						{
							DATA.setWorldShooterColor();
						}
						if(colorsFound.indexOf(DATA.worldBallBColor) == -1)
						{
							DATA.setWorldQueueColor();
						}
					}
				}
				cc.log(DATA.worldActiveQueue);
			}
		}
	},
	
	executeMeta:function(row, col)
	{cc.log("executing meta");
		var bubble = this.bubbles[this.bubbleMap[row][col]];
		if(bubble.type == 20)
		{
			// Look up level, add it to inventory.
			DATA.retrieveLevel();
			if(DATA.levelIndexB != null)
			{
				this.parent.triggerLevelsFullLabel();
			}
			
			//this.parent.refreshLevelsUI();
			//this.parent.openPreLayer();
			
			var starImg = new cc.Sprite(res.star_emoji);
			starImg.setScale(this.bubbleR*2 / starImg.width);
			starImg.attr({
				x:bubble.x,
				y:bubble.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(starImg);
			
			var challengeButton = this.parent.coreButtonsUI.challengeButton;
			var growAction = cc.scaleTo(.75, starImg.scale*2, starImg.scale*2);
			var moveAction = cc.moveTo(.5, challengeButton.x+challengeButton.width/2, challengeButton.y);
			
			var spawn = cc.spawn(cc.callFunc(starImg.removeFromParent, starImg), cc.callFunc(this.parent.refreshLevelsUI, this.parent), cc.callFunc(this.parent.openPreLayer, this.parent));
			var seq = new cc.Sequence(growAction, moveAction, spawn);
			
			starImg.runAction(seq);
			
			// Delete shooter, itself
		}
		// return {} indices of deleted bubbles
	},
	
	executeMatch:function(row, col)
	{
		var color = this.bubbles[this.bubbleMap[row][col]].colorCode;cc.log(color);
		var adjQueue = [{"x":col, "y":row}];
		var matchedBubbleIndices = [];
		var triggeredBubbleIndices = [];
		var triggersList = [];
		
		var exploredHexes = [];
		
		
		// BST for matched bubbles
		while(adjQueue.length > 0)
		{
			var adj = adjQueue[0];
			var bubble = this.bubbles[this.bubbleMap[adj.y][adj.x]];

			if(bubble == null)
				cc.log("UNDEFINED AT " + adj.x + ", " + adj.y);

			if(bubble.onMatch!= null && bubble.colorCode == color && bubble.matchable)
			{
				// 1. Mark as adjacent-color
				matchedBubbleIndices.push(this.bubbleMap[adj.y][adj.x]);
				exploredHexes[this.createKey(adj)] = 0;
				//this.bubbleMap[adj.y][adj.x] = -1;
				
				// 2. Add adjacents to queue
				var newAdjacents = this.getAdjacentsExcluding(adj.y, adj.x, exploredHexes);
				for(var i=0; i<newAdjacents.length; i++)
				{
					// Add to queue if unexplored.
					var exploreKey = this.createKey(newAdjacents[i]);
					if(!(exploreKey in exploredHexes))
					{
						adjQueue.push(newAdjacents[i]);
						exploredHexes[exploreKey] = 0;
					}
				}
			}
			
			adjQueue.splice(0, 1);
		}cc.log("matchedBubbleIndices");cc.log(matchedBubbleIndices);
		if(matchedBubbleIndices.length > 2)
		{
			var adjMatchChecked = [];
			// Check adj-matches
			for(var i=0; i<matchedBubbleIndices.length; i++)
			{
				adjMatchChecked[this.createKey({"x":this.bubbles[matchedBubbleIndices[i]].col, "y":this.bubbles[matchedBubbleIndices[i]].row})] = 0;
				
			
			}
			for(var i=0; i<matchedBubbleIndices.length; i++)
			{
				var adjacents = this.getAdjacentsExcluding(this.bubbles[matchedBubbleIndices[i]].row, this.bubbles[matchedBubbleIndices[i]].col, adjMatchChecked);
				for(var j=0; j<adjacents.length; j++)
				{
					var adj = adjacents[j];
					adjMatchChecked[this.createKey(adj)] = 0;
					if(this.bubbles[this.bubbleMap[adj.y][adj.x]].onAdjMatch != null)
					{
						this.bubbles[this.bubbleMap[adj.y][adj.x]].triggerOnAdjMatch(this.bubbles[matchedBubbleIndices[i]].colorCode);
						if(this.bubbles[this.bubbleMap[adj.y][adj.x]].type == 9)
						{
							triggeredBubbleIndices.push(this.bubbleMap[adj.y][adj.x]);
							triggersList.push("match");
						}
					}
				}
			}
			
			
			return {"destroyed":matchedBubbleIndices, "triggered":triggeredBubbleIndices, "triggers":triggersList};
		}
		else return {"destroyed":[], "triggered":triggeredBubbleIndices, "triggers":triggersList};
		
	},
	
	executeTransform:function(row, col)
	{
		var bubIndex = this.bubbleMap[row][col];
		//this.bubbles[bubIndex].colorCode = this.prevShooterColor;
		this.bubbles[bubIndex].transform();
		
		var triggeredBubbleIndices = [];
		
		var triggersList = [];
		// Dice
		if(this.bubbles[bubIndex].type == 8)
		{
			triggeredBubbleIndices.push(bubIndex);
			triggersList.push("match");
		}
		else if(this.bubbles[bubIndex].type == 15)
		{
			triggeredBubbleIndices.push(bubIndex);
			triggersList.push("match");
		}
		// Egg
		else if(this.bubbles[bubIndex].type == 22)
		{
			var bubbleClearEffect = {"type":"destroy","rule":"self"};
        	this.bubbles[bubIndex].onHit = null;
        	this.bubbles[bubIndex].onMatch = bubbleClearEffect;
        	this.bubbles[bubIndex].onAdjMatch = null;
			this.bubbles[bubIndex].onClear = bubbleClearEffect;
        	this.bubbles[bubIndex].onTurn = null;
        	
        	this.bubbles[bubIndex].matchable = true;
			//this.bubbles[bubIndex].transform();
			/*var color = this.bubbles[bubIndex].colorCode;
			var row = this.bubbles[bubIndex].row;
			var col = this.bubbles[bubIndex].col;
			var x = this.bubbles[bubIndex].x;
			var y = this.bubbles[bubIndex].y;
			
			this.removeChild(this.bubbles[bubIndex]);
			this.bubbles[bubIndex] = new Bubble(DATA.bubbleR, color, 23, null, row, col);
			this.bubbles[bubIndex].attr({x:x,y:y,anchorX:.5,anchorY:.5});
			this.addChild(this.bubbles[bubIndex]);*/
			
			//triggeredBubbleIndices.push(bubIndex);
			//triggersList.push("match");
		}
		
		return {"destroyed":[], "triggered":triggeredBubbleIndices, "triggers":triggersList};
	},
	
	executeClear:function(row, col, exploredHexes)
	{
		var onClearQueue = [];
		
		var destroyedBubbleIndices = [];
		var triggeredBubbleIndices = [];
		var triggersList = [];
		
		//onClearQueue.push({"x":col,"y":row});
		exploredHexes[this.createKey({"x":col,"y":row})] = 0;
		
		var bubble = this.bubbles[this.bubbleMap[row][col]];
		if(bubble == null)
		{
			cc.log("UNDEFINED BUBBLE");
			cc.log(this.bubbleMap[row][col]);
			cc.log("row "+row+" col "+col);
		}
		//cc.log(bubble.onClear);
		// Supers
		if(bubble.onClear.type == "explode")
		{
			var aoe = bubble.onClear.aoe;
			// Bombs
			if(aoe.type == "radial")
			{
				var adjacents = [];
				if(row%2==0)
				{
					adjacents = [{x:col-2,y:row+0},{x:col+2,y:row+0},{x:col+1,y:row+0},{x:col+2,y:row+0},
									{x:col-1,y:row-2},{x:col+0,y:row-2},{x:col+1,y:row-2},
									{x:col-1,y:row+2},{x:col+0,y:row+2},{x:col+1,y:row+2},
									{x:col-2,y:row-1},{x:col-1,y:row-1},{x:col+0,y:row-1},{x:col+1,y:row-1},
									{x:col-2,y:row+1},{x:col-1,y:row+1},{x:col+0,y:row+1},{x:col+1,y:row+1}
								];
				}
				else
				{
					adjacents = [{x:col-2,y:row+0},{x:col+2,y:row+0},{x:col+1,y:row+0},{x:col+2,y:row+0},
									{x:col-1,y:row-2},{x:col+0,y:row-2},{x:col+1,y:row-2},
									{x:col-1,y:row+2},{x:col+0,y:row+2},{x:col+1,y:row+2},
									{x:col-1,y:row-1},{x:col+0,y:row-1},{x:col+1,y:row-1},{x:col+2,y:row-1},
									{x:col-1,y:row+1},{x:col+0,y:row+1},{x:col+1,y:row+1},{x:col+2,y:row+1}
								];
				}
				
				// It should destroy itself.
				destroyedBubbleIndices.push(this.bubbleMap[row][col]);
				
				for(var i=0; i<adjacents.length; i++)
				{
					var adj = adjacents[i];
					if(adj.y < this.bubbleMap.length && adj.y >= 0 && adj.x < this.bubbleMap[adj.y].length && adj.x >= 0
						&& this.bubbleMap[adj.y][adj.x] != -1)
					{
						var bub = this.bubbles[this.bubbleMap[adj.y][adj.x]];
						
						if(bub != null && bub.onClear != null)
						{
							var clearEffect = bub.onClear;
							if(clearEffect.type == "destroy")
							{
								destroyedBubbleIndices.push(this.bubbleMap[adj.y][adj.x]);
							}
							else if(clearEffect.type == "explode" && !bub.triggered)
							{
								triggeredBubbleIndices.push(this.bubbleMap[adj.y][adj.x]);
								triggersList.push("clear");
								this.bubbles[this.bubbleMap[adj.y][adj.x]].trigger();
							}
							else if(clearEffect.type == "clear" && !bub.triggered)
							{
								if(clearEffect.aoe == "connected")
								{
									
									var connectedBubbleIndices = this.getConnectedOfType(bub.row, bub.col);
									triggeredBubbleIndices = triggeredBubbleIndices.concat(connectedBubbleIndices);
									for(var j=0; j<connectedBubbleIndices.length; j++)
									{
										this.bubbles[connectedBubbleIndices[j]].trigger();
										triggersList.push("destroy");
									}
								}
							}
							
						}
					}
				}
				
			}
			else if(aoe.type == "linear")
			{
				destroyedBubbleIndices.push(this.bubbleMap[row][col]);
				
				var hexes = [];
				for(var i=0; i<aoe.length; i++)
				{
					hexes.push({"x":col+1+i, "y":row});
					hexes.push({"x":col-1-i, "y":row});
				}
				for(var i=0; i<hexes.length; i++)
				{
					var hex = hexes[i];
					if(hex.y >= 0 && hex.y < this.bubbleMap.length && hex.x >= 0 && hex.x < this.bubbleMap[hex.y].length)
					{
						if(this.bubbleMap[hex.y][hex.x] != -1)
						{
							triggeredBubbleIndices.push(this.bubbleMap[hex.y][hex.x]);
							triggersList.push("clear");
						}
					}
				}
			}
			else if(aoe.type == "direction")
			{
				destroyedBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
				//cc.log("Destroying bomb at " + bubble.row + " _ " + bubble.col);
				
				var dir = bubble.orientation;
				var dist = aoe.distance;
				var curPos = {"x":bubble.col, "y":bubble.row};
				var outOfBounds = false;
				for(var i=0; i<dist && !outOfBounds; i++)
				{
					if(dir == "left")
						curPos.x--;
					else if(dir == "right")
						curPos.x++;
					else if(dir == "upleft")
					{
						curPos.x -= (curPos.y+1)%2;
						curPos.y -= 1;
					}
					else if(dir == "downleft")
					{
						curPos.x -= (curPos.y+1)%2;
						curPos.y += 1;
					}
					else if(dir == "upright")
					{
						curPos.x += curPos.y%2;
						curPos.y -= 1;
					}
					else if(dir == "downright")
					{
						curPos.x += (curPos.y)%2;
						curPos.y += 1;
					}
					
					if(curPos.x < 0 || curPos.x > 11-(curPos.y%2) || curPos.y < 0 || curPos.y >= this.bubbleMap.length)
					{
						outOfBounds = true;
					}
					else
					{
						var bubIndex = this.bubbleMap[curPos.y][curPos.x];
						if(bubIndex != -1)
						{
							var bub = this.bubbles[bubIndex];
							var key = ""+bub.row+"_"+bub.col;
							if(!(key in exploredHexes) && bub.onClear != null)
							{
								var clearEffect = bub.onClear;
								if(clearEffect.type == "destroy")
								{
									destroyedBubbleIndices.push(this.bubbleMap[curPos.y][curPos.x]);
									exploredHexes[""+curPos.y+"_"+curPos.x] = 0;
								}
								else
								{
									triggeredBubbleIndices.push(this.bubbleMap[curPos.y][curPos.x]);
									triggersList.push("clear");
									exploredHexes[""+curPos.y+"_"+curPos.x] = 0;
								}
								
							}
							
						}
					
						
					}
					
				}
				
				var moveAction = null;
							if(dir == "left")
							{
								moveAction = cc.moveBy(.5,-1*DATA.bubbleR*6, 0);
							}
							else if(dir == "right")
							{
								moveAction = cc.moveBy(.5,DATA.bubbleR*6, 0);
							}
							else if(dir == "upleft")
							{
								moveAction = cc.moveBy(.5,-1*DATA.bubbleR*3, DATA.bubbleR*6);
							}
							else if(dir == "downleft")
							{
								moveAction = cc.moveBy(.5,-1*DATA.bubbleR*3, -1*DATA.bubbleR*6);
							}
							else if(dir == "upright")
							{
								moveAction = cc.moveBy(.5,DATA.bubbleR*3, DATA.bubbleR*6);
							}
							else if(dir == "downright")
							{
								moveAction = cc.moveBy(.5,DATA.bubbleR*3, -1*DATA.bubbleR*6);
							}
							
							var effectBub = new Bubble(DATA.bubbleR, null, bubble.type, bubble.orientation, null, null, bubble.row, bubble.col);
							effectBub.attr({
								x:bubble.getPositionX(),
								y:bubble.getPositionY(),
								anchorX:.5,
								anchorY:.5
							});
							this.addChild(effectBub);
							var seq = new cc.Sequence(moveAction, cc.callFunc(effectBub.removeFromParent, effectBub));
							effectBub.bubbleImg.runAction(seq);
					
				
			}
			else if(aoe.type == "match" && aoe.rule == "adjacents")
			{
				destroyedBubbleIndices.push(this.bubbleMap[row][col]);
				
				var exploredHexes = [];
				var adjacents = this.getAdjacentsExcluding(bubble.row, bubble.col, exploredHexes);
				for(var i=0; i<adjacents.length; i++)
				{
					var adj = adjacents[i];
					var bub = this.bubbles[this.bubbleMap[adj.y][adj.x]];
					if(bub.onMatch != null)
					{
						triggeredBubbleIndices.push(this.bubbleMap[adj.y][adj.x]);
						triggersList.push("match");
					}
				}
			}
		}
		
		else if(bubble.onClear.type == "destroy")
		{
			destroyedBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
		}
		
		else if(bubble.onClear.type == "meta")
		{
			this.executeMeta(bubble.row, bubble.col);
			destroyedBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
		}
			
		return {"destroyed":destroyedBubbleIndices, "triggered":triggeredBubbleIndices, "triggers":triggersList};
	},
	
	executeDestroy:function(row, col)
	{
		if(row >= 0 && row < this.bubbleMap.length && col < this.bubbleMap[row].length && this.bubbleMap[row][col] != -1)
			return {"destroyed":[this.bubbleMap[row][col]], "triggered":[], "triggers":[]};
		else return {"destroyed":[],"triggered":[],"triggers":[]}
	},
	
	executeHit:function(row, col, exploredHexes)
	{
		var onHitQueue = [];
		//var exploredHexes = [];
		
		// Get bubbles adjacent to Shooter's landing
		var adjacents = this.getAdjacents(row, col);
		for(var i=0; i<adjacents.length; i++)
		{
			var adj = adjacents[i];
			var bubble = this.bubbles[this.bubbleMap[adj.y][adj.x]];
			
			if(bubble.onHit != null && !(this.createKey({"x":bubble.col,"y":bubble.row}) in exploredHexes))
			{
				onHitQueue.push({"x":bubble.col, "y":bubble.row});
				exploredHexes[this.createKey(adj)] = 0;
			}
		
		}
		
		var destroyedBubbleIndices = [];
		var triggeredBubbleIndices = [];
		var triggersList = [];
		var shooterDestroyed = false;
		
		for(var q=0; q<onHitQueue.length; q++)
		{
			var bubble = this.bubbles[this.bubbleMap[onHitQueue[q].y][onHitQueue[q].x]];
			
			// Supers
			if(bubble.onHit.type == "explode")
			{
				var aoe = bubble.onHit.aoe;
				// Bombs
				if(aoe.type == "radial")
				{
					// It should destroy itself.
					//destroyedBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
					this.bubbles[this.bubbleMap[bubble.row][bubble.col]].trigger();
					
					triggeredBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
					triggersList.push("clear");
					
					
				}
				// Beachball
				/*else if(aoe.type == "match")
				{
					triggeredBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
					triggersList.push("rainbow");
				}*/
				else if(aoe.type == "linear")
				{
					this.bubbles[this.bubbleMap[bubble.row][bubble.col]].trigger();
					triggeredBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
					triggersList.push("clear");
				}
				// Pins, daggers
				else if(aoe.type = "direction")
				{
					destroyedBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
					//cc.log("Destroying bomb at " + bubble.row + " _ " + bubble.col);
					
					var dir = bubble.orientation;
					var dist = aoe.distance;
					var curPos = {"x":bubble.col, "y":bubble.row};
					var outOfBounds = false;
					for(var i=0; i<dist && !outOfBounds; i++)
					{
						if(dir == "left")
						{
							curPos.x--;
						}
						else if(dir == "right")
						{
							curPos.x++;
						}
						else if(dir == "upleft")
						{
							curPos.x -= (curPos.y+1)%2;
							curPos.y -= 1;
						}
						else if(dir == "downleft")
						{
							curPos.x -= (curPos.y+1)%2;
							curPos.y += 1;
						}
						else if(dir == "upright")
						{
							curPos.x += curPos.y%2;
							curPos.y -= 1;
						}
						else if(dir == "downright")
						{
							curPos.x += (curPos.y)%2;
							curPos.y += 1;
						}
						
						if(curPos.x < 0 || curPos.x > 11-(curPos.y%2) || curPos.y < 0 || curPos.y >= this.bubbleMap.length)
						{
							outOfBounds = true;
						}
						else
						{
							var bubIndex = this.bubbleMap[curPos.y][curPos.x];
							if(bubIndex != -1)
							{
								var bub = this.bubbles[bubIndex];
								var key = ""+bub.row+"_"+bub.col;
								if(!(key in exploredHexes) && bub.onClear != null)
								{
									var clearEffect = bub.onClear;
									if(clearEffect.type == "destroy")
									{
										destroyedBubbleIndices.push(this.bubbleMap[curPos.y][curPos.x]);
										exploredHexes[""+curPos.y+"_"+curPos.x] = 0;
									}
									else
									{
										triggeredBubbleIndices.push(this.bubbleMap[curPos.y][curPos.x]);
										triggersList.push("clear");
										exploredHexes[""+curPos.y+"_"+curPos.x] = 0;
									}
									
								}
								
							}
							
							
						}
					}
					
					
					var moveAction = null;
							if(dir == "left")
							{
								moveAction = cc.moveBy(.5,-1*DATA.bubbleR*6, 0);
							}
							else if(dir == "right")
							{
								moveAction = cc.moveBy(.5,DATA.bubbleR*6, 0);
							}
							else if(dir == "upleft")
							{
								moveAction = cc.moveBy(.5,-1*DATA.bubbleR*3, DATA.bubbleR*6);
							}
							else if(dir == "downleft")
							{
								moveAction = cc.moveBy(.5,-1*DATA.bubbleR*3, -1*DATA.bubbleR*6);
							}
							else if(dir == "upright")
							{
								moveAction = cc.moveBy(.5,DATA.bubbleR*3, DATA.bubbleR*6);
							}
							else if(dir == "downright")
							{
								moveAction = cc.moveBy(.5,DATA.bubbleR*3, -1*DATA.bubbleR*6);
							}
							
							var effectBub = new Bubble(DATA.bubbleR, null, bubble.type, bubble.orientation, null, null, bubble.row, bubble.col);
							effectBub.attr({
								x:bubble.getPositionX(),
								y:bubble.getPositionY(),
								anchorX:.5,
								anchorY:.5
							});
							this.addChild(effectBub);
							var seq = new cc.Sequence(moveAction, cc.callFunc(effectBub.removeFromParent, effectBub));
							effectBub.bubbleImg.runAction(seq);
					
					//return {"destroyed":destroyedBubbleIndices, "triggered":triggeredBubbleIndices, "triggers":[]};
				}
				
			}
			else if(bubble.onHit.type == "match")
			{
				var aoe = bubble.onHit.aoe
				if(aoe.rule == "adjacents")
				{cc.log("rainbow match");
					triggeredBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
					triggersList.push("match");
				}
			}
			// 
			else if(bubble.onHit.type == "clear")
			{
				if(bubble.onHit.aoe == "connected")
				{//cc.log("POP");
					var connectedBubbleIndices = this.getConnectedOfType(bubble.row, bubble.col);
					for(var i=0; i<connectedBubbleIndices.length; i++)
					{
						this.bubbles[connectedBubbleIndices[i]].trigger();
						triggeredBubbleIndices.push(connectedBubbleIndices[i]);
						triggersList.push("destroy");
					}
					
				}
			}
			else if(bubble.onHit.type == "destroy")
			{
				if(bubble.onHit.rule == "self")
					destroyedBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
				else if(bubble.onHit.rule == "shooter" && !shooterDestroyed && this.bubbleMap[row][col] != null)
				{
					//destroyedBubbleIndices.push(this.bubbleMap[row][col]);
					triggeredBubbleIndices.push(this.bubbleMap[row][col]);
					triggersList.push("destroy");
					shooterDestroyed = true;
				}
			}
			else if(bubble.onHit.type == "transform")
			{
				//FP
				if(this.type == 15)
					bubble.colorCode = "red";
				else if(this.type == 22)
				{
					
				}
				//this.shooter.colorCode;
				
				//bubble.trigger();
				triggeredBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
				triggersList.push("transform");
			}
			else if(bubble.onClear.type == "meta")
			{
				this.executeMeta(bubble.row, bubble.col);
				destroyedBubbleIndices.push(this.bubbleMap[bubble.row][bubble.col]);
			}


		}
		return {"destroyed":destroyedBubbleIndices, "triggered":triggeredBubbleIndices, "triggers":triggersList};		
	},
	
	executeAdjacentMatch:function()
	{
		
	},
	
	getConnectedOfType:function(row, col)
	{
		var type = this.bubbles[this.bubbleMap[row][col]].type;
		var adjQueue = [{"x":col, "y":row}];
		var connectedBubbleIndices = [];
		
		var exploredHexes = [];
		
		// BST for matched bubbles
		while(adjQueue.length > 0)
		{
			var adj = adjQueue[0];
			var bubble = this.bubbles[this.bubbleMap[adj.y][adj.x]];

			if(bubble == null)
				cc.log("UNDEFINED AT " + adj.x + ", " + adj.y);

			if(bubble.type == type)
			{
				// 1. Mark as adjacent-color
				connectedBubbleIndices.push(this.bubbleMap[adj.y][adj.x]);
				//this.bubbleMap[adj.y][adj.x] = -1;	// this way getAdjacents() ignores matched-bubs already found
				
				// 2. Add adjacents to queue
				var newAdjacents = this.getAdjacents(adj.y, adj.x);
				for(var i=0; i<newAdjacents.length; i++)
				{
					// Add to queue if unexplored.
					var exploreKey = this.createKey(newAdjacents[i]);
					if(!(exploreKey in exploredHexes))
					{
						adjQueue.push(newAdjacents[i]);
						exploredHexes[exploreKey] = 0;
					}
				}
			}
			
			adjQueue.splice(0, 1);
		}
		return connectedBubbleIndices;
	},
	
	cullUnconnected:function()
	{
		var queue = [];
		
		var databasePositionsToDestroy = [];
		
		var explorationTable = [];
		for(var i=0; i<this.bubbles.length; i++)
		{
			explorationTable[this.createKey({"x":this.bubbles[i].col,"y":this.bubbles[i].row})] = 0;
		}
		
		var floatingAnchors = [];
		for(var i=0; i<this.bubbles.length; i++)
		{
			var bub = this.bubbles[i];
			var bubIndex = this.bubbleMap[bub.row][bub.col];
			if(bub.row == 0 || bub.isAnchor)
			{
				queue.push({"x":bub.col, "y":bub.row});
				explorationTable[this.createKey({"x":bub.col, "y":bub.row})] = 1;
				if(bub.isAnchor)
				{
					floatingAnchors.push({"x":bub.col, "y":bub.row});
				}
			}
		}
		
		while(queue.length > 0)
		{
			var adjacents = this.getUnexploredAdjacents(queue[0].y, queue[0].x, explorationTable);
			for(var i=0; i<adjacents.length; i++)
			{
				var adj = adjacents[i];
				queue.push(adj);
				explorationTable[this.createKey(adj)] = 1;
			}
			queue.splice(0, 1);
		}
		
		var culledBubbleIndices = [];
		var explorationKeys = Object.keys(explorationTable);
		var culledBubblePositions = [];
		for(var i=0; i<explorationKeys.length; i++)
		{
			if(explorationTable[explorationKeys[i]] == 0)
			{
				// cull this bubble
				var splitKeys = explorationKeys[i].split("_");
				var y = parseInt(splitKeys[0]);
				var x = parseInt(splitKeys[1]);
				culledBubbleIndices.push(this.bubbleMap[y][x]);
				culledBubblePositions.push({"x":x,"y":y});
			}
		}
		
		culledBubbleIndices.sort(function(a,b){return b-a;});
		
		DATA.registerEvent({"type":"delete","progress":culledBubbleIndices.length});
		
		DATA.registerEvent({type:"cull",progress:culledBubbleIndices.length});
		
		databasePositionsToDestroy = databasePositionsToDestroy.concat(culledBubblePositions);
						
		for(var i=0; i<culledBubbleIndices.length; i++)
		{
			var moveByAction = cc.moveBy(.5, cc.p(0,-100));
			var fadeoutAction = cc.FadeOut.create(.5);
			var spawn = cc.spawn(moveByAction,fadeoutAction);
			this.bubbles[culledBubbleIndices[i]].setCascadeOpacityEnabled(true);
			var seq = new cc.Sequence(spawn, cc.callFunc( this.bubbles[culledBubbleIndices[i]].removeFromParent, this.bubbles[culledBubbleIndices[i]] ) );
			this.bubbles[culledBubbleIndices[i]].runAction(seq);
			
			var bub = this.bubbles[culledBubbleIndices[i]];
			if(bub == null)
			{
				cc.log("BUG");cc.log("Index: "+culledBubbleIndices[i]);
			}
			this.bubbleMap[bub.row][bub.col] = -1;
			this.bubbles.splice(culledBubbleIndices[i], 1);
			
		}
		this.syncBubbleMap();
		
		// Check for disconnected floating obstacles
		var anchorTable = [];
		var anchorChains = [];
		var adjacentsFound = [];
		//var anchorQueue = [floatingAnchors[0]];
		//while(floatingAnchors.length > 0)
		//{
		for(var q=0; q<floatingAnchors.length; q++)
		{
			var anchorPos = floatingAnchors[q];
			if(!(this.createKey(anchorPos) in anchorTable) )
			{
				var chain = [anchorPos];
				anchorTable[this.createKey(anchorPos)] = 0;
				var structureAttached = false;
				var anchorQueue = this.getAdjacentsExcluding(anchorPos.y, anchorPos.x, anchorTable);
				while(anchorQueue.length > 0){
					var subPos = anchorQueue[0];

					var anchorIndex = this.bubbleMap[subPos.y][subPos.x];
					if(anchorIndex != -1)
					{
						if(this.bubbles[anchorIndex].isAnchor && !(this.createKey(subPos) in anchorTable))
						{
							anchorTable[this.createKey(subPos)] = 0;
							//anchorQueue.push(subPos);
							chain.push(subPos);
							anchorQueue = anchorQueue.concat(this.getAdjacentsExcluding(subPos.y, subPos.x, anchorTable));
							
						}
						else if(!this.bubbles[anchorIndex].isAnchor)
						{
							structureAttached = true;
							anchorTable[this.createKey(subPos)] = 1;
						}
					}
					
					anchorQueue.splice(0, 1);
				}
				
				anchorChains.push(chain);
				adjacentsFound.push(structureAttached);
			}
		}
		
		var culledAnchors = [];
		var culledAnchorPositions = [];
		for(var i=0; i<adjacentsFound.length; i++)
		{
			if(adjacentsFound[i] == false)
			{
				for(var j=0; j<anchorChains[i].length; j++)
				{
					culledAnchors.push(this.bubbleMap[anchorChains[i][j].y][anchorChains[i][j].x]);
					culledAnchorPositions.push({"x":anchorChains[i][j].x,"y":anchorChains[i][j].y});
				}
			}
		}
		
		culledAnchors.sort(function(a,b){return b-a;});
		
		DATA.registerEvent({"type":"delete","progress":culledAnchors.length});
						
		DATA.registerEvent({type:"cull",progress:culledBubbleIndices.length});
		
		databasePositionsToDestroy = databasePositionsToDestroy.concat(culledAnchorPositions);
		
		for(var i=0; i<culledAnchors.length; i++)
		{
			this.removeChild(this.bubbles[culledAnchors[i]]);
			var bub = this.bubbles[culledAnchors[i]];
			if(bub == null)
			{
				cc.log("BUG");cc.log("Index: "+culledAnchors[i]);
			}
			this.bubbleMap[bub.row][bub.col] = -1;
			this.bubbles.splice(culledAnchors[i], 1);
			
		}
		this.syncBubbleMap();
		
		return databasePositionsToDestroy;
	},
	
	

///////////////////////////////////////////////////////////	
// 4. General Data Functions
//	-getAdjacents(row, col)
//	-getUnexploredAdjacents(row, col, explorationTable)
//	-getAdjacentsExcluding(row, col, exclusionTable)
//
//	-updateBubble(bubble, row, col)
//	-syncBubbleMap()
//	-destroyBubbles(bubbleIndices)
//
//	-createKey(pos)
//	-parseKey(keyString)
//	-dist(bubA, bubB)
//	-pointWithin(point)
	
	getAdjacents:function(row, col)
	{
		var adjacents = [];
		if(row%2 == 0)
		{
			for(var i=0; i<this.evenRowAdjacents.length; i++)
			{
				var adj = this.evenRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				if(y >= 0 && y < this.bubbleMap.length && x >= 0 && x < this.bubbleMap[y].length
					&& this.bubbleMap[y][x] != -1)
				{
					adjacents.push({"x":x, "y":y});
				}
				//else cc.log("NOTHING AT ("+x+","+y+")");
			}
		}
		else
		{
			for(var i=0; i<this.oddRowAdjacents.length; i++)
			{
				var adj = this.oddRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				if(y >= 0 && y < this.bubbleMap.length && x >= 0 && x < this.bubbleMap[y].length
					&& this.bubbleMap[y][x] != -1)
				{
					adjacents.push({"x":x, "y":y});
				}
				//else cc.log("NOTHING AT ("+x+","+y+")");
			}
		}
		
		return adjacents;
	},
	
	getUnexploredAdjacents:function(row, col, explorationTable){
		var adjacents = [];
		if(row%2 == 0)
		{
			for(var i=0; i<this.evenRowAdjacents.length; i++)
			{
				var adj = this.evenRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				var key = ""+y+"_"+x;
				if(y >= 0 && x >= 0
					&& (key in explorationTable) && explorationTable[key] == 0)
				{
					adjacents.push({"x":x, "y":y});
				}
			}
		}
		else
		{
			for(var i=0; i<this.oddRowAdjacents.length; i++)
			{
				var adj = this.oddRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				var key = ""+y+"_"+x;
				if(y >= 0 && x >= 0
					&& (key in explorationTable) && explorationTable[key] == 0)
				{
					adjacents.push({"x":x, "y":y});
				}
			}
		}
		
		return adjacents;
	},
	
	getAdjacentsExcluding:function(row, col, exclusionTable){
		var adjacents = [];
		if(row%2 == 0)
		{
			for(var i=0; i<this.evenRowAdjacents.length; i++)
			{
				var adj = this.evenRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				var key = ""+y+"_"+x;
				if(y >= 0 && y < this.bubbleMap.length && x >= 0 && x < this.bubbleMap[y].length
					&& this.bubbleMap[y][x] != -1
					&& !(key in exclusionTable))
				{
					adjacents.push({"x":x, "y":y});
				}
			}
		}
		else
		{
			for(var i=0; i<this.oddRowAdjacents.length; i++)
			{
				var adj = this.oddRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				var key = ""+y+"_"+x;
				if(y >= 0 && y < this.bubbleMap.length && x >= 0 && x < this.bubbleMap[y].length
					&& this.bubbleMap[y][x] != -1
					&& !(key in exclusionTable))
				{
					adjacents.push({"x":x, "y":y});
				}
			}
		}
		
		return adjacents;
	},
	
	updateBubble:function(bubble, row, col)
	{
		//this.bubbles.push(new Bubble(bubble.r,bubble.colorCode,bubble.type,bubble.orientation,bubble.row,bubble.col));
		//this.bubbles[this.bubbles.length-1].active = true;
		//this.bubbles[this.bubbles.length-1].x = bubble.x;
		//this.bubbles[this.bubbles.length-1].y = bubble.y;
		//this.addChild(this.bubbles[this.bubbles.length-1]);
		this.bubbles.push(bubble);
		var rowsAdded = 0;
		
		if(row >= this.bubbleMap.length)
		{
			var bubbleRow = [];
			for(var i=0; i<this.numCols-(i%2); i++)
			{
				bubbleRow.push(-1);
			}
			this.bubbleMap.push(bubbleRow);
			this.numRows++;
			rowsAdded++;
		}
		
		this.bubbleMap[row][col] = this.bubbles.length-1;
		
		
		this.rowsAdded = rowsAdded;
	},
	
	syncBubbleMap:function()
	{
		for(var i=0; i<this.bubbles.length; i++)
		{
			var bubble = this.bubbles[i];
			this.bubbleMap[bubble.row][bubble.col] = i;
		}
		
	},
	
	destroyBubbles:function(bubbleIndices)
	{
		bubbleIndices.sort(function(a,b){return b-a;});
		for(var i=0; i<bubbleIndices.length; i++)
		{
			var bub = this.bubbles[bubbleIndices[i]];
			this.bubbleMap[bub.row][bub.col] = -1;
			this.removeChild(this.bubbles[bubbleIndices[i]]);
			this.bubbles.splice(bubbleIndices[i], 1);
		}
		this.syncBubbleMap();
		
		
	},
	
	cullEmptyRows:function()
	{
		// Shift bubbles up
		var bubbleFound = false;
		var rowsCulled = 0;
		for(var i=this.bubbleMap.length-1; i>=0 && !bubbleFound; i--)
		{
			for(var j=0; j<this.bubbleMap[i].length && !bubbleFound; j++)
			{
				if(this.bubbleMap[i][j] != -1)
					bubbleFound = true;
				
			}
			if(!bubbleFound)
			{
				this.bubbleMap.splice(i, 1);
				rowsCulled++;
			}
		}
		
		this.numRows -= rowsCulled;
		this.rowsCulled = rowsCulled;
			
		var overflowOffset = this.getOverflowOffset();
		
		if(rowsCulled > 0)
		{cc.log("CULLING " + rowsCulled + " ROWS");
			var rowNum = 0;
			for(var i=this.bubbleMap.length-1; i>=0 && rowNum <= 12; i--)
			{
				for(var j=0; j<this.bubbleMap[i].length; j++)
				{
					if(this.bubbleMap[i][j] != -1)
					{
						if(!this.bubbles[this.bubbleMap[i][j]].active)
						{
			       			this.bubbles[this.bubbleMap[i][j]].active = true;
			       			
			       			
			       			this.bubbles[this.bubbleMap[i][j]].x = this.bubbleR+j*this.bubbleR*2 + (i%2)*this.bubbleR;
			       			this.bubbles[this.bubbleMap[i][j]].y = rowsCulled*this.rowHeight + this.height - i*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset
			       			
			       			
			       			this.addChild(this.bubbles[this.bubbleMap[i][j]]);
			       		}
			       			
				       		var actionMove = cc.moveTo(.1*rowsCulled, cc.p(this.bubbleR+j*this.bubbleR*2 + (i%2)*this.bubbleR,
				       			this.height - i*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset));
				       		this.bubbles[this.bubbleMap[i][j]].runAction(actionMove);
				       
					}
				}
				rowNum++;
			}
		}
	},
	
	changeShooter:function(type)
	{
		if(type == 1)
			this.shooterMod = "bomb";
		
		this.removeChild(this.shooter);
		this.shooter = null;
		this.shooter = new Bubble(this.bubbleR, null, type, null, null, null, null, null);
       	this.shooter.attr({
       		x: this.width/2,
       		y: this.bubbleStartHeight,
       		anchorX:.5,
       		anchorY:.5
       	});
       	this.shooter.active = true;
       	this.addChild(this.shooter);
	},
	
	createKey:function(pos)
	{
		return ""+pos.y+"_"+pos.x;
	},
	
	parseKey:function(keyString)
	{
		var splitKeys = explorationKeys[i].split("_");
		return {"y":parseInt(splitKeys[0]), "x":parseInt(splitKeys[1])};
	},
	
	dist:function(bubA, bubB)
	{
		var dx = Math.abs(bubB.x - bubA.x);
		var dy = Math.abs(bubB.y - bubA.y);
		
		return Math.pow( Math.pow(dx , 2) + Math.pow(dy , 2) , .5);
	},
	
	pointWithin:function(point)
	{
		if(point.x > 0 && point.x < 0+this.width &&
			point.y > 0 && point.y < 0+this.height)
		{
			return true;
		}
		return false;
	}
});
	