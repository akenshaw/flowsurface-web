var Et=Object.defineProperty;var Tt=(r,e,i)=>e in r?Et(r,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[e]=i;var E=(r,e,i)=>(Tt(r,typeof e!="symbol"?e+"":e,i),i),yt=(r,e,i)=>{if(!e.has(r))throw TypeError("Cannot "+i)};var t=(r,e,i)=>(yt(r,e,"read from private field"),i?i.call(r):e.get(r)),h=(r,e,i)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,i)},c=(r,e,i,s)=>(yt(r,e,"write to private field"),s?s.call(r,i):e.set(r,i),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();var z,B,F;class Ct{constructor(e,i,s,o,n,a,l,d,m,w,S){E(this,"zoomYLevel",.2222);E(this,"zoomXLevel",0);h(this,z,void 0);h(this,B,void 0);h(this,F,void 0);E(this,"tickSize");c(this,z,new zt(this,e,i,s)),c(this,B,new Pt(this,o,n,a,l)),c(this,F,new Dt(this,d,m,w,S)),t(this,B).canvas.addEventListener("wheel",p=>{p.preventDefault();const y=5e-4/(.01-.001);let Z=this.zoomYLevel-(p.deltaY>0?-y:y);this.zoomYLevel=Math.max(0,Math.min(Z,1)),t(this,z).zoomY(this.zoomYLevel),t(this,B).zoomY(this.zoomYLevel)}),t(this,F).canvas.addEventListener("wheel",p=>{p.preventDefault();const y=5e-4/(.01-.001);let Z=this.zoomXLevel+(p.deltaY>0?-y:y);this.zoomXLevel=Math.max(0,Math.min(Z,1)),t(this,z).zoomX(this.zoomXLevel),t(this,F).zoomX(this.zoomXLevel)});const u=document.querySelector("#ticksize-select");u.addEventListener("change",p=>{const y=this.tickSize*u.value;console.log("new tick size:",y),t(this,z).bucketSize=y,t(this,z).maxQuantity=20,t(this,B).bucketSize=y})}updateData(e){t(this,z).updateData(e.kline,e.tradesBuffer),t(this,B).updateData(e.kline,e.depth),t(this,F).updateData(e.kline)}}z=new WeakMap,B=new WeakMap,F=new WeakMap;var ct,f,P,_,I,R,O,V,K,T,$,J,k,G,tt,U;class zt{constructor(e,i,s,o){h(this,ct,void 0);h(this,f,void 0);h(this,P,void 0);h(this,_,void 0);h(this,I,[]);h(this,R,[]);h(this,O,void 0);h(this,V,[]);h(this,K,void 0);h(this,T,void 0);h(this,$,void 0);h(this,J,60);h(this,k,void 0);h(this,G,.997);h(this,tt,1.003);h(this,U,30);E(this,"bucketSize");c(this,ct,e),c(this,f,i),c(this,P,s),c(this,_,o),c(this,k,Math.round(1*60*1e3/(30*60*1e3)*(t(this,P)-t(this,J)))),this.tradesDrawType=0,this.maxQuantity=20}zoomY(e){const a=.001+.009000000000000001*e,l=.001+(.01-.001)*e;c(this,G,Math.round((1-a)*1e4)/1e4),c(this,tt,Math.round((1+l)*1e4)/1e4)}zoomX(e){c(this,U,30+-20*e),c(this,k,Math.round(1*60*1e3/(t(this,U)*60*1e3)*(t(this,P)-t(this,J))))}updateData(e,i){const{k:{t:s,T:o,o:n,h:a,l,c:d}}=e;c(this,T,Math.min((Number(a)+Number(l))/2*t(this,G),l)),c(this,$,Math.max((Number(a)+Number(l))/2*t(this,tt),a)),t(this,K)!==n&&(t(this,O)&&(t(this,I).push(t(this,O)),t(this,R).push(t(this,V)),t(this,I).length>60&&(t(this,I).shift(),t(this,R).shift()),c(this,V,[])),c(this,K,n)),c(this,O,{startTime:s,endTime:o,openPrice:n,highPrice:a,lowPrice:l,closePrice:d}),t(this,V).push(i),this.drawStart()}drawStart(){if(t(this,f).clearRect(0,0,t(this,P),t(this,_)),t(this,I).length>0){const e=t(this,O).startTime-t(this,U)*60*1e3;t(this,I).forEach((i,s)=>{const o=t(this,R)[s],n=Math.round((i.startTime-e)/(t(this,U)*60*1e3)*(t(this,P)-t(this,k)));this.drawDataPoint(o,i,n)})}this.drawDataPoint(t(this,V),t(this,O),Math.round(t(this,P)-t(this,k)))}drawDataPoint(e,i,s){const o=t(this,_)/(t(this,$)-t(this,T)),n=Math.round(t(this,_)-(i.openPrice-t(this,T))*o),a=Math.round(t(this,_)-(i.highPrice-t(this,T))*o),l=Math.round(t(this,_)-(i.lowPrice-t(this,T))*o),d=Math.round(t(this,_)-(i.closePrice-t(this,T))*o);this.drawKlineAt(s,a-2),this.drawKlineAt(s,l+2);const w=[].concat(...e).reduce((u,p)=>{const y=Math.round(p.y/this.bucketSize)*this.bucketSize,Z=`${y}-${p.m}`;return u[Z]||(u[Z]={...p,y,q:0}),u[Z].q+=p.q,u},{}),S=Math.max(...Object.values(w).map(u=>u.q));this.maxQuantity=S>this.maxQuantity?S:this.maxQuantity,Object.values(w).forEach(u=>{const p=Math.round(t(this,_)-(u.y-t(this,T))*o),y=this.scaleQuantity(u.q);this.drawTradesAt(s,p,u.m,y)}),t(this,f).beginPath(),t(this,f).moveTo(s+t(this,k)/2,n),t(this,f).lineTo(s+t(this,k)/2,d),t(this,f).strokeStyle=d<n?"#9BE6D1":"#E6A1A0",t(this,f).stroke()}drawKlineAt(e,i){t(this,f).beginPath(),t(this,f).moveTo(e+5,i),t(this,f).lineTo(e+t(this,k)-5,i),t(this,f).strokeStyle="rgba(200, 200, 200, 0.5)",t(this,f).stroke()}drawTradesAt(e,i,s,o){t(this,f).beginPath(),s?(t(this,f).moveTo(e-4+t(this,k)/2,i),t(this,f).lineTo(e-4+t(this,k)/2-o,i),t(this,f).strokeStyle="rgba(192, 80, 77, 1)"):(t(this,f).moveTo(e+4+t(this,k)/2,i),t(this,f).lineTo(e+4+t(this,k)/2+o,i),t(this,f).strokeStyle="rgba(81, 205, 160, 1)"),t(this,f).stroke()}scaleQuantity(e){const o=t(this,k)/2-4;return 0+(e-.001)*(o-0)/(this.maxQuantity-.001)}}ct=new WeakMap,f=new WeakMap,P=new WeakMap,_=new WeakMap,I=new WeakMap,R=new WeakMap,O=new WeakMap,V=new WeakMap,K=new WeakMap,T=new WeakMap,$=new WeakMap,J=new WeakMap,k=new WeakMap,G=new WeakMap,tt=new WeakMap,U=new WeakMap;var lt,g,Y,L,et,q,C,X,it,st;class Pt{constructor(e,i,s,o,n){h(this,lt,void 0);h(this,g,void 0);h(this,Y,void 0);h(this,L,void 0);h(this,et,void 0);h(this,q,void 0);h(this,C,void 0);h(this,X,void 0);h(this,it,.997);h(this,st,1.003);E(this,"bucketSize");c(this,lt,e),c(this,g,i),this.canvas=s,c(this,Y,o),c(this,L,n),this.maxQuantity=20}zoomY(e){const a=.001+.009000000000000001*e,l=.001+(.01-.001)*e;c(this,it,Math.round((1-a)*1e4)/1e4),c(this,st,Math.round((1+l)*1e4)/1e4)}updateData(e,i){const{k:{o:s,h:o,l:n,c:a}}=e;c(this,et,{openPrice:s,highPrice:o,lowPrice:n,closePrice:a});const{asks:l,bids:d}=i;c(this,q,{asks:l,bids:d}),c(this,C,Math.min((Number(o)+Number(n))/2*t(this,it),n)),c(this,X,Math.max((Number(o)+Number(n))/2*t(this,st),o)),this.drawStart()}drawStart(){t(this,g).clearRect(0,0,t(this,Y),t(this,L));const e=t(this,L)/(t(this,X)-t(this,C)),{closePrice:i,openPrice:s}=t(this,et),o=Math.round(t(this,L)-(i-t(this,C))*e),n=Math.round(t(this,L)-(s-t(this,C))*e),a=o>n?"#C0504E":o<n?"#51CDA0":"#c8c8c8";if(this.drawTextAt(o,i,a),this.drawTextAt(t(this,L)-10,Math.round(t(this,C)),"#c8c8c8"),this.drawTextAt(15,Math.round(t(this,X)),"#c8c8c8"),this.maxQuantity=20,t(this,q).asks&&t(this,q).bids){const l=S=>S.reduce((u,p)=>{const y=Math.round(p[0]/this.bucketSize)*this.bucketSize;return u[y]||(u[y]=0),u[y]+=parseFloat(p[1]),u},{}),d=l(t(this,q).asks),m=l(t(this,q).bids),w=[...Object.values(d),...Object.values(m)];this.maxQuantity=Math.max.apply(null,w),Object.entries(d).forEach(([S,u])=>{const p=Math.round(t(this,L)-(S-t(this,C))*e);this.drawLineAt(p,"#C0504E",u)}),Object.entries(m).forEach(([S,u])=>{const p=Math.round(t(this,L)-(S-t(this,C))*e);this.drawLineAt(p,"#51CDA0",u)})}t(this,g).font="10px monospace",t(this,g).fillStyle="#c8c8c8",t(this,g).fillText(Math.round(this.maxQuantity),t(this,Y)-40,40)}drawLineAt(e,i,s){const o=s/this.maxQuantity*(t(this,Y)-80);t(this,g).beginPath(),t(this,g).moveTo(80,e),t(this,g).lineTo(o+80,e),t(this,g).strokeStyle=i,t(this,g).lineWidth=1,t(this,g).stroke()}drawTextAt(e,i,s){t(this,g).font="12px monospace",t(this,g).fillStyle=s,t(this,g).fillText(i,10,e)}}lt=new WeakMap,g=new WeakMap,Y=new WeakMap,L=new WeakMap,et=new WeakMap,q=new WeakMap,C=new WeakMap,X=new WeakMap,it=new WeakMap,st=new WeakMap;var dt,b,D,v,A,W,ot,nt,rt,x,N;class Dt{constructor(e,i,s,o,n){h(this,dt,void 0);h(this,b,void 0);h(this,D,void 0);h(this,v,void 0);h(this,A,[]);h(this,W,void 0);h(this,ot,void 0);h(this,nt,void 0);h(this,rt,60);h(this,x,void 0);h(this,N,30);c(this,dt,e),c(this,b,i),this.canvas=s,c(this,D,o),c(this,v,n),c(this,x,Math.round(1*60*1e3/(t(this,N)*60*1e3)*(t(this,D)-t(this,rt))))}zoomX(e){c(this,N,30+-20*e),c(this,x,Math.round(1*60*1e3/(t(this,N)*60*1e3)*(t(this,D)-t(this,rt))))}updateData(e){const{k:{t:i,T:s,v:o,V:n}}=e,a=o-n;c(this,nt,Math.round(t(this,A).reduce((l,d)=>Math.max(l,d.buyVolume,d.sellVolume),Math.max(n,a)))),t(this,ot)!==i&&(t(this,W)&&(t(this,A).push(t(this,W)),t(this,A).length>60&&t(this,A).shift()),c(this,ot,i)),c(this,W,{startTime:i,endTime:s,buyVolume:n,sellVolume:a}),this.drawStart()}drawStart(){if(t(this,b).clearRect(0,0,t(this,D),t(this,v)),t(this,A).length>0){const e=t(this,W).startTime-t(this,N)*60*1e3;t(this,A).forEach((i,s)=>{const o=Math.round((i.startTime-e)/(t(this,N)*60*1e3)*(t(this,D)-t(this,x)));this.drawDataPoint(i,o)})}this.drawDataPoint(t(this,W),Math.round(t(this,D)-t(this,x)))}drawDataPoint(e,i){const s=(t(this,v)-20)/t(this,nt),o=Math.max(0,Math.min(t(this,v)-20,Math.round(t(this,v)-20-e.buyVolume*s))),n=Math.max(0,Math.min(t(this,v)-20,Math.round(t(this,v)-20-e.sellVolume*s)));t(this,b).beginPath(),t(this,b).moveTo(i,0),t(this,b).lineTo(i,t(this,v)-20),t(this,b).strokeStyle="rgba(200, 200, 200, 0.4)",t(this,b).lineWidth=1,t(this,b).stroke(),this.drawTimeLabel(i,e.startTime),this.drawKlineAt(i+t(this,x)/2+t(this,x)/8,o,"#51CDA0"),this.drawKlineAt(i+t(this,x)/2-t(this,x)/8,n,"#C0504E")}drawKlineAt(e,i,s){t(this,b).beginPath(),t(this,b).moveTo(e,t(this,v)-20),t(this,b).lineTo(e,i),t(this,b).strokeStyle=s,t(this,b).lineWidth=t(this,x)/6,t(this,b).stroke()}drawTimeLabel(e,i){const s=new Date(i),o=s.getHours().toString().padStart(2,"0")+":"+s.getMinutes().toString().padStart(2,"0");t(this,b).font="10px monospace",t(this,b).fillStyle="#c8c8c8",t(this,b).fillText(o,e,t(this,v)-5)}}dt=new WeakMap,b=new WeakMap,D=new WeakMap,v=new WeakMap,A=new WeakMap,W=new WeakMap,ot=new WeakMap,nt=new WeakMap,rt=new WeakMap,x=new WeakMap,N=new WeakMap;async function At(){let r={};const i=await(await fetch("https://fapi.binance.com/fapi/v1/premiumIndex")).json();for(let s of i){let o=s.symbol,n=parseFloat(s.lastFundingRate)*100,a=s.markPrice;r[o]={funding_rate:Math.round(n*1e4)/1e4,mark_price:Math.round(a*1e4)/1e4}}return r}async function Bt(){let r={};const i=await(await fetch("https://fapi.binance.com/fapi/v1/ticker/24hr")).json();for(let s of i){let o=s.symbol,n=s.quoteVolume,a=s.priceChangePercent;r[o]={change:a,volume:Math.round(n)}}return r}async function xt(){let r={};const e=await At(),i=await Bt();for(let s in e)i.hasOwnProperty(s)&&(r[s]={...e[s],...i[s]});return r}var Q,j,at,M,H;class It{constructor(){h(this,Q,void 0);h(this,j,[]);h(this,at,[]);h(this,M,void 0);h(this,H,!0);E(this,"shouldRefresh",!0);E(this,"last_update_id");E(this,"order_book");console.log("worker.js: Initializing WebSocketService")}createWebSocket(e,i){t(this,Q)&&t(this,Q).readyState===1&&(console.log("worker.js: Closing existing websocket connection for symbol:",t(this,M).toUpperCase()),t(this,Q).close(),c(this,H,!0),this.order_book=null,c(this,j,[])),console.log("worker.js: Creating websocket connection for symbol:",e),c(this,M,e.toLowerCase()),mt(t(this,M)).then(s=>{c(this,Q,new WebSocket(`wss://fstream.binance.com/stream?streams=${t(this,M)}@aggTrade/${t(this,M)}@depth@100ms/${t(this,M)}@kline_1m`)),this.setupEventListeners(t(this,Q),i),this.last_update_id=s.lastUpdateId,this.order_book=new Ot(s.bids,s.asks)}).catch(s=>{console.error("Error initializing the order book:",s)})}setupEventListeners(e,i){e.addEventListener("open",()=>{this.order_book.refresh_order_book(t(this,M)),console.log("worker.js: WebSocket connection opened")}),e.addEventListener("close",()=>{console.log("worker.js: WebSocket connection closed")});let s=!1;e.addEventListener("message",async o=>{let n=JSON.parse(o.data);if(n.stream.endsWith("@aggTrade")){let a=n.data;t(this,j).push({x:a.T,y:parseFloat(a.p),q:parseFloat(a.q),m:a.m})}else if(n.stream.endsWith("@depth@100ms")){if(s){console.log("isHandlingDepth:",s);return}s=!0,await this.handleDepth(n.data),s=!1}else n.stream.endsWith("@kline_1m")&&(c(this,at,n.data),i({kline:t(this,at),depth:this.order_book.order_book,tradesBuffer:t(this,j)}),c(this,j,[]))})}async handleDepth(e){let i=e.u,s=e.U,o=e.pu;if(!(i<this.last_update_id)){if(t(this,H))if(s<=this.last_update_id&&this.last_update_id<=i)console.log("First processed event succeed."),c(this,H,!1);else{await this.reinitializeOrderBook(t(this,M));return}else if(o!=this.last_update_id){await this.reinitializeOrderBook(t(this,M));return}await this.order_book.update_order_book(e.b,e.a),this.last_update_id=i}}async reinitializeOrderBook(e){console.log("Out of sync, reinitializing order book...");const i=await mt(e);this.last_update_id=i.lastUpdateId,this.order_book.order_book=this.order_book.initialize_order_book(i.bids,i.asks),c(this,j,[])}}Q=new WeakMap,j=new WeakMap,at=new WeakMap,M=new WeakMap,H=new WeakMap;let gt;class Ot{constructor(e,i){E(this,"order_book");console.log("worker.js: Initializing OrderBook"),this.order_book=this.initialize_order_book(e,i)}initialize_order_book(e,i){let s=e.map(n=>n.map(Number)),o=i.map(n=>n.map(Number));return{bids:s,asks:o}}async refresh_order_book(e){gt=e;let i=new AbortController,s=setInterval(async()=>{if(e!==gt)clearInterval(s),i.abort();else{i=new AbortController;try{let o=await mt(e,{signal:i.signal});this.order_book=this.initialize_order_book(o.bids,o.asks)}catch(o){o.name==="AbortError"?console.log("Fetch operation aborted"):console.error("Error fetching order book:",o)}}},6e3)}async update_order_book(e,i){let s=e.map(n=>n.map(Number)),o=i.map(n=>n.map(Number));[this.order_book.bids,this.order_book.asks]=await this.prepare_order_book(this.order_book.bids,this.order_book.asks,s,o)}async prepare_order_book(e,i,s,o){try{const n=new Map([...e,...s].filter(m=>m[0]>=e[e.length-1][0])),a=new Map([...i,...o].filter(m=>m[0]<=i[i.length-1][0]));let l=Array.from(n.entries()).filter(m=>m[1]!==0).sort((m,w)=>w[0]-m[0]),d=Array.from(a.entries()).filter(m=>m[1]!==0).sort((m,w)=>m[0]-w[0]);return l[0][0]>=d[0][0]&&(l=l.filter(m=>m[0]<s[s.length-1][0]),d=d.filter(m=>m[0]>o[0][0]),console.log("Error: bids[0] >= asks[0], rehandled to: ",l[0][0],d[0][0])),[l,d]}catch(n){return console.error("Error preparing order book:",n),s=s.filter(a=>a[0]>=e[e.length-1][0]),o=o.filter(a=>a[0]<=i[i.length-1][0]),[s,o]}}}async function mt(r){return await(await fetch(`https://fapi.binance.com/fapi/v1/depth?symbol=${r}&limit=500`)).json()}const ut=["btn1","btn2","btn3","btn4"],qt=["tickers-menu","menu2","menu3","settings-menu"],Wt=[_t,vt,vt,jt];for(let r=0;r<ut.length;r++){const e=document.getElementById(ut[r]);e.addEventListener("click",Wt[r]),e.addEventListener("click",function(){bt(ut[r],qt[r])})}const kt=document.getElementById("tickers-menu"),wt=document.getElementById("settings-menu");let pt=document.getElementById("ticker-search"),ht;pt.addEventListener("keyup",function(){ht=this.value.toLowerCase();let r=document.querySelectorAll("#ticker-table tbody tr");for(let e of r)e.cells[0].textContent.toLowerCase().includes(ht)?e.style.display="":e.style.display="none"});function Nt(r){pt.value="",ht="";let e=document.querySelectorAll("#ticker-table tbody tr");for(let i of e)i.style.display="";Ft(r),_t()}function Qt(){const r=new Date,e=r.getHours().toString().padStart(2,"0"),i=r.getMinutes().toString().padStart(2,"0"),s=r.getSeconds().toString().padStart(2,"0");return e+":"+i+":"+s}function Mt(){const r=document.getElementById("tickers-update-info");r.textContent="Last updated at "+Qt()}window.onload=function(){xt().then(r=>{Lt(r),Mt()})};window.addEventListener("resize",function(){console.log("resize")});function bt(r,e){const i=document.getElementById(e),s=document.getElementById(r);i.style.display==="block"?s.classList.add("active"):s.classList.remove("active")}function _t(){pt.value="",ht="";let r=document.querySelectorAll("#ticker-table tbody tr");for(let e of r)e.style.display="";kt.style.display=kt.style.display==="none"?"block":"none",bt("btn1","tickers-menu")}function vt(){console.log("show menu")}function jt(){wt.style.display=wt.style.display==="none"?"block":"none",bt("btn4","settings-menu")}const ft=document.getElementById("tickers-update-btn");ft.addEventListener("click",function(){ft.disabled=!0,xt().then(r=>{Lt(r),Mt()})});function St(r,e){let i;return e==="mark_price"?r>10?i=Math.round(r*100)/100:i=Math.round(r*1e4)/1e4:e==="volume"&&(i=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(r)),i}function Lt(r){let e=document.querySelector("#tickers-menu table tbody"),i=Object.entries(r);i.sort(([,s],[,o])=>o.volume-s.volume);for(let s=0;s<i.length;s++){let[o,n]=i[s],a;s<e.rows.length?a=e.rows[s]:(a=e.insertRow(),a.insertCell(),a.insertCell(),a.insertCell(),a.insertCell(),a.insertCell()),a.classList.add("table-row"),a.cells[0].textContent=o,a.cells[1].textContent=St(n.mark_price,"mark_price"),a.cells[2].textContent=(Math.round(n.change*100)/100).toFixed(2)+"%",a.cells[3].textContent=n.funding_rate+"%",a.cells[4].textContent=St(n.volume,"volume");const l=Math.min(Math.abs(n.change/100),1),d=Math.max(Math.abs(n.funding_rate*50),.2);n.change<0?a.style.backgroundColor="rgba(192, 80, 78, "+l*1.5+")":a.style.backgroundColor="rgba(81, 205, 160, "+l+")",n.funding_rate>0?a.cells[3].style.color="rgba(212, 80, 78, "+d*1.5+")":a.cells[3].style.color="rgba(81, 246, 160, "+d*1.5+")",a.addEventListener("click",function(){Nt(o)})}ft.disabled=!1}const Zt=new It;function Ft(r){let e=document.createElement("canvas");e.id="canvas1",e.style.position="absolute",e.style.left="0px",e.style.top="0px",document.body.appendChild(e);let i=document.querySelector("#canvas1"),s=i.getContext("2d");i.width=window.innerWidth*.9,i.height=window.innerHeight*.9;let o=document.createElement("canvas");o.id="canvas2",o.style.position="absolute",o.style.left=i.width+"px",document.body.appendChild(o);let n=document.querySelector("#canvas2"),a=n.getContext("2d");n.width=window.innerWidth*.1,n.height=window.innerHeight*.9;let l=document.createElement("canvas");l.id="canvas3",l.style.position="absolute",l.style.left="0px",l.style.top=i.height+"px",document.body.appendChild(l);let d=document.querySelector("#canvas3"),m=d.getContext("2d");d.width=i.width,d.height=window.innerHeight*.1;const w=new Ct(s,i.width,i.height,a,n,n.width,n.height,m,d,d.width,d.height);Vt(r).then(S=>{w.tickSize=S,document.querySelector("#ticksize-select").dispatchEvent(new Event("change")),Zt.createWebSocket(r,u=>w.updateData(u))})}async function Vt(r){let s=(await(await fetch("https://fapi.binance.com/fapi/v1/exchangeInfo")).json()).symbols.find(o=>o.symbol===r);return s?s.filters[0].tickSize:null}
