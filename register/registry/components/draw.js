'use strict';

System.register(['./draw.htm.js', './component.js', '../../ol.js', '../../olMap.js', '../../utils.js', './toolbar.js', '../../select.js', '../../vectors.js', '../../measure.js', './popup.js'], function (_export, _context) {
  var tpl, Component, ol, olMap, utils, select, vectors, measure, popup, component, map, $, overlay, joinKey, DRAWID, DECIMALS, source, features, interactions, listener, form, endCallback, i, wasDelete, wasModAtts, evtKey, op, formatType, saveall;


  function plusFunc() {
    var temp = this.parentNode.querySelector('template');
    var clone = temp.content.firstElementChild.cloneNode(true);
    $('#featureformAtts').insertBefore(clone, temp);
    var i = $('#featureformAtts').querySelectorAll('input');
    i[i.length - 2].focus(); // focus on 1st new input field
  }

  function serialise(saveType, tolerance) {
    formatType = $('#opformat').value;
    var format = vectors.getFormat(formatType);
    // draw layer
    var outFeatures = source.getFeatures();
    if (saveType == 'saveall') {
      // add features from other vector sources
      var layers = vectors.getLayers().getArray();
      layers.forEach(function (l) {
        if (l.get('id') != DRAWID) {
          outFeatures = outFeatures.concat(l.getSource().getFeatures());
        }
      });
    }
    // geometry only output only makes sense if GeoJSON and only 1 feature
    // FIXME well, all right, it could output a GeometryCollection
    var geoonly = $('#geoonly').checked && formatType == 'GeoJSON' && outFeatures.length === 1;
    function doWrite(features, reproject, geoonly) {
      var opts = {
        decimals: DECIMALS
      };
      if (reproject) {
        opts.featureProjection = map.getView().getProjection();
      }
      var out = geoonly ? format.writeGeometry(features[0].getGeometry(), opts) : format.writeFeatures(features, opts);
      return out;
    }
    var op = doWrite(outFeatures, true, geoonly);
    if (tolerance) {
      // bit long-winded to read features and write out again, but has advantages:
      // - simplify does not operate on the rendered features
      // - features are always in 4326 latlons
      // browser seems to struggle with large datasets though
      if (geoonly) {
        var feats = [new ol.Feature(format.readGeometry(op).simplify(tolerance))];
        op = doWrite(feats, false, geoonly);
      } else {
        var serFeatures = [];
        serFeatures = format.readFeatures(op);
        serFeatures.forEach(function (f) {
          f.setGeometry(f.getGeometry().simplify(tolerance));
        });
        op = doWrite(serFeatures, false, geoonly);
      }
    }
    $('#serialOP').value = op;
  }

  function changeFunction(e) {
    // clear any selected features
    features.clear();
    // set any previously active interactions inactive
    for (var i in interactions) {
      interactions[i].setActive(false);
    }
    // ... and clicked one active
    if (interactions[e.target.value]) {
      interactions[e.target.value].setActive(true);
    }

    // if delete, add listener to delete from source and select when selected
    if (e.target.value == 'deleet') {
      evtKey = features.on('add', function (e) {
        select.get().getLayer(e.element).getSource().removeFeature(e.element);
        features.clear();
      });
      wasDelete = true;
    } else if (wasDelete) {
      ol.Observable.unByKey(evtKey);
      wasDelete = false;
    }

    if (e.target.value == 'hide' || e.target.value == 'choose') {
      select.drawOff();
      if (e.target.value == 'hide') {
        this.style.display = 'none';
        $('#drawoption').style.display = 'block';
        $('#drawoption').value = 'redraw';
        $('#drawtype').value = 'choose';
      }
    } else {
      select.drawOn();
    }

    if (['point', 'ls', 'poly'].indexOf(e.target.value) == -1) {
      select.get().setActive(true);
    } else {
      // no select while drawing
      select.get().setActive(false);
    }

    if (e.target.value == 'modAtts') {
      evtKey = features.on('add', function (e) {
        var el = overlay.getElement();
        // may be featuredisplay present
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
        el.appendChild(form.cloneNode(true));

        var feature = e.element;
        $('#featureformid').value = feature.getId();
        // display existing atts
        var atts = feature.getProperties();
        var attsDiv = $('#featureformAtts');
        for (var att in atts) {
          if (att != 'geometry') {
            var clone = attsDiv.querySelector('template').content.firstElementChild.cloneNode(true);
            var inputs = clone.querySelectorAll('input');
            inputs[0].value = att;
            inputs[1].value = atts[att];
            attsDiv.insertBefore(clone, attsDiv.firstElementChild);
          }
        }
        // use onclick rather than addEventListener so only 1 active
        $('#plusbutton').onclick = plusFunc;
        $('#featurebutton').onclick = function () {
          feature.setId($('#featureformid').value);
          var divs = $('#featureformAtts').querySelectorAll('div');
          for (var i = 0; i < divs.length; i++) {
            var inputs = divs[i].querySelectorAll('input');
            if (inputs[1].value) {
              feature.set(inputs[0].value, inputs[1].value);
            } else {
              // delete attribute if value cleared
              feature.unset(inputs[0].value);
            }
          }
          el.style.display = 'none';
          // move feature to draw layer if not already there
          var layer = select.get().getLayer(feature);
          if (layer.get('id') !== DRAWID) {
            layer.getSource().removeFeature(feature);
            source.addFeatures([feature]);
          }
        };
        overlay.setPosition(map.getView().getCenter());
        el.style.display = 'block';
      });
      wasModAtts = true;
    } else if (wasModAtts) {
      ol.Observable.unByKey(evtKey);
      wasModAtts = false;
    }

    if (e.target.value == 'save' || e.target.value == 'saveall') {
      saveall = e.target.value;
      serialise(saveall);
    }

    if (e.target.value == 'split') {
      var origCoords;
      select.get().once('select', function (evt) {
        // this bit can be removed once modify event returns modified vertex
        if (evt.selected[0]) {
          origCoords = evt.selected[0].getGeometry().getCoordinates();
        }
      });
      interactions.split.once('modifyend', function (evt) {
        var f = evt.features.item(0);
        var modCoords = f.getGeometry().getCoordinates();
        // return true/false whether val is in arr
        function check(arr, val) {
          return arr.some(function (arrval) {
            // have to convert to strings as arrays won't be equal
            return val.toString() == arrval.toString();
          });
        }
        var i = 0;
        // compare each new coord with original until find non-match
        while (i < modCoords.length && check(origCoords, modCoords[i]) == true) {
          i++;
        }
        var part1 = modCoords.slice(0, i + 1); // include the new coord in both parts
        var part2 = modCoords.slice(i);
        var atts = f.getProperties();
        atts.geometry = new ol.geom.LineString(part1);
        var f1 = new ol.Feature(atts);
        atts.geometry = new ol.geom.LineString(part2);
        var f2 = new ol.Feature(atts);
        // effectively, this moves a split feature on layer other than draw layer to the draw layer
        source.addFeatures([f1, f2]);
        select.get().getLayer(f).getSource().removeFeature(f);
        features.clear();
        e.target.value = 'choose';
        changeFunction(e);
      });
    }

    if (e.target.value == 'join') {
      joinKey = select.get().on('select', function (evt) {
        if (features.getLength() == 2) {
          var f1 = features.item(0);
          var f2 = features.item(1);
          var atts = f1.getProperties();
          atts.geometry = new ol.geom.LineString(f1.getGeometry().getCoordinates().concat(f2.getGeometry().getCoordinates().slice(1)));
          var f3 = new ol.Feature(atts);
          features.clear();
          // effectively, this moves the joined feature on layer other than draw layer to the draw layer
          select.get().getLayer(f2).getSource().removeFeature(f2);
          select.get().getLayer(f1).getSource().removeFeature(f1);
          source.addFeatures([f3]);
        }
      });
    } else if (joinKey) {
      ol.Observable.unByKey(joinKey);
      joinKey = null;
    }

    if (e.target.value == 'clear') {
      source.clear();
    }

    this.blur();
  }

  // add helptemplate to toolbar
  return {
    setters: [function (_drawHtmJs) {
      tpl = _drawHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }, function (_toolbarJs) {}, function (_selectJs) {
      select = _selectJs.default;
    }, function (_vectorsJs) {
      vectors = _vectorsJs.default;
    }, function (_measureJs) {
      measure = _measureJs.default;
    }, function (_popupJs) {
      popup = _popupJs.default;
    }],
    execute: function () {
      component = new Component(tpl, 'draw');
      map = olMap.get();
      $ = utils.$;


      // add drawtemplate to map
      // use ol.control to prevent event propagation
      map.addControl(new ol.control.Control({ element: component.getTemplate('draw') }));

      overlay = popup.getOverlay();
      DRAWID = 'Drawn';
      DECIMALS = 6;
      // coordinate decimal places, used by save

      // add a vector layer/source
      // FIXME enable drawing on existing layers
      vectors.add({ vectors: [{ id: DRAWID }] });
      source = vectors.getLayers().item(vectors.getLayers().getLength() - 1).getSource();
      features = select.get().getFeatures();
      interactions = {
        point: new ol.interaction.Draw({
          source: source,
          type: 'Point'
        }),
        ls: new ol.interaction.Draw({
          source: source,
          type: 'LineString'
        }),
        poly: new ol.interaction.Draw({
          source: source,
          type: 'Polygon'
        }),
        modify: new ol.interaction.Modify({
          features: features
        }),
        split: new ol.interaction.Modify({
          features: features,
          deleteCondition: ol.events.condition.never
        })
      };
      form = component.getTemplate('featureform');

      endCallback = function (e) {
        var el = overlay.getElement();
        // may be featuredisplay present
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
        el.appendChild(form.cloneNode(true));
        // initialise displayed atts
        $('#featureformid').value = '';
        $('#plusbutton').onclick = plusFunc;
        // use onclick rather than addEventListener so only 1 active
        $('#featurebutton').onclick = function () {
          if ($('#featureformid').value) {
            e.feature.setId($('#featureformid').value);
          }
          var divs = $('#featureformAtts').querySelectorAll('div');
          for (var i = 0; i < divs.length; i++) {
            var inputs = divs[i].querySelectorAll('input');
            // only set attribute if there is a key
            if (inputs[0].value) {
              e.feature.set(inputs[0].value, inputs[1].value);
            }
          }
          el.style.display = 'none';
        };
        overlay.setPosition(map.getView().getCenter());
        el.style.display = 'block';
        $('#featureformid').focus();
        if (listener) {
          ol.Observable.unByKey(listener);
        }
      };

      interactions.point.on('drawend', endCallback);
      interactions.ls.on('drawend', endCallback);
      interactions.poly.on('drawend', endCallback);

      interactions.ls.on('drawstart', function (evt) {
        var tooltipCoord = evt.coordinate;
        listener = evt.feature.getGeometry().on('change', function (evt) {
          tooltipCoord = evt.target.getLastCoordinate();
          var length = measure.getLength(evt.target, map.getView().getProjection());
          overlay.getElement().innerHTML = Math.round(length * 0.1) / 100 + ' ' + 'km';
          overlay.setPosition(tooltipCoord);
          overlay.getElement().style.display = 'block';
        });
      });
      interactions.poly.on('drawstart', function (evt) {
        var tooltipCoord = evt.coordinate;
        listener = evt.feature.getGeometry().on('change', function (evt) {
          tooltipCoord = evt.target.getInteriorPoint().getCoordinates();
          var area = measure.getArea(evt.target, map.getView().getProjection());
          overlay.getElement().innerHTML = Math.round(area / 1000000 * 100) / 100 + ' ' + 'km<sup>2</sup>';
          overlay.setPosition(tooltipCoord);
          overlay.getElement().style.display = 'block';
        });
      });

      interactions.modify.on('modifyend', function (evt) {
        // move modified feature to draw layer if not already there
        // FIXME: this is not very satisfactory, as is triggered on every vertex move/delete/add
        var f = evt.features.item(0);
        var layer = select.get().getLayer(f);
        if (layer.get('id') !== DRAWID) {
          layer.getSource().removeFeature(f);
          source.addFeatures([f]);
        }
      });

      // interactions inactive until clicked
      for (i in interactions) {
        map.addInteraction(interactions[i]);
        interactions[i].setActive(false);
      }

      wasDelete = false;
      wasModAtts = false;
      op = component.getTemplate('serialise');

      $('#toolbar').appendChild(op);

      // add toggle listener to toolbartitle div
      $('#serialise-title').addEventListener('click', function () {
        // toggle display of next, i.e. content, element
        var el = this.nextElementSibling;
        el.style.display = el.style.display == 'block' ? 'none' : 'block';
      });

      formatType = 'GeoJSON';

      $('#reserialise').onclick = function (e) {
        serialise(saveall, $('#tolerance').value);
      };

      $('#download').onclick = function (e) {
        var mediaTypes = {
          GeoJSON: 'application/vnd.geo+json',
          GPX: 'application/gpx+xml',
          KML: 'application/vnd.google-earth.kml+xml',
          mongo: 'application/json'
        };
        e.target.href = 'data:' + mediaTypes[formatType] + ';charset=utf-8,' + encodeURIComponent($('#serialOP').value);
        var ext = formatType == 'mongo' ? 'json' : formatType.toLowerCase();
        e.target.download = 'myGeoData.' + ext;
      };$('#drawtype').onchange = changeFunction;$('#help-content').appendChild(component.getTemplate('drawhelp'));
      // add toggle listener to helptitle div
      $('#draw-title').addEventListener('click', function () {
        // toggle display of next, i.e. content, element
        var el = this.nextElementSibling;
        el.style.display = el.style.display == 'block' ? 'none' : 'block';
      });
    }
  };
});