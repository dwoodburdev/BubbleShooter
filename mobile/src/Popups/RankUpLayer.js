var RankUpLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.chestOpened = false;
		
		
		this.tabTitleLabel = new cc.LabelTTF("Rank "+DATA.rank+"!", "Arial", 30);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height-10,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		this.chestImg = null;
		if(DATA.rank % 5 != 0)
		{
			this.chestImg = new cc.Sprite(res.regular_gold_chest);
			this.chestImg.setScale(size.width/2 / this.chestImg.width);
			this.chestImg.attr({
				x: size.width/2 - (size.width/2)/2,
				y: size.height*.3,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.chestImg);
		}
		else if(DATA.rank % 10 == 0)
		{
			
		}
		else if(DATA.rank % 10 == 0)
		{
			
		}
		
		
	},
	
	onTouchEnd:function()
	{
		this.chestOpened = true;
		/*if(!self.chestOpened)
    	{
    		DATA.coins += 50;
    		this.chestOpened = true;
    		//this.topUILayer.setCoins(DATA.coins);
    	}
    	else
	    {
	    	var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
    		//cc.log(bubbles);
    		var maxRow = 0;
    		var bubbleData = [];
    		for(var i=0; i<bubbles.length; i++)
    		{
    			if(bubbles[i].row > maxRow)
    				maxRow = bubbles[i].row;
    		}
			cc.director.runScene(new GameplayScene(bubbles, maxRow+1));
		}  	*/
	}
	
});
