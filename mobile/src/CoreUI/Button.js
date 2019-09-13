var Button = cc.Sprite.extend({
	ctor:function(x,y,text, textSize, bgColor, textColor){
		this._super();
		cc.associateWithNative( this, cc.Sprite );

        this.x = x;
        this.y = y;
        
        this.text = text;
        
	    this.bgColor = bgColor;
	    this.textColor = textColor;
	    
	    this.textSize = textSize;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		
		this.label = new cc.LabelTTF(""+this.text, "Arial", this.textSize);
		//this.label.x = this.x;
		//this.label.y = this.y;
		this.label.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.label.color = this.textColor;
		this.addChild(this.label);
		this.width = this.label.getContentSize().width;
		this.height = this.label.getContentSize().height;
		
		this.draw();
	},
	
	draw:function(){
		var x1Val = 0;
		var y1Val = 0;
		var x2Val = this.width;
		var y2Val = this.height;
		
		this.dn.drawRect(cc.p(x1Val,y1Val),cc.p(x2Val,y2Val),this.bgColor,3,cc.color(0,0,0,255));
	},
	pointWithin:function(point){
		if(point.x > this.x-this.width/2 && point.x < this.x+this.width/2 &&
			point.y > this.y-this.height/2 && point.y < this.y+this.height/2){
			return true;
		}
		return false;
	}
	
});
