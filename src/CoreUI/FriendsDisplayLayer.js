var FriendsDisplayLayer = cc.Layer.extend({
	ctor:function(height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),0,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
		this.tabTitleLabel = new cc.LabelTTF("Friends", "Arial", 40);
		this.tabTitleLabel.attr({
			"x":size.width/2,
			"y":this.height,
			"anchorX":.5,
			"anchorY":1
		});
		this.tabTitleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.tabTitleLabel);
		
		
		var promoBorder = 5;
		var promoWidth = size.width*.9;
		var promoHeight = ((size.width-promoBorder*4)/3)*1.3;
		this.promoRect = {
			x: size.width*.05,
			y: this.tabTitleLabel.y-this.tabTitleLabel.height - 5 - promoHeight,
			width: promoWidth,
			height: promoHeight,
			color: cc.color(255,0,0,255)
		};
		
		this.friendRects = [];
		this.friendNameLabels = [];
		
		var friendBorder = 5;
		var friendWidth = size.width*.9;
		var friendHeight = ((size.width-friendBorder*4)/3)*.7;
		for(var i=0; i<4; i++)
		{
			var friendRect = {
				x:size.width*.05,
				y:this.promoRect.y - 5 - friendHeight - (5+friendHeight)*i,
				width:friendWidth,
				height:friendHeight,
				color: cc.color(0,255,0,255)
			};
			this.friendRects.push(friendRect);
			
			var friendNameLabel = new cc.LabelTTF("Dylan Woodbury", "Roboto", 16);
			friendNameLabel.color = cc.color(0,0,0,255);
			friendNameLabel.attr({
				x:friendRect.x+5, 
				y:friendRect.y+friendRect.height-5,
				anchorX:0,
				anchorY:1
			});
			this.friendNameLabels.push(friendNameLabel);
			this.addChild(friendNameLabel);
		}


		
		this.draw();
	},
	
	draw:function()
	{
		this.dn.drawRect(cc.p(this.promoRect.x, this.promoRect.y),cc.p(this.promoRect.x+this.promoRect.width,this.promoRect.y+this.promoRect.height),this.promoRect.color,2,cc.color(0,0,0,255));
		
		for(var i=0; i<this.friendRects.length; i++)
		{
			var rect = this.friendRects[i];
			this.dn.drawRect(cc.p(rect.x, rect.y), cc.p(rect.x+rect.width, rect.y+rect.height), rect.color, 2, cc.color(0,0,0,255));
		}
	},
	
	onTouchBegan:function(pos)
	{
		
	},
	
	onTouchMoved:function(pos)
	{
		
	},
	
	onTouchEnded:function(pos)
	{
		
	}
	
});
