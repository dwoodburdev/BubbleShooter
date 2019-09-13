var CommunityBox = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		this.width = width;
		
		
		this.bgDn = new cc.DrawNode();
		this.bgDn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.bgDn);
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		
		
		this.levelImgA = new cc.Sprite(res.featLevelA);
		this.levelImgA.setScale(this.height*.8 / this.levelImgA.height);
		this.levelImgA.attr({
			x:3,
			y:this.height-3,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.levelImgA);
		
		
		var descriptionTexts = [
			"What a great use of",
			"patterned dice! Replayable,",
			"because chance of the dice",
			"create a different experience",
			"each time.",
			"     - Dylan W"
		];
		
		var offsetTextY = ( this.height*.8 - ( descriptionTexts.length * (Math.floor(this.height*.1)+1) ) )/2;
		
		this.descriptionLabels = [];
		var curY = this.height-3;
		for(var i=0; i<descriptionTexts.length; i++)
		{
			
			var descriptionLabel = new cc.LabelTTF(descriptionTexts[i], "HeaderFont", Math.floor(this.height*.1));
			descriptionLabel.color = cc.color(0,0,0,255);
			descriptionLabel.attr({
				"x":this.levelImgA.x+(this.levelImgA.width*this.levelImgA.scale) + 3,
				"y":curY - offsetTextY,
				"anchorX":0,
				"anchorY":1
			});
			descriptionLabel.color = cc.color(0,0,0,255);
			this.addChild(descriptionLabel);
			this.descriptionLabels.push(descriptionLabel);
			curY -= Math.floor(this.height*.1) + 1;
		}
		
		
		this.playButton = new cc.Sprite(res.play_button_green);
		this.playButton.setScale(this.height*.2 / this.playButton.height);
		this.playButton.attr({
			x:this.width*.25,
			y:this.levelImgA.y-(this.levelImgA.height*this.levelImgA.scale),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.playButton);
		
		this.authorLabel = new cc.LabelTTF("imaboss21","HeaderFont", Math.floor(this.height*.15) );
		this.authorLabel.color = cc.color(0,0,0,255);
		this.authorLabel.attr({
			x:this.width*.67,
			y:this.playButton.y - (this.playButton.height*this.playButton.scale/2),
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.authorLabel);

	},
	
	
	onTouchBegan:function(pos)
	{
		
	},
	onTouchMoved:function(pos)
	{
		
	},
	
	onTouchEnded:function(pos)
	{cc.log(pos);
		
	}
	
	
	
});
