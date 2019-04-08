var TopUILayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
		
        var size = cc.winSize;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		//this.width = w;
		this.height = height;
		
		
		this.color = cc.color(220,220,220,255);
		
		/*
		this.gradient = cc.LayerGradient.create(cc.color(170,170,170,255), cc.color(220,220,220,255) );
		this.gradient.setContentSize(cc.size(size.width, this.height));
    	this.addChild(this.gradient);
		*/
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
		
		this.worldLabel = new cc.LabelTTF("World "+(DATA.worldIndex+1),"Arial",24);
		this.worldLabel.color = cc.color(0,0,0,255);
		this.worldLabel.attr({
			x:this.mapButton.x+(this.mapButton.width*this.mapButton.scale)+3,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.worldLabel);
		
		/*this.rankImg = null;
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
		this.addChild(this.rankImg);
		
		this.rankBar = {"x":this.rankImg.x+(this.height-10),"y":this.rankImg.y-(this.height-10)/2,"width":(size.width-15)/3 - (this.height-10), "height":this.height-10};
		*/
		
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
	
	changeToEditor:function()
	{
		this.color = cc.color(255,140,0,255);
		this.draw();
	},
	changeToGame:function()
	{
		this.color = cc.color(220,220,220,255);
		this.draw();
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(0,0),cc.p(this.width, this.height), this.color,1,cc.color(0,0,0,255));
		
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
