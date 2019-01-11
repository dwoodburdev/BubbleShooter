var ChallengeRewardLayer = cc.Layer.extend({
	ctor:function(rankUpBool){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.rankUpBool = rankUpBool;
		
		this.topUILayer = new TopUILayer(size.height/15);
		this.topUILayer.attr({
			x: 0,
			y:size.height-(size.height/15),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.topUILayer,9);
		
		this.winSummaryLayer = null;
		this.winSummaryLayer = new ChallengeWinSummaryLayer(size.width, size.height-this.topUILayer.height);
		this.addChild(this.winSummaryLayer);
		
		this.rankUpLayer = null;
		
		
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
			    	
			    	/*
			    	if(locationInNode.x > self.nextButton.x && locationInNode.x < self.nextButton.x+(self.nextButton.width*self.nextButton.scale)
			    	&& locationInNode.y > self.nextButton.y && locationInNode.y < self.nextButton.y+(self.nextButton.height*self.nextButton.scale))
			    	{
			    	*/
			    		if(self.winSummaryLayer != null)
			    		{cc.log("win sum");
			    			var returnObj = self.winSummaryLayer.onTouchEnd(locationInNode);
			    			if(returnObj == "next")
			    			{
			    				self.removeChild(self.winSummaryLayer);
			    				self.winSummaryLayer = null;
			    				if(!self.rankUpBool)
			    				{
				    				if(DATA.streakStep>1 && DATA.challengeTries==0)
										self.bonusRewardPicker = new ExtraBonusRewardPickerLayer(size.width, size.height-self.topUILayer.height);
									else self.bonusRewardPicker = new BonusRewardPickerLayer(size.width, size.height-self.topUILayer.height);
									
									self.bonusRewardPicker.attr({
										"x":size.width*.05,
										"y":10,
										"anchorX":0,
										"anchorY":0
									});
				    				self.addChild(self.bonusRewardPicker);
			    				}
			    				else if(self.rankUpBool)
			    				{
			    					self.rankUpLayer = new RankUpLayer(size.width, size.height-self.topUILayer.height);
			    					self.addChild(self.rankUpLayer);
			    					
			    				}
			    			}
			    		}
			    		else if(self.rankUpLayer != null)
			    		{
			    			if(!self.rankUpLayer.chestOpened)
			    			{
			    				self.rankUpLayer.onTouchEnd();
			    				
			    				
			    				
			    			}	
			    			else if(self.rankUpLayer.chestOpened)
			    			{
				    			self.removeChild(self.rankUpLayer);
				    			self.rankUpLayer = null;
				    			
				    			if(DATA.streakStep>1 && DATA.challengeTries==0)
									self.bonusRewardPicker = new ExtraBonusRewardPickerLayer(size.width, size.height-self.topUILayer.height);
								else self.bonusRewardPicker = new BonusRewardPickerLayer(size.width, size.height-self.topUILayer.height);
								
								self.bonusRewardPicker.attr({
									"x":size.width*.05,
									"y":10,
									"anchorX":0,
									"anchorY":0
								});
			    				self.addChild(self.bonusRewardPicker);
		    				}
			    		}
					   	else if(self.bonusRewardPicker != null && !self.bonusRewardPicker.cardPicked)
					   	{
					   		self.bonusRewardPicker.onTouchEnd(locationInNode);
					 	}
					 	else if(self.bonusRewardPicker != null && self.bonusRewardPicker.cardPicked)
					 	{
					 		/*self.removeChild(self.bonusRewardPicker);
					 		self.bonusRewardPicker = null;
					 		*/
					   		//var bubbles = DATA.levels[DATA.worldIndex].bubbles;
				    		var bubbles = DATA.worldBubbles;
				    		//cc.log(bubbles);
				    		var maxRow = 0;
				    		var bubbleData = [];
				    		for(var i=0; i<bubbles.length; i++)
				    		{
				    			if(bubbles[i].row > maxRow)
				    				maxRow = bubbles[i].row;
				    		}
							cc.director.runScene(new GameplayScene(bubbles, maxRow+1));
					 	}
					 	else if(self.challengeCollectionDisplay != null)
					 	{
					 		
					 		/*var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
				    		//cc.log(bubbles);
				    		var maxRow = 0;
				    		var bubbleData = [];
				    		for(var i=0; i<bubbles.length; i++)
				    		{
				    			if(bubbles[i].row > maxRow)
				    				maxRow = bubbles[i].row;
				    		}
							cc.director.runScene(new GameplayScene(bubbles, maxRow+1));*/
					 	}
					 //}
				 	
			    	return true;
			    }
		    },this);
		}
		
        //return true;
	}
	
});
var ChallengeRewardScene = cc.Scene.extend({
	ctor:function(rankUpBool){
		this._super();
		this.rankUpBool = rankUpBool;
	},
	onEnter:function(){
		this._super();
		var layer = new ChallengeRewardLayer(this.rankUpBool);
		this.addChild(layer);
	}
});
