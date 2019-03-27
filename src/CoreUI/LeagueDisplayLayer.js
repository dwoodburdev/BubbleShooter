var LeagueDisplayLayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Dice Challenge", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		this.tabDescriptionLabel = new cc.LabelTTF("Beat levels to earn moves.", "Arial", 20);
		this.tabDescriptionLabel.attr({
			x:size.width/2,
			y:this.height-50,
			anchorX:.5,
			anchorY:1
		});
		this.tabDescriptionLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabDescriptionLabel);
		
		var bubbles = [{row:0,col:0,colorCode:"blue",binary:null,type:0,meta:null}];
		var numRows = 1;
		
		this.bubbleLayer = new BubbleLayer(bubbles, numRows, DATA.worldBallsLeft, "world", size.width, this.tabDescriptionLabel.y-this.tabDescriptionLabel.height-5, [], null);	
		this.bubbleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		
        //return true;
	},
	
	onTouchEnd:function(pos)
	{
		
	}
	
});
