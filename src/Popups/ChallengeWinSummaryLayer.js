var ChallengeWinSummaryLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
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
		this.addChild(this.emojiFace);
		
		this.streakDescription = new cc.LabelTTF((DATA.streakStep+1)+" tries per level!", "Roboto",18);
		this.streakDescription.attr({
			x:this.width/2,
			y:this.emojiFace.y-(this.emojiFace.height*this.emojiFace.scale)-3,
			anchorX:.5,
			anchorY:1
		});
		this.streakDescription.color = cc.color(0,0,0,255);
		this.addChild(this.streakDescription);
		
		
		/*this.nextButton = new cc.Sprite(res.next_button);
		this.nextButton.setScale(this.width/3 / this.nextButton.width)
		this.nextButton.attr({
			x:this.width/2,
			y:20,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.nextButton);*/
		
		
		
		this.tryAlert = null;
		if(DATA.streakStep==DATA.challengeTries)
		{
			this.tryAlert = new cc.Sprite(res.last_try_card);
			this.tryAlert.setScale(this.width*.25 / this.tryAlert.width);
			this.tryAlert.attr({
				x:this.width*.092+5,
				y:this.height*.14+5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.tryAlert);
		}
		else if(DATA.challengeTries == 0)
		{
			this.tryAlert = new cc.Sprite(res.first_try_card);
			this.tryAlert.setScale(this.width*.25 / this.tryAlert.width);
			this.tryAlert.attr({
				x:this.width*.092+5,
				y:this.height*.14+5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.tryAlert);
		}
		else
		{
			this.tryAlert = new cc.Sprite(res.card_back);
			this.tryAlert.setScale(this.width*.25 / this.tryAlert.width);
			this.tryAlert.attr({
				x:this.width*.092+5,
				y:this.height*.14+5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.tryAlert);
		}
		
		
		var xSpace = this.width*.908 - (this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale));
		var borderSpace = (.1*xSpace)/4;
		xSpace *= .9; // space between;
		var mB = 1.25; // how much bigger are circles
		var mC = 1.5;
		var spaceA = xSpace / (1 + mB + mC);
		var spaceB = spaceA * mB;
		var spaceC = spaceA * mC;
		
		//var circleY = this.tryAlert.y+(this.tryAlert.height*this.tryAlert.scale)/2;
		var circleY = this.tryAlert.y+spaceC/2;
		
		// Circles' lit color
		var circleColor = cc.color(255,0,0,255);
		if((DATA.streakStep == 1 && DATA.challengeTries == 0)
			|| (DATA.streakStep == 2 && DATA.challengeTries == 1))
		{
			circleColor = cc.color(255,255,0,255);
		}
		else if(DATA.streakStep == 2 && DATA.challengeTries == 0)
		{
			circleColor = cc.color(0,255,0,255);
		}
		
		this.faceA = null;
		this.faceB = null;
		this.faceC = null;
		
		// Face 1
		var yOffset = 0;
		if(DATA.streakStep == 0)
		{
			this.faceA = new cc.Sprite(res.concerned_face);
			this.faceA.setScale(spaceA / this.faceA.width);
		}
		else if(DATA.streakStep == 1)
		{
			this.faceA = new cc.Sprite(res.sunglass_face);
			this.faceA.setScale(spaceA / this.faceA.width);
		}
		else if(DATA.streakStep == 2)
		{
			this.faceA = new cc.Sprite(res.crown_face);
			this.faceA.setScale(spaceA / this.faceA.width);
			yOffset = this.faceA.height*this.faceA.scale*.16;
		}
		this.faceA.attr({
			x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + spaceA/2 + borderSpace,
			y:circleY+yOffset,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.faceA);
		//this.dn.drawDot({x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + spaceA/2 + borderSpace, y:circleY}, spaceA/2, circleColor);
		
		// Face 2
		yOffset = 0;
		if(DATA.streakStep == 0)
		{// black dot
			this.dn.drawDot({x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + (spaceA+(spaceB/2)) + borderSpace*2, y:circleY}, spaceB/2, cc.color(0,0,0,255));
		}
		else if((DATA.streakStep == 1 && DATA.challengeTries == 1) || (DATA.streakStep == 2 && DATA.challengeTries == 2))
		{// sad face
			
		}
		else
		{// other face
			if(DATA.streakStep == 1)
			{
				this.faceB = new cc.Sprite(res.sunglass_face);
				this.faceB.setScale(spaceB / this.faceB.width);
			}
			else if(DATA.streakStep == 2)
			{
				this.faceB = new cc.Sprite(res.crown_face);
				this.faceB.setScale(spaceB / this.faceB.width);
				yOffset = this.faceB.height*this.faceB.scale*.16;
			}
			
			this.faceB.attr({
				x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + spaceA + spaceB/2 + borderSpace*2,
				y:circleY+yOffset,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.faceB);
		}
		
			
		// Face 3
		
		if(DATA.streakStep < 2)
		{// black dot
			this.dn.drawDot({x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, cc.color(0,0,0,255));
		}
		else if(DATA.streakStep == 2 && DATA.challengeTries >= 1)
		{// sad face
			
		}
		else
		{// other face
			this.faceC = new cc.Sprite(res.crown_face);
			
			
			this.faceC.setScale(spaceC / this.faceC.width);
			this.faceC.attr({
				x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + spaceA + spaceB + spaceC/2 + borderSpace*3,
				y:circleY + this.faceC.height*this.faceC.scale*.16,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.faceC);
		}
			
		
		
		
		this.streakUpAlert = new cc.Sprite(res.streak_up_alert);
		this.streakUpAlert.setScale(this.width/3 / this.streakUpAlert.width);
		this.streakUpAlert.attr({
			x: this.width/2,
			y: this.streakDescription.y-(this.streakDescription.height*this.streakDescription.scale)-2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.streakUpAlert);
		
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
	
	draw:function()
	{
		
	},
	
	onTouchEnd:function(pos)
	{
		
	}
	
});
