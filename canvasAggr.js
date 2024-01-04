export class CanvasController {
    #zoomLevel = 1;
    #canvas1;
    #canvas2;
    #canvas3;
    #socket;
    constructor(ctx, width, height, ctx2, width2, height2, ctx3, width3, height3) {
        this.#canvas1 = new Canvas1(this, ctx, width, height);
        this.#canvas2 = new Canvas2(this, ctx2, width2, height2);
        //this.#canvas3 = new Canvas3(this, ctx3, width3, height3);

        this.#socket = new WebSocket('wss://fstream.binance.com/stream?streams=btcusdt@kline_1m');
        this.#socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            this.#canvas1.updateData(data.data);
            this.#canvas2.updateData(data.data);
            //this.#canvas3.updateTimeline(data.data);
        };
    }
}

class Canvas1 {
    #controller;
    #ctx;
    #width;
    #height;
    #dataPoints = [];
    #currentDataPoint;
    #lastOpenPrice;
    #yMin;
    #yMax;
    #rectangleWidth = 60;
    #minuteWidth;
    constructor(controller, ctx, width, height) {
        this.#controller = controller;
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#minuteWidth = (1 * 60 * 1000) / (30 * 60 * 1000) * (this.#width - this.#rectangleWidth);
    }

    updateData(data) {
        const { k: { t: startTime, T: endTime, o: openPrice, h: highPrice, l: lowPrice, c: closePrice } } = data;

        this.#yMin = this.#lastOpenPrice * 0.997;
        this.#yMax = this.#lastOpenPrice * 1.003;
        if (lowPrice < this.#yMin) { this.#yMin = lowPrice; };
        if (highPrice > this.#yMax) { this.#yMax = highPrice; };
        
        if (this.#lastOpenPrice !== openPrice) {
            if (this.#currentDataPoint) {
                this.#dataPoints.push(this.#currentDataPoint); 

                if (this.#dataPoints.length > 60) { this.#dataPoints.shift(); }
            }
            this.#lastOpenPrice = openPrice;
        }
        this.#currentDataPoint = { startTime, endTime, openPrice, highPrice, lowPrice, closePrice };
        this.drawLine();
    }    
    drawLine() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
    
        if (this.#dataPoints.length > 0) {
            const leftmostTime = this.#currentDataPoint.startTime - 30 * 60 * 1000; // Current time minus 30 minutes
    
            this.#dataPoints.forEach((data, index) => {
                const x = (data.startTime - leftmostTime) / (30 * 60 * 1000) * (this.#width - this.#rectangleWidth);
                this.drawDataPoint(data, x);
            });
        }
        this.drawDataPoint(this.#currentDataPoint, this.#width - this.#rectangleWidth);
    }                      
    drawDataPoint(data, x) {
        //console.log("drawing at " + x, data)
        const scaleFactor = this.#height / (this.#yMax - this.#yMin);
        
        const yOpen = this.#height - (data.openPrice - this.#yMin) * scaleFactor;
        const yHigh = this.#height - (data.highPrice - this.#yMin) * scaleFactor;
        const yLow = this.#height - (data.lowPrice - this.#yMin) * scaleFactor;
        const yClose = this.#height - (data.closePrice - this.#yMin) * scaleFactor;
        
        this.drawLineAt(x, yHigh, '#c8c8c8');
        this.drawLineAt(x, yLow, '#c8c8c8');
        this.drawLineAt(x, yOpen, 'yellow');     
        this.drawLineAt(x, yClose, '#C0504E');
    }
    drawLineAt(x, y, color) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + this.#minuteWidth, y);
        this.#ctx.strokeStyle = color;
        this.#ctx.stroke();
    }    
}

class Canvas2 {
    #controller;
    #ctx;
    #width;
    #height;
    #data = [];
    constructor(controller, ctx, width, height) {
        this.#controller = controller;
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
    }
    updateData(data) {
        const { k: { o: openPrice, h: highPrice, l: lowPrice, c: closePrice } } = data;
        this.#data = { openPrice, highPrice, lowPrice, closePrice };
        this.drawLine();
    }
    drawLine() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);

        let yMin = this.#data.openPrice * 0.997;
        let yMax = this.#data.openPrice * 1.003;
        if (this.#data.lowPrice < yMin) { yMin = this.#data.lowPrice; };
        if (this.#data.highPrice > yMax) { yMax = this.#data.highPrice; };
        const scaleFactor = this.#height / (yMax - yMin);
        
        const yClose = this.#height - (this.#data.closePrice - yMin) * scaleFactor;
        
        this.drawTextAt(yClose, this.#data.closePrice, '#C0504E');
        this.drawTextAt(this.#height - 20, Math.round(yMin), '#c8c8c8');
        this.drawTextAt(20, Math.round(yMax), '#c8c8c8');
    }     
    drawTextAt(y, text, color) {
        this.#ctx.font = '14px monospace';
        this.#ctx.fillStyle = color;
        this.#ctx.fillText(text, 10, y);
    }
}

class Canvas3 {
    #controller;
    #ctx;
    #width;
    #height;
    #lastUpdateTime;
    #cellWidth;
    constructor(controller, ctx, width, height) {
        this.#controller = controller;
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#cellWidth = this.#width / 60;
    }

    updateTimeline(data) {
        const { E: EventTime, k: { t: startTime, T: endTime } } = data;

        const cellTime = (endTime - startTime) / 2; // Time represented by each cell
        for (let i = 0; i < 120; i++) {
            const x = i * this.#cellWidth;
            this.drawLine(x, 0, x, this.#height/2); 
            // Draw time label every 2 cells (1 minute)
            if (i % 2 === 0) {
                const time = new Date(startTime + i * cellTime);
                this.drawTimeLabel(x, this.#height/2 + 20, time);
            }
        }
    }

    drawLine(x1, y1, x2, y2) {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);

        this.#ctx.beginPath();
        this.#ctx.moveTo(x1, y1);
        this.#ctx.lineTo(x2, y2);
        this.#ctx.strokeStyle = '#c8c8c8';
        this.#ctx.stroke();
    }

    drawTimeLabel(x, y, time) {
        this.#ctx.fillStyle = '#c8c8c8';
        this.#ctx.fillText(time.toISOString().substr(11, 5), x, y); // Format time as HH:mm
    }
}
