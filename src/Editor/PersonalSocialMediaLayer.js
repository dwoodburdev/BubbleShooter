var PersonalSocialMediaLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		
		
		this.profPic = new cc.Sprite(res.app_icon);
		this.profPic.setScale( (this.height/2*.9) / this.profPic.height);
		this.profPic.attr({
			x:5,
			y:this.height*.75,
			anchorX:0,
			anchorY:.5
		});
		
		this.profPicB = new cc.Sprite(res.prof_pic);
		//this.profPicB.setScale(this.height*.35 / this.profPicB.height);
		this.profPicB.setScale( (this.height/2*.9) / this.profPicB.height);
		this.profPicB.attr({
			x:5,
			y:this.height*.25,
			anchorX:0,
			anchorY:.5
		});
		
		var squareLeftX = this.profPic.x+(this.profPic.width*this.profPic.scale)+5;
		
		this.dn.drawRect(cc.p(squareLeftX,0), cc.p(this.width,this.height/2 - 3), cc.color(215,215,215,255), 0, cc.color(0,0,0,255));
		this.dn.drawRect(cc.p(squareLeftX,this.height/2+3), cc.p(this.width,this.height), cc.color(215,215,215,255), 0, cc.color(0,0,0,255));
		
		
		this.titleText = new cc.LabelTTF("Follow Us! #EmojiPop", "HeaderFont", Math.floor(this.height*.12));
		this.titleText.color = cc.color(0,0,0,255);
		this.titleText.attr({
			x:squareLeftX+2,
			y:this.height-2,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.titleText);
		
		var topDist = this.titleText.y-Math.floor(this.height*.12) - (this.height/2+3);
		var topHalfY = ( topDist )/2 + (this.height/2 + 3);
		
		this.addChild(this.profPic);
		
		
		this.gameShareA = new cc.Sprite(res.round_facebook);
		this.gameShareA.setScale(topDist*.9 / this.gameShareA.height);
		this.gameShareA.attr({
			x:this.profPic.x+(this.profPic.width*this.profPic.scale)+15,
			y:topHalfY,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.gameShareA);
		
		this.gameShareB = new cc.Sprite(res.round_twitter);
		this.gameShareB.setScale(topDist*.9 / this.gameShareB.height);
		this.gameShareB.attr({
			x:this.gameShareA.x+(this.gameShareA.width*this.gameShareA.scale)+5,
			y:topHalfY,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.gameShareB);
		
		this.gameShareC = new cc.Sprite(res.round_instagram);
		this.gameShareC.setScale(topDist*.9 / this.gameShareC.height);
		this.gameShareC.attr({
			x:this.gameShareB.x+(this.gameShareB.width*this.gameShareB.scale)+5,
			y:topHalfY,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.gameShareC);
		
		this.gameShareD = new cc.Sprite(res.round_reddit);
		this.gameShareD.setScale(topDist*.9 / this.gameShareD.height);
		this.gameShareD.attr({
			x:this.gameShareC.x+(this.gameShareC.width*this.gameShareC.scale)+5,
			y:topHalfY,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.gameShareD);
		
		
		
		this.titleTextB = new cc.LabelTTF("Follow the Creator", "HeaderFont", Math.floor(this.height*.12));
		this.titleTextB.color = cc.color(0,0,0,255);
		this.titleTextB.attr({
			x:squareLeftX+2,
			y:this.height/2 - 3 - 2,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.titleTextB);
		
		var botDist = this.titleTextB.y-Math.floor(this.height*.12);
		var botHalfY = (botDist)/2;
		
		this.addChild(this.profPicB);
		
		
		this.creatorShareA = new cc.Sprite(res.round_youtube);
		this.creatorShareA.setScale(this.profPicB.height*this.profPicB.scale * .7 / this.creatorShareA.height);
		this.creatorShareA.attr({
			x:this.profPicB.x+(this.profPicB.width*this.profPicB.scale)+15,
			y:botHalfY,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.creatorShareA);
		
		this.creatorShareB = new cc.Sprite(res.round_twitter);
		this.creatorShareB.setScale(this.profPicB.height*this.profPicB.scale * .7 / this.creatorShareB.height);
		this.creatorShareB.attr({
			x:this.creatorShareA.x+(this.creatorShareA.width*this.creatorShareA.scale)+5,
			y:botHalfY,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.creatorShareB);
		
		this.creatorShareC = new cc.Sprite(res.round_instagram);
		this.creatorShareC.setScale(this.profPicB.height*this.profPicB.scale * .7 / this.creatorShareC.height);
		this.creatorShareC.attr({
			x:this.creatorShareB.x+(this.creatorShareB.width*this.creatorShareB.scale)+5,
			y:botHalfY,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.creatorShareC);
		
		this.creatorShareD = new cc.Sprite(res.round_linkedin);
		this.creatorShareD.setScale(this.profPicB.height*this.profPicB.scale * .7 / this.creatorShareD.height);
		this.creatorShareD.attr({
			x:this.creatorShareC.x+(this.creatorShareC.width*this.creatorShareC.scale)+5,
			y:botHalfY,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.creatorShareD);
		
		this.shareButtons = [this.gameShareA, this.gameShareB, this.gameShareC, this.creatorShareA, this.creatorShareB, this.creatorShareC, this.creatorShareD, this.gameShareD]
		
	},
	
	onTouchEnded:function(pos)
	{
		for(var i=0; i<this.shareButtons.length; i++)
		{
			var but = this.shareButtons[i];
			if(pos.x > but.x && pos.x < but.x+(but.width*but.scale)
				&& pos.y > but.y-(but.height*but.scale/2) && pos.y < but.y+(but.height*but.scale/2))
			{
				if(i == 0)
					cc.sys.openURL("https://www.facebook.com/emojipoponline/");
				else if(i == 1)
					cc.sys.openURL("https://twitter.com/emojipopgame");
				else if(i == 2)
					cc.sys.openURL("https://www.instagram.com/emojipopgame/");
				else if(i == 3)
					cc.sys.openURL("https://www.youtube.com/channel/UCehrVORFEAnZMBYSRDdBFlg");
				else if(i == 4)
					cc.sys.openURL("https://twitter.com/eldylanwoodbury");
				else if(i == 5)
					cc.sys.openURL("https://www.instagram.com/eldylanwoodbury/");
				else if(i == 6)
					cc.sys.openURL("https://www.linkedin.com/in/dwoodbur/");
				else if(i == 7)
					cc.sys.openURL("https://www.reddit.com/r/EmojiPop/");
			}
		}
	}
	
	
});