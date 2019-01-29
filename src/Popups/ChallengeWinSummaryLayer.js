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
		if(DATA.streakStep == 1)
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
		
		/*this.nextButton = new cc.Sprite(res.next_button);
		this.nextButton.setScale(this.width/3 / this.nextButton.width)
		this.nextButton.attr({
			x:this.width/2,
			y:20,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.nextButton);*/
		
		
		var circleR = (this.y+80 - this.y ) / 2;
		var circleY = this.y + circleR;
		//circleR -= 2;
		circleR = 20;
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
		
		this.dn.drawDot({x:this.width/2 - circleR*2 - 5, y:circleY}, circleR, circleColor);
		
		if((DATA.streakStep == 1 && DATA.challengeTries == 0) || (DATA.streakStep == 2 && DATA.challengeTries <= 1))
			this.dn.drawDot({x:this.width/2, y:circleY}, circleR, circleColor);
		else if(DATA.streakStep > 0)
			this.dn.drawDot({x:this.width/2, y:circleY}, circleR, cc.color(100,100,100,255));
		else
			this.dn.drawDot({x:this.width/2, y:circleY}, circleR, cc.color(0,0,0,255));
			
		if(DATA.streakStep == 2 && DATA.challengeTries == 0)
			this.dn.drawDot({x:this.width/2 + circleR*2 + 5, y:circleY}, circleR, circleColor);
		else if(DATA.streakStep == 2)
			this.dn.drawDot({x:this.width/2 + circleR*2 + 5, y:circleY}, circleR, cc.color(100,100,100,255));
		else this.dn.drawDot({x:this.width/2 + circleR*2 + 5, y:circleY}, circleR, cc.color(0,0,0,255));
		
		
		
		this.streakUpAlert = new cc.Sprite(res.streak_up_alert);
		this.streakUpAlert.setScale(this.width/3 / this.streakUpAlert.width);
		this.streakUpAlert.attr({
			x: this.width/2,
			y: circleY+circleR+5,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.streakUpAlert);
		
		
		
	},
	
	draw:function()
	{
		
	},
	
	onTouchEnd:function(pos)
	{
		
	}
	
});
