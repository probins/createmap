import t from"../../wms.js";import o from"../../../projections/25831.js";const e=[258e3,4485e3,536e3,4752e3],r=[1100,550,275,100,50,25,10,5,2,1,.5,.25],s={id:"Catalan topos",sourceOptions:{url:"https://geoserveis.icgc.cat/map/bases/service?",attributions:'Cartographic base from <a target="_blank" href="https://www.icgc.cat/">Institut Cartogràfic de Catalunya</a>',params:{VERSION:"1.1.1",LAYERS:"topo"},projection:o.projCode},tileGridOptions:{resolutions:r,extent:e}};export default{getLayers:function(){return t(s)},extent:e,projCode:o.projCode,resolutions:r};