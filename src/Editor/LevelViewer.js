
var LevelViewer = cc.Layer.extend({
	
///////////////////////////////////////////////////////////	
// 1. Level Initialization
//	-ctor()
//	-onEnter()
//	-initLevel()
	
	ctor:function(width, height){
		this._super();
		
		this.width = width;
		this.height = height;
		
		
		
		
		var dn = new cc.DrawNode();
		this.addChild(dn);
		this.draw = function(){
			dn.drawRect(cc.p(0,0), cc.p(this.width,this.height), cc.color(255,255,255,255), 1, cc.color(0,0,0,255));
			
		};
		this.draw();
		
		
	},
	

	onTouchBegin:function(loc){
		
			
   	},
	onTouchMoved:function(loc){
		
	},
	onTouchEnded:function(loc){
		
	}
});
	