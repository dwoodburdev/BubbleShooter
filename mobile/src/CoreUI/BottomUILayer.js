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
		
		this.appWidth = this.buttonHeight*.7;
		
		this.color = cc.color(220,220,220,255);
		
		//this.meButton = new cc.Sprite(res.me_button);
		this.meButton = new cc.Sprite(res.league_button);
		//this.meButton = new cc.Sprite(res.leaderboard_button);
		this.meButton.setScaleX(this.appWidth/this.meButton.width);
		this.meButton.setScaleY(this.appWidth/this.meButton.height);
		this.meButton.attr({
			"x":this.buttonWidth/2,
			"y":this.height/2,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.meButton);
		
		this.challengeMenuButton = new cc.Sprite(res.daily_button);
		//this.challengeMenuButton = new cc.Sprite(res.trend_button);
		this.challengeMenuButton.setScaleX(this.appWidth/this.challengeMenuButton.width);
		this.challengeMenuButton.setScaleY(this.appWidth/this.challengeMenuButton.height);
		this.challengeMenuButton.attr({
			"x":this.buttonWidth*3/2,
			"y":this.height/2,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.challengeMenuButton);
		
		this.playButton = new cc.Sprite(res.play_button);
		this.playButton.setScaleX(this.appWidth/this.playButton.width);
		this.playButton.setScaleY(this.appWidth/this.playButton.height);
		this.playButton.attr({
			"x":this.buttonWidth*5/2,
			"y":this.height/2,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.playButton);
		
		this.leagueButton = new cc.Sprite(res.pencil_button);
		//this.leagueButton = new cc.Sprite(res.pencil_button);
		this.leagueButton.setScaleX(this.appWidth/this.leagueButton.width);
		this.leagueButton.setScaleY(this.appWidth/this.leagueButton.height);
		this.leagueButton.attr({
			"x":this.buttonWidth*7/2,
			"y":this.height/2,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.leagueButton);
		
		this.friendsButton = new cc.Sprite(res.task_button);
		//this.friendsButton = new cc.Sprite(res.browse_button);
		this.friendsButton.setScaleX(this.appWidth/this.friendsButton.width);
		this.friendsButton.setScaleY(this.appWidth/this.friendsButton.height);
		this.friendsButton.attr({
			"x":this.buttonWidth*9/2,
			"y":this.height/2,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.friendsButton);
		
		this.curTabName = "gameplay";
		
		
		this.draw();
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), this.color,0,cc.color(0,0,0,255));
		
	},
	
	changeToEditor:function()
	{
		var leagueScaleX = this.leagueButton.scaleX;
		var leagueScaleY = this.leagueButton.scaleY;
		var leagueX = this.buttonWidth*9/2;
		var leagueY = this.height/2;
		this.removeChild(this.leagueButton);
		this.leagueButton = null;
		this.leagueButton = new cc.Sprite(res.showcase_button);
		this.leagueButton.setScaleX(leagueScaleX);
		this.leagueButton.setScaleY(leagueScaleY);
		this.leagueButton.attr({
			"x":leagueX,
			"y":leagueY,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.leagueButton);
		
		var playScaleX = this.playButton.scaleX;
		var playScaleY = this.playButton.scaleY;
		var playX = this.buttonWidth*5/2;
		var playY = this.height/2;
		this.removeChild(this.playButton);
		this.playButton = null;
		this.playButton = new cc.Sprite(res.edit_level_button);
		this.playButton.setScaleX(playScaleX);
		this.playButton.setScaleY(playScaleY);
		this.playButton.attr({
			"x":playX,
			"y":playY,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.playButton);
		
		var challengeScaleX = this.challengeMenuButton.scaleX;
		var challengeScaleY = this.challengeMenuButton.scaleY;
		var challengeX = this.buttonWidth*3/2;
		var challengeY = this.height/2;
		this.removeChild(this.challengeMenuButton);
		this.challengeMenuButton = null;
		this.challengeMenuButton = new cc.Sprite(res.browse_button);
		this.challengeMenuButton.setScaleX(challengeScaleX);
		this.challengeMenuButton.setScaleY(challengeScaleY);
		this.challengeMenuButton.attr({
			"x":challengeX,
			"y":challengeY,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.challengeMenuButton);
		
		this.color = cc.color(255,140,0,255);
		this.draw();
	},
	
	changeToGame:function()
	{
		var leagueScaleX = this.leagueButton.scaleX;
		var leagueScaleY = this.leagueButton.scaleY;
		var leagueX = this.buttonWidth*9/2;
		var leagueY = this.height/2;
		this.removeChild(this.leagueButton);
		this.leagueButton = null;
		this.leagueButton = new cc.Sprite(res.league_button);
		this.leagueButton.setScaleX(leagueScaleX);
		this.leagueButton.setScaleY(leagueScaleY);
		this.leagueButton.attr({
			"x":leagueX,
			"y":leagueY,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.leagueButton);
		
		var playScaleX = this.playButton.scaleX;
		var playScaleY = this.playButton.scaleY;
		var playX = this.buttonWidth*5/2;
		var playY = this.height/2;
		this.removeChild(this.playButton);
		this.playButton = null;
		this.playButton = new cc.Sprite(res.play_button);
		this.playButton.setScaleX(playScaleX);
		this.playButton.setScaleY(playScaleY);
		this.playButton.attr({
			"x":playX,
			"y":playY,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.playButton);
		
		var challengeScaleX = this.challengeMenuButton.scaleX;
		var challengeScaleY = this.challengeMenuButton.scaleY;
		var challengeX = this.buttonWidth*3/2;
		var challengeY = this.height/2;
		this.removeChild(this.challengeMenuButton);
		this.challengeMenuButton = null;
		this.challengeMenuButton = new cc.Sprite(res.challenge_button);
		this.challengeMenuButton.setScaleX(challengeScaleX);
		this.challengeMenuButton.setScaleY(challengeScaleY);
		this.challengeMenuButton.attr({
			"x":challengeX,
			"y":challengeY,
			"anchorX":.5,
			"anchorY":.5
		});
		this.addChild(this.challengeMenuButton);
		
		this.color = cc.color(220,220,220,255);
		this.draw();
	},
	
	selectButton:function(code)
	{
		var shrinkAction = cc.scaleTo(.5, this.appWidth/this.meButton.width, this.appWidth/this.meButton.height);
		var growAction = cc.scaleTo(.5, (this.buttonHeight*.95)/this.meButton.width, (this.buttonHeight*.95)/this.meButton.height);
		
		if(this.curTabName == "me")
		{
			this.meButton.runAction(shrinkAction);
			/*this.removeChild(this.meButton);
			this.meButton = new cc.Sprite(res.me_button);
			this.meButton.setScaleX(this.appWidth/this.meButton.width);
			this.meButton.setScaleY(this.appWidth/this.meButton.height);
			this.meButton.attr({
				"x":this.buttonWidth/2,
				"y":this.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.meButton);*/
		}
		else if(this.curTabName == "challenge")
		{
			this.challengeMenuButton.runAction(shrinkAction);
			/*this.removeChild(this.challengeButton);
			this.challengeButton = new cc.Sprite(res.challenge_button);
			this.challengeButton.setScaleX(this.appWidth/this.challengeButton.width);
			this.challengeButton.setScaleY(this.appWidth/this.challengeButton.height);
			this.challengeButton.attr({
				"x":this.buttonWidth*3/2,
				"y":this.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.challengeButton);*/
		}
		else if(this.curTabName == "gameplay")
		{
			this.playButton.runAction(shrinkAction);
			/*this.removeChild(this.gameplayButton);
			this.gameplayButton = new cc.Sprite(res.play_button);
			this.gameplayButton.setScaleX(this.appWidth/this.gameplayButton.width);
			this.gameplayButton.setScaleY(this.appWidth/this.gameplayButton.height);
			this.gameplayButton.attr({
				"x":this.buttonWidth*5/2,
				"y":this.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.gameplayButton);*/
		}
		else if(this.curTabName == "friends")
		{
			this.friendsButton.runAction(shrinkAction);
			/*this.removeChild(this.friendsButton);
			this.friendsButton = new cc.Sprite(res.friends_button);
			this.friendsButton.setScaleX(this.appWidth/this.friendsButton.width);
			this.friendsButton.setScaleY(this.appWidth/this.friendsButton.height);
			this.friendsButton.attr({
				"x":this.buttonWidth*7/2,
				"y":this.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.friendsButton);*/
		}
		else if(this.curTabName == "league")
		{
			this.leagueButton.runAction(shrinkAction);
			/*this.removeChild(this.leagueButton);
			this.leagueButton = new cc.Sprite(res.league_button);
			this.leagueButton.setScaleX(this.appWidth/this.leagueButton.width);
			this.leagueButton.setScaleY(this.appWidth/this.leagueButton.height);
			this.leagueButton.attr({
				"x":this.buttonWidth*9/2,
				"y":this.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.leagueButton);*/
		}
		
		
		
		if(code == "me")
		{
			this.meButton.runAction(growAction);
			/*this.removeChild(this.meButton);
			this.meButton = new cc.Sprite(res.me_selected_button);
			this.meButton.setScaleX(this.appWidth/this.meButton.width);
			this.meButton.setScaleY(this.appWidth/this.meButton.height);
			this.meButton.attr({
				"x":this.buttonWidth/2,
				"y":this.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.meButton);*/
		}
		else if(code == "challenge")
		{
			this.challengeMenuButton.runAction(growAction);
			/*this.removeChild(this.challengeMenuButton);
			this.challengeMenuButton = new cc.Sprite(res.challenge_selected_button);
			this.challengeMenuButton.setScaleX(this.appWidth/this.challengeMenuButton.width);
			this.challengeMenuButton.setScaleY(this.appWidth/this.challengeMenuButton.height);
			this.challengeMenuButton.attr({
				"x":this.buttonWidth*3/2,
				"y":this.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.challengeMenuButton);*/
		}
		else if(code == "gameplay")
		{
			this.playButton.runAction(growAction);
			/*this.removeChild(this.playButton);
			this.playButton = new cc.Sprite(res.play_selected_button);
			this.playButton.setScaleX(this.appWidth/this.playButton.width);
			this.playButton.setScaleY(this.appWidth/this.playButton.height);
			this.playButton.attr({
				"x":this.buttonWidth*5/2,
				"y":this.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.playButton);*/
		}
		else if(code == "friends")
		{
			this.friendsButton.runAction(growAction);
			/*this.removeChild(this.friendsButton);
			this.friendsButton = new cc.Sprite(res.friends_selected_button);
			this.friendsButton.setScaleX(this.appWidth/this.friendsButton.width);
			this.friendsButton.setScaleY(this.appWidth/this.friendsButton.height);
			this.friendsButton.attr({
				"x":this.buttonWidth*7/2,
				"y":this.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.friendsButton);*/
		}
		else if(code == "league")
		{
			this.leagueButton.runAction(growAction);
			/*this.removeChild(this.leagueButton);
			this.leagueButton = new cc.Sprite(res.league_selected_button);
			this.leagueButton.setScaleX(this.appWidth/this.leagueButton.width);
			this.leagueButton.setScaleY(this.appWidth/this.leagueButton.height);
			this.leagueButton.attr({
				"x":this.buttonWidth*9/2,
				"y":this.height/2,
				"anchorX":.5,
				"anchorY":.5
			});
			this.addChild(this.leagueButton);*/
		}
		
		this.curTabName = code;
	},
	
	onTouchEnd:function(pos)
	{
		if(pos.x > 0 && pos.x < this.buttonWidth)
		{
			return "me";
		}
		else if(pos.x > this.buttonWidth && pos.x < this.buttonWidth*2)
		{
			return "challenge";
		}
		else if(pos.x > this.buttonWidth*2 && pos.x < this.buttonWidth*3)
		{
			return "gameplay";
		}
		else if(pos.x > this.buttonWidth*3 && pos.x < this.buttonWidth*4)
		{
			return "league";
		}
		else if(pos.x > this.buttonWidth*4 && pos.x < this.buttonWidth*5)
		{
			return "friends";
		}
		
	}
	
});
