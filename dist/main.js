let W;function ot(e){if(W==null)return W=e.classList.contains("enable-para"),W}let F="";function pe(e){return F!=""||(F=e.getAttribute("data-bani-name")||""),F}let c=1,u=c,V,b="d-block",C;function it(e){C=pe(e),c=parseInt(localStorage.getItem("currentShabadStart_"+C))||1,u=c,V=e,ot(e)&&(b="d-inline"),ye(e)}function rt(e){if(c<=1)return;ct(),u=c-1;const t=500;let n=0;for(;e.getBoundingClientRect().height<window.innerHeight;){c--;const o=document.getElementById("shabad_"+c);if(!o){c++;break}if(o.classList.add(b),e.getBoundingClientRect().height>window.innerHeight){o.classList.remove(b),c++;break}if(n>t)break;n++}localStorage.setItem("currentShabadStart_"+C,c)}function ct(){let t=c,n=Math.max(u,c);for(;t<=n;){const o=document.getElementById("shabad_"+t);if(o&&o.classList.remove(b),t-c>500)break;t++}}function at(){let t=c;for(c=u+1;t<=u;){const n=document.getElementById("shabad_"+t);if(n&&n.classList.remove(b),t-c>500)break;t++}}function st(e){if(!document.getElementById("shabad_"+(u+1)))return;at(),u=c;const n=500;let o=0;for(;e.getBoundingClientRect().height<window.innerHeight;){const i=document.getElementById("shabad_"+u);if(!i)break;if(i.classList.add(b),e.getBoundingClientRect().height>window.innerHeight){i.classList.remove(b),u--;break}if(u++,o>n)break;o++}localStorage.setItem("currentShabadStart_"+C,c)}function ye(e){let n=0;for(;e.getBoundingClientRect().height<window.innerHeight;){const o=document.getElementById("shabad_"+u);if(!o)break;if(o.classList.add(b),e.getBoundingClientRect().height>window.innerHeight){o.classList.remove(b),u--;break}if(u++,n>500)break;n++}localStorage.setItem("currentShabadStart_"+C,c)}function E(e){V&&(lt(),e&&(c=e),u=c,ye(V))}function lt(){let e=c;const t=500;let n=0;for(;e<=u;){const o=document.getElementById("shabad_"+e);if(o&&o.classList.remove(b),e++,n>t)break;n++}}function Ce(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen().then(()=>{E(),oe()}):document.documentElement.requestFullscreen().then(()=>{E(),oe()})}const ve="floatingButtonX",we="floatingButtonY";function a(e,t){localStorage.setItem(e,t)}function Fe(e){localStorage.removeItem(e)}function s(e){return localStorage.getItem(e)}const Ne="fontSize",O="lineHeight",z="wordSpacing",Ae="align",Y="english",J="punjabi",H="darkMode",T="fontColor",me="fontColorSecond",_="backgroundColor",he="backgroundColorSecond",ie="bookmarks";function dt(){localStorage.clear()}function He(e){rt(e)}function Te(e){st(e)}function ut(){window.addEventListener("resize",()=>{oe()})}function h(e){return e!=null&&!isNaN(e)&&e!=="undefined"&&e!==""}function _e(...e){for(const t of e)if(t==null||isNaN(t)||t==="undefined")return!1;return!0}function S(e,t,n){return n>=e&&n<=t}function m(e){return e&&typeof e=="string"&&e.length>0}function ft(e){return!e||e.length==0}function gt(){const e=document.getElementById("leftAlign"),t=document.getElementById("middleAlign"),n=document.getElementById("rightAlign"),o=document.getElementById("justifyAlign"),i=document.getElementById("bani");bt(e,t,n,o,i),mt(e,t,n,o,i)}function mt(e,t,n,o,i){e.addEventListener("change",r=>{N("start",r.target.checked,i)}),t.addEventListener("change",r=>{N("center",r.target.checked,i)}),n.addEventListener("change",r=>{N("end",r.target.checked,i)}),o.addEventListener("change",r=>{N("justify",r.target.checked,i)})}function N(e,t,n){!t&&!m(e)||(n.style.textAlign=e,ht(e))}function ht(e){m(e)&&a(Ae,e)}function kt(e,t,n,o,i,r){switch(i){case"start":r.style.textAlign=i,e.checked=!0;break;case"end":r.style.textAlign=i,n.checked=!0;break;case"center":r.style.textAlign=i,t.checked=!0;break;case"justify":r.style.textAlign=i,o.checked=!0;break}}function bt(e,t,n,o,i){const r=s(Ae);m(r)&&kt(e,t,n,o,r,i)}function Lt(){const e=document.getElementById("background-color"),t=document.getElementById("background-color-picker-2");Le(e,_),Le(t,he),be(e,_),be(t,he),Bt(e),ke(e),ke(t)}function ke(e){e.addEventListener("click",t=>{re(t.target.value)})}function be(e,t){e.addEventListener("change",n=>{re(n.target.value),a(t,n.target.value)})}function re(e){document.documentElement.style.setProperty("--background-color",e)}function Re(e,t){e.value=t}function Le(e,t){let n=s(t);m(n)&&Re(e,n)}const j="#ffffff";function Bt(e){document.getElementById("background-reset-icon").addEventListener("click",()=>{document.documentElement.style.setProperty("--background-color",j),Re(e,j),a(_,j)})}function Et(){let e=s(_);m(e)&&re(e)}let Z=!1,k;function St(e){const t=document.getElementById("bookmark"),n=document.getElementById("bookmarks-container"),o=pe(e);k=It(e,o),pt(n),Nt(t),Ft(e,n,o),Ht(o),_t()}function It(e,t){const n=s(ie);return m(n)?JSON.parse(n).filter(r=>{if(r.baniName==t)return!0}):[]}function pt(e){if(ft(k))return;let t="";for(const n of k){const o=Oe(n.shabadPre,n.shabadId);t+=o}e.innerHTML=t}function Oe(e,t){return`
    <div id='bookmark_${t}' class="bookmark" data-shabadid='${t}'>
      <a data-shabadid='${t}' href='#' class='bookmark-show' id='bookmark-show_${t}'>${e}</a>
      <button class="icon bookmark-delete" data-shabadid='${t}' id='bookmark-delete_${t}'>
        <span class="material-symbols-outlined" data-shabadid='${t}'>delete</span>
      </button>
    </div>
  `}function yt(e,t,n,o){const i=e.target.closest(".gurmukhi");if(!Z||!(i!=null&&i.classList.contains("gurmukhi")))return;const r=Ct(i,n,o);r&&(wt(t,r),Tt(o,r.shabadId),Rt(r.shabadId),vt(r))}function Ct(e,t,n){const o=e.getAttribute("id"),i=Number.parseInt(o.replace("shabad_",""));for(const l of k)if((l==null?void 0:l.shabadId)==i)return;if(k.includes(i))return;const r=e.innerText.trim().substring(0,20);return{shabadId:i,shabadPre:r,baniName:n}}function vt(e){k.push(e);const t=JSON.stringify(k);a(ie,t)}function wt(e,t){const n=Oe(t.shabadPre,t.shabadId);e.insertAdjacentHTML("beforeend",n)}function Ft(e,t,n){At(e,o=>{yt(o,t,e,n)},500)}function Nt(e){e.addEventListener("change",t=>{t.target.checked?Z=!0:Z=!1})}function At(e,t,n=500){let o;e.addEventListener("mousedown",i=>{o=setTimeout(()=>t(i),n)}),e.addEventListener("mouseup",()=>clearTimeout(o)),e.addEventListener("mouseleave",()=>clearTimeout(o)),e.addEventListener("touchstart",i=>{o=setTimeout(()=>t(i),n)}),e.addEventListener("touchend",()=>clearTimeout(o)),e.addEventListener("touchcancel",()=>clearTimeout(o))}function Ht(e){const t=document.getElementsByClassName("bookmark-delete");for(const n of t)n.addEventListener("click",o=>{const i=Number(o.target.getAttribute("data-shabadid"));ze(i,e),xe(i)})}function Tt(e,t){document.getElementById("bookmark-delete_"+t).addEventListener("click",o=>{const i=Number(o.target.getAttribute("data-shabadid"));ze(i,e),xe(i)})}function ze(e,t){k=k.filter(o=>o.baniName==t&&o.shabadId!=e);const n=JSON.stringify(k);a(ie,n)}function xe(e){document.getElementById("bookmark_"+e).remove()}function _t(){const e=document.getElementsByClassName("bookmark-show");for(const t of e)Me(t)}function Rt(e){const t=document.getElementById("bookmark-show_"+e);Me(t)}function Me(e){e.addEventListener("click",t=>{const n=t.target.getAttribute("data-shabadid");Ot(n)})}function Ot(e){E(e)}function zt(){const e=document.getElementById("dark-mode");Mt(e),xt(e)}function xt(e){e.addEventListener("change",t=>{t.target.checked?(K("true"),a(H,"true")):(K("false"),a(H,"false"))})}function K(e){e==="true"?R(!0):e==="false"&&R(!1)}function q(e,t){t==="true"?e.checked=!0:t==="false"&&(e.checked=!1)}function Mt(e){let t=s(H);m(t)||(t="false"),q(e,t)}function Dt(){let e=s(H);m(e)||(e="false"),K(e)}function R(e){if(e){document.body.classList.add("dark-mode");return}document.body.classList.remove("dark-mode")}const Pt=window.matchMedia("(prefers-color-scheme: dark)");Pt.addEventListener("change",e=>{const t=document.getElementById("dark-mode");e.matches?(R(!0),q(t,"true")):(R(!1),q(t,"false"))});function $t(e){const t=document.getElementById("english");Gt(e,t),Wt(e,t)}function Wt(e,t){t.addEventListener("change",n=>{n.target.checked?(Q(e,"true"),a(J,"true")):(Q(e,"false"),a(J,"false")),E()})}function Q(e,t){t==="true"?e.classList.remove("hide-shabad-en"):t==="false"&&e.classList.add("hide-shabad-en")}function jt(e,t){t==="true"?e.checked=!0:t==="false"&&(e.checked=!1)}function Gt(e,t){let n=s(J);m(n)||(n="false"),Q(e,n),jt(t,n)}function Ut(){const e=document.getElementById("font-color"),t=document.getElementById("font-color-picker-2");Se(e,T),Se(t,me),Ee(e,T),Ee(t,me),Xt(e),Be(e),Be(t)}function Be(e){e.addEventListener("click",t=>{ce(t.target.value)})}function Ee(e,t){e.addEventListener("change",n=>{ce(n.target.value),a(t,n.target.value)})}function ce(e){document.documentElement.style.setProperty("--font-color",e)}function De(e,t){e.value=t}function Se(e,t){let n=s(t);m(n)&&De(e,n)}const G="#000000";function Xt(e){document.getElementById("font-reset-icon").addEventListener("click",()=>{document.documentElement.style.setProperty("--font-color",G),De(e,G),a(T,G)})}function Vt(){let e=s(T);m(e)&&ce(e)}function I(e,t){e.value=Number.parseFloat(t).toFixed(2)}let Pe;function Yt(e,t){Pe=setInterval(()=>{e()},t)}function Ie(e){clearInterval(Pe),e()}function p(e,t,n,o){e.addEventListener("pointerdown",i=>{Yt(()=>{t()},o)}),e.addEventListener("pointerup",i=>{Ie(()=>{n()})}),e.addEventListener("pointerleave",i=>{Ie(()=>{n()})})}const $e=1,We=200,je=1,Ge=.04;function Jt(){const e=document.getElementById("font-input"),t=document.getElementById("bani");Kt(e,t),qt(e,t),Zt(e,t)}function Zt(e,t){e.addEventListener("change",n=>{h(n.target.value)&&S($e,We,n.target.value)&&(t.style.fontSize=n.target.value+"px",ae(t))})}function Kt(e,t){const n=document.getElementById("font-increase");p(n,()=>{Ue(Ge,t,e)},()=>{ae(t)},je)}function qt(e,t){const n=document.getElementById("font-decrease");p(n,()=>{Ue(-Ge,t,e)},()=>{ae(t)},je)}function Qt(){const e=document.getElementById("bani"),t=window.getComputedStyle(e).getPropertyValue("font-size"),n=Number.parseFloat(t.substring(0,t.length-2)),o=document.getElementById("font-input");I(o,n)}function Ue(e,t,n){const o=window.getComputedStyle(t).getPropertyValue("font-size");let r=Number.parseFloat(o.substring(0,o.length-2))+e;S($e,We,r)&&(I(n,r),t.style.fontSize=r+"px")}function en(e){const t=s(Ne);if(h(t)){e.style.fontSize=t+"px";return}}function ae(e){const t=window.getComputedStyle(e).getPropertyValue("font-size"),n=Number.parseFloat(t.substring(0,t.length-2));if(h(n)){a(Ne,n);return}}const ee=1,Xe=10,Ve=10,Ye=.01;let f=null;function tn(){const e=document.getElementById("line-height-input"),t=document.getElementById("bani");on(e,t),rn(e,t),nn(e,t)}function nn(e,t){e.addEventListener("change",n=>{const o=n.target.value;h(o)&&S(ee,Xe,o)?(t.style.lineHeight=o,f=Number.parseFloat(o),se(f)):(f=null,t.style.lineHeight="normal",Fe(O))})}function on(e,t){const n=document.getElementById("line-height-increase");p(n,()=>{Je(Ye,t,e)},()=>{se(f)},Ve)}function rn(e,t){const n=document.getElementById("line-height-decrease");p(n,()=>{Je(-Ye,t,e)},()=>{se(f)},Ve)}function Je(e,t,n){let o;f?o=f+e:o=ee+e,S(ee,Xe,o)&&(f=o,I(n,f),t.style.lineHeight=f)}function cn(){const e=s(O);if(!h(e)){f=null;return}const t=document.getElementById("line-height-input");f=Number.parseFloat(e),I(t,e)}function an(e){const t=s(O);if(h(t)){f=Number.parseFloat(t),e.style.lineHeight=f;return}f=null}function se(e){if(h(e)){a(O,e);return}}function sn(e){const t=document.getElementById("punjabi");un(e,t),ln(e,t)}function ln(e,t){t.addEventListener("change",n=>{n.target.checked?(te(e,"true"),a(Y,"true")):(te(e,"false"),a(Y,"false")),E()})}function te(e,t){t==="true"?e.classList.remove("hide-shabad-pu"):t==="false"&&e.classList.add("hide-shabad-pu")}function dn(e,t){t==="true"?e.checked=!0:t==="false"&&(e.checked=!1)}function un(e,t){let n=s(Y);m(n)||(n="false"),te(e,n),dn(t,n)}const ne=1,Ze=20,Ke=10,qe=.01;let g=null;function fn(){const e=document.getElementById("word-spacing-input"),t=document.getElementById("bani");mn(e,t),hn(e,t),gn(e,t)}function gn(e,t){e.addEventListener("change",n=>{let o=n.target.value;o&&(o=Number.parseFloat(o)),h(o)&&S(ne,Ze,o)?(t.style.wordSpacing=o+"px",g=Number.parseFloat(o),le(g)):(g=null,t.style.wordSpacing="normal",Fe(z))})}function mn(e,t){const n=document.getElementById("word-spacing-increase");p(n,()=>{Qe(qe,t,e)},()=>{le(g)},Ke)}function hn(e,t){const n=document.getElementById("word-spacing-decrease");p(n,()=>{Qe(-qe,t,e)},()=>{le(g)},Ke)}function Qe(e,t,n){let o;g?o=g+e:o=ne+e,S(ne,Ze,o)&&(g=o,I(n,g),t.style.wordSpacing=g+"px")}function kn(){const e=s(z);if(!h(e)){g=null;return}const t=document.getElementById("word-spacing-input");g=Number.parseFloat(e),I(t,e)}function bn(e){const t=s(z);if(h(t)){g=Number.parseFloat(t),e.style.wordSpacing=g+"px";return}g=null}function le(e){if(h(e)){a(z,e);return}}let A=!1;function Ln(e,t){fetch("components/menu/menu.html").then(n=>{n.text().then(o=>{e.innerHTML=o,Bn(t)})}).catch(n=>{console.log(n)})}let B;function Bn(e){B||(B=document.getElementById("menu")),Cn(e)}function En(){B||(B=document.getElementById("menu")),A?B.classList.add("menuClose"):B.classList.remove("menuClose"),A=!A}function Sn(){document.getElementById("reset-icon").addEventListener("click",()=>{dt(),location.reload()})}function In(){document.getElementById("restart-icon").addEventListener("click",()=>{E(1)})}function pn(e){Jt(),tn(),fn(),gt(),sn(e),$t(e),zt(),Ut(),Lt(),St(e)}function yn(e){Qt(),cn(),kn(),it(e)}function Cn(e){Sn(),In(),pn(e),yn(e)}let U=window.innerWidth,X=window.innerHeight;function vn(e,t){fetch("components/floating-button/floating-button.html").then(n=>n.text()).then(n=>{e.innerHTML=n;const o=document.getElementById("menu-container");o&&Ln(o,t),Nn(t)}).catch(console.error)}function wn(e){let t=s(ve),n=s(we);if(_e(t,n)){t=Number.parseFloat(t),n=Number.parseFloat(n);const o=e.offsetWidth;e.offsetHeight,de(e,t,n,o)}}let et=0,tt=0;function Fn(e,t){_e(e,t)&&(a(ve,e),a(we,t))}function Nn(e){const t=document.getElementById("floating-button");wn(t);let n=!1,o=!1,i=!1,r=!1,l=!1,x=!1,M,D,ue,fe;function v(d,L){return d.closest(`#${L}`)!==null}t.addEventListener("pointerdown",d=>{r=v(d.target,"left-icon"),l=v(d.target,"right-icon"),i=v(d.target,"menu-icon"),x=v(d.target,"fullscreen-icon"),o=!0,n=!0,t.classList.remove("inactive"),M=d.clientX,D=d.clientY,ue=t.offsetLeft,fe=t.offsetTop,t.setPointerCapture(d.pointerId)}),t.addEventListener("pointermove",d=>{if(n){const L=d.clientX-M,y=d.clientY-D;if(Math.abs(L)>w||Math.abs(y)>w){const P=t.offsetWidth;t.offsetHeight;let $=ue+L,nt=fe+y;de(t,$,nt,P),i=!1,r=!1,l=!1,x=!1,o=!1}}});const w=15;t.addEventListener("pointerup",d=>{const L=d.clientX,y=d.clientY,ge=Math.abs(L-M),P=Math.abs(y-D),$=ge<=w&&P<=w;o&&$?(i&&En(),r&&He(e),l&&Te(e),x&&Ce()):n&&Fn(et,tt),n=!1,A||t.classList.add("inactive"),t.releasePointerCapture(d.pointerId)}),ut()}function de(e,t,n,o,i){U=window.innerWidth,X=window.innerHeight;const r=o/2,l=10;t-r-l<0&&(t=r+l),t+r+l>U&&(t=U-r-l),n-r-l<0&&(n=r+l),n+r+l>X&&(n=X-r-l),et=t,tt=n,e.style.left=`${t}px`,e.style.top=`${n}px`,e.style.bottom="auto",e.style.right="auto"}function oe(){const e=document.getElementById("floating-button");if(!e)return;const t=e.offsetLeft,n=e.offsetTop,o=e.offsetWidth;e.offsetHeight,de(e,t,n,o)}function An(e){Hn(e)}function Hn(e){document.addEventListener("keydown",t=>{t.key==="ArrowLeft"||t.key==="A"||t.key==="a"?He(e):t.key==="ArrowRight"||t.key==="D"||t.key==="d"?Te(e):(t.key==="F"||t.key==="f")&&Ce()})}function Tn(e){document.readyState==="complete"||document.readyState==="interactive"?e():document.addEventListener?document.addEventListener("DOMContentLoaded",e):document.attachEvent&&document.attachEvent("onreadystatechange",function(){document.readyState==="complete"&&e()})}function _n(){const e=document.getElementById("bani");if(!e)return;const t=document.getElementById("floating-button-container");t!=null&&vn(t,e);function n(){en(e),an(e),bn(e)}n(),An(e)}Tn(_n);Dt();Et();Vt();
