var PreChallengeLayer = cc.Layer.extend({
	ctor:function(challengeIndex, width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.challengeIndex = challengeIndex;
		
		
		// rocket booster tutorial
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
		
		
		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
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
		
		
		this.bubblePreview = new BubbleLayer(bubbles,maxRow+1,10,"preview",(this.width)*.81,(this.width*.81 / 12)*(Math.pow(3,.5)/2 )*11, []);
		this.bubblePreview.attr({
			x:/*this.x + (this.width-this.bubblePreview.width)/2*/ this.width*.092,
			y:/*this.y +*/ this.height-this.bubblePreview.height-(this.height*.14),
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubblePreview);
		
		this.previewDraw = new cc.DrawNode();
		this.previewDraw.drawRect(cc.p(this.bubblePreview.x,this.bubblePreview.y+this.bubblePreview.height),cc.p(this.bubblePreview.x+this.bubblePreview.width,this.bubblePreview.y+this.bubblePreview.height+DATA.bubbleR),cc.color(45,45,45,255),0,cc.color(45,45,45,255));
		this.addChild(this.previewDraw,11);
		
		
		this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":this.width*.092,
        	"y":this.height-(this.height*.14) /*+ (this.closeButton.height*this.closeButton.scale)*/,
        	"anchorX":.5,
        	"anchorY":.5
        });
		this.addChild(this.closeButton,12);
		
		
		this.levelType = DATA.levelIndexAType;
		
		
		var headerString = "Level";
		this.levelHeader = new cc.LabelTTF(headerString,"Arial",36);
		this.levelHeader.attr({
			x:this.width/2,
			y:this.height*.86+2,
			anchorX:.5,
			anchorY:0
		});
		this.levelHeader.color = cc.color(255,255,255,255);
		//this.addChild(this.levelHeader);
		
		
	
	

		var numMoves = 0;
		if(DATA.levelIndexAType == "normal")
		{cc.log("normal");
			numMoves = DATA.challenges[this.challengeIndex].moves;
		}
		/*else if(DATA.levelIndexAType == "one-pager")
		{cc.log("one-pager");
			numMoves = DATA.setChallenges["one-pager"][this.challengeIndex].moves;
		}*/
		
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
		}*/
		
		this.levelMovesNumber = new cc.LabelTTF(""+DATA.challenges[this.challengeIndex].moves, "Arial", 36);
		this.levelMovesNumber.attr({
			"x":this.width*.5,
			"y":this.bubblePreview.y-2,
			"anchorX":.5,
			"anchorY":1
		});
		this.levelMovesNumber.color = cc.color(0,0,0,255);
		this.addChild(this.levelMovesNumber,12);
		
		this.levelMovesLabel = new cc.LabelTTF("moves", "Arial", 20);
		this.levelMovesLabel.attr({
			"x":this.levelMovesNumber.x/*this.levelMovesNumber.x-(this.levelMovesNumber.width*this.levelMovesNumber.scale)/2*/,
			"y":this.levelMovesNumber.y-(this.levelMovesNumber.height*this.levelMovesNumber.scale)-1,
			"anchorX":.5,
			"anchorY":.5
		});
		this.levelMovesLabel.color = cc.color(0,0,0,255);
		this.addChild(this.levelMovesLabel,12);
		
		
		var xSpace = this.width*.908 - this.width*.25;
		var borderSpace = (.1*xSpace)/4;
		xSpace *= .9; // space between;
		var mB = 1.25; // how much bigger are circles
		var mC = 1.5;
		var spaceA = xSpace / (1 + mB + mC);
		var spaceB = spaceA * mB;
		var spaceC = spaceA * mC;
		//var startX = this.width*.908 - xSpace - borderSpace*4;
		var startX = this.width*.092 + (this.width*.816 - (xSpace+borderSpace*4))/2;
		
		this.winStreakVisLayer = new WinStreakVisLayer(this.width*.908-this.width*.25, spaceC, "pre");
		this.winStreakVisLayer.attr({
			x:startX,
			y:this.height*.14+5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.winStreakVisLayer);
		
		var tryText = " tries left";
		if(DATA.streakStep-DATA.challengeTries+1 == 1)
			tryText = " try left";
		this.triesTextLabel = new cc.LabelTTF(""+(DATA.streakStep-DATA.challengeTries+1)+tryText, "Arial",16);
		this.triesTextLabel.attr({
			x:this.width/2,
			y:this.winStreakVisLayer.y+this.winStreakVisLayer.height+1,
			anchorX:.5,
			anchorY:0
		});
		this.triesTextLabel.color = cc.color(0,0,0,255);
		this.addChild(this.triesTextLabel);
		
		/*
		var xSpace = this.width*.908 - this.width*.25;
		var borderSpace = (.1*xSpace)/4;
		xSpace *= .9; // space between;
		var mB = 1.25; // how much bigger are circles
		var mC = 1.5;
		var spaceA = xSpace / (1 + mB + mC);
		var spaceB = spaceA * mB;
		var spaceC = spaceA * mC;
		//var startX = this.width*.908 - xSpace - borderSpace*4;
		var startX = this.width*.092 + (this.width*.816 - (xSpace+borderSpace*4))/2;
		
		//var circleY = this.tryAlert.y+(this.tryAlert.height*this.tryAlert.scale)/2;
		var circleY = this.height*.14+spaceC/2;
		
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
			x:startX + spaceA/2 + borderSpace,
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
			this.dn.drawDot({x:startX + (spaceA+(spaceB/2)) + borderSpace*2, y:circleY}, spaceB/2, cc.color(0,0,0,255));
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
				x:startX + spaceA + spaceB/2 + borderSpace*2,
				y:circleY+yOffset,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.faceB);
		}
		
			
		// Face 3
		
		if(DATA.streakStep < 2)
		{// black dot
			this.dn.drawDot({x:startX + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, cc.color(0,0,0,255));
		}
		else if(DATA.streakStep == 2 && DATA.challengeTries >= 1)
		{// sad face
			
		}
		else
		{// other face
			this.faceC = new cc.Sprite(res.crown_face);
			
			
			this.faceC.setScale(spaceC / this.faceC.width);
			this.faceC.attr({
				x:startX + spaceA + spaceB + spaceC/2 + borderSpace*3,
				y:circleY + this.faceC.height*this.faceC.scale*.16,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.faceC);
		}
			
		if(DATA.streakStep == 2 && DATA.challengeTries == 0)
		{
			this.dn.drawDot({x:startX + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, circleColor);
		}
		else if(DATA.streakStep == 2)
		{
			this.dn.drawDot({x:startX + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, cc.color(100,100,100,255));
		}
		else 
		{
			this.dn.drawDot({x:startX + (spaceA+spaceB+(spaceC/2)) + borderSpace*3, y:circleY}, spaceC/2, cc.color(0,0,0,255));
		}
		*/
		
		
		
		var playX = ((this.x+this.width/2 - spaceC - 5)-(spaceC/2));
		
		
		/*
		var streakNumText = ""+DATA.streakStep;
		if(DATA.streakStep == 2)
			streakNumText = "MAX";
		this.streakText = new cc.LabelTTF("Streak: "+streakNumText, "Arial", 18);
		this.streakText.color = cc.color(0,0,0,255);
		this.streakText.attr({
			//x:this.tryAlert.x+(this.tryAlert.width*this.tryAlert.scale)+4,
			x:this.width*.25 + spaceA+(spaceB/2)+(borderSpace*2),
			y:this.tryAlert.y+(this.tryAlert.height*this.tryAlert.scaleY)-10,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.streakText);
		*/
		
		
		this.preBoosterHeadLabel = new cc.LabelTTF("Boosters", "Arial", 18);
		this.preBoosterHeadLabel.attr({
			x:this.width*.25+4 + (this.width*.81 - (this.width*.25+4))/2,
			y:this.bubblePreview.y+1,
			anchorX:.5,
			anchorY:1
		});
		this.preBoosterHeadLabel.color = cc.color(0,255,0,255);
		//this.addChild(this.preBoosterHeadLabel);
		
		var preBoosterSize = (xSpace*.9)/3;
		
		this.preBoosterA = new cc.Sprite(res.pre_booster_moves);
		this.preBoosterA.setScale(preBoosterSize / this.preBoosterA.width);
		this.preBoosterA.attr({
			x:this.width*.25+4,
			y:this.preBoosterHeadLabel.y-this.preBoosterHeadLabel.height-1,
			anchorX:0,
			anchorY:1
		});
		//this.addChild(this.preBoosterA);
		
		this.preBoosterACounter = new cc.LabelTTF(""+DATA.preBoosterInventoryA, "Roboto", 15);
		this.preBoosterACounter.attr({
			"x":this.preBoosterA.x+(this.preBoosterA.width*this.preBoosterA.scale)/2,
			"y":this.preBoosterA.y-1,
			"anchorX":.5,
			"anchorY":1
		});
		this.preBoosterACounter.color = cc.color(0,0,0,255);
		//this.addChild(this.preBoosterACounter);
			
		
		
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
		
		/*if(textForTutorialA != null)
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
			*/
			
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
    		if(DATA.levelIndexAType == "normal")
    		{
    			for(var i=0; i<DATA.challenges[this.challengeIndex].bubbles.length; i++)
    			{
    				var dBub = DATA.challenges[this.challengeIndex].bubbles[i];
			  		
			  		var colorCode = null;
			  		var metaData = null;
			  		if(dBub.type == 7)
			  		{
			  			colorCode = [];
			  			var colorKeys = Object.keys(dBub.colorCode);
			  			for(var j=0; j<colorKeys.length; j++)
			  			{
			  				colorCode.push(dBub.colorCode[colorKeys[j]]);
			  			}
			  		}
			  		else colorCode = dBub.colorCode;
			  		
			  		if(dBub.type == 20)
			  		{cc.log("star");
			  			if("id" in dBub.meta && dBub.meta.id != null)
			  			{cc.log("star with ID "+dBub.meta.id);
			  				metaData = dBub.meta;
			  			}
			  		}
			  		
			  		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:colorCode, binary:dBub.binary, meta:metaData};
    				bubbles.push(bubble);
    			}

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
