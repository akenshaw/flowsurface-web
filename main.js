import { FlowFieldEffect } from "./flowFieldEffect.js";

document.getElementById('btn2').addEventListener('click', showMenu);
document.getElementById('btn3').addEventListener('click', terminateCanvas);
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
  canvas = document.getElementById("canvas1");
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

function terminateCanvas() {
  enableAllButtons();

  if (activeCanvasId === 1) {
    cancelAnimationFrame(flowField.flowFieldAnimation);
    activeCanvasId = 0;
  } 
  else if (activeCanvasId === 2) {
    console.log("Canvas 2 terminated");
    activeCanvasId = 0;
  }
  else if (activeCanvasId === 3) {
    console.log("Canvas 3 terminated");
    activeCanvasId = 0;
  }
  else if (activeCanvasId === 4) {
    console.log("Canvas 4 terminated");
    activeCanvasId = 0;
  }    

  else if (activeCanvasId === 0) {
    console.log("No active canvas");
    return;
  }
  
  let oldCanvas = document.getElementById('canvas1');
  oldCanvas.parentNode.removeChild(oldCanvas);
}

function showMenu() {
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}
function startCanvas1() {
  showMenu();
  terminateCanvas();

  let newCanvas = document.createElement("canvas");
  newCanvas.id = "canvas1";

  tableBtn1.disabled = true;

  document.body.appendChild(newCanvas);
  canvas = document.getElementById("canvas1");
  ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  activeCanvasId = 1;
  flowField.animate(0);
}
function startCanvas2() {
  showMenu();
  terminateCanvas();
  console.log("Initiating Canvas 2");
}
function startCanvas3() {
  showMenu();
  terminateCanvas();
  console.log("Initiating Canvas 3");
}
function startCanvas4() {
  showMenu();
  terminateCanvas();
  console.log("Initiating Canvas 4");
}