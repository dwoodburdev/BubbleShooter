var TopUILayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
		
        var size = cc.winSize;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		//this.width = w;
		this.height = height;
		
		
		this.color = cc.color(220,220,220,255);
		
		/*
		this.gradient = cc.LayerGradient.create(cc.color(170,170,170,255), cc.color(220,220,220,255) );
		this.gradient.setContentSize(cc.size(size.width, this.height));
    	this.addChild(this.gradient);
		*/
		
		this.settingsButton = new cc.Sprite(res.settings_icon);
		this.settingsButton.setScale((this.height-4) / this.settingsButton.height);
		this.settingsButton.attr({
			x:2,
			y:2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.settingsButton);
		
		this.titleImg = new cc.Sprite(res.title_header);
		this.titleImg.setScale(this.height*.95 / this.titleImg.height);
		this.titleImg.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.titleImg);
		
		
		this.draw();
	},
	
	changeToEditor:function()
	{
		this.color = cc.color(255,140,0,255);
		this.draw();
	},
	changeToGame:function()
	{
		this.color = cc.color(220,220,220,255);
		this.draw();
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(0,0),cc.p(this.width, this.height), this.color,1,cc.color(0,0,0,255));
		
	},
	
	onTouchEnd:function(pos)
	{
		var loc = this.convertToNodeSpace(pos);cc.log(loc);
		if(FUNCTIONS.posWithinScaled(loc, this.settingsButton))
		{cc.log("settings");
			this.parent.openSettingsLayer();
		}
		
	}
	
});
