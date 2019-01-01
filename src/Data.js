var DATA = {};

DATA.levels = [];
DATA.challenges = [];
DATA.createdLevels = [];

DATA.worldNum = 0;
DATA.worldLevelIndex = 0;
DATA.worldBallsLeft = 99;
DATA.worldLevel = null;

DATA.worldBubbles = [];
DATA.challengeBubbles = [];
DATA.bubblesToAdd = [];

DATA.worldQueue = [];
DATA.challengeQueue = [];
DATA.worldActiveQueue = [];
DATA.challengeActiveQueue = [];

DATA.levelIndexA = null;
DATA.levelIndexB = null;

DATA.bubbleR = 4;

DATA.worldBubblesLeft = 0;

DATA.rank = 1;
DATA.rankProgress = 0;
DATA.rankThreshold = 30;

DATA.gems = 0;
DATA.coins = 0;

DATA.worldBallAColor = null;
DATA.worldBallBColor = null;
DATA.levelBallAColor = null;
DATA.levelBallBColor = null;


DATA.preBoosterInventoryA = 1;
DATA.boosterInventoryA = 1;
//DATA.boosterInventoryB = 0;

DATA.streakStep = 0;
DATA.challengeTries = 0;

DATA.dailyChallenges = [];
DATA.dailyChallenges.push({"type":"match-size","size":5,"number":100,"progress":0});
//DATA.dailyChallenges.push({"type":"level","number":3,"progress":0});
DATA.dailyChallenges.push({type:"cull",number:50,progress:0});

DATA.dailyAProgress = 0;
DATA.dailyBProgress = 0;

DATA.colorCodes = ["red","yellow","green","blue","pink","purple"];


