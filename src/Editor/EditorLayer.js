var EditorLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		
		this.curDraw = null; // can have multiple things selected from different layers
		this.drawType = 0;
		this.drawColor = "blue";
		
		this.editorUILayer = new EditorUILayer(size.width, size.height/3);
		this.editorUILayer.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0
		});
		
		this.midUILayer = new MidUILayer(size.width, size.width/12);
		this.midUILayer.attr({
			x: 0,
			y: this.editorUILayer.height,
			anchorX: 0,
			anchorY: 0
		})
		
		this.bubbleLayer = new EditorBubbleLayer(size.width, size.height-this.editorUILayer.height-this.midUILayer.height);	
		this.bubbleLayer.attr({
			x:0,
			y:this.editorUILayer.height+this.midUILayer.height,
			//width:size.width,
			//height:size.height-this.editorUILayer.height-this.midUILayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		this.addChild(this.midUILayer);
		this.addChild(this.editorUILayer);
		
		
		
		var self = this;
		
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){
			   		var target = event.getCurrentTarget();
			    	var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
			    	//self.bubbleLayer.onTouchBegin(touch.getLocation(), self.drawType);
			    	if(locationInNode.y < 0)
			    	{
			    		if(self.midUILayer.convertToNodeSpace(touch.getLocation()).y < 0)
			    			self.editorUILayer.onTouchBegin(touch.getLocation());
			    		else self.midUILayer.onTouchBegin(touch.getLocation());
			    	}
			    	else self.bubbleLayer.onTouchBegin(touch.getLocation(), self.drawType, self.drawColor);
			    	
			    	return true;
			    },
			    onTouchMoved: function(touch, event){
			    	var target = event.getCurrentTarget();
			    	var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
			    	//self.bubbleLayer.onTouchBegin(touch.getLocation(), self.drawType);
			    	if(locationInNode.y < 0)
			    	{
			    		if(self.midUILayer.convertToNodeSpace(touch.getLocation()).y < 0)
			    			self.editorUILayer.onTouchMoved(touch.getLocation());
			    		else self.midUILayer.onTouchMoved(touch.getLocation());
			    	}
			    	else self.bubbleLayer.onTouchMoved(touch.getLocation(), self.drawType, self.drawColor);
			    	
			    	return true;
			    },
			    onTouchEnded: function(touch, event){
				    var target = event.getCurrentTarget();
				    var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
			    	//self.bubbleLayer.onTouchBegin(touch.getLocation(), self.drawType);
			    	var returnData = null;
			    	var uiData = null;
			    	if(locationInNode.y < 0)
			    	{cc.log("low");
			    		
			    		if(self.midUILayer.convertToNodeSpace(touch.getLocation()).y < 0)
			    			returnData = self.editorUILayer.onTouchEnded(self.editorUILayer.convertToNodeSpace(touch.getLocation()));
			    			//returnData = self.editorUILayer.onTouchEnded(touch.getLocation());
			    		else {cc.log("else");uiData = self.midUILayer.onTouchEnded(touch.getLocation());}
			    	}
			    	else
			    	{
			    		self.bubbleLayer.onTouchEnded(touch.getLocation(), self.drawType, self.drawColor);
				   	}
				   	
				   	if(returnData == "test")
				   	{
				   		var bubbleData = self.bubbleLayer.getBubbles();
				   		var bubs = [];
				   		for(var i=0; i<bubbleData.length; i++)
				   		{
				   			var bub = bubbleData[i];
				   			bubs.push({"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":bub.colorCode});
				   		}
				   		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(
				   			{"bubbles":bubs}));
				   		 var downloadAnchorNode = document.createElement('a');
					    downloadAnchorNode.setAttribute("href",     dataStr);
					    downloadAnchorNode.setAttribute("download", "level" + ".json");
					    document.body.appendChild(downloadAnchorNode); // required for firefox
					    downloadAnchorNode.click();
					    downloadAnchorNode.remove();
				   		
				   		
						cc.director.runScene(new GameplayScene(self.bubbleLayer.getBubbles(), self.bubbleLayer.getNumRows()));
				   	}
				   	else if(returnData != null)
				   	{
				   		if(returnData.type < 0)
				   		{
				   			self.drawType = -1;
				   		}
				   		else
				   		{
				   			self.drawType = returnData.type;
				  			self.drawColor = returnData.color;
				  		}
				   	}
				   	
				   	if(uiData != null)
				   	{
				   		if(uiData.type == "scrollup")
				   		{
				   			self.bubbleLayer.scrollUp();
				   		}
				   		else if(uiData.type == "scrolldown")
				   		{
				   			self.bubbleLayer.scrollDown();
				   		}
				   	}
				   	
			    	return true;
			    }
		    },this);
		}
		
		
        return true;
	}
	
});
var EditorScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new EditorLayer();
		this.addChild(layer);
	}
});
