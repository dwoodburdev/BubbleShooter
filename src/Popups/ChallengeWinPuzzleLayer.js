var ChallengeWinPuzzleLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.setNameLabel = new cc.LabelTTF("One-Pagers (Tier 1)","Roboto", 24);
		this.setNameLabel.attr({
			x:this.width/2,
			y:this.height,
			anchorX:.5,
			anchorY:1
		});
		this.setNameLabel.color = cc.color(0,0,0,255);
		this.addChild(this.setNameLabel);
		
		this.puzzleImg = new cc.Sprite(res.framed_picture);
		this.puzzleImg.setScale(this.height/2 / this.puzzleImg.height);
		this.puzzleImg.attr({
			x:this.width/2,
			y:this.setNameLabel.y - (this.setNameLabel.height*this.setNameLabel.scale),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.puzzleImg);
		
		this.progressLabel = new cc.LabelTTF("1 / 3","Roboto",18);
		this.progressLabel.attr({
			x:this.width/2,
			y:this.puzzleImg.y-(this.puzzleImg.height*this.puzzleImg.scale),
			anchorX:.5,
			anchorY:1
		});
		this.progressLabel.color = cc.color(0,0,0,255);
		this.addChild(this.progressLabel);
		
		
		
		
	},
	
	draw:function()
	{
		
	},
	
	onTouchEnd:function(pos)
	{
		
	}
	
});
