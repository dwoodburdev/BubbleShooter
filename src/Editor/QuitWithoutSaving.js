var QuitWithoutSavingPopup = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 4, cc.color(0,0,0,255));
	
		this.titleText = new cc.LabelTTF("Save Your Current Level?", "HeaderFont", Math.floor(this.height*.2));
		this.titleText.color = cc.color(0,0,0,255);
		this.titleText.attr({
			x:this.width/2,
			y:this.height*.9-15,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleText);
		
		this.noImg = new cc.Sprite(res.stop_bg);
		this.noImg.setScale(this.height*.4 / this.noImg.height);
		this.noImg.attr({
			x:this.width*.25,
			y:this.height*.25,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.noImg);
		
		this.noLabel = new cc.LabelTTF("Nah","HeaderFont",Math.floor(this.height*.3));
		this.noLabel.color = cc.color(255,255,255,255);
		this.noLabel.attr({
			x:this.noImg.x,
			y:this.noImg.y+(this.noImg.height*this.noImg.scale/2)-2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.noLabel);
		
		
		this.yesImg = new cc.Sprite(res.play_bg);
		this.yesImg.setScale(this.height*.4 / this.yesImg.height);
		this.yesImg.attr({
			x:this.width*.75,
			y:this.height*.25,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.yesImg);
		
		this.yesLabel = new cc.LabelTTF("Save","HeaderFont",Math.floor(this.height*.3));
		this.yesLabel.color = cc.color(255,255,255,255);
		this.yesLabel.attr({
			x:this.yesImg.x,
			y:this.yesImg.y+(this.yesImg.height*this.yesImg.scale/2)-2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.yesLabel);
		
		
		
	},
	
	onTouchEnded:function(pos)
	{
		if(pos.x > this.noImg.x-(this.noImg.width*this.noImg.scale/2) && pos.x < this.noImg.x+(this.noImg.width*this.noImg.scale/2)
		&& pos.y > this.noImg.y-(this.noImg.height*this.noImg.scale/2) && pos.y < this.noImg.y+(this.noImg.height*this.noImg.scale/2))
		{
			this.parent.executeQuitAction();
		}
		else if(pos.x > this.yesImg.x-(this.yesImg.width*this.yesImg.scale/2) && pos.x < this.yesImg.x+(this.yesImg.width*this.yesImg.scale/2)
		&& pos.y > this.yesImg.y-(this.yesImg.height*this.yesImg.scale/2) && pos.y < this.yesImg.y+(this.yesImg.height*this.yesImg.scale/2))
		{
			this.parent.saveLevel();
			this.parent.executeQuitAction();
		}
		
	
	
	}
	
	
	
});