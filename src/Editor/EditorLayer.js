var EditorLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.curDraw = null; // can have multiple things selected from different layers
		this.drawType = 0;
		this.drawColor = "blue";
		this.drawOrientation = null;
		this.drawBinary = null;
		this.drawMeta = {};
		
		this.mode = "create";
		
		this.moveNum = 0;
		
		this.editorUILayer = new EditorUILayer(this.width, this.height/3);
		this.editorUILayer.attr({
			x: 0,
			y: 0,
			anchorX: 0,
			anchorY: 0
		});
		
		this.midUILayer = new MidUILayer(this.width, this.width/12);
		this.midUILayer.attr({
			x: 0,
			y: this.editorUILayer.height,
			anchorX: 0,
			anchorY: 0
		});
		
		this.bubbleLayer = new EditorBubbleLayer(this.width, this.height-this.editorUILayer.height-this.midUILayer.height, 
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
		
		this.levelViewerLayer = new LevelViewer(this.width, this.height-this.editorUILayer.height-this.midUILayer.height);
		this.levelViewerLayer.attr({
			x:0,
			y:this.editorUILayer.height+this.midUILayer.height,
			anchorX:0,
			anchorY:0
		});
		
		this.viewerBubbleLayer = new EditorBubbleLayer(this.width, this.height-this.editorUILayer.height-this.midUILayer.height, [], 20);
		this.viewerBubbleLayer.attr({
			x:0,
			y:this.editorUILayer.height+this.midUILayer.height,
			anchorX:0,
			anchorY:0
		});
		
		this.levelViewerUILayer = new LevelViewerUILayer(this.width, this.height/3);
		this.levelViewerUILayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		
		var self = this;
		
		
		
		
		
	},
	
	openCreatedLevel:function()
	{
		cc.log("Open created level functionality needed");
	},
	
	coreUITouched:function(pos)
	{
		var returnObj = this.parent.coreButtonsUI.onTouchEnd(this.parent.coreButtonsUI.convertToNodeSpace(pos));
		
		if(returnObj == "creator")
		{
			this.parent.swapCreatorMode();
		}
	},
	
	onTouchBegan:function(pos)
		{cc.log("EDITOR TOUCH BEGAN !!!!!!!!!!");cc.log(pos);
			//var target = event.getCurrentTarget();
	    	var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
	    	//this.bubbleLayer.onTouchBegin(touch.getLocation(), this.drawType);
	    	if(locationInNode.y < 0)
	    	{
	    		if(this.mode == "create")
	    		{
	    			if(this.midUILayer.convertToNodeSpace(pos).y < 0)
	    				this.editorUILayer.onTouchBegin(this.editorUILayer.convertToNodeSpace(pos));
	    			else this.midUILayer.onTouchBegin(pos);
	    		}
	    		else if(this.mode == "view")
	    		{
	    			if(this.midUILayer.convertToNodeSpace(pos).y < 0)
	    			{
	    				//this.levelViewerUILayer.onTouchBegin(touch.getLocation());
	    			}
	    			else this.midUILayer.onTouchBegin(pos);
	    		}
	    	}
	    	else 
	    	{
	    		if(this.mode == "create")
	    		{cc.log(locationInNode);
	    			this.bubbleLayer.onTouchBegin(pos, this.drawType, this.drawColor, this.drawOrientation, this.drawBinary, this.drawMeta);
	    		}
	    		else if(this.mode == "view")
	    		{
	    			//this.viewerBubbleLayer.onTouchBegin(touch.getLocation(), this.drawType, this.drawColor);
	    		}
	    	}
		},
		onTouchMoved:function(pos)
		{
			//var target = event.getCurrentTarget();
	    	var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
	    	//this.bubbleLayer.onTouchBegin(touch.getLocation(), this.drawType);
	    	//if(pos.y < this.bubbleLayer.y)
	    	if(locationInNode.y < 0)
	    	{
	    		if(this.midUILayer.convertToNodeSpace(pos).y < 0)
	    		{
	    			if(this.mode == "create")
	    			{
	    				this.editorUILayer.onTouchMoved(this.editorUILayer.convertToNodeSpace(pos));
	    			}
	    			else if(this.mode == "view")
	    			{
	    				this.levelViewerUILayer.onTouchMoved(pos);
	    			}
	    		}
	    		else this.midUILayer.onTouchMoved(pos);
	    	}
	    	else this.bubbleLayer.onTouchMoved(pos, this.drawType, this.drawColor, this.drawOrientation, this.drawBinary, this.drawMeta);
	    	
		},
		onTouchEnded:function(pos)
		{
			//var target = event.getCurrentTarget();
		    var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
	    	//this.bubbleLayer.onTouchBegin(touch.getLocation(), this.drawType);
	    	var returnData = null;
	    	var uiData = null;
	    	//if(pos.y < this.bubbleLayer.y)
	    	if(locationInNode.y < 0)
	    	{
	    		if(this.midUILayer.convertToNodeSpace(pos).y < 0)
	    		{
	    			if(this.mode == "create")
	    			{
	    				returnData = this.editorUILayer.onTouchEnded(this.editorUILayer.convertToNodeSpace(pos));
	    			}
	    			else if(this.mode == "view")
	    			{
	    				returnData = this.levelViewerUILayer.onTouchEnded(this.levelViewerUILayer.convertToNodeSpace(pos));
	    				cc.log(returnData);
	    			}
	    			
	    		}
	    		else {
	    			uiData = this.midUILayer.onTouchEnded(pos);
	    		}
	    	}
	    	else
	    	{
	    		this.bubbleLayer.onTouchEnded(pos, this.drawType, this.drawColor, this.drawOrientation, this.drawBinary, this.drawMeta);
		   	}
		   	
		   	if(returnData == "test")
		   	{
		   		var bubbleData = this.bubbleLayer.getBubbles();
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
		   		
		   		
				cc.director.runScene(new GameplayScene(this.bubbleLayer.getBubbles(), this.bubbleLayer.getNumRows(), {bulbData:this.bubbleLayer.bulbData}));
		   	}
		   	else if(returnData == "save")
		   	{
		   		var bubbleData = this.bubbleLayer.getBubbles();
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
		   				var meta = null;
		   				if("meta" in bub && bub.meta !== undefined)
		   					meta = bub.meta;
		   				bubs.push({"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":color,"meta":meta});
		   			}
		   		}cc.log(bubs);
		   		
		   		var meta = {bulbData:this.editorUILayer.bulbData};
		   		
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
		   			this.removeChild(this.viewerBubbleLayer);
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
		   			this.viewerBubbleLayer = new EditorBubbleLayer(this.width, this.height-this.editorUILayer.height-this.midUILayer.height,
		   				bubs, maxRow+1, metaData);
					this.viewerBubbleLayer.attr({
						x:0,
						y:this.editorUILayer.height+this.midUILayer.height,
						anchorX:0,
						anchorY:0
					});
		   			//this.viewerBubbleLayer.addBubbles(DATA.createdLevels[returnData.number].bubbles);
		   			this.addChild(this.viewerBubbleLayer);
		   			
		   			this.removeChild(this.midUILayer);
					this.addChild(this.midUILayer);
					this.midUILayer.draw();
		   		}
		   		else if(returnData.type == "edit")
		   		{
		   			this.removeChild(this.viewerBubbleLayer);
	   				
	   				this.removeChild(this.levelViewerUILayer);
	   				
	   				this.bubbleLayer = new EditorBubbleLayer(this.width, this.height-this.editorUILayer.height-this.midUILayer.height, this.viewerBubbleLayer.bubbles, 100/*this.viewerBubbleLayer.numRows*/);	
					this.bubbleLayer.attr({
						x:0,
						y:this.editorUILayer.height+this.midUILayer.height,
						//width:size.width,
						//height:size.height-this.editorUILayer.height-this.midUILayer.height,
						anchorX:0,
						anchorY:0
					});
	   				this.addChild(this.bubbleLayer);
	   				this.bubbleLayer.draw();
					
					this.removeChild(this.midUILayer);
					this.addChild(this.midUILayer);
					this.midUILayer.draw();
					
					this.addChild(this.editorUILayer);
					this.editorUILayer.draw();
	   			
		   			this.mode = "create";
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
					//cc.log(this.editorUILayer.bulbData);
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
		   			this.drawType = -1;
		   		}
		   		else
		   		{cc.log(returnData);
		   			this.drawType = returnData.type;
		  			this.drawColor = returnData.color;cc.log(this.drawColor);
		  			this.drawOrientation = returnData.orientation;
		  			this.drawBinary = returnData.binary;
		  			this.drawMeta = returnData.meta;
		  		}
		   	}
		   	
		   	if(uiData != null)
		   	{
		   		if(uiData.type == "scrollup")
		   		{
		   			if(this.mode == "create")
		   			{
		   				this.bubbleLayer.scrollUp();
		   			}
		   			else if(this.mode == "view")
		   			{
		   				this.viewerBubbleLayer.scrollUp();
		   			}
		   		}
		   		else if(uiData.type == "scrolldown")
		   		{
		   			if(this.mode == "create")
		   			{
		   				this.bubbleLayer.scrollDown();
		   			}
		   			else if(this.mode == "view")
		   			{
		   				this.viewerBubbleLayer.scrollDown();
		   			}
		   		}
		   		else if(uiData.type == "delete")
		   		{
		   			if(this.mode == "create")
		   			{
		   				this.drawType = -1;
		   			}
		   		}
		   		else if(uiData.type == "rightMove")
		   		{
		   			this.moveNum++;
		   			this.bubbleLayer.setMove(this.moveNum);
		   		}
		   		else if(uiData.type == "leftMove")
		   		{
		   			this.moveNum = Math.max(0, this.moveNum-1);
		   			this.bubbleLayer.setMove(this.moveNum);
		   		}
		   		else if(uiData.type == "create")
		   		{
		   			if(this.mode == "view")
		   			{
		   				//this.removeChild(this.levelViewerLayer);
		   				this.removeChild(this.viewerBubbleLayer);
		   				
		   				this.removeChild(this.levelViewerUILayer);
		   				
		   				this.addChild(this.bubbleLayer);
		   				this.bubbleLayer.draw();
						
						this.removeChild(this.midUILayer);
						this.addChild(this.midUILayer);
						this.midUILayer.draw();
						
						this.addChild(this.editorUILayer);
						this.editorUILayer.draw();
		   			}
		   			this.mode = "create";
		   		}
		   		else if(uiData.type == "view")
		   		{
		   			if(this.mode == "create")
		   			{
		   				this.removeChild(this.bubbleLayer);
		   				//this.addChild(this.levelViewerLayer);
		   				//this.levelViewerLayer.draw();
		   				this.addChild(this.viewerBubbleLayer);
		   				this.viewerBubbleLayer.draw();
		   				
		   				this.removeChild(this.midUILayer);
						this.addChild(this.midUILayer);
						this.midUILayer.draw();
		   				
		   				this.removeChild(this.editorUILayer);
		   				this.addChild(this.levelViewerUILayer);
		   				this.levelViewerUILayer.draw();
		   			}
		   			this.mode = "view";
		   		}
		   	}
		}
	
});
