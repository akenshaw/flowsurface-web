let canvas; 
let ctx;
let flowField;
let flowFieldAnimation;
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
    
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
}

window.addEventListener("resize", function() {
    this.cancelAnimationFrame(flowFieldAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
});

const mouse = { x: 0, y: 0};
window.addEventListener("mousemove", function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

class FlowFieldEffect {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#ctx.strokeStyle = "#C8C8C8";
        this.#ctx.lineWidth = 1;
        
        this.#width = width;
        this.#height = height;
                
        this.lastTime = 0;
        this.interval = 1000/60;
        this.timer = 0;

        this.cellSize = 15;
        this.gradient;

        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient;
        this.radius = 0;
        this.vr = 0.03;

        activeCanvasId = 1;
        tableBtn1.disabled = true;
    }
    #createGradient() {
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop(0, "#ADD8E6");
        this.gradient.addColorStop(0.25, "#77DD77");
        this.gradient.addColorStop(0.5, "#F5F5DC");
        this.gradient.addColorStop(0.75, "#E6E6FA");
        this.gradient.addColorStop(1, "#FFD1DC");
    }
    #drawLine(angle, x, y) {
        let positionX = x;
        let positionY = y;
        let dx = mouse.x - positionX;
        let dy = mouse.y - positionY;
        let distance = dx*dx + dy*dy;

        if (distance > 600000) { distance = 600000; }
        else if (distance < 50000) { distance = 50000; }
        let length = distance/10000;

        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + Math.cos(angle)*length, y + Math.sin(angle)*length);
        this.#ctx.stroke();
    }
    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval) {
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            
            this.radius += this.vr;
            if (this.radius > 5 || this.radius < -5) { this.vr *= -1; }
            
            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize) {
                    const angle = (Math.cos(mouse.x * x * 0.00001) + Math.sin(mouse.y * y * 0.00001)) * this.radius;
                    this.#drawLine(angle, x, y);
                }
            }            
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}

function enableAllButtons() {
    tableBtn1.disabled = false;
    tableBtn2.disabled = false;
    tableBtn3.disabled = false;
    tableBtn4.disabled = false;
}

function terminateCanvas() {
    if (activeCanvasId === 1) {
        this.cancelAnimationFrame(flowFieldAnimation);
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

    document.body.appendChild(newCanvas);
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
}
function startCanvas2() {
    showMenu();
    terminateCanvas();
    console.log("Initiating Canvas 2");
    enableAllButtons();
}
function startCanvas3() {
    showMenu();
    terminateCanvas();
    console.log("Initiating Canvas 3");
    enableAllButtons();
}
function startCanvas4() {
    showMenu();
    terminateCanvas();
    console.log("Initiating Canvas 4");
    enableAllButtons();
}