DATA.userID = "000000000";
var email = "dwoodburdev@gmail.com";
 var password = "marlin81=";
 /*
 firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
  // ...
}); 
 */
 
  DATA.database = firebase.database();
  
  /*
   * SET LOCAL DATA FROM DATABASE
   */
  
  // Sets local user/world data from Database.
  // -worldLevel (bubbles, queue)
  // -coins, gems
  // -world active queue
  // -world queue
  DATA.database.ref("users/000000000").once("value").then(function(snapshot){
  	var d = snapshot.val();

	// World Level (bubbles, queue)
  	var bubbles = [];
  	var bubKeys = Object.keys(d.world.bubbles);
  	for(var i=0; i<bubKeys.length; i++)
  	{
  		var dBub = d.world.bubbles[bubKeys[i]];
  		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:dBub.colorCode};
    	bubbles.push(bubble);
  	}
  	var queue = {type:d.world.queue.type, colors:d.world.queue.colors};
  	DATA.worldLevel = {"bubbles":bubbles, "queue":queue};cc.log(DATA.worldLevel);
  	
  	// coins, gems
  	DATA.coins = d.coins;
  	DATA.gems = d.gems;
  	
  	// moves
  	DATA.worldBallsLeft = d.worldMoves;
  	
  	// Queue: active
  	var activeQueueKeys = Object.keys(d.queue);
	for(var i=0; i<activeQueueKeys.length; i++)
	{
		DATA.worldActiveQueue.push(d.queue[activeQueueKeys[i]]);
	}
	
	// Queue: world
	var queueKeys = Object.keys(d.world.queue.colors);
	for(var i=0; i<queueKeys.length; i++)
	{
		DATA.worldQueue.push(d.world.queue.colors[queueKeys[i]]);
	}
	
	// Queue: current bubble colors
	DATA.worldBallAColor = d.ballColorA;
	DATA.worldBallBColor = d.ballColorB;
	
	// Created levels
	var createdKeys = Object.keys(d.createdLevels);
	for(var i=0; i<createdKeys.length; i++)
	{
		var dLevel = d.createdLevels[createdKeys[i]];
		
		var bubbles = [];
		var bubbleKeys = Object.keys(dLevel.bubbles);
		for(var j=0; j<bubbleKeys.length; j++)
		{
			var bub = dLevel.bubbles[bubbleKeys[j]];cc.log(bub);
			var newBub = {"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":bub.colorCode}
			//if(bub.colorCode != null)
			//	newBub.colorCode = bub.colorCode;
			bubbles.push(newBub);
		}
		
		var queue = {};
		queue.type = dLevel.queue.type;
		queue.colors = [dLevel.queue.colors["0"], dLevel.queue.colors["1"], dLevel.queue.colors["2"], 
			dLevel.queue.colors["3"], dLevel.queue.colors["4"], dLevel.queue.colors["5"]];
		
		DATA.createdLevels.push({"bubbles":bubbles, "queue":queue});
	}cc.log(DATA.createdLevels);
  });
  
  // Sets local list of world levels.
  // Phase out eventually?
  DATA.database.ref("worlds/levels").once("value").then(function(snapshot){
  	var d = snapshot.val();
  	for(var i=0; i<d.length; i++)
  	{
  		var bubbles = [];
  		for(var j=0; j<d[i].bubbles.length; j++)
  		{
  			var dBub = d[i].bubbles[j];
  			var bubble = {row:dBub.row, col:dBub.col, type:dBub.type};
  			if(dBub.colorCode != null)
  				bubble["colorCode"] = dBub.colorCode;
    		bubbles.push(bubble); 
  		}
  		var queue = {type:d[i].queue.type, colors:d[i].queue.colors};
    	var level = {"queue":queue,"bubbles":bubbles};
  		DATA.levels.push(level);
  	}
  });
  
  // Sets local data for challenge-levels.
  DATA.database.ref("levels").once("value").then(function(snapshot){
  	var d = snapshot.val();
  	var challengeKeys = Object.keys(d);
  	for(var i=0; i<challengeKeys.length; i++)
  	{
  		var bubbles = [];
  		for(var j=0; j<d[challengeKeys[i]].bubbles.length; j++)
  		{
  			var dBub = d[challengeKeys[i]].bubbles[j];
  			var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:dBub.colorCode};
    		bubbles.push(bubble);
  		}
  		var queue = {type:d[challengeKeys[i]].queue.type, colors:d[challengeKeys[i]].queue.colors};
    	var moves = d[challengeKeys[i]].moves;
  		var level = {"queue":queue,"bubbles":bubbles,"moves":moves};
  		DATA.challenges.push(level);
  	}
  });

  
  /*
   * World Bubbles
   */
  
  // Removes world bubbles from database.
  DATA.removeBubblesFromDatabase = function(delPositions)
  {
  	DATA.database.ref("users/000000000/world").once("value").then(function(snapshot){
  		var d = snapshot.val();
	  	var capturedBubbles = d.bubbles;
	  	
	  	for(var i=0; i<DATA.bubblesToAdd.length; i++)
  		{
  			var key = DATA.bubblesToAdd[i].y+"_"+DATA.bubblesToAdd[i].x;
  			capturedBubbles[key] = {"col":DATA.bubblesToAdd[i].x,"row":DATA.bubblesToAdd[i].y,"type":DATA.bubblesToAdd[i].type,"colorCode":DATA.bubblesToAdd[i].colorCode};
  		}
  		DATA.bubblesToAdd = [];
	  	
	  	for(var i=0; i<delPositions.length; i++)
	  	{
	  		var key = ""+delPositions[i].y+"_"+delPositions[i].x;console.log(key);
	  		delete capturedBubbles[key];
	  	}
	  	
	  	DATA.database.ref("users/000000000/world").set({bubbles:capturedBubbles, queue:d.queue});
  	});
  };
  // Sets bubbles to add to world in database.
  DATA.setAddDatabaseBubbles = function(newBubbles)
  {
	for(var i=0; i<newBubbles.length; i++)
	{
		var key = newBubbles[i].y+"_"+newBubbles[i].x;
		DATA.bubblesToAdd.push({"x":newBubbles[i].x,"y":newBubbles[i].y,"type":newBubbles[i].type,"colorCode":newBubbles[i].colorCode});
	}
  };
  // Directly adds bubbles to world in database.
  DATA.addBubblesToDatabase = function(newBubbles)
  {
  	DATA.database.ref("users/000000000/world").once("value").then(function(snapshot){
  		var d = snapshot.val();
  		var capturedBubbles = d.bubbles;
  		if(capturedBubbles==null)
  			capturedBubbles = {};
  		
  		for(var i=0; i<newBubbles.length; i++)
  		{
  			var key = newBubbles[i].row+"_"+newBubbles[i].col;
  			
  			capturedBubbles[key] = {"col":newBubbles[i].col,"row":newBubbles[i].row,"type":newBubbles[i].type};
  			if(newBubbles[i].colorCode != null)
  				capturedBubbles[key]["colorCode"] = newBubbles[i].colorCode;
  		}
  		DATA.database.ref("users/000000000/world").set({bubbles:capturedBubbles, queue:d.queue});
  	});
  };
  
  /*
   * LEVEL EDITOR
   */
  
  DATA.saveNewLevelToDatabase = function(newBubbles)
  {
  	DATA.database.ref("users/000000000/createdLevels").once("value").then(function(snapshot){
  		var d = snapshot.val();
  		
  		var bubbleContainer = {};
  		for(var i=0; i<newBubbles.length; i++)
  		{
  			bubbleContainer[""+i] = newBubbles[i];
  		}
  		var newLevel = {"queue":{"type":"bucket","colors":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1}},
  						"bubbles":newBubbles};
  						
  		var dKeys = Object.keys(d);
  		if(dKeys.length == 1 && dKeys[0] == "00")
  		{
  			d[""+0] = newLevel;
  			delete d["00"];
  		}
  		else
  		{
  			d[""+dKeys.length] = newLevel;
  		}
  		
  		DATA.database.ref("users/000000000/createdLevels").set(d);
  	});
  }
  
  /*
   * LEVEL INDICES
   */
  
