// import templates
var tpl = require('components/mouseposition.html');
var Component = require('components/component');
var component = new Component(tpl);

var template = component.getTemplate('mouseposition');
// only style, so can be added to head
document.head.appendChild(template);

var ol = require('ol');
var map = require('olMap').get();
var $ = require('utils').$;

// mousePosition in LatLons
map.addControl(new ol.control.MousePosition({
    coordinateFormat: function(coordinate) {
      // 4 decimal places for latlons
      return ol.coordinate.toStringHDMS(coordinate) + ' (' +
          ol.coordinate.format(coordinate, '{y}, {x}', 4) + ')';
    },
    projection: 'EPSG:4326'
  })
);

// ... and in projected coords
map.addControl(new ol.control.MousePosition({
    coordinateFormat: function(coordinate) {
      // no decimal places for projected coords
      return 'projected: ' + ol.coordinate.toStringXY(coordinate, 0);
    },
    // set class to override OL default position/style
    className: 'ol-mouse-position projmouse'
  })
);

$('#addmouse').style.display = 'none';