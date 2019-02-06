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
