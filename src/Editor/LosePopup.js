var LosePopup = cc.Layer.extend({
	ctor:function(width, height, streak, challengeTries){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.streak = streak;
		 this.challengeTries = challengeTries;
		
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
		
		var titleText = "";
		if(this.challengeTries == this.streak)
			titleText = "Out of Tries!";
		else titleText = "Out of Moves";
	
		this.titleText = new cc.LabelTTF(titleText, "HeaderFont", Math.floor(this.height*.07));
		this.titleText.color = cc.color(0,0,0,255);
		this.titleText.attr({
			x:this.width/2,
			y:this.height*.85,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleText);
		
		this.failImg = null;
		if(this.challengeTries == this.streak)
			this.failImg = new cc.Sprite(res.sad_emoji);
		else this.failImg = new cc.Sprite(res.concerned_face);
		this.failImg.setScale(this.height*.25 / this.failImg.height);
		this.failImg.attr({
			x:this.width/2,
			y:this.height*.6,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.failImg);
		
		
		this.triesLabel = new cc.LabelTTF("Tries: "+this.challengeTries,"HeaderFont",Math.floor(this.height*.1));
		this.triesLabel.color = cc.color(0,0,0,255);
		this.triesLabel.attr({
			x:this.width/2,
			y:this.height*.65,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.triesLabel);
		
		this.streakLabel = new cc.LabelTTF("Streak: "+this.streak,"HeaderFont",Math.floor(this.height*.1));
		this.streakLabel.color = cc.color(0,0,0,255);
		this.streakLabel.attr({
			x:this.width/2,
			y:this.height*.45,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.streakLabel);
		
		
		var triesText = "";
		if(this.challengeTries == this.streak)
			triesText = "Come back later.";
		else 
		{
			triesText = ""+(this.streak-this.challengeTries)+" more ";
			if(this.streak-this.challengeTries == 1)
				triesText += "try.";
			else triesText += "tries.";
		}
		this.comeBackLabel = new cc.LabelTTF(triesText,"HeaderFont",Math.floor(this.height*.05));
		this.comeBackLabel.color = cc.color(0,0,0,255);
		this.comeBackLabel.attr({
			x:this.width/2,
			y:this.height*.23,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.comeBackLabel);
		
		this.okButton = new cc.Sprite(res.play_bg);
		this.okButton.setScale(this.height*.1 / this.okButton.height);
		this.okButton.attr({
			x:this.width/2,
			y:15,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.okButton);
		
		var playText = "";
		if(this.challengeTries == this.streak)
			playText = "OK";
		else playText = "Play";
		this.okLabel = new cc.LabelTTF(playText,"HeaderFont",Math.floor(this.height*.07));
		this.okLabel.color = cc.color(255,255,255,255);
		this.okLabel.attr({
			x:this.okButton.x,
			y:this.okButton.y+(this.okButton.height*this.okButton.scale)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.okLabel);
		
		var starY = (this.failImg.y-(this.failImg.height*this.failImg.scale/2) - this.comeBackLabel.y)/2 + this.comeBackLabel.y;
		
		this.starImgA = new cc.Sprite(res.yellow_star_emoji);
		this.starImgA.setScale(this.width/5 / this.starImgA.width);
		this.starImgA.attr({
			x:this.width*.25,
			y:starY,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.starImgA);
		
		if(this.challengeTries >= 1)
		{
			var redXImg = new cc.Sprite(res.red_x);
			redXImg.setScale(this.starImgA.width*this.starImgA.scale*.75 / redXImg.width);
			redXImg.attr({
				x:this.starImgA.x,
				y:this.starImgA.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(redXImg);
		}
		
		if(this.streak > 1)
			this.starImgB = new cc.Sprite(res.yellow_star_emoji);
		else this.starImgB = new cc.Sprite(res.star_shadow);
		this.starImgB.setScale(this.width/5 / this.starImgB.width);
		this.starImgB.attr({
			x:this.width*.5,
			y:starY,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.starImgB);
		
		if(this.challengeTries >= 2)
		{
			var redXImg = new cc.Sprite(res.red_x);
			redXImg.setScale(this.starImgB.width*this.starImgB.scale*.75  / redXImg.width);
			redXImg.attr({
				x:this.starImgB.x,
				y:this.starImgB.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(redXImg);
		}
		
		if(this.streak > 2)
			this.starImgC = new cc.Sprite(res.yellow_star_emoji);
		else this.starImgC = new cc.Sprite(res.star_shadow);
		this.starImgC.setScale(this.width/5 / this.starImgC.width);
		this.starImgC.attr({
			x:this.width*.75,
			y:starY,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.starImgC);
		
		if(this.challengeTries >= 3)
		{
			var redXImg = new cc.Sprite(res.red_x);
			redXImg.setScale(this.starImgC.width*this.starImgC.scale*.75  / redXImg.width);
			redXImg.attr({
				x:this.starImgC.x,
				y:this.starImgC.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(redXImg);
		}
		
		this.closeButton = new cc.Sprite(res.red_x);
		this.closeButton.setScale(this.height*.05 / this.closeButton.height);
		this.closeButton.attr({
			x:this.width*.1,
			y:this.height*.86,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.closeButton);
		
	},
	
	onTouchEnded:function(pos)
	{
		if(pos.x > this.okButton.x-(this.okButton.width*this.okButton.scale/2) && pos.x < this.okButton.x+(this.okButton.width*this.okButton.scale/2) &&
			pos.y > this.okButton.y && pos.y < this.okButton.y+(this.okButton.height*this.okButton.scale))
		{
			if(this.challengeTries == this.streak)
			{
				this.parent.runFeaturedLossSeq();
			}
			else
			{
				this.parent.runFeaturedTryAgainSeq();
			}
		}
	}
	
});