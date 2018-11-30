var BuyBallsLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Out Of Moves", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":size.height-60,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		this.buyBallsButton = new Button(0, 0, "Buy Balls", 32, cc.color(255,255,0,255), cc.color(255,255,255,255));
        this.buyBallsButton.attr({
        	"x":size.width/3,
        	"y":size.height*2/5,
        	"anchorX":.5,
        	"anchorY":.5
        });
		this.addChild(this.buyBallsButton);
		
		this.watchAdButton = new Button(0, 0, "Watch Ad", 32, cc.color(0,255,0,255), cc.color(255,255,255,255));
        this.watchAdButton.attr({
        	"x":size.width*2/3,
        	"y":size.height*2/5,
        	"anchorX":.5,
        	"anchorY":.5
        });
		this.addChild(this.watchAdButton);
		
		this.backButton = new Button(0, 0, "Back", 32, cc.color(255,0,0,255), cc.color(255,255,255,255));
        this.backButton.attr({
        	"x":size.width/2,
        	"y":size.height/5,
        	"anchorX":.5,
        	"anchorY":.5
        });
		this.addChild(this.backButton);
		
		
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
			    	if(self.backButton.pointWithin(locationInNode))
			    	{
				    	var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
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
					else if(self.buyBallsButton.pointWithin(locationInNode))
					{
						DATA.worldBallsLeft += 10;
						
						var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
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
					else if(self.watchAdButton.pointWithin(locationInNode))
					{
						DATA.worldBallsLeft++;
						
						var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
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
					  	
				 
			    	return true;
			    }
		    },this);
		}
		
        //return true;
	}
	
});
var BuyBallsScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new BuyBallsLayer();
		this.addChild(layer);
	}
});
