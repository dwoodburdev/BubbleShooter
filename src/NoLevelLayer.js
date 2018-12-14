var NoLevelLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
        this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":0,
        	"y":this.height-(this.closeButton.height*this.closeButton.scale),
        	"anchorX":0,
        	"anchorY":0
        });
		this.addChild(this.closeButton);
		
		this.titleLabel = new cc.LabelTTF("No Level!", "Roboto", 35);
		this.titleLabel.attr({
			"x":this.x+this.width/2,
			"y":this.height-40,
			"anchorX":.5,
			"anchorY":1
		});
		this.titleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.titleLabel);
		
		this.starTextA = new cc.LabelTTF("Hit Stars to get levels.", "Roboto", 20);
		this.starTextA.attr({
			"x":this.x+this.width/2,
			"y":this.titleLabel.y-(this.titleLabel.height/2)-40,
			"anchorX":.5,
			"anchorY":1
		});
		this.starTextA.color = cc.color(0,0,0,255);
		this.addChild(this.starTextA);
		
		this.starImg = new cc.Sprite(res.star_emoji);
		this.starImg.setScale(this.width*.4 / this.starImg.width);
		this.starImg.attr({
			x:this.x+this.width*.3,
			y:this.starTextA.y-this.starTextA.height - 4,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.starImg);
		
		this.starTextB = new cc.LabelTTF("Beat Level = Earn Extra Moves", "Roboto", 20);
		this.starTextB.attr({
			"x":this.x+this.width/2,
			"y":this.starImg.y - (this.starImg.height*this.starImg.scale) - 10,
			"anchorX":.5,
			"anchorY":1
		});
		this.starTextB.color = cc.color(0,0,0,255);
		this.addChild(this.starTextB);
		
		
		
	},
	
	onTouchEnd:function(pos)
	{cc.log("touchend");cc.log(pos);cc.log(this.closeButton.x + " " + this.closeButton.y+ " " + this.closeButton.scale);
		if(this.posWithin(pos, {"x":this.x+this.closeButton.x,"y":this.y+this.closeButton.y,"width":this.closeButton.width*this.closeButton.scale,"height":this.closeButton.height*this.closeButton.scale}))
    	{cc.log("close");
    		return "close";
    	}
    	
    	return null;
	},
	
	
	posWithin:function(pos, square)
	{
		if(pos.y > square.y && pos.y < square.y+square.height &&
			pos.x > square.x && pos.x < square.x+square.width)
			return true;
		return false;
	}
	
});
