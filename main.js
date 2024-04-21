import { CanvasController } from "./canvasAggr.js";
import {
  combineDicts,
  fetchTickerInfo,
  tickersOIfetch,
  fetchMarkPrice,
} from "./connectorUtils.js";
import { WebSocketService } from "./wsBinance.js";

const buttons = ["btn1", "btn2", "btn3", "btn4"];
const menuIds = ["tickers-menu", "menu2", "menu3", "settings-menu"];
const functions = [showTickers, showMenu, showMenu, showSettings];

for (let i = 0; i < buttons.length; i++) {
  const button = document.getElementById(buttons[i]);
  button.addEventListener("click", functions[i]);
  button.addEventListener("click", function () {
    updateButtonState(buttons[i], menuIds[i]);
  });
}

const tickersMenu = document.getElementById("tickers-menu");
const settingsMenu = document.getElementById("settings-menu");

let input = document.getElementById("ticker-search");
let searchTerm;
input.addEventListener("keyup", function () {
  searchTerm = this.value.toLowerCase();
  let rows = document.querySelectorAll("#ticker-table tbody tr");

  for (let row of rows) {
    let symbol = row.cells[0].textContent.toLowerCase();

    if (symbol.includes(searchTerm)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
});

function updateTable() {
  tickersUpdateBtn.className = "loading-animation";
  tickersUpdateBtn.disabled = true;
  combineDicts().then((data) => {
    generateTable(data);

    let startTime = Date.now() - 25 * 60 * 60 * 1000;
    let endTime = startTime + 60 * 60 * 1000;

    tickersOIfetch(Object.keys(data), startTime, endTime).then(
      (hist_OI_data) => {
        Object.keys(hist_OI_data).forEach((symbol) => {
          if (data.hasOwnProperty(symbol)) {
            data[symbol] = {
              ...data[symbol],
              ...hist_OI_data[symbol],
            };
          }
        });
        generateTable(data);
        tickersUpdateBtn.disabled = false;
        tickersUpdateBtn.className = "";
      }
    );
    updateLastUpdatedInfo();
  });
}
function canvasStarter(symbol, initialPrice) {
  if (initialPrice === null) {
    fetchMarkPrice(symbol).then((price) => {
      console.log("initial canvas was started with symbol: " + symbol, price);
      startCanvas(symbol, price);
    });
  } else {
    startCanvas(symbol, initialPrice);
    console.log("canvas was started with symbol: " + symbol);
  }

  input.value = "";
  searchTerm = "";
  let rows = document.querySelectorAll("#ticker-table tbody tr");

  for (let row of rows) {
    row.style.display = "";
  }
  if (tickersMenu.style.display === "block") {
    showTickers();
  }
}

function updateLastUpdatedInfo() {
  const now = new Date();
  const currentTime =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0") +
    ":" +
    now.getSeconds().toString().padStart(2, "0");
  const tickersUpdateInfo = document.getElementById("tickers-update-info");
  tickersUpdateInfo.textContent = "Last updated at " + currentTime;
}

const tickersUpdateBtn = document.getElementById("tickers-update-btn");
tickersUpdateBtn.addEventListener("click", function () {
  updateTable();
});

window.onload = function () {
  updateTable();
  canvasStarter("BTCUSDT", null);
};

function showMenu() {
  console.log("show menu");
}
function showTickers() {
  input.value = "";
  searchTerm = "";
  let rows = document.querySelectorAll("#ticker-table tbody tr");

  for (let row of rows) {
    row.style.display = "";
  }
  tickersMenu.style.display =
    tickersMenu.style.display === "none" ? "block" : "none";
  updateButtonState("btn1", "tickers-menu");

  if (tickersMenu.style.display === "block") {
    document.addEventListener("click", closeMenu);
  } else {
    document.removeEventListener("click", closeMenu);
  }
}
function showSettings() {
  settingsMenu.style.display =
    settingsMenu.style.display === "none" ? "block" : "none";
  updateButtonState("btn4", "settings-menu");

  if (settingsMenu.style.display === "block") {
    document.addEventListener("click", closeMenu);
  } else {
    document.removeEventListener("click", closeMenu);
  }
}
function closeMenu(e) {
  const btn1 = document.querySelector("#btn1");
  const btn4 = document.querySelector("#btn4");

  if (!settingsMenu.contains(e.target) && !btn4.contains(e.target)) {
    settingsMenu.style.display = "none";
    updateButtonState("btn4", "settings-menu");
  }
  if (!tickersMenu.contains(e.target) && !btn1.contains(e.target)) {
    tickersMenu.style.display = "none";
    updateButtonState("btn1", "tickers-menu");
  }

  if (
    settingsMenu.style.display === "none" &&
    tickersMenu.style.display === "none"
  ) {
    document.removeEventListener("click", closeMenu);
  }
}

function updateButtonState(buttonId, menuId) {
  const menu = document.getElementById(menuId);
  const button = document.getElementById(buttonId);

  if (buttonId === "btn1" || buttonId === "btn4") {
    if (menu.style.display === "block") {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  }
}

function formatLargeNumber(num) {
  if (num >= 1.0e9) {
    return (num / 1.0e9).toFixed(2) + "b";
  } else if (num >= 1.0e6) {
    return (num / 1.0e6).toFixed(2) + "m";
  } else if (num >= 1.0e3) {
    return (num / 1.0e3).toFixed(2) + "k";
  } else {
    return num;
  }
}
function formatNumber(value, type, price) {
  let displayValue;

  if (type === "mark_price") {
    if (value > 10) {
      displayValue = Math.round(value * 100) / 100;
    } else {
      displayValue = Math.round(value * 10000) / 10000;
    }
  } else if (type === "volume") {
    displayValue = formatLargeNumber(value);
    displayValue = "$" + displayValue;
  } else if (type === "open_interest") {
    displayValue = formatLargeNumber(value * price);
    displayValue = "$" + displayValue;
  }
  return displayValue;
}
function generateTable(data) {
  let tableBody = document.querySelector("#tickers-menu table tbody");
  tableBody.innerHTML = "";

  let entries = Object.entries(data);
  entries.sort(([, a], [, b]) => b.volume - a.volume);

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
    row.classList.add("table-row");

    row.cells[0].textContent = symbol;
    row.cells[1].textContent = formatNumber(
      symbolData.mark_price,
      "mark_price",
      symbolData.mark_price
    );
    row.cells[2].textContent =
      (Math.round(symbolData.change * 100) / 100).toFixed(2) + "%";
    row.cells[3].textContent = symbolData.funding_rate + "%";
    row.cells[4].textContent =
      data.hasOwnProperty(symbol) &&
      data[symbol].hasOwnProperty("open_interest")
        ? formatNumber(
            data[symbol].open_interest,
            "open_interest",
            data[symbol].mark_price
          )
        : "...";
    row.cells[5].textContent =
      data.hasOwnProperty(symbol) &&
      data[symbol].hasOwnProperty("OI_24hrChange")
        ? data[symbol].OI_24hrChange + "%"
        : "...";
    row.cells[6].textContent = formatNumber(
      symbolData.volume,
      "volume",
      symbolData.mark_price
    );

    const chng_color_a = Math.min(Math.abs(symbolData.change / 100), 1);
    const fndng_color_a = Math.max(Math.abs(symbolData.funding_rate * 50), 0.2);

    if (symbolData.change < 0) {
      row.style.backgroundColor =
        "rgba(192, 80, 78, " + chng_color_a * 1.5 + ")";
    } else {
      row.style.backgroundColor = "rgba(81, 205, 160, " + chng_color_a + ")";
    }
    if (symbolData.funding_rate > 0) {
      row.cells[3].style.color =
        "rgba(212, 80, 78, " + fndng_color_a * 1.5 + ")";
    } else {
      row.cells[3].style.color =
        "rgba(81, 246, 160, " + fndng_color_a * 1.5 + ")";
    }
    row.addEventListener("click", function () {
      canvasStarter(symbol, symbolData.mark_price);
    });
  }
}

function resizeCanvasToDisplaySize(canvas) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

let canvasData = [
  { id: "canvas1", overlayId: "overlay-canvas1" },
  { id: "canvas2", overlayId: "overlay-canvas2" },
  { id: "canvas3", overlayId: null },
  { id: "canvas4", overlayId: null },
];
let canvasObjects = canvasData.map((data) => {
  let canvas = document.querySelector(`#${data.id}`);
  resizeCanvasToDisplaySize(canvas);
  let ctx = canvas.getContext("2d");

  let overlayCanvas = null;
  let overlayCtx = null;
  if (data.overlayId) {
    overlayCanvas = document.querySelector(`#${data.overlayId}`);
    resizeCanvasToDisplaySize(overlayCanvas);
    overlayCtx = overlayCanvas.getContext("2d");
  }

  return {
    ctx: ctx,
    canvas: canvas,
    width: canvas.width,
    height: canvas.height,
    overlayCtx: overlayCtx,
    overlayCanvas: overlayCanvas,
  };
});
const webSocketService = new WebSocketService();
const MainCanvas = new CanvasController(canvasObjects);

function startCanvas(symbol, initialPrice) {
  fetchTickerInfo(symbol).then(([tickSize, minQty]) => {
    // start websocket, send the data to the controller as it arrives
    webSocketService.createWebSocket(symbol, (data) =>
      MainCanvas.updateData(data)
    );

    MainCanvas.startNew(symbol, tickSize, minQty, initialPrice);
    document
      .querySelector("#ticksize-select")
      .dispatchEvent(new Event("change"));
    document.querySelector("#tickerInfo-name").textContent = symbol;
  });
}
