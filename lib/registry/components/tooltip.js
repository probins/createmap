  var utils = require('utils');
  var $ = utils.$;
var ol = require('ol');
var map = require('olMap').get();
map.getViewport().appendChild(utils.getTemplate('#tooltiptemplate'));
var vectors = require('vectors');

var select = new ol.interaction.Select({
  condition: ol.events.condition.pointerMove,
  layers: vectors.getLayers().getArray()
});

map.addInteraction(select);

select.on('select', function(e) {
  var html, pixel;
  var tooltip = $('#tooltip');
  if (e.selected.length > 0) {
    var feature = e.selected[0];
    // FIXME change to pixel from event when available from ol
    pixel = map.getPixelFromCoordinate(feature.getGeometry().getFirstCoordinate());
    html = feature.getProperties().name || feature.getProperties().title;
  }
  if (html) {
    tooltip.innerHTML = html;
    tooltip.style.left = (pixel[0] + 10) + 'px';
    tooltip.style.top = (pixel[1] + 10) + 'px';
    tooltip.style.display = 'block';
    // change cursor to indicate to users that they can click on this point
    map.getTarget().style.cursor = 'pointer';
  } else {
    tooltip.style.display = 'none';
    map.getTarget().style.cursor = '';
  }
});

var mapDef = require('mapDef').get();
mapDef.components = mapDef.components || {};
mapDef.components.tooltip = true;