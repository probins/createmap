import{ol as e}from"./deps.js";import r from"./olMap.js";var t=r.get();import n from"./vectors.js";var o=new e.interaction.Select({layers:n.getLayers().getArray()});t.addInteraction(o);var a,i,s=!1;export default{get:function(){return o},displayOn:function(e){i=e,s||(a=o.on("select",i))},drawOn:function(){a&&e.Observable.unByKey(a),s=!0},drawOff:function(){i&&(a=o.on("select",i)),s=!1}};