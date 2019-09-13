var PlayAuthorLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(215,215,215,255), 0, cc.color(0,0,0,255));
	
		this.authorImg = new cc.Sprite(res.prof_pic);
		this.authorImg.setScale(this.height*.9 / this.authorImg.height);
		this.authorImg.attr({
			x:5,
			y:this.height*.05,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.authorImg);
		
		this.likeButton = new cc.Sprite(res.play_bg);
		this.likeButton.setScale(this.width*.2 / this.likeButton.width);
		this.likeButton.attr({
			x:this.width-5,
			y:this.height/2,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.likeButton);
		
		this.likeLabel = new cc.LabelTTF("Like","HeaderFont",Math.floor(this.likeButton.height*this.likeButton.scale*.7) );
		this.likeLabel.color = cc.color(0,0,0,255);
		this.likeLabel.attr({
			x:this.likeButton.x-(this.likeButton.width*this.likeButton.scale/2),
			y:this.likeButton.y+(this.likeButton.height*this.likeButton.scale/2)-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.likeLabel);
		
		this.levelTextA = new cc.LabelTTF("level made by", "HeaderFont", Math.floor(this.authorImg.height*this.authorImg.scale*.3));
		this.levelTextA.color = cc.color(0,0,0,255);
		this.levelTextA.attr({
			x:this.authorImg.x+(this.authorImg.width*this.authorImg.scale)+2,
			y:this.authorImg.y+(this.authorImg.height*this.authorImg.scale),
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.levelTextA);
		
		this.levelTextB = new cc.LabelTTF("dylanisagod", "HeaderFont", Math.floor(this.authorImg.height*this.authorImg.scale*.6));
		this.levelTextB.color = cc.color(0,0,0,255);
		this.levelTextB.attr({
			x:this.authorImg.x+(this.authorImg.width*this.authorImg.scale)+2,
			y:this.levelTextA.y-Math.floor(this.authorImg.height*this.authorImg.scale*.3)-3,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.levelTextB);
	},
	
	onTouchEnded:function(pos)
	{
		/*
		if(pos.x > this.quitButton.x && pos.x < this.quitButton.x+(this.quitButton.width*this.quitButton.scale)
			&& pos.y < this.quitButton.y && pos.y > this.quitButton.y-(this.quitButton.height*this.quitButton.scale))
		{
			//this.parent.parent.backToEditor();
			this.parent.parent.openQuitPopup();
		}*/
	}
	
	
	
});