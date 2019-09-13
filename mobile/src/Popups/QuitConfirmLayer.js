var QuitConfirmLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		/*this.bgImage = new cc.Sprite(res.phone_up);
		this.bgImage.setScaleX(this.width / this.bgImage.width);
		this.bgImage.setScaleY(this.height / this.bgImage.height);
		this.bgImage.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bgImage);*/
		
        this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":0,
        	"y":this.height-(this.closeButton.height*this.closeButton.scale),
        	"anchorX":0,
        	"anchorY":0
        });
		this.addChild(this.closeButton);
		
		this.titleLabel = new cc.LabelTTF("Quit???", "Roboto", 35);
		this.titleLabel.attr({
			"x":this.x+this.width/2,
			"y":this.height-40,
			"anchorX":.5,
			"anchorY":1
		});
		this.titleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.titleLabel);
		
		this.quitButton = new cc.Sprite(res.quit_button);
		this.quitButton.setScale(this.width/3 / this.quitButton.width);
		this.quitButton.attr({
			x: this.x+this.width/2,
			y: this.y+40,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.quitButton);
		
		this.continueButton = new cc.Sprite(res.continue_button);
		this.continueButton.setScale(this.quitButton.height / this.continueButton.height);
		this.continueButton.attr({
			x: this.x + this.width/2,
			y: this.quitButton.y+(this.quitButton.height*this.quitButton.scale)+20,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.continueButton);
		
		
		
		
	},
	
	onTouchEnd:function(pos)
	{cc.log("touchend");cc.log(pos);cc.log(this.closeButton.x + " " + this.closeButton.y+ " " + this.closeButton.scale);
		//if(this.posWithin(pos, {"x":this.x+this.closeButton.x,"y":this.y+this.closeButton.y,"width":this.closeButton.width*this.closeButton.scale,"height":this.closeButton.height*this.closeButton.scale}))
    	if(FUNCTIONS.posWithin(pos, this.closeButton))
    	{cc.log("close");
    		return "close";
    	}
    	else if(FUNCTIONS.posWithin(pos, this.quitButton))
    	{
    		return "quit";
    	}
    	else if(FUNCTIONS.posWithin(pos, this.continueButton))
    	{
    		return "continue";
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
