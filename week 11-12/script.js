var nav=document.getElementById("nav"),last="",secs=[].slice.call(document.querySelectorAll("section"));
secs.forEach(function(s){var g=s.dataset.g;if(g!==last){var h=document.createElement("h4");h.textContent=g;nav.appendChild(h);last=g}
var a=document.createElement("a");a.href="#"+s.id;a.textContent=s.querySelector("h2").textContent;nav.appendChild(a)});
var links=[].slice.call(nav.querySelectorAll("a"));
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle("on",l.getAttribute("href")==="#"+e.target.id)})}})},{rootMargin:"-20% 0px -70% 0px"});
secs.forEach(function(s){io.observe(s)});
document.getElementById("t").onclick=function(){var r=document.documentElement,d=r.dataset.theme==="dark"||(!r.dataset.theme&&matchMedia("(prefers-color-scheme:dark)").matches);r.dataset.theme=d?"light":"dark"};
