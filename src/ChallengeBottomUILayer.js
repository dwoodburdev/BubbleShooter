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
		
		this.boosterAImg = new cc.Sprite(res.pre_booster_moves);
		this.boosterAImg.setScale(this.height / this.boosterAImg.height);
		this.boosterAImg.attr({
			"x":0,
			"y":0,
			"anchorX":0,
			"anchorY":0
		});
		this.addChild(this.boosterAImg);
		
		this.boosterBImg = new cc.Sprite(res.pre_booster_moves);
		this.boosterBImg.setScale(this.height / this.boosterBImg.height);
		this.boosterBImg.attr({
			"x":0,
			"y":0,
			"anchorX":0,
			"anchorY":0
		});
		this.addChild(this.boosterBImg);
		
		this.boosterCImg = new cc.Sprite(res.pre_booster_moves);
		this.boosterCImg.setScale(this.height / this.boosterCImg.height);
		this.boosterCImg.attr({
			"x":0,
			"y":0,
			"anchorX":0,
			"anchorY":0
		});
		this.addChild(this.boosterCImg);
		
		
		
		
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
		/*if(pos.x > this.meButton.x && pos.x < this.meButton.x+this.buttonWidth)
		{
			cc.director.runScene(new MeScene());
		}*/
		
		
	}
	
});
