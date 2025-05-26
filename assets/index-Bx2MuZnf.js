var C=t=>{throw TypeError(t)};var b=(t,e,n)=>e.has(t)||C("Cannot "+n);var c=(t,e,n)=>(b(t,e,"read from private field"),n?n.call(t):e.get(t)),p=(t,e,n)=>e.has(t)?C("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),f=(t,e,n,r)=>(b(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),O=(t,e,n)=>(b(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const y={BASE_URL:"https://story-api.dicoding.dev/v1"},X=async(t,e,n)=>{const r=new Request(`${y.BASE_URL}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,password:n})}),s=await fetch(r),o=await s.json();if(!s.ok)throw new Error((o==null?void 0:o.message)??"Gagal register akun");return o},ee=async(t,e)=>{var o;const n=new Request(`${y.BASE_URL}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),r=await fetch(n),s=await r.json();if(!r.ok)throw new Error((s==null?void 0:s.message)??"Gagal masuk");return localStorage.setItem("token",(o=s==null?void 0:s.loginResult)==null?void 0:o.token),localStorage.setItem("user-data",JSON.stringify(s==null?void 0:s.loginResult)),document.getElementById("login-nav").classList.add("hidden"),document.getElementById("register-nav").classList.add("hidden"),document.getElementById("logout-button").classList.remove("hidden"),s},te=()=>{localStorage.removeItem("token"),document.getElementById("login-nav").classList.remove("hidden"),document.getElementById("register-nav").classList.remove("hidden"),document.getElementById("logout-button").classList.add("hidden"),window.location.hash="/login"},A=()=>!!localStorage.getItem("token"),x=()=>(A()||(window.location.hash="/login"),localStorage.getItem("token")??null),B=(t,e)=>e.some(n=>t instanceof n);let R,j;function ne(){return R||(R=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function se(){return j||(j=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const I=new WeakMap,E=new WeakMap,v=new WeakMap;function re(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",o),t.removeEventListener("error",i)},o=()=>{n(m(t.result)),s()},i=()=>{r(t.error),s()};t.addEventListener("success",o),t.addEventListener("error",i)});return v.set(e,t),e}function oe(t){if(I.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",i),t.removeEventListener("abort",i)},o=()=>{n(),s()},i=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",o),t.addEventListener("error",i),t.addEventListener("abort",i)});I.set(t,e)}let P={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return I.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function U(t){P=t(P)}function ie(t){return se().includes(t)?function(...e){return t.apply(D(this),e),m(this.request)}:function(...e){return m(t.apply(D(this),e))}}function ae(t){return typeof t=="function"?ie(t):(t instanceof IDBTransaction&&oe(t),B(t,ne())?new Proxy(t,P):t)}function m(t){if(t instanceof IDBRequest)return re(t);if(E.has(t))return E.get(t);const e=ae(t);return e!==t&&(E.set(t,e),v.set(e,t)),e}const D=t=>v.get(t);function F(t,e,{blocked:n,upgrade:r,blocking:s,terminated:o}={}){const i=indexedDB.open(t,e),l=m(i);return r&&i.addEventListener("upgradeneeded",a=>{r(m(i.result),a.oldVersion,a.newVersion,m(i.transaction),a)}),n&&i.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{o&&a.addEventListener("close",()=>o()),s&&a.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const ce=["get","getKey","getAll","getAllKeys","count"],de=["put","add","delete","clear"],S=new Map;function $(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(S.get(e))return S.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=de.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ce.includes(n)))return;const o=async function(i,...l){const a=this.transaction(i,s?"readwrite":"readonly");let u=a.store;return r&&(u=u.index(l.shift())),(await Promise.all([u[n](...l),s&&a.done]))[0]};return S.set(e,o),o}U(t=>({...t,get:(e,n,r)=>$(e,n)||t.get(e,n,r),has:(e,n)=>!!$(e,n)||t.has(e,n)}));const le=["continue","continuePrimaryKey","advance"],q={},k=new WeakMap,V=new WeakMap,ue={get(t,e){if(!le.includes(e))return t[e];let n=q[e];return n||(n=q[e]=function(...r){k.set(this,V.get(this)[e](...r))}),n}};async function*me(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,ue);for(V.set(n,e),v.set(n,D(e));e;)yield n,e=await(k.get(n)||e.continue()),k.delete(n)}function N(t,e){return e===Symbol.asyncIterator&&B(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&B(t,[IDBIndex,IDBObjectStore])}U(t=>({...t,get(e,n,r){return N(e,n)?me:t.get(e,n,r)},has(e,n){return N(e,n)||t.has(e,n)}}));const _="stories-db",T="stories";async function H(t){await(await F(_,1,{upgrade(n){n.createObjectStore(T,{keyPath:"id"})}})).put(T,t)}async function he(){return(await F(_,1)).getAll(T)}function G(t,e="en-US",n={}){return new Date(t).toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric",...n})}var W=x();const pe=async()=>{const t=x(),e=await fetch(`${y.BASE_URL}/stories?page=1&size=16&location=1`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});return e.ok?e.json():await he()},ge=async t=>{const e=await fetch(`${y.BASE_URL}/stories/${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${W}`}});if(!e.ok)throw new Error("Gagal mendapatkan data story");return e.json()},ye=async t=>{const e=new Request(`${y.BASE_URL}/stories`,{method:"POST",headers:{Authorization:`Bearer ${W}`},body:t}),n=await fetch(e);if(!n.ok)throw new Error("Gagal mendapatkan data story");return n.json()};class M{constructor(e){this.view=e}async handleFetchingStories(){try{this.view.setLoading(!0);const e=await pe();this.view.loadStories(e.listStory)}catch(e){console.error(e)}finally{this.view.setLoading(!1)}}async handleFetchStoryById(e){try{this.view.setLoading(!0);const n=await ge(e);this.view.loadStory(n.story)}catch(n){console.error(n)}finally{this.view.setLoading(!1)}}async handlePostStory(e){try{this.view.setLoading(!0);const n=await ye(e);this.view.redirectToHomePage()}catch(n){console.error(n.message)}finally{this.view.setLoading(!1)}}}class fe{async render(){return`
      <section class="container">
        <h1 class="p-1 m-0 d-flex justify-content-between align-items-dan">
          <span>List of Story</span>
          <a href="#main-content" class="fs-5" >Skip to main content</a>
        </h1>
        
        <div class="story-list-container">
          <p id="loading-text">Loading...</p>
          <p id="no-data-text" class="hidden">Tidak ada story</p>
          
          <div id="story-list" class="story-list d-flex flex-wrap"></div>
        </div>
      </section>
    `}async setLoading(e){e?document.getElementById("loading-text").classList.remove("hidden"):document.getElementById("loading-text").classList.add("hidden")}async loadStories(e){const n=document.getElementById("story-list");if(document.getElementById("no-data-text").classList.add("hidden"),e.length<1){document.getElementById("no-data-text").classList.remove("hidden");return}for(let s of e)n.innerHTML+=`
        <div class="col-sm-6 col-md-4 col-lg-3 col-12 p-1">
          <div class="card" data-id="${s.id}">
            <div class="card-content" style="background: linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)), url(${s.photoUrl});">
              <p class="fs-5"><b>${s.name}</b></p>
              <span class="text-truncate">${s.description}</span>
              <span>${G(s.createdAt)}</span>
            </div>
          </div>
        </div>
      `;document.querySelectorAll(".card").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.id;this.openDetailPage(o)})})}async afterRender(){new M(this).handleFetchingStories()}openDetailPage(e){window.location.hash=`/detail/${e}`}}class we{async render(){return`
      <section class="container">
        <h1>About Page</h1>
      </section>
    `}async afterRender(){}}class K{constructor(e){this.view=e}async handleRegister({name:e,email:n,password:r}){try{this.view.setLoading(!0);const s=await X(e,n,r);this.view.redirectToLoginPage()}catch(s){this.view.showError(s.message)}finally{this.view.setLoading(!1)}}async handleLogin({email:e,password:n}){try{this.view.setLoading(!0);const r=await ee(e,n);this.view.redirectToHomePage()}catch(r){this.view.showError(r.message)}finally{this.view.setLoading(!1)}}}class ve{async render(){return`
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

                    <button type="submit" class="submit-btn">
                        Masuk
                    </button>
                    
                    <p id="error-msg" style="color: red; text-align: left;"></p>
                </form>
            </div>
        `}signUpAction(e){e.preventDefault(),this.presenter=new K(this);const n=document.getElementById("email").value,r=document.getElementById("password").value;this.presenter.handleLogin({email:n,password:r})}async afterRender(){document.getElementById("login-form").addEventListener("submit",this.signUpAction.bind(this))}setLoading(e){document.querySelector(".submit-btn").disabled=e,e?document.querySelector(".submit-btn").classList.add("disabled"):document.querySelector(".submit-btn").classList.remove("disabled")}showError(e){document.getElementById("error-msg").innerText=e}redirectToHomePage(){window.location.hash="/"}clearForm(){document.getElementById("login-form").reset()}}class be{async render(){return`
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

                    <button type="submit" class="submit-btn">
                        Daftar
                    </button>
                    
                    <p id="error-msg" style="color: red; text-align: left;"></p>
                </form>
            </div>
        `}signUpAction(e){e.preventDefault(),this.presenter=new K(this);const n=document.getElementById("name").value,r=document.getElementById("email").value,s=document.getElementById("password").value;this.presenter.handleRegister({name:n,email:r,password:s})}async afterRender(){document.getElementById("register-form").addEventListener("submit",this.signUpAction.bind(this))}setLoading(e){document.querySelector(".submit-btn").disabled=e,e?document.querySelector(".submit-btn").classList.add("disabled"):document.querySelector(".submit-btn").classList.remove("disabled")}showError(e){document.getElementById("error-msg").innerText=e}redirectToLoginPage(){window.location.hash="/login"}clearForm(){document.getElementById("register-form").reset()}}class Le{constructor(){this.stream=null,this.file=null}async render(){return A()||(window.location="/#/login"),`
            <div class="container">
                <h1 class="fs-2">Menambahkan Story</h1>
                <p>Tambahkan Story Kegiatan Sehari-harimu disini</p>
                
                <div class="py-3">
                    <form method="POST" enctype="multipart/form-data" id="story-form">
                        
                        <div class="form-group my-2">
                            <label class="form-label" for="description">Deskripsi</label>
                            <textarea type="text" id="description" class="form-control"></textarea>
                        </div>
                        
                        <div class="form-group my-2">
                            <label class="form-label">Foto</label>
                            <div class="d-flex gap-2 my-2">
                                <button class="btn btn-primary" id="playBtn">Play</button>
                                <button class="btn btn-danger" id="stopBtn">Stop</button>
                                <button class="btn btn-success" id="snapBtn">Take Picture</button>
                            </div>
                            
                            <div class="d-flex flex-wrap gap-2 d-block">
                                <video class="video col-md-5 col-12" id="video" autoplay playsinline></video>
                                <canvas class="col-md-5 col-12" id="photo-preview"></canvas>
                            </div>
                        </div>
                        
                        <div class="form-group my-2">
                            <label class="form-label">Map</label>
                            <div class="d-block col-6" id="map"></div>
                        </div>
                        
                        <button class="submit-btn col-12">Tambah Story</button>
                    </form>
                </div>
            </div>
        `}async afterRender(){this.prepareEventListeners(),this.startCamera(),this.map=L.map("map").setView([.7893,113.9213],8);const e=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map);this.map.addLayer(e),this.map.on("click",n=>this.onMapClick(n))}prepareEventListeners(){document.getElementById("playBtn").addEventListener("click",e=>{e.preventDefault(),this.startCamera()}),document.getElementById("stopBtn").addEventListener("click",e=>{e.preventDefault(),this.stopCamera()}),document.getElementById("snapBtn").addEventListener("click",e=>{e.preventDefault(),this.takePicture()}),document.getElementById("story-form").addEventListener("submit",e=>{e.preventDefault(),this.uploadStory()})}async startCamera(){try{"mediaDevices"in navigator&&"getUserMedia"in navigator.mediaDevices&&(this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),document.getElementById("video").srcObject=this.stream)}catch(e){alert("Camera access failed: "+e.message)}}stopCamera(){try{this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),document.getElementById("video").srcObject=null)}catch(e){alert("Gagal "+e.message)}}takePicture(){this.canvas=document.querySelector("canvas");const e=this.canvas.getContext("2d");this.canvas.width=video.videoWidth,this.canvas.height=video.videoHeight,e.drawImage(video,0,0,this.canvas.width,this.canvas.height),this.canvas.toBlob(async n=>{const r=new File([n],"snapshot.png",{type:"image/png"});this.file=r},"image/png")}onMapClick(e){this.marker&&this.map.removeLayer(this.marker),this.lat=e.latlng.lat,this.lng=e.latlng.lng,this.marker=new L.marker(e.latlng).addTo(this.map)}async uploadStory(){this.presenter=new M(this);const e=new FormData;e.append("description",document.getElementById("description").value),e.append("photo",this.file),e.append("lat",this.lat),e.append("lon",this.lng),this.presenter.handlePostStory(e)}setLoading(e){document.querySelector(".submit-btn").disabled=e,e?document.querySelector(".submit-btn").classList.add("disabled"):document.querySelector(".submit-btn").classList.remove("disabled")}redirectToHomePage(){window.location="/"}}function J(t){const e=t.split("/");return{resource:e[1]||null,id:e[2]||null}}function Ee(t){let e="";return t.resource&&(e=e.concat(`/${t.resource}`)),t.id&&(e=e.concat("/:id")),e||"/"}function z(){return location.hash.replace("#","")||"/"}function Z(){const t=z(),e=J(t);return Ee(e)}function Se(){const t=z();return J(t)}class Be{async render(){const{id:e}=Se();return this.id=e,`
      <section class="container">
        <h1 class="p-1 m-0">Detail Story</h1>
        
        <div class="story-container">
          <div id="post-photo"></div>
          <div id="post-description"></div>
          <button id="save-offline-btn" class="btn btn-primary my-2">Simpan Offline</button>
          <div id="map"></div>
        </div>
      </section>
    `}async afterRender(){new M(this).handleFetchStoryById(this.id),document.getElementById("save-offline-btn").addEventListener("click",async()=>{this.storyData&&(await H({id:this.storyData.id,title:this.storyData.name,body:this.storyData.description}),alert("Story disimpan offline!"))})}loadMap(e){this.map=L.map("map").setView(e,8),L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map)}async setLoading(e){}async loadStory(e){this.storyData=e,document.getElementById("post-photo").innerHTML=`<img src="${e.photoUrl}" alt="${e.name}'s Photo">`,document.getElementById("post-description").innerHTML=`
            <p >${e.name}</p>
            <span class="d-block">${e.description}</span>
            <span>${G(e.createdAt)}</span>
        `,this.loadMap([e.lat,e.lon]),this.marker=L.marker([e.lat,e.lon]).addTo(this.map).bindPopup(`<b>Description: </b><br />${e.description}`)}}const Y={"/":new fe,"/about":new we,"/login":new ve,"/register":new be,"/create-story":new Le,"/detail/:id":new Be};var g,h,d,w,Q;class Ie{constructor({navigationDrawer:e,drawerButton:n,content:r}){p(this,w);p(this,g,null);p(this,h,null);p(this,d,null);f(this,g,r),f(this,h,n),f(this,d,e),O(this,w,Q).call(this)}async renderPage(){const e=Z(),n=Y[e];c(this,g).innerHTML=await n.render(),await n.afterRender()}}g=new WeakMap,h=new WeakMap,d=new WeakMap,w=new WeakSet,Q=function(){c(this,h).addEventListener("click",()=>{c(this,d).classList.toggle("open")}),document.body.addEventListener("click",e=>{!c(this,d).contains(e.target)&&!c(this,h).contains(e.target)&&c(this,d).classList.remove("open"),c(this,d).querySelectorAll("a").forEach(n=>{n.contains(e.target)&&c(this,d).classList.remove("open")})})};document.addEventListener("DOMContentLoaded",async()=>{await new Ie({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")}).renderPage();let e=null;window.addEventListener("hashchange",async()=>{var i;const n=Z(),r=Y[n],s=r,o=document.querySelector("#main-content");e!=null&&e.stopCamera&&e.stopCamera(),e=r,document.startViewTransition?document.startViewTransition(async()=>{var l;o.innerHTML=await s.render(),await((l=s.afterRender)==null?void 0:l.call(s))}):(o.innerHTML=await s.render(),await((i=s.afterRender)==null?void 0:i.call(s)))}),A()?(document.getElementById("login-nav").classList.add("hidden"),document.getElementById("register-nav").classList.add("hidden"),document.getElementById("logout-button").classList.remove("hidden")):(document.getElementById("login-nav").classList.remove("hidden"),document.getElementById("register-nav").classList.remove("hidden"),document.getElementById("logout-button").classList.add("hidden")),document.getElementById("logout-button").addEventListener("click",()=>{te()});try{await Notification.requestPermission()==="granted"&&await Te()}catch(n){console.error("Error requesting notification permission:",n)}});const Pe="BKn_IwN-2Gf7mBkiihT7Ywd0-lnpErDuG0SMnUdCGlCuZ1M81PML-Jl8AhEXRuO8l_xU89i7-NrQf0SBuFKFDPo",De="https://story-api.dicoding.dev/v1/notifications/subscribe";function ke(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/-/g,"+").replace(/_/g,"/"),r=window.atob(n),s=new Uint8Array(r.length);for(let o=0;o<r.length;++o)s[o]=r.charCodeAt(o);return s}async function Te(){const t=x();if("serviceWorker"in navigator&&"PushManager"in window)try{const n=await(await navigator.serviceWorker.ready).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:ke(Pe)});(await fetch(De,{method:"POST",body:JSON.stringify({endpoint:n.endpoint,keys:JSON.parse(JSON.stringify(n)).keys}),headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}})).ok?console.log("Push notification subscription successful"):console.error("Server rejected push subscription")}catch(e){console.error("Error subscribing to push notifications:",e)}}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js").then(e=>{console.log("Service worker registered:",e)}).catch(e=>{console.error("Service worker registration failed:",e)})});document.addEventListener("click",function(t){if(t.target.matches('button[aria-label="Simpan story ke offline"]')){const e={id:t.target.dataset.storyId||Date.now(),title:t.target.dataset.storyTitle||"Judul Story",body:t.target.dataset.storyBody||"Isi Story"};saveStoryToIndexedDB(e)}});window.saveStoryToIndexedDB=async function(t){await H(t),alert("Story disimpan untuk offline!")};
