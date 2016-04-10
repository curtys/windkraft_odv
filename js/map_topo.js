window.addEventListener('load', function () {


    var vectorKantone = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'data/g1k15.kml',
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
            url: 'data/g1l15.kml',
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
    lyrKernkraft.setVisible(false);


    var lyr1 = ga.layer.create('ch.swisstopo.pixelkarte-grau');

    var map = new ga.Map({
        target: 'map',
        layers: [lyr1, vectorGrenze, vectorKantone, lyrWind, lyrWasser, lyrKernkraft],
        view: new ol.View({
            resolution: 250,
            center: [670000, 160000]
        })
    });

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