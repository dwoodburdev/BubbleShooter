var DataManager = cc.Layer.extend({
	ctor:function(editorData){
		this._super();
		
		
 		this.database = firebase.database();
	 	/*this.editor_data = {
			challengeTries:0,
			features:[],
			levelsBeaten:[],
			numStars:0,
			streak:1,
			userId:userId,
			userLevels:[]
		};*/
		this.challengeTries = editorData.challengeTries;
		this.feature = editorData.feature;
		this.levelsBeaten = editorData.levelsBeaten;
		this.numLevelsBeat = editorData.numLevelsBeat;
		this.numStars = editorData.numStars;
		this.resetTime = editorData.resetTime;
		this.streak = editorData.streak;
		this.userId = editorData.userId;
		this.userLevels = editorData.userLevels;
		
		this.stage = 0;
		if(this.numStars >= 31)
		{
			this.stage = 5;
		}
		else if(this.numStars >= 16)
		{
			this.stage = 4;
		}
		else if(this.numStars >= 6)
		{
			this.stage = 3;
		}
		else if(this.numStars >= 3)
		{
			this.stage = 2;
		}
		else if(this.numStars >= 1)
		{
			this.stage = 1;
		}
		else if(this.numStars == 0)
		{
			this.stage = 0;
		}
		
 	},
 	
 	getNewLevel:function(stage, beatenLevels)
 	{
 		var levelManifest = [
 			["level1","level2"],
 			["level3","level4"],
 			["level5","level6"],
 			["level7","level8","level9"]
 		//	["level7","level8","level9","level10","level11","level12"],
 		//	["level13","level14","level15","level16","level17","level18","level19","level20","level21","level22"],
 		//	["level23","level24","level25","level26","level27","level28","level29","level30","level31","level32","level33","level34","level35","level36","level37"]
 			
 		];
 		
 		var possibleLevels = levelManifest[stage];cc.log(possibleLevels);
 		for(var i=possibleLevels.length-1; i>=0; i--)
 		{
 			
 			//if(beatenLevels[stage].indexOf(possibleLevels[i]) != -1)
 			//{
 				//possibleLevels.splice(i, 1);
 			//}
 		}
 		//indicesToSplice.reverse();
 		
 		
 		var rIndex = Math.floor(Math.random()*possibleLevels.length);
 		cc.log("levels/masterLevels/"+stage+"/"+	possibleLevels[rIndex]);
 		cc.log(this.stage);
 		var selfP = this.parent;
 		this.database.ref("levels/masterLevels/"+stage+"/"+possibleLevels[rIndex]).once("value").then(function(snapshot){
 			
 			var d = snapshot.val();cc.log(d);
 			//this.parent.replaceFeature(d);
 			
 			
 			var newBubbles = [];
 			var bubKeys = Object.keys(d.bubbles);
 			for(var i=0; i<bubKeys.length; i++)
 			{
 				//newBubbles.push(d.bubbles[bubKeys[i]]);
 				var dBub = d.bubbles[bubKeys[i]];
 				var newBub = {
 					row:dBub.row,
 					col:dBub.col,
 					type:dBub.type
 				};
 				
 				var colorCode = null;
 				if("colorCode" in dBub)
 				{
 					colorCode = dBub.colorCode;
 				}
 				newBub["colorCode"] = colorCode;
 				var orientation = null;
 				if("orientation" in dBub)
 				{
 					orientation = dBub.orientation;
 				}
 				newBub["orientation"] = orientation;
 				var binary = null;
 				if("binary" in dBub)
 				{
 					binary = dBub.binary;
 				}
 				newBub["binary"] = binary;
 				var meta = {};
 				if("meta" in dBub)
 				{
 					meta = dBub.meta;
 				}
 				newBub["meta"] = meta;
 				
 				
 				cc.log(newBub);
 				newBubbles.push(newBub);
 			}
 			var newColors = {};
 			var colorKeys = Object.keys(d.colors);
 			for(var i=0; i<colorKeys.length; i++)
 			{
 				newColors[colorKeys[i]] = d.colors[colorKeys[i]];
 			}
 			var newQueue = {};
 			newQueue.type = d.queue.type;
 			newQueue.colors = [];
 			var queueColorKeys = Object.keys(d.queue.colors);
 			for(var i=0; i<queueColorKeys.length; i++)
 			{
 				newQueue.colors.push(d.queue.colors[queueColorKeys[i]]);
 			}
 			
 			var newLevel = {
 			//this.parent.feature = {
 				bubbles:newBubbles,
 				numRows:d.numRows,
 				numMoves:d.numMoves,
 				colors:newColors,
 				meta:d.meta,
 				queue:newQueue
 			};
 			cc.log("NEW LEVEL LOAD HERE");
 			//cc.log(this.parent.feature);
 			cc.log(newLevel);
 			
 			//this.parent.feature = newLevel;
 			
 			//self.parent.replaceFeature(newLevel);
 			selfP.replaceFeature(newLevel);
 			
 			if(this.userId != null)
 				this.database.ref("users/"+this.parent.userId+"/feature").set(d);
		
 			//this.feature = d;
 			//this.parent.replaceFeature(d);
 		});
 		
 		
 	},
	  
	initNewUserWebData: function(userId)
	{
		this.userId = userId;
		var editor_data = {
			challengeTries:this.challengeTries,
			features:this.features,
			levelsBeaten:this.levelsBeaten,
			numStars:this.numStars,
			streak:this.streak,
			userId:this.userId,
			userLevels:this.userLevels
		};
		this.database.ref("users/"+userId).set(editor_data);
		this.database.ref("levels/userLevels/"+userId).set({"0":0});
		
		//DATA.initUserWebData(userId);
		
		cc.director.runScene(new EditorScene(editor_data, this.database));
	},
	  
	initUserWebData: function(userId)
	{cc.log("initting web data");
	
		var editor_data = {
			challengeTries:0,
			features:[],
			levelsBeaten:[],
			numStars:0,
			stage:0,
			streak:1,
			userId:userId,
			userLevels:[]
		};
	
		//DATA.database.ref("levels/userLevels/"+DATA.userID).once("value").then(function(snapshot){
	  	fire_database.ref("levels/userLevels/"+userId).once("value").then(function(snapshot){
		  	
		  	var d = snapshot.val();
		  	// Created levels
		  	
		  	//if(d["0"] != 0)
		  	//{
			var createdKeys = Object.keys(d);
			for(var i=0; i<createdKeys.length; i++)
			{cc.log("User level " + i);
				var dLevel = d[createdKeys[i]];
				
				var bubbles = [];
				var bubbleKeys = Object.keys(dLevel.bubbles);
				
				DATA.createdLevelColors.push({});
				var typeKeys = {};
				
				for(var j=0; j<bubbleKeys.length; j++)
				{
					var bub = dLevel.bubbles[bubbleKeys[j]];
					var newBub = {"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":bub.colorCode,"meta":bub.meta};
					
					//if(!((""+bub.type) in typeKeys))
					//{
						if(bub.type == 0)
						{
							if(bub.colorCode in DATA.createdLevelColors[DATA.createdLevelColors.length-1])
								DATA.createdLevelColors[DATA.createdLevelColors.length-1][bub.colorCode]++;
							else DATA.createdLevelColors[DATA.createdLevelColors.length-1][bub.colorCode] = 1;
						}
						else 
						{
							if((""+bub.type) in typeKeys)
								typeKeys[""+bub.type]++;
							else typeKeys[""+bub.type] = 1;
						}
					//}
					
					
					
					
					
					
					//if(bub.colorCode != null)
					//	newBub.colorCode = bub.colorCode;
					bubbles.push(newBub);
				}
				DATA.createdLevelTypes.push(typeKeys);
				
				var queue = {};
				queue.type = dLevel.queue.type;
				queue.colors = [dLevel.queue.colors["0"], dLevel.queue.colors["1"], dLevel.queue.colors["2"], 
					dLevel.queue.colors["3"], dLevel.queue.colors["4"], dLevel.queue.colors["5"]];
					
				//var meta = {bulbData:[]};
				//for(var i=0; i<d.meta)
				var meta = {};cc.log(dLevel);
				if(dLevel.meta != null)
				{cc.log("a");
					if(dLevel.meta.bulbData != null)
					{cc.log("b");
						meta.bulbData = [];
						var bulbKeys = Object.keys(dLevel.meta.bulbData);
						for(var j=0; j<bulbKeys.length; j++)
						{
							meta.bulbData.push([]);
							var iterKeys = Object.keys(dLevel.meta.bulbData[bulbKeys[j]]);
							for(var k=0; k<iterKeys.length; k++)
							{
								meta.bulbData[j].push(dLevel.meta.bulbData[bulbKeys[j]][iterKeys[k]])
							}
						}
					}
				}
	cc.log(meta);
	
				var numMoves = dLevel.numMoves;
				var colors = dLevel.colors;
				var numRows = dLevel.numRows;
	
				//DATA.createdLevels.push({"bubbles":bubbles, "queue":queue, "meta":meta});
				editor_data.userLevels.push({"bubbles":bubbles, "queue":queue, "meta":meta, "colors":colors, "numRows":numRows, "numMoves":numMoves});
			
			//}
		}
	  });
	  
	  
	  
	  
	  
	  
	  // Sets local user/world data from Database.
	  // -worldLevel (bubbles, queue)
	  // -coins, gems
	  // -world active queue
	  // -world queue
	  fire_database.ref("users/"+userId).once("value").then(function(snapshot){
	  	var numLevelsToDraw = 0;
	  	var emptyFeatureIndices = [];
	  	
	  	var d = snapshot.val();cc.log(d);cc.log(userId);
	  	
	  	editor_data.numStars = d.numStars;
	  	editor_data.streak = d.streak;
	  	editor_data.stage = d.stage;
	  	
	  	var levelsBeatenKeys = Object.keys(d.levelsBeaten[editor_data.stage]);
	  	for(var i=0; i<levelsBeatenKeys.length; i++)
	  	{
	  		editor_data.levelsBeaten.push(d.levelsBeaten[editor_data.stage][levelsBeatenKeys[i]]);
	  	}
	  	
	  	cc.log(d.features);
		for(var i=0; i<d.features.length; i++)
		{cc.log(i);
			if(d.features[i].type == "empty")
			{cc.log("empty");
				if( (new Date()).getTime() - d.features[i].timePlayed >= 1000*60*60*4)
				{
					numLevelsToDraw++;
					emptyFeatureIndices.push(i);
				}
				
				DATA.featuresNumRows.push(0);
				DATA.createdLevelColors.push({});
				editor_data.features.push({type:"empty",timePlayed:d.features[i].timePlayed});
			}
			else
			{cc.log("notempty");
				DATA.featuresNumRows.push(0);
			
			
				var dLevel = d.features[i];
					
				var bubbles = [];
				var bubbleKeys = Object.keys(dLevel.bubbles);
				
				DATA.createdLevelColors.push({});
				var typeKeys = {};
				
				for(var j=0; j<bubbleKeys.length; j++)
				{
					var bub = dLevel.bubbles[bubbleKeys[j]];
					var newBub = {"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":bub.colorCode,"meta":bub.meta};
					
					if(bub.row+1 > DATA.featuresNumRows[i])
						DATA.featuresNumRows[i] = bub.row+1;
				/*
					if(bub.type == 0)
					{
						if(bub.colorCode in DATA.createdLevelColors[DATA.createdLevelColors.length-1])
							DATA.createdLevelColors[DATA.createdLevelColors.length-1][bub.colorCode]++;
						else DATA.createdLevelColors[DATA.createdLevelColors.length-1][bub.colorCode] = 1;
					}
					else 
					{
						if((""+bub.type) in typeKeys)
							typeKeys[""+bub.type]++;
						else typeKeys[""+bub.type] = 1;
					}
		*/
					bubbles.push(newBub);
				}
				//DATA.createdLevelTypes.push(typeKeys);
				
				var queue = {};
				queue.type = dLevel.queue.type;
				queue.colors = [dLevel.queue.colors["0"], dLevel.queue.colors["1"], dLevel.queue.colors["2"], 
					dLevel.queue.colors["3"], dLevel.queue.colors["4"], dLevel.queue.colors["5"]];
					
				//var meta = {bulbData:[]};
				//for(var i=0; i<d.meta)
				var meta = {};cc.log(dLevel);
				if(dLevel.meta != null)
				{cc.log("a");
					if(dLevel.meta.bulbData != null)
					{cc.log("b");
						meta.bulbData = [];
						var bulbKeys = Object.keys(dLevel.meta.bulbData);
						for(var j=0; j<bulbKeys.length; j++)
						{
							meta.bulbData.push([]);
							var iterKeys = Object.keys(dLevel.meta.bulbData[bulbKeys[j]]);
							for(var k=0; k<iterKeys.length; k++)
							{
								meta.bulbData[j].push(dLevel.meta.bulbData[bulbKeys[j]][iterKeys[k]])
							}
						}
					}
				}
				var type = dLevel.type;
				var numMoves = dLevel.numMoves;
				var timePlayed = dLevel.timePlayed;
				var colors = dLevel.colors;
				var numRows = dLevel.numRows;
				var code = dLevel.code;
				//DATA.features.push({"bubbles":bubbles, "queue":queue, "meta":meta});
				editor_data.features.push({"bubbles":bubbles, "queue":queue, "meta":meta, "type":type, "numMoves":numMoves, "timePlayed":timePlayed, "colors":colors, "numRows":numRows, "isNew":false, "code":code});
				cc.log("push");
			}
			
		}
		
		
		cc.log("Beaten levels: ");cc.log(editor_data.levelsBeaten);
		var levelManifest = [
			["level1","level2","level3","level4","level5","level6","level7","level8"]
		];
		
		cc.log("Num levels to draw: " + numLevelsToDraw);
		
		var codesToAdd = [];
		for(var i=0; i<numLevelsToDraw; i++)
		{
			var levelFound = false;
			for(var j=0; j<levelManifest[editor_data.stage].length && !levelFound; j++)
			{
				if(editor_data.levelsBeaten.indexOf(levelManifest[editor_data.stage][j]) == -1)
				{cc.log("found level");
					levelFound = true;
					
					codesToAdd.push(levelManifest[editor_data.stage][j]);
					editor_data.levelsBeaten.push(levelManifest[editor_data.stage][j]);
					//cc.log(editor_data.levelsBeaten);
				}
				//else cc.log("not that one!");
			}
		}
		cc.log("CODES TO ADD");cc.log(codesToAdd);
		cc.log(":levelsBeaten:");cc.log(editor_data.levelsBeaten);
		
		//for(var w=0; w<codesToAdd.length; w++)
		//{cc.log(w);cc.log("Adding " + codesToAdd[w]);
		if(numLevelsToDraw > 0)
		{
			fire_database.ref("levels/masterLevels/"+editor_data.stage+"/"+codesToAdd[0]).once("value").then(function(snapshot){
				cc.log(editor_data.stage);cc.log(codesToAdd[0]);
				var w = 0;
					
				var d = snapshot.val();
			
				
				
				// Only get levels to replace empty levels
			
				//var createdKeys = Object.keys(d);
				//for(var i=0; i<createdKeys.length; i++)
				//{cc.log("Master level " + i);
					//var dLevel = d[createdKeys[i]];
					var dLevel = d;
					
					var bubbles = [];
					var bubbleKeys = Object.keys(dLevel.bubbles);
					
					DATA.createdLevelColors.push({});
					var typeKeys = {};
					cc.log(w); 	
					for(var j=0; j<bubbleKeys.length; j++)
					{
						var bub = dLevel.bubbles[bubbleKeys[j]];
						var newBub = {"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":bub.colorCode/*,"meta":bub.meta*/};
						
						bubbles.push(newBub);
					}
					//DATA.createdLevelTypes.push(typeKeys);
					cc.log(w); 	
					var queue = {};
					queue.type = dLevel.queue.type;
					queue.colors = [dLevel.queue.colors["0"], dLevel.queue.colors["1"], dLevel.queue.colors["2"], 
						dLevel.queue.colors["3"], dLevel.queue.colors["4"], dLevel.queue.colors["5"]];
						
					//var meta = {bulbData:[]};
					//for(var i=0; i<d.meta)
					var meta = {};cc.log(dLevel);
					if(dLevel.meta != null)
					{cc.log("a");
						if(dLevel.meta.bulbData != null)
						{cc.log("b");
							meta.bulbData = [];
							var bulbKeys = Object.keys(dLevel.meta.bulbData);
							for(var j=0; j<bulbKeys.length; j++)
							{
								meta.bulbData.push([]);
								var iterKeys = Object.keys(dLevel.meta.bulbData[bulbKeys[j]]);
								for(var k=0; k<iterKeys.length; k++)
								{
									meta.bulbData[j].push(dLevel.meta.bulbData[bulbKeys[j]][iterKeys[k]])
								}
							}
						}
					}
					
				
					var type = dLevel.type;
					var numMoves = dLevel.numMoves;
					var timePlayed = dLevel.timePlayed;
					var colors = dLevel.colors;
					var numRows = dLevel.numRows;
					
					var code = codesToAdd[w];
	
					//DATA.createdLevels.push({"bubbles":bubbles, "queue":queue, "meta":meta});
					editor_data.features[emptyFeatureIndices[w]] = {"bubbles":bubbles, "queue":queue, "meta":meta, "type":type, "numMoves":numMoves, "timePlayed":timePlayed, "colors":colors, "numRows":numRows, "code":code, "isNew":true};
					
				if(numLevelsToDraw == 1)	
				{cc.log("should start");
					cc.director.runScene(new EditorScene(editor_data, fire_database));
				}
			});
		}
			
			if(numLevelsToDraw == 0)
			{
				cc.director.runScene(new EditorScene(editor_data, fire_database));
			}
		
		
		});
		
		
			
		
	}
});
 