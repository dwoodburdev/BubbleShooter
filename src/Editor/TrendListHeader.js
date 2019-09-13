var TrendListHeader = cc.Layer.extend({
	ctor:function(width, height, streak){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 this.streak = streak;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(245,245,245,255), 0, cc.color(0,0,0,255));
		
		
		
		this.title = new cc.LabelTTF("Daily Level", "HeaderFont", Math.floor(this.height*.5));
		this.title.color = cc.color(0,0,0,255);
		this.title.attr({
			x:this.width/2,
			y:this.height*.85,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.title);
		
		this.subTitle = new cc.LabelTTF("Earn moves by winning daily.", "HeaderFont", Math.floor(this.height*.25));
		this.subTitle.color = cc.color(0,0,0,255);
		this.subTitle.attr({
			x:this.width/2,
			y:this.height*.15,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.subTitle);
		
		
		/*
		this.title = new cc.LabelTTF("Reward:", "HeaderFont", Math.floor(this.height*.5));
		if(this.title.width > this.width/2)
		{
			this.title = new cc.LabelTTF("Reward:", "HeaderFont", Math.floor(this.height*.35));
		}
		this.title.color = cc.color(0,0,0,255);
		this.title.attr({
			x:15,
			y:this.height*.75,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.title);
		*/
		
		/*
		var starImgWidth = this.height*.7;
		var starDist = this.width-(this.title.x+this.title.width);
		if(starImgWidth > starDist/3)
		{
			starImgWidth = (starDist)/3
		}
		
		this.starImgA = new cc.Sprite(res.star_emoji);
		this.starImgA.setScale(starImgWidth / this.starImgA.height);
		this.starImgA.attr({
			x:this.title.x+(this.title.width)+1,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.starImgA);
		
		this.starImgB = new cc.Sprite(res.star_shadow);
		this.starImgB.setScale(starImgWidth / this.starImgB.height);
		this.starImgB.attr({
			x:this.starImgA.x+(this.starImgA.width*this.starImgA.scale)+1,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.starImgB);
		
		this.starImgC = new cc.Sprite(res.star_shadow);
		this.starImgC.setScale(starImgWidth / this.starImgC.height);
		this.starImgC.attr({
			x:this.starImgB.x+(this.starImgB.width*this.starImgB.scale)+1,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.starImgC);
		*/
		//this.starImgA = null;
		//this.starImgB = null;
		//this.starImgC = null;
		
		//this.updateStreak(this.streak);
	}
	/*
	updateStreak:function(streak)
	{cc.log(streak);
		if(this.starImgA != null)
			this.removeChild(this.starImgA);
		else if(this.starImgB != null)
			this.removeChild(this.starImgB);
		else if(this.starImgC != null)
			this.removeChild(this.starImgC);
		
		var starImgWidth = this.height*.7;
		var starDist = this.width-(this.title.x+this.title.width);
		if(starImgWidth > starDist/3)
		{
			starImgWidth = (starDist)/3
		}
		
		this.starImgA = new cc.Sprite(res.star_emoji);
		this.starImgA.setScale(starImgWidth / this.starImgA.height);
		this.starImgA.attr({
			x:this.title.x+(this.title.width)+1,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.starImgA);
		
		if(streak > 1)
			this.starImgB = new cc.Sprite(res.yellow_star_emoji);
		else 
			this.starImgB = new cc.Sprite(res.star_shadow);
		this.starImgB.setScale(starImgWidth / this.starImgB.height);
		this.starImgB.attr({
			x:this.starImgA.x+(this.starImgA.width*this.starImgA.scale)+1,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.starImgB);
		
		if(streak > 2)
			this.starImgC = new cc.Sprite(res.yellow_star_emoji);
		else 
			this.starImgC = new cc.Sprite(res.star_shadow);
		this.starImgC.setScale(starImgWidth / this.starImgC.height);
		this.starImgC.attr({
			x:this.starImgB.x+(this.starImgB.width*this.starImgB.scale)+1,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.starImgC);
		
		
		
		
		
	}*/
	
	
	
});