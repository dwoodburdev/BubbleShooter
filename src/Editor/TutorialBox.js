var TutorialBox = cc.Layer.extend({
	ctor:function(width, height, type){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		this.type = type;
		
		this.bgColor = cc.color(255,255,255,255);
		this.bgBorder = 4;
		
		if(this.type == "login")
		{
			this.bgColor = cc.color(0,255,0,255);
			this.bgBorder = 7;
		}
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), this.bgColor, 4, cc.color(0,0,0,255));
	
		var text = "";
		if(this.type == "play")
			text = "Play";
		else if(this.type == "login")
			text = "Sign up!"
		else if(this.type == "make")
			text = "Create";
	
		var textY = this.height-3;
		if(this.type == "login")
			textY = this.height/2 + Math.floor(this.height*.35)/2
	
		this.textLabel = new cc.LabelTTF(text, "HeaderFont", Math.floor(this.height*.35));
		this.textLabel.color = cc.color(0,0,0,255);
		this.textLabel.attr({
			x:this.width/2,
			y:textY,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.textLabel);
		
		this.arrowImg = null;
		if(this.type == "make")
		{
			this.arrowImg = new cc.Sprite(res.left_arrow);
			this.arrowImg.setScale(this.height*.8 / this.arrowImg.height);
			this.arrowImg.attr({
				x:0-(this.arrowImg.width*.5*this.arrowImg.scale),
				y:this.height/2,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.arrowImg);
		}
		else if(this.type == "play")
		{
			this.arrowImg = new cc.Sprite(res.right_arrow);
			this.arrowImg.setScale(this.height*.8 / this.arrowImg.height);
			this.arrowImg.attr({
				x:this.width-(this.arrowImg.width*.5*this.arrowImg.scale),
				y:this.height/2,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.arrowImg);
		}
		
	},
	
	onTouchEnded:function(pos)
	{
		
	}
	
	
	
});