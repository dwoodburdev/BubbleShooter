var GameplayLayer = cc.Layer.extend({
	ctor:function(bubbles, numRows){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		
		this.bottomUILayer = new BottomUILayer(size.height/12);
		this.bottomUILayer.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0
		});
		this.addChild(this.bottomUILayer);
		this.bottomUILayer.selectButton("play");

		
		
		this.topUILayer = new TopUILayer(size.height/15);
		this.topUILayer.attr({
			x: 0,
			y:size.height-(size.height/15),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.topUILayer,9);

		this.bubbleLayer = new BubbleLayer(bubbles, numRows, DATA.worldBallsLeft, "world", size.width, size.height-this.bottomUILayer.height-this.topUILayer.height);	
		this.bubbleLayer.attr({
			x:0,
			y:this.bottomUILayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		/*this.homeButton = new Button(0, 0, "Home", 32, cc.color(0,255,0,255), cc.color(255,255,255,255));
        this.homeButton.attr({
        	"x":size.width-this.homeButton.width/2,
        	"y":this.homeButton.height/2,
        	"anchorX":.5,
        	"anchorY":.5
        });
		this.addChild(this.homeButton);
		
		this.editButton = new Button(0, 0, "Editor", 32, cc.color(0,255,0,255), cc.color(255,255,255,255));
        this.editButton.attr({
        	"x":this.editButton.width/2,
        	"y":this.editButton.height/2,
        	"anchorX":.5,
        	"anchorY":.5
        });
		this.addChild(this.editButton);*/
		
		
		var self = this;
		
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){
			   		var target = event.getCurrentTarget();
			    	var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());

			    	if(self.bubbleLayer.pointWithin(locationInNode))
			    	{
			    		self.bubbleLayer.onTouchBegin(locationInNode);
			    	}
			    	
			    	
			    	return true;
			    },
			    onTouchMoved: function(touch, event){
			    	var target = event.getCurrentTarget();
			    	var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());

			    	if(self.bubbleLayer.pointWithin(locationInNode))
			    	{
			    		self.bubbleLayer.onTouchMove(locationInNode);
			    	}
			    	
			    	return true;
			    },
			    onTouchEnded: function(touch, event){
				    var target = event.getCurrentTarget();
				    var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
				    //cc.log(locationInNode);
				    if(locationInNode.y < 0)
			    	{
			    		self.bottomUILayer.onTouchEnd(self.bottomUILayer.convertToNodeSpace(touch.getLocation()));
			    	}
			    	else {
			    	//	if(!self.bubbleLayerUI.onTouchEnd(locationInNode))
			    			self.bubbleLayer.onTouchEnd(locationInNode);
				   	}
				   	
			    	return true;
			    }
		    },this);
		}
		
		
        return true;
	}
});
var GameplayScene = cc.Scene.extend({
	ctor:function(bubbles, numRows){
		this._super();
		this.bubbles = bubbles;
		this.numRows = numRows
	},
	onEnter:function(){
		this._super();
		var layer = new GameplayLayer(this.bubbles, this.numRows);
		this.addChild(layer);
	}
});
