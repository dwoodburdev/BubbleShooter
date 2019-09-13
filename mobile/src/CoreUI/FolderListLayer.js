var FolderListLayer = cc.Layer.extend({
	ctor:function(width, height, userLevels){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
		
		var scrollWidth = Math.floor(this.width*.1)
		cc.log(userLevels);
		this.userLevels = userLevels;
		cc.log(this.userLevels);
		
		this.topRow = 0;
		
		var listWidth = this.width-scrollWidth;
		this.listWidth = listWidth;
		this.folderBoxes = [];
		
		this.createdTypes = [[0,1], [0,1], [0,1], [0,1]];
		this.createdColors = [["red","blue","yellow","green"], ["red","blue","yellow","green"],  ["red","blue","yellow","green"],  ["red","blue","yellow","green"]];
		
		this.boxHeight = this.height/4;
		//for(var i=0; i<this.folderBoxes.length; i++)
		for(var i=0; i<this.userLevels.length && i < 4; i++)
		{
			//this.dn.drawRect( cc.p(0,this.height-(i+1)*(this.boxHeight) ), cc.p(listWidth, this.height-(i)*(this.boxHeight) ), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
			var folderBox = new FolderBox(listWidth, this.boxHeight, this.createdTypes[i], this.createdColors[i], "Level "+(i+1));
			folderBox.attr({
				x:0,
				y:this.height-(i+1)*(this.boxHeight) ,
				anchorX:0,
				anchorY:0
			});
			this.folderBoxes.push(folderBox);
			if(i < 4)
				this.addChild(folderBox);
		}
		
		this.dn.drawRect(cc.p(this.width-scrollWidth,0), cc.p(this.width, this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
		
		this.upArrow = new cc.Sprite(res.up_arrow);
		this.upArrow.setScale(scrollWidth / this.upArrow.width);
		this.upArrow.attr({
			x:this.width,
			y:this.height,
			anchorX:1,
			anchorY:1
		});
		this.addChild(this.upArrow);
		
		this.downArrow = new cc.Sprite(res.down_arrow);
		this.downArrow.setScale(scrollWidth / this.downArrow.width);
		this.downArrow.attr({
			x:this.width,
			y:0,
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.downArrow);
		
		
	},
	
	onTouchEnded:function(pos)
	{
		
		if(pos.x > this.upArrow.x-(this.upArrow.width*this.upArrow.scale) && pos.x < this.upArrow.x
			&& pos.y > this.upArrow.y-(this.upArrow.height*this.upArrow.scale) && pos.y < this.upArrow.y)
		{cc.log("UP ARROW YO");
			if(this.topRow > 0)
			{cc.log(this.topRow);
				this.topRow--;
				this.removeChild(this.folderBoxes[3]);
				this.folderBoxes.splice(this.folderBoxes.length-1, 1);
				
				this.folderBoxes.unshift(new FolderBox(this.listWidth, this.boxHeight, this.createdTypes[this.topRow], this.createdColors[this.topRow], "Level "+(this.topRow+1)));
				this.folderBoxes[0].attr({
					x:0,
					y:this.height-(this.boxHeight) ,
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.folderBoxes[0]);
				
				this.folderBoxes[1].attr({
					x:0,
					y:this.height-2*(this.boxHeight) ,
					anchorX:0,
					anchorY:0
				});
				this.folderBoxes[2].attr({
					x:0,
					y:this.height-3*(this.boxHeight) ,
					anchorX:0,
					anchorY:0
				});
				this.folderBoxes[3].attr({
					x:0,
					y:this.height-4*(this.boxHeight) ,
					anchorX:0,
					anchorY:0
				});
				
				//this.updateList();
			}
		}
		else if(pos.x > this.downArrow.x-(this.downArrow.width*this.downArrow.scale) && pos.x < this.downArrow.x
			&& pos.y > this.downArrow.y && pos.y < this.downArrow.y+(this.downArrow.height*this.downArrow.scale))
		{cc.log("DOWN ARROW YO");
			//if(this.topRow < this.folderBoxes.length-4)
			if(this.topRow < this.userLevels.length-4)
			{cc.log(this.topRow);
				this.topRow++;
				this.removeChild(this.folderBoxes[0]);
				this.folderBoxes.splice(0, 1);
				
				this.folderBoxes.push(new FolderBox(this.listWidth, this.boxHeight, this.createdTypes[this.topRow], this.createdColors[this.topRow], "Level "+(this.topRow+3+1)));
				this.folderBoxes[3].attr({
					x:0,
					y:this.height-4*(this.boxHeight) ,
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.folderBoxes[3]);
				
				this.folderBoxes[0].attr({
					x:0,
					y:this.height-1*(this.boxHeight) ,
					anchorX:0,
					anchorY:0
				});
				this.folderBoxes[1].attr({
					x:0,
					y:this.height-2*(this.boxHeight) ,
					anchorX:0,
					anchorY:0
				});
				this.folderBoxes[2].attr({
					x:0,
					y:this.height-3*(this.boxHeight) ,
					anchorX:0,
					anchorY:0
				});
				
				//this.updateList();
			}
		}
		else
		{
			/*cc.log("UNSAVED?");
			cc.log(this.parent.parent.parent.curUnsavedFlag);
			if(this.parent.parent.parent.curUnsavedFlag)
			{
				cc.log("DONT FORGET TO SAVE");
				this.parent.parent.parent.openSavePopup();
			}
			else
			{*/
				var rowTouched = Math.floor((this.height-pos.y)/this.boxHeight);
				cc.log(this.parent.parent.parent.curUnsavedProg);
				if(this.parent.parent.parent.curUnsavedProg)
				{
					this.parent.parent.parent.openQuitWithoutSavingPopup({"type":"folder", "number":this.topRow+rowTouched});
				}
				else
				{
					
					cc.log("You touched your level.");
					this.parent.parent.parent.loadLevel("created",this.topRow+rowTouched);
				
				}
				
				//}
			
			
			
			
			
		}
	}
	
	
});