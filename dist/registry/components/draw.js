import e from"./draw.htm.js";import t from"./component.js";var r=new t(e,"draw");import a from"../../ext/ol.js";import o from"../../olMap.js";var n=o.get();import i from"../../utils.js";var l=i.$;import"./toolbar.js";n.addControl(new a.control.Control({element:r.getTemplate("draw")}));import s from"../../select.js";import u from"../../vectors.js";import g from"../../measure.js";import f from"./popup.js";var d=f.getOverlay();var v;var c="Drawn";u.add({vectors:[{id:c}]});var m=u.getLayers().item(u.getLayers().get("length")-1).get("source");var y=s.get().getFeatures();var p={point:new a.interaction.Draw({source:m,type:"Point"}),ls:new a.interaction.Draw({source:m,type:"LineString"}),poly:new a.interaction.Draw({source:m,type:"Polygon"}),modify:new a.interaction.Modify({features:y}),split:new a.interaction.Modify({features:y,deleteCondition:function(){return false}})};var w;var h=r.getTemplate("featureform");function C(){var e=this.parentNode.querySelector("template");var t=e.content.firstElementChild.cloneNode(true);l("#featureformAtts").insertBefore(t,e);var r=l("#featureformAtts").querySelectorAll("input");r[r.length-2].focus()}var b=function(e){var t=d.get("element");while(t.firstChild){t.removeChild(t.firstChild)}t.appendChild(h.cloneNode(true));l("#featureformid").value="";l("#plusbutton").onclick=C;l("#featurebutton").onclick=function(){if(l("#featureformid").value){e.feature.setId(l("#featureformid").value)}var r=l("#featureformAtts").querySelectorAll("div");for(var a=0;a<r.length;a++){var o=r[a].querySelectorAll("input");if(o[0].value){e.feature.set(o[0].value,o[1].value)}}t.style.display="none"};d.set("position",n.get("view").get("center"));t.style.display="block";l("#featureformid").focus();if(w){a.Observable.unByKey(w)}};p.point.on("drawend",b);p.ls.on("drawend",b);p.poly.on("drawend",b);p.ls.on("drawstart",(function(e){var t=e.coordinate;w=e.feature.getGeometry().on("change",(function(e){t=e.target.getLastCoordinate();var r=g.getLength(e.target,n.get("view").getProjection());d.get("element").innerHTML=Math.round(r*.1)/100+" "+"km";d.set("position",t);d.get("element").style.display="block"}))}));p.poly.on("drawstart",(function(e){var t=e.coordinate;w=e.feature.getGeometry().on("change",(function(e){t=e.target.getInteriorPoint().getCoordinates();var r=g.getArea(e.target,n.get("view").getProjection());d.get("element").innerHTML=Math.round(r/1e6*100)/100+" "+"km<sup>2</sup>";d.set("position",t);d.get("element").style.display="block"}))}));p.modify.on("modifyend",(function(e){var t=e.features.item(0);var r=s.get().getLayer(t);if(r.get("id")!==c){r.get("source").removeFeature(t);m.addFeatures([t]);y.clear()}}));var L;for(L in p){n.addInteraction(p[L]);p[L].set("active",false)}var S=false,j=false,k;l("#drawtype").onchange=F;function F(e){y.clear();for(var t in p){p[t].set("active",false)}if(p[e.target.value]){p[e.target.value].set("active",true)}if(e.target.value=="deleet"){k=y.on("add",(function(e){s.get().getLayer(e.element).get("source").removeFeature(e.element);y.clear()}));S=true}else if(S){a.Observable.unByKey(k);S=false}if(e.target.value=="hide"||e.target.value=="choose"){s.drawOff();if(e.target.value=="hide"){this.style.display="none";l("#drawoption").style.display="block";l("#drawoption").value="redraw";l("#drawtype").value="choose"}}else{s.drawOn()}if(["point","ls","poly"].indexOf(e.target.value)==-1){s.get().set("active",true)}else{s.get().set("active",false)}if(e.target.value=="modAtts"){k=y.on("add",(function(e){var t=d.get("element");while(t.firstChild){t.removeChild(t.firstChild)}t.appendChild(h.cloneNode(true));var r=e.element;l("#featureformid").value=r.getId();var a=r.getProperties();var o=l("#featureformAtts");for(var i in a){if(i!="geometry"){var u=o.querySelector("template").content.firstElementChild.cloneNode(true);var g=u.querySelectorAll("input");g[0].value=i;g[1].value=a[i];o.insertBefore(u,o.firstElementChild)}}l("#plusbutton").onclick=C;l("#featurebutton").onclick=function(){r.setId(l("#featureformid").value);var e=l("#featureformAtts").querySelectorAll("div");for(var a=0;a<e.length;a++){var o=e[a].querySelectorAll("input");if(o[1].value){r.set(o[0].value,o[1].value)}else{r.unset(o[0].value)}}t.style.display="none";var n=s.get().getLayer(r);if(n.get("id")!==c){n.get("source").removeFeature(r);m.addFeatures([r])}};d.set("position",n.get("view").get("center"));t.style.display="block"}));j=true}else if(j){a.Observable.unByKey(k);j=false}if(e.target.value=="save"||e.target.value=="saveall"){import("./serialise.js").then((function(t){t.default(e.target.value,c)}))}if(e.target.value=="split"){var r;s.get().once("select",(function(e){if(e.selected[0]){var t=e.selected[0].getGeometry();if(t.getType()&&t.getType()=="LineString"){r=t.getCoordinates()}else if(t.getType()&&t.getType()=="MultiLineString"&&t.getCoordinates().length===1){r=t.getCoordinates()[0]}}}));p.split.once("modifyend",(function(t){var o=t.features.item(0);if(!o.getGeometry().getType()){return}var n=o.getGeometry().getType();var i=o.getGeometry().getCoordinates();if(n==="MultiLineString"){if(i.length===1){i=i[0]}else{return}}function l(e,t){return e.some((function(e){return t.toString()==e.toString()}))}var u=0;while(u<i.length&&l(r,i[u])===true){u++}var g=i.slice(0,u+1);var f=i.slice(u);var d=o.getProperties();d.geometry=new a.geom.LineString(g);var v=new a.Feature(d);d.geometry=new a.geom.LineString(f);var c=new a.Feature(d);m.addFeatures([v,c]);s.get().getLayer(o).get("source").removeFeature(o);y.clear();e.target.value="choose";F(e)}))}if(e.target.value=="join"){v=s.get().on("select",(function(e){if(y.get("length")==2){var t=y.item(0);var r=y.item(1);var o=t.getProperties();o.geometry=new a.geom.LineString(t.getGeometry().getCoordinates().concat(r.getGeometry().getCoordinates().slice(1)));var n=new a.Feature(o);y.clear();s.get().getLayer(r).get("source").removeFeature(r);s.get().getLayer(t).get("source").removeFeature(t);m.addFeatures([n])}}))}else if(v){a.Observable.unByKey(v);v=null}if(e.target.value=="clear"){m.clear()}l("#drawtype").blur()}l("#help-content").appendChild(r.getTemplate("drawhelp"));l("#draw-title").addEventListener("click",(function(){var e=this.nextElementSibling;e.style.display=e.style.display=="block"?"none":"block"}));