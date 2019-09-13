var StreakDisplay = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 
		 this.dn = new cc.DrawNode();
		 this.addChild(this.dn);
		 this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 3, cc.color(0,0,0,255));
		
		 
		 this.titleLabel = new cc.LabelTTF("Streak (x1)", "HeaderFont", Math.floor(this.height*.25))
		 this.titleLabel.color = cc.color(0,0,0,255);
		 this.titleLabel.attr({
		 	x:this.width/2,
		 	y:this.height-3,
		 	anchorX:.5,
		 	anchorY:1
		 });
		 this.addChild(this.titleLabel);
		 
		 this.planetAImg = new cc.Sprite(res.concerned_face);
		 this.planetAImg.setScale(this.height*.6 / this.planetAImg.height);
		 this.planetAImg.attr({
		 	x:this.width/2-2,
		 	y:5,
		 	anchorX:1,
			anchorY:0
		 });
		 this.addChild(this.planetAImg);
		 
		 this.handImg = new cc.Sprite(res.thumb_down);
		 this.handImg.setScale(this.height*.6 / this.handImg.height);
		 this.handImg.attr({
		 	x:this.width/2 + 2,
		 	y:5,
		 	anchorX:0,
		 	anchorY:0
		 });
		 this.addChild(this.handImg);
		 
		 this.streakCountLabel = new cc.LabelTTF("0","HeaderFont",Math.floor(this.height*.6));
		 this.streakCountLabel.color = cc.color(0,0,0,255);
		 this.streakCountLabel.attr({
		 	x:this.width/2+2,
		 	y:5+Math.floor(this.height*.6),
		 	anchorX:0,
		 	anchorY:1
		 });
		 //this.addChild(this.streakCountLabel);
		 
		
		
		 
	}
	
	
});