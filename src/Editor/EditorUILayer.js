var EditorUILayer = cc.Layer.extend({
	ctor:function(w,h){
		this._super();
		
		var size = cc.winSize;
		
        this.width = w;
        this.height = h;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		//this.width = w;
		//this.height = h;
		
		this.editorObstacleHighlight = null;
		
		
		this.tabTitle = "All Bubbles";
		this.imgButtons = [];
		this.iconButtons = [];
		this.loadButtons();
		
		
		this.tabTitleLabel = new cc.LabelTTF(""+this.tabTitle, "Arial", 20);
		this.tabTitleLabel.attr({
			"x":size.width/4,
			"y":0,
			"anchorX":.5,
			"anchorY":0
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		//this.backHomeButton = new Button(size.width*.75, 5, "Home", 28, cc.color(255,0,0,255), cc.color(255,255,255,255));
        
        this.backHomeButton = new cc.Sprite(res.quit_button);
        this.backHomeButton.setScale((this.width*.25-6) / this.backHomeButton.width);
        this.backHomeButton.attr({
        	x: this.width*.75+1,
        	y:5,
        	anchorX:0,
        	anchorY:0
        });
		this.addChild(this.backHomeButton);
		
		this.saveButton = new cc.Sprite(res.save_button);
		this.saveButton.setScale((this.width*.25-6) / this.saveButton.width);
		this.saveButton.attr({
			x:this.width*.5+1,
			y:5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.saveButton);
		
		this.draw();
	},
	
	loadButtons:function()
	{
		var size = cc.winSize;
		var imgWidth = size.width/12;
		
		var emojiNames = [
			["red_emoji","yellow_emoji","green_emoji","blue_emoji","pink_emoji","purple_emoji"],
			["red_die","yellow_die","green_die","blue_die","pink_die","purple_die"],
			["red_balloon","yellow_balloon","green_balloon","blue_balloon","pink_balloon","purple_balloon"],
			["rock","steel","spike","poof","soap","cloud"],
			["bomb","large_bomb","dynamite","star"],
			["orb","disco","gumball","flowerpot"]
		];
		for(var e=0; e<emojiNames.length; e++)
		{
			for(var i=0; i<emojiNames[e].length; i++)
			{
				var img = this.getSprite(emojiNames[e][i]);
				
				img.attr({
					x:i*imgWidth,
					y:this.height-(e*imgWidth),
					anchorX:0,
					anchorY:1
				});
				img.setScale((imgWidth)/img.width);
				this.addChild(img);
				this.imgButtons.push(img);
			}
		}
		
		
		
		var iconNames = [
			["delete"]
		];
		for(var e=0; e<iconNames.length; e++)
		{
			for(var i=0; i<iconNames[e].length; i++)
			{
				var img = this.getIcon(iconNames[e][i]);
				img.attr({
					x:size.width/2 + i*imgWidth,
					y:this.height-(e*imgWidth),
					anchorX:0,
					anchorY:1
				});
				img.setScale((imgWidth)/img.width);
				this.addChild(img);
				this.iconButtons.push(img);
			}
		}
		
		this.editorObstacleHighlight = new cc.Sprite(res.thick_black_circle);
		this.editorObstacleHighlight.setScale((imgWidth)/this.editorObstacleHighlight.width);
		this.editorObstacleHighlight.attr({
			"x":-imgWidth*2,
			"y":imgWidth*2
		});
		this.addChild(this.editorObstacleHighlight);
		
		
	},
	
	getSprite:function(name)
	{
		if(name == "red_emoji")
			return new cc.Sprite(res.angry_emoji);
		else if(name == "yellow_emoji")
			return new cc.Sprite(res.smile_emoji);
		else if(name == "green_emoji")
			return new cc.Sprite(res.sick_emoji);
		else if(name == "blue_emoji")
			return new cc.Sprite(res.sad_emoji);
		else if(name == "pink_emoji")
			return new cc.Sprite(res.love_emoji);
		else if(name == "purple_emoji")
			return new cc.Sprite(res.evil_emoji);
			
		else if(name == "red_die")
			return new cc.Sprite(res.red_die_emoji);
		else if(name == "yellow_die")
			return new cc.Sprite(res.yellow_die_emoji);
		else if(name == "green_die")
			return new cc.Sprite(res.green_die_emoji);
		else if(name == "blue_die")
			return new cc.Sprite(res.blue_die_emoji);
		else if(name == "pink_die")
			return new cc.Sprite(res.pink_die_emoji);
		else if(name == "purple_die")
			return new cc.Sprite(res.purple_die_emoji);
			
		else if(name == "red_balloon")
			return new cc.Sprite(res.red_balloon_emoji);
		else if(name == "yellow_balloon")
			return new cc.Sprite(res.yellow_balloon_emoji);
		else if(name == "green_balloon")
			return new cc.Sprite(res.green_balloon_emoji);
		else if(name == "blue_balloon")
			return new cc.Sprite(res.blue_balloon_emoji);
		else if(name == "pink_balloon")
			return new cc.Sprite(res.pink_balloon_emoji);
		else if(name == "purple_balloon")
			return new cc.Sprite(res.purple_balloon_emoji);
			
		else if(name == "steel")
			return new cc.Sprite(res.anvil_emoji);
		else if(name == "rock")
			return new cc.Sprite(res.jawbreaker_emoji);
		else if(name == "spike")
			return new cc.Sprite(res.spike_emoji);
			
		else if(name == "poof")
			return new cc.Sprite(res.egg_emoji)
		else if(name == "soap")
			return new cc.Sprite(res.soap_emoji);
		else if(name == "cloud")
			return new cc.Sprite(res.cloud_emoji);
		
		else if(name == "bomb")
			return new cc.Sprite(res.bomb_emoji);
		else if(name == "large_bomb")
			return new cc.Sprite(res.large_bomb_emoji);
		else if(name == "dynamite")
			return new cc.Sprite(res.dynamite_1_emoji);
		else if(name == "star")
			return new cc.Sprite(res.star_emoji);
			
		else if(name == "orb")
			return new cc.Sprite(res.neutral_orb_emoji);
		else if(name == "disco")
			return new cc.Sprite(res.disco_emoji);
		else if(name == "gumball")
			return new cc.Sprite(res.gumball_emoji);
		else if(name == "flowerpot")
			return new cc.Sprite(res.neutral_flowerpot_emoji);
		
	},
	
	getIcon:function(name)
	{
		if(name == "delete")
			return new cc.Sprite(res.red_x);
	},
	
	onTouchBegin:function(pos)
	{
		
	},
	onTouchMoved:function(pos)
	{
		
	},
	onTouchEnded:function(pos)
	{cc.log("end");
		var size = cc.winSize;
		
		// UNCOMMENT THE TEST PART TO GET THE JSON DOWNLOAD!!!!!!!!!!!!!!!!!!!!!
		
		/*if(this.homeButton.pointWithin(pos))
			cc.director.runScene(new HelloWorldScene());
		else if(this.testButton.pointWithin(pos))
			return "test";
		else
		{*/
			if(pos.x < size.width/2)
			{
				var drawIndex = null;
				var drawData = [{"type":0,"color":"red"}, {"type":0,"color":"yellow"}, {"type":0,"color":"green"}, 
					{"type":0,"color":"blue"}, {"type":0,"color":"pink"}, {"type":0,"color":"purple"},
					{"type":8,"color":"red"},{"type":8,"color":"yellow"},{"type":8,"color":"green"},
					{"type":8,"color":"blue"},{"type":8,"color":"pink"},{"type":8,"color":"purple"},
					{"type":19,"color":"red"},{"type":19,"color":"yellow"},{"type":19,"color":"green"},
					{"type":19,"color":"blue"},{"type":19,"color":"pink"},{"type":19,"color":"purple"},
					{"type":3,"color":null},{"type":2,"color":null},{"type":16,"color":null},{"type":4,"color":null},{"type":5,"color":null},{"type":18,"color":null},
					{"type":1,"color":null},{"type":12,"color":null},{"type":13,"color":null},{"type":20,"color":null},
					{"type":9,"color":null},{"type":10,"color":null},{"type":11,"color":null},{"type":15,"color":null}
				];
				
				for(var i=0; i<this.imgButtons.length && drawIndex == null; i++)
				{
					var img = this.imgButtons[i];
					if(pos.x >= img.x && pos.x <= img.x+img.width*img.scale && pos.y <= img.y && pos.y >= img.y-img.height*img.scale)
					{
						drawIndex = i;
						
						this.editorObstacleHighlight.attr({
							"x":img.x+img.width*img.scale/2,
							"y":img.y-img.height*img.scale/2
						});
					
					}
				}
				if(drawIndex == null)
					return null;
				return drawData[drawIndex];
			}
			else
			{
				if(FUNCTIONS.posWithinScaled(pos, this.backHomeButton))
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
		    		}
					cc.director.runScene(new GameplayScene(bubbles, maxRow+1));*/
					
					var maxRow = 0;
					for(var i=0; i<DATA.worldBubbles.length; i++)
					{
						if(DATA.worldBubbles[i].row > maxRow)
							maxRow = DATA.worldBubbles[i].row;
					}
					
					cc.director.runScene(new cc.TransitionFade(1, new MainContainerScene(DATA.worldBubbles, maxRow+1)));
					
					return null;
				}
				else if(FUNCTIONS.posWithinScaled(pos, this.saveButton))
				{
					return "save";
				}
				
				var drawIndex = null;
				var drawData = [{"type":"-1"}];
				
				for(var i=0; i<this.iconButtons.length && drawIndex == null; i++)
				{
					var img = this.iconButtons[i];
					if(pos.x >= img.x && pos.x <= img.x+img.width*img.scale && pos.y <= img.y && pos.y >= img.y-img.height*img.scale)
					{
						drawIndex = i;
						
						this.editorObstacleHighlight.attr({
							"x":img.x+img.width*img.scale/2,
							"y":img.y-img.height*img.scale/2
						});
					}
				}
				
				if(drawIndex == null)
					return null;
				return drawData[drawIndex];
			}
			
		//}
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width/2, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.x+this.width/2,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		
	}
	
});
