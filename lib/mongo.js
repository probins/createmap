/**
 * Handles read/write for flat GeoJSON files like those from MongoDB.
 * Considered creating a custom OL format inheriting from GeoJSON, but
 * loadingstrategy needs non-exported values, and generally more trouble than worth.
 */
import Feature from "ol/Feature.js";
import GeoJSON from "ol/format/GeoJSON.js";

// import { Feature, GeoJSON } from './deps.js';

export default {
  /**
   * params: input: array of Mongo documents (or stringified version);
   *         opts: like Format with FeatureProjection
   * returns: array of ol features
   */
  readFeatures: function(input, opts) {
    if (typeof input === 'string') {
      input = JSON.parse(input);
    }
    const features = [];
    input.forEach(r => {
      const feature = new Feature();
      for (const key in r) {
        if (key == 'id') {
          feature.setId(r[key]);
        // geometry not necessarily called 'geometry' but has type/coordinates
        } else if (r[key] && r[key].type && r[key].coordinates) {
          let geom = new ol[r[key].type](r[key].coordinates);
          if (opts && opts.featureProjection) {
            geom.transform('EPSG:4326', opts.featureProjection);
          }
          feature.setGeometry(geom);
        } else {
          feature.set(key, r[key]);
        }
      }
      features.push(feature);
    });
    return features;
  },

  /**
   * uses GeoJSON to output features, and then rearranges so properties top-level
   * params: input: array of ol features; opts: like Format with FeatureProjection
   * returns: stringified array of Mongo documents (always in 4326)
   */
  writeFeatures: function(input, opts) {
    const out = [];
    const geojson = new GeoJSON();
    const features = JSON.parse(geojson.writeFeatures(input, opts)).features;
    features.forEach(f => {
      const feature = {
        id: f.id,
        geometry: f.geometry
      };
      for (const key in f.properties) {
        feature[key] = f.properties[key];
      }
      out.push(feature);
    });
    return JSON.stringify(out);
  }
};
