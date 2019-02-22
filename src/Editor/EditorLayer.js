var EditorLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		
		this.curDraw = null; // can have multiple things selected from different layers
		this.drawType = 0;
		this.drawColor = "blue";
		this.drawOrientation = null;
		this.drawBinary = null;
		this.drawMeta = {};
		
		this.mode = "create";
		
		this.moveNum = 0;
		
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
		});
		
		this.bubbleLayer = new EditorBubbleLayer(size.width, size.height-this.editorUILayer.height-this.midUILayer.height, 
			[], 100);	
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
		
		this.levelViewerLayer = new LevelViewer(size.width, size.height-this.editorUILayer.height-this.midUILayer.height);
		this.levelViewerLayer.attr({
			x:0,
			y:this.editorUILayer.height+this.midUILayer.height,
			anchorX:0,
			anchorY:0
		});
		this.viewerBubbleLayer = new EditorBubbleLayer(size.width, size.height-this.editorUILayer.height-this.midUILayer.height, [], 20);
		this.viewerBubbleLayer.attr({
			x:0,
			y:this.editorUILayer.height+this.midUILayer.height,
			anchorX:0,
			anchorY:0
		});
		
		this.levelViewerUILayer = new LevelViewerUILayer(size.width, size.height/3);
		this.levelViewerUILayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		
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
			    		if(self.mode == "create")
			    		{
			    			if(self.midUILayer.convertToNodeSpace(touch.getLocation()).y < 0)
			    				self.editorUILayer.onTouchBegin(touch.getLocation());
			    			else self.midUILayer.onTouchBegin(touch.getLocation());
			    		}
			    		else if(self.mode == "view")
			    		{
			    			if(self.midUILayer.convertToNodeSpace(touch.getLocation()).y < 0)
			    			{
			    				//self.levelViewerUILayer.onTouchBegin(touch.getLocation());
			    			}
			    			else self.midUILayer.onTouchBegin(touch.getLocation());
			    		}
			    	}
			    	else 
			    	{
			    		if(self.mode == "create")
			    		{
			    			self.bubbleLayer.onTouchBegin(touch.getLocation(), self.drawType, self.drawColor, self.drawOrientation, self.drawBinary, self.drawMeta);
			    		}
			    		else if(self.mode == "view")
			    		{
			    			//self.viewerBubbleLayer.onTouchBegin(touch.getLocation(), self.drawType, self.drawColor);
			    		}
			    	}
			    	return true;
			    },
			    onTouchMoved: function(touch, event){
			    	var target = event.getCurrentTarget();
			    	var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
			    	//self.bubbleLayer.onTouchBegin(touch.getLocation(), self.drawType);
			    	if(locationInNode.y < 0)
			    	{
			    		if(self.midUILayer.convertToNodeSpace(touch.getLocation()).y < 0)
			    		{
			    			if(self.mode == "create")
			    			{
			    				self.editorUILayer.onTouchMoved(touch.getLocation());
			    			}
			    			else if(self.mode == "view")
			    			{
			    				self.levelViewerUILayer.onTouchMoved(touch.getLocation());
			    			}
			    		}
			    		else self.midUILayer.onTouchMoved(touch.getLocation());
			    	}
			    	else self.bubbleLayer.onTouchMoved(touch.getLocation(), self.drawType, self.drawColor, self.drawOrientation, self.drawBinary, self.drawMeta);
			    	
			    	return true;
			    },
			    onTouchEnded: function(touch, event){
				    var target = event.getCurrentTarget();
				    var locationInNode = self.bubbleLayer.convertToNodeSpace(touch.getLocation());
			    	//self.bubbleLayer.onTouchBegin(touch.getLocation(), self.drawType);
			    	var returnData = null;
			    	var uiData = null;
			    	if(locationInNode.y < 0)
			    	{
			    		if(self.midUILayer.convertToNodeSpace(touch.getLocation()).y < 0)
			    		{
			    			if(self.mode == "create")
			    			{
			    				returnData = self.editorUILayer.onTouchEnded(self.editorUILayer.convertToNodeSpace(touch.getLocation()));
			    			}
			    			else if(self.mode == "view")
			    			{
			    				returnData = self.levelViewerUILayer.onTouchEnded(self.levelViewerUILayer.convertToNodeSpace(touch.getLocation()));
			    				cc.log(returnData);
			    			}
			    			
			    		}
			    		else {
			    			uiData = self.midUILayer.onTouchEnded(touch.getLocation());
			    		}
			    	}
			    	else
			    	{
			    		self.bubbleLayer.onTouchEnded(touch.getLocation(), self.drawType, self.drawColor, self.drawOrientation, self.drawBinary, self.drawMeta);
				   	}
				   	
				   	if(returnData == "test")
				   	{
				   		var bubbleData = self.bubbleLayer.getBubbles();
				   		var bubs = [];
				   		for(var i=0; i<bubbleData.length; i++)
				   		{
				   			var bub = bubbleData[i];
				   			if(bub.type == 7)
				   			{
				   				
				   			}
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
				   		
				   		
						cc.director.runScene(new GameplayScene(self.bubbleLayer.getBubbles(), self.bubbleLayer.getNumRows(), {bulbData:self.bubbleLayer.bulbData}));
				   	}
				   	else if(returnData == "save")
				   	{
				   		var bubbleData = self.bubbleLayer.getBubbles();
				   		var bubs = [];cc.log(bubbleData);
				   		for(var i=0; i<bubbleData.length; i++)
				   		{
				   			var bub = bubbleData[i];
				   			
				   			if(bub.type == 7)
				   			{
				   				bubs.push({"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":bub.meta.iteration});
				   			}
				   			else 
				   			{
				   				var color = null;
				   				if("colorCode" in bub && bub.colorCode !== undefined)
				   					color = bub.colorCode;
				   				bubs.push({"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":color});
				   			}
				   		}cc.log(bubs);
				   		
				   		var meta = {bulbData:self.editorUILayer.bulbData};
				   		
				   		DATA.saveNewLevelToDatabase(bubs, meta);
				   		
				   		
				   	}
				   	else if(returnData != null)
				   	{
				   		if(returnData.type == "level")
				   		{
				   			var maxRow = 0;
				   			var bubs = DATA.createdLevels[returnData.number].bubbles;
				   			for(var i=0; i<bubs.length; i++)
				   			{
				   				if(bubs[i].row > maxRow)
				   					maxRow = bubs[i].row;
				   			}
				   			self.removeChild(self.viewerBubbleLayer);
				   			cc.log(bubs);
				   			var metaData = DATA.createdLevels[returnData.number].meta;cc.log(metaData);
				   			/*var meta = {bulbData:[]};
				   			if(metaData != null && "bulbData" in metaData)
				   			{
				   				for(var i=0; i<metaData.bulbData.length; i++)
				   				{
				   					for(var j=0; j<metaData.bulbData[i].length; j++)
				   					{
				   						meta.bulbData.push(metaData.bulbData[i][j]);
				   					}
				   				}
				   			}cc.log(meta);*/
				   			self.viewerBubbleLayer = new EditorBubbleLayer(size.width, size.height-self.editorUILayer.height-self.midUILayer.height,
				   				bubs, maxRow+1, metaData);
							self.viewerBubbleLayer.attr({
								x:0,
								y:self.editorUILayer.height+self.midUILayer.height,
								anchorX:0,
								anchorY:0
							});
				   			//self.viewerBubbleLayer.addBubbles(DATA.createdLevels[returnData.number].bubbles);
				   			self.addChild(self.viewerBubbleLayer);
				   			
				   			self.removeChild(self.midUILayer);
							self.addChild(self.midUILayer);
							self.midUILayer.draw();
				   		}
				   		else if(returnData.type == "edit")
				   		{
				   			self.removeChild(self.viewerBubbleLayer);
			   				
			   				self.removeChild(self.levelViewerUILayer);
			   				
			   				self.bubbleLayer = new EditorBubbleLayer(size.width, size.height-self.editorUILayer.height-self.midUILayer.height, self.viewerBubbleLayer.bubbles, 100/*self.viewerBubbleLayer.numRows*/);	
							self.bubbleLayer.attr({
								x:0,
								y:self.editorUILayer.height+self.midUILayer.height,
								//width:size.width,
								//height:size.height-this.editorUILayer.height-this.midUILayer.height,
								anchorX:0,
								anchorY:0
							});
			   				self.addChild(self.bubbleLayer);
			   				self.bubbleLayer.draw();
							
							self.removeChild(self.midUILayer);
							self.addChild(self.midUILayer);
							self.midUILayer.draw();
							
							self.addChild(self.editorUILayer);
							self.editorUILayer.draw();
			   			
				   			self.mode = "create";
				   		}
				   		else if(returnData.type == "test")
				   		{
				   			// Run gameplay scene, but with "playtest" mode, has button to go back to edit
				   			var bubbles = DATA.createdLevels[returnData.number].bubbles;
							var maxRow = 0;
							var bubbleData = [];
							for(var i=0; i<bubbles.length; i++)
							{
								if(bubbles[i].row > maxRow)
									maxRow = bubbles[i].row;
							}
							DATA.setLevelQueue({"type":"bucket", "colors":[1,1,1,1,0,0]});// LATER - set to queue stored in data
							cc.log(bubbles);
							//cc.log(self.editorUILayer.bulbData);
							var meta = DATA.createdLevels[returnData.number].meta;
							cc.log(meta);
							cc.director.runScene(new PlaytestScene(bubbles, maxRow+1, 99, meta));
				   		}
				   		else if(returnData.type == "share")
				   		{
				   			// Choose Friends OR Network to share with
				   		}
				   		else if(returnData.type < 0)
				   		{
				   			self.drawType = -1;
				   		}
				   		else
				   		{cc.log(returnData);
				   			self.drawType = returnData.type;
				  			self.drawColor = returnData.color;cc.log(self.drawColor);
				  			self.drawOrientation = returnData.orientation;
				  			self.drawBinary = returnData.binary;
				  			self.drawMeta = returnData.meta;
				  		}
				   	}
				   	
				   	if(uiData != null)
				   	{
				   		if(uiData.type == "scrollup")
				   		{
				   			if(self.mode == "create")
				   			{
				   				self.bubbleLayer.scrollUp();
				   			}
				   			else if(self.mode == "view")
				   			{
				   				self.viewerBubbleLayer.scrollUp();
				   			}
				   		}
				   		else if(uiData.type == "scrolldown")
				   		{
				   			if(self.mode == "create")
				   			{
				   				self.bubbleLayer.scrollDown();
				   			}
				   			else if(self.mode == "view")
				   			{
				   				self.viewerBubbleLayer.scrollDown();
				   			}
				   		}
				   		else if(uiData.type == "delete")
				   		{
				   			if(self.mode == "create")
				   			{
				   				self.drawType = -1;
				   			}
				   		}
				   		else if(uiData.type == "rightMove")
				   		{
				   			self.moveNum++;
				   			self.bubbleLayer.setMove(self.moveNum);
				   		}
				   		else if(uiData.type == "leftMove")
				   		{
				   			self.moveNum = Math.max(0, self.moveNum-1);
				   			self.bubbleLayer.setMove(self.moveNum);
				   		}
				   		else if(uiData.type == "create")
				   		{
				   			if(self.mode == "view")
				   			{
				   				//self.removeChild(self.levelViewerLayer);
				   				self.removeChild(self.viewerBubbleLayer);
				   				
				   				self.removeChild(self.levelViewerUILayer);
				   				
				   				self.addChild(self.bubbleLayer);
				   				self.bubbleLayer.draw();
								
								self.removeChild(self.midUILayer);
								self.addChild(self.midUILayer);
								self.midUILayer.draw();
								
								self.addChild(self.editorUILayer);
								self.editorUILayer.draw();
				   			}
				   			self.mode = "create";
				   		}
				   		else if(uiData.type == "view")
				   		{
				   			if(self.mode == "create")
				   			{
				   				self.removeChild(self.bubbleLayer);
				   				//self.addChild(self.levelViewerLayer);
				   				//self.levelViewerLayer.draw();
				   				self.addChild(self.viewerBubbleLayer);
				   				self.viewerBubbleLayer.draw();
				   				
				   				self.removeChild(self.midUILayer);
								self.addChild(self.midUILayer);
								self.midUILayer.draw();
				   				
				   				self.removeChild(self.editorUILayer);
				   				self.addChild(self.levelViewerUILayer);
				   				self.levelViewerUILayer.draw();
				   			}
				   			self.mode = "view";
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
