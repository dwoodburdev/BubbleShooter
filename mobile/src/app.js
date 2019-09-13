var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

		var dn = new cc.DrawNode();
		this.addChild(dn);
		dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 0, cc.color(0,0,0,255));
        
        var size = cc.winSize;
        
        this.playButton = new Button(size.width*3/4, size.height*1/4, "Play", 32, cc.color(0,255,0,255), cc.color(255,255,255,255));
        this.playButton.attr({
        	"anchorX":.5,
        	"anchorY":.5
        });
        this.addChild(this.playButton);
        this.editButton = new Button(size.width*1/4, size.height*1/4, "Edit", 32, cc.color(255,0,0,255), cc.color(255,255,255,255));
        this.editButton.attr({
        	"anchorX":.5,
        	"anchorY":.5
        });
        this.addChild(this.editButton);
        
        this.titleLabel = new cc.LabelTTF("Emoji Pop", "Arial", 50);
		this.titleLabel.attr({
			"x":size.width/2,
			"y":size.height*3/4,
			"anchorX":.5,
			"anchorY":.5
		});
		this.titleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.titleLabel);
		
        
        var self = this;
        
        if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){
			   		var target = event.getCurrentTarget();
			    	//var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
					//var location = target.convertToNodeSpace(touch.getLocation());
					var location = touch.getLocation();
					/*if(self.bubbleLayer.pointWithin(locationInNode))
			    	{
			    		self.bubbleLayer.onTouchBegin(locationInNode);
			    	}*/
			    	return true;
			    },
			    onTouchMoved: function(touch, event){
			    	var target = event.getCurrentTarget();
			    	//var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
					var location = touch.getLocation();
					
			    	/*if(self.bubbleLayer.pointWithin(locationInNode))
			    	{
			    		self.bubbleLayer.onTouchMove(locationInNode);
			    	}*/
			    	
			    	return true;
			    },
			    onTouchEnded: function(touch, event){
				    var target = event.getCurrentTarget();
				    var location = touch.getLocation();
					
			    	if(self.playButton.pointWithin(location))
			    	{
			    		var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
			    		cc.log(bubbles);
			    		var maxRow = 0;
			    		var bubbleData = [];
			    		for(var i=0; i<bubbles.length; i++)
			    		{
			    			if(bubbles[i].row > maxRow)
			    				maxRow = bubbles[i].row;
			    		}
			    		
			    		cc.director.runScene(new GameplayScene(bubbles, maxRow+1));
			    	}
			    	else if(self.editButton.pointWithin(location))
			    	{
			    		cc.director.runScene(new EditorScene());
			    	}

			    	return true;
			    }
		    },this);
		}
        
        
       
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

