!function(){function e(){var e="registry/",o=e+"components/",r=e+"projections/",t=e+"sources/",a=".js",s={"map-make.js":["utils"+a,"mapDef"+a],"olMap.js":["ol"+a],"rasters.js":["ol"+a,"olMap"+a,o+"layerswitcher"+a,o+"zoom"+a,"utils"+a],"select.js":["ol"+a,"olMap"+a,"vectors"+a],"vectors.js":["ol"+a,"olMap"+a,o+"layerswitcher"+a,"rasters"+a,"mongo"+a]},n=["be/ign/topo","ch/topo/pixel","cz/zm","de/bkg/atlasde","es/icc/topo","es/ign/mapas","es/ign/mtn","gb/os","nl/ngr/achter","pt/dgt/sc","si/gurs","srtm/laea"],i=["3812","21781","32633","25832","25831","25830","25830","27700","28992","3763","3912","3035"];n.forEach(function(e,o){s[t+e+a]=[r+i[o]+a]});var l="common"+a;s[r+l]=[r+"proj4"+a],i.splice(5,1),i.forEach(function(e){s[r+e+a]=[r+l]}),["addlayer","center","draw","featuredisplay","geolocation","mapdef","cursorposition","layerswitcher","placesearch","popup","toolbar","tooltip","zoom"].forEach(function(e){s[o+e+a]=[o+"component"+a,o+e+".htm"+a]}),s[o+"toolbar"+a].push("olMap"+a),s[o+"toolbar"+a].push(o+"slideout.min"+a),["draw","featuredisplay"].forEach(function(e){s[o+e+a].push("select"+a),s[o+e+a].push(o+"popup"+a),s[o+e+a].push("measure"+a)}),s[o+"tooltip"+a].push("measure"+a),s[o+"tooltip"+a].push("vectors"+a),["addlayer","center","draw","geolocation","mapdef","layerswitcher","placesearch"].forEach(function(e){s[o+e+a].push(o+"toolbar"+a)});var c=s[o+"addlayer"+a];return c=c.concat(["awesomplete"+a,"rasters"+a,"vectors"+a,"olMap"+a]),s}function o(){if(t){var o=new window.SystemRegisterLoader(document.baseURI);System.loader=o}else window.System=window.System||{},System.loader={import:function(e){return new Promise(function(o,t){function a(){o(),i()}function n(){i(),t(new Error("Loading "+e))}function i(){r.removeEventListener("load",a,!1),r.removeEventListener("error",n,!1),s.removeChild(r)}r=document.createElement("script"),r.type="module",r.src=e,r.addEventListener("load",a,!1),r.addEventListener("error",n,!1),s.appendChild(r)})}};var a=e();System.sourceList=l+"registry/sources/list.json",System.importModule=function(e){var o=function(e){a[e]&&a[e].forEach(function(e){o(e),System.loader.import(l+e)})};return o(e),System.loader.import(l+e)},System.importModule("map-make.js").catch(function(e){console.log(e),System.error=!0,document.body.innerHTML="Error reading map-make.js"})}var r,t=!0,a={tag:"1.0.0",registerTag:"1.0.0",css:"css/map-make.css",loaderpolyfill:"loaderpolyfill.js",fetchpromise:"https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Promise"},s=document.getElementsByTagName("head")[0];window.Promise&&window.fetch||(r=document.createElement("script"),r.src=a.fetchpromise,s.appendChild(r));var n=document.getElementsByTagName("script")[0],i=n.getAttribute("src"),l=i.substring(0,i.lastIndexOf("/")+1),c=JSON.parse(n.getAttribute("data-configVars"));for(var d in c)switch(d){case"registerTag":a.registerTag=c[d];break;case"css":a.css=c[d];break;case"baseURL":l=c[d];break;case"loaderpolyfill":a.loaderpolyfill=c[d]}0===l.indexOf(".")&&(l=new URL(l,document.baseURI).href),l.indexOf("master")!==-1&&(l=l.replace("master",a.tag),l=l.replace("rawgit","cdn.rawgit"));var p=document.createElement("link");p.rel="stylesheet",p.href=0==a.css.indexOf("h")?a.css:l+a.css,p.onload=function(){var e=document.createElement("div");e.id="status",e.innerHTML='<i class="fa fa-spinner fa-pulse fa-5x"></i>',document.body.appendChild(e)},s.appendChild(p),t&&(l=l.replace("map-make","map-make-register").replace("master",a.registerTag)),window.addEventListener("load",function(){t?(r=document.createElement("script"),r.src=0==a.loaderpolyfill.indexOf("h")?a.loaderpolyfill:l+a.loaderpolyfill,r.onload=o,document.body.appendChild(r)):o()})}();