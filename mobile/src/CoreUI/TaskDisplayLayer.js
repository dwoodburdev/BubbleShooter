var TaskDisplayLayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		this.width = size.width;
		
		
		this.bgDn = new cc.DrawNode();
		this.bgDn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.bgDn);
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.tabTitleLabel = new cc.LabelTTF("Tasks", "HeaderFont", Math.floor(this.height*.065));
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height-3,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		
	},
	
	
	onTouchBegan:function(pos)
	{
		
	},
	onTouchMoved:function(pos)
	{
		
	},
	
	onTouchEnded:function(pos)
	{cc.log(pos);
		
	}
	
	
	
});
