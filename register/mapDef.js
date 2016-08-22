'use strict';

System.register([], function (_export, _context) {
  var mapDef, options, mapDefUrl, mapdefElement;

  // if mapDefUrl, will be fetched by init()

  function parseElement(mapdefElement) {
    var options = {},
        children = mapdefElement.children;
    for (var i = 0; i < children.length; i++) {
      var pair = [children[i].localName, children[i].innerHTML];
      options = parseOption(options, pair);
    }
    return options;
  }

  function parseQueryString() {
    var options = {},
        pair;
    var qs = window.location.search.substring(1).split('&');
    qs.forEach(function (part) {
      pair = part.split('=');
      options = parseOption(options, pair);
    });
    return options;
  }

  function parseOption(options, pair) {
    var rasters, vectors;
    switch (pair[0]) {
      case 'rasters':
      case 'r':
        // can be comma-separated list
        options.rasters = [];
        rasters = pair[1].split(',');
        rasters.forEach(function (r) {
          // can be JSON object string: {name:api}
          var p = r.indexOf('{') === -1 ? r : JSON.parse(decodeURIComponent(r));
          options.rasters.push(p);
        });
        break;
      case 'lat':
        options.lat = parseFloat(pair[1]);
        break;
      case 'lon':
        options.lon = parseFloat(pair[1]);
        break;
      case 'zoom':
      case 'z':
        options.zoom = parseFloat(pair[1]);
        break;
      case 'components':
      case 'c':
        // can be comma-separated list
        options.components = pair[1].split(',');
        break;
      case 'vectors':
      case 'v':
        // first remove whitespace (replace with space as otherwise strips space from strings)
        pair[1] = pair[1].replace(/\s+/g, ' ');
        // string can be stringified JSON array with JSON object(s),
        // or simple string for 1 file with no extra params
        if (pair[1].indexOf('[') != -1) {
          vectors = JSON.parse(decodeURIComponent(pair[1]));
        } else {
          vectors = [pair[1]];
        }
        options.vectors = [];
        vectors.forEach(function (v) {
          var out;
          // can be JSON object string
          if (typeof v === 'string') {
            out = {
              url: v,
              id: v
            };
          } else {
            // object with url and optionally id/attribution/style/type
            out = {
              url: v.url
            };
            out.id = v.id || v.url;
            if (v.attribution) {
              out.attribution = v.attribution;
            }
            if (v.style) {
              out.style = v.style;
            }
            if (v.format) {
              out.format = v.format;
            }
            if (v.strategy) {
              out.strategy = v.strategy;
            }
          }
          options.vectors.push(out);
        });
        break;
      default:
        // will catch mapDef
        options[pair[0]] = pair[1];
    }
    return options;
  }

  function set(def) {
    mapDef = def;
  }

  return {
    setters: [],
    execute: function () {
      options = {};
      mapdefElement = document.querySelector('mapdef');

      if (mapdefElement) {
        options = parseElement(mapdefElement);
      } else if (window.location.search) {
        options = parseQueryString();
      }
      if (options.lat && options.lon) {
        options.center = {
          lat: options.lat,
          lon: options.lon
        };
      }
      // mapDef url
      if (options && options.mapDef) {
        mapDefUrl = options.mapDef;
      }

      // if no options, set default projCode
      if (!mapDefUrl) {
        set(options || {
          projCode: 'EPSG:4326'
        });
      }
      _export('default', {
        // initialise mapDef, fetching url if needed, and returns Promise with options
        init: function () {
          return new Promise(function (resolve, reject) {
            if (mapDefUrl) {
              // must be CORS-enabled
              fetch(decodeURIComponent(mapDefUrl)).then(function (response) {
                return response.json();
              }).then(function (opts) {
                set(opts);
                resolve(opts);
              }).catch(function () {
                reject();
              });
            } else {
              resolve(mapDef);
            }
          });
        },

        get: function () {
          return mapDef;
        },

        set: set
      });
    }
  };
});