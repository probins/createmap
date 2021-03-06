/**
 * Displays the coordinates of the current cursor position in both lat/lons and
 * projected coordinates.
 *
 * Screen position determined by css in html file.
 */

// import templates
import tpl from './cursorposition.htm.js';
import Component from './component.js';
import MousePosition from "ol/control/MousePosition.js";
// import { MousePosition } from '../../deps.js';
import olMap from '../../olMap.js';
import { $ } from '../../utils.js';

const map = olMap.get();

const component = new Component(tpl, 'cursorposition');
const template = component.getTemplate('cursorposition');
// only style, so can be added to head
document.head.appendChild(template);

// copied from ol.coordinate.format
function format(coordinate, template, opt_fractionDigits) {
  if (coordinate) {
    return template
      .replace('{x}', coordinate[0].toFixed(opt_fractionDigits))
      .replace('{y}', coordinate[1].toFixed(opt_fractionDigits));
  } else {
    return '';
  }
}

// from ol.math
function modulo(a, b) {
  const r = a % b;
  return r * b < 0 ? r + b : r;
}
// from ol.string
function padNumber(number, width, opt_precision) {
  const numberString = opt_precision !== undefined ? number.toFixed(opt_precision) : '' + number;
  let decimal = numberString.indexOf('.');
  decimal = decimal === -1 ? numberString.length : decimal;
  return decimal > width ? numberString : new Array(1 + width - decimal).join('0') + numberString;
}
// from ol.coordinate
function degreesToStringHDMS_(degrees, hemispheres, opt_fractionDigits) {
  const normalizedDegrees = modulo(degrees + 180, 360) - 180;
  const x = Math.abs(3600 * normalizedDegrees);
  const dflPrecision = opt_fractionDigits || 0;
  return Math.floor(x / 3600) + '\u00b0 ' +
      padNumber(Math.floor((x / 60) % 60), 2) + '\u2032 ' +
      padNumber((x % 60), 2, dflPrecision) + '\u2033 ' +
      hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0);
}

// cursorposition in LatLons
map.addControl(new MousePosition({
  coordinateFormat: function(coordinate) {
    // 4 decimal places for latlons
    return degreesToStringHDMS_(coordinate[1], 'NS') + ' ' +
        degreesToStringHDMS_(coordinate[0], 'EW') + ' (' +
        format(coordinate, '{y}, {x}', 4) + ')';
  },
  projection: 'EPSG:4326',
  className: 'llcursor'
}));

// ... and in projected coords
map.addControl(new MousePosition({
  coordinateFormat: function(coordinate) {
    // no decimal places for projected coords
    return 'projected: ' + format(coordinate, '{x}, {y}', 0);
  },
  // set class to override OL default position/style
  className: 'llcursor projcursor'
}));

if (map.get('view').getProjection().getCode() == 'EPSG:4326') {
  $('.projcursor').style.display = 'none';
}
