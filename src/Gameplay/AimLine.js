var AimLine = cc.Sprite.extend({
	ctor:function(origin,target,color){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
        
        this.origin = origin;
        this.target = target;
        this.color = color;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.draw();
	},
	
	draw:function()
	{
		
		//this.dn.drawSegment(cc.p(this.origin.x,this.origin.y),cc.p(this.target.x, this.target.y),1,this.color);
	},
	
	moveTargetTo:function(target)
	{
		this.target = target;
		this.clear();
		this.draw();
	},
	clear:function()
	{
		this.dn.clear();
	}
	
});
