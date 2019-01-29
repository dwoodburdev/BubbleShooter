var WorldElementLayer = cc.Layer.extend({
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
		
		this.okButton = new cc.Sprite(res.get_button);
		this.okButton.setScale(this.width/4 / this.okButton.width);
		this.okButton.attr({
			x:this.width/2,
			y:this.okButton.height*this.okButton.scale,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.okButton);
		
		this.titleLabel = new cc.LabelTTF("New Element!", "Roboto", 35);
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
		
		
	},
	
	onTouchEnd:function(pos)
	{cc.log(pos);
		if(FUNCTIONS.posWithinScaled(pos, this.okButton))
    	{
    		var moveAction = cc.moveTo(.5,this.width/2,this.height/2);
    		var scaleAction = cc.scaleTo(.5,0,0);
    		var spawn = cc.spawn(moveAction, scaleAction);
    		var seq = new cc.Sequence(spawn, cc.callFunc(this.parent.loadNextWorld, this.parent));
    		this.runAction(seq);
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
