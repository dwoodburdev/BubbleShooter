var DrawOptions = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		//this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
		
		this.bubbleSize = this.width / 8;
		
		this.optionKeys = [];
		
		this.optionImgs = [];
		
	},
	
	onTouchBegan:function(loc)
	{
		
	},
	onTouchMoved:function(loc)
	{
		
	},
	onTouchEnded:function(loc)
	{cc.log(loc);
		for(var i=0; i<this.optionImgs.length; i++)
		{
			if(loc.x > this.optionImgs[i].x && loc.x < this.optionImgs[i].x+(this.optionImgs[i].width*this.optionImgs[i].scale))
			{cc.log(this.optionKeys);
				this.parent.setOption(this.optionKeys[i]);
				
				if(this.parent.curEmojiKey == "snail")
				{
					if(this.optionKeys[i] == "left")
					{
						this.optionKeys[i] = "right";
						this.removeChild(this.optionImgs[this.optionImgs.length-1]);
						this.optionImgs.splice(this.optionImgs.length-1, 1);
						var arrowImg = new cc.Sprite(res.right_arrow);
						arrowImg.setScale(this.height*.7 / arrowImg.height);
						arrowImg.attr({
							x:this.optionImgs[this.optionImgs.length-1].x+(this.optionImgs[this.optionImgs.length-1].width*this.optionImgs[this.optionImgs.length-1].scale)+1,
							y:this.height/2,
							anchorX:0,
							anchorY:.5
						});
						this.addChild(arrowImg);
						this.optionImgs.push(arrowImg);
					}
					else if(this.optionKeys[i] == "right")
					{
						this.optionKeys[i] = "left";
						this.removeChild(this.optionImgs[this.optionImgs.length-1]);
						this.optionImgs.splice(this.optionImgs.length-1, 1);
						var arrowImg = new cc.Sprite(res.left_arrow);
						arrowImg.setScale(this.height*.7 / arrowImg.height);
						arrowImg.attr({
							x:this.optionImgs[this.optionImgs.length-1].x+(this.optionImgs[this.optionImgs.length-1].width*this.optionImgs[this.optionImgs.length-1].scale)+1,
							y:this.height/2,
							anchorX:0,
							anchorY:.5
						});
						this.addChild(arrowImg);
						this.optionImgs.push(arrowImg);
					}
				}
				else if(this.parent.curEmojiKey == "knife")
				{
					if(this.optionKeys[i] == "west")
					{
						this.optionKeys[i] = "northwest";
						this.removeChild(this.optionImgs[this.optionImgs.length-1]);
						this.optionImgs.splice(this.optionImgs.length-1, 1);
						var arrowImg = new cc.Sprite(res.upleft_arrow);
						arrowImg.setScale(this.height*.7 / arrowImg.height);
						arrowImg.attr({
							x:2,
							y:this.height/2,
							anchorX:0,
							anchorY:.5
						});
						this.addChild(arrowImg);
						this.optionImgs.push(arrowImg);
					}
					else if(this.optionKeys[i] == "northwest")
					{
						this.optionKeys[i] = "northeast";
						this.removeChild(this.optionImgs[this.optionImgs.length-1]);
						this.optionImgs.splice(this.optionImgs.length-1, 1);
						var arrowImg = new cc.Sprite(res.upright_arrow);
						arrowImg.setScale(this.height*.7 / arrowImg.height);
						arrowImg.attr({
							x:2,
							y:this.height/2,
							anchorX:0,
							anchorY:.5
						});
						this.addChild(arrowImg);
						this.optionImgs.push(arrowImg);
					}
					else if(this.optionKeys[i] == "northeast")
					{
						this.optionKeys[i] = "east";
						this.removeChild(this.optionImgs[this.optionImgs.length-1]);
						this.optionImgs.splice(this.optionImgs.length-1, 1);
						var arrowImg = new cc.Sprite(res.upright_arrow);
						arrowImg.setScale(this.height*.7 / arrowImg.height);
						arrowImg.attr({
							x:2,
							y:this.height/2,
							anchorX:0,
							anchorY:.5
						});
						this.addChild(arrowImg);
						this.optionImgs.push(arrowImg);
					}
					else if(this.optionKeys[i] == "east")
					{
						this.optionKeys[i] = "southeast";
						this.removeChild(this.optionImgs[this.optionImgs.length-1]);
						this.optionImgs.splice(this.optionImgs.length-1, 1);
						var arrowImg = new cc.Sprite(res.upright_arrow);
						arrowImg.setScale(this.height*.7 / arrowImg.height);
						arrowImg.attr({
							x:2,
							y:this.height/2,
							anchorX:0,
							anchorY:.5
						});
						this.addChild(arrowImg);
						this.optionImgs.push(arrowImg);
					}
					else if(this.optionKeys[i] == "southeast")
					{
						this.optionKeys[i] = "southwest";
						this.removeChild(this.optionImgs[this.optionImgs.length-1]);
						this.optionImgs.splice(this.optionImgs.length-1, 1);
						var arrowImg = new cc.Sprite(res.upright_arrow);
						arrowImg.setScale(this.height*.7 / arrowImg.height);
						arrowImg.attr({
							x:2,
							y:this.height/2,
							anchorX:0,
							anchorY:.5
						});
						this.addChild(arrowImg);
						this.optionImgs.push(arrowImg);
					}
					else if(this.optionKeys[i] == "southwest")
					{
						this.optionKeys[i] = "west";
						this.removeChild(this.optionImgs[this.optionImgs.length-1]);
						this.optionImgs.splice(this.optionImgs.length-1, 1);
						var arrowImg = new cc.Sprite(res.upright_arrow);
						arrowImg.setScale(this.height*.7 / arrowImg.height);
						arrowImg.attr({
							x:2,
							y:this.height/2,
							anchorX:0,
							anchorY:.5
						});
						this.addChild(arrowImg);
						this.optionImgs.push(arrowImg);
					}
				}
				else if(this.parent.curEmojiKey == "ghost")
				{
					if(this.optionKeys[i] == "transparent")
					{
						this.optionKeys[i] = "solid";
						this.removeChild(this.optionImgs[this.optionImgs.length-1]);
						this.optionImgs.splice(this.optionImgs.length-1, 1);
						var signalImg = new cc.Sprite(res.solid_square);
						signalImg.setScale(this.height*.7 / signalImg.height);
						signalImg.attr({
							x:this.optionImgs[this.optionImgs.length-1].x+(this.optionImgs[this.optionImgs.length-1].width*this.optionImgs[this.optionImgs.length-1].scale)+1,
							y:this.height/2,
							anchorX:0,
							anchorY:.5
						});
						this.addChild(signalImg);
						this.optionImgs.push(signalImg);
					}
					else if(this.optionKeys[i] == "solid")
					{
						this.optionKeys[i] = "transparent";
						this.removeChild(this.optionImgs[this.optionImgs.length-1]);
						this.optionImgs.splice(this.optionImgs.length-1, 1);
						var signalImg = new cc.Sprite(res.transparent_square);
						signalImg.setScale(this.height*.7 / signalImg.height);
						signalImg.attr({
							x:this.optionImgs[this.optionImgs.length-1].x+(this.optionImgs[this.optionImgs.length-1].width*this.optionImgs[this.optionImgs.length-1].scale)+1,
							y:this.height/2,
							anchorX:0,
							anchorY:.5
						});
						this.addChild(signalImg);
						this.optionImgs.push(signalImg);
					}
				}
			}
		}
		
	},
	
	setOptions:function(code, properties)
	{cc.log("SETTING OPTIONS");
		for(var i=0; i<this.optionImgs.length; i++)
		{
			this.removeChild(this.optionImgs[i]);
		}
		this.optionImgs = [];
		
		var propKeys = Object.keys(properties);
		
		
		if(code == "emoji" || code == "die" || code == "soapbar" || code == "balloon" || code == "ghost" || code == "snail" || code == "egg")
		{
			this.optionKeys = ["yellow","blue","red","green"];
			
			var yellowImg = new cc.Sprite(res.yellow_ball);
			yellowImg.setScale(this.height*.7 / yellowImg.height);
			yellowImg.attr({
				x:2,
				y:this.height/2,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(yellowImg);
			this.optionImgs.push(yellowImg);
			
			var blueImg = new cc.Sprite(res.blue_ball);
			blueImg.setScale(this.height*.7 / blueImg.height);
			blueImg.attr({
				x:yellowImg.x+(yellowImg.width*yellowImg.scale)+1,
				y:this.height/2,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(blueImg);
			this.optionImgs.push(blueImg);
			
			var redImg = new cc.Sprite(res.red_ball);
			redImg.setScale(this.height*.7 / redImg.height);
			redImg.attr({
				x:blueImg.x+(blueImg.width*blueImg.scale)+1,
				y:this.height/2,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(redImg);
			this.optionImgs.push(redImg);
			
			var greenImg = new cc.Sprite(res.green_ball);
			greenImg.setScale(this.height*.7 / greenImg.height);
			greenImg.attr({
				x:redImg.x+(redImg.width*redImg.scale)+1,
				y:this.height/2,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(greenImg);
			this.optionImgs.push(greenImg);
			
			
		}
		
		if(code == "snail")
		{cc.log("SNAIL OPT");
			this.optionKeys.push("left");
			
			var arrowImg = new cc.Sprite(res.left_arrow);
			arrowImg.setScale(this.height*.7 / arrowImg.height);
			arrowImg.attr({
				x:this.optionImgs[this.optionImgs.length-1].x+(this.optionImgs[this.optionImgs.length-1].width*this.optionImgs[this.optionImgs.length-1].scale)+1,
				y:this.height/2,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(arrowImg);
			this.optionImgs.push(arrowImg);
		}
		else if(code == "knife")
		{cc.log("Push knife option");
			this.optionKeys.push("southwest");
			
			var arrowImg = new cc.Sprite(res.downleft_arrow);
			arrowImg.setScale(this.height*.7 / arrowImg.height);
			arrowImg.attr({
				x:2,
				y:this.height/2,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(arrowImg);
			this.optionImgs.push(arrowImg);
		}
		else if(code == "ghost")
		{cc.log("GHOST");
			this.optionKeys.push("transparent");
			
			var signalImg = new cc.Sprite(res.transparent_square);
			signalImg.setScale(this.height*.7 / signalImg.height);
			signalImg.attr({
				x:this.optionImgs[this.optionImgs.length-1].x+(this.optionImgs[this.optionImgs.length-1].width*this.optionImgs[this.optionImgs.length-1].scale)+1,
				y:this.height/2,
				anchorX:0,
				anchorY:.5
			});
			this.addChild(signalImg);
			this.optionImgs.push(signalImg);
		}
		
	}
	
	
	
});