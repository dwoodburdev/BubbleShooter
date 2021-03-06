var WorldMapLayer = cc.Layer.extend({
	ctor:function(width, height, type){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
		var size = cc.winSize;
		
		this.width = width;
		this.height = height;
		this.type = type;
		
		this.dn = new cc.DrawNode();
		//this.dn.drawRect(cc.p(this.x,this.y),cc.p(this.x+this.width, this.y+this.height), cc.color(255,255,255,255),5,cc.color(0,0,0,255));
		this.addChild(this.dn);
		
		this.bgImage = new cc.Sprite(res.phone_up);
		this.bgImage.setScaleX(this.width / this.bgImage.width);
		this.bgImage.setScaleY(this.height / this.bgImage.height);
		this.bgImage.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bgImage);
		
        this.closeButton = new cc.Sprite(res.red_x_button);
        this.closeButton.setScale(this.width/10 / this.closeButton.width);
        this.closeButton.attr({
        	"x":0,
        	"y":this.height-(this.closeButton.height*this.closeButton.scale),
        	"anchorX":0,
        	"anchorY":0
        });
		//this.addChild(this.closeButton);
		
		this.titleLabel = new cc.LabelTTF("World Complete!", "Roboto", 35);
		this.titleLabel.attr({
			"x":this.x+this.width/2,
			"y":this.height-40,
			"anchorX":.5,
			"anchorY":1
		});
		this.titleLabel.color = cc.color(0,0,0,255);
		

		
		
		this.lastDragY = null;
		
		this.avatarImg = null;
		this.giftImg = null;
		this.rewardImages = [];
		
		this.nodes = [];
		this.worldNumberLabels = [];	
		
		this.botNodeIndex = 0;
		this.topNodeIndex = 0;
		
		var mapWidth = this.width*.816 - 30;
		
		var nodeWidth = mapWidth/5;
		
		var nodeX = this.width*.092;
		var nodeY = this.height*.14//DATA.bubbleR*3;
		var moveRight = true;
		var nodeCount = 3;
		var worldNumber = 1;
		do
		{
			
			var node = null;
			if(worldNumber <= DATA.worldIndex)
				node = new cc.Sprite(res.world_node);
			else if(this.isRedNode(worldNumber))
				node = new cc.Sprite(res.world_node_red);
			else node = new cc.Sprite(res.world_node_gray);
			
			
		
			
			node.setScale(nodeWidth / node.width);
			node.attr({
				x:nodeX,
				y:nodeY,
				anchorX:0,
				anchorY:0
			});
			this.nodeYDiff = node.height*node.scale*1.85;
			this.nodes.push(node);
			
			if(node.y > this.height*.86)
			{
				this.topNodeIndex++;
			}
			else this.addChild(node);
			
			
			var numLabel = new cc.LabelTTF(""+worldNumber, "Roboto", 20);
			numLabel.attr({
				x:node.x+(node.width*node.scale)+5,
				y:nodeY,
				anchorX:0,
				anchorY:0
			});
			numLabel.color = cc.color(0,0,0,255);
			if(node.y <= this.height*.86)
				this.addChild(numLabel);
			
			this.worldNumberLabels.push(numLabel);
			
			
			
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
				rewardImg = new cc.Sprite(res.bubble_wrap_emoji);
			}
			else if(worldNumber == 3)
			{
				rewardImg = new cc.Sprite(res.dynamite_1_emoji);
			}
			else if(worldNumber == 4)
			{
				rewardImg = new cc.Sprite(res.yellow_bulb_emoji);
			}
			else if(worldNumber == 5)
			{
				rewardImg = new cc.Sprite(res.bomb_emoji);
			}
			else if(worldNumber == 6)
			{
				rewardImg = new cc.Sprite(res.lightblue_die_emoji);
			}
			else if(worldNumber == 7)
			{
				rewardImg = new cc.Sprite(res.beachball_emoji);
			}
			else if(worldNumber == 8)
			{
				rewardImg = new cc.Sprite(res.dagger_top_right_emoji);
			}
			else if(worldNumber == 10)
			{
				rewardImg = new cc.Sprite(res.green_snail_emoji);
			}
			else if(worldNumber == 12)
			{
				rewardImg = new cc.Sprite(res.yellow_soapbar_emoji);
			}
			else if(worldNumber == 14)
			{
				rewardImg = new cc.Sprite(res.egg_emoji);
			}
			else if(worldNumber == 16)
			{
				rewardImg = new cc.Sprite(res.cloud_emoji);
			}
			else if(worldNumber == 18)
			{
				rewardImg = new cc.Sprite(res.neutral_orb_emoji);
			}
			else if(worldNumber == 20)
			{
				rewardImg = new cc.Sprite(res.green_lantern_emoji);
			}
			else if(worldNumber == 22)
			{
				//rewardImg = new cc.Sprite(res.purple_note_emoji);
				//rewardImg = new cc.Sprite(res.red_tv_emoji);
				rewardImg = new cc.Sprite(res.love_emoji);
			}
			else if(worldNumber == 25)
			{
				rewardImg = new cc.Sprite(res.green_ghost_emoji);
			}
			else if(worldNumber == 28)
			{
				//rewardImg = new cc.Sprite(res.pink_flowerpot_emoji);
				rewardImg = new cc.Sprite(res.pink_balloon_emoji);
			}
			else if(worldNumber == 31)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 34)
			{
				rewardImg = new cc.Sprite(res.smile_emoji);
			}
			else if(worldNumber == 37)
			{
				
				rewardImg = new cc.Sprite(res.spiderweb_emoji);
			}
			else if(worldNumber == 40)
			{
				//rewardImg = new cc.Sprite(res.magnet_topright_emoji);
				rewardImg = new cc.Sprite(res.purple_note_emoji);
			}
			else if(worldNumber == 43)
			{
				//rewardImg = new cc.Sprite(res.crayon_red_bottomleft_emoji);
				rewardImg = new cc.Sprite(res.flashlight_topleft_emoji);
			}
			else if(worldNumber == 46)
			{
				//rewardImg = new cc.Sprite(res.red_glove_emoji);
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 50)
			{
				rewardImg = new cc.Sprite(res.pallette_emoji);
			}
			else if(worldNumber == 54)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 58)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 62)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 66)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 70)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 75)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 80)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 85)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 90)
			{
				rewardImg = new cc.Sprite(res.red_tv_emoji);
			}
			else if(worldNumber == 95)
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
					x:numLabel.x+numLabel.width+3,//nodeX,
					y:nodeY/*+(node.height/2*node.scale)*/,
					anchorX:0,
					anchorY:0
				});
				this.rewardImages.push(rewardImg);
				
				if(node.y <= this.height*.86)
					this.addChild(rewardImg);
			}
			
			//if(moveRight)
			//	nodeX += nodeWidth*2/3;
			//else nodeX -= nodeWidth*2/3;
			
			nodeY += this.nodeYDiff;
			
			nodeCount++;
			worldNumber++;
			if(nodeCount%6 == 0)
				moveRight = !moveRight;
		} while(worldNumber <= 50);
		
		
		
		this.fgImage = new cc.Sprite(res.phone_up_overlay);
		this.fgImage.setScaleX(this.width / this.fgImage.width);
		this.fgImage.setScaleY(this.height / this.fgImage.height);
		this.fgImage.attr({
			x:0,
			y:0,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.fgImage);
		
		this.addChild(this.closeButton);
		
		this.nextButton = null;
		if(this.type == "complete")
		{cc.log("should show next button");
			this.nextButton = new cc.Sprite(res.next_button);
			this.nextButton.setScale(this.height*.14 / this.nextButton.height);
			this.nextButton.attr({
				x:this.width/2,
				y:0,
				anchorX:.5,
				anchorY:0
			});
			this.addChild(this.nextButton);
		}
		
	},
	
	isRedNode:function(num)
	{
		if((num >= 2 && num <=8) || num == 10)
			return true;
		return false;
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
		else if(this.type == "complete" && FUNCTIONS.posWithinScaled(pos, this.nextButton))
		{
			return "next";
		}
	},
	
	advanceAvatar:function()
	{
		var moveAction = cc.moveBy(1, (this.width - 30)/5, this.nodeYDiff);
		//var seq = new cc.Sequence(moveAction, cc.callFunc(this.parent.closeWorldMapAfterCompletion, this.parent));
		//this.avatarImg.runAction(seq);
		this.avatarImg.runAction(moveAction);
	},
	
	scroll:function(dist)
	{
		for(var i=0; i<this.nodes.length; i++)
		{
			this.nodes[i].y += dist;
			
			var obj = this.nodes[i];
			objBot = obj.y;
			objTop = obj.y+(obj.height*obj.scale);
			
			
			
			
			
		}
	}
	/*
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
				
			}
		}
	}
	*/
});
