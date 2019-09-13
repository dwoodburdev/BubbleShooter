var CreationListHeader = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(245,245,245,255), 0, cc.color(0,0,0,255));
		
		// Trophy button tab
		
		this.title = new cc.LabelTTF("Events Coming Soon", "HeaderFont", Math.floor(this.height*.4));
		this.title.color = cc.color(0,0,0,255);
		this.title.attr({
			x:this.width/2,
			y:this.height-6,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.title);
		
		this.subtextB = new cc.LabelTTF("New ways to play weekly!","HeaderFont",Math.floor(this.height*.25));
		this.subtextB.color = cc.color(0,0,0,255);
		this.subtextB.attr({
			x:this.width/2,
			y:6+(Math.floor(this.height*.25)),//+Math.floor(this.height*.3) + 1,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.subtextB);
		
		this.subtextA = new cc.LabelTTF("Use #EmojiPop / tag @emojipopgame", "HeaderFont", Math.floor(this.height*.3));
		this.subtextA.color = cc.color(0,0,0,255);
		this.subtextA.attr({
			x:this.width/2,
			y:this.height/2 - 1,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.subtextA);
		
		
	}
	
	
	
});