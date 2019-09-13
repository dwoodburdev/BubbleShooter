var CreatorBox = cc.Layer.extend({
	ctor:function(width, height, name, count, playFlag, rank){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.name = name;
		 this.count = count;
		 this.playFlag = playFlag;
		 this.rank = rank;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
	
		this.placeText = new cc.LabelTTF(this.rank,"Arial",Math.floor(this.height/2));
		this.placeText.color = cc.color(0,0,0,255);
		this.placeText.attr({
			x:5,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.placeText);
	
		this.profImg = new cc.Sprite(res.prof_pic);
		this.profImg.setScale(this.height*.9 / this.profImg.height);
		this.profImg.attr({
			x:this.placeText.x+this.placeText.width+5,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.profImg);
		
		this.nameLabel = new cc.LabelTTF(this.name, "Arial", Math.floor(this.height*.4));
		this.nameLabel.color = cc.color(0,0,0,255);
		this.nameLabel.attr({
			x:this.profImg.x+(this.profImg.width*this.profImg.scale)+3,
			y:this.height*.75 -2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.nameLabel);
		
		this.countText = new cc.LabelTTF(this.count, "Arial", Math.floor(this.height*.3));
		this.countText.color = cc.color(0,0,0,255);
		this.countText.attr({
			x:this.profImg.x+(this.profImg.width*this.profImg.scale)+3,
			y:this.height*.25+2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.countText);
		
		this.coinImg = new cc.Sprite(res.yellow_star_emoji);
		this.coinImg.setScale(this.countText.height / this.coinImg.height)
		this.coinImg.attr({
			x:this.countText.x+this.countText.width+2,
			y:this.countText.y,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.coinImg);
		
		this.playButton = null;
		if(this.playFlag)
		{
			this.playButton = new cc.Sprite(res.play_button_green);
			this.playButton.setScale(this.coinImg.height*this.coinImg.scale / this.playButton.height);
			this.playButton.attr({
				x:this.width-12,
				y:this.coinImg.y,
				anchorX:1,
				anchorY:.5
			});
			this.addChild(this.playButton);
		}
	}
	
	
	
});