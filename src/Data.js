var DATA = {};

DATA.levels = [];
DATA.challenges = [];
DATA.createdLevels = [];
DATA.setChallenges = {};
DATA.setChallenges["one-pager"] = [];

DATA.worldNum = 0;
DATA.worldBallsLeft = 99;
DATA.worldLevel = null;

DATA.worldBubbles = [];
DATA.worldMeta = {};
DATA.challengeBubbles = [];
DATA.bubblesToAdd = [];

DATA.worldIndex = 0;

DATA.worldQueue = [];
DATA.challengeQueue = [];
DATA.worldActiveQueue = [];
DATA.challengeActiveQueue = [];

//cc.sys.localStorage.setItem("userID", "000000000");

DATA.levelIndexA = null;
DATA.levelIndexB = null;

DATA.levelIndexAType = "normal";
DATA.levelIndexBType = "normal";

DATA.bubbleR = 4;

DATA.worldBubblesLeft = 0;

//DATA.rank = 1;
//DATA.rankProgress = 0;
//DATA.rankThresholds = [30,40,55,65,100,65,75,85,95,120];
//DATA.xp = 0;

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

DATA.timeLastChestOpened = 0;
DATA.timeLastMoveSpawned = 0;

DATA.timeUntilNextChallenge = {"hours":-1,"minutes":-1,"seconds":-1};
DATA.timeUntilNextDailyChest = {"hours":-1,"minutes":-1,"seconds":-1};

DATA.dailyChallenges = [];

DATA.dailyAProgress = 0;
DATA.dailyBProgress = 0;// do I need these still?

DATA.questChestNumber = 0;
DATA.questChestProgress = 0;

DATA.colorCodes = ["red","yellow","green","blue","pink","purple"];

DATA.worldColorsEliminated = [];
DATA.challengeColorsEliminated = [];

DATA.numColors = 0;

DATA.levelsComplete = {"normal":[], "one-pager":{"tier":0,"completed":[]}};


DATA.gameplayRewardsOnReturn = null;

DATA.tutorialCompleted = -1; 

DATA.userID = "JksVjAgr68PFKhwEyVzGKBr3hGW2";
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
 
