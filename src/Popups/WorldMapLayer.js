var WorldMapLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		
		this.dn = new cc.DrawNode();
		this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		
        this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":0,
        	"y":this.height-(this.closeButton.height*this.closeButton.scale),
        	"anchorX":0,
        	"anchorY":0
        });
		this.addChild(this.closeButton);
		
		this.titleLabel = new cc.LabelTTF("World Map", "Roboto", 35);
		this.titleLabel.attr({
			"x":this.x+this.width/2,
			"y":this.height-40,
			"anchorX":.5,
			"anchorY":1
		});
		this.titleLabel.color = cc.color(0,0,0,255);
		this.addChild(this.titleLabel);
		
		this.nodes = [];
		
		var mapWidth = this.width - 30;
		
		var nodeWidth = mapWidth/5;
		
		var nodeX = this.width/2;
		var nodeY = DATA.bubbleR*3;
		var moveRight = true;
		var nodeCount = 3;
		do
		{
			var node = new cc.Sprite(res.world_node);
			node.setScale(nodeWidth / node.width);
			node.attr({
				x:nodeX,
				y:nodeY,
				anchorX:.5,
				anchorY:0
			});
			this.addChild(node);
			this.nodes.push(node);
			
			if(moveRight)
				nodeX += nodeWidth*2/3;
			else nodeX -= nodeWidth*2/3;
			
			nodeY += node.height*node.scale*1.5;
			
			nodeCount++;
			if(nodeCount%6 == 0)
				moveRight = !moveRight;
		} while(nodeY < this.titleLabel.y-this.titleLabel.height);
		
	},
	
	onTouchEnd:function(pos)
	{
		if(FUNCTIONS.posWithin(pos, this.closeButton))
		{
			return "close";
		}
	}
	
});
