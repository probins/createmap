import e from"../common.js";import t from"../../projections/32633.js";const o=[271930.2144491256,5341447.773120532,785000.2936808998,5698085.940216799],r=[3657600*28e-5,1828800*28e-5,914400*28e-5,457200*28e-5,228600*28e-5,114300*28e-5,57150*28e-5,28575*28e-5,14287.5*28e-5,7143.75*28e-5,3571.875*28e-5];const s={type:"WMTS",extent:o,id:"ČÚZK (CZ)",sourceOptions:{url:"http://geoportal-zm.cuzk.cz/WMTS_ZM/service.svc/get?",layer:"zm",matrixSet:"wgs84:utm33n:epsg:32633",projection:t.projCode,style:"default",attributions:'Map base: &copy; <a href="http://geoportal.cuzk.cz/" target="_blank">'+"ČÚZK</a>"},tileGridOptions:{extent:o,sizes:[[2,-2],[4,-4],[8,-8],[16,-16],[32,-32],[64,-64],[128,-128],[256,-256],[512,-512],[1024,-1024],[2048,-2048]],origin:[262118.06551807,5711442.06004913],resolutions:r,matrixIds:[1,2,3,4,5,6,7,8,9,10,11]}};export default{getLayers:function(){return e(s)},extent:o,projCode:t.projCode,resolutions:r};