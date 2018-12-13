var ProgressBar = cc.Sprite.extend({
	ctor:function(x,y,width,height){
		this._super();
		cc.associateWithNative( this, cc.Sprite );

		//this.x = x;
		//this.y = y;
        this.width = width;
        this.height = height;
        
        this.prog = 0;
        this.subProg = 0;
       
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		
		
		
		//this.draw();
	},
	
	setProg:function(prog)
	{
		this.prog = prog;
		this.draw();
	},
	
	setSubProg:function(subProg)
	{
		this.subProg = subProg;
		this.draw();
	},
	
	draw:function(){
		var x1Val = 0;
		var y1Val = 0;
		var x2Val = x1Val + this.width;
		var y2Val = y1Val + this.height;
		var x2ProgVal = x1Val+2 + this.width*this.prog;
		
		this.dn.drawRect(cc.p(x1Val,y1Val),cc.p(x2Val,y2Val),cc.color(255,255,255,255),3,cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(x1Val+2,y1Val+2),cc.p(x2ProgVal,y2Val-2),cc.color(0,255,0,255),0,cc.color(0,0,0,255));
		
		if(this.subProg != 0)
		{
			this.dn.drawRect(cc.p(x1Val+2 + (this.prog-this.subProg)*this.width, y1Val+2),cc.p(x2ProgVal,y2Val-2),cc.color(255,255,0,255),0,cc.color(0,0,0,255));
		}
		
	}
	
});
