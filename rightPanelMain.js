//var canvasLeft = document.getElementById("leftCanvas")
//var leftCtx = canvasLeft.getContext("2d");

//var height = window.innerHeight;
//var width = (window.innerWidth - window.innerHeight*(750/1334))*.5;

var canvasC = document.getElementById("rightCanvas");
canvasC.width = (window.innerWidth - (window.innerHeight * (750/1334)) )*.5;
canvasC.height = window.innerHeight;
var rightCtx = canvasC.getContext("2d");
rightCtx.fillStyle = "white";
rightCtx.fillRect(0,0,canvasC.width, canvasC.height);
console.log(rightCtx.canvas.offsetLeft);
var bubWidth = canvasC.width/8;

var upArrow = new Image();
upArrow.src = "res/up-arrow.png";
var downArrow = new Image();
downArrow.src = "res/down-arrow.png";

var arrowHeight = (canvasC.width-(6*bubWidth))/2 - bubWidth*.25;

this.draw = function()
{
	rightCtx.fillStyle = "black";
	rightCtx.font = "24px Arial";
	rightCtx.fillText("Friends", ( (canvasC.width-(6*bubWidth))/2 - bubWidth*.25 ) + bubWidth*1, 40);
	//rightCtx.fillText("Trending", canvasC.width/2 - rightCtx.measureText("Trending").width/2 - 15, 40);
	rightCtx.fillText("Trends", ( (canvasC.width-(6*bubWidth))/2 - bubWidth*.25 + bubWidth*6.5 - rightCtx.measureText("Trends").width ) - bubWidth*1, 40);
	//rightCtx.fillText("Your Levels", (canvasC.width-(6*bubWidth))/2 - bubWidth*.25 + bubWidth*6.5 - rightCtx.measureText("Your Levels").width, 40);
	
	rightCtx.strokeStyle = "black";
	rightCtx.lineWidth = 1;
	
	rightCtx.strokeRect(2, 2, arrowHeight-4, canvasC.height-4);
	
	rightCtx.strokeRect( (canvasC.width-(6*bubWidth))/2 - bubWidth*.25, 50, 
						bubWidth*6.5, bubWidth*5);
	
	rightCtx.drawImage(upArrow, 0, 0, arrowHeight, arrowHeight);
	rightCtx.drawImage(downArrow, 0, canvasC.height-arrowHeight, arrowHeight, arrowHeight);
};
this.draw();

canvasC.addEventListener("click", getClickPosition, false);

function getClickPosition(e)
{
	var xPos = e.clientX;
	var yPos = e.clientY;
	xPos -= rightCtx.canvas.offsetLeft;
	
	console.log("RIGHT CANVAS CLICK AT   " + xPos + "   " + yPos);
	var curScene = cc.director.getRunningScene().children[0];
	console.log(xPos + "  within  " + downArrow.x + "  and  " + (downArrow.x+arrowHeight));
	console.log(yPos + "  within  " + downArrow.y + "  and  " + (downArrow.y+arrowHeight));
	if(xPos > upArrow.x && xPos < upArrow.x+arrowHeight && yPos > upArrow.y && yPos < upArrow.y+arrowHeight)
	{console.log("scroll up");
		curScene.bubbleLayer.scrollUp();
	}
	else if(xPos > downArrow.x && xPos < downArrow.x+arrowHeight && yPos > (canvasC.height-arrowHeight) && yPos < (canvasC.height-arrowHeight)+arrowHeight)
	{console.log("scroll down");
		curScene.bubbleLayer.scrollDown();
	}
}

