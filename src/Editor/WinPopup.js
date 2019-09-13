var WinPopup = cc.Layer.extend({
	ctor:function(width, height, mode, streak){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 this.mode = mode;
		 this.streak = streak;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		//this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 4, cc.color(0,0,0,255));
		
		this.bgImage = new cc.Sprite(res.phone_up);
		this.bgImage.setScaleX(this.width / this.bgImage.width);
		this.bgImage.setScaleY(this.height / this.bgImage.height);
		this.bgImage.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bgImage);
		
		this.titleText = new cc.LabelTTF("You Win!", "HeaderFont", Math.floor(this.height*.1));
		this.titleText.color = cc.color(0,0,0,255);
		this.titleText.attr({
			x:this.width/2,
			y:this.height*.8,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleText);
		
		this.okButton = new cc.Sprite(res.play_bg);
		this.okButton.setScale(this.height*.1 / this.okButton.height);
		this.okButton.attr({
			x:this.width/2,
			y:15,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.okButton);
		
		this.okLabel = new cc.LabelTTF("Ok","HeaderFont",Math.floor(this.height*.08));
		this.okLabel.color = cc.color(255,255,255,255);
		this.okLabel.attr({
			x:this.okButton.x,
			y:this.okButton.y+(this.okButton.height*this.okButton.scale*.85),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.okLabel);
		
		var starY = this.height*.6;
		this.stars = [];
		
		this.rewardTextB = new cc.LabelTTF(""+Math.min(this.streak+1,3)+" tries to win.","HeaderFont",Math.floor(this.height*.035));
		this.rewardTextB.color = cc.color(0,0,0,255);
		this.rewardTextB.attr({
			x:this.width/2,
			y:this.height*.2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.rewardTextB);
		
		this.rewardText = new cc.LabelTTF("Next level, you get","HeaderFont",Math.floor(this.height*.035));
		this.rewardText.color = cc.color(0,0,0,255);
		this.rewardText.attr({
			x:this.width/2,
			y:this.rewardTextB.y + Math.floor(this.height*.035)+2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.rewardText);
		
		
		this.rewardFace = null;
		
		if(this.streak == 1)
		{
			var starImg = new cc.Sprite(res.yellow_star_emoji);
			starImg.setScale(this.height*.1 / starImg.height);
			starImg.attr({
				x:this.width/2,
				y:starY,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(starImg);
			this.stars.push(starImg);
			
			var faceRoom = ( starImg.y-(starImg.height*starImg.scale/2) - this.rewardText.y );
			
			this.rewardFace = new cc.Sprite(res.sunglass_face);
			this.rewardFace.setScale(this.height*.25 / this.rewardFace.height);
			this.rewardFace.attr({
				x:this.width/2,
				y:this.rewardText.y + faceRoom/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.rewardFace);
		}
		else if(this.streak == 2)
		{
			var starImg = new cc.Sprite(res.yellow_star_emoji);
			starImg.setScale(this.height*.1 / starImg.height);
			starImg.attr({
				x:this.width/2 - (starImg.width*starImg.scale),
				y:starY,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(starImg);
			this.stars.push(starImg);
			
			var starImgB = new cc.Sprite(res.yellow_star_emoji);
			starImgB.setScale(this.height*.1 / starImgB.height);
			starImgB.attr({
				x:this.width/2 + (starImgB.width*starImgB.scale),
				y:starY,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(starImgB);
			this.stars.push(starImgB);
			
			var faceRoom = ( starImg.y-(starImg.height*starImg.scale/2) - this.rewardText.y );
			
			this.rewardFace = new cc.Sprite(res.crown_face);
			this.rewardFace.setScale(this.height*.25 / this.rewardFace.height);
			this.rewardFace.attr({
				x:this.width/2,
				y:this.rewardText.y + faceRoom/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.rewardFace);
		}
		else if(this.streak == 3)
		{
			var starImg = new cc.Sprite(res.yellow_star_emoji);
			starImg.setScale(this.height*.1 / starImg.height);
			starImg.attr({
				x:this.width/2 - (starImg.width*starImg.scale),
				y:starY,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(starImg);
			this.stars.push(starImg);
			
			var starImgB = new cc.Sprite(res.yellow_star_emoji);
			starImgB.setScale(this.height*.1 / starImgB.height);
			starImgB.attr({
				x:this.width/2,
				y:starY,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(starImgB);
			this.stars.push(starImgB);
			
			var starImgC = new cc.Sprite(res.yellow_star_emoji);
			starImgC.setScale(this.height*.1 / starImgC.height);
			starImgC.attr({
				x:this.width/2 + (starImgC.width*starImgC.scale),
				y:starY,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(starImgC);
			this.stars.push(starImgC);
			
			var faceRoom = ( starImgA.y-(starImg.height*starImg.scale/2) - this.rewardText.y );
			
			this.rewardFace = new cc.Sprite(res.crown_face);
			this.rewardFace.setScale(this.height*.25 / this.rewardFace.height);
			this.rewardFace.attr({
				x:this.width/2,
				y:this.rewardText.y + faceRoom/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.rewardFace);
		}
	},
	
	onTouchEnded:function(pos)
	{
		if(pos.x > this.okButton.x-(this.okButton.width*this.okButton.scale/2) && pos.x < this.okButton.x+(this.okButton.width*this.okButton.scale/2)
			&& pos.y > this.okButton.y && pos.y < this.okButton.y+(this.okButton.height*this.okButton.scale))
		{
			if(this.mode == "featured")
			{
				this.parent.runFeaturedRewardSeq();
				//this.parent.backToEditor();
				//this.panelBackToEditor();
				//this.parent.closePopup();
			}
			else if(this.mode == "friend")
			{
				this.parent.backToEditor();
				this.parent.panelBackToEditor();
				this.parent.closePopup();
			}
			
		}
	}
	
	
	
});