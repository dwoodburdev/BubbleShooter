var LevelBrowserLayer = cc.Layer.extend({
	ctor:function(w,h, userLevels){
		this._super();
		
		var size = cc.winSize;
		
        this.width = w;
        this.height = h;
        this.userLevels = userLevels;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.curSelectedLevel = -1;
		
		this.topBoxIndex = 0;
		
		this.boxHeight = cc.winSize.width/7;
		
		var numRows = 0;
		for(var i=0; i<this.userLevels[0].bubbles.length; i++)
		{
			var bub = this.userLevels[0].bubbles[i];
			if(bub.row > numRows)
				numRows = bub.row;
		}
		numRows++;
		
		this.bubbleLayer = new BubbleLayer(this.userLevels[0].bubbles, numRows, 1, "preview", size.width, this.height, [], 
			{}, "red", "red", [0,0,0,0,0,0], [0,0,0,0,0,0], null, null);	
		this.bubbleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubbleLayer);
		
		this.leftButton = new cc.Sprite(res.left_hand);
		this.leftButton.setScale(size.width/12 / this.leftButton.width);
		this.leftButton.attr({
			x:5,
			y:5+this.boxHeight+3,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.leftButton);
		
		this.rightButton = new cc.Sprite(res.right_hand);
		this.rightButton.setScale(size.width/12 / this.rightButton.width);
		this.rightButton.attr({
			x:this.width-5,
			y:5+this.boxHeight+3,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.rightButton);
		
		
		this.boxWidth = ( this.width - this.leftButton.width*this.leftButton.scale*2 - 10 )/2;
		
		this.levelBoxes = [];
		
		this.boxA = null;
		this.boxB = null;
		this.boxC = null;
		this.boxD = null;
		
		//var levelData = DATA.createdLevels;
		var levelData = this.userLevels;cc.log(levelData);
		var levelDataKeys = Object.keys(levelData);
		if(levelDataKeys.length == 1 && levelDataKeys[0] == "00")
		{
			
		}
		else
		{
			//for(var i=0;i<levelDataKeys.length && i<6; i++)
			//{
				//var box = {"x":3,"num":i+1,"width":this.boxWidth,"height":this.boxHeight,"y":this.height-3-((i+1)*60)};
				//this.levelBoxes.push(box);
				
			//}
			this.boxA = new LevelSourceBox(1, this.boxWidth, this.boxHeight);
			this.boxA.attr({
				x:this.leftButton.width*this.leftButton.scale,
				y:5+this.boxHeight+5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.boxA);
			
			this.boxB = new LevelSourceBox(2, this.boxWidth, this.boxHeight);
			this.boxB.attr({
				x:this.leftButton.width*this.leftButton.scale + this.boxWidth + 10,
				y:5+this.boxHeight+5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.boxB);
			
			this.boxC = new LevelSourceBox(3, this.boxWidth, this.boxHeight);
			this.boxC.attr({
				x:this.leftButton.width*this.leftButton.scale,
				y:5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.boxC);
			
			this.boxD = new LevelSourceBox(4, this.boxWidth, this.boxHeight);
			this.boxD.attr({
				x:this.leftButton.width*this.leftButton.scale + this.boxWidth + 10,
				y:5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.boxD);
			
			/*var boxA = {"x":,"num":1,"width":this.boxWidth,"height":this.boxHeight,"y":};
			var boxB = {"x":this.leftButton.width*this.leftButton.scale + this.boxWidth + 10,"num":2,"width":this.boxWidth,"height":this.boxHeight,"y":5+this.boxHeight+5};
			var boxC = {"x":this.leftButton.width*this.leftButton.scale,"num":3,"width":this.boxWidth,"height":this.boxHeight,"y":5};
			var boxD = {"x":this.leftButton.width*this.leftButton.scale + this.boxWidth + 10,"num":4,"width":this.boxWidth,"height":this.boxHeight,"y":5};
			*/
			
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
		this.addChild(this.editButton);
		
		this.testButton = new cc.Sprite(res.test_button);
		this.testButton.setScale(sideButtonWidth/this.testButton.width);
		this.testButton.attr({
			x:this.width*.7,
			y:this.editButton.y-(this.editButton.height*this.editButton.scale)-2,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.testButton);
		
		this.shareButton = new cc.Sprite(res.share_button);
		this.shareButton.setScale(sideButtonWidth/this.shareButton.width);
		this.shareButton.attr({
			x:this.width*.7,
			y:this.testButton.y-(this.testButton.height*this.testButton.scale)-2,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.shareButton);
		
		
		//this.draw();
	},
	
	
	
	onTouchBegin:function(pos)
	{
		
	},
	onTouchMoved:function(pos)
	{
		
	},
	onTouchEnded:function(pos)
	{
		if(pos.x < this.dividerX-(cc.winSize.width/24)*2)
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
			/*for(var i=0; i<this.levelBoxes.length; i++)
			{
				if(FUNCTIONS.posWithin(pos, this.levelBoxes[i]))
				{
					this.curSelectedLevel = i;
					return {"type":"level","number":i};
				}
			}*/
		}
		else if(pos.x < this.dividerX)
		{
			/*if(FUNCTIONS.posWithinScaled(pos, this.leftUpButton))
			{
				this.topBoxIndex = Math.max(0, this.topBoxIndex-1);
			}
			else if(FUNCTIONS.posWithinScaled(pos, this.leftDownButton))
			{
				this.topBoxIndex = Math.min(this.levelBoxes.length-3, this.topBoxIndex+1);
			}
			this.draw();*/
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
		this.dn.drawRect(cc.p(0,0),cc.p(0+this.width, 0+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(this.dividerX,this.y),cc.p(this.width, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		/*for(var i=0; i+this.topBoxIndex < this.levelBoxes.length; i++)
		{
			var box = this.levelBoxes[i+this.topBoxIndex];
			var boxY = this.height-3-((i+1)*this.boxHeight);
			var color = cc.color(255,255,255,255);
			if((i+this.topBoxIndex)%2 == 1)
				color = cc.color(180,180,180,255);
			this.dn.drawRect(cc.p(3,boxY),cc.p(3+this.boxWidth,boxY+this.boxHeight), color,3,cc.color(0,0,0,255));
		}*/
		
		
		
		
	}
	
});
