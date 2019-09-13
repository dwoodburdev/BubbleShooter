var EditorPanel = cc.Layer.extend({
	ctor:function(width, height, editorData, numMoves){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		 
		 this.mode = "edit";
		 
		 var contentHeight = this.height-25;
		 //var contentHeightWeights = [.1, .25, .4, .25];
		 var contentHeightWeights = [.125, 0, .575, .25];
		 this.contentHeight = contentHeight;
		 //this.contentHeightWeights = [.1,.25,.4,.25];
		 this.contentHeightWeights = [.125, 0, .575, .25];
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 0, cc.color(0,0,0,255));
		
		this.titleLabel = new cc.LabelTTF("Emoji Pop", "Arial", 40);
		this.titleLabel.attr({
			x:width/2 - this.titleLabel.width/2,
			y:this.height - 15,
			anchorX:0,
			anchorY:1
		});
		this.titleLabel.color = cc.color(0,0,0,255);
		//this.addChild(this.titleLabel);
		
		
		this.linkLabelA = new cc.LabelTTF("© 2019, Dylan Woodbury", "HeaderFont", Math.floor(this.height*.025));
		this.linkLabelA.color = cc.color(0,0,0,255);
		this.linkLabelA.attr({
			x:this.width*.5,
			y:this.height*.05 - 2,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.linkLabelA);
		
		
		this.titleImg = new cc.Sprite(res.title_header);
		//this.titleImg.setScale(this.height*.1 / this.titleImg.height);
		this.titleImg.setScale(contentHeight*contentHeightWeights[0] / this.titleImg.height);
		this.titleImg.attr({
			x:this.width/2,
			y:this.height-5,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleImg);
		
		
		
		this.instructionsLayer = new MainInstructionsLayer(this.width*.9, contentHeight*contentHeightWeights[1]);
		this.instructionsLayer.attr({
			x:this.width/2 - (this.instructionsLayer.width)/2,
			//y:this.titleLabel.y-this.titleLabel.height-(this.instructionsLayer.height) -5,
			y:this.titleImg.y-(this.titleImg.height*this.titleImg.scale)-(this.instructionsLayer.height)-5,
			anchorX:0,
			anchorY:0
		});
		//this.addChild(this.instructionsLayer);
		
		//var bubPanelHeight = this.instructionsLayer.y-5 - (this.personalMediaLayer.y+this.personalMediaLayer.height+5);
		//this.bubblePanelLayer = new EditorBubblePanel(this.width*.9, bubPanelHeight);
		this.bubblePanelLayer = new EditorBubblePanel(this.width*.9, contentHeight*contentHeightWeights[2], editorData.numStars, numMoves);
		this.bubblePanelLayer.attr({
			x:this.width/2 - (this.width*.9)/2,
			//y:this.personalMediaLayer.y+this.personalMediaLayer.height+5,
			y: this.instructionsLayer.y-this.bubblePanelLayer.height-5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubblePanelLayer);
		
		this.overDn = new cc.DrawNode();
		this.addChild(this.overDn);
		this.overDn.drawRect(
			cc.p(this.bubblePanelLayer.x, this.bubblePanelLayer.y),
			cc.p(this.bubblePanelLayer.x+this.bubblePanelLayer.width, this.bubblePanelLayer.y+this.bubblePanelLayer.height*.9-20),
			cc.color(0,0,0,150),
			0,
			cc.color(0,0,0,0)	
		);
		
		this.createImg = new cc.Sprite(res.play_bg);
		this.createImg.setScale(this.height*.17 / this.createImg.height);
		this.createImg.attr({
			x:this.width*.5,
			y:this.height*.5,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.createImg);
		
		this.createLabel = new cc.LabelTTF("Create?", "HeaderFont", Math.floor(this.height*.1));
		this.createLabel.color = cc.color(255,255,255,255);
		this.createLabel.attr({
			x:this.createImg.x,
			y:this.createImg.y+(this.createImg.height*this.createImg.scale)/2 - Math.floor(this.height*.03),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.createLabel);
		
		this.nerdEmoji = new cc.Sprite(res.nerd_emoji);
		this.nerdEmoji.setScale( ((this.bubblePanelLayer.y+this.bubblePanelLayer.height*.9-20) - (this.createImg.y+this.createImg.height*this.createImg.scale/2)) * .9 / this.nerdEmoji.height);
		this.nerdEmoji.attr({
			x:this.width/2,
			y:this.bubblePanelLayer.y+this.bubblePanelLayer.height*.9-20 - 3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.nerdEmoji);
		
		this.personalMediaLayer = new PersonalSocialMediaLayer(this.width*.9, contentHeight*contentHeightWeights[3]);
		this.personalMediaLayer.attr({
			x:this.width/2 - (this.width*.9)/2,
			y:this.bubblePanelLayer.y-this.personalMediaLayer.height - 5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.personalMediaLayer);
	},
	
	updateContextualHelp:function(code)
	{
		if(code == "smile" || code == "sad" || code == "angry" || code == "alien"
			|| code == "soap" || code == "bomb" || code == "wrap" || code == "die"
			|| code == "cloud" || code == "clone")
		{
			this.instructionsLayer.instructionContent.updateWithCode(code);
		}
		else
		{
			//this.instructionLayer.instructionContent.updateWithCode("nada");
		}
	},
	
	replaceEditorWithPlay:function(type, num)
	{
		this.mode = "play";
		
		if(this.bubblePanelLayer != null)
			this.removeChild(this.bubblePanelLayer);
		else if(this.playSideLayer != null)
			this.removeChild(this.playSideLayer);
		
		if(type == "feature")
		{
			//this.removeChild(this.bubblePanelLayer);
			this.playSideLayer = new PlaySideLayer(this.width*.9, this.contentHeight*this.contentHeightWeights[2], this.parent.feature.numMoves, this.parent.feature.colors, type);
			this.playSideLayer.attr({
				x:this.width/2 - (this.width*.9)/2,
				y:this.instructionsLayer.y-this.playSideLayer.height-5,
				anchorX:0,
				anchorY:0
			});
			this.addChild(this.playSideLayer);
			//this.bubblePanelLayer = null;
		}
		else if(type == "test")
		{cc.log("ADDING TEST PLAYSIDE");
			if(num == -1)
			{cc.log("NEW LEVEL");
				var numMoves = this.parent.curCreatedMoves;//this.bubblePanelLayer.numMoves;cc.log(numMoves);cc.log(this.parent.editorLayer.bubbleLayer.emojiGoals);
				cc.log(numMoves);
				//this.removeChild(this.bubblePanelLayer);
				this.playSideLayer = new PlaySideLayer(this.width*.9, this.contentHeight*this.contentHeightWeights[2], numMoves, this.parent.editorLayer.bubbleLayer.emojiGoals, "test");
				this.playSideLayer.attr({
					x:this.width/2 - (this.width*.9)/2,
					y:this.instructionsLayer.y-this.playSideLayer.height-5,
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.playSideLayer);
				//this.bubblePanelLayer = null;
			}// foreign level
			else if(num == -2)
			{
				var numMoves = this.parent.curCreatedMoves;//this.bubblePanelLayer.numMoves;cc.log(numMoves);cc.log(this.parent.editorLayer.bubbleLayer.emojiGoals);
				cc.log(numMoves);
				//this.removeChild(this.bubblePanelLayer);
				this.playSideLayer = new PlaySideLayer(this.width*.9, this.contentHeight*this.contentHeightWeights[2], numMoves, this.parent.foreignLevel.colors, "test");
				this.playSideLayer.attr({
					x:this.width/2 - (this.width*.9)/2,
					y:this.instructionsLayer.y-this.playSideLayer.height-5,
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.playSideLayer);
				
				
			}
			else
			{cc.log("CREATED LEVEL");
				var createdLevel = this.parent.userLevels[num];cc.log(createdLevel);
				var numMoves = createdLevel.numMoves;
				//this.removeChild(this.bubblePanelLayer);
				this.playSideLayer = new PlaySideLayer(this.width*.9, this.contentHeight*this.contentHeightWeights[2], numMoves, createdLevel.colors, "created");
				this.playSideLayer.attr({
					x:this.width/2 - (this.width*.9)/2,
					y:this.instructionsLayer.y-this.playSideLayer.height-5,
					anchorX:0,
					anchorY:0
				});
				this.addChild(this.playSideLayer);
				//this.bubblePanelLayer = null;
			}
		}
		
		if(this.bubblePanelLayer != null)
			this.bubblePanelLayer = null;
		
	},
	
	replacePlayWithEditor:function()
	{
		this.mode = "edit";
		
		
		this.removeChild(this.playSideLayer);
		this.bubblePanelLayer = new EditorBubblePanel(this.width*.9, this.contentHeight*this.contentHeightWeights[2], this.parent.surfacedNumStars, this.parent.curCreatedMoves);
		this.bubblePanelLayer.attr({
			x:this.width/2 - (this.width*.9)/2,
			//y:this.personalMediaLayer.y+this.personalMediaLayer.height+5,
			y: this.instructionsLayer.y-this.bubblePanelLayer.height-5,
			anchorX:0,
			anchorY:0
		});
		this.addChild(this.bubblePanelLayer);
		this.playSideLayer = null;
	},
	
	onTouchBegan:function(pos)
	{
		if(this.bubblePanelLayer != null && pos.y > this.bubblePanelLayer.y && pos.y < this.bubblePanelLayer.y+this.bubblePanelLayer.height
			&& pos.x > this.bubblePanelLayer.x && pos.x < this.bubblePanelLayer.width)
		{
			this.bubblePanelLayer.onTouchBegan(this.bubblePanelLayer.convertToNodeSpace(pos));
		}
	},
	
	onTouchMoved:function(pos)
	{
		if(this.bubblePanelLayer != null && pos.y > this.bubblePanelLayer.y && pos.y < this.bubblePanelLayer.y+this.bubblePanelLayer.height
			&& pos.x > this.bubblePanelLayer.x && pos.x < this.bubblePanelLayer.width)
		{
			this.bubblePanelLayer.onTouchMoved(this.bubblePanelLayer.convertToNodeSpace(pos));
		}
	},
	
	onTouchEnded:function(pos)
	{cc.log(pos);
		if(this.bubblePanelLayer != null && pos.y > this.bubblePanelLayer.y && pos.y < this.bubblePanelLayer.y+this.bubblePanelLayer.height
			&& pos.x > this.bubblePanelLayer.x && pos.x < this.bubblePanelLayer.width)
		{
			if(this.mode == "edit")
				this.bubblePanelLayer.onTouchEnded(this.bubblePanelLayer.convertToNodeSpace(pos));
			//else if(this.mode == "play")
			//	this.playSideLayer.onTouchEnded(this.playSideLayer.convertToNodeSpace(pos));
		}
		else if(this.playSideLayer != null && pos.y > this.playSideLayer.y && pos.y < this.playSideLayer.y+this.playSideLayer.height
				&& pos.x > this.playSideLayer.x && pos.x < this.playSideLayer.x+this.playSideLayer.width)
		{cc.log("playSideLayer.touch");
			this.playSideLayer.onTouchEnded(this.playSideLayer.convertToNodeSpace(pos));	
		}
		else if(pos.y > this.personalMediaLayer.y && pos.y < this.personalMediaLayer.y+this.personalMediaLayer.height &&
			pos.x > this.personalMediaLayer.x && pos.x < this.personalMediaLayer.x+this.personalMediaLayer.width)
		{
			this.personalMediaLayer.onTouchEnded(this.personalMediaLayer.convertToNodeSpace(pos));
		}
		else if(pos.y > this.instructionsLayer.y && pos.y < this.instructionsLayer.y+this.instructionsLayer.height &&
			pos.x > this.instructionsLayer.x && pos.x < this.instructionsLayer.x+this.instructionsLayer.width)
		{
			this.instructionsLayer.onTouchEnded(this.instructionsLayer.convertToNodeSpace(pos));
		}
	}
	
	
	
});