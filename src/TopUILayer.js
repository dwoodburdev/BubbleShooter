var TopUILayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
		
        var size = cc.winSize;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		//this.width = w;
		this.height = height;
		
		this.coinImg = new cc.Sprite(res.coin);
		this.coinImg.setScale((this.height-10)/this.coinImg.height);
		this.coinImg.attr({
			"x":size.width-(this.height-10)-5,
			"y":height/2,
			"anchorX":0,
			"anchorY":.5
		});
		this.addChild(this.coinImg);
		
		this.coinLabel = new cc.LabelTTF(""+DATA.coins, "Arial", 32);
		this.coinLabel.attr({
			"x":this.coinImg.x-3,
			"y":this.coinImg.y,
			"anchorX":1,
			"anchorY":.5
		});
		this.coinLabel.color = cc.color(0,0,0,255);
		this.addChild(this.coinLabel);
		
		this.gemImg = new cc.Sprite(res.gem);
		this.gemImg.setScale((this.height-10)/this.gemImg.height);
		this.gemImg.attr({
			"x":this.coinImg.x-(this.height-10)*3 - 5*3,
			"y":height/2,
			"anchorX":0,
			"anchorY":.5
		});
		this.addChild(this.gemImg);
		
		this.gemLabel = new cc.LabelTTF(""+DATA.gems, "Arial", 32);
		this.gemLabel.attr({
			"x":this.gemImg.x-3,
			"y":this.gemImg.y,
			"anchorX":1,
			"anchorY":.5
		});
		this.gemLabel.color = cc.color(0,0,0,255);
		this.addChild(this.gemLabel);
		
		this.rankImg = new cc.Sprite(res.rank1);
		this.rankImg.setScale((this.height-10)/this.rankImg.height);
		this.rankImg.attr({
			"x":5,
			"y":height/2,
			"anchorX":0,
			"anchorY":.5
		});
		this.addChild(this.rankImg);
		
		this.rankBar = {"x":this.rankImg.x+(this.height-10),"y":this.rankImg.y-(this.height-10)/2,"width":(size.width-15)/3 - (this.height-10), "height":this.height-10};
		
		//this.buttonWidth = size.width/5;
		//this.buttonHeight = this.height;
		/*
		this.meButton = new cc.Sprite(res.me_button);
		this.meButton.setScaleX(this.buttonWidth/this.meButton.width);
		this.meButton.setScaleY(this.buttonHeight/this.meButton.height);
		this.meButton.attr({
			"x":0,
			"y":0,
			"anchorX":0,
			"anchorY":0
		});
		this.addChild(this.meButton);
		*/
		
		
		
		
		this.draw();
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		this.dn.drawRect(cc.p(this.rankBar.x, this.rankBar.y),cc.p(this.rankBar.x+this.rankBar.width, this.rankBar.y+this.rankBar.height), cc.color(255,255,255,255),2,cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(this.rankBar.x+2,this.rankBar.y+2),cc.p(this.rankBar.x+((this.rankBar.width-4)*DATA.rankProgress),this.rankBar.y+(this.rankBar.height-2)),cc.color(0,255,0,255),0,cc.color(0,255,0,255));
		
	},
	
	onTouchEnd:function(pos)
	{
		/*if(pos.x > this.meButton.x && pos.x < this.meButton.x+this.buttonWidth)
		{
			cc.director.runScene(new MeScene());
		}*/		
	}
	
});
