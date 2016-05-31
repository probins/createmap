/**
 * component to search geo names on geonames.org and zoom to selected item.
 * uses JSONP and callback in System namespace
 * free usage of geonames.org only has http, so this cannot be used in https maps
 * requires API key, and optionally continent restriction
 */

var tpl = require('components/placesearch.html');
var Component = require('components/component');
var component = new Component(tpl, 'placesearch');

var utils = require('utils');
var $ = utils.$;
// make sure toolbar initialised
require('components/toolbar');

// add template to toolbar
$('#components-content').appendChild(component.getTemplate('placesearch'));

var ol = require('ol');
var map = require('olMap').get();
$('#placesearchbutton').addEventListener('click', function() {
  var place = document.getElementById('searchfor').value;
  var api = document.getElementById('placesearchapi').value;
  var continent = document.getElementById('placesearchcontinent').value;
  var url = 'http://api.geonames.org/searchJSON?maxRows=10&username=' + api + '&isNameRequired=true&style=full&callback=System.placesearchcallback&q=' + place;
  if (continent) {
    url += '&continentCode=' + continent;
  }
  url = url.replace(/amp;/g,'');
  var old = document.getElementById('searchscript');
  if (old !== null) {
    old.parentNode.removeChild(old);
  }
  var script = document.createElement('script');
  script.id = 'searchscript';
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);

  var goto = function(lng, lat) {
    var coord = [lng, lat];
    coord = ol.proj.transform(coord, 'EPSG:4326', map.getView().getProjection());
    if (!ol.extent.containsCoordinate(map.getView().extent, coord)) {
      alert('Coordinate outside map extent'); //FIXME English
    } else {
      map.getView().setCenter(coord);
      map.getView().setZoom(map.getView().zoomIn);
    }
  };
  var eachGoto = function() {
    goto(parseFloat(this.dataset.lng), parseFloat(this.dataset.lat));
  };
  System.placesearchcallback = function(feed) {
    if (feed === null) {
      alert('Nothing returned from geonames.org');
      return;
    }
    var geonames = feed.geonames;
    if (geonames.length === 0) {
      alert('No such place on geonames.org');
      return;
    }
    var lat, lng;
    if (geonames.length == 1) {
      lat = parseFloat(geonames[0].lat);
      lng = parseFloat(geonames[0].lng);
      goto(lng, lat);
    } else {
      var html = '';
      for (var i = 0; i < geonames.length; i++) {
        var geoname = geonames[i];
        lat = geoname.lat;
        lng = geoname.lng;
        var fullName = geoname.name + ', ' + geoname.adminName1 + ', ' + geoname.adminName2
            + ', ' + geoname.adminName3 + ', ' + geoname.adminName4;
        html += '<a href="#" class="gotos" data-lat="' + lat + '" data-lng="' + lng + '">'
            + fullName + '</a><br />';
      }
      document.getElementById('searchResults').innerHTML = html;
      var gotos = document.querySelectorAll('.gotos');
      for (var j = 0; j < gotos.length; j++) {
        gotos[j].addEventListener('click', eachGoto);
      }
    }
  };
});