import e from"./geolocation.htm.js";import t from"./component.js";var o=new t(e,"geolocation");import{Overlay as i,transform as n}from"../../deps.js";import r from"../../olMap.js";var a=r.get(),l=o.getTemplate("geolocation");r.addControl(l);import s from"../../utils.js";var g=s.$,c="Unable to retrieve your location",m="Position outside map extent",p="Geolocation is not supported by your browser",d=(l=o.getTemplate("geomarker")).getElementById("geomarker"),v=new i({positioning:"center-center",element:d});a.addOverlay(v),g("#geolocationbutton").addEventListener("click",(function(){navigator.geolocation?navigator.geolocation.getCurrentPosition((function(e){var t=[parseFloat(e.coords.longitude),parseFloat(e.coords.latitude)];t=n(t,"EPSG:4326",a.get("view").getProjection());var o=a.get("view").extent;if(o[0]<=t[0]&&t[0]<=o[2]&&o[1]<=t[1]&&t[1]<=o[3]){a.get("view").setCenter(t),a.get("view").setZoom(a.get("view").zoomIn);var i=e.heading?e.heading-45:-45;d.firstChild.style.transform="rotate("+i+"deg)",v.set("position",t)}else alert(m)}),(function(){alert(c)})):alert(p)}));import"./toolbar.js";g("#help-content").appendChild(o.getTemplate("geolocationhelp")),g("#geolocation-title").addEventListener("click",(function(){var e=this.nextElementSibling;e.style.display="block"==e.style.display?"none":"block"}));