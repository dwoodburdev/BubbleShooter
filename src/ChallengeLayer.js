var ChallengeLayer = cc.Layer.extend({
	ctor:function(bubbles, numRows, numMoves){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		
		this.bottomUILayer = new BottomUILayer();
		this.bottomUILayer.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0,
			width:size.width,
			height:size.height/12
		});
		this.addChild(this.bottomUILayer);


		this.bubbleLayer = new BubbleLayer(bubbles, numRows, numMoves, "challenge", size.width, size.height-this.bottomUILayer.height);	
		this.bubbleLayer.attr({
			x:0,
			y:this.bottomUILayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		this.homeButton = new Button(0, 0, "Home", 32, cc.color(0,255,0,255), cc.color(255,255,255,255));
        this.homeButton.attr({
        	"x":size.width-this.homeButton.width/2,
        	"y":this.homeButton.height/2,
        	"anchorX":.5,
        	"anchorY":.5
        });
		this.addChild(this.homeButton);
		
		
		
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
				    if(self.homeButton.pointWithin(touch.getLocation()))
				    {
				    	cc.director.runScene(new HelloWorldScene());
				    }
			    	/*else if(self.editButton.pointWithin(touch.getLocation()))
			    	{
			    		cc.director.runScene(new EditorScene());
			    	}*/
			    	else self.bubbleLayer.onTouchEnd(locationInNode);
				   	
			    	return true;
			    }
		    },this);
		}
		
		
        return true;
	}
	
});
var ChallengeScene = cc.Scene.extend({
	ctor:function(bubbles, numRows, numMoves){
		this._super();
		this.bubbles = bubbles;
		this.numRows = numRows;
		this.numMoves = numMoves;
	},
	onEnter:function(){
		this._super();
		var layer = new ChallengeLayer(this.bubbles, this.numRows, this.numMoves);
		this.addChild(layer);
	}
});
