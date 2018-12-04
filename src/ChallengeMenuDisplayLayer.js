var ChallengeMenuDisplayLayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Rewards", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		var chestBorder = 5;
		var chestWidth = (size.width-chestBorder*4)/3;
		var chestHeight = chestWidth;
		this.chestASquare = {
			x: chestBorder,
			y: this.tabTitleLabel.y-this.tabTitleLabel.height - 5 - chestHeight,
			width: chestWidth,
			height: chestHeight
		};
		this.chestBSquare = {
			x: chestBorder*2 + chestWidth,
			y: this.tabTitleLabel.y-this.tabTitleLabel.height - 5 - chestHeight,
			width: chestWidth,
			height: chestHeight
		};
		this.chestCSquare = {
			x: chestBorder*3 + chestWidth*2,
			y: this.tabTitleLabel.y-this.tabTitleLabel.height - 5 - chestHeight,
			width: chestWidth,
			height: chestHeight
		};
		
		this.starASquare = {
			x: chestBorder,
			y: this.tabTitleLabel.y-this.tabTitleLabel.height - 5*2 - chestHeight*2,
			width: chestWidth,
			height: chestHeight
		};
		this.starBSquare = {
			x: chestBorder*2 + chestWidth,
			y: this.tabTitleLabel.y-this.tabTitleLabel.height - 5*2 - chestHeight*2,
			width: chestWidth,
			height: chestHeight
		};
		this.starCSquare = {
			x: chestBorder*3 + chestWidth*2,
			y: this.tabTitleLabel.y-this.tabTitleLabel.height - 5*2 - chestHeight*2,
			width: chestWidth,
			height: chestHeight
		};
		
		var challengeBorder = 5;
		var challengeWidth = size.width-10;
		var challengeHeight = (this.height - this.starASquare.y - challengeBorder*4)/3;
		this.challengeARect = {
			x: 5,
			y: this.starASquare.y - 5 - challengeHeight,
			width: challengeWidth,
			height: challengeHeight
		};
		this.challengeBRect = {
			x: 5,
			y: this.starASquare.y - 5*2 - challengeHeight*2,
			width: challengeWidth,
			height: challengeHeight
		};
		this.challengeCRect = {
			x: 5,
			y: this.starASquare.y - 5*3 - challengeHeight*3,
			width: challengeWidth,
			height: challengeHeight
		};
		
		
		this.draw();	
		
		
        //return true;
	},
	
	draw:function()
	{
		this.dn.drawRect(cc.p(this.chestASquare.x, this.chestASquare.y),cc.p(this.chestASquare.x+this.chestASquare.width,this.chestASquare.y+this.chestASquare.height),cc.color(255,0,0,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.chestBSquare.x, this.chestBSquare.y),cc.p(this.chestBSquare.x+this.chestBSquare.width,this.chestBSquare.y+this.chestBSquare.height),cc.color(255,0,0,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.chestCSquare.x, this.chestCSquare.y),cc.p(this.chestCSquare.x+this.chestCSquare.width,this.chestCSquare.y+this.chestCSquare.height),cc.color(255,0,0,255),2,cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(this.starASquare.x, this.starASquare.y),cc.p(this.starASquare.x+this.starASquare.width,this.starASquare.y+this.starASquare.height),cc.color(0,0,255,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.starBSquare.x, this.starBSquare.y),cc.p(this.starBSquare.x+this.starBSquare.width,this.starBSquare.y+this.starBSquare.height),cc.color(0,0,255,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.starCSquare.x, this.starCSquare.y),cc.p(this.starCSquare.x+this.starCSquare.width,this.starCSquare.y+this.starCSquare.height),cc.color(0,0,255,255),2,cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(this.challengeARect.x, this.challengeARect.y), cc.p(this.challengeARect.x+this.challengeARect.width, this.challengeARect.y+this.challengeARect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.challengeBRect.x, this.challengeBRect.y), cc.p(this.challengeBRect.x+this.challengeBRect.width, this.challengeBRect.y+this.challengeBRect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.challengeCRect.x, this.challengeCRect.y), cc.p(this.challengeCRect.x+this.challengeCRect.width, this.challengeCRect.y+this.challengeCRect.height),cc.color(0,255,0,255),2,cc.color(0,0,0,255));
	},
	
	onTouchEnd:function(pos)
	{
		
	}
	
});
