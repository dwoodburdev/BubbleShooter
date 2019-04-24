var SlotLayer = cc.Layer.extend({
	ctor:function(width,height,slotType, numSlots){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		

		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.width = width;
		this.height = height;
		this.slotType = slotType;
		this.numSlots = numSlots;cc.log(this.numSlots);
		
		if(this.numSlots == 2)
			this.slotImage = new cc.Sprite(res.slot_machine_small_blank);
		else if(this.numSlots == 3)
			this.slotImage = new cc.Sprite(res.slot_machine_blank);
		else if(this.numSlots == 4)
			this.slotImage = new cc.Sprite(res.slot_machine_large_blank);
		
		if(this.numSlots > 2)
			this.slotImage.setScaleX(this.width / this.slotImage.width);
		else this.slotImage.setScaleX(this.width/2 / this.slotImage.width);
		this.slotImage.setScaleY(this.height / this.slotImage.height);
		this.slotImage.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.slotImage);
		
		this.secondsPerPixel = .005;
		this.smileLast = false;
		this.startingSpinnerIndex = 0;
		this.numRotations = 0;
		
		this.emojis = [];
		
		this.xDenom = 512;
		if(this.numSlots == 2)
			this.xDenom = 350;
		else if(this.numSlots == 4)
			this.xDenom = 674;
		
		var emojiWidthFactor = (107)/this.xDenom; // max 127 width
		this.emojiWidthFactor = emojiWidthFactor;
		var slotWidth = this.slotImage.width*this.slotImage.scaleX;
		this.slotWidth = slotWidth;
		var emojiSpacingFactor = 20/this.xDenom;
		this.emojiSpacingFactor = emojiSpacingFactor;
		
		for(var i=0; i<this.numSlots; i++)
		{
			for(var j=0; j<3; j++)
			{
				
				
				var givenY = this.height/2;
				if(j==0)
					givenY = this.height/2 + this.height/3;
				else if(j == 2)
					givenY = this.height/2 - this.height/3;
				
				var emoji = null;
				if(j == 1)
					emoji = new cc.Sprite(res.smile_emoji);
				else emoji = new cc.Sprite(res.sad_emoji);
				emoji.setScale( (emojiWidthFactor)*slotWidth / emoji.width)
				emoji.attr({
					x:(95/this.xDenom)*slotWidth + (158/this.xDenom)*slotWidth*i,
					//y:this.height/2 - emojiWidthFactor*slotWidth - emojiSpacingFactor*slotWidth + (emojiWidthFactor*slotWidth + emojiSpacingFactor*slotWidth)*j,
					y:givenY,
					anchorX:.5,
					anchorY:.5
				});
				this.emojis.push(emoji);
				this.addChild(this.emojis[this.emojis.length-1]);
			}
		}
		
		if(this.numSlots == 2)
			this.slotOverlay = new cc.Sprite(res.slot_machine_small_overlay);
		else if(this.numSlots == 3)
			this.slotOverlay = new cc.Sprite(res.slot_machine_overlay);
		else if(this.numSlots == 4)
			this.slotOverlay = new cc.Sprite(res.slot_machine_large_overlay);
		
		if(this.numSlots > 2)
			this.slotOverlay.setScaleX(this.width / this.slotOverlay.width);
		else this.slotOverlay.setScaleX(this.width/2 / this.slotOverlay.width);
		this.slotOverlay.setScaleY(this.height / this.slotOverlay.height);
		this.slotOverlay.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.slotOverlay, 2);
		
	},
	
	initSpin:function()
	{cc.log("SHOULD SPIN");
		
		for(var i=0; i<this.emojis.length; i++)
		{
			var time = (.3/this.height)*(this.emojis[i].y);
			
			this.emojis[i].runAction( new cc.Sequence( cc.moveTo(time, this.emojis[i].x, 0), cc.callFunc(this.emojis[i].removeFromParent, this.emojis[i]) ) );
		}
		
		var seq = new cc.Sequence(cc.callFunc(this.spawnEmojiRow, this), cc.delayTime(.1));
		this.runAction(new cc.RepeatForever(seq))
	},
	
	spawnEmojiRow:function()
	{
		this.numRotations++;
		if(this.numRotations == 10)
		{
			var emoji = new cc.Sprite(res.love_emoji);
			emoji.setScale( (this.emojiWidthFactor)*this.slotWidth / emoji.width);
			emoji.attr({
				x:(95/this.xDenom)*this.slotWidth /*+ (158/512)*this.slotWidth*i*/,
				y:this.height,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(emoji);
		
			emoji.runAction(new cc.Sequence(cc.moveTo(.15, emoji.x, this.height/2), cc.delayTime(.1)));
			this.emojis[1] = emoji;
			//this.startingSpinnerIndex++;
		}
		else if(this.numRotations == 15)
		{
			var emoji = new cc.Sprite(res.love_emoji);
			emoji.setScale( (this.emojiWidthFactor)*this.slotWidth / emoji.width);
			emoji.attr({
				x:(95/this.xDenom)*this.slotWidth + (158/this.xDenom)*this.slotWidth*1,
				y:this.height,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(emoji);
		
			emoji.runAction(new cc.Sequence(cc.moveTo(.15, emoji.x, this.height/2), cc.delayTime(.1)));
			this.emojis[4] = emoji;
			//this.startingSpinnerIndex++;
		}
		else if(this.numRotations == 20)
		{
			var emoji = new cc.Sprite(res.love_emoji);
			emoji.setScale( (this.emojiWidthFactor)*this.slotWidth / emoji.width);
			emoji.attr({
				x:(95/this.xDenom)*this.slotWidth + (158/this.xDenom)*this.slotWidth*2,
				y:this.height,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(emoji);
		
			emoji.runAction(new cc.Sequence(cc.moveTo(.15, emoji.x, this.height/2), cc.delayTime(.1)));
			this.emojis[7] = emoji;
			//this.startingSpinnerIndex++;
			//this.stopAllActions();
		}
		else if(this.numRotations == 25)
		{
			var emoji = new cc.Sprite(res.love_emoji);
			emoji.setScale( (this.emojiWidthFactor)*this.slotWidth / emoji.width);
			emoji.attr({
				x:(95/this.xDenom)*this.slotWidth + (158/this.xDenom)*this.slotWidth*3,
				y:this.height,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(emoji);
		
			emoji.runAction(new cc.Sequence(cc.moveTo(.15, emoji.x, this.height/2), cc.delayTime(.1)));
			this.emojis[10] = emoji;
			//this.startingSpinnerIndex++;
			//this.stopAllActions();
		}
		
		for(var i=this.startingSpinnerIndex; i<this.numSlots; i++)
		{
			if((this.numRotations == 10 && i==0) || (this.numRotations == 15 && i==1) || (this.numRotations == 20 && i==2))
			{
			}
			else
			{
				var rIndex = Math.floor(Math.random()*3);
				var emoji = null;
				if(rIndex == 0)
					emoji = new cc.Sprite(res.smile_emoji);
				else if(rIndex == 1)
					emoji = new cc.Sprite(res.sad_emoji);
				else emoji = new cc.Sprite(res.angry_emoji);
				emoji.setScale( (this.emojiWidthFactor)*this.slotWidth / emoji.width);
				emoji.attr({
					x:(95/this.xDenom)*this.slotWidth + (158/this.xDenom)*this.slotWidth*i,
					y:this.height,
					anchorX:.5,
					anchorY:.5
				});
				this.addChild(emoji);
				
	
				if((this.numRotations == 9 && i==0) || (this.numRotations == 14 && i==1) || (this.numRotations == 19 && i==2) || (this.numRotations == 24 && i==3))
				{
					emoji.runAction(new cc.Sequence(cc.moveTo(.25, emoji.x, this.height/2 - this.height/3) ));
					if(i == 0)
						this.emojis[2] = emoji;
					else if(i == 1)
						this.emojis[5] = emoji;
					else if(i == 2)
						this.emojis[8] = emoji;
					else if(i == 3)
						this.emojis[11] = emoji;
				}
				else if((this.numRotations == 11 && i==0) || (this.numRotations == 16 && i==1) || (this.numRotations == 21 && i==2) || (this.numRotations == 26 && i==3))
				{
					emoji.runAction(new cc.Sequence(cc.moveTo(.05, emoji.x, this.height/2 + this.height/3) ));
					if(i == 0)
						this.emojis[0] = emoji;
					else if(i == 1)
						this.emojis[3] = emoji;
					else if(i == 2)
						this.emojis[6] = emoji;
					else if(i == 3)
						this.emojis[9] = emoji;
					this.startingSpinnerIndex++;
					if(this.numRotations == 6+(this.numSlots)*5)
					{
						this.stopAllActions();
						this.startingSpinnerIndex = 0;
						this.numRotations = 0;
						if(this.slotType == "win")
						{
							
							this.parent.rewardMoves(5);
							
						}
						else if(this.slotType == "daily")
						{
							
						}
					}
				}
				/*else if((this.numRotations == 10 && i==0) || (this.numRotations == 15 && i==1) || (this.numRotations == 20 && i==2))
				{
				}*/
				else
				{
					emoji.runAction(new cc.Sequence(cc.moveTo(.3, emoji.x, 0), cc.callFunc(emoji.removeFromParent, emoji)));
					
				}
			}
		}
	},
	
	
	onTouchEnd: function(pos)
	{cc.log(pos);pos = this.convertToNodeSpace(pos);
		
	}
	
});
