var DATA = {};

DATA.levels = [];


DATA.worldNumber = 1;

cc.loader.loadJson("res/levels.json",function(error, data){
    
    for(var i=0; i<data.levels.length; i++)
    {
    	var queue = {type:data.levels[i].queue.type, colors:data.levels[i].queue.colors};
    	var bubbles = [];
    	for(var j=0; j<data.levels[i].bubbles.length; j++)
    	{
    		var dBub = data.levels[i].bubbles[j];
    		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:dBub.colorCode};
    		bubbles.push(bubble);
    	}
    	var level = {"queue":queue,"bubbles":bubbles};
    	DATA.levels.push(level);
    }
    //DATA.levels = data.levels;
});

DATA.challenges = [];
cc.loader.loadJson("res/dummy-challenges.json",function(error, data){
    //DATA.challenges = data.challenges.dice;
    for(var i=0; i<data.challenges.dice.length; i++)
    {
    	var moves = data.challenges.dice[i].moves;
    	var queue = {type:data.challenges.dice[i].queue.type, colors:data.challenges.dice[i].queue.colors};
    	var bubbles = [];
    	for(var j=0; j<data.challenges.dice[i].bubbles.length; j++)
    	{
    		var dBub = data.challenges.dice[i].bubbles[j];
    		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:dBub.colorCode};
    		bubbles.push(bubble);
    	}
    	var level = {"moves":moves, "queue":queue,"bubbles":bubbles};
    	DATA.challenges.push(level);
    }
    
});

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



DATA.worldLevelIndex = 0;
DATA.worldBallsLeft = 15;

DATA.worldBubbles = [];
DATA.challengeBubbles = [];

DATA.worldQueue = [];
DATA.challengeQueue = [];
DATA.worldActiveQueue = [];
DATA.challengeActiveQueue = [];

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
	}
};
DATA.setLevelQueue = function(queue)
{cc.log("RIGHT HERE LALALALALA");
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
	}cc.log(DATA.challengeQueue);cc.log(DATA.challengeActiveQueue);
}

DATA.levelIndexA = null;
DATA.levelIndexB = null;

DATA.bubbleR = 4;

DATA.worldBubblesLeft = 0;

DATA.rank = 1;
DATA.rankProgress = 0;
DATA.rankThreshold = 30;
DATA.coins = 10;
DATA.gems = 0;

DATA.worldBallAColor = null;
DATA.worldBallBColor = null;
DATA.levelBallAColor = null;
DATA.levelBallBColor = null;

DATA.queueColors = [];

DATA.setQueueColors = function(colors)
{
	DATA.queueColors = colors;
};

DATA.setWorldShooterColor = function()
{
	var colorIndex = Math.floor(Math.random()*DATA.worldActiveQueue.length);
	DATA.worldBallAColor = DATA.worldActiveQueue[colorIndex];
	DATA.worldActiveQueue.splice(colorIndex, 1);
	DATA.checkWorldQueueReset();
};
DATA.setWorldQueueColor = function()
{
	//DATA.worldBallBColor = DATA.queueColors[Math.floor(Math.random()*DATA.queueColors.length)];
	var colorIndex = Math.floor(Math.random()*DATA.worldActiveQueue.length);
	DATA.worldBallBColor = DATA.worldActiveQueue[colorIndex];
	DATA.worldActiveQueue.splice(colorIndex, 1);
	DATA.checkWorldQueueReset();
};

DATA.checkWorldQueueReset = function()
{
	if(DATA.worldActiveQueue.length == 0)
	{
		for(var i=0; i<DATA.worldQueue.length; i++)
			DATA.worldActiveQueue.push(DATA.worldQueue[i]);
	}
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
	else if(modeType == "challenge")
		return DATA.levelBallAColor;
};
DATA.getQueueColor = function(modeType)
{
	if(modeType == "world")
		return DATA.worldBallBColor;
	else if(modeType == "challenge")
		return DATA.levelBallBColor;
};

DATA.colorNextTurn = function(modeType)
{
	if(modeType == "world")
	{
		DATA.worldBallAColor = DATA.worldBallBColor;
		DATA.setWorldQueueColor();
	}
	else if(modeType == "challenge")
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
	else if(modeType == "challenge")
	{
		var color = DATA.levelBallAColor;
		DATA.levelBallAColor = DATA.levelBallBColor;
		DATA.levelBallBColor = color;
	}
};

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

DATA.refreshProgress = function()
{
	DATA.dailyAProgress = DATA.dailyChallenges[0].progress;
	DATA.dailyBProgress = DATA.dailyChallenges[1].progress;
};

DATA.registerEvent = function(obj)
{cc.log(obj);
	
	if(obj.type == "init")
	{cc.log("EVENT: INIT - "+obj.progres+" bubbles in world");
		DATA.totalWorldBubbles = obj.progress;
		DATA.worldBubblesLeft = obj.progress;
	}
	else if(obj.type == "delete")
	{
		cc.log("EVENT: DELETE - "+obj.progress+" bubbles deleted in world");
		DATA.worldBubblesLeft -= obj.progress;
	}
	
	for(var i=0; i<DATA.dailyChallenges.length; i++)
	{
		if(DATA.dailyChallenges[i].type == obj.type)
		{cc.log("EVENT: "+obj.type);
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

DATA.retrieveLevel = function()
{
	if(DATA.levelIndexA == null)
	{
		DATA.levelIndexA = Math.floor(Math.random()*DATA.challenges.length);cc.log("NEW LEVEL INDEX "+DATA.levelIndexA);
	}
	else if(DATA.levelIndexB == null)
	{
		DATA.levelIndexB = Math.floor(Math.random()*DATA.challenges.length);
	}
};





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
