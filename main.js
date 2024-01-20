import { CanvasController } from "./canvasAggr.js";
import { combineDicts } from "./connectorUtils.js";
import { WebSocketService } from "./wsBinance.js";

const buttons = ['btn1', 'btn2', 'btn3', 'btn4'];
const menuIds = ['tickers-menu', 'menu2', 'menu3', 'settings-menu']; 
const functions = [showTickers, autoScaleToggle, showMenu, showSettings];

for (let i = 0; i < buttons.length; i++) {
  const button = document.getElementById(buttons[i]);
  button.addEventListener('click', functions[i]);
  button.addEventListener('click', function() {
    updateButtonState(buttons[i], menuIds[i]);
  });
}

const tickersMenu = document.getElementById("tickers-menu");
const settingsMenu = document.getElementById("settings-menu");

let input = document.getElementById('ticker-search');
let searchTerm;
input.addEventListener('keyup', function() {
  searchTerm = this.value.toLowerCase();
  let rows = document.querySelectorAll('#ticker-table tbody tr');

  for (let row of rows) {
    let symbol = row.cells[0].textContent.toLowerCase();

    if (symbol.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
});

function canvasStarter(symbol) {
  startCanvas(symbol);

  input.value = "";
  searchTerm = "";
  let rows = document.querySelectorAll('#ticker-table tbody tr');
  
  for (let row of rows) {
    row.style.display = '';
  }
  showTickers();
};

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return hours + ":" + minutes + ":" + seconds;
};
function updateLastUpdatedInfo() {
  const tickersUpdateInfo = document.getElementById("tickers-update-info");
  tickersUpdateInfo.textContent = "Last updated at " + getCurrentTime();
};

window.onload = function() {
  combineDicts().then((data) => {
    generateTable(data);
    updateLastUpdatedInfo();
  });
}
window.addEventListener("resize", function() {
  console.log("resize");
});

function showTickers() {  
  input.value = "";
  searchTerm = "";
  let rows = document.querySelectorAll('#ticker-table tbody tr');
  
  for (let row of rows) {
    row.style.display = '';
  }
  tickersMenu.style.display = tickersMenu.style.display === "none" ? "block" : "none";
  updateButtonState('btn1', 'tickers-menu');
};
function showMenu() {
  console.log("show menu");
};
function autoScaleToggle() {
};
function showSettings() {  
  settingsMenu.style.display = settingsMenu.style.display === "none" ? "block" : "none";
  updateButtonState('btn4', 'settings-menu');
};

function updateButtonState(buttonId, menuId) {
  const menu = document.getElementById(menuId);
  const button = document.getElementById(buttonId);
  
  if (buttonId === 'btn1' || buttonId === 'btn4') {
    if (menu.style.display === "block") {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  };
};

const tickersUpdateBtn = document.getElementById("tickers-update-btn");
tickersUpdateBtn.addEventListener('click', function() {
  tickersUpdateBtn.disabled = true;
  combineDicts().then((data) => {
    generateTable(data);
    updateLastUpdatedInfo();
  });
});

function formatLargeNumber(num) {
  if (num >= 1.0e+9) {
    return (num / 1.0e+9).toFixed(2) + "b";
  } else if (num >= 1.0e+6) {
    return (num / 1.0e+6).toFixed(2) + "m";
  } else if (num >= 1.0e+3) {
    return (num / 1.0e+3).toFixed(2) + "k";
  } else {
    return num;
  }
};
function formatNumber(value, type, price) {
  let displayValue;

  if (type === 'mark_price') {
    if (value > 10) {
      displayValue = Math.round(value * 100) / 100;
    } else {
      displayValue = Math.round(value * 10000) / 10000;
    }

  } else if (type === 'volume') {
    displayValue = formatLargeNumber(value);
    displayValue = '$' + displayValue;

  } else if (type === 'open_interest') {
    displayValue = formatLargeNumber(value*price);
    displayValue = '$' + displayValue;

  }
  return displayValue;
};
function generateTable(data) {
  let tableBody = document.querySelector("#tickers-menu table tbody");

  let entries = Object.entries(data);
  entries.sort(([,a], [,b]) => b.volume - a.volume);

  for (let i = 0; i < entries.length; i++) {
    let [symbol, symbolData] = entries[i];
    let row;

    if (i < tableBody.rows.length) {
      row = tableBody.rows[i];
    } else {
      row = tableBody.insertRow();
      row.insertCell(); // symbol
      row.insertCell(); // mark_price
      row.insertCell(); // change
      row.insertCell(); // funding
      row.insertCell(); // OI
      row.insertCell(); // OI change
      row.insertCell(); // volume
    }
    row.classList.add('table-row')

    row.cells[0].textContent = symbol;
    row.cells[1].textContent = formatNumber(symbolData.mark_price, 'mark_price', symbolData.mark_price);
    row.cells[2].textContent = (Math.round(symbolData.change * 100) / 100).toFixed(2) + "%";
    row.cells[3].textContent = symbolData.funding_rate + "%";
    row.cells[4].textContent = formatNumber(symbolData.open_interest, 'open_interest', symbolData.mark_price);
    row.cells[5].textContent = symbolData.OI_24hrChange + "%";
    row.cells[6].textContent = formatNumber(symbolData.volume, 'volume', symbolData.mark_price);

    const chng_color_a = Math.min(Math.abs(symbolData.change/100), 1);
    const fndng_color_a = Math.max(Math.abs(symbolData.funding_rate*50), 0.2);

    if (symbolData.change < 0) {
      row.style.backgroundColor = "rgba(192, 80, 78, " + chng_color_a*1.5 + ")";
    } else {
      row.style.backgroundColor = "rgba(81, 205, 160, " + chng_color_a + ")"; 
    };
    if (symbolData.funding_rate > 0) {
      row.cells[3].style.color =  "rgba(212, 80, 78, " + fndng_color_a*1.5 + ")";
    } else {
      row.cells[3].style.color = "rgba(81, 246, 160, " + fndng_color_a*1.5 + ")";
    };
    row.addEventListener('click', function() { canvasStarter(symbol) });
  }
  tickersUpdateBtn.disabled = false;
}; 

// create main canvas
let newCanvas = document.createElement("canvas");
newCanvas.id = "canvas1";
newCanvas.style.position = "absolute";
newCanvas.style.left = "0px";
newCanvas.style.top = "0px";

document.body.appendChild(newCanvas);
let canvas = document.querySelector("#canvas1")
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.9; 
canvas.height = window.innerHeight * 0.9;

// create right canvas
let newCanvasRight = document.createElement("canvas");
newCanvasRight.id = "canvas2";
newCanvasRight.style.position = "absolute";
newCanvasRight.style.left = canvas.width + "px"; 

document.body.appendChild(newCanvasRight);
let canvasRight = document.querySelector("#canvas2")
let ctxRight = canvasRight.getContext("2d");
canvasRight.width = window.innerWidth * 0.1;
canvasRight.height = window.innerHeight * 0.9;

// create bottom canvas
let newCanvasBottom = document.createElement("canvas");
newCanvasBottom.id = "canvas3";
newCanvasBottom.style.position = "absolute";
newCanvasBottom.style.left = "0px";
newCanvasBottom.style.top = canvas.height + "px";

document.body.appendChild(newCanvasBottom);
let canvasBottom = document.querySelector("#canvas3")
let ctxBottom = canvasBottom.getContext("2d");
canvasBottom.width = canvas.width; 
canvasBottom.height = window.innerHeight * 0.1; 

// create controller and websocket
const webSocketService = new WebSocketService();
const MainCanvas = new CanvasController(ctx, canvas, canvas.width, canvas.height, ctxRight, canvasRight, canvasRight.width, canvasRight.height, ctxBottom, canvasBottom, canvasBottom.width, canvasBottom.height);

function startCanvas(symbol) {  
  MainCanvas.resetData();
  
  fetchExchangeInfo(symbol).then((tickSize) => { 
    MainCanvas.tickSize = tickSize;
    document.querySelector("#ticksize-select").dispatchEvent(new Event('change'));

    // start websocket, send the data to the controller as it arrives
    webSocketService.createWebSocket(symbol, data => MainCanvas.updateData(data))
  });
};

async function fetchExchangeInfo(symbol) {
  const response = await fetch(`https://fapi.binance.com/fapi/v1/exchangeInfo`);
  const data = await response.json();

  let symbol_info = data['symbols'].find(x => x.symbol === symbol);
  if (symbol_info) {
      return symbol_info['filters'][0]['tickSize'];
  } else {
      return null;
  }
};