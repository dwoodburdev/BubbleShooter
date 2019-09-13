var BonusPhoneLayer = cc.Layer.extend({
	ctor:function(width, height, bonusType){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		this.bonusType = bonusType;
		
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
		
		
		this.tabTitleLabel = new cc.LabelTTF("Spin", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":this.width/2,
			"y":this.height*.86+2,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		
		
		/*this.nextButton = new cc.Sprite(res.next_button);
		this.nextButton.setScale(this.width/3 / this.nextButton.width)
		this.nextButton.attr({
			x:this.width/2,
			y:20,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.nextButton);*/
		
		if(this.bonusType == "bonus")
		{
		//this.bonusPicker = new BonusRewardPickerLayer(
		this.bonusPicker = new BonusSlotLayer(
			this.width*.81, 
			this.height*.72
			//this.tabTitleLabel.y-(this.tabTitleLabel.height*this.tabTitleLabel.scale) - (this.nextButton.y+(this.nextButton.height*this.nextButton.scale))
		);
		}
		else if(this.bonusType == "extra")
		{
			//this.bonusPicker = new ExtraBonusRewardPickerLayer(
			this.bonusPicker = new BonusSlotLayer(
				this.width*.81, 
				this.height*.72
			);
		}
		this.bonusPicker.attr({
			x:this.width*.095,
			y:this.height*.14,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bonusPicker);
		
	},
	
	onTouchEnd:function(pos)
	{cc.log("BonusPhoneLayer click");
		 var loc = this.convertToNodeSpace(pos);
		if(this.bonusPicker != null && FUNCTIONS.posWithin(loc, this.bonusPicker))
		{
			var returnObj = this.bonusPicker.onTouchEnd(pos);
			
			if(returnObj == "close")
			{cc.log("CLOSE PHONE POPUP");
				var seq = new cc.Sequence(cc.delayTime(2), cc.callFunc(this.parent.deleteDailyChestLayer, this.parent));
				this.runAction(seq);
			}
			//return "close";
		}
		
		
	}
	
});
