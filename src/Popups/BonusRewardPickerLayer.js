var BonusRewardPickerLayer = cc.Layer.extend({
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
		this.cardWidth = this.width/3 - this.cardBorderWidth*4;
		this.cardHeight = this.height/3 - this.cardBorderWidth*4;
		
		this.cards = [];
		for(var i=0; i<3; i++)
		{
			for(var j=0; j<3; j++)
			{
				var cardImg = new cc.Sprite(res.card_back);
				
				cardImg.attr({
					"x":this.cardBorderWidth + j*this.cardBorderWidth + j*this.cardWidth,
					"y":i*this.cardHeight - i*this.cardBorderWidth,
					"anchorX":0,
					"anchorY":0
				});
				cardImg.setScaleX(this.cardWidth/cardImg.width);
				cardImg.setScaleY(this.cardHeight/cardImg.height);
				//cardImg.width = this.cardWidth;
				//cardImg.height = this.cardHeight;
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
			if(pos.x > card.x && pos.x < card.x+(card.width*card.scaleX) && pos.y > card.y && pos.y < card.y+(card.height*card.scaleY))
			{cc.log("w " + card.width + " h " + card.height);
				var oldX = card.x;
				var oldY = card.y;
				this.removeChild(card);
				
				var ballRewards = [1,1,1,1,1,3,3,5,5];
				var ballsAdded = ballRewards[Math.floor(Math.random()*ballRewards.length)];
				if(ballsAdded == 1)
					this.cards[i] = new cc.Sprite(res.one_move_card);
				else if(ballsAdded == 3)
					this.cards[i] = new cc.Sprite(res.three_move_card);
				else if(ballsAdded == 5)
					this.cards[i] = new cc.Sprite(res.five_move_card);
					
				//DATA.worldBallsLeft += ballsAdded;
				
				DATA.gameplayRewardOnReturn = {"type":"bonus","number":ballsAdded};
				
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
