var EditorBubblePanel = cc.Layer.extend({
	ctor:function(width, height, numStars, numMoves){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		 this.numStars = numStars;cc.log("BUILDING PANEL WITH "+numStars+" STARS");
		 this.numMoves = numMoves;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(215,215,215,255), 0, cc.color(0,0,0,255));
		
		this.labelA = new cc.LabelTTF("Level Editor", "HeaderFont", Math.floor(this.height*.1));
		this.labelA.color = cc.color(0,0,0,255);
		this.labelA.attr({
			x:this.width*.5,
			y:this.height-10,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.labelA);
		
		this.highlightImg = new cc.Sprite(res.pencil);
		this.highlightImg.setScale(20 / this.highlightImg.height);
		this.highlightImg.attr({
			x:this.labelA.x-(this.labelA.width*this.labelA.scale/2),
			y:this.labelA.y,
			anchorX:1,
			anchorY:.5
		});
		//this.addChild(this.highlightImg);
		
		/*this.labelB = new cc.LabelTTF("Edit", "Arial", 15);
		this.labelB.color = cc.color(0,0,0,255);
		this.labelB.attr({
			x:this.width/2,
			y:this.height-1,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.labelB);*/
		
		this.labelC = new cc.LabelTTF("Edit", "HeaderFont", 15);
		this.labelC.color = cc.color(0,0,0,255);
		this.labelC.attr({
			x:this.width*.67,
			y:this.height-1 - 10,
			anchorX:.5,
			anchorY:.5
		});
		//this.addChild(this.labelC);
		
		/*this.nextObstacleLayer = new NextObstacleLayer(this.width, this.width/8, numStars);
		this.nextObstacleLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.nextObstacleLayer);
		*/
		this.drawLayer = new DrawPanel(this.width, this.labelA.y-Math.floor(this.height*.1)-10 - Math.floor(this.height*.15), this.numStars);
		this.drawLayer.attr({
			x:0,
			y:Math.floor(this.height*.15),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.drawLayer);
		
		
		this.saveImg = new cc.Sprite(res.stop_bg);
		this.saveImg.setScale(this.height*.12 / this.saveImg.height);
		this.saveImg.attr({
			x:2,
			y:this.height*.075,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.saveImg);
		
		this.saveLabel = new cc.LabelTTF("Save", "HeaderFont", Math.floor(this.height*.1));
		this.saveLabel.color = cc.color(255,255,255,255);
		this.saveLabel.attr({
			x:this.saveImg.x+(this.saveImg.width*this.saveImg.scale)/2,
			y:this.saveImg.y+(this.saveImg.height*this.saveImg.scale)/2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.saveLabel);
		
		this.testImg = new cc.Sprite(res.orange_bg);
		this.testImg.setScale(this.height*.12 / this.testImg.height);
		this.testImg.attr({
			x:this.width*.5,
			y:this.height*.075,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.testImg);
		
		this.testLabel = new cc.LabelTTF("Test", "HeaderFont", Math.floor(this.height*.1));
		this.testLabel.color = cc.color(255,255,255,255);
		this.testLabel.attr({
			x:this.testImg.x,
			y:this.testImg.y+(this.testImg.height*this.testImg.scale)/2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.testLabel);
		
		this.shareImg = new cc.Sprite(res.blue_bg);
		this.shareImg.setScale(this.height*.12 / this.shareImg.height);
		this.shareImg.attr({
			x:this.width-2,
			y:this.height*.075,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.shareImg);
		
		this.shareLabel = new cc.LabelTTF("Share", "HeaderFont", Math.floor(this.height*.1));
		this.shareLabel.color = cc.color(255,255,255,255);
		this.shareLabel.attr({
			x:this.shareImg.x-(this.shareImg.width*this.shareImg.scale)/2,
			y:this.shareImg.y+(this.shareImg.height*this.shareImg.scale)/2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.shareLabel);
		
		
		this.mode = "draw";
		
	},
	
	resetDrawLayer:function()
	{
		this.removeChild(this.drawLayer);
		this.drawLayer = new DrawPanel(this.width, this.labelA.y-(this.labelA.height/2)-1, this.numStars);
		this.drawLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.drawLayer);
		
	},
	
	
	
	onTouchBegan:function(loc)
	{
		
	},
	onTouchMoved:function(loc)
	{
		
	},
	onTouchEnded:function(loc)
	{cc.log(loc);
		
		if(loc.x > this.labelA.x-(this.labelA.width/2) && loc.x < this.labelA.x+(this.labelA.width/2)
			&& loc.y > this.labelA.y-(this.labelA.height/2) && loc.y < this.labelA.y+(this.labelA.height/2) )
		{
			this.switchToDraw();
		}
		else if(loc.x > this.labelC.x-(this.labelC.width/2) && loc.x < this.labelC.x+(this.labelC.width/2)
			&& loc.y > this.labelC.y-(this.labelC.height/2) && loc.y < this.labelC.y+(this.labelC.height/2) )
		{
			this.switchToEdit();
		}
		else
		{
			if(this.mode == "draw")
				this.drawLayer.onTouchEnded({x:loc.x,y:loc.y-this.drawLayer.y});
			else if(this.mode == "edit")
				this.editLayer.onTouchEnded({x:loc.x,y:loc.y-this.editLayer.y});
		}
	},
	
	switchToEdit:function()
	{
		this.removeChild(this.drawLayer);
		
		this.editLayer = new EditLevelPanel(this.width, this.labelA.y-10-1, this.numMoves);
		this.editLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.editLayer);
		
		this.removeChild(this.labelA);
		this.labelA = new cc.LabelTTF("Draw", "HeaderFont", 15);
		this.labelA.color = cc.color(0,0,0,255);
		this.labelA.attr({
			x:this.width*.33,
			y:this.height-1 - 10,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.labelA);
		
		this.removeChild(this.labelC);
		this.labelC = new cc.LabelTTF("Edit", "HeaderFont", 20);
		this.labelC.color = cc.color(0,0,0,255);
		this.labelC.attr({
			x:this.width*.67,
			y:this.height-1 - 10,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.labelC);
		
		this.removeChild(this.highlightImg);
		this.highlightImg = new cc.Sprite(res.pencil);
		this.highlightImg.setScale(20 / this.highlightImg.height);
		this.highlightImg.attr({
			x:this.labelC.x-(this.labelC.width*this.labelC.scale/2),
			y:this.labelC.y,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.highlightImg);
		
		this.mode = "edit";
	},
	switchToDraw:function()
	{
		this.removeChild(this.editLayer);
		
		this.drawLayer = new DrawPanel(this.width, this.labelA.y-10-1, this.parent.parent.numStars);
		this.drawLayer.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.drawLayer);
		
		this.removeChild(this.labelA);
		this.labelA = new cc.LabelTTF("Draw", "HeaderFont", 20);
		this.labelA.color = cc.color(0,0,0,255);
		this.labelA.attr({
			x:this.width*.33,
			y:this.height-1 - 10,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.labelA);
		
		this.removeChild(this.labelC);
		this.labelC = new cc.LabelTTF("Edit", "HeaderFont", 15);
		this.labelC.color = cc.color(0,0,0,255);
		this.labelC.attr({
			x:this.width*.67,
			y:this.height-1 - 10,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.labelC);
		
		this.removeChild(this.highlightImg);
		this.highlightImg = new cc.Sprite(res.pencil);
		this.highlightImg.setScale(20 / this.highlightImg.height);
		this.highlightImg.attr({
			x:this.labelA.x-(this.labelA.width*this.labelA.scale/2),
			y:this.labelA.y,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.highlightImg);
		
		this.mode = "draw";
	}
	
	
	
});