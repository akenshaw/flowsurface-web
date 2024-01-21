![Screenshot 2024-01-21 at 5 55 46 PM 1](https://github.com/akenshaw/flowsurface/assets/63060680/7905e682-03de-4e82-8047-ce882859b7a2)
- Works completely on client-side, rendering happens on 2D canvas
#
### Currently supports;
  - all pairs on Binance Futures exchange,
  - 1 minute candlesticks
  - only newly received data/trades, no historical trades/orderbook
#
- Aggregated trades from the websocket source gets stored in a buffer until we receive new kline data(BinanceF streams it every ~250ms)
- Orderbook updates at every ~100ms, when we get a new kline data; this last orderbook update, the latest kline data and the trades buffer will pass on to get processed and then rendered
- Groups trades by the chosen tick size multiplier on it's kline timestamp point, also groups orderbook levels by this similar logic


