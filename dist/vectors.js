import{Circle as e,Fill as t,GeoJSON as r,GPX as o,KML as i,Stroke as n,Style as l,transformExtent as a,VectorLayer as s,VectorSource as f}from"./deps.js";import c from"./olMap.js";let g=c.get();import d from"./registry/components/layerswitcher.js";import u from"./utils.js";import m from"./rasters.js";import y from"./mongo.js";const p=u.$;let h={normal:{stroke:{color:"rgba(0, 0, 255, 0.6)",width:3},fill:{color:"rgba(255, 255, 255, 0.6)"},image:{radius:7,fillColor:"#ffcc33"}},highlight:{stroke:{color:"rgba(255, 0, 0, 0.6)",width:3},fill:{color:"rgba(255, 0, 0, 0.1)"},image:{radius:7,fillColor:"#ffcc33"}}};function x(e){return{GeoJSON:new r,GPX:new o,KML:new i,mongo:y}[e]}function b(){return g.getLayers().item(1).get("layers")}function w(e){let t=document.getElementById(e.target.htmlFor)||e.target;this.getLayers().item(1).get("layers").getArray().filter((function(e){return e.getProperties().id==t.value}))[0].set("visible",t.checked)}function F(e){e.vectors.forEach((t=>{let r,o=t.url,i={featureProjection:g.get("view").getProjection()},n={attributions:t.attribution||""},l=o||t.filename;if(l&&!t.format){const e={geojson:"GeoJSON",gpx:"GPX",kml:"KML"};let t=l.substring(l.lastIndexOf(".")+1);r=e[t]}r=t.format||r,r&&(n.format=x(r)),t.file?n.features=n.format.readFeatures(t.file,i):o&&(t.strategy&&"bbox"==t.strategy&&(n.strategy=function(e,t){return[e]}),n.loader=function(e,l,s){if(t.strategy&&"bbox"==t.strategy){let r=a(e,s,"EPSG:4326");o=t.url+[[r[0].toFixed(6),r[1].toFixed(6)],[r[2].toFixed(6),r[1].toFixed(6)],[r[2].toFixed(6),r[3].toFixed(6)],[r[0].toFixed(6),r[3].toFixed(6)],[r[0].toFixed(6),r[1].toFixed(6)]].join("],[")+"]]]}}}}"}fetch(o).then((function(e){return"GeoJSON"==r||"mongo"==r?e.json():e.text()})).then((function(e){let r=n.format.readFeatures(e,i);b().getArray().filter((function(e){return e.getProperties().id==t.id}))[0].get("source").addFeatures(r)})).catch((function(){u.errors.fetchFail()}))});let c=new f(n);!0!==t.add||!o||t.strategy&&"bbox"==t.strategy||c.once("change",(function(e){g.get("view").fit(e.target.getExtent())}));let m,y={source:c,id:t.id||o},F={};for(m in h.normal)F[m]=h.normal[m];if(t.style)for(m in t.style)F[m]=t.style[m];h[y.id]=F,y.style=function(e){return k(y.id,e)};let v=new s(y);b().push(v),!0===t.add&&t.file&&g.get("view").fit(c.getExtent()),t.noDisplay&&v.set("visible",!1);let j=d.addVectorDiv(t);if(j[0].addEventListener("click",w.bind(g)),j[1]){let t=e.components||[];-1==t.indexOf("popup")&&(p("#featuredisplayoption").style.display="block"),-1==t.indexOf("tooltip")&&(p("#tooltipoption").style.display="block")}}))}function k(r,o){let i={width:h[r].stroke.width,color:h[r].stroke.color,lineDash:h[r].stroke.lineDash};["color","width","lineDash"].forEach((e=>{if(Array.isArray(i[e])){let t=o.get(i[e][0]);"object"==typeof i[e][1]?i[e]=i[e][1][t]:i[e]=t==i[e][1]?i[e][2]:i[e][3]}}));let a=h[r].image.fillColor;return Array.isArray(a)&&(a=o.get(a[0])==a[1]?a[2]:a[3]),new l({stroke:new n(i),fill:new t(h[r].fill),image:new e({radius:h[r].image.radius,fill:new t({color:a})})})}export default{addInitial:function(e){F(e),e.center||e.zoom?e.rasters&&m.makeActiveLayerVisible():function(){let e=b().getArray(),t=[1/0,1/0,-1/0,-1/0],r=0,o=function(o){var i,n;i=t,(n=o.target.getExtent())[0]<i[0]&&(i[0]=n[0]),n[2]>i[2]&&(i[2]=n[2]),n[1]<i[1]&&(i[1]=n[1]),n[3]>i[3]&&(i[3]=n[3]),r++,r==e.length&&(g.get("view").fit(t),m.makeActiveLayerVisible(),p("#status").style.display="none")};e.forEach((e=>{e.get("source").once("change",o)}))}(),e.rasters||c.use4326View()},add:F,getFormat:x,getLayers:b,getStyle:k};