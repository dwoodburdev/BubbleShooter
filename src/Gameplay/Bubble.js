var Bubble = cc.Sprite.extend({
	ctor:function(r,color,type,orientation,row,col){cc.log(""+color+" "+type+" "+row+"_"+col);
		this._super();
		cc.associateWithNative( this, cc.Sprite );
        
        this.r = r;
        this.colorCode = color;
        this.type = type;
        this.orientation = orientation;
        this.triggered = false;
        this.colorQueue = [];
        //this.anchor = false;
        //this.active = true;
        this.onMatch = null; 		// Clears when matched (can still have on-match effect)
        this.onClear = null; 		// Clearable by supers
        //this.clustered = false;
        
        this.onHit = null;    		// Has on-hit effect	
        this.onAdjMatch = null;	// Has on-adjacent-match effect
        
        this.isAnchor = false;
        
        this.active = false;
        
 		       //this.explosive = false;		// Has clearing effect (associated with on-hit or on-match or on-adj-match) ! (should associate this with each on-X effect in case has multiple effects depending)
        		//this.aoe = null;			// AoE for effect (need to think about this)
        		
        //this.cascadable = false;	// Can cause additional effects after its effect (need to think about this)
        //this.stateChangable = false;// Changes its state - need to think about this (after turn, after effect)
        
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
        }
        // Bomb
        else if(this.type == 1)
       	{
       		var bombEffect = {"type":"explode", "aoe":{"type":"radial","radius":1}}
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
        // Pinwheel
        else if(this.type == 7)
        {
        	var clearEffect = {"type":"destroy","rule":"self"};
        	var changeColorEffect = {"type":"changeColor","rule":"queue"};
        	this.onHit = null;
        	this.onMatch = clearEffect;
        	this.onAdjMatch = null;
        	this.onClear = clearEffect;
        	this.onTurn = changeColorEffect;
        	
        	var randomColors = ["red","blue","yellow","green"];
        	do
        	{
        		var pickedColorIndex = Math.floor(Math.random()*randomColors.length);
        		this.colorQueue.push(randomColors[pickedColorIndex]);
        		randomColors.splice(pickedColorIndex, 1);
        	} while(randomColors.length > 0);
        	
        	this.colorCode = this.colorQueue[0];
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
        	
        	this.colorQueue = ["red","yellow","blue","green"];
        	if(this.colorCode == null)
        		this.colorCode = this.colorQueue[Math.floor(Math.random()*this.colorQueue.length)];
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
        // Gumball
        else if(this.type == 11)
        {
        	var clearMatches = {"type":"explode", "aoe":{"type":"match","rule":"adjacents"}};
        	
        	this.onHit = null;
        	this.onMatch = null;
        	this.onAdjMatch = clearMatches;
        	this.onClear = clearMatches;
        	this.onTurn = null;
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
       		var bombEffect = {"type":"explode", "aoe":{"type":"linear","length":2}};
        	this.onHit = bombEffect;
       		this.onMatch = null;
        	this.onAdjMatch = null;
       		this.onClear = bombEffect;
        	this.onTurn = null;
        }
        // electric orb - on adj-match, takes out (random or nearest?) match on-screen
        else if(this.type == 14)
       	{
       		var bombEffect = {"type":"explode", "aoe":{"type":"match","rule":"nearest"}};
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
        }
        // spike
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
        	var superSoapEffect = {"type":"transformOthers","aoe":{"type":"radial","radius":2},"rule":"soap"};
        	var subSoapEffect = {"type":"transformOthers","aoe":{"type":"radial","radius":1},"rule":"soap"};
        	
        	this.onHit = {"same":superSoapEffect,"else":subSoapEffect};
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
					this.bubbleImg = new cc.Sprite(res.orange_bubble);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.smile_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.sick_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.sad_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.love_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.evil_emoji);
				else if(this.colorCode == "white")
					this.bubbleImg = new cc.Sprite(res.white_bubble);
				else if(this.colorCode == "black")
					this.bubbleImg = new cc.Sprite(res.black_bubble);
			}
			else if(this.type == 7)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_pinwheel_emoji);
				else if(this.colorCode == "yellow")
					this.bubbleImg = new cc.Sprite(res.yellow_pinwheel_emoji);
				else if(this.colorCode == "blue")
					this.bubbleImg = new cc.Sprite(res.blue_pinwheel_emoji);
				else if(this.colorCode == "green")
					this.bubbleImg = new cc.Sprite(res.green_pinwheel_emoji);
				else if(this.colorCode == "pink")
					this.bubbleImg = new cc.Sprite(res.pink_pinwheel_emoji);
				else if(this.colorCode == "purple")
					this.bubbleImg = new cc.Sprite(res.purple_pinwheel_emoji);
				else cc.log("wtf");
			}
			else if(this.type == 8)
			{
				if(this.colorCode == "red")
					this.bubbleImg = new cc.Sprite(res.red_die_emoji);
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
					this.bubbleImg = new cc.Sprite(res.red_soapbar_emoji);//this
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
			}
		}
		else if(this.colorCode == null)
		{
			if(this.type == -1)
				this.bubbleImg = new cc.Sprite(res.black_circle);
			// Bomb
			else if(this.type == 1)
				this.bubbleImg = new cc.Sprite(res.bomb_emoji);
			// Anvil (Steel)
			else if(this.type == 2)
				this.bubbleImg = new cc.Sprite(res.anvil_emoji);
			// Jawbreaker (Rock)
			else if(this.type == 3)
				this.bubbleImg = new cc.Sprite(res.jawbreaker_emoji);
			
			// Egg (Poof)
			else if(this.type == 4)
				this.bubbleImg = new cc.Sprite(res.egg_emoji);
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
				this.bubbleImg = new cc.Sprite(res.gumball_emoji);
			}
			else if(this.type == 12)
			{
				this.bubbleImg = new cc.Sprite(res.large_bomb_emoji);
			}
			else if(this.type == 13)
			{
				this.bubbleImg = new cc.Sprite(res.dynamite_1_emoji);
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
				this.bubbleImg = new cc.Sprite(res.star_emoji);
			}
		}
		else cc.log("WTF");
		
		//cc.log(this.type);cc.log(this.colorCode);
		this.bubbleImg.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.bubbleImg.setScale((this.r*2)/this.bubbleImg.width);
		this.addChild(this.bubbleImg);
		
		//this.draw();
	},
	
	triggerOnTurn:function(turnNumber){
		this.removeChild(this.bubbleImg);
		if(this.type == 7)
		{
			this.colorCode = this.colorQueue[turnNumber%this.colorQueue.length];
			if(this.colorCode == "red")
				this.bubbleImg = new cc.Sprite(res.red_pinwheel_emoji);
			else if(this.colorCode == "yellow")
				this.bubbleImg = new cc.Sprite(res.yellow_pinwheel_emoji);
			else if(this.colorCode == "blue")
				this.bubbleImg = new cc.Sprite(res.blue_pinwheel_emoji);
			else if(this.colorCode == "green")
				this.bubbleImg = new cc.Sprite(res.green_pinwheel_emoji);
			else if(this.colorCode == "pink")
				this.bubbleImg = new cc.Sprite(res.pink_pinwheel_emoji);
			else if(this.colorCode == "purple")
				this.bubbleImg = new cc.Sprite(res.purple_pinwheel_emoji);
			else if(this.colorCode == "white")
				this.bubbleImg = new cc.Sprite(res.white_pinwheel_emoji);
			else if(this.colorCode == "black")
				this.bubbleImg = new cc.Sprite(res.black_pinwheel_emoji);
			
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
			else if(this.colorCode == "white")
				this.bubbleImg = new cc.Sprite(res.white_orb_emoji);
			else if(this.colorCode == "black")
				this.bubbleImg = new cc.Sprite(res.black_orb_emoji);
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
		{
			var possibleColors = [];
			for(var i=0; i<this.colorQueue.length; i++)
			{
				if(this.colorQueue[i] != this.colorCode)
				{
					possibleColors.push(this.colorQueue[i]);
				}
			}
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
