var ChallengeMenuDisplayLayer = cc.Layer.extend({
	ctor:function(height, yMin){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		this.yMin = yMin;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Rewards", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		var chestBorder = 5;
		var chestWidth = (size.width-chestBorder*4)/3;
		var chestHeight = chestWidth*1.3;
		this.chestASquare = {
			x: chestBorder,
			y: this.tabTitleLabel.y-this.tabTitleLabel.height - 5 - chestHeight,
			width: chestWidth,
			height: chestHeight
		};
		this.chestBSquare = {
			x: chestBorder*2 + chestWidth,
			y: this.tabTitleLabel.y-this.tabTitleLabel.height - 5 - chestHeight,
			width: chestWidth,
			height: chestHeight
		};
		this.chestCSquare = {
			x: chestBorder*3 + chestWidth*2,
			y: this.tabTitleLabel.y-this.tabTitleLabel.height - 5 - chestHeight,
			width: chestWidth,
			height: chestHeight
		};
		
		var chestAImage = new cc.Sprite(res.regular_chest);
		chestAImage.setScale(this.chestASquare.width*.7 / chestAImage.width);
		chestAImage.attr({
			x:this.chestASquare.x+this.chestASquare.width/2,
			y:this.chestASquare.y+this.chestASquare.height-15,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(chestAImage);
		
		var chestALabel = new cc.LabelTTF("Daily Chest", "Arial", 20);
		chestALabel.attr({
			"x":chestAImage.x,
			"y":chestAImage.y-(chestAImage.height*chestAImage.scale) - 10,
			"anchorX":.5,
			"anchorY":1
		});
		chestALabel.color = cc.color(255,255,255,255);
		this.addChild(chestALabel);
		
		var chestBImage = new cc.Sprite(res.regular_chest);
		chestBImage.setScale(this.chestBSquare.width*.7 / chestBImage.width);
		chestBImage.attr({
			x:this.chestBSquare.x+this.chestBSquare.width/2,
			y:this.chestBSquare.y+this.chestBSquare.height-15,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(chestBImage);
		
		var chestBLabel = new cc.LabelTTF("World", "Arial", 20);
		chestBLabel.attr({
			"x":chestBImage.x,
			"y":chestBImage.y-(chestBImage.height*chestBImage.scale) - 10,
			"anchorX":.5,
			"anchorY":1
		});
		chestBLabel.color = cc.color(255,255,255,255);
		this.addChild(chestBLabel);
		
		this.chestBProgBar = new ProgressBar(this.chestBSquare.x + this.chestBSquare.width/2 - (chestBImage.width*chestBImage.scale)/2, this.chestBSquare.y + 10, chestBImage.width*chestBImage.scale, 20);
		this.chestBProgBar.attr({
			x:0,y:0,anchorX:0,anchorY:0
		});
		this.addChild(this.chestBProgBar);
		
		var chestCImage = new cc.Sprite(res.regular_chest);
		chestCImage.setScale(this.chestCSquare.width*.7 / chestCImage.width);
		chestCImage.attr({
			x:this.chestCSquare.x+this.chestCSquare.width/2,
			y:this.chestCSquare.y+this.chestCSquare.height-15,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(chestCImage);
		
		var chestCLabel = new cc.LabelTTF("Achievements", "Arial", 20);
		chestCLabel.attr({
			"x":chestCImage.x,
			"y":chestCImage.y-(chestCImage.height*chestCImage.scale) - 10,
			"anchorX":.5,
			"anchorY":1
		});
		chestCLabel.color = cc.color(255,255,255,255);
		this.addChild(chestCLabel);
		
		this.chestCProgBar = new ProgressBar(this.chestCSquare.x + this.chestCSquare.width/2 - (chestCImage.width*chestCImage.scale)/2, this.chestCSquare.y + 10, chestCImage.width*chestCImage.scale, 20);
		this.chestCProgBar.attr({
			x:0,y:0,anchorX:0,anchorY:0
		});
		this.addChild(this.chestCProgBar);
		
		
		
		this.dailyChallengeLabel = new cc.LabelTTF("Daily Challenges", "Arial", 25);
		this.dailyChallengeLabel.attr({
			"x":size.width/2,
			"y":this.chestASquare.y-5,
			"anchorX":.5,
			"anchorY":1
		});
		this.dailyChallengeLabel.color = cc.color(0,0,0,255);
		this.addChild(this.dailyChallengeLabel);
		
		var challengeBorder = 5;
		var challengeWidth = size.width-10;
		var challengeHeight = (this.height - this.dailyChallengeLabel.y-this.dailyChallengeLabel.height - challengeBorder*4)/3;
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
		
		
		
		//this.challengeARectData = {rewardA:}
		var challengeAText = new cc.LabelTTF("Make bounce-matches.", "Arial", 24);
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
			x:0,y:0,anchorX:0,anchorY:0
		});
		this.addChild(this.challengeAProgBar);
		
		
		
		
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
			x:0,y:0,anchorX:0,anchorY:0
		});
		this.addChild(this.challengeBProgBar);
		
		
		
		var challengeCRemText = new cc.LabelTTF("[Come back tomorrow!]","Arial", 20);
		challengeCRemText.attr({
			x:this.challengeCRect.x+this.challengeCRect.width/2,
			y:this.challengeCRect.y+this.challengeCRect.height/2,
			anchorX:.5,
			anchorY:.5
		});
		challengeCRemText.color = cc.color(0,0,0,255);
		this.addChild(challengeCRemText);
		



		var starBorder = 10;
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
		this.addChild(starImage);
		
		this.draw();	

	},
	
	draw:function()
	{
		this.dn.drawRect(cc.p(this.chestASquare.x, this.chestASquare.y),cc.p(this.chestASquare.x+this.chestASquare.width,this.chestASquare.y+this.chestASquare.height),cc.color(255,0,0,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.chestBSquare.x, this.chestBSquare.y),cc.p(this.chestBSquare.x+this.chestBSquare.width,this.chestBSquare.y+this.chestBSquare.height),cc.color(255,0,0,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.chestCSquare.x, this.chestCSquare.y),cc.p(this.chestCSquare.x+this.chestCSquare.width,this.chestCSquare.y+this.chestCSquare.height),cc.color(255,0,0,255),2,cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(this.challengeARect.x, this.challengeARect.y), cc.p(this.challengeARect.x+this.challengeARect.width, this.challengeARect.y+this.challengeARect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.challengeBRect.x, this.challengeBRect.y), cc.p(this.challengeBRect.x+this.challengeBRect.width, this.challengeBRect.y+this.challengeBRect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.challengeCRect.x, this.challengeCRect.y), cc.p(this.challengeCRect.x+this.challengeCRect.width, this.challengeCRect.y+this.challengeCRect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
	
		this.dn.drawRect(cc.p(this.starASquare.x, this.starASquare.y), cc.p(this.starASquare.x+this.starASquare.width, this.starASquare.y+this.starASquare.height),cc.color(255,255,0,255),2,cc.color(0,0,0,255));
	},
	
	onTouchEnd:function(pos)
	{
		
	}
	
});
