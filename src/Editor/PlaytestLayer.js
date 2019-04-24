var PlaytestLayer = cc.Layer.extend({
	ctor:function(bubbles, numRows, numMoves, meta){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		
		this.bottomUILayer = new ChallengeBottomUILayer(size.height/12, "test",[]);
		this.bottomUILayer.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0
		});
		this.addChild(this.bottomUILayer);
		
		this.topUILayer = new PlaytestTopUILayer(size.height/15);
		this.topUILayer.attr({
			x: 0,
			y:size.height-(size.height/15),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.topUILayer);


		this.bubbleLayer = new BubbleLayer(bubbles, numRows, numMoves, "playtest", size.width, size.height-this.bottomUILayer.height-this.topUILayer.height, [], meta);	
		this.bubbleLayer.attr({
			x:0,
			y:this.bottomUILayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		
		var self = this;
		
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){
			    	
			    	if(!self.isPopUp())
			    	{
				   		var target = event.getCurrentTarget();
				    	var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
	
				    	if(self.bubbleLayer.pointWithin(locationInNode))
				    	{
				    		self.bubbleLayer.onTouchBegin(locationInNode);
				    	}
			    	}
			    	
			    	
			    	return true;
			    },
			    onTouchMoved: function(touch, event){
			    	
			    	var target = event.getCurrentTarget();
				    	
			    	if(!self.isPopUp())
			    	{
				    	var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
	
				    	if(self.bubbleLayer.pointWithin(locationInNode))
				    	{
				    		self.bubbleLayer.onTouchMove(locationInNode);
				    	}
			    	}
			    	
			    	return true;
			    },
			    onTouchEnded: function(touch, event){
			    	
			    	if(!self.isPopUp())
			    	{
					    var target = event.getCurrentTarget();
					    var locationInNode = self.topUILayer.convertToNodeSpace(touch.getLocation());
					    
					    if(locationInNode.y > 0)
					    {
					    	var returnObj = self.topUILayer.onTouchEnd(locationInNode);
					    	
					    }
					    else
					    {
					    
						    locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
						    //cc.log(locationInNode);
						    if(locationInNode.y < 0)
						    {
						    	var loc = self.bottomUILayer.convertToNodeSpace(touch.getLocation());
						    	var returnObj = self.bottomUILayer.onTouchEnd(loc);
						    	
						    }
					    	else self.bubbleLayer.onTouchEnd(locationInNode);
				   		}
				   	}
				   	else
				   	{
				   		/*if(self.settingsLayer != null)
				   		{
				   			var loc = self.settingsLayer.convertToNodeSpace(touch.getLocation());
					    	var returnObj = self.settingsLayer.onTouchEnd(loc);
					    	if(returnObj == "close" || returnObj == "continue")
					    	{
					    		self.removeChild(self.settingsLayer);
					    		self.settingsLayer = null;
					    	}
					    	else if(returnObj == "quit")
					    	{
					    		self.removeChild(self.settingsLayer);
					    		self.settingsLayer = null;
					    		
					    		self.quitConfirmLayer = new QuitConfirmLayer(size.width-50, size.height-50);
					    		self.quitConfirmLayer.attr({
					    			x:25,
					    			y:25,
					    			anchorX:0,
					    			anchorY:0
					    		});
					    		self.addChild(self.quitConfirmLayer);
					    	}
					    	
				   		}*/
				   		
				   	}
			    	return true;
			    }
		    },this);
		}
		
		
        return true;
	},
	
	isPopUp:function()
	{
		//if(this.settingsLayer == null && 
		//	this.quitConfirmLayer == null &&
		//	this.buyBoosterLayer == null)
			return false;
		//return true;
	}
	
});
var PlaytestScene = cc.Scene.extend({
	ctor:function(bubbles, numRows, numMoves, meta){
		this._super();
		this.bubbles = bubbles;
		this.numRows = numRows;
		this.numMoves = numMoves;
		this.meta = meta;
	},
	onEnter:function(){
		this._super();
		var layer = new PlaytestLayer(this.bubbles, this.numRows, this.numMoves, this.meta);
		this.addChild(layer);
	}
});
