var CreatorRewardsLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Browse", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		
		
		/*this.catALabel = new cc.LabelTTF("You", "Arial",20);
		this.catALabel.attr({
			x:size.width*.2,
			y:this.tabTitleLabel.y-this.tabTitleLabel.height-5,
			anchorX:.5,
			anchorY:1
		});
		this.catALabel.color = cc.color(0,0,0,255);
		this.addChild(this.catALabel);
		
		this.catBLabel = new cc.LabelTTF("Trend", "Arial",20);
		this.catBLabel.attr({
			x:size.width*.5,
			y:this.tabTitleLabel.y-this.tabTitleLabel.height-5,
			anchorX:.5,
			anchorY:1
		});
		this.catBLabel.color = cc.color(0,0,0,255);
		this.addChild(this.catBLabel);
		
		this.catCLabel = new cc.LabelTTF("Popular", "Arial",20);
		this.catCLabel.attr({
			x:size.width*.8,
			y:this.tabTitleLabel.y-this.tabTitleLabel.height-5,
			anchorX:.5,
			anchorY:1
		});
		this.catCLabel.color = cc.color(0,0,0,255);
		this.addChild(this.catCLabel);
		*/
		
		
		
		
		
		this.curSelectedLevel = -1;
		
		this.dividerX = this.width/12*7;
		
		this.topBoxIndex = 0;
		
		this.leftUpButton = new cc.Sprite(res.up_arrow);
		this.leftUpButton.setScale(size.width/12 / this.leftUpButton.width);
		this.leftUpButton.attr({
			x:this.dividerX,
			y:this.height,
			anchorX:1,
			anchorY:1
		});
		this.addChild(this.leftUpButton);
		
		this.leftDownButton = new cc.Sprite(res.down_arrow);
		this.leftDownButton.setScale(size.width/12 / this.leftDownButton.width);
		this.leftDownButton.attr({
			x:this.dividerX,
			y:this.height-(6*(size.width/12)),
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.leftDownButton);
		
		
		var buttonHeight = DATA.bottomUIHeight;
		var sideButtonWidth = this.width*.3 - 4;
		
		this.levelBoxes = [];
		this.boxWidth = (this.width)*3/5;
		this.boxHeight = DATA.bubbleR*10;
		this.boxBorder = Math.floor(DATA.bubbleR*.5);
		
		this.levelBox = {x:this.width/2-this.boxWidth/2, y:buttonHeight+3, width:this.boxWidth, height:this.boxHeight};
		this.leftBox = {x:this.boxBorder, y:this.levelBox.y, width:this.levelBox.x-this.boxBorder, height:this.boxHeight};
		this.rightBox = {x:this.levelBox.x+this.levelBox.width+this.boxBorder, y:this.levelBox.y, width:(this.width-this.boxBorder)-(this.levelBox.x+this.levelBox.width+this.boxBorder), height:this.boxHeight};
		
		var levelData = DATA.createdLevels;
		var levelDataKeys = Object.keys(levelData);
		if(levelDataKeys.length == 1 && levelDataKeys[0] == "00")
		{
			
		}
		else
		{
			for(var i=0;i<levelDataKeys.length; i++)
			{
				var box = {"x":this.width/2 - this.boxWidth/2 + (this.boxWidth+10)*i,"num":this.topBoxIndex+i+1,"width":this.boxWidth,"height":this.boxHeight,"y":0};
				this.levelBoxes.push(box);
			}
		}
		
		this.editButton = new cc.Sprite(res.edit_button);
		this.editButton.setScaleX(sideButtonWidth/this.editButton.width);
		this.editButton.setScaleY(buttonHeight/this.editButton.height);
		this.editButton.attr({
			x:5,
			y:3,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.editButton);
		
		this.testButton = new cc.Sprite(res.test_button);
		this.testButton.setScaleX(sideButtonWidth/this.testButton.width);
		this.testButton.setScaleY(buttonHeight/this.testButton.height);
		this.testButton.attr({
			x:this.editButton.x+(this.editButton.width*this.editButton.scale)+5,
			y:3,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.testButton);
		
		this.shareButton = new cc.Sprite(res.share_button);
		this.shareButton.setScaleX(sideButtonWidth/this.shareButton.width);
		this.shareButton.setScaleY(buttonHeight/this.shareButton.height);
		this.shareButton.attr({
			x:this.testButton.x+(this.testButton.width*this.testButton.scale)+5,
			y:3,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.shareButton);
		
		var maxRow = 0;
		var bubs = DATA.createdLevels[0].bubbles;
		for(var i=0; i<bubs.length; i++)
		{
			if(bubs[i].row > maxRow)
				maxRow = bubs[i].row;
		}
		var metaData = DATA.createdLevels[0].meta;
		cc.log(metaData);
		//this.bubbleLayer = new EditorBubbleLayer(this.width, this.height-(this.levelBoxes[0].y+this.levelBoxes[0].height), 
		//	bubs, 20);	
		this.bubbleLayer = new BubbleLayer(bubs, maxRow+1, 0, "viewer", this.width, this.height-(this.levelBox.y+this.levelBox.height)-15, [], metaData);	
		this.bubbleLayer.attr({
			x:0,
			y:this.levelBox.y+this.levelBox.height+15,
			//width:size.width,
			//height:size.height-this.editorUILayer.height-this.midUILayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		
		this.draw();
		
		this.levelNameLabel = new cc.LabelTTF("Level "+this.topBoxIndex, "Arial", 18);
		this.levelNameLabel.color = cc.color(0,0,0,255);
		this.levelNameLabel.attr({
			x:this.levelBox.x+5,
			y:this.levelBox.y+this.levelBox.height-5,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.levelNameLabel);
		
        //return true;
	},
	
	
	
	onTouchBegan:function(pos)
	{
		cc.log("CREATOR LEVELS BEGIN");
	},
	onTouchMoved:function(pos)
	{
		
	},
	onTouchEnded:function(pos)
	{cc.log("CREATOR LEVELS YOOOOOOOOO");
		
		var loc = this.convertToNodeSpace(pos);
		
		
		
		
		cc.log(pos);cc.log(loc);cc.log(this.levelBox);
		if(FUNCTIONS.posWithin(loc, this.levelBox))
		{cc.log("FIRST LEVEL SELECTED");
			/*
			var maxRow = 0;
			var bubs = DATA.createdLevels[this.topBoxIndex].bubbles;
			for(var i=0; i<bubs.length; i++)
			{
				if(bubs[i].row > maxRow)
					maxRow = bubs[i].row;
			}
			var metaData = DATA.createdLevels[0].meta;
			
			this.removeChild(this.bubbleLayer);
			this.bubbleLayer = null;
			this.bubbleLayer = new BubbleLayer(bubs, maxRow+1, 0, "viewer", this.width, this.height-(this.levelBoxes[0].y+this.levelBoxes[0].height), [], metaData);	
			this.bubbleLayer.attr({
				x:0,
				y:this.levelBoxes[0].y+this.levelBoxes[0].height,
				//width:size.width,
				//height:size.height-this.editorUILayer.height-this.midUILayer.height,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.bubbleLayer);
			*/
		}
		else if(FUNCTIONS.posWithin(loc, this.leftBox))
		{
			if(this.topBoxIndex > 0)
			{
				this.topBoxIndex-=1;
				var maxRow = 0;
				var bubData = DATA.createdLevels[this.topBoxIndex].bubbles;
				var bubs = [];
				for(var i=0; i<bubData.length; i++)
				{
					var dBub = bubData[i];
					if(dBub.row > maxRow)
						maxRow = dBub.row;
			  		
			  		var colorCode = null;
			  		var metaData = null;
			  		if(dBub.type == 7)
			  		{
			  			colorCode = [];
			  			var colorKeys = Object.keys(dBub.colorCode);
			  			for(var j=0; j<colorKeys.length; j++)
			  			{
			  				colorCode.push(dBub.colorCode[colorKeys[j]]);
			  			}
			  		}
			  		else colorCode = dBub.colorCode;
			  		
			  		if(dBub.type == 20)
			  		{cc.log("star");cc.log(dBub);cc.log("hi");
			  			if("meta" in dBub && "id" in dBub.meta && dBub.meta.id != null)
			  			{cc.log("star with ID "+dBub.meta.id);
			  				metaData = dBub.meta;
			  			}
			  		}
			  		
			  		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:colorCode, binary:dBub.binary, meta:metaData};
			  		//cc.log(bubble);
			    	bubs.push(bubble);
				}
				var metaData = DATA.createdLevels[this.topBoxIndex].meta;
				
				//this.bubbleLayer = new EditorBubbleLayer(this.width, this.height-(this.levelBoxes[0].y+this.levelBoxes[0].height), 
				//	bubs, 20);	
				this.removeChild(this.bubbleLayer);
				this.bubbleLayer = null;
				this.bubbleLayer = new BubbleLayer(bubs, maxRow+1, 0, "viewer", this.width, this.height-(this.levelBox.y+this.levelBox.height)-15, [], metaData);	
				this.bubbleLayer.attr({
					x:0,
					y:this.levelBox.y+this.levelBox.height+15,
					//width:size.width,
					//height:size.height-this.editorUILayer.height-this.midUILayer.height,
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.bubbleLayer);
			}
		}
		else if(FUNCTIONS.posWithin(loc, this.rightBox))
		{
			if(this.topBoxIndex+1 < this.levelBoxes.length)
			{
				this.topBoxIndex+=1;
				var maxRow = 0;
				var bubData = DATA.createdLevels[this.topBoxIndex].bubbles;
				var metaData = DATA.createdLevels[this.topBoxIndex].meta;
				var bubs = [];
				for(var i=0; i<bubData.length; i++)
				{
					var dBub = bubData[i];
					if(dBub.row > maxRow)
						maxRow = dBub.row;
			  		
			  		var colorCode = null;
			  		//var metaData = null;
			  		if(dBub.type == 7)
			  		{cc.log(metaData);
			  			colorCode = [];cc.log(dBub);
			  			/*var colorKeys = Object.keys(dBub.colorCode);
			  			for(var j=0; j<colorKeys.length; j++)
			  			{
			  				colorCode.push(dBub.colorCode[colorKeys[j]]);
			  			}cc.log(colorCode);*/
			  			for(var j=0; j<metaData.bulbData[dBub.colorCode].length; j++)
			  			{
			  				colorCode.push(metaData.bulbData[dBub.colorCode][j]);
			  			}cc.log(colorCode);
			  		}
			  		else colorCode = dBub.colorCode;
			  		
			  		if(dBub.type == 20)
			  		{cc.log("star");cc.log(dBub);cc.log("hi");
			  			if("meta" in dBub && dBub.meta != null && "id" in dBub.meta && dBub.meta.id != null)
			  			{cc.log("star with ID "+dBub.meta.id);
			  				metaData = dBub.meta;
			  			}
			  		}
			  		
			  		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:colorCode, binary:dBub.binary, meta:metaData};
			  		//cc.log(bubble);
			    	bubs.push(bubble);
				}
				
				//this.bubbleLayer = new EditorBubbleLayer(this.width, this.height-(this.levelBoxes[0].y+this.levelBoxes[0].height), 
				//	bubs, 20);	
				this.removeChild(this.bubbleLayer);
				this.bubbleLayer = null;
				this.bubbleLayer = new BubbleLayer(bubs, maxRow+1, 0, "viewer", this.width, this.height-(this.levelBox.y+this.levelBox.height), [], metaData);	
				this.bubbleLayer.attr({
					x:0,
					y:this.levelBox.y+this.levelBox.height,
					//width:size.width,
					//height:size.height-this.editorUILayer.height-this.midUILayer.height,
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.bubbleLayer);
			}
		}
		else
		{cc.log("should find edit button...");
			if(FUNCTIONS.posWithinScaled(loc, this.editButton))
			{
				cc.log("edit");
				return {"type":"edit","number":this.topBoxIndex};
			}
			else if(FUNCTIONS.posWithinScaled(loc, this.testButton))
			{
				cc.log("test");
				return {"type":"test","number":this.topBoxIndex};
			}
			/*else if(FUNCTIONS.posWithinScaled(pos, this.shareButton))
			{
				cc.log("share");
				return {"type":"share","number":this.topBoxIndex};
			}*/
		}
		this.draw();
	},
	
	draw:function(){
		this.dn.drawRect(cc.p(0,0),cc.p(0+this.width, 0+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		//this.dn.drawRect(cc.p(this.dividerX,this.y),cc.p(this.width, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		//var maxBoxes = Math.floor(this.height / (this.boxHeight));
		
		
		//for(var i=0; i<2/*maxBoxes*//*i+this.topBoxIndex < this.levelBoxes.length*/; i++)
		//{
			/*var box = this.levelBoxes[i+this.topBoxIndex];
			var boxY = this.height-3-((i+1)*this.boxHeight);
			var color = cc.color(255,255,255,255);
			if((i+this.topBoxIndex)%2 == 1)
				color = cc.color(180,180,180,255);
			this.dn.drawRect(cc.p(3,boxY),cc.p(3+this.boxWidth,boxY+this.boxHeight), color,3,cc.color(0,0,0,255));
			*/
			
		//}
		
		//var boxA = this.levelBoxes[0+this.topBoxIndex];
		//var levelBox = {x:this.width/2-this.boxWidth/2, y:0, width:this.boxWidth, height:this.boxHeight};
		//var boxB = this.levelBoxes[1+this.topBoxIndex];
		var boxY = 0;
		var boxBorder = Math.floor(DATA.bubbleR*.5);
		var color = cc.color(25,255,255,255);
		var colorB = cc.color(0,0,0,60);
		this.dn.drawRect(cc.p(this.levelBox.x,this.levelBox.y),cc.p(this.levelBox.x+this.levelBox.width,this.levelBox.y+this.levelBox.height), color,5,cc.color(0,0,0,255));
		//this.dn.drawRect(cc.p(boxB.x,boxY),cc.p(boxB.x+boxB.width,boxY+boxB.height), color,3,cc.color(0,0,0,255));
		
		if(this.topBoxIndex > 0)
		{
			this.dn.drawRect(cc.p(this.leftBox.x, this.leftBox.y), cc.p(this.leftBox.x+this.leftBox.width, this.leftBox.y+this.leftBox.height),colorB,5,cc.color(0,0,0,255));
		}
		
		if(this.topBoxIndex != this.levelBoxes.length-1)
		{
			this.dn.drawRect(cc.p(this.rightBox.x, this.rightBox.y), cc.p(this.rightBox.x+this.rightBox.width, this.rightBox.y+this.rightBox.height),colorB,5,cc.color(0,0,0,255));
		}
		
	}
	
});
