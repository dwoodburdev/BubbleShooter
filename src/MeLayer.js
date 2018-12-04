var MeLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.bottomUILayer = new BottomUILayer(size.height/12);
		this.bottomUILayer.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0
		});
		this.addChild(this.bottomUILayer);
		this.bottomUILayer.selectButton("me");
		
		this.coreButtonsLayer = new CoreButtonsUI(DATA.bubbleR, size.height-this.bottomUILayer.height, "me");
		this.coreButtonsLayer.attr({
			x:0,
			y:this.bottomUILayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.coreButtonsLayer, 9);
		
		this.topUILayer = new TopUILayer(size.height/15);
		this.topUILayer.attr({
			x: 0,
			y:size.height-(size.height/15),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.topUILayer, 8);
		
		this.meDisplay = new MeDisplayLayer(size.height-this.bottomUILayer.height-this.topUILayer.height);
		this.meDisplay.attr({
			x:0,
			y:this.bottomUILayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.meDisplay);
		
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
				    var locationInNode = self.meDisplay.convertToNodeSpace(touch.getLocation());
			    	
			    	if(locationInNode.y < 0)
			    	{
			    		self.bottomUILayer.onTouchEnd(self.bottomUILayer.convertToNodeSpace(touch.getLocation()));
			    	}
			    	else
			    	{
			    		self.meDisplay.onTouchEnd(locationInNode);
			    	}
				   	
				 
			    	return true;
			    }
		    },this);
		}
		
        //return true;
	}
	
});
var MeScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new MeLayer();
		this.addChild(layer);
	}
});
