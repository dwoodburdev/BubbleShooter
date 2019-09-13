var NewObstaclePopup = cc.Layer.extend({
	ctor:function(width, height, obstacleNum){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 this.obstacleNum = obstacleNum;
		
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
	
		this.titleText = new cc.LabelTTF("New Obstacle", "HeaderFont", Math.floor(this.height*.07));
		this.titleText.color = cc.color(255,255,255,255);
		this.titleText.attr({
			x:this.width/2,
			y:this.height-15,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleText);
		
		this.name = "";
		this.description = "";
		this.descriptionB = "";
		
		if(this.obstacleNum == 1)
		{
			this.obstacleImg = new cc.Sprite(res.soap_emoji);
			this.name = "Soap";
			this.description = "Pop together!";
		}
		else if(this.obstacleNum == 2)
		{
			this.obstacleImg = new cc.Sprite(res.bomb_emoji);
			this.name = "Bomb";
			this.description = "Hit to explode!";
		}
		else if(this.obstacleNum == 3)
		{
			this.obstacleImg = new cc.Sprite(res.red_snail_emoji);
			this.name = "Snail";
			this.description = "Slides each turn.";
		}
		else if(this.obstacleNum == 4)
		{
			this.obstacleImg = new cc.Sprite(res.bubble_wrap_emoji);
			this.name = "Bubble Wrap";
			this.description = "Hit to pop!";
		}
		else if(this.obstacleNum == 5)
		{
			this.obstacleImg = new cc.Sprite(res.red_die_emoji);
			this.name = "Die";
			this.description = "Changes to a random color.";
		}
		else if(this.obstacleNum == 6)
		{
			this.obstacleImg = new cc.Sprite(res.cloud_emoji);
			this.name = "Cloud";
			this.description = "Floats until hit.";
		}
		else if(this.obstacleNum == 7)
		{
			this.obstacleImg = new cc.Sprite(res.neutral_orb_emoji);
			this.name = "Orb";
			this.description = "Absorbs color.";
		}
		else if(this.obstacleNum == 8)
		{
			this.obstacleImg = new cc.Sprite(res.red_egg);
			this.name = "Egg";
			this.description = "Hatch the colored chicks!";
		}
		else if(this.obstacleNum == 9)
		{
			this.obstacleImg = new cc.Sprite(res.left_dagger_emoji);
			this.name = "Dagger";
			this.description = "Slices through bubbles.";
		}
		else if(this.obstacleNum == 10)
		{
			this.obstacleImg = new cc.Sprite(res.red_bulb_emoji);
			this.name = "Lightbulb";
			this.description = "Changes color every turn.";
		}
		else if(this.obstacleNum == 11)
		{
			this.obstacleImg = new cc.Sprite(res.red_ghost_emoji);
			this.name = "Ghost";
			this.description = "Becomes transparent.";
		}
		else if(this.obstacleNum == 12)
		{
			this.obstacleImg = new cc.Sprite(res.red_balloon_emoji);
			this.name = "Balloon";
			this.description = "Floats until matched.";
		}
		else if(this.obstacleNum == 13)
		{
			this.obstacleImg = new cc.Sprite(res.red_soapbar_emoji);
			this.name = "Soapbar";
			this.description = "Hit to explode bubbles!";
		}
		
		this.obstacleImg.setScale(this.height*.3 / this.obstacleImg.height);
		this.obstacleImg.attr({
			x:this.width/2,
			y:this.titleText.y-Math.floor(this.height*.1),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.obstacleImg);
		
		this.obstacleText = new cc.LabelTTF(this.name,"HeaderFont",Math.floor(this.height*.07));
		this.obstacleText.color = cc.color(0,0,0,255);
		this.obstacleText.attr({
			x:this.width/2,
			y:this.obstacleImg.y-(this.obstacleImg.height*this.obstacleImg.scale)-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.obstacleText);
		
		this.obstacleTextB = new cc.LabelTTF(this.description,"HeaderFont",Math.floor(this.height*.04));
		this.obstacleTextB.color = cc.color(0,0,0,255);
		this.obstacleTextB.attr({
			x:this.width/2,
			y:this.obstacleText.y-Math.floor(this.height*.07)-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.obstacleTextB);
		
		this.obstacleTextC = new cc.LabelTTF(this.descriptionB,"HeaderFont",Math.floor(this.height*.04));
		this.obstacleTextC.color = cc.color(0,0,0,255);
		this.obstacleTextC.attr({
			x:this.width/2,
			y:this.obstacleTextB.y-Math.floor(this.height*.04),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.obstacleTextC);
		
		this.videoImg = new cc.Sprite(res.video_thumb);
		this.videoImg.setScale(this.height*.15 / this.videoImg.height);
		this.videoImg.attr({
			x:15,
			y:this.obstacleTextC.y-Math.floor(this.height*.04)-12,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.videoImg);
		
		this.videoTitle = new cc.LabelTTF("Video 4 - Chance","HeaderFont",Math.floor(this.height*.03));
		this.videoTitle.color = cc.color(0,0,0,255);
		this.videoTitle.attr({
			x:this.videoImg.x+(this.videoImg.width*this.videoImg.scale)+2,
			y:this.videoImg.y,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.videoTitle);
		
		this.videoText = new cc.LabelTTF("Watch this Tutorial","HeaderFont",Math.floor(this.height*.03));
		this.videoText.color = cc.color(0,0,0,255);
		this.videoText.attr({
			x:10,
			y:this.videoImg.y-(this.videoImg.height*this.videoImg.scale)-5,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.videoText);
		
		this.okButton = new cc.Sprite(res.play_bg);
		this.okButton.setScale(this.height*.1 / this.okButton.height);
		this.okButton.attr({
			x:this.width/2,
			y:15,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.okButton);
		
		this.okLabel = new cc.LabelTTF("OK","HeaderFont",Math.floor(this.height*.08));
		this.okLabel.color = cc.color(255,255,255,255);
		this.okLabel.attr({
			x:this.okButton.x,
			y:this.okButton.y+this.okButton.height*this.okButton.scale*.8,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.okLabel);
		
	},
	
	onTouchEnded:function(pos)
	{
		/*if(pos.x > obstacleImg.x-(obstacleImg.width*obstacleImg.scale/2) && pos.x < obstacleImg.x+(obstacleImg.width*obstacleImg.scale/2) 
		&& pox.y > obstacleImg.y-(obstacleImg.height*obstacleImg.scale/2) && pos.y < obstacleImg.y-(obstacleImg.height*obstacleImg.scale/2))
		{
			this.parent.closePopup();
		}*/
		if(pos.x > this.okButton.x-(this.okButton.width*this.okButton.scale/2) && pos.x < this.okButton.x+(this.okButton.width*this.okButton.scale/2) &&
			pos.y > this.okButton.y && pos.y < this.okButton.y+(this.okButton.height*this.okButton.scale))
		{
			this.parent.closePopup();
		}
	}
	
});