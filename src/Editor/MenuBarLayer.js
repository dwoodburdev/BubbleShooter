var MenuBarLayer = cc.Layer.extend({
	ctor:function(width, height, type){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		this.type = type;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(215,215,215,255), 2, cc.color(0,0,0,255));
		
		this.playButton = null;
		this.saveButton = null;
		this.publishButton = null;
		this.editButton = null;
		
	},
	
	changeType:function(type)
	{
		this.type = type;
	},
	
	addPlayButton:function()
	{
		this.playButton = new cc.Sprite(res.play_bg);
		this.playButton.setScale(this.height*.6 / this.playButton.height);
		this.playButton.attr({
			x:this.width/2,
			y:5+this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.playButton);
		
		this.playLabel = new cc.LabelTTF("Play","HeaderFont",Math.floor(this.height*.5));
		this.playLabel.color = cc.color(255,255,255,255);
		this.playLabel.attr({
			x:this.playButton.x,
			y:this.playButton.y+(this.playButton.height*this.playButton.scale/2)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.playLabel);
		
	},
	
	addSaveButton:function()
	{
		this.saveButton = new cc.Sprite(res.stop_bg);
		this.saveButton.setScaleX(this.playButton.width*this.playButton.scale / this.saveButton.width);
		this.saveButton.setScaleY(this.playButton.height*this.playButton.scale / this.saveButton.height);
		this.saveButton.attr({
			x:this.width*.8,
			y:5+this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.saveButton);
		
		this.saveLabel = new cc.LabelTTF("Save","HeaderFont",Math.floor(this.height*.5));
		this.saveLabel.color = cc.color(255,255,255,255);
		this.saveLabel.attr({
			x:this.saveButton.x,
			y:this.saveButton.y+(this.saveButton.height*this.saveButton.scale/2)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.saveLabel);
	},
	/*
	addPublishButton:function()
	{
		this.publishButton = new cc.Sprite(res.button_publish);
		this.publishButton.setScaleX(this.playButton.width*this.playButton.scale / this.publishButton.width);
		this.publishButton.setScaleY(this.playButton.height*this.playButton.scale / this.publishButton.height);
		this.publishButton.attr({
			x:this.width*.2,
			y:5+this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.publishButton);
	},
	*/
	addEditButton:function()
	{
		this.editButton = new cc.Sprite(res.orange_bg);
		this.editButton.setScaleX(this.playButton.width*this.playButton.scale / this.editButton.width);
		this.editButton.setScaleY(this.playButton.height*this.playButton.scale / this.editButton.height);
		this.editButton.attr({
			x:this.width*.8,
			y:5+this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.editButton);
		
		this.editLabel = new cc.LabelTTF("Edit","HeaderFont",Math.floor(this.height*.5));
		this.editLabel.color = cc.color(255,255,255,255);
		this.editLabel.attr({
			x:this.editButton.x,
			y:this.editButton.y+(this.editButton.height*this.editButton.scale/2)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.editLabel);
	},
	
	addShareButton:function()
	{
		this.shareButton = new cc.Sprite(res.blue_bg);
		this.shareButton.setScaleX(this.playButton.width*this.playButton.scale / this.shareButton.width);
		this.shareButton.setScaleY(this.playButton.height*this.playButton.scale / this.shareButton.height);
		this.shareButton.attr({
			x:this.width*.2,
			y:5+this.height/2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.shareButton);
		
		this.shareLabel = new cc.LabelTTF("Share","HeaderFont",Math.floor(this.height*.5));
		this.shareLabel.color = cc.color(255,255,255,255);
		this.shareLabel.attr({
			x:this.shareButton.x,
			y:this.shareButton.y+(this.shareButton.height*this.shareButton.scale/2)-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.shareLabel);
	},
	
	removePlayButton:function()
	{
		if(this.playButton != null)
		{
			this.removeChild(this.playButton);
			this.playButton = null;
			this.removeChild(this.playLabel);
			this.playLabel = null;
		}
	},
	
	removeSaveButton:function()
	{
		if(this.saveButton != null)
		{
			this.removeChild(this.saveButton);
			this.saveButton = null;
			this.removeChild(this.saveLabel);
			this.saveLabel = null;
		}
	},
	/*
	removePublishButton:function()
	{
		if(this.publishButton != null)
		{
			this.removeChild(this.publishButton);
			this.publishButton = null;
		}
	},
	*/
	removeEditButton:function()
	{
		if(this.editButton != null)
		{
			this.removeChild(this.editButton);
			this.editButton = null;
			this.removeChild(this.editLabel);
			this.editLabel = null;
		}
	},
	
	readyCreatedPlay:function()
	{cc.log("adding menu buttons");
		if(this.playButton == null)
			this.addPlayButton();
		if(this.saveButton != null)
			this.removeSaveButton();
		//this.addEditButton();
			
		
	},
	
	onTouchEnded:function(pos)
	{cc.log("menubar touchend");
		if(pos.x > this.playButton.x-(this.playButton.width*this.playButton.scale/2) && pos.x < this.playButton.x+(this.playButton.width*this.playButton.scale/2)
			&& pos.y > this.playButton.y-(this.playButton.height*this.playButton.scale/2) && pos.y < this.playButton.y+(this.playButton.height*this.playButton.scale/2))
		{cc.log(this.type);
			if(this.type == "edit")
				this.parent.parent.playLevel("created");
			else if(this.type == "new")
				this.parent.parent.playLevel("new");
			//else if(this.type == "feature")
			//	this.parent.parent.playLevel("feature");
			
		}
		else if(this.saveButton != null && pos.x > this.saveButton.x-(this.saveButton.width*this.saveButton.scaleX/2) && pos.x < this.saveButton.x+(this.saveButton.width*this.saveButton.scaleX/2)
			&& pos.y > this.saveButton.y-(this.saveButton.height*this.saveButton.scaleY/2) && pos.y < this.saveButton.y+(this.saveButton.height*this.saveButton.scaleY/2))
		{cc.log("save button");
			this.parent.parent.saveLevel();
		}
		else if(this.editButton != null && pos.x > this.editButton.x-(this.editButton.width*this.editButton.scaleX/2) && pos.x < this.editButton.x+(this.editButton.width*this.editButton.scaleX/2)
			&& pos.y > this.editButton.y-(this.editButton.height*this.editButton.scaleY/2) && pos.y < this.editButton.y+(this.editButton.height*this.editButton.scaleY/2))
		{cc.log("edit button");
			this.parent.parent.editLevel();
		}
		else if(this.shareButton != null && pos.x > this.shareButton.x-(this.shareButton.width*this.shareButton.scaleX/2) && pos.x < this.shareButton.x+(this.shareButton.width*this.shareButton.scaleX/2)
			&& pos.y > this.shareButton.y-(this.shareButton.height*this.shareButton.scaleY/2) && pos.y < this.shareButton.y+(this.shareButton.height*this.shareButton.scaleY/2))
		{cc.log(this.parent.parent.userId);cc.log(this.parent.parent.getSelectedLevelCode());
			this.parent.parent.shareLevel("http://emojipopgame.com/?userId="+this.parent.parent.userId+"&levelId="+this.parent.parent.getSelectedLevelCode());
		}
	}
	
	
	
});