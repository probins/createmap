'use strict';

System.register(['../../../../ol.js'], function (_export, _context) {
  var ol, projCode, extent, resolutions;
  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }],
    execute: function () {
      projCode = 'EPSG:3857';
      extent = [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244];
      resolutions = [4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141, 305.7481131407048, 152.8740565703525, 76.43702828517624, 38.21851414258813, 19.10925707129406, 9.554628535647032, 4.777314267823516];

      _export('default', {
        // apikey should be passed in the options object
        getLayers: function (options) {
          return [new ol.layer.Tile({
            source: new ol.source.WMTS({
              url: 'https://wxs.ign.fr/' + options.apikey + '/wmts',
              layer: 'GEOGRAPHICALGRIDSYSTEMS.CASSINI',
              matrixSet: 'PM',
              projection: projCode,
              tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(extent),
                resolutions: resolutions,
                matrixIds: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
              }),
              style: 'normal',
              attributions: 'Map base: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank">' + '<img src="https://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a>' + '<a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf"' + 'alt="TOS" title="TOS" target="_blank">Terms of Service</a>'
            }),
            id: 'Cassini'
          })];
        },
        extent: extent,
        projCode: projCode,
        resolutions: resolutions
      });
    }
  };
});