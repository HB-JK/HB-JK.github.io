var v=n=>{throw TypeError(n)};var g=(n,e,t)=>e.has(n)||v("Cannot "+t);var r=(n,e,t)=>(g(n,e,"read from private field"),t?t.call(n):e.get(n)),m=(n,e,t)=>e.has(n)?v("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),u=(n,e,t,s)=>(g(n,e,"write to private field"),s?s.call(n,t):e.set(n,t),t),w=(n,e,t)=>(g(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const l={BASE_URL:"https://story-api.dicoding.dev/v1"},D=async n=>{const e=new Request(`${l.BASE_URL}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),t=await fetch(e),s=await t.json();if(!t.ok)throw new Error((s==null?void 0:s.message)??"Gagal register akun");return s},R=async n=>{var a;const e=new Request(`${l.BASE_URL}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),t=await fetch(e),s=await t.json();if(!t.ok)throw new Error((s==null?void 0:s.message)??"Gagal masuk");return localStorage.setItem("token",(a=s==null?void 0:s.loginResult)==null?void 0:a.token),localStorage.setItem("user-data",JSON.stringify(s==null?void 0:s.loginResult)),s},$=()=>!!localStorage.getItem("token"),b=()=>{let n=localStorage.getItem("token")??null;return n||(window.location.hash="/login"),n};var S=b();const O=async()=>{const n=b(),e=await fetch(`${l.BASE_URL}/stories?page=1&size=16&location=1`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`}});if(!e.ok)throw new Error("Gagal mendapatkan data story");return e.json()},q=async n=>{const e=await fetch(`${l.BASE_URL}/stories/${n}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${S}`}});if(!e.ok)throw new Error("Gagal mendapatkan data story");return e.json()},M=async n=>{const e=new Request(`${l.BASE_URL}/stories`,{method:"POST",headers:{Authorization:`Bearer ${S}`},body:n}),t=await fetch(e);if(!t.ok)throw new Error("Gagal mendapatkan data story");return t.json()},U=async n=>{if(!(await fetch(`${l.BASE_URL}/subscribe`,{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}})).ok)throw new Error("Gagal subscribe notification");return!0};function E(n,e="en-US",t={}){return new Date(n).toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric",...t})}class y{constructor(e){this.view=e}async getStories(){try{this.view.setLoading(!0);const e=await O();this.view.loadStories(e.listStory)}catch(e){console.error(e)}finally{this.view.setLoading(!1)}}async getStoryId(e){try{const t=await q(e);this.view.loadStory(t.story)}catch(t){console.error(t)}}async uploadStory(e){try{const t=await M(e);return!0}catch(t){console.error(t.message)}}}class j{constructor(){this.markerData=[]}async render(){return`
      <section class="container">
        <h1 class="p-1 m-0">List of Story</h1>
        
        <div class="story-list-container">
          <p id="loading-text">Loading...</p>
          <p id="no-data-text" class="hidden">Tidak ada story</p>
          
          <div id="story-list" class="story-list d-flex flex-wrap"></div>
          
          <div class="d-block col-12" id="map"></div>
        </div>
      </section>
    `}async setLoading(e){e?document.getElementById("loading-text").classList.remove("hidden"):document.getElementById("loading-text").classList.add("hidden")}async loadStories(e){const t=document.getElementById("story-list");if(document.getElementById("no-data-text").classList.add("hidden"),e.length<1){document.getElementById("no-data-text").classList.remove("hidden");return}for(let o of e)this.markerData.push(o),t.innerHTML+=`
        <div class="col-sm-6 col-md-4 col-lg-3 col-12 p-1">
          <div class="card" data-id="${o.id}">
            <div class="card-content" style="background: linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)), url(${o.photoUrl});">
              <p class="fs-5"><b>${o.name}</b></p>
              <span class="text-truncate">${o.description}</span>
              <span>${E(o.createdAt)}</span>
            </div>
          </div>
        </div>
      `;document.querySelectorAll(".card").forEach(o=>{o.addEventListener("click",()=>{const c=o.dataset.id;this.openDetailPage(c)})});const a=L.map("map").setView([.7893,113.9213],8);L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(a);for(let o of e)L.marker([o.lat,o.lon]).addTo(a).bindPopup(o.description)}async afterRender(){new y(this).getStories()}openDetailPage(e){window.location.hash=`/story/${e}`}}class k{constructor(e){this.view=e}async handleRegister({name:e,email:t,password:s}){try{this.view.setLoading(!0);const a=await D({name:e,email:t,password:s});return!0}catch(a){console.log(a.message)}finally{this.view.setLoading(!1)}}async handleLogin({email:e,password:t}){try{this.view.setLoading(!0);const s=await R({email:e,password:t});return!0}catch(s){console.log(s.message)}finally{this.view.setLoading(!1)}}}class C{async render(){return`
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
        `}async registerAction(e){e.preventDefault(),this.presenter=new k(this);const t=document.getElementById("email").value,s=document.getElementById("password").value;await this.presenter.handleLogin({email:t,password:s})&&(window.location.hash="/")}async afterRender(){document.getElementById("login-form").addEventListener("submit",this.registerAction.bind(this))}setLoading(e){document.querySelector("#login").disabled=e}clearForm(){document.getElementById("login-form").reset()}}class _{async render(){return`
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
        `}async signUpAction(e){e.preventDefault(),this.presenter=new k(this);const t=document.getElementById("name").value,s=document.getElementById("email").value,a=document.getElementById("password").value;await this.presenter.handleRegister({name:t,email:s,password:a})&&(window.location.hash="/login")}async afterRender(){document.getElementById("register-form").addEventListener("submit",this.signUpAction.bind(this))}setLoading(e){document.querySelector(".action-button").disabled=e,e?document.querySelector(".action-button").classList.add("disabled"):document.querySelector(".action-button").classList.remove("disabled")}redirectToLoginPage(){window.location.hash="/login"}clearForm(){document.getElementById("register-form").reset()}}class N{constructor(){this.stream=null,this.file=null}async render(){return`
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
        `}async afterRender(){document.getElementById("snapBtn").addEventListener("click",t=>{t.preventDefault(),this.takePicture()}),document.getElementById("story-form").addEventListener("submit",t=>{t.preventDefault(),this.uploadStory()}),"mediaDevices"in navigator&&"getUserMedia"in navigator.mediaDevices&&(this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),document.getElementById("video").srcObject=this.stream),this.map=L.map("map").setView([.7893,113.9213],8);const e=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map);this.map.addLayer(e),this.map.on("click",t=>this.onMapClick(t))}takePicture(){this.canvas=document.querySelector("canvas"),this.canvas.classList.remove("d-none");const e=this.canvas.getContext("2d");this.canvas.width=video.videoWidth,this.canvas.height=video.videoHeight,e.drawImage(video,0,0,this.canvas.width,this.canvas.height),this.canvas.toBlob(async t=>{const s=new File([t],"snapshot.png",{type:"image/png"});this.file=s},"image/png"),this.destroy(),document.getElementById("video").classList.add("d-none")}onMapClick(e){this.marker&&this.map.removeLayer(this.marker),this.lat=e.latlng.lat,this.lng=e.latlng.lng,this.marker=new L.marker(e.latlng).addTo(this.map)}async uploadStory(){this.presenter=new y(this);const e=new FormData;e.append("description",document.getElementById("description").value),e.append("photo",this.file),e.append("lat",this.lat),e.append("lon",this.lng),await this.presenter.uploadStory(e)&&(window.location.hash="/")}setLoading(e){document.querySelector(".action-button").disabled=e}destroy(){this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),document.getElementById("video").srcObject=null)}}function B(n){const e=n.split("/");return{resource:e[1]||null,id:e[2]||null}}function G(n){let e="";return n.resource&&(e=e.concat(`/${n.resource}`)),n.id&&(e=e.concat("/:id")),e||"/"}function P(){return location.hash.replace("#","")||"/"}function I(){const n=P(),e=B(n);return G(e)}function H(){const n=P();return B(n)}class F{async render(){const{id:e}=H();return this.id=e,`
            <section class="container">
                <div class="story-container">
                    <div class="d-flex flex-wrap gap-2 my-2">
                        <div id="post-photo" class="col-md-5 col-12"></div>
                        <div id="post-description" class="col-md-6 col-12"></div>
                    </div>
                    <div id="map"></div>
                </div>
            </section>
        `}async afterRender(){new y(this).getStoryId(this.id)}async loadStory(e){document.getElementById("post-photo").innerHTML=`<img class="col-12" src="${e.photoUrl}" alt="${e.name}'s Photo">`,document.getElementById("post-description").innerHTML=`<p class="fs-4 fw-bold" >${e.name}</p>
            <span>${E(e.createdAt)}</span>
            <span class="d-block">${e.description}</span>`;const t=L.map("map").setView([e.lat,e.lon],8);L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(t),L.marker([e.lat,e.lon]).addTo(t).bindPopup(`${e.description} - ${e.name}`)}}const T={"/":new j,"/login":new C,"/register":new _,"/tambah-story":new N,"/story/:id":new F};var p,d,i,h,x;class z{constructor({navigationDrawer:e,drawerButton:t,content:s}){m(this,h);m(this,p,null);m(this,d,null);m(this,i,null);u(this,p,s),u(this,d,t),u(this,i,e),w(this,h,x).call(this)}async renderPage(){const e=I(),t=T[e];r(this,p).innerHTML=await t.render(),await t.afterRender()}}p=new WeakMap,d=new WeakMap,i=new WeakMap,h=new WeakSet,x=function(){r(this,d).addEventListener("click",()=>{r(this,i).classList.toggle("open")}),document.body.addEventListener("click",e=>{!r(this,i).contains(e.target)&&!r(this,d).contains(e.target)&&r(this,i).classList.remove("open"),r(this,i).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&r(this,i).classList.remove("open")})})};document.addEventListener("DOMContentLoaded",async()=>{await new z({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")}).renderPage();let e=null;"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js")}),window.addEventListener("hashchange",async()=>{var c;const t=I(),s=T[t],a=s,o=document.querySelector("#main-content");e!=null&&e.destroy&&e.destroy(),e=s,document.startViewTransition?document.startViewTransition(async()=>{var f;o.animate([{transform:"translateX(0)",opacity:1},{transform:"translateX(-120px)",opacity:0}],{duration:200,easing:"ease-in"}),await new Promise(A=>setTimeout(A,200)),o.innerHTML=await a.render(),await((f=a.afterRender)==null?void 0:f.call(a)),o.animate([{transform:"translateX(30px)",opacity:0},{transform:"translateX(0)",opacity:1}],{duration:250,easing:"ease-out"})}):(o.innerHTML=await a.render(),await((c=a.afterRender)==null?void 0:c.call(a)))}),$()?(document.getElementById("login-nav").classList.add("hidden"),document.getElementById("register-nav").classList.add("hidden"),document.getElementById("subscribe-notif").classList.remove("hidden")):(document.getElementById("login-nav").classList.remove("hidden"),document.getElementById("register-nav").classList.remove("hidden"),document.getElementById("subscribe-notif").classList.add("hidden")),document.getElementById("subscribe-notif").addEventListener("click",async function(){Notification.requestPermission().then(t=>{t==="granted"&&J()})})});const V="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";async function J(){if("serviceWorker"in navigator&&"PushManager"in window){const e=await(await navigator.serviceWorker.ready).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:V});await U(e)}}
