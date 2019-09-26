var ChallengeWinDailyLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		
		
		
		var challengeBorder = 5;
		var challengeWidth = this.width-10;
		//var challengeHeight = (this.cardSet.y-5 - this.streakUpAlert.y-(this.streakUpAlert.height*this.streakUpAlert.scale) - challengeBorder*4)/3;
		var challengeHeight = this.height/4;
		this.challengeARect = {
			x: 5,
			y: this.height - 5 - challengeHeight,
			width: challengeWidth,
			height: challengeHeight
		};
		/*this.challengeBRect = {
			x: 5,
			y: this.cardSet.y - 5*2 - challengeHeight*2,
			width: challengeWidth,
			height: challengeHeight
		};
		this.challengeCRect = {
			x: 5,
			y: this.cardSet.y - 5*3 - challengeHeight*3,
			width: challengeWidth,
			height: challengeHeight
		};*/
		this.draw();
		
		
		//this.challengeARectData = {rewardA:}
		var challengeAText = new cc.LabelTTF("Make matches sized 5+.", "Arial", 24);
		challengeAText.attr({
			"x":this.challengeARect.x+2,
			"y":this.challengeARect.y + this.challengeARect.height-2,
			"anchorX":0,
			"anchorY":1
		});
		challengeAText.color = cc.color(0,0,0,255);
		this.addChild(challengeAText);
		
		var challengeARemText = new cc.LabelTTF("100 left","Arial", 20);
		challengeARemText.attr({
			x:this.challengeARect.x+2,
			y:this.challengeARect.y + 2,
			anchorX:0,
			anchorY:0
		});
		challengeARemText.color = cc.color(0,0,0,255);
		this.addChild(challengeARemText);
		
		 
		var challengeAXPImage = new cc.Sprite(res.xp);
		challengeAXPImage.setScale((this.challengeARect.height-6)/2 / challengeAXPImage.height);
		challengeAXPImage.attr({
			x:this.challengeARect.x+this.challengeARect.width - 2 - (challengeAXPImage.width*challengeAXPImage.scale),
			y:this.challengeARect.y+this.challengeARect.height - 2 - (challengeAXPImage.height*challengeAXPImage.scale),
			anchorX:0,
			anchorY:0
		});
		this.addChild(challengeAXPImage);
		
		var challengeAXPLabel = new cc.LabelTTF("+100", "Arial", 20);
		challengeAXPLabel.attr({
			"x":challengeAXPImage.x-2,
			"y":challengeAXPImage.y+(challengeAXPImage.height*challengeAXPImage.scale)/2,
			"anchorX":1,
			"anchorY":.5
		});
		challengeAXPLabel.color = cc.color(0,0,0,255);
		this.addChild(challengeAXPLabel);
		
		var challengeABonusImage = new cc.Sprite(res.coin);
		challengeABonusImage.setScale((this.challengeARect.height-6)/2 / challengeABonusImage.height);
		challengeABonusImage.attr({
			x:this.challengeARect.x+this.challengeARect.width - 2 - (challengeABonusImage.width*challengeABonusImage.scale),
			y:this.challengeARect.y+ 2 ,
			anchorX:0,
			anchorY:0
		});
		this.addChild(challengeABonusImage);
		
		var challengeABonusLabel = new cc.LabelTTF("+15","Arial", 20);
		challengeABonusLabel.attr({
			x:challengeAXPLabel.x,
			y:challengeABonusImage.y+(challengeABonusImage.height*challengeABonusImage.scale)/2,
			anchorX:1,
			anchorY:.5
		});
		challengeABonusLabel.color = cc.color(0,0,0,255);
		this.addChild(challengeABonusLabel);
		
		this.challengeAProgBar = new ProgressBar(challengeARemText.x + challengeARemText.width + 5, challengeARemText.y+2, (challengeABonusLabel.x-challengeABonusLabel.width)-10 - (challengeARemText.x+challengeARemText.width), 20);
		this.challengeAProgBar.attr({
			x:challengeARemText.x + challengeARemText.width + 5,
			y:challengeARemText.y+2,
			anchorX:0,anchorY:0
		});
		this.addChild(this.challengeAProgBar);
		//this.challengeAProgBar.setProg(DATA.dailyChallenges[0].progress/DATA.dailyChallenges[0].number);
		//this.challengeAProgBar.setSubProg((DATA.dailyChallenges[0].progress-DATA.dailyAProgress)/DATA.dailyChallenges[0].number);
		
		
		
		/*
		var challengeBText = new cc.LabelTTF("Beat levels.", "Arial", 24);
		challengeBText.attr({
			"x":this.challengeBRect.x+2,
			"y":this.challengeBRect.y + this.challengeBRect.height-2,
			"anchorX":0,
			"anchorY":1
		});
		challengeBText.color = cc.color(0,0,0,255);
		this.addChild(challengeBText);
		
		var challengeBRemText = new cc.LabelTTF("3 left","Arial", 20);
		challengeBRemText.attr({
			x:this.challengeBRect.x+2,
			y:this.challengeBRect.y + 2,
			anchorX:0,
			anchorY:0
		});
		challengeBRemText.color = cc.color(0,0,0,255);
		this.addChild(challengeBRemText);
		 
		var challengeBXPImage = new cc.Sprite(res.xp);
		challengeBXPImage.setScale((this.challengeBRect.height-6)/2 / challengeBXPImage.height);
		challengeBXPImage.attr({
			x:this.challengeBRect.x+this.challengeBRect.width - 2 - (challengeBXPImage.width*challengeBXPImage.scale),
			y:this.challengeBRect.y+this.challengeBRect.height - 2 - (challengeBXPImage.height*challengeBXPImage.scale),
			anchorX:0,
			anchorY:0
		});
		this.addChild(challengeBXPImage);
		
		var challengeBXPLabel = new cc.LabelTTF("+50", "Arial", 20);
		challengeBXPLabel.attr({
			"x":challengeBXPImage.x-2,
			"y":challengeBXPImage.y+(challengeBXPImage.height*challengeBXPImage.scale)/2,
			"anchorX":1,
			"anchorY":.5
		});
		challengeBXPLabel.color = cc.color(0,0,0,255);
		this.addChild(challengeBXPLabel);
		
		var challengeBBonusImage = new cc.Sprite(res.coin);
		challengeBBonusImage.setScale((this.challengeBRect.height-6)/2 / challengeBBonusImage.height);
		challengeBBonusImage.attr({
			x:this.challengeBRect.x+this.challengeBRect.width - 2 - (challengeBBonusImage.width*challengeBBonusImage.scale),
			y:this.challengeBRect.y+ 2 ,
			anchorX:0,
			anchorY:0
		});
		this.addChild(challengeBBonusImage);
		
		var challengeBBonusLabel = new cc.LabelTTF("+5","Arial", 20);
		challengeBBonusLabel.attr({
			x:challengeBXPLabel.x,
			y:challengeBBonusImage.y+(challengeBBonusImage.height*challengeBBonusImage.scale)/2,
			anchorX:1,
			anchorY:.5
		});
		challengeBBonusLabel.color = cc.color(0,0,0,255);
		this.addChild(challengeBBonusLabel);
		
		this.challengeBProgBar = new ProgressBar(challengeBRemText.x + challengeBRemText.width + 5, challengeBRemText.y+2, (challengeBBonusLabel.x-challengeBBonusLabel.width)-10 - (challengeBRemText.x+challengeBRemText.width), 20);
		this.challengeBProgBar.attr({
			x:challengeBRemText.x + challengeBRemText.width + 5,
			y:challengeBRemText.y+2,
			anchorX:0,anchorY:0
		});
		this.addChild(this.challengeBProgBar);
		this.challengeBProgBar.setProg(DATA.dailyChallenges[1].progress/DATA.dailyChallenges[1].number);
		this.challengeBProgBar.setSubProg((DATA.dailyChallenges[1].progress-DATA.dailyBProgress)/DATA.dailyChallenges[1].number);
		*/
		
		/*
		var challengeCRemText = new cc.LabelTTF("[Come back tomorrow!]","Arial", 20);
		challengeCRemText.attr({
			x:this.challengeCRect.x+this.challengeCRect.width/2,
			y:this.challengeCRect.y+this.challengeCRect.height/2,
			anchorX:.5,
			anchorY:.5
		});
		challengeCRemText.color = cc.color(0,0,0,255);
		this.addChild(challengeCRemText);
		*/
		
		//DATA.refreshProgress();
	},
	
	draw:function()
	{
		this.dn.drawRect(cc.p(this.challengeARect.x, this.challengeARect.y), cc.p(this.challengeARect.x+this.challengeARect.width, this.challengeARect.y+this.challengeARect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
		//this.dn.drawRect(cc.p(this.challengeBRect.x, this.challengeBRect.y), cc.p(this.challengeBRect.x+this.challengeBRect.width, this.challengeBRect.y+this.challengeBRect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
		//this.dn.drawRect(cc.p(this.challengeCRect.x, this.challengeCRect.y), cc.p(this.challengeCRect.x+this.challengeCRect.width, this.challengeCRect.y+this.challengeCRect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
	
	},
	
	onTouchEnd:function(pos)
	{
		
	}
	
});
