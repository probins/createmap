export default `
<template id="toolbartemplate">
  <style>
    section {
      border:1px solid #D2D8DE;
    }
    .toolbartitle {
      background-color: #6fc;
      cursor: pointer;
      text-align: center;
    }
    .toolbarcontent {
      background-color: #cff;
      display: none;
    }
    .helptitle {
      background-color: #6fc;
      cursor: pointer;
      text-align: center;
      font-style: italic;
    }
    .helpcontent {
      background-color: #cff;
      display: none;
    }
  </style>
  <div id="toolbar">
    <section>
      <div id="layers-title" class="toolbartitle">Layers</div>
      <div id="layers-content" class="toolbarcontent">
        <div id="layers-text"><i>Layers are raster or vector map data</i></div>
        <button id="addlayerbutton" class="addbutton">Add a layer</button>
      </div>
    </section>
    <section>
      <div id="components-title" class="toolbartitle">Components</div>
      <div id="components-content" class="toolbarcontent">
        <div><i>Add components:</i></div>
        <select id="addcomponent" title="Add component">
          <option value="choose">Choose:</option>
          <option id="centeroption" value="center">Go to</option>
          <option id="placesearchoption" value="placesearch">Place search</option>
          <option id="geolocationoption" value="geolocation">Geolocation</option>
          <option id="drawoption" value="draw">Draw</option>
          <option id="cursorpositionoption" value="cursorposition">Cursor position</option>
          <option id="featuredisplayoption" class="vectorOption" value="featuredisplay">Popup</option>
          <option id="tooltipoption" class="vectorOption" value="tooltip">Tooltip</option>
        </select>
      </div>
    </section>
    <section>
      <div id="mapDef-title" class="toolbartitle">Map definition</div>
      <div id="mapDef-content" class="toolbarcontent">
        <button id="mapdefbutton" class="addbutton">Use map definition</button>
      </div>
    </section>
    <section>
      <div id="help-title" class="toolbartitle">Help</div>
      <div id="help-content" class="toolbarcontent">
      <section>
        <div id="toolbar-title" class="helptitle">Toolbar</div>
        <div id="toolbar-content" class="helpcontent">
          <div id="toolbar-text">
            <p>Add a raster or vector layer, or additional components in the sections above. Vector layers can be toggled on/off using the layer switcher in the layers section. If there is more than one raster layer, the active one can also be selected with the layer switcher.</p>
          </div>
        </div>
      </section>
      <section>
        <div id="navigation-title" class="helptitle">Navigation</div>
        <div id="navigation-content" class="helpcontent">
          <div id="navigation-text">
            <p>You can zoom in/out using the controls on the left, or pan the map by dragging it. If you double-click/double-tap, it will zoom in. On desktop, you can also shift/drag to zoom into the highlighted area, pan using the arrow keys on your keyboard, and zoom using the wheel on the mouse (forward to zoom in, back to zoom out). On mobile, pinch drag will zoom in/out.</p>
          </div>
        </div>
      </section>
      <section>
        <div id="scaleline-title" class="helptitle">Scale line</div>
        <div id="scaleline-content" class="helpcontent">
          <div id="scaleline-text">
            <p>The scale-line shown at the bottom is based on the distance at the centre of the current viewport. The distance at the top or bottom of the viewport may differ from this depending on the projection. The discrepancy should not be significant at the zoomlevel of a European country or above, but if you zoom out on Bing or OSM maps it will be. At the extreme - zoomlevel 0 on these maps - the scaleline is useless, as Mercator's projection used by these maps takes no account of the fact that longitudinal distance (west-east) depends on the latitude.</p>
          </div>
        </div>
      </section>
      <section>
        <div id="copyright-title" class="helptitle">Copyright</div>
        <div id="copyright-content" class="helpcontent">
          <div id="copyright-text">
            <p>These map pages use data from other sources, most of which have a copyright on their maps. This is particularly true of topographic maps. Copyright laws vary from country to country, but in general anything more than a small amount of copying for personal use, for example, printing a couple of pages, will require a license from the copyright-holder. Click on the attribution link at the bottom of the page for more info on the copyright of the particular map-base. Because of copyright, these pages do not provide any printing facility (other than the 'print screen' button); they are primarily for viewing maps online, not for hard copy which you would normally be expected to buy.</p>
          </div>
        </div>
      </section>
      </div>
    </section>
  </div>
</template>

<template id="toggletemplate">
  <style>
    #slide-toggle {
      position: absolute;
      top: 15px;
      left: 60px;
      z-index: 1000;
    }
  </style>
  <button id="slide-toggle" title="Toggle options menu">☰</button>
</template>
`;
