var QuitPopup = cc.Layer.extend({
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
	
		this.titleText = new cc.LabelTTF("Quit?", "HeaderFont", Math.floor(this.height*.1));
		this.titleText.color = cc.color(0,0,0,255);
		this.titleText.attr({
			x:this.width/2,
			y:this.height*.9-15,
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
		
		this.okButton = new cc.Sprite(res.play_bg);
		this.okButton.setScale(this.height*.13 / this.okButton.height);
		this.okButton.attr({
			x:this.width/2,
			y:this.height*.3,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.okButton);
		
		this.playLabel = new cc.LabelTTF("Continue", "HeaderFont", Math.floor(this.height*.06));
		this.playLabel.color = cc.color(255,255,255,255);
		this.playLabel.attr({
			x:this.okButton.x,
			y:this.okButton.y+(this.okButton.height*this.okButton.scale*.85),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.playLabel);
		
		this.quitButton = new cc.Sprite(res.stop_bg);
		this.quitButton.setScale(this.height*.13 / this.quitButton.height);
		this.quitButton.attr({
			x:this.width/2,
			y:this.height*.5,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.quitButton);
		
		this.quitLabel = new cc.LabelTTF("Quit", "HeaderFont", Math.floor(this.height*.06));
		this.quitLabel.color = cc.color(255,255,255,255);
		this.quitLabel.attr({
			x:this.quitButton.x,
			y:this.quitButton.y+(this.quitButton.height*this.quitButton.scale*.85),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.quitLabel);
		
		
	},
	
	onTouchEnded:function(pos)
	{
		if(pos.x > this.quitButton.x-(this.quitButton.width*this.quitButton.scale/2) && pos.x < this.quitButton.x+(this.quitButton.width*this.quitButton.scale/2)
			&& pos.y > this.quitButton.y && pos.y < this.quitButton.y+(this.quitButton.height*this.quitButton.scale))
		{
			this.parent.backToEditor();
			this.parent.panelBackToEditor();
			this.parent.closePopup();
		}
		else if(pos.x > this.okButton.x-(this.okButton.width*this.okButton.scale/2) && pos.x < this.okButton.x+(this.okButton.width*this.okButton.scale/2)
			&& pos.y > this.okButton.y && pos.y < this.okButton.y+(this.okButton.height*this.okButton.scale))
		{
			this.parent.closePopup();
		}
	}
	
	
	
});