var MeDisplayLayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Featured Levels", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		this.instructionsLabelA = new cc.LabelTTF("Tweet out your level with", "HeaderFont", 20);
		this.instructionsLabelA.color = cc.color(0,0,0,255);
		this.instructionsLabelA.attr({
			x:size.width/2,
			y:this.tabTitleLabel.y - 40 - 3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.instructionsLabelA);
		
		this.instructionsLabelB = new cc.LabelTTF("#emojipop to get featured!", "HeaderFont", 20);
		this.instructionsLabelB.color = cc.color(0,0,0,255);
		this.instructionsLabelB.attr({
			x:size.width/2,
			y:this.instructionsLabelA.y - 20 - 1,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.instructionsLabelB);
		
		//this.imgA = new cc.Sprite()
		
		
		
        //return true;
	},
	
	onTouchEnd:function(pos)
	{
		
	}
	
});
