/* empty css              *//* empty css                    */(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();function h(t){fetch("/components/floating-button/floating-button.html").then(i=>{i.text().then(r=>{t.innerHTML=r,y()})}).catch(i=>{console.log(i)})}function y(){const t=document.getElementById("floatingButton");let i=!1,r,s,e,n;t.addEventListener("pointerdown",o=>{i=!0,t.classList.remove("inactive"),r=o.clientX,s=o.clientY,e=t.offsetLeft,n=t.offsetTop,t.setPointerCapture(o.pointerId)}),t.addEventListener("pointermove",o=>{if(i){const g=o.clientX-r,m=o.clientY-s,f=window.innerWidth,a=window.innerHeight,d=t.offsetWidth,u=t.offsetHeight;let l=e+g,c=n+m;l<0&&(l=0),l+d>f&&(l=f-d),c<0&&(c=0),c+u>a&&(c=a-u),t.style.left=`${l}px`,t.style.top=`${c}px`,t.style.bottom="auto",t.style.right="auto"}}),t.addEventListener("pointerup",o=>{i=!1,t.classList.add("inactive"),t.releasePointerCapture(o.pointerId)})}const p=document.getElementById("floating-button-container");p!=null&&h(p);
