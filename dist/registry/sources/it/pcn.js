import e from"../../../ext/ol.js";var t=[6,36,19,48];var i=[.02,.007,.002,7e-4,4e-4,2e-4,1e-4,5e-5,25e-6,1e-5];var o="http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/";var a=["de_agostini","de_agostini","de_agostini","de_agostini","de_agostini","IGM_100000","IGM_100000","IGM_25000","IGM_25000","IGM_25000"];var n=["CB.DEAGOSTINI","CB.DEAGOSTINI","CB.DEAGOSTINI","CB.DEAGOSTINI","CB.DEAGOSTINI","MB.IGM100000","MB.IGM100000","CB.IGM25000","CB.IGM25000","CB.IGM25000"];var r={url:o+a[0]+".map",params:{LAYERS:n[0]},attributions:'De Agostini and IGM topo maps &copy; <a target="_blank" href="http://www.pcn.minambiente.it/PCN/">PCN</a>',extent:t,projection:"EPSG:4326",tileGrid:new e.tilegrid.TileGrid({extent:t,resolutions:i})};var s=new e.layer.Tile({source:new e.source.TileWMS(r),id:"Italian Geoportal"});function I(e){s.get("source").updateParams({LAYERS:n[e]});s.get("source").setUrl(o+a[e]+".map")}export default{getLayers:function(e){if(e){if(e.zoom){I(e.zoom)}}return[s]},extent:t,projCode:"EPSG:4326",resolutions:i,viewEvent:{type:"change:resolution",func:function(e){I(i.indexOf(e.target.get("resolution")))}}};