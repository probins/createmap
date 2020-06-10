export default `
<template id="geolocationtemplate">
  <style>
    #geolocationContainer {
      position: absolute;
      top: 15px;
      left: 100px;
      font-size: 1em;
    }
  </style>
  <div id="geolocationContainer">
    <button id="geolocationbutton" title="Geolocation"><i class="fa fa-map-marker fa-lg"></i></button>
  </div>
</template>

<template id="geomarkertemplate">
  <div id="geomarker"><i class="fa fa-location-arrow"></i></div>
</template>

<template id="geolocationhelptemplate">
  <section>
    <div id="geolocation-title" class="helptitle">Geolocation</div>
    <div id="geolocation-content" class="helpcontent">
      <div id="geolocation-text">
        <p>Click on the marker button to fetch the current position from the device. This can take several seconds.</p>
      </div>
    </div>
  </section>
</template>
`;
