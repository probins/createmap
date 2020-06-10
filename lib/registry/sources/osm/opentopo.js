/**
 * OpenTopoMap http://opentopomap.org
 * Code: osm/opentopo
 * EPSG:3857
 * FIXME: attribution fixed in English
 */
import getLayers from '../common.js';

const options = {
 type: "XYZ",
 id: 'OpenTopoMap',
 sourceOptions: {
   url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
   attributions: 'Map base © OpenStreetMap-Contributors, SRTM © <a target="_blank" ' +
           'href="http://opentopomap.org/">OpenTopoMap</a> (CC-BY-SA)'
 }
};

export default {
 getLayers: function() {
   return getLayers(options);
 },
 resolutions: [78271.51696402048,39135.75848201024,19567.87924100512,9783.93962050256,
     4891.96981025128,2445.98490512564,1222.99245256282,611.49622628141,
     305.748113140705,152.8740565703525,76.43702828517625, 38.21851414258813,
     19.109257071294063, 9.554628535647032, 4.777314267823516]
};
