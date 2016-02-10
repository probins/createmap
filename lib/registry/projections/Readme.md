#### Projection modules
As supplied, OL3 supports the global EPSG:4326 (GPS-style latitude and longitude coordinates in degrees of angle) and EPSG:3857 (Web Mercator, as used by Google, OSM, Bing et al), and the conversion of coordinates between these two. Other projections are supported using [Proj4js](http://proj4js.org/). Each module in the projections registry defines the projection definition and exports the projection code so it can be imported by the appropriate source.

At present, the full build of Proj4js is used, and there is no modular loading.