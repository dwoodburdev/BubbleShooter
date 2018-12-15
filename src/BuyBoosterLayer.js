var BuyBoosterLayer = cc.Layer.extend({
	ctor:function(width, height, boosterType){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		this.boosterType = boosterType;
		
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
		
		this.titleLabel = new cc.LabelTTF("Buy Booster?", "Roboto", 35);
		this.titleLabel.attr({
			"x":this.x+this.width/2,
			"y":this.height-40,
			"anchorX":.5,
			"anchorY":1
		});
		this.titleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.titleLabel);
		
		this.boosterImg = null;
		if(this.boosterType == "bomb")
		{
			this.boosterImg = new cc.Sprite(res.bomb_emoji);
		}
		this.boosterImg.setScale(this.width/2 / this.boosterImg.width);
		this.boosterImg.attr({
			x:this.x+this.width/2,
			y:this.titleLabel.y-this.titleLabel.height,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.boosterImg);
		
		this.buyButton = new cc.Sprite(res.buy_button);
		this.buyButton.setScale(this.width/3 / this.buyButton.width);
		this.buyButton.attr({
			x:this.x+this.width/2,
			y:this.y+20,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.buyButton);
		
		
		/*this.starTextA = new cc.LabelTTF("Hit Stars to get levels.", "Roboto", 20);
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
		this.addChild(this.starImg);*/
		
		
		
	},
	
	onTouchEnd:function(pos)
	{
		if(FUNCTIONS.posWithinScaled(pos, this.closeButton))
		{cc.log("close");
    		return "close";
    	}
    	else if(FUNCTIONS.posWithinScaled(pos, this.buyButton))
    	{
    		return "buy-"+this.boosterType;
    	}
    	
    	
    	return null;
	}
	
});
