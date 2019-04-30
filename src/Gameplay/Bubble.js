var Bubble = cc.Sprite.extend({
	ctor:function(r,color,type,orientation,binary,meta,row,col){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
        
        this.r = r;
        this.colorCode = color;//if(color === undefined)this.colorCode = null;cc.log(this.colorCode);
        this.type = type;
        this.orientation = orientation;
        this.binary = binary;
        this.meta = meta;
        this.triggered = false;
        this.colorQueue = [];
        //this.anchor = false;
        //this.active = true;
        this.onMatch = null; 		// Clears when matched (can still have on-match effect)
        this.onClear = null; 		// Clearable by supers
        //this.clustered = false;
        this.onTrespass = null;
        
        this.matchable = false;
        
        this.onHit = null;    		// Has on-hit effect	
        this.onAdjMatch = null;	// Has on-adjacent-match effect
        
        this.isAnchor = false;
        
        this.active = false;
        
        this.bulbLabel = null;
        
 		       //this.explosive = false;		// Has clearing effect (associated with on-hit or on-match or on-adj-match) ! (should associate this with each on-X effect in case has multiple effects depending)
        		//this.aoe = null;			// AoE for effect (need to think about this)
        		
        //this.cascadable = false;	// Can cause additional effects after its effect (need to think about this)
        //this.stateChangable = false;// Changes its state - need to think about this (after turn, after effect)
        
        this.idleAnimation = null;
        this.turnRightAnimation = null;
        this.turnLeftAnimation = null;
        
        this.shotComplete = true;
        
        //cc.log(this.type + "  " + this.colorCode);
        
        if(this.type == -1)
        {
        	this.onHit = null;
        	this.onMatch = null;
        	this.onClear = null;
        	this.onTurn = null;
        }
        // Solid bubble
        else if(this.type == 0)
        {
        	var bubbleClearEffect = {"type":"destroy","rule":"self"};
        	this.onHit = null;
        	this.onMatch = bubbleClearEffect;
			this.onClear = bubbleClearEffect;
        	this.onTurn = null;
        	
        	this.matchable = true;
        	
        	
        	var texture = null;
        	var numFrames = 0;
        	var frameWidth = 0;
        	if(this.colorCode=="yellow")
        	{
        		texture = cc.textureCache.addImage(res.smile_blink_anim);
        		numFrames = 6;
        		frameWidth = 458;
        	}
        	else if(this.colorCode=="red")
        	{
        		texture = cc.textureCache.addImage(res.angry_blink_anim);
        		numFrames = 5;
        		frameWidth = 457;
        	}
        	else if(this.colorCode=="blue")
        	{
        		texture = cc.textureCache.addImage(res.sad_blink_anim);
        		numFrames = 5;
        		frameWidth = 496;
        	}
        	
        	// Animations
        	
        	var rects = [];
        	for(var i=0; i<numFrames; i++)
        		rects.push(cc.rect(i*frameWidth,0,frameWidth,frameWidth));
        	for(var i=numFrames-1; i>=0; i--)
        		rects.push(cc.rect(i*frameWidth,0,frameWidth,frameWidth));
        	
        	var animFrames = [];
        	for(var i=0; i<rects.length; i++)
        	{
        		var spriteFrame = new cc.SpriteFrame(texture, rects[i]);
        		var animFrame = new cc.AnimationFrame();
        		animFrame.initWithSpriteFrame(spriteFrame, 1, null);
        		animFrames.push(animFrame);
        	}
        	
        	var turnSpeed = .1;
    		if(this.colorCode == "yellow")
    			turnSpeed = .05;
        	this.idleAnimation = cc.Animation.create(animFrames, turnSpeed);
        	
        	
        	
        	
        	if(this.colorCode == "yellow")
        	{
        		var turnTexture = cc.textureCache.addImage(res.smile_turnright_anim);
        		var turnFrameWidth = 458;
        		
        		var turnRects = [];
        		/*
        		for(var i=0; i<5; i++)
        			turnRects.push(cc.rect(i*turnFrameWidth,0,turnFrameWidth,turnFrameWidth));
        		for(var i=3; i>=0; i--)
        			turnRects.push(cc.rect(i*turnFrameWidth,0,turnFrameWidth,turnFrameWidth));
        		for(var i=5; i<9; i++)
        			turnRects.push(cc.rect(i*turnFrameWidth,0,turnFrameWidth,turnFrameWidth));
        		for(var i=7; i>=5; i--)
        			turnRects.push(cc.rect(i*turnFrameWidth,0,turnFrameWidth,turnFrameWidth));
        		turnRects.push(cc.rect(0,0,turnFrameWidth,turnFrameWidth));
        		*/
        		
        		for(var i=0; i<5; i++)
        			turnRects.push(cc.rect(i*turnFrameWidth,0,turnFrameWidth,turnFrameWidth));
        		// pause on far right
        		for(var i=0; i<10; i++)
        			turnRects.push(cc.rect(4*turnFrameWidth,0,turnFrameWidth,turnFrameWidth));
        		for(var i=3; i>=0; i--)
        			turnRects.push(cc.rect(i*turnFrameWidth,0,turnFrameWidth,turnFrameWidth));
        		
        		var turnAnimFrames = [];
        		for(var i=0; i<turnRects.length; i++)
        		{
        			var spriteFrame = new cc.SpriteFrame(turnTexture, turnRects[i]);
        			var animFrame = new cc.AnimationFrame();
        			animFrame.initWithSpriteFrame(spriteFrame, 1, null);
        			turnAnimFrames.push(animFrame);
        		}
        		var turnSpeed = .1;
        		if(this.colorCode == "yellow")
        			turnSpeed = .05;
        		this.turnAnimation = cc.Animation.create(turnAnimFrames, turnSpeed);
        		
        		
        	}
        	
        }
        // Bomb
        else if(this.type == 1)
       	{
       		var bombEffect = {"type":"explode", "aoe":{"type":"radial","radius":2}}
        	this.onHit = bombEffect;
       		this.onMatch = null;
        	this.onAdjMatch = null;
       		this.onClear = bombEffect;
        	this.onTurn = null;
        }
        // Steel
        else if(this.type == 2)
        {
        	this.onHit = null;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = null;
        	this.onTurn = null;
        }
        // Rock
        else if(this.type == 3)
        {
        	var clearEffect = {"type":"destroy","rule":"self"};
        	this.onHit = null;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = clearEffect;
        	this.onTurn = null;
        }
        // Poof
        else if(this.type == 4)
        {
        	var clearEffect = {"type":"destroy","rule":"self"};
        	this.onHit = clearEffect;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = clearEffect;
        	this.onTurn = null;
        }
        // Soap
        else if(this.type == 5)
        {
        	var clusterClearEffect = {"type":"clear","aoe":"connected"};
        	this.onHit = clusterClearEffect;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = clusterClearEffect;
        	this.onTurn = null;
        }
        // Pin
        else if(this.type == 6)
        {
        	var pinSuperEffect = {"type":"explode","aoe":{"type":"direction","distance":1}};
        	this.onHit = pinSuperEffect;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = pinSuperEffect;
        	this.onTurn = null;
        }
        // Lightbulb (used to be Pinwheel)
        else if(this.type == 7)
        {
        	var clearEffect = {"type":"destroy","rule":"self"};
        	var changeColorEffect = {"type":"transform","variable":"color","rule":"queue"};
        	this.onHit = null;
        	this.onMatch = clearEffect;
        	this.onAdjMatch = null;
        	this.onClear = clearEffect;
        	this.onTurn = changeColorEffect;
        	cc.log(this.colorCode);
        	
        	/*var localColorCodes = ["red","yellow","green","blue","pink","purple"];
        	for(var i=0; i<this.colorCode.length && this.colorCode[i] != 0; i++)
        	{
        		this.colorCode[i] = localColorCodes[this.colorCode[i]-1];
        	}*/
        	
        	
        	this.colorQueue = this.colorCode;
        	this.colorCode = this.colorQueue[0];
        	cc.log(this.colorCode);
        	
        	this.matchable = true;
        	
        }
        // Dice
        else if(this.type == 8)
        {
        	var clearEffect = {"type":"destroy","rule":"self"};
        	var rollDieEffect = {"type":"transform","variable":"color","rule":"random"}
        	
        	this.onHit = rollDieEffect;
        	this.onMatch = clearEffect;
        	this.onAdjMatch = null;
        	this.onClear = clearEffect;
        	this.onTurn = null;
        	
        	this.colorQueue = ["red","yellow","green","blue"];
        	if(this.colorCode == null)
        		this.colorCode = this.colorQueue[Math.floor(Math.random()*this.colorQueue.length)];
        	
        	this.matchable = true;
        }
        // Clones (Orb)
        else if(this.type == 9)
        {
        	var clearEffect = {"type":"destroy", "rule":"self"};
        	var cloneEffect = {"type":"transform","variable":"color","rule":"clone"};
        	
        	this.onHit = null;
        	this.onMatch = clearEffect;
        	this.onAdjMatch = cloneEffect;
        	this.onClear = clearEffect;
        	this.onTurn = null;
        	
        	this.matchable = true;
        }
        // Disco
        else if(this.type == 10)
        {
        	var bombEffect = {"type":"explode", "aoe":{"type":"radial","radius":1}};
        	
        	this.onHit = null;
        	this.onMatch = null;
        	this.onAdjMatch = bombEffect;
        	this.onClear = bombEffect; // ?
        	this.onTurn = null;
        }
        // Beachball (Changed from onAdjMatch Gumball)
        else if(this.type == 11)
        {
        	var clearMatches = {"type":"match", "aoe":{"type":"match","rule":"adjacents"}};
        	var clearEffect = {"type":"destroy","rule":"self"};
        	
        	this.onHit = clearMatches;
        	this.onMatch = clearEffect;
        	this.onAdjMatch = null;
        	this.onClear = clearMatches;
        	this.onTurn = null;
        	
        	this.matchable = true;
        }
        // 2-r bomb
        else if(this.type == 12)
       	{
       		var bombEffect = {"type":"explode", "aoe":{"type":"radial","radius":2}}
        	this.onHit = bombEffect;
       		this.onMatch = null;
        	this.onAdjMatch = null;
       		this.onClear = bombEffect;
        	this.onTurn = null;
        }
        // line clear
        else if(this.type == 13)
       	{
       		var bombEffect = {"type":"explode", "aoe":{"type":"linear","length":11}};
        	this.onHit = bombEffect;
       		this.onMatch = null;
        	this.onAdjMatch = null;
       		this.onClear = bombEffect;
        	this.onTurn = null;
        }
        // electric orb - on adj-match, takes out (random or nearest?) match on-screen
        else if(this.type == 14)
       	{
       		var bombEffect = {"type":"explode", "aoe":{"type":"match","rule":"random"}};
        	this.onHit = null;
       		this.onMatch = null;
        	this.onAdjMatch = bombEffect;
       		this.onClear = null;
        	this.onTurn = null;
        }
        // flowerpot
        else if(this.type == 15)
       	{
       		var clearEffect = {"type":"destroy", "rule":"self"};
        	var cloneEffect = {"type":"transform","variable":"color","rule":"clone"};
        	
        	this.onHit = cloneEffect;
        	this.onMatch = clearEffect;
        	this.onAdjMatch = null;//cloneEffect;
        	this.onClear = clearEffect;
        	this.onTurn = null;
        	
        	this.matchable = true;
        }
        // spike (now fire)
        else if(this.type == 16)
       	{
       		var destroyShooterEffect = {"type":"destroy", "rule":"shooter"};
        	
        	this.onHit = destroyShooterEffect;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = null;
        	this.onTurn = null;
        }
        // soap-bar
        else if(this.type == 17)
       	{
        	var superSoapEffect = {"type":"transform","aoe":{"type":"radial","radius":2},"rule":"soap"};
        	//var subSoapEffect = {"type":"transformOthers","aoe":{"type":"radial","radius":1},"rule":"soap"};
        	
        	//this.onHit = {"same":superSoapEffect,"else":subSoapEffect};
        	this.onHit = superSoapEffect;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = null;
        	this.onTurn = null;
        }
        // Cloud
        else if(this.type == 18)
        {
        	var clusterClearEffect = {"type":"clear","aoe":"connected"};
        	this.onHit = clusterClearEffect;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = clusterClearEffect;
        	this.onTurn = null;
        	
        	this.isAnchor = true;
        }
        // Balloon
        else if(this.type == 19)
        {
        	var clusterClearEffect = {"type":"clear","aoe":"connected"};
        	this.onHit = clusterClearEffect;
        	this.onMatch = clusterClearEffect;
        	this.onAdjMatch = null;
        	this.onClear = clusterClearEffect;
        	this.onTurn = null;
        	
        	this.isAnchor = true;
        	
        	this.matchable = true;
        }
         // Star - use meta effect for onhit, onmatch, etc, to reward level via Data.js
        else if(this.type == 20)
        {
        	//var destroyShooterEffect = {"type":"destroy", "rule":"shooter"};
        	var metaLevelEffect = {"type":"meta", "meta":"new-level"};
        	
        	this.onHit = metaLevelEffect;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = metaLevelEffect;
        	this.onTurn = null;
        	
        	this.isAnchor = false;
        	
        }
        // Dagger
        else if(this.type == 21)
        {
        	var daggerSuperEffect = {"type":"explode","aoe":{"type":"direction","distance":3}};
        	var rotateEffect = {"type":"rotate","rule":"random"};
        	
        	this.onHit = daggerSuperEffect;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = daggerSuperEffect;
        	this.onTurn = rotateEffect;
        }
        // Egg
        else if(this.type == 22)
        {
        	var changeEffect = {"type":"transform","variable":"type","rule":"secondary"};
        	this.onHit = changeEffect;
        	this.onMatch = null;
        	this.onAdjMatch = changeEffect;
        	this.onClear = changeEffect;
        	this.onTurn = null;
        	
        	this.matchable = false;
        }
        // Hatched Chick
        else if(this.type == 23)
        {
        	var bubbleClearEffect = {"type":"destroy","rule":"self"};
        	this.onHit = null;
        	this.onMatch = bubbleClearEffect;
        	this.onAdjMatch = null;
			this.onClear = bubbleClearEffect;
        	this.onTurn = null;
        	
        	this.matchable = true;
        }
        // Snail
        else if(this.type == 24)
        {
        	var moveEffect = {"type":"transform","rule":"move"};
        	var clearEffect = {"type":"destroy","rule":"self"};
        	this.onHit = null;
        	this.onMatch = clearEffect;
        	this.onAdjMatch = null;
        	this.onClear = clearEffect;
        	this.onTurn = moveEffect;
        	
        	this.matchable = true;
        }
        // Siren
        else if(this.type == 25)
        {
        	var clearEffect = {"type":"destroy","rule":"binary", "variable":"matchable"};
        	var flipEffect = {"type":"transform","rule":"binary"};
        	this.onHit = null;
        	this.onMatch = clearEffect;
        	this.onAdjMatch = null;
        	this.onClear = clearEffect;
        	this.onTurn = flipEffect;
        	
        	this.matchable = true; // only if in on state
        }
        // Lantern
        else if(this.type == 26)
        {
        	var clearEffect = {"type":"destroy","rule":"self"};
        	var moveEffect = {"type":"transform","rule":"position"};
        	this.onHit = null;
        	this.onMatch = clearEffect;
        	this.onAdjMatch = null;
        	this.onClear = clearEffect;
        	this.onTurn = moveEffect;
        	
        	this.matchable = true;
        }
        // Ghost
        else if(this.type == 27)
        {
        	var clearEffect = {"type":"destroy","rule":"binary","variable":"matchable"};
        	var ghostEffect = {"type":"transform","rule":"binary"};
        	this.onHit = null;
        	this.onMatch = clearEffect;
        	this.onAdjMatch = null;
        	this.onClear = clearEffect;
        	this.onTurn = ghostEffect;
        	
        	this.matchable = true; // only if on state
        }
        // Note    should have transparency variable like Ghost
        else if(this.type == 28)
        {
        	var clearEffect = {"type":"destroy","rule":"self"};
        	var tickAction = {"type":"transform","variable":"countdown","rule":"not-structured"};
        	this.onTrespass = clearEffect;
        	this.onHit = null;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = null;
        	this.onTurn = tickAction;
        	this.onCountdown = clearEffect;
        	
        	this.isAnchor = true;
        }
        // Spiderweb
        else if(this.type == 29)
        {
        	var clearEffect = {"type":"destroy","rule":"self"};
        	this.onTrespass = clearEffect;
        	this.onHit = null;
        	this.onMatch = null;
        	this.onAdjMatch = null;
        	this.onClear = null;
        	this.onTurn = tickAction;
        	this.onCountdown = clearEffect;
        }
        // Blank ball
        else if(this.type == 30)
        {
        	var bubbleClearEffect = {"type":"destroy","rule":"self"};
        	this.onHit = null;
        	this.onMatch = bubbleClearEffect;
			this.onClear = bubbleClearEffect;
        	this.onTurn = null;
        	
        	this.matchable = true;
        }
         // Colored Star - use meta effect for onhit, onmatch, etc, to reward level via Data.js
        else if(this.type == 31)
        {
        	//var destroyShooterEffect = {"type":"destroy", "rule":"shooter"};
        	var metaLevelEffect = {"type":"meta", "meta":"new-level"};
        	
        	this.onHit = metaLevelEffect;
        	this.onMatch = metaLevelEffect;
        	this.onAdjMatch = null;
        	this.onClear = metaLevelEffect;
        	this.onTurn = null;
        	
        	this.isAnchor = false;
        	
        }
        
        
        this.dx = 1;
        this.dy = 1;
        this.v = 4;
        this.row = row;
        this.col = col;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);

		//this.bubbleImg = null;
		if(this.colorCode != null)
		{
			if(this.type == 0)
			{
		        if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.angry_emoji);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.cat_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.smile_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.sick_emoji);
				else if(this.colorCode == "lightblue")
					this.bubbleImg = new cc.Sprite(res.cold_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.sad_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.love_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.evil_emoji);
					
				var animateAction = cc.Animate.create(this.idleAnimation);
				var delay = .8;
				if(this.colorCode == "red")
					delay = 1.4;
				else if(this.colorCode == "blue")
					delay = 1.9;
				var animateSeq = new cc.Sequence(cc.delayTime(delay), animateAction);
				this.bubbleImg.runAction(new cc.RepeatForever(animateSeq));
			}
			else if(this.type == 7)
			{cc.log(this.colorCode);
				/*if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_bulb_emoji);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.orange_bulb_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_bulb_emoji);
				else if(this.colorCode == "lightblue")
					this.bubbleImg = new cc.Sprite(res.lightblue_bulb_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_bulb_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_bulb_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_bulb_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_bulb_emoji);*/cc.log(this.colorCode);
				if(this.colorCode == "red" || this.colorCode == 0)
					this.bubbleImg = new cc.Sprite(res.red_bulb_emoji);
				else if(this.colorCode == "yellow" || this.colorCode == 1)
					this.bubbleImg = new cc.Sprite(res.yellow_bulb_emoji);
				else if(this.colorCode == "green" || this.colorCode == 3)
					this.bubbleImg = new cc.Sprite(res.green_bulb_emoji);
				else if(this.colorCode == "blue" || this.colorCode == 2)
					this.bubbleImg = new cc.Sprite(res.blue_bulb_emoji);
				else if(this.colorCode == "pink" || this.colorCode == 4)
					this.bubbleImg = new cc.Sprite(res.pink_bulb_emoji);
				else if(this.colorCode == "purple" || this.colorCode == 5)
					this.bubbleImg = new cc.Sprite(res.purple_bulb_emoji);
				else cc.log("wtf");
				cc.log(this.bubbleImg);
			}
			else if(this.type == 8)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_die_emoji);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.orange_die_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_die_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_die_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_die_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_die_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_die_emoji);
				else cc.log("wtf");
			}
			else if(this.type == 17)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_soapbar_emoji);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.orange_soapbar_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_soapbar_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_soapbar_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_soapbar_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_soapbar_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_soapbar_emoji);
			}
			else if(this.type == 19)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_balloon_emoji);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.orange_balloon_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_balloon_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_balloon_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_balloon_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_balloon_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_balloon_emoji);
			}// Egg
			else if(this.type == 22)
			{
				this.bubbleImg = new cc.Sprite(res.egg_emoji);
			}
			// Hatched Egg
			else if(this.type == 23)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_chick_emoji);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.orange_chick_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_chick_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_chick_emoji);
				else if(this.colorCode == "lightblue")
					this.bubbleImg = new cc.Sprite(res.lightblue_chick_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_chick_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_chick_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_chick_emoji);
			}
			// Snail
			else if(this.type == 24)
			{
				if(this.binary)
				{
					if(this.colorCode == "red")
						this.bubbleImg = new cc.Sprite(res.red_snail_emoji);
					else if(this.colorCode == "orange")
						this.bubbleImg = new cc.Sprite(res.orange_snail_emoji);
					else if(this.colorCode == "yellow")
						this.bubbleImg = new cc.Sprite(res.yellow_snail_emoji);
					else if(this.colorCode == "green")
						this.bubbleImg = new cc.Sprite(res.green_snail_emoji);
					else if(this.colorCode == "lightblue")
						this.bubbleImg = new cc.Sprite(res.lightblue_snail_emoji);
					else if(this.colorCode == "blue")
						this.bubbleImg = new cc.Sprite(res.blue_snail_emoji);
					else if(this.colorCode == "pink")
						this.bubbleImg = new cc.Sprite(res.pink_snail_emoji);
					else if(this.colorCode == "purple")
						this.bubbleImg = new cc.Sprite(res.purple_snail_emoji);
				}
				else
				{
					if(this.colorCode == "red")
						this.bubbleImg = new cc.Sprite(res.red_snail_right_emoji);
					else if(this.colorCode == "orange")
						this.bubbleImg = new cc.Sprite(res.orange_snail_right_emoji);
					else if(this.colorCode == "yellow")
						this.bubbleImg = new cc.Sprite(res.yellow_snail_right_emoji);
					else if(this.colorCode == "green")
						this.bubbleImg = new cc.Sprite(res.green_snail_right_emoji);
					else if(this.colorCode == "lightblue")
						this.bubbleImg = new cc.Sprite(res.lightblue_snail_right_emoji);
					else if(this.colorCode == "blue")
						this.bubbleImg = new cc.Sprite(res.blue_snail_right_emoji);
					else if(this.colorCode == "pink")
						this.bubbleImg = new cc.Sprite(res.pink_snail_right_emoji);
					else if(this.colorCode == "purple")
						this.bubbleImg = new cc.Sprite(res.purple_snail_right_emoji);
				}
			}
			// Siren
			else if(this.type == 25)
			{
				if(this.binary)
				{
					if(this.colorCode == "red")
						this.bubbleImg = new cc.Sprite(res.red_siren_emoji);
					else if(this.colorCode == "orange")
						this.bubbleImg = new cc.Sprite(res.orange_siren_emoji);
					else if(this.colorCode == "yellow")
						this.bubbleImg = new cc.Sprite(res.yellow_siren_emoji);
					else if(this.colorCode == "green")
						this.bubbleImg = new cc.Sprite(res.green_siren_emoji);
					else if(this.colorCode == "lightblue")
						this.bubbleImg = new cc.Sprite(res.lightblue_siren_emoji);
					else if(this.colorCode == "blue")
						this.bubbleImg = new cc.Sprite(res.blue_siren_emoji);
					else if(this.colorCode == "pink")
						this.bubbleImg = new cc.Sprite(res.pink_siren_emoji);
					else if(this.colorCode == "purple")
						this.bubbleImg = new cc.Sprite(res.purple_siren_emoji);
				}
				else
				{
					if(this.colorCode == "red")
						this.bubbleImg = new cc.Sprite(res.red_siren_off_emoji);
					else if(this.colorCode == "orange")
						this.bubbleImg = new cc.Sprite(res.orange_siren_off_emoji);
					else if(this.colorCode == "yellow")
						this.bubbleImg = new cc.Sprite(res.yellow_siren_off_emoji);
					else if(this.colorCode == "green")
						this.bubbleImg = new cc.Sprite(res.green_siren_off_emoji);
					else if(this.colorCode == "lightblue")
						this.bubbleImg = new cc.Sprite(res.lightblue_siren_off_emoji);
					else if(this.colorCode == "blue")
						this.bubbleImg = new cc.Sprite(res.blue_siren_off_emoji);
					else if(this.colorCode == "pink")
						this.bubbleImg = new cc.Sprite(res.pink_siren_off_emoji);
					else if(this.colorCode == "purple")
						this.bubbleImg = new cc.Sprite(res.purple_siren_off_emoji);
				}
			}
			// Lantern
			else if(this.type == 26)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_lantern_emoji);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.orange_lantern_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_lantern_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_lantern_emoji);
				else if(this.colorCode == "lightblue")
					this.bubbleImg = new cc.Sprite(res.lightblue_lantern_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_lantern_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_lantern_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_lantern_emoji);
				cc.log(this.meta);
				if(this.meta != null && "dir" in this.meta && this.meta.dir != null /*&& this.parent.modeType == "preview"*/)
				{
					var dirCode = this.meta.dir;
					if(dirCode == "upleft")
						this.modImg = new cc.Sprite(res.upleft_path_dir);
					else if(dirCode == "upright")
						this.modImg = new cc.Sprite(res.upright_path_dir);
					else if(dirCode == "left")
						this.modImg = new cc.Sprite(res.left_path_dir);
					else if(dirCode == "right")
						this.modImg = new cc.Sprite(res.right_path_dir);
					else if(dirCode == "downleft")
						this.modImg = new cc.Sprite(res.downleft_path_dir);
					else if(dirCode == "downright")
						this.modImg = new cc.Sprite(res.downright_path_dir);
				cc.log(this.modImg);
				}
			}
			// Ghost
			else if(this.type == 27)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_ghost_emoji);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.orange_ghost_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_ghost_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_ghost_emoji);
				else if(this.colorCode == "lightblue")
					this.bubbleImg = new cc.Sprite(res.lightblue_ghost_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_ghost_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_ghost_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_ghost_emoji);
				cc.log(this.binary);
				if(!this.binary)
				{
					this.bubbleImg.setOpacity(122);
				}
			}
			// Note
			else if(this.type == 28)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_note_emoji);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.orange_note_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_note_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_note_emoji);
				else if(this.colorCode == "lightblue")
					this.bubbleImg = new cc.Sprite(res.lightblue_note_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_note_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_note_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_note_emoji);
			}
			// Ball
			else if(this.type == 30)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_ball);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.orange_ball);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_ball);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_ball);
				else if(this.colorCode == "lightblue")
					this.bubbleImg = new cc.Sprite(res.lightblue_ball);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_ball);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_ball);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_ball);
			}
			// Colored Star
			else if(this.type == 31)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_star_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_star_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_star_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_star_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_star_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_star_emoji);
			}
			
		}
		else if(this.colorCode == null)
		{
			if(this.type == -1)
				this.bubbleImg = new cc.Sprite(res.black_circle);
			// Bomb
			else if(this.type == 1)
				this.bubbleImg = new cc.Sprite(res.bomb_emoji);
			// 8-Ball (Anvil) (Steel)
			else if(this.type == 2)
				this.bubbleImg = new cc.Sprite(res.anvil_emoji);
			// Jawbreaker (Rock)
			else if(this.type == 3)
				this.bubbleImg = new cc.Sprite(res.anvil_emoji);
			
			// Egg (Poof)
			else if(this.type == 4)
				this.bubbleImg = new cc.Sprite(res.bubble_wrap_emoji);
			// (Soap)
			else if(this.type == 5)
				this.bubbleImg = new cc.Sprite(res.soap_emoji);
				
			// Pin
			else if(this.type == 6)
			{
				if(this.orientation == "downleft")
					this.bubbleImg = new cc.Sprite(res.downleft_pin_emoji)
				else if(this.orientation == "upleft")
					this.bubbleImg = new cc.Sprite(res.upleft_pin_emoji)
				else if(this.orientation == "upright")
					this.bubbleImg = new cc.Sprite(res.upright_pin_emoji)
				else if(this.orientation == "downright")
					this.bubbleImg = new cc.Sprite(res.downright_pin_emoji)
				
			}
			else if(this.type == 9)
			{
				this.bubbleImg = new cc.Sprite(res.neutral_orb_emoji);
			}
			else if(this.type == 10)
			{
				this.bubbleImg = new cc.Sprite(res.disco_emoji);
			}
			else if(this.type == 11)
			{
				this.bubbleImg = new cc.Sprite(res.beachball_emoji);
			}
			else if(this.type == 12)
			{
				this.bubbleImg = new cc.Sprite(res.large_bomb_emoji);
			}
			else if(this.type == 13)
			{
				this.bubbleImg = new cc.Sprite(res.horiz_rocket_emoji);
			}
			else if(this.type == 14)
			{
				this.bubbleImg = new cc.Sprite(res.electric_orb_emoji);//this
			}
			else if(this.type == 15)
			{
				this.bubbleImg = new cc.Sprite(res.neutral_flowerpot_emoji);
			}
			else if(this.type == 16)
			{
				this.bubbleImg = new cc.Sprite(res.spike_emoji);
			}
			else if(this.type == 18)
			{
				this.bubbleImg = new cc.Sprite(res.cloud_emoji);
			}
			else if(this.type == 20)
			{
				var self = this;
				this.bubbleImg = new cc.Sprite(res.rainbow_star_emoji);
				
				var spinAction = cc.rotateBy(3,360);
	        	var repeatAction = new cc.CallFunc(function()
	        	{
	        		var rotAction = new cc.RepeatForever(new cc.RotateBy(3,360));
	        		self.runAction(rotAction);
	        	});
	        	var seq = new cc.Sequence(spinAction, repeatAction);
	        	this.runAction(seq);
	        	
	        	/*
	        	var emitterImg = cc.textureCache.addImage("res/yellow-ball.png");
	        	this.emitter = cc.ParticleSystem.createWithTotalParticles(50);
	        	this.emitter.setTexture(emitterImg);
	        	this.emitter.setDuration(-1);
	        	this.emitter.setLife(5.0);
	        	this.emitter.setPosition(this.width/2, this.height/2);
	        	this.emitter.setEmissionRate(100);
	        	this.emitter.setAngle(90);
	        	this.emitter.setEmitterMode(0);
	        	this.emitter.setStartSize(50);
				this.addChild(this.emitter);
				*/
			
			}
			else if(this.type == 21)
			{
				if(this.orientation == null)
				{
					var orientations = ["upright","right","downright","downleft","left","upleft"];
					this.orientation = orientations[Math.floor(Math.random()*orientations.length)];
				}
				
				this.bubbleImg = new cc.Sprite(res.left_dagger_emoji);
				
				if(this.orientation == "upright")
				{
					//this.bubbleImg = new cc.Sprite(res.upright_dagger_emoji);
					this.bubbleImg.setRotation(120);
				}
				else if(this.orientation == "right")
				{
					//this.bubbleImg = new cc.Sprite(res.right_dagger_emoji);
					this.bubbleImg.setRotation(180);
				}
				else if(this.orientation == "downright")
				{
					//this.bubbleImg = new cc.Sprite(res.downright_dagger_emoji);
					this.bubbleImg.setRotation(240);
				}
				else if(this.orientation == "downleft")
				{
					//this.bubbleImg = new cc.Sprite(res.downleft_dagger_emoji);
					this.bubbleImg.setRotation(300);
				}
				else if(this.orientation == "left")
				{
					//this.bubbleImg = new cc.Sprite(res.left_dagger_emoji);
					this.bubbleImg.setRotation(0);
				}
				else if(this.orientation == "upleft")
				{
					//this.bubbleImg = new cc.Sprite(res.upleft_dagger_emoji);
					this.bubbleImg.setRotation(60);
				}
				
			}
			// Egg
			else if(this.type == 22)
			{
				this.bubbleImg = new cc.Sprite(res.egg_emoji);
			}
			// Lantern
			else if(this.type == 26)
			{
				/*if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_lantern_emoji);
				else if(this.colorCode == "orange")
					this.bubbleImg = new cc.Sprite(res.orange_lantern_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_lantern_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_lantern_emoji);
				else if(this.colorCode == "lightblue")
					this.bubbleImg = new cc.Sprite(res.lightblue_lantern_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_lantern_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_lantern_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_lantern_emoji);*/
				cc.log(this.meta);
				if(this.meta != null && "dir" in this.meta && this.meta.dir != null /*&& this.parent.modeType == "preview"*/)
				{
					var dirCode = this.meta.dir;
					if(dirCode == "upleft")
						this.modImg = new cc.Sprite(res.upleft_path_dir);
					else if(dirCode == "upright")
						this.modImg = new cc.Sprite(res.upright_path_dir);
					else if(dirCode == "left")
						this.modImg = new cc.Sprite(res.left_path_dir);
					else if(dirCode == "right")
						this.modImg = new cc.Sprite(res.right_path_dir);
					else if(dirCode == "downleft")
						this.modImg = new cc.Sprite(res.downleft_path_dir);
					else if(dirCode == "downright")
						this.modImg = new cc.Sprite(res.downright_path_dir);
					cc.log(this.modImg);
				}
			}
			// Spiderweb
			else if(this.type == 29)
			{
				this.bubbleImg = new cc.Sprite(res.spiderweb_emoji);
			}
			
		}
		else cc.log("WTF");
		
		//cc.log(this.type + "  " + this.colorCode);
		if(this.bubbleImg != null)
		{
			
			this.bubbleImg.attr({
				x:this.width/2,
				y:this.height/2,
				anchorX:.5,
				anchorY:.5
			});
			this.bubbleImg.setScale((this.r*2)/this.bubbleImg.width);
			this.addChild(this.bubbleImg);
		}
		//cc.log(this.modImg);
		/*if(this.modImg != null)
		{
			this.modImg.attr({
				x:this.width/2,
				y:this.height/2,
				anchorX:.5,
				anchorY:.5
			});
			this.modImg.setScale((this.r)/this.modImg.width);
			this.addChild(this.modImg);
			cc.log(this.modImg);
		}*/
		
		//this.sprite=this.bubbleImg;
		//this.draw();
	},
	
	//onEnter:function()
	//{
	//	this._super();
	/*
	if(this.type == 0)
	{	
		
		var texture = null;
        	var numFrames = 0;
        	var frameWidth = 0;
        	if(this.colorCode=="yellow")
        	{
        		texture = cc.textureCache.addImage(res.smile_blink_anim);
        		numFrames = 6;
        		frameWidth = 458;
        	}
        	else if(this.colorCode=="red")
        	{
        		texture = cc.textureCache.addImage(res.angry_blink_anim);
        		numFrames = 5;
        		frameWidth = 457;
        	}
        	else if(this.colorCode=="blue")
        	{
        		texture = cc.textureCache.addImage(res.sad_blink_anim);
        		numFrames = 5;
        		frameWidth = 496;
        	}
        	
        	
        	// Animations
        	var rects = [];
        	for(var i=0; i<numFrames; i++)
        		rects.push(cc.rect(i*frameWidth,0,frameWidth,frameWidth));
        	for(var i=numFrames-1; i>=0; i--)
        		rects.push(cc.rect(i*frameWidth,0,frameWidth,frameWidth));
        	
        	
        	var animFrames = [];
        	for(var i=0; i<rects.length; i++)
        	{
        		var spriteFrame = new cc.SpriteFrame(texture, rects[i]);
        		var animFrame = new cc.AnimationFrame();
        		animFrame.initWithSpriteFrame(spriteFrame, 1, null);
        		animFrames.push(animFrame);
        	}
        	
        	this.idleAnimation = cc.Animation.create(animFrames, .05);
        	
        }*/
		
	//},
	
	resetAnimation:function()
	{
		this.activeAnimation = false;
		/*if(this.type == 0)
		{
			var animateAction = cc.Animate.create(this.idleAnimation);
			var delay = .5;
			if(this.colorCode == "red")
				delay = 1.4;
			else if(this.colorCode == "blue")
				delay = 1.9;
			var animateSeq = new cc.Sequence(cc.delayTime(delay), animateAction);
			this.bubbleImg.runAction(new cc.RepeatForever(animateSeq));
			
		}*/
	},
	
	updateSnailSprite:function()
	{
		this.removeChild(this.bubbleImg);
		if(this.binary)
		{
			if(this.colorCode == "red")
				this.bubbleImg = new cc.Sprite(res.red_snail_emoji);
			else if(this.colorCode == "orange")
				this.bubbleImg = new cc.Sprite(res.orange_snail_emoji);
			else if(this.colorCode == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_snail_emoji);
			else if(this.colorCode == "green")
				this.bubbleImg = new cc.Sprite(res.green_snail_emoji);
			else if(this.colorCode == "lightblue")
				this.bubbleImg = new cc.Sprite(res.lightblue_snail_emoji);
			else if(this.colorCode == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_snail_emoji);
			else if(this.colorCode == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_snail_emoji);
			else if(this.colorCode == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_snail_emoji);
		}
		else
		{
			if(this.colorCode == "red")
				this.bubbleImg = new cc.Sprite(res.red_snail_right_emoji);
			else if(this.colorCode == "orange")
				this.bubbleImg = new cc.Sprite(res.orange_snail_right_emoji);
			else if(this.colorCode == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_snail_right_emoji);
			else if(this.colorCode == "green")
				this.bubbleImg = new cc.Sprite(res.green_snail_right_emoji);
			else if(this.colorCode == "lightblue")
				this.bubbleImg = new cc.Sprite(res.lightblue_snail_right_emoji);
			else if(this.colorCode == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_snail_right_emoji);
			else if(this.colorCode == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_snail_right_emoji);
			else if(this.colorCode == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_snail_right_emoji);
		}
		
		this.bubbleImg.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.bubbleImg.setScale((this.r*2)/this.bubbleImg.width);
		this.addChild(this.bubbleImg);
	},
	
	changeToSoap:function()
	{
		this.removeChild(this.bubbleImg);
		this.bubbleImg = new cc.Sprite(res.soap_emoji);
		this.bubbleImg.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.bubbleImg.setScale((this.r*2)/this.bubbleImg.width);
		this.addChild(this.bubbleImg);
		
		var clusterClearEffect = {"type":"clear","aoe":"connected"};
    	this.onHit = clusterClearEffect;
    	this.onMatch = null;
    	this.onAdjMatch = null;
    	this.onClear = clusterClearEffect;
    	this.onTurn = null;
	},
	
	advanceToTurn:function(turnNumber)
	{this.removeChild(this.bubbleImg);
		if(this.type == 7)
		{
			this.colorCode = this.colorQueue[turnNumber%this.colorQueue.length];
			if(this.colorCode == "red")
				this.bubbleImg = new cc.Sprite(res.red_bulb_emoji);
			else if(this.colorCode == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_bulb_emoji);
			else if(this.colorCode == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_bulb_emoji);
			else if(this.colorCode == "green")
				this.bubbleImg = new cc.Sprite(res.green_bulb_emoji);
			else if(this.colorCode == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_bulb_emoji);
			else if(this.colorCode == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_bulb_emoji);
			
		}	
		this.bubbleImg.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.bubbleImg.setScale((this.r*2)/this.bubbleImg.width);
		this.addChild(this.bubbleImg);
		if(this.type == 7)
		{
			//this.removeChild(this.bulbLabel);
			//this.addChild(this.bulbLabel);
			this.addNumber(this.meta.iteration);
		}
	},
	
	addNumber:function(iteration)
	{this.removeChild(this.bulbLabel);
		this.bulbLabel = new cc.LabelTTF(""+iteration,"Roboto",24);
		this.bulbLabel.attr({
			x:DATA.bubbleR/3,
			y:-DATA.bubbleR/3,
			anchorX:.5,
			anchorY:.5
		});
		this.bulbLabel.color = cc.color(0,0,0,255);
		this.addChild(this.bulbLabel);
	},
	
	triggerOnTurn:function(turnNumber){
		this.removeChild(this.bubbleImg);
		if(this.type == 7)
		{
			this.colorCode = this.colorQueue[turnNumber%this.colorQueue.length];
			if(this.colorCode == "red")
				this.bubbleImg = new cc.Sprite(res.red_bulb_emoji);
			else if(this.colorCode == "orange")
				this.bubbleImg = new cc.Sprite(res.orange_bulb_emoji);
			else if(this.colorCode == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_bulb_emoji);
			else if(this.colorCode == "lightblue")
				this.bubbleImg = new cc.Sprite(res.lightblue_bulb_emoji);
			else if(this.colorCode == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_bulb_emoji);
			else if(this.colorCode == "green")
				this.bubbleImg = new cc.Sprite(res.green_bulb_emoji);
			else if(this.colorCode == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_bulb_emoji);
			else if(this.colorCode == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_bulb_emoji);
			
		}	
		else if(this.type == 21)
		{
			var oldOrientation = this.orientation;
			var orientations = ["downleft","upleft","downright","upright","left","right"];
			// remove current orientation
			orientations.splice(orientations.indexOf(this.orientation), 1);
			//pick random orientation
			this.orientation = orientations[Math.floor(Math.random()*orientations.length)];
			
			var angle = 0;
			if(this.orientation == "left")
				angle = 0;
			else if(this.orientation == "upleft")
				angle = 60;
			else if(this.orientation == "upright")
				angle = 120;
			else if(this.orientation == "right")
				angle = 180;
			else if(this.orientation == "downright")
				angle = 240;
			else if(this.orientation == "downleft")
				angle = 300;
				
			var spinAction = cc.rotateBy(.35, 360);
			var rotAction = cc.rotateTo(.35, angle);
			var seq = new cc.Sequence(spinAction, rotAction);
			this.bubbleImg.runAction(seq);
			
			/*if(this.orientation == "downleft")
				this.bubbleImg = new cc.Sprite(res.downleft_dagger_emoji);
			else if(this.orientation == "downright")
				this.bubbleImg = new cc.Sprite(res.downright_dagger_emoji);
			else if(this.orientation == "upleft")
				this.bubbleImg = new cc.Sprite(res.upleft_dagger_emoji);
			else if(this.orientation == "upright")
				this.bubbleImg = new cc.Sprite(res.upright_dagger_emoji);
			else if(this.orientation == "left")
				this.bubbleImg = new cc.Sprite(res.left_dagger_emoji);
			else if(this.orientation == "right")
				this.bubbleImg = new cc.Sprite(res.right_dagger_emoji);*/
			
		}
		
		this.bubbleImg.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.bubbleImg.setScale((this.r*2)/this.bubbleImg.width);
		this.addChild(this.bubbleImg);
	},
	
	trigger:function(){
		this.removeChild(this.bubbleImg);
		
		if(this.type == 1)
			this.bubbleImg = new cc.Sprite(res.bomb_triggered);
		else if(this.type == 5)
			this.bubbleImg = new cc.Sprite(res.soap_triggered);
		else if(this.type == 8)
			this.bubbleImg = new cc.Sprite(res.white_die_emoji);
		else if(this.type == 10)
			this.bubbleImg = new cc.Sprite(res.rainbow_disco_emoji);
		else if(this.type == 11)
			this.bubbleImg = new cc.Sprite(res.burst_gumball_emoji);	
		else if(this.type == 12)
			this.bubbleImg = new cc.Sprite(res.large_bomb_triggered);
		else if(this.type == 15)
		{
			if(this.colorCode == "red")
				this.bubbleImg = new cc.Sprite(res.red_flowerpot_emoji);
			else if(this.colorCode == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_flowerpot_emoji);
			else if(this.colorCode == "green")
				this.bubbleImg = new cc.Sprite(res.green_flowerpot_emoji);
			else if(this.colorCode == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_flowerpot_emoji);
			else if(this.colorCode == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_flowerpot_emoji);
			else if(this.colorCode == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_flowerpot_emoji);
		}
		else return;
		
			
		this.bubbleImg.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.bubbleImg.setScale((this.r*2)/this.bubbleImg.width);
		this.addChild(this.bubbleImg);
		this.triggered = true;
	},
	
	triggerOnAdjMatch:function(matchColor)
	{
			this.removeChild(this.bubbleImg);
		if(this.type == 9)
		{
			this.colorCode = matchColor;
			if(this.colorCode == "red")
				this.bubbleImg = new cc.Sprite(res.red_orb_emoji);
			else if(this.colorCode == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_orb_emoji);
			else if(this.colorCode == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_orb_emoji);
			else if(this.colorCode == "green")
				this.bubbleImg = new cc.Sprite(res.green_orb_emoji);
			else if(this.colorCode == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_orb_emoji);
			else if(this.colorCode == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_orb_emoji);
		}
		else if(this.type == 10)
		{
			this.bubbleImg = new cc.Sprite(res.rainbow_disco_emoji);	
		}
		else if(this.type == 11)
		{
			this.bubbleImg = new cc.Sprite(res.burst_gumball_emoji);	
		}
		else if(this.type == 15)
		{
			this.colorCode = matchColor;
			if(matchColor == "red")
				this.bubbleImg = new cc.Sprite(res.red_flowerpot_emoji);
			else if(matchColor == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_flowerpot_emoji);
			else if(matchColor == "green")
				this.bubbleImg = new cc.Sprite(res.green_flowerpot_emoji);
			else if(matchColor == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_flowerpot_emoji);
			else if(matchColor == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_flowerpot_emoji);
			else if(matchColor == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_flowerpot_emoji);
			
		}
		else return;
		
		this.bubbleImg.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.bubbleImg.setScale((this.r*2)/this.bubbleImg.width);
		this.addChild(this.bubbleImg);
		
	},
	
	transform:function()
	{
		this.removeChild(this.bubbleImg);
		
		if(this.type == 8)
		{cc.log("Color Before:");cc.log(this.colorCode);
			var possibleColors = [];
			for(var i=0; i<this.colorQueue.length; i++)
			{
				if(this.colorQueue[i] != this.colorCode)
				{
					possibleColors.push(this.colorQueue[i]);
				}
			}
			if(possibleColors.length > 1)
				possibleColors.splice(possibleColors.indexOf(this.colorCode), 1);
			this.colorCode = possibleColors[Math.floor(Math.random()*possibleColors.length)];
			if(this.colorCode == "red")
				this.bubbleImg = new cc.Sprite(res.red_die_emoji);
			else if(this.colorCode == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_die_emoji);
			else if(this.colorCode == "green")
				this.bubbleImg = new cc.Sprite(res.green_die_emoji);
			else if(this.colorCode == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_die_emoji);
			else if(this.colorCode == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_die_emoji);
			else if(this.colorCode == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_die_emoji);
				
			cc.log("Color After:");cc.log(this.colorCode);
		}
		else if(this.type == 15)
		{
			if(this.colorCode == "red")
				this.bubbleImg = new cc.Sprite(res.red_flowerpot_emoji);
			else if(this.colorCode == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_flowerpot_emoji);
			else if(this.colorCode == "green")
				this.bubbleImg = new cc.Sprite(res.green_flowerpot_emoji);
			else if(this.colorCode == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_flowerpot_emoji);
			else if(this.colorCode == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_flowerpot_emoji);
			else if(this.colorCode == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_flowerpot_emoji);
		}
		else if(this.type == 23)
		{
			if(this.colorCode == "red")
				this.bubbleImg = new cc.Sprite(res.red_eggchick_emoji);
			else if(this.colorCode == "orange")
				this.bubbleImg = new cc.Sprite(res.orange_eggchick_emoji);
			else if(this.colorCode == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_eggchick_emoji);
			else if(this.colorCode == "green")
				this.bubbleImg = new cc.Sprite(res.green_eggchick_emoji);
			else if(this.colorCode == "lightblue")
				this.bubbleImg = new cc.Sprite(res.lightblue_eggchick_emoji);
			else if(this.colorCode == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_eggchick_emoji);
			else if(this.colorCode == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_eggchick_emoji);
			else if(this.colorCode == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_eggchick_emoji);
		}
		this.bubbleImg.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.bubbleImg.setScale((this.r*2)/this.bubbleImg.width);
		this.addChild(this.bubbleImg);
		this.triggered = false;
	},
	
	draw:function(){
		
		//this.dn.drawDot(cc.p(this.x,this.y),this.r,this.color);
	},
	
	initShot:function(target, targetHex){//cc.log("y");cc.log(this.y);cc.log(target.y);
		var diffX = target.x - this.x;
		var diffY = target.y - this.y;
		
		var mag = Math.pow(Math.pow(diffX, 2)+Math.pow(diffY, 2), .5);
		
		var ddx = diffX / mag;
		var ddy = diffY / mag;
		
		this.dx = ddx*this.v;
		this.dy = ddy*this.v;
	},
	
	initShotAnim:function(target, targetHex, numRows, maxRows, rowHeight, bottomMostY, bottomBub)
	{
		// The separate actions to be executed
		var actions = [];
		
		// Track points for aimLine
		//this.aimlinePoints = [];
		
		this.shotComplete = false;
		
		cc.log("-TARGET HEX) " + targetHex);
		cc.log("-NUM ROWS " + numRows);
		
		// BORDERS
		var leftWallX = 0+DATA.bubbleR;
		var rightWallX = this.parent.width-DATA.bubbleR;
		
		cc.log("-L Wall (bubbleR))   " + leftWallX);
		cc.log("-R Wall)   " + rightWallX);
		// INITIAL DISTANCES
		
		var x=this.x;
		cc.log("-X   " + x);
		//var y=((numRows*DATA.bubbleR*2)+DATA.bubbleR) + (this.parent.height - this.y - this.parent.getOverflowOffset());
		
		var bottomBubbleTrueDist = (numRows*rowHeight)-DATA.bubbleR;cc.log(bottomBub.y);cc.log(this.y);
		var shooterToBottomBubDist = bottomBub.y - this.y;
		
		//var yPosFromTop = bottomBubbleTrueDist
		
		var y = bottomBubbleTrueDist + shooterToBottomBubDist /*- DATA.bubbleR + this.parent.getOverflowOffset()))*/;
		cc.log("y)  " + y);
		// this.height - bub.row*((Math.pow(3, .5)/2) * (this.bubbleR*2)) - this.bubbleR + overflowOffset
		
		var finalTargetY = targetHex.y*rowHeight+DATA.bubbleR;
		cc.log("finalTargetY  " + finalTargetY);
		
		var direction = "";
		if(target.x > x)
			direction = "right";
		else direction = "left";
		
		
		var dist = 0;
		
		var m = 999999;
		if(target.x-x != 0)
			m=Math.abs(target.y-this.y)/Math.abs(target.x-this.x);
		
		//if(direction == "left")
		//	m*=-1;
		
		cc.log("M)  "+m);
			
		var diffX=null;
		var diffY=null;
		var targetYFound = false;
		
		do
		{
		
			if(direction == "left")
				diffX = x-leftWallX;
			else diffX = rightWallX-x;
			cc.log("HAVE TO MOVE)   " + diffX + "to the " + direction);
			//diffY = ;
			
			
			
			//x += diffX;
			var prevX = x;
			var prevY = y;
			var prevDist = dist;
			
			y -= Math.abs(m*diffX);
			cc.log("Y Decreases By " + Math.abs(m*diffX) + " to " + y);
			if(direction == "left")
				x-=diffX;
			else x += diffX;
			cc.log("X moves from " + prevX + " to " + x);
			
			dist = Math.pow( Math.pow(Math.abs(y-prevY), 2) + Math.pow(Math.abs(diffX), 2) , .5 );cc.log(dist);
			
			//cc.log(y);
			//cc.log(finalTargetY);
			
			if(y < finalTargetY)
			{cc.log("---FINAL BOUNCE---");
				targetYFound = true;
				
				x = prevX;
				y = prevY;
				dist = prevDist;
				
				if(direction == "right")
					diffX = ( targetHex.x*DATA.bubbleR*2 + DATA.bubbleR + (targetHex.y%2)*DATA.bubbleR ) - x;
				else diffX = x - ( targetHex.x*DATA.bubbleR*2 + DATA.bubbleR + (targetHex.y%2)*DATA.bubbleR );
				
				cc.log("Instead, Move X " + diffX);
				
				//y -= Math.abs( m*diffX );
				y =  (targetHex.y*rowHeight + DATA.bubbleR);
				
				if(direction == "left")
					x-=diffX;
				else x += diffX;
				
				//x = (targetHex.x*DATA.bubbleR*2 + DATA.bubbleR)
				
				dist = Math.pow( Math.pow(Math.abs(y-prevY), 2) + Math.pow(Math.abs(diffX), 2) , .5 );cc.log(dist);
			}
			else
			{cc.log("---not final bounce---");
				//m = 999999;
				//if(diffX != 0)
				//	m = diffY / diffX;
				m*= -1;
					
				if(direction == "left")
				{
					direction = "right";
				}
				else direction = "left";
			}
			
			
			
			var speed = DATA.bubbleR*2 * 1;
			var time = dist*(1/(DATA.bubbleR*2*15));cc.log(dist);
			//time=1;
			cc.log("ACTION Move X) " + (x-prevX) + "   Y) "+(prevY-y));
			var nextAction = cc.moveBy(time, (x - prevX), (prevY-y));
			//var nextAction = cc.moveTo(time, xTarget, yTarget);
			actions.push(nextAction);
			
		} while(!targetYFound);
		
		//actions.push(cc.callFunc(this.parent.snapShooter, this.parent));
		actions.push(cc.callFunc(this.completeShot, this));
		
		var seq = new cc.Sequence(actions);
		this.runAction(seq);
		
		
	},
	
	completeShot:function()
	{
		this.shotComplete = true;
	},
	
	
	initShotPrediction:function(target){
		var diffX = target.x - this.x;
		var diffY = target.y - this.y;
		
		var mag = Math.pow(Math.pow(diffX, 2)+Math.pow(diffY, 2), .5);
		
		var ddx = diffX / mag;
		var ddy = diffY / mag;
		
		var dx = ddx*this.v;
		var dy = ddy*this.v;
		return {"dx":dx,"dy":dy};
	}
	
});
