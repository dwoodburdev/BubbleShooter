var MainContainerScene = cc.Scene.extend({
	ctor:function(editorData, database)
	{
		this._super();
		this.editorData = editorData;
		this.database = database;
	},
	
	onEnter:function()
	{
		this._super();
		var layer = new MainContainerLayer(this.editorData, this.database);
		this.addChild(layer);
		
	}
	
	/*ctor:function(bubbles, maxRow){
		this._super();
		this.bubbles = bubbles;
		this.maxRow = maxRow;
	},
	onEnter:function(){
		this._super();
		var layer = new MainContainerLayer(this.bubbles, this.maxRow);
		this.addChild(layer);
	}*/
});
