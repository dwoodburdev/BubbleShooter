var SocialMediaLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
		
		this.titleText = new cc.LabelTTF("Follow", "Arial", 20);
		this.titleText.color = cc.color(0,0,0,255);
		this.titleText.attr({
			x:this.width/2,
			y:this.height-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleText);
			
		/*
		this.upArrow = new cc.Sprite(res.up_arrow);
		this.upArrow.setScale(this.width/12 / this.upArrow.width);
		this.upArrow.attr({
			x:this.width/24,
			y:this.height,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.upArrow);
		*/
		
	}
	
	
	
});