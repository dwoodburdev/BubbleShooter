var ContextualHelp = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(215,215,215,255), 0, cc.color(0,0,0,255));
		
		
		this.tutTextA = new cc.LabelTTF("Click an emoji and start", "HeaderFont", 13);
		this.tutTextA.color = cc.color(0,0,0,255);
		this.tutTextA.attr({
			x:5,
			y:this.height-3,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.tutTextA);
		
		this.tutTextB = new cc.LabelTTF("drawing a level!", "HeaderFont", 13);
		this.tutTextB.color = cc.color(0,0,0,255);
		this.tutTextB.attr({
			x:5,
			y:this.tutTextA.y-this.tutTextA.height-2,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.tutTextB);
		
		this.textHeightRatio = .15;
	},
	
	
	updateWithCode:function(code)
	{
		if(this.tutTextA != null)
		{
			this.removeChild(this.tutTextA);
			this.tutTextA = null;
		}
		if(this.tutTextB != null)
		{
			this.removeChild(this.tutTextB);
			this.tutTextB = null;
		}
		if(this.videoImgA != null)
		{
			this.removeChild(this.videoImgA);
			this.videoImgA = null;
		}
		if(this.videoImgB != null)
		{
			this.removeChild(this.videoImgB);
			this.videoImgB = null;
		}
		if(this.obstVidImg != null)
		{
			this.removeChild(this.obstVidImg);
			this.obstVidImg = null;
		}
		
		
		if(code == "smile" || code == "sad" || code == "angry" || code == "alien")
		{
			this.tutTextA = new cc.LabelTTF("Editor Tutorial", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextA.color = cc.color(0,0,0,255);
			this.tutTextA.attr({
				x:this.width*.5,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextA);
			
			var diffDist = this.height-Math.floor(this.height*this.textHeightRatio);
			this.videoImgA = new cc.Sprite(res.blank_tv);
			this.videoImgA.setScale( diffDist*.9 / this.videoImgA.height );
			this.videoImgA.attr({
				x:this.width/2,
				y:this.tutTextA.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgA);
			
			this.obstVidImg = new cc.Sprite(res.smile_emoji);
			this.obstVidImg.setScale(this.videoImgA.height*this.videoImgA.scale*.8 / this.obstVidImg.height);
			this.obstVidImg.attr({
				x:this.videoImgA.x,
				y:this.videoImgA.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.obstVidImg);
			
		}
		else if(code == "soap")
		{
			this.tutTextA = new cc.LabelTTF("Soap Tutorial", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextA.color = cc.color(0,0,0,255);
			this.tutTextA.attr({
				x:this.width*.25,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextA);
			
			this.tutTextB = new cc.LabelTTF("Designing Tops", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextB.color = cc.color(0,0,0,255);
			this.tutTextB.attr({
				x:this.width*.75,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextB);
			
			var diffDist = this.height-Math.floor(this.height*this.textHeightRatio);
			this.videoImgA = new cc.Sprite(res.blank_tv);
			this.videoImgA.setScale( diffDist*.9 / this.videoImgA.height );
			this.videoImgA.attr({
				x:this.width*.25,
				y:this.tutTextA.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgA);
			
			this.videoImgB = new cc.Sprite(res.blank_tv);
			this.videoImgB.setScale( diffDist*.9 / this.videoImgB.height );
			this.videoImgB.attr({
				x:this.width*.75,
				y:this.tutTextB.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgB);
			
			this.obstVidImg = new cc.Sprite(res.soap_emoji);
			this.obstVidImg.setScale(this.videoImgA.height*this.videoImgA.scale*.8 / this.obstVidImg.height);
			this.obstVidImg.attr({
				x:this.videoImgA.x,
				y:this.videoImgA.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.obstVidImg);
		}
		else if(code == "bomb")
		{
			this.tutTextA = new cc.LabelTTF("Bomb Tutorial", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextA.color = cc.color(0,0,0,255);
			this.tutTextA.attr({
				x:this.width*.25,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextA);
			
			this.tutTextB = new cc.LabelTTF("Introducing Mechanics", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextB.color = cc.color(0,0,0,255);
			this.tutTextB.attr({
				x:this.width*.75,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextB);
			
			var diffDist = this.height-Math.floor(this.height*this.textHeightRatio);
			this.videoImgA = new cc.Sprite(res.blank_tv);
			this.videoImgA.setScale( diffDist*.9 / this.videoImgA.height );
			this.videoImgA.attr({
				x:this.width*.25,
				y:this.tutTextA.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgA);
			
			this.videoImgB = new cc.Sprite(res.blank_tv);
			this.videoImgB.setScale( diffDist*.9 / this.videoImgB.height );
			this.videoImgB.attr({
				x:this.width*.75,
				y:this.tutTextB.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgB);
			
			this.obstVidImg = new cc.Sprite(res.bomb_emoji);
			this.obstVidImg.setScale(this.videoImgA.height*this.videoImgA.scale*.8 / this.obstVidImg.height);
			this.obstVidImg.attr({
				x:this.videoImgA.x,
				y:this.videoImgA.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.obstVidImg);
		}
		else if(code == "wrap")
		{
			this.tutTextA = new cc.LabelTTF("Bub Wrap Tutorial", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextA.color = cc.color(0,0,0,255);
			this.tutTextA.attr({
				x:this.width*.25,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextA);
			
			this.tutTextB = new cc.LabelTTF("Providing Choice", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextB.color = cc.color(0,0,0,255);
			this.tutTextB.attr({
				x:this.width*.75,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextB);
			
			var diffDist = this.height-Math.floor(this.height*this.textHeightRatio);
			this.videoImgA = new cc.Sprite(res.blank_tv);
			this.videoImgA.setScale( diffDist*.9 / this.videoImgA.height );
			this.videoImgA.attr({
				x:this.width*.25,
				y:this.tutTextA.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgA);
			
			this.videoImgB = new cc.Sprite(res.blank_tv);
			this.videoImgB.setScale( diffDist*.9 / this.videoImgB.height );
			this.videoImgB.attr({
				x:this.width*.75,
				y:this.tutTextB.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgB);
			
			this.obstVidImg = new cc.Sprite(res.bubble_wrap_emoji);
			this.obstVidImg.setScale(this.videoImgA.height*this.videoImgA.scale*.8 / this.obstVidImg.height);
			this.obstVidImg.attr({
				x:this.videoImgA.x,
				y:this.videoImgA.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.obstVidImg);
		}
		else if(code == "die")
		{
			this.tutTextA = new cc.LabelTTF("Dice Tutorial", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextA.color = cc.color(0,0,0,255);
			this.tutTextA.attr({
				x:this.width*.25,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextA);
			
			this.tutTextB = new cc.LabelTTF("Chance in Level Design", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextB.color = cc.color(0,0,0,255);
			this.tutTextB.attr({
				x:this.width*.75,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextB);
			
			var diffDist = this.height-Math.floor(this.height*this.textHeightRatio);
			this.videoImgA = new cc.Sprite(res.blank_tv);
			this.videoImgA.setScale( diffDist*.9 / this.videoImgA.height );
			this.videoImgA.attr({
				x:this.width*.25,
				y:this.tutTextA.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgA);
			
			this.videoImgB = new cc.Sprite(res.blank_tv);
			this.videoImgB.setScale( diffDist*.9 / this.videoImgB.height );
			this.videoImgB.attr({
				x:this.width*.75,
				y:this.tutTextB.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgB);
			
			this.obstVidImg = new cc.Sprite(res.red_die_emoji);
			this.obstVidImg.setScale(this.videoImgA.height*this.videoImgA.scale*.8 / this.obstVidImg.height);
			this.obstVidImg.attr({
				x:this.videoImgA.x,
				y:this.videoImgA.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.obstVidImg);
		}
		else if(code == "cloud")
		{
			this.tutTextA = new cc.LabelTTF("Cloud Tutorial", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextA.color = cc.color(0,0,0,255);
			this.tutTextA.attr({
				x:this.width*.25,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextA);
			
			this.tutTextB = new cc.LabelTTF("Providing Goals", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextB.color = cc.color(0,0,0,255);
			this.tutTextB.attr({
				x:this.width*.75,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextB);
			
			var diffDist = this.height-Math.floor(this.height*this.textHeightRatio);
			this.videoImgA = new cc.Sprite(res.blank_tv);
			this.videoImgA.setScale( diffDist*.9 / this.videoImgA.height );
			this.videoImgA.attr({
				x:this.width*.25,
				y:this.tutTextA.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgA);
			
			this.videoImgB = new cc.Sprite(res.blank_tv);
			this.videoImgB.setScale( diffDist*.9 / this.videoImgB.height );
			this.videoImgB.attr({
				x:this.width*.75,
				y:this.tutTextB.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgB);
			
			this.obstVidImg = new cc.Sprite(res.cloud_emoji);
			this.obstVidImg.setScale(this.videoImgA.height*this.videoImgA.scale*.8 / this.obstVidImg.height);
			this.obstVidImg.attr({
				x:this.videoImgA.x,
				y:this.videoImgA.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.obstVidImg);
		}
		else if(code == "knife")
		{
			this.tutTextA = new cc.LabelTTF("Knife Tutorial", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextA.color = cc.color(0,0,0,255);
			this.tutTextA.attr({
				x:this.width*.25,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextA);
			
			this.tutTextB = new cc.LabelTTF("Skill in Level Design", "HeaderFont", Math.floor(this.height*this.textHeightRatio));
			this.tutTextB.color = cc.color(0,0,0,255);
			this.tutTextB.attr({
				x:this.width*.75,
				y:Math.floor(this.height*this.textHeightRatio)+3,
				anchorX:.5,
				anchorY:1
			});
			this.addChild(this.tutTextB);
			
			var diffDist = this.height-Math.floor(this.height*this.textHeightRatio);
			this.videoImgA = new cc.Sprite(res.blank_tv);
			this.videoImgA.setScale( diffDist*.9 / this.videoImgA.height );
			this.videoImgA.attr({
				x:this.width*.25,
				y:this.tutTextA.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgA);
			
			this.videoImgB = new cc.Sprite(res.blank_tv);
			this.videoImgB.setScale( diffDist*.9 / this.videoImgB.height );
			this.videoImgB.attr({
				x:this.width*.75,
				y:this.tutTextB.y + diffDist/2,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.videoImgB);
			
			this.obstVidImg = new cc.Sprite(res.knife_emoji);
			this.obstVidImg.setScale(this.videoImgA.height*this.videoImgA.scale*.8 / this.obstVidImg.height);
			this.obstVidImg.attr({
				x:this.videoImgA.x,
				y:this.videoImgA.y,
				anchorX:.5,
				anchorY:.5
			});
			this.addChild(this.obstVidImg);
		}
		//soapbar, egg, clone
		
		
	},
	
	onTouchEnded:function(pos)
	{
		var linkFound = false;
		if(this.videoImgA != null)
		{
			if(pos.x > this.videoImgA.x-(this.videoImgA.width*this.videoImgA.scale/2) && pos.x < this.videoImgA.x+(this.videoImgA.width*this.videoImgA.scale/2) )
			{
				linkFound = true;
				cc.sys.openURL("https://www.youtube.com/watch?v=fuTF25cmi-k");
			}
		}
		if(this.videoImgB != null && !linkFound)
		{
			if(pos.x > this.videoImgB.x-(this.videoImgB.width*this.videoImgB.scale/2) && pos.x < this.videoImgB.x+(this.videoImgB.width*this.videoImgB.scale/2) )
			{
				linkFound = true;
				cc.sys.openURL("https://www.youtube.com/watch?v=l_gh8h8bm4Q");
			}
		}
	}
	
	
});