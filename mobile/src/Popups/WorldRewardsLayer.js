var WorldRewardsLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
        /*this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":0,
        	"y":this.height-(this.closeButton.height*this.closeButton.scale),
        	"anchorX":0,
        	"anchorY":0
        });
		this.addChild(this.closeButton);*/
		
		this.openButton = new cc.Sprite(res.get_button);
		this.openButton.setScale(this.width/4 / this.openButton.width);
		this.openButton.attr({
			x:this.width/2,
			y:this.openButton.height*this.openButton.scale,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.openButton);
		
		this.titleLabel = new cc.LabelTTF("World "+DATA.worldIndex+" Complete!", "Roboto", 35);
		this.titleLabel.attr({
			"x":this.x+this.width/2,
			"y":this.height-40,
			"anchorX":.5,
			"anchorY":1
		});
		this.titleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.titleLabel);
		
		this.majorChest = new cc.Sprite(res.regular_chest);
		this.majorChest.setScale(this.width*.4 / this.majorChest.width);
		this.majorChest.attr({
			x:this.x+this.width*.3,
			y:this.titleLabel.y-(this.majorChest.height*this.majorChest.scale)-this.titleLabel.height-2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.majorChest);
		
		this.coinImg = null;
		this.coinLabel = null;
		
	},
	
	onTouchEnd:function(pos)
	{cc.log(pos);
		/*if(this.posWithin(pos, {"x":this.x+this.closeButton.x,"y":this.y+this.closeButton.y,"width":this.closeButton.width*this.closeButton.scale,"height":this.closeButton.height*this.closeButton.scale}))
    	{cc.log("close");
    		return "close";
    	}
    	else*/ if(FUNCTIONS.posWithinScaled(pos, this.openButton))
    	{
    		this.coinLabel = new cc.LabelTTF("+50","Roboto",24);
    		this.coinLabel.attr({
    			x:this.width/2,
    			y:this.height/2,
    			anchorX:1,
    			anchorY:.5
    		});
    		this.coinLabel.color = cc.color(0,0,0,255);
    		this.addChild(this.coinLabel);
    		
    		this.coinImg = new cc.Sprite(res.coin);
    		this.coinImg.setScale(this.coinLabel.height / this.coinImg.height);
    		this.coinImg.attr({
    			x:this.coinLabel.x,
    			y:this.height/2,
    			anchorX:0,
    			anchorY:.5
    		});
    		this.addChild(this.coinImg);
    		
    		// Need to include rewarded boosters too
    		
    		
    		/*var coinLabel = new cc.LabelTTF("+50","Roboto",24);
    		coinLabel.attr({
    			x:this.width/2,
    			y:this.height/2,
    			anchorX:1,
    			anchorY:.5
    		});
    		coinLabel.color = cc.color(0,0,0,255);
    		this.addChild(coinLabel);*/
    		
    		var coinImg = new cc.Sprite(res.coin);
    		coinImg.setScale(this.coinLabel.height / coinImg.height);
    		coinImg.attr({
    			x:this.coinLabel.x,
    			y:this.height/2,
    			anchorX:0,
    			anchorY:.5
    		});
    		this.addChild(coinImg);
    		
    		var moveAction = cc.moveTo(.5, this.parent.parent.topUILayer.coinImg.x, this.parent.parent.topUILayer.y);
    		var delayAction = cc.delayTime(1);
    		var spawn = cc.spawn();
    		//var remSpawn = cc.spawn(cc.callFunc(coinImg.removeFromParent, coinImg));
    		var seq = new cc.Sequence(
    			moveAction, delayAction, /*cc.callFunc(coinImg.removeFromParent, coinImg),*/ 
    			cc.callFunc(this.parent.closeWorldRewardsLayer, this.parent)
    		);
    		coinImg.runAction(seq);
    		
    		return "open";
    		
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
