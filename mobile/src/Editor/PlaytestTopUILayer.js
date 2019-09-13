var PlaytestTopUILayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
		
        var size = cc.winSize;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		//this.width = w;
		this.height = height;
		
		
		this.editButton = new cc.Sprite(res.edit_button);
		this.editButton.setScale(this.height / this.editButton.height);
		this.editButton.attr({
			x: size.width,
			y: this.y,
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.editButton);
		
		this.shareButton = new cc.Sprite(res.share_button);
		this.shareButton.setScale(this.height / this.shareButton.height);
		this.shareButton.attr({
			x: size.width-(this.editButton.width*this.editButton.scale)-2,
			y: this.y,
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.shareButton);
		
		
		
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
