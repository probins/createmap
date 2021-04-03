import{p as e,I as t,S as i,bo as o,bE as r,a0 as a}from"./size-aa14a1dc.js";import{a as s,d as n,f as c,c as m,g as u,b as d}from"./TileImage-10f9535a.js";import"./3857-b86f3f28.js";class h extends s{constructor(o){const r=void 0!==o.hidpi&&o.hidpi;super({cacheSize:o.cacheSize,crossOrigin:"anonymous",imageSmoothing:o.imageSmoothing,opaque:!0,projection:t("EPSG:3857"),reprojectionErrorThreshold:o.reprojectionErrorThreshold,state:i.LOADING,tileLoadFunction:o.tileLoadFunction,tilePixelRatio:r?2:1,wrapX:void 0===o.wrapX||o.wrapX,transition:o.transition}),this.hidpi_=r,this.culture_=void 0!==o.culture?o.culture:"en-us",this.maxZoom_=void 0!==o.maxZoom?o.maxZoom:-1,this.apiKey_=o.key,this.imagerySet_=o.imagerySet;!function(t,i,o,r){const a=document.createElement("script"),s="olc_"+e(i);function n(){delete window[s],a.parentNode.removeChild(a)}a.async=!0,a.src=t+(-1==t.indexOf("?")?"?":"&")+(r||"callback")+"="+s;const c=setTimeout((function(){n(),o&&o()}),1e4);window[s]=function(e){clearTimeout(c),n(),i(e)},document.getElementsByTagName("head")[0].appendChild(a)}("https://dev.virtualearth.net/REST/v1/Imagery/Metadata/"+this.imagerySet_+"?uriScheme=https&include=ImageryProviders&key="+this.apiKey_+"&c="+this.culture_,this.handleImageryMetadataResponse.bind(this),void 0,"jsonp")}getApiKey(){return this.apiKey_}getImagerySet(){return this.imagerySet_}handleImageryMetadataResponse(e){if(200!=e.statusCode||"OK"!=e.statusDescription||"ValidCredentials"!=e.authenticationResultCode||1!=e.resourceSets.length||1!=e.resourceSets[0].resources.length)return void this.setState(i.ERROR);const s=e.resourceSets[0].resources[0],d=-1==this.maxZoom_?s.zoomMax:this.maxZoom_,h=this.getProjection(),l=n(h),g=this.hidpi_?2:1,p=s.imageWidth==s.imageHeight?s.imageWidth/g:[s.imageWidth/g,s.imageHeight/g],f=c({extent:l,minZoom:s.zoomMin,maxZoom:d,tileSize:p});this.tileGrid=f;const y=this.culture_,S=this.hidpi_;if(this.tileUrlFunction=m(s.imageUrlSubdomains.map((function(e){const t=[0,0,0],i=s.imageUrl.replace("{subdomain}",e).replace("{culture}",y);return function(e,o,r){if(e){u(e[0],e[1],e[2],t);let o=i;return S&&(o+="&dpi=d1&device=mobile"),o.replace("{quadkey}",function(e){const t=e[0],i=new Array(t);let o,r,a=1<<t-1;for(o=0;o<t;++o)r=48,e[1]&a&&(r+=1),e[2]&a&&(r+=2),i[o]=String.fromCharCode(r),a>>=1;return i.join("")}(t))}}}))),s.imageryProviders){const e=o(t("EPSG:4326"),this.getProjection());this.setAttributions(function(t){const i=[],o=t.viewState,n=this.getTileGrid(),c=n.getZForResolution(o.resolution,this.zDirection),m=n.getTileCoordForCoordAndZ(o.center,c)[0];return s.imageryProviders.map((function(o){let s=!1;const n=o.coverageAreas;for(let i=0,o=n.length;i<o;++i){const o=n[i];if(m>=o.zoomMin&&m<=o.zoomMax){const i=o.bbox,n=[i[1],i[0],i[3],i[2]],c=r(n,e);if(a(c,t.extent)){s=!0;break}}}s&&i.push(o.attribution)})),i.push('<a class="ol-attribution-bing-tos" href="https://www.microsoft.com/maps/product/terms.html" target="_blank">Terms of Use</a>'),i}.bind(this))}this.setState(i.READY)}}var l={getLayers:function(e){return[new d({id:e.id,preload:1/0,source:new h({key:e.apikey,imagerySet:e.imagerySet})})]}};export{l as c};