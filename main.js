import { FlowFieldEffect, FlowFieldEffect2 } from "./flowFieldEffect.js";
import { movingBoxes, deltaBoxes } from "./movingBoxes.js";
import { CanvasController } from "./CanvasAggr.js";

const buttons = ['btn2', 'btn3', 'btn4', 'tbl-btn1', 'tbl-btn2', 'tbl-btn3', 'tbl-btn4'];
const functions = [showMenu, startBlankCanvas, showSettings, startCanvas1, startCanvas2, startCanvas3, startCanvas4];

for (let i = 0; i < buttons.length; i++) {
  document.getElementById(buttons[i]).addEventListener('click', functions[i]);
}

const menus = ['settings-menu-0', 'settings-menu-1', 'settings-menu-2', 'settings-menu-3', 'settings-menu-4', 'menu']
  .map(id => document.querySelector(`#${id}`));

const tableBtns = ['tbl-btn1', 'tbl-btn2', 'tbl-btn3', 'tbl-btn4']
  .map(id => document.querySelector(`#${id}`));

let canvas; 
let ctx;
let currentAnimation;
let activeCanvasId = 0;
window.onload = function() {
  startCanvas1();
}
window.addEventListener("resize", function() {
  startCanvas1();
});

function enableAllButtons() {
  tableBtns.forEach(btn => btn.disabled = false);
  menus.forEach(menu => menu.style.display = "none");
}

function showMenu() {
  menus[5].style.display = menus[5].style.display === "none" ? "block" : "none";
}
function showSettings() {
  if (activeCanvasId >= 0 && activeCanvasId <= 4) {
    menus[activeCanvasId].style.display = menus[activeCanvasId].style.display === "none" ? "block" : "none";
  }
}

function terminateCanvas() {
  showMenu();
  enableAllButtons();

  if (currentAnimation != null) {
    cancelAnimationFrame(currentAnimation.flowFieldAnimation);

    let canvases = document.getElementsByTagName("canvas");
    while(canvases.length > 0){
      canvases[0].parentNode.removeChild(canvases[0]);
    }
  };  
}

function startCanvas1() {
  terminateCanvas();

  tableBtns[0].disabled = true;
  activeCanvasId = 1;

  let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";

  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  currentAnimation = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  currentAnimation.animate(0);
}
function startCanvas2() {
  terminateCanvas();

  tableBtns[1].disabled = true;
  activeCanvasId = 2;

  let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";

  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  currentAnimation = new FlowFieldEffect2(ctx, canvas.width, canvas.height);
  currentAnimation.animate(0);
}
function startCanvas3() {
  terminateCanvas();

  tableBtns[2].disabled = true;
  activeCanvasId = 3;
  
  // create main canvas
  let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";
  newCanvas.style.position = "absolute";
  newCanvas.style.left = "0px";
  newCanvas.style.top = "0px";

  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth * 0.9; 
  canvas.height = window.innerHeight * 0.9;

  // create right canvas
  let newCanvasRight = document.createElement("canvas");
  newCanvasRight.id = "canvas2";
  newCanvasRight.style.position = "absolute";
  newCanvasRight.style.left = canvas.width + "px"; 

  document.body.appendChild(newCanvasRight);
  let canvasRight = document.querySelector("#canvas2")
  let ctxRight = canvasRight.getContext("2d");
  canvasRight.width = window.innerWidth * 0.1;
  canvasRight.height = window.innerHeight * 0.9;

  // create bottom canvas
  let newCanvasBottom = document.createElement("canvas");
  newCanvasBottom.id = "canvas3";
  newCanvasBottom.style.position = "absolute";
  newCanvasBottom.style.left = "0px";
  newCanvasBottom.style.top = canvas.height + "px";

  document.body.appendChild(newCanvasBottom);
  let canvasBottom = document.querySelector("#canvas3")
  let ctxBottom = canvasBottom.getContext("2d");
  canvasBottom.width = canvas.width; 
  canvasBottom.height = window.innerHeight * 0.1; 

  // create controller
  new CanvasController(ctx, canvas.width, canvas.height, ctxRight, canvasRight.width, canvasRight.height, ctxBottom, canvasBottom.width, canvasBottom.height);
}
function startCanvas4() {
	terminateCanvas();

  tableBtns[3].disabled = true;
  activeCanvasId = 4;

  let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";

  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  currentAnimation = new deltaBoxes(ctx, canvas.width, canvas.height);
  currentAnimation.animate(0);  
}

// drawing at blank canvas
const colorPicker = document.querySelector("#settings-menu-0 > input.js-color-picker.color-picker")
const lineWidthRange = document.querySelector("#settings-menu-0 > input.js-line-range")
const lineWidthLabel = document.querySelector("#settings-menu-0 > label")
const eraserButton = document.querySelector("#settings-menu-0 > input.js-eraser-button")

const changeColor = event => { ctx.strokeStyle = event.target.value; };
const changeLineWidth = event => {
  const width = event.target.value;
  lineWidthLabel.innerHTML = width;
  ctx.lineWidth = width;
};
colorPicker.addEventListener('change', changeColor);
lineWidthRange.addEventListener('input', changeLineWidth);

function startBlankCanvas() { 
  activeCanvasId = 0;

  let isErasing = false;
  colorPicker.value = '#C8C8C8'; 
  lineWidthRange.value = '1'; 
  lineWidthLabel.innerHTML = '1';
  eraserButton.checked = false;

	enableAllButtons();
	terminateCanvas();

	let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";
  
  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")
	canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx = canvas.getContext("2d");
	ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;
  
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

  eraserButton.addEventListener('click', () => {
    isErasing = !isErasing; 

    if (isErasing) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = lineWidthRange.value*4;
    } else {
      ctx.globalCompositeOperation = 'source-over';
  
      ctx.lineWidth = lineWidthRange.value*4;
      ctx.strokeStyle = colorPicker.value;
    }
  });
}