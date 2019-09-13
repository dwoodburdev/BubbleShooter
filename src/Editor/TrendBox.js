var TrendBox = cc.Layer.extend({
	ctor:function(width, height, name, author, bubbleTypes, bubbleColors, type, timePlayed, boxNum){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		cc.log("time played: " + timePlayed);
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.boxNum = boxNum;
		 
		 this.name = name;
		 this.author = author;
		 
		this.bubbleTypes = bubbleTypes;
		this.bubbleColors = bubbleColors;
		
		this.type = type;
		this.timePlayed = timePlayed;
		
		
		var dt = new Date();
		this.timeLeft = this.timePlayed+(1000*60*60*1) - dt.getTime();
		
		this.borderWidth = 0;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		if(this.type == "wait")
		{
			this.bgColor = cc.color(135,135,135,255);
			this.textColor = cc.color(0,0,0,255);
		}
		else if(this.type == "ready")
		{
			this.bgColor = cc.color(0,205,0,255);
			this.textColor = cc.color(0,0,0,255);
		}
		
		this.draw();
	
		if(this.type == "ready")
		{
			this.nameLabel = new cc.LabelTTF(this.name, "HeaderFont", Math.floor(this.height*.3));
			this.nameLabel.color = this.textColor;
			this.nameLabel.attr({
				x:5,
				y:this.height*.75 +2,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.nameLabel);
			
			this.authorLabel = new cc.LabelTTF("by "+this.author, "HeaderFont", Math.floor(this.height*.2));
			this.authorLabel.color = this.textColor;
			this.authorLabel.attr({
				x:5,
				y:this.nameLabel.y-Math.floor(this.height*.3)/2,
				anchorX:0,
				anchorY:1
			});
			this.addChild(this.authorLabel);
		}
		else if(this.type == "wait")
		{
			var timeForText = this.getHMS();cc.log(timeForText);
			
			var timeString = "";
			if(timeForText.hours > 0)
				timeString += timeForText.hours+"h ";
			if(timeForText.minutes > 0)
				timeString += timeForText.minutes+"m ";
			timeString += timeForText.seconds+"s";
				
			
			this.timeLabel = new cc.LabelTTF(timeString, "HeaderFont", Math.floor(this.height*.5));
			this.timeLabel.color = cc.color(255,255,255,255);
			this.timeLabel.attr({
				x:5,
				y:this.height*.95,
				anchorX:0,
				anchorY:1
			});
			this.addChild(this.timeLabel);
		}
		
		
		if(this.type == "ready")
		{
			this.playButton = new cc.Sprite(res.play_button_green);
			this.playButton.setScale(this.height*.4 / this.playButton.height);
			this.playButton.attr({
				x:this.width-4,
				y:this.height/2,
				anchorX:1,
				anchorY:.5
			});
			this.addChild(this.playButton);
		}
		else if(this.type == "wait")
		{
			this.watchButton = new cc.Sprite(res.button_watch);
			this.watchButton.setScale(this.height*.4 / this.watchButton.height);
			this.watchButton.attr({
				x:this.width-4,
				y:this.height/2,
				anchorX:1,
				anchorY:.5
			});
			this.addChild(this.watchButton);
		}
		
		var sortedTypes = [];
		for(var bubType in bubbleTypes)
		{
			sortedTypes.push([bubType, bubbleTypes[bubType]]);
		}
		sortedTypes.sort(function(a,b){
			return b[1] - a[1];
		});
		cc.log(sortedTypes);
		
		var sortedColors = [];
		for(var bubColor in bubbleColors)
		{
			sortedColors.push([bubColor, bubbleColors[bubColor]]);
		}
		sortedColors.sort(function(a,b){
			return b[1] - a[1];
		});cc.log(sortedColors);
		
		var iconCount = 0;
		var obstTopY = 3+(this.height*.3);
		
		
		
		//this.previewColors = [];
		for(var i=0; i<sortedColors.length; i++)
		{
			
			if(sortedColors[i][0] == "yellow")
			{
				var smileEmoji = new cc.Sprite(res.smile_emoji);
				smileEmoji.setScale(this.height*.3 / smileEmoji.height);
				smileEmoji.attr({
					x:5+(iconCount*(this.height*.3 + 2)*.5),
					y:3,
					anchorX:0,
					anchorY:0
				});
				//this.previewColors.push(smileEmoji);
				this.addChild(smileEmoji);
				iconCount++;
			}
			else if(sortedColors[i][0] == "blue")
			{
				var sadEmoji = new cc.Sprite(res.sad_emoji);
				sadEmoji.setScale(this.height*.3 / sadEmoji.height);
				sadEmoji.attr({
					x:5+(iconCount*(this.height*.3 + 2)*.5),
					y:3,
					anchorX:0,
					anchorY:0
				});
				//this.previewColors.push(sadEmoji);
				this.addChild(sadEmoji);
				iconCount++;
			}
			else if(sortedColors[i][0] == "red")
			{
				var angryEmoji = new cc.Sprite(res.angry_emoji);
				angryEmoji.setScale(this.height*.3 / angryEmoji.height);
				angryEmoji.attr({
					x:5+(iconCount*(this.height*.3 + 2)*.5),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(angryEmoji);
				iconCount++;
			}
			else if(sortedColors[i][0] == "green")
			{
				var alienEmoji = new cc.Sprite(res.sick_emoji);
				alienEmoji.setScale(this.height*.3 / alienEmoji.height);
				alienEmoji.attr({
					x:5+(iconCount*(this.height*.3 + 2)*.5),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(alienEmoji);
				iconCount++;
			}
			else if(sortedColors[i][0] == "pink")
			{
				var loveEmoji = new cc.Sprite(res.love_emoji);
				loveEmoji.setScale(this.height*.3 / loveEmoji.height);
				loveEmoji.attr({
					x:5+(iconCount*(this.height*.3 + 2)*.5),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(loveEmoji);
				iconCount++;
			}
			else if(sortedColors[i][0] == "purple")
			{
				var evilEmoji = new cc.Sprite(res.evil_emoji);
				evilEmoji.setScale(this.height*.3 / evilEmoji.height);
				alienEmoji.attr({
					x:5+(iconCount*(this.height*.3 + 2)*.5),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(evilEmoji);
				iconCount++;
			}
			
		}
		
		iconCount+=2;
		
		for(var i=0; i<sortedTypes.length; i++)
		{
			if(sortedTypes[i][0] == "1")
			{
				var obstEmoji = new cc.Sprite(res.bomb_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			else if(sortedTypes[i][0] == "2")
			{
				var obstEmoji = new cc.Sprite(res.anvil_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			else if(sortedTypes[i][0] == "4")
			{
				var obstEmoji = new cc.Sprite(res.bubble_wrap_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			else if(sortedTypes[i][0] == "5")
			{
				var obstEmoji = new cc.Sprite(res.soap_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			else if(sortedTypes[i][0] == "7")
			{
				var obstEmoji = new cc.Sprite(res.red_bulb_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			else if(sortedTypes[i][0] == "8")
			{
				var obstEmoji = new cc.Sprite(res.red_die_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			else if(sortedTypes[i][0] == "20")
			{}
			else if(sortedTypes[i][0] == "11")
			{
				var obstEmoji = new cc.Sprite(res.beachball_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			else if(sortedTypes[i][0] == "13")
			{
				var obstEmoji = new cc.Sprite(res.horiz_rocket_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			else if(sortedTypes[i][0] == "17")
			{
				var obstEmoji = new cc.Sprite(res.red_soapbar_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			else if(sortedTypes[i][0] == "21")
			{
				var obstEmoji = new cc.Sprite(res.left_dagger_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			else if(sortedTypes[i][0] == "24")
			{
				var obstEmoji = new cc.Sprite(res.red_snail_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+iconCount*(obstEmoji.width*obstEmoji.scale + 3)*.5,
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
				iconCount++;
			}
			
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
	},
	
	countDown:function()
	{
		//this.timeLeft -= 1000;
		
		var dt = new Date();
		this.timeLeft = this.timePlayed+(1000*60*60*1) - dt.getTime();
		
		if(this.timeLeft <= 0)
		{
			this.parent.readyLevel(this.boxNum);
		}
		else
		{
			var timeForText = this.getHMS();
			
			var timeString = "";
			if(timeForText.hours > 0)
				timeString += timeForText.hours+"h ";
			if(timeForText.minutes > 0)
				timeString += timeForText.minutes+"m ";
			timeString += timeForText.seconds+"s";
			
			this.timeLabel.setString(timeString);
		}
	},
	
	setInProgress:function()
	{
		if(this.closeButton != null)
		{
			this.removeChild(this.closeButton);
			this.closeButton = null;
			
		}
		
		this.bgColor = cc.color(255,255,0,255);
		this.draw();
	},
	
	select:function()
	{
		this.borderWidth = 3;
		this.dn.clear();
		this.draw();
		
		this.removeChild(this.playButton);
		/*this.closeButton = new cc.Sprite(res.quit_button);
		this.closeButton.setScale(this.height*.4 / this.closeButton.height);
		this.closeButton.attr({
			x:this.playButton.x,
			y:this.playButton.y,
			anchorX:this.playButton.anchorX,
			anchorY:this.playButton.anchorY
		});
		this.addChild(this.closeButton);*/
		
		this.playButton = null;
	},
	unselect:function()
	{
		this.borderWidth = 0;
		this.dn.clear();
		this.draw();
		
		if(this.closeButton != null)
		{
			this.removeChild(this.closeButton);
			this.closeButton = null;
		}
		
		this.playButton = new cc.Sprite(res.play_button_green);
		this.playButton.setScale(this.height*.4 / this.playButton.height);
		this.playButton.attr({
			x:this.width-4,
			y:this.height/2,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.playButton);
	},
	
	draw:function()
	{
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), this.bgColor, this.borderWidth, cc.color(0,0,0,255));

	}
	
	
	
});