/**
 * Created by sc on 3/14/16.
 */

var lyr1 = ga.layer.create('ch.swisstopo.pixelkarte-farbe');
var lyr2 = ga.layer.create('ch.swisstopo.swissboundaries3d-kanton-flaeche.fill');
var map = new ga.Map({
    target: 'map',
    layers: [lyr1, lyr2],
    view: new ol.View({
        resolution: 250,
        center: [670000, 160000]
    })
});