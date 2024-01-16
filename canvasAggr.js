export class CanvasController {
    zoomYLevel = 0.2222; 
    zoomXLevel = 0;
    #canvas1;
    #canvas2;
    #canvas3;
    tickSize;
    constructor(ctx, width, height, ctx2, canvasRight, width2, height2, ctx3, canvasBottom, width3, height3) {
        this.#canvas1 = new Canvas1(this, ctx, width, height);
        this.#canvas2 = new Canvas2(this, ctx2, canvasRight, width2, height2);
        this.#canvas3 = new Canvas3(this, ctx3, canvasBottom, width3, height3);
     
        this.#canvas2.canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            const deltaZoomLevel = 0.0005 / (0.01 - 0.001);
            let newZoomLevel = this.zoomYLevel - (event.deltaY > 0 ? -deltaZoomLevel : deltaZoomLevel);
            this.zoomYLevel = Math.max(0, Math.min(newZoomLevel, 1));
        
            this.#canvas1.zoomY(this.zoomYLevel);
            this.#canvas2.zoomY(this.zoomYLevel);
        });
        this.#canvas3.canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            const deltaZoomLevel = 0.0005 / (0.01 - 0.001);
            let newZoomLevel = this.zoomXLevel + (event.deltaY > 0 ? -deltaZoomLevel : deltaZoomLevel);
            this.zoomXLevel = Math.max(0, Math.min(newZoomLevel, 1));

            this.#canvas1.zoomX(this.zoomXLevel);
            this.#canvas3.zoomX(this.zoomXLevel);
        });

        const tickSizeBtn = document.querySelector("#ticksize-select");
        tickSizeBtn.addEventListener('change', (event) => {
            const calculatedValue = this.tickSize * tickSizeBtn.value;
            console.log('new tick size:', calculatedValue);

            this.#canvas1.bucketSize = calculatedValue;
            this.#canvas1.maxQuantity = 20;

            this.#canvas2.bucketSize = calculatedValue; 
        });
    }

    updateData(data) {
        this.#canvas1.updateData(data.kline, data.tradesBuffer);
        this.#canvas2.updateData(data.kline, data.depth);
        this.#canvas3.updateData(data.kline);
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
    #minMultiplier = 0.997;
    #maxMultiplier = 1.003;
    #xZoom = 30;
    bucketSize;
    constructor(controller, ctx, width, height) {
        this.#controller = controller;
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (30 * 60 * 1000) * (this.#width - this.#rectangleWidth));
        this.tradesDrawType = 0;
        this.maxQuantity = 20;
    };

    zoomY(zoomLevel) {
        const minStart = 0.001;
        const minEnd = 0.01;  
        const maxStart = 0.001;
        const maxEnd = 0.01;  
    
        const minDistance = minStart + (minEnd - minStart) * zoomLevel;
        const maxDistance = maxStart + (maxEnd - maxStart) * zoomLevel;
    
        this.#minMultiplier = Math.round((1 - minDistance) * 10000) / 10000; 
        this.#maxMultiplier = Math.round((1 + maxDistance) * 10000) / 10000; 
    };       
    zoomX(zoomLevel) {
        const minZoom = 30;
        const maxZoom = 10;
        this.#xZoom = minZoom + (maxZoom - minZoom) * zoomLevel;
    
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    };
    updateData(kline, aggTrades) {
        const { k: { t: startTime, T: endTime, o: openPrice, h: highPrice, l: lowPrice, c: closePrice } } = kline;

        this.#yMin = Math.min((Number(highPrice) + Number(lowPrice)) / 2 * this.#minMultiplier, lowPrice);
        this.#yMax = Math.max((Number(highPrice) + Number(lowPrice)) / 2 * this.#maxMultiplier, highPrice);
        
        if (this.#lastOpenPrice !== openPrice) {
            if (this.#currentDataPoint) {
                this.#dataPoints.push(this.#currentDataPoint); 
                this.#klinesTrades.push(this.#currentKlineTrades);

                if (this.#dataPoints.length > 60) { 
                    this.#dataPoints.shift();
                    this.#klinesTrades.shift();
                }
                this.#currentKlineTrades = [];
            }
            this.#lastOpenPrice = openPrice;
        }
        this.#currentDataPoint = { startTime, endTime, openPrice, highPrice, lowPrice, closePrice };
        this.#currentKlineTrades.push(aggTrades);
        this.drawStart();
    };    
    drawStart() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
    
        if (this.#dataPoints.length > 0) {
            const leftmostTime = this.#currentDataPoint.startTime - this.#xZoom * 60 * 1000; 
    
            this.#dataPoints.forEach((data, index) => {
                const trades = this.#klinesTrades[index];
                const x = Math.round((data.startTime - leftmostTime) / (this.#xZoom * 60 * 1000) * (this.#width - this.#minuteWidth));
                this.drawDataPoint(trades, data, x);
            });
        }
        this.drawDataPoint(this.#currentKlineTrades, this.#currentDataPoint, Math.round(this.#width - this.#minuteWidth));
    };                      
    drawDataPoint(trades, kline, x) {
        const scaleFactor = this.#height / (this.#yMax - this.#yMin);

        const yOpen = Math.round(this.#height - (kline.openPrice - this.#yMin) * scaleFactor);
        const yHigh = Math.round(this.#height - (kline.highPrice - this.#yMin) * scaleFactor);
        const yLow = Math.round(this.#height - (kline.lowPrice - this.#yMin) * scaleFactor);
        const yClose = Math.round(this.#height - (kline.closePrice - this.#yMin) * scaleFactor);

        this.drawKlineAt(x, yHigh - 2);
        this.drawKlineAt(x, yLow + 2);
    
        const flatTrades = [].concat(...trades);
    
        // Group trades by rounded aggTrade.y and aggTrade.m and sum the quantities
        const groupedTrades = flatTrades.reduce((acc, aggTrade) => {
            const roundedY = Math.round(aggTrade.y / this.bucketSize) * this.bucketSize;
            const key = `${roundedY}-${aggTrade.m}`;
            if (!acc[key]) {
                acc[key] = { ...aggTrade, y: roundedY, q: 0 };
            }
            acc[key].q += aggTrade.q;
            return acc;
        }, {});
    
        const maxQuantity = Math.max(...Object.values(groupedTrades).map(trade => trade.q));
        this.maxQuantity = maxQuantity > this.maxQuantity ? maxQuantity : this.maxQuantity;
    
        Object.values(groupedTrades).forEach((aggTrade) => {
            const yTradePrice = Math.round(this.#height - (aggTrade.y - this.#yMin) * scaleFactor);
            const quantityScaled = this.scaleQuantity(aggTrade.q);
            this.drawTradesAt(x, yTradePrice, aggTrade.m, quantityScaled);
        });

        this.#ctx.beginPath();
        this.#ctx.moveTo(x + this.#minuteWidth/2, yOpen);
        this.#ctx.lineTo(x + this.#minuteWidth/2, yClose);
        this.#ctx.strokeStyle = yClose < yOpen ? '#9BE6D1' : '#E6A1A0';
        this.#ctx.stroke();
    };     
    drawKlineAt(x, y) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(x + 5, y);
        this.#ctx.lineTo(x + this.#minuteWidth - 5, y);
        this.#ctx.strokeStyle = "rgba(200, 200, 200, 0.5)";
        this.#ctx.stroke();
    };
    drawTradesAt(x, y, side, quantity) {    
        this.#ctx.beginPath();
        if (!side) {
            this.#ctx.moveTo(x + 4 + this.#minuteWidth/2, y);
            this.#ctx.lineTo(x + 4 + this.#minuteWidth/2 + quantity, y);
            this.#ctx.strokeStyle = `rgba(81, 205, 160, 1)`;
        } else {
            this.#ctx.moveTo(x - 4 + this.#minuteWidth/2, y);
            this.#ctx.lineTo(x - 4 + this.#minuteWidth/2 - quantity, y);
            this.#ctx.strokeStyle = `rgba(192, 80, 77, 1)`; 
        }
        this.#ctx.stroke();
    };    
    scaleQuantity(quantity) {
        const minQuantity = 0.001;
        const minLineLength = 0;
        const maxLineLength = this.#minuteWidth/2 - 4 ;
    
        return minLineLength + (quantity - minQuantity) * (maxLineLength - minLineLength) / (this.maxQuantity - minQuantity);
    };  
}
class Canvas2 {
    #controller;
    #ctx;
    #width;
    #height;
    #kline;
    #depth;
    #yMin;
    #yMax;
    #minMultiplier = 0.997;
    #maxMultiplier = 1.003;
    bucketSize;
    constructor(controller, ctx, canvas, width, height) {
        this.#controller = controller;
        this.#ctx = ctx;
        this.canvas = canvas;
        this.#width = width;
        this.#height = height;
        this.maxQuantity = 20;
    }

    zoomY(zoomLevel) {
        const minStart = 0.001;
        const minEnd = 0.01; ;
        const maxStart = 0.001; 
        const maxEnd = 0.01;    
    
        const minDistance = minStart + (minEnd - minStart) * zoomLevel;
        const maxDistance = maxStart + (maxEnd - maxStart) * zoomLevel;
    
        this.#minMultiplier = Math.round((1 - minDistance) * 10000) / 10000; 
        this.#maxMultiplier = Math.round((1 + maxDistance) * 10000) / 10000; 
    };     
    updateData(kline, depth) {
        const { k: { o: openPrice, h: highPrice, l: lowPrice, c: closePrice } } = kline;
        this.#kline = { openPrice, highPrice, lowPrice, closePrice };
        
        const { asks, bids } = depth;
        this.#depth = { asks, bids };
    
        this.#yMin = Math.min((Number(highPrice) + Number(lowPrice)) / 2 * this.#minMultiplier, lowPrice);
        this.#yMax = Math.max((Number(highPrice) + Number(lowPrice)) / 2 * this.#maxMultiplier, highPrice);

        this.drawStart();
    };
    drawStart() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
    
        const scaleFactor = this.#height / (this.#yMax - this.#yMin);
        const { closePrice, openPrice } = this.#kline;
        
        const yClose = Math.round(this.#height - (closePrice - this.#yMin) * scaleFactor);
        const yOpen = Math.round(this.#height - (openPrice - this.#yMin) * scaleFactor);
        
        const color = yClose > yOpen ? '#C0504E' : yClose < yOpen ? '#51CDA0' : '#c8c8c8';
        this.drawTextAt(yClose, closePrice, color);
        this.drawTextAt(this.#height - 10, Math.round(this.#yMin), '#c8c8c8');
        this.drawTextAt(15, Math.round(this.#yMax), '#c8c8c8');

        // orderbook
        this.maxQuantity = 20;

        if (this.#depth.asks && this.#depth.bids) {
            const groupByBucketSize = (orders) => {
                return orders.reduce((grouped, order) => {
                    const bucket = Math.round(order[0] / this.bucketSize) * this.bucketSize;
                    if (!grouped[bucket]) grouped[bucket] = 0;
                    grouped[bucket] += parseFloat(order[1]);
                    return grouped;
                }, {});
            };

            const groupedAsks = groupByBucketSize(this.#depth.asks);
            const groupedBids = groupByBucketSize(this.#depth.bids);

            const quantities = [...Object.values(groupedAsks), ...Object.values(groupedBids)];
            this.maxQuantity = Math.max.apply(null, quantities);

            Object.entries(groupedAsks).forEach(([price, quantity]) => {
                const y = Math.round(this.#height - (price - this.#yMin) * scaleFactor);        
                this.drawLineAt(y, '#C0504E', quantity);
            });

            Object.entries(groupedBids).forEach(([price, quantity]) => {
                const y = Math.round(this.#height - (price - this.#yMin) * scaleFactor);        
                this.drawLineAt(y, '#51CDA0', quantity);
            });
        };
        
        this.#ctx.font = '10px monospace';
        this.#ctx.fillStyle = "#c8c8c8";
        this.#ctx.fillText(Math.round(this.maxQuantity), this.#width - 40, 40);
    };
    drawLineAt(y, color, quantity) {
        const scaledQuantity = (quantity / this.maxQuantity) * (this.#width - 80);
    
        this.#ctx.beginPath();
        this.#ctx.moveTo(80, y);
        this.#ctx.lineTo(scaledQuantity + 80, y);  
        this.#ctx.strokeStyle = color;
        this.#ctx.lineWidth = 1;
        this.#ctx.stroke();
    };       
    drawTextAt(y, text, color) {
        this.#ctx.font = '12px monospace';
        this.#ctx.fillStyle = color;
        this.#ctx.fillText(text, 10, y);
    };
}
class Canvas3 {
    #controller;
    #ctx;
    #width;
    #height;
    #dataPoints = [];
    #currentDataPoint;
    #lastStartTime;
    #yMax;
    #rectangleWidth = 60;
    #minuteWidth;
    #xZoom = 30;
    constructor(controller, ctx, canvas, width, height) {
        this.#controller = controller;
        this.#ctx = ctx;
        this.canvas = canvas;
        this.#width = width;
        this.#height = height;
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    }
    zoomX(zoomLevel) {
        const minZoom = 30;
        const maxZoom = 10;
        this.#xZoom = minZoom + (maxZoom - minZoom) * zoomLevel;
    
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    };

    updateData(kline) {
        const { k: { t: startTime, T: endTime, v: totalVolume, V: buyVolume } } = kline;
    
        const sellVolume = totalVolume - buyVolume;
        this.#yMax = Math.round(this.#dataPoints.reduce((max, data) => Math.max(max, data.buyVolume, data.sellVolume), Math.max(buyVolume, sellVolume)));
    
        if (this.#lastStartTime !== startTime) {
            if (this.#currentDataPoint) {
                this.#dataPoints.push(this.#currentDataPoint); 
    
                if (this.#dataPoints.length > 60) { 
                    this.#dataPoints.shift();
                }
            }
            this.#lastStartTime = startTime;
        }
        this.#currentDataPoint = { startTime, endTime, buyVolume, sellVolume };
        this.drawStart();
    }    
    drawStart() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
    
        if (this.#dataPoints.length > 0) {
            const leftmostTime = this.#currentDataPoint.startTime - this.#xZoom * 60 * 1000; // Current time minus 30 minutes
    
            this.#dataPoints.forEach((data, index) => {
                const x = Math.round((data.startTime - leftmostTime) / (this.#xZoom * 60 * 1000) * (this.#width - this.#minuteWidth));
                this.drawDataPoint(data, x);
            });
        }
        this.drawDataPoint(this.#currentDataPoint, Math.round(this.#width - this.#minuteWidth));
    }        
    drawDataPoint(kline, x) {
        const scaleFactor = (this.#height - 20) / this.#yMax;
    
        const yBuyVolume = Math.max(0, Math.min(this.#height - 20, Math.round((this.#height - 20) - (kline.buyVolume * scaleFactor))));
        const ySellVolume = Math.max(0, Math.min(this.#height - 20, Math.round((this.#height - 20) - (kline.sellVolume * scaleFactor))));

        this.#ctx.beginPath();
        this.#ctx.moveTo(x, 0);
        this.#ctx.lineTo(x, this.#height - 20);
        this.#ctx.strokeStyle = "rgba(200, 200, 200, 0.4)";
        this.#ctx.lineWidth = 1;
        this.#ctx.stroke();

        this.drawTimeLabel(x, kline.startTime);
    
        this.drawKlineAt(x + this.#minuteWidth/2 + this.#minuteWidth/8, yBuyVolume, '#51CDA0');
        this.drawKlineAt(x + this.#minuteWidth/2 - this.#minuteWidth/8, ySellVolume, '#C0504E');
    }
    drawKlineAt(x, y, color) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, this.#height - 20);
        this.#ctx.lineTo(x, y);
        this.#ctx.strokeStyle = color;
        this.#ctx.lineWidth = this.#minuteWidth/6;
        this.#ctx.stroke();
    }     
    drawTimeLabel(x, startTime) {
        const date = new Date(startTime);
        // Format the time as "HH:MM"
        const time = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
    
        this.#ctx.font = '10px monospace';
        this.#ctx.fillStyle = '#c8c8c8';
        this.#ctx.fillText(time, x, this.#height - 5);
    }
}

