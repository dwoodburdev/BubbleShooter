var WhenGonePopup = cc.Layer.extend({
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
	
		this.titleText = new cc.LabelTTF("While Gone...", "HeaderFont", Math.floor(this.height*.08));
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
		
		this.okButton = new cc.Sprite(res.play_button_green);
		this.okButton.setScale(this.height*.1 / this.okButton.height);
		this.okButton.attr({
			x:this.width/2,
			y:15,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.okButton);
		
		
		
	}
	
	
	
});