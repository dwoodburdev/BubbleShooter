var NextObstacleLayer = cc.Layer.extend({
	ctor:function(width, height, numStars){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.count = 0;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 3, cc.color(0,0,0,255));
		
		
		//this.progStars = this.parent.parent.parent.numStars;
		//if(this.progStars > )
		//	this.progStars -= ;
		
		
		this.progStars = 0;
		this.goalStars = 0;
		
		
		this.updateNextObstacle(numStars);
		
		this.drawProgBar();
		
		
		
		
		this.nextLabel = new cc.LabelTTF("Next Obstacle", "HeaderFont", 20);
		this.nextLabel.color = cc.color(0,0,0,255);
		this.nextLabel.attr({
			x:5,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		//this.addChild(this.nextLabel);
		
		this.counterLabel = new cc.LabelTTF(this.progStars+" / "+this.goalStars, "HeaderFont", 20);
		this.counterLabel.color = cc.color(0,0,0,255);
		this.counterLabel.attr({
			x:this.width*.75,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.counterLabel);
		
		this.starImg = new cc.Sprite(res.yellow_star_emoji);
		this.starImg.setScale(this.height*.8 / this.starImg.height);
		this.starImg.attr({
			x:this.counterLabel.x + (this.counterLabel.width/2)+1,
			y:this.height/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.starImg);
		
	},
	
	updateNextObstacle:function(numStars)
	{cc.log(numStars);
		
		if(this.nextObstacleImg != null)
			this.removeChild(this.nextObstacleImg);
		
		this.progStars = 0;
		this.goalStars = 0;
		if(numStars == 0)
		{
			this.nextObstacleImg = new cc.Sprite(res.soap_emoji);
			this.progStars = 0;
			this.goalStars = 1;
		}
		else if(numStars < 3)
		{
			this.nextObstacleImg = new cc.Sprite(res.bomb_emoji);
			this.progStars = numStars-1;
			this.goalStars = 2;
		}
		else if(numStars < 6)
		{
			this.nextObstacleImg = new cc.Sprite(res.red_snail_emoji);
			this.progStars = numStars-3;
			this.goalStars = 3;
		}
		else if(numStars < 11)
		{
			this.nextObstacleImg = new cc.Sprite(res.bubble_wrap_emoji);
			this.progStars = numStars-6;
			this.goalStars = 5;
		}
		else if(numStars < 18)
		{
			this.nextObstacleImg = new cc.Sprite(res.red_die_emoji);
			this.progStars = numStars-11;
			this.goalStars = 7;
		}
		else if(numStars < 28)
		{
			this.nextObstacleImg = new cc.Sprite(res.cloud_emoji);
			this.progStars = numStars-18;
			this.goalStars = 10;
		}
		else if(numStars < 41)
		{
			this.nextObstacleImg = new cc.Sprite(res.neutral_orb_emoji);
			this.progStars = numStars-28;
			this.goalStars = 13;
		}
		else if(numStars < 67)
		{
			this.nextObstacleImg = new cc.Sprite(res.red_egg);
			this.progStars = numStars-41;
			this.goalStars = 16;
		}
		else if(numStars < 87)
		{
			this.nextObstacleImg = new cc.Sprite(res.left_dagger_emoji);
			this.progStars = numStars-67;
			this.goalStars = 20;
		}
		else if(numStars < 112)
		{
			this.nextObstacleImg = new cc.Sprite(res.red_bulb_emoji);
			this.progStars = numStars-87;
			this.goalStars = 25;
		}
		else if(numStars < 142)
		{
			this.nextObstacleImg = new cc.Sprite(res.red_ghost_emoji);
			this.progStars = numStars-112;
			this.goalStars = 30;
		}
		else if(numStars < 177)
		{
			this.nextObstacleImg = new cc.Sprite(res.red_balloon_emoji);
			this.progStars = numStars-142;
			this.goalStars = 35;
		}
		else if(numStars < 217)
		{
			this.nextObstacleImg = new cc.Sprite(res.red_soapbar_emoji);
			this.progStars = numStars-177;
			this.goalStars = 40;
		}
		
		this.nextObstacleImg.setScale(this.height / this.nextObstacleImg.height);
		this.nextObstacleImg.attr({
			x:this.width/2,
			y:0,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.nextObstacleImg);
	},
	
	refresh:function(numStars)
	{
		this.updateNextObstacle(numStars);
		this.counterLabel.setString(this.progStars+" / "+this.goalStars);
		this.drawProgBar();
	},
	
	bumpStars:function()
	{
		this.count++;
		this.counterLabel.setString(this.count+" / "+this.goalStars);
		
		this.drawProgBar();
	},
	
	drawProgBar:function()
	{cc.log("drawing prog bar");cc.log(this.progStars/this.goalStars);
		this.dn.drawRect(cc.p(1,1), cc.p(this.width*(this.progStars/this.goalStars)-2, this.height-1), cc.color(0,255,0,255), 0, cc.color(0,0,0,255));
		
	}
	
});