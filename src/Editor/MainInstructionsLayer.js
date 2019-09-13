var MainInstructionsLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(235,235,235,255), 0, cc.color(0,0,0,255));
		
		this.titleText = new cc.LabelTTF("Help", "HeaderFont", 20);
		this.titleText.color = cc.color(0,0,0,255);
		this.titleText.attr({
			x:this.width/2,
			y:this.height-1,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleText);
		
		this.titleLeftText = new cc.LabelTTF("Press","HeaderFont",15);
		this.titleLeftText.color = cc.color(0,0,0,255);
		this.titleLeftText.attr({
			x:15,
			y:this.height-this.titleText.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.titleLeftText);
		
		this.titleRightText = new cc.LabelTTF("Info","HeaderFont",15);
		this.titleRightText.color = cc.color(0,0,0,255);
		this.titleRightText.attr({
			x:this.width-15,
			y:this.height-this.titleText.height/2,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.titleRightText);
		
		this.instructionContent = new ContextualHelp(this.width, this.titleText.y-this.titleText.height);
		this.instructionContent.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.instructionContent);
		
		/*
		this.tutTextC = new cc.LabelTTF("Follow Emoji Pop", "Arial", 20);
		this.tutTextC.color = cc.color(0,0,0,255);
		this.tutTextC.attr({
			x:this.width/2,
			y:this.tutTextB.y-this.tutTextB.height-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.tutTextC);
		
		this.emojiPopImg = new cc.Sprite(res.prof_pic);
		this.emojiPopImg.setScale(this.height*.25 / this.emojiPopImg.height);
		this.emojiPopImg.attr({
			x:0,
			y:this.tutTextC.y-this.tutTextC.height,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.emojiPopImg);
		
		this.gameLinkA = new cc.LabelTTF("@emojipopgame", "Arial", 15);
		this.gameLinkA.color = cc.color(0,0,0,255);
		this.gameLinkA.attr({
			x:,
			y:this.emojiPopImg.y-(this.emojiPopImg.height*this.emojiPopImg.scale)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.gameLinkA);
		
		this.tutTextD = new cc.LabelTTF("Follow the Creator", "Arial", 20);
		this.tutTextD.color = cc.color(0,0,0,255);
		this.tutTextD.attr({
			x:this.width/2,
			y:this.emojiPopImg.y-(this.emojiPopImg.height*this.emojiPopImg.scale)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.tutTextD);
		
		this.creatorImg = new cc.Sprite(res.prof_pic);
		this.creatorImg.setScale(this.height*.25 / this.creatorImg.height);
		this.creatorImg.attr({
			x:0,
			y:this.tutTextD.y-this.tutTextD.height,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.creatorImg);
		*/
		/*
		this.upArrow = new cc.Sprite(res.up_arrow);
		this.upArrow.setScale(this.width/12 / this.upArrow.width);
		this.upArrow.attr({
			x:this.width/24,
			y:this.height,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.upArrow);
		*/
		
	},
	
	onTouchEnded:function(pos)
	{
		if(pos.y > this.instructionContent.y+this.instructionContent.height && pos.y < this.height)
		{
			if(pos.x > this.titleLeftText.x && pos.x < this.titleLeftText.x+this.titleLeftText.width)
			{
				window.open("press.html");
			}
			else if(pos.x > this.titleRightText.x-this.titleRightText.width && pos.x < this.titleRightText.x)
			{
				this.parent.parent.openInfoPopup();
			}
			
		}
		else this.instructionContent.onTouchEnded(pos);
		
	}
	
	
	
});