DATA.retrieveLevel = function()
{
	if(DATA.levelIndexA == null)
	{
		DATA.levelIndexA = Math.floor(Math.random()*DATA.challenges.length);
	}
	else if(DATA.levelIndexB == null)
	{
		DATA.levelIndexB = Math.floor(Math.random()*DATA.challenges.length);
	}
};
  
  
  /*
   * World Moves
   */
  
  // Sets world moves in database.
  DATA.setDatabaseMoves = function(num)
  {
  	DATA.database.ref("users/000000000/worldMoves").set(num);
  	
  };
  
  
  
 /*
  * GENERAL FUNCTIONS
  */
  
// Returns bubbles for specified level.
DATA.getBubbles = function(modeType, index)
{
	var bubbles = [];
	if(modeType == "challenge")
	{
		var dBubbles = DATA.challenges[index].bubbles;
	}
	else if(modeType == "world")
	{
		var dBubbles = DATA.levels[index].bubbles;
	}
	for(var i=0; i<dBubbles.length; i++)
	{
		var dBub = dBubbles[i];
		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:dBub.colorCode};
		bubbles.push(bubble);
	}
	
	
	return bubbles;
};

/*
 * Queue
 */

DATA.setWorldQueue = function(queue)
{
	DATA.worldQueue = [];
	DATA.worldActiveQueue = [];
	
	var colors = ["red","yellow","green","blue","pink","purple"]
	if(queue.type == "bucket")
	{
		for(var i=0; i<queue.colors.length; i++)
		{
			for(var j=0; j<queue.colors[i]; j++)
			{
				DATA.worldQueue.push(colors[i]);
				DATA.worldActiveQueue.push(colors[i]);
			}
		}
	}cc.log(DATA.worldActiveQueue);
};
DATA.setLevelQueue = function(queue)
{
	DATA.challengeQueue = [];
	DATA.challengeActiveQueue = [];
	
	DATA.levelBallAColor = null;
	DATA.levelBallBColor = null;
	
	var colors = ["red","yellow","green","blue","pink","purple"]
	if(queue.type == "bucket")
	{
		for(var i=0; i<queue.colors.length; i++)
		{
			for(var j=0; j<queue.colors[i]; j++)
			{
				DATA.challengeQueue.push(colors[i]);
				DATA.challengeActiveQueue.push(colors[i]);
			}
		}
	}
}


