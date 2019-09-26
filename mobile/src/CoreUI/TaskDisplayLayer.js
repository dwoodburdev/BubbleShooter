var TaskDisplayLayer = cc.Layer.extend({
	ctor:function(height, userLevels){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		this.width = size.width;
		
		this.userLevels = userLevels;cc.log(this.userLevels);cc.log("TASK LAYER");
		
		this.bgDn = new cc.DrawNode();
		this.bgDn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.bgDn);
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.tabTitleLabel = new cc.LabelTTF("Your Levels", "HeaderFont", Math.floor(this.height*.065));
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height-3,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		cc.log("LEVELS PANEL A");
		this.levelsPanel = new LevelViewerUILayer(this.width, this.height - 3 - Math.floor(this.height*.065), this.userLevels);
		this.levelsPanel.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.levelsPanel);
		
		
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
