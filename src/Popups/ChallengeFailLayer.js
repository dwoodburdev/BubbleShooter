var ChallengeFailLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Challenge Failed.", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":size.height-60,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		
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
				   	
				 
			    	return true;
			    }
		    },this);
		}
		
        //return true;
	}
	
});
var ChallengeFailScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new ChallengeFailLayer();
		this.addChild(layer);
	}
});
