import e from"../../wmts.js";import t from"../../../projections/21781.js";const o=[42e4,3e4,9e5,35e4],s=[500,250,100,50,20,10,5,2.5,2],i={extent:o,id:"Swiss Topo",sourceOptions:{url:"https://wmts{0-4}.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/20151231/21781/{TileMatrix}/{TileRow}/{TileCol}.jpeg",layer:"ch.swisstopo.pixelkarte-farbe",matrixSet:"21781",projection:t.projCode,style:"default",requestEncoding:"REST",attributions:'Topomaps &copy; <a target="_blank" href="http://www.swisstopo.admin.ch/internet/swisstopo/en/home/products/services/web_services/webaccess.html">swisstopo</a>'},tileGridOptions:{extent:o,resolutions:s,matrixIds:[15,16,17,18,19,20,21,22,23]}};export default{getLayers:function(){return e(i)},extent:o,projCode:t.projCode,resolutions:s};