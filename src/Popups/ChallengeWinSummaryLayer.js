var ChallengeWinSummaryLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.rewardSpinning = false;
		this.rewardSpun = false;
		
		/*this.tabTitleLabel = new cc.LabelTTF("Level Complete!", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":this.width/2,
			"y":this.height-5,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);*/
		
		this.emojiFace = null;
		if(DATA.streakStep <= 1)
			this.emojiFace = new cc.Sprite(res.sunglass_face);
		else if(DATA.streakStep == 2)
			this.emojiFace = new cc.Sprite(res.crown_face);
		this.emojiFace.setScale(this.width/3 / this.emojiFace.width);
		this.emojiFace.attr({
			x:this.width/2,
			y:this.height,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.emojiFace);
		
		this.streakDescription = new cc.LabelTTF((DATA.streakStep+1)+" tries per level!", "Roboto",18);
		this.streakDescription.attr({
			x:this.width/2,
			y:this.emojiFace.y-(this.emojiFace.height*this.emojiFace.scale)-3,
			anchorX:.5,
			anchorY:1
		});
		this.streakDescription.color = cc.color(0,0,0,255);
		//this.addChild(this.streakDescription);
		
		
		/*this.nextButton = new cc.Sprite(res.next_button);
		this.nextButton.setScale(this.width/3 / this.nextButton.width)
		this.nextButton.attr({
			x:this.width/2,
			y:20,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.nextButton);*/
		
		
		
		
		var xSpace = this.width*.908 - this.width*.25;
		var borderSpace = (.1*xSpace)/4;
		xSpace *= .9; // space between;
		var mB = 1.25; // how much bigger are circles
		var mC = 1.5;
		var spaceA = xSpace / (1 + mB + mC);
		var spaceB = spaceA * mB;
		var spaceC = spaceA * mC;
		//var startX = this.width*.908 - xSpace - borderSpace*4;
		var startX = this.width*.092 + (this.width*.816 - (xSpace+borderSpace*4))/2;
		
		this.winStreakVisLayer = new WinStreakVisLayer(this.width*.908-this.width*.25, spaceC, "win");
		this.winStreakVisLayer.attr({
			x:startX,
			y:this.height*.14+5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.winStreakVisLayer);
			
		
		
		
		this.streakUpAlert = new cc.Sprite(res.streak_up_alert);
		this.streakUpAlert.setScale(this.width/3 / this.streakUpAlert.width);
		this.streakUpAlert.attr({
			x: this.winStreakVisLayer+this.winStreakVisLayer.height,
			y: this.streakDescription.y-(this.streakDescription.height*this.streakDescription.scale)-2,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.streakUpAlert);
		
		this.slotLayer = new SlotLayer(this.width*.816, this.height*.3, "win", 1+DATA.streakStep);
		this.slotLayer.attr({
			x:this.width/2 - (this.slotLayer.slotImage.width*this.slotLayer.slotImage.scale)/2,
			y:this.height*.86 - 4 - (this.slotLayer.slotImage.height*this.slotLayer.slotImage.scaleY),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.slotLayer);

		
		/*
		this.popupDn = new cc.DrawNode();
		this.tutorialStreakTextA = null;
		this.tutorialStreakTextB = null;
		if(DATA.worldIndex == 0)
		{
			this.addChild(this.popupDn);
			var streakPosY = 3+this.streakUpAlert.y+(this.streakUpAlert.height*this.streakUpAlert.scale);
			this.dn.drawRect(cc.p(20,streakPosY),
				cc.p(this.width-20, this.streakDescription.y-this.streakDescription.height-3),
				cc.color(255,255,255,255),4,cc.color(0,0,0,255)
			);
				
			this.tutorialStreakTextA = new cc.LabelTTF("You have a streak!","Roboto",24);
			this.tutorialStreakTextA.attr({
				x:this.width/2,
				y:this.streakDescription.y-this.streakDescription.height-10,
				anchorX:.5,
				anchorY:1
			});
			this.tutorialStreakTextA.color = cc.color(0,0,0,255);
			this.addChild(this.tutorialStreakTextA);
			this.tutorialStreakTextB = new cc.LabelTTF("You get 2 tries next time!","Roboto",24);
			this.tutorialStreakTextB.attr({
				x:this.width/2,
				y:this.tutorialStreakTextA.y-this.tutorialStreakTextA.height-3,
				anchorX:.5,
				anchorY:1
			});
			this.tutorialStreakTextB.color = cc.color(0,0,0,255);
			this.addChild(this.tutorialStreakTextB);
			
			this.tutFace = new cc.Sprite(res.nerd_emoji);
			this.tutFace.setScale(circleR*2.5 / this.tutFace.width);
			this.tutFace.attr({
				x:this.width-3,
				y:streakPosY,
				anchorX:1,
				anchorY:.5
			});
			this.addChild(this.tutFace);
		}*/
		
	},
	
	rewardMoves:function(numMoves)
	{
		this.rewardSpun = true;
		this.rewardSpinning = false;
		DATA.gameplayRewardOnReturn = {"type":"bonus","number":numMoves};
	},
	
	draw:function()
	{
		
	},
	
	onTouchEnd:function(pos)
	{
		if(FUNCTIONS.posWithin(pos, this.slotLayer) && !this.rewardSpinning && !this.rewardSpun)
		{
			this.slotLayer.initSpin();
			this.rewardSpinning = true;
		}
	}
	
});
