var ExtraBonusRewardPickerLayer = cc.Layer.extend({
	ctor:function(width,height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.cardPicked = false;
		
		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.width = width;
		this.height = height;
		
		/*this.tabTitleLabel = new cc.LabelTTF("Pick a Reward", "Arial", 20);
		this.tabTitleLabel.attr({
			"x":this.width/2,
			"y":this.height-30,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);*/
		
		this.cardBorderWidth = 5;
		this.cardWidth = (this.width - this.cardBorderWidth*4)/3;
		this.cardHeight = (this.height - this.cardBorderWidth*4)/3;
		
		this.cards = [];
		for(var i=0; i<3; i++)
		{
			for(var j=0; j<3; j++)
			{
				var cardImg = new cc.Sprite(res.gold_card_back);
				
				cardImg.setScaleX(this.cardWidth/cardImg.width);
				cardImg.setScaleY(this.cardHeight/cardImg.height);
				cardImg.attr({
					"x":this.cardBorderWidth + j*this.cardBorderWidth + j*this.cardWidth,
					"y":i*this.cardHeight - i*this.cardBorderWidth,
					"anchorX":0,
					"anchorY":0
				});
				this.addChild(cardImg);
				this.cards.push(cardImg);
			}
		}
		
		
	},
	
	onTouchEnd: function(pos)
	{cc.log(pos);
		if(!this.cardPicked)
		{
			for(var i=0; i<this.cards.length; i++)
			{
				var card = this.cards[i];
				if(pos.x > card.x && pos.x < card.x+(card.width*card.scaleX) && pos.y > card.y && pos.y < card.y+(card.height*card.scaleY))
				{cc.log("w " + card.width + " h " + card.height);
					var oldX = card.x;
					var oldY = card.y;
					this.removeChild(card);
					
					var cardRewards = [0,0,0,0,0,1,1,2,3];
					var cardReward = cardRewards[Math.floor(Math.random()*cardRewards.length)];
					if(cardReward == 0)
					{
						this.cards[i] = new cc.Sprite(res.ten_moves_gold_card);
						//DATA.worldBallsLeft += 10;
					}
					else if(cardReward == 1)
					{
						this.cards[i] = new cc.Sprite(res.fifteen_coins_gold_card);
						//DATA.setCurrencies(DATA.coins+15,DATA.gems);
						//DATA.worldBallsLeft += 5;
					}
					else if(cardReward == 2)
					{
						this.cards[i] = new cc.Sprite(res.twentyfive_coins_gold_card);
						//DATA.setCurrencies(DATA.coins+15,DATA.gems);
						//DATA.worldBallsLeft += 5;
					}
					else if(cardReward == 3)
					{
						this.cards[i] = new cc.Sprite(res.gem_gold_card);
						//DATA.setCurrencies(DATA.coins+5,DATA.gems+1);
					}
					
					DATA.gameplayRewardOnReturn = {"type":"extraBonus","number":cardReward};
						
					//DATA.worldBallsLeft += cardRewards;
					
					this.cards[i].setScaleX(this.cardWidth/this.cards[i].width);
					this.cards[i].setScaleY(this.cardHeight/this.cards[i].height);
					
					this.cards[i].attr({
						"x":oldX,
						"y":oldY,
						"anchorX":0,
						"anchorY":0
					});
					this.addChild(this.cards[i]);
					this.cardPicked = true;
				}
			}
		
		}
	}
	
});