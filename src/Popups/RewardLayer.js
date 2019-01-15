var RewardLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.chestOpened = false;
		
		this.topUILayer = new TopUILayer(size.height/15);
		this.topUILayer.attr({
			x: 0,
			y:size.height-(size.height/15),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.topUILayer,9);
		
		this.tabTitleLabel = new cc.LabelTTF("World "+DATA.worldLevelIndex+" Complete!", "Arial", 20);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.topUILayer.y-10,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		this.chestImg = new cc.Sprite(res.regular_gold_chest);
		this.chestImg.setScale(size.width/2 / this.chestImg.width);
		this.chestImg.attr({
			x: size.width/2 - (size.width/2)/2,
			y: size.height*.3,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.chestImg);
		
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
			    	
			    	
			    	if(!self.chestOpened)
			    	{
			    		DATA.setCurrencies(DATA.coins+50,DATA.gems);
			    		self.chestOpened = true;
			    		//self.topUILayer = new TopUILayer(cc.winSize.height/15);
			    		self.topUILayer.setCoins(DATA.coins);
			    	}
			    	else
				    	{cc.log(DATA.worldIndex);cc.log(DATA.levels);
				    	var bubbles = DATA.levels[DATA.worldIndex].bubbles;
			    		//cc.log(bubbles);
			    		
						DATA.addBubblesToDatabase(bubbles);
			    		
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
var RewardScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new RewardLayer();
		this.addChild(layer);
	}
});
