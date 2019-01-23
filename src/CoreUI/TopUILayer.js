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
			"y":this.height/2,
			"anchorX":0,
			"anchorY":.5
		});
		this.addChild(this.coinImg);
		
		this.coinLabel = new cc.LabelTTF(""+DATA.coins, "Arial", 24);
		this.coinLabel.attr({
			"x":this.coinImg.x-3,
			"y":this.height/2,
			"anchorX":1,
			"anchorY":.5
		});
		this.coinLabel.color = cc.color(0,0,0,255);
		this.addChild(this.coinLabel);
		
		this.gemImg = new cc.Sprite(res.gem);
		this.gemImg.setScale((this.height-10)/this.gemImg.height);
		this.gemImg.attr({
			"x":this.coinImg.x-(this.height-10)*3 - 5*3,
			"y":this.height/2,
			"anchorX":0,
			"anchorY":.5
		});
		//this.addChild(this.gemImg);
		
		this.gemLabel = new cc.LabelTTF(""+DATA.gems, "Arial", 24);
		this.gemLabel.attr({
			"x":this.gemImg.x-3,
			"y":this.height/2,
			"anchorX":1,
			"anchorY":.5
		});
		this.gemLabel.color = cc.color(0,0,0,255);
		//this.addChild(this.gemLabel);
		
		/*this.worldLabel = new cc.LabelTTF("World "+DATA.worldIndex, "Arial", 32);
		this.worldLabel.attr({
			x:cc.winSize.width/2,
			y:this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.worldLabel.color = cc.color(0,0,0,255);
		this.addChild(this.worldLabel);*/
		
		this.settingsButton = new cc.Sprite(res.settings_icon);
		this.settingsButton.setScale((this.height-4) / this.settingsButton.height);
		this.settingsButton.attr({
			x:2,
			y:2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.settingsButton);
		
		this.mapButton = new cc.Sprite(res.map_icon);
		this.mapButton.setScale((this.height-4) / this.mapButton.height);
		this.mapButton.attr({
			x:this.settingsButton.x+(this.settingsButton.width*this.settingsButton.scale)+10,
			y:2,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.mapButton);
		
		this.rankImg = null;
		if(DATA.rank == 1)
			this.rankImg = new cc.Sprite(res.rank1);
		else if(DATA.rank == 2)
			this.rankImg = new cc.Sprite(res.rank2);
		else if(DATA.rank == 3)
			this.rankImg = new cc.Sprite(res.rank3);
		else if(DATA.rank == 4)
			this.rankImg = new cc.Sprite(res.rank4);
		else if(DATA.rank == 5)
			this.rankImg = new cc.Sprite(res.rank5);
		else if(DATA.rank == 6)
			this.rankImg = new cc.Sprite(res.rank6);
		else if(DATA.rank == 7)
			this.rankImg = new cc.Sprite(res.rank7);
		else if(DATA.rank == 8)
			this.rankImg = new cc.Sprite(res.rank8);
		else if(DATA.rank == 9)
			this.rankImg = new cc.Sprite(res.rank9);
		else if(DATA.rank == 10)
			this.rankImg = new cc.Sprite(res.rank10);
		
		this.rankImg.setScale((this.height-10)/this.rankImg.height);
		this.rankImg.attr({
			"x":5,
			"y":height/2,
			"anchorX":0,
			"anchorY":.5
		});
		//this.addChild(this.rankImg);
		
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
	
	setCoins:function()
	{
		this.coinLabel.setString(DATA.coins);
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(0,0),cc.p(this.width, this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		//this.dn.drawRect(cc.p(this.rankBar.x, this.rankBar.y),cc.p(this.rankBar.x+this.rankBar.width, this.rankBar.y+this.rankBar.height), cc.color(255,255,255,255),2,cc.color(0,0,0,255));
		//this.dn.drawRect(cc.p(this.rankBar.x+2,this.rankBar.y+2),cc.p(this.rankBar.x+Math.max(((this.rankBar.width-4)*(DATA.rankProgress/DATA.rankThreshold)),2),this.rankBar.y+(this.rankBar.height-2)),cc.color(0,255,0,255),0,cc.color(0,255,0,255));
		
	},
	
	onTouchEnd:function(pos)
	{
		var loc = this.convertToNodeSpace(pos);cc.log(loc);
		if(FUNCTIONS.posWithinScaled(loc, this.settingsButton))
		{cc.log("settings");
			this.parent.openSettingsLayer();
		}
		else if(FUNCTIONS.posWithinScaled(loc, this.mapButton))
		{cc.log("map");
			this.parent.openWorldMapLayer();
		}	
	}
	
});
