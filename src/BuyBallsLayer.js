var BuyBallsLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Out Of Moves", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":this.x+this.width/2,
			"y":this.y+this.height-60,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		
		this.buyBallsButton = new cc.Sprite(res.buy_balls_button);
		this.buyBallsButton.setScale(this.width/2 / this.buyBallsButton.width);
		this.buyBallsButton.attr({
			x:this.x+this.width/2 - (this.buyBallsButton.width*this.buyBallsButton.scale)/2,
			y:this.y+this.height*.1,
			anchorX:0,anchorY:0
		});
		this.addChild(this.buyBallsButton);
		
		this.watchAdButton = new cc.Sprite(res.watch_ad_button);
		this.watchAdButton.setScale(this.width/2 / this.watchAdButton.width);
		this.watchAdButton.attr({
			x:this.x+this.width/2 - (this.buyBallsButton.width*this.buyBallsButton.scale)/2,
			y:this.buyBallsButton.y+(this.buyBallsButton.height*this.buyBallsButton.scale)+20,
			anchorX:0,anchorY:0
		});
		this.addChild(this.watchAdButton);
		
		
		this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":0,
        	"y":this.height-(this.closeButton.height*this.closeButton.scale),
        	"anchorX":0,
        	"anchorY":0
        });
		this.addChild(this.closeButton);
		
	},
	
	onTouchBegan: function(pos){
		
    },
    onTouchMoved: function(pos){

    },
    onTouchEnd: function(pos){cc.log("touch end back");
    cc.log(pos);cc.log(this.closeButton.x + " " + this.closeButton.y + " " + (this.closeButton.width*this.closeButton.scale));
    	//if(this.posWithinScaled(pos, this.closeButton))
    	if(this.posWithin(pos, {"x":this.x+this.closeButton.x,"y":this.y+this.closeButton.y,"width":this.closeButton.width*this.closeButton.scale,"height":this.closeButton.height*this.closeButton.scale}))
    	{cc.log("closing");
	    	/*var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
    		//cc.log(bubbles);
    		var maxRow = 0;
    		var bubbleData = [];
    		for(var i=0; i<bubbles.length; i++)
    		{
    			if(bubbles[i].row > maxRow)
    				maxRow = bubbles[i].row;
    		}
			cc.director.runScene(new GameplayScene(bubbles, maxRow+1));*/
			return "close";
		}
		else if(this.posWithin(pos, {"x":this.x+this.buyBallsButton.x,"y":this.y+this.buyBallsButton.y,"width":this.buyBallsButton.width*this.buyBallsButton.scale,"height":this.buyBallsButton.height*this.buyBallsButton.scale}))
    	{cc.log("buy");
			DATA.worldBallsLeft += 10;
			/*
			var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
    		//cc.log(bubbles);
    		var maxRow = 0;
    		var bubbleData = [];
    		for(var i=0; i<bubbles.length; i++)
    		{
    			if(bubbles[i].row > maxRow)
    				maxRow = bubbles[i].row;
    		}*/
    		return "close";
			//cc.director.runScene(new GameplayScene(bubbles, maxRow+1));
		}
		else if(this.posWithin(pos, {"x":this.x+this.watchAdButton.x,"y":this.y+this.watchAdButton.y,"width":this.watchAdButton.width*this.watchAdButton.scale,"height":this.watchAdButton.height*this.watchAdButton.scale}))
    	{cc.log("watch");
			DATA.worldBallsLeft++;
			
			/*var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
    		//cc.log(bubbles);
    		var maxRow = 0;
    		var bubbleData = [];
    		for(var i=0; i<bubbles.length; i++)
    		{
    			if(bubbles[i].row > maxRow)
    				maxRow = bubbles[i].row;
    		}
			cc.director.runScene(new GameplayScene(bubbles, maxRow+1));*/
			return "close";
		}
	},
	
	posWithin:function(pos, square)
	{
		if(pos.y > square.y && pos.y < square.y+square.height &&
			pos.x > square.x && pos.x < square.x+square.width)
			return true;
		return false;
	},
	posWithinScaled:function(pos, square)
	{
		if(pos.y > square.y && pos.y < square.y+square.height*square.scale &&
			pos.x > square.x && pos.x < square.x+square.width*square.scale)
			return true;
		return false;
	}
});