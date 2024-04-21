⚠️ this project deprecated, newer version is at [flowsurface-v2](https://github.com/akenshaw/flowsurface-rs)
#
![Screenshot 2024-02-23 at 8 02 31 PM](https://github.com/akenshaw/flowsurface/assets/63060680/322b71a6-b79b-4bed-9684-be6d595a25da)
- Works completely on client-side, rendering happens on 2D canvas
#
### Currently supports
  - All pairs on Binance Futures exchange
  - 1 minute candlesticks
  - ~~only newly received data/trades, no historical trades/orderbook~~ > Historical klines/trades are now gets fetched upto 60 1 minute klines with the user session 
#
### Data Processing
- Aggregated trades from the websocket source gets stored in a buffer until we receive new ~~kline~~ orderbook stream(BinanceF public API streams kline data every ~250ms, orderbook at every ~100ms)
- ~~When we get a new kline data; this last orderbook update, the latest kline data and the trades buffer will pass on to get processed and then rendered~~ > Now with each new orderbook update itself, the trades buffer and the latest kline stream get passed to the Canvas controller to processed and then to get rendered,

After the controller receives these 3 streams and sends them to their relevant canvas instance:
- The footprint instance groups trades on its kline timestamp point by the chosen tick size multiplier.
- The orderbook instance groups its levels also with this tick size.
- Other instances (volume, CVD, and OI):
  - Volume gets its data from the klines streams.
  - CVD gets from the trades buffer by counting up the buy/sell trade quantities.
  - OI works a bit differently as it doesn't have any WS stream. For now, it gets fetched at the end of each 1 minute kline, effectively showing the amount at its exact timestamp on the x-axis.


