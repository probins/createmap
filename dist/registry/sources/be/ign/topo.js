import e from"../../common.js";import t from"../../../projections/3812.js";const o=[45e4,515e3,8e5,8e5],r=[3779761.90476*28e-5,1889880.95238*28e-5,755952.380952*28e-5,472470.238095*28e-5,236235.119048*28e-5,94494.047619*28e-5,47247.0238095*28e-5,23623.5119048*28e-5,9449.4047619*28e-5,4724.70238095*28e-5,2362.35119048*28e-5];const i={type:"WMTS",extent:o,id:"NGI/IGN Cartoweb Topo",sourceOptions:{url:"https://www.ngi.be/cartoweb/1.0.0/topo/{style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png",layer:"topo",matrixSet:"3812",projection:t.projCode,style:"default",requestEncoding:"REST",attributions:'Map base: &copy;NGI/IGN <a href="http://www.ngi.be/cartoweb/" target="_blank">'+"Cartoweb</a>"},tileGridOptions:{extent:o,sizes:[[8,-8],[8,-8],[8,-8],[16,-16],[32,-32],[64,-64],[128,-128],[256,-256],[512,-512],[1024,-1024],[2048,-2048]],origin:[o[0],o[3]],resolutions:r,matrixIds:[0,1,2,3,4,5,6,7,8,9,10]}};export default{getLayers:function(){return e(i)},extent:o,projCode:t.projCode,resolutions:r};