var A=t=>{throw TypeError(t)};var b=(t,e,n)=>e.has(t)||A("Cannot "+n);var c=(t,e,n)=>(b(t,e,"read from private field"),n?n.call(t):e.get(t)),y=(t,e,n)=>e.has(t)?A("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),g=(t,e,n,s)=>(b(t,e,"write to private field"),s?s.call(t,n):e.set(t,n),n),M=(t,e,n)=>(b(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const h={BASE_URL:"https://story-api.dicoding.dev/v1"},B=(t,e)=>e.some(n=>t instanceof n);let O,C;function K(){return O||(O=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function X(){return C||(C=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const I=new WeakMap,E=new WeakMap,v=new WeakMap;function Z(t){const e=new Promise((n,s)=>{const o=()=>{t.removeEventListener("success",r),t.removeEventListener("error",a)},r=()=>{n(m(t.result)),o()},a=()=>{s(t.error),o()};t.addEventListener("success",r),t.addEventListener("error",a)});return v.set(e,t),e}function Y(t){if(I.has(t))return;const e=new Promise((n,s)=>{const o=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",a),t.removeEventListener("abort",a)},r=()=>{n(),o()},a=()=>{s(t.error||new DOMException("AbortError","AbortError")),o()};t.addEventListener("complete",r),t.addEventListener("error",a),t.addEventListener("abort",a)});I.set(t,e)}let P={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return I.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function q(t){P=t(P)}function Q(t){return X().includes(t)?function(...e){return t.apply(k(this),e),m(this.request)}:function(...e){return m(t.apply(k(this),e))}}function ee(t){return typeof t=="function"?Q(t):(t instanceof IDBTransaction&&Y(t),B(t,K())?new Proxy(t,P):t)}function m(t){if(t instanceof IDBRequest)return Z(t);if(E.has(t))return E.get(t);const e=ee(t);return e!==t&&(E.set(t,e),v.set(e,t)),e}const k=t=>v.get(t);function te(t,e,{blocked:n,upgrade:s,blocking:o,terminated:r}={}){const a=indexedDB.open(t,e),l=m(a);return s&&a.addEventListener("upgradeneeded",i=>{s(m(a.result),i.oldVersion,i.newVersion,m(a.transaction),i)}),n&&a.addEventListener("blocked",i=>n(i.oldVersion,i.newVersion,i)),l.then(i=>{r&&i.addEventListener("close",()=>r()),o&&i.addEventListener("versionchange",u=>o(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const ne=["get","getKey","getAll","getAllKeys","count"],se=["put","add","delete","clear"],S=new Map;function R(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(S.get(e))return S.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,o=se.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(o||ne.includes(n)))return;const r=async function(a,...l){const i=this.transaction(a,o?"readwrite":"readonly");let u=i.store;return s&&(u=u.index(l.shift())),(await Promise.all([u[n](...l),o&&i.done]))[0]};return S.set(e,r),r}q(t=>({...t,get:(e,n,s)=>R(e,n)||t.get(e,n,s),has:(e,n)=>!!R(e,n)||t.has(e,n)}));const oe=["continue","continuePrimaryKey","advance"],$={},D=new WeakMap,U=new WeakMap,re={get(t,e){if(!oe.includes(e))return t[e];let n=$[e];return n||(n=$[e]=function(...s){D.set(this,U.get(this)[e](...s))}),n}};async function*ae(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,re);for(U.set(n,e),v.set(n,k(e));e;)yield n,e=await(D.get(n)||e.continue()),D.delete(n)}function j(t,e){return e===Symbol.asyncIterator&&B(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&B(t,[IDBIndex,IDBObjectStore])}q(t=>({...t,get(e,n,s){return j(e,n)?ae:t.get(e,n,s)},has(e,n){return j(e,n)||t.has(e,n)}}));const N=te("harry-pottter-db",1,{upgrade(t){t.createObjectStore("stories",{keyPath:"id"})}});async function ie(t){await(await N).put("stories",t)}async function ce(){return(await N).getAll("stories")}const de=async t=>{const e=new Request(`${h.BASE_URL}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),n=await fetch(e),s=await n.json();if(!n.ok)throw new Error((s==null?void 0:s.message)??"Gagal register akun");return s},le=async t=>{var o;const e=new Request(`${h.BASE_URL}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),n=await fetch(e),s=await n.json();if(!n.ok)throw new Error((s==null?void 0:s.message)??"Gagal masuk");return localStorage.setItem("token",(o=s==null?void 0:s.loginResult)==null?void 0:o.token),localStorage.setItem("user-data",JSON.stringify(s==null?void 0:s.loginResult)),s},ue=()=>!!localStorage.getItem("token"),V=()=>{let t=localStorage.getItem("token")??null;return t||(window.location.hash="/login"),t};var x=V();const me=async()=>{const t=V(),e=await fetch(`${h.BASE_URL}/stories?page=1&size=16&location=1`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});return e.ok?e.json():(console.log("Berhasil"),await ce())},pe=async t=>{const e=await fetch(`${h.BASE_URL}/stories/${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x}`}});if(!e.ok)throw new Error("Gagal mendapatkan data story");return e.json()},he=async t=>{const e=new Request(`${h.BASE_URL}/stories`,{method:"POST",headers:{Authorization:`Bearer ${x}`},body:t}),n=await fetch(e);if(!n.ok)throw new Error("Gagal mendapatkan data story");return n.json()},ye=async t=>{console.log();const e=new Request(`${h.BASE_URL}/notifications/subscribe`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x}`},body:JSON.stringify({endpoint:t.endpoint,keys:JSON.parse(JSON.stringify(t)).keys})});if(!(await fetch(e)).ok)throw new Error("Gagal subscribe notification");return!0};function F(t,e="en-US",n={}){return new Date(t).toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric",...n})}function fe(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/-/g,"+").replace(/_/g,"/"),s=window.atob(n),o=new Uint8Array(s.length);for(let r=0;r<s.length;++r)o[r]=s.charCodeAt(r);return o}class T{constructor(e){this.view=e}async getStories(){try{this.view.setLoading(!0);const e=await me();for(let n of e.listStory)ie(n);this.view.loadStories(e.listStory)}catch(e){console.error(e)}finally{this.view.setLoading(!1)}}async getStoryId(e){try{const n=await pe(e);this.view.loadStory(n.story)}catch(n){console.error(n)}}async uploadStory(e){try{const n=await he(e);return!0}catch(n){console.error(n.message)}}}class ge{constructor(){this.markerData=[]}async render(){return`
      <section class="container">
        <h1 class="p-1 m-0">List of Story</h1>
        
        <div class="story-list-container">
          <p id="loading-text">Loading...</p>
          <p id="no-data-text" class="hidden">Tidak ada story</p>
          
          <div id="story-list" class="story-list d-flex flex-wrap"></div>
          
          <div class="d-block col-12" id="map"></div>
        </div>
      </section>
    `}async setLoading(e){e?document.getElementById("loading-text").classList.remove("hidden"):document.getElementById("loading-text").classList.add("hidden")}async loadStories(e){const n=document.getElementById("story-list");if(document.getElementById("no-data-text").classList.add("hidden"),e.length<1){document.getElementById("no-data-text").classList.remove("hidden");return}for(let r of e)this.markerData.push(r),n.innerHTML+=`
        <div class="col-sm-6 col-md-4 col-lg-3 col-12 p-1">
          <div class="card" data-id="${r.id}">
            <div class="card-content" style="background: linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)), url(${r.photoUrl});">
              <p class="fs-5"><b>${r.name}</b></p>
              <span class="text-truncate">${r.description}</span>
              <span>${F(r.createdAt)}</span>
            </div>
          </div>
        </div>
      `;document.querySelectorAll(".card").forEach(r=>{r.addEventListener("click",()=>{const a=r.dataset.id;this.openDetailPage(a)})});const o=L.map("map").setView([.7893,113.9213],8);L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(o);for(let r of e)L.marker([r.lat,r.lon]).addTo(o).bindPopup(r.description)}async afterRender(){new T(this).getStories()}openDetailPage(e){window.location.hash=`/story/${e}`}}class _{constructor(e){this.view=e}async handleRegister({name:e,email:n,password:s}){try{this.view.setLoading(!0);const o=await de({name:e,email:n,password:s});return!0}catch(o){console.log(o.message)}finally{this.view.setLoading(!1)}}async handleLogin({email:e,password:n}){try{this.view.setLoading(!0);const s=await le({email:e,password:n});return!0}catch(s){console.log(s.message)}finally{this.view.setLoading(!1)}}}class we{async render(){return`
            <div class="login-box">
                <h2>Selamat Datang</h2>
                <p>Silahkan login untuk melanjutkan!</p>
                <form id="login-form">
                    <div>
                        <label for="email">Email</label>

                        <input type="email" id="email" />
                    </div>
                    
                    <div class="password-wrapper my-2">
                        <label for="password">Password</label>
                        <input type="password" id="password" />
                        </button>
                    </div>

                    <button type="submit" id="login" class="action-button">
                        Masuk
                    </button>
                </form>
            </div>
        `}async registerAction(e){e.preventDefault(),this.presenter=new _(this);const n=document.getElementById("email").value,s=document.getElementById("password").value;await this.presenter.handleLogin({email:n,password:s})&&(window.location.hash="/")}async afterRender(){document.getElementById("login-form").addEventListener("submit",this.registerAction.bind(this))}setLoading(e){document.querySelector("#login").disabled=e}clearForm(){document.getElementById("login-form").reset()}}class ve{async render(){return`
            <div class="login-box">
                <h2>Selamat Datang</h2>
                <p>Silahkan daftarkan akun terlebih dahulu!</p>
                <form id="register-form">
                    <div>
                        <label for="name">Name</label>
                        <input type="text" id="name" />
                    </div>
                    
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" />
                    </div>
                    
                    <div class="password-wrapper">
                        <label for="password">Password</label>
                        <input type="password" id="password" />
                    </div>

                    <button type="submit" class="action-button">
                        Daftar
                    </button>
                </form>
            </div>
        `}async signUpAction(e){e.preventDefault(),this.presenter=new _(this);const n=document.getElementById("name").value,s=document.getElementById("email").value,o=document.getElementById("password").value;await this.presenter.handleRegister({name:n,email:s,password:o})&&(window.location.hash="/login")}async afterRender(){document.getElementById("register-form").addEventListener("submit",this.signUpAction.bind(this))}setLoading(e){document.querySelector(".action-button").disabled=e,e?document.querySelector(".action-button").classList.add("disabled"):document.querySelector(".action-button").classList.remove("disabled")}redirectToLoginPage(){window.location.hash="/login"}clearForm(){document.getElementById("register-form").reset()}}class be{constructor(){this.stream=null,this.file=null}async render(){return`
            <div class="container">
                <h1 class="fs-2">Story Harry Potter</h1>
                
                <div class="py-3">
                    <form method="POST" enctype="multipart/form-data" id="story-form">
                        
                        <div class="form-group my-2">
                            <label class="form-label" for="description">Deskripsi</label>
                            <textarea type="text" id="description" class="form-control"></textarea>
                        </div>
                        
                        <div class="form-group my-2">
                            <label class="form-label">Foto</label>
                            <div class="d-flex gap-2 my-2">
                                <button class="btn btn-disabled" id="snapBtn">Take Picture</button>
                            </div>
                            
                            <div class="d-flex flex-wrap gap-2 d-block justify-content-between">
                                <video class="video col-md-5 col-12" id="video" autoplay playsinline></video>
                                <canvas class="col-md-5 col-12 d-none" id="photo-preview"></canvas>
                                
                                <div class="form-group my-2 col-md-6 col-12">
                                    <label class="form-label">Map</label>
                                    <div class="d-block col-12" id="map"></div>
                                </div>
                            </div>
                        </div>
                        
                        <button class="action-button col-12">Tambah Story</button>
                    </form>
                </div>
            </div>
        `}async afterRender(){document.getElementById("snapBtn").addEventListener("click",n=>{n.preventDefault(),this.takePicture()}),document.getElementById("story-form").addEventListener("submit",n=>{n.preventDefault(),this.uploadStory()}),"mediaDevices"in navigator&&"getUserMedia"in navigator.mediaDevices&&(this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),document.getElementById("video").srcObject=this.stream),this.map=L.map("map").setView([.7893,113.9213],8);const e=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map);this.map.addLayer(e),this.map.on("click",n=>this.onMapClick(n))}takePicture(){this.canvas=document.querySelector("canvas"),this.canvas.classList.remove("d-none");const e=this.canvas.getContext("2d");this.canvas.width=video.videoWidth,this.canvas.height=video.videoHeight,e.drawImage(video,0,0,this.canvas.width,this.canvas.height),this.canvas.toBlob(async n=>{const s=new File([n],"snapshot.png",{type:"image/png"});this.file=s},"image/png"),this.destroy(),document.getElementById("video").classList.add("d-none")}onMapClick(e){this.marker&&this.map.removeLayer(this.marker),this.lat=e.latlng.lat,this.lng=e.latlng.lng,this.marker=new L.marker(e.latlng).addTo(this.map)}async uploadStory(){this.presenter=new T(this);const e=new FormData;e.append("description",document.getElementById("description").value),e.append("photo",this.file),e.append("lat",this.lat),e.append("lon",this.lng),await this.presenter.uploadStory(e)&&(window.location.hash="/")}setLoading(e){document.querySelector(".action-button").disabled=e}destroy(){this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),document.getElementById("video").srcObject=null)}}function W(t){const e=t.split("/");return{resource:e[1]||null,id:e[2]||null}}function Le(t){let e="";return t.resource&&(e=e.concat(`/${t.resource}`)),t.id&&(e=e.concat("/:id")),e||"/"}function H(){return location.hash.replace("#","")||"/"}function z(){const t=H(),e=W(t);return Le(e)}function Ee(){const t=H();return W(t)}class Se{async render(){const{id:e}=Ee();return this.id=e,`
            <section class="container">
                <div class="story-container">
                    <div class="d-flex flex-wrap gap-2 my-2">
                        <div id="post-photo" class="col-md-5 col-12"></div>
                        <div id="post-description" class="col-md-6 col-12"></div>
                    </div>
                    <div id="map"></div>
                </div>
            </section>
        `}async afterRender(){new T(this).getStoryId(this.id)}async loadStory(e){document.getElementById("post-photo").innerHTML=`<img class="col-12" src="${e.photoUrl}" alt="${e.name}'s Photo">`,document.getElementById("post-description").innerHTML=`<p class="fs-4 fw-bold" >${e.name}</p>
            <span>${F(e.createdAt)}</span>
            <span class="d-block">${e.description}</span>`;const n=L.map("map").setView([e.lat,e.lon],8);L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(n),L.marker([e.lat,e.lon]).addTo(n).bindPopup(`${e.description} - ${e.name}`)}}const G={"/":new ge,"/login":new we,"/register":new ve,"/tambah-story":new be,"/story/:id":new Se};var f,p,d,w,J;class Be{constructor({navigationDrawer:e,drawerButton:n,content:s}){y(this,w);y(this,f,null);y(this,p,null);y(this,d,null);g(this,f,s),g(this,p,n),g(this,d,e),M(this,w,J).call(this)}async renderPage(){const e=z(),n=G[e];c(this,f).innerHTML=await n.render(),await n.afterRender()}}f=new WeakMap,p=new WeakMap,d=new WeakMap,w=new WeakSet,J=function(){c(this,p).addEventListener("click",()=>{c(this,d).classList.toggle("open")}),document.body.addEventListener("click",e=>{!c(this,d).contains(e.target)&&!c(this,p).contains(e.target)&&c(this,d).classList.remove("open"),c(this,d).querySelectorAll("a").forEach(n=>{n.contains(e.target)&&c(this,d).classList.remove("open")})})};document.addEventListener("DOMContentLoaded",async()=>{await new Be({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")}).renderPage();let e=null;"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js")}),window.addEventListener("hashchange",async()=>{var a;const n=z(),s=G[n],o=s,r=document.querySelector("#main-content");e!=null&&e.destroy&&e.destroy(),e=s,document.startViewTransition?document.startViewTransition(async()=>{var l;r.animate([{transform:"translateX(0)",opacity:1},{transform:"translateX(-120px)",opacity:0}],{duration:200,easing:"ease-in"}),await new Promise(i=>setTimeout(i,200)),r.innerHTML=await o.render(),await((l=o.afterRender)==null?void 0:l.call(o)),r.animate([{transform:"translateX(30px)",opacity:0},{transform:"translateX(0)",opacity:1}],{duration:250,easing:"ease-out"})}):(r.innerHTML=await o.render(),await((a=o.afterRender)==null?void 0:a.call(o)))}),ue()?(document.getElementById("login-nav").classList.add("hidden"),document.getElementById("register-nav").classList.add("hidden"),document.getElementById("subscribe-notif").classList.remove("hidden")):(document.getElementById("login-nav").classList.remove("hidden"),document.getElementById("register-nav").classList.remove("hidden"),document.getElementById("subscribe-notif").classList.add("hidden")),document.getElementById("subscribe-notif").addEventListener("click",async function(){Notification.requestPermission().then(n=>{n==="granted"&&Pe()})})});const Ie="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";async function Pe(){if("serviceWorker"in navigator&&"PushManager"in window){const e=await(await navigator.serviceWorker.ready).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:fe(Ie)});await ye(e)}}
