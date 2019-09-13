var ChallengeCollectionDisplayLayer = cc.Layer.extend({
	ctor:function(width,height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,0,0,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Dice Levels (Tier 1)", "Arial", 20);
		this.tabTitleLabel.attr({
			"x":this.width/2,
			"y":this.height-30,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		// Progress Bar, reward at end
		
		// Boxes for levels, completed ones filled in
		
		
		
	},
	
	onTouchEnd: function(pos)
	{
		
	}
	
});
var ChallengeCollectionDisplayScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new ChallengeCollectionDisplayLayer();
		this.addChild(layer);
	}
});
