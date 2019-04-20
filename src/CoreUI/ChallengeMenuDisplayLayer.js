var ChallengeMenuDisplayLayer = cc.Layer.extend({
	ctor:function(height, yMin){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		this.width = size.width;
		this.yMin = yMin;
		
		
		this.bgDn = new cc.DrawNode();
		this.bgDn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.bgDn);
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.dailyChallengePopup = null;
		
		DATA.refreshTimeUntilNextChallenge();
		
		
		
		this.tabTitleLabel = new cc.LabelTTF("Daily Spin", "Arial", 32);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height-3,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		
		
		//this.chestAImage = new cc.Sprite(res.card_back);
		this.slotLayer = new SlotLayer(this.width, this.height*.42, "daily");
		this.slotLayer.attr({
			x:this.width/2 - (this.slotLayer.slotImage.width*this.slotLayer.slotImage.scale)/2,
			y:this.tabTitleLabel.y-this.tabTitleLabel.height-2 - (this.slotLayer.slotImage.height*this.slotLayer.slotImage.scale),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.slotLayer);
		
		
		this.maskDn = new cc.DrawNode();
		this.maskDn.drawRect(cc.p(this.slotLayer.x, this.slotLayer.y),
						cc.p(this.slotLayer.x+this.slotLayer.slotImage.width*this.slotLayer.slotImage.scale, this.slotLayer.y-(this.slotLayer.emojiWidthFactor*this.slotLayer.slotWidth)/2)-3,
						cc.color(255,0,0,255),0,cc.color(255,255,255,255)
		);
		this.maskDn.drawRect(cc.p(this.slotLayer.x, this.slotLayer.y+this.slotLayer.height),
						cc.p(this.slotLayer.x+this.slotLayer.slotImage.width*this.slotLayer.slotImage.scale, this.slotLayer.y+this.slotLayer.height+(this.slotLayer.emojiWidthFactor*this.slotLayer.slotWidth)/2)+3,
						cc.color(255,0,0,255),0,cc.color(255,255,255,255)
		);
		this.addChild(this.maskDn);
		
	
		
		var chestBorder = 5;
		var chestWidth = (size.width-chestBorder*4)/3;
		var chestHeight = chestWidth*1.3;
		
		
		
		cc.log(((new Date()).getTime() - DATA.timeLastChestOpened) - (24*60*60*1000));
		if((new Date()).getTime() - DATA.timeLastChestOpened >= (24*60*60*1000))
		{	
			/*this.chestAButton = new cc.Sprite(res.get_button);
			this.chestAButton.setScale( (this.chestAImage.y-(this.chestAImage.height*this.chestAImage.scale)-10-this.chestASquare.y) / this.chestAButton.height);
			this.chestAButton.attr({
				x:this.chestAImage.x,
				y:this.chestASquare.y+5,
				anchorX:.5,
				anchorY:0
			});
			this.addChild(this.chestAButton);
			this.chestASquare.color = cc.color(255,255,0,255);*/
		}
		else
		{
			/*this.chestALabel = new cc.LabelTTF("Daily Spin", "Arial", 20);
			this.chestALabel.attr({
				"x":this.chestAImage.x,
				"y":this.chestAImage.y-(this.chestAImage.height*this.chestAImage.scale) - 10,
				"anchorX":.5,
				"anchorY":1
			});
			this.chestALabel.color = cc.color(0,0,0,255);
			this.addChild(this.chestALabel);*/
			
			var timeTilChestSpawn = DATA.timeLastChestOpened+(1000*60*60*24);
			var timeElapsed = timeTilChestSpawn - (new Date()).getTime();
			var hours = Math.floor(timeElapsed / (1000*60*60));
			var minutes = Math.floor((timeElapsed - hours*60*60*1000)/(1000*60));
			var minutesStr = ""+minutes;
			if(minutes <= 9)
				minutesStr = "0"+minutes;
   			var seconds = Math.floor((timeElapsed - (hours*60*60*1000) - (minutes*60*1000))/(1000));
   			var secondsStr = ""+seconds;
	   		if(seconds <= 9)
	   			secondsStr = "0"+seconds
	   		
	   		/*
			this.chestATimer = new cc.LabelTTF(""+hours+":"+minutesStr+":"+secondsStr, "Roboto", 35);
			this.chestATimer.attr({
				"x":this.chestAImage.x,
				"y":this.chestASquare.y+5,
				"anchorX":.5,
				"anchorY":0
			});
			this.chestATimer.color = cc.color(255,255,255,255);
			this.addChild(this.chestATimer);
			
			this.schedule(this.updateChestTimers, 1);
			*/
		}
		/*
		var chestCImage = new cc.Sprite(res.regular_gold_chest);
		chestCImage.setScale(this.chestCSquare.width*.7 / chestCImage.width);
		chestCImage.attr({
			x:this.width/2,
			y:,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(chestCImage);
		
		this.chestCLabel = new cc.LabelTTF(""+DATA.questChestProgress+"/"+DATA.questChestNumber+" Quests", "Arial", 20);
		this.chestCLabel.attr({
			"x":chestCImage.x,
			"y":chestCImage.y-(chestCImage.height*chestCImage.scale) - 10,
			"anchorX":.5,
			"anchorY":1
		});
		this.chestCLabel.color = cc.color(255,255,255,255);
		this.addChild(this.chestCLabel);
		
		this.chestCProgBar = new ProgressBar(this.chestCSquare.x + this.chestCSquare.width/2 - (chestCImage.width*chestCImage.scale)/2, this.chestCSquare.y + 10, chestCImage.width*chestCImage.scale, 20);
		this.chestCProgBar.attr({
			x:this.chestCSquare.x + this.chestCSquare.width/2 - (chestCImage.width*chestCImage.scale)/2,
			y:this.chestCSquare.y + 10,
			anchorX:0,anchorY:0
		});
		this.addChild(this.chestCProgBar);
		this.chestCProgBar.setProg(DATA.questChestProgress / DATA.questChestNumber);
		*/
		
		
		this.dailyChallengeLabel = new cc.LabelTTF("Quests", "Arial", 25);
		this.dailyChallengeLabel.attr({
			"x":5,
			"y":this.slotLayer.y-15,
			"anchorX":0,
			"anchorY":1
		});
		this.dailyChallengeLabel.color = cc.color(0,0,0,255);
		this.addChild(this.dailyChallengeLabel);
		
		var challengeBorder = 5;
		var challengeWidth = size.width-10;
		var challengeHeight = (this.dailyChallengeLabel.y-this.dailyChallengeLabel.height - 10 - challengeBorder*4)/3;
		this.challengeARect = {
			x: 5,
			y: this.dailyChallengeLabel.y-this.dailyChallengeLabel.height - 5 - challengeHeight,
			width: challengeWidth,
			height: challengeHeight
		};
		this.challengeBRect = {
			x: 5,
			y: this.dailyChallengeLabel.y-this.dailyChallengeLabel.height - 5*2 - challengeHeight*2,
			width: challengeWidth,
			height: challengeHeight
		};
		this.challengeCRect = {
			x: 5,
			y: this.dailyChallengeLabel.y-this.dailyChallengeLabel.height - 5*3 - challengeHeight*3,
			width: challengeWidth,
			height: challengeHeight
		};
		
		
		this.collectRewardAButton = null;
		this.collectRewardBButton = null;
		this.collectRewardCButton = null;
		
		this.challengeARemText = null;
		this.challengeBRemText = null;
		this.challengeCRemText = null;
		
		if(DATA.dailyChallenges.length >= 1)
		{
			var challenge = DATA.dailyChallenges[0];
			
			if(challenge.progress!=challenge.number)
			{
				var challengeAText = new cc.LabelTTF(DATA.getChallengeText(challenge), "Arial", 24);
				challengeAText.attr({
					"x":this.challengeARect.x+2,
					"y":this.challengeARect.y + this.challengeARect.height-2,
					"anchorX":0,
					"anchorY":1
				});
				challengeAText.color = cc.color(0,0,0,255);
				this.addChild(challengeAText);
				
				var challengeARemText = new cc.LabelTTF(""+(challenge.number-challenge.progress)+" left","Arial", 20);
				challengeARemText.attr({
					x:this.challengeARect.x+2,
					y:this.challengeARect.y + 2,
					anchorX:0,
					anchorY:0
				});
				challengeARemText.color = cc.color(0,0,0,255);
				this.addChild(challengeARemText);
			}
			else
			{
				this.collectRewardAButton = new cc.Sprite(res.get_button);
				this.collectRewardAButton.setScale(challengeHeight*.8 / this.collectRewardAButton.height);
				this.collectRewardAButton.attr({
					x:cc.winSize.width/2,
					y:this.challengeARect.y+this.challengeARect.height/2,
					anchorX:.5,
					anchorY:.5
				});
				this.addChild(this.collectRewardAButton);
			}
			
			
			 
			var challengeABallsImage = new cc.Sprite(res.smile_emoji);
			challengeABallsImage.setScale((this.challengeARect.height-6)/2 / challengeABallsImage.height);
			challengeABallsImage.attr({
				x:this.challengeARect.x+this.challengeARect.width - 2 - (challengeABallsImage.width*challengeABallsImage.scale),
				y:this.challengeARect.y+this.challengeARect.height - 2 - (challengeABallsImage.height*challengeABallsImage.scale),
				anchorX:0,
				anchorY:0
			});
			this.addChild(challengeABallsImage);
			
			var challengeABallsLabel = new cc.LabelTTF("+"+challenge.balls, "Arial", 20);
			challengeABallsLabel.attr({
				"x":challengeABallsImage.x-2,
				"y":challengeABallsImage.y+(challengeABallsImage.height*challengeABallsImage.scale)/2,
				"anchorX":1,
				"anchorY":.5
			});
			challengeABallsLabel.color = cc.color(0,0,0,255);
			this.addChild(challengeABallsLabel);
			
			var challengeABonusImage = new cc.Sprite(res.coin);
			challengeABonusImage.setScale((this.challengeARect.height-6)/2 / challengeABonusImage.height);
			challengeABonusImage.attr({
				x:this.challengeARect.x+this.challengeARect.width - 2 - (challengeABonusImage.width*challengeABonusImage.scale),
				y:this.challengeARect.y+ 2 ,
				anchorX:0,
				anchorY:0
			});
			this.addChild(challengeABonusImage);
			
			var challengeABonusLabel = new cc.LabelTTF("+"+challenge.coins,"Arial", 20);
			challengeABonusLabel.attr({
				x:challengeABallsLabel.x,
				y:challengeABonusImage.y+(challengeABonusImage.height*challengeABonusImage.scale)/2,
				anchorX:1,
				anchorY:.5
			});
			challengeABonusLabel.color = cc.color(0,0,0,255);
			this.addChild(challengeABonusLabel);
			
			/*this.challengeAProgBar = new ProgressBar(challengeARemText.x + challengeARemText.width + 5, challengeARemText.y+2, (challengeABonusLabel.x-challengeABonusLabel.width)-10 - (challengeARemText.x+challengeARemText.width), 20);
			this.challengeAProgBar.attr({
				x:challengeARemText.x + challengeARemText.width + 5,
				y:challengeARemText.y+2,
				anchorX:0,anchorY:0
			});
			this.addChild(this.challengeAProgBar);
			this.challengeAProgBar.setProg(DATA.dailyChallenges[0].progress/DATA.dailyChallenges[0].number);*/
		}
		else
		{
			var timeRem = DATA.timeUntilNextChallenge;
			var minText = timeRem.minutes;
			if(timeRem.minutes < 10)
				minText = "0"+timeRem.minutes;
			var secText = timeRem.seconds;
			if(timeRem.seconds < 10)
				secText = "0"+timeRem.seconds;
			this.challengeARemText = new cc.LabelTTF("[ Come back in "+timeRem.hours+":"+minText+":"+secText+" ]","Arial", 20);
			this.challengeARemText.attr({
				x:this.challengeARect.x+this.challengeARect.width/2,
				y:this.challengeARect.y+this.challengeARect.height/2,
				anchorX:.5,
				anchorY:.5
			});
			this.challengeARemText.color = cc.color(0,0,0,255);
			this.addChild(this.challengeARemText);
			
		}
		
		
		
		if(DATA.dailyChallenges.length >= 2)
		{
			var challenge = DATA.dailyChallenges[1];
			
			if(challenge.progress!=challenge.number)
			{
				var challengeBText = new cc.LabelTTF(DATA.getChallengeText(challenge), "Arial", 24);
				challengeBText.attr({
					"x":this.challengeBRect.x+2,
					"y":this.challengeBRect.y + this.challengeBRect.height-2,
					"anchorX":0,
					"anchorY":1
				});
				challengeBText.color = cc.color(0,0,0,255);
				this.addChild(challengeBText);
				
				var challengeBRemText = new cc.LabelTTF(""+(challenge.number-challenge.progress)+" left","Arial", 20);
				challengeBRemText.attr({
					x:this.challengeBRect.x+2,
					y:this.challengeBRect.y + 2,
					anchorX:0,
					anchorY:0
				});
				challengeBRemText.color = cc.color(0,0,0,255);
				this.addChild(challengeBRemText);
			}
			else
			{
				this.collectRewardBButton = new cc.Sprite(res.get_button);
				this.collectRewardBButton.setScale(challengeHeight*.8 / this.collectRewardBButton.height);
				this.collectRewardBButton.attr({
					x:cc.winSize.width/2,
					y:this.challengeBRect.y+this.challengeBRect.height/2,
					anchorX:.5,
					anchorY:.5
				});
				this.addChild(this.collectRewardBButton);
			}
			 
			var challengeBBallsImage = new cc.Sprite(res.smile_emoji);
			challengeBBallsImage.setScale((this.challengeBRect.height-6)/2 / challengeBBallsImage.height);
			challengeBBallsImage.attr({
				x:this.challengeBRect.x+this.challengeBRect.width - 2 - (challengeBBallsImage.width*challengeBBallsImage.scale),
				y:this.challengeBRect.y+this.challengeBRect.height - 2 - (challengeBBallsImage.height*challengeBBallsImage.scale),
				anchorX:0,
				anchorY:0
			});
			this.addChild(challengeBBallsImage);
			
			var challengeBBallsLabel = new cc.LabelTTF("+"+challenge.balls, "Arial", 20);
			challengeBBallsLabel.attr({
				"x":challengeBBallsImage.x-2,
				"y":challengeBBallsImage.y+(challengeBBallsImage.height*challengeBBallsImage.scale)/2,
				"anchorX":1,
				"anchorY":.5
			});
			challengeBBallsLabel.color = cc.color(0,0,0,255);
			this.addChild(challengeBBallsLabel);
			
			var challengeBBonusImage = new cc.Sprite(res.coin);
			challengeBBonusImage.setScale((this.challengeBRect.height-6)/2 / challengeBBonusImage.height);
			challengeBBonusImage.attr({
				x:this.challengeBRect.x+this.challengeBRect.width - 2 - (challengeBBonusImage.width*challengeBBonusImage.scale),
				y:this.challengeBRect.y+ 2 ,
				anchorX:0,
				anchorY:0
			});
			this.addChild(challengeBBonusImage);
			
			var challengeBBonusLabel = new cc.LabelTTF("+"+challenge.coins,"Arial", 20);
			challengeBBonusLabel.attr({
				x:challengeBBallsLabel.x,
				y:challengeBBonusImage.y+(challengeBBonusImage.height*challengeBBonusImage.scale)/2,
				anchorX:1,
				anchorY:.5
			});
			challengeBBonusLabel.color = cc.color(0,0,0,255);
			this.addChild(challengeBBonusLabel);
			
			/*this.challengeBProgBar = new ProgressBar(challengeBRemText.x + challengeBRemText.width + 5, challengeBRemText.y+2, (challengeBBonusLabel.x-challengeBBonusLabel.width)-10 - (challengeBRemText.x+challengeBRemText.width), 20);
			this.challengeBProgBar.attr({
				x:challengeBRemText.x + challengeBRemText.width + 5,
				y:challengeBRemText.y+2,
				anchorX:0,anchorY:0
			});
			this.addChild(this.challengeBProgBar);
			this.challengeBProgBar.setProg(DATA.dailyChallenges[1].progress/DATA.dailyChallenges[1].number);*/
		}
		else
		{
			var timeRem = DATA.timeUntilNextChallenge;
			var minText = timeRem.minutes;
			if(timeRem.minutes < 10)
				minText = "0"+timeRem.minutes;
			var secText = timeRem.seconds;
			if(timeRem.seconds < 10)
				secText = "0"+timeRem.seconds;
			this.challengeBRemText = new cc.LabelTTF("[ Come back in "+timeRem.hours+":"+minText+":"+secText+" ]","Arial", 20);
			this.challengeBRemText.attr({
				x:this.challengeBRect.x+this.challengeBRect.width/2,
				y:this.challengeBRect.y+this.challengeBRect.height/2,
				anchorX:.5,
				anchorY:.5
			});
			this.challengeBRemText.color = cc.color(0,0,0,255);
			this.addChild(this.challengeBRemText);
		}
		
		
		if(DATA.dailyChallenges.length >= 3)
		{
			var challenge = DATA.dailyChallenges[2];
			if(challenge.progress!=challenge.number)
			{
				var challengeCText = new cc.LabelTTF(DATA.getChallengeText(challenge), "Arial", 24);
				challengeCText.attr({
					"x":this.challengeCRect.x+2,
					"y":this.challengeCRect.y + this.challengeCRect.height-2,
					"anchorX":0,
					"anchorY":1
				});
				challengeCText.color = cc.color(0,0,0,255);
				this.addChild(challengeCText);
				
				var challengeCRemText = new cc.LabelTTF(""+(challenge.num-challenge.progress)+" left","Arial", 20);
				challengeCRemText.attr({
					x:this.challengeCRect.x+2,
					y:this.challengeCRect.y + 2,
					anchorX:0,
					anchorY:0
				});
				challengeCRemText.color = cc.color(0,0,0,255);
				this.addChild(challengeCRemText);
			}
			else
			{
				this.collectRewardCButton = new cc.Sprite(res.get_button);
				this.collectRewardCButton.setScale(challengeHeight*.8 / this.collectRewardCButton.height);
				this.collectRewardCButton.attr({
					x:cc.winSize.width/2,
					y:this.challengeCRect.y+this.challengeCRect.height/2,
					anchorX:.5,
					anchorY:.5
				});
				this.addChild(this.collectRewardCButton);
			}	
			 
			var challengeCBallsImage = new cc.Sprite(res.smile_emoji);
			challengeCBallsImage.setScale((this.challengeCRect.height-6)/2 / challengeCBallsImage.height);
			challengeCBallsImage.attr({
				x:this.challengeCRect.x+this.challengeCRect.width - 2 - (challengeCBallsImage.width*challengeCBallsImage.scale),
				y:this.challengeCRect.y+this.challengeCRect.height - 2 - (challengeCBallsImage.height*challengeCBallsImage.scale),
				anchorX:0,
				anchorY:0
			});
			this.addChild(challengeCBallsImage);
			
			var challengeCBallsLabel = new cc.LabelTTF("+"+challenge.balls, "Arial", 20);
			challengeCBallsLabel.attr({
				"x":challengeCBallsImage.x-2,
				"y":challengeCBallsImage.y+(challengeCBallsImage.height*challengeCBallsImage.scale)/2,
				"anchorX":1,
				"anchorY":.5
			});
			challengeCBallsLabel.color = cc.color(0,0,0,255);
			this.addChild(challengeCBallsLabel);
			
			var challengeCBonusImage = new cc.Sprite(res.coin);
			challengeCBonusImage.setScale((this.challengeCRect.height-6)/2 / challengeCBonusImage.height);
			challengeCBonusImage.attr({
				x:this.challengeCRect.x+this.challengeCRect.width - 2 - (challengeCBonusImage.width*challengeCBonusImage.scale),
				y:this.challengeCRect.y+ 2 ,
				anchorX:0,
				anchorY:0
			});
			this.addChild(challengeCBonusImage);
			
			var challengeCBonusLabel = new cc.LabelTTF("+"+challenge.coins,"Arial", 20);
			challengeCBonusLabel.attr({
				x:challengeCBallsLabel.x,
				y:challengeCBonusImage.y+(challengeCBonusImage.height*challengeCBonusImage.scale)/2,
				anchorX:1,
				anchorY:.5
			});
			challengeCBonusLabel.color = cc.color(0,0,0,255);
			this.addChild(challengeCBonusLabel);
			
			/*this.challengeCProgBar = new ProgressBar(challengeCRemText.x + challengeCRemText.width + 5, challengeCRemText.y+2, (challengeCBonusLabel.x-challengeCBonusLabel.width)-10 - (challengeCRemText.x+challengeCRemText.width), 20);
			this.challengeCProgBar.attr({
				x:challengeCRemText.x + challengeCRemText.width + 5,
				y:challengeCRemText.y+2,
				anchorX:0,anchorY:0
			});
			this.addChild(this.challengeCProgBar);
			this.challengeCProgBar.setProg(DATA.dailyChallenges[2].progress/DATA.dailyChallenges[2].number);*/
		}
		else
		{
			var timeRem = DATA.timeUntilNextChallenge;
			var minText = timeRem.minutes;
			if(timeRem.minutes < 10)
				minText = "0"+timeRem.minutes;
			var secText = timeRem.seconds;
			if(timeRem.seconds < 10)
				secText = "0"+timeRem.seconds;
			this.challengeCRemText = new cc.LabelTTF("[ Come back in "+timeRem.hours+":"+minText+":"+secText+" ]","Arial", 20);
			this.challengeCRemText.attr({
				x:this.challengeCRect.x+this.challengeCRect.width/2,
				y:this.challengeCRect.y+this.challengeCRect.height/2,
				anchorX:.5,
				anchorY:.5
			});
			this.challengeCRemText.color = cc.color(0,0,0,255);
			this.addChild(this.challengeCRemText);
		}



		/*var starBorder = 10;
		var starHeight = this.challengeCRect.y - this.yMin - starBorder*2;
		var starWidth = starHeight;
		this.starASquare = {
			x: size.width/2 - starWidth/2,
			y: this.challengeCRect.y - starBorder - starHeight,
			width: starWidth,
			height: starHeight
		};
		
		var starImage = new cc.Sprite(res.star_emoji);
		starImage.setScale(starWidth*.7 / starImage.width);
		starImage.attr({
			x: this.starASquare.x + starWidth*.15,
			y: this.starASquare.y+this.starASquare.height - starWidth*.1,
			anchorX: 0,
			anchorY: 1
		})
		this.addChild(starImage);*/
		
		this.schedule(this.updateChallengeTimers, 1);
			
		this.draw();	

	},
	
	updateChestTimers:function()
	{
		var timeRem = DATA.timeUntilNextDailyChest;
		timeRem.seconds--;
		if(timeRem.seconds < 0)
		{
			timeRem.minutes--;
			timeRem.seconds = 59;
		}
		if(timeRem.minutes < 0)
		{
			timeRem.hours--;
			timeRem.minutes = 59;
		}
		if(timeRem.hours < 0)
		{
			this.chestAButton = new cc.Sprite(res.get_button);
			this.chestAButton.setScale( (this.chestALabel.y-(this.chestALabel.height*this.chestALabel.scale)-10-this.chestASquare.y) / this.chestAButton.height);
			this.chestAButton.attr({
				x:this.chestAImage.x,
				y:this.chestASquare.y+5,
				anchorX:.5,
				anchorY:0
			});
			this.removeChild(this.chestATimer);
			this.chestATimer = null;
			this.addChild(this.chestAButton);
			this.chestASquare.color = cc.color(255,255,0,255);
			DATA.dailyChestAvailable = true;
			DATA.database.ref("users/"+DATA.userID+"/dailyChestAvailable").set(DATA.dailyChestAvailable);
		}
		else
		{
			var minText = timeRem.minutes;
			if(timeRem.minutes < 10)
				minText = "0"+timeRem.minutes;
			var secText = timeRem.seconds;
			if(timeRem.seconds < 10)
				secText = "0"+timeRem.seconds;
				
			if(this.chestATimer != null)
			{
				this.chestATimer.setString(""+timeRem.hours+":"+minText+":"+secText);
			}
		}
	},
	updateChallengeTimers:function()
	{
		var timeRem = DATA.timeUntilNextChallenge;
		timeRem.seconds--;
		if(timeRem.seconds < 0)
		{
			timeRem.minutes--;
			timeRem.seconds = 59;
		}
		if(timeRem.minutes < 0)
		{
			timeRem.hours--;
			timeRem.minutes = 59;
		}
		if(timeRem.hours < 0)
		{
			//DATA.spawnNewDailyChallenge();
			DATA.refreshTimeUntilNextChallenge();
		}
		
		var minText = timeRem.minutes;
		if(timeRem.minutes < 10)
			minText = "0"+timeRem.minutes;
		var secText = timeRem.seconds;
		if(timeRem.seconds < 10)
			secText = "0"+timeRem.seconds;
		
		if(this.challengeARemText != null)
		{
			this.challengeARemText.setString("[ Come back in "+timeRem.hours+":"+minText+":"+secText+" ]");
		}
		if(this.challengeBRemText != null)
		{
			this.challengeBRemText.setString("[ Come back in "+timeRem.hours+":"+minText+":"+secText+" ]");
		}
		if(this.challengeCRemText != null)
		{
			this.challengeCRemText.setString("[ Come back in "+timeRem.hours+":"+minText+":"+secText+" ]");
		}
		
	},
	
	isPopup:function()
	{
		if(this.dailyChallengePopup == null)
			return false;
		return true;
	},
	
	draw:function()
	{
		/*
		this.dn.drawRect(cc.p(this.slotLayer.x, this.slotLayer.y),
						cc.p(this.slotLayer.x+this.slotLayer.slotImage.width*this.slotLayer.slotImage.scale, this.slotLayer.y-(this.slotLayer.emojiWidthFactor*this.slotLayer.slotWidth)/2)-3,
						cc.color(255,255,0,255),0,cc.color(255,255,255,255)
		);
		this.dn.drawRect(cc.p(this.slotLayer.x, this.slotLayer.y+this.slotLayer.height),
						cc.p(this.slotLayer.x+this.slotLayer.slotImage.width*this.slotLayer.slotImage.scale, this.slotLayer.y+this.slotLayer.height+(this.slotLayer.emojiWidthFactor*this.slotLayer.slotWidth)/2)+3,
						cc.color(255,255,0,255),0,cc.color(255,255,255,255)
		);
		*/
		
		
		this.dn.drawRect(cc.p(this.challengeARect.x, this.challengeARect.y), cc.p(this.challengeARect.x+this.challengeARect.width, this.challengeARect.y+this.challengeARect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.challengeBRect.x, this.challengeBRect.y), cc.p(this.challengeBRect.x+this.challengeBRect.width, this.challengeBRect.y+this.challengeBRect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.challengeCRect.x, this.challengeCRect.y), cc.p(this.challengeCRect.x+this.challengeCRect.width, this.challengeCRect.y+this.challengeCRect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
	
		//this.dn.drawRect(cc.p(this.starASquare.x, this.starASquare.y), cc.p(this.starASquare.x+this.starASquare.width, this.starASquare.y+this.starASquare.height),cc.color(255,255,0,255),2,cc.color(0,0,0,255));
	},
	onTouchBegan:function(pos)
	{
		
	},
	onTouchMoved:function(pos)
	{
		
	},
	
	onTouchEnded:function(pos)
	{cc.log(pos);
		if(!this.isPopup())
		{cc.log(this.chestASquare);
			cc.log(this.challengeARect);
			
			var loc = this.convertToNodeSpace(pos);
			
			if(FUNCTIONS.posWithin(loc, this.slotLayer))
			{cc.log("DAILY TOUCH");cc.log((new Date()).getTime() - DATA.timeLastChestOpened);cc.log(24*60*60*1000);
				if((new Date()).getTime() - DATA.timeLastChestOpened >= (24*60*60*1000))
				{
					//this.dailyChallengePopup = new BonusRewardPickerLayer(cc.winSize.width-50,this.height-50);//new WorldRewardsLayer(cc.winSize.width-50,this.height-50);
					
					
					DATA.setLastTimeDailyChestOpened();
				}
				this.slotLayer.initSpin();
			}
			else if(FUNCTIONS.posWithin(loc, this.challengeARect) && this.collectRewardAButton != null)
			{cc.log("TOP RECT CLICKED");
				//var rankReturn = DATA.checkRankUp(DATA.dailyChallenges[0].xp);
				DATA.setCurrencies(DATA.coins+DATA.dailyChallenges[0].coins, DATA.gems);
				
				this.removeChild(this.collectRewardAButton);
				this.collectRewardAButton = null;
				var challengeARemText = new cc.LabelTTF("[Come back tomorrow!]","Arial", 20);
				challengeARemText.attr({
					x:this.challengeARect.x+this.challengeARect.width/2,
					y:this.challengeARect.y+this.challengeARect.height/2,
					anchorX:.5,
					anchorY:.5
				});
				challengeARemText.color = cc.color(0,0,0,255);
				this.addChild(challengeARemText);
				
				DATA.deleteChallenge(0);
				this.chestCLabel.setString(""+DATA.questChestProgress+"/"+DATA.questChestNumber+" Quests");
				
			}
			else if(FUNCTIONS.posWithin(loc, this.challengeBRect) && this.collectRewardBButton != null)
			{
				//var rankReturn = DATA.checkRankUp(DATA.dailyChallenges[1].xp);
				DATA.setCurrencies(DATA.coins+DATA.dailyChallenges[1].coins, DATA.gems);
				
				this.removeChild(this.collectRewardBButton);
				this.collectRewardBButton = null;
				var challengeBRemText = new cc.LabelTTF("[Come back tomorrow!]","Arial", 20);
				challengeBRemText.attr({
					x:this.challengeBRect.x+this.challengeBRect.width/2,
					y:this.challengeBRect.y+this.challengeBRect.height/2,
					anchorX:.5,
					anchorY:.5
				});
				challengeBRemText.color = cc.color(0,0,0,255);
				this.addChild(challengeBRemText);
				
				DATA.deleteChallenge(1);
			}
			else if(FUNCTIONS.posWithin(loc, this.challengeCRect) && this.collectRewardCButton != null)
			{
				//var rankReturn = DATA.checkRankUp(DATA.dailyChallenges[2].xp);
				DATA.setCurrencies(DATA.coins+DATA.dailyChallenges[2].coins, DATA.gems);
				
				this.removeChild(this.collectRewardCButton);
				this.collectRewardCButton = null;
				var challengeCRemText = new cc.LabelTTF("[Come back tomorrow!]","Arial", 20);
				challengeCRemText.attr({
					x:this.challengeCRect.x+this.challengeCRect.width/2,
					y:this.challengeCRect.y+this.challengeCRect.height/2,
					anchorX:.5,
					anchorY:.5
				});
				challengeCRemText.color = cc.color(0,0,0,255);
				this.addChild(challengeCRemText);
				
				DATA.deleteChallenge(2);
			}
			
		}
		else if(this.dailyChallengePopup != null)
		{cc.log("popup");
			var returnObj = this.dailyChallengePopup.onTouchEnd(pos);
			if(returnObj == "close")
			{cc.log("close");
				this.removeChild(this.dailyChallengePopup);
				this.dailyChallengePopup = null;
			}
		}
	},
	
	deleteDailyChestLayer:function()
	{cc.log("Deleting daily chest layer...");
		this.removeChild(this.dailyChallengePopup);
		this.dailyChallengePopup = null;
		
		
		/*
		var chestAImage = new cc.Sprite(res.card_back);
		chestAImage.setScale(this.chestASquare.width*.7 / chestAImage.width);
		chestAImage.attr({
			x:this.chestASquare.x+this.chestASquare.width/2,
			y:this.chestASquare.y+this.chestASquare.height-15,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(chestAImage);
		
		var chestALabel = new cc.LabelTTF("Daily Gift", "Arial", 20);
		chestALabel.attr({
			"x":chestAImage.x,
			"y":chestAImage.y-(chestAImage.height*chestAImage.scale) - 10,
			"anchorX":.5,
			"anchorY":1
		});
		chestALabel.color = cc.color(0,0,0,255);
		this.addChild(chestALabel);
		*/
		cc.log(((new Date()).getTime() - DATA.timeLastChestOpened) - (24*60*60*1000));
		/*if((new Date()).getTime() - DATA.timeLastChestOpened >= (24*60*60*1000))
		{	
			this.chestAButton = new cc.Sprite(res.get_button);
			this.chestAButton.setScale( (chestALabel.y-(chestALabel.height*chestALabel.scale)-10-this.chestASquare.y) / this.chestAButton.height);
			this.chestAButton.attr({
				x:chestAImage.x,
				y:this.chestASquare.y+5,
				anchorX:.5,
				anchorY:0
			});
			this.addChild(this.chestAButton);
			this.chestASquare.color = cc.color(255,255,0,255);
		}*/
		
		//else
		//{
			var timeTilChestSpawn = DATA.timeLastChestOpened+(1000*60*60*24);
			var timeElapsed = timeTilChestSpawn - (new Date()).getTime();
			var hours = Math.floor(timeElapsed / (1000*60*60));
			var minutes = Math.floor((timeElapsed - hours*60*60*1000)/(1000*60));
			var minutesStr = ""+minutes;
			if(minutes <= 9)
				minutesStr = "0"+minutes;
   			var seconds = Math.floor((timeElapsed - (hours*60*60*1000) - (minutes*60*1000))/(1000));
   			var secondsStr = ""+seconds;
	   		if(seconds <= 9)
	   			secondsStr = "0"+seconds
	   		
			this.chestATimer = new cc.LabelTTF(""+hours+":"+minutesStr+":"+secondsStr, "Roboto", 35);
			this.chestATimer.attr({
				"x":this.chestAImage.x,
				"y":this.chestASquare.y+5,
				"anchorX":.5,
				"anchorY":0
			});
			this.chestATimer.color = cc.color(255,255,255,255);
			this.addChild(this.chestATimer);
			
			this.chestASquare.color = cc.color(255,0,0,255);
			
			this.draw();
			
			//this.schedule(this.updateChestTimers, 1);
		//}
		
		
	}
	
});
