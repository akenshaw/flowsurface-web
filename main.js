import { CanvasController } from "./CanvasAggr.js";

const buttons = ['btn1', 'btn2', 'btn3', 'btn4', 'tbl-btn1'];
const functions = [showTickers, showMenu, showSettings];

for (let i = 0; i < buttons.length; i++) {
  document.getElementById(buttons[i]).addEventListener('click', functions[i]);
}

const menus = ['settings-menu', 'menu']
  .map(id => document.querySelector(`#${id}`));

const tableBtns = ['tbl-btn1']
  .map(id => document.querySelector(`#${id}`));

let canvas; 
let ctx;
let currentAnimation;
let activeCanvasId = 0;
window.onload = function() {
  console.log("load");
}
window.addEventListener("resize", function() {
  console.log("resize");
});

function enableAllButtons() {
  tableBtns.forEach(btn => btn.disabled = false);
  menus.forEach(menu => menu.style.display = "none");
}

function showTickers() {
  console.log("tickers");
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

function startCanvas() {
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
  new CanvasController(ctx, canvas.width, canvas.height, ctxRight, canvasRight, canvasRight.width, canvasRight.height, ctxBottom, canvasBottom, canvasBottom.width, canvasBottom.height);
}