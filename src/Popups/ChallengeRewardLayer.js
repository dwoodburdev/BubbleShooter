var ChallengeRewardLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.bgImage = new cc.Sprite(res.phone_up);
		this.bgImage.setScaleX(this.width / this.bgImage.width);
		this.bgImage.setScaleY(this.height / this.bgImage.height);
		this.bgImage.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bgImage);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Success", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":this.width/2,
			"y":this.height*.86+this.tabTitleLabel.height/2,
			"anchorX":.5,
			"anchorY":.5
		});
		this.tabTitleLabel.color = cc.color(255,255,255,255);
		this.addChild(this.tabTitleLabel);
		
		/*
		this.emojiFace = null;
		if(DATA.streakStep == 1)
			this.emojiFace = new cc.Sprite(res.sunglass_face);
		else if(DATA.streakStep == 2)
			this.emojiFace = new cc.Sprite(res.crown_face);
		this.emojiFace.setScale(this.width/3 / this.emojiFace.width);
		this.emojiFace.attr({
			x:this.width/2,
			y:this.tabTitleLabel.y-(this.tabTitleLabel.height*this.tabTitleLabel.scale),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.emojiFace);*/
		
		this.nextButton = new cc.Sprite(res.next_button);
		this.nextButton.setScale(this.width/3 / this.nextButton.width)
		this.nextButton.attr({
			x:this.width/2,
			y:20,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.nextButton);
		
		this.summaryDisplayLayer = new ChallengeWinSummaryLayer(
			this.width, 
			this.height
			//this.tabTitleLabel.y-(this.tabTitleLabel.height*this.tabTitleLabel.scale) - (this.nextButton.y+(this.nextButton.height*this.nextButton.scale))
		);
		this.summaryDisplayLayer.attr({
			x:0,
			y:0,//this.nextButton.y+(this.nextButton.height*this.nextButton.scale),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.summaryDisplayLayer);
		
		this.rewardPickerLayer = null;
		this.dailyDisplayLayer = null;
		this.puzzleDisplayLayer = null;
	},
	
	onTouchEnd:function(pos)
	{
		//var loc = this.convertToNodeSpace(pos);
		
		
		
		if(this.nextButton != null && FUNCTIONS.posWithinScaled(pos, this.nextButton))
		{cc.log("NEXTBUTTONYO");
			
			if(!this.summaryDisplayLayer.rewardSpun && !this.summaryDisplayLayer.rewardSpinning)
			{
				this.summaryDisplayLayer.slotLayer.initSpin();
			}
			else if(this.summaryDisplayLayer.rewardSpun)
			{cc.log("should close");
				return "close";
			}
			
			
			
			/*if(this.summaryDisplayLayer != null)
			{
				this.removeChild(this.summaryDisplayLayer);
				this.summaryDisplayLayer = null;
					
				this.removeChild(this.nextButton);
				this.nextButton = null;
				
				//transition to next screen in win flow if necessary
			}*/
			
			
			
		}
		else if(this.summaryDisplayLayer != null && 
			FUNCTIONS.posWithin(pos, this.summaryDisplayLayer) && !this.summaryDisplayLayer.rewardSpun
		)
		{cc.log("SUMDISPLAYLAYAER")
			this.summaryDisplayLayer.onTouchEnd(pos);
		}
		
		
	},
	
	switchTabsAfterRewardPicker:function()
	{
		
		this.removeChild(this.rewardPicker);
		this.rewardPicker = null;
		
		
		
		
		
		
		
		this.nextButton = new cc.Sprite(res.next_button);
		this.nextButton.setScale(this.width/3 / this.nextButton.width)
		this.nextButton.attr({
			x:this.width/2,
			y:20,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.nextButton);
		
		
		this.dailyDisplayLayer = new ChallengeWinDailyLayer(
			this.width, 
			this.tabTitleLabel.y-(this.tabTitleLabel.height*this.tabTitleLabel.scale) - (this.nextButton.y+(this.nextButton.height*this.nextButton.scale))
		);
		this.dailyDisplayLayer.attr({
			x:0,
			y:this.nextButton.y+(this.nextButton.height*this.nextButton.scale),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.dailyDisplayLayer);
	}
	
});
