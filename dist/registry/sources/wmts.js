import{WMTSTileGrid as e,TileLayer as t,WMTS as i}from"../../deps.js";export default function(n){return n.sourceOptions.tileGrid=new e(n.tileGridOptions),[new t({id:n.id,extent:n.extent,source:new i(n.sourceOptions)})]}