var WorldLayer = cc.Layer.extend({
	ctor:function(width, height, feature){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.feature = feature;
		 
		 
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(235,235,235,255), 0, cc.color(0,0,0,255));
		
		 
		 
		 this.worldDisplay = new WorldDisplay(this.width*.475, this.height*.3);
		 this.worldDisplay.attr({
		 	x:this.width*.0125,
		 	y:this.height - 5 - this.worldDisplay.height,
		 	anchorX:0,
		 	anchorY:0
		 });
		 this.addChild(this.worldDisplay);
		 
		 this.streakDisplay = new StreakDisplay(this.width*.475, this.height*.3);
		 this.streakDisplay.attr({
		 	x:this.width*.5125,
		 	y:this.height - 5 - this.streakDisplay.height,
		 	anchorX:0,
		 	anchorY:0
		 });
		 this.addChild(this.streakDisplay);
		 
		 this.movesDisplay = new MovesDisplay(this.width*.35, this.height*.2);
		 this.movesDisplay.attr({
		 	x:this.width*.25 - this.movesDisplay.width/2,
		 	y:this.streakDisplay.y-5 - this.movesDisplay.height,
		 	anchorX:0,
		 	anchorY:0
		 });
		 this.addChild(this.movesDisplay);
		 
		 //this.triesDisplay = new TriesDisplay(this.width*.475, this.height*.3);
		 this.triesDisplay = new TriesDisplay(this.width*.3, this.height*.2);
		 this.triesDisplay.attr({
		 	x:this.width*.6,
		 	y:this.streakDisplay.y-5 - this.triesDisplay.height,
		 	anchorX:0,
		 	anchorY:0
		 });
		 this.addChild(this.triesDisplay);
		 
		 
		this.barDn = new cc.DrawNode();
		this.addChild(this.barDn);
		
		
		
		 
		//this.playButton = new cc.Sprite(res.play_bg);
		this.playButton = new cc.Sprite(res.black_bg);
		this.playButton.setScale(this.height * .2 / this.playButton.height);
		this.playButton.attr({
			x:this.width/2,
			y:5,
			anchorX:.5,
			anchorY:0
		});
		
		var levelLabelY = 5+this.height*.25;
	
		this.levelLabel = new cc.LabelTTF("No Stars","HeaderFont",Math.floor(this.height*.11));
		this.levelLabel.color = cc.color(255,255,255,255);
		this.levelLabel.attr({
			x:this.width/2,
			y:this.playButton.y+(this.playButton.height*this.playButton.scale*.85)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.playButton);
		this.addChild(this.levelLabel);
		
			
		var heightOfImg = (this.height - (levelLabelY+7));
		var scaleOfImg = this.width / 2 / 500;
		
		
			
	
		
		var streak = 1;
		if(streak == 3)
			this.streakFace = new cc.Sprite(res.crown_face);
		else if(streak == 2)
			this.streakFace = new cc.Sprite(res.sunglass_face);
		else if(streak == 1)
			this.streakFace = new cc.Sprite(res.concerned_face);
			
		var challengeTries = 0;
		var numLevelsBeat = 2;
		//this.updateStreakVis(streak, challengeTries, numLevelsBeat);
		
			
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
		this.streakFace.setScale(this.width*.3 / this.streakFace.height);
		this.streakFace.attr({
			x:this.width*.5,
			y:this.worldDisplay.y - 5 - (this.streakFace.height*this.streakFace.scale)/2,
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
		this.addChild(this.triesLabel);
		
		
		//if(this.levelLabel != null)
		//	this.levelLabel.setString("Level "+(this.numLevelsBeat+1));
	},
	
	
});