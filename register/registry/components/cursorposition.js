'use strict';

System.register(['./cursorposition.htm.js', './component.js', '../../ol.js', '../../olMap.js', '../../utils.js'], function (_export, _context) {
  var tpl, Component, ol, olMap, utils, component, template, map, $;
  return {
    setters: [function (_cursorpositionHtmJs) {
      tpl = _cursorpositionHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }],
    execute: function () {
      component = new Component(tpl, 'cursorposition');
      template = component.getTemplate('cursorposition');

      // only style, so can be added to head
      document.head.appendChild(template);

      map = olMap.get();
      $ = utils.$;


      // cursorposition in LatLons
      map.addControl(new ol.control.MousePosition({
        coordinateFormat: function (coordinate) {
          // 4 decimal places for latlons
          return ol.coordinate.toStringHDMS(coordinate) + ' (' + ol.coordinate.format(coordinate, '{y}, {x}', 4) + ')';
        },
        projection: 'EPSG:4326',
        className: 'llcursor'
      }));

      // ... and in projected coords
      map.addControl(new ol.control.MousePosition({
        coordinateFormat: function (coordinate) {
          // no decimal places for projected coords
          return 'projected: ' + ol.coordinate.toStringXY(coordinate, 0);
        },
        // set class to override OL default position/style
        className: 'llcursor projcursor'
      }));

      if (map.getView().getProjection().getCode() == 'EPSG:4326') {
        $('.projcursor').style.display = 'none';
      }
    }
  };
});