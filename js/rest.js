/**
 * Created by sc on 4/10/16.
 */

// AJAX REST Client for Geo Admin REST Service

gaRestClient = {
    _gaServer: 'https://api3.geo.admin.ch/rest/services/api/MapServer',
    _verbSearch: '?searchText=',
    _verbLegend: 'legend',
    _execQuery: function(query, callback) {
        $.ajax({
            url: this._gaServer+query
        }).then(function(data){
            callback(data);
        });
    },
    getLayerMeta: function(searchText, callback) {
        query = searchText ? this._verbSearch+searchText : '';
        this._execQuery(query, callback);
    },
    getLayerAttributes: function(layerBodId, callback) {
        query = '/'+layerBodId;
        this._execQuery(query, callback);
    },
    getLayerLegend: function(layerBodId, callback) {
        query = '/'+layerBodId+'/'+this._verbLegend;
        this._execQuery(query, callback);
    }
};


// LayerBodId with keys
layerBodId = {
    wasser: 'ch.bfe.statistik-wasserkraftanlagen',
    wind: 'ch.bfe.windenergieanlagen ',
    kernkraft: 'ch.bfe.kernkraftwerke'
};

(function () {
        function callback(data) {
            function parseJSON(data) {
                var ele = document.getElementById('rest');
                ele.innerHTML = JSON.stringify(data);
            }
            if (document.readyState === "complete") parseJSON(data);
            else window.addEventListener('load', function(){parseJSON(data)});
        }
        gaRestClient.getLayerAttributes(layerBodId.wasser, callback);
    }
)();