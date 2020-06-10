export default `
<template id="drawtemplate">
  <style>
    .fa-select {
      font-family: sans-serif, 'FontAwesome';
      font-size: 1em;
    }
    #drawtype {
      position: absolute;
      top: 120px;
      left: 10px
    }
  </style>
  <div id="drawtools">
    <select id="drawtype" class="fa-select" title="Select edit tool">
      <option value="choose">&#xf107; choose tool</option>
      <option value="point">&#xf192; draw point</option>
      <option value="ls">&#xe805; draw line</option>
      <option value="poly">&#xe807; draw polygon</option>
      <option value="modify">&#xf047; move</option>
      <option value="modAtts">&#xe801; edit</option>
      <option value="deleet">&#xf1f8; delete</option>
      <option value="split">&#xe802; split line</option>
      <option value="join">&#xe806; join lines</option>
      <option value="save">&#xe804; save changes</option>
      <option value="saveall">&#xe804; save all</option>
      <option value="clear">&#xf12d; clear changes</option>
      <option value="hide">&#xf204; hide me</option>
    </select>
  </div>
</template>

<template id="featureformtemplate">
  <style>
    #featureform {
      background-color: white;
      padding: 1px;
      border: solid black;
      width: 300px;
    }
    .attributetitle {
      background-color: #6fc;
      text-align: center;
    }
  </style>
  <div id="featureform">
    <div class="attributetitle"><i>Enter attributes</i></div>
    <label>Id </label><input type="text" size="5" id="featureformid">
    <div id="featureformAtts">
      <template>
        <div>
          <label>Name <input type="text" size="5"></label>
          <label>Value <input type="text" size="10"></label>
        </div>
      </template>
      <button id="plusbutton">+</button>
    </div>
    <button id="featurebutton" class="fa fa-check-square-o"></button>
  </div>
</template>

<template id="drawhelptemplate">
  <section>
    <div id="draw-title" class="helptitle">Draw tools</div>
    <div id="draw-content" class="helpcontent">
      <div id="draw-text">
        <p>Select appropriate tool. Only one tool can be active at one time.</p>
        <p>The three <b>draw tools</b> enable you to draw points, linestrings and polygons. Double-click for the last point of a linestring, and re-click on the start point to close a polygon. On completion, you are prompted to enter the name/value attributes for the feature; attributes named 'name' or 'title' are used as the tooltip identifier. 'id' is a special identifying attribute; this must be unique. Otherwise, you can enter any attribute names you like.</p>
        <p><b>Move</b> enables you to move a point, or any vector point of a linestring/polygon. Click on a section of a linestring or polygon to create a new vector at that point. Click on an existing vector point on a linestring or polygon to delete it.</p>
        <p><b>Edit</b> is for editing the feature attributes.</p>
        <p>Select <b>Delete</b> and then click on the feature you want to delete.</p>
        <p>To use the <b>Split</b> tool, select the linestring you want to split, and then move the cursor to the point at which you want to split, then click. This will split the line, and you can edit the vector points or the attributes of the new lines. You cannot split at an existing vertex; to do this, drag the vertex slightly, so the line is split at this new point. MultiLineStrings with more than 1 LineString cannot be split.</p>
        <p>To use the <b>Join</b> tool, first make sure the ends of the two lines to be joined are adjacent; then select the tool, and then select the 2 lines by clicking one, then clicking the second with the shift key. This only works on LineStrings, not MultiLineStrings.</p>
        <p>The <b>save</b> tools will save either the changed features, or all the features currently displayed, to the 'feature output' section of the toolbar. You can either copy this into a file, or use the 'Download' link to save as a file on your device. By default, this is GeoJSON output, but this can be changed to KML or GPX output by using the dropdown selection, and clicking 'Reserialise'. MongoDB output (GeoJSON geometries with attributes at the top level) is also possible. LineString and Polygon geometries can be simplified (Douglas-Peucker). And if there is only one feature, for GeoJSON the geometry only can be output.</p>
        <p><b>Clear changes</b> will delete all the new/changed features.</p>
        <p>Note that all newly drawn features will be added to the 'Drawn' layer. A feature in another layer can be modified/deleted, but will be moved to the 'Drawn' layer. You cannot at present add features to another layer.</p>
      </div>
    </div>
  </section>
</template>
`;
