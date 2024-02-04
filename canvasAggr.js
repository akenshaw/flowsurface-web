let currentSymbol;

export class CanvasController {
    zoomYLevel = 0.2222; 
    zoomXLevel = 0;
    #canvas1;
    #canvas2;
    #canvas3;
    #canvas4;
    #tickSize;
    #kline;
    #depth;
    #isDragging = false;
    #initialMousePos;
    #autoScale = true;
    #autoScaleBtn;
    #cvdBtnActive = true;
    #oiBtnActive = true;
    #isAnimationFrameRequested = false;
    constructor(ctx1, canvas1, width1, height1, ctx2, canvas2, width2, height2, ctx3, canvas3, width3, height3, ctx4, canvas4, width4, height4) {
        this.#canvas1 = new Canvas1(this, ctx1, canvas1, width1, height1);
        this.#canvas2 = new Canvas2(this, ctx2, canvas2, width2, height2);
        this.#canvas3 = new Canvas3(this, ctx3, canvas3, width3, height3);
        this.#canvas4 = new Canvas4(this, ctx4, canvas4, width4, height4);
  
        // CVD and OI buttons
        document.querySelectorAll('#top-nav button').forEach((button) => {
            button.addEventListener('click', function(event) {
                const clickedButton = event.target;
                if (clickedButton.id === 'tf1m' || clickedButton.id === 'tf3m' || clickedButton.id === 'tf5m' || clickedButton.id === 'tf15m') {
                    return;
                }
                clickedButton.classList.toggle('disabled');

                if (clickedButton.id === 'cvdToggleBtn') {
                    this.#cvdBtnActive = !this.#cvdBtnActive;
                    this.#canvas4.toggleIndicator("cvd", this.#cvdBtnActive);
                } else if (clickedButton.id === 'oiToggleBtn') {
                    this.#oiBtnActive = !this.#oiBtnActive;
                    this.#canvas4.toggleIndicator("oi", this.#oiBtnActive);
                };

                if (!this.#cvdBtnActive && !this.#oiBtnActive) {
                    document.querySelector("#canvas4").style.display = "none";
                    document.querySelector("#canvas1").style.height = "90%";
                    document.querySelector("#canvas2").style.height = "90%";
                    document.querySelector("#canvas3").style.height = "10%";
                    document.querySelector("#canvas3").style.top = "90%";
                } else {
                    document.querySelector("#canvas4").style.display = "flex";
                    document.querySelector("#canvas1").style.height = "80%";
                    document.querySelector("#canvas2").style.height = "80%";
                    document.querySelector("#canvas3").style.height = "10%";
                    document.querySelector("#canvas3").style.top = "90%";
                };                
            }.bind(this)); 
        });
        // Auto scale 
        this.#autoScaleBtn = document.querySelector("#btn2");
        this.#autoScaleBtn.addEventListener('click', (event) => {
            this.#autoScale = !this.#autoScale;
            this.updateScaleBtn();
        });
        // Tick size
        const tickSizeBtn = document.querySelector("#ticksize-select");
        tickSizeBtn.addEventListener('change', (event) => {
            const calculatedValue = this.#tickSize * tickSizeBtn.value;
            console.log('new tick size:', calculatedValue);

            this.#canvas1.bucketSize = calculatedValue;
            this.#canvas1.maxQuantity = 20;

            this.#canvas2.bucketSize = calculatedValue; 
        });
        // Panning
        this.#canvas1.canvas.addEventListener('mousedown', (event) => {
            this.#isDragging = true;
            this.#initialMousePos = { x: event.clientX, y: event.clientY };
        });
        this.#canvas1.canvas.addEventListener('mousemove', (event) => {
            if (this.#isDragging) {
                this.#autoScale = false;
                
                let currentMousePos = { x: event.clientX, y: event.clientY };
                let dx = currentMousePos.x - this.#initialMousePos.x;
                let dy = currentMousePos.y - this.#initialMousePos.y;

                if (!this.#isAnimationFrameRequested) {
                    this.#isAnimationFrameRequested = true;
                    requestAnimationFrame(() => {
                        this.#canvas1.panXY(dx, dy);
                        this.#canvas2.panY(dy);
                        this.#canvas3.panX(dx);
                        this.#canvas4.panX(dx);
        
                        this.#canvas1.updateData(this.#kline, []);
                        this.#canvas2.updateData(this.#kline, this.#depth);
                        this.#canvas3.updateData(this.#kline);
                        this.#canvas4.updateData(this.#kline, []);

                        this.#isAnimationFrameRequested = false;
                    });
                }
                this.#initialMousePos = currentMousePos;
                this.updateScaleBtn();
            }
        });
        ['mouseup', 'mouseleave'].forEach(event => this.#canvas1.canvas.addEventListener(event, () => this.#isDragging = false));
        // Zoom Main 
        this.#canvas1.canvas.addEventListener('wheel', (event) => {
            event.preventDefault();

            this.#autoScale = false;

            const deltaZoomLevel = 0.0005 / (0.01 - 0.001);
            let newYZoomLevel = this.zoomYLevel - (event.deltaY > 0 ? -deltaZoomLevel : deltaZoomLevel);
            let newXZoomLevel = this.zoomXLevel + (event.deltaY > 0 ? -deltaZoomLevel : deltaZoomLevel);

            this.zoomYLevel = Math.max(0, Math.min(newYZoomLevel, 1));
            this.zoomXLevel = Math.max(0, Math.min(newXZoomLevel, 1));
            
            if (!this.#isAnimationFrameRequested) {
                this.#isAnimationFrameRequested = true;
                requestAnimationFrame(() => {
                    this.#canvas1.zoomY(this.zoomYLevel);
                    this.#canvas1.zoomX(this.zoomXLevel);
                    this.#canvas2.zoomY(this.zoomYLevel);
                    this.#canvas3.zoomX(this.zoomXLevel);
                    this.#canvas4.zoomX(this.zoomXLevel);

                    this.#canvas1.updateData(this.#kline, []);
                    this.#canvas2.updateData(this.#kline, this.#depth);
                    this.#canvas3.updateData(this.#kline);
                    this.#canvas4.updateData(this.#kline, []);

                    this.#isAnimationFrameRequested = false;
                });
            this.updateScaleBtn();
            };
        });
        // Zoom Y
        this.#canvas2.canvas.addEventListener('wheel', (event) => {
            event.preventDefault();

            this.#autoScale = false;

            const deltaZoomLevel = 0.0005 / (0.01 - 0.001);
            let newZoomLevel = this.zoomYLevel - (event.deltaY > 0 ? -deltaZoomLevel : deltaZoomLevel);
            this.zoomYLevel = Math.max(0, Math.min(newZoomLevel, 1));
            
            if (!this.#isAnimationFrameRequested) {
                this.#isAnimationFrameRequested = true;
                requestAnimationFrame(() => {
                    this.#canvas1.zoomY(this.zoomYLevel);
                    this.#canvas2.zoomY(this.zoomYLevel);

                    this.#canvas1.updateData(this.#kline, []);
                    this.#canvas2.updateData(this.#kline, this.#depth);

                    this.#isAnimationFrameRequested = false;
                });
            this.updateScaleBtn();
            };
        });
        // Zoom X
        this.#canvas3.canvas.addEventListener('wheel', (event) => {
            event.preventDefault();

            this.#autoScale = false;

            const deltaZoomLevel = 0.0005 / (0.01 - 0.001);
            let newZoomLevel = this.zoomXLevel + (event.deltaY > 0 ? -deltaZoomLevel : deltaZoomLevel);
            this.zoomXLevel = Math.max(0, Math.min(newZoomLevel, 1));

            if (!this.#isAnimationFrameRequested) {
                this.#isAnimationFrameRequested = true;
                requestAnimationFrame(() => {
                    this.#canvas1.zoomX(this.zoomXLevel);
                    this.#canvas3.zoomX(this.zoomXLevel);
                    this.#canvas4.zoomX(this.zoomXLevel);

                    this.#canvas1.updateData(this.#kline, []);
                    this.#canvas3.updateData(this.#kline);
                    this.#canvas4.updateData(this.#kline, []);

                    this.#isAnimationFrameRequested = false;
                });
            };  
            this.updateScaleBtn();
        });
    }

    updateScaleBtn() {
        if (this.#autoScale) {
            this.#canvas1.resetZoomAndPan();
            this.#canvas2.resetZoomAndPan();
            this.#canvas3.resetZoomAndPan();
            this.#canvas4.resetZoomAndPan();
            this.#autoScaleBtn.innerHTML = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 448 512"><path fill="#c8c8c8" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>';
        } else {
            this.#autoScaleBtn.innerHTML = '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 576 512"><path fill="#c8c8c8" d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></svg>';
        }
    }
    updateData(data) {
        this.#kline = data.kline;
        this.#depth = data.depth;
        
        this.#canvas1.updateData(data.kline, data.tradesBuffer);
        this.#canvas2.updateData(data.kline, data.depth);
        this.#canvas3.updateData(data.kline);
        this.#canvas4.updateData(data.kline, data.tradesBuffer);
    }
    startNew(symbol, tickSize) {
        this.#autoScale = true;
        this.updateScaleBtn();

        this.#canvas1.resetData();
        this.#canvas2.resetData();
        this.#canvas3.resetData();
        this.#canvas4.resetData();

        this.zoomYLevel = 0.2222;
        this.zoomXLevel = 0;

        currentSymbol = symbol;
        this.#tickSize = tickSize
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
    #autoScale = true;
    #panXoffset = 0;
    #panYoffset = 0;
    #lastKlineEnd = null;
    #nextKlineTrades = [];
    constructor(controller, ctx, canvas, width, height) {
        this.#controller = controller;
        this.#ctx = ctx;
        this.canvas = canvas;
        this.#width = width;
        this.#height = height;
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (30 * 60 * 1000) * (this.#width - this.#rectangleWidth));
        this.tradesDrawType = 0;
        this.maxQuantity = 20;
    };

    panXY(dx, dy) { 
        this.#autoScale = false;

        const yScaleFactor = this.#height / (this.#yMax - this.#yMin);
        const yDataMovement = dy / yScaleFactor;

        this.#panYoffset += yDataMovement;
        this.#panXoffset = this.#panXoffset + dx < 0 ? 0 : this.#panXoffset + dx;
    }
    zoomY(zoomLevel) {
        const minStart = 0.001;
        const minEnd = 0.01;  
        const maxStart = 0.001;
        const maxEnd = 0.01;  
    
        const minDistance = minStart + (minEnd - minStart) * zoomLevel;
        const maxDistance = maxStart + (maxEnd - maxStart) * zoomLevel;
    
        this.#minMultiplier = Math.round((1 - minDistance) * 10000) / 10000; 
        this.#maxMultiplier = Math.round((1 + maxDistance) * 10000) / 10000; 
    }      
    zoomX(zoomLevel) {
        const minZoom = 30;
        const maxZoom = 10;
        this.#xZoom = minZoom + (maxZoom - minZoom) * zoomLevel;
    
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    }
    resetZoomAndPan() {
        this.#autoScale = true;
        this.#panXoffset = 0;
        this.#panYoffset = 0;
        this.#minMultiplier = 0.997;
        this.#maxMultiplier = 1.003;
        this.#xZoom = 30;
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    }
    resetData() {
        this.#dataPoints = [];
        this.#klinesTrades = [];
        this.#currentDataPoint = null;
        this.#currentKlineTrades = [];
        this.#lastOpenPrice = null;
        this.#yMin = null;
        this.#yMax = null;
        this.#autoScale = true;
        this.#panXoffset = 0;
        this.#panYoffset = 0;
        this.#lastKlineEnd = null;
    }
    updateData(kline, aggTrades) {
        const { E: eventTime, k: { t: startTime, T: endTime, o: openPrice, h: highPrice, l: lowPrice, c: closePrice } } = kline;
        
        if (eventTime > this.#lastKlineEnd || this.#lastKlineEnd === null) {
            if (this.#currentDataPoint && this.#currentDataPoint.endTime !== endTime) {
                this.#dataPoints.push(this.#currentDataPoint); 
                this.#klinesTrades.push(this.#currentKlineTrades);

                if (this.#dataPoints.length > 60) { 
                    this.#dataPoints.shift();
                    this.#klinesTrades.shift();
                }
                this.#currentKlineTrades = [];
            }
            this.#lastKlineEnd = endTime;
        }
        this.#currentDataPoint = { startTime, endTime, openPrice, highPrice, lowPrice, closePrice };

        for (let i = 0; i < aggTrades.length; i++) {
            const trade = aggTrades[i];
            if (trade.x >= startTime && trade.x < endTime) {
                this.#currentKlineTrades.push(trade);
            } else if (trade.x >= endTime) {
                this.#nextKlineTrades.push(...aggTrades.slice(i));
                break;
            }
        };
        if (this.#nextKlineTrades.length > 0) {
            this.#nextKlineTrades = this.#nextKlineTrades.filter(trade => {
                if (trade.x >= startTime && trade.x < endTime) {
                    this.#currentKlineTrades.push(trade);
                    return false; 
                }
                return true; 
            });
        };

        this.#yMin = Math.min((Number(highPrice) + Number(lowPrice)) / 2 * this.#minMultiplier, lowPrice) + this.#panYoffset;
        this.#yMax = Math.max((Number(highPrice) + Number(lowPrice)) / 2 * this.#maxMultiplier, highPrice) + this.#panYoffset;

        this.drawStart();
    }    
    drawStart() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
    
        if (this.#dataPoints.length > 0) {
            const leftmostTime = (this.#currentDataPoint.startTime - this.#xZoom * 60 * 1000) + this.#panXoffset;     
            this.#dataPoints.forEach((data, index) => {
                const trades = this.#klinesTrades[index];
                const x = Math.round((data.startTime - leftmostTime) / (this.#xZoom * 60 * 1000) * (this.#width - this.#minuteWidth));
                this.drawDataPoint(trades, data, x + this.#panXoffset);
            });
        }
        this.drawDataPoint(this.#currentKlineTrades, this.#currentDataPoint, Math.round(this.#width - this.#minuteWidth) + this.#panXoffset);
    }                      
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
    }     
    drawKlineAt(x, y) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(x + 5, y);
        this.#ctx.lineTo(x + this.#minuteWidth - 5, y);
        this.#ctx.strokeStyle = "rgba(200, 200, 200, 0.5)";
        this.#ctx.stroke();
    }
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
    }    
    scaleQuantity(quantity) {
        const minQuantity = 0.001;
        const minLineLength = 0;
        const maxLineLength = this.#minuteWidth/2 - 4 ;
    
        return minLineLength + (quantity - minQuantity) * (maxLineLength - minLineLength) / (this.maxQuantity - minQuantity);
    }  
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
    #autoScale = true;
    #panYoffset = 0;
    constructor(controller, ctx, canvas, width, height) {
        this.#controller = controller;
        this.#ctx = ctx;
        this.canvas = canvas;
        this.#width = width;
        this.#height = height;
        this.maxQuantity = 20;
    }

    panY(dy) { 
        this.#autoScale = false;

        const yScaleFactor = this.#height / (this.#yMax - this.#yMin);
        const yDataMovement = dy / yScaleFactor;
    
        this.#panYoffset += yDataMovement;
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
    }
    resetZoomAndPan() {
        this.#autoScale = true;
        this.#minMultiplier = 0.997;
        this.#maxMultiplier = 1.003;
        this.#panYoffset = 0;
    }
    resetData() {
        this.#kline = null;
        this.#depth = null;
        this.#yMin = null;
        this.#yMax = null;
        this.#autoScale = true;
    }     
    updateData(kline, depth) {
        const { k: { o: openPrice, h: highPrice, l: lowPrice, c: closePrice } } = kline;
        this.#kline = { openPrice, highPrice, lowPrice, closePrice };
        
        const { asks, bids } = depth;
        this.#depth = { asks, bids };
        
        this.#yMin = Math.min((Number(highPrice) + Number(lowPrice)) / 2 * this.#minMultiplier, lowPrice) + this.#panYoffset;
        this.#yMax = Math.max((Number(highPrice) + Number(lowPrice)) / 2 * this.#maxMultiplier, highPrice) + this.#panYoffset;

        this.drawStart();
    }

    drawStart() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
    
        const scaleFactor = this.#height / (this.#yMax - this.#yMin);
        const { closePrice, openPrice } = this.#kline;
        
        const yClose = Math.round(this.#height - (closePrice - this.#yMin) * scaleFactor);
        const yOpen = Math.round(this.#height - (openPrice - this.#yMin) * scaleFactor);
        
        const color = yClose > yOpen ? '#C0504E' : yClose < yOpen ? '#51CDA0' : '#c8c8c8';
        this.drawTextAt(yClose, Number(closePrice), color);
        this.drawTextAt(this.#height - 10, Number((Math.round(this.#yMin / this.bucketSize) * this.bucketSize).toFixed(4)), '#c8c8c8');
        this.drawTextAt(15, Number((Math.round(this.#yMax / this.bucketSize) * this.bucketSize).toFixed(4)), '#c8c8c8');

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
    }
    drawLineAt(y, color, quantity) {
        const scaledQuantity = (quantity / this.maxQuantity) * (this.#width - 80);
    
        this.#ctx.beginPath();
        this.#ctx.moveTo(80, y);
        this.#ctx.lineTo(scaledQuantity + 80, y);  
        this.#ctx.strokeStyle = color;
        this.#ctx.lineWidth = 1;
        this.#ctx.stroke();
    }      
    drawTextAt(y, text, color) {
        this.#ctx.font = '12px monospace';
        this.#ctx.fillStyle = color;
        this.#ctx.fillText(text, 10, y);
    }
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
    #panXoffset = 0;
    constructor(controller, ctx, canvas, width, height) {
        this.#controller = controller;
        this.#ctx = ctx;
        this.canvas = canvas;
        this.#width = width;
        this.#height = height;
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    }

    panX(dx) { 
        this.#panXoffset = this.#panXoffset + dx < 0 ? 0 : this.#panXoffset + dx;
    }
    zoomX(zoomLevel) {
        const minZoom = 30;
        const maxZoom = 10;
        this.#xZoom = minZoom + (maxZoom - minZoom) * zoomLevel;
    
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    }
    resetZoomAndPan() {
        this.#panXoffset = 0;
        this.#xZoom = 30;
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    }
    resetData() {
        this.#dataPoints = [];
        this.#currentDataPoint = null;
        this.#lastStartTime = null;
        this.#yMax = null;
        this.#panXoffset = 0;
    }
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
            const leftmostTime = (this.#currentDataPoint.startTime - this.#xZoom * 60 * 1000) + this.#panXoffset; 
            this.#dataPoints.forEach((data, index) => {
                const x = Math.round((data.startTime - leftmostTime) / (this.#xZoom * 60 * 1000) * (this.#width - this.#minuteWidth));
                this.drawDataPoint(data, x + this.#panXoffset);
            });
        }
        this.drawDataPoint(this.#currentDataPoint, Math.round(this.#width - this.#minuteWidth) + this.#panXoffset);
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
    
        this.#ctx.font = (this.#height * 0.1) + "px monospace";
        this.#ctx.fillStyle = '#c8c8c8';
        this.#ctx.fillText(time, x, this.#height - 5);
    }
}
class Canvas4 {
    #controller;
    #ctx;
    #width;
    #height;
    #dataPoints = [];
    #currentDataPoint;
    #currentOI;
    #OIDataPoints = [];
    #lastStartTime;
    #yMax_OI;
    #yMin_OI;
    #yMax_CVD;
    #yMin_CVD;
    #rectangleWidth = 60;
    #minuteWidth;
    #xZoom = 30;
    #panXoffset = 0;
    #cumVolumeDelta = 0;
    #oiEnabled = true;
    #cvdEnabled = true;
    #scaleFactor_OI;
    #scaleFactor_CVD;
    constructor(controller, ctx, canvas, width, height) {
        this.#controller = controller;
        this.#ctx = ctx;
        this.canvas = canvas;
        this.#width = width;
        this.#height = height;
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    }

    panX(dx) { 
        this.#panXoffset = this.#panXoffset + dx < 0 ? 0 : this.#panXoffset + dx;
    }
    zoomX(zoomLevel) {
        const minZoom = 30;
        const maxZoom = 10;
        this.#xZoom = minZoom + (maxZoom - minZoom) * zoomLevel;
    
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    }
    resetZoomAndPan() {
        this.#panXoffset = 0;
        this.#xZoom = 30;
        this.#minuteWidth = Math.round((1 * 60 * 1000) / (this.#xZoom * 60 * 1000) * (this.#width - this.#rectangleWidth));
    }
    resetData() {
        this.#dataPoints = [];
        this.#OIDataPoints = [];
        this.#currentDataPoint = null;
        this.#lastStartTime = null;
        this.#yMax_OI = null;
        this.#yMin_OI = null;
        this.#yMax_CVD = null;
        this.#yMin_CVD = null;
        this.#cumVolumeDelta = 0;
        this.#panXoffset = 0;
    }
    toggleIndicator(indicator, state) {
        if (indicator === 'oi') {
            this.#oiEnabled = state
        } else if (indicator === 'cvd') {
            this.#cvdEnabled = state;
        }
    }
    async updateData(kline, trades) {
        const { k: { t: startTime, T: endTime } } = kline;
        this.#cumVolumeDelta += trades.reduce((acc, trade) => !trade.m ? acc + trade.q : acc - trade.q, 0); 
    
        if (this.#lastStartTime !== startTime) {
            if (this.#currentDataPoint) {
            
                this.fetchOI(currentSymbol).then(OIValue => {
                    this.#OIDataPoints.push(OIValue);
                });
                this.#dataPoints.push(this.#currentDataPoint); 
        
                if (this.#dataPoints.length > 60) { 
                    this.#dataPoints.shift();
                    this.#OIDataPoints.shift();
                };
            };
            this.#lastStartTime = startTime;
        };
        this.#currentDataPoint = { startTime, endTime, cumVolumeDelta: this.#cumVolumeDelta };
        
        if (this.#oiEnabled || this.#cvdEnabled) {
            this.#yMax_OI = this.#OIDataPoints.length > 0 ? Math.max(...this.#OIDataPoints.map(Number)) * 1.001 : 0;
            this.#yMin_OI = this.#OIDataPoints.length > 0 ? Math.min(...this.#OIDataPoints.map(Number)) * 0.999 : 0;
        
            const cvdValues = this.#dataPoints.map(data => data.cumVolumeDelta);
            this.#yMax_CVD = (Math.max(...cvdValues, this.#currentDataPoint.cumVolumeDelta) || 0) * 1.001;
            this.#yMin_CVD = (Math.min(...cvdValues, this.#currentDataPoint.cumVolumeDelta) || 0) * 0.999;

            this.#scaleFactor_OI = this.#height / (this.#yMax_OI - this.#yMin_OI);
            this.#scaleFactor_CVD = this.#height / (this.#yMax_CVD - this.#yMin_CVD);
                
            this.drawStart();
        };
    }
    drawStart() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
    
        if (this.#dataPoints.length > 0) {
            const leftmostTime = (this.#currentDataPoint.startTime - this.#xZoom * 60 * 1000) + this.#panXoffset; 
            this.#dataPoints.forEach((data, index) => {
                const x = Math.round((data.startTime - leftmostTime) / (this.#xZoom * 60 * 1000) * (this.#width - this.#minuteWidth));
                if (this.#oiEnabled) {
                    const y = this.#height - ((this.#OIDataPoints[index] - this.#yMin_OI) * this.#scaleFactor_OI);
                    this.drawOIPoint(x + this.#panXoffset, y);
                };
                if (this.#cvdEnabled) {
                    const y = this.#height - ((data.cumVolumeDelta - this.#yMin_CVD) * this.#scaleFactor_CVD);
                    if (index > 0) {
                        const prevY = this.#height - ((this.#dataPoints[index - 1].cumVolumeDelta - this.#yMin_CVD) * this.#scaleFactor_CVD);
                        this.drawCVDLine(x + this.#panXoffset, prevY, x + this.#minuteWidth + this.#panXoffset, y);
                    };
                };
            });
        };
        if (this.#cvdEnabled) {
            const y = this.#height - ((this.#currentDataPoint.cumVolumeDelta - this.#yMin_CVD) * this.#scaleFactor_CVD);
            const x = Math.round(this.#width - this.#minuteWidth) + this.#panXoffset

            if (this.#dataPoints.length > 0) {
                const y1 = this.#height - ((this.#dataPoints[this.#dataPoints.length - 1].cumVolumeDelta - this.#yMin_CVD) * this.#scaleFactor_CVD);
                this.drawCVDLine(x, y1, x + this.#minuteWidth, y);
            } else {
                this.drawCVDLine(x, 0, x + this.#minuteWidth, y);
            };                  
        };  
    }      
    drawCVDLine(x, y, x1, y1) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x1, y1);
        this.#ctx.lineWidth = 2;
        this.#ctx.strokeStyle = "rgba(238, 216, 139, 0.3)";
        this.#ctx.stroke();
    } 
    drawOIPoint(x, y) {
        this.#ctx.beginPath();
        this.#ctx.arc(x + this.#minuteWidth, y, 2, 0, 2 * Math.PI);
        this.#ctx.fillStyle = "#c8c8c8";
        this.#ctx.fill();
    }
    async fetchOI(symbol) {
        const response = await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${symbol}`);
        const data = await response.json();
        return data.openInterest;
    }
}