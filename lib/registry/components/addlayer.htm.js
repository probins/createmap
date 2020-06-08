export default `
<template id="addlayertemplate">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/awesomplete/1.1.1/awesomplete.min.css">
  <style>
    #rasters, #vectors {
      border:1px solid #D2D8DE;
    }
  </style>
  <div>
  <div id="rasters">
    <div>Add a raster layer:</div>
    <div>Code <input type="text" class="awesomplete" size="10" id="rastercode" placeholder="Enter registry code"></div>
    <div>API <input type="text" size="10" id="api" placeholder="Enter API code if needed"></div>
    <button id="addraster">Add</button>
  </div>
  <div id="vectors">
    <div>Add vector file:</div>
    <div>Name/identifier <input type="text" size="10" id="vectorname" placeholder="(used in layerswitcher)"></div>
    <div>Url <input type="text" size="20" id="vectorurl"></div>
    <div><i>or</i> local file: <form id="fileform"><input type="file" id="vectorfile"></form></div>
    <div>MongoDB? <input type="checkbox" id="mongodb" value="mongodb"></div>
    <button id="addvector">Add</button>
  </div>
  </div>
</template>
`;
