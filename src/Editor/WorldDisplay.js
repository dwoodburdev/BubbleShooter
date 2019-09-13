var WorldDisplay = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 
		 this.dn = new cc.DrawNode();
		 this.addChild(this.dn);
		 this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 3, cc.color(0,0,0,255));
		
		 
		 this.titleLabel = new cc.LabelTTF("Next Emoji", "HeaderFont", Math.floor(this.height*.25))
		 this.titleLabel.color = cc.color(0,0,0,255);
		 this.titleLabel.attr({
		 	x:this.width/2,
		 	y:this.height-3,
		 	anchorX:.5,
		 	anchorY:1
		 });
		 this.addChild(this.titleLabel);
		 
		 this.planetAImg = new cc.Sprite(res.evil_emoji);
		 this.planetAImg.setScale(this.height*.45 / this.planetAImg.height);
		 this.planetAImg.attr({
		 	x:this.width/2,
		 	y:5+this.height*.15+5,
		 	anchorX:.5,
			anchorY:0
		 });
		 this.addChild(this.planetAImg);
		
		//this.planetLabel = new cc.LabelTTF("World ")
		
		
		//this.dn.drawRect(cc.p(this.width/2-(this.width*.25), 5), cc.p(this.width/2+(this.width*.25), 5+this.height*.15), cc.color(255,255,255,255), 3, cc.color(0,0,0,255));
		
		
		this.countLabel = new cc.LabelTTF("0 / 1", "HeaderFont", Math.floor(this.height*.22));
		this.countLabel.color = cc.color(0,0,0,255);
		this.countLabel.attr({
			x:this.width*.45,
			y:5 + Math.floor(this.height*.22),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.countLabel);
		
		this.trophyImg = new cc.Sprite(res.world_planet);
		this.trophyImg.setScale(Math.floor(this.height*.22) / this.trophyImg.height);
		this.trophyImg.attr({
			x:this.countLabel.x+this.countLabel.width/2 + 2,
			y:this.countLabel.y,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.trophyImg);
		
		this.leftArrow = new cc.Sprite(res.left_arrow);
		this.leftArrow.setScale(this.height*.15 / this.leftArrow.height);
		this.leftArrow.attr({
			x:3,
			y:3,
			anchorX:0,
			anchorY:0
		});
		//this.addChild(this.leftArrow);
		 
		this.rightArrow = new cc.Sprite(res.right_arrow);
		this.rightArrow.setScale(this.height*.15 / this.rightArrow.height);
		this.rightArrow.attr({
			x:this.width-3,
			y:3,
			anchorX:1,
			anchorY:0
		});
		//this.addChild(this.rightArrow);
		 
		 
	}
	
	
});