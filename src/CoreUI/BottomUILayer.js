var BottomUILayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
		
        var size = cc.winSize;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		//this.width = w;
		this.height = height;
		
		this.buttonWidth = size.width/5;
		this.buttonHeight = this.height;
		
		this.meButton = new cc.Sprite(res.me_button);
		this.meButton.setScaleX(this.buttonWidth/this.meButton.width);
		this.meButton.setScaleY(this.buttonHeight/this.meButton.height);
		this.meButton.attr({
			"x":0,
			"y":0,
			"anchorX":0,
			"anchorY":0
		});
		this.addChild(this.meButton);
		
		this.challengeMenuButton = new cc.Sprite(res.challenge_button);
		this.challengeMenuButton.setScaleX(this.buttonWidth/this.challengeMenuButton.width);
		this.challengeMenuButton.setScaleY(this.buttonHeight/this.challengeMenuButton.height);
		this.challengeMenuButton.attr({
			"x":this.buttonWidth,
			"y":0,
			"anchorX":0,
			"anchorY":0
		});
		this.addChild(this.challengeMenuButton);
		
		this.playButton = new cc.Sprite(res.play_button);
		this.playButton.setScaleX(this.buttonWidth/this.playButton.width);
		this.playButton.setScaleY(this.buttonHeight/this.playButton.height);
		this.playButton.attr({
			"x":this.buttonWidth*2,
			"y":0,
			"anchorX":0,
			"anchorY":0
		});
		this.addChild(this.playButton);
		
		this.friendsButton = new cc.Sprite(res.friends_button);
		this.friendsButton.setScaleX(this.buttonWidth/this.friendsButton.width);
		this.friendsButton.setScaleY(this.buttonHeight/this.friendsButton.height);
		this.friendsButton.attr({
			"x":this.buttonWidth*3,
			"y":0,
			"anchorX":0,
			"anchorY":0
		});
		this.addChild(this.friendsButton);
		
		this.leagueButton = new cc.Sprite(res.league_button);
		this.leagueButton.setScaleX(this.buttonWidth/this.leagueButton.width);
		this.leagueButton.setScaleY(this.buttonHeight/this.leagueButton.height);
		this.leagueButton.attr({
			"x":this.buttonWidth*4,
			"y":0,
			"anchorX":0,
			"anchorY":0
		});
		this.addChild(this.leagueButton);
		
		this.curTabName = "gameplay";
		
		
		this.draw();
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
	},
	
	selectButton:function(code)
	{
		if(this.curTabName == "me")
		{
			this.removeChild(this.meButton);
			this.meButton = new cc.Sprite(res.me_button);
			this.meButton.setScaleX(this.buttonWidth/this.meButton.width);
			this.meButton.setScaleY(this.buttonHeight/this.meButton.height);
			this.meButton.attr({
				"x":0,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.meButton);
		}
		else if(this.curTabName == "challenge")
		{
			this.removeChild(this.challengeButton);
			this.challengeButton = new cc.Sprite(res.challenge_button);
			this.challengeButton.setScaleX(this.buttonWidth/this.challengeButton.width);
			this.challengeButton.setScaleY(this.buttonHeight/this.challengeButton.height);
			this.challengeButton.attr({
				"x":this.buttonWidth,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.challengeButton);
		}
		else if(this.curTabName == "gameplay")
		{
			this.removeChild(this.gameplayButton);
			this.gameplayButton = new cc.Sprite(res.play_button);
			this.gameplayButton.setScaleX(this.buttonWidth/this.gameplayButton.width);
			this.gameplayButton.setScaleY(this.buttonHeight/this.gameplayButton.height);
			this.gameplayButton.attr({
				"x":this.buttonWidth*2,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.gameplayButton);
		}
		else if(this.curTabName == "friends")
		{
			this.removeChild(this.friendsButton);
			this.friendsButton = new cc.Sprite(res.friends_button);
			this.friendsButton.setScaleX(this.buttonWidth/this.friendsButton.width);
			this.friendsButton.setScaleY(this.buttonHeight/this.friendsButton.height);
			this.friendsButton.attr({
				"x":this.buttonWidth*3,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.friendsButton);
		}
		else if(this.curTabName == "league")
		{
			this.removeChild(this.leagueButton);
			this.leagueButton = new cc.Sprite(res.league_button);
			this.leagueButton.setScaleX(this.buttonWidth/this.leagueButton.width);
			this.leagueButton.setScaleY(this.buttonHeight/this.leagueButton.height);
			this.leagueButton.attr({
				"x":this.buttonWidth*4,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.leagueButton);
		}
		
		
		
		if(code == "me")
		{
			this.removeChild(this.meButton);
			this.meButton = new cc.Sprite(res.me_selected_button);
			this.meButton.setScaleX(this.buttonWidth/this.meButton.width);
			this.meButton.setScaleY(this.buttonHeight/this.meButton.height);
			this.meButton.attr({
				"x":0,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.meButton);
		}
		else if(code == "challenge")
		{
			this.removeChild(this.challengeMenuButton);
			this.challengeMenuButton = new cc.Sprite(res.challenge_selected_button);
			this.challengeMenuButton.setScaleX(this.buttonWidth/this.challengeMenuButton.width);
			this.challengeMenuButton.setScaleY(this.buttonHeight/this.challengeMenuButton.height);
			this.challengeMenuButton.attr({
				"x":this.buttonWidth,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.challengeMenuButton);
		}
		else if(code == "gameplay")
		{
			this.removeChild(this.playButton);
			this.playButton = new cc.Sprite(res.play_selected_button);
			this.playButton.setScaleX(this.buttonWidth/this.playButton.width);
			this.playButton.setScaleY(this.buttonHeight/this.playButton.height);
			this.playButton.attr({
				"x":this.buttonWidth*2,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.playButton);
		}
		else if(code == "friends")
		{
			this.removeChild(this.friendsButton);
			this.friendsButton = new cc.Sprite(res.friends_selected_button);
			this.friendsButton.setScaleX(this.buttonWidth/this.friendsButton.width);
			this.friendsButton.setScaleY(this.buttonHeight/this.friendsButton.height);
			this.friendsButton.attr({
				"x":this.buttonWidth*3,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.friendsButton);
		}
		else if(code == "league")
		{
			this.removeChild(this.leagueButton);
			this.leagueButton = new cc.Sprite(res.league_selected_button);
			this.leagueButton.setScaleX(this.buttonWidth/this.leagueButton.width);
			this.leagueButton.setScaleY(this.buttonHeight/this.leagueButton.height);
			this.leagueButton.attr({
				"x":this.buttonWidth*4,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.leagueButton);
		}
		
		this.curTabName = code;
	},
	
	onTouchEnd:function(pos)
	{
		if(pos.x > this.meButton.x && pos.x < this.meButton.x+this.buttonWidth)
		{
			//if(true==false)
			//	cc.director.runScene(new MeScene());
			return "me";
			//cc.director.pushScene(new MeScene());
		}
		else if(pos.x > this.challengeMenuButton.x && pos.x < this.challengeMenuButton.x+this.buttonWidth)
		{
			//cc.director.runScene(new ChallengeMenuScene());
			
			
			return "challenge";
			
			//cc.director.pushScene(new ChallengeMenuScene());
		}
		else if(pos.x > this.playButton.x && pos.x < this.playButton.x+this.buttonWidth)
		{
			//var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
    		/*var bubbles = DATA.worldBubbles;
    		//cc.log(bubbles);
    		var maxRow = 0;
    		var bubbleData = [];
    		for(var i=0; i<bubbles.length; i++)
    		{
    			if(bubbles[i].row > maxRow)
    				maxRow = bubbles[i].row;
    		}*/
			//cc.director.runScene(new GameplayScene(bubbles, maxRow+1));
			//cc.director.runScene(new MainContainerScene(new GameplayLayer(bubbles, maxRow+1)));
			return "gameplay";
		}
		else if(pos.x > this.friendsButton.x && pos.x < this.friendsButton.x+this.buttonWidth)
		{
			return "friends";
			//if(true==false)
			//	cc.director.runScene(new FriendsScene());
			//cc.director.pushScene(new FriendsScene());
		}
		else if(pos.x > this.leagueButton.x && pos.x < this.leagueButton.x+this.buttonWidth)
		{
			return "league";
			//if(true==false)
			//	cc.director.runScene(new LeagueScene());
			//cc.director.pushScene(new LeagueScene());
		}
		
	}
	
});
