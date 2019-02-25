var ChallengeRewardLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Level Complete!", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":this.width/2,
			"y":this.height-5,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
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
			this.tabTitleLabel.y-(this.tabTitleLabel.height*this.tabTitleLabel.scale) - (this.nextButton.y+(this.nextButton.height*this.nextButton.scale))
		);
		this.summaryDisplayLayer.attr({
			x:0,
			y:this.nextButton.y+(this.nextButton.height*this.nextButton.scale),
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
		{
			if(this.summaryDisplayLayer != null)
			{
				this.removeChild(this.summaryDisplayLayer);
				this.summaryDisplayLayer = null;
					
				this.removeChild(this.nextButton);
				this.nextButton = null;
				
				if(DATA.streakStep == 1)
				{
					this.rewardPicker = new BonusRewardPickerLayer(
						this.width,
						this.tabTitleLabel.y-(this.tabTitleLabel.height*this.tabTitleLabel.scale)
					);
					this.rewardPicker.attr({
						x:0,
						y:0,
						anchorX:0,
						anchorY:0
					});
					this.addChild(this.rewardPicker);
					
					this.tabTitleLabel.setString("Pick Reward!");
				}
				else if(DATA.streakStep == 2)
				{
					this.rewardPicker = new ExtraBonusRewardPickerLayer(
						this.width,
						this.tabTitleLabel.y-(this.tabTitleLabel.height*this.tabTitleLabel.scale)
					);
					this.rewardPicker.attr({
						x:0,
						y:0,
						anchorX:0,
						anchorY:0
					});
					this.addChild(this.rewardPicker);
					
					this.tabTitleLabel.setString("Pick Reward!");
				}
				
			}
			/*else if(this.rewardPickerLayer != null)
			{
				
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
			}*/
			else if(this.dailyDisplayLayer != null)
			{
				this.removeChild(this.dailyDisplayLayer);
				this.dailyDisplayLayer = null;
				
				/*this.puzzleDisplayLayer = new ChallengeWinPuzzleLayer(
					this.width, 
					this.tabTitleLabel.y-(this.tabTitleLabel.height*this.tabTitleLabel.scale) - (this.nextButton.y+(this.nextButton.height*this.nextButton.scale))
				);
				this.puzzleDisplayLayer.attr({
					x:0,
					y:this.nextButton.y+(this.nextButton.height*this.nextButton.scale),
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.puzzleDisplayLayer);*/
			//}
			//else
			//{
				return "close";
			}
			
			
		}
		else if(this.rewardPicker != null && FUNCTIONS.posWithin(pos, this.rewardPicker))
		{
			this.rewardPicker.onTouchEnd(pos);
			//return "close";
			var seq = new cc.Sequence(cc.delayTime(2), cc.callFunc(this.switchTabsAfterRewardPicker, this));
			this.runAction(seq);
		}
		
	},
	
	switchTabsAfterRewardPicker:function()
	{
		return "close";
		
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
