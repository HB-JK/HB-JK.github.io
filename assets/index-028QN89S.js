var w=s=>{throw TypeError(s)};var g=(s,e,t)=>e.has(s)||w("Cannot "+t);var i=(s,e,t)=>(g(s,e,"read from private field"),t?t.call(s):e.get(s)),l=(s,e,t)=>e.has(s)?w("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t),p=(s,e,t,a)=>(g(s,e,"write to private field"),a?a.call(s,t):e.set(s,t),t),b=(s,e,t)=>(g(s,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const u={BASE_URL:"https://story-api.dicoding.dev/v1"},D=async(s,e,t)=>{const a=new Request(`${u.BASE_URL}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:s,email:e,password:t})}),n=await fetch(a),o=await n.json();if(!n.ok)throw new Error((o==null?void 0:o.message)??"Gagal register akun");return o},R=async(s,e)=>{var o;const t=new Request(`${u.BASE_URL}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s,password:e})}),a=await fetch(t),n=await a.json();if(!a.ok)throw new Error((n==null?void 0:n.message)??"Gagal masuk");return localStorage.setItem("token",(o=n==null?void 0:n.loginResult)==null?void 0:o.token),localStorage.setItem("user-data",JSON.stringify(n==null?void 0:n.loginResult)),document.getElementById("login-nav").classList.add("hidden"),document.getElementById("register-nav").classList.add("hidden"),document.getElementById("logout-button").classList.remove("hidden"),n},q=()=>{localStorage.removeItem("token"),document.getElementById("login-nav").classList.remove("hidden"),document.getElementById("register-nav").classList.remove("hidden"),document.getElementById("logout-button").classList.add("hidden"),window.location.hash="/login"},y=()=>!!localStorage.getItem("token"),E=()=>(y()||(window.location.hash="/login"),localStorage.getItem("token")??null);class ${constructor(){this._pushNotification=null}async subscribe(){if(await Notification.requestPermission()!=="granted")throw new Error("Permission denied for notifications")}}function S(s,e="en-US",t={}){return new Date(s).toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric",...t})}var B=E();const M=async()=>{const s=E(),e=await fetch(`${u.BASE_URL}/stories?page=1&size=16&location=1`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`}});if(e.status==401&&(window.location.hash="/login"),!e.ok)throw new Error("Gagal mendapatkan data story");return e.json()},O=async s=>{const e=await fetch(`${u.BASE_URL}/stories/${s}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${B}`}});if(!e.ok)throw new Error("Gagal mendapatkan data story");return e.json()},C=async s=>{const e=new Request(`${u.BASE_URL}/stories`,{method:"POST",headers:{Authorization:`Bearer ${B}`},body:s}),t=await fetch(e);if(!t.ok)throw new Error("Gagal mendapatkan data story");return t.json()};class f{constructor(e){this.view=e}async handleFetchingStories(){try{this.view.setLoading(!0);const e=await M();this.view.loadStories(e.listStory)}catch(e){console.error(e)}finally{this.view.setLoading(!1)}}async handleFetchStoryById(e){try{this.view.setLoading(!0);const t=await O(e);this.view.loadStory(t.story)}catch(t){console.error(t)}finally{this.view.setLoading(!1)}}async handlePostStory(e){try{this.view.setLoading(!0);const t=await C(e);this.view.redirectToHomePage()}catch(t){console.error(t.message)}finally{this.view.setLoading(!1)}}}class U{async render(){return`
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
    `}async setLoading(e){e?document.getElementById("loading-text").classList.remove("hidden"):document.getElementById("loading-text").classList.add("hidden")}async loadStories(e){const t=document.getElementById("story-list");if(document.getElementById("no-data-text").classList.add("hidden"),e.length<1){document.getElementById("no-data-text").classList.remove("hidden");return}for(let n of e)t.innerHTML+=`
        <div class="col-sm-6 col-md-4 col-lg-3 col-12 p-1">
          <div class="card" data-id="${n.id}">
            <div class="card-content" style="background: linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)), url(${n.photoUrl});">
              <p class="fs-5"><b>${n.name}</b></p>
              <span class="text-truncate">${n.description}</span>
              <span>${S(n.createdAt)}</span>
            </div>
          </div>
        </div>
      `;document.querySelectorAll(".card").forEach(n=>{n.addEventListener("click",()=>{const o=n.dataset.id;this.openDetailPage(o)})})}async afterRender(){new f(this).handleFetchingStories()}openDetailPage(e){window.location.hash=`/detail/${e}`}}class j{async render(){return`
      <section class="container">
        <h1>About Page</h1>
      </section>
    `}async afterRender(){}}class I{constructor(e){this.view=e}async handleRegister({name:e,email:t,password:a}){try{this.view.setLoading(!0);const n=await D(e,t,a);this.view.redirectToLoginPage()}catch(n){this.view.showError(n.message)}finally{this.view.setLoading(!1)}}async handleLogin({email:e,password:t}){try{this.view.setLoading(!0);const a=await R(e,t);this.view.redirectToHomePage()}catch(a){this.view.showError(a.message)}finally{this.view.setLoading(!1)}}}class F{async render(){return`
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
        `}signUpAction(e){e.preventDefault(),this.presenter=new I(this);const t=document.getElementById("email").value,a=document.getElementById("password").value;this.presenter.handleLogin({email:t,password:a})}async afterRender(){document.getElementById("login-form").addEventListener("submit",this.signUpAction.bind(this))}setLoading(e){document.querySelector(".submit-btn").disabled=e,e?document.querySelector(".submit-btn").classList.add("disabled"):document.querySelector(".submit-btn").classList.remove("disabled")}showError(e){document.getElementById("error-msg").innerText=e}redirectToHomePage(){window.location.hash="/"}clearForm(){document.getElementById("login-form").reset()}}class H{async render(){return`
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
        `}signUpAction(e){e.preventDefault(),this.presenter=new I(this);const t=document.getElementById("name").value,a=document.getElementById("email").value,n=document.getElementById("password").value;this.presenter.handleRegister({name:t,email:a,password:n})}async afterRender(){document.getElementById("register-form").addEventListener("submit",this.signUpAction.bind(this))}setLoading(e){document.querySelector(".submit-btn").disabled=e,e?document.querySelector(".submit-btn").classList.add("disabled"):document.querySelector(".submit-btn").classList.remove("disabled")}showError(e){document.getElementById("error-msg").innerText=e}redirectToLoginPage(){window.location.hash="/login"}clearForm(){document.getElementById("register-form").reset()}}class N{constructor(){this.stream=null,this.file=null}async render(){return y()||(window.location="/#/login"),`
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
        `}async afterRender(){this.prepareEventListeners(),this.startCamera(),this.map=L.map("map").setView([.7893,113.9213],8);const e=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map);this.map.addLayer(e),this.map.on("click",t=>this.onMapClick(t))}prepareEventListeners(){document.getElementById("playBtn").addEventListener("click",e=>{e.preventDefault(),this.startCamera()}),document.getElementById("stopBtn").addEventListener("click",e=>{e.preventDefault(),this.stopCamera()}),document.getElementById("snapBtn").addEventListener("click",e=>{e.preventDefault(),this.takePicture()}),document.getElementById("story-form").addEventListener("submit",e=>{e.preventDefault(),this.uploadStory()})}async startCamera(){try{"mediaDevices"in navigator&&"getUserMedia"in navigator.mediaDevices&&(this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),document.getElementById("video").srcObject=this.stream)}catch(e){alert("Camera access failed: "+e.message)}}stopCamera(){try{this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),document.getElementById("video").srcObject=null)}catch(e){alert("Gagal "+e.message)}}takePicture(){this.canvas=document.querySelector("canvas");const e=this.canvas.getContext("2d");this.canvas.width=video.videoWidth,this.canvas.height=video.videoHeight,e.drawImage(video,0,0,this.canvas.width,this.canvas.height),this.canvas.toBlob(async t=>{const a=new File([t],"snapshot.png",{type:"image/png"});this.file=a},"image/png")}onMapClick(e){this.marker&&this.map.removeLayer(this.marker),this.lat=e.latlng.lat,this.lng=e.latlng.lng,this.marker=new L.marker(e.latlng).addTo(this.map)}async uploadStory(){this.presenter=new f(this);const e=new FormData;e.append("description",document.getElementById("description").value),e.append("photo",this.file),e.append("lat",this.lat),e.append("lon",this.lng),this.presenter.handlePostStory(e)}setLoading(e){document.querySelector(".submit-btn").disabled=e,e?document.querySelector(".submit-btn").classList.add("disabled"):document.querySelector(".submit-btn").classList.remove("disabled")}redirectToHomePage(){window.location="/"}}function k(s){const e=s.split("/");return{resource:e[1]||null,id:e[2]||null}}function G(s){let e="";return s.resource&&(e=e.concat(`/${s.resource}`)),s.id&&(e=e.concat("/:id")),e||"/"}function P(){return location.hash.replace("#","")||"/"}function T(){const s=P(),e=k(s);return G(e)}function _(){const s=P();return k(s)}class z{async render(){const{id:e}=_();return this.id=e,`
      <section class="container">
        <h1 class="p-1 m-0">Detail Story</h1>
        
        <div class="story-container">
          <div id="post-photo"></div>
          <div id="post-description"></div>
          <div id="map"></div>
        </div>
      </section>
    `}async afterRender(){new f(this).handleFetchStoryById(this.id)}loadMap(e){this.map=L.map("map").setView(e,8),L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map)}async setLoading(e){}async loadStory(e){document.getElementById("post-photo").innerHTML=`<img src="${e.photoUrl}" alt="${e.name}'s Photo">`,document.getElementById("post-description").innerHTML=`
            <p >${e.name}</p>
            <span class="d-block">${e.description}</span>
            <span>${S(e.createdAt)}</span>
        `,this.loadMap([e.lat,e.lon]),this.marker=L.marker([e.lat,e.lon]).addTo(this.map).bindPopup(`<b>Description: </b><br />${e.description}`)}}const x={"/":new U,"/about":new j,"/login":new F,"/register":new H,"/create-story":new N,"/detail/:id":new z};var m,c,r,h,A;class V{constructor({navigationDrawer:e,drawerButton:t,content:a}){l(this,h);l(this,m,null);l(this,c,null);l(this,r,null);p(this,m,a),p(this,c,t),p(this,r,e),b(this,h,A).call(this)}async renderPage(){const e=T(),t=x[e];i(this,m).innerHTML=await t.render(),await t.afterRender()}}m=new WeakMap,c=new WeakMap,r=new WeakMap,h=new WeakSet,A=function(){i(this,c).addEventListener("click",()=>{i(this,r).classList.toggle("open")}),document.body.addEventListener("click",e=>{!i(this,r).contains(e.target)&&!i(this,c).contains(e.target)&&i(this,r).classList.remove("open"),i(this,r).querySelectorAll("a").forEach(t=>{t.contains(e.target)&&i(this,r).classList.remove("open")})})};document.addEventListener("DOMContentLoaded",async()=>{await new V({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")}).renderPage();let e=null;window.addEventListener("hashchange",async()=>{var d;const t=T(),a=x[t],n=a,o=document.querySelector("#main-content");e!=null&&e.stopCamera&&e.stopCamera(),e=a,document.startViewTransition?document.startViewTransition(async()=>{var v;o.innerHTML=await n.render(),await((v=n.afterRender)==null?void 0:v.call(n))}):(o.innerHTML=await n.render(),await((d=n.afterRender)==null?void 0:d.call(n)))}),y()?(document.getElementById("login-nav").classList.add("hidden"),document.getElementById("register-nav").classList.add("hidden"),document.getElementById("logout-button").classList.remove("hidden"),document.getElementById("subscribe-notif").classList.remove("hidden")):(document.getElementById("login-nav").classList.remove("hidden"),document.getElementById("register-nav").classList.remove("hidden"),document.getElementById("logout-button").classList.add("hidden"),document.getElementById("subscribe-notif").classList.add("hidden")),document.getElementById("logout-button").addEventListener("click",()=>{q()}),document.getElementById("subscribe-notif").addEventListener("click",()=>{new $().subscribe()})});
