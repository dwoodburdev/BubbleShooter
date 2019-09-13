var CommunityDisplayLayer = cc.Layer.extend({
	ctor:function(height, bubbles, numRows, meta, queueCounts, queueBlueprint, database, userId){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		this.width = size.width;
		
		this.bubbles = bubbles;
		this.numRows = numRows;
		this.meta = meta;
		this.queueCounts = queueCounts;
		this.queueBlueprint = queueBlueprint;
		this.database = database;
		this.userId = userId;
		
		
		this.bgDn = new cc.DrawNode();
		this.bgDn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.bgDn);
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.tabTitleLabel = new cc.LabelTTF("Daily Level", "HeaderFont", Math.floor(this.height*.065));
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height-3,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		//this.addChild(this.tabTitleLabel);
		
		
		
		this.bubbleLayer = new BubbleLayer(this.bubbles, this.numRows, 99, "side-level", this.width, this.height, [], 
			this.meta, this.queueCounts, this.queueBlueprint, this.database, this.userId);	
		this.bubbleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		
		
		this.playButton = new cc.Sprite(res.play_bg);
		this.playButton.setScale(this.height / 8 / this.playButton.height);
		this.playButton.attr({
			x:this.width/2,
			y:5,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.playButton);
		
		this.playLabel = new cc.LabelTTF("Play", "HeaderFont", Math.floor(this.height/8 * .8));
		this.playLabel.color = cc.color(255,255,255,255);
		this.playLabel.attr({
			x:this.width/2,
			y:this.playButton.y + this.playButton.height*this.playButton.scale - 3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.playLabel);
		
		var boxesWidth = this.height*.1;
		var boxesBottom = this.playButton.y + this.playButton.height*this.playButton.scale + 5;
		
		
		/*this.dn.drawRect(
			cc.p(5, boxesBottom),
			cc.p(5+boxesWidth, boxesBottom+boxesWidth),
			cc.color(255,255,255,255),
			3,
			cc.color(0,0,0,255)
		);*/
		
		
		
		this.streakDisplay = new StreakDisplay(this.width*.475, this.height*.2);
		this.streakDisplay.attr({
			x:this.width*.0125,
			y:this.playButton.y + this.playButton.height*this.playButton.scale + 5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.streakDisplay);
		
		this.rewardDisplay = new DailyRewardDisplay(this.width*.475, this.height*.2);
		this.rewardDisplay.attr({
			x:this.width*.5125,
			y:this.playButton.y + this.playButton.height*this.playButton.scale + 5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.rewardDisplay);
		
		
		/*
		this.faceImg = new cc.Sprite(res.concerned_face);
		this.faceImg.setScale(this.height*.2 / this.faceImg.height);
		this.faceImg.attr({
			x:this.width/2,
			y:this.rewardDisplay.y + this.rewardDisplay.height + 5,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.faceImg);
		*/
		
		/*
		this.comBoxA = new CommunityBox(this.width, this.height*.35);
		this.comBoxA.attr({
			x:3,
			y:this.tabTitleLabel.y-Math.floor(this.height*.065) - 3 - this.comBoxA.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.comBoxA);
		
		this.comBoxB = new CommunityBox(this.width, this.height*.35);
		this.comBoxB.attr({
			x:3,
			y:this.comBoxA.y - 5 - this.comBoxB.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.comBoxB);
		*/
		
		
		// how to get featured
		
	},
	
	
	onTouchBegan:function(pos)
	{pos = this.convertToNodeSpace(pos);
		if(this.playButton == null)
		{
			if(pos.x > this.bubbleLayer.x && pos.x < this.bubbleLayer.x+this.bubbleLayer.width &&
			pos.y > this.bubbleLayer.y && pos.y < this.bubbleLayer.y+this.bubbleLayer.height)
			{
				this.bubbleLayer.onTouchBegin(pos);
			}
		}
	},
	onTouchMoved:function(pos)
	{pos = this.convertToNodeSpace(pos);
		if(this.playButton == null)
		{
			if(pos.x > this.bubbleLayer.x && pos.x < this.bubbleLayer.x+this.bubbleLayer.width &&
			pos.y > this.bubbleLayer.y && pos.y < this.bubbleLayer.y+this.bubbleLayer.height)
			{
				this.bubbleLayer.onTouchMove(pos);
			}
		}
	},
	
	onTouchEnded:function(pos)
	{
		pos = this.convertToNodeSpace(pos);
		
		if(this.playButton != null)
		{
			var playW = this.playButton.width*this.playButton.scale;
			cc.log(pos);
			cc.log(this.playButton.x);cc.log(this.playButton.y);
			if(this.playButton != null && pos.x > this.playButton.x - playW/2 && pos.x < this.playButton.x + playW/2 &&
				pos.y > this.playButton.y && pos.y < this.playButton.y + this.playButton.height*this.playButton.scale)
			{
				this.removeChild(this.playButton);
				this.removeChild(this.playLabel);
				this.removeChild(this.streakDisplay);
				this.removeChild(this.rewardDisplay);
				
				this.playButton = null;
				this.playLabel = null;
				this.streakDisplay = null;
				this.rewardDisplay = null;
				
				
			}
			else if(pos.x > this.bubbleLayer.x && pos.x < this.bubbleLayer.x+this.bubbleLayer.width &&
			pos.y > this.bubbleLayer.y && pos.y < this.bubbleLayer.y+this.bubbleLayer.height)
			{
				this.bubbleLayer.onTouchEnd(pos);
			}
		}
		else if(pos.x > this.bubbleLayer.x && pos.x < this.bubbleLayer.x+this.bubbleLayer.width &&
			pos.y > this.bubbleLayer.y && pos.y < this.bubbleLayer.y+this.bubbleLayer.height)
		{
			this.bubbleLayer.onTouchEnd(pos);
		}
		
		
		//this.bubbleLayer.
		
		
		
		
	}
	
	
	
});
