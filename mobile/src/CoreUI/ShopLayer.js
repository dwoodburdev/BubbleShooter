var ShopLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.shopDisplay = new ShopDisplayLayer(size.height);
		this.shopDisplay.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.shopDisplay);
		cc.log("SHOP!");
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
				    var locationInNode = self.shopDisplay.convertToNodeSpace(touch.getLocation());
			    	
			    	
			    		self.shopDisplay.onTouchEnd(locationInNode);
			    	
				   	
				 
			    	return true;
			    }
		    },this);
		}
		
        //return true;
	}
	
});
var ShopScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new ShopLayer();
		this.addChild(layer);
	}
});
