var ChallengeBottomUILayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		cc.associateWithNative( this, cc.Sprite );
		
        var size = cc.winSize;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		//this.width = w;
		this.height = height;
		
		this.buttonWidth = size.width/5;
		this.buttonHeight = this.height;
		
		this.boosterAImg = new cc.Sprite(res.in_booster_bomb);
		this.boosterAImg.setScale(this.height*.75 / this.boosterAImg.height);
		this.boosterAImg.attr({
			"x":0,
			"y":this.height,
			"anchorX":0,
			"anchorY":1
		});
		this.addChild(this.boosterAImg);
		
		this.boosterACounter = new cc.LabelTTF(""+DATA.boosterInventoryA, "Roboto", 15);
		this.boosterACounter.attr({
			"x":this.boosterAImg.x + this.boosterAImg.width*this.boosterAImg.scale/2,
			"y":this.boosterAImg.y - (this.boosterAImg.height*this.boosterAImg.scale)-1,
			"anchorX":.5,
			"anchorY":1
		});
		this.boosterACounter.color = cc.color(0,0,0,255);
		this.addChild(this.boosterACounter);
		
		this.boosterBImg = new cc.Sprite(res.in_booster_beachball);
		this.boosterBImg.setScale(this.height*.75 / this.boosterBImg.height);
		this.boosterBImg.attr({
			"x":this.boosterAImg.x + this.boosterAImg.width*this.boosterAImg.scale +1,
			"y":this.height,
			"anchorX":0,
			"anchorY":1
		});
		this.addChild(this.boosterBImg);
		
		this.boosterBCounter = new cc.LabelTTF(""+DATA.boosterInventoryB, "Roboto", 15);
		this.boosterBCounter.attr({
			"x":this.boosterBImg.x + this.boosterBImg.width*this.boosterBImg.scale/2,
			"y":this.boosterBImg.y - (this.boosterBImg.height*this.boosterBImg.scale)-1,
			"anchorX":.5,
			"anchorY":1
		});
		this.boosterBCounter.color = cc.color(0,0,0,255);
		this.addChild(this.boosterBCounter);
		
		
		this.boosterCImg = new cc.Sprite(res.in_booster_rocket);
		this.boosterCImg.setScale(this.height*.75 / this.boosterCImg.height);
		this.boosterCImg.attr({
			"x":this.boosterBImg.x + this.boosterBImg.width*this.boosterBImg.scale +1,
			"y":this.height,
			"anchorX":0,
			"anchorY":1
		});
		this.addChild(this.boosterCImg);
		
		this.boosterCCounter = new cc.LabelTTF(""+DATA.boosterInventoryC, "Roboto", 15);
		this.boosterCCounter.attr({
			"x":this.boosterCImg.x + this.boosterCImg.width*this.boosterCImg.scale/2,
			"y":this.boosterCImg.y - (this.boosterCImg.height*this.boosterCImg.scale)-1,
			"anchorX":.5,
			"anchorY":1
		});
		this.boosterCCounter.color = cc.color(0,0,0,255);
		this.addChild(this.boosterCCounter);
		
		
		this.draw();
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
	},
	
	selectButton:function(code)
	{
		/*if(code == "me")
		{
			this.removeChild(this.meButton);
			this.meButton = new cc.Sprite(res.me_selected_button);
			this.meButton.setScaleX(this.buttonWidth/this.meButton.width);
			this.meButton.setScaleY(this.buttonHeight/this.meButton.height);
			this.meButton.attr({
				"x":0,
				"y":0,
				"anchorX":0,
				"anchorY":0
			});
			this.addChild(this.meButton);
		}*/
		
	},
	
	onTouchEnd:function(pos)
	{
		if(this.posWithinScaled(pos, this.boosterAImg))
		{
			if(DATA.boosterInventoryA > 0)
			{
				DATA.boosterInventoryA--;
				return "bomb-booster";
			}
			else
			{
				return "bomb-booster-empty";
			}
		}
		
	},
	
	posWithinScaled:function(pos, square)
	{
		if(pos.x > square.x && pos.x < square.x+square.width*square.scale &&
			pos.y > square.y && pos.y < square.y+square.height*square.scale)
		{
			return true;
		}
		return false;
	}
	
});
