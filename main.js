import { FlowFieldEffect, FlowFieldEffect2 } from "./flowFieldEffect.js";
import { movingBoxes, deltaBoxes } from "./movingBoxes.js";

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

    let oldCanvas = document.querySelector("#canvas1")
    if (oldCanvas != null) {
      oldCanvas.parentNode.removeChild(oldCanvas);
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
  
	let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";

  document.body.appendChild(newCanvas);
  canvas = document.querySelector("#canvas1")
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  currentAnimation = new movingBoxes(ctx, canvas.width, canvas.height);
  currentAnimation.animate(0);  
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