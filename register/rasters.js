'use strict';

System.register(['./ol.js', './olMap.js', './registry/components/layerswitcher.js', './registry/components/zoom.js', './utils.js'], function (_export, _context) {
  var ol, olMap, switcher, zoom, utils, map, $;


  function getLayers() {
    return map.getLayers().item(0).getLayers();
  }

  function switcherHandler(evt) {
    // click may be on label or checkbox
    var target = document.getElementById(evt.target.htmlFor) || evt.target;
    if (!target.value) {
      return; // do nothing if not label or checkbox
    }
    // 'this' is map
    var layerChange = changeLayer.bind(this);
    layerChange(target.value);
  }

  function changeLayer(newRaster) {
    // uses 'views' as closure
    // 'this' is map
    var layerArray = this.getLayers().item(0).getLayers().getArray();
    var oldLayers = layerArray.filter(function (l) {
      return l.activeLayer === true;
    });
    var newLayers = layerArray.filter(function (l) {
      return l.getProperties().id == newRaster;
    });
    oldLayers.forEach(function (l) {
      l.setVisible(false);
      l.activeLayer = false;
    });
    newLayers.forEach(function (l) {
      l.setVisible(true);
      l.activeLayer = true;
    });
    var newProjCode = newLayers[0].getSource().getProjection().getCode();
    var vectorLayers = this.getLayers().item(1).getLayers();
    // 4326 if vectors only
    var defaultCode = vectorLayers.getLength() === 0 ? '' : 'EPSG:4326';
    var oldProjCode = oldLayers[0] ? oldLayers[0].getSource().getProjection().getCode() : defaultCode;
    if (newProjCode != oldProjCode) {
      // new projection, so change view and reproject vectors
      var newExtent;
      if (oldProjCode !== '') {
        var oldExtent = this.getView().calculateExtent(this.getSize());
        newExtent = ol.proj.transformExtent(oldExtent, oldProjCode, newProjCode);
        vectorLayers.forEach(function (l) {
          l.getSource().getFeatures().forEach(function (f) {
            f.getGeometry().transform(oldProjCode, newProjCode);
          });
        });
      }
      // no projected cursorposition if 4326
      var projCursor = $('.projcursor');
      if (projCursor) {
        projCursor.style.display = newProjCode == 'EPSG:4326' ? 'none' : '';
      }
      this.setView(olMap.views[newProjCode]);
      zoom.setZooms();
      if (oldProjCode !== '') {
        this.getView().fit(newExtent, this.getSize());
      }
    }
  }

  /**
   * params: array of raster modules
   *         options (zoom, rasters for apikey;
   *                  createView uses zoom, center, rotation (only on startup))
   *         all optional
   * needs ol, views, createView, getLayers, switcher, switcherHandler
   */
  function add(rasters, options) {
    options = options || {};
    rasters.forEach(function (raster, i) {
      raster = raster.default;
      // create view for projection
      var projCode = raster.projCode || 'EPSG:3857';
      var views = olMap.views;
      if (!views[projCode]) {
        // assumes all layers for 1 projection have same extent/resolutions
        views[projCode] = olMap.createView(options, projCode, raster.extent, raster.resolutions);
        // ol doesn't export, so need to add to check entered coords/zoom
        views[projCode].extent = raster.extent || ol.proj.transformExtent([-180, -85, 180, 85], 'EPSG:4326', projCode);
        views[projCode].zoomLevels = raster.resolutions ? raster.resolutions.length : 20;
        if (raster.resolutions) {
          // closest resolution to 5 should be zoomIn
          var closest = raster.resolutions.reduce(function (prev, curr) {
            return Math.abs(curr - 5) < Math.abs(prev - 5) ? curr : prev;
          });
          views[projCode].zoomIn = raster.resolutions.indexOf(closest);
        } else {
          views[projCode].zoomIn = 15;
        }
      }
      // raster may be an object with api key
      var apikey, key;
      if (options.rasters && typeof options.rasters[i] === 'object') {
        for (key in options.rasters[i]) {
          apikey = options.rasters[i][key];
        }
      }
      var layers = raster.getLayers({
        zoom: options.zoom,
        apikey: apikey
      }); // zoom may be needed to set param
      // a raster def may have >1 layer, but if so all should be treated as 1
      layers.forEach(function (layer) {
        // set layers invisible to start with
        layer.setVisible(false);
        layer.activeLayer = false;
        // add layer to map
        getLayers().push(layer);
      });

      // add to layerswitcher
      var div = switcher.addRasterDiv(layers[0]);
      div.addEventListener('click', switcherHandler.bind(map));

      if (raster.viewEvent) {
        views[projCode].on(raster.viewEvent.type, raster.viewEvent.func);
      }
    });
  }

  function makeActiveLayerVisible() {
    // may be >1
    getLayers().forEach(function (l) {
      if (l.activeLayer === true) {
        l.setVisible(true);
      }
    });
  }

  return {
    setters: [function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_registryComponentsLayerswitcherJs) {
      switcher = _registryComponentsLayerswitcherJs.default;
    }, function (_registryComponentsZoomJs) {
      zoom = _registryComponentsZoomJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }],
    execute: function () {
      map = olMap.get();
      $ = utils.$;

      _export('default', {
        addInitial: function (rasters, options) {
          add(rasters, options);
          var projCode = rasters[0].default.projCode || 'EPSG:3857';
          map.setView(olMap.views[projCode]);
          getLayers().item(0).activeLayer = true;
          zoom.setZooms();
          if (!options.vectors) {
            // if no vectors, make 1st raster visible
            makeActiveLayerVisible();
          }
        },

        add: add,
        changeLayer: changeLayer,

        makeActiveLayerVisible: makeActiveLayerVisible,

        getLayers: getLayers
      });
    }
  };
});