DATA.setQueue = function(queue)
{
	DATA.database.ref("users/000000000/queue").set({"0":DATA.worldActiveQueue[0],"1":DATA.worldActiveQueue[1],"2":DATA.worldActiveQueue[2],"3":DATA.worldActiveQueue[3],"4":DATA.worldActiveQueue[4],"5":DATA.worldActiveQueue[5]});
};

DATA.getPossibleColors = function(queue)
{
	var colors = ["red","yellow","green","blue","pink","purple"];
	var queueColors = [];
	//var queueKeys = Object.keys(queue);
	for(var i=0; i<queue.length; i++)
	{
		for(var j=0; j<queue[i]; j++)
		{
			queueColors.push(colors[i]);
		}
	}
	return queueColors;
};

DATA.setWorldShooterColor = function()
{
	var queueColors = DATA.getPossibleColors(DATA.worldActiveQueue);cc.log(queueColors);
	var colorIndex = Math.floor(Math.random()*queueColors.length);
	
	DATA.worldBallAColor = queueColors[colorIndex];cc.log(DATA.worldBallAColor);
	DATA.worldActiveQueue[DATA.colorCodes.indexOf(queueColors[colorIndex])]--;
	DATA.checkWorldQueueReset();cc.log(DATA.worldActiveQueue);
	
	DATA.setBallADatabase(DATA.worldBallAColor);
};
DATA.setWorldQueueColor = function()
{
	var queueColors = DATA.getPossibleColors(DATA.worldActiveQueue);cc.log(queueColors);
	var colorIndex = Math.floor(Math.random()*queueColors.length);
	
	DATA.worldBallBColor = queueColors[colorIndex];cc.log(DATA.worldBallBColor);
	DATA.worldActiveQueue[DATA.colorCodes.indexOf(queueColors[colorIndex])]--;
	DATA.checkWorldQueueReset();cc.log(DATA.worldActiveQueue);
	
	DATA.setBallBDatabase(DATA.worldBallBColor);
};

DATA.checkWorldQueueReset = function()
{
	for(var i=0; i<DATA.worldActiveQueue.length; i++)
	{
		if(DATA.worldActiveQueue[i] != 0)
		{
			return false;
		}
	}
	
	for(var i=0; i<DATA.worldQueue.length; i++)
		DATA.worldActiveQueue[i] = DATA.worldQueue[i];
};
DATA.checkLevelQueueReset = function()
{
	if(DATA.challengeActiveQueue.length == 0)
	{
		for(var i=0; i<DATA.challengeQueue.length; i++)
			DATA.challengeActiveQueue.push(DATA.challengeQueue[i]);
	}
};

DATA.setLevelShooterColor = function()
{
	var colorIndex = Math.floor(Math.random()*DATA.challengeActiveQueue.length);
	DATA.levelBallAColor = DATA.challengeActiveQueue[colorIndex];
	DATA.challengeActiveQueue.splice(colorIndex, 1);
	DATA.checkLevelQueueReset();
};
DATA.setLevelQueueColor = function()
{
	var colorIndex = Math.floor(Math.random()*DATA.challengeActiveQueue.length);
	DATA.levelBallBColor = DATA.challengeActiveQueue[colorIndex];
	DATA.challengeActiveQueue.splice(colorIndex, 1);
	DATA.checkLevelQueueReset();
};
DATA.getShooterColor = function(modeType)
{
	if(modeType == "world")
		return DATA.worldBallAColor;
	else if(modeType == "challenge" || modeType == "playtest")
		return DATA.levelBallAColor;
};
DATA.getQueueColor = function(modeType)
{
	if(modeType == "world")
		return DATA.worldBallBColor;
	else if(modeType == "challenge" || modeType == "playtest")
		return DATA.levelBallBColor;
};

DATA.colorNextTurn = function(modeType)
{
	if(modeType == "world")
	{
		DATA.worldBallAColor = DATA.worldBallBColor;
		DATA.setWorldQueueColor();
	}
	else if(modeType == "challenge" || modeType == "playtest")
	{
		DATA.levelBallAColor = DATA.levelBallBColor;
		DATA.setLevelQueueColor();
	}
};
DATA.swapBubbleColors = function(modeType)
{
	if(modeType == "world")
	{
		var color = DATA.worldBallAColor;
		DATA.worldBallAColor = DATA.worldBallBColor;
		DATA.worldBallBColor = color;
	}
	else if(modeType == "challenge" || modeType == "playtest")
	{
		var color = DATA.levelBallAColor;
		DATA.levelBallAColor = DATA.levelBallBColor;
		DATA.levelBallBColor = color;
	}
};


