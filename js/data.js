/**
 * Created by sc on 4/10/16.
 */

// AJAX REST Client for Geo Admin REST Service
gaRestClient = {
    _gaServer: 'https://api3.geo.admin.ch/rest/services/api',
    _mapServer: '/MapServer',
    _searchServer: '/SearchServer',
    _lang: '?lang=de',
    _verbSearch: '?searchText=',
    _verbLegend: 'legend',
    // LayerBodId with keys
    _layerBodId: {
        wasser: 'ch.bfe.statistik-wasserkraftanlagen',
        wind: 'ch.bfe.windenergieanlagen',
        kernkraft: 'ch.bfe.kernkraftwerke',
        grenzeKanton: 'ch.swisstopo.swissboundaries3d-kanton-flaeche.fill'
    },
    failed: 0,
    _execQuery: function (query, callback) {
        //alert(this._gaServer+query);
        $.ajax({
            url: this._gaServer + query
        }).then(function (data) {
            callback(data);
        }).fail(function (err) {
            gaRestClient.failed++;
            console.log('Request failed: '+err.status+' '+err.statusText);
        });
    },
    getLayerMeta: function(searchText, callback) {
        var query = searchText ? this._verbSearch+searchText : '';
        query = this._mapServer+query;
        this._execQuery(query, callback);
    },
    // does not expose attributes but attribute names
    getLayerAttributes: function(layerBodId, callback) {
        var query = this._mapServer+'/'+layerBodId;
        this._execQuery(query, callback);
    },
    getLayerLegend: function(layerBodId, callback) {
        var query = this._mapServer+'/'+layerBodId+'/'+this._verbLegend;
        this._execQuery(query, callback);
    },
    find: function(layerBodId, searchText, searchField, callback) {
        var query = this._mapServer+'/find?layer='+layerBodId+'&searchText='+searchText+'&searchField='+searchField+'&returnGeometry=false';
        this._execQuery(query, callback);
    },
    getWasserkraftanlagen: function(callback){
        this.find(this._layerBodId.wasser, '', 'id', callback);
    },
    getWindenergieanlagen: function(callback){
        this.find(this._layerBodId.wind, '', 'id', callback);
    },
    identifyCantonAtCoord: function(coordinate, callback) {
        var query = this._mapServer+'/identify?geometryType=esriGeometryPoint&geometry='+coordinate.toString() +
            '&imageDisplay=500,600,96&mapExtent=548945.5,147956,549402,148103.5&tolerance=0' +
            '&layers=all:'+this._layerBodId.grenzeKanton+'&returnGeometry=false';
        this._execQuery(query, callback);

    }
};

xmlLoader = {
    load: function(xmlFile, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                callback(xhttp);
            }
        };
        xhttp.onerror = function() {
            alert('error');
        };

        xhttp.open("GET", xmlFile, true);
        xhttp.send();
    }
};

dataManager = {
    dataCantons: null,
    dataHydropower: null,
    dataWindenergy: null,
    dataNuclearenergy: null,
    dataState: 'initial',
    event: new Event('dataready'),

    accessData: function(xmlDoc, tagName) {
        var out = [];
        var extracted = xmlDoc.getElementsByTagName(tagName);
        for(var i = 0; i < extracted.length; i++) {
            out.push(extracted[i].childNodes[0].nodeValue);
        }
        return out;
    },
    checkDataState: function() {
        if(this.dataCantons && this.dataHydropower && this.dataWindenergy && this.dataNuclearenergy)
        {
            console.log('Data is loaded');
            this.dataState = 'ready';
            window.dispatchEvent(this.event);
        }
        // if (this.dataCantons) console.log('cantons loaded');
        // if (this.dataHydropower) console.log('hydropower loaded');
        // if (this.dataWindenergy) console.log('wind loaded');
        // if (this.dataNuclearenergy) console.log('nuclear loaded');
    },
    storeCantonsData: function(data) {
        this.dataState = 'storing';
        this.dataCantons = data.responseXML;
        this.checkDataState();
    },
    storeHydropowerData: function(data) {
        if(data) {
            this.dataState = 'storing';
            this.dataHydropower = data.responseXML;
            this.checkDataState();
        } else console.log('Data not found');
    },
    storeWindenergyData: function(data) {
        if(data) {
            this.dataState = 'storing';
            this.dataWindenergy = data.responseXML;
            this.checkDataState();
        } else console.log('Data not found');

    },
    storeNuclearenergyData: function(data) {
        if(data) {
            this.dataState = 'storing';
            this.dataNuclearenergy = data.responseXML;
            this.checkDataState();
        } else console.log('Data not found');
    }
};

utility = {
    kWhToGWh: function (num) {
        return num / 1000000;
    },
    CH109plusToCH1903: function (coordinate) {
        var y = coordinate[0] - 2000000;
        var x = coordinate[1] - 1000000;
        return [y, x];
    },
    round: function (num) {
        return Math.round(num*1000)/1000;
    }
};


