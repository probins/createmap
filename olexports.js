goog.exportSymbol(
    'ol.Attribution',
    ol.Attribution);

goog.exportSymbol(
    'ol.Collection',
    ol.Collection);
goog.exportProperty(
    ol.Collection.prototype,
    'getArray',
    ol.Collection.prototype.getArray);
goog.exportProperty(
    ol.Collection.prototype,
    'getAt',
    ol.Collection.prototype.getAt);

goog.exportSymbol(
    'ol.control.MousePosition',
    ol.control.MousePosition);
goog.exportSymbol(
    'ol.control.ScaleLine',
    ol.control.ScaleLine);

goog.exportSymbol(
    'ol.coordinate.format',
    ol.coordinate.format);
goog.exportSymbol(
    'ol.coordinate.toStringHDMS',
    ol.coordinate.toStringHDMS);
goog.exportSymbol(
    'ol.coordinate.toStringXY',
    ol.coordinate.toStringXY);

goog.exportSymbol(
    'ol.extent',
    ol.extent);
goog.exportSymbol(
    'ol.extent.createEmpty',
    ol.extent.createEmpty);
goog.exportSymbol(
    'ol.extent.extend',
    ol.extent.extend);
goog.exportSymbol(
    'ol.extent.getCenter',
    ol.extent.getCenter);
goog.exportSymbol(
    'ol.extent.getTopLeft',
    ol.extent.getTopLeft);
goog.exportSymbol(
    'ol.extent.transform',
    ol.extent.transform);

goog.exportSymbol(
    'ol.Feature',
    ol.Feature);
goog.exportProperty(
    ol.Feature.prototype,
    'getAttributes',
    ol.Feature.prototype.getAttributes);
goog.exportProperty(
    ol.Feature.prototype,
    'getGeometry',
    ol.Feature.prototype.getGeometry);
goog.exportProperty(
    ol.Feature.prototype,
    'getId',
    ol.Feature.prototype.getId);

goog.exportSymbol(
    'ol.geom.LineString',
    ol.geom.LineString);
goog.exportProperty(
    ol.geom.LineString.prototype,
    'getBounds',
    ol.geom.LineString.prototype.getBounds);
goog.exportSymbol(
    'ol.geom.MultiLineString',
    ol.geom.MultiLineString);
goog.exportProperty(
    ol.geom.MultiLineString.prototype,
    'getBounds',
    ol.geom.MultiLineString.prototype.getBounds);
goog.exportSymbol(
    'ol.geom.MultiPoint',
    ol.geom.MultiPoint);
goog.exportProperty(
    ol.geom.MultiPoint.prototype,
    'getBounds',
    ol.geom.MultiPoint.prototype.getBounds);
goog.exportSymbol(
    'ol.geom.MultiPolygon',
    ol.geom.MultiPolygon);
goog.exportProperty(
    ol.geom.MultiPolygon.prototype,
    'getBounds',
    ol.geom.MultiPolygon.prototype.getBounds);
goog.exportSymbol(
    'ol.geom.Point',
    ol.geom.Point);
goog.exportProperty(
    ol.geom.Point.prototype,
    'getBounds',
    ol.geom.Point.prototype.getBounds);
goog.exportSymbol(
    'ol.geom.Polygon',
    ol.geom.Polygon);
goog.exportProperty(
    ol.geom.Polygon.prototype,
    'getBounds',
    ol.geom.Polygon.prototype.getBounds);

goog.exportSymbol(
    'ol.layer.Layer',
    ol.layer.Layer);
goog.exportProperty(
    ol.layer.Layer.prototype,
    'getSource',
    ol.layer.Layer.prototype.getSource);
goog.exportSymbol(
    'ol.layer.Tile',
    ol.layer.Tile);
goog.exportSymbol(
    'ol.layer.Vector',
    ol.layer.Vector);

goog.exportSymbol(
    'ol.Map',
    ol.Map);
goog.exportProperty(
    ol.Map.prototype,
    'addControl',
    ol.Map.prototype.addControl);
goog.exportProperty(
    ol.Map.prototype,
    'addLayer',
    ol.Map.prototype.addLayer);
