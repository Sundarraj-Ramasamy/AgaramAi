const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-BeYYuZqt.js","assets/vendor-DXg09-4o.js","assets/ui-BIl4LLWh.js","assets/About-6WaCUW8G.js","assets/Articles-4UUhz-YZ.js","assets/Resources-BEB_HZL1.js","assets/Contact-Bvd7qkNF.js","assets/api-BBlVZFXw.js","assets/Contact-btV8oQCK.css","assets/NotFound-B9uCFZre.js","assets/AdminLogin-DfGl8CVu.js","assets/AdminDashboard-DsHvZiHM.js","assets/Videos-C5DDuu-W.js","assets/Videos-Cf6_zfT6.css","assets/AICook-DpJLECT7.js","assets/AICook-ChX2w2EA.css"])))=>i.map(i=>d[i]);
import{a as e,b as t,g as n,r as o,L as i,R as r,c as s,d as a,B as l}from"./vendor-DXg09-4o.js";import{d as c}from"./ui-BIl4LLWh.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)}).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var d,u,m={exports:{}},h={};var p,g=(u||(u=1,m.exports=function(){if(d)return h;d=1;var t=e(),n=Symbol.for("react.element"),o=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,r=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function a(e,t,o){var a,l={},c=null,d=null;for(a in void 0!==o&&(c=""+o),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)i.call(t,a)&&!s.hasOwnProperty(a)&&(l[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps)void 0===l[a]&&(l[a]=t[a]);return{$$typeof:n,type:e,key:c,ref:d,props:l,_owner:r.current}}return h.Fragment=o,h.jsx=a,h.jsxs=a,h}()),m.exports),f={};const x=n(function(){if(p)return f;p=1;var e=t();return f.createRoot=e.createRoot,f.hydrateRoot=e.hydrateRoot,f}()),j={},b=function(e,t,n){let o=Promise.resolve();if(t&&t.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:"fulfilled",value:e}),e=>({status:"rejected",reason:e}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),i=n?.nonce||n?.getAttribute("nonce");o=e(t.map(e=>{if((e=function(e){return"/AgaramAi/"+e}(e))in j)return;j[e]=!0;const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${n}`))return;const o=document.createElement("link");return o.rel=t?"stylesheet":"modulepreload",t||(o.as="script"),o.crossOrigin="",o.href=e,i&&o.setAttribute("nonce",i),document.head.appendChild(o),t?new Promise((t,n)=>{o.addEventListener("load",t),o.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}function i(e){const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(const e of t||[])"rejected"===e.status&&i(e.reason);return e().catch(i)})},y=()=>{const e=o.useRef(null),t=o.useRef(null),{width:n}=(()=>{const[e,t]=o.useState({width:"undefined"!=typeof window?window.innerWidth:0,height:"undefined"!=typeof window?window.innerHeight:0});return o.useEffect(()=>{const e=()=>{t({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),e})(),r=n<=768,[s,a]=o.useState(n>768),l=()=>{r&&a(!1)};return g.jsxs("header",{children:[g.jsx("a",{href:"#main-content",className:"skip-link",children:"Skip to main content"}),g.jsx("h1",{children:"Welcome to AgaramAi"}),g.jsx("button",{ref:t,onClick:()=>{a(e=>!e)},"aria-label":"Toggle navigation menu","aria-expanded":s,"aria-controls":"main-nav",style:{display:r?"block":"none"},className:"menu-toggle",children:"☰"}),g.jsx("nav",{ref:e,id:"main-nav",className:s?"open":"",style:{display:s?"block":"none"},"aria-label":"Main navigation",children:g.jsxs("ul",{children:[g.jsx("li",{children:g.jsx(i,{to:"/",onClick:l,children:"Home"})}),g.jsx("li",{children:g.jsx(i,{to:"/about",onClick:l,children:"About"})}),g.jsx("li",{children:g.jsx(i,{to:"/articles",onClick:l,children:"Articles"})}),g.jsx("li",{children:g.jsx(i,{to:"/resources",onClick:l,children:"Resources"})}),g.jsx("li",{children:g.jsx(i,{to:"/contact",onClick:l,children:"Contact"})}),g.jsx("li",{children:g.jsx(i,{to:"/videos",onClick:l,children:"Videos"})}),g.jsx("li",{children:g.jsx(i,{to:"/ai-cook",onClick:l,children:"AI Cook"})}),g.jsx("li",{children:g.jsx(i,{to:"/admin",onClick:l,children:"Admin"})})]})}),g.jsx("button",{className:"top-icon",onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},"aria-label":"Scroll to top",title:"Back to top",children:"↑"})]})},w=()=>g.jsx("footer",{className:"footer",children:g.jsx("div",{className:"footer-content",children:g.jsxs("p",{children:["© ",(new Date).getFullYear()," AgaramAi. All rights reserved."]})})}),v=c.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #0d344d;
  padding: 1.25rem;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
  z-index: 1000;
  color: #fff;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.875rem;
  }

  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`,_=c.button`
  margin: 0 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #ff8c00;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #ff6f00;
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
    background-color: #ff6f00;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    margin: 0.25rem;
  }
