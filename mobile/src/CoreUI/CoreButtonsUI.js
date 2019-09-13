var CoreButtonsUI = cc.Layer.extend({
	ctor:function(bubbleR,height,tabName){
		this._super();
		cc.associateWithNative(this,cc.Sprite);
		cc.log("CORE");
		//this.height=height;
		
		var size=cc.winSize;
		
		this.dn=new cc.DrawNode();
		this.addChild(this.dn);
		
		this.bubbleR=bubbleR;
		
		this.tutorialLayer = null;
		
		this.height = height;
		
		this.levelButtonShown = true;
		
		
		this.tabName = tabName;
		
		this.minorUIHidden = false;
		
		this.challengeButton={x:15,y:7,width:(size.width-30)/2,height:50};
		
		this.progButton={x:(size.width/2)+15,y:7,width:(size.width-30)/2,height:50};
		
		this.levelAImg=new cc.Sprite(res.star_emoji);
		this.levelAImg.setScale(this.challengeButton.height*.75 / this.levelAImg.height);
		this.levelAImg.attr({
			x:this.challengeButton.x+(this.challengeButton.width*.16),
			y:this.challengeButton.y+this.challengeButton.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.addChild(this.levelAImg);
		
		this.levelBImg=new cc.Sprite(res.star_emoji);
		this.levelBImg.setScale(this.challengeButton.height*.75 / this.levelBImg.height);
		this.levelBImg.attr({
			x:this.challengeButton.x+(this.challengeButton.width*.38),
			y:this.challengeButton.y+this.challengeButton.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.addChild(this.levelBImg);
		
		this.levelCImg=new cc.Sprite(res.star_emoji);
		this.levelCImg.setScale(this.challengeButton.height*.75 / this.levelCImg.height);
		this.levelCImg.attr({
			x:this.challengeButton.x+(this.challengeButton.width*.6),
			y:this.challengeButton.y+this.challengeButton.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.addChild(this.levelCImg);
		
		this.multiplierImg = new cc.Sprite(res.multiplier_three);
		this.multiplierImg.setScale(this.challengeButton.height*.75 / this.multiplierImg.height);
		this.multiplierImg.attr({
			x:this.levelCImg.x+(this.levelCImg.width*this.levelCImg.scale/2) + (this.challengeButton.x+this.challengeButton.width - (this.levelCImg.x+(this.levelCImg.width*this.levelCImg.scale/2)))/2,
			y:this.levelCImg.y,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.multiplierImg);
		
		this.nextObstImg = new cc.Sprite(res.red_soapbar_emoji);
		this.nextObstImg.setScale(this.progButton.height*.75 / this.nextObstImg.height);
		this.nextObstImg.attr({
			x:this.progButton.x+this.progButton.width-2,
			y:this.progButton.y+(this.progButton.height/2),
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.nextObstImg);cc.log(this.nextObstImg);
		
		this.progDn = new cc.DrawNode();
		this.addChild(this.progDn);
		this.progDn.drawRect(
			cc.p(this.progButton.x+this.progButton.width*.05, this.progButton.y+(this.progButton.height/2)-(this.progButton.height*.15)),
			cc.p(this.nextObstImg.x-(this.nextObstImg.width*this.nextObstImg.scale)-7, this.progButton.y+(this.progButton.height/2)+(this.progButton.height*.15)),
			cc.color(255,255,255,255),
			2,
			cc.color(0,0,0,255)
		);
		
		/*this.storeButtonLabel=new cc.LabelTTF("Store","Roboto",30);
		this.storeButtonLabel.attr({
			x:this.storeButton.x+this.storeButton.width/2,
			y:this.storeButton.y+this.storeButton.height/2,
			anchorX:0.5,
			anchorY:0.5
		});
		this.storeButtonLabel.color=cc.color(0,0,0,255);
		this.addChild(this.storeButtonLabel);*/
		
		
		/*
			this.levelAShadow=new cc.Sprite(res.star_shadow);
			this.levelAShadow.setScale(1.5*this.bubbleR/this.levelAShadow.width);
			this.levelAShadow.attr({
				x:this.width/2-this.challengeButton.width/5,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelAShadow);
	
			this.levelBShadow=new cc.Sprite(res.star_shadow);
			this.levelBShadow.setScale(1.5*this.bubbleR/this.levelBShadow.width);
			this.levelBShadow.attr({
				x:this.width/2+this.challengeButton.width/5,
				y:this.challengeButton.y+this.challengeButton.height/2,
				anchorX:0.5,
				anchorY:0.5
			});
			this.addChild(this.levelBShadow);
		*/
		this.draw();
		
		
		
		
		

		
	},
	onTouchEnd:function(pos){
		cc.log("onTouchEnd");
		var size = cc.winSize;
		if(pos.y>this.challengeButton.y && pos.y<this.challengeButton.y+this.challengeButton.height
			&& pos.x>this.challengeButton.x && pos.x<this.challengeButton.x+this.challengeButton.width)
		{
			return "challengeButton";
			
		}
	},
	
	changeToGame:function()
	{
		this.removeChild(this.editorButtonImg);
		this.editorButtonImg = null;
		
		this.editorButtonImg = new cc.Sprite(res.creator_toggle);
		this.editorButtonImg.setScale((32+15+7) / this.editorButtonImg.width);
		this.editorButtonImg.attr({
			x:this.challengeButton.x+this.challengeButton.width + (cc.winSize.width-this.challengeButton.x-this.challengeButton.width)/2,
			y:this.challengeButton.y-5,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.editorButtonImg);
	},
	changeToEditor:function()
	{
		this.removeChild(this.editorButtonImg);
		this.editorButtonImg = null;
		
		this.editorButtonImg = new cc.Sprite(res.back_to_play_button);
		this.editorButtonImg.setScale((32+15+7) / this.editorButtonImg.width);
		this.editorButtonImg.attr({
			x:this.challengeButton.x+this.challengeButton.width + (cc.winSize.width-this.challengeButton.x-this.challengeButton.width)/2,
			y:this.challengeButton.y-5,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.editorButtonImg);
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
		//this.dn.drawRect(cc.p(this.editorButton.x,this.editorButton.y),cc.p(this.editorButton.x+this.editorButton.width,this.editorButton.y+this.editorButton.height),cc.color(255,140,0,255),5,cc.color(0,0,0,255));
	
		if(this.levelButtonShown)
		{
			this.drawChallengeButton();
			//this.dn.drawRect(cc.p(this.storeButton.x,this.storeButton.y),cc.p(this.storeButton.x+this.storeButton.width,this.storeButton.y+this.storeButton.height),cc.color(255,255,0,255),5,cc.color(0,0,0,255));
		
			this.drawProgButton();
		
		}
		
	},
	drawChallengeButton:function(){
		//var buttonColor=cc.color(100,100,100,255);
		//if(DATA.levelIndexB!=null)
		//	buttonColor=cc.color(255,0,0,255);
		//else if(DATA.levelIndexA!=null)
		//	buttonColor=cc.color(0,255,0,255);
		var buttonColor = cc.color(0,255,0,255);
		this.dn.drawRect(cc.p(this.challengeButton.x,this.challengeButton.y),cc.p(this.challengeButton.x+this.challengeButton.width,this.challengeButton.y+this.challengeButton.height),buttonColor,5,cc.color(0,0,0,255));
		
	},
	
	drawProgButton:function(){
		//var buttonColor=cc.color(100,100,100,255);
		//if(DATA.levelIndexB!=null)
		//	buttonColor=cc.color(255,0,0,255);
		//else if(DATA.levelIndexA!=null)
		//	buttonColor=cc.color(0,255,0,255);
		var buttonColor = cc.color(0,0,255,255);
		this.dn.drawRect(cc.p(this.progButton.x,this.progButton.y),cc.p(this.progButton.x+this.progButton.width,this.progButton.y+this.progButton.height),buttonColor,5,cc.color(0,0,0,255));
		
	},
	
	
	initTutorialScreen:function(num)
	{
		this.tutorialLayer = new TutorialLayer(num);
	}
});