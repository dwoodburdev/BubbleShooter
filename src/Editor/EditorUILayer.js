var EditorUILayer = cc.Layer.extend({
	ctor:function(w,h){
		this._super();
		
		var size = cc.winSize;
		
        this.width = w;
        this.height = h;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.editorObstacleHighlight = null;
		
		this.editorHighlightA = null;
		this.editorHighlightB = null;
		
		
	 	this.dividerX = this.width/12*7;
	 	
		this.tabIndex = 0;
		
		this.topBulbIndex = 0;
		
		this.sidemenuMode = null;
		
		
		this.allEmojiNames = [
			["red_emoji","yellow_emoji","green_emoji","blue_emoji","pink_emoji","purple_emoji"],
			["red_ball","red_die","red_balloon","red_soapbar","red_snail"],
			["red_siren","red_lantern","red_ghost","red_note","red_egg"],
			["gray_bulb"],
			["steel","orb","poof","soap","cloud"],
			["bomb","dynamite","right_dagger","star"],
			["disco","beachball","flowerpot","spiderweb"]
		];
		
		this.curModeData = {"type":0,"color":"red","binary":null,"meta":null};
		
		this.bulbData = [
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0]
		];
		
		
		this.imgButtons = [];
		this.iconButtons = [];
		this.loadButtons();
		
		this.tabTitles = ["All", "Colored"];
		
		this.tabTitleLabel = new cc.LabelTTF("All", "Arial", 20);
		this.tabTitleLabel.attr({
			"x": this.dividerX/2,
			"y":0,
			"anchorX":.5,
			"anchorY":0
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		this.leftUpButton = new cc.Sprite(res.up_arrow);
		this.leftUpButton.setScale(size.width/12 / this.leftUpButton.width);
		this.leftUpButton.attr({
			x:this.dividerX,
			y:this.height,
			anchorX:1,
			anchorY:1
		});
		this.addChild(this.leftUpButton);
		
		this.leftDownButton = new cc.Sprite(res.down_arrow);
		this.leftDownButton.setScale(size.width/12 / this.leftDownButton.width);
		this.leftDownButton.attr({
			x:this.dividerX,
			y:this.height-(6*(size.width/12)),
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.leftDownButton);
		
		this.rightTabArrow = new cc.Sprite(res.right_arrow);
		this.rightTabArrow.setScale(size.width/12 / this.rightTabArrow.width);
		this.rightTabArrow.attr({
			x:this.dividerX,
			y:0,
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.rightTabArrow);
		
		this.leftTabArrow = new cc.Sprite(res.left_arrow);
		this.leftTabArrow.setScale(size.width/12 / this.leftTabArrow.width);
		this.leftTabArrow.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.leftTabArrow);
		
		
		this.rightUpButton = new cc.Sprite(res.up_arrow);
		this.rightUpButton.setScale(size.width/12 / this.rightUpButton.width);
		this.rightUpButton.attr({
			x:this.width,
			y:this.height,
			anchorX:1,
			anchorY:1
		});
		this.addChild(this.rightUpButton);
		
		this.rightDownButton = new cc.Sprite(res.down_arrow);
		this.rightDownButton.setScale(size.width/12 / this.rightDownButton.width);
		this.rightDownButton.attr({
			x:this.width,
			y:this.height-(6*(size.width/12)),
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.rightDownButton);
		
        this.backHomeButton = new cc.Sprite(res.quit_button);
        this.backHomeButton.setScaleX((DATA.bubbleR*5-1) / this.backHomeButton.width);
        this.backHomeButton.setScaleY(DATA.bubbleR*2 / this.backHomeButton.height)
        this.backHomeButton.attr({
        	x: this.dividerX+1,
        	y:2,
        	anchorX:0,
        	anchorY:0
        });
		this.addChild(this.backHomeButton);
		
		this.saveButton = new cc.Sprite(res.save_button);
		this.saveButton.setScaleX(DATA.bubbleR*5 / this.saveButton.width);
		this.saveButton.setScaleY(DATA.bubbleR*2 / this.saveButton.height);
		this.saveButton.attr({
			x:this.width,
			y:2,
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.saveButton);
		
		this.draw();
	},
	
	loadButtons:function()
	{
		var size = cc.winSize;
		var imgWidth = size.width/12;
		
		this.allDrawData = [];
		for(var i=0; i<this.allEmojiNames.length; i++)
		{
			for(var j=0; j<this.allEmojiNames[i].length; j++)
			{
				var bubData = this.getBubbleData(this.allEmojiNames[i][j]);
				this.allDrawData.push(bubData);
			}
		}
		
		var emojiNames = null;
		if(this.tabIndex == 0)
			emojiNames = this.allEmojiNames;
		
		for(var e=0; e<emojiNames.length; e++)
		{
			for(var i=0; i<emojiNames[e].length; i++)
			{
				var img = this.getSprite(emojiNames[e][i]);
				cc.log(emojiNames[e][i]);
				img.attr({
					x:i*imgWidth,
					y:this.height-(e*imgWidth),
					anchorX:0,
					anchorY:1
				});
				img.setScale((imgWidth)/img.width);
				this.addChild(img);
				this.imgButtons.push(img);
			}
		}
		
		this.editorObstacleHighlight = new cc.Sprite(res.thick_black_circle);
		this.editorObstacleHighlight.setScale((imgWidth)/this.editorObstacleHighlight.width);
		this.editorObstacleHighlight.attr({
			"x":-imgWidth*2,
			"y":imgWidth*2
		});
		this.addChild(this.editorObstacleHighlight);
		
	},
	clearButtons:function()
	{
		for(var i=0; i<this.imgButtons.length; i++)
			this.removeChild(this.imgButtons[i]);
			
		//this.removeChild(this.editorObstacleHighlight);
		
		this.imgButtons = [];
		//this.editorObstacleHighlight = null;
	},
	
	getIcon:function(name)
	{
		if(name == "delete")
			return new cc.Sprite(res.red_x);
	},
	
	onTouchBegin:function(pos)
	{
		
	},
	onTouchMoved:function(pos)
	{
		
	},
	onTouchEnded:function(pos)
	{
		var size = cc.winSize;
		
		// Buttons
		if(FUNCTIONS.posWithinScaled(pos, this.rightTabArrow))
		{
			this.tabIndex++;
			if(this.tabIndex > 1)
				this.tabIndex = 0;
			this.tabTitleLabel.setString(this.tabTitles[this.tabIndex]);
			
			for(var i=0; i<this.imgButtons.length; i++)
			{
				this.removeChild(this.imgButtons[i]);
			}
			this.imgButtons = [];
			this.loadButtons();
		}
		else if(FUNCTIONS.posWithinScaled(pos, this.leftTabArrow))
		{
			this.tabIndex--;
			if(this.tabIndex < 0)
				this.tabIndex = 1;
			this.tabTitleLabel.setString(this.tabTitles[this.tabIndex]);
			
			for(var i=0; i<this.imgButtons.length; i++)
			{
				this.removeChild(this.imgButtons[i]);
			}
			this.imgButtons = [];
			this.loadButtons();
		}
		else if(FUNCTIONS.posWithinScaled(pos, this.rightUpButton))
		{
			if(this.sidemenuMode == "bulb")
			{
				this.topBulbIndex = Math.max(0, this.topBulbIndex-1);
				this.resetBulbIcons();
			}
		}
		else if(FUNCTIONS.posWithinScaled(pos, this.rightDownButton))
		{
			if(this.sidemenuMode == "bulb")
			{
				this.topBulbIndex++;
				if(this.topBulbIndex+3 >= this.bulbData.length)
					this.bulbData.push([0,0,0,0,0,0]);
				
				this.resetBulbIcons();
			}
		}
		// Left Menu
		else if(pos.x < this.dividerX)
		{
			return this.leftMenuTouch(pos);
		}
		// Right Menu
		else
		{
			return this.rightMenuTouch(pos);
		}
		
	},
	
	leftMenuTouch:function(pos)
	{
		var drawIndex = null;
				
		var drawData = null;
		if(this.tabIndex == 0)
			drawData = this.allDrawData;
		
		for(var i=0; i<this.imgButtons.length && drawIndex == null; i++)
		{
			var img = this.imgButtons[i];
			if(pos.x >= img.x && pos.x <= img.x+img.width*img.scale && pos.y <= img.y && pos.y >= img.y-img.height*img.scale)
			{
				drawIndex = i;
				
				this.editorObstacleHighlight.attr({
					"x":img.x+img.width*img.scale/2,
					"y":img.y-img.height*img.scale/2
				});
			
			}
		}
		if(drawIndex == null)
			return null;
		else
		{
			this.clearRightHighlights();
			this.clearRightMenuButtons();
			this.sidemenuMode = null;
			
			var type = drawData[drawIndex].type;
			if(type == 0)
			{
				var color = drawData[drawIndex].color
				this.allEmojiNames[1] = [color+"_ball",color+"_die",color+"_balloon",color+"_soapbar",color+"_snail"];
				this.allEmojiNames[2] = [color+"_siren",color+"_lantern",color+"_ghost",color+"_note",color+"_egg"];
				this.clearButtons();
				this.loadButtons();
			}
			else if(type == 7)
			{
				this.sidemenuMode = "bulb";
				this.openBulbSidemenu();
			}
			else if(type == 26)
			{
				this.sidemenuMode = "path";
				this.openPathSidemenu();
			}
			else if(type == 8 || type == 19 || type == 17 
				|| type == 28 || type == 22 || type == 30
				 || type == 24 || type == 25 || type == 27)
			{
				this.sidemenuMode = "colorPicker";
				this.openPickerSidemenu(drawData[drawIndex]);
			}
		}
		
		this.curModeData.type = drawData[drawIndex].type;
		this.curModeData.color = drawData[drawIndex].color;
		this.curModeData.orientation = drawData[drawIndex].orientation;
		this.curModeData.binary = drawData[drawIndex].binary;
		this.curModeData.meta = drawData[drawIndex].meta;
		cc.log(this.curModeData);
		return drawData[drawIndex];
	},
	
	rightMenuTouch:function(pos)
	{
		// Buttons
		if(FUNCTIONS.posWithinScaled(pos, this.backHomeButton))
		{
			var maxRow = 0;
			for(var i=0; i<DATA.worldBubbles.length; i++)
			{
				if(DATA.worldBubbles[i].row > maxRow)
					maxRow = DATA.worldBubbles[i].row;
			}
			
			cc.director.runScene(new cc.TransitionFade(1, new MainContainerScene(DATA.worldBubbles, maxRow+1)));
			
			return null;
		}
		else if(FUNCTIONS.posWithinScaled(pos, this.saveButton))
		{
			return "save";
		}
		
		// Special Inputs touched (Functionality is Mode-Dependent)
		else
		{
			if(this.sidemenuMode == "bulb")
			{
				return this.rightMenuBulbTouch(pos);	
			}
			else if(this.sidemenuMode == "colorPicker")
			{
				return this.rightMenuColorPickerTouch(pos);
			}
			else if(this.sidemenuMode == "path")
			{
				return this.rightMenuPathTouch(pos);
			}
			
		}
	},
	
	rightMenuBulbTouch:function(pos)
	{
		var rowClicked = Math.floor((this.height-pos.y)/(DATA.bubbleR*2));
		var bulbIterClicked = Math.floor(rowClicked/2);
		if(pos.x > this.dividerX+(DATA.bubbleR*2) && pos.x < this.width-(DATA.bubbleR*2)
			&& pos.y < this.height && pos.y > DATA.bubbleR*2)
		{
			var colClicked = Math.floor((pos.x - (this.dividerX+(DATA.bubbleR*2)))/(DATA.bubbleR*2));
			var bulbIterClicked = Math.floor(rowClicked/2);
			var iterNumber = (rowClicked%2)*3 + colClicked;
			
			if(rowClicked%2 == 0)
			{
				if(this.editorHighlightA != null)
				{
					this.removeChild(this.editorHighlightA);
					this.editorHighlightA = null;
				}
			
				this.editorHighlightA = new cc.Sprite(res.thick_black_circle);
				this.editorHighlightA.setScale((DATA.bubbleR*2)/this.editorHighlightA.width);
				this.editorHighlightA.attr({
					x:this.dividerX,
					y:this.height - rowClicked*DATA.bubbleR*2,
					anchorX:0,
					anchorY:1
				});
				this.addChild(this.editorHighlightA);
				
			}
			
			this.bulbData[bulbIterClicked + this.topBulbIndex][iterNumber]++;
			if(this.bulbData[bulbIterClicked + this.topBulbIndex][iterNumber] > 6)
				this.bulbData[bulbIterClicked + this.topBulbIndex][iterNumber] = 0;
			var bulbIterNumber = bulbIterClicked*6+iterNumber;cc.log(this.bulbData);
			
			var oldBulb = this.iconButtons["input"][bulbIterNumber];
			this.removeChild(oldBulb);
			var bulbType = this.bulbData[bulbIterClicked + this.topBulbIndex][iterNumber];
			var newBulb = null;
			if(bulbType == 0)
				newBulb = new cc.Sprite(res.gray_bulb_emoji);
			else if(bulbType == 1)
				newBulb = new cc.Sprite(res.red_bulb_emoji);
			else if(bulbType == 2)
				newBulb = new cc.Sprite(res.yellow_bulb_emoji);
			else if(bulbType == 3)
				newBulb = new cc.Sprite(res.green_bulb_emoji);
			else if(bulbType == 4)
				newBulb = new cc.Sprite(res.blue_bulb_emoji);
			else if(bulbType == 5)
				newBulb = new cc.Sprite(res.pink_bulb_emoji);
			else if(bulbType == 6)
				newBulb = new cc.Sprite(res.purple_bulb_emoji);
			
			newBulb.setScale(DATA.bubbleR*2 / newBulb.width);
			newBulb.attr({
				x:oldBulb.x,
				y:oldBulb.y,
				anchorX:0,
				anchorY:1
			});
			this.addChild(newBulb);
			this.iconButtons["input"][bulbIterNumber] = newBulb;
			
			cc.log(bulbIterClicked);cc.log(this.topBulbIndex);cc.log(this.bulbData);
			
			this.curModeData.color = this.convertCodesToColors(this.bulbData[bulbIterClicked + this.topBulbIndex]);
			this.curModeData.meta = {"iteration":bulbIterClicked+this.topBulbIndex};cc.log(this.curModeData);
			return {"type":this.curModeData.type,"color":this.curModeData.color,
				"binary":this.curModeData.binary,"meta":this.curModeData.meta};
		}
		else if(pos.x < this.dividerX+(DATA.bubbleR*2) )
		{
			if(rowClicked%2 == 0)
			{
				if(this.editorHighlightA != null)
				{
					this.removeChild(this.editorHighlightA);
					this.editorHighlightA = null;
				}
			
				this.editorHighlightA = new cc.Sprite(res.thick_black_circle);
				this.editorHighlightA.setScale((DATA.bubbleR*2)/this.editorHighlightA.width);
				this.editorHighlightA.attr({
					x:this.dividerX,
					y:this.height - rowClicked*DATA.bubbleR*2,
					anchorX:0,
					anchorY:1
				});
				this.addChild(this.editorHighlightA);
				
				// return draw data or whatever
				
			}
			
			this.curModeData.color = this.convertCodesToColors(this.bulbData[bulbIterClicked + this.topBulbIndex]);
			this.curModeData.meta = {"iteration":bulbIterClicked + this.topBulbIndex};
			return {"type":this.curModeData.type,"color":this.curModeData.color,
				"binary":this.curModeData.binary,"meta":this.curModeData.meta};
			
		}
	
	},
	
	rightMenuPathTouch:function(pos)
	{
		
		if(pos.x > this.dividerX+DATA.bubbleR && pos.x < this.width-(DATA.bubbleR*3)
			&& pos.y < this.height && pos.y > this.height-(DATA.bubbleR*4))
			{
				if(this.editorHighlightA != null)
				{
					this.removeChild(this.editorHighlightA);
					this.editorHighlightA = null;
				}
				
				var rowClicked = Math.floor((this.height-pos.y)/(DATA.bubbleR*2));
				var colClicked = Math.floor((pos.x - (this.dividerX+(DATA.bubbleR*1)))/(DATA.bubbleR*2));
				cc.log(rowClicked + " "+colClicked);
				this.editorHighlightA = new cc.Sprite(res.thick_black_circle);
				this.editorHighlightA.setScale((DATA.bubbleR*2)/this.editorHighlightA.width);
				this.editorHighlightA.attr({
					x:this.dividerX+DATA.bubbleR+(colClicked*DATA.bubbleR*2),
					y:this.height - rowClicked*DATA.bubbleR*2,
					anchorX:0,
					anchorY:1
				});
				this.addChild(this.editorHighlightA);
			
				if(rowClicked == 0 && colClicked == 0)
				{
					if(this.curModeData.color == "red")
					{
						this.curModeData.color = null;
						this.removeChild(this.editorHighlightA);
						this.editorHighlightA = null;
					}
					else this.curModeData.color = "red";
				}
				else if(rowClicked == 0 && colClicked == 1)
				{
					if(this.curModeData.color == "yellow")
					{
						this.curModeData.color = null;
						this.removeChild(this.editorHighlightA);
						this.editorHighlightA = null;
					}
					else this.curModeData.color = "yellow";
				}
				else if(rowClicked == 0 && colClicked == 2)
				{
					if(this.curModeData.color == "green")
					{
						this.curModeData.color = null;
						this.removeChild(this.editorHighlightA);
						this.editorHighlightA = null;
					}
					else this.curModeData.color = "green";
				}
				else if(rowClicked == 1 && colClicked == 0)
				{
					if(this.curModeData.color == "blue")
					{
						this.curModeData.color = null;
						this.removeChild(this.editorHighlightA);
						this.editorHighlightA = null;
					}
					else this.curModeData.color = "blue";
				}
				else if(rowClicked == 1 && colClicked == 1)
				{
					if(this.curModeData.color == "pink")
					{
						this.curModeData.color = null;
						this.removeChild(this.editorHighlightA);
						this.editorHighlightA = null;
					}
					else this.curModeData.color = "pink";
				}
				else if(rowClicked == 1 && colClicked == 2)
				{
					if(this.curModeData.color == "purple")
					{
						this.curModeData.color = null;
						this.removeChild(this.editorHighlightA);
						this.editorHighlightA = null;
					}
					else this.curModeData.color = "purple";
				}
				
				//var meta = null;
				//if(this.curModeData.meta != null)
				//	meta = this.curModeData.meta;
				console.log(this.curModeData);
				return {"type":this.curModeData.type,"color":this.curModeData.color,"binary":null,"meta":this.curModeData.meta};
				
			}
			else if(pos.x > this.dividerX+DATA.bubbleR*2 && pos.x < this.width-(DATA.bubbleR*4)
			&& pos.y < this.height-(DATA.bubbleR*5) && pos.y > this.height-(DATA.bubbleR*11))
			{
				if(this.editorHighlightB != null)
				{
					this.removeChild(this.editorHighlightB);
					this.editorHighlightB = null;
				}
				
				var rowClicked = Math.floor((this.height-(DATA.bubbleR*5)-pos.y)/(DATA.bubbleR*2));
				var colClicked = Math.floor((pos.x - (this.dividerX+(DATA.bubbleR*2)))/(DATA.bubbleR*2));
				cc.log(rowClicked + " "+colClicked);
				this.editorHighlightB = new cc.Sprite(res.thick_black_circle);
				this.editorHighlightB.setScale((DATA.bubbleR*2)/this.editorHighlightB.width);
				this.editorHighlightB.attr({
					x:this.dividerX+(DATA.bubbleR*2)+(colClicked*DATA.bubbleR*2),
					y:(this.height-(DATA.bubbleR*5)) - rowClicked*(DATA.bubbleR*2),
					anchorX:0,
					anchorY:1
				});
				this.addChild(this.editorHighlightB);
			
				//this.curModeData.meta = null;
				if(rowClicked == 0 && colClicked == 0)
				{
					if(this.curModeData.meta != null && "dir" in this.curModeData.meta && this.curModeData.meta.dir == "upleft")
					{
						this.curModeData.meta.dir = null;
						this.removeChild(this.editorHighlightB);
						this.editorHighlightB = null;
					}
					else this.curModeData.meta = {dir:"upleft"};
				}
				else if(rowClicked == 0 && colClicked == 1)
				{
					if(this.curModeData.meta != null && "dir" in this.curModeData.meta && this.curModeData.meta.dir == "upright")
					{
						this.curModeData.meta.dir = null;
						this.removeChild(this.editorHighlightB);
						this.editorHighlightB = null;
					}
					else this.curModeData.meta = {dir:"upright"};
				}
				else if(rowClicked == 1 && colClicked == 0)
				{
					if(this.curModeData.meta != null && "dir" in this.curModeData.meta && this.curModeData.meta.dir == "left")
					{
						this.curModeData.meta.dir = null;
						this.removeChild(this.editorHighlightB);
						this.editorHighlightB = null;
					}
					else this.curModeData.meta = {dir:"left"};
				}
				else if(rowClicked == 1 && colClicked == 1)
				{
					if(this.curModeData.meta != null && "dir" in this.curModeData.meta && this.curModeData.meta.dir == "right")
					{
						this.curModeData.meta.dir = null;
						this.removeChild(this.editorHighlightB);
						this.editorHighlightB = null;
					}
					else this.curModeData.meta = {dir:"right"};
				}
				else if(rowClicked == 2 && colClicked == 0)
				{
					if(this.curModeData.meta != null && "dir" in this.curModeData.meta && this.curModeData.meta.dir == "downleft")
					{
						this.curModeData.meta.dir = null;
						this.removeChild(this.editorHighlightB);
						this.editorHighlightB = null;
					}
					else this.curModeData.meta = {dir:"downleft"};
				}
				else if(rowClicked == 2 && colClicked == 1)
				{
					if(this.curModeData.meta != null && "dir" in this.curModeData.meta && this.curModeData.meta.dir == "downright")
					{
						this.curModeData.meta.dir = null;
						this.removeChild(this.editorHighlightB);
						this.editorHighlightB = null;
					}
					else this.curModeData.meta = {dir:"downright"};
				}
				console.log(this.curModeData);
				return {"type":this.curModeData.type,"color":this.curModeData.color,"binary":null,"meta":{"dir":this.curModeData.meta.dir}};
			}
	},
	
	rightMenuColorPickerTouch:function(pos)
	{
		if(pos.x > this.dividerX+DATA.bubbleR && pos.x < this.width-(DATA.bubbleR*3)
			&& pos.y < this.height && pos.y > this.height-(DATA.bubbleR*4))
		{
			if(this.editorHighlightA != null)
			{
				this.removeChild(this.editorHighlightA);
				this.editorHighlightA = null;
			}
			
			var rowClicked = Math.floor((this.height-pos.y)/(DATA.bubbleR*2));
			var colClicked = Math.floor((pos.x - (this.dividerX+(DATA.bubbleR*1)))/(DATA.bubbleR*2));
			cc.log(rowClicked + " "+colClicked);
			this.editorHighlightA = new cc.Sprite(res.thick_black_circle);
			this.editorHighlightA.setScale((DATA.bubbleR*2)/this.editorHighlightA.width);
			this.editorHighlightA.attr({
				x:this.dividerX+DATA.bubbleR+(colClicked*DATA.bubbleR*2),
				y:this.height - rowClicked*DATA.bubbleR*2,
				anchorX:0,
				anchorY:1
			});
			this.addChild(this.editorHighlightA);
		
			if(rowClicked == 0 && colClicked == 0)
			{
				this.curModeData.color = "red";
				return {"type":this.curModeData.type,"color":"red","binary":this.curModeData.binary,"meta":null};
			}
			else if(rowClicked == 0 && colClicked == 1)
			{
				this.curModeData.color = "yellow";
				return {"type":this.curModeData.type,"color":"yellow","binary":this.curModeData.binary,"meta":null};
			}
			else if(rowClicked == 0 && colClicked == 2)
			{
				this.curModeData.color = "green";
				return {"type":this.curModeData.type,"color":"green","binary":this.curModeData.binary,"meta":null};
			}
			else if(rowClicked == 1 && colClicked == 0)
			{
				this.curModeData.color = "blue";
				return {"type":this.curModeData.type,"color":"blue","binary":this.curModeData.binary,"meta":null};
			}
			else if(rowClicked == 1 && colClicked == 1)
			{
				this.curModeData.color = "pink";
				return {"type":this.curModeData.type,"color":"pink","binary":this.curModeData.binary,"meta":null};
			}
			else if(rowClicked == 1 && colClicked == 2)
			{
				this.curModeData.color = "purple";
				return {"type":this.curModeData.type,"color":"purple","binary":this.curModeData.binary,"meta":null};
			}
		}
		else if(pos.x > this.dividerX+(DATA.bubbleR*2) && pos.x < this.dividerX+(DATA.bubbleR*6)
			&& pos.y < this.height-(DATA.bubbleR*5) && pos.y > this.height-(DATA.bubbleR*7))
		{
			if(this.editorHighlightB != null)
			{
				this.removeChild(this.editorHighlightB);
				this.editorHighlightB = null;
			}
			
			var colClicked = Math.floor((pos.x - (this.dividerX+(DATA.bubbleR*2)))/(DATA.bubbleR*2));
			
			this.editorHighlightB = new cc.Sprite(res.thick_black_circle);
			this.editorHighlightB.setScale((DATA.bubbleR*2)/this.editorHighlightB.width);
			this.editorHighlightB.attr({
				x:this.dividerX+(DATA.bubbleR*2)+(colClicked*DATA.bubbleR*2),
				y:this.height - (DATA.bubbleR*5),
				anchorX:0,
				anchorY:1
			});
			this.addChild(this.editorHighlightB);
			
			if(colClicked == 0)
			{
				this.curModeData.binary = true
				return {"type":this.curModeData.type,"color":this.curModeData.color,
				"binary":this.curModeData.binary,"meta":null};
			}
			if(colClicked == 1)
			{
				this.curModeData.binary = false;
				return {"type":this.curModeData.type,"color":this.curModeData.color,
				"binary":this.curModeData.binary,"meta":null};
			}
		}
	},
	
	resetBulbIcons:function()
	{cc.log("resetBulbIcons");
		this.clearRightMenuButtons();
		this.iconButtons["header"] = [];
		this.iconButtons["input"] = [];
		
		for(var i=0; i<3; i++)
		{
			var headBulb = new cc.Sprite(res.gray_bulb_emoji);
			headBulb.setScale(DATA.bubbleR*2 / headBulb.width);
			headBulb.attr({
				x:this.dividerX,
				y:this.height-(i*DATA.bubbleR*4),
				anchorX:0,
				anchorY:1
			});
			this.addChild(headBulb);
			this.iconButtons["header"].push(headBulb);
			for(var j=0; j<6; j++)
			{
				var xOff = Math.floor(j/3)*(-1*DATA.bubbleR*6) + j*(DATA.bubbleR*2);
				var yOff = Math.floor(j/3)*(DATA.bubbleR*2);
				
				var inputBulb = null;
				if(this.bulbData[i+this.topBulbIndex][j] == 0)
					inputBulb = new cc.Sprite(res.gray_bulb_emoji);
				else if(this.bulbData[i+this.topBulbIndex][j] == 1)
					inputBulb = new cc.Sprite(res.red_bulb_emoji);
				else if(this.bulbData[i+this.topBulbIndex][j] == 2)
					inputBulb = new cc.Sprite(res.yellow_bulb_emoji);
				else if(this.bulbData[i+this.topBulbIndex][j] == 3)
					inputBulb = new cc.Sprite(res.green_bulb_emoji);
				else if(this.bulbData[i+this.topBulbIndex][j] == 4)
					inputBulb = new cc.Sprite(res.blue_bulb_emoji);
				else if(this.bulbData[i+this.topBulbIndex][j] == 5)
					inputBulb = new cc.Sprite(res.pink_bulb_emoji);
				else if(this.bulbData[i+this.topBulbIndex][j] == 6)
					inputBulb = new cc.Sprite(res.purple_bulb_emoji);
				
				
				
				inputBulb.setScale(DATA.bubbleR*2 / inputBulb.width);
				inputBulb.attr({
					x:this.dividerX+DATA.bubbleR*2+xOff,
					y:this.height-(i*DATA.bubbleR*4)-yOff,
					anchorX:0,
					anchorY:1
				});
				this.addChild(inputBulb);
				this.iconButtons["input"].push(inputBulb);
			}
		}
	},
	
	openBulbSidemenu:function()
	{
		//this.sidemenuMode == "bulb"
		
		this.iconButtons["input"] = [];
		this.iconButtons["header"] = [];
		
		for(var i=0; i<3; i++)
		{
			var headBulb = new cc.Sprite(res.gray_bulb_emoji);
			headBulb.setScale(DATA.bubbleR*2 / headBulb.width);
			headBulb.attr({
				x:this.dividerX,
				y:this.height-(i*DATA.bubbleR*4),
				anchorX:0,
				anchorY:1
			});
			this.addChild(headBulb);
			this.iconButtons["header"].push(headBulb);
			for(var j=0; j<6; j++)
			{
				var xOff = Math.floor(j/3)*(-1*DATA.bubbleR*6) + j*(DATA.bubbleR*2);
				var yOff = Math.floor(j/3)*(DATA.bubbleR*2);
				
				var inputBulb = null;
				if(this.bulbData[i][j] == 0)
					inputBulb = new cc.Sprite(res.gray_bulb_emoji);
				else if(this.bulbData[i][j] == 1)
					inputBulb = new cc.Sprite(res.red_bulb_emoji);
				else if(this.bulbData[i][j] == 2)
					inputBulb = new cc.Sprite(res.yellow_bulb_emoji);
				else if(this.bulbData[i][j] == 3)
					inputBulb = new cc.Sprite(res.green_bulb_emoji);
				else if(this.bulbData[i][j] == 4)
					inputBulb = new cc.Sprite(res.blue_bulb_emoji);
				else if(this.bulbData[i][j] == 5)
					inputBulb = new cc.Sprite(res.pink_bulb_emoji);
				else if(this.bulbData[i][j] == 6)
					inputBulb = new cc.Sprite(res.purple_bulb_emoji);
				
				
				
				inputBulb.setScale(DATA.bubbleR*2 / inputBulb.width);
				inputBulb.attr({
					x:this.dividerX+DATA.bubbleR*2+xOff,
					y:this.height-(i*DATA.bubbleR*4)-yOff,
					anchorX:0,
					anchorY:1
				});
				this.addChild(inputBulb);
				this.iconButtons["input"].push(inputBulb);
			}
		}
		this.draw();
	},
	
	openPathSidemenu:function()
	{
		var pathSpriteNames = ["upleft_dir","upright_dir","left_dir","right_dir","downleft_dir","downright_dir"];
		var colorSpriteNames = ["red_lantern","yellow_lantern","green_lantern","blue_lantern","pink_lantern","purple_lantern"];
		
		
		this.iconButtons["colors"] = [];
		for(var i=0; i<colorSpriteNames.length; i++)
		{
			var xOff = i*(DATA.bubbleR*2) - Math.floor(i/3)*(DATA.bubbleR*6);
			var yOff = Math.floor(i/3)*DATA.bubbleR*2;
			
			var colorSprite = this.getSprite(colorSpriteNames[i]);
			colorSprite.setScale(DATA.bubbleR*2 / colorSprite.width);
			colorSprite.attr({
				x:this.dividerX+DATA.bubbleR + xOff,
				y:this.height-(DATA.bubbleR*2)-yOff,
				anchorX:0,
				anchorY:0
			});
			this.addChild(colorSprite);
			this.iconButtons["colors"].push(colorSprite);
		}
		
		this.iconButtons["path"] = [];
		for(var i=0; i<pathSpriteNames.length; i++)
		{
			var xOff = i*(DATA.bubbleR*2) - Math.floor(i/2)*(DATA.bubbleR*4);
			var yOff = Math.floor(i/2)*DATA.bubbleR*2;
			
			var pathSprite = this.getSprite(pathSpriteNames[i]);
			pathSprite.setScale(DATA.bubbleR*2 / pathSprite.width);
			pathSprite.attr({
				x:this.dividerX+(DATA.bubbleR*2) + xOff,
				y:this.height-(DATA.bubbleR*7)-yOff,
				anchorX:0,
				anchorY:0
			});
			this.addChild(pathSprite);
			this.iconButtons["path"].push(pathSprite);
		}
		
		
		this.draw();
	},
	
	openPickerSidemenu:function(bubData)
	{
		var ballNames = ["red_ball","yellow_ball","green_ball","blue_ball","pink_ball","purple_ball"];
		var dieNames = ["red_die","yellow_die","green_die","blue_die","pink_die","purple_die"];
		var balloonNames = ["red_balloon","yellow_balloon","green_balloon","blue_balloon","pink_balloon","purple_balloon"];
		var soapbarNames = ["red_soapbar","yellow_soapbar","green_soapbar","blue_soapbar","pink_soapbar","purple_soapbar"];
		var noteNames = ["red_note","yellow_note","green_note","blue_note","pink_note","purple_note"];
		var eggNames = ["red_egg","yellow_egg","green_egg","blue_egg","pink_egg","purple_egg"];
		var snailNames = ["red_snail","yellow_snail","green_snail","blue_snail","pink_snail","purple_snail"];
		var sirenNames = ["red_siren","yellow_siren","green_siren","blue_siren","pink_siren","purple_siren"];
		var ghostNames = ["red_ghost","yellow_ghost","green_ghost","blue_ghost","pink_ghost","purple_ghost"];
		var snailBinaryNames = {"red":["red_snail","red_snail_right"],
								"yellow":["yellow_snail","yellow_snail_right"],
								"green":["green_snail","green_snail_right"],
								"blue":["blue_snail","blue_snail_right"],
								"pink":["pink_snail","pink_snail_right"],
								"purple":["purple_snail","purple_snail_right"]};
		var sirenBinaryNames = {"red":["red_siren","red_siren_off"],
								"yellow":["yellow_siren","yellow_siren_off"],
								"green":["green_siren","green_siren_off"],
								"blue":["blue_siren","blue_siren_off"],
								"pink":["pink_siren","pink_siren_off"],
								"purple":["purple_siren","purple_siren_off"]};
		var ghostBinaryNames = {"red":["red_ghost","red_ghost_off"],
								"yellow":["yellow_ghost","yellow_ghost_off"],
								"green":["green_ghost","green_ghost_off"],
								"blue":["blue_ghost","blue_ghost_off"],
								"pink":["pink_ghost","pink_ghost_off"],
								"purple":["purple_ghost","purple_ghost_off"]};
		
		var type = bubData.type;
		
		var colorSpriteNames = [];
		var binarySpriteNames = [];
		if(type == 8)
			colorSpriteNames = dieNames;
		else if(type == 17)
			colorSpriteNames = soapbarNames;
		else if(type == 19)
			colorSpriteNames = balloonNames;
		else if(type == 22)
			colorSpriteNames = eggNames;
		else if(type == 28)
			colorSpriteNames = noteNames;
		else if(type == 30)
			colorSpriteNames = ballNames;
		else if(type == 24)
		{
			var color = bubData.color;
			colorSpriteNames = snailNames;
			binarySpriteNames = snailBinaryNames[color];
		}
		else if(type == 25)
		{
			var color = bubData.color;
			colorSpriteNames = sirenNames;
			binarySpriteNames = sirenBinaryNames[color];
		}
		else if(type == 27)
		{
			var color = bubData.color;
			colorSpriteNames = ghostNames;
			binarySpriteNames = ghostBinaryNames[color];
		}
		
		
		this.iconButtons["colors"] = [];
		for(var i=0; i<colorSpriteNames.length; i++)
		{
			var xOff = i*(DATA.bubbleR*2) - Math.floor(i/3)*(DATA.bubbleR*6);
			var yOff = Math.floor(i/3)*DATA.bubbleR*2;
			
			var colorSprite = this.getSprite(colorSpriteNames[i]);
			colorSprite.setScale(DATA.bubbleR*2 / colorSprite.width);
			colorSprite.attr({
				x:this.dividerX+DATA.bubbleR + xOff,
				y:this.height-(DATA.bubbleR*2)-yOff,
				anchorX:0,
				anchorY:0
			});
			this.addChild(colorSprite);
			this.iconButtons["colors"].push(colorSprite);
		}
		
		this.iconButtons["binary"] = [];
		for(var i=0; i<binarySpriteNames.length; i++)
		{
			
			var binSprite = this.getSprite(binarySpriteNames[i]);
			binSprite.setScale(DATA.bubbleR*2 / binSprite.width);
			binSprite.attr({
				x:this.dividerX+(DATA.bubbleR*2)+i*(DATA.bubbleR*2),
				y:this.height-(DATA.bubbleR*7),
				anchorX:0,
				anchorY:0
			});
			this.addChild(binSprite);
			this.iconButtons["binary"].push(binSprite);
		}
		
		
		this.draw();
	},
	
	
	
	// Data Functions
	
	
	
	
	draw:function(){
		
		this.dn.drawRect(cc.p(0,this.y),cc.p(this.dividerX, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.dividerX,this.y),cc.p(this.width, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(0,0),cc.p(this.dividerX, this.rightTabArrow.y+(this.rightTabArrow.height*this.rightTabArrow.scale)), 
						cc.color(255,255,255,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.dividerX-this.width/12, this.rightTabArrow.y+(this.rightTabArrow.height*this.rightTabArrow.scale)),
						cc.p(this.dividerX, this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
						
		this.dn.drawRect(cc.p(this.width-(DATA.bubbleR*2), DATA.bubbleR*2),
						cc.p(this.width, this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		if(this.sidemenuMode=="bulb")
		{
			this.dn.drawRect(cc.p(this.dividerX+DATA.bubbleR*2, DATA.bubbleR*2),cc.p(this.dividerX+DATA.bubbleR*2, this.height),
						cc.color(255,255,255,255),1,cc.color(0,0,0,255));
						
			this.dn.drawRect(cc.p(this.dividerX, DATA.bubbleR*6),cc.p(this.width-DATA.bubbleR*2, DATA.bubbleR*6),
						cc.color(255,255,255,255),1,cc.color(0,0,0,255));
			this.dn.drawRect(cc.p(this.dividerX, DATA.bubbleR*10),cc.p(this.width-DATA.bubbleR*2, DATA.bubbleR*10),
						cc.color(255,255,255,255),1,cc.color(0,0,0,255));
			
		}
		else if(this.sidemenuMode=="colorPicker")
		{
			
		}
	},
	
	clearRightMenuButtons:function()
	{
		//this.sidemenuMode = null;
		
		var iconKeys = Object.keys(this.iconButtons);
		for(var i=0; i<iconKeys.length; i++)
		{
			for(var j=0; j<this.iconButtons[iconKeys[i]].length; j++)
			{
				this.removeChild(this.iconButtons[iconKeys[i]][j]);
			}
		}
		this.iconButtons = {};
	},
	
	clearHighlights:function()
	{
		if(this.editorObstacleHighlight != null)
		{
			this.removeChild(this.editorHighlightA);
			this.editorHighlightA = null;
		}
		this.clearRightHighlights();
	},
	clearRightHighlights:function()
	{
		if(this.editorHighlightA != null)
		{
			this.removeChild(this.editorHighlightA);
			this.editorHighlightA = null;
		}
		if(this.editorHighlightB != null)
		{
			this.removeChild(this.editorHighlightB);
			this.editorHighlightB = null;
		}
	},
	
	convertCodesToColors:function(colorSeq)
	{cc.log(colorSeq);
		var returnArray = [];
		for(var i=0; i<colorSeq.length && colorSeq[i] != 0; i++)
		{
			var newColor = null;
			if(colorSeq[i] == 1)
				newColor = "red";
			else if(colorSeq[i] == 2)
				newColor = "yellow";
			else if(colorSeq[i] == 3)
				newColor = "green";
			else if(colorSeq[i] == 4)
				newColor = "blue";
			else if(colorSeq[i] == 5)
				newColor = "pink";
			else if(colorSeq[i] == 6)
				newColor = "purple";
			
			returnArray.push(newColor);
		}
		return returnArray;
	},
	
	getSprite:function(name)
	{
		if(name == "red_emoji")
			return new cc.Sprite(res.angry_emoji);
		else if(name == "orange_emoji")
			return new cc.Sprite(res.cat_emoji);	
		else if(name == "yellow_emoji")
			return new cc.Sprite(res.smile_emoji);
		else if(name == "green_emoji")
			return new cc.Sprite(res.sick_emoji);
		else if(name == "lightblue_emoji")
			return new cc.Sprite(res.cold_emoji);
		else if(name == "blue_emoji")
			return new cc.Sprite(res.sad_emoji);
		else if(name == "pink_emoji")
			return new cc.Sprite(res.love_emoji);
		else if(name == "purple_emoji")
			return new cc.Sprite(res.evil_emoji);
		
		else if(name == "red_ball")
			return new cc.Sprite(res.red_ball);
		else if(name == "orange_ball")
			return new cc.Sprite(res.orange_ball);	
		else if(name == "yellow_ball")
			return new cc.Sprite(res.yellow_ball);
		else if(name == "green_ball")
			return new cc.Sprite(res.green_ball);
		else if(name == "lightblue_ball")
			return new cc.Sprite(res.lightblue_ball);
		else if(name == "blue_ball")
			return new cc.Sprite(res.blue_ball);
		else if(name == "pink_ball")
			return new cc.Sprite(res.pink_ball);
		else if(name == "purple_ball")
			return new cc.Sprite(res.purple_ball);				
			
		else if(name == "red_die")
			return new cc.Sprite(res.red_die_emoji);
		else if(name == "orange_die")
			return new cc.Sprite(res.orange_die_emoji);
		else if(name == "yellow_die")
			return new cc.Sprite(res.yellow_die_emoji);
		else if(name == "green_die")
			return new cc.Sprite(res.green_die_emoji);
		else if(name == "blue_die")
			return new cc.Sprite(res.blue_die_emoji);
		else if(name == "pink_die")
			return new cc.Sprite(res.pink_die_emoji);
		else if(name == "purple_die")
			return new cc.Sprite(res.purple_die_emoji);
			
		else if(name == "red_bulb")
			return new cc.Sprite(res.red_bulb_emoji);
		else if(name == "orange_bulb")
			return new cc.Sprite(res.orange_bulb_emoji);
		else if(name == "yellow_bulb")
			return new cc.Sprite(res.yellow_bulb_emoji);
		else if(name == "green_bulb")
			return new cc.Sprite(res.green_bulb_emoji);
		else if(name == "lightblue_bulb")
			return new cc.Sprite(res.lightblue_bulb_emoji);
		else if(name == "blue_bulb")
			return new cc.Sprite(res.blue_bulb_emoji);
		else if(name == "pink_bulb")
			return new cc.Sprite(res.pink_bulb_emoji);
		else if(name == "purple_bulb")
			return new cc.Sprite(res.purple_bulb_emoji);
		else if(name == "gray_bulb")
			return new cc.Sprite(res.gray_bulb_emoji);
			
		else if(name == "red_balloon")
			return new cc.Sprite(res.red_balloon_emoji);
		else if(name == "orange_balloon")
			return new cc.Sprite(res.orange_balloon_emoji);
		else if(name == "yellow_balloon")
			return new cc.Sprite(res.yellow_balloon_emoji);
		else if(name == "green_balloon")
			return new cc.Sprite(res.green_balloon_emoji);
		else if(name == "blue_balloon")
			return new cc.Sprite(res.blue_balloon_emoji);
		else if(name == "pink_balloon")
			return new cc.Sprite(res.pink_balloon_emoji);
		else if(name == "purple_balloon")
			return new cc.Sprite(res.purple_balloon_emoji);
			
		else if(name == "red_soapbar")
			return new cc.Sprite(res.red_soapbar_emoji);
		else if(name == "orange_soapbar")
			return new cc.Sprite(res.orange_soapbar_emoji);
		else if(name == "yellow_soapbar")
			return new cc.Sprite(res.yellow_soapbar_emoji);
		else if(name == "green_soapbar")
			return new cc.Sprite(res.green_soapbar_emoji);
		else if(name == "blue_soapbar")
			return new cc.Sprite(res.blue_soapbar_emoji);
		else if(name == "pink_soapbar")
			return new cc.Sprite(res.pink_soapbar_emoji);
		else if(name == "purple_soapbar")
			return new cc.Sprite(res.purple_soapbar_emoji);
			
		else if(name == "steel")
			return new cc.Sprite(res.anvil_emoji);
		else if(name == "rock")
			return new cc.Sprite(res.jawbreaker_emoji);
		//else if(name == "spike")
		//	return new cc.Sprite(res.spike_emoji);
		else if(name == "orb")
			return new cc.Sprite(res.neutral_orb_emoji);
			
		else if(name == "poof")
			return new cc.Sprite(res.cd_emoji)
		else if(name == "soap")
			return new cc.Sprite(res.soap_emoji);
		else if(name == "cloud")
			return new cc.Sprite(res.cloud_emoji);
		else if(name == "spiderweb")
			return new cc.Sprite(res.spiderweb_emoji);
		
		else if(name == "bomb")
			return new cc.Sprite(res.bomb_emoji);
		else if(name == "large_bomb")
			return new cc.Sprite(res.large_bomb_emoji);
		else if(name == "dynamite")
			return new cc.Sprite(res.dynamite_1_emoji);
		else if(name == "star")
			return new cc.Sprite(res.star_emoji);
			
		else if(name == "upright_dagger")
			return new cc.Sprite(res.upright_dagger_emoji);
		else if(name == "right_dagger")
			return new cc.Sprite(res.right_dagger_emoji);
		else if(name == "downright_dagger")
			return new cc.Sprite(res.downright_dagger_emoji);
		else if(name == "downleft_dagger")
			return new cc.Sprite(res.downleft_dagger_emoji);
		else if(name == "left_dagger")
			return new cc.Sprite(res.left_dagger_emoji);
		else if(name == "upleft_dagger")
			return new cc.Sprite(res.upleft_dagger_emoji);
		
			
		else if(name == "disco")
			return new cc.Sprite(res.disco_emoji);
		else if(name == "beachball")
			return new cc.Sprite(res.beachball_emoji);
		else if(name == "flowerpot")
			return new cc.Sprite(res.neutral_flowerpot_emoji);
		
		else if(name == "red_chick")
			return new cc.Sprite(res.red_chick_emoji);
		else if(name == "orange_chick")
			return new cc.Sprite(res.orange_chick_emoji);
		else if(name == "yellow_chick")
			return new cc.Sprite(res.yellow_chick_emoji);
		else if(name == "green_chick")
			return new cc.Sprite(res.green_chick_emoji);
		else if(name == "lightblue_chick")
			return new cc.Sprite(res.lightblue_chick_emoji);
		else if(name == "blue_chick")
			return new cc.Sprite(res.blue_chick_emoji);
		else if(name == "pink_chick")
			return new cc.Sprite(res.pink_chick_emoji);
		else if(name == "purple_chick")
			return new cc.Sprite(res.purple_chick_emoji);
		
		else if(name == "red_snail")
			return new cc.Sprite(res.red_snail_emoji);
		else if(name == "orange_snail")
			return new cc.Sprite(res.orange_snail_emoji);
		else if(name == "yellow_snail")
			return new cc.Sprite(res.yellow_snail_emoji);
		else if(name == "green_snail")
			return new cc.Sprite(res.green_snail_emoji);
		else if(name == "lightblue_snail")
			return new cc.Sprite(res.lightblue_snail_emoji);
		else if(name == "blue_snail")
			return new cc.Sprite(res.blue_snail_emoji);
		else if(name == "pink_snail")
			return new cc.Sprite(res.pink_snail_emoji);
		else if(name == "purple_snail")
			return new cc.Sprite(res.purple_snail_emoji);
			
		else if(name == "red_snail_right")
			return new cc.Sprite(res.red_snail_right_emoji);
		else if(name == "yellow_snail_right")
			return new cc.Sprite(res.yellow_snail_right_emoji);
		else if(name == "green_snail_right")
			return new cc.Sprite(res.green_snail_right_emoji);
		else if(name == "blue_snail_right")
			return new cc.Sprite(res.blue_snail_right_emoji);
		else if(name == "pink_snail_right")
			return new cc.Sprite(res.pink_snail_right_emoji);
		else if(name == "purple_snail_right")
			return new cc.Sprite(res.purple_snail_right_emoji);
		
		else if(name == "red_siren")
			return new cc.Sprite(res.red_siren_emoji);
		else if(name == "yellow_siren")
			return new cc.Sprite(res.yellow_siren_emoji);
		else if(name == "green_siren")
			return new cc.Sprite(res.green_siren_emoji);
		else if(name == "blue_siren")
			return new cc.Sprite(res.blue_siren_emoji);
		else if(name == "pink_siren")
			return new cc.Sprite(res.pink_siren_emoji);
		else if(name == "purple_siren")
			return new cc.Sprite(res.purple_siren_emoji);
		
		else if(name == "red_siren_off")
			return new cc.Sprite(res.red_siren_off_emoji);
		else if(name == "yellow_siren_off")
			return new cc.Sprite(res.yellow_siren_off_emoji);
		else if(name == "green_siren_off")
			return new cc.Sprite(res.green_siren_off_emoji);
		else if(name == "blue_siren_off")
			return new cc.Sprite(res.blue_siren_off_emoji);
		else if(name == "pink_siren_off")
			return new cc.Sprite(res.pink_siren_off_emoji);
		else if(name == "purple_siren_off")
			return new cc.Sprite(res.purple_siren_off_emoji);
		
		
		else if(name == "red_lantern")
			return new cc.Sprite(res.red_lantern_emoji);
		else if(name == "orange_lantern")
			return new cc.Sprite(res.orange_lantern_emoji);
		else if(name == "yellow_lantern")
			return new cc.Sprite(res.yellow_lantern_emoji);
		else if(name == "green_lantern")
			return new cc.Sprite(res.green_lantern_emoji);
		else if(name == "lightblue_lantern")
			return new cc.Sprite(res.lightblue_lantern_emoji);
		else if(name == "blue_lantern")
			return new cc.Sprite(res.blue_lantern_emoji);
		else if(name == "pink_lantern")
			return new cc.Sprite(res.pink_lantern_emoji);
		else if(name == "purple_lantern")
			return new cc.Sprite(res.purple_lantern_emoji);
			
		else if(name == "upright_dir")
			return new cc.Sprite(res.upright_path_dir);
		else if(name == "right_dir")
			return new cc.Sprite(res.right_path_dir);
		else if(name == "downright_dir")
			return new cc.Sprite(res.downright_path_dir);
		else if(name == "downleft_dir")
			return new cc.Sprite(res.downleft_path_dir);
		else if(name == "left_dir")
			return new cc.Sprite(res.left_path_dir);
		else if(name == "upleft_dir")
			return new cc.Sprite(res.upleft_path_dir);
		
			
		else if(name == "red_ghost")
			return new cc.Sprite(res.red_ghost_emoji);
		else if(name == "yellow_ghost")
			return new cc.Sprite(res.yellow_ghost_emoji);
		else if(name == "green_ghost")
			return new cc.Sprite(res.green_ghost_emoji);
		else if(name == "blue_ghost")
			return new cc.Sprite(res.blue_ghost_emoji);
		else if(name == "pink_ghost")
			return new cc.Sprite(res.pink_ghost_emoji);
		else if(name == "purple_ghost")
			return new cc.Sprite(res.purple_ghost_emoji);
			
		else if(name == "red_ghost_off")
			return new cc.Sprite(res.red_ghost_off_emoji);
		else if(name == "yellow_ghost_off")
			return new cc.Sprite(res.yellow_ghost_off_emoji);
		else if(name == "green_ghost_off")
			return new cc.Sprite(res.green_ghost_off_emoji);
		else if(name == "blue_ghost_off")
			return new cc.Sprite(res.blue_ghost_off_emoji);
		else if(name == "pink_ghost_off")
			return new cc.Sprite(res.pink_ghost_off_emoji);
		else if(name == "purple_ghost_off")
			return new cc.Sprite(res.purple_ghost_off_emoji);
			
		else if(name == "red_note")
			return new cc.Sprite(res.red_note_emoji);
		else if(name == "orange_note")
			return new cc.Sprite(res.orange_note_emoji);
		else if(name == "yellow_note")
			return new cc.Sprite(res.yellow_note_emoji);
		else if(name == "green_note")
			return new cc.Sprite(res.green_note_emoji);
		else if(name == "lightblue_note")
			return new cc.Sprite(res.lightblue_note_emoji);
		else if(name == "blue_note")
			return new cc.Sprite(res.blue_note_emoji);
		else if(name == "pink_note")
			return new cc.Sprite(res.pink_note_emoji);
		else if(name == "purple_note")
			return new cc.Sprite(res.purple_note_emoji);
		
		else if(name == "egg")
			return new cc.Sprite(res.egg_emoji);
		else if(name == "red_egg")
			return new cc.Sprite(res.red_egg);
		else if(name == "orange_egg")
			return new cc.Sprite(res.orange_egg);
		else if(name == "yellow_egg")
			return new cc.Sprite(res.yellow_egg);
		else if(name == "green_egg")
			return new cc.Sprite(res.green_egg);
		else if(name == "lightblue_egg")
			return new cc.Sprite(res.lightblue_egg);
		else if(name == "blue_egg")
			return new cc.Sprite(res.blue_egg);
		else if(name == "pink_egg")
			return new cc.Sprite(res.pink_egg);
		else if(name == "purple_egg")
			return new cc.Sprite(res.purple_egg);
		
	},
	
	getBubbleData:function(name)
	{
		if(name == "red_emoji")
			return {"type":0,"color":"red"};
		else if(name == "orange_emoji")
			return {"type":0,"color":"orange"};
		else if(name == "yellow_emoji")
			return {"type":0,"color":"yellow"};
		else if(name == "green_emoji")
			return {"type":0,"color":"green"};
		else if(name == "lightblue_emoji")
			return {"type":0,"color":"lightblue"};
		else if(name == "blue_emoji")
			return {"type":0,"color":"blue"};
		else if(name == "pink_emoji")
			return {"type":0,"color":"pink"};
		else if(name == "purple_emoji")
			return {"type":0,"color":"purple"};
		
		else if(name == "red_ball")
			return {"type":30,"color":"red"};
		else if(name == "orange_ball")
			return {"type":30,"color":"orange"};
		else if(name == "yellow_ball")
			return {"type":30,"color":"yellow"};
		else if(name == "green_ball")
			return {"type":30,"color":"green"};
		else if(name == "lightblue_ball")
			return {"type":30,"color":"lightblue"};
		else if(name == "blue_ball")
			return {"type":30,"color":"blue"};
		else if(name == "pink_ball")
			return {"type":30,"color":"pink"};
		else if(name == "purple_ball")
			return {"type":30,"color":"purple"};	
			
		else if(name == "red_die")
			return {"type":8,"color":"red"};
		else if(name == "orange_die")
			return {"type":8,"color":"orange"};
		else if(name == "yellow_die")
			return {"type":8,"color":"yellow"};
		else if(name == "green_die")
			return {"type":8,"color":"green"};
		else if(name == "lightblue_die")
			return {"type":8,"color":"lightblue"};
		else if(name == "blue_die")
			return {"type":8,"color":"blue"};
		else if(name == "pink_die")
			return {"type":8,"color":"pink"};
		else if(name == "purple_die")
			return {"type":8,"color":"purple"};
			
		else if(name == "red_bulb")
			return {"type":7,"color":"red"};
		else if(name == "orange_bulb")
			return {"type":7,"color":"orange"};
		else if(name == "yellow_bulb")
			return {"type":7,"color":"yellow"};
		else if(name == "green_bulb")
			return {"type":7,"color":"green"};
		else if(name == "lightblue_bulb")
			return {"type":7,"color":"lightblue"};
		else if(name == "blue_bulb")
			return {"type":7,"color":"blue"};
		else if(name == "pink_bulb")
			return {"type":7,"color":"pink"};
		else if(name == "purple_bulb")
			return {"type":7,"color":"purple"};
		else if(name == "gray_bulb")
			return {"type":7,"color":null};
		
			
		else if(name == "red_balloon")
			return {"type":19,"color":"red"};
		else if(name == "orange_balloon")
			return {"type":19,"color":"orange"};
		else if(name == "yellow_balloon")
			return {"type":19,"color":"yellow"};
		else if(name == "green_balloon")
			return {"type":19,"color":"green"};
		else if(name == "lightblue_balloon")
			return {"type":19,"color":"lightblue"};
		else if(name == "blue_balloon")
			return {"type":19,"color":"blue"};
		else if(name == "pink_balloon")
			return {"type":19,"color":"pink"};
		else if(name == "purple_balloon")
			return {"type":19,"color":"purple"};
			
		else if(name == "red_soapbar")
			return {"type":17,"color":"red"};
		else if(name == "orange_soapbar")
			return {"type":17,"color":"orange"};
		else if(name == "yellow_soapbar")
			return {"type":17,"color":"yellow"};
		else if(name == "green_soapbar")
			return {"type":17,"color":"green"};
		else if(name == "lightblue_soapbar")
			return {"type":17,"color":"lightblue"};
		else if(name == "blue_soapbar")
			return {"type":17,"color":"blue"};
		else if(name == "pink_soapbar")
			return {"type":17,"color":"pink"};
		else if(name == "purple_soapbar")
			return {"type":17,"color":"purple"};
			
		else if(name == "steel")
			return {"type":2,"color":null};
		else if(name == "rock")
			return {"type":3,"color":null};
		//else if(name == "spike")
		//	return {"type":16,"color":null};
		else if(name == "orb")
			return {"type":9,"color":null};
			
		else if(name == "poof")
			return {"type":4,"color":null};
		else if(name == "soap")
			return {"type":5,"color":null};
		else if(name == "cloud")
			return {"type":18,"color":null};
		else if(name == "spiderweb")
			return {"type":29,"color":null};
		
		else if(name == "bomb")
			return {"type":1,"color":null};
		//else if(name == "large_bomb")
		//	return {"type":17,"color":"purple"};
		else if(name == "dynamite")
			return {"type":13,"color":null};
		else if(name == "star")
			return {"type":20,"color":null};
			
		else if(name == "upright_dagger")
			return {"type":21,"color":null,"orientation":"upright"};
		else if(name == "right_dagger")
			return {"type":21,"color":null,"orientation":"right"};
		else if(name == "downright_dagger")
			return {"type":21,"color":null,"orientation":"downright"};
		else if(name == "downleft_dagger")
			return {"type":21,"color":null,"orientation":"downleft"};
		else if(name == "left_dagger")
			return {"type":21,"color":null,"orientation":"left"};
		else if(name == "upleft_dagger")
			return {"type":21,"color":null,"orientation":"upleft"};
		
			
		else if(name == "disco")
			return {"type":10,"color":null};
		else if(name == "beachball")
			return {"type":11,"color":null};
		else if(name == "flowerpot")
			return {"type":15,"color":null};
		
		else if(name == "red_chick")
			return {"type":23,"color":"red"};
		else if(name == "orange_chick")
			return {"type":23,"color":"orange"};
		else if(name == "yellow_chick")
			return {"type":23,"color":"yellow"};
		else if(name == "green_chick")
			return {"type":23,"color":"green"};
		else if(name == "lightblue_chick")
			return {"type":23,"color":"lightblue"};
		else if(name == "blue_chick")
			return {"type":23,"color":"blue"};
		else if(name == "pink_chick")
			return {"type":23,"color":"pink"};
		else if(name == "purple_chick")
			return {"type":23,"color":"purple"};
		
		else if(name == "red_snail")
			return {"type":24,"color":"red"};
		else if(name == "orange_snail")
			return {"type":24,"color":"orange"};
		else if(name == "yellow_snail")
			return {"type":24,"color":"yellow"};
		else if(name == "green_snail")
			return {"type":24,"color":"green"};
		else if(name == "lightblue_snail")
			return {"type":24,"color":"lightblue"};
		else if(name == "blue_snail")
			return {"type":24,"color":"blue"};
		else if(name == "pink_snail")
			return {"type":24,"color":"pink"};
		else if(name == "purple_snail")
			return {"type":24,"color":"purple"};
		
		else if(name == "red_siren")
			return {"type":25,"color":"red"};
		else if(name == "orange_siren")
			return {"type":25,"color":"orange"};
		else if(name == "yellow_siren")
			return {"type":25,"color":"yellow"};
		else if(name == "green_siren")
			return {"type":25,"color":"green"};
		else if(name == "lightblue_siren")
			return {"type":25,"color":"lightblue"};
		else if(name == "blue_siren")
			return {"type":25,"color":"blue"};
		else if(name == "pink_siren")
			return {"type":25,"color":"pink"};
		else if(name == "purple_siren")
			return {"type":25,"color":"purple"};
		
		else if(name == "red_lantern")
			return {"type":26,"color":"red"};
		else if(name == "orange_lantern")
			return {"type":26,"color":"orange"};
		else if(name == "yellow_lantern")
			return {"type":26,"color":"yellow"};
		else if(name == "green_lantern")
			return {"type":26,"color":"green"};
		else if(name == "lightblue_lantern")
			return {"type":26,"color":"lightblue"};
		else if(name == "blue_lantern")
			return {"type":26,"color":"blue"};
		else if(name == "pink_lantern")
			return {"type":26,"color":"pink"};
		else if(name == "purple_lantern")
			return {"type":26,"color":"purple"};
			
		else if(name == "red_ghost")
			return {"type":27,"color":"red"};
		else if(name == "orange_ghost")
			return {"type":27,"color":"orange"};
		else if(name == "yellow_ghost")
			return {"type":27,"color":"yellow"};
		else if(name == "green_ghost")
			return {"type":27,"color":"green"};
		else if(name == "lightblue_ghost")
			return {"type":27,"color":"lightblue"};
		else if(name == "blue_ghost")
			return {"type":27,"color":"blue"};
		else if(name == "pink_ghost")
			return {"type":27,"color":"pink"};
		else if(name == "purple_ghost")
			return {"type":27,"color":"purple"};
			
		else if(name == "red_note")
			return {"type":28,"color":"red"};
		else if(name == "orange_note")
			return {"type":28,"color":"orange"};
		else if(name == "yellow_note")
			return {"type":28,"color":"yellow"};
		else if(name == "green_note")
			return {"type":28,"color":"green"};
		else if(name == "lightblue_note")
			return {"type":28,"color":"lightblue"};
		else if(name == "blue_note")
			return {"type":28,"color":"blue"};
		else if(name == "pink_note")
			return {"type":28,"color":"pink"};
		else if(name == "purple_note")
			return {"type":28,"color":"purple"};
		
		else if(name == "egg")
			return {"type":22,"color":null};
		else if(name == "red_egg")
			return {"type":22,"color":"red"};
		else if(name == "orange_egg")
			return {"type":22,"color":"orange"};
		else if(name == "yellow_egg")
			return {"type":22,"color":"yellow"};
		else if(name == "green_egg")
			return {"type":22,"color":"green"};
		else if(name == "lightblue_egg")
			return {"type":22,"color":"lightblue"};
		else if(name == "blue_egg")
			return {"type":22,"color":"blue"};
		else if(name == "pink_egg")
			return {"type":22,"color":"pink"};
		else if(name == "purple_egg")
			return {"type":22,"color":"purple"};
	}
	
});
