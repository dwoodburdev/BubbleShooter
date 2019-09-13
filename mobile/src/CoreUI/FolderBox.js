var FolderBox = cc.Layer.extend({
	ctor:function(width, height, bubbleTypes, bubbleColors, title){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
	
	
		this.bubbleTypes = bubbleTypes;
		this.bubbleColors = bubbleColors;
		cc.log(bubbleTypes);cc.log(bubbleColors);
		
		this.title = title;
		
		var sortedTypes = [];
		for(var bubType in bubbleTypes)
		{
			sortedTypes.push([bubType, bubbleTypes[bubType]]);
		}
		sortedTypes.sort(function(a,b){
			return b[1] - a[1];
		});
		cc.log(sortedTypes);
		
		var sortedColors = [];
		for(var bubColor in bubbleColors)
		{
			sortedColors.push([bubColor, bubbleColors[bubColor]]);
		}
		sortedColors.sort(function(a,b){
			return b[1] - a[1];
		});cc.log(sortedColors);
		
		this.nameLabel = new cc.LabelTTF(this.title, "Arial", Math.floor(this.height*.3));
		this.nameLabel.color = cc.color(0,0,0,255);
		this.nameLabel.attr({
			x:5,
			y:this.height-3,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.nameLabel);
		
		var obstTopY = 3+(this.height*.3);
		for(var i=0; i<sortedTypes.length; i++)
		{
			if(sortedTypes[i][0] == "1")
			{
				var obstEmoji = new cc.Sprite(res.bomb_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			else if(sortedTypes[i][0] == "2")
			{
				var obstEmoji = new cc.Sprite(res.anvil_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			else if(sortedTypes[i][0] == "4")
			{
				var obstEmoji = new cc.Sprite(res.bubble_wrap_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			else if(sortedTypes[i][0] == "5")
			{
				var obstEmoji = new cc.Sprite(res.soap_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			else if(sortedTypes[i][0] == "7")
			{
				var obstEmoji = new cc.Sprite(res.red_bulb_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			else if(sortedTypes[i][0] == "8")
			{
				var obstEmoji = new cc.Sprite(res.red_die_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			else if(sortedTypes[i][0] == "20")
			{}
			else if(sortedTypes[i][0] == "11")
			{
				var obstEmoji = new cc.Sprite(res.beachball_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			else if(sortedTypes[i][0] == "13")
			{
				var obstEmoji = new cc.Sprite(res.horiz_rocket_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			else if(sortedTypes[i][0] == "17")
			{
				var obstEmoji = new cc.Sprite(res.red_soapbar_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			else if(sortedTypes[i][0] == "21")
			{
				var obstEmoji = new cc.Sprite(res.left_dagger_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			else if(sortedTypes[i][0] == "24")
			{
				var obstEmoji = new cc.Sprite(res.red_snail_emoji);
				obstEmoji.setScale(this.height*.3 / obstEmoji.height);
				obstEmoji.attr({
					x:5+i*(obstEmoji.width*obstEmoji.scale + 3),
					y:3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(obstEmoji);
			}
			
		}
		
		//this.previewColors = [];
		for(var i=0; i<sortedColors.length; i++)
		{
			
			if(sortedColors[i][0] == "yellow")
			{
				var smileEmoji = new cc.Sprite(res.smile_emoji);
				smileEmoji.setScale(this.height*.3 / smileEmoji.height);
				smileEmoji.attr({
					x:5+(i*(this.height*.3 + 2)),
					y:obstTopY+3,
					anchorX:0,
					anchorY:0
				});
				//this.previewColors.push(smileEmoji);
				this.addChild(smileEmoji);
			}
			else if(sortedColors[i][0] == "blue")
			{
				var sadEmoji = new cc.Sprite(res.sad_emoji);
				sadEmoji.setScale(this.height*.3 / sadEmoji.height);
				sadEmoji.attr({
					x:5+(i*(this.height*.3 + 2)),
					y:obstTopY+3,
					anchorX:0,
					anchorY:0
				});
				//this.previewColors.push(sadEmoji);
				this.addChild(sadEmoji);
			}
			else if(sortedColors[i][0] == "red")
			{
				var angryEmoji = new cc.Sprite(res.angry_emoji);
				angryEmoji.setScale(this.height*.3 / angryEmoji.height);
				angryEmoji.attr({
					x:5+(i*(this.height*.3 + 2)),
					y:obstTopY+3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(angryEmoji);
			}
			else if(sortedColors[i][0] == "green")
			{
				var alienEmoji = new cc.Sprite(res.sick_emoji);
				alienEmoji.setScale(this.height*.3 / alienEmoji.height);
				alienEmoji.attr({
					x:5+(i*(this.height*.3 + 2)),
					y:obstTopY+3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(alienEmoji);
			}
			else if(sortedColors[i][0] == "pink")
			{
				var loveEmoji = new cc.Sprite(res.love_emoji);
				loveEmoji.setScale(this.height*.3 / loveEmoji.height);
				loveEmoji.attr({
					x:5+(i*(this.height*.3 + 2)),
					y:obstTopY+3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(loveEmoji);
			}
			else if(sortedColors[i][0] == "purple")
			{
				var evilEmoji = new cc.Sprite(res.evil_emoji);
				evilEmoji.setScale(this.height*.3 / evilEmoji.height);
				alienEmoji.attr({
					x:5+(i*(this.height*.3 + 2)),
					y:obstTopY+3,
					anchorX:0,
					anchorY:0
				});
				this.addChild(evilEmoji);
			}
			
		}
		
		
		
		var thumbEmoji = new cc.Sprite(res.thumb);
		thumbEmoji.setScale(this.height*.3 / thumbEmoji.height);
		thumbEmoji.attr({
			x:this.width-2,
			y:this.height-2,
			anchorX:1,
			anchorY:1
		});
		this.addChild(thumbEmoji);
		
		var likesCount = new cc.LabelTTF("9","Arial",Math.floor(this.height*.3));
		likesCount.color = cc.color(0,0,0,255);
		likesCount.attr({
			x:thumbEmoji.x-(thumbEmoji.width*thumbEmoji.scale),
			y:thumbEmoji.y-(thumbEmoji.height*thumbEmoji.scale/2)-5,
			anchorX:1,
			anchorY:.5
		});
		this.addChild(likesCount);
		
		this.shareButton = new cc.Sprite(res.share_button);
		this.shareButton.setScale(this.height*.35 / this.shareButton.height);
		this.shareButton.attr({
			x:this.width-5,
			y:5,
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.shareButton);
		
		
		
		
		
	}
	
	
	
});