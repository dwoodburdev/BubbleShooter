var CounterLayer = cc.Layer.extend({
	ctor:function(width, numMoves){
		this._super();
		
		this.width = width;
		this.height = width;
		this.numMoves = numMoves
		
		this.countBG = new cc.Sprite(res.black_button);
		this.countBG.setScale(this.width / this.countBG.width);
		this.countBG.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.countBG);
		
		this.countdownChallengeText = new cc.LabelTTF(""+numMoves,"Arial",24);
		this.countdownChallengeText.color = cc.color(0,0,0,255);
		this.countdownChallengeText.attr({
			x:this.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.countdownChallengeText);
	},
	
	updateMoves:function()
	{
		this.numMoves--;
		this.countdownChallengeText.setString(""+this.numMoves);
		
		if(this.numMoves == 4)
		{
			this.changeToRed();
		}
	},
	
	changeToRed:function()
	{
		this.removeChild(this.countBG);
		this.countBG = new cc.Sprite(res.red_button);
		this.countBG.setScale(this.width / this.countBG.width);
		this.countBG.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.countBG);
		
		this.removeChild(this.countdownChallengeText);
		this.countdownChallengeText.color = cc.color(255,255,255,255);
		this.addChild(this.countdownChallengeText);
	},
	
	onTouchEnd:function(pos){
		cc.log("onTouchEnd");
		var size = cc.winSize;
		
		
			
	}
});