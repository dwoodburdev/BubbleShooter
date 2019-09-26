var LevelSourceBox = cc.Layer.extend({
	ctor:function(num, width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.num = num;
		this.height = height;
		this.width = width;
		
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),3,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
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
