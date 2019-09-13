/*var CoreButtonsUI = cc.Layer.extend({
	ctor:function(bubbleR, height){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
		
		this.height = height;
		
		var size = cc.winSize;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		//this.width = w;
		//this.height = h;
		this.bubbleR = bubbleR;
		
		
		
		
		this.challengeButton = {"x":15+((size.width-60)/3)+15, "y":15, "width":(size.width-60)/3, "height":45};
		this.storeButton = {"x":15, "y":15, "width":(size.width-60)/3, "height":45};
		this.editorButton = {"x":this.challengeButton.x+((size.width-60)/3)+15, "y":15, "width":(size.width-60)/3, "height":45};
		
		this.levelAImg = null;
		if(DATA.levelIndexA != null)
		{
			this.levelAImg = new cc.Sprite(res.star_emoji);
			this.levelAImg.setScale((this.bubbleR*2)/this.levelAImg.width);
			this.levelAImg.attr({
				"x": this.width/2 - this.challengeButton.width/6,
				"y": this.challengeButton.y+this.challengeButton.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.levelAImg);
		}
		if(DATA.levelIndexB != null)
		{
			this.levelBImg = new cc.Sprite(res.star_emoji);
			this.levelBImg.setScale((this.bubbleR*2)/this.levelBImg.width);
			this.levelBImg.attr({
				"x": this.width/2 - this.challengeButton.width/6,
				"y": this.challengeButton.y+this.challengeButton.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.levelBImg);
		}
		
		this.storeButtonLabel = new cc.LabelTTF("Store", "Roboto", 30);
		this.storeButtonLabel.attr({
			"x":this.storeButton.x+this.storeButton.width/2,
			"y":this.storeButton.y+this.storeButton.height/2,
			"anchorX":.5,
			"anchorY":.5
		});
		this.storeButtonLabel.color = cc.color(0,0,0,255);
		this.addChild(this.storeButtonLabel);
		
		this.editorButtonLabel = new cc.LabelTTF("Creator", "Roboto", 30);
		this.editorButtonLabel.attr({
			"x":this.editorButton.x+this.editorButton.width/2,
			"y":this.editorButton.y+this.editorButton.height/2,
			"anchorX":.5,
			"anchorY":.5
		});
		this.editorButtonLabel.color = cc.color(0,0,0,255);
		this.addChild(this.editorButtonLabel);
		
		
		this.levelAShadow = new cc.Sprite(res.star_shadow);
		this.levelAShadow.setScale((this.bubbleR*2)/this.levelAShadow.width);
		this.levelAShadow.attr({
			"x": this.width/2 - this.challengeButton.width/5,
			"y": this.challengeButton.y+this.challengeButton.height/2,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.levelAShadow);
		
		this.levelBShadow = new cc.Sprite(res.star_shadow);
		this.levelBShadow.setScale((this.bubbleR*2)/this.levelBShadow.width);
		this.levelBShadow.attr({
			"x": this.width/2 + this.challengeButton.width/5,
			"y": this.challengeButton.y+this.challengeButton.height/2,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.levelBShadow);
		
		this.draw();
	},
	
	onTouchEnd:function(loc){cc.log("onTouchEnd");
		if(DATA.levelIndexA != null && loc.y > this.challengeButton.y && loc.y < this.challengeButton.y+this.challengeButton.height &&
			loc.x > this.challengeButton.x && loc.x < this.challengeButton.x+this.challengeButton.width)
		{
			//cc.director.runScene(new PreChallengeScene(DATA.levelIndexA));
			cc.log("DRAW PRECHALLENGE");
			var size = cc.winSize;
			var preChallengeLayer = new PreChallengeLayer(DATA.levelIndexA, size.width-50, this.height-50);
			preChallengeLayer.attr({
				"x":25,
				"y":25,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(preChallengeLayer);
		}
		else if(this.posWithin(loc, this.storeButton))
		{
			cc.director.runScene(new ShopScene());
		}
		else if(this.posWithin(loc, this.editorButton))
		{
			cc.director.runScene(new EditorScene());
		}
		//else if(this.posWithin(loc, this.challengeBut))
	
	   	
	},
	
	posWithin:function(pos, square)
	{
		if(pos.y > square.y && pos.y < square.y+square.height &&
			pos.x > square.x && pos.x < square.x+square.width)
			return true;
		return false;
	},
	
	refreshLevelsUI:function()
	{
		var size = cc.winSize;
		
		if(DATA.levelIndexA != null && this.levelAImg == null)
		{
			this.levelAImg = new cc.Sprite(res.star_emoji);
			this.levelAImg.setScale((this.bubbleR*2)/this.levelAImg.width);
			this.levelAImg.attr({
				"x": this.width/2 - this.challengeButton.width/5,
				"y": this.challengeButton.y+this.challengeButton.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.levelAImg);
			
			this.draw();
			
			//DATA.retrieveLevel();
		}
		else if(DATA.levelIndexA == null && this.levelAImg != null)
		{
			this.removeChild(this.levelAImg);
			this.levelAImg = null;
			this.draw();
		}
		else if(DATA.levelIndexB != null && this.levelBImg == null)
		{
			this.levelBImg = new cc.Sprite(res.star_emoji);
			this.levelBImg.attr({
				"x": this.width/2 - this.challengeButton.width/5,
				"y": this.challengeButton.y+this.challengeButton.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.levelBImg);
			this.draw();
			//DATA.retrieveLevel();
		}
		else if(DATA.levelIndexB == null && this.levelBImg != null)
		{
			this.removeChild(this.levelBImg);
			this.levelBImg = null;
			this.draw();
		}
		
		
	},
	
	draw:function(){
		
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,0,0,255),1,cc.color(0,0,0,255));
		this.drawChallengeButton();
		this.dn.drawRect(cc.p(this.storeButton.x, this.storeButton.y),cc.p(this.storeButton.x+this.storeButton.width, this.storeButton.y+this.storeButton.height), cc.color(255,255,0,255),5,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.editorButton.x, this.editorButton.y),cc.p(this.editorButton.x+this.editorButton.width, this.editorButton.y+this.editorButton.height), cc.color(0,0,255,255),5,cc.color(0,0,0,255));
		
	},
	drawChallengeButton:function(){
		var challengeColor = cc.color(100,100,100,255);
		if(DATA.levelIndexA != null)
			challengeColor = cc.color(0,255,0,255);
		this.dn.drawRect(cc.p(this.challengeButton.x, this.challengeButton.y),cc.p(this.challengeButton.x+this.challengeButton.width, this.challengeButton.y+this.challengeButton.height), challengeColor,5,cc.color(0,0,0,255));
		
	}
	
});*/
