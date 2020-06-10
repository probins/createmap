export default `
<template id="serialisetemplate">
  <section>
    <div id="serialise-title" class="toolbartitle">Feature output</div>
    <div id="serialise-content" class="toolbarcontent">
      <select id="opformat" title="Output format">
        <option value="GeoJSON" selected>GeoJSON</option>
        <option value="KML">KML</option>
        <option value="GPX">GPX</option>
        <option value="mongo">MongoDB</option>
      </select>
      <label>Geometry only</label><input type="checkbox" id="geoonly">
      <div>
        <label>Simplify tolerance </label><input type="text" size="10" id="tolerance">
        <button id="reserialise">Reserialise</button>
      </div>
      <textarea rows="6" id="serialOP"></textarea>
      <a id="download" href="">Download data</a>
    </div>
  </section>
</template>
`;
