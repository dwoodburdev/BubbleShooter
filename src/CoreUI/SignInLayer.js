var SignInLayer = cc.Layer.extend({
	ctor:function(){
		this._super();
		//cc.associateWithNative( this, cc.Sprite );
		
        
		 var size = cc.winSize;
		
		this.dn = new cc.DrawNode();
		this.addChild(this.dn);
		this.dn.drawRect(cc.p(0,0),cc.p(size.width,size.height),cc.color(255,255,255,255),0,cc.color(255,255,255,255));
		
		this.titleImg = new cc.Sprite(res.emoji_pop_title);
		this.titleImg.setScale(size.width*2/3 / this.titleImg.width);
		this.titleImg.attr({
			x:size.width/2,
			y:size.height*3/4,
			anchorX:.5,
			anchorY:.5
		});
		this.addChild(this.titleImg);
		
		this.logInButton = new cc.Sprite(res.login_button);
		this.logInButton.setScale(size.width/3 / this.logInButton.width);
		this.logInButton.attr({
			x:size.width/2,
			y:50,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.logInButton);
		
		this.newUserButton = new cc.Sprite(res.newuser_button);
		this.newUserButton.setScale(this.logInButton.height*this.logInButton.scale / this.newUserButton.height);
		this.newUserButton.attr({
			x:size.width/2,
			y:this.logInButton.y+this.logInButton.height*this.logInButton.scale+20,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.newUserButton);
		
		var spaceHeight = (this.titleImg.y-(this.titleImg.height*this.titleImg.scale/2)) - (this.newUserButton.y+this.newUserButton.height*this.newUserButton.scale);
		this.faceImg = new cc.Sprite(res.sunglass_face);
		this.faceImg.setScale(spaceHeight/2 / this.faceImg.height);
		this.faceImg.attr({
			x:size.width/2,
			y:this.newUserButton.y+(this.newUserButton.height*this.newUserButton.scale)+spaceHeight/3,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.faceImg);
		
		this.errorLabel = null;
		
		this.errorLabel = new cc.LabelTTF("", "Arial", 32);
		this.errorLabel.attr({
			"x":cc.winSize.width/2,
			"y":this.faceImg.y-5,
			"anchorX":.5,
			"anchorY":1
		});
		this.errorLabel.color = cc.color(255,0,0,255);
		this.addChild(this.errorLabel);
		
		
		var self = this;
		
		if (cc.sys.capabilities.hasOwnProperty('touches')) {cc.log("TOUCHES ON");
			cc.eventManager.addListener({
			    event: cc.EventListener.TOUCH_ONE_BY_ONE,
			    swallowTouches:true,
			    onTouchBegan: function(touch, event){cc.log("a");
			   		var target = event.getCurrentTarget();
			    	var locationInNode = self.convertToNodeSpace(touch.getLocation());
			    	
			    	
			    	
			    	return true;
			    },
			    onTouchMoved: function(touch, event){
			    	var target = event.getCurrentTarget();
			    	var locationInNode = self.convertToNodeSpace(touch.getLocation());
			    	
			    	
			    	
			    	return true;
			    },
			    onTouchEnded: function(touch, event){
				    var target = event.getCurrentTarget();
				    var locationInNode = self.convertToNodeSpace(touch.getLocation());
			    	cc.log(locationInNode);
			    	
			    	// LOG IN
			    	if(FUNCTIONS.posWithinScaled(locationInNode, self.logInButton))
			    	{
			    		var email = prompt("Please enter email.", "");
						var password = prompt("Password","");
						
						firebase.auth().signInWithEmailAndPassword(email, password).then(function() {cc.log(firebase.auth().O);
							// EVENTUALLY NEED TO LOAD WORLD BUBBLES HERE I THINK GIVEN USERID
							DATA.userID = firebase.auth().O;
			    			cc.sys.localStorage.setItem("userID", DATA.userID);
						
							DATA.database.ref("users/"+DATA.userID+"/world").once("value").then(function(snapshot){
  								var d = snapshot.val();
								var bubbles = [];
							  	var bubKeys = Object.keys(d.bubbles);
							  	for(var i=0; i<bubKeys.length; i++)
							  	{
							  		var dBub = d.bubbles[bubKeys[i]];
							  		var bubble = {row:dBub.row, col:dBub.col, type:dBub.type, colorCode:dBub.colorCode};
							    	bubbles.push(bubble);
							  	}
							  	var queue = {type:d.queue.type, colors:d.queue.colors};
							  	DATA.worldLevel = {"bubbles":bubbles, "queue":queue};
							  	
							  	//var bubbles = DATA.worldLevel.bubbles;
							
								var maxRow = 0;
								var bubbleData = [];
								for(var i=0; i<bubbles.length; i++)
								{
									if(bubbles[i].row > maxRow)
										maxRow = bubbles[i].row;
								}
								
								DATA.worldBubbles = bubbles;
								//DATA.setWorldQueue(DATA.worldLevel.queue);
								
								//cc.director.runScene(new GameplayScene(bubbles, maxRow+1));
							  	DATA.initUserData();
							});
							
							
							
						}).catch(function(error) {
						  // Handle Errors here.
							var errorCode = error.code;
							var errorMessage = error.message;
							console.log(errorMessage);
							
							self.errorLabel.setString("Invalid Login");
							self.makeFaceConcerned();
							
							
							
							//cc.director.runScene(new SignInScene(email, password));
						  // ...
						}); 
			    	}
			    	
			    	// NEW USER SIGNUP
			    	else if(FUNCTIONS.posWithinScaled(locationInNode, self.newUserButton))
			    	{
			    		var email = prompt("Please enter email.", "");
						var password = prompt("Password","");
						
			    		firebase.auth().createUserWithEmailAndPassword(email, password).then(function(error) {
			    			DATA.userID = firebase.auth().O;cc.log(DATA.userID);
			    			cc.sys.localStorage.setItem("userID", DATA.userID);
			    			
			    			var newWorld = {
		    					bubbles:{"0_0" : {"col" : 0,    "colorCode" : "green",    "row" : 0,    "type" : 0  },  "0_1" : {    "col" : 1,    "colorCode" : "green",    "row" : 0,    "type" : 0  },  "0_10" : {    "col" : 10,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  },  "0_11" : {    "col" : 11,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  },  "0_2" : {    "col" : 2,    "colorCode" : "red",    "row" : 0,    "type" : 0  },  "0_3" : {    "col" : 3,    "colorCode" : "red",    "row" : 0,    "type" : 0  },  "0_4" : {    "col" : 4,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  },  "0_5" : {    "col" : 5,    "colorCode" : "yellow",    "row" : 0,    "type" : 0  },  "0_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 0,    "type" : 0  },  "0_7" : {    "col" : 7,    "colorCode" : "red",    "row" : 0,    "type" : 0  },  "0_8" : {    "col" : 8,    "colorCode" : "blue",    "row" : 0,    "type" : 0  },  "0_9" : {    "col" : 9,    "colorCode" : "blue",    "row" : 0,    "type" : 0  },  "10_5" : {    "col" : 5,    "colorCode" : "green",    "row" : 10,    "type" : 0  },  "10_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 10,    "type" : 0  },  "11_4" : {    "col" : 4,    "colorCode" : "green",    "row" : 11,    "type" : 0  },  "11_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 11,    "type" : 0  },  "12_0" : {    "col" : 0,    "colorCode" : "green",    "row" : 12,    "type" : 0  },  "12_1" : {    "col" : 1,    "colorCode" : "green",    "row" : 12,    "type" : 0  },  "12_10" : {    "col" : 10,    "colorCode" : "green",    "row" : 12,    "type" : 0  },  "12_11" : {    "col" : 11,    "colorCode" : "green",    "row" : 12,    "type" : 0  },  "12_2" : {    "col" : 2,    "colorCode" : "yellow",    "row" : 12,    "type" : 0  },  "12_3" : {    "col" : 3,    "colorCode" : "yellow",    "row" : 12,    "type" : 0  },  "12_4" : {    "col" : 4,    "colorCode" : "blue",    "row" : 12,    "type" : 0  },  "12_5" : {    "col" : 5,    "colorCode" : "blue",    "row" : 12,    "type" : 0  },  "12_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 12,    "type" : 0  },  "12_7" : {    "col" : 7,    "colorCode" : "yellow",    "row" : 12,    "type" : 0  },  "12_8" : {    "col" : 8,    "colorCode" : "red",    "row" : 12,    "type" : 0  },  "12_9" : {    "col" : 9,    "colorCode" : "red",    "row" : 12,    "type" : 0  },  "13_0" : {    "col" : 0,    "colorCode" : "blue",    "row" : 13,    "type" : 0  },  "13_1" : {    "col" : 1,    "colorCode" : "blue",    "row" : 13,    "type" : 0  },  "13_10" : {    "col" : 10,    "colorCode" : "yellow",    "row" : 13,    "type" : 0  },  "13_2" : {    "col" : 2,    "colorCode" : "red",    "row" : 13,    "type" : 0  },  "13_3" : {    "col" : 3,    "colorCode" : "red",    "row" : 13,    "type" : 0  },  "13_4" : {    "col" : 4,    "colorCode" : "yellow",    "row" : 13,    "type" : 0  },  "13_5" : {    "col" : 5,    "row" : 13,    "type" : 20  },  "13_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 13,    "type" : 0  },  "13_7" : {    "col" : 7,    "colorCode" : "green",    "row" : 13,    "type" : 0  },  "13_8" : {    "col" : 8,    "colorCode" : "green",    "row" : 13,    "type" : 0  },  "13_9" : {    "col" : 9,    "colorCode" : "yellow",    "row" : 13,    "type" : 0  },  "14_4" : {    "col" : 4,    "colorCode" : "green",    "row" : 14,    "type" : 0  },  "14_5" : {    "col" : 5,    "colorCode" : "yellow",    "row" : 14,    "type" : 0  },  "14_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 14,    "type" : 0  },  "14_7" : {    "col" : 7,    "colorCode" : "red",    "row" : 14,    "type" : 0  },  "15_4" : {    "col" : 4,    "colorCode" : "green",    "row" : 15,    "type" : 0  },  "15_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 15,    "type" : 0  },  "16_5" : {    "col" : 5,    "colorCode" : "blue",    "row" : 16,    "type" : 0  },  "16_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 16,    "type" : 0  },  "17_4" : {    "col" : 4,    "colorCode" : "blue",    "row" : 17,    "type" : 0  },  "17_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 17,    "type" : 0  },  "18_5" : {    "col" : 5,    "colorCode" : "yellow",    "row" : 18,    "type" : 0  },  "18_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 18,    "type" : 0  },  "19_4" : {    "col" : 4,    "colorCode" : "yellow",    "row" : 19,    "type" : 0  },  "19_5" : {    "col" : 5,    "row" : 19,    "type" : 20  },  "19_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 19,    "type" : 0  },  "1_0" : {    "col" : 0,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  },  "1_1" : {    "col" : 1,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  },  "1_10" : {    "col" : 10,    "colorCode" : "red",    "row" : 1,    "type" : 0  },  "1_2" : {    "col" : 2,    "colorCode" : "blue",    "row" : 1,    "type" : 0  },  "1_3" : {    "col" : 3,    "colorCode" : "blue",    "row" : 1,    "type" : 0  },  "1_4" : {    "col" : 4,    "colorCode" : "red",    "row" : 1,    "type" : 0  },  "1_5" : {    "col" : 5,    "row" : 1,    "type" : 20  },  "1_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 1,    "type" : 0  },  "1_7" : {    "col" : 7,    "colorCode" : "green",    "row" : 1,    "type" : 0  },  "1_8" : {    "col" : 8,    "colorCode" : "green",    "row" : 1,    "type" : 0  },  "1_9" : {    "col" : 9,    "colorCode" : "red",    "row" : 1,    "type" : 0  },  "20_5" : {    "col" : 5,    "colorCode" : "red",    "row" : 20,    "type" : 0  },  "20_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 20,    "type" : 0  },  "21_4" : {    "col" : 4,    "colorCode" : "red",    "row" : 21,    "type" : 0  },  "21_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 21,    "type" : 0  },  "22_5" : {    "col" : 5,    "colorCode" : "green",    "row" : 22,    "type" : 0  },  "22_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 22,    "type" : 0  },  "23_4" : {    "col" : 4,    "colorCode" : "green",    "row" : 23,    "type" : 0  },  "23_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 23,    "type" : 0  },  "24_5" : {    "col" : 5,    "colorCode" : "blue",    "row" : 24,    "type" : 0  },  "24_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 24,    "type" : 0  },  "25_4" : {    "col" : 4,    "colorCode" : "blue",    "row" : 25,    "type" : 0  },  "25_5" : {    "col" : 5,    "row" : 25,    "type" : 20  },  "25_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 25,    "type" : 0  },  "26_0" : {    "col" : 0,    "colorCode" : "red",    "row" : 26,    "type" : 0  },  "26_1" : {    "col" : 1,    "colorCode" : "red",    "row" : 26,    "type" : 0  },  "26_10" : {    "col" : 10,    "colorCode" : "red",    "row" : 26,    "type" : 0  },  "26_11" : {    "col" : 11,    "colorCode" : "red",    "row" : 26,    "type" : 0  },  "26_2" : {    "col" : 2,    "colorCode" : "green",    "row" : 26,    "type" : 0  },  "26_3" : {    "col" : 3,    "colorCode" : "green",    "row" : 26,    "type" : 0  },  "26_4" : {    "col" : 4,    "colorCode" : "yellow",    "row" : 26,    "type" : 0  },  "26_5" : {    "col" : 5,    "colorCode" : "yellow",    "row" : 26,    "type" : 0  },  "26_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 26,    "type" : 0  },  "26_7" : {    "col" : 7,    "colorCode" : "green",    "row" : 26,    "type" : 0  },  "26_8" : {    "col" : 8,    "colorCode" : "blue",    "row" : 26,    "type" : 0  },  "26_9" : {    "col" : 9,    "colorCode" : "blue",    "row" : 26,    "type" : 0  },  "27_0" : {    "col" : 0,    "colorCode" : "blue",    "row" : 27,    "type" : 0  },  "27_1" : {    "col" : 1,    "colorCode" : "blue",    "row" : 27,    "type" : 0  },  "27_10" : {    "col" : 10,    "colorCode" : "green",    "row" : 27,    "type" : 0  },  "27_2" : {    "col" : 2,    "colorCode" : "red",    "row" : 27,    "type" : 0  },  "27_3" : {    "col" : 3,    "colorCode" : "red",    "row" : 27,    "type" : 0  },  "27_4" : {    "col" : 4,    "colorCode" : "green",    "row" : 27,    "type" : 0  },  "27_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 27,    "type" : 0  },  "27_7" : {    "col" : 7,    "colorCode" : "yellow",    "row" : 27,    "type" : 0  },  "27_8" : {    "col" : 8,    "colorCode" : "yellow",    "row" : 27,    "type" : 0  },  "27_9" : {    "col" : 9,    "colorCode" : "green",    "row" : 27,    "type" : 0  },  "28_4" : {    "col" : 4,    "colorCode" : "yellow",    "row" : 28,    "type" : 0  },  "28_5" : {    "col" : 5,    "colorCode" : "green",    "row" : 28,    "type" : 0  },  "28_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 28,    "type" : 0  },  "28_7" : {    "col" : 7,    "colorCode" : "blue",    "row" : 28,    "type" : 0  },  "29_4" : {    "col" : 4,    "colorCode" : "yellow",    "row" : 29,    "type" : 0  },  "29_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 29,    "type" : 0  },  "2_4" : {    "col" : 4,    "colorCode" : "green",    "row" : 2,    "type" : 0  },  "2_5" : {    "col" : 5,    "colorCode" : "red",    "row" : 2,    "type" : 0  },  "2_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 2,    "type" : 0  },  "2_7" : {    "col" : 7,    "colorCode" : "blue",    "row" : 2,    "type" : 0  },  "30_5" : {    "col" : 5,    "colorCode" : "blue",    "row" : 30,    "type" : 0  },  "30_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 30,    "type" : 0  },  "31_4" : {    "col" : 4,    "colorCode" : "blue",    "row" : 31,    "type" : 0  },  "31_5" : {    "col" : 5,    "row" : 31,    "type" : 20  },  "31_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 31,    "type" : 0  },  "32_5" : {    "col" : 5,    "colorCode" : "red",    "row" : 32,    "type" : 0  },  "32_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 32,    "type" : 0  },  "33_4" : {    "col" : 4,    "colorCode" : "red",    "row" : 33,    "type" : 0  },  "33_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 33,    "type" : 0  },  "34_5" : {    "col" : 5,    "colorCode" : "green",    "row" : 34,    "type" : 0  },  "34_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 34,    "type" : 0  },  "35_4" : {    "col" : 4,    "colorCode" : "green",    "row" : 35,    "type" : 0  },  "35_5" : {    "col" : 5,    "row" : 35,    "type" : 20  },  "35_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 35,    "type" : 0  },  "36_5" : {    "col" : 5,    "colorCode" : "yellow",    "row" : 36,    "type" : 0  },  "36_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 36,    "type" : 0  },  "37_4" : {    "col" : 4,    "colorCode" : "yellow",    "row" : 37,    "type" : 0  },  "37_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 37,    "type" : 0  },  "38_0" : {    "col" : 0,    "colorCode" : "green",    "row" : 38,    "type" : 0  },  "38_1" : {    "col" : 1,    "colorCode" : "green",    "row" : 38,    "type" : 0  },  "38_10" : {    "col" : 10,    "colorCode" : "red",    "row" : 38,    "type" : 0  },  "38_11" : {    "col" : 11,    "colorCode" : "red",    "row" : 38,    "type" : 0  },  "38_2" : {    "col" : 2,    "colorCode" : "blue",    "row" : 38,    "type" : 0  },  "38_3" : {    "col" : 3,    "colorCode" : "blue",    "row" : 38,    "type" : 0  },  "38_4" : {    "col" : 4,    "colorCode" : "red",    "row" : 38,    "type" : 0  },  "38_5" : {    "col" : 5,    "colorCode" : "red",    "row" : 38,    "type" : 0  },  "38_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 38,    "type" : 0  },  "38_7" : {    "col" : 7,    "colorCode" : "green",    "row" : 38,    "type" : 0  },  "38_8" : {    "col" : 8,    "colorCode" : "yellow",    "row" : 38,    "type" : 0  },  "38_9" : {    "col" : 9,    "colorCode" : "yellow",    "row" : 38,    "type" : 0  },  "39_0" : {    "col" : 0,    "colorCode" : "red",    "row" : 39,    "type" : 0  },  "39_1" : {    "col" : 1,    "colorCode" : "red",    "row" : 39,    "type" : 0  },  "39_10" : {    "col" : 10,    "colorCode" : "green",    "row" : 39,    "type" : 0  },  "39_2" : {    "col" : 2,    "colorCode" : "yellow",    "row" : 39,    "type" : 0  },  "39_3" : {    "col" : 3,    "colorCode" : "yellow",    "row" : 39,    "type" : 0  },  "39_4" : {    "col" : 4,    "colorCode" : "green",    "row" : 39,    "type" : 0  },  "39_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 39,    "type" : 0  },  "39_7" : {    "col" : 7,    "colorCode" : "blue",    "row" : 39,    "type" : 0  },  "39_8" : {    "col" : 8,    "colorCode" : "blue",    "row" : 39,    "type" : 0  },  "39_9" : {    "col" : 9,    "colorCode" : "green",    "row" : 39,    "type" : 0  },  "3_4" : {    "col" : 4,    "colorCode" : "green",    "row" : 3,    "type" : 0  },  "3_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 3,    "type" : 0  },  "40_5" : {    "col" : 5,    "colorCode" : "green",    "row" : 40,    "type" : 0  },  "40_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 40,    "type" : 0  },  "41_4" : {    "col" : 4,    "colorCode" : "blue",    "row" : 41,    "type" : 0  },  "41_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 41,    "type" : 0  },  "42_5" : {    "col" : 5,    "colorCode" : "blue",    "row" : 42,    "type" : 0  },  "42_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 42,    "type" : 0  },  "43_4" : {    "col" : 4,    "colorCode" : "red",    "row" : 43,    "type" : 0  },  "43_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 43,    "type" : 0  },  "44_5" : {    "col" : 5,    "colorCode" : "red",    "row" : 44,    "type" : 0  },  "44_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 44,    "type" : 0  },  "45_4" : {    "col" : 4,    "colorCode" : "yellow",    "row" : 45,    "type" : 0  },  "45_5" : {    "col" : 5,    "row" : 45,    "type" : 20  },  "45_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 45,    "type" : 0  },  "46_5" : {    "col" : 5,    "colorCode" : "yellow",    "row" : 46,    "type" : 0  },  "46_6" : {    "col" : 6,    "colorCode" : "blue",    "row" : 46,    "type" : 0  },  "47_4" : {    "col" : 4,    "colorCode" : "green",    "row" : 47,    "type" : 0  },  "47_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 47,    "type" : 0  },  "48_5" : {    "col" : 5,    "colorCode" : "green",    "row" : 48,    "type" : 0  },  "48_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 48,    "type" : 0  },  "49_4" : {    "col" : 4,    "colorCode" : "blue",    "row" : 49,    "type" : 0  },  "49_5" : {    "col" : 5,    "row" : 49,    "type" : 20  },  "49_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 49,    "type" : 0  },  "4_5" : {    "col" : 5,    "colorCode" : "blue",    "row" : 4,    "type" : 0  },  "4_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 4,    "type" : 0  },  "50_5" : {    "col" : 5,    "colorCode" : "blue",    "row" : 50,    "type" : 0  },  "50_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 50,    "type" : 0  },  "51_4" : {    "col" : 4,    "colorCode" : "red",    "row" : 51,    "type" : 0  },  "51_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 51,    "type" : 0  },  "52_5" : {    "col" : 5,    "colorCode" : "red",    "row" : 52,    "type" : 0  },  "52_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 52,    "type" : 0  },  "5_4" : {    "col" : 4,    "colorCode" : "blue",    "row" : 5,    "type" : 0  },  "5_6" : {    "col" : 6,    "colorCode" : "red",    "row" : 5,    "type" : 0  },  "6_5" : {    "col" : 5,    "colorCode" : "yellow",    "row" : 6,    "type" : 0  },  "6_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 6,    "type" : 0  },  "7_4" : {    "col" : 4,    "colorCode" : "yellow",    "row" : 7,    "type" : 0  },  "7_5" : {    "col" : 5,    "row" : 7,    "type" : 20  },  "7_6" : {    "col" : 6,    "colorCode" : "green",    "row" : 7,    "type" : 0  },  "8_5" : {    "col" : 5,    "colorCode" : "red",    "row" : 8,    "type" : 0  },  "8_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 8,    "type" : 0  },  "9_4" : {    "col" : 4,    "colorCode" : "red",    "row" : 9,    "type" : 0  },  "9_6" : {    "col" : 6,    "colorCode" : "yellow",    "row" : 9,    "type" : 0  }},
		    					queue:{colors:{"0":1,"1":1,"2":1,"3":1,"4":0,"5":0}, type:"bucket"}
			    			};
			    			
			    			var initUserData = {
			    				ballColorA: "red",
			    				ballColorB: "blue",
			    				boosterInventories:{"0":0},
			    				challengeTries:0,
			    				coins: 10,
			    				dailyChallenges:{"0":{coins:5,number:5,progress:0,type:"level",xp:50}},
			    				friends:{"0":0},
			    				gems:0,
			    				levelIndexA:-1,
			    				levelIndexAType:"normal",
			    				levelIndexB:-1,
			    				levelIndexBType:"normal",
			    				levelsComplete:{
			    					normal:{
			    						"0":{
			    							"3":0
			    						},
			    						"1":{
			    							"1":0
			    						}
			    					},
			    					sets:{
			    						"one-pager":{
			    							completed:{"0":0},
			    							tier:0
			    						}
			    					}
			    				},
			    				preBoosterInventories:{"0":2},
			    				questChestProgress:2,
			    				queue:{"0":1,"1":1,"2":1,"3":1,"4":0,"5":0},
			    				streakStep:0,
			    				timeOfLastDailyChest:1546377277278,
			    				timeOfLastMoveSpawn:1547086014056,
			    				username:"newname",
			    				world:newWorld,
			    				worldIndex:0,
			    				worldMoves:5,
			    				xp:25
			    			};
			    			
			    			DATA.database.ref("users/"+DATA.userID).set(initUserData);
			    			DATA.database.ref("levels/userLevels/"+DATA.userID).set({"0":0});
			    			
			    			var bubbles = [ {  "col" : 0,  "colorCode" : "green",  "row" : 0,  "type" : 0}, {  "col" : 1,  "colorCode" : "green",  "row" : 0,  "type" : 0}, {  "col" : 2,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 3,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 7,  "colorCode" : "red",  "row" : 0,  "type" : 0}, {  "col" : 8,  "colorCode" : "blue",  "row" : 0,  "type" : 0}, {  "col" : 9,  "colorCode" : "blue",  "row" : 0,  "type" : 0}, {  "col" : 10,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 11,  "colorCode" : "yellow",  "row" : 0,  "type" : 0}, {  "col" : 0,  "colorCode" : "yellow",  "row" : 1,  "type" : 0}, {  "col" : 1,  "colorCode" : "yellow",  "row" : 1,  "type" : 0}, {  "col" : 2,  "colorCode" : "blue",  "row" : 1,  "type" : 0}, {  "col" : 3,  "colorCode" : "blue",  "row" : 1,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 1,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 1,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 1,  "type" : 0}, {  "col" : 8,  "colorCode" : "green",  "row" : 1,  "type" : 0}, {  "col" : 9,  "colorCode" : "red",  "row" : 1,  "type" : 0}, {  "col" : 10,  "colorCode" : "red",  "row" : 1,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 2,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 2,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 3,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 3,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 4,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 5,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 4,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 5,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 6,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 7,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 6,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 7,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 8,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 9,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 8,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 9,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 10,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 10,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 11,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 11,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 12,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 13,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 13,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 14,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 14,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 15,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 15,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 16,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 16,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 17,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 18,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 17,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 18,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 19,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 20,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 19,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 20,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 21,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 22,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 23,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 24,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 24,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 23,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 22,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 21,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 25,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 27,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 28,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 29,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 30,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 31,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 32,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 33,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 34,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 35,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 36,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 25,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 26,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 27,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 28,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 29,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 30,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 31,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 32,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 33,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 34,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 35,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 36,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 13,  "type" : 0}, {  "col" : 8,  "colorCode" : "green",  "row" : 13,  "type" : 0}, {  "col" : 9,  "colorCode" : "yellow",  "row" : 13,  "type" : 0}, {  "col" : 10,  "colorCode" : "yellow",  "row" : 13,  "type" : 0}, {  "col" : 3,  "colorCode" : "red",  "row" : 13,  "type" : 0}, {  "col" : 2,  "colorCode" : "red",  "row" : 13,  "type" : 0}, {  "col" : 1,  "colorCode" : "blue",  "row" : 13,  "type" : 0}, {  "col" : 0,  "colorCode" : "blue",  "row" : 13,  "type" : 0}, {  "col" : 0,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 1,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 2,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 3,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 12,  "type" : 0}, {  "col" : 7,  "colorCode" : "yellow",  "row" : 12,  "type" : 0}, {  "col" : 8,  "colorCode" : "red",  "row" : 12,  "type" : 0}, {  "col" : 9,  "colorCode" : "red",  "row" : 12,  "type" : 0}, {  "col" : 10,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 11,  "colorCode" : "green",  "row" : 12,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 8,  "colorCode" : "blue",  "row" : 26,  "type" : 0}, {  "col" : 9,  "colorCode" : "blue",  "row" : 26,  "type" : 0}, {  "col" : 10,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 11,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 7,  "colorCode" : "yellow",  "row" : 27,  "type" : 0}, {  "col" : 8,  "colorCode" : "yellow",  "row" : 27,  "type" : 0}, {  "col" : 9,  "colorCode" : "green",  "row" : 27,  "type" : 0}, {  "col" : 10,  "colorCode" : "green",  "row" : 27,  "type" : 0}, {  "col" : 3,  "colorCode" : "red",  "row" : 27,  "type" : 0}, {  "col" : 2,  "colorCode" : "red",  "row" : 27,  "type" : 0}, {  "col" : 1,  "colorCode" : "blue",  "row" : 27,  "type" : 0}, {  "col" : 0,  "colorCode" : "blue",  "row" : 27,  "type" : 0}, {  "col" : 1,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 2,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 3,  "colorCode" : "green",  "row" : 26,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 26,  "type" : 0}, {  "col" : 0,  "colorCode" : "red",  "row" : 26,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 37,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 37,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 39,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 39,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 3,  "colorCode" : "blue",  "row" : 38,  "type" : 0}, {  "col" : 2,  "colorCode" : "blue",  "row" : 38,  "type" : 0}, {  "col" : 1,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 0,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 0,  "colorCode" : "red",  "row" : 39,  "type" : 0}, {  "col" : 1,  "colorCode" : "red",  "row" : 39,  "type" : 0}, {  "col" : 2,  "colorCode" : "yellow",  "row" : 39,  "type" : 0}, {  "col" : 3,  "colorCode" : "yellow",  "row" : 39,  "type" : 0}, {  "col" : 7,  "colorCode" : "blue",  "row" : 39,  "type" : 0}, {  "col" : 8,  "colorCode" : "blue",  "row" : 39,  "type" : 0}, {  "col" : 9,  "colorCode" : "green",  "row" : 39,  "type" : 0}, {  "col" : 10,  "colorCode" : "green",  "row" : 39,  "type" : 0}, {  "col" : 11,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 10,  "colorCode" : "red",  "row" : 38,  "type" : 0}, {  "col" : 9,  "colorCode" : "yellow",  "row" : 38,  "type" : 0}, {  "col" : 8,  "colorCode" : "yellow",  "row" : 38,  "type" : 0}, {  "col" : 7,  "colorCode" : "green",  "row" : 38,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 40,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 40,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 41,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 41,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 42,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 42,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 43,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 44,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 44,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 43,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 45,  "type" : 0}, {  "col" : 5,  "colorCode" : "yellow",  "row" : 46,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 45,  "type" : 0}, {  "col" : 6,  "colorCode" : "blue",  "row" : 46,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 47,  "type" : 0}, {  "col" : 5,  "colorCode" : "green",  "row" : 48,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 47,  "type" : 0}, {  "col" : 6,  "colorCode" : "red",  "row" : 48,  "type" : 0}, {  "col" : 4,  "colorCode" : "blue",  "row" : 49,  "type" : 0}, {  "col" : 5,  "colorCode" : "blue",  "row" : 50,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 49,  "type" : 0}, {  "col" : 6,  "colorCode" : "green",  "row" : 50,  "type" : 0}, {  "col" : 4,  "colorCode" : "red",  "row" : 51,  "type" : 0}, {  "col" : 5,  "colorCode" : "red",  "row" : 52,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 52,  "type" : 0}, {  "col" : 6,  "colorCode" : "yellow",  "row" : 51,  "type" : 0}, {  "col" : 4,  "colorCode" : "yellow",  "row" : 28,  "type" : 0}, {  "col" : 7,  "colorCode" : "blue",  "row" : 28,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 14,  "type" : 0}, {  "col" : 7,  "colorCode" : "red",  "row" : 14,  "type" : 0}, {  "col" : 4,  "colorCode" : "green",  "row" : 2,  "type" : 0}, {  "col" : 7,  "colorCode" : "blue",  "row" : 2,  "type" : 0}, {  "col" : 5,  "row" : 49,  "type" : 20}, {  "col" : 5,  "row" : 45,  "type" : 20}, {  "col" : 5,  "row" : 35,  "type" : 20}, {  "col" : 5,  "row" : 31,  "type" : 20}, {  "col" : 5,  "row" : 25,  "type" : 20}, {  "col" : 5,  "row" : 19,  "type" : 20}, {  "col" : 5,  "row" : 13,  "type" : 20}, {  "col" : 5,  "row" : 7,  "type" : 20}, {  "col" : 5,  "row" : 1,  "type" : 20} ];
			    			var maxRow = 0;
							for(var i=0; i<bubbles.length; i++)
							{
								if(bubbles[i].row > maxRow)
									maxRow = bubbles[i].row;
							}
							
							DATA.worldBubbles = bubbles;
							
							DATA.initUserData();
							
							//DATA.setWorldQueue(DATA.worldLevel.queue);
							
							//cc.director.runScene(new GameplayScene(bubbles, maxRow+1));
			    			
			    		}).catch(function(error) {
							// Handle Errors here.
							var errorCode = error.code;
							var errorMessage = error.message;
							cc.log(errorCode);
							cc.log(errorMessage);
							
							if(errorCode == "auth/invalid-email")
							{
								self.errorLabel.setString("Invalid Email");
								self.makeFaceConcerned();
							}
							else if(errorCode == "auth/weak-password")
							{
								self.errorLabel.setString("Password Too Short (min 6)");
								self.makeFaceConcerned();
							}
							else if(errorCode == "auth/email-already-in-use")
							{
								self.errorLabel.setString("Email Already Used");
								self.makeFaceConcerned();
							}
							
						});

			    	}
				   	
			    	return true;
			    }
		    },this);
		}
		
        return true;
	},
	
	makeFaceConcerned:function()
	{
		var spaceHeight = (this.titleImg.y-(this.titleImg.height*this.titleImg.scale/2)) - (this.newUserButton.y+this.newUserButton.height*this.newUserButton.scale);
		this.removeChild(this.faceImg);
		this.faceImg = new cc.Sprite(res.concerned_face);
		this.faceImg.setScale(spaceHeight/2 / this.faceImg.height);
		this.faceImg.attr({
			x:cc.winSize.width/2,
			y:this.newUserButton.y+(this.newUserButton.height*this.newUserButton.scale)+spaceHeight/3,
			anchorX:.5,
			anchorY:0
		});
		this.addChild(this.faceImg);
	}
	
	///,
	//onEnter:function()
	//{
		
		/*firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function() {
			
			var bubbles = DATA.worldLevel.bubbles;
		
			var maxRow = 0;
			var bubbleData = [];
			for(var i=0; i<bubbles.length; i++)
			{
				if(bubbles[i].row > maxRow)
					maxRow = bubbles[i].row;
			}
			
			DATA.worldBubbles = bubbles;
			//DATA.setWorldQueue(DATA.worldLevel.queue);
			
			cc.director.runScene(new GameplayScene(bubbles, maxRow+1));
			
		}).catch(function(error) {
		  // Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
			  
			var email = prompt("Please enter email.", "");
			var password = prompt("Password","");
			
			
			cc.director.runScene(new SignInScene(email, password));
		  // ...
		}); 
		*/
		
	//}
	
});
var SignInScene = cc.Scene.extend({
	ctor:function(){
		this._super();
		var layer = new SignInLayer();
		this.addChild(layer);
		
	}
});
