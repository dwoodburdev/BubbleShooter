var WinStreakLayer = cc.Layer.extend({
	ctor:function(width, height, feature, numStars, numLevelsBeat,streak,challengeTries, resetTime){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.feature = feature;
		 
		 this.prog = 0;
		 this.starsForUpgrade = 0;
		 
		 this.streak = streak;
		 this.challengeTries = challengeTries;
		 
		 this.numLevelsBeat = numLevelsBeat;
		 this.resetTime = resetTime;
		 
		 this.numStars = numStars;
		 this.numStarsTilUpgrade = 0;
		 this.nextEmojiImg = null;cc.log(this.numStars);
		 
		 this.maxNumStars = 31;
		 
		 this.intervalID = null;
		 
		 if(this.numStars >= this.maxNumStars)
		 {
		 	this.numStarsTilUpgrade = -1;
		 	this.nextEmojiImg = new cc.Sprite(res.nerd_emoji);
		 	this.starsForUpgrade = -1;
		 	this.prog = 1;
		 }
		 else if(this.numStars >= 16)
		 {
		 	this.numStarsTilUpgrade = 31 - this.numStars;
		 	this.nextEmojiImg = new cc.Sprite(res.neutral_orb_emoji);
		 	this.starsForUpgrade = 15;
		 	this.prog = (this.starsForUpgrade-this.numStarsTilUpgrade)/this.starsForUpgrade;
		 }
		 else if(this.numStars >= 6)
		 {
		 	this.numStarsTilUpgrade = 16 - this.numStars;
		 	this.nextEmojiImg = new cc.Sprite(res.bubble_wrap_emoji);
		 	this.starsForUpgrade = 10;
		 	this.prog = (this.starsForUpgrade-this.numStarsTilUpgrade)/this.starsForUpgrade;
		 }
		  else if(this.numStars >= 3)
		 {
		 	this.numStarsTilUpgrade = 6 - this.numStars;
		 	this.nextEmojiImg = new cc.Sprite(res.red_die_emoji);
		 	this.starsForUpgrade = 3;
		 	this.prog = (this.starsForUpgrade-this.numStarsTilUpgrade)/this.starsForUpgrade;
		 }
		  else if(this.numStars >= 1)
		 {
		 	this.numStarsTilUpgrade = 3 - this.numStars;
		 	this.nextEmojiImg = new cc.Sprite(res.bomb_emoji);
		 	this.starsForUpgrade = 2;
		 	this.prog = (this.starsForUpgrade-this.numStarsTilUpgrade)/this.starsForUpgrade;
		 }
		  else if(this.numStars == 0)
		 {
		 	this.numStarsTilUpgrade = 1 - this.numStars;
		 	this.nextEmojiImg = new cc.Sprite(res.soap_emoji);
		 	this.starsForUpgrade = 1;
		 	this.prog = (this.starsForUpgrade-this.numStarsTilUpgrade)/this.starsForUpgrade;
		 }
		 
		 
		 
		 
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(235,235,235,255), 0, cc.color(0,0,0,255));
		
		this.barDn = new cc.DrawNode();
		this.addChild(this.barDn);
		
		this.secsToReset = -1;
		this.minsToReset = -1;
		
		cc.log(this.resetTime - (new Date()).getTime());
		
		var levelLabelY = 5+this.height*.25;
	
		// CHECK RESET TIMER HERE
		if(this.resetTime > (new Date()).getTime())
		{
			this.delayLevel(this.resetTime - (new Date()).getTime());
		}
		else
		{
			this.playButton = new cc.Sprite(res.play_bg);
			this.playButton.setScale(this.height * .2 / this.playButton.height);
			this.playButton.attr({
				x:this.width/2,
				y:5,
				anchorX:.5,
				anchorY:0
			});
			
			this.levelLabel = new cc.LabelTTF("Ready","HeaderFont",Math.floor(this.height*.13));
			this.levelLabel.color = cc.color(255,255,255,255);
			this.levelLabel.attr({
				x:this.width/2,
				y:this.playButton.y+(this.playButton.height*this.playButton.scale*.9)-5,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.playButton);
			this.addChild(this.levelLabel);
				
		}
		
		var heightOfImg = (this.height - (levelLabelY+7));
		var scaleOfImg = this.width / 2 / 500;
		
		
		
		
		
		 this.streakDisplay = new StreakDisplay(this.width*.475, this.height*.3);
		 this.streakDisplay.attr({
		 	x:this.width*.5125,
		 	y:this.height - 5 - this.streakDisplay.height,
		 	anchorX:0,
		 	anchorY:0
		 });
		 this.addChild(this.streakDisplay);
		 
		 this.rewardDisplay = new DailyRewardDisplay(this.width*.475, this.height*.3);
		 this.rewardDisplay.attr({
		 	x:this.width*.0125,
		 	y:this.height - 5 - this.streakDisplay.height,
		 	anchorX:0,
		 	anchorY:0
		 });
		 this.addChild(this.rewardDisplay);
		
		
		
		var contentWidth = this.width*.475;
		var boxBorder = 5;
		var boxWidth = (contentWidth-boxBorder*2)/3;
		var boxHeight = boxWidth;
		var boxesX = this.rewardDisplay.x;
		var playTop = (this.height*.2)+5;//this.playButton.y+(this.playButton.height*this.playButton.scale)
		var boxesY = ( this.streakDisplay.y - playTop )/2 + playTop - boxHeight/2;
		
		
		this.dn.drawRect(cc.p(boxesX, boxesY), cc.p(boxesX+boxWidth, boxesY+boxHeight), cc.color(255,255,255,255), 3, cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(boxesX+boxWidth+boxBorder, boxesY), cc.p(boxesX+boxWidth*2 + boxBorder, boxesY+boxHeight), cc.color(255,255,255,255), 3, cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(boxesX+boxWidth*2+boxBorder*2, boxesY), cc.p(boxesX+boxWidth*3 + boxBorder*2, boxesY+boxHeight), cc.color(255,255,255,255), 3, cc.color(0,0,0,255));
		
		this.logoA = new cc.Sprite(res.red_x);
		this.logoA.setScale(boxHeight / this.logoA.height);
		this.logoA.attr({
			x:boxesX,
			y:boxesY,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.logoA);
		
		this.logoB = new cc.Sprite(res.red_x);
		this.logoB.setScale(boxHeight / this.logoB.height);
		this.logoB.attr({
			x:boxesX+boxWidth+boxBorder,
			y:boxesY,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.logoB);
		
		this.logoC = new cc.Sprite(res.sunglass_face);
		this.logoC.setScale(boxHeight / this.logoC.height);
		this.logoC.attr({
			x:boxesX+boxWidth*2+boxBorder*2,
			y:boxesY,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.logoC);
		
		
		
		
		
		this.nextPhone = new cc.Sprite(res.phone_up);
		this.nextPhone.setScaleX(heightOfImg*.85 / this.nextPhone.height);
		this.nextPhone.setScaleY(heightOfImg*.85 / this.nextPhone.height);
		if(this.nextPhone.height*this.nextPhone.scaleY > this.height*.6)
			this.nextPhone.setScaleY(this.height*.6 / this.nextPhone.height);
		
		this.nextPhone.attr({
			x:7,
			y:this.height-7,
			anchorX:0,
			anchorY:1
		});
		//this.addChild(this.nextPhone);
		
		this.nextEmojiLabel = new cc.LabelTTF("Rewards","HeaderFont",Math.floor(heightOfImg*.1));
		this.nextEmojiLabel.color = cc.color(0,0,0,255);
		this.nextEmojiLabel.attr({
			x:this.nextPhone.x + (this.nextPhone.width*this.nextPhone.scaleX/2),
			y:this.nextPhone.y - (this.nextPhone.height*this.nextPhone.scaleY) -1,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.nextEmojiLabel);
		
		this.nextEmojiImg.setScale((this.nextPhone.width*this.nextPhone.scaleX)*.7 / this.nextEmojiImg.width );
		this.nextEmojiImg.attr({
			x:this.nextPhone.x+(this.nextPhone.width*this.nextPhone.scaleX/2),
			y:this.nextPhone.y-(this.nextPhone.height*this.nextPhone.scaleY/2),
			anchorX:.5,
			anchorY:.5
		});
		//this.addChild(this.nextEmojiImg);
		
		var barStartX = this.nextPhone.x+(this.nextPhone.width*this.nextPhone.scaleX) + 10;
		var barStartY = this.nextPhone.y-(this.nextPhone.height*this.nextPhone.scaleY*.86);
		var barTopY = barStartY+(this.nextPhone.height*this.nextPhone.scale*.7);
		/*this.barDn.drawRect(
			cc.p(barStartX, barStartY),
			cc.p(barStartX+(this.width*.05), barTopY),
			cc.color(255,255,255,255),
			3,cc.color(0,0,0,255)
		);*/
		
		
		if(streak == 3)
			this.streakFace = new cc.Sprite(res.crown_face);
		else if(streak == 2)
			this.streakFace = new cc.Sprite(res.sunglass_face);
		else if(streak == 1)
			this.streakFace = new cc.Sprite(res.concerned_face);
		/*
		this.streakFace.setScale(this.width*.35 / this.streakFace.height);
		this.streakFace.attr({
			x:this.width*.75,
			y:this.nextPhone.y-(this.nextPhone.height*this.nextPhone.scaleY/2),
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.streakFace);
		
		this.triesLabel = new cc.LabelTTF("1 try","HeaderFont",Math.floor( (this.streakFace.height*this.streakFace.scale)*.3 ))
		this.triesLabel.color = cc.color(0,0,0,255);
		this.triesLabel.attr({
			x:this.streakFace.x,
			y:this.streakFace.y-(this.streakFace.height*this.streakFace.scaleY/2)-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.triesLabel);
		*/
		//this.updateStreakVis(this.streak, this.challengeTries, this.numLevelsBeat);
	},
	
	updateStreakVis:function(streak, challengeTries, numLevelsBeat)
	{
		this.streak = streak;
		this.challengeTries = challengeTries;
		this.numLevelsBeat = numLevelsBeat;
		if(this.streakFace != null)
		{
			this.removeChild(this.streakFace);
			this.removeChild(this.triesLabel);
		}
		this.streakFace = this.streakFace = new cc.Sprite(res.sad_emoji);
		
		var triesText = "";
		
		if(streak == 1)
		{
			
			if(challengeTries == 0)
			{
				triesText = "1 try";
				this.streakFace = new cc.Sprite(res.concerned_face);
			}
			else if(challengeTries == 1)
			{
				triesText = "You Lost";
				this.streakFace = new cc.Sprite(res.sad_emoji);
			}
		}
		else if(streak == 2)
		{
			
			if(challengeTries == 0)
			{
				triesText = "2/2 tries";
				this.streakFace = new cc.Sprite(res.sunglass_face);
			}
			else if(challengeTries == 1)
			{
				triesText = "1/2 tries";
				this.streakFace = new cc.Sprite(res.concerned_sunglass_face);
			}
			else if(challengeTries == 2)
			{
				triesText = "You Lost";
				this.streakFace = new cc.Sprite(res.sad_emoji);
			}
			
		}
		else if(streak == 3)
		{
			
			if(challengeTries == 0)
			{
				triesText = "3/3 tries";
				this.streakFace = new cc.Sprite(res.crown_face);
			}
			else if(challengeTries == 1)
			{
				triesText = "2/3 tries";
				this.streakFace = new cc.Sprite(res.content_crown_face);
			}
			else if(challengeTries == 2)
			{
				triesText = "1/3";
				this.streakFace = new cc.Sprite(res.concerned_crown_face);
			}
			else if(challengeTries == 3)
			{
				triesText = "You Lost";
				this.streakFace = new cc.Sprite(res.sad_emoji);
			}
		}
		else
		{
			this.streakFace = new cc.Sprite(res.sad_emoji);
			triesText = "Out of tries.";
		}
		cc.log(streak);
		this.streakFace.setScale(this.width*.35 / this.streakFace.height);
		this.streakFace.attr({
			x:this.width*.75,
			y:this.nextPhone.y-(this.nextPhone.height*this.nextPhone.scaleY/2),
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.streakFace);
		
		this.triesLabel = new cc.LabelTTF(triesText,"HeaderFont",Math.floor( (this.streakFace.height*this.streakFace.scale)*.3 ))
		this.triesLabel.color = cc.color(0,0,0,255);
		this.triesLabel.attr({
			x:this.streakFace.x,
			y:this.streakFace.y-(this.streakFace.height*this.streakFace.scaleY/2)-3,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.triesLabel);
		
		/*
		if(this.playButton != null)
		{
			this.removeChild(this.playButton);
			this.removeChild(this.levelLabel);
		}
		if(this.countdownLabel != null)
		{
			this.removeChild(this.countdownLabel);
			this.countdownLabel = null;
		}
		
		if(this.resetTime > (new Date()).getTime())
		{
			
		}
		else
		{
		this.playButton = new cc.Sprite(res.play_bg);
		this.playButton.setScale(this.height * .25 / this.playButton.height);
		this.playButton.attr({
			x:this.width/2,
			y:5,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.playButton);
		
		this.levelLabel = new cc.LabelTTF("Level "+(this.numLevelsBeat+1),"HeaderFont",Math.floor(this.height*.13));
		this.levelLabel.color = cc.color(255,255,255,255);
		this.levelLabel.attr({
			x:this.width/2,
			y:this.playButton.y+(this.playButton.height*this.playButton.scale*.9)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.levelLabel);
		}
		*/
		if(this.levelLabel != null)
			this.levelLabel.setString("Level "+(this.numLevelsBeat+1));
	},
	/*
	startTimer:function(millis)
	{cc.log(millis);
		if(this.playButton != null)
		{
			this.removeChild(this.playButton);
			this.playButton = null;
			this.removeChild(this.levelLabel);
			this.levelLabel = null;
		}
		
		var secs = Math.floor(millis/1000);
		var mins = Math.floor(secs/60);
		secs -= mins*secs;
		var secsString = ""+secs;
		if(secs < 10)
			secsString = "0"+secs;
		
		this.timerLabel = new cc.LabelTTF(""+mins+":"+secsString, "HeaderFont",Math.floor(this.height*.15));
		this.timerLabel.color = cc.color(0,0,0,255);
		this.timerLabel.attr({
			x:this.width/2,
			y:this.height*.175,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.timerLabel);
	},*/
	
	updatePostWin:function()
	{
		this.updateStreakVis(this.parent.parent.parent.streak, this.parent.parent.parent.challengeTries, this.parent.parent.parent.numLevelsBeat)
	},
	
	delayLevel:function(millis)
	{
		if(this.countdownLabel != null)
		{
			this.removeChild(this.countdownLabel);
			this.countdownLabel = null;
		}
		if(this.playButton != null)
		{
			this.removeChild(this.playButton);
			this.playButton = null;
			
		}
		if(this.levelLabel != null)
		{
			this.removeChild(this.levelLabel);
			this.levelLabel = null;
		}		
		
			this.secsToReset = Math.floor(millis / 1000);
			this.minsToReset = Math.floor(this.secsToReset / 60);
			this.secsToReset -= this.minsToReset*60;
			
			var minsString = ""+this.minsToReset;
			var secsString = ""+this.secsToReset;
			if(this.secsToReset < 10)
				secsString = "0"+this.secsToReset;
			
			this.clockLabel = new cc.LabelTTF("New level in " + minsString+":"+secsString, "HeaderFont", Math.floor(this.height*.09));
			this.clockLabel.color = cc.color(0,0,0,255);
			this.clockLabel.attr({
				x:this.width/2,
				y:this.height*.2,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.clockLabel);
			
			 this.timerIntervalID = setInterval(
		     (function(self) {         //Self-executing func which takes 'this' as self
		         return function() {   //Return a function in the context of 'self'
		             self.countDown(); //Thing you wanted to run as non-window 'this'
		        		
		         }
		     })(this),
		     1000     //normal interval, 'this' scope not impacted here.
		 ); 
		
	},
	
	countDown:function()
	{
		this.secsToReset--;
		if(this.secsToReset == -1)
		{
			this.minsToReset--;
			if(this.minsToReset == -1)
			{
				this.levelRespawnReady();
			}
			else
			{
				this.secsToReset = 59;
			}
		}
		var minsString = ""+this.minsToReset;
		var secsString = ""+this.secsToReset;
		if(this.secsToReset < 10)
			secsString = "0"+this.secsToReset;
		this.clockLabel.setString("New level in " + minsString+":"+secsString);
	},
	
	levelRespawnReady:function()
	{
		this.removeChild(this.clockLabel);
		this.clockLabel = null;
		
		clearInterval(this.timerIntervalID);
		
		this.playButton = new cc.Sprite(res.play_bg);
		this.playButton.setScale(this.height * .25 / this.playButton.height);
		this.playButton.attr({
			x:this.width/2,
			y:5,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.playButton);
		
		this.levelLabel = new cc.LabelTTF("Level "+(this.numLevelsBeat+1),"HeaderFont",Math.floor(this.height*.13));
		this.levelLabel.color = cc.color(255,255,255,255);
		this.levelLabel.attr({
			x:this.width/2,
			y:this.playButton.y+(this.playButton.height*this.playButton.scale*.9)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.levelLabel);
		
		this.parent.parent.parent.ensureReadyForRespawnedLevel();
		
	},
	
	revertBackToReady:function()
	{
		if(this.clockLabel != null)
		{
			this.removeChild(this.clockLabel);
			this.clockLabel = null;
		}
		if(this.countdownLabel != null)
		{
			this.removeChild(this.countdownLabel);
			this.countdownLabel = null;
		}
		this.playButton = new cc.Sprite(res.play_bg);
		this.playButton.setScale(this.height * .25 / this.playButton.height);
		this.playButton.attr({
			x:this.width/2,
			y:5,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.playButton);
		
		this.levelLabel = new cc.LabelTTF("Level "+(this.numLevelsBeat+1),"HeaderFont",Math.floor(this.height*.13));
		this.levelLabel.color = cc.color(255,255,255,255);
		this.levelLabel.attr({
			x:this.width/2,
			y:this.playButton.y+(this.playButton.height*this.playButton.scale*.9)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.levelLabel);
	},
	
	bumpStars:function()
	{
		this.numStars++;
		this.numStarsTilUpgrade = Math.max(this.numStarsTilUpgrade-1, 0);
		this.prog = (this.starsForUpgrade-this.numStarsTilUpgrade) / this.starsForUpgrade;
		this.drawProgBar();
	},
	
	onTouchEnded:function(pos)
	{
		if(pos.x > this.playButton.x-(this.playButton.width*this.playButton.scaleX/2) && pos.x < this.playButton.x+(this.playButton.width*this.playButton.scaleX/2) &&
		pos.y > this.playButton.y && pos.y < this.playButton.y+(this.playButton.height*this.playButton.scaleY)
		)
		{cc.log("open feat");
			this.parent.parent.parent.showFeature();
			//this.parent.parent.playLevel("featured");
			
		}
	},
	
	initMoveCount:function(numMoves)
	{
		if(this.playButton != null)
		{
			this.removeChild(this.playButton);
			this.playButton = null;
			this.removeChild(this.levelLabel);
			this.levelLabel = null;
			
			this.countdownLabel = new cc.LabelTTF(numMoves+" moves", "HeaderFont", Math.floor(this.height*.17));
			this.countdownLabel.color = cc.color(0,0,0,255);
			this.countdownLabel.attr({
				x:this.width/2,
				y:this.height*.2,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.countdownLabel);
		}
		
	},
	
	initNextObstacle:function()
	{
		var numStars = this.parent.parent.parent.numStars;
		this.removeChild(this.nextEmojiImg);
		
		var neededStars = 0;
		var starStep = 0;
		if(numStars < 3)
		{
			this.nextEmojiImg = new cc.Sprite(res.bomb_emoji);
			neededStars = 3;
			starStep = 2;
		}
		else if(numStars < 6)
		{
			this.nextEmojiImg = new cc.Sprite(res.red_die_emoji);
			neededStars = 6;
			starStep = 3;
		}
		else if(numStars < 11)
		{
			this.nextEmojiImg = new cc.Sprite(res.bubble_wrap_emoji);
			neededStars = 11;
			starStep = 5;
		}
		else if(numStars < 21)
		{
			this.nextEmojiImg = new cc.Sprite(res.horiz_rocket_emoji);
			neededStars = 21;
			starStep = 10;
		}
		else if(numStars < 31)
		{
			this.nextEmojiImg = new cc.Sprite(res.cloud_emoji);
			neededStars = 31;
			starStep = 10;
		}
		else if(numStars < 46)
		{
			this.nextEmojiImg = new cc.Sprite(res.neutral_orb_emoji);
			neededStars = 46;
			starStep = 15;
		}
		else this.nextEmojiImg = new cc.Sprite(res.red_x);
		
		this.nextEmojiImg.setScale((this.nextPhone.width*this.nextPhone.scaleX)*.7 / this.nextEmojiImg.width );
		this.nextEmojiImg.attr({
			x:this.nextPhone.x+(this.nextPhone.width*this.nextPhone.scaleX/2),
			y:this.nextPhone.y-(this.nextPhone.height*this.nextPhone.scaleY/2),
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.nextEmojiImg);
		
		this.topBarLabel.setString((neededStars - numStars));
		
		/*var heightOfImg = (this.height - (this.levelLabel.y+7));
		var scaleOfImg = this.width / 2 / 500;
		
		this.removeChild(this.starGoalImg);
		this.starGoalImg = new cc.Sprite(res.yellow_star_emoji);
		this.starGoalImg.setScale(Math.floor(heightOfImg*.1) / this.starGoalImg.height );
		this.starGoalImg.attr({
			x:this.topBarLabel.x+(this.topBarLabel.width/2)+2,
			y:this.topBarLabel.y-(Math.floor(heightOfImg*.1)/2),
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.starGoalImg);*/
		
		/*var barStartX = this.nextPhone.x+(this.nextPhone.width*this.nextPhone.scaleX) + 10;
		var barStartY = this.nextPhone.y-(this.nextPhone.height*this.nextPhone.scaleY*.86);
		var barTopY = barStartY+(this.nextPhone.height*this.nextPhone.scale*.7);
		this.barDn.clear();
		this.barDn.drawRect(
			cc.p(barStartX, barStartY),
			cc.p(barStartX+(this.width*.05), barTopY),
			cc.color(255,255,255,255),
			3,cc.color(0,0,0,255)
		);*/
		this.prog = (starStep-(neededStars-numStars) )/ starStep;cc.log(this.prog);
		this.drawProgBar();
		
	},
	
	
	updateMoveCount:function(numMoves)
	{cc.log(numMoves);cc.log(this.parent.parent.parent.playType);
		if(this.parent.parent.parent.playType == "feature")
		{
			this.countdownLabel.setString(numMoves+" moves");
		}
	},
	
	drawProgBar:function()
	{
		var barStartX = this.nextPhone.x+(this.nextPhone.width*this.nextPhone.scaleX) + 10;
		var barStartY = this.nextPhone.y-(this.nextPhone.height*this.nextPhone.scaleY*.86);
		var barTopY = (this.nextPhone.height*this.nextPhone.scale*.7);
		this.barDn.drawRect(
			cc.p(barStartX, barStartY),
			cc.p(barStartX+(this.width*.05), barStartY+barTopY),
			cc.color(255,255,255,255),
			3,cc.color(0,0,0,255)
		);
		this.barDn.drawRect(
			cc.p(barStartX, barStartY),
			cc.p(barStartX+(this.width*.05), barStartY+barTopY*this.prog),
			cc.color(0,255,0,255),
			0,cc.color(0,0,0,255)
		);
	}
	
});