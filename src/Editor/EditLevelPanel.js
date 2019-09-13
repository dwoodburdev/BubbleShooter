var EditLevelPanel = cc.Layer.extend({
	ctor:function(width, height, numMoves){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.numMoves = numMoves
		 
		this.emojiKeys = [
			["delete"]
		];
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
		
		this.bubbleSize = this.width / 8;
		
		
		 this.prevImg = new cc.Sprite(res.black_circle);
		 this.prevImg.setScale(this.bubbleSize / this.prevImg.height);
		 this.prevImg.attr({
		 	x:3+(this.prevImg.width*this.prevImg.scale/2),
		 	y:3+(this.prevImg.height*this.prevImg.scale/2),
		 	anchorX:.5,
		 	anchorY:.5
		 });
		 this.addChild(this.prevImg);
		 
		 this.curEmojiKey = null;
		 
		 
		var prevXRight = this.prevImg.x+(this.prevImg.width*this.prevImg.scale/2)+3;
		var prevYTop = this.prevImg.y+(this.prevImg.height*this.prevImg.scale/2)+3;
		this.dn.drawRect(cc.p(0,0), cc.p(this.width, this.prevImg.y+(this.prevImg.height*this.prevImg.scale)+3), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(0,0), cc.p(prevXRight, prevYTop), cc.color(255,255,255,255), 3, cc.color(0,0,0,255));
		
		this.emojis = [[]];
		this.deleteImg = new cc.Sprite(res.redx);
		this.deleteImg.setScale(this.bubbleSize / this.deleteImg.width);
		this.deleteImg.attr({
			x:0,
			y:this.height,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.deleteImg);
		this.emojis[0].push(this.deleteImg);
		
		this.drawOptionsLayer = new DrawOptions(this.width-prevXRight, prevYTop);
		this.drawOptionsLayer.attr({
			x:prevXRight,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.drawOptionsLayer);
		
		var moveString = "Moves: ";
		if(this.numMoves < 10)
			moveString += "  ";
		this.moveLabel = new cc.LabelTTF(moveString+this.numMoves, "HeaderFont", Math.floor(this.bubbleSize*.5));
		this.moveLabel.color = cc.color(0,0,0,255);
		this.moveLabel.attr({
			x:0,
			y:this.height-this.bubbleSize,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.moveLabel);
		
		this.plusSign = null;
		this.minusSign = null;
		this.updatePlusMinus();
		
	},
	
	updatePlusMinus:function()
	{
		if(this.plusSign != null)
			this.removeChild(this.plusSign);
		if(this.minusSign != null)
			this.removeChild(this.minusSign);
		
		this.plusSign = new cc.Sprite(res.plus);
		this.plusSign.setScale(Math.floor(this.bubbleSize*.5) / this.plusSign.height);
		this.plusSign.attr({
			x:this.moveLabel.x+(this.moveLabel.width)+5,
			y:this.moveLabel.y,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.plusSign);
		
		this.minusSign = new cc.Sprite(res.minus);
		this.minusSign.setScale(Math.floor(this.bubbleSize*.5) / this.minusSign.height);
		this.minusSign.attr({
			x:this.plusSign.x+(this.plusSign.width*this.plusSign.scale)+5,
			y:this.moveLabel.y,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.minusSign);
	},
	
	onTouchBegan:function(loc)
	{
		
	},
	onTouchMoved:function(loc)
	{
		
	},
	onTouchEnded:function(loc)
	{
		
		var yStart = this.emojis[0][0].y;//-(this.emojis[0][0].height*this.emojis[0][0].scale);
		var rowTouched = Math.floor( (yStart-loc.y) / this.bubbleSize );
		cc.log("row touched: " + rowTouched);
		
		//rowTouched = 1 - rowTouched;
		if(rowTouched == 0)
		{
			
			for(var i=0; i<this.emojis[rowTouched].length; i++)
			{
				var emoji = this.emojis[rowTouched][i];
				if(loc.x > emoji.x && loc.x < emoji.x+(emoji.width*emoji.scale))
				{cc.log("delete clicked");
					this.resetPreview(rowTouched, i);
					this.curEmojiKey = this.emojiKeys[rowTouched][i];cc.log(this.curEmojiKey);
				}
			}
		}
		else if(loc.x > this.plusSign.x && loc.x < this.plusSign.x+(this.plusSign.width*this.plusSign.scale)
			&& loc.y < this.plusSign.y && loc.y > this.plusSign.y-(this.plusSign.height*this.plusSign.scale))
		{
			this.numMoves = Math.min(this.numMoves+1, 40);
			this.parent.numMoves = this.numMoves;
			this.parent.parent.parent.curCreatedMoves = this.numMoves;
			this.updateMovesString();
			this.updatePlusMinus();
		}
		else if(loc.x > this.minusSign.x && loc.x < this.minusSign.x+(this.minusSign.width*this.minusSign.scale)
			&& loc.y < this.minusSign.y && loc.y > this.minusSign.y-(this.minusSign.height*this.minusSign.scale))
		{
			this.numMoves = Math.max(this.numMoves-1, 3);
			this.parent.numMoves = this.numMoves;
			this.parent.parent.parent.curCreatedMoves = this.numMoves;
			this.updateMovesString();
			this.updatePlusMinus();
		}
		else if(loc.x > this.drawOptionsLayer.x && loc.x < this.drawOptionsLayer.x+this.drawOptionsLayer.width
			&& loc.y > this.drawOptionsLayer.y && loc.y < this.drawOptionsLayer.y+this.drawOptionsLayer.height)
		{cc.log(loc);cc.log(this.drawOptionsLayer.width*this.drawOptionsLayer.scale);cc.log(this.drawOptionsLayer.x);
			this.drawOptionsLayer.onTouchEnded({x:loc.x-this.drawOptionsLayer.x, y:loc.y});//this.drawOptionsLayer.convertToNodeSpace(loc));
		}
		
	},
	
	updateMovesString:function()
	{
		var moveString = "Moves: ";
		if(this.numMoves < 10)
			moveString += "  ";
		this.moveLabel.setString(moveString+this.numMoves);
	},
	
	resetPreview:function(row, col)
	{
		this.removeChild(this.prevImg);
		this.drawOptionsLayer.setOptions("", {});
		
		var code = this.emojiKeys[row][col];
		if(code == "delete")
		{
			this.prevImg = new cc.Sprite(res.redx);
			this.parent.parent.parent.editorLayer.drawType = -1;
			this.parent.parent.parent.editorLayer.drawColor = null;
		}
		else if(code == "circle")
		{
			this.prevImg = new cc.Sprite(res.black_circle);
		}
		
		this.prevImg.setScale(this.bubbleSize / this.prevImg.height);
		this.prevImg.attr({
			x:3+(this.prevImg.width*this.prevImg.scale/2),
			y:3+(this.prevImg.height*this.prevImg.scale/2),
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.prevImg);
		
	
	}
	
	
});