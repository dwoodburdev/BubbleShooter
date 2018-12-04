var DATA = {};

DATA.levels = [];


DATA.worldNumber = 1;

cc.loader.loadJson("res/levels.json",function(error, data){
    //DATA.worlds = data.worlds;
    DATA.levels = data.levels;
    
    /*var bubbles = DATA.levels[DATA.worldLevelIndex].bubbles;
	var maxRow = 0;
	var bubbleData = [];
	for(var i=0; i<bubbles.length; i++)
	{
		if(bubbles[i].row > maxRow)
			maxRow = bubbles[i].row;
	}
	DATA.scenes["world-gameplay"] = new GameplayScene(bubbles, maxRow+1);*/
});

DATA.challenges = [];
cc.loader.loadJson("res/challenges.json",function(error, data){
    DATA.challenges = data.challenges.dice;
});

DATA.worldLevelIndex = 0;
DATA.worldBallsLeft = 15;


DATA.levelIndexA = null;
//DATA.levelIndexB = null;

DATA.bubbleR = 4;

DATA.rankProgress = .35;
DATA.coins = 10;
DATA.gems = 0;

DATA.streakStep = 0;
DATA.challengeTries = 0;

DATA.scenes = [];
//DATA.scenes["world-gameplay"] = null;



DATA.retrieveLevel = function()
{
	if(DATA.levelIndexA == null)
	{
		DATA.levelIndexA = Math.floor(Math.random()*DATA.challenges.length);cc.log("NEW LEVEL INDEX "+DATA.levelIndexA);
	}
	//else if(DATA.levelIndexB == null)
	//{
	//	DATA.levelIndexB = Math.floor(Math.random()*DATA.challenges.length);
	//}
};
