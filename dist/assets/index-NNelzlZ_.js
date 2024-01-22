var jt=Object.defineProperty;var Rt=(a,e,s)=>e in a?jt(a,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[e]=s;var A=(a,e,s)=>(Rt(a,typeof e!="symbol"?e+"":e,s),s),qt=(a,e,s)=>{if(!e.has(a))throw TypeError("Cannot "+s)};var t=(a,e,s)=>(qt(a,e,"read from private field"),s?s.call(a):e.get(a)),l=(a,e,s)=>{if(e.has(a))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(a):e.set(a,s)},n=(a,e,s,i)=>(qt(a,e,"write to private field"),i?i.call(a,s):e.set(a,s),s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();var b,S,M,x,et,ct,st,O,it,_;class $t{constructor(e,s,i,o,r,h,c,m,d,C,F,y){A(this,"zoomYLevel",.2222);A(this,"zoomXLevel",0);l(this,b,void 0);l(this,S,void 0);l(this,M,void 0);A(this,"tickSize");l(this,x,void 0);l(this,et,void 0);l(this,ct,!1);l(this,st,void 0);l(this,O,!0);l(this,it,void 0);l(this,_,!1);n(this,b,new Kt(this,e,s,i,o)),n(this,S,new Gt(this,r,h,c,m)),n(this,M,new Jt(this,d,C,F,y)),n(this,it,document.querySelector("#btn2")),t(this,it).addEventListener("click",u=>{n(this,O,!t(this,O)),this.updateScaleBtn()});const v=document.querySelector("#ticksize-select");v.addEventListener("change",u=>{const p=this.tickSize*v.value;console.log("new tick size:",p),t(this,b).bucketSize=p,t(this,b).maxQuantity=20,t(this,S).bucketSize=p}),t(this,b).canvas.addEventListener("mousedown",u=>{n(this,ct,!0),n(this,st,{x:u.clientX,y:u.clientY})}),t(this,b).canvas.addEventListener("mousemove",u=>{if(t(this,ct)){n(this,O,!1);let p={x:u.clientX,y:u.clientY},R=p.x-t(this,st).x,Lt=p.y-t(this,st).y;t(this,_)||(n(this,_,!0),requestAnimationFrame(()=>{t(this,b).panXY(R,Lt),t(this,S).panY(Lt),t(this,M).panX(R),t(this,b).updateData(t(this,x),[]),t(this,S).updateData(t(this,x),t(this,et)),t(this,M).updateData(t(this,x)),n(this,_,!1)})),n(this,st,p),this.updateScaleBtn()}}),["mouseup","mouseleave"].forEach(u=>t(this,b).canvas.addEventListener(u,()=>n(this,ct,!1))),t(this,b).canvas.addEventListener("wheel",u=>{u.preventDefault(),n(this,O,!1);const p=5e-4/(.01-.001);let R=this.zoomYLevel-(u.deltaY>0?-p:p),Lt=this.zoomXLevel+(u.deltaY>0?-p:p);this.zoomYLevel=Math.max(0,Math.min(R,1)),this.zoomXLevel=Math.max(0,Math.min(Lt,1)),t(this,_)||(n(this,_,!0),requestAnimationFrame(()=>{t(this,b).zoomY(this.zoomYLevel),t(this,b).zoomX(this.zoomXLevel),t(this,S).zoomY(this.zoomYLevel),t(this,M).zoomX(this.zoomXLevel),t(this,b).updateData(t(this,x),[]),t(this,S).updateData(t(this,x),t(this,et)),t(this,M).updateData(t(this,x)),n(this,_,!1)}),this.updateScaleBtn())}),t(this,S).canvas.addEventListener("wheel",u=>{u.preventDefault(),n(this,O,!1);const p=5e-4/(.01-.001);let R=this.zoomYLevel-(u.deltaY>0?-p:p);this.zoomYLevel=Math.max(0,Math.min(R,1)),t(this,_)||(n(this,_,!0),requestAnimationFrame(()=>{t(this,b).zoomY(this.zoomYLevel),t(this,S).zoomY(this.zoomYLevel),t(this,b).updateData(t(this,x),[]),t(this,S).updateData(t(this,x),t(this,et)),n(this,_,!1)}),this.updateScaleBtn())}),t(this,M).canvas.addEventListener("wheel",u=>{u.preventDefault(),n(this,O,!1);const p=5e-4/(.01-.001);let R=this.zoomXLevel+(u.deltaY>0?-p:p);this.zoomXLevel=Math.max(0,Math.min(R,1)),t(this,_)||(n(this,_,!0),requestAnimationFrame(()=>{t(this,b).zoomX(this.zoomXLevel),t(this,M).zoomX(this.zoomXLevel),t(this,b).updateData(t(this,x),[]),t(this,M).updateData(t(this,x)),n(this,_,!1)})),this.updateScaleBtn()})}updateScaleBtn(){t(this,O)?(t(this,b).resetZoomAndPan(),t(this,S).resetZoomAndPan(),t(this,M).resetZoomAndPan(),t(this,it).innerHTML='<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 448 512"><path fill="#c8c8c8" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>'):t(this,it).innerHTML='<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 576 512"><path fill="#c8c8c8" d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></svg>'}updateData(e){n(this,x,e.kline),n(this,et,e.depth),t(this,b).updateData(e.kline,e.tradesBuffer),t(this,S).updateData(e.kline,e.depth),t(this,M).updateData(e.kline)}resetData(){n(this,O,!0),this.updateScaleBtn(),t(this,b).resetData(),t(this,S).resetData(),t(this,M).resetData(),this.zoomYLevel=.2222,this.zoomXLevel=0}}b=new WeakMap,S=new WeakMap,M=new WeakMap,x=new WeakMap,et=new WeakMap,ct=new WeakMap,st=new WeakMap,O=new WeakMap,it=new WeakMap,_=new WeakMap;var Ct,f,N,z,U,nt,V,$,dt,E,ot,ut,k,mt,ft,W,pt,I,K;class Kt{constructor(e,s,i,o,r){l(this,Ct,void 0);l(this,f,void 0);l(this,N,void 0);l(this,z,void 0);l(this,U,[]);l(this,nt,[]);l(this,V,void 0);l(this,$,[]);l(this,dt,void 0);l(this,E,void 0);l(this,ot,void 0);l(this,ut,60);l(this,k,void 0);l(this,mt,.997);l(this,ft,1.003);l(this,W,30);A(this,"bucketSize");l(this,pt,!0);l(this,I,0);l(this,K,0);n(this,Ct,e),n(this,f,s),this.canvas=i,n(this,N,o),n(this,z,r),n(this,k,Math.round(1*60*1e3/(30*60*1e3)*(t(this,N)-t(this,ut)))),this.tradesDrawType=0,this.maxQuantity=20}panXY(e,s){n(this,pt,!1);const i=t(this,z)/(t(this,ot)-t(this,E)),o=s/i;n(this,K,t(this,K)+o),n(this,I,t(this,I)+e<0?0:t(this,I)+e)}zoomY(e){const h=.001+.009000000000000001*e,c=.001+(.01-.001)*e;n(this,mt,Math.round((1-h)*1e4)/1e4),n(this,ft,Math.round((1+c)*1e4)/1e4)}zoomX(e){n(this,W,30+-20*e),n(this,k,Math.round(1*60*1e3/(t(this,W)*60*1e3)*(t(this,N)-t(this,ut))))}resetZoomAndPan(){n(this,pt,!0),n(this,I,0),n(this,K,0),n(this,mt,.997),n(this,ft,1.003),n(this,W,30),n(this,k,Math.round(1*60*1e3/(t(this,W)*60*1e3)*(t(this,N)-t(this,ut))))}resetData(){n(this,U,[]),n(this,nt,[]),n(this,V,null),n(this,$,[]),n(this,dt,null),n(this,E,null),n(this,ot,null),n(this,pt,!0),n(this,I,0),n(this,K,0)}updateData(e,s){const{k:{t:i,T:o,o:r,h,l:c,c:m}}=e;n(this,E,Math.min((Number(h)+Number(c))/2*t(this,mt),c)+t(this,K)),n(this,ot,Math.max((Number(h)+Number(c))/2*t(this,ft),h)+t(this,K)),t(this,dt)!==r&&(t(this,V)&&(t(this,U).push(t(this,V)),t(this,nt).push(t(this,$)),t(this,U).length>60&&(t(this,U).shift(),t(this,nt).shift()),n(this,$,[])),n(this,dt,r)),n(this,V,{startTime:i,endTime:o,openPrice:r,highPrice:h,lowPrice:c,closePrice:m}),t(this,$).push(s),this.drawStart()}drawStart(){if(t(this,f).clearRect(0,0,t(this,N),t(this,z)),t(this,U).length>0){const e=t(this,V).startTime-t(this,W)*60*1e3+t(this,I);t(this,U).forEach((s,i)=>{const o=t(this,nt)[i],r=Math.round((s.startTime-e)/(t(this,W)*60*1e3)*(t(this,N)-t(this,k)));this.drawDataPoint(o,s,r+t(this,I))})}this.drawDataPoint(t(this,$),t(this,V),Math.round(t(this,N)-t(this,k))+t(this,I))}drawDataPoint(e,s,i){const o=t(this,z)/(t(this,ot)-t(this,E)),r=Math.round(t(this,z)-(s.openPrice-t(this,E))*o),h=Math.round(t(this,z)-(s.highPrice-t(this,E))*o),c=Math.round(t(this,z)-(s.lowPrice-t(this,E))*o),m=Math.round(t(this,z)-(s.closePrice-t(this,E))*o);this.drawKlineAt(i,h-2),this.drawKlineAt(i,c+2);const C=[].concat(...e).reduce((y,v)=>{const u=Math.round(v.y/this.bucketSize)*this.bucketSize,p=`${u}-${v.m}`;return y[p]||(y[p]={...v,y:u,q:0}),y[p].q+=v.q,y},{}),F=Math.max(...Object.values(C).map(y=>y.q));this.maxQuantity=F>this.maxQuantity?F:this.maxQuantity,Object.values(C).forEach(y=>{const v=Math.round(t(this,z)-(y.y-t(this,E))*o),u=this.scaleQuantity(y.q);this.drawTradesAt(i,v,y.m,u)}),t(this,f).beginPath(),t(this,f).moveTo(i+t(this,k)/2,r),t(this,f).lineTo(i+t(this,k)/2,m),t(this,f).strokeStyle=m<r?"#9BE6D1":"#E6A1A0",t(this,f).stroke()}drawKlineAt(e,s){t(this,f).beginPath(),t(this,f).moveTo(e+5,s),t(this,f).lineTo(e+t(this,k)-5,s),t(this,f).strokeStyle="rgba(200, 200, 200, 0.5)",t(this,f).stroke()}drawTradesAt(e,s,i,o){t(this,f).beginPath(),i?(t(this,f).moveTo(e-4+t(this,k)/2,s),t(this,f).lineTo(e-4+t(this,k)/2-o,s),t(this,f).strokeStyle="rgba(192, 80, 77, 1)"):(t(this,f).moveTo(e+4+t(this,k)/2,s),t(this,f).lineTo(e+4+t(this,k)/2+o,s),t(this,f).strokeStyle="rgba(81, 205, 160, 1)"),t(this,f).stroke()}scaleQuantity(e){const o=t(this,k)/2-4;return 0+(e-.001)*(o-0)/(this.maxQuantity-.001)}}Ct=new WeakMap,f=new WeakMap,N=new WeakMap,z=new WeakMap,U=new WeakMap,nt=new WeakMap,V=new WeakMap,$=new WeakMap,dt=new WeakMap,E=new WeakMap,ot=new WeakMap,ut=new WeakMap,k=new WeakMap,mt=new WeakMap,ft=new WeakMap,W=new WeakMap,pt=new WeakMap,I=new WeakMap,K=new WeakMap;var zt,w,at,P,bt,H,B,G,yt,gt,wt,rt;class Gt{constructor(e,s,i,o,r){l(this,zt,void 0);l(this,w,void 0);l(this,at,void 0);l(this,P,void 0);l(this,bt,void 0);l(this,H,void 0);l(this,B,void 0);l(this,G,void 0);l(this,yt,.997);l(this,gt,1.003);A(this,"bucketSize");l(this,wt,!0);l(this,rt,0);n(this,zt,e),n(this,w,s),this.canvas=i,n(this,at,o),n(this,P,r),this.maxQuantity=20}panY(e){n(this,wt,!1);const s=t(this,P)/(t(this,G)-t(this,B)),i=e/s;n(this,rt,t(this,rt)+i)}zoomY(e){const h=.001+.009000000000000001*e,c=.001+(.01-.001)*e;n(this,yt,Math.round((1-h)*1e4)/1e4),n(this,gt,Math.round((1+c)*1e4)/1e4)}resetZoomAndPan(){n(this,wt,!0),n(this,yt,.997),n(this,gt,1.003),n(this,rt,0)}resetData(){n(this,bt,null),n(this,H,null),n(this,B,null),n(this,G,null),n(this,wt,!0)}updateData(e,s){const{k:{o:i,h:o,l:r,c:h}}=e;n(this,bt,{openPrice:i,highPrice:o,lowPrice:r,closePrice:h});const{asks:c,bids:m}=s;n(this,H,{asks:c,bids:m}),n(this,B,Math.min((Number(o)+Number(r))/2*t(this,yt),r)+t(this,rt)),n(this,G,Math.max((Number(o)+Number(r))/2*t(this,gt),o)+t(this,rt)),this.drawStart()}drawStart(){t(this,w).clearRect(0,0,t(this,at),t(this,P));const e=t(this,P)/(t(this,G)-t(this,B)),{closePrice:s,openPrice:i}=t(this,bt),o=Math.round(t(this,P)-(s-t(this,B))*e),r=Math.round(t(this,P)-(i-t(this,B))*e),h=o>r?"#C0504E":o<r?"#51CDA0":"#c8c8c8";if(this.drawTextAt(o,s,h),this.drawTextAt(t(this,P)-10,Math.round(t(this,B)),"#c8c8c8"),this.drawTextAt(15,Math.round(t(this,G)),"#c8c8c8"),this.maxQuantity=20,t(this,H).asks&&t(this,H).bids){const c=F=>F.reduce((y,v)=>{const u=Math.round(v[0]/this.bucketSize)*this.bucketSize;return y[u]||(y[u]=0),y[u]+=parseFloat(v[1]),y},{}),m=c(t(this,H).asks),d=c(t(this,H).bids),C=[...Object.values(m),...Object.values(d)];this.maxQuantity=Math.max.apply(null,C),Object.entries(m).forEach(([F,y])=>{const v=Math.round(t(this,P)-(F-t(this,B))*e);this.drawLineAt(v,"#C0504E",y)}),Object.entries(d).forEach(([F,y])=>{const v=Math.round(t(this,P)-(F-t(this,B))*e);this.drawLineAt(v,"#51CDA0",y)})}t(this,w).font="10px monospace",t(this,w).fillStyle="#c8c8c8",t(this,w).fillText(Math.round(this.maxQuantity),t(this,at)-40,40)}drawLineAt(e,s,i){const o=i/this.maxQuantity*(t(this,at)-80);t(this,w).beginPath(),t(this,w).moveTo(80,e),t(this,w).lineTo(o+80,e),t(this,w).strokeStyle=s,t(this,w).lineWidth=1,t(this,w).stroke()}drawTextAt(e,s,i){t(this,w).font="12px monospace",t(this,w).fillStyle=i,t(this,w).fillText(s,10,e)}}zt=new WeakMap,w=new WeakMap,at=new WeakMap,P=new WeakMap,bt=new WeakMap,H=new WeakMap,B=new WeakMap,G=new WeakMap,yt=new WeakMap,gt=new WeakMap,wt=new WeakMap,rt=new WeakMap;var Et,g,q,T,X,Q,vt,kt,St,L,Z,Y;class Jt{constructor(e,s,i,o,r){l(this,Et,void 0);l(this,g,void 0);l(this,q,void 0);l(this,T,void 0);l(this,X,[]);l(this,Q,void 0);l(this,vt,void 0);l(this,kt,void 0);l(this,St,60);l(this,L,void 0);l(this,Z,30);l(this,Y,0);n(this,Et,e),n(this,g,s),this.canvas=i,n(this,q,o),n(this,T,r),n(this,L,Math.round(1*60*1e3/(t(this,Z)*60*1e3)*(t(this,q)-t(this,St))))}panX(e){n(this,Y,t(this,Y)+e<0?0:t(this,Y)+e)}zoomX(e){n(this,Z,30+-20*e),n(this,L,Math.round(1*60*1e3/(t(this,Z)*60*1e3)*(t(this,q)-t(this,St))))}resetZoomAndPan(){n(this,Y,0),n(this,Z,30),n(this,L,Math.round(1*60*1e3/(t(this,Z)*60*1e3)*(t(this,q)-t(this,St))))}resetData(){n(this,X,[]),n(this,Q,null),n(this,vt,null),n(this,kt,null),n(this,Y,0)}updateData(e){const{k:{t:s,T:i,v:o,V:r}}=e,h=o-r;n(this,kt,Math.round(t(this,X).reduce((c,m)=>Math.max(c,m.buyVolume,m.sellVolume),Math.max(r,h)))),t(this,vt)!==s&&(t(this,Q)&&(t(this,X).push(t(this,Q)),t(this,X).length>60&&t(this,X).shift()),n(this,vt,s)),n(this,Q,{startTime:s,endTime:i,buyVolume:r,sellVolume:h}),this.drawStart()}drawStart(){if(t(this,g).clearRect(0,0,t(this,q),t(this,T)),t(this,X).length>0){const e=t(this,Q).startTime-t(this,Z)*60*1e3+t(this,Y);t(this,X).forEach((s,i)=>{const o=Math.round((s.startTime-e)/(t(this,Z)*60*1e3)*(t(this,q)-t(this,L)));this.drawDataPoint(s,o+t(this,Y))})}this.drawDataPoint(t(this,Q),Math.round(t(this,q)-t(this,L))+t(this,Y))}drawDataPoint(e,s){const i=(t(this,T)-20)/t(this,kt),o=Math.max(0,Math.min(t(this,T)-20,Math.round(t(this,T)-20-e.buyVolume*i))),r=Math.max(0,Math.min(t(this,T)-20,Math.round(t(this,T)-20-e.sellVolume*i)));t(this,g).beginPath(),t(this,g).moveTo(s,0),t(this,g).lineTo(s,t(this,T)-20),t(this,g).strokeStyle="rgba(200, 200, 200, 0.4)",t(this,g).lineWidth=1,t(this,g).stroke(),this.drawTimeLabel(s,e.startTime),this.drawKlineAt(s+t(this,L)/2+t(this,L)/8,o,"#51CDA0"),this.drawKlineAt(s+t(this,L)/2-t(this,L)/8,r,"#C0504E")}drawKlineAt(e,s,i){t(this,g).beginPath(),t(this,g).moveTo(e,t(this,T)-20),t(this,g).lineTo(e,s),t(this,g).strokeStyle=i,t(this,g).lineWidth=t(this,L)/6,t(this,g).stroke()}drawTimeLabel(e,s){const i=new Date(s),o=i.getHours().toString().padStart(2,"0")+":"+i.getMinutes().toString().padStart(2,"0");t(this,g).font="10px monospace",t(this,g).fillStyle="#c8c8c8",t(this,g).fillText(o,e,t(this,T)-5)}}Et=new WeakMap,g=new WeakMap,q=new WeakMap,T=new WeakMap,X=new WeakMap,Q=new WeakMap,vt=new WeakMap,kt=new WeakMap,St=new WeakMap,L=new WeakMap,Z=new WeakMap,Y=new WeakMap;async function Vt(){let e=Date.now()-25*60*60*1e3,s=e+60*60*1e3,i={};const[o,r]=await Promise.all([se(),ie()]),h=Object.keys(o).filter(d=>!["BTCSTUSDT","CVCUSDT","DOGEUSDC","COCOSUSDT","BNBBTC","ETHBTC","RAYUSDT","HNTUSDT","SCUSDT","WIFUSDT","BTSUSDT","TOMOUSDT","FTTUSDT","SRMUSDT"].includes(d)&&!d.includes("_")),c=h.map(d=>te(d,e,s)),m=await Promise.all(c);return h.forEach((d,C)=>{r.hasOwnProperty(d)&&(i[d]={...o[d],...r[d],...m[C]})}),i}async function te(a,e,s){let i;try{i=await ee(a);const r=await(await fetch(`https://fapi.binance.com/futures/data/openInterestHist?symbol=${a}&period=30m&limit=1&startTime=${e}&endTime=${s}`)).json(),h=Math.round(r[0].sumOpenInterest),c=Math.round((i-h)/h*1e4)/100;return{open_interest:i,OI_24hrChange:c}}catch{return{open_interest:i,OI_24hrChange:NaN}}}async function ee(a){try{const s=await(await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${a}`)).json();return Number(s.openInterest)}catch(e){return console.log(e,a),NaN}}async function se(){let a={};const s=await(await fetch("https://fapi.binance.com/fapi/v1/premiumIndex")).json();for(let i of s){let o=i.symbol,r=parseFloat(i.lastFundingRate)*100,h=parseFloat(i.markPrice);a[o]={funding_rate:parseFloat(r.toFixed(3)),mark_price:Math.round(h*1e4)/1e4}}return a}async function ie(){let a={};const s=await(await fetch("https://fapi.binance.com/fapi/v1/ticker/24hr")).json();for(let i of s){let o=i.symbol,r=i.quoteVolume,h=i.priceChangePercent;a[o]={change:Number(h),volume:Math.round(r)}}return a}var J,tt,Mt,D,_t;class ne{constructor(){l(this,J,void 0);l(this,tt,[]);l(this,Mt,[]);l(this,D,void 0);l(this,_t,!0);A(this,"last_update_id");A(this,"order_book");console.log("Initializing WebSocketService")}createWebSocket(e,s){t(this,J)&&t(this,J).readyState===1&&(console.log("Closing existing websocket connection for symbol:",t(this,D).toUpperCase()),this.order_book.shouldRefresh=!1,t(this,J).close(),n(this,_t,!0),this.order_book=null,n(this,tt,[])),console.log("Creating websocket connection for symbol:",e),n(this,D,e.toLowerCase()),It(t(this,D)).then(i=>{n(this,J,new WebSocket(`wss://fstream.binance.com/stream?streams=${t(this,D)}@aggTrade/${t(this,D)}@depth@100ms/${t(this,D)}@kline_1m`)),this.setupEventListeners(t(this,J),s),this.last_update_id=i.lastUpdateId,this.order_book=new oe(t(this,D),i.bids,i.asks)}).catch(i=>{console.error("Error initializing the order book:",i)})}setupEventListeners(e,s){e.addEventListener("open",()=>{this.order_book.refresh_order_book(t(this,D)),console.log("New WebSocket connection opened")}),e.addEventListener("close",()=>{console.log("Previous WebSocket connection was closed")});let i=!1;e.addEventListener("message",async o=>{let r=JSON.parse(o.data);if(r.stream.endsWith("@aggTrade")){let h=r.data;t(this,tt).push({x:h.T,y:parseFloat(h.p),q:parseFloat(h.q),m:h.m})}else if(r.stream.endsWith("@depth@100ms")){if(i){console.log("isHandlingDepth:",i);return}i=!0,await this.handleDepth(r.data),i=!1}else r.stream.endsWith("@kline_1m")&&(n(this,Mt,r.data),s({kline:t(this,Mt),depth:this.order_book.order_book,tradesBuffer:t(this,tt)}),n(this,tt,[]))})}async handleDepth(e){let s=e.u,i=e.U,o=e.pu;if(s<this.last_update_id){console.log("finalUpdateId < last_update_id",s,this.last_update_id);return}if(t(this,_t))if(i<=this.last_update_id&&this.last_update_id<=s)console.log("First processed event succeeded"),n(this,_t,!1);else{await this.reinitializeOrderBook(t(this,D));return}else if(o!=this.last_update_id){await this.reinitializeOrderBook(t(this,D));return}await this.order_book.update_order_book(e.b,e.a),this.last_update_id=s}async reinitializeOrderBook(e){console.log("Out of sync, reinitializing order book...");const s=await It(e);this.last_update_id=s.lastUpdateId,this.order_book.order_book=this.order_book.initialize_order_book(s.bids,s.asks),n(this,tt,[])}}J=new WeakMap,tt=new WeakMap,Mt=new WeakMap,D=new WeakMap,_t=new WeakMap;class oe{constructor(e,s,i){A(this,"currentSymbol");A(this,"order_book");A(this,"shouldRefresh",!0);console.log("initializing new OrderBook class"),this.currentSymbol=e,this.order_book=this.initialize_order_book(s,i)}initialize_order_book(e,s){let i=e.map(r=>r.map(Number)),o=s.map(r=>r.map(Number));return{bids:i,asks:o}}async refresh_order_book(e){let s=new AbortController,i=setInterval(async()=>{if(!this.shouldRefresh||e!==this.currentSymbol)clearInterval(i),s.abort();else{s=new AbortController;try{let o=await It(e,{signal:s.signal});this.order_book=this.initialize_order_book(o.bids,o.asks)}catch(o){o.name==="AbortError"?console.log("Fetch operation aborted"):console.error("Error fetching order book:",o)}}},6e3)}async update_order_book(e,s){let i=e.map(r=>r.map(Number)),o=s.map(r=>r.map(Number));[this.order_book.bids,this.order_book.asks]=await this.prepare_order_book(this.order_book.bids,this.order_book.asks,i,o)}async prepare_order_book(e,s,i,o){try{const r=new Map([...e,...i].filter(d=>d[0]>=e[e.length-1][0])),h=new Map([...s,...o].filter(d=>d[0]<=s[s.length-1][0]));let c=Array.from(r.entries()).filter(d=>d[1]!==0).sort((d,C)=>C[0]-d[0]),m=Array.from(h.entries()).filter(d=>d[1]!==0).sort((d,C)=>d[0]-C[0]);return c[0][0]>=m[0][0]&&(c=c.filter(d=>d[0]<i[i.length-1][0]),m=m.filter(d=>d[0]>o[0][0]),console.log("Error: bids[0] >= asks[0], rehandled to: ",c[0][0],m[0][0])),[c,m]}catch(r){return console.error("Error preparing order book:",r),[i,o]}}}async function It(a){return await(await fetch(`https://fapi.binance.com/fapi/v1/depth?symbol=${a}&limit=500`)).json()}const Bt=["btn1","btn2","btn3","btn4"],ae=["tickers-menu","menu2","menu3","settings-menu"],re=[Ht,de,ce,ue];for(let a=0;a<Bt.length;a++){const e=document.getElementById(Bt[a]);e.addEventListener("click",re[a]),e.addEventListener("click",function(){Nt(Bt[a],ae[a])})}const Xt=document.getElementById("tickers-menu"),Zt=document.getElementById("settings-menu");let Ft=document.getElementById("ticker-search"),Dt;Ft.addEventListener("keyup",function(){Dt=this.value.toLowerCase();let a=document.querySelectorAll("#ticker-table tbody tr");for(let e of a)e.cells[0].textContent.toLowerCase().includes(Dt)?e.style.display="":e.style.display="none"});function he(a){ye(a),Ft.value="",Dt="";let e=document.querySelectorAll("#ticker-table tbody tr");for(let s of e)s.style.display="";Ht()}function le(){const a=new Date,e=a.getHours().toString().padStart(2,"0"),s=a.getMinutes().toString().padStart(2,"0"),i=a.getSeconds().toString().padStart(2,"0");return e+":"+s+":"+i}function Wt(){const a=document.getElementById("tickers-update-info");a.textContent="Last updated at "+le()}window.onload=function(){Vt().then(a=>{Qt(a),Wt()})};window.addEventListener("resize",function(){console.log("resize")});function Ht(){Ft.value="",Dt="";let a=document.querySelectorAll("#ticker-table tbody tr");for(let e of a)e.style.display="";Xt.style.display=Xt.style.display==="none"?"block":"none",Nt("btn1","tickers-menu")}function ce(){console.log("show menu")}function de(){}function ue(){Zt.style.display=Zt.style.display==="none"?"block":"none",Nt("btn4","settings-menu")}function Nt(a,e){const s=document.getElementById(e),i=document.getElementById(a);(a==="btn1"||a==="btn4")&&(s.style.display==="block"?i.classList.add("active"):i.classList.remove("active"))}const Yt=document.getElementById("tickers-update-btn");Yt.addEventListener("click",function(){Yt.disabled=!0,Vt().then(a=>{Qt(a),Wt()})});function Ut(a){return a>=1e9?(a/1e9).toFixed(2)+"b":a>=1e6?(a/1e6).toFixed(2)+"m":a>=1e3?(a/1e3).toFixed(2)+"k":a}function At(a,e,s){let i;return e==="mark_price"?a>10?i=Math.round(a*100)/100:i=Math.round(a*1e4)/1e4:e==="volume"?(i=Ut(a),i="$"+i):e==="open_interest"&&(i=Ut(a*s),i="$"+i),i}function Qt(a){let e=document.querySelector("#tickers-menu table tbody"),s=Object.entries(a);s.sort(([,i],[,o])=>o.volume-i.volume);for(let i=0;i<s.length;i++){let[o,r]=s[i],h;i<e.rows.length?h=e.rows[i]:(h=e.insertRow(),h.insertCell(),h.insertCell(),h.insertCell(),h.insertCell(),h.insertCell(),h.insertCell(),h.insertCell()),h.classList.add("table-row"),h.cells[0].textContent=o,h.cells[1].textContent=At(r.mark_price,"mark_price",r.mark_price),h.cells[2].textContent=(Math.round(r.change*100)/100).toFixed(2)+"%",h.cells[3].textContent=r.funding_rate+"%",h.cells[4].textContent=At(r.open_interest,"open_interest",r.mark_price),h.cells[5].textContent=r.OI_24hrChange+"%",h.cells[6].textContent=At(r.volume,"volume",r.mark_price);const c=Math.min(Math.abs(r.change/100),1),m=Math.max(Math.abs(r.funding_rate*50),.2);r.change<0?h.style.backgroundColor="rgba(192, 80, 78, "+c*1.5+")":h.style.backgroundColor="rgba(81, 205, 160, "+c+")",r.funding_rate>0?h.cells[3].style.color="rgba(212, 80, 78, "+m*1.5+")":h.cells[3].style.color="rgba(81, 246, 160, "+m*1.5+")",h.addEventListener("click",function(){he(o)})}Yt.disabled=!1}let xt=document.createElement("canvas");xt.id="canvas1";xt.style.position="absolute";xt.style.left="0px";xt.style.top="0px";document.body.appendChild(xt);let j=document.querySelector("#canvas1"),me=j.getContext("2d");j.width=window.innerWidth*.9;j.height=window.innerHeight*.9;let Pt=document.createElement("canvas");Pt.id="canvas2";Pt.style.position="absolute";Pt.style.left=j.width+"px";document.body.appendChild(Pt);let ht=document.querySelector("#canvas2"),fe=ht.getContext("2d");ht.width=window.innerWidth*.1;ht.height=window.innerHeight*.9;let Tt=document.createElement("canvas");Tt.id="canvas3";Tt.style.position="absolute";Tt.style.left="0px";Tt.style.top=j.height+"px";document.body.appendChild(Tt);let lt=document.querySelector("#canvas3"),pe=lt.getContext("2d");lt.width=j.width;lt.height=window.innerHeight*.1;const be=new ne,Ot=new $t(me,j,j.width,j.height,fe,ht,ht.width,ht.height,pe,lt,lt.width,lt.height);function ye(a){ge(a).then(e=>{be.createWebSocket(a,s=>Ot.updateData(s)),Ot.resetData(),Ot.tickSize=e,document.querySelector("#ticksize-select").dispatchEvent(new Event("change"))})}async function ge(a){let i=(await(await fetch("https://fapi.binance.com/fapi/v1/exchangeInfo")).json()).symbols.find(o=>o.symbol===a);return i?i.filters[0].tickSize:null}
