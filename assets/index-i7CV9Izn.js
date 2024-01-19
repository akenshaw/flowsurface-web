var It=Object.defineProperty;var Ot=(o,e,s)=>e in o?It(o,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[e]=s;var S=(o,e,s)=>(Ot(o,typeof e!="symbol"?e+"":e,s),s),xt=(o,e,s)=>{if(!e.has(o))throw TypeError("Cannot "+s)};var t=(o,e,s)=>(xt(o,e,"read from private field"),s?s.call(o):e.get(o)),h=(o,e,s)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,s)},c=(o,e,s,i)=>(xt(o,e,"write to private field"),i?i.call(o,s):e.set(o,s),s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();var D,O,Z;class Bt{constructor(e,s,i,n,r,a,l,u,d,_,C){S(this,"zoomYLevel",.2222);S(this,"zoomXLevel",0);h(this,D,void 0);h(this,O,void 0);h(this,Z,void 0);S(this,"tickSize");c(this,D,new At(this,e,s,i)),c(this,O,new Nt(this,n,r,a,l)),c(this,Z,new Ut(this,u,d,_,C)),t(this,O).canvas.addEventListener("wheel",p=>{p.preventDefault();const y=5e-4/(.01-.001);let Q=this.zoomYLevel-(p.deltaY>0?-y:y);this.zoomYLevel=Math.max(0,Math.min(Q,1)),t(this,D).zoomY(this.zoomYLevel),t(this,O).zoomY(this.zoomYLevel)}),t(this,Z).canvas.addEventListener("wheel",p=>{p.preventDefault();const y=5e-4/(.01-.001);let Q=this.zoomXLevel+(p.deltaY>0?-y:y);this.zoomXLevel=Math.max(0,Math.min(Q,1)),t(this,D).zoomX(this.zoomXLevel),t(this,Z).zoomX(this.zoomXLevel)});const f=document.querySelector("#ticksize-select");f.addEventListener("change",p=>{const y=this.tickSize*f.value;console.log("new tick size:",y),t(this,D).bucketSize=y,t(this,D).maxQuantity=20,t(this,O).bucketSize=y})}updateData(e){t(this,D).updateData(e.kline,e.tradesBuffer),t(this,O).updateData(e.kline,e.depth),t(this,Z).updateData(e.kline)}}D=new WeakMap,O=new WeakMap,Z=new WeakMap;var ft,m,z,M,B,X,A,V,J,E,tt,et,w,st,it,R;class At{constructor(e,s,i,n){h(this,ft,void 0);h(this,m,void 0);h(this,z,void 0);h(this,M,void 0);h(this,B,[]);h(this,X,[]);h(this,A,void 0);h(this,V,[]);h(this,J,void 0);h(this,E,void 0);h(this,tt,void 0);h(this,et,60);h(this,w,void 0);h(this,st,.997);h(this,it,1.003);h(this,R,30);S(this,"bucketSize");c(this,ft,e),c(this,m,s),c(this,z,i),c(this,M,n),c(this,w,Math.round(1*60*1e3/(30*60*1e3)*(t(this,z)-t(this,et)))),this.tradesDrawType=0,this.maxQuantity=20}zoomY(e){const a=.001+.009000000000000001*e,l=.001+(.01-.001)*e;c(this,st,Math.round((1-a)*1e4)/1e4),c(this,it,Math.round((1+l)*1e4)/1e4)}zoomX(e){c(this,R,30+-20*e),c(this,w,Math.round(1*60*1e3/(t(this,R)*60*1e3)*(t(this,z)-t(this,et))))}updateData(e,s){const{k:{t:i,T:n,o:r,h:a,l,c:u}}=e;c(this,E,Math.min((Number(a)+Number(l))/2*t(this,st),l)),c(this,tt,Math.max((Number(a)+Number(l))/2*t(this,it),a)),t(this,J)!==r&&(t(this,A)&&(t(this,B).push(t(this,A)),t(this,X).push(t(this,V)),t(this,B).length>60&&(t(this,B).shift(),t(this,X).shift()),c(this,V,[])),c(this,J,r)),c(this,A,{startTime:i,endTime:n,openPrice:r,highPrice:a,lowPrice:l,closePrice:u}),t(this,V).push(s),this.drawStart()}drawStart(){if(t(this,m).clearRect(0,0,t(this,z),t(this,M)),t(this,B).length>0){const e=t(this,A).startTime-t(this,R)*60*1e3;t(this,B).forEach((s,i)=>{const n=t(this,X)[i],r=Math.round((s.startTime-e)/(t(this,R)*60*1e3)*(t(this,z)-t(this,w)));this.drawDataPoint(n,s,r)})}this.drawDataPoint(t(this,V),t(this,A),Math.round(t(this,z)-t(this,w)))}drawDataPoint(e,s,i){const n=t(this,M)/(t(this,tt)-t(this,E)),r=Math.round(t(this,M)-(s.openPrice-t(this,E))*n),a=Math.round(t(this,M)-(s.highPrice-t(this,E))*n),l=Math.round(t(this,M)-(s.lowPrice-t(this,E))*n),u=Math.round(t(this,M)-(s.closePrice-t(this,E))*n);this.drawKlineAt(i,a-2),this.drawKlineAt(i,l+2);const _=[].concat(...e).reduce((f,p)=>{const y=Math.round(p.y/this.bucketSize)*this.bucketSize,Q=`${y}-${p.m}`;return f[Q]||(f[Q]={...p,y,q:0}),f[Q].q+=p.q,f},{}),C=Math.max(...Object.values(_).map(f=>f.q));this.maxQuantity=C>this.maxQuantity?C:this.maxQuantity,Object.values(_).forEach(f=>{const p=Math.round(t(this,M)-(f.y-t(this,E))*n),y=this.scaleQuantity(f.q);this.drawTradesAt(i,p,f.m,y)}),t(this,m).beginPath(),t(this,m).moveTo(i+t(this,w)/2,r),t(this,m).lineTo(i+t(this,w)/2,u),t(this,m).strokeStyle=u<r?"#9BE6D1":"#E6A1A0",t(this,m).stroke()}drawKlineAt(e,s){t(this,m).beginPath(),t(this,m).moveTo(e+5,s),t(this,m).lineTo(e+t(this,w)-5,s),t(this,m).strokeStyle="rgba(200, 200, 200, 0.5)",t(this,m).stroke()}drawTradesAt(e,s,i,n){t(this,m).beginPath(),i?(t(this,m).moveTo(e-4+t(this,w)/2,s),t(this,m).lineTo(e-4+t(this,w)/2-n,s),t(this,m).strokeStyle="rgba(192, 80, 77, 1)"):(t(this,m).moveTo(e+4+t(this,w)/2,s),t(this,m).lineTo(e+4+t(this,w)/2+n,s),t(this,m).strokeStyle="rgba(81, 205, 160, 1)"),t(this,m).stroke()}scaleQuantity(e){const n=t(this,w)/2-4;return 0+(e-.001)*(n-0)/(this.maxQuantity-.001)}}ft=new WeakMap,m=new WeakMap,z=new WeakMap,M=new WeakMap,B=new WeakMap,X=new WeakMap,A=new WeakMap,V=new WeakMap,J=new WeakMap,E=new WeakMap,tt=new WeakMap,et=new WeakMap,w=new WeakMap,st=new WeakMap,it=new WeakMap,R=new WeakMap;var pt,g,Y,T,nt,N,L,K,ot,rt;class Nt{constructor(e,s,i,n,r){h(this,pt,void 0);h(this,g,void 0);h(this,Y,void 0);h(this,T,void 0);h(this,nt,void 0);h(this,N,void 0);h(this,L,void 0);h(this,K,void 0);h(this,ot,.997);h(this,rt,1.003);S(this,"bucketSize");c(this,pt,e),c(this,g,s),this.canvas=i,c(this,Y,n),c(this,T,r),this.maxQuantity=20}zoomY(e){const a=.001+.009000000000000001*e,l=.001+(.01-.001)*e;c(this,ot,Math.round((1-a)*1e4)/1e4),c(this,rt,Math.round((1+l)*1e4)/1e4)}updateData(e,s){const{k:{o:i,h:n,l:r,c:a}}=e;c(this,nt,{openPrice:i,highPrice:n,lowPrice:r,closePrice:a});const{asks:l,bids:u}=s;c(this,N,{asks:l,bids:u}),c(this,L,Math.min((Number(n)+Number(r))/2*t(this,ot),r)),c(this,K,Math.max((Number(n)+Number(r))/2*t(this,rt),n)),this.drawStart()}drawStart(){t(this,g).clearRect(0,0,t(this,Y),t(this,T));const e=t(this,T)/(t(this,K)-t(this,L)),{closePrice:s,openPrice:i}=t(this,nt),n=Math.round(t(this,T)-(s-t(this,L))*e),r=Math.round(t(this,T)-(i-t(this,L))*e),a=n>r?"#C0504E":n<r?"#51CDA0":"#c8c8c8";if(this.drawTextAt(n,s,a),this.drawTextAt(t(this,T)-10,Math.round(t(this,L)),"#c8c8c8"),this.drawTextAt(15,Math.round(t(this,K)),"#c8c8c8"),this.maxQuantity=20,t(this,N).asks&&t(this,N).bids){const l=C=>C.reduce((f,p)=>{const y=Math.round(p[0]/this.bucketSize)*this.bucketSize;return f[y]||(f[y]=0),f[y]+=parseFloat(p[1]),f},{}),u=l(t(this,N).asks),d=l(t(this,N).bids),_=[...Object.values(u),...Object.values(d)];this.maxQuantity=Math.max.apply(null,_),Object.entries(u).forEach(([C,f])=>{const p=Math.round(t(this,T)-(C-t(this,L))*e);this.drawLineAt(p,"#C0504E",f)}),Object.entries(d).forEach(([C,f])=>{const p=Math.round(t(this,T)-(C-t(this,L))*e);this.drawLineAt(p,"#51CDA0",f)})}t(this,g).font="10px monospace",t(this,g).fillStyle="#c8c8c8",t(this,g).fillText(Math.round(this.maxQuantity),t(this,Y)-40,40)}drawLineAt(e,s,i){const n=i/this.maxQuantity*(t(this,Y)-80);t(this,g).beginPath(),t(this,g).moveTo(80,e),t(this,g).lineTo(n+80,e),t(this,g).strokeStyle=s,t(this,g).lineWidth=1,t(this,g).stroke()}drawTextAt(e,s,i){t(this,g).font="12px monospace",t(this,g).fillStyle=i,t(this,g).fillText(s,10,e)}}pt=new WeakMap,g=new WeakMap,Y=new WeakMap,T=new WeakMap,nt=new WeakMap,N=new WeakMap,L=new WeakMap,K=new WeakMap,ot=new WeakMap,rt=new WeakMap;var bt,b,P,k,I,U,at,ht,ct,v,j;class Ut{constructor(e,s,i,n,r){h(this,bt,void 0);h(this,b,void 0);h(this,P,void 0);h(this,k,void 0);h(this,I,[]);h(this,U,void 0);h(this,at,void 0);h(this,ht,void 0);h(this,ct,60);h(this,v,void 0);h(this,j,30);c(this,bt,e),c(this,b,s),this.canvas=i,c(this,P,n),c(this,k,r),c(this,v,Math.round(1*60*1e3/(t(this,j)*60*1e3)*(t(this,P)-t(this,ct))))}zoomX(e){c(this,j,30+-20*e),c(this,v,Math.round(1*60*1e3/(t(this,j)*60*1e3)*(t(this,P)-t(this,ct))))}updateData(e){const{k:{t:s,T:i,v:n,V:r}}=e,a=n-r;c(this,ht,Math.round(t(this,I).reduce((l,u)=>Math.max(l,u.buyVolume,u.sellVolume),Math.max(r,a)))),t(this,at)!==s&&(t(this,U)&&(t(this,I).push(t(this,U)),t(this,I).length>60&&t(this,I).shift()),c(this,at,s)),c(this,U,{startTime:s,endTime:i,buyVolume:r,sellVolume:a}),this.drawStart()}drawStart(){if(t(this,b).clearRect(0,0,t(this,P),t(this,k)),t(this,I).length>0){const e=t(this,U).startTime-t(this,j)*60*1e3;t(this,I).forEach((s,i)=>{const n=Math.round((s.startTime-e)/(t(this,j)*60*1e3)*(t(this,P)-t(this,v)));this.drawDataPoint(s,n)})}this.drawDataPoint(t(this,U),Math.round(t(this,P)-t(this,v)))}drawDataPoint(e,s){const i=(t(this,k)-20)/t(this,ht),n=Math.max(0,Math.min(t(this,k)-20,Math.round(t(this,k)-20-e.buyVolume*i))),r=Math.max(0,Math.min(t(this,k)-20,Math.round(t(this,k)-20-e.sellVolume*i)));t(this,b).beginPath(),t(this,b).moveTo(s,0),t(this,b).lineTo(s,t(this,k)-20),t(this,b).strokeStyle="rgba(200, 200, 200, 0.4)",t(this,b).lineWidth=1,t(this,b).stroke(),this.drawTimeLabel(s,e.startTime),this.drawKlineAt(s+t(this,v)/2+t(this,v)/8,n,"#51CDA0"),this.drawKlineAt(s+t(this,v)/2-t(this,v)/8,r,"#C0504E")}drawKlineAt(e,s,i){t(this,b).beginPath(),t(this,b).moveTo(e,t(this,k)-20),t(this,b).lineTo(e,s),t(this,b).strokeStyle=i,t(this,b).lineWidth=t(this,v)/6,t(this,b).stroke()}drawTimeLabel(e,s){const i=new Date(s),n=i.getHours().toString().padStart(2,"0")+":"+i.getMinutes().toString().padStart(2,"0");t(this,b).font="10px monospace",t(this,b).fillStyle="#c8c8c8",t(this,b).fillText(n,e,t(this,k)-5)}}bt=new WeakMap,b=new WeakMap,P=new WeakMap,k=new WeakMap,I=new WeakMap,U=new WeakMap,at=new WeakMap,ht=new WeakMap,ct=new WeakMap,v=new WeakMap,j=new WeakMap;async function Lt(){let e=Date.now()-25*60*60*1e3,s=e+60*60*1e3,i={};const[n,r]=await Promise.all([qt(),Ft()]),a=Object.keys(n).filter(d=>!["BTCSTUSDT","CVCUSDT","DOGEUSDC","COCOSUSDT","BNBBTC","ETHBTC","RAYUSDT","HNTUSDT","SCUSDT","WIFUSDT","BTSUSDT","TOMOUSDT","FTTUSDT","SRMUSDT"].includes(d)&&!d.includes("_")),l=a.map(d=>jt(d,e,s)),u=await Promise.all(l);return a.forEach((d,_)=>{r.hasOwnProperty(d)&&(i[d]={...n[d],...r[d],...u[_]})}),i}async function jt(o,e,s){let i;try{i=await Wt(o);const r=await(await fetch(`https://fapi.binance.com/futures/data/openInterestHist?symbol=${o}&period=30m&limit=1&startTime=${e}&endTime=${s}`)).json(),a=Math.round(r[0].sumOpenInterest),l=Math.round((i-a)/a*1e4)/100;return{open_interest:i,OI_24hrChange:l}}catch{return{open_interest:i,OI_24hrChange:NaN}}}async function Wt(o){try{const s=await(await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${o}`)).json();return Number(s.openInterest)}catch(e){return console.log(e,o),NaN}}async function qt(){let o={};const s=await(await fetch("https://fapi.binance.com/fapi/v1/premiumIndex")).json();for(let i of s){let n=i.symbol,r=parseFloat(i.lastFundingRate)*100,a=i.markPrice;o[n]={funding_rate:Math.round(r*1e4)/1e4,mark_price:Math.round(a*1e4)/1e4}}return o}async function Ft(){let o={};const s=await(await fetch("https://fapi.binance.com/fapi/v1/ticker/24hr")).json();for(let i of s){let n=i.symbol,r=i.quoteVolume,a=i.priceChangePercent;o[n]={change:Number(a),volume:Math.round(r)}}return o}var W,q,lt,x,G;class Qt{constructor(){h(this,W,void 0);h(this,q,[]);h(this,lt,[]);h(this,x,void 0);h(this,G,!0);S(this,"shouldRefresh",!0);S(this,"last_update_id");S(this,"order_book");console.log("wsBinance.js: Initializing WebSocketService")}createWebSocket(e,s){t(this,W)&&t(this,W).readyState===1&&(console.log("wsBinance.js: Closing existing websocket connection for symbol:",t(this,x).toUpperCase()),t(this,W).close(),c(this,G,!0),this.order_book=null,c(this,q,[])),console.log("wsBinance.js: Creating websocket connection for symbol:",e),c(this,x,e.toLowerCase()),kt(t(this,x)).then(i=>{c(this,W,new WebSocket(`wss://fstream.binance.com/stream?streams=${t(this,x)}@aggTrade/${t(this,x)}@depth@100ms/${t(this,x)}@kline_1m`)),this.setupEventListeners(t(this,W),s),this.last_update_id=i.lastUpdateId,this.order_book=new Zt(i.bids,i.asks)}).catch(i=>{console.error("Error initializing the order book:",i)})}setupEventListeners(e,s){e.addEventListener("open",()=>{this.order_book.refresh_order_book(t(this,x)),console.log("wsBinance.js: new WebSocket connection opened")}),e.addEventListener("close",()=>{console.log("wsBinance.js: previous WebSocket connection closed")});let i=!1;e.addEventListener("message",async n=>{let r=JSON.parse(n.data);if(r.stream.endsWith("@aggTrade")){let a=r.data;t(this,q).push({x:a.T,y:parseFloat(a.p),q:parseFloat(a.q),m:a.m})}else if(r.stream.endsWith("@depth@100ms")){if(i){console.log("isHandlingDepth:",i);return}i=!0,await this.handleDepth(r.data),i=!1}else r.stream.endsWith("@kline_1m")&&(c(this,lt,r.data),s({kline:t(this,lt),depth:this.order_book.order_book,tradesBuffer:t(this,q)}),c(this,q,[]))})}async handleDepth(e){let s=e.u,i=e.U,n=e.pu;if(s<this.last_update_id){console.log("finalUpdateId < last_update_id",s,this.last_update_id);return}if(t(this,G))if(i<=this.last_update_id&&this.last_update_id<=s)console.log("First processed event succeeded"),c(this,G,!1);else{await this.reinitializeOrderBook(t(this,x));return}else if(n!=this.last_update_id){await this.reinitializeOrderBook(t(this,x));return}await this.order_book.update_order_book(e.b,e.a),this.last_update_id=s}async reinitializeOrderBook(e){console.log("Out of sync, reinitializing order book...");const s=await kt(e);this.last_update_id=s.lastUpdateId,this.order_book.order_book=this.order_book.initialize_order_book(s.bids,s.asks),c(this,q,[])}}W=new WeakMap,q=new WeakMap,lt=new WeakMap,x=new WeakMap,G=new WeakMap;class Zt{constructor(e,s){S(this,"currentSymbol");S(this,"shouldRefresh",!0);S(this,"order_book");console.log("worker.js: Initializing OrderBook"),this.order_book=this.initialize_order_book(e,s)}initialize_order_book(e,s){let i=e.map(r=>r.map(Number)),n=s.map(r=>r.map(Number));return{bids:i,asks:n}}async refresh_order_book(e){this.currentSymbol=e;let s=new AbortController,i=setInterval(async()=>{if(!this.shouldRefresh||e!==this.currentSymbol)clearInterval(i),s.abort();else{s=new AbortController;try{let n=await kt(e,{signal:s.signal});this.order_book=this.initialize_order_book(n.bids,n.asks)}catch(n){n.name==="AbortError"?console.log("Fetch operation aborted"):console.error("Error fetching order book:",n)}}},6e3)}async update_order_book(e,s){let i=e.map(r=>r.map(Number)),n=s.map(r=>r.map(Number));[this.order_book.bids,this.order_book.asks]=await this.prepare_order_book(this.order_book.bids,this.order_book.asks,i,n)}async prepare_order_book(e,s,i,n){try{const r=new Map([...e,...i].filter(d=>d[0]>=e[e.length-1][0])),a=new Map([...s,...n].filter(d=>d[0]<=s[s.length-1][0]));let l=Array.from(r.entries()).filter(d=>d[1]!==0).sort((d,_)=>_[0]-d[0]),u=Array.from(a.entries()).filter(d=>d[1]!==0).sort((d,_)=>d[0]-_[0]);return l[0][0]>=u[0][0]&&(l=l.filter(d=>d[0]<i[i.length-1][0]),u=u.filter(d=>d[0]>n[0][0]),console.log("Error: bids[0] >= asks[0], rehandled to: ",l[0][0],u[0][0])),[l,u]}catch(r){return console.error("Error preparing order book:",r),[i,n]}}}async function kt(o){return await(await fetch(`https://fapi.binance.com/fapi/v1/depth?symbol=${o}&limit=500`)).json()}const gt=["btn1","btn2","btn3","btn4"],Vt=["tickers-menu","menu2","menu3","settings-menu"],Rt=[zt,Ct,Ct,Ht];for(let o=0;o<gt.length;o++){const e=document.getElementById(gt[o]);e.addEventListener("click",Rt[o]),e.addEventListener("click",function(){vt(gt[o],Vt[o])})}const Mt=document.getElementById("tickers-menu"),Tt=document.getElementById("settings-menu");let St=document.getElementById("ticker-search"),mt;St.addEventListener("keyup",function(){mt=this.value.toLowerCase();let o=document.querySelectorAll("#ticker-table tbody tr");for(let e of o)e.cells[0].textContent.toLowerCase().includes(mt)?e.style.display="":e.style.display="none"});function Yt(o){te(o),St.value="",mt="";let e=document.querySelectorAll("#ticker-table tbody tr");for(let s of e)s.style.display="";zt()}function $t(){const o=new Date,e=o.getHours().toString().padStart(2,"0"),s=o.getMinutes().toString().padStart(2,"0"),i=o.getSeconds().toString().padStart(2,"0");return e+":"+s+":"+i}function Dt(){const o=document.getElementById("tickers-update-info");o.textContent="Last updated at "+$t()}window.onload=function(){Lt().then(o=>{Pt(o),Dt()})};window.addEventListener("resize",function(){console.log("resize")});function zt(){St.value="",mt="";let o=document.querySelectorAll("#ticker-table tbody tr");for(let e of o)e.style.display="";Mt.style.display=Mt.style.display==="none"?"block":"none",vt("btn1","tickers-menu")}function Ct(){console.log("show menu")}function Ht(){Tt.style.display=Tt.style.display==="none"?"block":"none",vt("btn4","settings-menu")}function vt(o,e){const s=document.getElementById(e),i=document.getElementById(o);s.style.display==="block"?i.classList.add("active"):i.classList.remove("active")}const _t=document.getElementById("tickers-update-btn");_t.addEventListener("click",function(){_t.disabled=!0,Lt().then(o=>{Pt(o),Dt()})});function Et(o){return o>=1e9?(o/1e9).toFixed(2)+"b":o>=1e6?(o/1e6).toFixed(2)+"m":o>=1e3?(o/1e3).toFixed(2)+"k":o}function wt(o,e,s){let i;return e==="mark_price"?o>10?i=Math.round(o*100)/100:i=Math.round(o*1e4)/1e4:e==="volume"?(i=Et(o),i="$"+i):e==="open_interest"&&(i=Et(o*s),i="$"+i),i}function Pt(o){let e=document.querySelector("#tickers-menu table tbody"),s=Object.entries(o);s.sort(([,i],[,n])=>n.volume-i.volume);for(let i=0;i<s.length;i++){let[n,r]=s[i],a;i<e.rows.length?a=e.rows[i]:(a=e.insertRow(),a.insertCell(),a.insertCell(),a.insertCell(),a.insertCell(),a.insertCell(),a.insertCell(),a.insertCell()),a.classList.add("table-row"),a.cells[0].textContent=n,a.cells[1].textContent=wt(r.mark_price,"mark_price",r.mark_price),a.cells[2].textContent=(Math.round(r.change*100)/100).toFixed(2)+"%",a.cells[3].textContent=r.funding_rate+"%",a.cells[4].textContent=wt(r.open_interest,"open_interest",r.mark_price),a.cells[5].textContent=r.OI_24hrChange+"%",a.cells[6].textContent=wt(r.volume,"volume",r.mark_price);const l=Math.min(Math.abs(r.change/100),1),u=Math.max(Math.abs(r.funding_rate*50),.2);r.change<0?a.style.backgroundColor="rgba(192, 80, 78, "+l*1.5+")":a.style.backgroundColor="rgba(81, 205, 160, "+l+")",r.funding_rate>0?a.cells[3].style.color="rgba(212, 80, 78, "+u*1.5+")":a.cells[3].style.color="rgba(81, 246, 160, "+u*1.5+")",a.addEventListener("click",function(){Yt(n)})}_t.disabled=!1}let dt=document.createElement("canvas");dt.id="canvas1";dt.style.position="absolute";dt.style.left="0px";dt.style.top="0px";document.body.appendChild(dt);let F=document.querySelector("#canvas1"),Xt=F.getContext("2d");F.width=window.innerWidth*.9;F.height=window.innerHeight*.9;let yt=document.createElement("canvas");yt.id="canvas2";yt.style.position="absolute";yt.style.left=F.width+"px";document.body.appendChild(yt);let $=document.querySelector("#canvas2"),Kt=$.getContext("2d");$.width=window.innerWidth*.1;$.height=window.innerHeight*.9;let ut=document.createElement("canvas");ut.id="canvas3";ut.style.position="absolute";ut.style.left="0px";ut.style.top=F.height+"px";document.body.appendChild(ut);let H=document.querySelector("#canvas3"),Gt=H.getContext("2d");H.width=F.width;H.height=window.innerHeight*.1;const Jt=new Qt;function te(o){const e=new Bt(Xt,F.width,F.height,Kt,$,$.width,$.height,Gt,H,H.width,H.height);ee(o).then(s=>{e.tickSize=s,document.querySelector("#ticksize-select").dispatchEvent(new Event("change")),Jt.createWebSocket(o,i=>e.updateData(i))})}async function ee(o){let i=(await(await fetch("https://fapi.binance.com/fapi/v1/exchangeInfo")).json()).symbols.find(n=>n.symbol===o);return i?i.filters[0].tickSize:null}