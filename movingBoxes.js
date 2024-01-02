export class movingBoxes {
    flowFieldAnimation;
    #ctx;
    #width;
    #height;
    #rectangles = [];
    #cellSize = 15;
    #interval = 10; 
    #zoomLevel = 1;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#ctx.strokeStyle = "#C8C8C8";
        this.#ctx.lineWidth = 1;
        
        this.#width = width;
        this.#height = height;
                
        this.lastTime = 0;
        this.timer = 0;

        this.#ctx.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            let newZoomLevel = this.#zoomLevel * Math.pow(1.1, e.deltaY > 0 ? -1 : 1);
            if (newZoomLevel >= 1 && newZoomLevel <= 4) {
                this.#zoomLevel = newZoomLevel;
            }
        });
    }    
    #drawRectangle(rectangle) {
        this.#ctx.beginPath();
        this.#ctx.rect(rectangle.x, this.#height - rectangle.y - rectangle.height, this.#cellSize * this.#zoomLevel * 2, rectangle.height);
        this.#ctx.stroke();
    
        rectangle.cells.forEach((cell, i) => {
            if (cell.left) {
                this.#ctx.fillStyle = cell.left;
                this.#ctx.fillRect(rectangle.x, this.#height - rectangle.y - (i+1) * this.#cellSize, this.#cellSize * this.#zoomLevel, this.#cellSize);
                if (this.#zoomLevel >= 3) {
                    this.#ctx.fillStyle = 'white';
                    this.#ctx.textBaseline = 'middle';
                    this.#ctx.fillText(cell.left.slice(-4, -1), rectangle.x, this.#height - rectangle.y - (i+1) * this.#cellSize + this.#cellSize / 2);
                }
            }
            if (cell.right) {
                this.#ctx.fillStyle = cell.right;
                this.#ctx.fillRect(rectangle.x + this.#cellSize * this.#zoomLevel, this.#height - rectangle.y - (i+1) * this.#cellSize, this.#cellSize * this.#zoomLevel, this.#cellSize);
                if (this.#zoomLevel >= 3) {
                    this.#ctx.fillStyle = 'white';
                    this.#ctx.textBaseline = 'middle';
                    this.#ctx.fillText(cell.right.slice(-4, -1), rectangle.x + this.#cellSize * this.#zoomLevel, this.#height - rectangle.y - (i+1) * this.#cellSize + this.#cellSize / 2);
                }
            }
        });
    }    
    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.#interval * 1000) {
    
            const height = Math.random() * this.#height;
            const startY = Math.random() * (this.#height - height);
            const numCells = Math.floor(height / this.#cellSize);
            const cells = Array(numCells).fill().map(() => {
                const size = Math.random();
                return {
                    left: size < 0.5 ? `rgba(192, 80, 78, ${size * 2})` : null,
                    right: size < 0.5 ? null : `rgba(81, 205, 160, ${size * 2 - 1})`
                };
            });            
            this.#rectangles.push({x: this.#width, y: startY, height: height, cells: cells});
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        if (this.timer % 1000 < deltaTime) {
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            for (let rectangle of this.#rectangles) {
                rectangle.x -= this.#cellSize * 2; 
                this.#drawRectangle(rectangle);
            }
        }
        this.movingBoxes = requestAnimationFrame(this.animate.bind(this));
    }         
}

export class deltaBoxes {
    flowFieldAnimation;
    #ctx;
    #width;
    #height;
    #rectangles = [];
    #cellSize = 20;
    #interval = 10; 
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#ctx.strokeStyle = "#C8C8C8";
        this.#ctx.lineWidth = 1;
        
        this.#width = width;
        this.#height = height;
                
        this.lastTime = 0;
        this.timer = 0;
    }

    #drawRectangle(rectangle) {
        this.#ctx.beginPath();
        this.#ctx.rect(rectangle.x, this.#height - rectangle.height, this.#cellSize, rectangle.height);
        this.#ctx.stroke();
    
        // Draw the colored cells
        rectangle.cells.forEach((color, i) => {
            if (color) {
                this.#ctx.fillStyle = color;
                this.#ctx.fillRect(rectangle.x, this.#height - (i+1) * this.#cellSize, this.#cellSize, this.#cellSize);
            }
        });
    }
    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.#interval * 1000) {
            // create a new rectangle
            const height = Math.random() * this.#height;
            const numCells = Math.floor(height / this.#cellSize);
            const cells = Array(numCells).fill().map(() => {
                const rand = Math.random();
                if (rand < 1/3) {
                    return '#C0504E';
                } else if (rand < 2/3) {
                    return '#51CDA0';
                } else {
                    return null;
                }
            });
            this.#rectangles.push({x: this.#width, height: height, cells: cells});
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        // Only clear and redraw the canvas every second
        if (this.timer % 1000 < deltaTime) {
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            for (let rectangle of this.#rectangles) {
                rectangle.x -= this.#cellSize; // move the rectangle one cell to the left
                this.#drawRectangle(rectangle);
            }
        }
        this.movingBoxes = requestAnimationFrame(this.animate.bind(this));
    }   
}

