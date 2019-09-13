var LevelList = cc.Layer.extend({
	ctor:function(width, height, editorData){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
       	this.features = editorData.features;
       	this.streak = editorData.streak;cc.log(editorData);
       	this.numStars = editorData.numStars;
       	this.numLevelsBeat = editorData.numLevelsBeat;
       	this.challengeTries = editorData.challengeTries;
       	this.userLevels = editorData.userLevels;
       	this.resetTime = editorData.resetTime;
       
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(215,215,215,255), 0, cc.color(0,0,0,255));
		
		this.selectedIndex = 0;
		
		var topButtonWidth = this.width / 6;
		
		
		this.worldImg = new cc.Sprite(res.world_button);
		this.worldImg.setScale(this.width/5 / this.worldImg.width);
		this.worldImg.attr({
			x:5,
			y:this.height-5 - 10,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.worldImg);
		
		this.titleTextA = new cc.LabelTTF("World", "HeaderFont", 12);
		this.titleTextA.color = cc.color(0,0,0,255);
		this.titleTextA.attr({
			x:this.worldImg.x+(this.worldImg.width*this.worldImg.scale/2),
			y:this.height-5-(this.worldImg.height*this.worldImg.scale*( (this.width/6)/(this.width/5) ) )-3,
			anchorX:.5,
			anchorY:1
		});
		//this.addChild(this.titleTextA);
		
		this.dailyImg = new cc.Sprite(res.trend_button);
		this.dailyImg.setScale(this.width/6 / this.dailyImg.width);
		this.dailyImg.attr({
			x:this.width*.3,
			y:this.height-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.dailyImg, 1);
		
		this.titleTextB = new cc.LabelTTF("Daily", "HeaderFont", 12);
		this.titleTextB.color = cc.color(0,0,0,255);
		this.titleTextB.attr({
			x:this.dailyImg.x,
			y:this.dailyImg.y-(this.dailyImg.height*this.dailyImg.scale)-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleTextB);
		
		//this.vidsImg = new cc.Sprite(res.friends_button);
		this.vidsImg = new cc.Sprite(res.task_button);
		this.vidsImg.setScale(this.width/6 / this.vidsImg.width);
		this.vidsImg.attr({
			x:this.width*.5,
			y:this.height-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.vidsImg, 1);
		
		this.titleTextC = new cc.LabelTTF("Quests", "HeaderFont", 12);
		this.titleTextC.color = cc.color(0,0,0,255);
		this.titleTextC.attr({
			x:this.vidsImg.x,
			y:this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale)-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleTextC);
		
		this.ranksImg = new cc.Sprite(res.league_button);
		this.ranksImg.setScale(this.width/6 / this.ranksImg.width);
		this.ranksImg.attr({
			x:this.width*.7,
			y:this.height-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.ranksImg);
		
		this.titleTextD = new cc.LabelTTF("Events", "HeaderFont", 12);
		this.titleTextD.color = cc.color(0,0,0,255);
		this.titleTextD.attr({
			x:this.ranksImg.x,
			y:this.ranksImg.y-(this.ranksImg.height*this.ranksImg.scale)-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleTextD);
		
		this.folderImg = new cc.Sprite(res.friends_button);
		this.folderImg.setScale(this.width/6 / this.folderImg.width);
		this.folderImg.attr({
			x:this.width-5,
			y:this.height-5,
			anchorX:1,
			anchorY:1
		});
		this.addChild(this.folderImg, 1);
		
		this.titleTextE = new cc.LabelTTF("Friends", "HeaderFont", 12);
		this.titleTextE.color = cc.color(0,0,0,255);
		this.titleTextE.attr({
			x:this.folderImg.x-(this.folderImg.width*this.folderImg.scale/2),
			y:this.folderImg.y-(this.folderImg.height*this.folderImg.scale)-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleTextE);
		/*
		this.listHeader = new FriendListHeader(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.3));
		this.listHeader.attr({
			x:this.width*.025,
			y:this.titleTextA.y-this.titleTextA.height-3-this.listHeader.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listHeader);
		
		//this.listLayer = new ListLayer(this.width*.9, this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale)-10 );
		this.listLayer = new FriendListLayer(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.7));
		this.listLayer.attr({
			x:this.width*.025,
			y:this.listHeader.y-6-this.listLayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listLayer);
		*/
		//this.addTrendsUI();
		this.addWorldUI();
	},
	
	onTouchEnded:function(pos)
	{cc.log(pos);cc.log(this.parent);
		
		if(pos.x > this.worldImg.x && pos.x < this.worldImg.x+(this.worldImg.width*this.worldImg.scale)
			&& pos.y < this.worldImg.y && pos.y > this.worldImg.y-(this.worldImg.height*this.worldImg.scale)
			&& this.selectedIndex != 0)
		{
			//this.parent.parent.playType = "feature";
			cc.log("FEATURED CLICKED");
			var yLow = 0;
			var yHigh = 0;
			if(this.selectedIndex == 1)
			{
				yLow = this.dailyImg.y-(this.dailyImg.height*this.dailyImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.dailyImg.scale, .833*this.dailyImg.scale);
				var moveA = cc.moveTo(.25, this.dailyImg.x, this.worldImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.dailyImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextB.x, yHigh));
				//this.titleTextB.runAction(moveA);
				this.addChild(this.titleTextB);
				
				this.removeDailyUI();
			}
			else if(this.selectedIndex == 2)
			{
				yLow = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.vidsImg.scale, .833*this.vidsImg.scale);
				var moveA = cc.moveTo(.25, this.vidsImg.x, this.dailyImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.vidsImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextC.x, yHigh));
				//this.titleTextC.runAction(moveA);
				this.addChild(this.titleTextC);
				
				this.removeVidsUI();
			}
			else if(this.selectedIndex == 3)
			{
				yLow = this.ranksImg.y-(this.ranksImg.height*this.ranksImg.scale);
				yHigh = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.ranksImg.scale, .833*this.ranksImg.scale);
				var moveA = cc.moveTo(.25, this.ranksImg.x, this.vidsImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.ranksImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextD.x, yHigh));
				//this.titleTextD.runAction(moveA);
				this.addChild(this.titleTextD);
				
				this.removeRanksUI();
			}
			else if(this.selectedIndex == 4)
			{
				yLow = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				yHigh = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.folderImg.scale, .833*this.folderImg.scale);
				var moveA = cc.moveTo(.25, this.folderImg.x, this.vidsImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.folderImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextE.x, yHigh));
				//this.titleTextE.runAction(moveA);
				this.addChild(this.titleTextE);
				
				this.removeFolderUI();
			}
			
			var scaleB = cc.scaleTo(.25, 1.2*this.worldImg.scale, 1.2*this.worldImg.scale);
			var moveB = cc.moveTo(.25, this.worldImg.x, this.worldImg.y-10);
			var spawnB = cc.spawn(scaleB, moveB);
			this.worldImg.runAction(spawnB);
			//var moveB = cc.moveTo(.25, cc.p(this.titleTextA.x, yLow));
			//this.titleTextA.runAction(moveB);
			this.removeChild(this.titleTextA);
			this.selectedIndex = 0;
			
			this.addWorldUI();
		}
		else if(pos.x > this.dailyImg.x-(this.dailyImg.width*this.dailyImg.scale)/2 && pos.x < this.dailyImg.x+(this.dailyImg.width*this.dailyImg.scale)/2
			&& pos.y < this.dailyImg.y && pos.y > this.dailyImg.y-(this.dailyImg.height*this.dailyImg.scale)
			&& this.selectedIndex != 1)
		{
			//this.parent.parent.playType = "feature";
			cc.log("FEATURED CLICKED");
			var yLow = 0;
			var yHigh = 0;
			
			if(this.selectedIndex == 0)
			{
				yLow = this.worldImg.y-(this.worldImg.height*this.worldImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.worldImg.scale, .833*this.worldImg.scale);
				var moveA = cc.moveTo(.25, this.worldImg.x, this.ranksImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.worldImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextA.x, yHigh));
				//this.titleTextA.runAction(moveA);
				this.addChild(this.titleTextA);
				
				this.removeWorldUI();
			}
			else if(this.selectedIndex == 2)
			{
				yLow = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.vidsImg.scale, .833*this.vidsImg.scale);
				var moveA = cc.moveTo(.25, this.vidsImg.x, this.dailyImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.vidsImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextC.x, yHigh));
				//this.titleTextC.runAction(moveA);
				this.addChild(this.titleTextC);
				
				this.removeVidsUI();
			}
			else if(this.selectedIndex == 3)
			{
				yLow = this.ranksImg.y-(this.ranksImg.height*this.ranksImg.scale);
				yHigh = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.ranksImg.scale, .833*this.ranksImg.scale);
				var moveA = cc.moveTo(.25, this.ranksImg.x, this.vidsImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.ranksImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextD.x, yHigh));
				//this.titleTextD.runAction(moveA);
				this.addChild(this.titleTextD);
				
				this.removeRanksUI();
			}
			else if(this.selectedIndex == 4)
			{
				yLow = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				yHigh = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.folderImg.scale, .833*this.folderImg.scale);
				var moveA = cc.moveTo(.25, this.folderImg.x, this.vidsImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.folderImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextE.x, yHigh));
				//this.titleTextE.runAction(moveA);
				this.addChild(this.titleTextE);
				
				this.removeFolderUI();
			}
			
			var scaleB = cc.scaleTo(.25, 1.2*this.dailyImg.scale, 1.2*this.dailyImg.scale);
			var moveB = cc.moveTo(.25, this.dailyImg.x, this.dailyImg.y-10);
			var spawnB = cc.spawn(scaleB, moveB);
			this.dailyImg.runAction(spawnB);
			//var moveB = cc.moveTo(.25, cc.p(this.titleTextB.x, yLow));
			//this.titleTextB.runAction(moveB);
			this.removeChild(this.titleTextB);
			this.selectedIndex = 1;
			
			this.addDailyUI();
		}
		else if(pos.x > this.vidsImg.x-(this.vidsImg.width*this.vidsImg.scale)/2 && pos.x < this.vidsImg.x+(this.vidsImg.width*this.vidsImg.scale)/2
			&& pos.y < this.vidsImg.y && pos.y > this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale)
			&& this.selectedIndex != 2)
		{
			
			if(this.parent.parent.featureInProg)
			{
				//this.parent.parent.openQuitPopup();
				//return;
			}
			
			cc.log("FRIENDS CLICKED");
			var yLow = 0;
			var yHigh = 0;
			
			if(this.selectedIndex == 0)
			{
				yLow = this.worldImg.y-(this.worldImg.height*this.worldImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.worldImg.scale, .833*this.worldImg.scale);
				var moveA = cc.moveTo(.25, this.worldImg.x, this.ranksImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.worldImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextA.x, yHigh));
				//this.titleTextA.runAction(moveA);
				this.addChild(this.titleTextA);
				
				this.removeWorldUI();
			}
			else if(this.selectedIndex == 1)
			{
				yLow = this.dailyImg.y-(this.dailyImg.height*this.dailyImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.dailyImg.scale, .833*this.dailyImg.scale);
				var moveA = cc.moveTo(.25, this.dailyImg.x, this.worldImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.dailyImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextB.x, yHigh));
				//this.titleTextB.runAction(moveA);
				this.addChild(this.titleTextB);
				
				this.removeDailyUI();
			}
			else if(this.selectedIndex == 3)
			{
				yLow = this.ranksImg.y-(this.ranksImg.height*this.ranksImg.scale);
				yHigh = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.ranksImg.scale, .833*this.ranksImg.scale);
				var moveA = cc.moveTo(.25, this.ranksImg.x, this.vidsImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.ranksImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextD.x, yHigh));
				//this.titleTextD.runAction(moveA);
				this.addChild(this.titleTextD);
				
				this.removeRanksUI();
			}
			else if(this.selectedIndex == 4)
			{
				yLow = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				yHigh = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.folderImg.scale, .833*this.folderImg.scale);
				var moveA = cc.moveTo(.25, this.folderImg.x, this.vidsImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.folderImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextE.x, yHigh));
				//this.titleTextE.runAction(moveA);
				this.addChild(this.titleTextE);
				
				this.removeFolderUI();
			}
			
			var scaleB = cc.scaleTo(.25, 1.2*this.vidsImg.scale, 1.2*this.vidsImg.scale);
			var moveB = cc.moveTo(.25, this.vidsImg.x, this.vidsImg.y-10);
			var spawnB = cc.spawn(scaleB, moveB);
			this.vidsImg.runAction(spawnB);
			//var moveB = cc.moveTo(.25, cc.p(this.titleTextC.x, yLow));
			//this.titleTextC.runAction(moveB);
			this.removeChild(this.titleTextC);
			this.selectedIndex = 2;
			
			this.addVidsUI();
		}
		else if(pos.x > this.ranksImg.x-(this.ranksImg.width*this.ranksImg.scale)/2 && pos.x < this.ranksImg.x+(this.ranksImg.width*this.ranksImg.scale)/2
			&& pos.y < this.ranksImg.y && pos.y > this.ranksImg.y-(this.ranksImg.height*this.ranksImg.scale)
			&& this.selectedIndex != 3)
		{
			cc.log("CREATORS CLICKED");
			var yLow = 0;
			var yHigh = 0;
			
			if(this.selectedIndex == 0)
			{
				yLow = this.worldImg.y-(this.worldImg.height*this.worldImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.worldImg.scale, .833*this.worldImg.scale);
				var moveA = cc.moveTo(.25, this.worldImg.x, this.ranksImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.worldImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextA.x, yHigh));
				//this.titleTextA.runAction(moveA);
				this.addChild(this.titleTextA);
				
				this.removeWorldUI();
			}
			else if(this.selectedIndex == 1)
			{
				yLow = this.dailyImg.y-(this.dailyImg.height*this.dailyImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.dailyImg.scale, .833*this.dailyImg.scale);
				var moveA = cc.moveTo(.25, this.dailyImg.x, this.worldImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.dailyImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextB.x, yHigh));
				//this.titleTextB.runAction(moveA);
				this.addChild(this.titleTextB);
				
				this.removeDailyUI();
			}
			else if(this.selectedIndex == 2)
			{
				yLow = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.vidsImg.scale, .833*this.vidsImg.scale);
				var moveA = cc.moveTo(.25, this.vidsImg.x, this.dailyImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.vidsImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextC.x, yHigh));
				//this.titleTextC.runAction(moveA);
				this.addChild(this.titleTextC);
				
				this.removeVidsUI();
			}
			else if(this.selectedIndex == 4)
			{
				yLow = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				yHigh = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.folderImg.scale, .833*this.folderImg.scale);
				var moveA = cc.moveTo(.25, this.folderImg.x, this.vidsImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.folderImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextE.x, yHigh));
				//this.titleTextE.runAction(moveA);
				this.addChild(this.titleTextE);
				
				this.removeFolderUI();
			}
			
			var scaleB = cc.scaleTo(.25, 1.2*this.ranksImg.scale, 1.2*this.ranksImg.scale);
			var moveB = cc.moveTo(.25, this.ranksImg.x, this.ranksImg.y-10);
			var spawnB = cc.spawn(scaleB, moveB);
			this.ranksImg.runAction(spawnB);
			//var moveB = cc.moveTo(.25, cc.p(this.titleTextD.x, yLow));
			//this.titleTextD.runAction(moveB);
			this.removeChild(this.titleTextD);
			this.selectedIndex = 3;
			
			this.addRanksUI();
		}
		else if(pos.x < this.folderImg.x && pos.x > this.folderImg.x-(this.folderImg.width*this.folderImg.scale)
			&& pos.y < this.folderImg.y && pos.y > this.folderImg.y-(this.folderImg.height*this.folderImg.scale)
			&& this.selectedIndex != 4)
		{
			//this.parent.parent.playType = "created";
			cc.log("YOU CLICKED");
			var yLow = 0;
			var yHigh = 0;
			
			if(this.selectedIndex == 0)
			{
				yLow = this.worldImg.y-(this.worldImg.height*this.worldImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.worldImg.scale, .833*this.worldImg.scale);
				var moveA = cc.moveTo(.25, this.worldImg.x, this.ranksImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.worldImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextA.x, yHigh));
				//this.titleTextA.runAction(moveA);
				this.addChild(this.titleTextA);
				
				this.removeWorldUI();
			}
			else if(this.selectedIndex == 1)
			{
				yLow = this.dailyImg.y-(this.dailyImg.height*this.dailyImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.dailyImg.scale, .833*this.dailyImg.scale);
				var moveA = cc.moveTo(.25, this.dailyImg.x, this.worldImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.dailyImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextB.x, yHigh));
				//this.titleTextB.runAction(moveA);
				this.addChild(this.titleTextB);
				
				this.removeDailyUI();
			}
			else if(this.selectedIndex == 2)
			{
				yLow = this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.vidsImg.scale, .833*this.vidsImg.scale);
				var moveA = cc.moveTo(.25, this.vidsImg.x, this.dailyImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.vidsImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextC.x, yHigh));
				//this.titleTextC.runAction(moveA);
				this.addChild(this.titleTextC);
				
				this.removeVidsUI();
			}
			else if(this.selectedIndex == 3)
			{
				yLow = this.ranksImg.y-(this.ranksImg.height*this.ranksImg.scale);
				yHigh = this.folderImg.y-(this.folderImg.height*this.folderImg.scale);
				var scaleA = cc.scaleTo(.25, .833*this.ranksImg.scale, .833*this.ranksImg.scale);
				var moveA = cc.moveTo(.25, this.ranksImg.x, this.vidsImg.y);
				var spawnA = cc.spawn(scaleA, moveA);
				this.ranksImg.runAction(spawnA);
				//var moveA = cc.moveTo(.25, cc.p(this.titleTextD.x, yHigh));
				//this.titleTextD.runAction(moveA);
				this.addChild(this.titleTextD);
				
				this.removeRanksUI();
			}
			
			var scaleB = cc.scaleTo(.25, 1.2*this.folderImg.scale, 1.2*this.folderImg.scale);
			var moveB = cc.moveTo(.25, this.folderImg.x, this.folderImg.y-10);
			var spawnB = cc.spawn(scaleB, moveB);
			this.folderImg.runAction(spawnB);
			//var moveB = cc.moveTo(.25, cc.p(this.titleTextE.x, yLow));
			//this.titleTextE.runAction(moveB);
			this.removeChild(this.titleTextE);
			this.selectedIndex = 4;
			
			this.addFolderUI();
		}
		else
		{
			if(this.selectedIndex == 0)
			{
				if(pos.x > this.listLayer.x && pos.x < this.listLayer.x+this.listLayer.width
					&& pos.y > this.listLayer.y && pos.y < this.listLayer.y+this.listLayer.height)
				{
					this.listLayer.onTouchEnded(pos);	
				}
			}
			else if(this.selectedIndex == 1)
			{
				if(pos.x > this.listLayer.x && pos.x < this.listLayer.x+this.listLayer.width
					&& pos.y > this.listLayer.y && pos.y < this.listLayer.y+this.listLayer.height)
				{
					this.listLayer.onTouchEnded(pos);	
				}
			}
			else if(this.selectedIndex == 2)
			{
				if(pos.x > this.listLayer.x && pos.x < this.listLayer.x+this.listLayer.width
					&& pos.y > this.listLayer.y && pos.y < this.listLayer.y+this.listLayer.height)
				{
					this.listLayer.onTouchEnded(pos);	
				}
			}
			else if(this.selectedIndex == 3)
			{
				if(pos.x > this.listLayer.x && pos.x < this.listLayer.x+this.listLayer.width
					&& pos.y > this.listLayer.y && pos.y < this.listLayer.y+this.listLayer.height)
				{
					this.listLayer.onTouchEnded(pos);	
				}
			}
			else if(this.selectedIndex == 4)
			{
				if(pos.x > this.listLayer.x && pos.x < this.listLayer.x+this.listLayer.width
					&& pos.y > this.listLayer.y && pos.y < this.listLayer.y+this.listLayer.height)
				{
					this.listLayer.onTouchEnded(pos);	
				}
			}
		}
		
		
		
	},
	
	removeWorldUI:function()
	{
		this.removeChild(this.listHeader);
		this.removeChild(this.listLayer);
	},
	removeVidsUI:function()
	{
		this.removeChild(this.listHeader);
		//this.removeChild(this.listHeaderB);
		this.removeChild(this.listLayer);
	},
	removeDailyUI:function()
	{
		this.removeChild(this.listHeader);
		this.removeChild(this.listLayer);
	},
	removeFolderUI:function()
	{
		this.removeChild(this.listHeader);
		this.removeChild(this.listLayer);
	},
	removeRanksUI:function()
	{
		this.removeChild(this.listHeader);
		this.removeChild(this.listLayer);
	},
	
	addWorldUI:function()
	{
		this.listHeader = new WorldListHeader(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.15), this.streak);
		//this.listHeader = new WorldDisplay(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.3));
		this.listHeader.attr({
			x:this.width*.025,
			y:this.titleTextA.y-this.titleTextA.height-3-this.listHeader.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listHeader);
		
		this.listLayer = new WorldLayer(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.85), this.feature /*, this.numStars, this.numLevelsBeat,this.streak,this.challengeTries,this.resetTime*/);
		this.listLayer.attr({
			x:this.width*.025,
			y:this.listHeader.y-6-this.listLayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listLayer);
	},
	
	addDailyUI:function()
	{
		this.listHeader = new TrendListHeader(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.15), this.streak);
		this.listHeader.attr({
			x:this.width*.025,
			y:this.titleTextA.y-this.titleTextA.height-3-this.listHeader.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listHeader);
		
		//this.listLayer = new ListLayer(this.width*.9, this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale)-10 );
		//this.listLayer = new TrendListLayer(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.85), this.features);
		this.listLayer = new WinStreakLayer(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.85), this.feature, this.numStars, this.numLevelsBeat,this.streak,this.challengeTries,this.resetTime);
		this.listLayer.attr({
			x:this.width*.025,
			y:this.listHeader.y-6-this.listLayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listLayer);
		//this.listLayer.updateEmptyBoxes();
	},
	//addVidsUI:function()
	addFolderUI:function()
	{
		this.listHeader = new FriendListHeader(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.15));
		this.listHeader.attr({
			x:this.width*.025,
			y:this.titleTextA.y-this.titleTextA.height-3-this.listHeader.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listHeader);
		
		this.listLayer = new FriendListLayer(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.85));
		this.listLayer.attr({
			x:this.width*.025,
			y:this.listHeader.y-6-this.listLayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listLayer);
	},
	addRanksUI:function()
	{
		//this.listHeader = new CreatorListHeader(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.15));
		this.listHeader = new CreationListHeader(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.15));
		this.listHeader.attr({
			x:this.width*.025,
			y:this.titleTextA.y-this.titleTextA.height-3-this.listHeader.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listHeader);
		
		//this.listLayer = new CreatorListLayer(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.85));
		this.listLayer = new CreationListLayer(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.85));
		this.listLayer.attr({
			x:this.width*.025,
			y:this.listHeader.y-6-this.listLayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listLayer);
	},
	/*addFolderUI:function()
	{
		this.listHeader = new FolderListHeader(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.15));
		this.listHeader.attr({
			x:this.width*.025,
			y:this.titleTextA.y-this.titleTextA.height-3-this.listHeader.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listHeader);
		
		//this.listLayer = new ListLayer(this.width*.9, this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale)-10 );
		this.listLayer = new FolderListLayer(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.85), this.userLevels);
		this.listLayer.attr({
			x:this.width*.025,
			y:this.listHeader.y-6-this.listLayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listLayer);
	},*/
	
	addVidsUI:function()
	{
		this.listHeader = new QuestListHeader(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.15));
		this.listHeader.attr({
			x:this.width*.025,
			y:this.titleTextA.y-this.titleTextA.height-3-this.listHeader.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listHeader);
		
		//this.listLayer = new ListLayer(this.width*.9, this.vidsImg.y-(this.vidsImg.height*this.vidsImg.scale)-10 );
		this.listLayer = new QuestListLayer(this.width*.95, Math.floor((this.titleTextA.y-this.titleTextA.height-12)*.85), this.userLevels);
		this.listLayer.attr({
			x:this.width*.025,
			y:this.listHeader.y-6-this.listLayer.height,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.listLayer);
	},
	
	setLevelInProgress:function()
	{/*
		if(this.selectedIndex == 0)
		{
			this.listLayer.setChosenInProgress();
		}
		*/
	}
	
	
	
});