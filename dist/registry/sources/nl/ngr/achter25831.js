import e from"../../wmts.js";import t from"../../../projections/25831.js";const r=[152899.38573827292,5331303.1116642505,1117699.0743967355,6227564.86211202],o=[1e7*28e-5,5e6*28e-5,25e5*28e-5,280,140,70,1e5*28e-5,75e3*28e-5,5e4*28e-5,25e3*28e-5,2.8,1.4],S={extent:r,id:"NGR-PDOK",sourceOptions:{url:"https://geodata.nationaalgeoregister.nl/tiles/service/wmts/?",layer:"brtachtergrondkaart",matrixSet:"EPSG:25831:RWS",projection:t.projCode,style:"default",format:"image/png",attributions:'Map base: &copy; <a href="http://www.nationaalgeoregister.nl/" target="_blank">NGR/PDOK</a>'},tileGridOptions:{extent:r,sizes:[[9,-6],[17,-12],[34,-23],[85,-57],[170,-113],[339,-226],[847,-563],[1129,-751],[1694,-1126],[3387,-2252],[8466,-5629],[16932,-11257]],origin:[-2404683.40738879,8298458],resolutions:o,matrixIds:["EPSG:25831:RWS:0","EPSG:25831:RWS:1","EPSG:25831:RWS:2","EPSG:25831:RWS:3","EPSG:25831:RWS:4","EPSG:25831:RWS:5","EPSG:25831:RWS:6","EPSG:25831:RWS:7","EPSG:25831:RWS:8","EPSG:25831:RWS:9","EPSG:25831:RWS:10","EPSG:25831:RWS:11"]}};export default{getLayers:function(){return e(S)},extent:r,projCode:t.projCode,resolutions:o};