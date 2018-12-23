var ChallengeTopUILayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
		
        var size = cc.winSize;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		//this.width = w;
		this.height = height;
		
		
		this.settingsButton = new cc.Sprite(res.settings_icon);
		this.settingsButton.setScale(this.height / this.settingsButton.height);
		this.settingsButton.attr({
			x: size.width,
			y: this.y,
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.settingsButton);
		
		this.draw();
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
	},
	
	onTouchEnd:function(pos)
	{
		if(FUNCTIONS.posWithinScaled(pos, this.settingsButton))
		{
			return "settings";
		}	
	},
	
	
});
