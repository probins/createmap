/**
 * SRTM Relief in LAEA EPSG:3035
 * Code: srtm/laea
 * FIXME: attribution English
 */
import { ol } from '../../../deps.js';
import proj from '../../projections/3035.js';

var extent = [2409891.715, 1328424.080, 6143417.136, 5330401.505],
    resolutions = [4000, 3000, 2000, 1000];

export default {
  getLayers: function() {
    return [new ol.layer.Tile({
      source: new ol.source.TileImage({
        projection: proj.projCode,
        tileGrid: new ol.tilegrid.TileGrid({
          extent: extent,
          tileSize: [200, 200],
          origin: [extent[0], extent[1]],
          resolutions: resolutions
        }),
        tileUrlFunction: function(coordinate) {
          return 'https://maps.peterrobins.co.uk/srtm/3035/' + coordinate[0] +
              '/' + coordinate[1] + '/' + coordinate[2] + '.png';
        },
        attributions: 'SRTM30 data from <a href="http://www2.jpl.nasa.gov/srtm/" target="_blank">NASA/JPL</a>'
      }),
      extent: extent,
      id: 'SRTM LAEA'
    })];
  },
  extent: extent,
  projCode: proj.projCode,
  resolutions: resolutions
};
