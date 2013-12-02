/** 
 * OS OpenSpace WMS
 * EPSG:27700
 */

var ol = require('ol');
// FIXME
window.Proj4js = require('proj');

var extent = [0, 0, 800000, 1300000],
    projCode = 'EPSG:27700';
window.Proj4js.defs[projCode] = '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717' +
    ' +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs';
var sourceOptions = {
    url: 'http://openspace.ordnancesurvey.co.uk/osmapapi/ts',
    params: {
        'VERSION': '1.1.1',
        'LAYERS': '200', // initial value; see view resolution below
        'KEY': '5A4E80E3BABD59F6E0405F0AF1604498',
        // hack: c9.io is https and doesn't send referrer
        'URL': document.URL.indexOf('c9.io') ? 'http://localhost/map.html' : document.URL
    },
    attributions: [new ol.Attribution({
        html: 'Topo maps &copy; Crown copyright and database rights ' + 
            new Date().getFullYear() + 
            ' <span style="white-space: nowrap;">Ordnance Survey.</span>' +
            '&nbsp;&nbsp;<span style="white-space: nowrap;">' +
            '<a href="http://openspace.ordnancesurvey.co.uk/openspace/developeragreement.html#enduserlicense"' +
            'target="_blank">End User License Agreement</a></span>'
    })],
    logo: 'http://openspace.ordnancesurvey.co.uk/osmapapi/img_versions/img_4.0.0/OS/poweredby_free.png',
    extent: extent
};

/**
 * OpenSpace has non-standard WMS setup, so must create two layers/sources,
 * one for 200x200 tilegrid, one for 250x250 tilegrid
 * resolution determines which one is requested
 * layer vars used by view listener - see below
 */
sourceOptions.tileGrid = new ol.tilegrid.TileGrid({
    resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5],
    origin: [0, 0],
    tileSize: [200, 200]
});
var l200 = new ol.layer.Tile({
    source: new ol.source.TileWMS(sourceOptions),
    minResolution: 5,
    id: 'OpenSpace'
});
sourceOptions.tileGrid = new ol.tilegrid.TileGrid({
    resolutions: [2, 1],
    origin: [0, 0],
    tileSize: [250, 250]
});
var l250 = new ol.layer.Tile({
    source: new ol.source.TileWMS(sourceOptions),
    maxResolution: 5,
    id: 'OpenSpace'
});

module.exports = {
  getLayers: function() {
    // FIXME id and attribution fixed in English
    // add both layers
    return [l200, l250];
  },
  extent: extent,
  projCode: projCode,
  resolutions: [2500, 1000, 500, 200, 100, 50, 25, 10, 5, 2, 1],
  // listener fired whenever view resolution changes
  viewEvent: {
    type: 'change:resolution',
    func: function(evt) {
      // LAYERS param on source has to be set to resolution
      // l200/l250 closures
      var res = evt.target.getResolution();
      if (res > 2) {
        l200.getSource().updateParams({LAYERS: res});
      } else {    
        l250.getSource().updateParams({LAYERS: res});
      }
    }
  }
};