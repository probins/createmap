export default `
<template id="mapdeftemplate">
  <div>A map definition is a file containing the options needed to recreate a map. Click on the Create MapDef button and save as a file. You can then either incorporate that file into the map program or enter the URL below to recreate the same map without entering the options individually.</div>
  <button id="createMapDef">Create MapDef</button>
  <textarea rows="5" id="mapDefOP"></textarea>
  <input type="text" id="mapdefurl" size="60" placeholder="Enter URL of mapDef">
</template>
`;
