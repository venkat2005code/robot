
(function(){
 const routes={
  "home":"index.html","home 1":"index.html",
  "home 1 automation projects":"index.html",
  "home 1 - automation projects":"index.html",
  "home 1: automation projects":"index.html",
  "home 1 automation projects 2":"home-1-variant-2.html",
  "home 2":"home-2.html","home 2 turnkey robotics":"home-2.html",
  "home 2 - turnkey robotics":"home-2-variant-2.html",
  "home 2: turnkey robotics":"home-2-variant-2.html",
  "home 2 turnkey robotics 2":"home-2-variant-2.html",
  "services":"services.html","services & capabilities":"services.html",
  "case studies":"case-studies.html","case study":"case-studies.html",
  "case study detail":"case-study-hyperweld.html",
  "hyperweld":"case-study-hyperweld.html","hyperweld 7":"case-study-hyperweld.html",
  "tech specs":"tech-specs.html","tech specs & lab":"tech-specs.html",
  "tech specs lab":"tech-specs.html",
  "technical specifications":"tech-specs.html",
  "industries":"industries.html","industries served":"industries.html",
  "contact":"contact.html","contact & rfq":"contact.html",
  "request rfq":"contact.html","request quote":"contact.html",
  "submit rfq":"contact.html",
  "get in touch":"contact.html","request feasibility audit":"contact.html",
  "about":"about.html","about us":"about.html","about nexus":"about.html",
  "login":"login.html","log in":"login.html","sign in":"login.html","client login":"login.html"
 };
 const norm=s=>(s||"").replace(/\s+/g," ").trim().toLowerCase();
 function toast(msg){
  let t=document.getElementById("nexus-toast");
  if(!t){t=document.createElement("div");t.id="nexus-toast";t.setAttribute("role","status");t.setAttribute("aria-live","polite");document.body.appendChild(t);}
  t.textContent=msg;t.classList.add("show");clearTimeout(window.__nt);
  window.__nt=setTimeout(()=>t.classList.remove("show"),1500);
 }

 function links(){
  // data-path → file mapping (primary routing for navbar links)
  const pathRoutes={
   "home-automation-projects":"index.html",
   "home-turnkey-robotics":"home-2.html",
   "services":"services.html",
   "case-studies":"case-studies.html",
   "case-study-detail":"case-study-hyperweld.html",
   "industries-served":"industries.html",
   "tech-specs-and-lab":"tech-specs.html",
   "contact-and-rfq":"contact.html",
   "about":"about.html",
   "login":"login.html"
  };
  document.querySelectorAll('a[href="#"]').forEach(a=>{
   let target=null;
   // 1) Check data-path attribute first
   const dp=a.getAttribute("data-path");
   if(dp){
    // normalize: "contact-&amp;-rfq" → "contact-and-rfq", etc.
    const cleanDp=dp.replace(/&amp;/g,"&").replace(/&/g,"and").replace(/---/g,"-").replace(/--/g,"-");
    target=pathRoutes[cleanDp]||pathRoutes[dp];
   }
   // 2) Fall back to text-content matching
   if(!target){
    const txt=norm(a.textContent);
    const sorted = Object.entries(routes).sort((a,b)=>b[0].length - a[0].length);
    for(const[k,v] of sorted)if(txt===k||txt.includes(k)){target=v;break}
    if(!target&&/rfq|request quote|request audit|feasibility/.test(txt))target="contact.html";
    if(!target&&/case study|hyperweld|blueprint/.test(txt))target="case-studies.html";
    if(!target&&/technical|specification|tech specs/.test(txt))target="tech-specs.html";
    if(!target&&/industry|industries/.test(txt))target="industries.html";
   }
   if(target)a.href=target;
  });
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a=>a.addEventListener("click",e=>{
   const el=document.querySelector(a.getAttribute("href"));
   if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"})}
  }));
 }
 function forms(){
  document.querySelectorAll("form:not(#login-form)").forEach(f=>f.addEventListener("submit",e=>{
   e.preventDefault();
   const bad=[...f.querySelectorAll("[required]")].find(x=>!x.value.trim());
   if(bad){bad.focus();toast("Please complete the required fields");return}
   f.reset();toast("Your request was submitted successfully");
  }));
 }

 // ── Theme System ───────────────────────────────────────────────
 // Apply saved theme IMMEDIATELY (before first paint) to avoid flash
 (function(){
  var saved=localStorage.getItem("nexus-theme");
  if(saved==="light"){
   document.documentElement.classList.remove("dark");
  }else{
   document.documentElement.classList.add("dark");
  }
 })();

 // Global toggle — called by the navbar button's onclick="toggleTheme()"
 window.toggleTheme=function(){
  var html=document.documentElement;
  var isDark=html.classList.contains("dark");
  var icon=document.getElementById("theme-icon");
  if(isDark){
   html.classList.remove("dark");
   localStorage.setItem("nexus-theme","light");
   if(icon)icon.textContent="light_mode";
  }else{
   html.classList.add("dark");
   localStorage.setItem("nexus-theme","dark");
   if(icon)icon.textContent="dark_mode";
  }
 };

 // ── RTL System ─────────────────────────────────────────────────
 // Apply saved direction immediately
 (function(){
  var saved=localStorage.getItem("nexus-dir");
  if(saved==="rtl"){
   document.documentElement.dir="rtl";
  }else{
   document.documentElement.dir="ltr";
  }
 })();

 function updateRTLIcon(){
  var rtlIcon=document.getElementById("rtl-icon");
  if(!rtlIcon)return;
  var isRTL=document.documentElement.dir==="rtl";
  rtlIcon.textContent=isRTL?"format_textdirection_l_to_r":"format_textdirection_r_to_l";
 }

 // Global RTL toggle — called by the navbar button's onclick="toggleRTL()"
 window.toggleRTL=function(){
  var html=document.documentElement;
  var isRTL=html.dir==="rtl";
  if(isRTL){
   html.dir="ltr";
   localStorage.setItem("nexus-dir","ltr");
  }else{
   html.dir="rtl";
   localStorage.setItem("nexus-dir","rtl");
  }
  updateRTLIcon();
 };

 // ── Auth (client-side demo session) ───────────────────────────
 const AUTH_KEY="nexus-user";
 function getUser(){
  try{return JSON.parse(localStorage.getItem(AUTH_KEY)||"null");}catch(e){return null;}
 }
 function setUser(u){
  if(u)localStorage.setItem(AUTH_KEY,JSON.stringify(u));
  else localStorage.removeItem(AUTH_KEY);
  applyAuthState();
 }
 function applyAuthState(){
  var u=getUser();
  document.body.classList.toggle("is-authenticated",!!u);
  document.querySelectorAll('a[data-path="login"]').forEach(function(a){
   var label=a.querySelector("span.relative")||a;
   if(u){
    if(!a.dataset.loginLabel)a.dataset.loginLabel=label.innerHTML;
    label.innerHTML=(a.closest("#mobile-nav")?'<span class="material-symbols-outlined" style="font-size:16px">logout</span>':'')+'Logout';
    a.setAttribute("title","Signed in as "+u.email);
    a.setAttribute("href","#logout");
   }else if(a.dataset.loginLabel){
    label.innerHTML=a.dataset.loginLabel;
    a.removeAttribute("title");
    a.setAttribute("href","login.html");
   }
  });
  var who=document.getElementById("login-signed-in-as");
  if(who)who.textContent=u?("Signed in as "+u.email):"";
  var box=document.getElementById("login-session");
  if(box){box.classList.toggle("hidden",!u);box.classList.toggle("flex",!!u);}
  var lf=document.getElementById("login-form");
  if(lf)lf.classList.toggle("hidden",!!u);
 }
 window.nexusLogout=function(){
  setUser(null);
  toast("You have been signed out");
 };
 function auth(){
  applyAuthState();
  // Logout from any Login/Logout CTA when a session exists
  document.addEventListener("click",function(e){
   var a=e.target.closest&&e.target.closest('a[data-path="login"]');
   if(!a||!getUser())return;
   e.preventDefault();
   window.nexusLogout();
   if(window.location.pathname.split("/").pop()==="login.html")window.location.reload();
  });
  var form=document.getElementById("login-form");
  if(!form)return;
  var email=form.querySelector('input[type="email"]');
  var pass=form.querySelector('input[type="password"]');
  var err=document.getElementById("login-error");
  var showErr=function(msg){if(err){err.textContent=msg;err.hidden=false;}toast(msg);};
  var toggle=document.getElementById("toggle-password");
  if(toggle&&pass)toggle.addEventListener("click",function(){
   var hidden=pass.type==="password";
   pass.type=hidden?"text":"password";
   toggle.querySelector("span").textContent=hidden?"visibility_off":"visibility";
   toggle.setAttribute("aria-label",hidden?"Hide password":"Show password");
  });
  form.addEventListener("submit",function(e){
   e.preventDefault();
   if(err)err.hidden=true;
   var em=(email.value||"").trim();
   var pw=pass.value||"";
   if(!em||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){showErr("Enter a valid work email address");email.focus();return;}
   if(pw.length<8){showErr("Password must be at least 8 characters");pass.focus();return;}
   var btn=form.querySelector('button[type="submit"]');
   if(btn){btn.disabled=true;btn.classList.add("opacity-70","cursor-wait");}
   setTimeout(function(){
    setUser({email:em,since:Date.now(),remember:!!(form.querySelector('input[name="remember"]')||{}).checked});
    toast("Signed in as "+em);
    var next=new URLSearchParams(window.location.search).get("next");
    window.location.href=(next&&/^[a-z0-9-]+\.html$/i.test(next))?next:"index.html";
   },450);
  });
 }

 function highlightNav(){
  var nav=document.querySelector("header nav");
  if(!nav)return;

  var raw=window.location.pathname.split("/").pop()||"index.html";
  var path=(raw.split("?")[0].split("#")[0]||"index.html").toLowerCase();
  if(!path||path==="")path="index.html";

  // Clear previous active states
  nav.querySelectorAll(".active,.nav-active,[aria-current='page']").forEach(function(el){
   el.classList.remove("active","nav-active");
   el.removeAttribute("aria-current");
  });

  var homeBtn=nav.querySelector(".group button");
  var homeDropdown=nav.querySelector(".group .absolute");

  var isHome=(path==="index.html"||path==="home-1-variant-2.html"||path==="home-2.html"||path==="home-2-variant-2.html");

  if(isHome){
   if(homeBtn){
    homeBtn.classList.add("active","nav-active");
    homeBtn.setAttribute("aria-current","page");
   }
   if(homeDropdown){
    var isHome2=path.indexOf("home-2")!==-1;
    var targetPath=isHome2?"home-turnkey-robotics":"home-automation-projects";
    var sub=homeDropdown.querySelector('[data-path="'+targetPath+'"]');
    if(sub){sub.classList.add("active","nav-active");sub.setAttribute("aria-current","page");}
   }
  }else if(path.indexOf("service")!==-1){
   var s=nav.querySelector('a[data-path="services"]');
   if(s){s.classList.add("active","nav-active");s.setAttribute("aria-current","page");}
  }else if(path.indexOf("case-stud")!==-1||path.indexOf("hyperweld")!==-1){
   var c=nav.querySelector('a[data-path="case-studies"]');
   if(c){c.classList.add("active","nav-active");c.setAttribute("aria-current","page");}
  }else if(path.indexOf("industr")!==-1){
   var ind=nav.querySelector('a[data-path="industries-served"]');
   if(ind){ind.classList.add("active","nav-active");ind.setAttribute("aria-current","page");}
  }else if(path.indexOf("tech-spec")!==-1){
   var ts=nav.querySelector('a[data-path="tech-specs-and-lab"]');
   if(ts){ts.classList.add("active","nav-active");ts.setAttribute("aria-current","page");}
  }else if(path.indexOf("about")!==-1){
   var ab=nav.querySelector('a[data-path="about"]');
   if(ab){ab.classList.add("active","nav-active");ab.setAttribute("aria-current","page");}
  }else if(path.indexOf("contact")!==-1){
   var ct=nav.querySelector('a[data-path="contact-and-rfq"]');
   if(ct){ct.classList.add("active","nav-active");ct.setAttribute("aria-current","page");}
  }
  // Mirror the active state into the mobile drawer
  var mob=document.getElementById("mobile-nav");
  if(mob){
   mob.querySelectorAll(".active,.nav-active").forEach(function(el){el.classList.remove("active","nav-active");el.removeAttribute("aria-current");});
   var activeDesktop=nav.querySelector("a.active[data-path], .group .absolute a.active[data-path]");
   var dp=activeDesktop?activeDesktop.getAttribute("data-path"):null;
   if(isHome)dp=path.indexOf("home-2")!==-1?"home-turnkey-robotics":"home-automation-projects";
   if(dp){var m=mob.querySelector('a[data-path="'+dp+'"]:not([data-path="login"])');if(m){m.classList.add("active","nav-active");m.setAttribute("aria-current","page");}}
  }
 }

 function init(){
  updateRTLIcon();

  var themeIcon=document.getElementById("theme-icon");
  if(themeIcon){
   var saved=localStorage.getItem("nexus-theme");
   themeIcon.textContent=(saved==="light")?"light_mode":"dark_mode";
  }
  links();forms();highlightNav();auth();
 }

 if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",init);
 }else{
  init();
 }

})();
