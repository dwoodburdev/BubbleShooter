var GameplayLayer = cc.Layer.extend({
	ctor:function(bubbles, numRows, height, meta, width, numMoves, type, colors, numStars, database, userId){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		this.height = height;
		this.width = width
		this.type = type; // created or feature
		this.colors = colors;
		this.numStars = numStars;
		
		this.database = database;
		
		this.userId = userId;
		
        cc.log(numMoves);
		var size = cc.winSize;
		 
		this.cardImg = null;
		
		this.colorCounts = {"yellow":0,"blue":0,"red":0,"green":0,"pink":0,"purple":0};
		this.colorGoals = {};
		
		//cc.log(bubbles);cc.log(meta);
		
		this.bubbleLayerHeight = this.height;

		this.bubbleLayer = new BubbleLayer(bubbles, numRows, numMoves, "world", this.width, this.height, [], meta, this.numStars, this.colors, this.database, this.userId);	// I CHANGED THIS USED SIZE
		this.bubbleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		this.bubbleLayer.defineEmojiGoals(this.colors);
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.preLayer = null;
		this.worldRewardsLayer = null;
		this.buyBallsLayer = null;
		this.noLevelLayer = null;
		this.buyPreboosterLayer = null;
		this.worldElementLayer = null;
		
		this.cardTutorial = false;
		
		this.shooterLabel = null;
		
		//if(DATA.levelIndexB != null)
		//	this.triggerLevelsFullLabel();
		//else if(this.bubbleLayer.numMoves <= 0)
		//	this.triggerBuyMovesLabel();
			
		this.rewardData = null;
		


		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawSegment(cc.p(0,0),cc.p(0,this.height),1,cc.color(0,0,0,255));
		
		
		
        return true;
	},
	/*onEnter:function()
	{
		this._super();
	},*/
	
	countMatchedBubble:function(colorCode)
	{
		this.colorCounts.colorCode++;
		if(this.colorCounts[colorCode] == this.colorGoals[colorCode])
		{
			// color is done, adjust playsidepanel
			
			// if all colors done, end level
		}
	},
	
	getChallengeButton:function()
	{
		return this.parent.coreButtonsUI.challengeButton;
	},
	
	executeTutorial:function(tutorial)
	{
		if(tutorial.type == "daily-challenges")
		{
			
		}
	},
	
	
	
	isPopup:function()
	{
		/*if(
			this.worldRewardsLayer == null &&
			this.buyBallsLayer == null &&
			this.noLevelLayer == null &&
			this.buyPreboosterLayer == null &&
			this.worldElementLayer == null &&
			this.cardImg == null)
		{*/
			return false;
		//}
		//return true;
	},
	
	onTouchBegan:function(pos)
	{cc.log("GAMEPLAY TOUCH BEGIN");cc.log(pos);
		if(!this.isPopup() && this.bubbleLayer.numMoves > 0)
	   	{
		   	var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
		   	cc.log(locationInNode);
		//	if(FUNCTIONS.posWithin(locationInNode, this.bubbleLayer))
	    	//{
			if(locationInNode.x > this.bubbleLayer.x && locationInNode.x < this.bubbleLayer.x+this.bubbleLayer.width &&
				locationInNode.y > this.bubbleLayer.y && locationInNode.y < this.bubbleLayer.y+this.bubbleLayer.height)
			{
	    			this.bubbleLayer.onTouchBegin(locationInNode);
			}
	    	//}
	    }
	},
	onTouchMoved:function(pos)
	{cc.log("GAMEPLAY TOUCH MOVE");cc.log(pos);
		if(!this.isPopup() && this.bubbleLayer.numMoves > 0)
	   	{
			var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
			if(this.bubbleLayer.pointWithin(locationInNode))
	    	{
	    		this.bubbleLayer.onTouchMove(locationInNode);
	    	}
    	}
	},
	onTouchEnded:function(pos)
	{cc.log("GAMEPLAY TOUCH END");cc.log(pos);
	   	var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
	   	if(!this.isPopup())
	   	{cc.log("no popup");
	   		// Bubble Layer - check for shooting-preventing popups, otherwise allow shot
			//if(FUNCTIONS.posWithin(locationInNode, this.bubbleLayer))
		   	//if(FUNCTIONS.posWithin(this.convertToNodeSpace(pos), this.bubbleLayer))
		   	//{cc.log("withinBub");
		   	var conPos = this.convertToNodeSpace(pos);
		   	if(conPos.x > this.bubbleLayer.x && conPos.x < this.bubbleLayer.x+this.bubbleLayer.width &&
		   		conPos.y > this.bubbleLayer.y && conPos.y < this.bubbleLayer.y+this.bubbleLayer.height)
		   	{	
				this.bubbleLayer.onTouchEnd(locationInNode);
		   	}
		   	//}
		   	// Store/Challenge/Creator Button Interactions
		   	
		   	
		}
		// Popup interactions
		else
		{
			
		}
	},
	coreUITouched:function(pos)
	{
		
   		cc.log(this.parent);
   		var returnObj = this.parent.coreButtonsUI.onTouchEnd(this.parent.coreButtonsUI.convertToNodeSpace(pos));
   		
   		 if(returnObj == "creator")
   		{
   			this.parent.swapCreatorMode();
   		}
	}
	
});