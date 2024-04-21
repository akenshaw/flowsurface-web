var He=Object.defineProperty;var Ye=(h,e,i)=>e in h?He(h,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):h[e]=i;var T=(h,e,i)=>(Ye(h,typeof e!="symbol"?e+"":e,i),i),Ee=(h,e,i)=>{if(!e.has(h))throw TypeError("Cannot "+i)};var t=(h,e,i)=>(Ee(h,e,"read from private field"),i?i.call(h):e.get(h)),l=(h,e,i)=>{if(e.has(h))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(h):e.set(h,i)},n=(h,e,i,s)=>(Ee(h,e,"write to private field"),s?s.call(h,i):e.set(h,i),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();let Ot;var w,k,x,Nt,_,M,de,b,wt,Ft,bt,Z,kt,St,Tt,D,G,xt,De;class Ze{constructor(e){T(this,"zoomYLevel",.2222);T(this,"zoomXLevel",0);l(this,w,void 0);l(this,k,void 0);l(this,x,void 0);l(this,Nt,void 0);l(this,_,void 0);l(this,M,void 0);l(this,de,void 0);T(this,"minQty");T(this,"initialPrice");l(this,b,void 0);l(this,wt,void 0);l(this,Ft,!1);l(this,bt,void 0);l(this,Z,!0);l(this,kt,void 0);l(this,St,!0);l(this,Tt,!0);l(this,D,!1);l(this,G,!1);l(this,xt,!1);l(this,De,!1);n(this,w,new $e(this,e[0].ctx,e[0].canvas,e[0].width,e[0].height)),n(this,x,new Ue(this,e[1].ctx,e[1].canvas,e[1].width,e[1].height)),n(this,_,new Qe(this,e[2].ctx,e[2].canvas,e[2].width,e[2].height)),n(this,M,new We(this,e[3].ctx,e[3].canvas,e[3].width,e[3].height)),n(this,k,new Ke(this,e[0].overlayCtx,e[0].overlayCanvas,e[0].width,e[0].height)),n(this,Nt,new Re(this,e[1].overlayCtx,e[1].overlayCanvas,e[1].width,e[1].height)),t(this,k).canvas.addEventListener("mousedown",s=>{n(this,Ft,!0),n(this,bt,{x:s.clientX,y:s.clientY})}),t(this,k).canvas.addEventListener("mousemove",s=>{if(t(this,Ft)){n(this,Z,!1);let o={x:s.clientX,y:s.clientY},a=o.x-t(this,bt).x,r=o.y-t(this,bt).y;!t(this,D)&&t(this,G)&&(n(this,D,!0),requestAnimationFrame(()=>{t(this,w).panXY(a,r),t(this,x).panY(r),t(this,_).panX(a),t(this,M).panX(a),t(this,w).updateData(t(this,b),[]),t(this,x).updateData(t(this,b),t(this,wt)),t(this,_).updateData(t(this,b)),t(this,M).updateData(t(this,b),[]),n(this,D,!1)})),n(this,bt,o),this.updateScaleBtn()}}),["mouseup","mouseleave"].forEach(s=>t(this,k).canvas.addEventListener(s,()=>n(this,Ft,!1))),t(this,k).canvas.addEventListener("wheel",s=>{s.preventDefault(),n(this,Z,!1);const o=5e-4/(.01-.001);let a=this.zoomYLevel-(s.deltaY>0?-o:o),r=this.zoomXLevel+(s.deltaY>0?-o:o);this.zoomYLevel=Math.max(0,Math.min(a,1)),this.zoomXLevel=Math.max(0,Math.min(r,1)),!t(this,D)&&t(this,G)&&(n(this,D,!0),requestAnimationFrame(()=>{t(this,w).zoomY(this.zoomYLevel),t(this,w).zoomX(this.zoomXLevel),t(this,x).zoomY(this.zoomYLevel),t(this,_).zoomX(this.zoomXLevel),t(this,M).zoomX(this.zoomXLevel),t(this,w).updateData(t(this,b),[]),t(this,x).updateData(t(this,b),t(this,wt)),t(this,_).updateData(t(this,b)),t(this,M).updateData(t(this,b),[]),n(this,D,!1)}),this.updateScaleBtn())}),t(this,x).canvas.addEventListener("wheel",s=>{s.preventDefault(),n(this,Z,!1);const o=5e-4/(.01-.001);let a=this.zoomYLevel-(s.deltaY>0?-o:o);this.zoomYLevel=Math.max(0,Math.min(a,1)),!t(this,D)&&t(this,G)&&(n(this,D,!0),requestAnimationFrame(()=>{t(this,w).zoomY(this.zoomYLevel),t(this,x).zoomY(this.zoomYLevel),t(this,w).updateData(t(this,b),[]),t(this,x).updateData(t(this,b),t(this,wt)),n(this,D,!1)}),this.updateScaleBtn())}),t(this,_).canvas.addEventListener("wheel",s=>{s.preventDefault(),n(this,Z,!1);const o=5e-4/(.01-.001);let a=this.zoomXLevel+(s.deltaY>0?-o:o);this.zoomXLevel=Math.max(0,Math.min(a,1)),!t(this,D)&&t(this,G)&&(n(this,D,!0),requestAnimationFrame(()=>{t(this,w).zoomX(this.zoomXLevel),t(this,_).zoomX(this.zoomXLevel),t(this,M).zoomX(this.zoomXLevel),t(this,w).updateData(t(this,b),[]),t(this,_).updateData(t(this,b)),t(this,M).updateData(t(this,b),[]),n(this,D,!1)})),this.updateScaleBtn()}),t(this,k).canvas.addEventListener("mousemove",s=>{const o=t(this,k).canvas.getBoundingClientRect(),a=s.clientX-o.left,r=s.clientY-o.top;t(this,k).updateCrosshair(a,r)}),t(this,k).canvas.addEventListener("mouseleave",()=>t(this,k).clearCrosshair()),document.querySelectorAll("#top-nav button").forEach(s=>{s.addEventListener("click",(function(o){const a=o.target;a.id==="tf1m"||a.id==="tf3m"||a.id==="tf5m"||a.id==="tf15m"||(a.id==="cvdToggleBtn"?(a.classList.toggle("disabled"),n(this,St,!t(this,St)),t(this,M).toggleIndicator("cvd",t(this,St))):a.id==="oiToggleBtn"&&(a.classList.toggle("disabled"),n(this,Tt,!t(this,Tt)),t(this,M).toggleIndicator("oi",t(this,Tt))),!t(this,St)&&!t(this,Tt)?(document.querySelector("#canvas4").style.display="none",document.querySelector("#canvas1").style.height="90%",document.querySelector("#canvas2").style.height="90%",document.querySelector("#canvas3").style.height="10%",document.querySelector("#canvas3").style.top="90%"):(document.querySelector("#canvas4").style.display="flex",document.querySelector("#canvas1").style.height="80%",document.querySelector("#canvas2").style.height="80%",document.querySelector("#canvas3").style.height="10%",document.querySelector("#canvas3").style.top="90%"))}).bind(this))}),document.querySelector("#crosshairBtn").addEventListener("click",s=>{document.querySelector("#crosshairBtn").classList.toggle("disabled"),t(this,k).crosshairSelected=!t(this,k).crosshairSelected}),n(this,kt,document.querySelector("#btn2")),t(this,kt).addEventListener("click",s=>{n(this,Z,!t(this,Z)),this.updateScaleBtn()});const i=document.querySelector("#ticksize-select");i.addEventListener("change",s=>{const o=t(this,de)*i.value;console.log("new tick size:",o),t(this,w).bucketSize=o,t(this,k).bucketSize=o,t(this,w).maxQty=0,t(this,x).bucketSize=o,t(this,Nt).bucketSize=o})}async fetchHistKlines(e,i,s,o,a){n(this,xt,!0);try{return await(await fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=${e}&interval=${i}${s?"&startTime="+s:""}${o?"&endTime="+o:""}&limit=${a}`)).json()}catch(r){return console.log(r,e),NaN}}async getHistKlines(e,i,s){if(t(this,xt)){console.log("already fetching historical klines...");return}n(this,xt,!0),this.fetchHistKlines(Ot,"1m",e,i,s).then(o=>{t(this,w).resolveHistData("klines",o),t(this,_).resolveHistData("klines",o),n(this,xt,!1)})}async fetchHistTrades(e,i,s,o,a=0){try{const r=`https://fapi.binance.com/fapi/v1/aggTrades?symbol=${e}${i?"&startTime="+i:""}${s?"&endTime="+s:""}${o?"&limit="+o:""}`,c=await fetch(r);if(c.status===429){const m=Math.pow(2,a)*1e3;return console.log(`Rate limit exceeded, pausing for ${m/1e3} seconds...`),await new Promise(p=>setTimeout(p,m)),this.fetchHistTrades(e,i,s,o,a+1)}const d=(await c.json()).map(m=>({x:m.T,y:parseFloat(m.p),q:parseFloat(m.q),m:m.m}));return console.log(`Fetched ${d.length} trades.`),d}catch(r){return console.log(r,url),NaN}}updateScaleBtn(){t(this,Z)?(t(this,w).resetZoomAndPan(),t(this,x).resetZoomAndPan(),t(this,_).resetZoomAndPan(),t(this,M).resetZoomAndPan(),t(this,kt).innerHTML='<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 448 512"><path fill="#c8c8c8" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>'):t(this,kt).innerHTML='<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 576 512"><path fill="#c8c8c8" d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z"/></svg>'}updateData(e){n(this,b,e.kline),n(this,wt,e.depth),t(this,w).updateData(e.kline,e.tradesBuffer),t(this,x).updateData(e.kline,e.depth),t(this,_).updateData(e.kline),t(this,M).updateData(e.kline,e.tradesBuffer)}startNew(e,i,s,o){n(this,G,!1),Ot=e,n(this,de,i),this.minQty=s,this.initialPrice=o,this.zoomYLevel=.2222,this.zoomXLevel=0,n(this,Z,!0),this.updateScaleBtn(),t(this,w).resetData(),t(this,x).resetData(),t(this,_).resetData(),t(this,M).resetData(),t(this,G)||setTimeout(()=>{n(this,G,!0)},3e3)}drawScale(e,i){t(this,Nt).drawStart(e,i)}}w=new WeakMap,k=new WeakMap,x=new WeakMap,Nt=new WeakMap,_=new WeakMap,M=new WeakMap,de=new WeakMap,b=new WeakMap,wt=new WeakMap,Ft=new WeakMap,bt=new WeakMap,Z=new WeakMap,kt=new WeakMap,St=new WeakMap,Tt=new WeakMap,D=new WeakMap,G=new WeakMap,xt=new WeakMap,De=new WeakMap;var dt,f,$,A,z,et,q,J,V,_t,C,Ht,Yt,st,Zt,$t,O,ut,Mt,Dt,it,ot;class $e{constructor(e,i,s,o,a){l(this,dt,void 0);l(this,f,void 0);l(this,$,void 0);l(this,A,void 0);l(this,z,[]);l(this,et,[]);l(this,q,void 0);l(this,J,[]);l(this,V,void 0);l(this,_t,void 0);l(this,C,void 0);l(this,Ht,.997);l(this,Yt,1.003);l(this,st,30);T(this,"bucketSize");l(this,Zt,void 0);T(this,"maxQty");l(this,$t,!0);l(this,O,0);l(this,ut,0);l(this,Mt,null);l(this,Dt,[]);l(this,it,!1);l(this,ot,void 0);n(this,dt,e),n(this,f,i),this.canvas=s,n(this,$,o),n(this,A,a),n(this,C,Math.round(1/t(this,st)*t(this,$)))}panXY(e,i){n(this,$t,!1);const s=t(this,A)/(t(this,_t)-t(this,V)),o=i/s;n(this,ut,t(this,ut)+o),n(this,O,t(this,O)+e<0?0:t(this,O)+e)}zoomY(e){const r=.001+.009000000000000001*e,c=.001+(.01-.001)*e;n(this,Ht,Math.round((1-r)*1e4)/1e4),n(this,Yt,Math.round((1+c)*1e4)/1e4)}zoomX(e){n(this,st,Math.round(30+-20*e)),n(this,C,Math.round(1/t(this,st)*t(this,$)))}resetZoomAndPan(){n(this,$t,!0),n(this,O,0),n(this,ut,0),n(this,Ht,.997),n(this,Yt,1.003),n(this,st,30),n(this,C,Math.round(1/t(this,st)*t(this,$)))}resetData(){n(this,z,[]),n(this,et,[]),n(this,q,null),n(this,J,[]),n(this,V,null),n(this,_t,null),n(this,$t,!0),n(this,O,0),n(this,ut,0),n(this,Mt,null),n(this,it,!1),n(this,Zt,t(this,dt).minQty),this.maxQty=0}resolveHistData(e,i){e==="klines"&&i.forEach(s=>{const[o,a,r,c,u,,d]=s,m={startTime:o,openPrice:a,highPrice:r,lowPrice:c,closePrice:u,endTime:d};t(this,z).unshift(m),t(this,et).unshift([])})}async getHistTrades(e){if(t(this,it)){console.log("already fetching historical trades...");return}n(this,it,!0);let i=t(this,q).startTime;const s=Date.now();let o=[],a=0;do try{const r=await t(this,dt).fetchHistTrades(e,i,s,1e3);o=o.concat(r),a=r[r.length-1].x,i=a+1,console.log("fetched",r.length,"trades")}catch(r){console.log(r,i,null);break}while(a<s);n(this,J,o);for(let r=0;r<t(this,z).length;r++){const c=t(this,z)[r];let u=c.startTime;const d=c.endTime;let m=[],p=0;for(console.log("getting historical trades:",r+1,"of",t(this,z).length,"klines...");;){if(e!=Ot){console.log("stopped fetching historical trades for",e),n(this,it,!1);return}try{const v=await t(this,dt).fetchHistTrades(Ot,u,d,1e3);if(m=m.concat(v),v.length>0&&(p=v[v.length-1].x,u=p+1),v.length<1e3)break;await new Promise(lt=>setTimeout(lt,400))}catch(v){console.log(v,u,d);break}}t(this,et)[r]=m}n(this,it,!1)}updateData(e,i){const{E:s,k:{t:o,o:a,h:r,l:c,c:u,T:d}}=e;(s>t(this,Mt)||t(this,Mt)===null)&&(t(this,q)&&t(this,q).endTime!==d&&(t(this,z).push(t(this,q)),t(this,et).push(t(this,J)),n(this,J,[])),n(this,Mt,d)),n(this,q,{startTime:o,openPrice:a,highPrice:r,lowPrice:c,closePrice:u,endTime:d});for(let m=0;m<i.length;m++){const p=i[m];if(p.x>=o&&p.x<d)t(this,J).push(p);else if(p.x>=d){t(this,Dt).push(...i.slice(m));break}}if(t(this,Dt).length>0&&n(this,Dt,t(this,Dt).filter(m=>m.x>=o&&m.x<d?(t(this,J).push(m),!1):!0)),n(this,V,Math.min((Number(r)+Number(c))/2*t(this,Ht),c)+t(this,ut)),n(this,_t,Math.max((Number(r)+Number(c))/2*t(this,Yt),r)+t(this,ut)),n(this,ot,t(this,A)/(t(this,_t)-t(this,V))),this.drawStart(),t(this,z).length<60){const p=60-t(this,z).length,v=t(this,q).startTime-1;t(this,dt).getHistKlines(null,v,p)}else!t(this,it)&&t(this,et)[t(this,z).length-1].length===0&&this.getHistTrades(Ot)}drawStart(){t(this,f).clearRect(0,0,t(this,$),t(this,A));const e=t(this,st)*60*1e3,i=t(this,q).startTime+6e4-e,s=0-t(this,O),o=t(this,$)-t(this,O);let a=0;t(this,z).forEach((c,u)=>{const d=Math.round((c.startTime-i)/e*t(this,$));if(d>=s&&d<=o){const m=this.drawDataPoint(t(this,et)[u],c,d+t(this,O));a=Math.max(a,m)}});const r=t(this,$)-t(this,C);if(r>=s&&r<=o){const c=this.drawDataPoint(t(this,J),t(this,q),r+t(this,O));a=Math.max(a,c)}this.maxQty=a}drawDataPoint(e,i,s){let o=0;if(e){const m=[].concat(...e).reduce((p,v)=>{const lt=Math.round(v.y/this.bucketSize)*this.bucketSize,tt=`${lt}-${v.m}`;return p[tt]||(p[tt]={...v,y:lt,q:0}),p[tt].q+=v.q,p},{});o=Math.max(...Object.values(m).map(p=>p.q)),this.maxQty!==0&&Object.values(m).forEach(p=>{const v=Math.round(t(this,A)-(p.y-t(this,V))*t(this,ot)),lt=this.scaleQuantity(p.q);this.drawTradesAt(s,v,p.m,lt)})}const a=Math.round(t(this,A)-(i.openPrice-t(this,V))*t(this,ot)),r=Math.round(t(this,A)-(i.highPrice-t(this,V))*t(this,ot)),c=Math.round(t(this,A)-(i.lowPrice-t(this,V))*t(this,ot)),u=Math.round(t(this,A)-(i.closePrice-t(this,V))*t(this,ot));return this.drawKlineAt(s,r-2),this.drawKlineAt(s,c+2),t(this,f).beginPath(),t(this,f).moveTo(s+t(this,C)/2,a),t(this,f).lineTo(s+t(this,C)/2,u),t(this,f).shadowColor=u<a?"rgba(155, 230, 209, 0.5)":"rgba(230, 161, 160, 0.5)",t(this,f).shadowBlur=5,t(this,f).strokeStyle=u<a?"rgba(155, 230, 209, 0.7)":"rgba(230, 161, 160, 0.7)",t(this,f).stroke(),t(this,f).shadowColor="transparent",t(this,f).shadowBlur=0,o}drawKlineAt(e,i){t(this,f).beginPath(),t(this,f).moveTo(e+1,i),t(this,f).lineTo(e+t(this,C)-1,i),t(this,f).strokeStyle="rgba(200, 200, 200, 0.5)",t(this,f).stroke()}drawTradesAt(e,i,s,o){t(this,f).beginPath(),s?(t(this,f).moveTo(e-4+t(this,C)/2,i),t(this,f).lineTo(e-4+t(this,C)/2-o,i),t(this,f).strokeStyle="rgba(192, 80, 77, 1)"):(t(this,f).moveTo(e+4+t(this,C)/2,i),t(this,f).lineTo(e+4+t(this,C)/2+o,i),t(this,f).strokeStyle="rgba(81, 205, 160, 1)"),t(this,f).stroke()}scaleQuantity(e){const s=t(this,C)/2-4;return 0+(e-t(this,Zt))*(s-0)/(this.maxQty-t(this,Zt))}}dt=new WeakMap,f=new WeakMap,$=new WeakMap,A=new WeakMap,z=new WeakMap,et=new WeakMap,q=new WeakMap,J=new WeakMap,V=new WeakMap,_t=new WeakMap,C=new WeakMap,Ht=new WeakMap,Yt=new WeakMap,st=new WeakMap,Zt=new WeakMap,$t=new WeakMap,O=new WeakMap,ut=new WeakMap,Mt=new WeakMap,Dt=new WeakMap,it=new WeakMap,ot=new WeakMap;var Ut,g,Ct,U,Qt,nt,X,mt,Wt,Kt,Rt,Lt,ue,Gt,ft;class Ue{constructor(e,i,s,o,a){l(this,Ut,void 0);l(this,g,void 0);l(this,Ct,void 0);l(this,U,void 0);l(this,Qt,void 0);l(this,nt,void 0);l(this,X,void 0);l(this,mt,void 0);l(this,Wt,.997);l(this,Kt,1.003);T(this,"bucketSize");l(this,Rt,!0);l(this,Lt,0);l(this,ue,void 0);l(this,Gt,void 0);l(this,ft,void 0);n(this,Ut,e),n(this,g,i),this.canvas=s,n(this,Ct,o),n(this,U,a)}panY(e){n(this,Rt,!1);const i=t(this,U)/(t(this,mt)-t(this,X)),s=e/i;n(this,Lt,t(this,Lt)+s)}zoomY(e){const r=.001+.009000000000000001*e,c=.001+(.01-.001)*e;n(this,Wt,Math.round((1-r)*1e4)/1e4),n(this,Kt,Math.round((1+c)*1e4)/1e4)}resetZoomAndPan(){n(this,Rt,!0),n(this,Wt,.997),n(this,Kt,1.003),n(this,Lt,0)}resetData(){n(this,Qt,null),n(this,nt,null),n(this,X,null),n(this,mt,null),n(this,Rt,!0),n(this,ue,Math.round(1e6/t(this,Ut).initialPrice)),n(this,Gt,t(this,ue))}updateData(e,i){const{k:{o:s,h:o,l:a,c:r}}=e;n(this,Qt,{openPrice:s,highPrice:o,lowPrice:a,closePrice:r});const{asks:c,bids:u}=i;n(this,nt,{asks:c,bids:u}),n(this,X,Math.min((Number(o)+Number(a))/2*t(this,Wt),a)+t(this,Lt)),n(this,mt,Math.max((Number(o)+Number(a))/2*t(this,Kt),o)+t(this,Lt)),n(this,ft,t(this,U)/(t(this,mt)-t(this,X))),this.drawStart(),t(this,Ut).drawScale(t(this,X),t(this,mt))}drawStart(){t(this,g).clearRect(0,0,t(this,Ct),t(this,U));const{closePrice:e,openPrice:i}=t(this,Qt),s=Math.round(t(this,U)-(e-t(this,X))*t(this,ft)),o=Math.round(t(this,U)-(i-t(this,X))*t(this,ft));if(this.maxQuantity=t(this,Gt),t(this,nt).asks&&t(this,nt).bids){const m=tt=>tt.reduce((ct,Vt)=>{const Te=Math.round(Vt[0]/this.bucketSize)*this.bucketSize;return ct[Te]||(ct[Te]=0),ct[Te]+=parseFloat(Vt[1]),ct},{}),p=m(t(this,nt).asks),v=m(t(this,nt).bids),lt=[...Object.values(p),...Object.values(v)];this.maxQuantity=Math.max(t(this,Gt),...lt),Object.entries(p).forEach(([tt,ct])=>{const Vt=Math.round(t(this,U)-(tt-t(this,X))*t(this,ft));this.drawLineAt(Vt,"#C0504E",ct)}),Object.entries(v).forEach(([tt,ct])=>{const Vt=Math.round(t(this,U)-(tt-t(this,X))*t(this,ft));this.drawLineAt(Vt,"#51CDA0",ct)})}t(this,g).font="10px monospace",t(this,g).fillStyle="#c8c8c8";let a=Math.round(this.maxQuantity),r=t(this,g).measureText(a).width;t(this,g).fillText(a,t(this,Ct)-5-r,20);const c={"#C0504E":"rgba(192, 80, 78, 0.5)","#51CDA0":"rgba(81, 205, 160, 0.5)","#c8c8c8":"rgba(200, 200, 200, 0.5)"},u=s>o?"#C0504E":s<o?"#51CDA0":"#c8c8c8",d=c[u];this.drawTextWithBackground(s,Number(e),"#212121",u,d)}drawLineAt(e,i,s){const o=s/this.maxQuantity*(t(this,Ct)-60);t(this,g).beginPath(),t(this,g).moveTo(60,e),t(this,g).lineTo(o+60,e),t(this,g).strokeStyle=i,t(this,g).lineWidth=1,t(this,g).stroke()}drawTextWithBackground(e,i,s,o,a){t(this,g).font="11px monospace";const r=t(this,g).measureText(i).width;t(this,g).shadowColor=a,t(this,g).shadowBlur=5,t(this,g).fillStyle=o,t(this,g).fillRect(3,e-10,r+4,12),t(this,g).shadowColor="transparent",t(this,g).shadowBlur=0,t(this,g).fillStyle=s,t(this,g).fillText(i,5,e)}}Ut=new WeakMap,g=new WeakMap,Ct=new WeakMap,U=new WeakMap,Qt=new WeakMap,nt=new WeakMap,X=new WeakMap,mt=new WeakMap,Wt=new WeakMap,Kt=new WeakMap,Rt=new WeakMap,Lt=new WeakMap,ue=new WeakMap,Gt=new WeakMap,ft=new WeakMap;var we,y,N,E,Pt,at,Jt,jt,F,ht,H,me,te;class Qe{constructor(e,i,s,o,a){l(this,we,void 0);l(this,y,void 0);l(this,N,void 0);l(this,E,void 0);l(this,Pt,[]);l(this,at,void 0);l(this,Jt,void 0);l(this,jt,void 0);l(this,F,void 0);l(this,ht,30);l(this,H,0);l(this,me,!1);l(this,te,void 0);n(this,we,e),n(this,y,i),this.canvas=s,n(this,N,o),n(this,E,a),n(this,F,Math.round(1/t(this,ht)*t(this,N)))}panX(e){n(this,H,t(this,H)+e<0?0:t(this,H)+e)}zoomX(e){n(this,ht,Math.round(30+-20*e)),n(this,F,Math.round(1/t(this,ht)*t(this,N)))}resetZoomAndPan(){n(this,H,0),n(this,ht,30),n(this,F,Math.round(1/t(this,ht)*t(this,N)))}resetData(){n(this,Pt,[]),n(this,at,null),n(this,Jt,null),n(this,jt,null),n(this,H,0),n(this,me,!1)}resolveHistData(e,i){e==="klines"&&(n(this,me,!0),i.forEach(s=>{const[o,,,,,a,r,,,c,,,]=s,u={startTime:o,endTime:r,totalVolume:a,buyVolume:c,sellVolume:a-c};t(this,Pt).unshift(u)}))}updateData(e){const{k:{t:i,T:s,v:o,V:a}}=e,r=o-a;t(this,Jt)!==i&&(t(this,at)&&t(this,Pt).push(t(this,at)),n(this,Jt,i)),n(this,at,{startTime:i,endTime:s,buyVolume:a,sellVolume:r}),this.drawStart()}drawStart(){t(this,y).clearRect(0,0,t(this,N),t(this,E)),n(this,te,(t(this,E)-20)/t(this,jt));const e=t(this,ht)*60*1e3,i=t(this,at).startTime+6e4-e,s=0-t(this,H),o=t(this,N)-t(this,H),a=t(this,Pt).filter(r=>{const c=Math.round((r.startTime-i)/e*t(this,N));return c>=s&&c<=o});n(this,jt,a.reduce((r,c)=>Math.max(r,c.buyVolume,c.sellVolume),0)),a.forEach(r=>{const c=Math.round((r.startTime-i)/e*t(this,N));this.drawDataPoint(r,c+t(this,H))}),this.drawDataPoint(t(this,at),t(this,N)-t(this,F)+t(this,H))}drawDataPoint(e,i){const s=Math.max(0,Math.min(t(this,E)-20,Math.round(t(this,E)-20-e.buyVolume*t(this,te)))),o=Math.max(0,Math.min(t(this,E)-20,Math.round(t(this,E)-20-e.sellVolume*t(this,te))));t(this,y).beginPath(),t(this,y).moveTo(i,0),t(this,y).lineTo(i,t(this,E)-20),t(this,y).strokeStyle="rgba(200, 200, 200, 0.4)",t(this,y).lineWidth=1,t(this,y).stroke(),this.drawTimeLabel(i,e.startTime),this.drawKlineAt(i+t(this,F)/2+t(this,F)/8,s,"#51CDA0","rgba(81, 205, 160, 0.4)"),this.drawKlineAt(i+t(this,F)/2-t(this,F)/8,o,"#C0504E","rgba(192, 80, 77, 0.4)")}drawKlineAt(e,i,s,o){t(this,y).beginPath(),t(this,y).moveTo(e,t(this,E)-20),t(this,y).lineTo(e,i),t(this,y).strokeStyle=s,t(this,y).lineWidth=t(this,F)/6,t(this,y).shadowColor=o,t(this,y).shadowBlur=3,t(this,y).stroke(),t(this,y).shadowColor="transparent",t(this,y).shadowBlur=0}drawTimeLabel(e,i){const s=new Date(i),o=s.getHours().toString().padStart(2,"0")+":"+s.getMinutes().toString().padStart(2,"0");t(this,y).font="11px monospace",t(this,y).fillStyle="#c8c8c8",t(this,y).fillText(o,e,t(this,E)-5)}}we=new WeakMap,y=new WeakMap,N=new WeakMap,E=new WeakMap,Pt=new WeakMap,at=new WeakMap,Jt=new WeakMap,jt=new WeakMap,F=new WeakMap,ht=new WeakMap,H=new WeakMap,me=new WeakMap,te=new WeakMap;var be,L,Q,Y,I,W,Ce,K,ee,se,zt,ie,j,R,rt,P,oe,ne,Et,fe,pt;class We{constructor(e,i,s,o,a){l(this,be,void 0);l(this,L,void 0);l(this,Q,void 0);l(this,Y,void 0);l(this,I,[]);l(this,W,void 0);l(this,Ce,void 0);l(this,K,[]);l(this,ee,void 0);l(this,se,void 0);l(this,zt,void 0);l(this,ie,void 0);l(this,j,void 0);l(this,R,void 0);l(this,rt,30);l(this,P,0);l(this,oe,0);l(this,ne,!0);l(this,Et,!0);l(this,fe,void 0);l(this,pt,void 0);n(this,be,e),n(this,L,i),this.canvas=s,n(this,Q,o),n(this,Y,a),n(this,R,Math.round(1/t(this,rt)*t(this,Q)))}panX(e){n(this,P,t(this,P)+e<0?0:t(this,P)+e)}zoomX(e){n(this,rt,Math.round(30+-20*e)),n(this,R,Math.round(1/t(this,rt)*t(this,Q)))}resetZoomAndPan(){n(this,P,0),n(this,rt,30),n(this,R,Math.round(1/t(this,rt)*t(this,Q)))}resetData(){n(this,I,[]),n(this,K,[]),n(this,W,null),n(this,ee,null),n(this,se,null),n(this,zt,null),n(this,ie,null),n(this,j,null),n(this,oe,0),n(this,P,0)}toggleIndicator(e,i){e==="oi"?n(this,ne,i):e==="cvd"&&n(this,Et,i)}async updateData(e,i){const{k:{t:s,T:o}}=e;if(n(this,oe,t(this,oe)+i.reduce((a,r)=>r.m?a-r.q:a+r.q,0)),t(this,ee)!==s&&(t(this,W)&&(this.fetchOI(Ot).then(a=>{t(this,K).push(a)}),t(this,I).push(t(this,W)),t(this,I).length>60&&(t(this,I).shift(),t(this,K).shift())),n(this,ee,s)),n(this,W,{startTime:s,endTime:o,cumVolumeDelta:t(this,oe)}),t(this,ne)||t(this,Et)){n(this,se,t(this,K).length>0?Math.max(...t(this,K).map(Number))*1.001:0),n(this,zt,t(this,K).length>0?Math.min(...t(this,K).map(Number))*.999:0);const a=t(this,I).map(r=>r.cumVolumeDelta);n(this,ie,(Math.max(...a,t(this,W).cumVolumeDelta)||0)*1.001),n(this,j,(Math.min(...a,t(this,W).cumVolumeDelta)||0)*.999),n(this,fe,t(this,Y)/(t(this,se)-t(this,zt))),n(this,pt,t(this,Y)/(t(this,ie)-t(this,j))),this.drawStart()}}drawStart(){t(this,L).clearRect(0,0,t(this,Q),t(this,Y));const e=t(this,rt)*60*1e3,i=t(this,W).startTime+6e4-e,s=0-t(this,P),o=t(this,Q)-t(this,P);if(t(this,I).forEach((a,r)=>{const c=Math.round((a.startTime-i)/e*t(this,Q));if(c>=s&&c<=o){if(t(this,Et)){const u=t(this,Y)-(a.cumVolumeDelta-t(this,j))*t(this,pt);if(r>0){const d=t(this,Y)-(t(this,I)[r-1].cumVolumeDelta-t(this,j))*t(this,pt);this.drawCVDLine(c+t(this,P),d,c+t(this,R)+t(this,P),u)}}if(t(this,ne)){const u=t(this,Y)-(t(this,K)[r]-t(this,zt))*t(this,fe);this.drawOIPoint(c+t(this,P),u)}}}),t(this,Et)){const a=t(this,Q)-t(this,R)+t(this,P);if(a>=s&&a<=o){const r=t(this,Y)-(t(this,W).cumVolumeDelta-t(this,j))*t(this,pt);if(t(this,I).length>0){const c=t(this,Y)-(t(this,I)[t(this,I).length-1].cumVolumeDelta-t(this,j))*t(this,pt);this.drawCVDLine(a,c,a+t(this,R),r)}else this.drawCVDLine(a,0,a+t(this,R),r)}}}drawCVDLine(e,i,s,o){t(this,L).beginPath(),t(this,L).moveTo(e,i),t(this,L).lineTo(s,o),t(this,L).lineWidth=2,t(this,L).strokeStyle="rgba(238, 216, 139, 0.3)",t(this,L).stroke()}drawOIPoint(e,i){t(this,L).beginPath(),t(this,L).arc(e+t(this,R),i,2,0,2*Math.PI),t(this,L).fillStyle="#c8c8c8",t(this,L).fill()}async fetchOI(e){return(await(await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${e}`)).json()).openInterest}}be=new WeakMap,L=new WeakMap,Q=new WeakMap,Y=new WeakMap,I=new WeakMap,W=new WeakMap,Ce=new WeakMap,K=new WeakMap,ee=new WeakMap,se=new WeakMap,zt=new WeakMap,ie=new WeakMap,j=new WeakMap,R=new WeakMap,rt=new WeakMap,P=new WeakMap,oe=new WeakMap,ne=new WeakMap,Et=new WeakMap,fe=new WeakMap,pt=new WeakMap;var ke,S,It,Bt,Le,Pe;class Ke{constructor(e,i,s,o,a){l(this,ke,void 0);l(this,S,void 0);l(this,It,void 0);l(this,Bt,void 0);l(this,Le,void 0);l(this,Pe,void 0);T(this,"crosshairSelected",!1);n(this,ke,e),n(this,S,i),this.canvas=s,n(this,It,o),n(this,Bt,a)}updateCrosshair(e,i){this.crosshairSelected&&(t(this,S).clearRect(0,0,t(this,It),t(this,Bt)),this.drawCrosshair(e,i))}drawCrosshair(e,i){t(this,S).beginPath(),t(this,S).moveTo(e,0),t(this,S).lineTo(e,t(this,Bt)),t(this,S).strokeStyle="rgba(200, 200, 200, 0.5)",t(this,S).stroke(),t(this,S).beginPath(),t(this,S).moveTo(0,i),t(this,S).lineTo(t(this,It),i),t(this,S).strokeStyle="rgba(200, 200, 200, 0.5)",t(this,S).stroke()}clearCrosshair(){t(this,S).clearRect(0,0,t(this,It),t(this,Bt))}}ke=new WeakMap,S=new WeakMap,It=new WeakMap,Bt=new WeakMap,Le=new WeakMap,Pe=new WeakMap;var Se,gt,pe,At,ge,ye;class Re{constructor(e,i,s,o,a){l(this,Se,void 0);l(this,gt,void 0);l(this,pe,void 0);l(this,At,void 0);T(this,"bucketSize");l(this,ge,void 0);l(this,ye,void 0);n(this,Se,e),n(this,gt,i),this.canvas=s,n(this,pe,o),n(this,At,a)}drawStart(e,i){if(e===t(this,ge)&&i===t(this,ye))return;t(this,gt).clearRect(0,0,t(this,pe),t(this,At)),n(this,ge,e),n(this,ye,i);const s=t(this,At)/(i-e),o=20,a=(i-e)/o;for(let r=0;r<=o;r++){let c=e+r*a;c=Number((Math.round(c/this.bucketSize)*this.bucketSize).toFixed(4));const u=Math.round(t(this,At)-(c-e)*s);this.drawTextAt(u,Number(c.toFixed(4)),"#c8c8c8")}}drawTextAt(e,i,s){t(this,gt).font="11px monospace",t(this,gt).fillStyle=s,t(this,gt).fillText(i,5,e)}}Se=new WeakMap,gt=new WeakMap,pe=new WeakMap,At=new WeakMap,ge=new WeakMap,ye=new WeakMap;async function Ge(){let h={};const[e,i]=await Promise.all([es(),ss()]);return Object.keys(e).filter(o=>!["BTCSTUSDT","CVCUSDT","DOGEUSDC","COCOSUSDT","BNBBTC","ETHBTC","RAYUSDT","HNTUSDT","SCUSDT","WIFUSDT","BTSUSDT","TOMOUSDT","FTTUSDT","SRMUSDT"].includes(o)&&!o.includes("_")).forEach(o=>{i.hasOwnProperty(o)&&(h[o]={...e[o],...i[o]})}),h}async function Je(h,e,i){const s=h.map(r=>je(r,e,i)),o=await Promise.all(s);let a={};return h.forEach((r,c)=>{a[r]={...o[c]}}),a}async function je(h,e,i){let s;try{s=await ts(h);const a=await(await fetch(`https://fapi.binance.com/futures/data/openInterestHist?symbol=${h}&period=30m&limit=1&startTime=${e}&endTime=${i}`)).json(),r=Math.round(a[0].sumOpenInterest),c=Math.round((s-r)/r*1e4)/100;return{open_interest:s,OI_24hrChange:c}}catch(o){return console.error(o,h),{open_interest:s,OI_24hrChange:NaN}}}async function ts(h){try{const i=await(await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${h}`)).json();return Number(i.openInterest)}catch(e){return console.error(e,h),NaN}}async function es(){let h={};const i=await(await fetch("https://fapi.binance.com/fapi/v1/premiumIndex")).json();for(let s of i){let o=s.symbol,a=parseFloat(s.lastFundingRate)*100,r=parseFloat(s.markPrice);h[o]={funding_rate:parseFloat(a.toFixed(3)),mark_price:Math.round(r*1e4)/1e4}}return h}async function ss(){let h={};const i=await(await fetch("https://fapi.binance.com/fapi/v1/ticker/24hr")).json();for(let s of i){let o=s.symbol,a=s.quoteVolume,r=s.priceChangePercent;h[o]={change:Number(r),volume:Math.round(a)}}return h}async function is(h){return(await(await fetch("https://fapi.binance.com/fapi/v1/premiumIndex")).json()).find(s=>s.symbol===h).markPrice}async function os(h){let s=(await(await fetch("https://fapi.binance.com/fapi/v1/exchangeInfo")).json()).symbols.find(o=>o.symbol===h.toUpperCase());return s?[s.filters[0].tickSize,s.filters[2].minQty]:null}var yt,vt,ae,B,he;class ns{constructor(){l(this,yt,void 0);l(this,vt,[]);l(this,ae,[]);l(this,B,void 0);l(this,he,!0);T(this,"last_update_id");T(this,"order_book");console.log("Initializing WebSocketService")}createWebSocket(e,i){t(this,yt)&&t(this,yt).readyState===1&&(console.log("Closing existing websocket connection for symbol:",t(this,B).toUpperCase()),this.order_book.shouldRefresh=!1,t(this,yt).close(),n(this,he,!0),this.order_book=null,n(this,vt,[]),n(this,ae,[])),console.log("Creating websocket connection for symbol:",e),n(this,B,e.toLowerCase()),Me(t(this,B)).then(s=>{n(this,yt,new WebSocket(`wss://fstream.binance.com/stream?streams=${t(this,B)}@aggTrade/${t(this,B)}@depth@100ms/${t(this,B)}@kline_1m`)),this.setupEventListeners(t(this,yt),i),this.last_update_id=s.lastUpdateId,this.order_book=new as(t(this,B),s.bids,s.asks)}).catch(s=>{console.error("Error initializing the order book:",s)})}setupEventListeners(e,i){e.addEventListener("open",()=>{this.order_book.refresh_order_book(t(this,B)),console.log("New WebSocket connection opened")}),e.addEventListener("close",()=>{console.log("Previous WebSocket connection was closed")});let s=!1;e.addEventListener("message",async o=>{let a=JSON.parse(o.data);if(a.stream.endsWith("@aggTrade")){let r=a.data;t(this,vt).push({x:r.T,y:parseFloat(r.p),q:parseFloat(r.q),m:r.m})}else if(a.stream.endsWith("@depth@100ms")){if(s){console.log("isHandlingDepth:",s);return}s=!0,await this.handleDepth(a.data),s=!1,i({kline:t(this,ae),depth:this.order_book.order_book,tradesBuffer:t(this,vt)}),n(this,vt,[])}else a.stream.endsWith("@kline_1m")&&n(this,ae,a.data)})}async handleDepth(e){let i=e.u,s=e.U,o=e.pu;if(i<this.last_update_id){console.log("finalUpdateId < last_update_id",i,this.last_update_id);return}if(t(this,he))if(s<=this.last_update_id&&this.last_update_id<=i)console.log("First processed event succeeded"),n(this,he,!1);else{await this.reinitializeOrderBook(t(this,B));return}else if(o!=this.last_update_id){await this.reinitializeOrderBook(t(this,B));return}await this.order_book.update_order_book(e.b,e.a),this.last_update_id=i}async reinitializeOrderBook(e){console.log("Out of sync, reinitializing order book...");const i=await Me(e);this.last_update_id=i.lastUpdateId,this.order_book.order_book=this.order_book.initialize_order_book(i.bids,i.asks),n(this,vt,[])}}yt=new WeakMap,vt=new WeakMap,ae=new WeakMap,B=new WeakMap,he=new WeakMap;class as{constructor(e,i,s){T(this,"currentSymbol");T(this,"order_book");T(this,"shouldRefresh",!0);console.log("initializing new OrderBook class"),this.currentSymbol=e,this.order_book=this.initialize_order_book(i,s)}initialize_order_book(e,i){let s=e.map(a=>a.map(Number)),o=i.map(a=>a.map(Number));return{bids:s,asks:o}}async refresh_order_book(e){let i=new AbortController,s=setInterval(async()=>{if(!this.shouldRefresh||e!==this.currentSymbol)clearInterval(s),i.abort();else{i=new AbortController;try{let o=await Me(e,{signal:i.signal});this.order_book=this.initialize_order_book(o.bids,o.asks)}catch(o){o.name==="AbortError"?console.log("Fetch operation aborted"):console.error("Error fetching order book:",o)}}},6e3)}async update_order_book(e,i){let s=e.map(a=>a.map(Number)),o=i.map(a=>a.map(Number));[this.order_book.bids,this.order_book.asks]=await this.prepare_order_book(this.order_book.bids,this.order_book.asks,s,o)}async prepare_order_book(e,i,s,o){try{const a=new Map([...e,...s].filter(d=>d[0]>=e[e.length-1][0])),r=new Map([...i,...o].filter(d=>d[0]<=i[i.length-1][0]));let c=Array.from(a.entries()).filter(d=>d[1]!==0).sort((d,m)=>m[0]-d[0]),u=Array.from(r.entries()).filter(d=>d[1]!==0).sort((d,m)=>d[0]-m[0]);return c[0][0]>=u[0][0]&&(c=c.filter(d=>d[0]<s[s.length-1][0]),u=u.filter(d=>d[0]>o[0][0]),console.log("Error: bids[0] >= asks[0], rehandled to: ",c[0][0],u[0][0])),[c,u]}catch(a){return console.error("Error preparing order book:",a),[s,o]}}}async function Me(h){return await(await fetch(`https://fapi.binance.com/fapi/v1/depth?symbol=${h}&limit=500`)).json()}const xe=["btn1","btn2","btn3","btn4"],hs=["tickers-menu","menu2","menu3","settings-menu"],rs=[Fe,Ie,Ie,cs];for(let h=0;h<xe.length;h++){const e=document.getElementById(xe[h]);e.addEventListener("click",rs[h]),e.addEventListener("click",function(){ce(xe[h],hs[h])})}const qt=document.getElementById("tickers-menu"),Xt=document.getElementById("settings-menu");let ze=document.getElementById("ticker-search"),ve;ze.addEventListener("keyup",function(){ve=this.value.toLowerCase();let h=document.querySelectorAll("#ticker-table tbody tr");for(let e of h)e.cells[0].textContent.toLowerCase().includes(ve)?e.style.display="":e.style.display="none"});function Xe(){re.className="loading-animation",re.disabled=!0,Ge().then(h=>{Ae(h);let e=Date.now()-25*60*60*1e3,i=e+60*60*1e3;Je(Object.keys(h),e,i).then(s=>{Object.keys(s).forEach(o=>{h.hasOwnProperty(o)&&(h[o]={...h[o],...s[o]})}),Ae(h),re.disabled=!1,re.className=""}),ls()})}function Ne(h,e){e===null?is(h).then(s=>{console.log("initial canvas was started with symbol: "+h,s),Oe(h,s)}):(Oe(h,e),console.log("canvas was started with symbol: "+h)),ze.value="",ve="";let i=document.querySelectorAll("#ticker-table tbody tr");for(let s of i)s.style.display="";qt.style.display==="block"&&Fe()}function ls(){const h=new Date,e=h.getHours().toString().padStart(2,"0")+":"+h.getMinutes().toString().padStart(2,"0")+":"+h.getSeconds().toString().padStart(2,"0"),i=document.getElementById("tickers-update-info");i.textContent="Last updated at "+e}const re=document.getElementById("tickers-update-btn");re.addEventListener("click",function(){Xe()});window.onload=function(){Xe(),Ne("BTCUSDT",null)};function Ie(){console.log("show menu")}function Fe(){ze.value="",ve="";let h=document.querySelectorAll("#ticker-table tbody tr");for(let e of h)e.style.display="";qt.style.display=qt.style.display==="none"?"block":"none",ce("btn1","tickers-menu"),qt.style.display==="block"?document.addEventListener("click",le):document.removeEventListener("click",le)}function cs(){Xt.style.display=Xt.style.display==="none"?"block":"none",ce("btn4","settings-menu"),Xt.style.display==="block"?document.addEventListener("click",le):document.removeEventListener("click",le)}function le(h){const e=document.querySelector("#btn1"),i=document.querySelector("#btn4");!Xt.contains(h.target)&&!i.contains(h.target)&&(Xt.style.display="none",ce("btn4","settings-menu")),!qt.contains(h.target)&&!e.contains(h.target)&&(qt.style.display="none",ce("btn1","tickers-menu")),Xt.style.display==="none"&&qt.style.display==="none"&&document.removeEventListener("click",le)}function ce(h,e){const i=document.getElementById(e),s=document.getElementById(h);(h==="btn1"||h==="btn4")&&(i.style.display==="block"?s.classList.add("active"):s.classList.remove("active"))}function Be(h){return h>=1e9?(h/1e9).toFixed(2)+"b":h>=1e6?(h/1e6).toFixed(2)+"m":h>=1e3?(h/1e3).toFixed(2)+"k":h}function _e(h,e,i){let s;return e==="mark_price"?h>10?s=Math.round(h*100)/100:s=Math.round(h*1e4)/1e4:e==="volume"?(s=Be(h),s="$"+s):e==="open_interest"&&(s=Be(h*i),s="$"+s),s}function Ae(h){let e=document.querySelector("#tickers-menu table tbody");e.innerHTML="";let i=Object.entries(h);i.sort(([,s],[,o])=>o.volume-s.volume);for(let s=0;s<i.length;s++){let[o,a]=i[s],r;s<e.rows.length?r=e.rows[s]:(r=e.insertRow(),r.insertCell(),r.insertCell(),r.insertCell(),r.insertCell(),r.insertCell(),r.insertCell(),r.insertCell()),r.classList.add("table-row"),r.cells[0].textContent=o,r.cells[1].textContent=_e(a.mark_price,"mark_price",a.mark_price),r.cells[2].textContent=(Math.round(a.change*100)/100).toFixed(2)+"%",r.cells[3].textContent=a.funding_rate+"%",r.cells[4].textContent=h.hasOwnProperty(o)&&h[o].hasOwnProperty("open_interest")?_e(h[o].open_interest,"open_interest",h[o].mark_price):"...",r.cells[5].textContent=h.hasOwnProperty(o)&&h[o].hasOwnProperty("OI_24hrChange")?h[o].OI_24hrChange+"%":"...",r.cells[6].textContent=_e(a.volume,"volume",a.mark_price);const c=Math.min(Math.abs(a.change/100),1),u=Math.max(Math.abs(a.funding_rate*50),.2);a.change<0?r.style.backgroundColor="rgba(192, 80, 78, "+c*1.5+")":r.style.backgroundColor="rgba(81, 205, 160, "+c+")",a.funding_rate>0?r.cells[3].style.color="rgba(212, 80, 78, "+u*1.5+")":r.cells[3].style.color="rgba(81, 246, 160, "+u*1.5+")",r.addEventListener("click",function(){Ne(o,a.mark_price)})}}function qe(h){const e=h.clientWidth,i=h.clientHeight;(h.width!==e||h.height!==i)&&(h.width=e,h.height=i)}let ds=[{id:"canvas1",overlayId:"overlay-canvas1"},{id:"canvas2",overlayId:"overlay-canvas2"},{id:"canvas3",overlayId:null},{id:"canvas4",overlayId:null}],us=ds.map(h=>{let e=document.querySelector(`#${h.id}`);qe(e);let i=e.getContext("2d"),s=null,o=null;return h.overlayId&&(s=document.querySelector(`#${h.overlayId}`),qe(s),o=s.getContext("2d")),{ctx:i,canvas:e,width:e.width,height:e.height,overlayCtx:o,overlayCanvas:s}});const ms=new ns,Ve=new Ze(us);function Oe(h,e){os(h).then(([i,s])=>{ms.createWebSocket(h,o=>Ve.updateData(o)),Ve.startNew(h,i,s,e),document.querySelector("#ticksize-select").dispatchEvent(new Event("change")),document.querySelector("#tickerInfo-name").textContent=h})}