import e from"../../utils.js";var t=e.$;import o from"../../ext/ol.js";import r from"../../olMap.js";var a=r.get();import i from"../../vectors.js";import l from"./serialise.htm.js";import n from"./component.js";var s=new n(l);import"./toolbar.js";t("#toolbar").appendChild(s.getTemplate("serialise"));var c=6;var m="GeoJSON";t("#serialise-title").addEventListener("click",(function(){var e=this.nextElementSibling;e.style.display=e.style.display=="block"?"none":"block"}));var f,p;t("#reserialise").onclick=function(e){v(f,p,t("#tolerance").value)};t("#download").onclick=function(e){var o={GeoJSON:"application/vnd.geo+json",GPX:"application/gpx+xml",KML:"application/vnd.google-earth.kml+xml",mongo:"application/json"};e.target.href="data:"+o[m]+";charset=utf-8,"+encodeURIComponent(t("#serialOP").value);var r=m=="mongo"?"json":m.toLowerCase();e.target.download="myGeoData."+r};function v(e,r,l){m=t("#opformat").value;var n=i.getFormat(m);var s=i.getLayers().getArray();var f=[];s.forEach((function(t){if(e=="saveall"||t.get("id")==r){f=f.concat(t.get("source").getFeatures())}}));var v=t("#geoonly").checked&&m=="GeoJSON"&&f.length===1;function g(e,t,o){var r={decimals:c};if(t){r.featureProjection=a.get("view").getProjection()}var i=o?n.writeGeometry(e[0].getGeometry(),r):n.writeFeatures(e,r);return i}var u=g(f,true,v);if(l){if(v){var d=[new o.Feature(n.readGeometry(u).simplify(l))];u=g(d,false,v)}else{var y=[];y=n.readFeatures(u);y.forEach((function(e){e.setGeometry(e.getGeometry().simplify(l))}));u=g(y,false,v)}}t("#serialOP").value=u;p=r}export default v;