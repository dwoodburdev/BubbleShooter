var CommunityDisplayLayer = cc.Layer.extend({
	ctor:function(height, bubbles, numRows, numMoves, meta, queueCounts, database, userId, dailyResetTime){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		this.width = size.width;
		
		this.bubbles = bubbles;
		this.numRows = numRows;
		this.numMoves = numMoves;
		this.meta = meta;
		this.queueCounts = queueCounts;
		this.database = database;
		this.userId = userId;
		this.dailyResetTime = dailyResetTime;
		
		this.minsTilReady = 0;
		this.secsTilReady = 0;
		
		
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
		
		var colors = ["yellow","blue","red","green","pink","purple"];
		var colorCodes = {"yellow":0,"blue":1,"red":2,"green":3,"pink":4,"purple":5};
		var queueCountsCopy = [];
		
		// what is first color found, to know in case of single-color level
		var firstColorFound = null;
		for(var i=0; i<this.queueCounts.length && firstColorFound==null; i++)
		{
			if(this.queueCounts[i] > 0)
				firstColorFound = colors[i];
		}
		
		// copy queueCounts for queueBlueprint
		for(var i=0; i<this.queueCounts.length; i++)
		{
			queueCountsCopy.push(this.queueCounts[i]);
		}
		
		// get list of color possibilities
		var colorPossibilities = [];
		for(var i=0; i<this.queueCounts.length; i++)
		{
			for(var j=0; j<this.queueCounts[i]; j++)
			{
				colorPossibilities.push(colors[i]);
			}
		}
		
		// get first color, update queue
		var colorAIndex = Math.floor(Math.random()*colorPossibilities.length);
		var colorA = colorPossibilities[colorAIndex];
		colorPossibilities.splice(colorAIndex, 1);
		this.queueCounts[colorCodes[colorA]]--;
		
		var colorB = null;
		
		// Get second color
		// (if a single-color level)
		if(colorPossibilities.length == 0)
		{
			colorB = firstColorFound;
		}
		else	
		{
			var colorBIndex = Math.floor(Math.random()*colorPossibilities.length);
			colorB = colorPossibilities[colorBIndex];
			this.queueCounts[colorCodes[colorB]]--;
		}
		
		
		var bubCopies = [];
		for(var i=0; i<this.bubbles.length; i++)
		{
			var oldBub = this.bubbles[i];
			var newBub = {row:oldBub.row, col:oldBub.col, type:oldBub.type, colorCode:oldBub.colorCode}
			bubCopies.push(newBub);
		}
		
		
		this.bubbleLayer = new BubbleLayer(bubCopies, this.numRows, this.numMoves, "side-level", this.width, this.height, [], 
			this.meta, colorA, colorB, this.queueCounts, queueCountsCopy, this.database, this.userId);	
		this.bubbleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		
		var date = new Date();
		
		this.playButton = new cc.Sprite(res.play_bg);
		this.playButton.setScale(this.height / 8 / this.playButton.height);
		this.playButton.attr({
			x:this.width/2,
			y:5,
			anchorX:.5,
			anchorY:0
		});
		if(date.getTime() > this.dailyResetTime)
		{
			this.addChild(this.playButton);
		}
		
		this.waitLabel = null;
		
		this.playLabel = new cc.LabelTTF("Play", "HeaderFont", Math.floor(this.height/8 * .8));
		this.playLabel.color = cc.color(255,255,255,255);
		this.playLabel.attr({
			x:this.width/2,
			y:this.playButton.y + this.playButton.height*this.playButton.scale - 3,
			anchorX:.5,
			anchorY:1
		});
		if(date.getTime() > this.dailyResetTime)
		{
			this.addChild(this.playLabel);
		}
		else
		{
			var millisTilReady = this.dailyResetTime - date.getTime();
			var secsTilReady = Math.floor(millisTilReady / 1000);
			var minsTilReady = Math.floor(secsTilReady / 60);
			secsTilReady = secsTilReady - minsTilReady*60;
			var secsString = ""+secsTilReady;
			if(secsTilReady < 10)
				secsString = "0"+secsTilReady;
			this.waitLabel = new cc.LabelTTF(""+minsTilReady+":"+secsString, "HeaderFont", Math.floor(this.height/8 * .8));
			this.waitLabel.color = cc.color(0,0,0,255);
			this.waitLabel.attr({
				x:this.width/2,
				y:this.playButton.y + this.playButton.height*this.playButton.scale - 3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.waitLabel);
			
			this.minsTilReady = minsTilReady;
			this.secsTilReady = secsTilReady;
		}
		
		this.featureLabel = new cc.LabelTTF("Daily Level", "HeaderFont", Math.floor(this.height/16));
		this.featureLabel.color = cc.color(0,0,0,255);
		this.featureLabel.attr({
			x:this.width/2,
			y:this.playButton.y + this.playButton.height*this.playButton.scale + 3 + Math.floor(this.height/16),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.featureLabel);
		
		var boxesWidth = this.height*.1;
		//var boxesBottom = this.playButton.y + this.playButton.height*this.playButton.scale + 5;
		var boxesBottom = this.featureLabel.y + 5;
		
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
			y:boxesBottom,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.streakDisplay);
		
		this.rewardDisplay = new DailyRewardDisplay(this.width*.475, this.height*.2);
		this.rewardDisplay.attr({
			x:this.width*.5125,
			y:boxesBottom,
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
		
		if(this.playButton != null && this.minsTilReady <= 0 && this.secsTilReady <= 0)
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
				this.removeChild(this.featureLabel);
				
				this.playButton = null;
				this.playLabel = null;
				this.streakDisplay = null;
				this.rewardDisplay = null;
				this.featureLabel = null;
				
				this.bubbleLayer.addPlayElements();
				
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
		
		
		
		
	},
	
	
	resetAfterLoss:function()
	{
		var colors = ["yellow","blue","red","green","pink","purple"];
		var colorCodes = {"yellow":0,"blue":1,"red":2,"green":3,"pink":4,"purple":5};
		var queueCountsCopy = [];
		
		// what is first color found, to know in case of single-color level
		var firstColorFound = null;
		for(var i=0; i<this.queueCounts.length && firstColorFound==null; i++)
		{
			if(this.queueCounts[i] > 0)
				firstColorFound = colors[i];
		}
		
		// copy queueCounts for queueBlueprint
		for(var i=0; i<this.queueCounts.length; i++)
		{
			queueCountsCopy.push(this.queueCounts[i]);
		}
		
		
		this.removeChild(this.bubbleLayer);
		
		cc.log(this.bubbles);
		cc.log(this.numRows);
		cc.log(this.numMoves);
		cc.log(this.queueCounts);
		cc.log(queueCountsCopy);
		
		this.bubbleLayer = null;
		this.bubbleLayer = new BubbleLayer(this.bubbles, this.numRows, this.numMoves, "side-level", this.width, this.height, [], 
			this.meta, "red", "blue", this.queueCounts, queueCountsCopy, this.database, this.userId);	
		this.bubbleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		
		var boxesBottom = this.height*.1;
		
		this.streakDisplay = new StreakDisplay(this.width*.475, this.height*.2);
		this.streakDisplay.attr({
			x:this.width*.0125,
			y:boxesBottom,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.streakDisplay);
		
		this.rewardDisplay = new DailyRewardDisplay(this.width*.475, this.height*.2);
		this.rewardDisplay.attr({
			x:this.width*.5125,
			y:boxesBottom,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.rewardDisplay);
		
		
		this.minsTilReady = 10;
		this.secsTilReady = 0;
		
		var secsString = ""+secsTilReady;
		if(secsTilReady < 10)
			secsString = "0"+secsTilReady;
		this.waitLabel = new cc.LabelTTF(""+minsTilReady+":"+secsString, "HeaderFont", Math.floor(this.height/8 * .8));
		this.waitLabel.color = cc.color(0,0,0,255);
		this.waitLabel.attr({
			x:this.width/2,
			y:this.playButton.y + this.playButton.height*this.playButton.scale - 3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.waitLabel);
		
	}
	
	
	
});
