import e from"../../../ext/ol.js";import o from"../../projections/3912.js";var r=[369832.5829557097,25060.632245599554,630781.624406076,207724.961260856];var t=[300,150,50,25,10,5];var a="raster_gurs_pub:SI.GURS.RASTRI.";var i=[a+"DPK1000",a+"DPK1000",a+"DPK500",a+"DPK250",a+"DTK50",a+"DTK50"];var s={url:"http://prostor4.gov.si:80/ows2-m-pub/wms?",params:{VERSION:"1.3",LAYERS:i[0]},attributions:'Topo maps &copy; <a target="_blank" href="http://e-prostor.gov.si/">Geodetska uprava RS</a>',extent:r,projection:o.projCode,tileGrid:new e.tilegrid.TileGrid({extent:r,resolutions:t})};var n=new e.layer.Tile({source:new e.source.TileWMS(s),id:"Slovenian Geoportal"});export default{getLayers:function(e){if(e){if(e.zoom){n.get("source").updateParams({LAYERS:i[e.zoom]})}}return[n]},extent:r,projCode:o.projCode,resolutions:t,viewEvent:{type:"change:resolution",func:function(e){var o=t.indexOf(e.target.get("resolution"));n.get("source").updateParams({LAYERS:i[o]})}}};