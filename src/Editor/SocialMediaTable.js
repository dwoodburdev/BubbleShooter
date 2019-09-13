var SocialMediaTable = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		//this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,0,0,255), 1, cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(0,0), cc.p(this.width/2, this.height/2), cc.color(255,0,0,255), 0, cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.width/2,0), cc.p(this.width, this.height/2), cc.color(0,255,0,255), 0, cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(0,this.height/2), cc.p(this.width/2, this.height), cc.color(0,0,255,255), 0, cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.width/2,this.height/2), cc.p(this.width, this.height), cc.color(0,255,255,255), 0, cc.color(0,0,0,255));
		
		this.labelA = new cc.LabelTTF("@emojipopgame", "Arial", 16);
		this.labelA.color = cc.color(0,0,0,255);
		this.labelA.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.labelA);
		
	}
	
});