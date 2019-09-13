var FriendAddListHeader = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(245,245,245,255), 0, cc.color(0,0,0,255));
		
		
		this.title = new cc.LabelTTF("Friends", "Arial", 20);
		this.title.color = cc.color(0,0,0,255);
		this.title.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.title);
	}
	
	
	
});