DATA.initUserData = function()
{ 
  
  /*
   * SET LOCAL DATA FROM DATABASE
   */
  
  
  
  // Sets local list of world levels.
  // Phase out eventually?
  DATA.database.ref("worlds/levels").once("value").then(function(snapshot){
  	var d = snapshot.val();
  	for(var i=0; i<d.length; i++)
  	{
  		var bubbles = [];
  		var bubKeys = Object.keys(d[i].bubbles);
  		for(var j=0; j<bubKeys.length; j++)
  		{
  			var dBub = d[i].bubbles[j];
  			var bubble = {row:dBub.row, col:dBub.col, type:dBub.type};
  			if(dBub.colorCode != null)
  				bubble["colorCode"] = dBub.colorCode;
    		bubbles.push(bubble); 
  		}
  		var queue = {type:d[i].queue.type, colors:d[i].queue.colors};
  		var meta = d[i].meta;
    	var level = {"queue":queue,"bubbles":bubbles,"meta":meta};
  		DATA.levels.push(level);
  	}cc.log(DATA.levels);
  	
  	
  });
  
  // Sets local data for challenge-levels.
  DATA.database.ref("levels/normal/0").once("value").then(function(snapshot){
  	var d = snapshot.val();
  	var challengeKeys = Object.keys(d);
  	for(var i=0; i<challengeKeys.length; i++)
  	{
  		var bubbles = [];
  		for(var j=0; j<d[challengeKeys[i]].bubbles.length; j++)
  		{
  			var dBub = d[challengeKeys[i]].bubbles[j];
  			var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:dBub.colorCode, meta:dBub.meta};
    		bubbles.push(bubble);
  		}
  		var queue = {type:d[challengeKeys[i]].queue.type, colors:d[challengeKeys[i]].queue.colors};
    	var moves = d[challengeKeys[i]].moves;
  		var level = {"queue":queue,"bubbles":bubbles,"moves":moves};
  		DATA.challenges.push(level);
  	}cc.log(DATA.challenges);
  });
  
  DATA.database.ref("levels/sets/one-pager/0").once("value").then(function(snapshot){
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
  		DATA.setChallenges["one-pager"].push(level);
  	}
  });
  
  // Created levels.
  DATA.database.ref("levels/userLevels/"+DATA.userID).once("value").then(function(snapshot){
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
			for(var j=0; j<bubbleKeys.length; j++)
			{
				var bub = dLevel.bubbles[bubbleKeys[j]];
				var newBub = {"row":bub.row,"col":bub.col,"type":bub.type,"colorCode":bub.colorCode,"meta":bub.meta};
				//if(bub.colorCode != null)
				//	newBub.colorCode = bub.colorCode;
				bubbles.push(newBub);
			}
			
			var queue = {};
			queue.type = dLevel.queue.type;
			queue.colors = [dLevel.queue.colors["0"], dLevel.queue.colors["1"], dLevel.queue.colors["2"], 
				dLevel.queue.colors["3"], dLevel.queue.colors["4"], dLevel.queue.colors["5"]];
				
			//var meta = {bulbData:[]};
			//for(var i=0; i<d.meta)
			if("meta" in dLevel)
				cc.log(dLevel.meta);
			DATA.createdLevels.push({"bubbles":bubbles, "queue":queue, "meta":dLevel.meta});
		//}
	}
  });
  
  
  
  // Sets local user/world data from Database.
  // -worldLevel (bubbles, queue)
  // -coins, gems
  // -world active queue
  // -world queue
  DATA.database.ref("users/"+DATA.userID).once("value").then(function(snapshot){
  	var d = snapshot.val();

	// World Level (bubbles, queue)
  	/*var bubbles = [];
  	var bubKeys = Object.keys(d.world.bubbles);
  	for(var i=0; i<bubKeys.length; i++)
  	{
  		var dBub = d.world.bubbles[bubKeys[i]];
  		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:dBub.colorCode};
    	bubbles.push(bubble);
  	}
  	var queue = {type:d.world.queue.type, colors:d.world.queue.colors};
  	DATA.worldLevel = {"bubbles":bubbles, "queue":queue};*/
  	
  	// coins, gems
  	DATA.coins = d.coins;
  	DATA.gems = d.gems;
  	
  	// moves
  	DATA.worldBallsLeft = d.worldMoves;
  	
  	DATA.tutorialCompleted = d.tutorialCompleted;
  	
  	// time last move spawned; add moves, adjust time
  	DATA.timeLastMoveSpawned = d.timeOfLastMoveSpawn;
  	var curTime = (new Date()).getTime();
  	var elapsedTime = curTime - DATA.timeLastMoveSpawned;cc.log(elapsedTime/(1000*60*5));
  	var movesGained = false;
  	var timeInc = 1000*60*5;
  	var numMovesGained = Math.floor(elapsedTime / (timeInc));cc.log(numMovesGained);cc.log(DATA.worldBallsLeft);
  	for(var i=0; i<numMovesGained && DATA.worldBallsLeft < 5; i++)
  	{cc.log(i);
  		elapsedTime -= (timeInc);
  		DATA.worldBallsLeft++;
  		movesGained = true;
  	}
  	if(movesGained)
  	{cc.log(DATA.worldBallsLeft);
  		DATA.timeLastMoveSpawned = curTime - elapsedTime;
  		DATA.database.ref("users/"+DATA.userID+"/timeOfLastMoveSpawn").set(DATA.timeLastMoveSpawned);
  		DATA.database.ref("users/"+DATA.userID+"/worldMoves").set(DATA.worldBallsLeft);
  	}
  	
  	// time last opened daily chest
  	DATA.timeLastChestOpened = d.timeOfLastDailyChest;
  	DATA.dailyChestAvailable = d.dailyChestAvailable
  	curTime = (new Date()).getTime();
  	elapsedTime = curTime - DATA.timeLastChestOpened;
  	if(elapsedTime >= 1000*60*60*24 && !DATA.dailyChestAvailable)
  	{
  		DATA.dailyChestAvailable = true;
  		
  		DATA.database.ref("users/"+DATA.userID+"/dailyChestAvailable").set(DATA.dailyChestAvailable);
  		DATA.database.ref("users/"+DATA.userID+"/timeOfLastDailyChest").set((new Date()).getTime());
  	}
  	else
  	{
  		var hours = Math.floor(elapsedTime / (1000*60*60));
  		var minutes = Math.floor( (elapsedTime-(hours*1000*60*60)) / (1000*60) );
  		var seconds = Math.floor( (elapsedTime-(hours*1000*60*60)-(minutes*1000*60)) / (1000) );
  		DATA.timeUntilNextDailyChest = {"hours":hours,"minutes":minutes,"seconds":seconds};
  	}
  	
  	
  	// Queue: active
  	var activeQueueKeys = Object.keys(d.queue);
	for(var i=0; i<activeQueueKeys.length; i++)
	{
		DATA.worldActiveQueue.push(d.queue[activeQueueKeys[i]]);
	}
	cc.log(DATA.worldActiveQueue);
	// World index
	DATA.worldIndex = d.worldIndex
	
	
	DATA.checkTutorial();
	
	// 15 rows - 8 long, 7 short (8*12 + 7*11) = 96+77 = 173
	
	// Queue: world
	var queueKeys = Object.keys(d.world.queue.colors);
	for(var i=0; i<queueKeys.length; i++)
	{
		DATA.worldQueue.push(d.world.queue.colors[queueKeys[i]]);
		if(d.world.queue.colors[queueKeys[i]] > 0)
			DATA.numColors++;
	}
	cc.log(DATA.worldQueue);
	
	// Queue: current bubble colors
	DATA.worldBallAColor = d.ballColorA;
	DATA.worldBallBColor = d.ballColorB;
	
	// Levels in Hold, Streak Info
	if(d.levelIndexA != -1)
		DATA.levelIndexA = d.levelIndexA;
	if(d.levelIndexB != -1)
		DATA.levelIndexB = d.levelIndexB;
	DATA.streakStep = d.streakStep;
	DATA.challengeTries = d.challengeTries;
	
	DATA.levelIndexAType = d.levelIndexAType;
	DATA.levelIndexBType = d.levelIndexBType;
	
	//xp
	/*DATA.xp = d.xp;
	var xpCounter = d.xp;
	var thresholdStep = 0;
	var rankFound = false;
	
	for(var i=0; i<DATA.rankThresholds.length && !rankFound; i++)
	{
		xpCounter -= DATA.rankThresholds[thresholdStep];
		if(xpCounter > 0)
		{
			thresholdStep++;
			DATA.rank++;
		}
		else
		{
			DATA.rankProgress = xpCounter;
		}
		
	}*/
	
	// Daily Chest
	DATA.questChestNumber = 7;
	DATA.questChestProgress = d.questChestProgress;
	
	// Daily Challenges
	var challengeKeys = Object.keys(d.dailyChallenges);
	for(var i=0; i<challengeKeys.length; i++)
	{
		var dChallenge = d.dailyChallenges[challengeKeys[i]];
		var newChallenge = {};
		newChallenge.type = dChallenge.type;
		newChallenge.progress = dChallenge.progress;
		newChallenge.number = dChallenge.number;
		newChallenge.balls = dChallenge.balls;
		newChallenge.coins = dChallenge.coins;
		if(dChallenge.type == "match-size")
		{
			newChallenge.size = dChallenge.size;
		}
		DATA.dailyChallenges.push(newChallenge);
	}
	
	// time last received Daily Challenge
	// spawn new Challenge if necessary
  	DATA.timeLastChallengeReceived = d.timeOfLastChallenge;
  	curTime = (new Date()).getTime();
  	elapsedTime = curTime - DATA.timeLastChallengeReceived;
  	if(elapsedTime >= 1000*60*60*24 && DATA.dailyChallenges.length < 3)
  	{
  		var newChallenge = {"coins":5,"number":5,"progress":0,"type":"level","balls":5};
  		DATA.dailyChallenges.push(newChallenge);
  		DATA.timeLastChallengeReceived = curTime;
  		
  		DATA.database.ref("users/"+DATA.userID+"/dailyChallenges").set(DATA.dailyChallenges);
  		DATA.database.ref("users/"+DATA.userID+"/timeOfLastChallenge").set(DATA.timeLastChallengeReceived);
  	}
  	else
  	{
  		var hours = Math.floor(elapsedTime / (1000*60*60));
  		var minutes = Math.floor( (elapsedTime-(hours*1000*60*60)) / (1000*60) );
  		var seconds = Math.floor( (elapsedTime-(hours*1000*60*60)-(minutes*1000*60)) / (1000) );
  		DATA.timeUntilNextChallenge = {"hours":hours,"minutes":minutes,"seconds":seconds};
  	}
  	
  	
	// Booster Inventories
	DATA.preBoosterInventoryA = d.preBoosterInventories["0"];
	DATA.boosterInventoryA = d.boosterInventories["0"];
	
	// Completed Levels (will take reworking depending on levels needed)
	var normalLevels = d.levelsComplete.normal["0"];
	for(var i=0; i<normalLevels.length; i++)
	{
		DATA.levelsComplete["normal"].push(normalLevels[i]);
	}
	var setLevels = d.levelsComplete.sets;
	var setKeys = Object.keys(setLevels);
	for(var i=0; i<setKeys.length; i++)
	{
		DATA.levelsComplete[setKeys[i]].tier = setLevels[setKeys[i]].tier;
		
		for(var j=0; j<setLevels[setKeys[i]].completed.length; j++)
		{
			DATA.levelsComplete[setKeys[i]].completed.push(setLevels[setKeys[i]].completed[j]);
		}
	}cc.log(DATA.levelsComplete);
	
	
	//var bubbles = [ {  "col" : 0,  "colorCode" : "green",  "row" : 0,  "type" : 0}, {  "col" : 1,  "colorCode" : "green",  "row" : 0,  "type" : 0}, {  "col" : 2,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 3,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 7,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 8,  "colorCode" : "blue",  "row" : 0,  "type" : 0}, {  "col" : 9,  "colorCode" : "blue",  "row" : 0,  "type" : 0}, {  "col" : 10,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 11,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 0,  "colorCode" : "yellow",  "row" : 1,  "type" : 0}, {  "col" : 1,  "colorCode" : "yellow",  "row" : 1,  "type" : 0}, {  "col" : 2,  "colorCode" : "blue",  "row" : 1,  "type" : 0}, {  "col" : 3,  "colorCode" : "blue",  "row" : 1,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 1,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 1,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 1,  "type" : 0}, {  "col" : 8,  "colorCode" : "green",  "row" : 1,  "type" : 0}, {  "col" : 9,  "colorCode" : "red",  "row" : 1,  "type" : 0}, {  "col" : 10,  "colorCode" : "red",  "row" : 1,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 2,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 2,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 3,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 3,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 4,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 5,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 4,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 5,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 6,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 7,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 6,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 7,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 8,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 9,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 8,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 9,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 10,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 10,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 11,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 11,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 12,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 13,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 13,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 14,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 14,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 15,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 15,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 16,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 16,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 17,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 18,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 17,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 18,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 19,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 20,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 19,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 20,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 21,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 22,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 23,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 24,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 24,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 23,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 22,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 21,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 25,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 27,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 28,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 29,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 30,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 31,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 32,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 33,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 34,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 35,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 36,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 25,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 26,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 27,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 28,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 29,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 30,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 31,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 32,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 33,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 34,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 35,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 36,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 13,  "type" : 0}, {  "col" : 8,  "colorCode" : "green",  "row" : 13,  "type" : 0}, {  "col" : 9,  "colorCode" : "yellow",  "row" : 13,  "type" : 0}, {  "col" : 10,  "colorCode" : "yellow",  "row" : 13,  "type" : 0}, {  "col" : 3,  "colorCode" : "red",  "row" : 13,  "type" : 0}, {  "col" : 2,  "colorCode" : "red",  "row" : 13,  "type" : 0}, {  "col" : 1,  "colorCode" : "blue",  "row" : 13,  "type" : 0}, {  "col" : 0,  "colorCode" : "blue",  "row" : 13,  "type" : 0}, {  "col" : 0,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 1,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 2,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 3,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 12,  "type" : 0}, {  "col" : 7,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 8,  "colorCode" : "red",  "row" : 12,  "type" : 0}, {  "col" : 9,  "colorCode" : "red",  "row" : 12,  "type" : 0}, {  "col" : 10,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 11,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 8,  "colorCode" : "blue",  "row" : 26,  "type" : 0}, {  "col" : 9,  "colorCode" : "blue",  "row" : 26,  "type" : 0}, {  "col" : 10,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 11,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 7,  "colorCode" : "yellow",  "row" : 27,  "type" : 0}, {  "col" : 8,  "colorCode" : "yellow",  "row" : 27,  "type" : 0}, {  "col" : 9,  "colorCode" : "green",  "row" : 27,  "type" : 0}, {  "col" : 10,  "colorCode" : "green",  "row" : 27,  "type" : 0}, {  "col" : 3,  "colorCode" : "red",  "row" : 27,  "type" : 0}, {  "col" : 2,  "colorCode" : "red",  "row" : 27,  "type" : 0}, {  "col" : 1,  "colorCode" : "blue",  "row" : 27,  "type" : 0}, {  "col" : 0,  "colorCode" : "blue",  "row" : 27,  "type" : 0}, {  "col" : 1,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 2,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 3,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 26,  "type" : 0}, {  "col" : 0,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 37,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 37,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 39,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 39,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 3,  "colorCode" : "blue",  "row" : 38,  "type" : 0}, {  "col" : 2,  "colorCode" : "blue",  "row" : 38,  "type" : 0}, {  "col" : 1,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 0,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 0,  "colorCode" : "red",  "row" : 39,  "type" : 0}, {  "col" : 1,  "colorCode" : "red",  "row" : 39,  "type" : 0}, {  "col" : 2,  "colorCode" : "yellow",  "row" : 39,  "type" : 0}, {  "col" : 3,  "colorCode" : "yellow",  "row" : 39,  "type" : 0}, {  "col" : 7,  "colorCode" : "blue",  "row" : 39,  "type" : 0}, {  "col" : 8,  "colorCode" : "blue",  "row" : 39,  "type" : 0}, {  "col" : 9,  "colorCode" : "green",  "row" : 39,  "type" : 0}, {  "col" : 10,  "colorCode" : "green",  "row" : 39,  "type" : 0}, {  "col" : 11,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 10,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 9,  "colorCode" : "yellow",  "row" : 38,  "type" : 0}, {  "col" : 8,  "colorCode" : "yellow",  "row" : 38,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 40,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 40,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 41,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 41,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 42,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 42,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 43,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 44,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 44,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 43,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 45,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 46,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 45,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 46,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 47,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 48,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 47,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 48,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 49,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 50,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 49,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 50,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 51,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 52,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 52,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 51,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 28,  "type" : 0}, {  "col" : 7,  "colorCode" : "blue",  "row" : 28,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 14,  "type" : 0}, {  "col" : 7,  "colorCode" : "red",  "row" : 14,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 2,  "type" : 0}, {  "col" : 7,  "colorCode" : "blue",  "row" : 2,  "type" : 0}, {  "col" : 5,  "row" : 49,  "type" : 20}, {  "col" : 5,  "row" : 45,  "type" : 20}, {  "col" : 5,  "row" : 35,  "type" : 20}, {  "col" : 5,  "row" : 31,  "type" : 20}, {  "col" : 5,  "row" : 25,  "type" : 20}, {  "col" : 5,  "row" : 19,  "type" : 20}, {  "col" : 5,  "row" : 13,  "type" : 20}, {  "col" : 5,  "row" : 7,  "type" : 20}, {  "col" : 5,  "row" : 1,  "type" : 20} ];
	var maxRow = 0;
	for(var i=0; i<DATA.worldBubbles.length; i++)
	{
		if(DATA.worldBubbles[i].row > maxRow)
			maxRow = DATA.worldBubbles[i].row;
	}
	
	DATA.worldMeta = d.world.meta;cc.log(DATA.worldMeta);
	
  cc.director.runScene(new MainContainerScene(DATA.worldBubbles, maxRow+1, DATA.worldMeta));
  });
  
  
	/*var bubbles = [ {  "col" : 0,  "colorCode" : "green",  "row" : 0,  "type" : 0}, {  "col" : 1,  "colorCode" : "green",  "row" : 0,  "type" : 0}, {  "col" : 2,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 3,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 7,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 8,  "colorCode" : "blue",  "row" : 0,  "type" : 0}, {  "col" : 9,  "colorCode" : "blue",  "row" : 0,  "type" : 0}, {  "col" : 10,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 11,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 0,  "colorCode" : "yellow",  "row" : 1,  "type" : 0}, {  "col" : 1,  "colorCode" : "yellow",  "row" : 1,  "type" : 0}, {  "col" : 2,  "colorCode" : "blue",  "row" : 1,  "type" : 0}, {  "col" : 3,  "colorCode" : "blue",  "row" : 1,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 1,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 1,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 1,  "type" : 0}, {  "col" : 8,  "colorCode" : "green",  "row" : 1,  "type" : 0}, {  "col" : 9,  "colorCode" : "red",  "row" : 1,  "type" : 0}, {  "col" : 10,  "colorCode" : "red",  "row" : 1,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 2,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 2,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 3,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 3,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 4,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 5,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 4,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 5,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 6,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 7,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 6,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 7,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 8,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 9,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 8,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 9,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 10,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 10,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 11,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 11,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 12,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 13,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 13,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 14,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 14,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 15,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 15,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 16,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 16,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 17,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 18,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 17,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 18,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 19,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 20,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 19,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 20,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 21,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 22,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 23,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 24,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 24,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 23,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 22,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 21,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 25,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 27,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 28,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 29,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 30,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 31,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 32,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 33,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 34,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 35,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 36,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 25,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 26,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 27,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 28,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 29,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 30,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 31,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 32,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 33,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 34,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 35,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 36,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 13,  "type" : 0}, {  "col" : 8,  "colorCode" : "green",  "row" : 13,  "type" : 0}, {  "col" : 9,  "colorCode" : "yellow",  "row" : 13,  "type" : 0}, {  "col" : 10,  "colorCode" : "yellow",  "row" : 13,  "type" : 0}, {  "col" : 3,  "colorCode" : "red",  "row" : 13,  "type" : 0}, {  "col" : 2,  "colorCode" : "red",  "row" : 13,  "type" : 0}, {  "col" : 1,  "colorCode" : "blue",  "row" : 13,  "type" : 0}, {  "col" : 0,  "colorCode" : "blue",  "row" : 13,  "type" : 0}, {  "col" : 0,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 1,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 2,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 3,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 12,  "type" : 0}, {  "col" : 7,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 8,  "colorCode" : "red",  "row" : 12,  "type" : 0}, {  "col" : 9,  "colorCode" : "red",  "row" : 12,  "type" : 0}, {  "col" : 10,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 11,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 8,  "colorCode" : "blue",  "row" : 26,  "type" : 0}, {  "col" : 9,  "colorCode" : "blue",  "row" : 26,  "type" : 0}, {  "col" : 10,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 11,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 7,  "colorCode" : "yellow",  "row" : 27,  "type" : 0}, {  "col" : 8,  "colorCode" : "yellow",  "row" : 27,  "type" : 0}, {  "col" : 9,  "colorCode" : "green",  "row" : 27,  "type" : 0}, {  "col" : 10,  "colorCode" : "green",  "row" : 27,  "type" : 0}, {  "col" : 3,  "colorCode" : "red",  "row" : 27,  "type" : 0}, {  "col" : 2,  "colorCode" : "red",  "row" : 27,  "type" : 0}, {  "col" : 1,  "colorCode" : "blue",  "row" : 27,  "type" : 0}, {  "col" : 0,  "colorCode" : "blue",  "row" : 27,  "type" : 0}, {  "col" : 1,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 2,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 3,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 26,  "type" : 0}, {  "col" : 0,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 37,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 37,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 39,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 39,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 3,  "colorCode" : "blue",  "row" : 38,  "type" : 0}, {  "col" : 2,  "colorCode" : "blue",  "row" : 38,  "type" : 0}, {  "col" : 1,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 0,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 0,  "colorCode" : "red",  "row" : 39,  "type" : 0}, {  "col" : 1,  "colorCode" : "red",  "row" : 39,  "type" : 0}, {  "col" : 2,  "colorCode" : "yellow",  "row" : 39,  "type" : 0}, {  "col" : 3,  "colorCode" : "yellow",  "row" : 39,  "type" : 0}, {  "col" : 7,  "colorCode" : "blue",  "row" : 39,  "type" : 0}, {  "col" : 8,  "colorCode" : "blue",  "row" : 39,  "type" : 0}, {  "col" : 9,  "colorCode" : "green",  "row" : 39,  "type" : 0}, {  "col" : 10,  "colorCode" : "green",  "row" : 39,  "type" : 0}, {  "col" : 11,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 10,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 9,  "colorCode" : "yellow",  "row" : 38,  "type" : 0}, {  "col" : 8,  "colorCode" : "yellow",  "row" : 38,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 40,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 40,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 41,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 41,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 42,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 42,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 43,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 44,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 44,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 43,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 45,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 46,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 45,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 46,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 47,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 48,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 47,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 48,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 49,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 50,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 49,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 50,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 51,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 52,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 52,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 51,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 28,  "type" : 0}, {  "col" : 7,  "colorCode" : "blue",  "row" : 28,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 14,  "type" : 0}, {  "col" : 7,  "colorCode" : "red",  "row" : 14,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 2,  "type" : 0}, {  "col" : 7,  "colorCode" : "blue",  "row" : 2,  "type" : 0}, {  "col" : 5,  "row" : 49,  "type" : 20}, {  "col" : 5,  "row" : 45,  "type" : 20}, {  "col" : 5,  "row" : 35,  "type" : 20}, {  "col" : 5,  "row" : 31,  "type" : 20}, {  "col" : 5,  "row" : 25,  "type" : 20}, {  "col" : 5,  "row" : 19,  "type" : 20}, {  "col" : 5,  "row" : 13,  "type" : 20}, {  "col" : 5,  "row" : 7,  "type" : 20}, {  "col" : 5,  "row" : 1,  "type" : 20} ];
	var maxRow = 0;
	for(var i=0; i<bubbles.length; i++)
	{
		if(bubbles[i].row > maxRow)
			maxRow = bubbles[i].row;
	}
  
  cc.director.runScene(new GameplayScene(bubbles, maxRow+1));*/
  
}



