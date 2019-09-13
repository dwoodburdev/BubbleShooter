var SocialLoginPopup = cc.Layer.extend({
	ctor:function(width, height){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		 
		 this.width = width;
		 this.height = height;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		//this.dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 4, cc.color(0,0,0,255));
	
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
		
		
		/*
		this.newsLabel = new cc.LabelTTF("Save your Progress!", "HeaderFont", Math.floor(this.height/7));
		this.newsLabel.color = cc.color(255,255,255,255);
		this.newsLabel.attr({
			x:this.width/2,
			y:this.height-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.newsLabel);
		this.dn.drawRect(cc.p(0,this.newsLabel.y-Math.floor(this.height/7)), cc.p(this.width,this.height), cc.color(235,0,0,255), 0, cc.color(0,0,0,255));
		
		this.newsLabelB = new cc.LabelTTF("Save your Work!", "HeaderFont", Math.floor(this.height/7));
		this.newsLabelB.color = cc.color(255,255,255,255);
		this.newsLabelB.attr({
			x:this.width/2,
			y:Math.floor(this.height/7),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.newsLabelB);
		this.dn.drawRect(cc.p(0,0), cc.p(this.width,Math.floor(this.height/7)+3), cc.color(235,0,0,255), 0, cc.color(0,0,0,255));
		*/
	
	
		this.titleText = new cc.LabelTTF("Login/Signup", "HeaderFont", Math.floor(this.height*.065));
		this.titleText.color = cc.color(0,0,0,255);
		this.titleText.attr({
			x:this.width/2,
			y:this.height*.7,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.titleText);
		
		
		
		this.facebookButton = new cc.Sprite(res.facebook_login);
		this.facebookButton.setScale(this.height*.08 / this.facebookButton.height);
		this.facebookButton.attr({
			x:this.width*.5,
			y:this.titleText.y-Math.floor(this.height*.2),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.facebookButton);
		
		this.googleButton = new cc.Sprite(res.google_login);
		this.googleButton.setScale(this.height*.08 / this.googleButton.height);
		this.googleButton.attr({
			x:this.width*.5,
			y:this.facebookButton.y-(this.facebookButton.height*this.facebookButton.scale)-(this.height*.02),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.googleButton);
		/*
		this.twitterButton = new cc.Sprite(res.twitter_login);
		this.twitterButton.setScale(this.height*.08 / this.twitterButton.height);
		this.twitterButton.attr({
			x:this.width*.5,
			y:this.googleButton.y-(this.googleButton.height*this.googleButton.scale)-(this.height*.02),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.twitterButton);
		*/
		
		this.laterButton = new cc.Sprite(res.stop_bg);
		this.laterButton.setScale(this.height*.06 / this.laterButton.height);
		this.laterButton.attr({
			x:this.width*.9,
			y:this.height*.85,
			anchorX:1,
			anchorY:1
		});
		this.addChild(this.laterButton);
		
		this.laterLabel = new cc.LabelTTF("Later","HeaderFont",Math.floor(this.height*.04));
		this.laterLabel.color = cc.color(255,255,255,255);
		this.laterLabel.attr({
			x:this.laterButton.x-(this.laterButton.width*this.laterButton.scale/2),
			y:this.laterButton.y-3,
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.laterLabel);
		
	},
	
	onTouchEnded:function(pos)
	{
		if(pos.x > this.laterButton.x-(this.laterButton.width*this.laterButton.scale) && pos.x < this.laterButton.x
		&& pos.y > this.laterButton.y-(this.laterButton.height*this.laterButton.scale) && pos.y < this.laterButton.y)
		{
			this.parent.closePopup();
		}
		
		else if(pos.x > this.facebookButton.x-(this.facebookButton.width*this.facebookButton.scale/2) && pos.x < this.facebookButton.x+(this.facebookButton.width*this.facebookButton.scale/2)
		&& pos.y > this.facebookButton.y-(this.facebookButton.height*this.facebookButton.scale) && pos.y < this.facebookButton.y)
		{cc.log("openSignupForm");
			//openSignupForm();
			this.parent.loginFacebook();
		}
		else if(pos.x > this.googleButton.x-(this.googleButton.width*this.googleButton.scale/2) && pos.x < this.googleButton.x+(this.googleButton.width*this.googleButton.scale/2)
		&& pos.y > this.googleButton.y-(this.googleButton.height*this.googleButton.scale) && pos.y < this.googleButton.y)
		{cc.log("openSignupForm");
			//openSignupForm();
			this.parent.loginGoogle();
		}
	
	
	}
	
	
	
});