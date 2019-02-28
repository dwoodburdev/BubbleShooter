var PreChallengeLayer = cc.Layer.extend({
	ctor:function(challengeIndex, width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.challengeIndex = challengeIndex;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		cc.log(this.x + " " + this.y + "   " + this.width + " " + this.height);
		this.addChild(this.dn);
		
		this.preBoosterABool = false;
		
		
		
		this.blinkerOpacity = 255;
		
		
		this.playButton = new cc.Sprite(res.play_button_green);
		this.playButton.setScale((this.width/3)/this.playButton.width);
		this.playButton.attr({
			x:this.width/2,
			y:this.y+10,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.playButton);
		/*this.playButton = new Button(this.width/2, 25, "Play", 60, cc.color(0,255,0,255), cc.color(255,255,255,255));
        this.playButton.attr({
        	"anchorX":.5,
        	"anchorY":0
        });
        this.addChild(this.playButton);
        */
        this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":0,
        	"y":this.height-(this.closeButton.height*this.closeButton.scale),
        	"anchorX":0,
        	"anchorY":0
        });
		this.addChild(this.closeButton);
		
		var bubbles = [];
		if(DATA.levelIndexAType == "normal")
		{
			bubbles = DATA.challenges[this.challengeIndex].bubbles;
		}
		else
		{
			bubbles = DATA.setChallenges["one-pager"][this.challengeIndex].bubbles;
		}
		var maxRow = 0;
    	var bubbleData = [];
    	for(var i=0; i<bubbles.length; i++)
    	{
   			if(bubbles[i].row > maxRow)
    			maxRow = bubbles[i].row;
    	}
		this.bubblePreview = new BubbleLayer(bubbles,maxRow+1,10,"preview",(size.width-50)*.8,(this.height-50)*.5, []);
		this.bubblePreview.attr({
			x:this.x + (this.width-this.bubblePreview.width)/2,
			y:this.y + this.height-this.bubblePreview.height-50,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubblePreview);
		
		this.previewDraw = new cc.DrawNode();
		this.previewDraw.drawRect(cc.p(this.bubblePreview.x,this.bubblePreview.y+this.bubblePreview.height),cc.p(this.bubblePreview.x+this.bubblePreview.width,this.bubblePreview.y+this.bubblePreview.height+DATA.bubbleR),cc.color(255,255,255,255),0,cc.color(255,255,255,255));
		this.addChild(this.previewDraw,11);
		
		this.levelNameLabel = new cc.LabelTTF(DATA.challenges[this.challengeIndex].moves+" moves", "Roboto", 25);
		this.levelNameLabel.attr({
			"x":this.x+this.width-10,
			"y":this.bubblePreview.y+this.bubblePreview.height+1,
			"anchorX":1,
			"anchorY":0
		});
		this.levelNameLabel.color = cc.color(0,0,0,255);
		this.addChild(this.levelNameLabel,12);
		
		
	
	this.preBoosterA = null;
	this.preBoosterACounter = null;
	
		this.preBoosterA = new cc.Sprite(res.pre_booster_moves);
		this.preBoosterA.setScale(this.width/6 / this.preBoosterA.width);
		this.preBoosterA.attr({
			x:this.x+this.width/2 - (this.width/12),
			y:this.playButton.y+(this.playButton.height*this.playButton.scale)+(this.width/6),
			anchorX:0,
			anchorY:0
		});
	if(DATA.worldIndex > 0)
	{
		this.addChild(this.preBoosterA);
	}
		cc.log("PRE INVENTORY");cc.log(DATA.preBoosterInventoryA);
		this.preBoosterACounter = new cc.LabelTTF(""+DATA.preBoosterInventoryA, "Roboto", 15);
		this.preBoosterACounter.attr({
			"x":this.x+this.width/2,
			"y":this.preBoosterA.y + this.preBoosterA.height*this.preBoosterA.scale,
			"anchorX":.5,
			"anchorY":0
		});
		this.preBoosterACounter.color = cc.color(0,0,0,255);
	if(DATA.worldIndex > 0)
	{
		this.addChild(this.preBoosterACounter);
	}
		var numMoves = 0;
		if(DATA.levelIndexAType == "normal")
		{cc.log("normal");
			numMoves = DATA.challenges[this.challengeIndex].moves;
		}
		else if(DATA.levelIndexAType == "one-pager")
		{cc.log("one-pager");
			numMoves = DATA.setChallenges["one-pager"][this.challengeIndex].moves;
		}
		
		this.tabTitleLabel = null;
		if(DATA.worldIndex > 0 && this.bubblePreview.bubbles.length > 100)
		{
		this.tabTitleLabel = new cc.LabelTTF(numMoves+" moves", "Roboto", 35);
		this.tabTitleLabel.attr({
			"x":this.x+this.width/2,
			"y":this.bubblePreview.y-2,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		}
		
		var circleR = (this.preBoosterA.y - (this.playButton.y+(this.playButton.height*this.playButton.scale)) ) / 2;
		var circleY = (this.playButton.y+(this.playButton.height*this.playButton.scale)) + circleR;
		//circleR -= 2;
		circleR = 20;
		// Circles' lit color
		var circleColor = cc.color(255,0,0,255);
		if((DATA.streakStep == 1 && DATA.challengeTries == 0)
			|| (DATA.streakStep == 2 && DATA.challengeTries == 1))
		{
			circleColor = cc.color(255,255,0,255);
		}
		else if(DATA.streakStep == 2 && DATA.challengeTries == 0)
		{
			circleColor = cc.color(0,255,0,255);
		}
		
		this.dn.drawDot({x:this.x+this.width/2 - circleR*2 - 5, y:circleY}, circleR, circleColor);
		
		if((DATA.streakStep == 1 && DATA.challengeTries == 0) || (DATA.streakStep == 2 && DATA.challengeTries <= 1))
			this.dn.drawDot({x:this.x+this.width/2, y:circleY}, circleR, circleColor);
		else if(DATA.streakStep > 0)
			this.dn.drawDot({x:this.x+this.width/2, y:circleY}, circleR, cc.color(100,100,100,255));
		else
			this.dn.drawDot({x:this.x+this.width/2, y:circleY}, circleR, cc.color(0,0,0,255));
		
		//this.flashDn = null;
		if(DATA.streakStep == 0)
		{
			/*this.flashDn = new cc.DrawNode();
			this.flashDn.drawDot({x:this.x+this.width/2,y:circleY}, circleR, cc.color(255,255,0,this.blinkerOpacity));
			this.schedule(this.flashDn, .1);*/
			this.flashImg = new cc.Sprite(res.yellow_ui_circle);
			this.flashImg.setScale(circleR*2 / this.flashImg.width);
			this.flashImg.attr({
				x:this.x+this.width/2,
				y:circleY+2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.flashImg);
			
			
			var fadeOutAction = cc.FadeOut.create(.4);
			var fadeInAction = cc.FadeIn.create(.4);
			var seq = new cc.Sequence(fadeOutAction,fadeInAction);
			var repSeq = new cc.RepeatForever(seq);
			this.flashImg.runAction(repSeq);
		}
			
		if(DATA.streakStep == 2 && DATA.challengeTries == 0)
			this.dn.drawDot({x:this.x+this.width/2 + circleR*2 + 5, y:circleY}, circleR, circleColor);
		else if(DATA.streakStep == 2)
			this.dn.drawDot({x:this.x+this.width/2 + circleR*2 + 5, y:circleY}, circleR, cc.color(100,100,100,255));
		else this.dn.drawDot({x:this.x+this.width/2 + circleR*2 + 5, y:circleY}, circleR, cc.color(0,0,0,255));
		
		var playX = ((this.x+this.width/2 - circleR*2 - 5)-circleR);
		
		
		
		this.tryAlert = null;
		if(DATA.streakStep==DATA.challengeTries)
		{
			this.tryAlert = new cc.Sprite(res.last_try_card);
			this.tryAlert.setScale((playX*.8) / this.tryAlert.width);
			this.tryAlert.attr({
				x:playX*.1,
				y:circleY,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.tryAlert);
		}
		else if(DATA.challengeTries == 0)
		{
			this.tryAlert = new cc.Sprite(res.first_try_card);
			this.tryAlert.setScale((playX*.8) / this.tryAlert.width);
			this.tryAlert.attr({
				x:playX*.1,
				y:circleY,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.tryAlert);
		}
		else
		{
			this.tryAlert = new cc.Sprite(res.card_back);
			this.tryAlert.setScale((playX*.8) / this.tryAlert.width);
			this.tryAlert.attr({
				x:playX*.1,
				y:circleY,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(this.tryAlert);
		}
		
		this.puzzlePieceImg = null;
		this.puzzleNumberLabel = null;
		this.puzzleRewardImg = null;
		/*if(DATA.levelIndexAType != "normal")
		{
			this.puzzlePieceImg = new cc.Sprite(res.puzzle_piece);
			this.puzzlePieceImg.setScale(this.tryAlert.width*this.tryAlert.scale / this.puzzlePieceImg.width);
			this.puzzlePieceImg.attr({
				x:(this.x+this.width/2+circleR*3+5)+((this.x+this.width)-(this.x+this.width/2+circleR*3+5))/2,
				y:circleY,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.puzzlePieceImg);
			
			this.puzzleNumberLabel = new cc.LabelTTF("3/5","Roboto",24);
			this.puzzleNumberLabel.attr({
				x:this.puzzlePieceImg.x,
				y:this.puzzlePieceImg.y-(this.puzzlePieceImg.y-(this.puzzlePieceImg.height*this.puzzlePieceImg.scale*this.puzzlePieceImg.anchorY)),
				anchorX:.5,
				anchorY:1
			});
			this.puzzleNumberLabel.color = cc.color(0,0,0,255);
			this.addChild(this.puzzleNumberLabel);
			
			this.puzzleRewardImg = new cc.Sprite(res.regular_chest);
			this.puzzleRewardImg.setScale(this.puzzlePieceImg.width*this.puzzlePieceImg.scale/2 / this.puzzleRewardImg.width);
			this.puzzleRewardImg.attr({
				x:this.puzzlePieceImg.x,
				y:this.puzzlePieceImg.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.puzzleRewardImg);
		}*/
		this.popupDn = new cc.DrawNode();
		this.tutorialStreakTextA = null;
		this.tutorialStreakTextB = null;
		
		var textForTutorialA = null;
		var textForTutorialB = null;
		
		
		if(DATA.worldIndex == 0 && DATA.worldBubbles.length > 100)
		{
			var handAnim = new cc.Sprite(res.finger_point);
			handAnim.setScale( (this.playButton.height*this.playButton.scale)*1.5 / handAnim.width);
			handAnim.setFlippedX(true);
			handAnim.setRotation(270);
			handAnim.attr({
				x:this.playButton.x+(this.playButton.width*this.playButton.scale),
				y:this.playButton.y-20/*+(this.playButton.height*this.playButton.scale/2)*/,
				anchorX:0,
				anchorY:0
			});
			this.addChild(handAnim);
			
			var moveRightAction = cc.moveBy(.3,DATA.bubbleR*3,0);
			var moveLeftAction = cc.moveBy(.3,-DATA.bubbleR*3,0);
			var seq = new cc.Sequence(moveRightAction, moveLeftAction);
			var repSeq = new cc.RepeatForever(seq);
			handAnim.runAction(repSeq);
			
		}
		
		
		if(DATA.streakStep == 0)
		{
			
			textForTutorialA = "You only have ONE";
			textForTutorialB = "chance to win!";
			
		}
		else if(DATA.streakStep == 1)
		{
			if(DATA.challengeTries == 0)
			{
				textForTutorialA = "You have 2 tries because";
				textForTutorialB = "you have a STREAK!";
			}
			else if(DATA.challengeTries == 1)
			{
				textForTutorialA = "Oh no! If you lose you'll";
				textForTutorialB = "lose your streak!";
			}
			
		}
		else if(DATA.streakStep == 2)
		{
			if(DATA.challengeTries <= 1)
			{
				textForTutorialA = "You have 3 tries because";
				textForTutorialB = "of your MAX STREAK!";
			}
			else if(DATA.challengeTries == 2)
			{
				textForTutorialA = "Oh no! If you lose you'll";
				textForTutorialB = "lose your streak.";
			}
		}
		
		if(textForTutorialA != null)
		{
			//Tutorial Popup
			this.addChild(this.popupDn);
			var botPosY = 3+this.tryAlert.y+(this.tryAlert.height*this.tryAlert.scale)/2 + 3;
			this.dn.drawRect(cc.p(20,botPosY),
				cc.p(this.width-20, this.bubblePreview.y-3),
				cc.color(255,255,255,255),4,cc.color(0,0,0,255)
			);
				
			this.tutorialStreakTextA = new cc.LabelTTF(textForTutorialA,"Roboto",24);
			this.tutorialStreakTextA.attr({
				x:this.width/2,
				y:this.bubblePreview.y-10,
				anchorX:.5,
				anchorY:1
			});
			this.tutorialStreakTextA.color = cc.color(0,0,0,255);
			this.addChild(this.tutorialStreakTextA);
			this.tutorialStreakTextB = new cc.LabelTTF(textForTutorialB,"Roboto",24);
			this.tutorialStreakTextB.attr({
				x:this.width/2,
				y:this.tutorialStreakTextA.y-this.tutorialStreakTextA.height-3,
				anchorX:.5,
				anchorY:1
			});
			this.tutorialStreakTextB.color = cc.color(0,0,0,255);
			this.addChild(this.tutorialStreakTextB);
			
			if((DATA.streakStep == 1 && DATA.challengeTries == 1) || (DATA.streakStep == 2 && DATA.challengeTries == 2))
			{
				this.tutFace = new cc.Sprite(res.sad_emoji);
				var shakeLeftAct = cc.moveBy(.05,-3,0);
				var shakeRightAct = cc.moveBy(.05,3,0);
				var seq = new cc.Sequence(shakeLeftAct, shakeRightAct);
				var repSeq = new cc.RepeatForever(seq);
				this.tutFace.runAction(repSeq);
			}
			else
			{
				this.tutFace = new cc.Sprite(res.nerd_emoji);
				
			}
			
			this.tutFace.setScale(circleR*2.5 / this.tutFace.width);
			this.tutFace.attr({
				x:this.width-3,
				y:botPosY,
				anchorX:1,
				anchorY:.5
			});
			this.addChild(this.tutFace);
			
		}
			
			
	},
		
		/*this.xpRewardImg = null;
		if(DATA.streakStep == 0)
		{
			this.xpRewardImg = new cc.Sprite(res.bronze_xp_reward);
		}
		else if(DATA.streakStep == 1)
		{
			this.xpRewardImg = new cc.Sprite(res.silver_xp_reward);
		}
		else if(DATA.streakStep == 2)
		{
			this.xpRewardImg = new cc.Sprite(res.gold_xp_reward);
		}
		this.xpRewardImg.setScale(this.tryAlert.width*this.tryAlert.scale / this.xpRewardImg.width);
		this.xpRewardImg.attr({
			x:(this.x+this.width/2+circleR*3+5)+((this.x+this.width)-(this.x+this.width/2+circleR*3+5))/2,
			y:circleY,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.xpRewardImg);*/
	//},
	
	onTouchEnd:function(pos)
	{cc.log("touchend");cc.log(pos);cc.log(this.closeButton.x + " " + this.closeButton.y+ " " + this.closeButton.scale);
		if(this.posWithin(pos, {"x":this.playButton.x,"y":this.playButton.y,"width":this.playButton.width*this.playButton.scale,"height":this.playButton.height*this.playButton.scale}))
    	{
    		//var bubbles = DATA.getBubbles("challenge", this.challengeIndex);
    		var bubbles = [];
    		var numMoves = 0;
    		if(DATA.levelIndexAType == "normal")
    		{
    			bubbles = DATA.challenges[this.challengeIndex].bubbles;
    			numMoves = DATA.challenges[this.challengeIndex].moves;
    		}
    		else
    		{
    			bubbles = DATA.setChallenges["one-pager"][this.challengeIndex].bubbles;
    			numMoves = DATA.setChallenges["one-pager"][this.challengeIndex].moves;
    		}
    		
    		var maxRow = 0;
    		var bubbleData = [];
    		for(var i=0; i<bubbles.length; i++)
    		{
    			if(bubbles[i].row > maxRow)
    				maxRow = bubbles[i].row;
    		}
			
			if(DATA.levelIndexAType == "normal")
			{
				DATA.setLevelQueue(DATA.challenges[this.challengeIndex].queue);
			}
			else
			{
				DATA.setLevelQueue(DATA.setChallenges["one-pager"][this.challengeIndex].queue);
			}
		
			var preBoosterArray = [];
			if(this.preBoosterABool)
				preBoosterArray.push("plus_five")
		
    		cc.director.runScene(new ChallengeScene(bubbles, maxRow+1, numMoves, preBoosterArray));
    	}
    	else if(this.posWithin(pos, {"x":this.x+this.closeButton.x,"y":this.y+this.closeButton.y,"width":this.closeButton.width*this.closeButton.scale,"height":this.closeButton.height*this.closeButton.scale}))
    	{cc.log("close");
    		if(DATA.worldIndex == 0 && DATA.worldBubbles.length > 0)
    		{}
    		else
    			return "close";
    	}
    	else if(this.posWithin(pos, {x:this.x+this.preBoosterA.x,
    		y:this.y+this.preBoosterA.y,
    		width:this.preBoosterA.width*this.preBoosterA.scale,
    		height:this.preBoosterA.height*this.preBoosterA.scale}))
    	{
    		if(!this.preBoosterABool)
    		{
	    		if(DATA.preBoosterInventoryA > 0)
	    		{
	    			DATA.setPreBoosterInventories(DATA.preBoosterInventoryA-1);
	    			this.preBoosterACounter.setString(DATA.preBoosterInventoryA);
	    			
		    		this.preBoosterABool = true;
		    		
		    		this.removeChild(this.preBoosterA);
		    		this.preBoosterA = new cc.Sprite(res.pre_booster_moves_selected);
					this.preBoosterA.setScale(this.width/6 / this.preBoosterA.width);
					this.preBoosterA.attr({
						x:this.width/2 - (this.width/12),
						y:this.playButton.y+(this.playButton.height*this.playButton.scale)+(this.width/6),
						anchorX:0,
						anchorY:0
					});
					this.addChild(this.preBoosterA);
					return "prebooster";
				}
				else
				{
					return "buy-prebooster";
				}
			}
			else
			{
				DATA.preBoosterInventoryA++;
	    		this.preBoosterACounter.setString(DATA.preBoosterInventoryA);
	    			
				this.preBoosterABool = false;
				
				this.removeChild(this.preBoosterA);
	    		this.preBoosterA = new cc.Sprite(res.pre_booster_moves);
				this.preBoosterA.setScale(this.width/6 / this.preBoosterA.width);
				this.preBoosterA.attr({
					x:this.width/2 - (this.width/12),
					y:this.playButton.y+(this.playButton.height*this.playButton.scale)+(this.width/6),
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.preBoosterA);
			}
    	}
    	return null;
	},
	
	
	posWithin:function(pos, square)
	{
		if(pos.y > square.y && pos.y < square.y+square.height &&
			pos.x > square.x && pos.x < square.x+square.width)
			return true;
		return false;
	}
	
});
var PreChallengeScene = cc.Scene.extend({
	ctor:function(challengeIndex){
		this._super();
		this.challengeIndex = challengeIndex;
	},
	onEnter:function(){
		this._super();
		var layer = new PreChallengeLayer(this.challengeIndex);
		this.addChild(layer);
	}
});
