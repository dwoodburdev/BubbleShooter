var MidUILayer = cc.Layer.extend({
	ctor:function(w,h){
		this._super();
		
		var size = cc.winSize;
		
        this.width = w;
        this.height = h;
        
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		this.imgButtons = [];
		this.loadButtons();
		
		this.mode = "create";
		
		/*this.homeButton = new Button(0, 0, "Home", 32, cc.color(255,0,0,255), cc.color(255,255,255,255));
        this.homeButton.attr({
        	"x":size.width-this.homeButton.width/2,
        	"y":this.homeButton.height/2,
        	"anchorX":.5,
        	"anchorY":.5
        });
		this.addChild(this.homeButton);*/
		
		
		
		this.draw();
	},
	
	loadButtons:function()
	{
		var size = cc.winSize;
		var imgWidth = size.width/12;
		
		this.scrollUpImg = new cc.Sprite(res.up_arrow);
		this.scrollUpImg.attr({
			x:this.width-imgWidth,
			y:this.height,
			anchorX:0,
			anchorY:1
		});
		this.scrollUpImg.setScale((imgWidth)/this.scrollUpImg.width);
		this.addChild(this.scrollUpImg);
		
		this.scrollDownImg = new cc.Sprite(res.down_arrow);
		this.scrollDownImg.attr({
			x:this.width-imgWidth*2,
			y:this.height,
			anchorX:0,
			anchorY:1
		});
		this.scrollDownImg.setScale((imgWidth)/this.scrollDownImg.width);
		this.addChild(this.scrollDownImg);
		
		this.createLabel = new cc.LabelTTF("EDIT", "Roboto", Math.floor(this.height*.7));
		this.createLabel.attr({
			"x":5,
			"y":this.height/2,
			"anchorX":0,
			"anchorY":.5
		});
		this.createLabel.color = cc.color(0,255,0,255);
		this.addChild(this.createLabel);
		
		this.viewLabel = new cc.LabelTTF("VIEW", "Roboto", Math.floor(this.height*.7));
		this.viewLabel.attr({
			"x":this.createLabel.x+this.createLabel.width+12,
			"y":this.height/2,
			"anchorX":0,
			"anchorY":.5
		});
		this.viewLabel.color = cc.color(0,0,0,255);
		this.addChild(this.viewLabel);
		
		this.deleteImg = new cc.Sprite(res.red_x);
		this.deleteImg.setScale(this.height / this.deleteImg.height);
		this.deleteImg.attr({
			x:this.scrollDownImg.x,
			y:this.height/2,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.deleteImg);
		
		this.rightMoveArrow = new cc.Sprite(res.right_arrow);
		this.rightMoveArrow.setScale(this.height / this.rightMoveArrow.height);
		this.rightMoveArrow.attr({
			x:this.deleteImg.x-(this.deleteImg.width*this.deleteImg.scale),
			y:this.height/2,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.rightMoveArrow);
		
		this.moveLabel = new cc.LabelTTF("0","Roboto",24);
		this.moveLabel.attr({
			x:this.rightMoveArrow.x-(this.rightMoveArrow.width*this.rightMoveArrow.scale),
			y:this.height/2,
			anchorX:1,
			anchorY:.5
		});
		this.moveLabel.color = cc.color(0,0,0,255);
		this.addChild(this.moveLabel);
		
		this.leftMoveArrow = new cc.Sprite(res.left_arrow);
		this.leftMoveArrow.setScale(this.height / this.leftMoveArrow.height);
		this.leftMoveArrow.attr({
			x:this.moveLabel.x-(this.moveLabel.width*this.moveLabel.scale),
			y:this.height/2,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(this.leftMoveArrow);
		
		
		
	},
	
	onTouchBegin:function(pos)
	{
		//this.draw();
	},
	onTouchMoved:function(pos)
	{
		
	},
	onTouchEnded:function(pos)
	{
		if(pos.x > this.scrollUpImg.x && pos.x < this.scrollUpImg.x+this.scrollUpImg.width)
		{
			return {"type":"scrollup"};
		}
		else if(pos.x > this.scrollDownImg.x && pos.x < this.scrollDownImg.x+this.scrollDownImg.width)
		{
			return {"type":"scrolldown"};
		}
		else if(pos.x < this.deleteImg.x && pos.x > this.deleteImg.x-(this.deleteImg.width*this.deleteImg.scale))
		{
			return {"type":"delete"};
		}
		else if(pos.x < this.rightMoveArrow.x && pos.x > this.rightMoveArrow.x-(this.rightMoveArrow.width*this.rightMoveArrow.scale))
		{
			return {"type":"rightMove"};
		}
		else if(pos.x < this.leftMoveArrow.x && pos.x > this.leftMoveArrow.x-(this.leftMoveArrow.width*this.leftMoveArrow.scale))
		{
			return {"type":"leftMove"};
		}
		else if(pos.x > this.createLabel.x && pos.x < this.createLabel.x+this.createLabel.width)
		{
			this.createLabel.color = cc.color(0,255,0,255);
			this.viewLabel.color = cc.color(0,0,0,255);
			this.mode = "create";
			return {"type":"create"};
		}
		else if(pos.x > this.viewLabel.x && pos.x < this.viewLabel.x+this.viewLabel.width)
		{
			this.viewLabel.color = cc.color(0,255,0,255);
			this.createLabel.color = cc.color(0,0,0,255);
			this.mode = "view";
			return {"type":"view"};
		}
		
	},
	
	draw:function(){
		
		this.dn.drawRect(cc.p(0,0),cc.p(0+this.width, 0+this.height), cc.color(255,255,255,255),1,cc.color(0,0,0,255));
		
		
	}
	
	
});
