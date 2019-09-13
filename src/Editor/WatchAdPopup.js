var WatchAdPopup = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 4, cc.color(0,0,0,255));
	
		this.titleText = new cc.LabelTTF("Watch Ad?", "HeaderFont", Math.floor(this.height*.1));
		this.titleText.color = cc.color(0,0,0,255);
		this.titleText.attr({
			x:this.width/2,
			y:this.height-15,
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
		
		this.okButton = new cc.Sprite(res.play_button_green);
		this.okButton.setScale(this.height*.1 / this.okButton.height);
		this.okButton.attr({
			x:this.width/2,
			y:15,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.okButton);
		
		this.quitButton = new cc.Sprite(res.quit_button);
		this.quitButton.setScale(this.height*.1 / this.quitButton.height);
		this.quitButton.attr({
			x:this.width/2,
			y:this.okButton.y+(this.okButton.height*this.okButton.scale)+2,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.quitButton);
		
		
		
	},
	
	onTouchEnded:function(pos)
	{
		if(pos.x > this.okButton.x-(this.okButton.width*this.okButton.scale/2) && pos.x < this.okButton.x+(this.okButton.width*this.okButton.scale/2)
			&& pos.y > this.okButton.y && pos.y < this.okButton.y+(this.okButton.height*this.okButton.scale))
		{
			// reset level in database and in game
		}
		else if(pos.x > this.quitButton.x-(this.quitButton.width*this.quitButton.scale/2) && pos.x < this.quitButton.x+(this.quitButton.width*this.quitButton.scale/2)
			&& pos.y > this.quitButton.y && pos.y < this.quitButton.y+(this.quitButton.height*this.quitButton.scale))
		{
			this.parent.backToEditor();
			this.parent.panelBackToEditor();
			this.parent.closePopup();
		}
		
	}
	
	
	
});