var FriendListLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
		
		var scrollWidth = Math.floor(this.width*.1)
		
		
		var listWidth = this.width-scrollWidth;
		this.friendBoxes = [];
		//this.friendBoxes.push({"name":"Tonya C.", "count":54, "playFlag":true, "rank":1});
		//this.friendBoxes.push({"name":"Michael R.", "count":47, "playFlag":false, "rank":2});
		//this.friendBoxes.push({"name":"Gerald R.", "count":33, "playFlag":true, "rank":3});
		
		
		this.boxHeight = this.height/4.5;
		for(var i=0; i<this.friendBoxes.length; i++)
		{
			//this.dn.drawRect( cc.p(0,this.height-(i+1)*(this.boxHeight) ), cc.p(listWidth, this.height-(i)*(this.boxHeight) ), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
			var friendBox = new FriendBox(listWidth, this.boxHeight, this.friendBoxes[i].name, this.friendBoxes[i].count, this.friendBoxes[i].playFlag, this.friendBoxes[i].rank);
			friendBox.attr({
				x:0,
				y:this.height-(i+1)*(this.boxHeight) ,
				anchorX:0,
				anchorY:0
			});
			this.addChild(friendBox);
		}
		
		this.dn.drawRect(cc.p(this.width-scrollWidth,0), cc.p(this.width, this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
		
		this.upArrow = new cc.Sprite(res.up_arrow);
		this.upArrow.setScale(scrollWidth / this.upArrow.width);
		this.upArrow.attr({
			x:this.width,
			y:this.height,
			anchorX:1,
			anchorY:1
		});
		this.addChild(this.upArrow);
		
		this.downArrow = new cc.Sprite(res.down_arrow);
		this.downArrow.setScale(scrollWidth / this.downArrow.width);
		this.downArrow.attr({
			x:this.width,
			y:0,
			anchorX:1,
			anchorY:0
		});
		this.addChild(this.downArrow);
		
		
	}
	
	
	
});