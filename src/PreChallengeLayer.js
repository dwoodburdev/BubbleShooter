var PreChallengeLayer = cc.Layer.extend({
	ctor:function(challengeIndex, width, height, challengeCaller){
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
		
		this.challengeCaller = challengeCaller;
		
		this.tabTitleLabel = new cc.LabelTTF("Challenges", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height-this.tabTitleLabel.height-5,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		this.playButton = new Button(this.width/2, 25, "Play", 60, cc.color(0,255,0,255), cc.color(255,255,255,255));
        this.playButton.attr({
        	"anchorX":.5,
        	"anchorY":0
        });
        this.addChild(this.playButton);
        
        this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":0,
        	"y":this.height,
        	"anchorX":.5,
        	"anchorY":.5
        });
		this.addChild(this.closeButton);
		
		/*var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
    		//cc.log(bubbles);
    	var maxRow = 0;
    	var bubbleData = [];
    	for(var i=0; i<bubbles.length; i++)
    	{
   			if(bubbles[i].row > maxRow)
    			maxRow = bubbles[i].row;
    	}
		this.bubblePreview = new BubbleLayer(bubbles,maxRow,1,"challenge",this.width*.9,this.height*.8);
		this.bubblePreview.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubblePreview,11);*/
		
		
		var self = this;
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){
			   		var target = event.getCurrentTarget();
			    	var locationInNode = self.convertToNodeSpace(touch.getLocation());

			    	
			    	
			    	return true;
			    },
			    onTouchMoved: function(touch, event){
			    	var target = event.getCurrentTarget();
			    	var locationInNode = self.convertToNodeSpace(touch.getLocation());

			    	
			    	
			    	return true;
			    },
			    onTouchEnded: function(touch, event){
				    var target = event.getCurrentTarget();
				    var locationInNode = self.convertToNodeSpace(touch.getLocation());
			    	
			    	if(self.playButton.pointWithin(locationInNode))
			    	{cc.log(":CHALLENGE INDEX:");cc.log(self.challengeIndex);
			    		var bubbles = DATA.challenges[self.challengeIndex].bubbles;
			    		var numMoves = DATA.challenges[self.challengeIndex].moves;
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
			    	else if(self.posWithin(locationInNode, self.closeButton))
			    	{cc.log("close");
			    		self.challengeCaller.removeChild(self);
			    	}
				   	
				 
			    	return true;
			    }
		    },this);
		}
		
        //return true;
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
