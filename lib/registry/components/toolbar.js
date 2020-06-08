/**
 * Toolbar: a container in a slideout panel
 * Most optional components are in a dropdown box, and are hidden when loaded.
 * Other buttons that load components have addbutton class; can be toggles,
 * and are also hidden when loaded.
 * Options with vectorOption class are only displayed if there are vector layers.
 * Each section within toolbar has accordion-style display toggle.
 * Help section similarly has sub-sections with accordion-style display toggle.
 *
 * uses import()
 */

// import templates
import tpl from './toolbar.htm.js';
import Component from './component.js';
var toolbar = new Component(tpl);

import ol from '../../ol.js';
import olMap from '../../olMap.js';
var map = olMap.get();
import utils from '../../utils.js';
var $ = utils.$;
import md from '../../mapDef.js';
var mapDef = md.get();
var i;
import Slideout from './slideout.min.js';

var template = toolbar.getTemplate('toolbar');

// add toggle listener to all toolbartitle divs
var divs = template.querySelectorAll('.toolbartitle');
var cb = function() {
  // toggle display of next, i.e. content, element
  var el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
};
for (i = 0; i < divs.length; i++) {
  divs[i].addEventListener('click', cb);
}

// set click listeners on toolbar buttons
var listener = function() {
  // component name is button id minus 'button'
  var me = this.getAttribute('id').replace('button', '');
  import('./' + me + '.js');
  // hide button and remove listener
  this.style.display = 'none';
  this.removeEventListener('click', listener);
};
var btns = template.querySelectorAll('.addbutton');
for (i = 0; i < btns.length; i++) {
  // component name is button id minus 'button'
  var comp = btns[i].getAttribute('id').replace('button', '');
  if (!(mapDef.components && mapDef.components[comp])) {
    // add listener if component not already added
    btns[i].addEventListener('click', listener);
  }
}

// if no vectors, hide popup/tooltip
if (!mapDef.vectors) {
  btns = template.querySelectorAll('.vectorOption');
  for (i = 0; i < btns.length; i++) {
    btns[i].style.display = 'none';
  }
}

// add toggle listener to all helptitle divs
divs = template.querySelectorAll('.helptitle');
cb = function() {
  // toggle display of next, i.e. content, element
  var el = this.nextElementSibling;
  el.style.display = (el.style.display == 'block') ? 'none' : 'block';
};
for (i = 0; i < divs.length; i++) {
  divs[i].addEventListener('click', cb);
}

document.body.appendChild(template);

// add listener to component add dropdown
$('#addcomponent').onchange = function(e) {
  if (e.target.value !== 'choose') {
    if (e.target.value == 'redraw') {
      // 'draw' set to 'redraw' when hidden
      $('#drawtype').style.display = 'block';
      $('#drawoption').style.display = 'none';
    } else {
      import('./' + e.target.value + '.js');
      $('#' + e.target.value + 'option').style.display = 'none';
    }
    this.value = 'choose';
    this.blur();
  }
};

// add toggle button to map
// use ol.control to prevent event propagation
map.addControl(new ol.control.Control({element: toolbar.getTemplate('toggle')}));
// create toolbar slideout
var slideout = new Slideout({
  'panel': $('#map'),
  'menu': $('#toolbar'),
  'touch': false
});
$('#slide-toggle').addEventListener('click', function() {
  slideout.toggle();
});

export default $('#toolbar');
