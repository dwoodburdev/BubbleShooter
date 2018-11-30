var DATA = {};

DATA.levels = [];
cc.loader.loadJson("res/levels.json",function(error, data){
    //DATA.worlds = data.worlds;
    DATA.levels = data.levels;
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
