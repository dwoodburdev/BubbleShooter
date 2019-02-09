var LevelViewerUILayer = cc.Layer.extend({
	ctor:function(w,h){
		this._super();
		
		var size = cc.winSize;
		
        this.width = w;
        this.height = h;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
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
		this.boxWidth = this.dividerX-6-DATA.bubbleR*2;
		this.boxHeight = DATA.bubbleR*4;
		
		var levelData = DATA.createdLevels;
		var levelDataKeys = Object.keys(levelData);
		if(levelDataKeys.length == 1 && levelDataKeys[0] == "00")
		{
			
		}
		else
		{
			for(var i=0;i<levelDataKeys.length; i++)
			{
				var box = {"x":3,"num":i+1,"width":this.boxWidth,"height":this.boxHeight,"y":this.height-3-((i+1)*60)};
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
		
		this.draw();
	},
	
	
	
	onTouchBegin:function(pos)
	{
		
	},
	onTouchMoved:function(pos)
	{
		
	},
	onTouchEnded:function(pos)
	{
		if(pos.x < this.dividerX-DATA.bubbleR*2)
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
			if(FUNCTIONS.posWithinScaled(pos, this.leftUpButton))
			{
				this.topBoxIndex = Math.max(0, this.topBoxIndex-1);
			}
			else if(FUNCTIONS.posWithinScaled(pos, this.leftDownButton))
			{
				this.topBoxIndex = Math.min(this.levelBoxes.length-3, this.topBoxIndex+1);
			}
			this.draw();
		}
		else
		{
			if(FUNCTIONS.posWithinScaled(pos, this.editButton))
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
			}
		}
	},
	
	draw:function(){
		this.dn.drawRect(cc.p(0,0),cc.p(0+this.width, 0+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(this.dividerX,this.y),cc.p(this.width, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		for(var i=0; i+this.topBoxIndex < this.levelBoxes.length; i++)
		{
			var box = this.levelBoxes[i+this.topBoxIndex];
			var boxY = this.height-3-((i+1)*this.boxHeight);
			var color = cc.color(255,255,255,255);
			if((i+this.topBoxIndex)%2 == 1)
				color = cc.color(180,180,180,255);
			this.dn.drawRect(cc.p(3,boxY),cc.p(3+this.boxWidth,boxY+this.boxHeight), color,3,cc.color(0,0,0,255));
		}
		
		
	}
	
});
