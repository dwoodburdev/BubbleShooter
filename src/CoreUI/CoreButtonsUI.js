var CoreButtonsUI = cc.Layer.extend({
	ctor:function(bubbleR,height,tabName){
		this._super();
		cc.associateWithNative(this,cc.Sprite);
		
		//this.height=height;
		
		var size=cc.winSize;
		
		this.dn=new cc.DrawNode();
		this.addChild(this.dn);
		
		this.bubbleR=bubbleR;
		
		this.tutorialLayer = null;
		
		
		this.levelButtonShown = true;
		
		
		this.tabName = tabName;
		
		this.minorUIHidden = false;
		
		this.challengeButton={x:(size.width-60)/3+30,y:7,width:(size.width-60)/3,height:32};
		this.storeButton={x:15,y:7,width:(size.width-60)/3,height:45};
		this.editorButton={x:this.challengeButton.x+(size.width-60)/3+15,y:7,width:(size.width-60)/3,height:45};
		
		this.challengeLightA={x:this.challengeButton.x,y:this.challengeButton.y+this.challengeButton.height,width:this.challengeButton.width/3,height:this.storeButton.height-this.challengeButton.height};
		this.challengeLightB={x:this.challengeButton.x+this.challengeLightA.width,y:this.challengeButton.y+this.challengeButton.height,width:this.challengeButton.width/3,height:this.storeButton.height-this.challengeButton.height};
		this.challengeLightC={x:this.challengeButton.x+this.challengeLightA.width*2,y:this.challengeButton.y+this.challengeButton.height,width:this.challengeButton.width/3,height:this.storeButton.height-this.challengeButton.height};
		
		this.height = this.challengeLightA.y+this.challengeLightA.height+5; // 5=border
		
		this.levelAImg=null;
		if(DATA.levelIndexA != null)
		{
			this.levelAImg=new cc.Sprite(res.star_emoji);
			this.levelAImg.setScale(1.5*this.bubbleR/this.levelAImg.width);
			this.levelAImg.attr({
				x:this.width/2-this.challengeButton.width/6,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelAImg);
		}
		this.levelBImg=null;
		if(DATA.levelIndexB != null)
		{
			this.levelBImg=new cc.Sprite(res.star_emoji);
			this.levelBImg.setScale(1.5*this.bubbleR/this.levelBImg.width);
			this.levelBImg.attr({x:this.width/2+this.challengeButton.width/6,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelBImg);
		}
		/*this.storeButtonLabel=new cc.LabelTTF("Store","Roboto",30);
		this.storeButtonLabel.attr({
			x:this.storeButton.x+this.storeButton.width/2,
			y:this.storeButton.y+this.storeButton.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.storeButtonLabel.color=cc.color(0,0,0,255);
		this.addChild(this.storeButtonLabel);*/
		this.editorButtonLabel=new cc.LabelTTF("Creator","Roboto",30);
		this.editorButtonLabel.attr({
			x:this.editorButton.x+this.editorButton.width/2,
			y:this.editorButton.y+this.editorButton.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.editorButtonLabel.color=cc.color(255,255,255,255);
		this.addChild(this.editorButtonLabel);
		
		this.levelAShadow = null;
		if(DATA.levelIndexA == null)
		{
			this.levelAShadow=new cc.Sprite(res.star_shadow);
			this.levelAShadow.setScale(1.5*this.bubbleR/this.levelAShadow.width);
			this.levelAShadow.attr({
				x:this.width/2-this.challengeButton.width/5,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelAShadow);
		}
		
		this.levelBShadow = null;
		if(DATA.levelIndexB == null)
		{
			this.levelBShadow=new cc.Sprite(res.star_shadow);
			this.levelBShadow.setScale(1.5*this.bubbleR/this.levelBShadow.width);
			this.levelBShadow.attr({
				x:this.width/2+this.challengeButton.width/5,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelBShadow);
		}
		this.draw();
		
		/*if(this.tabName == "world")
		{
			this.worldChestButton = new cc.Sprite(res.world_rewards_button);
			this.worldChestButton.setScale((this.editorButton.width/2 - 2) / this.worldChestButton.width);
			this.worldChestButton.attr({
				x:this.editorButton.x + this.editorButton.width/2 + 2,
				y:this.editorButton.y+this.editorButton.height+10,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.worldChestButton);
		}*/
		
	},
	onTouchEnd:function(pos){
		cc.log("onTouchEnd");
		var size = cc.winSize;
		if(pos.y>this.challengeButton.y && pos.y<this.challengeButton.y+this.storeButton.height
			&& pos.x>this.challengeButton.x && pos.x<this.challengeButton.x+this.challengeButton.width)
		{
			return "challengeButton";
			
		}
		else if(this.posWithin(pos,this.storeButton))
		{
			cc.director.runScene(new cc.TransitionFade(1, new ShopScene()));
		}
		else if(this.posWithin(pos,this.editorButton))
		{
			//cc.director.runScene(new cc.TransitionFade(1, new EditorScene()));
			
			return "creator";
			
			
			
		}
	},
	
	
	hideLevelsButton:function()
	{
		this.levelButtonShown = false;
		//this.removeChild(this.levelAImg);
		//this.removeChild(this.levelBImg);
		if(this.levelAImg != null)
			this.removeChild(this.levelAImg);
		if(this.levelAShadow != null)
			this.removeChild(this.levelAShadow);
		if(this.levelBImg != null)
			this.removeChild(this.levelBImg);
		if(this.levelBShadow != null)
			this.removeChild(this.levelBShadow);
		
		this.dn.clear();
		this.draw();
	},
	showLevelsButton:function()
	{
		this.levelButtonShown = true;
		
		this.refreshLevelsUI();
		
		this.draw();
	},
	
	posWithin:function(a,b)
	{
		if(a.y>b.y&&a.y<b.y+b.height&&a.x>b.x&&a.x<b.x+b.width)
			return true;
		return false;
	},
	posWithinScaled:function(a,b)
	{
		if(a.y>b.y&&a.y<b.y+b.height*b.scale&&a.x>b.x&&a.x<b.x+b.width*b.scale)
			return true;
		return false;
	},
	
	refreshLevelsUI:function()
	{
		if(DATA.levelIndexA!=null && this.levelAImg==null)
		{
			this.levelAImg=new cc.Sprite(res.star_emoji);
			this.levelAImg.setScale(1.5*this.bubbleR/this.levelAImg.width);
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
			this.levelBImg.setScale(1.5*this.bubbleR/this.levelBImg.width);
			this.levelBImg.attr({
				x:this.width/2+this.challengeButton.width/5,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelBImg);
			this.draw();
		}
		else if(DATA.levelIndexB==null && this.levelBImg!=null)
		{
			this.removeChild(this.levelBImg);
			this.levelBImg=null;
			this.draw();
		}
	},
	
	
	hideMinorUI:function()
	{
		if((this.worldChestButton != null))
		{
			this.minorUIHidden = true;
			if(this.worldChestButton != null)
			{
				this.removeChild(this.worldChestButton);
			}
		}
	},
	showMinorUI:function()
	{
		if(this.minorUIHidden)
		{
			this.addChild(this.worldChestButton);
		}
	},
	
	draw:function()
	{
		this.dn.drawRect(cc.p(this.editorButton.x,this.editorButton.y),cc.p(this.editorButton.x+this.editorButton.width,this.editorButton.y+this.editorButton.height),cc.color(0,0,255,255),5,cc.color(0,0,0,255));
	
	if(this.levelButtonShown)
	{
		this.drawChallengeButton();
		//this.dn.drawRect(cc.p(this.storeButton.x,this.storeButton.y),cc.p(this.storeButton.x+this.storeButton.width,this.storeButton.y+this.storeButton.height),cc.color(255,255,0,255),5,cc.color(0,0,0,255));
	
		var color = cc.color(0,0,0,255);
		if(DATA.streakStep==0 && DATA.challengeTries==0)
			color = cc.color(255,255,255,255);
		else if(DATA.streakStep==DATA.challengeTries)
			color = cc.color(255,0,0,255);
		else if((DATA.streakStep==1 && DATA.challengeTries==0) || (DATA.streakStep==0 && DATA.challengeTries==1))
			color = cc.color(255,255,0,255);
		else if(DATA.streakStep == 2 && DATA.challengeTries==0)
			color = cc.color(0,255,0,255);
		this.dn.drawRect(cc.p(this.challengeLightA.x,this.challengeLightA.y),cc.p(this.challengeLightA.x+this.challengeLightA.width,this.challengeLightA.y+this.challengeLightA.height),color,5,cc.color(0,0,0,255));
		
		color = cc.color(0,0,0,255);
		if(DATA.streakStep==1 && DATA.challengeTries==1)
			color = cc.color(255,255,255,255);
		else if(DATA.streakStep==1 && DATA.challengeTries==0)
			color = cc.color(255,255,0,255);
		else if(DATA.streakStep == 2 && DATA.challengeTries==0)
			color = cc.color(0,255,0,255);
		this.dn.drawRect(cc.p(this.challengeLightB.x,this.challengeLightB.y),cc.p(this.challengeLightB.x+this.challengeLightB.width,this.challengeLightB.y+this.challengeLightB.height),color,5,cc.color(0,0,0,255));
		
		color = cc.color(0,0,0,255);
		if((DATA.streakStep==1 && DATA.challengeTries==1) || (DATA.streakStep==2 && DATA.challengeTries>0))
			color = cc.color(255,255,255,255);
		else if(DATA.streakStep == 2 && DATA.challengeTries==0)
			color = cc.color(0,255,0,255);
		this.dn.drawRect(cc.p(this.challengeLightC.x,this.challengeLightC.y),cc.p(this.challengeLightC.x+this.challengeLightC.width,this.challengeLightC.y+this.challengeLightC.height),color,5,cc.color(0,0,0,255));
	}
	},
	drawChallengeButton:function(){
		var buttonColor=cc.color(100,100,100,255);
		if(DATA.levelIndexB!=null)
			buttonColor=cc.color(255,0,0,255);
		else if(DATA.levelIndexA!=null)
			buttonColor=cc.color(0,255,0,255);
		this.dn.drawRect(cc.p(this.challengeButton.x,this.challengeButton.y),cc.p(this.challengeButton.x+this.challengeButton.width,this.challengeButton.y+this.challengeButton.height),buttonColor,5,cc.color(0,0,0,255));
		
	},
	
	
	initTutorialScreen:function(num)
	{
		this.tutorialLayer = new TutorialLayer(num);
	}
});