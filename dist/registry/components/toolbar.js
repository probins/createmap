import t from"./toolbar.htm.js";import e from"./component.js";var o=new e(t);import l from"../../olMap.js";l.get();import n from"../../utils.js";var r=n.$;import i from"../../mapDef.js";var a,s=i.get();import c from"./ext/slideout.min.js";var p=o.getTemplate("toolbar"),d=p.querySelectorAll(".toolbartitle"),m=function(){var t=this.nextElementSibling;t.style.display="block"==t.style.display?"none":"block"};for(a=0;a<d.length;a++)d[a].addEventListener("click",m);var u=function(){var t=this.getAttribute("id").replace("button","");import("./"+t+".js"),this.style.display="none",this.removeEventListener("click",u)},y=p.querySelectorAll(".addbutton");for(a=0;a<y.length;a++){var g=y[a].getAttribute("id").replace("button","");s.components&&s.components[g]||y[a].addEventListener("click",u)}if(!s.vectors)for(y=p.querySelectorAll(".vectorOption"),a=0;a<y.length;a++)y[a].style.display="none";for(d=p.querySelectorAll(".helptitle"),m=function(){var t=this.nextElementSibling;t.style.display="block"==t.style.display?"none":"block"},a=0;a<d.length;a++)d[a].addEventListener("click",m);document.body.appendChild(p),r("#addcomponent").onchange=function(t){"choose"!==t.target.value&&("redraw"==t.target.value?(r("#drawtype").style.display="block",r("#drawoption").style.display="none"):(import("./"+t.target.value+".js"),r("#"+t.target.value+"option").style.display="none"),this.value="choose",this.blur())};let v=o.getTemplate("toggle");l.addControl(v);var b=new c({panel:r("#map"),menu:r("#toolbar"),touch:!1});r("#slide-toggle").addEventListener("click",(function(){b.toggle()}));export default r("#toolbar");