DATA.checkTutorial = function(numBubbles)
{
	DATA.tutorial = null;
	if(DATA.worldIndex == 0)
	{
		if(numBubbles >= 242)	// First shot (bubble row)
		{
			DATA.tutorial = {type:"hold", id:0};
		}
		else if(numBubbles >= 230)	// Make match on row row 13
		{
			DATA.tutorial = {type:"target-positions", id:1, positions:[{x:0,y:20},{x:1,y:20},{x:2,y:20},{x:3,y:20},{x:4,y:20}] };
		}
		else if(numBubbles >= 226)	// Make soap drop on row 12
		{
			DATA.tutorial = {type:"target-positions", id:2, positions:[{x:0,y:19},{x:1,y:19},{x:2,y:19},{x:3,y:19}] };
		}
		else if(numBubbles >= 184 && DATA.tutorialCompleted < 3)	// Make match
		{
			DATA.tutorial = {type:"target-positions", id:3, positions:[{x:7,y:16},{x:8,y:16},{x:9,y:16},{x:10,y:16},{x:11,y:16}] };
		}
		else if(numBubbles >= 180 && DATA.tutorialCompleted < 4)	// Swap
		{
			DATA.tutorial = {type:"swap", id:4};
		}
		else if(numBubbles == 127 && DATA.tutorialCompleted < 5) // Hit first star
		{
			DATA.tutorial = {type:"target-positions", id:5, positions:[{x:5,y:11}, {x:6,y:11}] };
		}
		else if(numBubbles == 64 && DATA.tutorialCompleted < 6)
		{
			DATA.tutorial = {type:"pick-path-callout", id:6};
		}
	}
	else if(DATA.worldIndex == 1)
	{
		if(numBubbles == 204)
		{
			DATA.tutorial = {type:"target-positions",id:7,positions:[{x:5,y:18},{x:6,y:18}]};
		}
	}
	
	else if(DATA.worldIndex == 3)
	{
		if(numBubbles == 252)
		{
			DATA.tutorial = {type:"target-positions",id:8,positions:[{x:5,y:30},{x:6,y:30}]};
		}
	}
	
	return DATA.tutorial;
};


