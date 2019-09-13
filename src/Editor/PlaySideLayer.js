var PlaySideLayer = cc.Layer.extend({
	ctor:function(width, height, numMoves, colors, type){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.numMoves = numMoves;
		 this.totMoves = numMoves;
		 
		 this.type = type;
		 
		 this.colorGoals = colors;
		 this.colors = Object.keys(colors);
		 this.colorProg = {};
		 for(var i=0; i<this.colors.length; i++)
		 {
		 	this.colorProg[this.colors[i]] = 0;
		 }
		 cc.log(this.colorGoals);
		 cc.log(this.colorProg);
		 cc.log(this.colors);
		 
		 this.faceStage = 0;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.midContainerBot = this.height*.2+5;
		this.midContainerTop = this.height*.2+5+this.height*.15;
		this.topContainerBot = this.height*.2+5+this.height*.15+5;
		this.containerTop = this.height*.9-3;
		
		this.dn.drawRect(cc.p(0,this.midContainerTop+5), cc.p(this.width,this.height), cc.color(215,215,215,255), 0, cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(0,this.containerTop), cc.p(this.width,this.height), cc.color(0,180,0,255), 0, cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(0, this.midContainerBot),cc.p(this.width, this.midContainerTop),cc.color(215,215,215,255),0,cc.color(0,0,0,255));
		
		
		this.titleLabel = new cc.LabelTTF("Collect the Emojis","HeaderFont",Math.floor(this.height*.1));
		this.titleLabel.color = cc.color(0,0,0,255);
		this.titleLabel.attr({
			x:this.width/2,
			y:this.height-1,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleLabel);
		
		
		this.quitButton = new cc.Sprite(res.quit_button);
		this.quitButton.setScale((this.height-this.containerTop) / this.quitButton.height);
		this.quitButton.attr({
			x:0,
			y:this.height,
			anchorX:0,
			anchorY:1
		});
		//this.addChild(this.quitButton);
		
		
		this.moveCount = new cc.LabelTTF(this.numMoves+" moves","HeaderFont",Math.floor(this.height*.12));
		this.moveCount.color = cc.color(0,0,0,255);
		this.moveCount.attr({
			x:this.width/2,
			y:this.containerTop-3-10,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.moveCount);
		
		
		this.smileImg = new cc.Sprite(res.smile_emoji);
		this.smileImg.setScale( this.height*.2 / this.smileImg.height);
		this.smileImg.attr({
			x:this.moveCount.x-(this.moveCount.width*this.moveCount.scale/2)-5,
			y:this.containerTop-3,
			anchorX:1,
			anchorY:1
		});
		this.addChild(this.smileImg);
		
		
		this.numColors = this.colors.length;cc.log(this.colors);
		var spacing = [
			[.5],
			[.3,.7],
			[.25,.5,.75],
			[.2,.4,.6,.8],
			[.15,.325,.5,.675,.85],
			[.125,.275,.425,.575,.725,.875]
		];
		this.emojiImgs = [];
		for(var i=0; i<this.colors.length; i++)
		{cc.log(this.colors[i]);
			var emojiImg = null;
			if(this.colors[i] == "yellow")
				emojiImg = new cc.Sprite(res.smile_emoji);
			else if(this.colors[i] == "blue")
				emojiImg = new cc.Sprite(res.sad_emoji);
			else if(this.colors[i] == "red")
				emojiImg = new cc.Sprite(res.angry_emoji);
			else if(this.colors[i] == "green")
				emojiImg = new cc.Sprite(res.sick_emoji);
			else if(this.colors[i] == "pink")
				emojiImg = new cc.Sprite(res.love_emoji);
			else if(this.colors[i] == "purple")
				emojiImg = new cc.Sprite(res.evil_emoji);
			
			emojiImg.setScale(this.height*.1 / emojiImg.height);
			emojiImg.attr({
				x:this.width*(spacing[this.numColors-1][i]),
				y:this.topContainerBot+5,
				anchorX:.5,
				anchorY:0
			});
			this.addChild(emojiImg);
			this.emojiImgs.push(emojiImg);
		}
		
		
		
		this.backToEditorButton = new cc.Sprite(res.button_back_to_editor);
		this.backToEditorButton.setScale((this.height*.15 - 6) / this.backToEditorButton.height);
		this.backToEditorButton.attr({
			x:this.width/2,
			y:this.height*.2+5+3,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.backToEditorButton);
		
		
		this.authorLayer = new PlayAuthorLayer(this.width, this.height*.2);
		this.authorLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.authorLayer);
		
		
		
		this.drawProgBar();
		
		
	},
	
	onTouchEnded:function(pos)
	{cc.log(pos);cc.log(this.backToEditorButton);
		if(pos.x > this.backToEditorButton.x-(this.backToEditorButton.width*this.backToEditorButton.scale/2) && pos.x < this.backToEditorButton.x+(this.backToEditorButton.width*this.backToEditorButton.scale/2)
			&& pos.y > this.backToEditorButton.y && pos.y < this.backToEditorButton.y+(this.backToEditorButton.height*this.backToEditorButton.scale))
		{cc.log("quit");
			if(this.type == "feature")
			{
			//this.parent.parent.backToEditor();
				if(this.numMoves == this.totMoves)
				{
					this.parent.parent.closePopup();//???
					this.parent.parent.backToEditor();
					this.parent.parent.levelsPanel.levelListLayer.listLayer.revertBackToReady();
					this.parent.parent.panelBackToEditor();
				}
				else
					this.parent.parent.openQuitPopup();
			}
			else if(this.type == "test")
			{cc.log("TEST QUIT");
				//this.parent.parent.backToEditor();
				//this.parent.parent.panelBackToEditor();
				this.parent.parent.quitTestLevel();
			}
			else if(this.type == "created")
			{cc.log("CREATED QUIT");
				//this.parent.parent.backToEditor();
				//this.parent.parent.panelBackToEditor();
				this.parent.parent.quitTestLevel();
			}
		}
	},
	
	getEmojiImgOfColor:function(colorCode)
	{
		for(var i=0; i<this.colors.length; i++)
		{
			if(this.colors[i] == colorCode)
			{
				return this.emojiImgs[i];
			}
		}
	},
	
	isAnEmojiEliminated:function()
	{
		for(var i=0; i<this.colors.length; i++)
		{cc.log(this.colorProg[this.colors[i]] + "  " + this.colorGoals[this.colors[i]]);
			if(this.colorProg[this.colors[i]] == this.colorGoals[this.colors[i]])
			{
				cc.log("Emoji eliminated!");
				return true;
			}
		}
		cc.log("No Emoji eliminated.");
		return false;
	},
	
	tickColorProg:function(color)
	{cc.log(color);
		this.colorProg[color]++;
		cc.log(this.colorProg);cc.log(this.colorGoals);
		// update prog bar
	},
	
	drawProgBar:function()
	{
		this.progDn = new cc.DrawNode();
		this.addChild(this.progDn);
		var barOriginX = this.width*.1;
		var barOriginY = this.emojiImgs[0].y+(this.emojiImgs[0].height*this.emojiImgs[0].scale)+2;
		var barWidth = this.width*.8;
		var barHeight = this.height*.075;
		this.progDn.drawRect(cc.p(barOriginX, barOriginY), cc.p(this.width*.9, this.emojiImgs[0].y+(this.emojiImgs[0].height*this.emojiImgs[0].scale)+2 + this.height*.075), cc.color(255,255,255,255),3,cc.color(0,0,0,255));
		
		var trackProg = 0;
		
		for(var i=0; i<this.colors.length; i++)
		{
			var color = cc.color(0,0,0,255);
			if(this.colors[i] == "yellow")
				color = cc.color(255,255,0,255);
			else if(this.colors[i] == "blue")
				color = cc.color(0,0,255,255);
			else if(this.colors[i] == "red")
				color = cc.color(255,0,0,255);
			else if(this.colors[i] == "green")
				color = cc.color(0,255,0,255);
			else if(this.colors[i] == "pink")
				color = cc.color(255,192,203,255);
			else if(this.colors[i] == "purple")
				color = cc.color(128,0,128,255);
			
			var prog = this.colorProg[this.colors[i]] / this.colorGoals[this.colors[i]]/(Object.keys(this.colorGoals).length);
			this.progDn.drawRect(cc.p(barOriginX + trackProg, barOriginY), cc.p(barOriginX+trackProg+(prog*barWidth), barOriginY+barHeight), color, 0, cc.color(0,0,0,0));
			trackProg += prog*barWidth;
			cc.log(prog);
			
			if(this.colorProg[this.colors[i]] == this.colorGoals[this.colors[i]])
			{cc.log("color done");
				var img = this.emojiImgs[i];
				var redx = new cc.Sprite(res.red_x);
				redx.setScale(this.emojiImgs[i].height*this.emojiImgs[i].scale / redx.height);
				redx.attr({
					x:img.x,
					y:img.y,
					anchorX:img.anchorX,
					anchorY:img.anchorY
				});
				this.addChild(redx);
				/*
				this.removeChild(this.emojiImgs[i]);
				this.emojiImgs[i] = new cc.Sprite(res.);
				this.emojiImgs[i].setScale(img.scale);
				this.emojiImgs[i].attr({
					x:img.x,
					y:img.y,
					anchorX:img.anchorX,
					anchorY:img.anchorY
				});
				this.addChild(this.emojiImgs[i]);*/
			}
		}
	},
	
	updateNumMoves:function(numMoves)
	{
		this.moveCount.setString(numMoves+" moves");
		
		if(numMoves <=5 && this.faceStage < 2)
		{
			this.removeChild(this.smileImg);
			this.smileImg = new cc.Sprite(res.sad_emoji);
			this.smileImg.setScale( this.height*.2 / this.smileImg.height);
			this.smileImg.attr({
				x:5,
				y:this.containerTop-3,
				anchorX:0,
				anchorY:1
			});
			this.addChild(this.smileImg);
			this.faceStage = 2;
		}
		else if(numMoves <= 10 && this.faceStage < 1)
		{
			this.removeChild(this.smileImg);
			this.smileImg = new cc.Sprite(res.anguished_emoji);
			this.smileImg.setScale( this.height*.2 / this.smileImg.height);
			this.smileImg.attr({
				x:5,
				y:this.containerTop-3,
				anchorX:0,
				anchorY:1
			});
			this.addChild(this.smileImg);
			this.faceStage = 1;
		}
	}
	
});