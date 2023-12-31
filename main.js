import { FlowFieldEffect, FlowFieldEffect2 } from "./flowFieldEffect.js";

document.getElementById('btn2').addEventListener('click', showMenu);
document.getElementById('btn3').addEventListener('click', startBlankCanvas);
document.getElementById('tbl-btn1').addEventListener('click', startCanvas1);
document.getElementById('tbl-btn2').addEventListener('click', startCanvas2);
document.getElementById('tbl-btn3').addEventListener('click', startCanvas3);
document.getElementById('tbl-btn4').addEventListener('click', startCanvas4);

let canvas; 
let ctx;
let flowField;
let activeCanvasId = 0;

const menu = document.querySelector("#menu")

const tableBtn1 = document.querySelector("#tbl-btn1")
const tableBtn2 = document.querySelector("#tbl-btn2")
const tableBtn3 = document.querySelector("#tbl-btn3")
const tableBtn4 = document.querySelector("#tbl-btn4")

window.onload = function() {
  canvas = document.querySelector("#canvas1")
  ctx = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  tableBtn1.disabled = true;
  
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  activeCanvasId = 1;
  flowField.animate(0);
}

window.addEventListener("resize", function() {
  cancelAnimationFrame(flowField.flowFieldAnimation);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  activeCanvasId = 1;
  flowField.animate(0);
});

function enableAllButtons() {
  tableBtn1.disabled = false;
  tableBtn2.disabled = false;
  tableBtn3.disabled = false;
  tableBtn4.disabled = false;
}
function showMenu() {
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

function terminateCanvas() {
	showMenu();
  enableAllButtons();

	cancelAnimationFrame(flowField.flowFieldAnimation);
	
	let oldCanvas = document.querySelector("#canvas1")
	oldCanvas.parentNode.removeChild(oldCanvas);
}

function startCanvas1() {
  terminateCanvas();

  tableBtn1.disabled = true;

  let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";

  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  activeCanvasId = 1;
  flowField.animate(0);
}
function startCanvas2() {
  terminateCanvas();

  tableBtn2.disabled = true;

  let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";

  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  flowField = new FlowFieldEffect2(ctx, canvas.width, canvas.height);
  activeCanvasId = 2;
  flowField.animate(0);
}
function startCanvas3() {
  terminateCanvas();

  tableBtn3.disabled = true;
  
	let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";

  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  activeCanvasId = 3;
}
function startCanvas4() {
	terminateCanvas();

  tableBtn4.disabled = true;
  let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";

  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

	activeCanvasId = 4;
}
function startBlankCanvas() {
	enableAllButtons();
	let oldCanvas = document.querySelector("#canvas1")
	oldCanvas.parentNode.removeChild(oldCanvas);

	let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";

  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")

	canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx = canvas.getContext("2d");

	ctx.lineCap = 'round';

	//const colorPicker = document.querySelector( '.js-color-picker');

	//colorPicker.addEventListener( 'change', event => {
	//		context.strokeStyle = event.target.value; 
	//} );
	ctx.strokeStyle = '#C8C8C8';

	//const lineWidthRange = document.querySelector( '.js-line-range' );
	//const lineWidthLabel = document.querySelector( '.js-range-value' );

	//lineWidthRange.addEventListener( 'input', event => {
	//		const width = event.target.value;
	//		lineWidthLabel.innerHTML = width;
	//		context.lineWidth = width;
	//} );
	ctx.lineWidth = 10;

	let x = 0, y = 0;
	let isMouseDown = false;

	const stopDrawing = () => { isMouseDown = false; }
	const startDrawing = event => {
		isMouseDown = true;   
		[x, y] = [event.offsetX, event.offsetY];  
	}
	const drawLine = event => {
			if ( isMouseDown ) {
					const newX = event.offsetX;
					const newY = event.offsetY;
					ctx.beginPath();
					ctx.moveTo( x, y );
					ctx.lineTo( newX, newY );
					ctx.stroke();
					//[x, y] = [newX, newY];
					x = newX;
					y = newY;
			}
	}

	canvas.addEventListener( 'mousedown', startDrawing );
	canvas.addEventListener( 'mousemove', drawLine );
	canvas.addEventListener( 'mouseup', stopDrawing );
	canvas.addEventListener( 'mouseout', stopDrawing );
}