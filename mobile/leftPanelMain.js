//var canvasLeft = document.getElementById("leftCanvas")
//var leftCtx = canvasLeft.getContext("2d");

//var height = window.innerHeight;
//var width = (window.innerWidth - window.innerHeight*(750/1334))*.5;

var canvasB = document.getElementById("leftCanvas");
canvasB.width = (window.innerWidth - (window.innerHeight * (750/1334)) )*.5;
canvasB.height = window.innerHeight;
var leftCtx = canvasB.getContext("2d");
leftCtx.fillStyle = "blue";
leftCtx.fillRect(0,0,canvasB.width, canvasB.height);


leftCtx.fillStyle = "green";
leftCtx.fillRect(canvasB.width/4, canvasB.height/4, canvasB.width/2, canvasB.height/2);

leftCtx.fillStyle = "pink";
leftCtx.fillRect(0,0,100,100);

canvasB.addEventListener("click", getClickPositionA, false);

function getClickPositionA(e)
{
	var xPos = e.clientX;
	var yPos = e.clientY;
	
	console.log("LEFT CANVAS CLICK AT   " + xPos + "   " + yPos);
	
	//if(xPos > canvasB.x && xPos < (canvasB.x+canvasB.width) 
	//&& yPos > canvasB.y && yPos < (canvasB.y+canvasB.height))
	//{
		colorSquareA();
	//}
}

function colorSquareA()
{
	var colors = ["red","orange","yellow","green","blue","pink","purple"];
	leftCtx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
	leftCtx.fillRect(canvasB.width/4, canvasB.height/4, canvasB.width/2, canvasB.height/2);
}