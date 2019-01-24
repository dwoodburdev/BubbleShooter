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
		//this.addChild(this.titleLabel);
		
		this.lastDragY = null;
		
		this.avatarImg = null;
		this.giftImg = null;
		this.rewardImages = [];
		
		this.nodes = [];
		this.worldNumberLabels = [];	
		
		var mapWidth = this.width - 30;
		
		var nodeWidth = mapWidth/5;
		
		var nodeX = this.width/2;
		var nodeY = DATA.bubbleR*3;
		var moveRight = true;
		var nodeCount = 3;
		var worldNumber = 1;
		do
		{
			
			var node = new cc.Sprite(res.world_node);
			if(worldNumber > DATA.worldIndex)
				node = new cc.Sprite(res.world_node_gray);
			
			var numLabel = new cc.LabelTTF(""+worldNumber, "Roboto", 16);
			numLabel.attr({
				x:nodeX,
				y:nodeY-2,
				anchorX:.5,
				anchorY:1
			});
			numLabel.color = cc.color(0,0,0,255);
			this.addChild(numLabel);
			
			this.worldNumberLabels.push(numLabel);
		
			
			node.setScale(nodeWidth / node.width);
			node.attr({
				x:nodeX,
				y:nodeY,
				anchorX:.5,
				anchorY:0
			});
			this.addChild(node);
			this.nodes.push(node);
			
			var rewardImg = null;
			
			if(worldNumber == DATA.worldIndex)
			{
				this.avatarImg = new cc.Sprite(res.smile_emoji);
				this.avatarImg.setScale(nodeWidth/2 / this.avatarImg.width);
				this.avatarImg.attr({
					x:nodeX,
					y:nodeY+(node.height/2*node.scale),
					anchorX:.5,
					anchorY:0
				});
				this.addChild(this.avatarImg);
				this.rewardImages.push(this.avatarImg);
			}
			/*else if(worldNumber == DATA.worldIndex+1)
			{
				this.giftImg = new cc.Sprite(res.regular_chest);
				this.giftImg.setScale(nodeWidth/2 / this.giftImg.width);
				this.giftImg.attr({
					x:nodeX,
					y:nodeY+(node.height/2*node.scale),
					anchorX:.5,
					anchorY:0
				});
				this.addChild(this.giftImg);
			}*/
			else if(worldNumber == 2)
			{
				rewardImg = new cc.Sprite(res.bomb_emoji);
			}
			else if(worldNumber == 3)
			{
				rewardImg = new cc.Sprite(res.red_die_emoji);
			}
			else if(worldNumber == 5)
			{
				rewardImg = new cc.Sprite(res.dynamite_1_emoji);
			}
			else if(worldNumber == 7)
			{
				rewardImg = new cc.Sprite(res.red_bulb_emoji);
			}
			else if(worldNumber == 10)
			{
				rewardImg = new cc.Sprite(res.beachball_emoji);
			}
			else if(worldNumber == 13)
			{
				rewardImg = new cc.Sprite(res.dagger_top_right_emoji);
			}
			else if(worldNumber == 17)
			{
				rewardImg = new cc.Sprite(res.cloud_emoji);
			}
			else if(worldNumber == 21)
			{
				rewardImg = new cc.Sprite(res.orb_emoji);
			}
			else if(worldNumber == 25)
			{
				rewardImg = new cc.Sprite(res.red_soapbar_emoji);
			}
			else if(worldNumber == 30)
			{
				rewardImg = new cc.Sprite(res.spiderweb_emoji);
			}
			else if(worldNumber == 36)
			{
				rewardImg = new cc.Sprite(res.package_emoji);
			}
			else if(worldNumber == 42)
			{
				rewardImg = new cc.Sprite(res.red_balloon_emoji);
			}
			else if(worldNumber == 50)
			{
				rewardImg = new cc.Sprite(res.pallette_emoji);
			}
			else if(worldNumber == 58)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 66)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 74)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 81)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 90)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 100)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			
			if(rewardImg != null)
			{
				rewardImg.setScale(nodeWidth/2 / rewardImg.width);
				rewardImg.attr({
					x:nodeX,
					y:nodeY+(node.height/2*node.scale),
					anchorX:.5,
					anchorY:0
				});
				
				/*rewardImg.setTextureRect(
					cc.rect(rewardImg.width*rewardImg.scale/2, 
						rewardImg.height*rewardImg.scale/2, 
						rewardImg.width*rewardImg.scale/2, 
						rewardImg.height*rewardImg.scale/2, 
						), 
					false,
					cc.size(rewardImg.width*rewardImg.scale, rewardImg.height*rewardImg.scale)
				);*/
				
				
				
				
				
				
				this.addChild(rewardImg);
				this.rewardImages.push(rewardImg);
			}
			
			if(moveRight)
				nodeX += nodeWidth*2/3;
			else nodeX -= nodeWidth*2/3;
			
			nodeY += node.height*node.scale*1.85;
			
			nodeCount++;
			worldNumber++;
			if(nodeCount%6 == 0)
				moveRight = !moveRight;
		} while(worldNumber <= 50);//(nodeY < this.y+this.height);
		//} while(nodeY < this.titleLabel.y-this.titleLabel.height);
		
	},
	
	onTouchStarted:function(pos)
	{
		this.lastDragY = pos.y;
	},
	
	onTouchMoved:function(pos)
	{
		if(pos.y != this.lastDragY)
		{
			this.scroll(pos.y - this.lastDragY);
		}
		this.lastDragY = pos.y;
	},
	
	onTouchEnded:function(pos)
	{
		this.lastDragY = null;
		if(FUNCTIONS.posWithin(pos, this.closeButton))
		{
			return "close";
		}
	},
	
	scroll:function(dist)
	{
		for(var i=0; i<this.nodes.length; i++)
		{
			this.nodes[i].y += dist;
			
			var obj = this.nodes[i];
			objBot = obj.y;
			objTop = obj.y+(obj.height*obj.scale);
			if(objBot < 5)
			{
				var fractionUnder = (5-objBot)/(obj.height*obj.scale);
				if(i==0)
				{
					//cc.log(obj.height - obj.height*fractionUnder/obj.scale);
				}
				obj.setTextureRect(
					cc.rect(0,0,obj.width,Math.max(0, obj.height - obj.height*fractionUnder/obj.scale)),
					false,
					cc.size(obj.width, obj.height)
				);
			}
			else if(objTop > this.height-5)
			{
				var fractionOver = (objTop-this.height-5)/(obj.height*obj.scale);
				obj.setTextureRect(
					cc.rect(0,Math.max(0,obj.height*fractionOver/obj.scale) ,obj.width, Math.max(0, obj.height-obj.height*fractionOver/obj.scale)),
					false,
					cc.size(obj.width, obj.height)
				);
			}
			else
			{
				obj.setTextureRect(
					cc.rect(0,0,obj.width,obj.height),
					false,
					cc.size(obj.width, obj.height)
				);
			}
		}
		for(var i=0; i<this.rewardImages.length; i++)
		{
			this.rewardImages[i].y += dist;
			
			var obj = this.rewardImages[i];
			objBot = obj.y;
			objTop = obj.y+(obj.height*obj.scale);
			if(objBot < 5)
			{
				var fractionUnder = (5-objBot)/(obj.height*obj.scale);
				obj.setTextureRect(
					cc.rect(0,0,obj.width, Math.max(0, obj.height - obj.height*fractionUnder/obj.scale)),
					false,
					cc.size(obj.width, obj.height)
				);
			}
			else if(objTop > this.height-5)
			{
				var fractionOver = (objTop-this.height-5)/(obj.height*obj.scale);
				obj.setTextureRect(
					cc.rect(0,Math.max(0,obj.height*fractionOver/obj.scale) ,obj.width, Math.max(0, obj.height-obj.height*fractionOver/obj.scale)),
					false,
					cc.size(obj.width, obj.height)
				);
			}
			else
			{
				obj.setTextureRect(
					cc.rect(0,0,obj.width,obj.height),
					false,
					cc.size(obj.width, obj.height)
				);
			}
		}
		for(var i=0; i<this.worldNumberLabels.length; i++)
		{
			this.worldNumberLabels[i].y += dist;
			
			var obj = this.worldNumberLabels[i];
			objBot = obj.y;
			objTop = obj.y+(obj.height*obj.scale);
			if(objBot < 5)
			{
				/*obj.setTextureRect(
					cc.rect(0,0,obj.width,obj.height-(objBot-5)),
					false,
					cc.size(obj.width, obj.height)
				);*/
			}
		}
	}
	
});
