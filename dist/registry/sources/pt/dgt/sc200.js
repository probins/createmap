import e from"../../../../ext/ol.js";import r from"../../../projections/3763.js";var t=[-17e4,-325e3,18e4,29e4];var o=[2382.8125,1191.40625,595.703125,297.8515625,148.92578125,74.462890625,37.2314453125,18.61572265625,9.307861328125,4.6539306640625,2.32696533203125,1.163482666015625,.5817413330078125];var s=["sc2500k","sc2500k","sc1500k","sc1500k","sc1500k","sc500k","sc200k","sc200k","sc100k","sc100k","sc50k","sc50k"];var i="http://mapas.dgterritorio.pt/wms/";var a={url:"http://mapas.dgterritorio.pt/viz/tilecache.py?",params:{LAYERS:"sc200k"},attributions:'Topo maps &copy; <a target="_blank" href="http://mapas.dgterritorio.pt/">DGT</a>',extent:t,projection:r.projCode,tileGrid:new e.tilegrid.TileGrid({extent:t,origin:[-2094936,-1145454],resolutions:o})};var c=new e.layer.Tile({source:new e.source.TileWMS(a),id:"DGT (PT)"});function p(e){c.get("source").updateParams({LAYERS:s[e]});c.get("source").setUrl(i+s[e]+"?")}export default{getLayers:function(e){if(e){if(e.zoom){p(e.zoom)}}return[c]},extent:t,projCode:r.projCode,resolutions:o};