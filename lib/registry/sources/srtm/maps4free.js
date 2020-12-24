/**
 * Maps-for-free SRTM Relief http://maps-for-free.com/
 * Code: srtm/maps4free
 * EPSG:3857
 * does not appear to be accessible via https
 * FIXME: attribution and id English
 */
import getLayers from '../xyz.js';
import proj from '../../projections/3857.js';

const options = {
  id: 'Relief',
  sourceOptions: {
    url: 'http://maps-for-free.com/layer/relief/z{z}/row{y}/{z}_{x}-{y}.jpg',
    attributions: 'SRTM relief maps from <a target="_blank" ' +
        'href="http://maps-for-free.com/">maps-for-free.com</a>'
  }
};

export default {
  getLayers: function() {
    return getLayers(options);
  },
  resolutions: [78271.51696402048,39135.75848201024,19567.87924100512,9783.93962050256,
      4891.96981025128,2445.98490512564,1222.99245256282,611.49622628141,
      305.748113140705,152.8740565703525,76.43702828517625]
};
