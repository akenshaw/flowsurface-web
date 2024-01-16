async function fetchPremiumIndexes() {
  let fr_dict = {};

  const response = await fetch(`https://fapi.binance.com/fapi/v1/premiumIndex`);
  const data = await response.json();
  
  for (let i of data) {
    let symbol = i['symbol'];
    let funding_rate = parseFloat(i['lastFundingRate']) * 100;
    let mark_price = i['markPrice'];

    fr_dict[symbol] = {
        'funding_rate': Math.round(funding_rate * 10000) / 10000,
        'mark_price': Math.round(mark_price * 10000) / 10000
    };
  }
  return fr_dict;
}

async function fetch24hrMetrics() {
  let turnovers_dict = {};

  const response = await fetch(`https://fapi.binance.com/fapi/v1/ticker/24hr`);
  const data = await response.json();
  for (let i of data) {
    let symbol = i['symbol'];
    let volume = i['quoteVolume']
    let changeP = i['priceChangePercent'];

    turnovers_dict[symbol] = {
        'change': changeP,
        'volume': Math.round(volume)
    };
  }
  return turnovers_dict;
}

async function fetch_hist_OI(symbol) {
  console.log('Fetching OI history from API...');
  const response = await fetch(`https://fapi.binance.com/futures/data/openInterestHist?symbol=${symbol}&period=1h&limit=48`);
  const data = await response.json();
  return data;
}

export async function combineDicts() {
  let combined_dict = {};

  const fr_dict = await fetchPremiumIndexes();
  const turnovers_dict = await fetch24hrMetrics();

  for (let key in fr_dict) {
    if (turnovers_dict.hasOwnProperty(key)) {
      combined_dict[key] = {...fr_dict[key], ...turnovers_dict[key]};
    }
  }
  return combined_dict;
}