/*
 * CURRENCIES
 */

DATA.setCurrencies = function(coins, gems)
  {
  	DATA.coins = coins;
  	DATA.gems = gems;
  	if(coins != null)
  		DATA.database.ref("users/000000000/coins").set(coins);
 	if(gems != null)
 		DATA.database.ref("users/000000000/gems").set(gems);
  };

/*
 * BALL COLORS
 */

DATA.setDatabaseColors = function()
{
	DATA.setBallADatabase(DATA.worldBallAColor);
	DATA.setBallBDatabase(DATA.worldBallBColor);cc.log(DATA.worldActiveQueue);
	DATA.setQueue(DATA.worldActiveQueue);
}
DATA.setBallADatabase = function(color)
{
	DATA.worldBallAColor = color;
	DATA.database.ref("users/000000000/ballColorA").set(color);
};
DATA.setBallBDatabase = function(color)
{
	DATA.worldBallBColor = color;
	DATA.database.ref("users/000000000/ballColorB").set(color);
};

/*
 * DAILY CHALLENGES
 */

DATA.refreshProgress = function()
{
	DATA.dailyAProgress = DATA.dailyChallenges[0].progress;
	DATA.dailyBProgress = DATA.dailyChallenges[1].progress;
};

DATA.registerEvent = function(obj)
{	
	if(obj.type == "init")
	{//cc.log("EVENT: INIT - "+obj.progres+" bubbles in world");
		DATA.totalWorldBubbles = obj.progress;
		DATA.worldBubblesLeft = obj.progress;
	}
	else if(obj.type == "delete")
	{
		//cc.log("EVENT: DELETE - "+obj.progress+" bubbles deleted in world");
		DATA.worldBubblesLeft -= obj.progress;
	}
	
	for(var i=0; i<DATA.dailyChallenges.length; i++)
	{
		if(DATA.dailyChallenges[i].type == obj.type)
		{//cc.log("EVENT: "+obj.type);
			if(obj.type == "match-size")
			{//cc.log("EVENT: MATCH - "+obj.size+" bubbles matched");
				if(obj.size >= DATA.dailyChallenges[i].size)
				{
					DATA.dailyChallenges[i].progress = Math.min(DATA.dailyChallenges[i].progress+obj.progress, DATA.dailyChallenges[i].number);
				}
			}
			else
			{
				DATA.dailyChallenges[i].progress = Math.min(DATA.dailyChallenges[i].progress+obj.progress, DATA.dailyChallenges[i].number);
			}
		}
		
	}
};

/*
 * XP
 */

DATA.checkRankUp = function()
{
	var xp = 10;
	if(DATA.streakStep == 2)
		xp = 25;
	else if(DATA.streakStep == 3)
		xp = 50;
	DATA.rankProgress += xp;
	
	if(DATA.rankProgress > DATA.rankThreshold)
	{
		DATA.rank++;
		DATA.rankProgress = DATA.rankProgress - DATA.rankThreshold;
		
		return true;
	}
	return false;
};


/*
 * GLOBAL FUNCTIONS
 */

var FUNCTIONS = {};
FUNCTIONS.posWithin = function(pos, square)
{
	if(pos.x > square.x && pos.x < square.x+square.width && pos.y > square.y && pos.y < square.y+square.height)
		return true;
	return false;
};
FUNCTIONS.posWithinScaled = function(pos, img)
{
	var imgX = img.x-(img.width*img.scale*img.anchorX);
	var imgY = img.y-(img.height*img.scale*img.anchorY);
	if(pos.x > imgX && pos.x < imgX+(img.width*img.scale) &&
		pos.y > imgY && pos.y < imgY+(img.height*img.scale))
	{
		return true;
	}
	return false;
};
