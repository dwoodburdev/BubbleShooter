var WinStreakVisLayer = cc.Layer.extend({
	ctor:function(width,height, type){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		

		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.width = width;
		this.height = height;
		this.type = type;
		
		
		//var xSpace = this.width*.908 - this.width*.25;
		var xSpace = this.width;
		var borderSpace = (.1*xSpace)/4;
		xSpace *= .9; // space between;
		var mB = 1.25; // how much bigger are circles
		var mC = 1.5;
		var spaceA = xSpace / (1 + mB + mC);
		var spaceB = spaceA * mB;
		var spaceC = spaceA * mC;
		//var startX = this.width*.908 - xSpace - borderSpace*4;
		var startX = this.width*.092 + (this.width*.816 - (xSpace+borderSpace*4))/2;
		
		//var circleY = this.tryAlert.y+(this.tryAlert.height*this.tryAlert.scale)/2;
		var circleY = this.height*.14+spaceC/2;
		
		// Circles' lit color
		var circleColor = cc.color(255,0,0,255);
		
		var streakStep = 0;
		var challengeTries = 0;
		
		if((streakStep == 1 && challengeTries == 0)
			|| (streakStep == 2 && challengeTries == 1))
		{
			circleColor = cc.color(255,255,0,255);
		}
		else if(streakStep == 2 && challengeTries == 0)
		{
			circleColor = cc.color(0,255,0,255);
		}
		
		this.faceA = null;
		this.faceB = null;
		this.faceC = null;
		
		// Face 1
		var yOffset = 0;
		
			this.faceA = new cc.Sprite(res.concerned_face);
			this.faceA.setScale(spaceA / this.faceA.width);
		
		this.faceA.attr({
			x:startX + spaceA/2 + borderSpace,
			y:circleY+yOffset,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.faceA);
		//this.dn.drawDot({x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + spaceA/2 + borderSpace, y:circleY}, spaceA/2, circleColor);
		
		// Face 2
		yOffset = 0;
		if(streakStep == 0)
		{// black dot
			this.dn.drawDot({x:startX + (spaceA+(spaceB/2)) + borderSpace*2, y:circleY}, spaceB/2, cc.color(0,0,0,255));
		}
		else if((streakStep == 1 && challengeTries == 1) || (streakStep == 2 && challengeTries == 2))
		{// sad face
			this.faceB = new cc.Sprite(res.sad_emoji);
			this.faceB.setScale(spaceB / this.faceB.width);
			this.faceB.attr({
				x:startX + spaceA + spaceB/2 + borderSpace*2,
				y:circleY+yOffset,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.faceB);
		}
		else
		{// other face
				this.faceB = new cc.Sprite(res.sunglass_face);
				this.faceB.setScale(spaceB / this.faceB.width);
			
			this.faceB.attr({
				x:startX + spaceA + spaceB/2 + borderSpace*2,
				y:circleY+yOffset,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.faceB);
			
			if(this.type == "win" && streakStep == 0 && challengeTries == 0)
			{
				
				var seq = new cc.Sequence(cc.FadeOut.create(.5), cc.FadeIn.create(.35), cc.delayTime(.75));
				this.faceB.runAction(new cc.RepeatForever(seq));
			}
		}
		
			
		// Face 3
		
		if(streakStep < 2)
		{// black dot
			this.dn.drawDot({x:startX + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, cc.color(0,0,0,255));
		}
		else if(streakStep == 2 && challengeTries >= 1)
		{// sad face
			this.faceC = new cc.Sprite(res.sad_emoji);
			this.faceC.setScale(spaceC / this.faceC.width);
			this.faceC.attr({
				x:startX + spaceA + spaceB + spaceC/2 + borderSpace*3,
				y:circleY,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.faceC);
		}
		else
		{// other face
			this.faceC = new cc.Sprite(res.crown_face);
			
			
			this.faceC.setScale(spaceC / this.faceC.width);
			this.faceC.attr({
				x:startX + spaceA + spaceB + spaceC/2 + borderSpace*3,
				y:circleY + this.faceC.height*this.faceC.scale*.16,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.faceC);
			
			if(this.type == "win" && streakStep == 2 && challengeTries == 0)
			{
				
				var seq = new cc.Sequence(cc.FadeOut.create(.5), cc.FadeIn.create(.35), cc.delayTime(.75));
				this.faceC.runAction(new cc.RepeatForever(seq));
			}
		}
		/*	
		if(streakStep == 2 && challengeTries == 0)
		{
			this.dn.drawDot({x:startX + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, circleColor);
		}
		else if(streakStep == 2)
		{
			this.dn.drawDot({x:startX + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, cc.color(100,100,100,255));
		}
		else 
		{
			this.dn.drawDot({x:startX + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, cc.color(0,0,0,255));
		}
		*/
	},
	
	
	onTouchEnd: function(pos)
	{cc.log(pos);pos = this.convertToNodeSpace(pos);
		
	}
	
});
