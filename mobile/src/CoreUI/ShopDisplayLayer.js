var ShopDisplayLayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Shop", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		this.backArrow = new cc.Sprite(res.back_arrow_right);
		this.backArrow.setScale(size.width/7 / this.backArrow.width);
		this.backArrow.attr({
			"x":size.width-(size.width/7)-5,
			"y":5,
			"anchorX":0,
			"anchorY":0
		});
		this.addChild(this.backArrow);
		
		
        //return true;
	},
	
	onTouchEnd:function(pos)
	{
		if(this.pointWithin(pos, this.backArrow))
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
		}
	},
	
	pointWithin:function(pos,square)
	{
		if(pos.x > square.x && pos.x < square.x+square.width && pos.y > square.y && pos.y < square.y+square.height)
			return true;
		return false;
	}
	
});
