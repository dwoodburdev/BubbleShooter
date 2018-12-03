var PreChallengeLayer = cc.Layer.extend({
	ctor:function(challengeIndex, width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.challengeIndex = challengeIndex;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		cc.log(this.x + " " + this.y + "   " + this.width + " " + this.height);
		this.addChild(this.dn);
		
		
		this.playButton = new cc.Sprite(res.play_button_green);
		this.playButton.setScale((this.width/3)/this.playButton.width);
		this.playButton.attr({
			x:this.width/2,
			y:this.y+10,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.playButton);
		/*this.playButton = new Button(this.width/2, 25, "Play", 60, cc.color(0,255,0,255), cc.color(255,255,255,255));
        this.playButton.attr({
        	"anchorX":.5,
        	"anchorY":0
        });
        this.addChild(this.playButton);
        */
        this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":0,
        	"y":this.height-(this.closeButton.height*this.closeButton.scale),
        	"anchorX":0,
        	"anchorY":0
        });
		this.addChild(this.closeButton);
		
		var bubbles = DATA.challenges[0].bubbles;
		var maxRow = 0;
    	var bubbleData = [];
    	for(var i=0; i<bubbles.length; i++)
    	{cc.log(bubbles[i].row);
   			if(bubbles[i].row > maxRow)
    			maxRow = bubbles[i].row;
    	}
		this.bubblePreview = new BubbleLayer(bubbles,maxRow+1,10,"preview",(size.width-50)*.8,(this.height-50)*.5);
		this.bubblePreview.attr({
			x:this.x + (this.width-this.bubblePreview.width)/2,
			y:this.y + this.height-this.bubblePreview.height-35,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubblePreview);
		
		this.previewDraw = new cc.DrawNode();
		this.previewDraw.drawRect(cc.p(this.bubblePreview.x,this.bubblePreview.y+this.bubblePreview.height),cc.p(this.bubblePreview.x+this.bubblePreview.width,this.bubblePreview.y+this.bubblePreview.height+DATA.bubbleR),cc.color(255,255,255,255),0,cc.color(255,255,255,255));
		this.addChild(this.previewDraw,11);
	
		this.preBoosterA = new cc.Sprite(res.pre_booster_moves);
		this.preBoosterA.setScale(this.width/6 / this.preBoosterA.width);
		this.preBoosterA.attr({
			x:this.x+this.width/2 - (this.width/12),
			y:this.playButton.y+(this.playButton.height*this.playButton.scale)+(this.width/6),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.preBoosterA);
		
		this.tabTitleLabel = new cc.LabelTTF(DATA.challenges[this.challengeIndex].moves+" moves", "Roboto", 35);
		this.tabTitleLabel.attr({
			"x":this.x+this.width/2,
			"y":this.bubblePreview.y-2,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		var circleR = (this.preBoosterA.y - (this.playButton.y+(this.playButton.height*this.playButton.scale)) ) / 2;
		var circleY = (this.playButton.y+(this.playButton.height*this.playButton.scale)) + circleR;
		//circleR -= 2;
		circleR = 20;
		// Circles' lit color
		var circleColor = cc.color(255,0,0,255);
		if((DATA.streakStep == 1 && DATA.challengeTries == 0)
			|| (DATA.streakStep == 2 && DATA.challengeTries == 1))
		{
			circleColor = cc.color(255,255,0,255);
		}
		else if(DATA.streakStep == 2 && DATA.challengeTries == 0)
		{
			circleColor = cc.color(0,255,0,255);
		}
		
		this.dn.drawDot({x:this.x+this.width/2 - circleR*2 - 5, y:circleY}, circleR, circleColor);
		
		if((DATA.streakStep == 1 && DATA.challengeTries == 0) || (DATA.streakStep == 2 && DATA.challengeTries <= 1))
			this.dn.drawDot({x:this.x+this.width/2, y:circleY}, circleR, circleColor);
		else if(DATA.streakStep > 0)
			this.dn.drawDot({x:this.x+this.width/2, y:circleY}, circleR, cc.color(100,100,100,255));
		else
			this.dn.drawDot({x:this.x+this.width/2, y:circleY}, circleR, cc.color(0,0,0,255));
			
		if(DATA.streakStep == 2 && DATA.challengeTries == 0)
			this.dn.drawDot({x:this.x+this.width/2 + circleR*2 + 5, y:circleY}, circleR, circleColor);
		else if(DATA.streakStep == 2)
			this.dn.drawDot({x:this.x+this.width/2 + circleR*2 + 5, y:circleY}, circleR, cc.color(100,100,100,255));
		else this.dn.drawDot({x:this.x+this.width/2 + circleR*2 + 5, y:circleY}, circleR, cc.color(0,0,0,255));
		
		var playX = (this.playButton.x-(this.playButton.width*this.playButton.scale));
		this.tryAlert = null;
		if(DATA.streakStep==DATA.challengeTries)
		{
			this.tryAlert = new cc.Sprite(res.last_try_alert);
			this.tryAlert.setScale((playX-this.x-4) / this.tryAlert.width);
			this.tryAlert.attr({
				x:(playX-this.x)/2 + this.x,
				y:circleY,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.tryAlert);
		}
		else if(DATA.challengeTries == 0)
		{
			this.tryAlert = new cc.Sprite(res.first_try_alert);
			this.tryAlert.setScale((playX-this.x-4) / this.tryAlert.width);
			this.tryAlert.attr({
				x:(playX-this.x)/2 + this.x,
				y:circleY,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.tryAlert);
		}
	},
	
	onTouchEnd:function(pos)
	{cc.log("touchend");cc.log(pos);cc.log(this.closeButton.x + " " + this.closeButton.y+ " " + this.closeButton.scale);
		if(this.posWithin(pos, {"x":this.playButton.x,"y":this.playButton.y,"width":this.playButton.width*this.playButton.scale,"height":this.playButton.height*this.playButton.scale}))
    	{
    		var bubbles = DATA.challenges[this.challengeIndex].bubbles;
    		var numMoves = DATA.challenges[this.challengeIndex].moves;
    		cc.log(numMoves);
    		var maxRow = 0;
    		var bubbleData = [];
    		for(var i=0; i<bubbles.length; i++)
    		{
    			if(bubbles[i].row > maxRow)
    				maxRow = bubbles[i].row;
    		}
    		
    		cc.director.runScene(new ChallengeScene(bubbles, maxRow+1, numMoves));
    	}
    	else if(this.posWithin(pos, {"x":this.x+this.closeButton.x,"y":this.y+this.closeButton.y,"width":this.closeButton.width*this.closeButton.scale,"height":this.closeButton.height*this.closeButton.scale}))
    	{cc.log("close");
    		return "close";
    	}
    	else if(this.posWithin(pos, {x:this.x+this.preBoosterA.x,
    		y:this.y+this.preBoosterA.y,
    		width:this.preBoosterA.width*this.preBoosterA.scale,
    		height:this.preBoosterA.height*this.preBoosterA.scale}))
    	{
    		this.removeChild(this.preBoosterA);
    		this.preBoosterA = new cc.Sprite(res.pre_booster_moves_selected);
			this.preBoosterA.setScale(this.width/6 / this.preBoosterA.width);
			this.preBoosterA.attr({
				x:this.width/2 - (this.width/12),
				y:this.playButton.y+(this.playButton.height*this.playButton.scale)+(this.width/6),
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.preBoosterA);
			return "prebooster";
    	}
    	return null;
	},
	
	
	posWithin:function(pos, square)
	{
		if(pos.y > square.y && pos.y < square.y+square.height &&
			pos.x > square.x && pos.x < square.x+square.width)
			return true;
		return false;
	}
	
});
var PreChallengeScene = cc.Scene.extend({
	ctor:function(challengeIndex){
		this._super();
		this.challengeIndex = challengeIndex;
	},
	onEnter:function(){
		this._super();
		var layer = new PreChallengeLayer(this.challengeIndex);
		this.addChild(layer);
	}
});
