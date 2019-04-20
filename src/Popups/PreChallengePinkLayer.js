var PreChallengePinkLayer = cc.Layer.extend({
	ctor:function(challengeIndex, width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.challengeIndex = challengeIndex;
		
		
		// rocket booster tutorial
		this.bgImage = new cc.Sprite(res.pink_phone_up);
		this.bgImage.setScaleX(this.width / this.bgImage.width);
		this.bgImage.setScaleY(this.height / this.bgImage.height);
		this.bgImage.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bgImage);
		
		
		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		cc.log(this.x + " " + this.y + "   " + this.width + " " + this.height);
		this.addChild(this.dn);
		
		this.preBoosterABool = false;
		
		
		
		//this.blinkerOpacity = 255;
		
		
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
        
		var bubbles = [];
		//if(DATA.levelIndexAType == "normal")
		//{
			bubbles = DATA.challenges[this.challengeIndex].bubbles;
		//}
		/*else
		{
			bubbles = DATA.setChallenges["one-pager"][this.challengeIndex].bubbles;
		}*/
		var maxRow = 0;
    	var bubbleData = [];
    	for(var i=0; i<bubbles.length; i++)
    	{
   			if(bubbles[i].row > maxRow)
    			maxRow = bubbles[i].row;
    	}
		
		/*
		this.bubblePreview = new BubbleLayer(bubbles,maxRow+1,10,"preview",(this.width)*.81,(this.width*.81 / 12)*(Math.pow(3,.5)/2 )*11, []);
		this.bubblePreview.attr({
			x:this.width*.092,
			y:this.height-this.bubblePreview.height-(this.height*.14),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubblePreview);
		
		this.previewDraw = new cc.DrawNode();
		this.previewDraw.drawRect(cc.p(this.bubblePreview.x,this.bubblePreview.y+this.bubblePreview.height),cc.p(this.bubblePreview.x+this.bubblePreview.width,this.bubblePreview.y+this.bubblePreview.height+DATA.bubbleR),cc.color(45,45,45,255),0,cc.color(45,45,45,255));
		this.addChild(this.previewDraw,11);
		*/
		
		this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":this.width*.092,
        	"y":this.height-(this.height*.14) ,
        	"anchorX":.5,
        	"anchorY":.5
        });
		this.addChild(this.closeButton,12);
		
		
		this.levelType = DATA.levelIndexAType;
		
		
		/*var headerString = "Shot at Love";
		this.levelHeader = new cc.LabelTTF(headerString,"Arial",36);
		this.levelHeader.attr({
			x:this.width/2,
			y:this.height*.86+2,
			anchorX:.5,
			anchorY:0
		});
		this.levelHeader.color = cc.color(0,0,0,255);
		this.addChild(this.levelHeader);*/
		
		this.headerImg = new cc.Sprite(res.shot_at_love_head);
		this.headerImg.setScale((this.height*.092)*.9 / this.headerImg.height);
		this.headerImg.attr({
			x:this.width/2,
			y:this.height*.86 + (this.height*.092)*.5,
			anchorX:.5,
			anchorY:.3
		});
		this.addChild(this.headerImg);
		
		
		this.characterEmoji = new cc.Sprite(res.anguished_emoji);
		this.characterEmoji.setScale( (this.width*.816)*.25 / this.characterEmoji.width);
		this.characterEmoji.attr({
			x:this.width*2/3,
			y:this.height*.86 - 25,//this.height*.5 + (this.characterEmoji.height*this.characterEmoji.scale)/2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.characterEmoji);
	
		this.loveEmoji = new cc.Sprite(res.pink_smirk_emoji);
		this.loveEmoji.setScale( (this.width*.816)*.25 / this.loveEmoji.width);
		this.loveEmoji.attr({
			x:this.width*1/3,
			y:this.height*.86 - 25,//this.height*.5 + (this.loveEmoji.height*this.loveEmoji.scale)/2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.loveEmoji);
		
		this.modeTextA = new cc.LabelTTF("You have 1 try to","Arial",24);
		this.modeTextA.color = cc.color(0,0,0,255);
		this.modeTextA.attr({
			x:this.width/2,
			y:this.loveEmoji.y-(this.loveEmoji.height*this.loveEmoji.scale)-15,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.modeTextA);
		
		this.modeTextB = new cc.LabelTTF("earn a big reward!","Arial",24);
		this.modeTextB.color = cc.color(0,0,0,255);
		this.modeTextB.attr({
			x:this.width/2,
			y:this.modeTextA.y-this.modeTextA.height-1,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.modeTextB);
		
		this.progressBar = {
			x:this.width*.092 + 4, y:this.height*.14 + 4, 
			width:(this.width*.816)-8, height:(this.modeTextB.y-this.modeTextB.height) - (this.height*.14 + 25)
			//width:(this.width*.816)*.07, height:(this.modeTextB.y-this.modeTextB.height) - (this.height*.14 + 25)
		};
		this.draw();
		
		this.medalAImg = new cc.Sprite(res.pink_love_emoji);
		this.medalAImg.setScale((this.width*.816)*.2 / this.medalAImg.width);
		this.medalAImg.attr({
			x:this.progressBar.x+5,
			y:this.progressBar.y + this.progressBar.height*.82,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.medalAImg);
		
		this.medalBImg = new cc.Sprite(res.pink_kiss_emoji);
		this.medalBImg.setScale((this.width*.816)*.2 / this.medalBImg.width);
		this.medalBImg.attr({
			x:this.progressBar.x+5,
			y:this.progressBar.y + this.progressBar.height*.5,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.medalBImg);
		
		this.medalCImg = new cc.Sprite(res.pink_blush_emoji);
		this.medalCImg.setScale((this.width*.816)*.2 / this.medalCImg.width);
		this.medalCImg.attr({
			x:this.progressBar.x+5,
			y:this.progressBar.y + this.progressBar.height*.18,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.medalCImg);
		
		
		
		
		this.rewardAImg = new cc.Sprite(res.regular_chest);
		this.rewardAImg.setScale((this.width*.816)*.2 / this.rewardAImg.height);
		this.rewardAImg.attr({
			x:this.medalAImg.x+(this.medalAImg.width*this.medalAImg.scale)+5,
			y:this.medalAImg.y,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.rewardAImg);
		
		this.rewardBImg = new cc.Sprite(res.card_back);
		this.rewardBImg.setScale((this.width*.816)*.2 / this.rewardBImg.height);
		this.rewardBImg.attr({
			x:this.medalBImg.x+(this.medalBImg.width*this.medalBImg.scale)+5,
			y:this.medalBImg.y,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.rewardBImg);
		
		this.rewardCImg = new cc.Sprite(res.coin);
		this.rewardCImg.setScale((this.width*.816)*.2 / this.rewardCImg.height);
		this.rewardCImg.attr({
			x:this.medalCImg.x+(this.medalCImg.width*this.medalBImg.scale)+5,
			y:this.medalCImg.y,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.rewardCImg);
		
		
		this.taskALabel = new cc.LabelTTF("14 moves", "Arial",22);
		this.taskALabel.attr({
			x:this.rewardAImg.x+(this.rewardAImg.width*this.rewardAImg.scale)+15,
			y:this.rewardAImg.y,
			anchorX:0,
			anchorY:.5
		});
		this.taskALabel.color = cc.color(0,0,0,255);
		this.addChild(this.taskALabel);
		
		this.taskBLabel = new cc.LabelTTF("17 moves", "Arial",22);
		this.taskBLabel.attr({
			x:this.taskALabel.x,
			y:this.rewardBImg.y,
			anchorX:0,
			anchorY:.5
		});
		this.taskBLabel.color = cc.color(0,0,0,255);
		this.addChild(this.taskBLabel);
		
		this.taskCLabel = new cc.LabelTTF("20 moves", "Arial",22);
		this.taskCLabel.attr({
			x:this.taskALabel.x,
			y:this.rewardCImg.y,
			anchorX:0,
			anchorY:.5
		});
		this.taskCLabel.color = cc.color(0,0,0,255);
		this.addChild(this.taskCLabel);
		
		
		
		
	
		/*
		var numMoves = 0;
		
		numMoves = DATA.challenges[this.challengeIndex].moves;
		
		
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
		*/
		
		/*
		this.tryAlert = null;
		if(DATA.streakStep==DATA.challengeTries)
		{
			this.tryAlert = new cc.Sprite(res.last_try_card);
			this.tryAlert.setScale(this.width*.25 / this.tryAlert.width);
			this.tryAlert.attr({
				x:this.width*.092+5,
				y:this.height*.14+5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.tryAlert);
		}
		else if(DATA.challengeTries == 0)
		{
			this.tryAlert = new cc.Sprite(res.first_try_card);
			this.tryAlert.setScale(this.width*.25 / this.tryAlert.width);
			this.tryAlert.attr({
				x:this.width*.092+5,
				y:this.height*.14+5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.tryAlert);
		}
		else
		{
			this.tryAlert = new cc.Sprite(res.card_back);
			this.tryAlert.setScale(this.width*.25 / this.tryAlert.width);
			this.tryAlert.attr({
				x:this.width*.092+5,
				y:this.height*.14+5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.tryAlert);
		}
		*/
		
		/*
		this.levelMovesNumber = new cc.LabelTTF(""+DATA.challenges[this.challengeIndex].moves, "Arial", 36);
		this.levelMovesNumber.attr({
			"x":this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale)/2,
			"y":this.bubblePreview.y-2,
			"anchorX":.5,
			"anchorY":1
		});
		this.levelMovesNumber.color = cc.color(0,0,0,255);
		this.addChild(this.levelMovesNumber,12);
		
		this.levelMovesLabel = new cc.LabelTTF("moves", "Arial", 20);
		this.levelMovesLabel.attr({
			"x":this.levelMovesNumber.x,
			"y":this.levelMovesNumber.y-(this.levelMovesNumber.height*this.levelMovesNumber.scale)-1,
			"anchorX":.5,
			"anchorY":.5
		});
		this.levelMovesLabel.color = cc.color(0,0,0,255);
		this.addChild(this.levelMovesLabel,12);
		*/
		
		
		
		/*
		var xSpace = this.width*.908 - (this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale));
		var borderSpace = (.1*xSpace)/4;
		xSpace *= .9; // space between;
		var mB = 1.25; // how much bigger are circles
		var mC = 1.5;
		var spaceA = xSpace / (1 + mB + mC);
		var spaceB = spaceA * mB;
		var spaceC = spaceA * mC;
		
		//var circleY = this.tryAlert.y+(this.tryAlert.height*this.tryAlert.scale)/2;
		var circleY = this.tryAlert.y+spaceC/2;
		
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
		
		this.faceA = null;
		this.faceB = null;
		this.faceC = null;
		
		// Face 1
		var yOffset = 0;
		if(DATA.streakStep == 0)
		{
			this.faceA = new cc.Sprite(res.concerned_face);
			this.faceA.setScale(spaceA / this.faceA.width);
		}
		else if(DATA.streakStep == 1)
		{
			this.faceA = new cc.Sprite(res.sunglass_face);
			this.faceA.setScale(spaceA / this.faceA.width);
		}
		else if(DATA.streakStep == 2)
		{
			this.faceA = new cc.Sprite(res.crown_face);
			this.faceA.setScale(spaceA / this.faceA.width);
			yOffset = this.faceA.height*this.faceA.scale*.16;
		}
		this.faceA.attr({
			x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + spaceA/2 + borderSpace,
			y:circleY+yOffset,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.faceA);
		//this.dn.drawDot({x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + spaceA/2 + borderSpace, y:circleY}, spaceA/2, circleColor);
		
		// Face 2
		yOffset = 0;
		if(DATA.streakStep == 0)
		{// black dot
			this.dn.drawDot({x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + (spaceA+(spaceB/2)) + borderSpace*2, y:circleY}, spaceB/2, cc.color(0,0,0,255));
		}
		else if((DATA.streakStep == 1 && DATA.challengeTries == 1) || (DATA.streakStep == 2 && DATA.challengeTries == 2))
		{// sad face
			
		}
		else
		{// other face
			if(DATA.streakStep == 1)
			{
				this.faceB = new cc.Sprite(res.sunglass_face);
				this.faceB.setScale(spaceB / this.faceB.width);
			}
			else if(DATA.streakStep == 2)
			{
				this.faceB = new cc.Sprite(res.crown_face);
				this.faceB.setScale(spaceB / this.faceB.width);
				yOffset = this.faceB.height*this.faceB.scale*.16;
			}
			
			this.faceB.attr({
				x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + spaceA + spaceB/2 + borderSpace*2,
				y:circleY+yOffset,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.faceB);
		}
		
			
		// Face 3
		
		if(DATA.streakStep < 2)
		{// black dot
			this.dn.drawDot({x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, cc.color(0,0,0,255));
		}
		else if(DATA.streakStep == 2 && DATA.challengeTries >= 1)
		{// sad face
			
		}
		else
		{// other face
			this.faceC = new cc.Sprite(res.crown_face);
			
			
			this.faceC.setScale(spaceC / this.faceC.width);
			this.faceC.attr({
				x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + spaceA + spaceB + spaceC/2 + borderSpace*3,
				y:circleY + this.faceC.height*this.faceC.scale*.16,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.faceC);
		}
			
		if(DATA.streakStep == 2 && DATA.challengeTries == 0)
		{
			this.dn.drawDot({x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, circleColor);
		}
		else if(DATA.streakStep == 2)
		{
			this.dn.drawDot({x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, cc.color(100,100,100,255));
		}
		else 
		{
			this.dn.drawDot({x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, cc.color(0,0,0,255));
		}
		
		*/
		
		/*
		var streakNumText = ""+DATA.streakStep;
		if(DATA.streakStep == 2)
			streakNumText = "MAX";
		this.streakText = new cc.LabelTTF("Streak: "+streakNumText, "Arial", 18);
		this.streakText.color = cc.color(0,0,0,255);
		this.streakText.attr({
			//x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale)+4,
			x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale) + spaceA+(spaceB/2)+(borderSpace*2),
			y:this.tryAlert.y+(this.tryAlert.height*this.tryAlert.scaleY)-10,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.streakText);
		*/
		
		/*
		this.preBoosterHeadLabel = new cc.LabelTTF("Boosters", "Arial", 18);
		this.preBoosterHeadLabel.attr({
			x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale)+4 + (this.width*.81 - ((this.tryAlert.width*this.tryAlert.scale)+4))/2,
			y:this.bubblePreview.y+1,
			anchorX:.5,
			anchorY:1
		});
		this.preBoosterHeadLabel.color = cc.color(0,255,0,255);
		this.addChild(this.preBoosterHeadLabel);
		
		var preBoosterSize = (xSpace*.9)/3;
		
		this.preBoosterA = new cc.Sprite(res.pre_booster_moves);
		this.preBoosterA.setScale(preBoosterSize / this.preBoosterA.width);
		this.preBoosterA.attr({
			x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale)+4,
			y:this.preBoosterHeadLabel.y-this.preBoosterHeadLabel.height-1,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.preBoosterA);
		
		this.preBoosterACounter = new cc.LabelTTF(""+DATA.preBoosterInventoryA, "Roboto", 15);
		this.preBoosterACounter.attr({
			"x":this.preBoosterA.x+(this.preBoosterA.width*this.preBoosterA.scale)/2,
			"y":this.preBoosterA.y-1,
			"anchorX":.5,
			"anchorY":1
		});
		this.preBoosterACounter.color = cc.color(0,0,0,255);
		this.addChild(this.preBoosterACounter);
		*/	
		
		/*
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
				y:this.playButton.y-20+(this.playButton.height*this.playButton.scale/2),
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
		*/
		
			
	},

	onTouchEnd:function(pos)
	{cc.log("touchend");
	cc.log(this.closeButton.x + " to " + (this.closeButton.x+(this.closeButton.width*this.closeButton.scale)));
	cc.log(this.closeButton.y + " to " + (this.closeButton.y+(this.closeButton.height*this.closeButton.scale)));
		var loc = this.convertToNodeSpace(pos);cc.log(loc);
		if(this.posWithin(loc, 
			{"x":this.playButton.x-(this.playButton.width*this.playButton.scale)/2,
			"y":this.playButton.y,
			"width":this.playButton.width*this.playButton.scale,
			"height":this.playButton.height*this.playButton.scale})
		)
    	{
    		//var bubbles = DATA.getBubbles("challenge", this.challengeIndex);
    		var bubbles = [];
    		var numMoves = 0;
    		//if(DATA.levelIndexAType == "normal")
    		//{
    			bubbles = DATA.challenges[this.challengeIndex].bubbles;
    			numMoves = DATA.challenges[this.challengeIndex].moves;
    		//}
    		
    		var maxRow = 0;
    		var bubbleData = [];
    		for(var i=0; i<bubbles.length; i++)
    		{
    			if(bubbles[i].row > maxRow)
    				maxRow = bubbles[i].row;
    		}
			
			//if(DATA.levelIndexAType == "normal")
			//{
				DATA.setLevelQueue(DATA.challenges[this.challengeIndex].queue);
			//}
		
			var preBoosterArray = [];
			if(this.preBoosterABool)
				preBoosterArray.push("plus_five");
		
    		cc.director.runScene( new cc.TransitionSlideInB( 1.0, new ChallengeScene(bubbles, maxRow+1, numMoves, preBoosterArray) ) );
    	}
    	else if(this.posWithin(loc, 
    		{"x":this.closeButton.x-(this.closeButton.width*this.closeButton.scale)/2,
    		 "y":this.closeButton.y-(this.closeButton.height*this.closeButton.scale)/2,
    		 "width":this.closeButton.width*this.closeButton.scale,
    		 "height":this.closeButton.height*this.closeButton.scale})
    	)
    	{cc.log("close");
    		//if(DATA.worldIndex == 0 && DATA.worldBubbles.length > 0)
    		//{}
    		//else
    			return "close";
    	}
    	else if(this.posWithin(loc, {x:this.x+this.preBoosterA.x,
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
	},
	
	draw:function()
	{
		this.dn.drawRect(cc.p(this.progressBar.x, this.progressBar.y), 
						cc.p(this.progressBar.x+this.progressBar.width*.5, this.progressBar.y+this.progressBar.height*.333), cc.color(255,255,255,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.progressBar.x, this.progressBar.y+this.progressBar.height*.333), 
						cc.p(this.progressBar.x+this.progressBar.width*.5, this.progressBar.y+this.progressBar.height*.666), cc.color(255,255,255,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.progressBar.x, this.progressBar.y+this.progressBar.height*.666), 
						cc.p(this.progressBar.x+this.progressBar.width*.5, this.progressBar.y+this.progressBar.height), cc.color(255,255,255,255),4,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.progressBar.x+this.progressBar.width*.5, this.progressBar.y), 
						cc.p(this.progressBar.x+this.progressBar.width, this.progressBar.y+this.progressBar.height*.333), cc.color(255,255,255,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.progressBar.x+this.progressBar.width*.5, this.progressBar.y+this.progressBar.height*.333), 
						cc.p(this.progressBar.x+this.progressBar.width, this.progressBar.y+this.progressBar.height*.666), cc.color(255,255,255,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.progressBar.x+this.progressBar.width*.5, this.progressBar.y+this.progressBar.height*.666), 
						cc.p(this.progressBar.x+this.progressBar.width, this.progressBar.y+this.progressBar.height), cc.color(255,255,255,255),4,cc.color(0,0,0,255));
		
	}
	
});
