export class WebSocketService {
  #socket;
  #aggTradeBuffer = [];
  #klineBuffer = [];
  #lowercaseSymbol;
  #is_first_event = true;
  last_update_id;
  order_book;
  constructor() {
    console.log("Initializing WebSocketService");
  }

  createWebSocket(symbol, callback) {
    if (this.#socket && this.#socket.readyState === 1) {
      console.log(
        "Closing existing websocket connection for symbol:",
        this.#lowercaseSymbol.toUpperCase()
      );
      this.order_book.shouldRefresh = false;
      this.#socket.close();

      this.#is_first_event = true;
      this.order_book = null;
      this.#aggTradeBuffer = [];
      this.#klineBuffer = [];
    }
    console.log("Creating websocket connection for symbol:", symbol);
    this.#lowercaseSymbol = symbol.toLowerCase();

    fetchOrderbook(this.#lowercaseSymbol)
      .then((depth_snapshot) => {
        this.#socket = new WebSocket(
          `wss://fstream.binance.com/stream?streams=${
            this.#lowercaseSymbol
          }@aggTrade/${this.#lowercaseSymbol}@depth@100ms/${
            this.#lowercaseSymbol
          }@kline_1m`
        );
        this.setupEventListeners(this.#socket, callback);

        this.last_update_id = depth_snapshot.lastUpdateId;
        this.order_book = new OrderBook(
          this.#lowercaseSymbol,
          depth_snapshot.bids,
          depth_snapshot.asks
        );
      })
      .catch((error) => {
        console.error("Error initializing the order book:", error);
      });
  }
  setupEventListeners(socket, callback) {
    socket.addEventListener("open", () => {
      this.order_book.refresh_order_book(this.#lowercaseSymbol);
      console.log("New WebSocket connection opened");
    });
    socket.addEventListener("close", () => {
      console.log("Previous WebSocket connection was closed");
    });

    let isHandlingDepth = false;
    socket.addEventListener("message", async (event) => {
      let message = JSON.parse(event.data);

      if (message.stream.endsWith("@aggTrade")) {
        let aggtradeStream = message.data;
        this.#aggTradeBuffer.push({
          x: aggtradeStream.T,
          y: parseFloat(aggtradeStream.p),
          q: parseFloat(aggtradeStream.q),
          m: aggtradeStream.m,
        });
      } else if (message.stream.endsWith("@depth@100ms")) {
        if (isHandlingDepth) {
          console.log("isHandlingDepth:", isHandlingDepth);
          return;
        }
        isHandlingDepth = true;
        await this.handleDepth(message.data);

        isHandlingDepth = false;

        callback({
          kline: this.#klineBuffer,
          depth: this.order_book.order_book,
          tradesBuffer: this.#aggTradeBuffer,
        });
        this.#aggTradeBuffer = [];
      } else if (message.stream.endsWith("@kline_1m")) {
        this.#klineBuffer = message.data;
      }
    });
  }
  async handleDepth(depthStream) {
    let finalUpdateId = depthStream.u;
    let firstUpdateId = depthStream.U;
    let previousFinalUpdateId = depthStream.pu;

    if (finalUpdateId < this.last_update_id) {
      console.log(
        "finalUpdateId < last_update_id",
        finalUpdateId,
        this.last_update_id
      );
      return;
    }
    if (this.#is_first_event) {
      if (
        firstUpdateId <= this.last_update_id &&
        this.last_update_id <= finalUpdateId
      ) {
        console.log("First processed event succeeded");
        this.#is_first_event = false;
      } else {
        await this.reinitializeOrderBook(this.#lowercaseSymbol);
        return;
      }
    } else if (previousFinalUpdateId != this.last_update_id) {
      await this.reinitializeOrderBook(this.#lowercaseSymbol);
      return;
    }

    await this.order_book.update_order_book(depthStream.b, depthStream.a);
    this.last_update_id = finalUpdateId;
  }
  async reinitializeOrderBook(symbol) {
    console.log("Out of sync, reinitializing order book...");
    const depth_snapshot = await fetchOrderbook(symbol);
    this.last_update_id = depth_snapshot.lastUpdateId;
    this.order_book.order_book = this.order_book.initialize_order_book(
      depth_snapshot.bids,
      depth_snapshot.asks
    );
    this.#aggTradeBuffer = [];
  }
}

class OrderBook {
  currentSymbol;
  order_book;
  shouldRefresh = true;
  constructor(symbol, bids, asks) {
    console.log("initializing new OrderBook class");
    this.currentSymbol = symbol;
    this.order_book = this.initialize_order_book(bids, asks);
  }

  initialize_order_book(bids, asks) {
    let bids_array = bids.map((bid) => bid.map(Number));
    let asks_array = asks.map((ask) => ask.map(Number));

    return { bids: bids_array, asks: asks_array };
  }
  async refresh_order_book(symbol) {
    let controller = new AbortController();
    let intervalId = setInterval(async () => {
      if (!this.shouldRefresh || symbol !== this.currentSymbol) {
        clearInterval(intervalId);
        controller.abort();
      } else {
        controller = new AbortController();
        try {
          let data = await fetchOrderbook(symbol, {
            signal: controller.signal,
          });
          this.order_book = this.initialize_order_book(data.bids, data.asks);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Fetch operation aborted");
          } else {
            console.error("Error fetching order book:", error);
          }
        }
      }
    }, 6000);
  }
  async update_order_book(new_bids, new_asks) {
    let bids_array = new_bids.map((bid) => bid.map(Number));
    let asks_array = new_asks.map((ask) => ask.map(Number));

    [this.order_book["bids"], this.order_book["asks"]] =
      await this.prepare_order_book(
        this.order_book["bids"],
        this.order_book["asks"],
        bids_array,
        asks_array
      );
  }
  async prepare_order_book(bids, asks, new_bids, new_asks) {
    try {
      const bidsMap = new Map(
        [...bids, ...new_bids].filter(
          (bid) => bid[0] >= bids[bids.length - 1][0]
        )
      );
      const asksMap = new Map(
        [...asks, ...new_asks].filter(
          (ask) => ask[0] <= asks[asks.length - 1][0]
        )
      );

      let conc_bids = Array.from(bidsMap.entries())
        .filter((bid) => bid[1] !== 0)
        .sort((a, b) => b[0] - a[0]);
      let conc_asks = Array.from(asksMap.entries())
        .filter((ask) => ask[1] !== 0)
        .sort((a, b) => a[0] - b[0]);

      if (conc_bids[0][0] >= conc_asks[0][0]) {
        conc_bids = conc_bids.filter(
          (bid) => bid[0] < new_bids[new_bids.length - 1][0]
        );
        conc_asks = conc_asks.filter((ask) => ask[0] > new_asks[0][0]);

        console.log(
          "Error: bids[0] >= asks[0], rehandled to: ",
          conc_bids[0][0],
          conc_asks[0][0]
        );
      }
      return [conc_bids, conc_asks];
    } catch (error) {
      console.error("Error preparing order book:", error);

      //new_bids = new_bids.filter(bid => bid[0] >= bids[bids.length-1][0]);
      //new_asks = new_asks.filter(ask => ask[0] <= asks[asks.length-1][0]);
      return [new_bids, new_asks];
    }
  }
}

async function fetchOrderbook(symbol) {
  const response = await fetch(
    `https://fapi.binance.com/fapi/v1/depth?symbol=${symbol}&limit=500`
  );
  const data = await response.json();
  return data;
}