DATA.setTutorialCompleted = function(num)
{
	DATA.tutorialCompleted = num;
	DATA.database.ref("users/"+DATA.userID+"/tutorialCompleted").set(num);
};


DATA.refreshTimeUntilNextChallenge = function()
  	{
  		var elapsedTime = (new Date()).getTime() - DATA.timeLastChallengeReceived;
  		var elapsedTime = Math.max((1000*60*60*24) - elapsedTime, 0);
  		var hours = Math.floor(elapsedTime / (1000*60*60));
  		var minutes = Math.floor( (elapsedTime-(hours*1000*60*60)) / (1000*60) );
  		var seconds = Math.floor( (elapsedTime-(hours*1000*60*60)-(minutes*1000*60)) / (1000) );
  		DATA.timeUntilNextChallenge = {"hours":hours,"minutes":minutes,"seconds":seconds};
  	};
  	
DATA.refreshTimeUntilNextDailyChest = function()
{
	var elapsedTime = (new Date()).getTime() - DATA.timeLastChestOpened;
	var elapsedTime = Math.max((1000*60*60*24) - elapsedTime, 0);
	var hours = Math.floor(elapsedTime / (100*60*60));
	var minutes = Maht.floor( (elapsedTime-(hours*1000*60*60)) / (1000*60) );
	var seconds = Math.floor( (elapsedTime-(hours*1000*60*60)-(minutes*1000*60)) / (1000) );
	DATA.timeUntilNextDailyChest = {"hours":hours,"minutes":minutes,"seconds":seconds};
};
  	
