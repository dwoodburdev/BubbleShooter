var FolderListHeader = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(245,245,245,255), 0, cc.color(0,0,0,255));
		
		this.profImg = new cc.Sprite(res.prof_pic);
		this.profImg.setScale(this.height*.9 / this.profImg.height);
		this.profImg.attr({
			x:3,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		//this.addChild(this.profImg);
		
		this.title = new cc.LabelTTF("Your Levels", "HeaderFont", Math.floor(this.height*.6));
		this.title.color = cc.color(0,0,0,255);
		this.title.attr({
			x:this.width/2,
			y:this.height-2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.title);
		
		this.rankedText = new cc.LabelTTF("Ranked: -", "HeaderFont", Math.floor(this.height*.3));
		this.rankedText.color = cc.color(0,0,0,255);
		this.rankedText.attr({
			x:this.profImg.x+(this.profImg.width*this.profImg.scale)+1,
			y:1+Math.floor(this.height*.3),
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.rankedText);
		
		this.likesText = new cc.LabelTTF("Likes: -", "HeaderFont", Math.floor(this.height*.3));
		this.likesText.color = cc.color(0,0,0,255);
		this.likesText.attr({
			x:this.width*.67,
			y:1+Math.floor(this.height*.3),
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.likesText);
		
	}
	
	
	
});