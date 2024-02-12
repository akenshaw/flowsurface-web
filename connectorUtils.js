export async function combineDicts() {
  let currentTime = Date.now();
  let startTime = currentTime - 25 * 60 * 60 * 1000;
  let endTime = startTime + 60 * 60 * 1000;

  let combined_dict = {};

  const [fr_dict, turnovers_dict] = await Promise.all([
    fetchPremiumIndexes(),
    fetch24hrMetrics(),
  ]);

  const symbols = Object.keys(fr_dict).filter(
    (symbol) =>
      ![
        "BTCSTUSDT",
        "CVCUSDT",
        "DOGEUSDC",
        "COCOSUSDT",
        "BNBBTC",
        "ETHBTC",
        "RAYUSDT",
        "HNTUSDT",
        "SCUSDT",
        "WIFUSDT",
        "BTSUSDT",
        "TOMOUSDT",
        "FTTUSDT",
        "SRMUSDT",
      ].includes(symbol) && !symbol.includes("_")
  );
  const hist_OI_promises = symbols.map((symbol) =>
    fetch_hist_OI(symbol, startTime, endTime)
  );
  const hist_OI_data_arr = await Promise.all(hist_OI_promises);

  symbols.forEach((symbol, i) => {
    if (turnovers_dict.hasOwnProperty(symbol)) {
      combined_dict[symbol] = {
        ...fr_dict[symbol],
        ...turnovers_dict[symbol],
        ...hist_OI_data_arr[i],
      };
    }
  });
  return combined_dict;
}

async function fetch_hist_OI(symbol, startTime, endTime) {
  let current_OI;
  try {
    current_OI = await fetch_current_OI(symbol);
    const response = await fetch(
      `https://fapi.binance.com/futures/data/openInterestHist?symbol=${symbol}&period=30m&limit=1&startTime=${startTime}&endTime=${endTime}`
    );
    const data = await response.json();

    const OI_24hrAgo = Math.round(data[0].sumOpenInterest);
    const OI_24hrChange =
      Math.round(((current_OI - OI_24hrAgo) / OI_24hrAgo) * 10000) / 100;

    return { open_interest: current_OI, OI_24hrChange: OI_24hrChange };
  } catch (error) {
    return { open_interest: current_OI, OI_24hrChange: NaN };
  }
}

async function fetch_current_OI(symbol) {
  try {
    const response = await fetch(
      `https://fapi.binance.com/fapi/v1/openInterest?symbol=${symbol}`
    );
    const data = await response.json();
    return Number(data["openInterest"]);
  } catch (error) {
    console.log(error, symbol);
    return NaN;
  }
}

async function fetchPremiumIndexes() {
  let fr_dict = {};

  const response = await fetch(`https://fapi.binance.com/fapi/v1/premiumIndex`);
  const data = await response.json();

  for (let i of data) {
    let symbol = i["symbol"];
    let funding_rate = parseFloat(i["lastFundingRate"]) * 100;
    let mark_price = parseFloat(i["markPrice"]);

    fr_dict[symbol] = {
      funding_rate: parseFloat(funding_rate.toFixed(3)),
      mark_price: Math.round(mark_price * 10000) / 10000,
    };
  }
  return fr_dict;
}

async function fetch24hrMetrics() {
  let turnovers_dict = {};

  const response = await fetch(`https://fapi.binance.com/fapi/v1/ticker/24hr`);
  const data = await response.json();
  for (let i of data) {
    let symbol = i["symbol"];
    let volume = i["quoteVolume"];
    let changeP = i["priceChangePercent"];

    turnovers_dict[symbol] = {
      change: Number(changeP),
      volume: Math.round(volume),
    };
  }
  return turnovers_dict;
}