DATA.setLastTimeDailyChestOpened = function()
{
	DATA.timeLastChestOpened = (new Date()).getTime();
	DATA.database.ref("users/"+DATA.userID+"/timeOfLastDailyChest").set(DATA.timeLastChestOpened);
};
	
DATA.spawnNewDailyChallenge = function()
{
	var newChallenge = {"coins":5,"number":5,"progress":0,"type":"level","balls":5};
	DATA.dailyChallenges.push(newChallenge);
	DATA.timeLastChallengeReceived = (new Date()).getTime();
	
	DATA.database.ref("users/"+DATA.userID+"/dailyChallenges").set(DATA.dailyChallenges);
	DATA.database.ref("users/"+DATA.userID+"/timeOfLastChallenge").set(DATA.timeLastChallengeReceived);
};
  
  DATA.setLastTimeMoveSpawned = function()
  {
  	DATA.timeLastMoveSpawned = (new Date()).getTime();
  	DATA.database.ref("users/"+DATA.userID+"/timeOfLastMoveSpawn").set(DATA.timeLastMoveSpawned);
  	
  };

  
  DATA.getChallengeText = function(challenge)
  {
  	if(challenge.type == "match-size")
  	{
  		return "Make matches sized "+challenge.size+"+.";
  	}
  	else if(challenge.type == "level")
  	{
  		return "Beat "+challenge.number+" levels.";
  	}
  };
  /*
   * World Bubbles
   */
  
  // Removes world bubbles from database.
  DATA.removeBubblesFromDatabase = function(delPositions)
  {
  	DATA.database.ref("users/"+DATA.userID+"/world").once("value").then(function(snapshot){
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
	  		var key = ""+delPositions[i].y+"_"+delPositions[i].x;
	  		delete capturedBubbles[key];
	  	}
	  	
	  	DATA.database.ref("users/"+DATA.userID+"/world").set({bubbles:capturedBubbles, queue:d.queue});
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
  	DATA.database.ref("users/"+DATA.userID+"/world").once("value").then(function(snapshot){
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
  		DATA.database.ref("users/"+DATA.userID+"/world").set({bubbles:capturedBubbles, queue:d.queue});
  	});
  };
  
  DATA.setWorldDatabaseBubbles = function(newBubbles, newQueue, newMeta)
  {
  	DATA.database.ref("users/"+DATA.userID+"/world").once("value").then(function(snapshot){
  		var d = snapshot.val();
  		//var capturedBubbles = d.bubbles;
  		//if(capturedBubbles==null)
  		//	capturedBubbles = {};
  		var capturedBubbles = {};
  		
  		for(var i=0; i<newBubbles.length; i++)
  		{
  			var key = newBubbles[i].row+"_"+newBubbles[i].col;
  			
  			capturedBubbles[key] = {"col":newBubbles[i].col,"row":newBubbles[i].row,"type":newBubbles[i].type};
  			if(newBubbles[i].colorCode != null)
  				capturedBubbles[key]["colorCode"] = newBubbles[i].colorCode;
  		}
  		DATA.database.ref("users/"+DATA.userID+"/world").set({bubbles:capturedBubbles, queue:newQueue, meta:newMeta});
  	});
  };
  
  /*
   * LEVEL EDITOR
   */
  DATA.isAdmin = function(){return true;};
  DATA.saveNewLevelToDatabase = function(newBubbles, newWorldMeta)
  {
  	DATA.database.ref("levels/userLevels/"+DATA.userID).once("value").then(function(snapshot){
  		var d = snapshot.val();
  		
  		var bubbleContainer = {};
  		for(var i=0; i<newBubbles.length; i++)
  		{
  			bubbleContainer[""+i] = newBubbles[i];
  		}
  		var newLevel = {"queue":{"type":"bucket","colors":{"0":1,"1":1,"2":1,"3":1,"4":1,"5":1}},
  						"bubbles":newBubbles,
  						"meta":newWorldMeta};
  						
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
  		cc.log(DATA.userID);cc.log(d);
  		DATA.database.ref("levels/userLevels/"+DATA.userID).set(d);
  		
  		if(DATA.isAdmin())
   		{
   			var levelName = prompt("Level Name","");
   			
   			if(levelName == "world")
   			{
   				var worldNumber = prompt("World Number","");
   				DATA.database.ref("worlds/levels/"+worldNumber).set(newLevel);
   			}
   			else DATA.database.ref("levels/masterLevels/"+levelName).set(newLevel);
   		}
  	});
  }
  
  /*
   * LEVEL INDICES
   */
  
DATA.retrieveLevel = function(levelId)
{
	if(DATA.levelIndexA == null)
	{
		//if(Math.random() > .6667)
		//{
			if(levelId != null)
			{
				DATA.levelIndexA = levelId;
			}
			else DATA.levelIndexA = Math.floor(Math.random()*DATA.challenges.length);
			DATA.levelIndexAType = "normal";
		//}
		/*else
		{
			DATA.levelIndexAType = "one-pager";
			DATA.levelIndexA = Math.floor(Math.random()*DATA.setChallenges[DATA.levelIndexAType].length);
		}*/
		DATA.database.ref("users/"+DATA.userID+"/levelIndexAType").set(DATA.levelIndexAType);
		DATA.database.ref("users/"+DATA.userID+"/levelIndexA").set(DATA.levelIndexA);
	}
	else if(DATA.levelIndexB == null)
	{
		//if(Math.random() > .333)
		//{
			if(levelId != null)
			{
				DATA.levelIndexA = levelId;
			}
			else DATA.levelIndexB = Math.floor(Math.random()*DATA.challenges.length);
			DATA.levelIndexBType = "normal";
		//}
		/*else
		{
			DATA.levelIndexBType = "one-pager";
			DATA.levelIndexB = Math.floor(Math.random()*DATA.setChallenges[DATA.levelIndexBType].length);
		}*/
		DATA.database.ref("users/"+DATA.userID+"/levelIndexB").set(DATA.levelIndexB);
	}
};

DATA.updateDatabaseLevelIndices = function()
{
	if(DATA.levelIndexA == null)
		DATA.database.ref("users/"+DATA.userID+"/levelIndexA").set(-1);
	else DATA.database.ref("users/"+DATA.userID+"/levelIndexA").set(DATA.levelIndexA);
	
	if(DATA.levelIndexB == null)
		DATA.database.ref("users/"+DATA.userID+"/levelIndexB").set(-1);
	else DATA.database.ref("users/"+DATA.userID+"/levelIndexB").set(DATA.levelIndexB);
};

DATA.updateDatabaseStreak = function()
{
	DATA.database.ref("users/"+DATA.userID+"/streakStep").set(DATA.streakStep);
	DATA.database.ref("users/"+DATA.userID+"/challengeTries").set(DATA.challengeTries);
};
  
  
  /*
   * World Moves
   */
  
  // Sets world moves in database.
  DATA.setDatabaseMoves = function(num)
  {
  	DATA.database.ref("users/"+DATA.userID+"/worldMoves").set(num);
  	
  	if(num == 4)
  	{
  		DATA.database.ref("users/"+DATA.userID+"/timeOfLastMoveSpawn").set((new Date()).getTime());
  	}
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
	DATA.database.ref("users/"+DATA.userID+"/queue").set({"0":DATA.worldActiveQueue[0],"1":DATA.worldActiveQueue[1],"2":DATA.worldActiveQueue[2],"3":DATA.worldActiveQueue[3],"4":DATA.worldActiveQueue[4],"5":DATA.worldActiveQueue[5]});
};

DATA.getPossibleColors = function(queue)
{cc.log(queue);
	var colors = ["red","yellow","green","blue","pink","purple"];
	var queueColors = [];
	//var queueKeys = Object.keys(queue);
	for(var i=0; i<queue.length; i++)
	{
		for(var j=0; j<queue[i]; j++)
		{
			queueColors.push(colors[i]);
		}
	}cc.log(queueColors);
	return queueColors;
};

DATA.resetForNewWorld = function()
{
	for(var i=0; i<DATA.worldQueue.length; i++)
		DATA.worldActiveQueue[i] = DATA.worldQueue[i];
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
  	//DATA.gems = gems;
  	if(coins != null)
  		DATA.database.ref("users/"+DATA.userID+"/coins").set(coins);
 	//if(gems != null)
 	//	DATA.database.ref("users/"+DATA.userID+"/gems").set(gems);
  };
  
 /*
  * INVENTORIES
  */
 DATA.setBoosterInventories = function(invA)
 {
 	DATA.boosterInventoryA = invA;
 	DATA.database.ref("users/"+DATA.userID+"/boosterInventories").set({"0":DATA.boosterInventoryA});
 };
 DATA.setPreBoosterInventories = function(invA)
 {
 	DATA.preBoosterInventoryA = invA;
 	DATA.database.ref("users/"+DATA.userID+"/preBoosterInventories").set({"0":DATA.preBoosterInventoryA});
 };
 
 
 // World Index (Ref)
 DATA.updateWorldIndexDatabase = function(index)
 {
 	DATA.worldIndex = index;
 	DATA.database.ref("users/"+DATA.userID+"/worldIndex").set(DATA.worldIndex);
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
	if(color != null)
	{
	DATA.worldBallAColor = color;
	DATA.database.ref("users/"+DATA.userID+"/ballColorA").set(color);
	}
};
DATA.setBallBDatabase = function(color)
{
	if(color != null)
	{
	DATA.worldBallBColor = color;
	DATA.database.ref("users/"+DATA.userID+"/ballColorB").set(color);
	}
};

/*
 * DAILY CHALLENGES
 */

DATA.refreshProgress = function()
{
	DATA.dailyAProgress = DATA.dailyChallenges[0].progress;
	DATA.dailyBProgress = DATA.dailyChallenges[1].progress;
};

DATA.deleteChallenge = function(num)
{
	if(num < DATA.dailyChallenges.length)
	{
		DATA.dailyChallenges.splice(num, 1);
	}
	var challengeObject = {};
	for(var i=0; i<DATA.dailyChallenges.length; i++)
	{
		challengeObject[""+i] = DATA.dailyChallenges[i];
	}
	DATA.database.ref("users/"+DATA.userID+"/dailyChallenges").set(challengeObject);
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
			
			DATA.database.ref("users/"+DATA.userID+"/dailyChallenges/"+i+"/progress").set(DATA.dailyChallenges[i].progress);
			
		}
		
	}
};

