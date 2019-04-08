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
		
		
		this.levelBoxes = [];
		this.boxWidth = (this.width-DATA.bubbleR*6)/2;
		this.boxHeight = DATA.bubbleR*10;
		
		var levelData = DATA.createdLevels;
		var levelDataKeys = Object.keys(levelData);
		if(levelDataKeys.length == 1 && levelDataKeys[0] == "00")
		{
			
		}
		else
		{
			for(var i=0;i<levelDataKeys.length; i++)
			{
				var box = {"x":DATA.bubbleR*2+(DATA.bubbleR*2+this.boxWidth)*(i%2),"num":this.topBoxIndex+i+1,"width":this.boxWidth,"height":this.boxHeight,"y":0};
				this.levelBoxes.push(box);
			}
		}
		
		var sideButtonWidth = this.width*.3 - 4;
		this.editButton = new cc.Sprite(res.edit_button);
		this.editButton.setScale(sideButtonWidth/this.editButton.width);
		this.editButton.attr({
			x:this.width*.7,
			y:this.height-5,
			anchorX:0,
			anchorY:1
		});
		//this.addChild(this.editButton);
		
		this.testButton = new cc.Sprite(res.test_button);
		this.testButton.setScale(sideButtonWidth/this.testButton.width);
		this.testButton.attr({
			x:this.width*.7,
			y:this.editButton.y-(this.editButton.height*this.editButton.scale)-2,
			anchorX:0,
			anchorY:1
		});
		//this.addChild(this.testButton);
		
		this.shareButton = new cc.Sprite(res.share_button);
		this.shareButton.setScale(sideButtonWidth/this.shareButton.width);
		this.shareButton.attr({
			x:this.width*.7,
			y:this.testButton.y-(this.testButton.height*this.testButton.scale)-2,
			anchorX:0,
			anchorY:1
		});
		//this.addChild(this.shareButton);
		
		var maxRow = 0;
		var bubs = DATA.createdLevels[0].bubbles;
		for(var i=0; i<bubs.length; i++)
		{
			if(bubs[i].row > maxRow)
				maxRow = bubs[i].row;
		}
		var metaData = DATA.createdLevels[0].meta;
		
		//this.bubbleLayer = new EditorBubbleLayer(this.width, this.height-(this.levelBoxes[0].y+this.levelBoxes[0].height), 
		//	bubs, 20);	
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
		
		
		this.draw();
		
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
		
		
		
		/*if(pos.x < this.dividerX-DATA.bubbleR*2)
		{
			var levelOffset = 0;
			if(pos.y > this.height-this.boxHeight)
				levelOffset = 0;
			else if(pos.y > this.height-this.boxHeight*2)
				levelOffset = 1;
			else if(pos.y > this.height-this.boxHeight*3)
				levelOffset = 2;
			else if(pos.y > this.height-this.boxHeight*4)
				levelOffset = 3;
			if(this.topBoxIndex+levelOffset < this.levelBoxes.length)
			{
				this.curSelectedLevel = this.topBoxIndex+levelOffset;
				return {"type":"level","number":this.topBoxIndex + levelOffset};
			}
			
		}
		else if(pos.x < this.dividerX)
		{
			if(FUNCTIONS.posWithinScaled(pos, this.leftUpButton))
			{
				this.topBoxIndex = Math.max(0, this.topBoxIndex-1);
			}
			else if(FUNCTIONS.posWithinScaled(pos, this.leftDownButton))
			{
				this.topBoxIndex = Math.min(this.levelBoxes.length-3, this.topBoxIndex+1);
			}
			this.draw();
		}*/
		cc.log(pos);cc.log(loc);cc.log(this.levelBoxes[0]);
		if(FUNCTIONS.posWithin(loc, this.levelBoxes[0]))
		{cc.log("FIRST LEVEL SELECTED");
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
		}
		else if(FUNCTIONS.posWithin(loc, this.levelBoxes[1]))
		{
			var maxRow = 0;
			var bubs = DATA.createdLevels[this.topBoxIndex+1].bubbles;
			for(var i=0; i<bubs.length; i++)
			{
				if(bubs[i].row > maxRow)
					maxRow = bubs[i].row;
			}
			var metaData = DATA.createdLevels[0].meta;
			
			//this.bubbleLayer = new EditorBubbleLayer(this.width, this.height-(this.levelBoxes[0].y+this.levelBoxes[0].height), 
			//	bubs, 20);	
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
		}
		else
		{
			/*if(FUNCTIONS.posWithinScaled(pos, this.editButton))
			{
				cc.log("edit");
				return {"type":"edit","number":this.curSelectedLevel};
			}
			else if(FUNCTIONS.posWithinScaled(pos, this.testButton))
			{
				cc.log("test");
				return {"type":"test","number":this.curSelectedLevel};
			}
			else if(FUNCTIONS.posWithinScaled(pos, this.shareButton))
			{
				cc.log("share");
				return {"type":"share","number":this.curSelectedLevel};
			}*/
		}
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
		var boxA = this.levelBoxes[0+this.topBoxIndex];
		var boxB = this.levelBoxes[1+this.topBoxIndex];
		var boxY = 0;
		var color = cc.color(25,255,255,255);
		this.dn.drawRect(cc.p(DATA.bubbleR*2,boxY),cc.p(DATA.bubbleR*2+boxA.width,boxY+boxA.height), color,3,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p((DATA.bubbleR*2)*2+boxA.width,boxY),cc.p(this.width-(DATA.bubbleR*2),boxY+boxB.height), color,3,cc.color(0,0,0,255));
		
		
	}
	
});
