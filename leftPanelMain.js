//var canvasLeft = document.getElementById("leftCanvas")
//var leftCtx = canvasLeft.getContext("2d");

//var height = window.innerHeight;
//var width = (window.innerWidth - window.innerHeight*(750/1334))*.5;

var canvasB = document.getElementById("leftCanvas");
canvasB.width = (window.innerWidth - (window.innerHeight * (750/1334)) )*.5;
canvasB.height = window.innerHeight;
var leftCtx = canvasB.getContext("2d");
leftCtx.fillStyle = "white";
leftCtx.fillRect(0,0,canvasB.width, canvasB.height);

var profImage = new Image();
profImage.src = "res/dummy-prof-pic.jpg";


this.bubbleImages = [];
this.obstacleImagesA = [];
this.obstacleImagesB = [];
var bubbleImageSources = ["angry-face.png","smile-face.png","alien-face.png","sad-face.png","love-face.png","evil-face.png"];
var obstacleImageSourcesA = ["black-circle.png","black-circle.png","black-circle.png","black-circle.png","black-circle.png","black-circle.png"];
var obstacleImageSourcesB = ["black-circle.png","black-circle.png","black-circle.png","black-circle.png","black-circle.png","black-circle.png"];

var bubWidth = canvasB.width/8;

for(var i=0; i<bubbleImageSources.length; i++)
{
	this.bubbleImages.push(new Image());
	this.bubbleImages[i].src = "res/"+bubbleImageSources[i];
}
for(var i=0; i<obstacleImageSourcesA.length; i++)
{
	this.obstacleImagesA.push(new Image());
	this.obstacleImagesA[i].src = "res/"+obstacleImageSourcesA[i];
}
for(var i=0; i<obstacleImageSourcesB.length; i++)
{
	this.obstacleImagesB.push(new Image());
	this.obstacleImagesB[i].src = "res/"+obstacleImageSourcesB[i];
}

canvasB.addEventListener("click", getClickPositionA, false);

this.draw = function()
{
	leftCtx.fillStyle = "black";
	leftCtx.font = "40px Arial";
	//leftCtx.fillText("Your Emojis", canvasB.width/2 - (leftCtx.measureText("Emoji Pop").width/2), 40);
	leftCtx.drawImage(profImage, 10, 10, bubWidth, bubWidth);
	
	leftCtx.font = "20px Arial";
	leftCtx.fillText("Dylan Woodbury", 65, 10+20);
	leftCtx.font = "12px Arial";
	leftCtx.fillText("Level 1", 65, 60 - 12)
	
	leftCtx.strokeStyle = "black";
	leftCtx.lineWidth = 1;
	leftCtx.strokeRect(65+leftCtx.measureText("Level 1").width + 2, 60-12 - 10, bubWidth*4.5, 10);
	
	leftCtx.fillText("0 / 10", 65+leftCtx.measureText("Level 1").width + 2 + bubWidth*2.25 - leftCtx.measureText("0 / 10").width, 60);
	
	for(var i=0; i<this.bubbleImages.length; i++)
	{
		leftCtx.drawImage(this.bubbleImages[i], (canvasB.width-(6*bubWidth))/2 + bubWidth*i, 70, bubWidth, bubWidth);
	}	
	for(var i=0; i<this.obstacleImagesA.length; i++)
	{
		leftCtx.drawImage(this.obstacleImagesA[i], (canvasB.width-(6*bubWidth))/2 + bubWidth*i, 70+bubWidth, bubWidth, bubWidth);
	}
	for(var i=0; i<this.obstacleImagesB.length; i++)
	{
		leftCtx.drawImage(this.obstacleImagesB[i], (canvasB.width-(6*bubWidth))/2 + bubWidth*i, 70+bubWidth*2, bubWidth, bubWidth);
	}
	
	leftCtx.strokeStyle = "black";
	leftCtx.lineWidth = 3;
	leftCtx.strokeRect( (canvasB.width-(6*bubWidth))/2 - bubWidth*.25, 70+bubWidth*3 + bubWidth*.25, 
						bubWidth*6.5, bubWidth*2.5);
	
	leftCtx.strokeStyle = "black";
	leftCtx.lineWidth = 3;
	leftCtx.strokeRect( (canvasB.width-(6*bubWidth))/2 - bubWidth*.25, 70+bubWidth*3 + bubWidth*.25 + bubWidth*2.5, 
						bubWidth*6.5, bubWidth*2);
	
	//leftCtx.strokeStyle = "black";
	//leftCtx.lineWidth = 3;
	//leftCtx.strokeRect( (canvasB.width-(6*bubWidth))/2 - bubWidth*.25, 70+bubWidth*3 + bubWidth*.25 + bubWidth*2.5 + bubWidth, 
	//					bubWidth*6.5, bubWidth*2.5);
};
this.draw();

function getClickPositionA(e)
{
	var xPos = e.clientX;
	var yPos = e.clientY;
	
	console.log("LEFT CANVAS CLICK AT   " + xPos + "   " + yPos);
	var curScene = cc.director.getRunningScene().children[0];
	
	var xBubStart = (canvasB.width-(6*bubWidth))/2
	if(xPos > xBubStart  &&  xPos < xBubStart + bubWidth*6)
	{
		if(yPos > 70 && yPos < 70+bubWidth)
		{
			var bubIndex = Math.floor( (xPos - xBubStart) / bubWidth);console.log(bubIndex);
			if(bubIndex == 0)
			{
				curScene.drawType = 0;
				curScene.drawColor = "red";
			}
			else if(bubIndex == 1)
			{
				curScene.drawType = 0;
				curScene.drawColor = "yellow";
			}
			else if(bubIndex == 2)
			{
				curScene.drawType = 0;
				curScene.drawColor = "green";
			}
			else if(bubIndex == 3)
			{
				curScene.drawType = 0;
				curScene.drawColor = "blue";
			}
			else if(bubIndex == 4)
			{
				curScene.drawType = 0;
				curScene.drawColor = "pink";
			}
			else if(bubIndex == 5)
			{
				curScene.drawType = 0;
				curScene.drawColor = "purple";
			}
			
		}
	}
	
}
