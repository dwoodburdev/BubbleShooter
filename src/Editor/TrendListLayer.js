var TrendListLayer = cc.Layer.extend({
	ctor:function(width, height, features){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.features = features;cc.log(features);
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(235,235,235,255), 0, cc.color(0,0,0,255));
		
		this.selectedIndex = -1;
		
		var scrollWidth = Math.floor(this.width*.1)
		
		
		var listWidth = this.width;//-scrollWidth;
		this.listWidth = listWidth;
		
		this.trendBoxes = [];
		this.emptyBoxes = [null,null,null,null];
		
		var names = ["Rainbow Dice Field", "Bomberman", "Obstacle Course", "Hit the Center"];
		var authors = ["ragerfield","obnoxiousland","mightymouse18","gamedesigngod"];
		
		
		 setInterval(
		     (function(self) {         //Self-executing func which takes 'this' as self
		         return function() {   //Return a function in the context of 'self'
		             self.countDown(); //Thing you wanted to run as non-window 'this'
		         }
		     })(this),
		     1000     //normal interval, 'this' scope not impacted here.
		 ); 
		
		
		this.boxHeight = (this.height-15)/4;
		for(var i=0; i<4; i++)
		{
			if(this.features[i].type == "empty")
			{
				/*if( (new Date()).getTime() - this.features[i].timePlayed > (1000*60*60*4) )
				{
					// get new level
					var newLevel = this.parent.parent.parent.getNewLevel();
					
					var trendBox = new TrendBox(listWidth, this.boxHeight, names[i], authors[i], DATA.createdLevelTypes[i], DATA.createdLevelColors[i], level.type, level.timePlayed, i);
					trendBox.attr({
						x:0,
						y:this.height-(i+1)*(this.boxHeight)-(i*5) ,
						anchorX:0,
						anchorY:0
					});
					this.trendBoxes.push(trendBox);
					this.addChild(trendBox);
					
					
					
				}
				else
				{*/
					var emptyBox = new EmptyTrendBox(this.listWidth, this.boxHeight, this.features[i].timePlayed, i);
					emptyBox.attr({
						x:0,
						y:this.height-(i+1)*(this.boxHeight)-(i*5) ,
						anchorX:0,
						anchorY:0
						/*x:this.trendBoxes[this.selectedIndex].x,
						y:this.trendBoxes[this.selectedIndex].y,
						anchorX:this.trendBoxes[this.selectedIndex].anchorX,
						anchorY:this.trendBoxes[this.selectedIndex].anchorY*/
					});
					this.addChild(emptyBox);
					this.trendBoxes.push(emptyBox);
					this.emptyBoxes[i] = emptyBox;
				//}
			}
			else
			{
				//this.dn.drawRect( cc.p(0,this.height-(i+1)*(this.boxHeight) ), cc.p(listWidth, this.height-(i)*(this.boxHeight) ), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
				var trendBox = new TrendBox(listWidth, this.boxHeight, names[i], authors[i], DATA.createdLevelTypes[i], DATA.createdLevelColors[i], this.features[i].type, this.features[i].timePlayed, i);
				trendBox.attr({
					x:0,
					y:this.height-(i+1)*(this.boxHeight)-(i*5) ,
					anchorX:0,
					anchorY:0
				});
				this.trendBoxes.push(trendBox);
				this.addChild(trendBox);
			}
		}
		
		//this.dn.drawRect(cc.p(this.width-scrollWidth,0), cc.p(this.width, this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
		
		
	},
	
	/*updateEmptyBoxes:function()
	{cc.log(this.features);cc.log(this.trendBoxes);
		for(var i=0; i<4; i++)
		{cc.log(i);
			if( this.features[i].type == "empty" && (new Date()).getTime() - this.features[i].timePlayed > (1000*60*60*4) )
			{cc.log(this.parent);
				// get new level
				var newLevel = this.parent.parent.parent.getNewLevel();
				cc.log("new level is ");cc.log(newLevel);
				var trendBox = new TrendBox(this.listWidth, this.boxHeight, "New Level", "New Name", [], ["red","blue","yellow","green"], "ready", (new Date()).getTime(), i);
				trendBox.attr({
					x:0,
					y:this.height-(i+1)*(this.boxHeight)-(i*5) ,
					anchorX:0,
					anchorY:0
				});
				this.trendBoxes.push(trendBox);
				this.addChild(trendBox);
				
				
				this.parent.parent.parent.replaceFeature(i, newLevel);
			}
			
		}
		
		
	},*/
	
	onTouchEnded:function(pos)
	{
		
		var boxFound = false;
		for(var i=0; i<this.trendBoxes.length && !boxFound; i++)
		{
			if(pos.x > this.trendBoxes[i].x && pos.x < this.trendBoxes[i].x+this.trendBoxes[i].width
				&& pos.y > this.trendBoxes[i].y && pos.y < this.trendBoxes[i].y+this.trendBoxes[i].height)
			{
					this.selectedIndex = i;
					boxFound = true;
					
				
				
				
			}
		}
		
		if(boxFound)
		{
			if(this.parent.parent.parent.curUnsavedProg)
			{
				this.parent.parent.parent.openQuitWithoutSavingPopup({"type":"featured", "number":this.selectedIndex});
			}
			else
			{
				this.unselectChosen();
				//this.parent.parent.parent.loadLevel("feature",i);
				this.parent.parent.parent.showFeature(this.selectedIndex);
				this.trendBoxes[this.selectedIndex].select();
				
				if(this.trendBoxes[this.selectedIndex].type == "wait")
				{
					this.parent.parent.parent.openWatchPopup();
				}
			}
		}
		
	},
	
	openButCheckForWatch:function(selectedIndex)
	{
		this.selectedIndex = selectedIndex;
		this.unselectChosen();
		this.trendBoxes[this.selectedIndex].select();
		if(this.trendBoxes[this.selectedIndex].type == "wait")
		{
			this.parent.parent.parent.openWatchPopup();
		}
	},
	
	countDown:function()
	{
		for(var i=0; i<this.trendBoxes.length; i++)
		{
			if(this.trendBoxes[i].type != "ready")
				this.trendBoxes[i].countDown();
			
		}
		for(var i=0; i<this.emptyBoxes.length; i++)
		{
			if(this.emptyBoxes[i] != null)
				this.emptyBoxes[i].countDown();
		}
	},
	
	unselectChosen:function()
	{
		if(this.selectedIndex != -1)
		{
			this.trendBoxes[this.selectedIndex].unselect();
		}
		
	},
	
	setChosenInProgress:function()
	{
		if(this.selectedIndex != -1)
		{
			this.trendBoxes[this.selectedIndex].setInProgress();
		}
	},
	
	readyLevel:function(num)
	{
		var trendBox = new TrendBox(this.listWidth, this.boxHeight, "Level Name", "Author", DATA.createdLevelTypes[num], DATA.createdLevelColors[num], "ready", this.features[num].timePlayed, this.trendBoxes[num].boxNum);
		trendBox.attr({
			x:this.trendBoxes[num].x,
			y:this.trendBoxes[num].y,
			anchorX:this.trendBoxes[num].anchorX,
			anchorY:this.trendBoxes[num].anchorY
		});
		
		this.removeChild(this.trendBoxes[num]);
		
		this.trendBoxes[num] = trendBox;
		this.addChild(trendBox);
		
		this.parent.parent.parent.dbUpdateFeatureAttempt(num, "ready");
		//this.parent.parent.parent.
	},
	
	readyEmptyLevel:function(num)
	{cc.log(this.emptyBoxes);cc.log(num);
		var trendBox = new TrendBox(this.listWidth, this.boxHeight, "", "", DATA.createdLevelTypes[num], DATA.createdLevelColors[num], "ready", 0, num);
		trendBox.attr({
			x:this.emptyBoxes[num].x,
			y:this.emptyBoxes[num].y,
			anchorX:this.emptyBoxes[num].anchorX,
			anchorY:this.emptyBoxes[num].anchorY
		});
		
		this.removeChild(this.emptyBoxes[num]);
		this.emptyBoxes[num] = null;
		
		this.trendBoxes[num] = trendBox;
		this.addChild(trendBox);
		
		// get new level
		
		//this.parent.parent.parent.dbUpdateFeatureAttempt(num, "ready");
	},
	
	completeLevel:function()
	{
		var emptyBox = new EmptyTrendBox(this.listWidth, this.boxHeight, this.features[this.selectedIndex].timePlayed, this.trendBoxes[this.selectedIndex].boxNum, this.selectedIndex);
		emptyBox.attr({
			x:this.trendBoxes[this.selectedIndex].x,
			y:this.trendBoxes[this.selectedIndex].y,
			anchorX:this.trendBoxes[this.selectedIndex].anchorX,
			anchorY:this.trendBoxes[this.selectedIndex].anchorY
		});
		this.addChild(emptyBox);
		//this.emptyBoxes[this.trendBoxes[this.selectedIndex].boxNum] = emptyBox;
		this.emptyBoxes[this.selectedIndex] = emptyBox;
		
		this.removeChild(this.trendBoxes[this.selectedIndex]);
	},
	
	delayLevel:function(time)
	{
		var trendBox = new TrendBox(this.listWidth, this.boxHeight, "", "", DATA.createdLevelTypes[this.selectedIndex], DATA.createdLevelColors[this.selectedIndex], "wait", time, this.trendBoxes[this.selectedIndex].boxNum);
		trendBox.attr({
			x:this.trendBoxes[this.selectedIndex].x,
			y:this.trendBoxes[this.selectedIndex].y,
			anchorX:this.trendBoxes[this.selectedIndex].anchorX,
			anchorY:this.trendBoxes[this.selectedIndex].anchorY
		});
		//this.trendBoxes.push(trendBox);
		this.addChild(trendBox);
		
		this.removeChild(this.trendBoxes[this.selectedIndex]);
		this.trendBoxes[this.selectedIndex] = trendBox;
	}
	
	
	
});