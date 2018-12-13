var ExtraBonusRewardPickerLayer = cc.Layer.extend({
	ctor:function(width,height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.cardPicked = false;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.width = width;
		this.height = height;
		
		this.tabTitleLabel = new cc.LabelTTF("Pick a Reward", "Arial", 20);
		this.tabTitleLabel.attr({
			"x":this.width/2,
			"y":this.height-30,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		this.cardBorderWidth = 5;
		this.cardWidth = this.width/3 - this.cardBorderWidth*4;
		this.cardHeight = this.height/3 - this.cardBorderWidth*4;
		
		this.cards = [];
		for(var i=0; i<3; i++)
		{
			for(var j=0; j<3; j++)
			{
				var cardImg = new cc.Sprite(res.gold_card_back);
				
				cardImg.attr({
					"x":this.cardBorderWidth + j*this.cardBorderWidth + + j*this.cardWidth,
					"y":i*this.cardHeight - i*this.cardBorderWidth,
					"anchorX":0,
					"anchorY":0
				});
				cardImg.setScaleX(this.cardWidth/cardImg.width);
				cardImg.setScaleY(this.cardHeight/cardImg.height);
				cardImg.width = this.cardWidth;
				cardImg.height = this.cardHeight;
				this.addChild(cardImg);
				this.cards.push(cardImg);
			}
		}
		
		/*var self = this;
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){
			   		var target = event.getCurrentTarget();
			    	var locationInNode = self.convertToNodeSpace(touch.getLocation());

			    	
			    	
			    	return true;
			    },
			    onTouchMoved: function(touch, event){
			    	var target = event.getCurrentTarget();
			    	var locationInNode = self.convertToNodeSpace(touch.getLocation());

			    	
			    	
			    	return true;
			    },
			    onTouchEnded: function(touch, event){
				    var target = event.getCurrentTarget();
				    var locationInNode = self.convertToNodeSpace(touch.getLocation());
			    	
			    	
				 
			    	return true;
			    }
		    },this);
		}*/
		
        //return true;
	},
	
	onTouchEnd: function(pos)
	{cc.log(pos);
		for(var i=0; i<this.cards.length; i++)
		{
			var card = this.cards[i];
			if(pos.x > card.x && pos.x < card.x+card.width && pos.y > card.y && pos.y < card.y+card.height)
			{cc.log("w " + card.width + " h " + card.height);
				var oldX = card.x;
				var oldY = card.y;
				this.removeChild(card);
				
				var cardRewards = [0,0,0,0,0,1,1,2,3];
				var cardRewards = cardRewards[Math.floor(Math.random()*cardRewards.length)];
				if(cardRewards == 0)
				{
					this.cards[i] = new cc.Sprite(res.ten_moves_gold_card);
					DATA.worldBallsLeft += 10;
				}
				else if(cardRewards == 1)
				{
					this.cards[i] = new cc.Sprite(res.fifteen_coins_gold_card);
					DATA.coins += 15;
					DATA.worldBallsLeft += 5;
				}
				else if(cardRewards == 2)
				{
					this.cards[i] = new cc.Sprite(res.twentyfive_coins_gold_card);
					DATA.coins += 15;
					DATA.worldBallsLeft += 5;
				}
				else if(cardRewards == 3)
				{
					this.cards[i] = new cc.Sprite(res.gem_gold_card);
					DATA.gems++;
					DATA.coins += 5;
				}
					
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
	
});
var ExtraBonusRewardPickerScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer = new ExtraBonusRewardPickerLayer();
		this.addChild(layer);
	}
});
