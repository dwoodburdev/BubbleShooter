var CoreButtonsUI = cc.Layer.extend({
	ctor:function(bubbleR,height){
		this._super();
		cc.associateWithNative(this,cc.Sprite);
		
		this.height=height;
		
		var size=cc.winSize;
		
		this.dn=new cc.DrawNode;
		this.addChild(this.dn);
		
		this.bubbleR=bubbleR;
		
		this.challengeButton={x:(size.width-60)/3+30,y:15,width:(size.width-60)/3,height:45};
		this.storeButton={x:15,y:15,width:(size.width-60)/3,height:45};
		this.editorButton={x:this.challengeButton.x+(size.width-60)/3+15,y:15,width:(size.width-60)/3,height:45};
		this.levelAImg=null;
		if(DATA.levelIndexA != null)
		{
			this.levelAImg=new cc.Sprite(res.star_emoji);
			this.levelAImg.setScale(2*this.bubbleR/this.levelAImg.width);
			this.levelAImg.attr({
				x:this.width/2-this.challengeButton.width/6,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelAImg);
		}
		if(DATA.levelIndexB != null)
		{
			this.levelBImg=new cc.Sprite(res.star_emoji);
			this.levelBImg.setScale(2*this.bubbleR/this.levelBImg.width);
			this.levelBImg.attr({x:this.width/2-this.challengeButton.width/6,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelBImg);
		}
		this.storeButtonLabel=new cc.LabelTTF("Store","Roboto",30);
		this.storeButtonLabel.attr({
			x:this.storeButton.x+this.storeButton.width/2,
			y:this.storeButton.y+this.storeButton.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.storeButtonLabel.color=cc.color(0,0,0,255);
		this.addChild(this.storeButtonLabel);
		this.editorButtonLabel=new cc.LabelTTF("Creator","Roboto",30);
		this.editorButtonLabel.attr({
			x:this.editorButton.x+this.editorButton.width/2,
			y:this.editorButton.y+this.editorButton.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.editorButtonLabel.color=cc.color(0,0,0,255);
		this.addChild(this.editorButtonLabel);
		
		this.levelAShadow=new cc.Sprite(res.star_shadow);
		this.levelAShadow.setScale(2*this.bubbleR/this.levelAShadow.width);
		this.levelAShadow.attr({
			x:this.width/2-this.challengeButton.width/5,
			y:this.challengeButton.y+this.challengeButton.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.addChild(this.levelAShadow);
		this.levelBShadow=new cc.Sprite(res.star_shadow);
		this.levelBShadow.setScale(2*this.bubbleR/this.levelBShadow.width);
		this.levelBShadow.attr({
			x:this.width/2+this.challengeButton.width/5,
			y:this.challengeButton.y+this.challengeButton.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.addChild(this.levelBShadow);
		this.draw();
	},
	onTouchEnd:function(pos){
		cc.log("onTouchEnd");
		var size = cc.winSize;
		if(DATA.levelIndexA!=null && pos.y>this.challengeButton.y && pos.y<this.challengeButton.y+this.challengeButton.height
			&& pos.x>this.challengeButton.x && pos.x<this.challengeButton.x+this.challengeButton.width)
		{
			cc.log("DRAW PRECHALLENGE");
			var preLayer = new PreChallengeLayer(DATA.levelIndexA,size.width-50,this.height-50);
			preLayer.attr({x:25,y:25,anchorX:0,anchorY:0});
			this.addChild(preLayer);
			
			
			var bubbles = DATA.challenges[DATA.levelIndexA].bubbles;
    		var maxRow = 0;
	    	var bubbleData = [];
	    	for(var i=0; i<bubbles.length; i++)
	    	{
	   			if(bubbles[i].row > maxRow)
	    			maxRow = bubbles[i].row;
	    	}cc.log(bubbles.length);cc.log(maxRow);
			this.bubblePreview = new BubbleLayer(bubbles,maxRow,10,"challenge",(size.width-50)*.9,(this.height-50)*.8);
			this.bubblePreview.attr({
				/*x:this.width/2,
				y:this.height/2,
				anchorX:.5,
				anchorY:.5*/
				x:0,
				y:0,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.bubblePreview);
			
		}
		else if(this.posWithin(pos,this.storeButton))
		{
			cc.director.runScene(new ShopScene);
		}
		else if(this.posWithin(pos,this.editorButton))
		{
			cc.director.runScene(new EditorScene);
		}
	},
	posWithin:function(a,b)
	{
		if(a.y>b.y&&a.y<b.y+b.height&&a.x>b.x&&a.x<b.x+b.width)
			return true;
		return false;
	},
	refreshLevelsUI:function()
	{
		if(DATA.levelIndexA!=null && this.levelAImg==null)
		{
			this.levelAImg=new cc.Sprite(res.star_emoji);
			this.levelAImg.setScale(2*this.bubbleR/this.levelAImg.width);
			this.levelAImg.attr({
				x:this.width/2-this.challengeButton.width/5,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelAImg);
			this.draw();
		}
		else if(DATA.levelIndexA==null && this.levelAImg!=null)
		{
			this.removeChild(this.levelAImg);
			this.levelAImg=null;
			this.draw();
		}
		else if(DATA.levelIndexB!=null && this.levelBImg==null)
		{
			this.levelBImg=new cc.Sprite(res.star_emoji);
			this.levelBImg.attr({
				x:this.width/2-this.challengeButton.width/5,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelBImg);
		}
		else if(DATA.levelIndexB==null && this.levelBImg!=null)
		{
			this.removeChild(this.levelBImg);
			this.levelBImg=null;
		}
	},
	draw:function()
	{
		this.drawChallengeButton();
		this.dn.drawRect(cc.p(this.storeButton.x,this.storeButton.y),cc.p(this.storeButton.x+this.storeButton.width,this.storeButton.y+this.storeButton.height),cc.color(255,255,0,255),5,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.editorButton.x,this.editorButton.y),cc.p(this.editorButton.x+this.editorButton.width,this.editorButton.y+this.editorButton.height),cc.color(0,0,255,255),5,cc.color(0,0,0,255));
	},
	drawChallengeButton:function(){
		var buttonColor=cc.color(100,100,100,255);
		if(DATA.levelIndexA!=null)
			buttonColor=cc.color(0,255,0,255);
		this.dn.drawRect(cc.p(this.challengeButton.x,this.challengeButton.y),cc.p(this.challengeButton.x+this.challengeButton.width,this.challengeButton.y+this.challengeButton.height),buttonColor,5,cc.color(0,0,0,255));
		
	}
});