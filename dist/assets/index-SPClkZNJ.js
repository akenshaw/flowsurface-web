var Kt=Object.defineProperty;var Vt=(h,e,i)=>e in h?Kt(h,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):h[e]=i;var ct=(h,e,i)=>(Vt(h,typeof e!="symbol"?e+"":e,i),i),Pt=(h,e,i)=>{if(!e.has(h))throw TypeError("Cannot "+i)};var t=(h,e,i)=>(Pt(h,e,"read from private field"),i?i.call(h):e.get(h)),a=(h,e,i)=>{if(e.has(h))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(h):e.set(h,i)},r=(h,e,i,s)=>(Pt(h,e,"write to private field"),s?s.call(h,i):e.set(h,i),i);var Y=(h,e,i)=>(Pt(h,e,"access private method"),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const $={x:0,y:0};window.addEventListener("mousemove",function(h){$.x=h.x,$.y=h.y});var v,V,z,wt,kt,ft,Dt;class zt{constructor(e,i,s){a(this,wt);a(this,ft);ct(this,"flowFieldAnimation");a(this,v,void 0);a(this,V,void 0);a(this,z,void 0);r(this,v,e),t(this,v).strokeStyle="#C8C8C8",t(this,v).lineWidth=1,r(this,V,i),r(this,z,s),this.lastTime=0,this.interval=1e3/60,this.timer=0,this.cellSize=15,this.gradient,Y(this,wt,kt).call(this),t(this,v).strokeStyle=this.gradient,this.radius=0,this.vr=.03}animate(e){const i=e-this.lastTime;if(this.lastTime=e,this.timer>this.interval){t(this,v).clearRect(0,0,t(this,V),t(this,z)),this.radius+=this.vr,(this.radius>5||this.radius<-5)&&(this.vr*=-1);for(let s=0;s<t(this,z);s+=this.cellSize)for(let n=0;n<t(this,V);n+=this.cellSize){const o=(Math.cos($.x*n*1e-5)+Math.sin($.y*s*1e-5))*this.radius;Y(this,ft,Dt).call(this,o,n,s)}this.timer=0}else this.timer+=i;this.flowFieldAnimation=requestAnimationFrame(this.animate.bind(this))}}v=new WeakMap,V=new WeakMap,z=new WeakMap,wt=new WeakSet,kt=function(){this.gradient=t(this,v).createLinearGradient(0,0,t(this,V),t(this,z)),this.gradient.addColorStop(0,"#ADD8E6"),this.gradient.addColorStop(.25,"#77DD77"),this.gradient.addColorStop(.5,"#F5F5DC"),this.gradient.addColorStop(.75,"#E6E6FA"),this.gradient.addColorStop(1,"#FFD1DC")},ft=new WeakSet,Dt=function(e,i,s){let n=i,o=s,d=$.x-n,p=$.y-o,c=d*d+p*p;c>6e5?c=6e5:c<5e4&&(c=5e4);let P=c/1e4;t(this,v).beginPath(),t(this,v).moveTo(i,s),t(this,v).lineTo(i+Math.cos(e)*P,s+Math.sin(e)*P),t(this,v).stroke()};var y,N,G,gt,qt,pt,Wt;class Nt{constructor(e,i,s){a(this,gt);a(this,pt);ct(this,"flowFieldAnimation");a(this,y,void 0);a(this,N,void 0);a(this,G,void 0);r(this,y,e),t(this,y).strokeStyle="#C8C8C8",t(this,y).lineWidth=5,r(this,N,i),r(this,G,s),this.lastTime=0,this.interval=1e3/60,this.timer=0,this.cellSize=10,this.gradient,Y(this,gt,qt).call(this),t(this,y).strokeStyle=this.gradient}animate(e){const i=e-this.lastTime;if(this.lastTime=e,this.timer>this.interval){t(this,y).clearRect(0,0,t(this,N),t(this,G));for(let s=0;s<t(this,G);s+=this.cellSize)for(let n=0;n<t(this,N);n+=this.cellSize){const o=Math.cos(n)+Math.sin(s);Y(this,pt,Wt).call(this,o,n,s)}this.timer=0}else this.timer+=i;this.flowFieldAnimation=requestAnimationFrame(this.animate.bind(this))}}y=new WeakMap,N=new WeakMap,G=new WeakMap,gt=new WeakSet,qt=function(){this.gradient=t(this,y).createLinearGradient(0,0,t(this,N),t(this,G)),this.gradient.addColorStop(0,"#FF0000"),this.gradient.addColorStop(.25,"#FFFF00"),this.gradient.addColorStop(.5,"#00FF00"),this.gradient.addColorStop(.75,"#00FFFF"),this.gradient.addColorStop(1,"#0000FF")},pt=new WeakSet,Wt=function(e,i,s){t(this,y).beginPath(),t(this,y).moveTo(i,s),t(this,y).lineTo(i+e,s+e),t(this,y).stroke()};var b,j,L,U,A,vt,yt,Bt;class Gt{constructor(e,i,s){a(this,yt);ct(this,"flowFieldAnimation");a(this,b,void 0);a(this,j,void 0);a(this,L,void 0);a(this,U,[]);a(this,A,20);a(this,vt,10);r(this,b,e),t(this,b).strokeStyle="#C8C8C8",t(this,b).lineWidth=1,r(this,j,i),r(this,L,s),this.lastTime=0,this.timer=0}animate(e){const i=e-this.lastTime;if(this.lastTime=e,this.timer>t(this,vt)*1e3){const s=Math.random()*t(this,L),n=Math.floor(s/t(this,A)),o=Array(n).fill().map(()=>{const d=Math.random();return d<1/3?"#C0504E":d<2/3?"#51CDA0":null});t(this,U).push({x:t(this,j),height:s,cells:o}),this.timer=0}else this.timer+=i;if(this.timer%1e3<i){t(this,b).clearRect(0,0,t(this,j),t(this,L));for(let s of t(this,U))s.x-=t(this,A),Y(this,yt,Bt).call(this,s)}this.movingBoxes=requestAnimationFrame(this.animate.bind(this))}}b=new WeakMap,j=new WeakMap,L=new WeakMap,U=new WeakMap,A=new WeakMap,vt=new WeakMap,yt=new WeakSet,Bt=function(e){t(this,b).beginPath(),t(this,b).rect(e.x,t(this,L)-e.height,t(this,A),e.height),t(this,b).stroke(),e.cells.forEach((i,s)=>{i&&(t(this,b).fillStyle=i,t(this,b).fillRect(e.x,t(this,L)-(s+1)*t(this,A),t(this,A),t(this,A)))})};var At,Z,tt,et,it,I;class Xt{constructor(e,i,s,n,o,d,p,c,P){a(this,At,1);a(this,Z,void 0);a(this,tt,void 0);a(this,et,void 0);a(this,it,void 0);a(this,I,[]);r(this,Z,new Yt(this,e,i,s)),r(this,tt,new $t(this,n,o,d)),r(this,et,new jt(this,p,c,P)),r(this,it,new WebSocket("wss://fstream.binance.com/stream?streams=btcusdt@kline_1m/btcusdt@aggTrade")),t(this,it).onmessage=f=>{const g=JSON.parse(f.data);g.stream.endsWith("@aggTrade")?t(this,I).push({x:g.data.T,y:parseFloat(g.data.p),q:parseFloat(g.data.q),m:g.data.m}):g.stream.endsWith("@kline_1m")&&(t(this,Z).updateData(g.data,t(this,I)),t(this,tt).updateData(g.data),t(this,et).updateData(g.data),r(this,I,[]))}}}At=new WeakMap,Z=new WeakMap,tt=new WeakMap,et=new WeakMap,it=new WeakMap,I=new WeakMap;var Ct,u,k,T,D,_,q,X,st,M,nt,bt,C;class Yt{constructor(e,i,s,n){a(this,Ct,void 0);a(this,u,void 0);a(this,k,void 0);a(this,T,void 0);a(this,D,[]);a(this,_,[]);a(this,q,void 0);a(this,X,[]);a(this,st,void 0);a(this,M,void 0);a(this,nt,void 0);a(this,bt,60);a(this,C,void 0);r(this,Ct,e),r(this,u,i),r(this,k,s),r(this,T,n),r(this,C,Math.round(1*60*1e3/(30*60*1e3)*(t(this,k)-t(this,bt))))}updateData(e,i){const{k:{t:s,T:n,o,h:d,l:p,c}}=e;r(this,M,Math.min(o*.997,p)),r(this,nt,Math.max(o*1.003,d)),t(this,st)!==o&&(t(this,q)&&(t(this,D).push(t(this,q)),t(this,_).push(t(this,X)),t(this,D).length>60&&(t(this,D).shift(),t(this,_).shift()),r(this,X,[])),r(this,st,o)),r(this,q,{startTime:s,endTime:n,openPrice:o,highPrice:d,lowPrice:p,closePrice:c}),t(this,X).push(i),this.drawStart()}drawStart(){if(t(this,u).clearRect(0,0,t(this,k),t(this,T)),t(this,D).length>0){const e=t(this,q).startTime-18e5;t(this,D).forEach((i,s)=>{const n=t(this,_)[s],o=Math.round((i.startTime-e)/(30*60*1e3)*(t(this,k)-t(this,C)));this.drawDataPoint(n,i,o)})}this.drawDataPoint(t(this,X),t(this,q),Math.round(t(this,k)-t(this,C)))}drawDataPoint(e,i,s){const n=Math.round(t(this,T)/(t(this,nt)-t(this,M))),o=Math.round(t(this,T)-(i.openPrice-t(this,M))*n),d=Math.round(t(this,T)-(i.highPrice-t(this,M))*n),p=Math.round(t(this,T)-(i.lowPrice-t(this,M))*n),c=Math.round(t(this,T)-(i.closePrice-t(this,M))*n);this.drawKlineAt(s,d,"#c8c8c8"),this.drawKlineAt(s,p,"#c8c8c8"),e.forEach(P=>{P.forEach(f=>{const g=Math.round(t(this,T)-(f.y-t(this,M))*n);f.q<.01?this.drawTradesAt(s,g,f.m,.04):f.q<.1?this.drawTradesAt(s,g,f.m,.08):f.q<1?this.drawTradesAt(s,g,f.m,.18):f.q<10?this.drawTradesAt(s,g,f.m,.4):f.q<100&&this.drawTradesAt(s,g,f.m,.9)})}),this.drawKlineAt(s,o,"yellow"),this.drawKlineAt(s,c,c<o?"#9BE6D1":"#E6A1A0"),t(this,u).beginPath(),t(this,u).moveTo(s+t(this,C)/2,o),t(this,u).lineTo(s+t(this,C)/2,c),t(this,u).stroke()}drawKlineAt(e,i,s){t(this,u).beginPath(),t(this,u).moveTo(e,i),t(this,u).lineTo(e+t(this,C),i),t(this,u).strokeStyle=s,t(this,u).stroke()}drawTradesAt(e,i,s,n){t(this,u).beginPath(),s?(t(this,u).moveTo(e-2+t(this,C)/2,i),t(this,u).lineTo(e-2+t(this,C)/2-15,i),t(this,u).strokeStyle=`rgba(192, 80, 77, ${n})`):(t(this,u).moveTo(e+2+t(this,C)/2,i),t(this,u).lineTo(e+2+t(this,C)/2+15,i),t(this,u).strokeStyle=`rgba(81, 205, 160, ${n})`),t(this,u).stroke()}}Ct=new WeakMap,u=new WeakMap,k=new WeakMap,T=new WeakMap,D=new WeakMap,_=new WeakMap,q=new WeakMap,X=new WeakMap,st=new WeakMap,M=new WeakMap,nt=new WeakMap,bt=new WeakMap,C=new WeakMap;var Tt,W,ht,F,at,B,J;class $t{constructor(e,i,s,n){a(this,Tt,void 0);a(this,W,void 0);a(this,ht,void 0);a(this,F,void 0);a(this,at,void 0);a(this,B,void 0);a(this,J,void 0);r(this,Tt,e),r(this,W,i),r(this,ht,s),r(this,F,n)}updateData(e){const{k:{o:i,h:s,l:n,c:o}}=e;r(this,at,{openPrice:i,highPrice:s,lowPrice:n,closePrice:o}),r(this,B,Math.min(i*.997,n)),r(this,J,Math.max(i*1.003,s)),this.drawLine()}drawLine(){t(this,W).clearRect(0,0,t(this,ht),t(this,F));const e=Math.round(t(this,F)/(t(this,J)-t(this,B))),{closePrice:i,openPrice:s}=t(this,at),n=Math.round(t(this,F)-(i-t(this,B))*e),o=Math.round(t(this,F)-(s-t(this,B))*e),d=n>o?"#C0504E":n<o?"#51CDA0":"#c8c8c8";this.drawTextAt(n,i,d),this.drawTextAt(t(this,F)-10,Math.round(t(this,B)),"#c8c8c8"),this.drawTextAt(15,Math.round(t(this,J)),"#c8c8c8")}drawTextAt(e,i,s){t(this,W).font="14px monospace",t(this,W).fillStyle=s,t(this,W).fillText(i,10,e)}}Tt=new WeakMap,W=new WeakMap,ht=new WeakMap,F=new WeakMap,at=new WeakMap,B=new WeakMap,J=new WeakMap;var St,w,O,S,E,R,ot,Ft,rt,Mt,H;class jt{constructor(e,i,s,n){a(this,St,void 0);a(this,w,void 0);a(this,O,void 0);a(this,S,void 0);a(this,E,[]);a(this,R,void 0);a(this,ot,void 0);a(this,Ft,0);a(this,rt,void 0);a(this,Mt,60);a(this,H,void 0);r(this,St,e),r(this,w,i),r(this,O,s),r(this,S,n),r(this,H,Math.round(1*60*1e3/(30*60*1e3)*(t(this,O)-t(this,Mt))))}updateData(e){const{k:{t:i,T:s,v:n,V:o}}=e,d=n-o;r(this,rt,Math.round(t(this,E).reduce((p,c)=>Math.max(p,c.buyVolume,c.sellVolume),Math.max(o,d)))),t(this,ot)!==i&&(t(this,R)&&(t(this,E).push(t(this,R)),t(this,E).length>60&&t(this,E).shift()),r(this,ot,i)),r(this,R,{startTime:i,endTime:s,buyVolume:o,sellVolume:d}),this.drawStart()}drawStart(){if(t(this,w).clearRect(0,0,t(this,O),t(this,S)),t(this,E).length>0){const e=t(this,R).startTime-18e5;t(this,E).forEach((i,s)=>{const n=Math.round((i.startTime-e)/18e5*(t(this,O)-t(this,H)));this.drawDataPoint(i,n)})}this.drawDataPoint(t(this,R),Math.round(t(this,O)-t(this,H)))}drawDataPoint(e,i){const s=Math.round((t(this,S)-20)/t(this,rt)),n=Math.round(t(this,S)-20-e.buyVolume*s),o=Math.round(t(this,S)-20-e.sellVolume*s);t(this,w).beginPath(),t(this,w).moveTo(i,0),t(this,w).lineTo(i,t(this,S)-20),t(this,w).strokeStyle="#c8c8c8",t(this,w).lineWidth=1,t(this,w).stroke(),this.drawTimeLabel(i,e.startTime),this.drawKlineAt(i+t(this,H)/2+5,n,"#51CDA0"),this.drawKlineAt(i+t(this,H)/2-5,o,"#C0504E")}drawKlineAt(e,i,s){t(this,w).beginPath(),t(this,w).moveTo(e,t(this,S)-20),t(this,w).lineTo(e,i),t(this,w).strokeStyle=s,t(this,w).lineWidth=5,t(this,w).stroke()}drawTimeLabel(e,i){const s=new Date(i),n=s.getHours().toString().padStart(2,"0")+":"+s.getMinutes().toString().padStart(2,"0");t(this,w).font="12px monospace",t(this,w).fillStyle="#c8c8c8",t(this,w).fillText(n,e,t(this,S)-5)}}St=new WeakMap,w=new WeakMap,O=new WeakMap,S=new WeakMap,E=new WeakMap,R=new WeakMap,ot=new WeakMap,Ft=new WeakMap,rt=new WeakMap,Mt=new WeakMap,H=new WeakMap;const xt=["btn2","btn3","btn4","tbl-btn1","tbl-btn2","tbl-btn3","tbl-btn4"],It=[Rt,ee,_t,Et,Jt,Qt,Ut];for(let h=0;h<xt.length;h++)document.getElementById(xt[h]).addEventListener("click",It[h]);const Q=["settings-menu-0","settings-menu-1","settings-menu-2","settings-menu-3","settings-menu-4","menu"].map(h=>document.querySelector(`#${h}`)),lt=["tbl-btn1","tbl-btn2","tbl-btn3","tbl-btn4"].map(h=>document.querySelector(`#${h}`));let l,m,K,x=0;window.onload=function(){Et()};window.addEventListener("resize",function(){Et()});function Ot(){lt.forEach(h=>h.disabled=!1),Q.forEach(h=>h.style.display="none")}function Rt(){Q[5].style.display=Q[5].style.display==="none"?"block":"none"}function _t(){x>=0&&x<=4&&(Q[x].style.display=Q[x].style.display==="none"?"block":"none")}function dt(){if(Rt(),Ot(),K!=null){cancelAnimationFrame(K.flowFieldAnimation);let h=document.getElementsByTagName("canvas");for(;h.length>0;)h[0].parentNode.removeChild(h[0])}}function Et(){dt(),lt[0].disabled=!0,x=1;let h=document.createElement("canvas");h.id="canvas1",document.body.appendChild(h),l=document.querySelector("#canvas1"),m=l.getContext("2d"),l.width=window.innerWidth,l.height=window.innerHeight,K=new zt(m,l.width,l.height),K.animate(0)}function Jt(){dt(),lt[1].disabled=!0,x=2;let h=document.createElement("canvas");h.id="canvas1",document.body.appendChild(h),l=document.querySelector("#canvas1"),m=l.getContext("2d"),l.width=window.innerWidth,l.height=window.innerHeight,K=new Nt(m,l.width,l.height),K.animate(0)}function Qt(){dt(),lt[2].disabled=!0,x=3;let h=document.createElement("canvas");h.id="canvas1",h.style.position="absolute",h.style.left="0px",h.style.top="0px",document.body.appendChild(h),l=document.querySelector("#canvas1"),m=l.getContext("2d"),l.width=window.innerWidth*.9,l.height=window.innerHeight*.9;let e=document.createElement("canvas");e.id="canvas2",e.style.position="absolute",e.style.left=l.width+"px",document.body.appendChild(e);let i=document.querySelector("#canvas2"),s=i.getContext("2d");i.width=window.innerWidth*.1,i.height=window.innerHeight*.9;let n=document.createElement("canvas");n.id="canvas3",n.style.position="absolute",n.style.left="0px",n.style.top=l.height+"px",document.body.appendChild(n);let o=document.querySelector("#canvas3"),d=o.getContext("2d");o.width=l.width,o.height=window.innerHeight*.1,new Xt(m,l.width,l.height,s,i.width,i.height,d,o.width,o.height)}function Ut(){dt(),lt[3].disabled=!0,x=4;let h=document.createElement("canvas");h.id="canvas1",document.body.appendChild(h),l=document.querySelector("#canvas1"),m=l.getContext("2d"),l.width=window.innerWidth,l.height=window.innerHeight,K=new Gt(m,l.width,l.height),K.animate(0)}const ut=document.querySelector("#settings-menu-0 > input.js-color-picker.color-picker"),mt=document.querySelector("#settings-menu-0 > input.js-line-range"),Ht=document.querySelector("#settings-menu-0 > label"),Lt=document.querySelector("#settings-menu-0 > input.js-eraser-button"),Zt=h=>{m.strokeStyle=h.target.value},te=h=>{const e=h.target.value;Ht.innerHTML=e,m.lineWidth=e};ut.addEventListener("change",Zt);mt.addEventListener("input",te);function ee(){x=0;let h=!1;ut.value="#C8C8C8",mt.value="1",Ht.innerHTML="1",Lt.checked=!1,Ot(),dt();let e=document.createElement("canvas");e.id="canvas1",document.body.appendChild(e),l=document.querySelector("#canvas1"),l.width=window.innerWidth,l.height=window.innerHeight,m=l.getContext("2d"),m.lineCap="round",m.strokeStyle=ut.value;let i=0,s=0,n=!1;const o=()=>{n=!1},d=c=>{n=!0,[i,s]=[c.offsetX,c.offsetY]},p=c=>{if(n){const P=c.offsetX,f=c.offsetY;m.beginPath(),m.moveTo(i,s),m.lineTo(P,f),m.stroke(),i=P,s=f}};l.addEventListener("mousedown",d),l.addEventListener("mousemove",p),l.addEventListener("mouseup",o),l.addEventListener("mouseout",o),Lt.addEventListener("click",()=>{h=!h,h?(m.globalCompositeOperation="destination-out",m.lineWidth=mt.value*4):(m.globalCompositeOperation="source-over",m.lineWidth=mt.value*4,m.strokeStyle=ut.value)})}
