var ShareLayer = cc.Layer.extend({
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
		
		
		/*
		this.newsLabel = new cc.LabelTTF("The Latest", "HeaderFont", Math.floor(this.height/7));
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
		this.addChild(this.rightArrow);
		
		this.leftArrow = new cc.Sprite(res.left_arrow);
		this.leftArrow.setScale(this.height/7 / this.leftArrow.height);
		this.leftArrow.attr({
			x:3,
			y:(this.newsLabel.y-Math.floor(this.height/7) )/ 2,
			anchorX:0,
			anchorY:.5
		});
		this.addChild(this.leftArrow);
		
		
		this.dummyImg = new cc.Sprite(res.world_day_banner);
		this.dummyImg.setScale((this.newsLabel.y-Math.floor(this.height/7))*.8 / this.dummyImg.height);
		this.dummyImg.attr({
			x:this.width/2,
			y:(this.newsLabel.y-Math.floor(this.height/7) )/ 2,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.dummyImg);
		
		*/
		
		
		
		this.newsLabel = new cc.LabelTTF("Save your Game!", "HeaderFont", Math.floor(this.height/7));
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
		//this.addChild(this.newsLabelB);
		//this.dn.drawRect(cc.p(0,0), cc.p(this.width,Math.floor(this.height/7)+3), cc.color(235,0,0,255), 0, cc.color(0,0,0,255));
		
		var buttonsTopY = this.newsLabel.y-Math.floor(this.height/7);
		
		
		
		this.facebookButton = new cc.Sprite(res.facebook_login);
		this.facebookButton.setScale(buttonsTopY*.45 / this.facebookButton.height);
		this.facebookButton.attr({
			x:this.width*.5,
			y:buttonsTopY-(buttonsTopY*.05),
			anchorX:.5,
			anchorY:1
		});
		this.addChild(this.facebookButton);
		
		this.googleButton = new cc.Sprite(res.google_login);
		this.googleButton.setScale(buttonsTopY*.45 / this.googleButton.height);
		this.googleButton.attr({
			x:this.width*.5,
			y:buttonsTopY*.05,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.googleButton);
		
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
		if(pos.x > this.facebookButton.x-(this.facebookButton.width*this.facebookButton.scale/2) && pos.x < this.facebookButton.x+(this.facebookButton.width*this.facebookButton.scale/2)
		&& pos.y > this.facebookButton.y-(this.facebookButton.height*this.facebookButton.scale) && pos.y < this.facebookButton.y+(this.facebookButton.height*this.facebookButton.scale))
		{cc.log("openSignupForm");
			//openSignupForm();
			this.parent.parent.loginFacebook();
		}
		else if(pos.x > this.googleButton.x-(this.googleButton.width*this.googleButton.scale/2) && pos.x < this.googleButton.x+(this.googleButton.width*this.googleButton.scale/2)
		&& pos.y > this.googleButton.y-(this.googleButton.height*this.googleButton.scale) && pos.y < this.googleButton.y+(this.googleButton.height*this.googleButton.scale))
		{cc.log("openSignupForm");
			//openSignupForm();
			this.parent.parent.loginGoogle();
		}/*
		else if(pos.x > this.twitterButton.x-(this.twitterButton.width*this.twitterButton.scale/2) && pos.x < this.twitterButton.x+(this.twitterButton.width*this.twitterButton.scale/2)
		&& pos.y > this.twitterButton.y-(this.twitterButton.height*this.twitterButton.scale/2) && pos.y < this.twitterButton.y+(this.twitterButton.height*this.twitterButton.scale/2))
		{cc.log("openSignupForm");
			//openSignupForm();
			this.parent.parent.loginTwitter();
		}*/
		
	}
});