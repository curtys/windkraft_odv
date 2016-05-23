/**
 * Created by sc on 3/14/16.
 */


// Convert CH y/x to WGS lat
function CHtoWGSlat(y, x) {

    // Converts military to civil and  to unit = 1000km
    // Auxiliary values (% Bern)
    var y_aux = (y - 600000)/1000000;
    var x_aux = (x - 200000)/1000000;

    // Process lat
    lat = 16.9023892
        +  3.238272 * x_aux
        -  0.270978 * Math.pow(y_aux,2)
        -  0.002528 * Math.pow(x_aux,2)
        -  0.0447   * Math.pow(y_aux,2) * x_aux
        -  0.0140   * Math.pow(x_aux,3);

    // Unit 10000" to 1 " and converts seconds to degrees (dec)
    lat = lat * 100/36;

    return lat;

}

// Convert CH y/x to WGS long
function CHtoWGSlng(y, x) {

    // Converts military to civil and  to unit = 1000km
    // Auxiliary values (% Bern)
    var y_aux = (y - 600000)/1000000;
    var x_aux = (x - 200000)/1000000;

    // Process long
    lng = 2.6779094
        + 4.728982 * y_aux
        + 0.791484 * y_aux * x_aux
        + 0.1306   * y_aux * Math.pow(x_aux,2)
        - 0.0436   * Math.pow(y_aux,3);

    // Unit 10000" to 1 " and converts seconds to degrees (dec)
    lng = lng * 100/36;

    return lng;

}



window.addEventListener('load', function () {

    //map extent
    //var minX = 605290, maxX = 1276940, minY = 5740090, maxY = 6082390;
    var minX = 700000, maxX = 1200000, minY = 5750000, maxY = 6050000;


    var WGSlongitude = CHtoWGSlng(670000, 160000);
    var WGSlatitude = CHtoWGSlat(670000, 160000);

    var vectorKantone = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'data/map/g1k15.kml',
            format: new ol.format.KML({
                extractStyles: false
            })
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#3399CC',
                width: 2.5
            })
        })
    });

    var vectorGrenze = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'data/map/g1l15.kml',
            format: new ol.format.KML({
                extractStyles: false
            })
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                //color: '#A89CFF',
                color: '#AF6BFF',
                width: 4
            })
        })
    });

    var lyrWind = ga.layer.create('ch.bfe.windenergieanlagen');
    var lyrWasser = ga.layer.create('ch.bfe.statistik-wasserkraftanlagen');
    var lyrKernkraft = ga.layer.create('ch.bfe.kernkraftwerke');

    lyrWind.setVisible(false);
    lyrWasser.setVisible(false);
    lyrKernkraft.setVisible(true);

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.Stamen({layer: 'toner-background'})
            }),
            vectorGrenze, vectorKantone, lyrWind, lyrWasser, lyrKernkraft
        ],
        view: new ol.View({
            //projection: swissProjection,
            center: ol.proj.fromLonLat([WGSlongitude, WGSlatitude]),
            resolution: 350,
            //minZoom: 8,
            maxResolution: 400,
            minResolution: 200,
            extent: [minX, minY, maxX, maxY]
        })
    });

    //var extent = map.getView().calculateExtent(map.getSize());
    //map.getView().fit(extent, map.getSize());

    //var mousePosition = new ol.control.MousePosition({
    //    coordinateFormat: ol.coordinate.createStringXY(2),
    //    //projection: 'EPSG:4326',
    //    target: document.getElementById('position'),
    //    undefinedHTML: '&nbsp;'
    //});
    //map.addControl(mousePosition);

    var highlightStyleCache = {};
    var featureOverlay = new ol.FeatureOverlay({
        map: map,
        style: function(feature, resolution) {
            //var text = resolution < 5000 ? feature.get('name') : '';
            var text = '';
            if (!highlightStyleCache[text]) {
                highlightStyleCache[text] = [new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: '#f00',
                        width: 3
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255,0,0,0.1)'
                    }),
                    text: new ol.style.Text({
                        font: '12px Calibri,sans-serif',
                        text: text,
                        fill: new ol.style.Fill({
                            color: '#000'
                        }),
                        stroke: new ol.style.Stroke({
                            color: '#f00',
                            width: 3
                        })
                    })
                })];
            }
            return highlightStyleCache[text];
        }
    });

    var highlight;
    var displayFeatureInfo = function(pixel) {

        var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
            return feature;
        });

        var featureName = document.getElementById('featureName');
        if (feature) {
            featureName.innerHTML = feature.get('name');
        } else {
            featureName.innerHTML = '&nbsp;';
        }

        if (feature !== highlight) {
            if (highlight) {
                featureOverlay.removeFeature(highlight);
            }
            if (feature) {
                featureOverlay.addFeature(feature);
            }
            highlight = feature;
        }
        

    };

    map.on('pointermove', function(evt) {
        if (evt.dragging) {
            return;
        }
        var pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
    });

    map.on('click', function(evt) {
        displayFeatureInfo(evt.pixel);
    });

    var selects = document.querySelectorAll('#select input');
    for(var i = 0; i < selects.length; i++) {
        selects[i].addEventListener('change', function(){
            var name = this.getAttribute('name');
            var layer;
            switch(name) {
                case 'wind':
                    layer = lyrWind;
                    break;
                case 'wasser':
                    layer = lyrWasser;
                    break;
                case 'kern':
                    layer = lyrKernkraft;
                    break;
                default:
                    return;
            }

            if(this.checked) {
                layer.setVisible(true);
            } else layer.setVisible(false);
        })
    }


});