DATA.worldElements = {};
DATA.worldElements["2"] = "bomb";
DATA.worldElements["3"] = "bulb";
DATA.worldElements["4"] = "cd";
DATA.worldElements["5"] = "line-super";
DATA.worldElements["6"] = "die";
DATA.worldElements["7"] = "dagger";
DATA.worldElements["8"] = "8-ball";
DATA.worldElements["9"] = "puzzle";
DATA.worldElements["10"] = "beachball";
DATA.worldElements["15"] = "puzzle";
DATA.worldElements["17"] = "cloud";
DATA.worldElements["19"] = "puzzle";
DATA.worldElements["21"] = "orb";
DATA.worldElements["23"] = "puzzle";
DATA.worldElements["25"] = "soapbar";
DATA.worldElements["27"] = "puzzle";
DATA.worldElements["30"] = "web";
DATA.worldElements["33"] = "puzzle";
DATA.worldElements["36"] = "package";
DATA.worldElements["39"] = "puzzle";
DATA.worldElements["42"] = "balloon";
DATA.worldElements["45"] = "puzzle";
DATA.worldElements["50"] = "pallette";

/*
 * XP
 */

/*DATA.checkRankUp = function()
{
	var xp = 10;
	if(DATA.streakStep == 2)
		xp = 25;
	else if(DATA.streakStep == 3)
		xp = 50;
	DATA.rankProgress += xp;
	DATA.xp += xp;
	
	DATA.database.ref("users/"+DATA.userID+"/xp").set(DATA.xp);
	
	if(DATA.rankProgress > DATA.rankThresholds[DATA.rank-1])
	{
		DATA.rank++;
		DATA.rankProgress = DATA.rankProgress - DATA.rankThresholds[DATA.rank-1];
		
		return true;
	}
	return false;
};*/

