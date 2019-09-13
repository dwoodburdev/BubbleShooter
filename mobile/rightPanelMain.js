//var canvasLeft = document.getElementById("leftCanvas")
//var leftCtx = canvasLeft.getContext("2d");

//var height = window.innerHeight;
//var width = (window.innerWidth - window.innerHeight*(750/1334))*.5;

var canvasC = document.getElementById("rightCanvas");
canvasC.width = (window.innerWidth - (window.innerHeight * (750/1334)) )*.5;
canvasC.height = window.innerHeight;
var rightCtx = canvasC.getContext("2d");
rightCtx.fillStyle = "red";
rightCtx.fillRect(0,0,canvasC.width, canvasC.height);


rightCtx.fillStyle = "purple";
rightCtx.fillRect(canvasC.width/4, canvasC.height/4, canvasC.width/2, canvasC.height/2);

rightCtx.fillStyle = "black";
rightCtx.fillRect(0,0,100,100);


canvasC.addEventListener("click", getClickPosition, false);

function getClickPosition(e)
{
	var xPos = e.clientX;
	var yPos = e.clientY;
	
	console.log("RIGHT CANVAS CLICK AT   " + xPos + "   " + yPos);
	
	//if(xPos > canvasC.x && xPos < (canvasC.x+canvasC.width) 
	//&& yPos > canvasC.y && yPos < (canvasC.y+canvasC.height))
	//{
		colorSquare();
	//}
}

function colorSquare()
{
	var colors = ["red","orange","yellow","green","blue","pink","purple"];
	rightCtx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
	rightCtx.fillRect(canvasC.width/4, canvasC.height/4, canvasC.width/2, canvasC.height/2);
}
