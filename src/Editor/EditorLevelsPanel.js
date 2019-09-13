var EditorLevelsPanel = cc.Layer.extend({
	ctor:function(width, height, editorData){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 0, cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(0,0), cc.p(this.width/12, this.height), cc.color(255,255,255,255), 2, cc.color(0,0,0,255));
		
		this.upArrow = new cc.Sprite(res.up_arrow);
		this.upArrow.setScale(this.width/12 / this.upArrow.width);
		this.upArrow.attr({
			x:this.width/24,
			y:this.height,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.upArrow);
		
		this.downArrow = new cc.Sprite(res.down_arrow);
		this.downArrow.setScale(this.width/12 / this.downArrow.width);
		this.downArrow.attr({
			x:this.width/24,
			y:0,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.downArrow);
		
		var panelWidth = (this.width - this.width/12) * .9;
		var panelX = this.width/12 + 5;
		cc.log(editorData.userId);
		if(editorData.userId == null)
		{
			this.shareLayer = new ShareLayer(panelWidth, this.height*.25 - 5);
			this.shareLayer.attr({
				x:this.width/12 + (this.width-this.width/12)*.05,
				y:this.height*.05+5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.shareLayer);
		}
		else
		{
			this.newsLayer = new NewsLayer(panelWidth, this.height*.25 - 5);
			this.newsLayer.attr({
				x:this.width/12 + (this.width-this.width/12)*.05,
				y:this.height*.05+5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.newsLayer);
		}
		
		this.levelListLayer = new LevelList(panelWidth, this.height*.7 - 10, editorData);
		this.levelListLayer.attr({
			x:this.width/12 + (this.width-this.width/12)*.05,
			y:this.height*.3 + 5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.levelListLayer);
		this.linkLabelA = new cc.LabelTTF("[Press]", "HeaderFont", Math.floor(this.height*.025));
		this.linkLabelA.color = cc.color(0,0,0,255);
		this.linkLabelA.attr({
			x:this.width/12 + (this.width*11/12)*.2,
			y:this.height*.05 - 2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.linkLabelA);
		
		this.linkLabelB = new cc.LabelTTF("[Contact]", "HeaderFont", Math.floor(this.height*.025));
		this.linkLabelB.color = cc.color(0,0,0,255);
		this.linkLabelB.attr({
			x:this.width/12 + (this.width*11/12)*.5,
			y:this.height*.05 - 2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.linkLabelB);
		
		this.linkLabelC = new cc.LabelTTF("[Info]", "HeaderFont", Math.floor(this.height*.025));
		this.linkLabelC.color = cc.color(0,0,0,255);
		this.linkLabelC.attr({
			x:this.width/12 + (this.width*11/12)*.8,
			y:this.height*.05 - 2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.linkLabelC);
		
		
		
	},
	
	onTouchEnded:function(pos)
	{
		if(pos.x > this.upArrow.x-(this.upArrow.width*this.upArrow.scale/2) && pos.x < this.upArrow.x+(this.upArrow.width*this.upArrow.scale/2))
		{
			if(pos.y < this.upArrow.y && pos.y > this.upArrow.y-(this.upArrow.height*this.upArrow.scale))
			{cc.log("up");
				this.parent.editorLayer.bubbleLayer.scrollUp();
			}
			else if(pos.y > this.downArrow.y && pos.y < this.downArrow.y+(this.downArrow.height*this.downArrow.scale))
			{cc.log("down");
				this.parent.editorLayer.bubbleLayer.scrollDown();
			}
		}
		else if(pos.x > this.levelListLayer.x && pos.x < this.levelListLayer.x+this.levelListLayer.width &&
			pos.y > this.levelListLayer.y && pos.y < this.levelListLayer.y+this.levelListLayer.height)
		{
			this.levelListLayer.onTouchEnded({x:pos.x-this.levelListLayer.x, y:pos.y-this.levelListLayer.y});
		}
		else if(pos.x > this.shareLayer.x && pos.x < this.shareLayer.x+this.shareLayer.width &&
			pos.y > this.shareLayer.y && pos.y < this.shareLayer.y+this.shareLayer.height)
		{
			this.shareLayer.onTouchEnded({x:pos.x-this.shareLayer.x, y:pos.y-this.shareLayer.y});
		}
	}
	
	
	
});