var CreationListLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
		
	
		this.levelPreviewImg = new cc.Sprite(res.level_example);
		this.levelPreviewImg.setScale(this.height*.4 / this.levelPreviewImg.height);
		this.levelPreviewImg.attr({
			x:this.width/2,
			y:this.height-5,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.levelPreviewImg);
		
		this.levelTitleLabel = new cc.LabelTTF("Snail Swirl", "HeaderFont", Math.floor(this.height*.075));
		this.levelTitleLabel.color = cc.color(0,0,0,255);
		this.levelTitleLabel.attr({
			x:this.levelPreviewImg.x,
			y:this.levelPreviewImg.y-(this.levelPreviewImg.height*this.levelPreviewImg.scale),
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.levelTitleLabel);
		
		this.levelAuthorLabel = new cc.LabelTTF("@iliketutles247","HeaderFont",Math.floor(this.height*.075));
		this.levelAuthorLabel.color = cc.color(0,0,255,255);
		this.levelAuthorLabel.attr({
			x:this.levelPreviewImg.x,
			y:this.levelTitleLabel.y-Math.floor(this.height*.075)-1,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.levelAuthorLabel);
		
		var levelComments = [
			"Great replayability due to the",
			"acute dispersion of snails throughout",
			"the clouds. There seemed to be a good",
			"move swing. -The Dylan"
		];
		this.commentLabels = [];
		for(var i=0; i<levelComments.length; i++)
		{
			var label = new cc.LabelTTF(levelComments[i], "HeaderFont",Math.floor(this.height*.045));
			label.color = cc.color(0,0,0,255);
			label.attr({
				x:15,
				y:this.levelAuthorLabel.y-Math.floor(this.height*.075)-(i * (Math.floor(this.height*.06)+2) ) - 5,
				anchorX:0,
				anchorY:1
			});
			//this.addChild(label);
			this.commentLabels.push(label);
		}
		
		this.playButton = new cc.Sprite(res.play_bg);
		this.playButton.setScale(this.height*.1 / this.playButton.height);
		this.playButton.attr({
			x:this.levelPreviewImg.x+(this.levelPreviewImg.width*this.levelPreviewImg.scale/2),
			y:this.levelPreviewImg.y-(this.levelPreviewImg.height*this.levelPreviewImg.scale),
			anchorX:.5,
			anchorY:0
		});
		//this.addChild(this.playButton);
	
		this.playLabel = new cc.LabelTTF("Play","HeaderFont",Math.floor(this.height*.07));
		this.playLabel.color = cc.color(0,0,0,255);
		this.playLabel.attr({
			x:this.playButton.x,
			y:this.playButton.y+(this.playButton.height*this.playButton.scale)-1,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.playLabel);
	
	},
	
	onTouchEnded:function(pos)
	{/*
		var textHeight = Math.floor(this.height*.075);
		if(pos.x > this.levelAuthorLabel.x-(this.levelAuthorLabel.width/2) && pos.x < this.levelAuthorLabel.x+this.levelAuthorLabel.width
			&& pos.y > this.levelAuthorLabel.y-(textHeight) && pos.y < this.levelAuthorLabel.y)
		{
			cc.sys.openURL("https://twitter.com/eldylanwoodbury");
			
		}
		else if(
	(	
	pos.x > this.playButton.x-(this.playButton.width*this.playButton.scale/2)
	&& pos.x < this.playButton.x+(this.playButton.width*this.playButton.scale/2)
	&& pos.y > this.playButton.y 
	&& pos.y < this.playButton.y+(this.playButton.height*this.playButton.scale)
	)
	||
	(
	pos.x > this.levelPreviewImg.x-(this.levelPreviewImg.width*this.levelPreviewImg.scale/2)
	&& pos.x < this.levelPreviewImg.x+(this.levelPreviewImg.width*this.levelPreviewImg.scale/2)
	&& pos.y > this.levelPreviewImg.y-(this.levelPreviewImg.height*this.levelPreviewImg.scale)
	&& pos.y < this.levelPreviewImg.y
	)		
	||
	(
	pos.x > this.levelTitleLabel.x-(this.levelTitleLabel.width/2)
	&& pos.x < this.levelTitleLabel.x+(this.levelTitleLabel.width/2)
	&& pos.y > this.levelTitleLabel.y
	&& pos.y < this.levelTitleLabel.y+Math.floor(this.height*.075)
	)
			
		)
		{
			// play level here
			cc.log("SUCCESS! SHOULD PLAY CREATION NOW");
		}
		
		
		*/
	}
	
	
});