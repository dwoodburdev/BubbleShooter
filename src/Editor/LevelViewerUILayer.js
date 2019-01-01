var LevelViewerUILayer = cc.Layer.extend({
	ctor:function(w,h){
		this._super();
		
		var size = cc.winSize;
		
        this.width = w;
        this.height = h;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.curSelectedLevel = -1;
		
		this.levelBoxes = [];
		
		var levelData = DATA.createdLevels;
		var levelDataKeys = Object.keys(levelData);
		if(levelDataKeys.length == 1 && levelDataKeys[0] == "00")
		{
			
		}
		else
		{
			for(var i=0;i<levelDataKeys.length; i++)
			{
				var box = {"x":5,"num":i+1,"width":this.width*.6,"height":60,"y":this.height-5-((i+1)*65)};
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
		if(pos.x < this.width*.6)
		{
			for(var i=0; i<this.levelBoxes.length; i++)
			{
				if(FUNCTIONS.posWithin(pos, this.levelBoxes[i]))
				{
					this.curSelectedLevel = i;
					return {"type":"level","number":i};
				}
			}
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
		
		for(var i=0; i<this.levelBoxes.length; i++)
		{
			var box = this.levelBoxes[i];
			this.dn.drawRect(cc.p(box.x,box.y),cc.p(box.x+box.width,box.y+box.height), cc.color(255,255,0,255),3,cc.color(0,0,0,255));
		
		
		}
	}
	
});
