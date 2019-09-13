var EmptyTrendBox = cc.Layer.extend({
	ctor:function(width, height, timePlayed, boxNum){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		this.timePlayed = timePlayed;
		this.boxNum = boxNum;
		 
		 var dt = new Date();
		 this.timeLeft = (timePlayed+(1000*60*60*4)) - dt.getTime();
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(this.width*.1,this.height*.2), cc.p(this.width*.9,this.height*.8), cc.color(0,0,0,255), 0, cc.color(0,0,0,255));
	
		var timeForText = this.getHMS();
		
		var timeString = "New level in ";
		if(timeForText.hours > 0)
			timeString += timeForText.hours+"h ";
		if(timeForText.minutes > 0)
			timeString += timeForText.minutes+"m ";
		timeString += timeForText.seconds+"s";
		
		this.emptyLabel = new cc.LabelTTF(timeString,"HeaderFont",Math.floor(this.height*.25));
		this.emptyLabel.color = cc.color(255,255,255,255);
		this.emptyLabel.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.emptyLabel);
	
		
		
		/*
		this.playButton = new cc.Sprite(res.play_button_green);
		this.playButton.setScale(this.height*.4 / this.playButton.height);
		this.playButton.attr({
			x:this.width-4,
			y:this.height/2,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.playButton);
		*/
		
		
		
	},
	
	countDown:function()
	{
		//this.timeLeft -= 1000;
		
		var dt = new Date();
		this.timeLeft = this.timePlayed+(1000*60*60*1) - dt.getTime();
		
		
		if(this.timeLeft <= 0)
		{
			this.parent.readyEmptyLevel(this.boxNum);
		}
		else
		{
			var timeForText = this.getHMS();
			
			var timeString = "New level in ";
			if(timeForText.hours > 0)
				timeString += timeForText.hours+"h ";
			if(timeForText.minutes > 0)
				timeString += timeForText.minutes+"m ";
			timeString += timeForText.seconds+"s";
			
			this.emptyLabel.setString(timeString);
		}
	},
	
	getHMS:function()
	{
		var totTime = this.timeLeft;
		var hours = Math.floor(totTime/(1000*60*60));
		totTime -= hours*(1000*60*60);
		
		var minutes = Math.floor(totTime/(1000*60));
		totTime -= minutes*(1000*60);
		
		var seconds = Math.floor(totTime/1000);
		
		
		return {hours:hours, minutes:minutes, seconds:seconds};
	}
	
	
	
});