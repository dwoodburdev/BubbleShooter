var InfoPopup = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
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
	
		this.titleText = new cc.LabelTTF("Info", "HeaderFont", Math.floor(this.height*.1));
		this.titleText.color = cc.color(255,255,255,255);
		this.titleText.attr({
			x:this.width/2,
			y:this.height-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleText);
		/*
		this.obstacleImg = new cc.Sprite(res.sad_emoji);
		this.obstacleImg.setScale(this.height*.3 / this.obstacleImg.height);
		this.obstacleImg.attr({
			x:this.width/2,
			y:this.titleText.y-Math.floor(this.height*.1),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.obstacleImg);
		*/
		var textHeight = Math.floor(this.height*.05);
		
		this.textA = new cc.LabelTTF("This is version 1.0 of","HeaderFont",textHeight);
		this.textA.color = cc.color(0,0,0,255);
		this.textA.attr({
			x:this.width/2,
			y:this.height*.85,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textA);
		
		this.textB = new cc.LabelTTF("Emoji Pop!","HeaderFont",textHeight);
		this.textB.color = cc.color(0,0,0,255);
		this.textB.attr({
			x:this.width/2,
			y:this.textA.y-textHeight-1,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textB);
		
		
		this.textCa = new cc.LabelTTF("Bugs? Ideas? Propositions?","HeaderFont",textHeight/2);
		this.textCa.color = cc.color(0,0,0,255);
		this.textCa.attr({
			x:this.width/2,
			y:this.textB.y-textHeight*1.5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textCa);
		
		this.textC = new cc.LabelTTF("Email us: emojipopgame@gmail.com","HeaderFont",textHeight/2);
		this.textC.color = cc.color(0,0,0,255);
		this.textC.attr({
			x:this.width/2,
			y:this.textCa.y-textHeight/2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textC);
		
		this.textD = new cc.LabelTTF("Most Art Modified from Twitter's","HeaderFont",textHeight/2);
		this.textD.color = cc.color(0,0,0,255);
		this.textD.attr({
			x:this.width/2,
			y:this.textC.y-textHeight*1.5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textD);
		
		this.textE = new cc.LabelTTF("Open-Source 'Twemoji'","HeaderFont",textHeight/2);
		this.textE.color = cc.color(0,0,0,255);
		this.textE.attr({
			x:this.width/2,
			y:this.textD.y-textHeight/2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textE);
		
		this.licenseLink = new cc.Sprite(res.play_bg);
		this.licenseLink.setScale(this.height*.05 / this.licenseLink.height);
		this.licenseLink.attr({
			x:this.width*.33,
			y:this.textE.y-textHeight-2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.licenseLink);
		
		this.licenseLabel = new cc.LabelTTF("License","HeaderFont",Math.floor(this.height*.03));
		this.licenseLabel.color = cc.color(255,255,255,255);
		this.licenseLabel.attr({
			x:this.licenseLink.x,
			y:this.licenseLink.y-2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.licenseLabel);
		
		this.projectLink = new cc.Sprite(res.play_bg);
		this.projectLink.setScale(this.height*.05 / this.projectLink.height);
		this.projectLink.attr({
			x:this.width*.67,
			y:this.textE.y-textHeight-2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.projectLink);
		
		this.projectLabel = new cc.LabelTTF("Twitter","HeaderFont",Math.floor(this.height*.03));
		this.projectLabel.color = cc.color(255,255,255,255);
		this.projectLabel.attr({
			x:this.projectLink.x,
			y:this.projectLink.y-2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.projectLabel);
		
		this.nerdFace = new cc.Sprite(res.nerd_emoji);
		this.nerdFace.setScale(this.height*.1 / this.nerdFace.height);
		this.nerdFace.attr({
			x:this.width/2,
			y:this.projectLink.y-this.projectLink.height*this.projectLink.scale - textHeight/4,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.nerdFace);
		
		this.textF = new cc.LabelTTF("Art/Engineering/Design by","HeaderFont",textHeight/2);
		this.textF.color = cc.color(0,0,0,255);
		this.textF.attr({
			x:this.width/2,
			y:this.nerdFace.y-this.nerdFace.height*this.nerdFace.scale-textHeight*.25,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textF);
		
		this.textG = new cc.LabelTTF("The Dylan Woodbury","HeaderFont",textHeight);
		this.textG.color = cc.color(0,0,0,255);
		this.textG.attr({
			x:this.width/2,
			y:this.textF.y-textHeight*.75,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textG);
		
		this.textH = new cc.LabelTTF("Thank you Mom and Dad for your","HeaderFont",textHeight/2);
		this.textH.color = cc.color(0,0,0,255);
		this.textH.attr({
			x:this.width/2,
			y:this.textG.y-textHeight*1.5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textH);
		
		this.textI = new cc.LabelTTF("love and support","HeaderFont",textHeight/2);
		this.textI.color = cc.color(0,0,0,255);
		this.textI.attr({
			x:this.width/2,
			y:this.textH.y-textHeight/2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textI);
		
		
		
		
		this.okButton = new cc.Sprite(res.play_bg);
		this.okButton.setScale(this.height*.1 / this.okButton.height);
		this.okButton.attr({
			x:this.width/2,
			y:15,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.okButton);
		
		this.okLabel = new cc.LabelTTF("OK","HeaderFont",Math.floor(this.height*.07));
		this.okLabel.color = cc.color(255,255,255,255);
		this.okLabel.attr({
			x:this.okButton.x,
			y:this.okButton.y+(this.okButton.height*this.okButton.scale*.85),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.okLabel);
		
		
	},
	
	onTouchEnded:function(pos)
	{cc.log(pos);
		if(pos.x > this.okButton.x-(this.okButton.width*this.okButton.scale/2) && pos.x < this.okButton.x+(this.okButton.width*this.okButton.scale/2)
			&& pos.y > this.okButton.y && pos.y < this.okButton.y+(this.okButton.height*this.okButton.scale))
		{cc.log("close");
			this.parent.closePopup();
		}
	}
	
	
	
});