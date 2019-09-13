var GameplayLayer = cc.Layer.extend({
	ctor:function(bubbles, numRows, height, meta, worldColorA, worldColorB, queueCounts, queueBlueprint, database, userId){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		this.height = height;
        
		var size = cc.winSize;
		 
		this.cardImg = null;
		
		//cc.log(bubbles);cc.log(meta);
		
		this.bubbleLayerHeight = this.height;
		
		this.worldColorA = worldColorA;
		this.worldColorB = worldColorB;
		this.queueCounts = queueCounts;
		this.queueBlueprint = queueBlueprint;
		
		this.database = database; 
		this.userId = userId;

		this.bubbleLayer = new BubbleLayer(bubbles, numRows, 99, "world", size.width, this.height, [], 
			meta, this.worldColorA, this.worldColorB, this.queueCounts, this.queueBlueprint, this.database, this.userId);	
		this.bubbleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
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
		
		this.rewardData = null;
		

		
		
        return true;
	},
	/*onEnter:function()
	{
		this._super();
	},*/
	
	getChallengeButton:function()
	{
		return this.parent.coreButtonsUI.challengeButton;
	},
	
	
	refreshUIQuantities:function()
	{
		this.bubbleLayer.ballsLeftLabel.setString(DATA.worldBallsLeft);
		this.parent.topUILayer.setCoins(DATA.coins);
		
	},
	
	
	onTouchBegan:function(pos)
	{cc.log("GAMEPLAY TOUCH BEGIN");cc.log(pos);
		if(this.bubbleLayer.numMoves > 0)
	   	{
		   	var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
		   	cc.log(locationInNode);
			if(this.posWithin(locationInNode, this.bubbleLayer))
	    	{
	    		this.bubbleLayer.onTouchBegin(locationInNode);
	    	}
	    }
	},
	onTouchMoved:function(pos)
	{cc.log("GAMEPLAY TOUCH MOVE");cc.log(pos);
		if(this.bubbleLayer.numMoves > 0)
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
	   	
	   		// Bubble Layer - check for shooting-preventing popups, otherwise allow shot
			//if(FUNCTIONS.posWithin(locationInNode, this.bubbleLayer))
		   	if(this.posWithin(this.convertToNodeSpace(pos), this.bubbleLayer))
		   	{cc.log("withinBub");
		   		this.bubbleLayer.onTouchEnd(locationInNode);
		   	}
		   	// Store/Challenge/Creator Button Interactions
		   	
		   	
		
	},
	
	coreUITouched:function(pos)
	{
		//else if(FUNCTIONS.posWithin(this.parent.coreButtonsUI.convertToNodeSpace(pos), this.parent.coreButtonsUI))
		//   	{
		   		cc.log(this.parent);
		   		var returnObj = this.parent.coreButtonsUI.onTouchEnd(this.parent.coreButtonsUI.convertToNodeSpace(pos));
		   		
		   	//}
	},
	
	posWithin:function(a,b)
	{
		if(a.x > b.x && a.x < b.x+b.width && a.y > b.y && a.y < b.y+b.height)
			return true;
		return false;
	}
	
	
});