(function () {

    window.addEventListener('load', function() {
        document.getElementById('data').innerHTML = '<h1>Processing</h1>';
        console.log('Document loaded');
    });

    function callbackHydro(data) {
        dataManager.storeHydropowerData(data);
    }
    function callbackWind(data) {
        dataManager.storeWindenergyData(data);
    }
    function callbackNuclear(data) {
        dataManager.storeNuclearenergyData(data);
    }
    function callbackOutput(data) {
        dataManager.storeCantonsData(data);
    }

    //xmlLoader.load('data/hydropowerplants.xtf', callbackHydro);
    //xmlLoader.load('data/nuclearpowerplants.xtf', callbackNuclear);
    xmlLoader.load('data/source/nuclearpower.xml', callbackNuclear);
    xmlLoader.load('data/source/hydropower2015.xml', callbackHydro);
    xmlLoader.load('data/source/cantons.xml', callbackOutput);
    xmlLoader.load('data/source/windenergyplantsXML.xml', callbackWind);

    function buildDataView() {

        console.log('DataView build started');

        var cantonsName = dataManager.accessData(dataManager.dataCantons, 'Name');
        var cantonsAbbr = dataManager.accessData(dataManager.dataCantons, 'Abbr');

        var dataView = new Object();
        dataView.cantons = [];
        for(var i = 0; i < cantonsName.length; i++) {
            dataView.cantons.push({
                name: cantonsName[i],
                abbr: cantonsAbbr[i]
            });
        }

        var rowsHydro = dataManager.dataHydropower.getElementsByTagName('Row');
        var kkws = dataManager.dataNuclearenergy.getElementsByTagName('plant');
        var windfacilities = dataManager.dataWindenergy.getElementsByTagName('Windenergyplants_V1.Plant.Facility');
        var windplants = [];

        // Wind
        Array.from(windfacilities).forEach(function(item) {
            var E = item.getElementsByTagName('C1')[0].childNodes[0].nodeValue;
            var N = item.getElementsByTagName('C2')[0].childNodes[0].nodeValue;
            var coordCH1903 = utility.CH109plusToCH1903([E, N]);

            var id = item.getAttribute('TID');
            id = id.split('_')[1];
            var name = item.getElementsByTagName('name')[0].childNodes[0].nodeValue;
            var prod = dataManager.dataWindenergy.getElementsByTagName('Windenergyplants_V1.Production');
            var itemProd = $(prod).find('[TID=production_'+id+'_2015] production');
            if(itemProd.length > 0)  {
                windplants.push({
                    id: id,
                    name: name,
                    canton: null,
                    coordinate: coordCH1903,
                    // kWh
                    production: utility.round(utility.kWhToGWh(itemProd[0].childNodes[0].nodeValue))
                });
            }
        });

        // control values
        gaRestClient.failed = 0;
        var ctrExp = windplants.length;
        var ctrCount = 0;
        windplants.forEach(function(item){
            contactServer(item);
        });

        //asynchronous
        function contactServer(item) {
            gaRestClient.identifyCantonAtCoord(item.coordinate, function(data){
                item.canton = data.results[0].attributes.ak;
                ctrCount++;
                if(ctrCount+gaRestClient.failed == ctrExp) checkConsistency();
            });
        }

        var maxRetries = 20;
        var currRetries = 0;
        function checkConsistency() {
            if(currRetries == maxRetries) {
                console.log('DataView build failed');
                alert('Information fetch ERROR: The Server does not respond or there is no connection');
            }
            if (gaRestClient.failed == 0) {
                // check if all entries are really valid
                var validEntries = 0;
                windplants.forEach(function (item) {
                    if (item.canton) validEntries++;
                });
                if (validEntries == windplants.length) {
                    console.log('Consistency check: done');
                    window.dispatchEvent(new Event('fetchcomplete'));
                    return;
                }
            }
            console.log('Consistency check: ' + gaRestClient.failed+' request(s) failed');
            console.log('Retry');
            ctrExp = gaRestClient.failed;
            gaRestClient.failed = 0;
            ctrCount = 0;
            windplants.forEach(function (item) {
                if (!item.canton) {
                    contactServer(item);
                }
            });

        }

        
        for(var i = 0; i < dataView.cantons.length; i++) {
            // Wasser
            dataView.cantons[i].hydropowerplants = [];
            for(var j = 0; j < rowsHydro.length; j++) {
                var data = rowsHydro[j].getElementsByTagName('Data');
                if(data.length > 0 && data[5].childNodes[0].nodeValue == (dataView.cantons[i].name).replace('. ', '.')
                    && data[6].childNodes[0].nodeValue == 'im Normalbetrieb' && data[13].childNodes[0].nodeValue > 0) {
                    var coordN = Number(data[data.length-2].childNodes[0].nodeValue);
                    var coordE = Number(data[data.length-1].childNodes[0].nodeValue);
                    dataView.cantons[i].hydropowerplants.push({
                        id: data[0].childNodes[0].nodeValue,
                        name: data[1].childNodes[0].nodeValue,
                        type: 'Wasserkraftwerk',
                        // unit: GWh
                        production: utility.round(data[16].childNodes[0].nodeValue),
                        coordinate: [coordN, coordE]
                    });
                    // console.log(data[data.length-1].childNodes[0].nodeValue);
                    // console.log(data.length);
                }
            }
            // Kernkraft
            dataView.cantons[i].nuclearpowerplants = [];
            for(var y = 0; y < kkws.length; y++) {
                var data = kkws[y];
                var canton = data.getElementsByTagName('canton')[0].childNodes[0].nodeValue;
                if(canton == dataView.cantons[i].name) {
                    var coordE = Number(data.getElementsByTagName('coordE')[0].childNodes[0].nodeValue);
                    var coordN = Number(data.getElementsByTagName('coordN')[0].childNodes[0].nodeValue);
                    dataView.cantons[i].nuclearpowerplants.push({
                        id: data.getElementsByTagName('id')[0].childNodes[0].nodeValue,
                        name: data.getElementsByTagName('name')[0].childNodes[0].nodeValue,
                        type: 'Kernkraftwerk',
                        // unit: GWh
                        production: utility.round(data.getElementsByTagName('production')[0].childNodes[0].nodeValue),
                        coordinate: [coordN, coordE]
                    });
                }
            }
        }

        function assemble() {
            dataView.cantons.forEach(function(canton){
                canton.windenergyplants = [];
                windplants.forEach(function(plant){
                   if(canton.abbr == plant.canton) canton.windenergyplants.push({
                       id: plant.id,
                       name: plant.name,
                       type: 'Windenergieanlage',
                       production: plant.production,
                       // unscharf reicht aus
                       coordinate: [Math.round(plant.coordinate[0]), Math.round(plant.coordinate[1])]
                   });
                });
            });
        }
        function eval() {
            var globalhydropowerproduction = 0, globalnuclearenergyprodution = 0, globalwindenergyproduction = 0;
            dataView.cantons.forEach(function(canton) {
                canton.hydropowerproduction = 0;
                canton.nuclearenergyproduction = 0;
                canton.windenergyproduction = 0;
                canton.hydropowerplants.forEach(function(plant){
                    canton.hydropowerproduction += Number(plant.production);
                });
                canton.nuclearpowerplants.forEach(function(plant){
                    canton.nuclearenergyproduction += Number(plant.production);
                });
                canton.windenergyplants.forEach(function(plant){
                    canton.windenergyproduction += Number(plant.production);
                });
                canton.hydropowerproduction = utility.round(canton.hydropowerproduction);
                canton.nuclearenergyproduction = utility.round(canton.nuclearenergyproduction);
                canton.windenergyproduction = utility.round(canton.windenergyproduction);
                globalhydropowerproduction += Number(canton.hydropowerproduction);
                globalnuclearenergyprodution += Number(canton.nuclearenergyproduction);
                globalwindenergyproduction += Number(canton.windenergyproduction);

                var hprod = dataViewUtility.getCantonalMaxProdFacility(canton);
                canton.highestprodfacility = hprod ? hprod : null;
            });
            dataView.globalhydropowerproduction = utility.round(globalhydropowerproduction);
            dataView.globalnuclearenergyprodution = utility.round(globalnuclearenergyprodution);
            dataView.globalwindenergyproduction = utility.round(globalwindenergyproduction);

            dataView.valuedomain = [dataViewUtility.globalMin(dataView), dataViewUtility.globalMax(dataView)];
            dataView.globalHPFacilityHydro = dataViewUtility.getMaxProdFacility(dataViewUtility.createJointArray(dataView, 'hydropowerplants'));
            dataView.globalHPFacilityNuclear = dataViewUtility.getMaxProdFacility(dataViewUtility.createJointArray(dataView, 'nuclearpowerplants'));
            dataView.globalHPFacilityWind = dataViewUtility.getMaxProdFacility(dataViewUtility.createJointArray(dataView, 'windenergyplants'));
            dataView.annualenergyproduction = 66000;
            dataView.asat = 2015;

        }
        function clean() {
            dataView.cantons.forEach(function(canton){
                if(canton.hydropowerplants.length == 0) canton.hydropowerplants = null;
                if(canton.nuclearpowerplants.length == 0) canton.nuclearpowerplants = null;
                if(canton.windenergyplants.length == 0) canton.windenergyplants = null;
            })
        }

        function printDataView() {
            var ele = document.getElementById('data');
            ele.innerHTML = JSON.stringify(dataView);
        }

        window.addEventListener('fetchcomplete', function () {
            assemble();
            eval();
            console.log('DataView built successfully');
            if (document.readyState === 'complete') printDataView();
            else window.addEventListener('load', printDataView);
        });

    }

    if(dataManager.dataState === 'ready') buildDataView();
    else window.addEventListener('dataready', function() {
        buildDataView();
        window.removeEventListener('dataready', this);
    });



})();