var ChallengeFailLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.width = width;
		this.height = height;
		
		this.bgImage = new cc.Sprite(res.phone_up);
		this.bgImage.setScaleX(this.width / this.bgImage.width);
		this.bgImage.setScaleY(this.height / this.bgImage.height);
		this.bgImage.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bgImage);
		
		this.tabTitleLabel = new cc.LabelTTF("Challenge Failed", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":this.width/2,
			"y":this.height*.81-1,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		
		
		this.emojiFace = new cc.Sprite(res.sad_emoji);
		this.emojiFace.setScale(this.width/3 / this.emojiFace.width);
		this.emojiFace.attr({
			x:this.width/2,
			y:this.height,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.emojiFace);
		
		this.streakDescription = new cc.LabelTTF(" tries per level", "Roboto",18);
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
		
		this.winStreakVisLayer = new WinStreakVisLayer(this.width*.908-this.width*.25, spaceC, "lose");
		this.winStreakVisLayer.attr({
			x:startX,
			y:this.height*.14+5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.winStreakVisLayer);
	},
		
		
    onTouchEnd: function(pos){
	    //var target = event.getCurrentTarget();
	    //var locationInNode = self.convertToNodeSpace(touch.getLocation());
    	/*
    	var maxRow = 0;
		for(var i=0; i<DATA.worldBubbles.length; i++)
		{
			if(DATA.worldBubbles[i].row > maxRow)
				maxRow = DATA.worldBubbles[i].row;
		}
	  
		cc.director.runScene(new MainContainerScene(DATA.worldBubbles, maxRow+1));*/
		return "close";
	 }
			   	
			 
		
	
});