`,k=c.button`
  margin: 0 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: #999;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #777;
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
    background-color: #777;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    margin: 0.25rem;
  }
`,A=(e,t,n=365)=>{const o=new Date;o.setTime(o.getTime()+24*n*60*60*1e3);const i=`expires=${o.toUTCString()}`;document.cookie=`${e}=${t};${i};path=/`},E=()=>{const[e,t]=o.useState(!1);o.useEffect(()=>{function e(){window.dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],window.gtag=e,e("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied"})},[]),o.useEffect(()=>{null===(e=>{const t=`${e}=`,n=document.cookie.split(";");for(let o of n)if(o=o.trim(),0===o.indexOf(t))return o.substring(t.length);return null})("consent-banner-visible")&&t(!0)},[]);return e&&g.jsxs(v,{role:"banner","aria-label":"Cookie consent banner",children:[g.jsx("p",{children:"We use cookies and other tracking technologies to improve your browsing experience on our website. By interacting with this banner, you consent to our use of these technologies."}),g.jsx(_,{onClick:()=>{window.gtag&&window.gtag("consent","update",{ad_storage:"granted",ad_user_data:"granted",ad_personalization:"granted",analytics_storage:"granted"}),(()=>{const e=document.createElement("script");function t(){window.dataLayer.push(arguments)}e.async=!0,e.src="https://www.googletagmanager.com/gtag/js?id=G-4BLR5M35JS",document.head.appendChild(e),window.dataLayer=window.dataLayer||[],window.gtag=t,t("js",new Date),t("config","G-4BLR5M35JS")})(),t(!1),A("consent-banner-visible","granted",365)},children:"Accept"}),g.jsx(k,{onClick:()=>{window.gtag&&window.gtag("consent","update",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied"}),t(!1),A("consent-banner-visible","denied",365)},children:"Cancel"})]})},C={"What is AgaramAi?":"AgaramAi is a cutting-edge AI solutions company specializing in machine learning, artificial intelligence, and intelligent automation. We help businesses leverage AI to solve complex problems and drive innovation.","What services do you offer?":"We offer a range of services including machine learning model development, AI consulting, data analytics, natural language processing, computer vision solutions, and custom AI applications tailored to your business needs.","How can AI help my business?":"AI can help your business by automating processes, improving decision-making through data insights, enhancing customer experience, reducing operational costs, and creating new revenue opportunities through intelligent solutions.","What is machine learning?":"Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without explicit programming. It uses algorithms to analyze data and make predictions or decisions automatically.","Do you provide training?":"Yes! We offer training programs and workshops on AI, machine learning, and data science. You can contact us through our contact form to discuss customized training solutions for your team.","How do I get started?":"To get started with AgaramAi, simply fill out our contact form with your requirements, and our team will reach out to discuss your project needs and provide tailored solutions.","What is NLP?":"Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret, and generate human language. It's used in chatbots, sentiment analysis, translation, and text mining.","What is computer vision?":"Computer vision is an AI field that enables machines to interpret and analyze visual information from images and videos. It's used in facial recognition, object detection, medical imaging, and autonomous vehicles.","How do you ensure data security?":"Data security is our top priority. We follow industry best practices, implement encryption, comply with regulations like GDPR, and maintain strict access controls to protect your sensitive information."},L=()=>{const[e,t]=o.useState(!1),[n,i]=o.useState([{id:1,type:"bot",text:"Hello! Welcome to AgaramAi. How can I help you today? Select a question below or type your own."}]),[r,s]=o.useState(""),[a,l]=o.useState(Object.keys(C).slice(0,3)),c=o.useRef(null);o.useEffect(()=>{c.current?.scrollIntoView({behavior:"smooth"})},[n]);const d=e=>{const t=e.toLowerCase(),n=Object.keys(C);for(let s of n)if(s.toLowerCase()===t)return C[s];let o=null,i=0;const r=t.split(/\s+/);for(let s of n){const e=s.toLowerCase().split(/\s+/),t=r.filter(t=>e.some(e=>e.includes(t)||t.includes(e))).length;t>i&&(i=t,o=s)}return i>0&&o?C[o]:"I'm not sure about that. Feel free to ask about our services, machine learning, AI solutions, or contact us directly for more detailed information."},u=(e=r)=>{if(!e.trim())return;const t={id:n.length+1,type:"user",text:e};i(e=>[...e,t]),s(""),setTimeout(()=>{const t={id:n.length+2,type:"bot",text:d(e)};i(e=>[...e,t]);const o=Object.keys(C).sort(()=>Math.random()-.5).slice(0,3);l(o)},500)};return g.jsxs(g.Fragment,{children:[g.jsx("button",{className:"chatbot-floating-button",onClick:()=>t(!e),"aria-label":e?"Close chatbot":"Open chatbot",title:"Chat with us",children:g.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:g.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"})})}),g.jsxs("div",{className:"chatbot-container "+(e?"open":""),children:[g.jsxs("div",{className:"chatbot-header",children:[g.jsx("h3",{children:"AgaramAi Assistant"}),g.jsx("button",{className:"chatbot-close",onClick:()=>t(!1),"aria-label":"Close chatbot",children:"×"})]}),g.jsxs("div",{className:"chatbot-messages",children:[n.map(e=>g.jsx("div",{className:`message ${e.type}`,role:"bot"===e.type?"region":"status","aria-label":"bot"===e.type?"Bot message":"Your message",children:g.jsx("div",{className:"message-content",children:e.text})},e.id)),g.jsx("div",{ref:c})]}),n.length<=3&&g.jsxs("div",{className:"chatbot-suggestions",children:[g.jsx("p",{className:"suggestions-label",children:"Quick questions:"}),a.map((e,t)=>g.jsx("button",{className:"suggestion-button",onClick:()=>(e=>{u(e)})(e),children:e},t))]}),g.jsxs("div",{className:"chatbot-input-area",children:[g.jsx("input",{type:"text",className:"chatbot-input",placeholder:"Ask a question...",value:r,onChange:e=>s(e.target.value),onKeyPress:e=>{"Enter"===e.key&&u()},"aria-label":"Chat input"}),g.jsx("button",{className:"chatbot-send",onClick:()=>u(),"aria-label":"Send message",children:g.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[g.jsx("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),g.jsx("polygon",{points:"22 2 15 22 11 13 2 9 22 2"})]})})]}),n.length>3&&g.jsx("button",{className:"chatbot-reset",onClick:()=>{i([{id:1,type:"bot",text:"Hello! Welcome to AgaramAi. How can I help you today? Select a question below or type your own."}]);const e=Object.keys(C).sort(()=>Math.random()-.5).slice(0,3);l(e),s("")},"aria-label":"Reset conversation",children:"Start New Conversation"})]})]})},I=r.lazy(()=>b(()=>import("./Home-BeYYuZqt.js"),__vite__mapDeps([0,1,2]))),N=r.lazy(()=>b(()=>import("./About-6WaCUW8G.js"),__vite__mapDeps([3,1,2]))),R=r.lazy(()=>b(()=>import("./Articles-4UUhz-YZ.js"),__vite__mapDeps([4,1,2]))),O=r.lazy(()=>b(()=>import("./Resources-BEB_HZL1.js"),__vite__mapDeps([5,1,2]))),S=r.lazy(()=>b(()=>import("./Contact-Bvd7qkNF.js"),__vite__mapDeps([6,1,7,2,8]))),z=r.lazy(()=>b(()=>import("./NotFound-B9uCFZre.js"),__vite__mapDeps([9,1,2]))),P=r.lazy(()=>b(()=>import("./AdminLogin-DfGl8CVu.js"),__vite__mapDeps([10,1,7,2]))),T=r.lazy(()=>b(()=>import("./AdminDashboard-DsHvZiHM.js"),__vite__mapDeps([11,1,7,2]))),D=r.lazy(()=>b(()=>import("./Videos-C5DDuu-W.js"),__vite__mapDeps([12,1,2,13]))),W=r.lazy(()=>b(()=>import("./AICook-DpJLECT7.js"),__vite__mapDeps([14,1,2,15]))),V=()=>g.jsx("div",{className:"loading",children:"Loading..."}),H=()=>g.jsxs("div",{className:"App",children:[g.jsx(y,{}),g.jsx("main",{className:"content",id:"main-content",children:g.jsx(o.Suspense,{fallback:g.jsx(V,{}),children:g.jsxs(s,{children:[g.jsx(a,{path:"/",element:g.jsx(I,{})}),g.jsx(a,{path:"/about",element:g.jsx(N,{})}),g.jsx(a,{path:"/articles",element:g.jsx(R,{})}),g.jsx(a,{path:"/resources",element:g.jsx(O,{})}),g.jsx(a,{path:"/contact",element:g.jsx(S,{})}),g.jsx(a,{path:"/videos",element:g.jsx(D,{})}),g.jsx(a,{path:"/admin",element:g.jsx(P,{})}),g.jsx(a,{path:"/admin/dashboard",element:g.jsx(T,{})}),g.jsx(a,{path:"/videos",element:g.jsx(D,{})}),g.jsx(a,{path:"/ai-cook",element:g.jsx(W,{})}),g.jsx(a,{path:"*",element:g.jsx(z,{})})]})})}),g.jsx(w,{}),g.jsx(E,{}),g.jsx(L,{})]});x.createRoot(document.getElementById("root")).render(g.jsx(r.StrictMode,{children:g.jsx(l,{children:g.jsx(H,{})})}));export{g as j};
