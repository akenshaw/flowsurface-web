export class CanvasController {
    #zoomLevel = 1;
    #canvas1;
    #canvas2;
    #canvas3;
    #socket;
    #aggTradesBuffer = [];
    constructor(ctx, width, height, ctx2, width2, height2, ctx3, width3, height3) {
        this.#canvas1 = new Canvas1(this, ctx, width, height);
        this.#canvas2 = new Canvas2(this, ctx2, width2, height2);
        //this.#canvas3 = new Canvas3(this, ctx3, width3, height3);

        this.#socket = new WebSocket('wss://fstream.binance.com/stream?streams=btcusdt@kline_1m/btcusdt@aggTrade');
        this.#socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.stream.endsWith('@aggTrade')) {
                this.#aggTradesBuffer.push({
                    x: message.data.T,
                    y: parseFloat(message.data.p),
                    q: parseFloat(message.data.q),
                    m: message.data.m,
                });

            } else if (message.stream.endsWith('@kline_1m')) {
                this.#canvas1.updateData(message.data, this.#aggTradesBuffer);
                this.#canvas2.updateData(message.data);
                //this.#canvas3.updateTimeline(message.data);
                this.#aggTradesBuffer = [];
            };
        };
    }
}

class Canvas1 {
    #controller;
    #ctx;
    #width;
    #height;
    #dataPoints = [];
    #klinesTrades = [];
    #currentDataPoint;
    #currentKlineTrades = [];
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

    updateData(kline, aggTrades) {
        const { k: { t: startTime, T: endTime, o: openPrice, h: highPrice, l: lowPrice, c: closePrice } } = kline;

        this.#yMin = this.#lastOpenPrice * 0.997;
        this.#yMax = this.#lastOpenPrice * 1.003;
        if (lowPrice < this.#yMin) { this.#yMin = lowPrice; };
        if (highPrice > this.#yMax) { this.#yMax = highPrice; };
        
        if (this.#lastOpenPrice !== openPrice) {
            if (this.#currentDataPoint) {
                this.#dataPoints.push(this.#currentDataPoint); 
                this.#klinesTrades.push(this.#currentKlineTrades);

                if (this.#dataPoints.length > 60) { this.#dataPoints.shift(); }
                this.#currentKlineTrades = [];
            }
            this.#lastOpenPrice = openPrice;
        }
        this.#currentDataPoint = { startTime, endTime, openPrice, highPrice, lowPrice, closePrice };
        this.#currentKlineTrades.push(aggTrades);
        this.drawStart();
    }    
    drawStart() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
    
        if (this.#dataPoints.length > 0) {
            const leftmostTime = this.#currentDataPoint.startTime - 30 * 60 * 1000; // Current time minus 30 minutes
    
            this.#dataPoints.forEach((data, index) => {
                const trades = this.#klinesTrades[index];
                const x = (data.startTime - leftmostTime) / (30 * 60 * 1000) * (this.#width - this.#rectangleWidth);
                this.drawDataPoint(trades, data, x);
            });
        }
        this.drawDataPoint(this.#currentKlineTrades, this.#currentDataPoint, this.#width - this.#rectangleWidth);
    }                        
    drawDataPoint(trades, kline, x) {
        const scaleFactor = this.#height / (this.#yMax - this.#yMin);
        
        // draw trades
        trades.forEach((trade) => {
            trade.forEach((aggTrade) => {
                const yTradePrice = this.#height - (aggTrade.y - this.#yMin) * scaleFactor;
                if (aggTrade.q < 0.01) {
                    this.drawTradesAt(x, yTradePrice, aggTrade.m, 0.05);
                } else if (aggTrade.q < 0.1) {
                    this.drawTradesAt(x, yTradePrice, aggTrade.m, 0.10);
                } else if (aggTrade.q < 1) {
                    this.drawTradesAt(x, yTradePrice, aggTrade.m, 0.25);
                } else if (aggTrade.q < 10) {
                    this.drawTradesAt(x, yTradePrice, aggTrade.m, 0.5);
                } else if (aggTrade.q < 100) {
                    this.drawTradesAt(x, yTradePrice, aggTrade.m, 0.9);
                }
            });
        });    

        // draw kline
        const yOpen = this.#height - (kline.openPrice - this.#yMin) * scaleFactor;
        const yHigh = this.#height - (kline.highPrice - this.#yMin) * scaleFactor;
        const yLow = this.#height - (kline.lowPrice - this.#yMin) * scaleFactor;
        const yClose = this.#height - (kline.closePrice - this.#yMin) * scaleFactor;
        
        this.drawKlineAt(x, yHigh, '#c8c8c8');
        this.drawKlineAt(x, yLow, '#c8c8c8');
        this.drawKlineAt(x, yOpen, 'yellow');     
        this.drawKlineAt(x, yClose, yClose < yOpen ? '#9BE6D1' : '#E6A1A0');

        this.#ctx.beginPath();
        this.#ctx.moveTo(x + this.#minuteWidth/2, yOpen);
        this.#ctx.lineTo(x + this.#minuteWidth/2, yClose);
        this.#ctx.stroke();
    }
    drawKlineAt(x, y, color) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + this.#minuteWidth, y);
        this.#ctx.strokeStyle = color;
        this.#ctx.stroke();
    }    
    drawTradesAt(x, y, side, opacity) {
        this.#ctx.beginPath();
        if (!side) {
            this.#ctx.moveTo(x + 2 + this.#minuteWidth/2, y);
            this.#ctx.lineTo(x + 2 + this.#minuteWidth/2 + 15, y);
            this.#ctx.strokeStyle = `rgba(81, 205, 160, ${opacity})`;
        } else {
            this.#ctx.moveTo(x - 2 + this.#minuteWidth/2, y);
            this.#ctx.lineTo(x - 2 + this.#minuteWidth/2 - 15, y);
            this.#ctx.strokeStyle = `rgba(192, 80, 77, ${opacity})`; 
        }
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
        const yOpen = this.#height - (this.#data.openPrice - yMin) * scaleFactor;
        
        if (yClose > yOpen) {
            this.drawTextAt(yClose, this.#data.closePrice, '#C0504E');
        } else if (yClose < yOpen) {
            this.drawTextAt(yClose, this.#data.closePrice, '#51CDA0');
        }
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
