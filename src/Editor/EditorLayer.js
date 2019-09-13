var EditorLayer = cc.Layer.extend({
	ctor:function(width, height, editorData, startingBubbles, numRows){
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
		
		this.levelId = null;
		
		this.mode = "create";
		
		this.moveNum = 0;
		
		this.touchDown = false;
		
		this.features = editorData.features;
		this.userLevels = editorData.userLevels;
		
		this.numRows = numRows;
		
	
		var bubbleList = [];
		var bubKeys = Object.keys(startingBubbles);
		for(var i=0; i<bubKeys.length; i++)
		{
			var bub = startingBubbles[bubKeys[i]];
			bubbleList.push(bub);
		}
		
		var initNumRows = this.numRows;cc.log("ROWS: " + this.numRows);
		if(initNumRows <= 20)
			initNumRows = Math.floor(this.height/ ( Math.pow(3,.5)*(this.width/24) ) ) + 1;
		cc.log(initNumRows);
		this.bubbleLayer = new EditorBubbleLayer(this.width, this.height, 
			bubbleList, initNumRows, {});//Math.floor(this.height/ ( Math.pow(3,.5)*(this.width/24) ) ) + 1);	
		this.bubbleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		
		this.menuBarLayer = new MenuBarLayer(this.width*.95, this.height*.1, "new");
		this.menuBarLayer.attr({
			x:this.width*.025,
			y:5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.menuBarLayer);
		
		cc.log(startingBubbles);
		if(Object.keys(startingBubbles).length > 0)
		{
			this.menuBarLayer.addPlayButton();
			this.menuBarLayer.addSaveButton();
			
			//this.bubbleLayer.
		}
		
	
		
	},
	openFeatureLevel:function()
	{
		var maxRow = 0;
		//var bubs = DATA.features[levelNum].bubbles;
		var bubs = this.feature.bubbles;
		for(var i=0; i<bubs.length; i++)
		{
			if(bubs[i].row > maxRow)
				maxRow = bubs[i].row;
		}
		var metaData = {};//DATA.feature.meta;
		this.bubbleLayer.initLevel(bubs, maxRow+1, {type:"edit",number:0});
		
	},
	
	openIdentifiedLevel:function(levelData)
	{cc.log("OPENING ID'd LEVEL");
		
		this.parent.playForeignLevel(levelData);
			
	},
	
	turnBrowserIntoEditor:function(level)
	{
		this.removeChild(this.bubbleLayer);
		this.bubbleLayer = new EditorBubbleLayer(this.width, this.height, 
			level.bubbles, Math.max(level.numRows, 25), {});//Math.floor(this.height/ ( Math.pow(3,.5)*(this.width/24) ) ) + 1);	
		this.bubbleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		
		
		//this.bubbleLayer.initLevel(bubs, maxRow+1, {type:"edit",number:levelNum});
			
	},
	
	openCreatedLevel:function(levelNum)
	{
			
			var maxRow = 0;cc.log(levelNum);
			//var bubs = DATA.createdLevels[levelNum].bubbles;
			var bubs = this.parent.editorData.userLevels[levelNum].bubbles;cc.log(bubs);
			for(var i=0; i<bubs.length; i++)
			{
				if(bubs[i].row > maxRow)
					maxRow = bubs[i].row;
			}
			var metaData = this.userLevels[0].meta;
			this.bubbleLayer.initLevel(bubs, maxRow+1, {type:"edit",number:levelNum});
			
			this.levelId = levelNum;
		
		
	},
	
	
	
	saveAsNewLevel:function()
	{cc.log("SAVING AS NEW LEVEL");
		var bubbleData = this.bubbleLayer.getBubbles();
   		var bubs = [];cc.log(bubbleData);
   		
   		var newNumRows = this.parent.curCreatedRows;
   		var newNumMoves = this.parent.curCreatedMoves;
   		var newColors = {};
   		var newTypes = [];
   		
   		for(var i=0; i<bubbleData.length; i++)
   		{
   			var bub = bubbleData[i];
   			
   			if(newTypes.indexOf(bub.type) == -1)
   				newTypes.push(bub.type);
   			
   			if(bub.type == 7)
   			{
   				bubs.push({"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":bub.meta.iteration});
   			}
   			else 
   			{
   				var color = null;
   				if("colorCode" in bub && bub.colorCode !== undefined)
   				{
   					color = bub.colorCode;
   					
   					if(bub.type == 0)
   					{
   						if(!(color in newColors))
   						{
   							newColors[color] = 1;
   						}
   						else
   						{
   							newColors[color]++;
   						}
   					}	
   				}
   				var meta = null;
   				if("meta" in bub && bub.meta !== undefined)
   					meta = bub.meta;
   				var newBub = {"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":color,"meta":meta};
   				if("orientation" in bub && bub.orientation !== undefined)
   					newBub.orientation = bub.orientation;
   				if("binary" in bub && bub.orientation !== undefined)
   					newBub.binary = bub.binary;
   				bubs.push(newBub);
   			}
   		}cc.log(bubs);
   		
   		//var meta = {bulbData:this.editorUILayer.bulbData};
   		
   		
   		
		//DATA.saveNewLevelToDatabase(bubs, {});
		var newLevel = {
			bubbles:bubs,
			colors:newColors,
			numMoves:newNumMoves,
			numRows:newNumRows,
			queue:{type:"bucket",colors:[1,1,1,1,1,1]},
			meta:{"0":0},
			levelTypes:newTypes,
			levelColors:Object.keys(newColors)
		};
		this.parent.updateNewCreatedLevel(newLevel);
	},
	/*
	overwriteLevel:function(number)
	{cc.log("OVERWRITE LEVEL "+number);
		//DATA.createdLevels[number] = {bubbles:this.bubbleLayer.bubbles, queue:this.bubbleLayer.queue, meta:this.bubbleLayer.meta};
		
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
		
		//DATA.overwriteCreatedLevel(bubs, {}, number);
		//this.parent.
	},*/
	
	coreUITouched:function(pos)
	{
		var returnObj = this.parent.coreButtonsUI.onTouchEnd(this.parent.coreButtonsUI.convertToNodeSpace(pos));
		
		if(returnObj == "creator")
		{
			this.parent.swapCreatorMode();
		}
	},
	
	resetMenuBar:function()
	{
		this.removeChild(this.menuBarLayer);
		
		this.menuBarLayer = new MenuBarLayer(this.width*.95, this.height*.1, "new");
		this.menuBarLayer.attr({
			x:this.width*.025,
			y:5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.menuBarLayer);
		
		this.menuBarLayer.addPlayButton();
		this.menuBarLayer.addSaveButton();
			
	},
	
	onTouchBegan:function(pos)
		{cc.log("EDITOR TOUCH BEGAN !!!!!!!!!!");cc.log(pos);
			//var target = event.getCurrentTarget();
		    	var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);cc.log(locationInNode);
		    

		   if(locationInNode.x > this.menuBarLayer.x && locationInNode.x < this.menuBarLayer.x+this.menuBarLayer.width
	    			&& locationInNode.y > this.menuBarLayer.y && locationInNode.y < this.menuBarLayer.y+this.menuBarLayer.height)
	    		{
	    			
	    		}
	    		else
	    		{
		    		this.bubbleLayer.onTouchBegin(locationInNode, this.drawType, this.drawColor, this.drawOrientation, this.drawBinary, this.drawMeta);
		    }
		},
		onTouchMoved:function(pos)
		{
			var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
			
			if(locationInNode.x > this.menuBarLayer.x && locationInNode.x < this.menuBarLayer.x+this.menuBarLayer.width
	    			&& locationInNode.y > this.menuBarLayer.y && locationInNode.y < this.menuBarLayer.y+this.menuBarLayer.height)
	    		{
	    			
	    		}
	    		else
	    		{
	    			this.bubbleLayer.onTouchMoved(locationInNode, this.drawType, this.drawColor, this.drawOrientation, this.drawBinary, this.drawMeta);
	    		}
	    	
		},
		onTouchEnded:function(pos)
		{
			//var target = event.getCurrentTarget();
		    var locationInNode = this.bubbleLayer.convertToNodeSpace(pos);
	    		//this.bubbleLayer.onTouchBegin(touch.getLocation(), this.drawType);
	    		var returnData = null;
	    		var uiData = null;
	    	
	    		
	    		if(locationInNode.x > this.menuBarLayer.x && locationInNode.x < this.menuBarLayer.x+this.menuBarLayer.width
	    			&& locationInNode.y > this.menuBarLayer.y && locationInNode.y < this.menuBarLayer.y+this.menuBarLayer.height)
	    		{
	    			this.menuBarLayer.onTouchEnded(locationInNode);
	    		}
	    		else
	    		{
	    			this.bubbleLayer.onTouchEnded(locationInNode, this.drawType, this.drawColor, this.drawOrientation, this.drawBinary, this.drawMeta);
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

