'use strict';

System.register(['./placesearch.htm.js', './component.js', '../../utils.js', './toolbar.js', '../../ol.js', '../../olMap.js'], function (_export, _context) {
  var tpl, Component, utils, ol, olMap, component, $, map;
  return {
    setters: [function (_placesearchHtmJs) {
      tpl = _placesearchHtmJs.default;
    }, function (_componentJs) {
      Component = _componentJs.default;
    }, function (_utilsJs) {
      utils = _utilsJs.default;
    }, function (_toolbarJs) {}, function (_olJs) {
      ol = _olJs.default;
    }, function (_olMapJs) {
      olMap = _olMapJs.default;
    }],
    execute: function () {
      component = new Component(tpl, 'placesearch');
      $ = utils.$;


      // add template to toolbar
      $('#components-content').appendChild(component.getTemplate('placesearch'));

      map = olMap.get();

      $('#placesearchbutton').addEventListener('click', function () {
        var place = document.getElementById('searchfor').value;
        var api = document.getElementById('placesearchapi').value;
        var continent = document.getElementById('placesearchcontinent').value;
        var url = 'http://api.geonames.org/searchJSON?maxRows=10&username=' + api + '&isNameRequired=true&style=full&q=' + place;
        if (continent) {
          url += '&continentCode=' + continent;
        }
        url = url.replace(/amp;/g, '');

        var goto = function (lng, lat) {
          var coord = [lng, lat];
          coord = ol.proj.transform(coord, 'EPSG:4326', map.getView().getProjection());
          if (!ol.extent.containsCoordinate(map.getView().extent, coord)) {
            alert('Coordinate outside map extent'); //FIXME English
          } else {
              map.getView().setCenter(coord);
              map.getView().setZoom(map.getView().zoomIn);
            }
        };
        var eachGoto = function () {
          goto(parseFloat(this.dataset.lng), parseFloat(this.dataset.lat));
        };
        var placesearchcallback = function (feed) {
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
              var fullName = geoname.name + ', ' + geoname.adminName1 + ', ' + geoname.adminName2 + ', ' + geoname.adminName3 + ', ' + geoname.adminName4;
              html += '<a href="#" class="gotos" data-lat="' + lat + '" data-lng="' + lng + '">' + fullName + '</a><br />';
            }
            document.getElementById('searchResults').innerHTML = html;
            var gotos = document.querySelectorAll('.gotos');
            for (var j = 0; j < gotos.length; j++) {
              gotos[j].addEventListener('click', eachGoto);
            }
          }
        };

        fetch(url).then(function (response) {
          return response.json();
        }).then(function (result) {
          placesearchcallback(result);
        }).catch(function () {
          utils.errors.fetchFail();
        });
      });
    }
  };
});