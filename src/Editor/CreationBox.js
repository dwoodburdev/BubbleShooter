var CreationBox = cc.Layer.extend({
	ctor:function(width, height, name){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.name = name;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
	
		this.placeText = new cc.LabelTTF(this.rank,"HeaderFont",Math.floor(this.height/2));
		this.placeText.color = cc.color(0,0,0,255);
		this.placeText.attr({
			x:5,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.placeText);
	
		this.nameLabel = new cc.LabelTTF(this.name, "HeaderFont", Math.floor(this.height*.35));
		this.nameLabel.color = cc.color(0,0,0,255);
		this.nameLabel.attr({
			x:this.width/2,
			y:this.height*.5 + (Math.floor(this.height*.35))/2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.nameLabel);
		
	
	}
	
	
	
});