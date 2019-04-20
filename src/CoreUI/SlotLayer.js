var SlotLayer = cc.Layer.extend({
	ctor:function(width,height,slotType){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		

		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.width = width;
		this.height = height;
		this.slotType = slotType;
		
		this.slotImage = new cc.Sprite(res.slot_machine_blank);
		this.slotImage.setScale(this.height / this.slotImage.height);
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
		
		var emojiWidthFactor = (107)/512; // max 127 width
		this.emojiWidthFactor = emojiWidthFactor;
		var slotWidth = this.slotImage.width*this.slotImage.scale;
		this.slotWidth = slotWidth;
		var emojiSpacingFactor = 20/512;
		this.emojiSpacingFactor = emojiSpacingFactor;
		
		for(var i=0; i<3; i++)
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
					x:(95/512)*slotWidth + (158/512)*slotWidth*i,
					//y:this.height/2 - emojiWidthFactor*slotWidth - emojiSpacingFactor*slotWidth + (emojiWidthFactor*slotWidth + emojiSpacingFactor*slotWidth)*j,
					y:givenY,
					anchorX:.5,
					anchorY:.5
				});
				this.emojis.push(emoji);
				this.addChild(this.emojis[this.emojis.length-1]);
			}
		}
		
		
		this.slotOverlay = new cc.Sprite(res.slot_machine_overlay);
		this.slotOverlay.setScale(this.height / this.slotOverlay.height);
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
				x:(95/512)*this.slotWidth /*+ (158/512)*this.slotWidth*i*/,
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
				x:(95/512)*this.slotWidth + (158/512)*this.slotWidth*1,
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
				x:(95/512)*this.slotWidth + (158/512)*this.slotWidth*2,
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
		
		
		for(var i=this.startingSpinnerIndex; i<3; i++)
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
					x:(95/512)*this.slotWidth + (158/512)*this.slotWidth*i,
					y:this.height,
					anchorX:.5,
					anchorY:.5
				});
				this.addChild(emoji);
				
	
				if((this.numRotations == 9 && i==0) || (this.numRotations == 14 && i==1) || (this.numRotations == 19 && i==2))
				{
					emoji.runAction(new cc.Sequence(cc.moveTo(.25, emoji.x, this.height/2 - this.height/3) ));
					if(i == 0)
						this.emojis[2] = emoji;
					else if(i == 1)
						this.emojis[5] = emoji;
					else if(i == 2)
						this.emojis[8] = emoji;
				}
				else if((this.numRotations == 11 && i==0) || (this.numRotations == 16 && i==1) || (this.numRotations == 21 && i==2))
				{
					emoji.runAction(new cc.Sequence(cc.moveTo(.05, emoji.x, this.height/2 + this.height/3) ));
					if(i == 0)
						this.emojis[0] = emoji;
					else if(i == 1)
						this.emojis[3] = emoji;
					else if(i == 2)
						this.emojis[6] = emoji;
					this.startingSpinnerIndex++;
					if(this.numRotations == 21)
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