goog.exportProperty(
    ol.Map.prototype,
    'addOverlay',
    ol.Map.prototype.addOverlay);
goog.exportProperty(
    ol.Map.prototype,
    'getFeatures',
    ol.Map.prototype.getFeatures);
goog.exportProperty(
    ol.Map.prototype,
    'getLayers',
    ol.Map.prototype.getLayers);
goog.exportProperty(
    ol.Map.prototype,
    'getSize',
    ol.Map.prototype.getSize);

goog.exportProperty(
    ol.MapBrowserEvent.prototype,
    'getCoordinate',
    ol.MapBrowserEvent.prototype.getCoordinate);
goog.exportProperty(
    ol.MapBrowserEvent.prototype,
    'getPixel',
    ol.MapBrowserEvent.prototype.getPixel);

goog.exportProperty(
    ol.Observable.prototype,
    'on',
    ol.Observable.prototype.on);
goog.exportProperty(
    ol.Observable.prototype,
    'once',
    ol.Observable.prototype.once);

goog.exportSymbol(
    'ol.Overlay',
    ol.Overlay);
goog.exportSymbol(
    'ol.OverlayPositioning',
    ol.OverlayPositioning);
goog.exportProperty(
    ol.OverlayPositioning,
    'BOTTOM_CENTER',
    ol.OverlayPositioning.BOTTOM_CENTER);

goog.exportSymbol(
    'ol.parser.GeoJSON',
    ol.parser.GeoJSON);
goog.exportSymbol(
    'ol.parser.GPX',
    ol.parser.GPX);
goog.exportSymbol(
    'ol.parser.KML',
    ol.parser.KML);

goog.exportSymbol(
    'ol.proj.getTransform',
    ol.proj.getTransform);
goog.exportSymbol(
    'ol.proj.transform',
    ol.proj.transform);
goog.exportSymbol(
    'ol.proj.Projection',
    ol.proj.Projection);
goog.exportProperty(
    ol.proj.Projection.prototype,
    'getCode',
    ol.proj.Projection.prototype.getCode);

goog.exportSymbol(
    'ol.RendererHint',
    ol.RendererHint);
goog.exportProperty(
    ol.RendererHint,
    'CANVAS',
    ol.RendererHint.CANVAS);

goog.exportSymbol(
    'ol.source.BingMaps',
    ol.source.BingMaps);
goog.exportSymbol(
    'ol.source.OSM',
    ol.source.OSM);
goog.exportSymbol(
    'ol.source.TileWMS',
    ol.source.TileWMS);
goog.exportProperty(
    ol.source.TileWMS.prototype,
    'updateParams',
    ol.source.TileWMS.prototype.updateParams);
goog.exportSymbol(
    'ol.source.Vector',
    ol.source.Vector);
goog.exportSymbol(
    'ol.source.WMTS',
    ol.source.WMTS);
goog.exportSymbol(
    'ol.source.WMTSRequestEncoding',
    ol.source.WMTSRequestEncoding);
goog.exportProperty(
    ol.source.WMTSRequestEncoding,
    'REST',
    ol.source.WMTSRequestEncoding.REST);
goog.exportProperty(
    ol.source.Source.prototype,
    'getProjection',
    ol.source.Source.prototype.getProjection);
goog.exportProperty(
    ol.source.Vector.prototype,
    'getFeatures',
    ol.source.Vector.prototype.getFeatures);

goog.exportSymbol(
    'ol.style.Stroke',
    ol.style.Stroke);
goog.exportSymbol(
    'ol.style.Style',
    ol.style.Style);

goog.exportSymbol(
    'ol.tilegrid.TileGrid',
    ol.tilegrid.TileGrid);
goog.exportSymbol(
    'ol.tilegrid.WMTS',
    ol.tilegrid.WMTS);

goog.exportSymbol(
    'ol.View2D',
    ol.View2D);
goog.exportProperty(
    ol.View2D.prototype,
    'calculateExtent',
    ol.View2D.prototype.calculateExtent);
goog.exportProperty(
    ol.View2D.prototype,
    'fitExtent',
    ol.View2D.prototype.fitExtent);
