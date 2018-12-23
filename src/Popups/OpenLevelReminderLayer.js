var OpenLevelReminderLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Levels Full!", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":this.x+this.width/2,
			"y":this.y+this.height-60,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		
		this.playButton = new cc.Sprite(res.play_button_green);
		this.playButton.setScale(this.width/2 / this.playButton.width);
		this.playButton.attr({
			x:this.x+this.width/2 - (this.playButton.width*this.playButton.scale)/2,
			y:this.y+this.height*.1,
			anchorX:0,anchorY:0
		});
		this.addChild(this.playButton);
		
		
		
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
    onTouchEnd: function(pos){
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
		else if(this.posWithin(pos, {"x":this.x+this.playButton.x,"y":this.y+this.playButton.y,"width":this.playButton.width*this.playButton.scale,"height":this.playButton.height*this.playButton.scale}))
    	{
			
    		return "play-level";
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