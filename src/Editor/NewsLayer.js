var NewsLayer = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(215,215,215,255), 0, cc.color(0,0,0,255));
		//this.dn.drawRect(cc.p(,0), cc.p(this.width,this.height), cc.color(235,235,235,255), 0, cc.color(0,0,0,255));
		
		this.newsLabel = new cc.LabelTTF("Promoted Video", "HeaderFont", Math.floor(this.height/7));
		this.newsLabel.color = cc.color(0,0,0,255);
		this.newsLabel.attr({
			x:this.width/2,
			y:this.height-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.newsLabel);
		this.dn.drawRect(cc.p(0,this.newsLabel.y-Math.floor(this.height/7)), cc.p(this.width,this.height), cc.color(235,235,235,255), 0, cc.color(0,0,0,255));
		
		
		this.rightArrow = new cc.Sprite(res.right_arrow);
		this.rightArrow.setScale(this.height/7 / this.rightArrow.height);
		this.rightArrow.attr({
			x:this.width-3,
			y:(this.newsLabel.y-Math.floor(this.height/7) )/ 2,
			anchorX:1,
			anchorY:.5
		});
		//this.addChild(this.rightArrow);
		
		this.leftArrow = new cc.Sprite(res.left_arrow);
		this.leftArrow.setScale(this.height/7 / this.leftArrow.height);
		this.leftArrow.attr({
			x:3,
			y:(this.newsLabel.y-Math.floor(this.height/7) )/ 2,
			anchorX:0,
			anchorY:.5
		});
		//this.addChild(this.leftArrow);
		
		
		this.dummyImg = new cc.Sprite(res.video_thumb);
		this.dummyImg.setScale((this.newsLabel.y-Math.floor(this.height/7))*.8 / this.dummyImg.height);
		this.dummyImg.attr({
			x:5,
			y:Math.floor(this.height*6/7)/2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.dummyImg);
		
		this.vidTitle = new cc.LabelTTF("Story of Emoji Pop", "HeaderFont", Math.floor(this.height/7));
		this.vidTitle.color = cc.color(0,0,0,255);
		this.vidTitle.attr({
			x:this.dummyImg.x+this.dummyImg.width*this.dummyImg.scale + 10,
			y:this.dummyImg.y+(this.dummyImg.height*this.dummyImg.scale)/2,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.vidTitle);
		
		this.vidDescA = new cc.LabelTTF("Let me tell you all about", "HeaderFont", Math.floor(this.height/10));
		this.vidDescA.color = cc.color(0,0,0,255);
		this.vidDescA.attr({
			x:this.dummyImg.x+this.dummyImg.width*this.dummyImg.scale + 10,
			y:this.vidTitle.y - Math.floor(this.height/7) - 6,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.vidDescA);
		
		this.vidDescB = new cc.LabelTTF("the making of Emoji Pop!", "HeaderFont", Math.floor(this.height/10));
		this.vidDescB.color = cc.color(0,0,0,255);
		this.vidDescB.attr({
			x:this.dummyImg.x+this.dummyImg.width*this.dummyImg.scale + 10,
			y:this.vidDescA.y - Math.floor(this.height/10) - 3,
			anchorX:0,
			anchorY:1
		});
		this.addChild(this.vidDescB);
		
		
		this.playImg = new cc.Sprite(res.play_bg);
		this.playImg.setScale(Math.floor(this.height/4) / this.playImg.height);
		this.playImg.attr({
			x:(this.width - (this.dummyImg.x+this.dummyImg.width*this.dummyImg.scale) )/2 + (this.dummyImg.x+this.dummyImg.width*this.dummyImg.scale),
			y:5,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.playImg);
		
		this.watchLabel = new cc.LabelTTF("Watch!", "HeaderFont", Math.floor(this.height/7));
		this.watchLabel.color = cc.color(255,255,255,255);
		this.watchLabel.attr({
			x:this.playImg.x,
			y:this.playImg.y+(this.playImg.height*this.playImg.scale) - 6,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.watchLabel);
		
	
	},
	
	onTouchEnded:function(pos)
	{
		/*if(pos.x > this.loginButton.x-(this.loginButton.width*this.loginButton.scale/2) && pos.x < this.loginButton.x+(this.loginButton.width*this.loginButton.scale/2)
		&& pos.y > this.loginButton.y-(this.loginButton.height*this.loginButton.scale/2) && pos.y < this.loginButton.y+(this.loginButton.height*this.loginButton.scale/2))
		{cc.log("openForm");
			openForm();
		}
		if(pos.x > this.signupButton.x-(this.signupButton.width*this.signupButton.scale/2) && pos.x < this.signupButton.x+(this.signupButton.width*this.signupButton.scale/2)
		&& pos.y > this.signupButton.y-(this.signupButton.height*this.signupButton.scale/2) && pos.y < this.signupButton.y+(this.signupButton.height*this.signupButton.scale/2))
		{cc.log("openSignupForm");
			openSignupForm();
		}*/
		
	}
});