import t from"../../../../ext/ol.js";var e="EPSG:3857",r=[-20037508.342789244,-20037508.342789244,20037508.342789244,20037508.342789244],o=[4891.96981025128,2445.98490512564,1222.99245256282,611.49622628141,305.7481131407048,152.8740565703525,76.43702828517624,38.21851414258813,19.10925707129406,9.554628535647032,4.777314267823516];export default{getLayers:function(i){return[new t.layer.Tile({source:new t.source.WMTS({url:"https://wxs.ign.fr/"+i.apikey+"/wmts",layer:"GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR40",matrixSet:"PM",projection:e,tileGrid:new t.tilegrid.WMTS({origin:[r[0],r[3]],resolutions:o,matrixIds:[5,6,7,8,9,10,11,12,13,14,15]}),style:"normal",attributions:'Map base: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank">'+'<img src="https://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a>'+'<a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf"'+'alt="TOS" title="TOS" target="_blank">Terms of Service</a>'}),id:"Etat Major"})]},extent:r,projCode:e,resolutions:o};