/*DATA.addXP = function(num)
{
	DATA.rankProgress += num;
};*/



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
	var imgX = img.x-(img.width*img.scaleX*img.anchorX);
	var imgY = img.y-(img.height*img.scaleY*img.anchorY);
	if(pos.x > imgX && pos.x < imgX+(img.width*img.scaleX) &&
		pos.y > imgY && pos.y < imgY+(img.height*img.scaleY))
	{
		return true;
	}
	return false;
};

FUNCTIONS.convertCodesToColors = function(codes)
{
	var colorCodes = ["red","yellow","green","blue","pink","purple"];
	var translations = [];
	for(var i=0; i<codes.length; i++)
	{
		translations.push(colorCodes[codes[i]]);
	}
	return translations;
};

FUNCTIONS.coordIn = function(coord, list)
{
	for(var i=0; i<list.length; i++)
	{
		if(coord.x == list[i].x && coord.y == list[i].y)
		{
			return true;
		}
	}
	return false;
};

//var demBubs =  ;
DATA.resetWorld = function()
{cc.log("reset");
DATA.tutorialCompleted = -1;
	DATA.database.ref("worlds/levels/"+DATA.worldIndex).once("value").then(function(snapshot){
		
		//var demBubsObj = {};
		var demBubsObj = {};
		var demBubs = snapshot.val().bubbles;
		for(var i=0; i<demBubs.length; i++)
		{
			var bub = demBubs[i];
			demBubsObj[""+bub.row+"_"+bub.col] = bub;
		}cc.log(demBubsObj);
		DATA.database.ref("users/"+DATA.userID+"/world/bubbles").set(demBubsObj);
		
	});
};

DATA.resetWorld();
 
