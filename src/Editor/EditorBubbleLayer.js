
var EditorBubbleLayer = cc.Layer.extend({
	
///////////////////////////////////////////////////////////	
// 1. Level Initialization
//	-ctor()
//	-onEnter()
//	-initLevel()
	
	ctor:function(width, height, bubbles, numRows, meta){
		this._super();cc.log(bubbles);
		
		this.width = width;
		this.height = height;
		
		var dn = new cc.DrawNode();
		this.addChild(dn);
		this.draw = function(){dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
			//dn.drawRect(cc.p(0,0), cc.p(20, 24.94*20), cc.color(255,0,0,255), 1, cc.color(0,255,0,255));
			};
		this.draw();
		
		this.evenRowAdjacents = [{"x":-1,"y":0}, {"x":1,"y":0}, {"x":0,"y":1}, {"x":-1,"y":1}, {"x":0,"y":-1}, {"x":-1,"y":-1}];
		this.oddRowAdjacents = [{"x":-1,"y":0}, {"x":1,"y":0}, {"x":0,"y":1}, {"x":1,"y":1}, {"x":0,"y":-1}, {"x":1,"y":-1}];
		
		this.bulbData = [];
		cc.log(meta);
		if(meta != null && "bulbData" in meta)
		{
			this.bulbData = meta.bulbData;
			for(var i=0; i<this.bulbData.length; i++)
			{
				this.bulbData[i] = FUNCTIONS.convertCodesToColors(this.bulbData[i]);
			}
		}
		cc.log(this.bulbData);
		
		//this.numRows = 20;
		this.numCols = 12;
		//this.maxRows = Math.ceil(this.height/this.rowHeight);
		//this.curRow = Math.max(this.numRows-this.maxRows, 0);
		this.curRow = 0;
		
		this.bubbles = [];
		this.numRows = numRows;
		//this.numRows = Math.floor(this.height/ ( Math.pow(3,.5)*(this.width/24) ) ) + 1;
		this.bubbleMap = [];
		
		this.hexes = [];
		this.hexMap = [];
		
		this.possibleColors = ["red","yellow","green","blue","pink","purple"];
		this.bubbleR = this.width/this.numCols / 2;
		this.rowHeight = Math.pow(3, .5) * this.bubbleR;
		
		this.maxRows = Math.floor(this.height/this.rowHeight);
		
		//this.bottomActiveRow = this.numRows-1;
		//this.topActiveRow = this.numRows - this.maxRows-1;
       	this.topActiveRow = 0;
       	this.bottomActiveRow = this.maxRows;
       	this.curRow = this.numRows-this.maxRows-1;
       	
       	this.levelStatus = {type:"new"};
       	
       	this.emojiGoals = {};
       	
       	
		this.initLevel(bubbles, this.numRows, this.levelStatus);
	},
	
	setMove:function(moveNum)
	{
		for(var i=0; i<this.bubbles.length; i++)
		{
			if(this.bubbles[i].type == 7)
			{
				this.bubbles[i].advanceToTurn(moveNum);
			}
		}
	},
	
	onEnter:function(){

		
	},
	
	getBubbleData:function()
	{
		var bubs = [];
		for(var i=0; i<this.bubbles.length; i++)
		{
			var dBub = this.bubbles[i];
			var bub = {row:dBub.row,col:dBub.col,type:dBub.type};
			var colorCode = null;
			if("colorCode" in dBub)
				colorCode = dBub.colorCode;
			bub.colorCode = colorCode;
			if("orientation" in dBub && dBub.orientation != null)
				bub.orientation = dBub.orientation;
			if("binary" in dBub && dBub.binary != null)
				bub.binary = dBub.binary;
			
			bubs.push(bub);
		}
		
		return bubs;
	},
	
	getBubbles:function()
	{
		return this.bubbles;
	},
	getNumRows:function()
	{
		var maxRow = 0;
		for(var i=0; i<this.bubbles.length; i++)
		{
			if(this.bubbles[i].row > maxRow)
				maxRow = this.bubbles[i].row;
		}
		return maxRow+1;
		//return this.numRows;
	},
	
	initLevel:function(bubbles, numRows, levelStatus)
	{
		this.numRows = numRows;
		
       	this.topActiveRow = 0;
       	this.bottomActiveRow = this.maxRows;
       	this.curRow = this.numRows-this.maxRows-1;
       	
       	this.levelStatus = levelStatus;
       	
		this.bubbleMap = [];
		for(var i=0; i<this.bubbles.length; i++)
		{
			if(this.bubbles[i].active)
				this.removeChild(this.bubbles[i]);
		}
		this.bubbles = [];
		
		this.hexMap = [];
		for(var i=0; i<this.hexes.length; i++)
		{
			if(this.hexes[i].active)
				this.removeChild(this.hexes[i]);
		}
		this.hexes = [];
		
		for(var i=0; i<this.numRows+1; i++)
		{
			var bubbleRow = [];
			var hexRow = [];
			for(var j=0; j<this.numCols-(i%2); j++)
			{
				bubbleRow.push(-1);
				hexRow.push(-1);
			}
			this.bubbleMap.push(bubbleRow);
			this.hexMap.push(hexRow);
		}
		
		for(var i=0; i<this.numRows; i++)
		{
	       	for(var j=0; j<this.numCols-(i%2); j++)
	       	{
	       		var overflowOffset = this.getOverflowOffset();
	       		
	       		
	       		var hex = new Bubble(this.bubbleR, null, -1, null, null, null, i, j);
	       		hex.attr({
	       			x: this.bubbleR+j*this.bubbleR*2 + (i%2)*this.bubbleR,
	       			y: this.height - i*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
	       			anchorX:.5,
	       			anchorY:.5
	       		});
	       		this.hexes.push(hex);
	       		this.hexMap[i][j] = this.hexes.length-1;
	       		if(i >= this.topActiveRow && i <= this.bottomActiveRow)
	       		{
	       			hex.active = true;
	       			this.addChild(hex);
	       		}
	       	}
       	}
       	
       	var overflowOffset = this.getOverflowOffset();
       	
       	
       	var hexIndicesToDelete = [];
       	for(var i=0; i<bubbles.length; i++)
       	{
       		var colorData = bubbles[i].colorCode;
       		if(bubbles[i].type == 7)
       		{
       			//colorData = FUNCTIONS.convertCodesToColors(this.bulbData[colorData]);
       			colorData = this.bulbData[colorData];
       		}
       		var bub = new Bubble(this.bubbleR, colorData, bubbles[i].type, null, null, bubbles[i].meta, bubbles[i].row, bubbles[i].col);
			//cc.log(bub);
			bub.attr({
       			x: this.bubbleR+bub.col*this.bubbleR*2 + (bub.row%2)*this.bubbleR,
       			y: this.height - bub.row*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
       			anchorX:.5,
       			anchorY:.5
       		});
			this.bubbles.push(bub);
			this.bubbleMap[bubbles[i].row][bubbles[i].col] = i;
			if(bub.row >= this.topActiveRow && bub.row <= this.bottomActiveRow)
			{
				bub.active = true;
				this.addChild(bub);
			}
			hexIndicesToDelete.push(this.hexMap[bub.row][bub.col]);
			
			
			if(bubbles[i].type == 0)
			{
				if(!(colorData in this.emojiGoals))
				{
					this.emojiGoals[colorData] = 0;
				}
				this.emojiGoals[colorData]++;
			}
       	}
       	
       	hexIndicesToDelete.sort(function(a,b){return b-a;});
       	for(var i=0; i<hexIndicesToDelete.length; i++)
       	{
       		this.removeChild(this.hexes[hexIndicesToDelete[i]]);
       		this.hexMap[this.hexes[hexIndicesToDelete[i]].row][this.hexes[hexIndicesToDelete[i]].col] = -1;
       		this.hexes.splice(hexIndicesToDelete[i], 1);
       	}
       	this.syncHexMap();
	},
	
	getOverflowOffset:function()
	{
		var overflowOffset = Math.max((this.numRows-this.curRow) - this.maxRows, 0) * this.rowHeight;//cc.log(Math.max((this.numRows-this.curRow) - this.maxRows, 0));
   		//if(overflowOffset > 0)
   		
   		if(Math.max((this.numRows-this.curRow) - this.maxRows, 0) > 1)
   			overflowOffset -= this.rowHeight/2;
   		else overflowOffset -= this.rowHeight;
   		return overflowOffset;
	},

///////////////////////////////////////////////////////////
// 2. Controls
//	-onTouchBegin(loc)
//	-onTouchMove(loc)
//	-onTouchEnd(loc)
//	-moveShooter(dt)
//	-resetShooter()

	onTouchBegin:function(loc, drawType, drawColor, drawOrientation, drawBinary, drawMeta){
		if(this.bubbles.length == 0)
		{
			this.parent.parent.readyCreatedPlay();
			this.parent.parent.readySave();
		}
		
		var hex = this.getHexAtPos(loc);
		if(hex.y < this.bubbleMap.length)
			this.paintHex(hex, drawType, drawColor, drawOrientation, drawBinary, drawMeta);
		else
		{
			this.addRows(hex.y-this.bubbleMap.length+1);
			this.paintHex(hex, drawType, drawColor, drawOrientation, drawBinary, drawMeta);
		}
   	},
	onTouchMoved:function(loc, drawType, drawColor, drawOrientation, drawBinary, drawMeta){
		var hex = this.getHexAtPos(loc);
		if(hex.y < this.bubbleMap.length)
			this.paintHex(hex, drawType, drawColor, drawOrientation, drawBinary, drawMeta);
		else
		{
			this.addRows(hex.y-this.bubbleMap.length+1);
			this.paintHex(hex, drawType, drawColor, drawOrientation, drawBinary, drawMeta);
		}
	},
	onTouchEnded:function(loc){
		if(this.bubbles.length == 0)
		{
			this.parent.parent.preventCreatedPlay();
			
		}
	},
	
	activateRow:function(rowIndex)
	{
		for(var i=0; i<this.numCols-(rowIndex%2); i++)
		{
			if(this.bubbleMap[rowIndex][i] != -1)
			{
				var bub = this.bubbles[this.bubbleMap[rowIndex][i]];
				bub.active = true;
				this.addChild(bub);
			}
			if(this.hexMap[rowIndex][i] != -1)
			{
				var hex = this.hexes[this.hexMap[rowIndex][i]];
				hex.active = true;
				this.addChild(hex);
			}
		}
	},
	deactivateRow:function(rowIndex)
	{
		for(var i=0; i<this.numCols-(rowIndex%2); i++)
		{
			if(this.bubbleMap[rowIndex][i] != -1)
			{	
				var bub = this.bubbles[this.bubbleMap[rowIndex][i]];
				bub.active = false;
				this.removeChild(bub);
			}
			if(this.hexMap[rowIndex][i] != -1)
			{
				var hex = this.hexes[this.hexMap[rowIndex][i]];
				hex.active = false;
				this.removeChild(hex);
			}
		}
	},
	// bubbles move up
	scrollDown:function()
	{cc.log(this.bottomActiveRow + " " + (this.numRows-1));
		if(this.bottomActiveRow < this.numRows-1)
		{
			this.bottomActiveRow += 1;
			this.activateRow(this.bottomActiveRow);
			this.deactivateRow(this.topActiveRow);
			this.topActiveRow += 1;
			this.curRow = Math.max(this.curRow-1, 0);
			this.updateElementPositions();
		}
		else
		{
			
			this.addRows(1);
			
			var overflowOffset = this.getOverflowOffset();
	       	var rowNum = this.hexMap.length-1-1;					// ???????????????????????????????????
	       	for(var i=0; i<this.hexMap[rowNum].length; i++)
	       	{
	       		var hex = new Bubble(this.bubbleR, null, -1, null, null, null, rowNum, i);
	       		hex.attr({
	       			x: this.bubbleR+i*this.bubbleR*2 + (rowNum%2)*this.bubbleR,
	       			y: this.height - rowNum*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
	       			anchorX:.5,
	       			anchorY:.5
	       		});
	       		this.hexes.push(hex);
	       		this.hexMap[rowNum][i] = this.hexes.length-1;
	       		if(rowNum >= this.topActiveRow && rowNum <= this.bottomActiveRow)
	       		{
	       			hex.active = true;
	       			this.addChild(hex);
	       		}
			
			}
			
			this.bottomActiveRow += 1;
			this.activateRow(this.bottomActiveRow);
			this.deactivateRow(this.topActiveRow);
			this.topActiveRow += 1;
			this.curRow = Math.max(this.curRow-1, 0);
			this.updateElementPositions();
		}
	},
	// bubbles move down
	scrollUp:function()
	{
		if(this.topActiveRow > 0)
		{
			this.topActiveRow -= 1;
			this.activateRow(this.topActiveRow);
			this.deactivateRow(this.bottomActiveRow);
			this.bottomActiveRow -= 1;
			this.curRow  = Math.min(this.curRow+1, Math.max(this.numRows-this.maxRows, 0));
			this.updateElementPositions();
		}
	},
	
	updateElementPositions:function()
	{
		var overflowOffset = this.getOverflowOffset();
		/*for(var i=0; i<this.hexes.length; i++)
		{
			var hex = this.hexes[i];
			hex.attr({
				x: this.bubbleR+hex.col*this.bubbleR*2 + (hex.row%2)*this.bubbleR,
       			y: this.height - hex.row*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
       			anchorX:.5,
       			anchorY:.5
			});
		}*/
		for(var i=this.topActiveRow; i<=this.bottomActiveRow; i++)
		{//cc.log(i + " / " + this.bottomActiveRow);
			for(var j=0; j<12-(i%2); j++)
			{//cc.log(i + " " + j);
				var hexIndex = this.hexMap[i][j];
				var bubIndex = this.bubbleMap[i][j];
				
				if(hexIndex != -1)
				{
					var hex = this.hexes[hexIndex];
					hex.attr({
						x: this.bubbleR+hex.col*this.bubbleR*2 + (hex.row%2)*this.bubbleR,
		       			y: this.height - hex.row*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
		       			anchorX:.5,
		       			anchorY:.5
					});
				}
				else if(bubIndex != -1)
				{
					var bub = this.bubbles[bubIndex];
					bub.attr({
						x: this.bubbleR+bub.col*this.bubbleR*2 + (bub.row%2)*this.bubbleR,
		       			y: this.height - bub.row*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
		       			anchorX:.5,
		       			anchorY:.5
					});
				}
			}
			
		}
		
		/*for(var i=0; i<this.bubbles.length; i++)
		{
			var bub = this.bubbles[i];
			bub.attr({
				x: this.bubbleR+bub.col*this.bubbleR*2 + (bub.row%2)*this.bubbleR,
       			y: this.height - bub.row*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
       			anchorX:.5,
       			anchorY:.5
			});
		}*/
	},
	
	paintHex:function(hex, drawType, drawColor, drawOrientation, drawBinary, drawMeta)
	{
		var overflowOffset = this.getOverflowOffset();
		
		this.parent.parent.curUnsavedProg = true;
		
		if(drawType == -1)
		{
			if(hex.y < this.bubbleMap.length && this.bubbleMap[hex.y][hex.x] != -1)
			{
				var bub = this.bubbles[this.bubbleMap[hex.y][hex.x]];
				
				if(bub.type == 0)
				{
					this.emojiGoals[bub.colorCode]--;
					if(this.emojiGoals[bub.colorCode] == 0)
						delete this.emojiGoals[bub.colorCode];
				}cc.log(this.emojiGoals);
				
				this.removeChild(this.bubbles[this.bubbleMap[hex.y][hex.x]]);
				this.bubbles.splice(this.bubbleMap[hex.y][hex.x], 1);
				this.bubbleMap[hex.y][hex.x] = -1;
				
				var newHex = new Bubble(this.bubbleR, null, -1, null, null, null, hex.y, hex.x);
				newHex.attr({
					x: this.bubbleR+newHex.col*this.bubbleR*2 + (newHex.row%2)*this.bubbleR,
	       			y: this.height - newHex.row*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
	       			anchorX:.5,
	       			anchorY:.5
				}); 
				this.hexes.push(newHex);
				this.hexMap[hex.y][hex.x] = this.hexes.length-1;
				this.addChild(newHex);
				
				this.parent.parent.removeEditorBubble(hex.y, hex.x);
			}
			this.syncBubbleMap();
		}
		else
		{
	
			if(hex.y >= this.bubbleMap.length)
				this.addRows(hex.y-this.bubbleMap.length+1);
			
			if(this.bubbleMap[hex.y][hex.x] == -1)
			{
				if(drawType == 0)
				{
					if(!(drawColor in this.emojiGoals))
					{
						this.emojiGoals[drawColor] = 1;
					}
					else
					{
						this.emojiGoals[drawColor]++;
					}
				}cc.log(this.emojiGoals);
				
				var hexBubble = this.hexes[this.hexMap[hex.y][hex.x]];
				this.removeChild(hexBubble);
				this.hexes.splice(this.hexMap[hex.y][hex.x], 1);
				this.hexMap[hex.y][hex.x] = -1;
				this.syncHexMap();
				cc.log(drawColor);
				var bubble = new Bubble(this.bubbleR,drawColor,drawType,drawOrientation,drawBinary,drawMeta,hex.y, hex.x);
				bubble.attr({
	       			x: this.bubbleR+hex.x*this.bubbleR*2 + (hex.y%2)*this.bubbleR,
	       			y: this.height - hex.y*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
	       			anchorX:.5,
	       			anchorY:.5
	       		});
	       		bubble.active = true;
				this.addChild(bubble);
				this.bubbles.push(bubble);
				this.bubbleMap[hex.y][hex.x] = this.bubbles.length-1;
				cc.log(bubble.modImg);
				if(drawType == 7)
				{
					bubble.addNumber(drawMeta.iteration);
				}
				
				this.parent.parent.addEditorBubble(hex.y, hex.x, {"type":bubble.type, "colorCode":bubble.colorCode, "orientation":bubble.orientation, "binary":bubble.binary, "meta":bubble.meta, "row":bubble.row, "col":bubble.col});
			}
			// Replace existing bubble
			else if(this.bubbleMap[hex.y][hex.x] != -1 && (this.bubbles[this.bubbleMap[hex.y][hex.x]].type != drawType || this.bubbles[this.bubbleMap[hex.y][hex.x]].colorCode != drawColor) )
			{
				var oldBubble = this.bubbles[this.bubbleMap[hex.y][hex.x]];
				if(drawType == 0)
				{
					if(!(drawColor in this.emojiGoals))
					{
						this.emojiGoals[drawColor] = 1;
					}
					else
					{
						this.emojiGoals[drawColor]++;
					}
					
					if(oldBubble.type == 0)
					{
						this.emojiGoals[oldBubble.type]--;
						if(this.emojiGoals[oldBubble.colorCode] == 0)
							delete this.emojiGoals[oldBubble.colorCode];
					}
				}cc.log(this.emojiGoals);
				
				
				this.removeChild(oldBubble);
				var bubble = new Bubble(this.bubbleR,drawColor,drawType,drawOrientation,drawBinary,drawMeta,hex.y, hex.x);
				bubble.attr({
	       			x: this.bubbleR+hex.x*this.bubbleR*2 + (hex.y%2)*this.bubbleR,
	       			y: this.height - hex.y*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
	       			anchorX:.5,
	       			anchorY:.5
	       		});
	       		bubble.active = true;
				this.addChild(bubble);
				this.bubbles.splice(this.bubbleMap[hex.y][hex.x], 1, bubble);
				
				if(drawType == 7)
				{
					var bulbLabel = new cc.LabelTTF(""+drawMeta.iteration,"Roboto",24);
					bulbLabel.attr({
						x:DATA.bubbleR/3,
						y:-DATA.bubbleR/3,
						anchorX:.5,
						anchorY:.5
					});
					bulbLabel.color = cc.color(0,0,0,255);
					bubble.addChild(bulbLabel);
				}
				
				this.parent.parent.addEditorBubble(hex.y, hex.x, {"type":bubble.type, "colorCode":bubble.colorCode, "orientation":bubble.orientation, "binary":bubble.binary, "meta":bubble.meta, "row":bubble.row, "col":bubble.col});
			
			}
		}
	},
	
	getHexAtPos:function(pos)
	{
		var size = cc.winSize;
		var loc = this.convertToNodeSpace(pos);
		var overflowOffset = this.getOverflowOffset();
		//cc.log(pos.y);cc.log(this.parent.height);
		var row = Math.floor((this.height-(loc.y) + overflowOffset)/this.rowHeight);
		
		var colOffset = 0;
		if(row%2 == 1)
			colOffset = this.bubbleR;
		var col = Math.floor((pos.x-colOffset)/(this.bubbleR*2));
		
		if(row < 0 || col < 0 || col > 11-(row%2))
			return null;
		else return {"x":col, "y":row};
	},
	
	
	getConnectedOfType:function(row, col)
	{
		var type = this.bubbles[this.bubbleMap[row][col]].type;
		var adjQueue = [{"x":col, "y":row}];
		var connectedBubbleIndices = [];
		
		var exploredHexes = [];
		
		// BST for matched bubbles
		while(adjQueue.length > 0)
		{
			var adj = adjQueue[0];
			var bubble = this.bubbles[this.bubbleMap[adj.y][adj.x]];

			if(bubble == null)
				cc.log("UNDEFINED AT " + adj.x + ", " + adj.y);

			if(bubble.type == type)
			{
				// 1. Mark as adjacent-color
				connectedBubbleIndices.push(this.bubbleMap[adj.y][adj.x]);
				//this.bubbleMap[adj.y][adj.x] = -1;	// this way getAdjacents() ignores matched-bubs already found
				
				// 2. Add adjacents to queue
				var newAdjacents = this.getAdjacents(adj.y, adj.x);
				for(var i=0; i<newAdjacents.length; i++)
				{
					// Add to queue if unexplored.
					var exploreKey = this.createKey(newAdjacents[i]);
					if(!(exploreKey in exploredHexes))
					{
						adjQueue.push(newAdjacents[i]);
						exploredHexes[exploreKey] = 0;
					}
				}
			}
			
			adjQueue.splice(0, 1);
		}
		return connectedBubbleIndices;
	},
	
	cullUnconnected:function()
	{
		var queue = [];
		
		var explorationTable = [];
		for(var i=0; i<this.bubbles.length; i++)
		{
			explorationTable[this.createKey({"x":this.bubbles[i].col,"y":this.bubbles[i].row})] = 0;
		}
		
		// Get anchors
		/*for(var i=0; i<this.bubbleMap[0].length; i++)
		{
			var bubIndex = this.bubbleMap[0][i];
			if(bubIndex != -1)
			{
				var bubble = this.bubbles[bubIndex];
				queue.push({"x":bubble.col, "y":bubble.row});cc.log(this.createKey({"x":bubble.col,"y":bubble.row}));
				explorationTable[this.createKey({"x":bubble.col,"y":bubble.row})] = 1;
			}
		}*/
		for(var i=0; i<this.bubbles.length; i++)
		{
			var bub = this.bubbles[i];
			var bubIndex = this.bubbleMap[bub.row][bub.col];
			if(bub.row == 0 || bub.isAnchor)
			{
				queue.push({"x":bub.col, "y":bub.row});
				explorationTable[this.createKey({"x":bub.col, "y":bub.row})] = 1;
			}
		}
		
		while(queue.length > 0)
		{
			var adjacents = this.getUnexploredAdjacents(queue[0].y, queue[0].x, explorationTable);
			for(var i=0; i<adjacents.length; i++)
			{
				var adj = adjacents[i];
				queue.push(adj);
				explorationTable[this.createKey(adj)] = 1;
			}
			queue.splice(0, 1);
		}
		
		var culledBubbleIndices = [];
		var explorationKeys = Object.keys(explorationTable);
		for(var i=0; i<explorationKeys.length; i++)
		{
			if(explorationTable[explorationKeys[i]] == 0)
			{
				// cull this bubble
				var splitKeys = explorationKeys[i].split("_");
				var y = parseInt(splitKeys[0]);
				var x = parseInt(splitKeys[1]);
				culledBubbleIndices.push(this.bubbleMap[y][x]);
			}
		}
		
		culledBubbleIndices.sort(function(a,b){return b-a;});
		for(var i=0; i<culledBubbleIndices.length; i++)
		{
			this.removeChild(this.bubbles[culledBubbleIndices[i]]);
			var bub = this.bubbles[culledBubbleIndices[i]];
			if(bub == null)
			{
				cc.log("BUG");cc.log("Index: "+culledBubbleIndices[i]);cc.log();
			}
			this.bubbleMap[bub.row][bub.col] = -1;
			this.bubbles.splice(culledBubbleIndices[i], 1);
			
		}
		this.syncBubbleMap();
	},
	
	

///////////////////////////////////////////////////////////	
// 4. General Data Functions
//	-getAdjacents(row, col)
//	-getUnexploredAdjacents(row, col, explorationTable)
//	-getAdjacentsExcluding(row, col, exclusionTable)
//
//	-updateBubble(bubble, row, col)
//	-syncBubbleMap()
//	-destroyBubbles(bubbleIndices)
//
//	-createKey(pos)
//	-parseKey(keyString)
//	-dist(bubA, bubB)
//	-pointWithin(point)
	
	getAdjacents:function(row, col)
	{
		var adjacents = [];
		if(row%2 == 0)
		{
			for(var i=0; i<this.evenRowAdjacents.length; i++)
			{
				var adj = this.evenRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				if(y >= 0 && y < this.bubbleMap.length && x >= 0 && x < this.bubbleMap[y].length
					&& this.bubbleMap[y][x] != -1)
				{
					adjacents.push({"x":x, "y":y});
				}
				//else cc.log("NOTHING AT ("+x+","+y+")");
			}
		}
		else
		{
			for(var i=0; i<this.oddRowAdjacents.length; i++)
			{
				var adj = this.oddRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				if(y >= 0 && y < this.bubbleMap.length && x >= 0 && x < this.bubbleMap[y].length
					&& this.bubbleMap[y][x] != -1)
				{
					adjacents.push({"x":x, "y":y});
				}
				//else cc.log("NOTHING AT ("+x+","+y+")");
			}
		}
		
		return adjacents;
	},
	
	getUnexploredAdjacents:function(row, col, explorationTable){
		var adjacents = [];
		if(row%2 == 0)
		{
			for(var i=0; i<this.evenRowAdjacents.length; i++)
			{
				var adj = this.evenRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				var key = ""+y+"_"+x;
				if(y >= 0 && x >= 0
					&& (key in explorationTable) && explorationTable[key] == 0)
				{
					adjacents.push({"x":x, "y":y});
				}
			}
		}
		else
		{
			for(var i=0; i<this.oddRowAdjacents.length; i++)
			{
				var adj = this.oddRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				var key = ""+y+"_"+x;
				if(y >= 0 && x >= 0
					&& (key in explorationTable) && explorationTable[key] == 0)
				{
					adjacents.push({"x":x, "y":y});
				}
			}
		}
		
		return adjacents;
	},
	
	getAdjacentsExcluding:function(row, col, exclusionTable){
		var adjacents = [];
		if(row%2 == 0)
		{
			for(var i=0; i<this.evenRowAdjacents.length; i++)
			{
				var adj = this.evenRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				var key = ""+y+"_"+x;
				if(y >= 0 && y < this.bubbleMap.length && x >= 0 && x < this.bubbleMap[y].length
					&& this.bubbleMap[y][x] != -1
					&& !(key in exclusionTable))
				{
					adjacents.push({"x":x, "y":y});
				}
			}
		}
		else
		{
			for(var i=0; i<this.oddRowAdjacents.length; i++)
			{
				var adj = this.oddRowAdjacents[i];
				var x = col+adj.x;
				var y = row+adj.y;
				var key = ""+y+"_"+x;
				if(y >= 0 && y < this.bubbleMap.length && x >= 0 && x < this.bubbleMap[y].length
					&& this.bubbleMap[y][x] != -1
					&& !(key in exclusionTable))
				{
					adjacents.push({"x":x, "y":y});
				}
			}
		}
		
		return adjacents;
	},
	
	addBubbles:function(bubbles)
	{
		var overflowOffset = this.getOverflowOffset();
		
		for(var i=0; i<bubbles.length; i++)
		{
			var bubble = new Bubble(this.bubbleR,bubbles[i].colorCode,bubbles[i].type,null,null,null,bubbles[i].row, bubbles[i].col);
			bubble.attr({
       			x: this.bubbleR+bubbles[i].col*this.bubbleR*2 + (bubbles[i].row%2)*this.bubbleR,
       			y: this.height - bubbles[i].row*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset,
       			anchorX:.5,
       			anchorY:.5
       		});
       		if(bubbles[i].row >= this.topActiveRow && bubbles[i].col <= this.bottomActiveRow)
       		{
       			bubble.active = true;
       			this.addChild(bubble);
       		}
			this.bubbles.push(bubble);
			this.bubbleMap[bubbles[i].row][bubbles[i].col] = this.bubbles.length-1;
		}
	},
	
	updateBubble:function(bubble, row, col)
	{
		this.bubbles.push(bubble);
		
		if(row >= this.bubbleMap.length)
		{
			var bubbleRow = [];
			for(var i=0; i<this.numCols-(i%2); i++)
			{
				bubbleRow.push(-1);
			}
			this.bubbleMap.push(bubbleRow);
			this.numRows++;
		}
		
		this.bubbleMap[row][col] = this.bubbles.length-1;
	},
	
	addRows:function(num)
	{
		var initLength = this.bubbleMap.length;
		for(var i=0; i<num; i++)
		{
			var bubbleRow = [];
			var hexRow = [];
			for(var j=0; j<this.numCols-((initLength+i)%2); j++)
			{
				bubbleRow.push(-1);
				hexRow.push(-1);
			}
			this.bubbleMap.push(bubbleRow);
			this.hexMap.push(hexRow);
			this.numRows++;
		}
	},
	
	syncBubbleMap:function()
	{
		for(var i=0; i<this.bubbles.length; i++)
		{
			var bubble = this.bubbles[i];
			this.bubbleMap[bubble.row][bubble.col] = i;
		}
	},
	
	syncHexMap:function()
	{
		for(var i=0; i<this.hexes.length; i++)
		{
			var hex = this.hexes[i];
			this.hexMap[hex.row][hex.col] = i;
		}
	},
	
	/*destroyAllBubbles:function()
	{
		for(var i=0; i<this.bubbles.length; i++)
		{
			var bub = this.bubbles[i];
			this.bubbleMap[bub.row][bub.col] = -1;
			this.removeChild(this.bubbles[i]);
		}
		this.bubbles = [];
		this.syncBubbleMap();//?
	},*/
	
	destroyBubbles:function(bubbleIndices)
	{
		bubbleIndices.sort(function(a,b){return b-a;});
		for(var i=0; i<bubbleIndices.length; i++)
		{
			var bub = this.bubbles[bubbleIndices[i]];
			this.bubbleMap[bub.row][bub.col] = -1;
			this.removeChild(this.bubbles[bubbleIndices[i]]);
			this.bubbles.splice(bubbleIndices[i], 1);
		}
		this.syncBubbleMap();
	},
	
	createKey:function(pos)
	{
		return ""+pos.y+"_"+pos.x;
	},
	
	parseKey:function(keyString)
	{
		var splitKeys = explorationKeys[i].split("_");
		return {"y":parseInt(splitKeys[0]), "x":parseInt(splitKeys[1])};
	},
	
	dist:function(bubA, bubB)
	{
		var dx = Math.abs(bubB.x - bubA.x);
		var dy = Math.abs(bubB.y - bubA.y);
		
		return Math.pow( Math.pow(dx , 2) + Math.pow(dy , 2) , .5);
	},
	
	pointWithin:function(point)
	{
		if(point.x > 0 && point.x < 0+this.width &&
			point.y > 0 && point.y < 0+this.height)
		{
			return true;
		}
		return false;
	}
});
	