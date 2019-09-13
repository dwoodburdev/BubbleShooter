var ChallengeBottomUILayer = cc.Layer.extend({
	ctor:function(height,mode,boosters){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
		
        var size = cc.winSize;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		//this.width = w;
		this.height = height;
		this.mode = mode;
		if(this.mode == "normal")
			this.bgColor = cc.color(140,140,140,255);
		else if(this.mode == "challenge")
			this.bgColor = cc.color(255,164,180,255);
		else this.bgColor = cc.color(255,255,255,255);
		
		this.buttonWidth = size.width/5;
		this.buttonHeight = this.height;
		
		this.boosters = boosters;cc.log(this.boosters);
		this.boosterFlags = {};
		
		this.tutorialType = null;
		this.tutPointer = null;
		
		var curX = 0;
		
		for(var i=0; i<this.boosters.length; i++)
		{
			if(this.boosters[i] == 0)
			{
				this.boosterAImg = new cc.Sprite(res.in_booster_bomb);
				this.boosterAImg.setScale(this.height*.75 / this.boosterAImg.height);
				this.boosterAImg.attr({
					"x":curX,
					"y":this.height,
					"anchorX":0,
					"anchorY":1
				});
				this.addChild(this.boosterAImg);
				
				this.boosterACounter = new cc.LabelTTF(""+DATA.boosterInventoryA, "Roboto", 15);
				this.boosterACounter.attr({
					"x":this.boosterAImg.x + this.boosterAImg.width*this.boosterAImg.scale/2,
					"y":this.boosterAImg.y - (this.boosterAImg.height*this.boosterAImg.scale)-1,
					"anchorX":.5,
					"anchorY":1
				});
				this.boosterACounter.color = cc.color(0,0,0,255);
				this.addChild(this.boosterACounter);
				this.boosterFlags["0"] = true;
				curX += this.boosterAImg.width*this.boosterAImg.scale + 1;
			}
			else if(this.boosters[i] == 1)
			{
				this.boosterBImg = new cc.Sprite(res.in_booster_beachball);
				this.boosterBImg.setScale(this.height*.75 / this.boosterBImg.height);
				this.boosterBImg.attr({
					"x":curX,
					"y":this.height,
					"anchorX":0,
					"anchorY":1
				});
				this.addChild(this.boosterBImg);
				
				this.boosterBCounter = new cc.LabelTTF(""+DATA.boosterInventoryB, "Roboto", 15);
				this.boosterBCounter.attr({
					"x":this.boosterBImg.x + this.boosterBImg.width*this.boosterBImg.scale/2,
					"y":this.boosterBImg.y - (this.boosterBImg.height*this.boosterBImg.scale)-1,
					"anchorX":.5,
					"anchorY":1
				});
				this.boosterBCounter.color = cc.color(0,0,0,255);
				this.addChild(this.boosterBCounter);
				this.boosterFlags["1"] = true;
				curX += this.boosterBImg.width*this.boosterBImg.scale + 1;
			}
			else if(this.boosters[i] == 2)
			{
				this.boosterCImg = new cc.Sprite(res.in_booster_rocket);
				this.boosterCImg.setScale(this.height*.75 / this.boosterCImg.height);
				
				if(DATA.levelIndexAType == "challenge" && DATA.levelIndexA == 5)
				{
					curX += (this.boosterCImg.width*this.boosterCImg.scale+1)*2;
				}
				
				this.boosterCImg.attr({
					"x":curX,
					"y":this.height,
					"anchorX":0,
					"anchorY":1
				});
				this.addChild(this.boosterCImg);
				
				if(DATA.levelIndexAType == "challenge" && DATA.levelIndexA == 5)
				{
					this.tutorialType = "point";
					this.addBoosterPointer();
				}
				
				this.boosterCCounter = new cc.LabelTTF(""+DATA.boosterInventoryC, "Roboto", 15);
				this.boosterCCounter.attr({
					"x":this.boosterCImg.x + this.boosterCImg.width*this.boosterCImg.scale/2,
					"y":this.boosterCImg.y - (this.boosterCImg.height*this.boosterCImg.scale)-1,
					"anchorX":.5,
					"anchorY":1
				});
				this.boosterCCounter.color = cc.color(0,0,0,255);
				this.addChild(this.boosterCCounter);
				this.boosterFlags["2"] = true;
				curX += this.boosterCImg.width*this.boosterCImg.scale + 1;
			}
		}
		
		
		this.draw();
	},
	
	nextMoveReady:function()
	{
		if(DATA.levelIndexAType == "challenge" && DATA.levelIndexA == 5 && this.tutPointer == null)
		{
			this.addBoosterPointer();
		}
	},
	
	addBoosterPointer:function()
	{cc.log("add pointer");
		var boosterWidth = 0;
		var boosterY = 0;
		var xStart = 0;
		var xEnd = 0;
		if(DATA.levelIndexAType == "challenge" && DATA.levelIndexA == 5)
		{cc.log("calc pointer stuff");
			boosterWidth = this.boosterCImg.width*this.boosterCImg.scale;
			boosterHeight = this.boosterCImg.height*this.boosterCImg.scale;
			boosterY = this.boosterCImg.y;
			xStart = this.boosterCImg.x+ boosterWidth + 1;
			xEnd = xStart + boosterWidth
		}
		this.tutPointer = new cc.Sprite(res.tutorial_arrow_left);
		this.tutPointer.setScale(boosterHeight / this.tutPointer.height);
		this.tutPointer.attr({
			x:xStart,
			y:boosterY,
			anchorX:0,
			anchorY:1
		});cc.log(this.tutPointer);
		this.addChild(this.tutPointer);
		var moveSeq = new cc.Sequence(cc.moveTo(.3, this.tutPointer.x+(this.tutPointer.width*this.tutPointer.scale), this.tutPointer.y), 
										cc.moveTo(.6, this.tutPointer.x, this.tutPointer.y));
		this.tutPointer.runAction(new cc.RepeatForever(moveSeq));
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), this.bgColor,1,cc.color(0,0,0,255));
		
	},
	
	selectButton:function(code)
	{
		/*if(code == "me")
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
		}*/
		
	},
	
	onTouchEnd:function(pos)
	{cc.log(pos);
		if("0" in this.boosterFlags && FUNCTIONS.posWithinScaled(pos, this.boosterAImg))
		{cc.log("beachball");
			if(DATA.boosterInventoryA > 0)
			{
				DATA.boosterInventoryA--;
				return "beachball-booster";
			}
			else
			{
				return "beachball-booster-empty";
			}
		}
		else if("1" in this.boosterFlags && FUNCTIONS.posWithinScaled(pos, this.boosterBImg))
		{cc.log("bomb");
			if(DATA.boosterInventoryB > 0)
			{
				DATA.boosterInventoryB--;
				return "bomb-booster";
			}
			else
			{
				return "bomb-booster-empty";
			}
		}
		else if("2" in this.boosterFlags && FUNCTIONS.posWithinScaled(pos, this.boosterCImg))
		{cc.log("rocket");
		
			if(this.tutorialType == "point")
			{
				this.tutPointer.stopAllActions();
				this.removeChild(this.tutPointer);
				this.tutPointer = null;
			}
		
		
			if(DATA.boosterInventoryC > 0)
			{
				DATA.boosterInventoryC--;
				return "rocket-booster";
			}
			else
			{
				return "rocket-booster-empty";
			}
		}
		
		
	}
	
});
