var DrawPanel = cc.Layer.extend({
	ctor:function(width, height, numStars){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 this.numStars = numStars;
		 
		 this.emojiKeys = [
			 ["smile","sad","angry","alien"],
			 []
		 ];
		//this.starWeights = [1,2,3,5,7,10,13,16,20,25,30,35,40];
		 
		/*if(this.numStars >= 1)
			 this.emojiKeys[1].push("soap");
		if(this.numStars >= 3)
			this.emojiKeys[1].push("bomb");
		if(this.numStars >= 6)
			this.emojiKeys[1].push("snail");
		if(this.numStars >= 11)
			this.emojiKeys[1].push("wrap");
		if(this.numStars >= 18)
			this.emojiKeys[1].push("die");
		if(this.numStars >= 28)
			this.emojiKeys[1].push("cloud");
		if(this.numStars >= 41)
			this.emojiKeys[1].push("clone");
		if(this.numStars >= 67)
			this.emojiKeys[2].push("egg");
		if(this.numStars >= 87)
			this.emojiKeys[2].push("knife");
		if(this.numStars >= 112)
			this.emojiKeys[2].push("bulb");
		if(this.numStars >= 142)
			this.emojiKeys[2].push("ghost");
		if(this.numStars >= 177)
			this.emojiKeys[2].push("balloon");
		if(this.numStars >= 217)
			this.emojiKeys[2].push("soapbar");*/
		 if(this.numStars >= 1)
		 	this.emojiKeys[1].push("soap");
		 if(this.numStars >= 3)
		 	this.emojiKeys[1].push("bomb");
		 if(this.numStars >= 6)
		 	this.emojiKeys[1].push("die");
		 if(this.numStars >= 11)
		 	this.emojiKeys[1].push("wrap");
		 if(this.numStars >= 21)
		 	this.emojiKeys[1].push("clone");
		 if(this.numStars >= 36)
		 	this.emojiKeys[1].push("cloud");
		 if(this.numStars >= 51)
		 	this.emojiKeys[1].push("rocket");
		 
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(175,175,175,255), 0, cc.color(0,0,0,255));
		
		this.bubbleSize = this.width / 8;
		
		
		 this.prevImg = new cc.Sprite(res.black_circle);
		 this.prevImg.setScale(this.bubbleSize / this.prevImg.height);
		 this.prevImg.attr({
		 	x:3+(this.prevImg.width*this.prevImg.scale/2),
		 	y:3+(this.prevImg.height*this.prevImg.scale/2),
		 	anchorX:.5,
		 	anchorY:.5
		 });
		 this.addChild(this.prevImg);
		 
		 this.curEmojiKey = null;
		 
		 
		var prevXRight = this.prevImg.x+(this.prevImg.width*this.prevImg.scale/2)+3;
		var prevYTop = this.prevImg.y+(this.prevImg.height*this.prevImg.scale/2)+3;
		this.dn.drawRect(cc.p(0,0), cc.p(this.width, this.prevImg.y+(this.prevImg.height*this.prevImg.scale/2)+3), cc.color(255,255,255,255), 2, cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(0,0), cc.p(prevXRight, prevYTop), cc.color(255,255,255,255), 3, cc.color(0,0,0,255));
		
		
		this.drawOptionsLayer = new DrawOptions(this.width-prevXRight, prevYTop);
		this.drawOptionsLayer.attr({
			x:prevXRight,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.drawOptionsLayer);
		
		
		var rowNum = 0;
		var colNum = 0;
		
		this.botRow = 0;
		
		this.emojis = [[],[]];
		for(var i=0; i<this.emojiKeys.length; i++)
		{
			for(var j=0; j<this.emojiKeys[i].length; j++)
			{
				var code = this.emojiKeys[i][j];
				
				var emojiImg = null;
				if(code == "smile")
					emojiImg = new cc.Sprite(res.smile_emoji);
				else if(code == "sad")
					emojiImg = new cc.Sprite(res.sad_emoji);
				else if(code == "angry")
					emojiImg = new cc.Sprite(res.angry_emoji);
				else if(code == "alien")
					emojiImg = new cc.Sprite(res.sick_emoji);
				else if(code == "soap")
					emojiImg = new cc.Sprite(res.soap_emoji);
				else if(code == "bomb")
					emojiImg = new cc.Sprite(res.bomb_emoji);
				else if(code == "snail")
					emojiImg = new cc.Sprite(res.red_snail_emoji);
				else if(code == "wrap")
					emojiImg = new cc.Sprite(res.bubble_wrap_emoji);
				else if(code == "die")
					emojiImg = new cc.Sprite(res.red_die_emoji);
				else if(code == "cloud")
					emojiImg = new cc.Sprite(res.cloud_emoji);
				else if(code == "clone")
					emojiImg = new cc.Sprite(res.neutral_orb_emoji);
				else if(code == "egg")
					emojiImg = new cc.Sprite(res.red_egg);
				else if(code == "knife")
					emojiImg = new cc.Sprite(res.left_dagger_emoji);
				else if(code == "bulb")
					emojiImg = new cc.Sprite(res.red_bulb_emoji);
				else if(code == "ghost")
					emojiImg = new cc.Sprite(res.red_ghost_emoji);
				else if(code == "balloon")
					emojiImg = new cc.Sprite(res.red_balloon_emoji);
				else if(code == "soapbar")
					emojiImg = new cc.Sprite(res.red_soapbar_emoji);
				else if(code == "rocket")
					emojiImg = new cc.Sprite(res.horiz_rocket_emoji);
				
				emojiImg.setScale(this.bubbleSize / emojiImg.width);
				emojiImg.attr({
					x:3+(colNum*this.bubbleSize),
					y:this.height-3-(rowNum*this.bubbleSize),
					anchorX:0,
					anchorY:1
				});
				this.addChild(emojiImg);
				
				this.emojis[rowNum].push(emojiImg);
						
						
				colNum++;
				if(rowNum == 0 && colNum == 4)
				{
					rowNum++;
					colNum = 0;
				}
				else if(rowNum == 1 && colNum == 1)
				{
					this.botRow++;
				}
				else if(rowNum == 1 && colNum == 7)
				{
					rowNum++;
					colNum = 0;
					//this.botRow++;
				}
				//else if(rowNum == 2 && colNum == )
				
				
			}
		}
		
		
	},
	
	addObstacle:function(numStars)
	{
		var row = 0;
		var col = 0;
		var code = "";
		var emojiImg = null;
		if(numStars <= 2)
		{
			row = 1;
			col = 0;
			code = "soap";
			emojiImg = new cc.Sprite(res.soap_emoji);
		}
		else if(numStars <= 5)
		{
			row = 1;
			col = 1;
			code = "bomb";
			emojiImg = new cc.Sprite(res.bomb_emoji);
		}
		else if(numStars <= 10)
		{
			row = 1;
			col = 2;
			code = "die";
			emojiImg = new cc.Sprite(res.red_die_emoji);
		}
		else if(numStars <= 20)
		{
			row = 1;
			col = 3;
			code = "wrap";
			emojiImg = new cc.Sprite(res.bubble_wrap_emoji);
		}
		else if(numStars <= 30)
		{
			row = 1;
			col = 4;
			code = "clone";
			emojiImg = new cc.Sprite(res.neutral_orb_emoji);
		}
		else if(numStars <= 45)
		{
			row = 1;
			col = 5;
			code = "cloud";
			emojiImg = new cc.Sprite(res.cloud_emoji);
		}
		else if(numStars <= 60)
		{
			row = 1;
			col = 6;
			code = "rocket";
			emojiImg = new cc.Sprite(res.horiz_rocket_emoji);
		}
		/*else if(numStars <= 66)
		{
			row = 1;
			col = 6;
			code = "clone";
			emojiImg = new cc.Sprite(res.neutral_orb_emoji);
		}
		else if(numStars <= 86)
		{
			row = 2;
			col = 0;
			code = "egg";
			emojiImg = new cc.Sprite(res.red_egg);
			this.botRow++;
		}
		else if(numStars <= 111)
		{
			row = 2;
			col = 1;
			code = "knife";
			emojiImg = new cc.Sprite(res.left_dagger_emoji);
		}
		else if(numStars <= 141)
		{
			row = 2;
			col = 2;
			code = "bulb";
			emojiImg = new cc.Sprite(res.red_bulb_emoji);
		}
		else if(numStars <= 176)
		{
			row = 2;
			col = 3;
			code = "ghost";
			emojiImg = new cc.Sprite(res.red_ghost_emoji);
		}
		else if(numStars <= 216)
		{
			row = 2;
			col = 4;
			code = "balloon";
			emojiImg = new cc.Sprite(res.red_balloon_emoji);
		}
		else
		{
			row = 2;
			col = 5;
			code = "soapbar";
			emojiImg = new cc.Sprite(res.red_soapbar_emoji);
		}*/
		
		emojiImg.setScale(this.bubbleSize / emojiImg.width);
		emojiImg.attr({
			x:3+(col*this.bubbleSize),
			y:this.height-3-(row*this.bubbleSize),
			anchorX:0,
			anchorY:1
		});
		this.addChild(emojiImg);
		
		this.emojis[row].push(emojiImg);
		this.emojiKeys[row].push(code);
	},
	
	onTouchBegan:function(loc)
	{
		
	},
	onTouchMoved:function(loc)
	{
		
	},
	onTouchEnded:function(loc)
	{cc.log(this.botRow);cc.log(this.emojis);
		var yStart = this.emojis[this.botRow][0].y-(this.emojis[this.botRow][0].height*this.emojis[this.botRow][0].scale);
		var rowTouched = Math.floor( (loc.y-yStart) / this.bubbleSize );
		cc.log("row touched: " + rowTouched);
		cc.log("loc y: " + loc.y);
		cc.log("yStart: " + yStart);
		
		rowTouched = this.botRow - rowTouched;
		if(rowTouched <= this.botRow && rowTouched >= 0)
		{cc.log(rowTouched);
			
			for(var i=0; i<this.emojis[rowTouched].length; i++)
			{
				var emoji = this.emojis[rowTouched][i];
				if(loc.x > emoji.x && loc.x < emoji.x+(emoji.width*emoji.scale))
				{cc.log("found emoji clicked!");
					this.resetPreview(rowTouched, i);
					this.curEmojiKey = this.emojiKeys[rowTouched][i];cc.log(this.curEmojiKey);
					this.parent.parent.updateContextualHelp(this.curEmojiKey);
				}
			}
		}
		else if(loc.x > this.drawOptionsLayer.x && loc.x < this.drawOptionsLayer.x+this.drawOptionsLayer.width
			&& loc.y > this.drawOptionsLayer.y && loc.y < this.drawOptionsLayer.y+this.drawOptionsLayer.height)
		{cc.log(loc);cc.log(this.drawOptionsLayer.width*this.drawOptionsLayer.scale);cc.log(this.drawOptionsLayer.x);
			this.drawOptionsLayer.onTouchEnded({x:loc.x-this.drawOptionsLayer.x, y:loc.y});//this.drawOptionsLayer.convertToNodeSpace(loc));
		}
		
	},
	
	resetPreview:function(row, col)
	{
		this.removeChild(this.prevImg);
		this.drawOptionsLayer.setOptions("", {});
		
		var code = this.emojiKeys[row][col];
		if(code == "smile")
		{
			this.prevImg = new cc.Sprite(res.smile_emoji);
			this.parent.parent.parent.editorLayer.drawType = 0;
			this.parent.parent.parent.editorLayer.drawColor = "yellow";
			this.drawOptionsLayer.setOptions("emoji", {"color":"yellow"});
		}
		else if(code == "sad")
		{
			this.prevImg = new cc.Sprite(res.sad_emoji);
			this.parent.parent.parent.editorLayer.drawType = 0;
			this.parent.parent.parent.editorLayer.drawColor = "blue";
			this.drawOptionsLayer.setOptions("emoji", {"color":"blue"});
		}
		else if(code == "angry")
		{
			this.prevImg = new cc.Sprite(res.angry_emoji);
			this.parent.parent.parent.editorLayer.drawType = 0;
			this.parent.parent.parent.editorLayer.drawColor = "red";
			this.drawOptionsLayer.setOptions("emoji", {"color":"red"});
		}
		else if(code == "alien")
		{
			this.prevImg = new cc.Sprite(res.sick_emoji);
			this.parent.parent.parent.editorLayer.drawType = 0;
			this.parent.parent.parent.editorLayer.drawColor = "green";
			this.drawOptionsLayer.setOptions("emoji", {"color":"green"});
		}
		else if(code == "soap")
		{
			this.prevImg = new cc.Sprite(res.soap_emoji);
			this.parent.parent.parent.editorLayer.drawType = 5;
			this.parent.parent.parent.editorLayer.drawColor = null;
		}
		else if(code == "wrap")
		{
			this.prevImg = new cc.Sprite(res.bubble_wrap_emoji);
			this.parent.parent.parent.editorLayer.drawType = 4;
			this.parent.parent.parent.editorLayer.drawColor = null;
		}
		else if(code == "bomb")
		{
			this.prevImg = new cc.Sprite(res.bomb_emoji);
			this.parent.parent.parent.editorLayer.drawType = 1;
			this.parent.parent.parent.editorLayer.drawColor = null;
		}
		else if(code == "die")
		{
			this.prevImg = new cc.Sprite(res.red_die_emoji);
			this.parent.parent.parent.editorLayer.drawType = 8;
			this.parent.parent.parent.editorLayer.drawColor = null;
			this.drawOptionsLayer.setOptions("emoji", {"color":"red"});
		}
		else if(code == "cloud")
		{
			this.prevImg = new cc.Sprite(res.cloud_emoji);
			this.parent.parent.parent.editorLayer.drawType = 18;
			this.parent.parent.parent.editorLayer.drawColor = null;
		}
		else if(code == "bulb")
		{
			this.prevImg = new cc.Sprite(res.red_bulb_emoji);
			this.parent.parent.parent.editorLayer.drawType = 7;
			this.parent.parent.parent.editorLayer.drawColor = ["red"];
			this.drawOptionsLayer.setOptions("emoji", {});
		}
		else if(code == "egg")
		{
			this.prevImg = new cc.Sprite(res.red_egg);
			this.parent.parent.parent.editorLayer.drawType = 22;
			this.parent.parent.parent.editorLayer.drawColor = "red";
			this.drawOptionsLayer.setOptions("emoji", {"color":"red"});
		}
		else if(code == "rocket")
		{
			this.prevImg = new cc.Sprite(res.horiz_rocket_emoji);
			this.parent.parent.parent.editorLayer.drawType = 13;
			this.parent.parent.parent.editorLayer.drawColor = null;
			this.drawOptionsLayer.setOptions("rocket", {});
		}
		else if(code == "clone")
		{
			this.prevImg = new cc.Sprite(res.neutral_orb_emoji);
			this.parent.parent.parent.editorLayer.drawType = 9;
			this.parent.parent.parent.editorLayer.drawColor = null;
			//this.drawOptionsLayer.setOptions("rocket", {});
		}
		
		
		else if(code == "snail")
		{
			this.prevImg = new cc.Sprite(res.red_snail_emoji);
			this.parent.parent.parent.editorLayer.drawType = 24;
			this.parent.parent.parent.editorLayer.drawColor = "red";
			this.drawOptionsLayer.setOptions("snail", {"color":"red", "orientation":"left"});
		}
		else if(code == "orb")
		{
			this.prevImg = new cc.Sprite(res.neutral_orb_emoji);
			this.parent.parent.parent.editorLayer.drawType = 9;
			this.parent.parent.parent.editorLayer.drawColor = null;
		}
		else if(code == "knife")
		{
			this.prevImg = new cc.Sprite(res.left_dagger_emoji);
			this.prevImg.setRotation(300);
			this.parent.parent.parent.editorLayer.drawType = 21;
			this.parent.parent.parent.editorLayer.drawColor = null;
			this.parent.parent.parent.editorLayer.drawOrientation = "downleft";
			this.drawOptionsLayer.setOptions("knife", {"orientation":"southwest"});
		}
		else if(code == "soapbar")
		{
			this.prevImg = new cc.Sprite(res.red_soapbar_emoji);
			this.parent.parent.parent.editorLayer.drawType = 17;
			this.parent.parent.parent.editorLayer.drawColor = "red";
			this.drawOptionsLayer.setOptions("emoji", {"color":"red"});
		}
		else if(code == "balloon")
		{
			this.prevImg = new cc.Sprite(res.red_balloon_emoji);
			this.parent.parent.parent.editorLayer.drawType = 19;
			this.parent.parent.parent.editorLayer.drawColor = "red";
			this.drawOptionsLayer.setOptions("emoji", {"color":"red"});
		}
		else if(code == "ghost")
		{
			this.prevImg = new cc.Sprite(res.red_ghost_emoji);
			this.parent.parent.parent.editorLayer.drawType = 27;
			this.parent.parent.parent.editorLayer.drawColor = "red";
			this.parent.parent.parent.editorLayer.drawBinary = false;
			this.drawOptionsLayer.setOptions("ghost", {"color":"red", "binary":false});
		}
		
		
		else if(code == "circle")
		{
			this.prevImg = new cc.Sprite(res.black_circle);
		}
		
		this.prevImg.setScale(this.bubbleSize / this.prevImg.height);
		this.prevImg.attr({
			x:3+(this.prevImg.width*this.prevImg.scale/2),
			y:3+(this.prevImg.height*this.prevImg.scale/2),
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.prevImg);
		
	},
	
	
	changePreview:function(code, properties)
	{cc.log(code);
		if(code == "emoji")
		{
			this.removeChild(this.prevImg);cc.log(properties);
			if(properties.color == "yellow")
			{
				this.prevImg = new cc.Sprite(res.smile_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 0;
				this.parent.parent.parent.editorLayer.drawColor = "yellow";
			}
			else if(properties.color == "blue")
			{
				this.prevImg = new cc.Sprite(res.sad_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 0;
				this.parent.parent.parent.editorLayer.drawColor = "blue";
			}
			else if(properties.color == "red")
			{
				this.prevImg = new cc.Sprite(res.angry_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 0;
				this.parent.parent.parent.editorLayer.drawColor = "red";
			}
			else if(properties.color == "green")
			{
				this.prevImg = new cc.Sprite(res.sick_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 0;
				this.parent.parent.parent.editorLayer.drawColor = "green";
			}
			
		}
		else if(code == "die")
		{
			this.removeChild(this.prevImg);cc.log(properties);
			if(properties.color == "yellow")
			{
				this.prevImg = new cc.Sprite(res.yellow_die_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 8;
				this.parent.parent.parent.editorLayer.drawColor = "yellow";
				
			}
			else if(properties.color == "blue")
			{
				this.prevImg = new cc.Sprite(res.blue_die_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 8;
				this.parent.parent.parent.editorLayer.drawColor = "blue";
			}
			else if(properties.color == "red")
			{
				this.prevImg = new cc.Sprite(res.red_die_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 8;
				this.parent.parent.parent.editorLayer.drawColor = "red";
			}
			else if(properties.color == "green")
			{
				this.prevImg = new cc.Sprite(res.green_die_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 8;
				this.parent.parent.parent.editorLayer.drawColor = "green";
			}
			
		}
		else if(code == "snail")
		{cc.log("ITS A SNAIL");
			this.removeChild(this.prevImg);cc.log(properties);
			if(properties.color == "yellow")
			{
				this.prevImg = new cc.Sprite(res.yellow_snail_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 24;
				this.parent.parent.parent.editorLayer.drawColor = "yellow";
			}
			else if(properties.color == "blue")
			{
				this.prevImg = new cc.Sprite(res.blue_snail_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 24;
				this.parent.parent.parent.editorLayer.drawColor = "blue";
			}
			else if(properties.color == "red")
			{
				this.prevImg = new cc.Sprite(res.red_snail_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 24;
				this.parent.parent.parent.editorLayer.drawColor = "red";
			}
			else if(properties.color == "green")
			{
				this.prevImg = new cc.Sprite(res.green_snail_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 24;
				this.parent.parent.parent.editorLayer.drawColor = "green";
			}
			else if(properties.direction == "left")
			{cc.log("SNAIL LEFT IMG");
				//this.prevImg = new cc.Sprite(res.green_die_emoji);
				//this.removeChild(this.prevImg);
				this.prevImg.flippedX = !this.prevImg.flippedX;
				//this.addChild(this.prevImg);
				this.parent.parent.parent.editorLayer.drawBinary = true;
			}
			else if(properties.direction == "right")
			{cc.log("SNAIL RIGHT IMG");
				//this.prevImg = new cc.Sprite(res.green_die_emoji);
				this.prevImg.flippedX = !this.prevImg.flippedX;
				this.parent.parent.parent.editorLayer.drawBinary = false;
			}
		}
		else if(code == "egg")
		{
			this.removeChild(this.prevImg);cc.log(properties);
			if(properties.color == "yellow")
			{
				this.prevImg = new cc.Sprite(res.yellow_egg);
				
				this.parent.parent.parent.editorLayer.drawType = 22;
				this.parent.parent.parent.editorLayer.drawColor = "yellow";
			}
			else if(properties.color == "blue")
			{
				this.prevImg = new cc.Sprite(res.blue_egg);
				
				this.parent.parent.parent.editorLayer.drawType = 22;
				this.parent.parent.parent.editorLayer.drawColor = "blue";
			}
			else if(properties.color == "red")
			{
				this.prevImg = new cc.Sprite(res.red_egg);
				
				this.parent.parent.parent.editorLayer.drawType = 22;
				this.parent.parent.parent.editorLayer.drawColor = "red";
			}
			else if(properties.color == "green")
			{
				this.prevImg = new cc.Sprite(res.green_egg);
				
				this.parent.parent.parent.editorLayer.drawType = 22;
				this.parent.parent.parent.editorLayer.drawColor = "green";
			}
		}
		else if(code == "soapbar")
		{
			this.removeChild(this.prevImg);cc.log(properties);
			if(properties.color == "yellow")
			{
				this.prevImg = new cc.Sprite(res.yellow_soapbar_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 17;
				this.parent.parent.parent.editorLayer.drawColor = "yellow";
			}
			else if(properties.color == "blue")
			{
				this.prevImg = new cc.Sprite(res.blue_soapbar_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 17;
				this.parent.parent.parent.editorLayer.drawColor = "blue";
			}
			else if(properties.color == "red")
			{
				this.prevImg = new cc.Sprite(res.red_soapbar_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 17;
				this.parent.parent.parent.editorLayer.drawColor = "red";
			}
			else if(properties.color == "green")
			{
				this.prevImg = new cc.Sprite(res.green_soapbar_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 17;
				this.parent.parent.parent.editorLayer.drawColor = "green";
			}
		}
		else if(code == "balloon")
		{
			this.removeChild(this.prevImg);cc.log(properties);
			if(properties.color == "yellow")
			{
				this.prevImg = new cc.Sprite(res.yellow_balloon_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 19;
				this.parent.parent.parent.editorLayer.drawColor = "yellow";
			}
			else if(properties.color == "blue")
			{
				this.prevImg = new cc.Sprite(res.blue_balloon_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 19;
				this.parent.parent.parent.editorLayer.drawColor = "blue";
			}
			else if(properties.color == "red")
			{
				this.prevImg = new cc.Sprite(res.red_balloon_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 19;
				this.parent.parent.parent.editorLayer.drawColor = "red";
			}
			else if(properties.color == "green")
			{
				this.prevImg = new cc.Sprite(res.green_balloon_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 19;
				this.parent.parent.parent.editorLayer.drawColor = "green";
			}
		}
		else if(code == "ghost")
		{
			this.removeChild(this.prevImg);cc.log(properties);
			if(properties.color == "yellow")
			{
				if(properties.binary)
					this.prevImg = new cc.Sprite(res.yellow_ghost_emoji);
				else this.prevImg = new cc.Sprite(res.yellow_ghost_off_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 27;
				this.parent.parent.parent.editorLayer.drawColor = "yellow";
				this.parent.parent.parent.editorLayer.drawBinary = properties.binary;
			}
			else if(properties.color == "blue")
			{
				if(properties.binary)
					this.prevImg = new cc.Sprite(res.blue_ghost_emoji);
				else this.prevImg = new cc.Sprite(res.blue_ghost_off_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 27;
				this.parent.parent.parent.editorLayer.drawColor = "blue";
				this.parent.parent.parent.editorLayer.drawBinary = properties.binary;
			}
			else if(properties.color == "red")
			{
				if(properties.binary)
					this.prevImg = new cc.Sprite(res.red_ghost_emoji);
				else this.prevImg = new cc.Sprite(res.red_ghost_off_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 27;
				this.parent.parent.parent.editorLayer.drawColor = "red";
				this.parent.parent.parent.editorLayer.drawBinary = properties.binary;
			}
			else if(properties.color == "green")
			{
				if(properties.binary)
					this.prevImg = new cc.Sprite(res.green_ghost_emoji);
				else this.prevImg = new cc.Sprite(res.green_ghost_off_emoji);
				
				this.parent.parent.parent.editorLayer.drawType = 27;
				this.parent.parent.parent.editorLayer.drawColor = "green";
				this.parent.parent.parent.editorLayer.drawBinary = properties.binary;
			}/*
			else if(properties.binary == true)
			{
				
			}
			else if(properties.binary == false)
			{
				
			}*/
		}
		else if(code == "knife")
		{cc.log("KNIFE OPTIONS");
			this.removeChild(this.prevImg);
			if(properties.orientation == "southwest")
			{
				this.prevImg = new cc.Sprite(res.left_dagger_emoji);
				this.prevImg.setRotation(300);
				this.parent.parent.parent.editorLayer.drawType = 21;
				this.parent.parent.parent.editorLayer.drawColor = null;
				this.parent.parent.parent.editorLayer.drawOrientation = "downleft";
			}
			else if(properties.orientation == "west")
			{
				//this.prevImg = new cc.Sprite(res.left_knife_emoji);
				this.prevImg = new cc.Sprite(res.left_dagger_emoji);
				this.prevImg.setRotation(0);
				this.parent.parent.parent.editorLayer.drawType = 21;
				this.parent.parent.parent.editorLayer.drawColor = null;
				this.parent.parent.parent.editorLayer.drawOrientation = "left";
			}
			else if(properties.orientation == "northwest")
			{
				//this.prevImg = new cc.Sprite(res.upleft_knife_emoji);
				this.prevImg = new cc.Sprite(res.left_dagger_emoji);
				this.prevImg.setRotation(60);
				this.parent.parent.parent.editorLayer.drawType = 21;
				this.parent.parent.parent.editorLayer.drawColor = null;
				this.parent.parent.parent.editorLayer.drawOrientation = "upleft";
			}
			else if(properties.orientation == "northeast")
			{
				//this.prevImg = new cc.Sprite(res.upright_knife_emoji);
				this.prevImg = new cc.Sprite(res.left_dagger_emoji);
				this.prevImg.setRotation(120);
				this.parent.parent.parent.editorLayer.drawType = 21;
				this.parent.parent.parent.editorLayer.drawColor = null;
				this.parent.parent.parent.editorLayer.drawOrientation = "upright";
			}
			else if(properties.orientation == "east")
			{
				//this.prevImg = new cc.Sprite(res.right_knife_emoji);
				this.prevImg = new cc.Sprite(res.left_dagger_emoji);
				this.prevImg.setRotation(180);
				this.parent.parent.parent.editorLayer.drawType = 21;
				this.parent.parent.parent.editorLayer.drawColor = null;
				this.parent.parent.parent.editorLayer.drawOrientation = "right";
			}
			else if(properties.orientation == "southeast")
			{
				//this.prevImg = new cc.Sprite(res.downright_knife_emoji);
				this.prevImg = new cc.Sprite(res.left_dagger_emoji);
				this.prevImg.setRotation(240);
				this.parent.parent.parent.editorLayer.drawType = 21;
				this.parent.parent.parent.editorLayer.drawColor = null;
				this.parent.parent.parent.editorLayer.drawOrientation = "downright";
			}
			
		}
		
		this.prevImg.setScale(this.bubbleSize / this.prevImg.height);
		this.prevImg.attr({
			x:3+(this.prevImg.width*this.prevImg.scale/2),
			y:3+(this.prevImg.height*this.prevImg.scale/2),
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.prevImg);
		
	},
	
	
	setOption:function(option)
	{cc.log("option: " + option);cc.log("curKey: " + this.curEmojiKey);
		if(option == "yellow")
		{
			if(this.curEmojiKey == "sad" || this.curEmojiKey == "angry" || this.curEmojiKey == "alien")
			{
				this.changePreview("emoji", {"color":"yellow"});
				this.curEmojiKey = "smile";
			}
			else if(this.curEmojiKey == "die")
			{
				this.changePreview("die", {"color":"yellow"});
			}
			else if(this.curEmojiKey == "egg")
			{
				this.changePreview("egg", {"color":"yellow"});
			}
			else if(this.curEmojiKey == "snail")
			{
				this.changePreview("snail", {"color":"yellow"});
			}
			else if(this.curEmojiKey == "soapbar")
			{
				this.changePreview("soapbar", {"color":"yellow"});
			}
			else if(this.curEmojiKey == "balloon")
			{
				this.changePreview("balloon", {"color":"yellow"});
			}
			else if(this.curEmojiKey == "ghost")
			{
				this.changePreview("ghost", {"color":"yellow", "binary":this.parent.parent.parent.editorLayer.drawBinary});
			}
			
		}
		else if(option == "blue")
		{
			if(this.curEmojiKey == "smile" || this.curEmojiKey == "angry" || this.curEmojiKey == "alien")
			{
				this.changePreview("emoji", {"color":"blue"});
				this.curEmojiKey = "sad";
			}
			else if(this.curEmojiKey == "die")
			{
				this.changePreview("die", {"color":"blue"});
				
			}
			else if(this.curEmojiKey == "snail")
			{
				this.changePreview("snail", {"color":"blue"});
			}
			else if(this.curEmojiKey == "egg")
			{
				this.changePreview("egg", {"color":"blue"});
			}
			else if(this.curEmojiKey == "snail")
			{
				this.changePreview("snail", {"color":"blue"});
			}
			else if(this.curEmojiKey == "soapbar")
			{
				this.changePreview("soapbar", {"color":"blue"});
			}
			else if(this.curEmojiKey == "balloon")
			{
				this.changePreview("balloon", {"color":"blue"});
			}
			else if(this.curEmojiKey == "ghost")
			{
				this.changePreview("ghost", {"color":"blue", "binary":this.parent.parent.parent.editorLayer.drawBinary});
			}
		}
		else if(option == "red")
		{
			if(this.curEmojiKey == "smile" || this.curEmojiKey == "sad" || this.curEmojiKey == "alien")
			{
				this.changePreview("emoji", {"color":"red"});
				this.curEmojiKey = "angry";
			}
			else if(this.curEmojiKey == "die")
			{
				this.changePreview("die", {"color":"red"});
				
			}
			else if(this.curEmojiKey == "snail")
			{
				this.changePreview("snail", {"color":"red"});
			}
			else if(this.curEmojiKey == "egg")
			{
				this.changePreview("egg", {"color":"red"});
			}
			else if(this.curEmojiKey == "snail")
			{
				this.changePreview("snail", {"color":"red"});
			}
			else if(this.curEmojiKey == "soapbar")
			{
				this.changePreview("soapbar", {"color":"red"});
			}
			else if(this.curEmojiKey == "balloon")
			{
				this.changePreview("balloon", {"color":"red"});
			}
			else if(this.curEmojiKey == "ghost")
			{
				this.changePreview("ghost", {"color":"red", "binary":this.parent.parent.parent.editorLayer.drawBinary});
			}
		}
		else if(option == "green")
		{
			if(this.curEmojiKey == "smile" || this.curEmojiKey == "sad" || this.curEmojiKey == "angry")
			{
				this.changePreview("emoji", {"color":"green"});
				this.curEmojiKey = "alien";
			}
			else if(this.curEmojiKey == "die")
			{
				this.changePreview("die", {"color":"green"});
				
			}
			else if(this.curEmojiKey == "snail")
			{
				this.changePreview("snail", {"color":"green"});
			}
			else if(this.curEmojiKey == "egg")
			{
				this.changePreview("egg", {"color":"green"});
			}
			else if(this.curEmojiKey == "snail")
			{
				this.changePreview("snail", {"color":"green"});
			}
			else if(this.curEmojiKey == "soapbar")
			{
				this.changePreview("soapbar", {"color":"green"});
			}
			else if(this.curEmojiKey == "balloon")
			{
				this.changePreview("balloon", {"color":"green"});
			}
			else if(this.curEmojiKey == "ghost")
			{
				this.changePreview("ghost", {"color":"green", "binary":this.parent.parent.parent.editorLayer.drawBinary});
			}
		}
		else if(option == "left")
		{
			if(this.curEmojiKey == "snail")
			{
				this.changePreview("snail", {"direction":"right"});
			}
		}
		else if(option == "right")
		{
			if(this.curEmojiKey == "snail")
			{
				this.changePreview("snail", {"direction":"left"});
			}
		}
		else if(option == "west")
		{
			if(this.curEmojiKey == "knife")
			{
				this.changePreview("knife",{"orientation":"northwest"});
			}
		}
		else if(option == "northwest")
		{
			if(this.curEmojiKey == "knife")
			{
				this.changePreview("knife",{"orientation":"northeast"});
			}
		}
		else if(option == "northeast")
		{
			if(this.curEmojiKey == "knife")
			{
				this.changePreview("knife",{"orientation":"east"});
			}
		}
		else if(option == "east")
		{
			if(this.curEmojiKey == "knife")
			{
				this.changePreview("knife",{"orientation":"southeast"});
			}
		}
		else if(option == "southeast")
		{
			if(this.curEmojiKey == "knife")
			{
				this.changePreview("knife",{"orientation":"southwest"});
			}
		}
		else if(option == "southwest")
		{
			if(this.curEmojiKey == "knife")
			{
				this.changePreview("knife",{"orientation":"west"});
			}
		}
		else if(option == "transparent")
		{
			if(this.curEmojiKey == "ghost")
			{
				this.changePreview("ghost",{"binary":false, "color":this.parent.parent.parent.editorLayer.drawColor});
			}
		}
		else if(option == "solid")
		{
			if(this.curEmojiKey == "ghost")
			{
				this.changePreview("ghost",{"binary":true, "color":this.parent.parent.parent.editorLayer.drawColor});
			}
		}
		else cc.log("NO MATCH FOR " + option);
	}
	
	
});