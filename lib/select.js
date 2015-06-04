var ol = require('ol');
var map = require('olMap').get();
var vectors = require('vectors');

// select for vector layers; used by featuredisplay, modify and delete
var select = new ol.interaction.Select({
  layers: vectors.getLayers().getArray()
});
map.addInteraction(select);

var evtKey, displayCallback, drawActive = false;

module.exports = {
  get: function() {
    return select;
  },
  // display and draw select callbacks should not be active at same time
  displayOn: function(callback) {
    displayCallback = callback;
    if (!drawActive) {
      evtKey = select.on('select', displayCallback);
    }
  },
  drawOn: function() {
    if (evtKey) {
      ol.Observable.unByKey(evtKey);
    }
    drawActive = true;
  },
  drawOff: function() {
    if (displayCallback) {
      evtKey = select.on('select', displayCallback);
    }
    drawActive = false;
  }
};