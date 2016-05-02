/**
 * Created by sc on 5/1/16.
 */

dataViewUtility = {

    createJointArray: function(dataView, propertyName) {
        var jArr = [];
        dataView.cantons.forEach(function(item) {
            jArr = jArr.concat(item[propertyName]);
        });
        return jArr;
    },
    getMaxProdFacility: function(arr) {
        var max = Math.max.apply(Math,arr.map(function(o){return o.production;}));
        return arr.find(function(o) {return o.production == max});
    },
    getCantonalMaxProdFacility: function(obj) {
        var maxHydro = Math.max.apply(Math,obj.hydropowerplants.map(function(o){return o.production;})),
            maxNuclear = Math.max.apply(Math,obj.nuclearpowerplants.map(function(o){return o.production;})),
            maxWind = Math.max.apply(Math,obj.windenergyplants.map(function(o){return o.production;})),
            max = Math.max(maxHydro, maxNuclear, maxWind);

        var faHydro = obj.hydropowerplants.find(function(o){ return o.production == max; }),
            faNuclear = obj.nuclearpowerplants.find(function(o){ return o.production == max; }),
            faWind = obj.windenergyplants.find(function(o){ return o.production == max; });

        return faHydro || faNuclear || faWind;
    },
    getCantonalMinProdFacility: function(obj) {
        var minHydro = Math.min.apply(Math,obj.hydropowerplants.map(function(o){return o.production;})),
            minNuclear = Math.min.apply(Math,obj.nuclearpowerplants.map(function(o){return o.production;})),
            minWind = Math.min.apply(Math,obj.windenergyplants.map(function(o){return o.production;})),
            min = Math.min(minHydro, minNuclear, minWind);

        var faHydro = obj.hydropowerplants.find(function(o){ return o.production == min; }),
            faNuclear = obj.nuclearpowerplants.find(function(o){ return o.production == min; }),
            faWind = obj.windenergyplants.find(function(o){ return o.production == min; });

        return faHydro || faNuclear || faWind;
    },
    globalMin: function(obj) {
        var localmin = [];
            obj.cantons.forEach(function (canton) {
                localmin.push(Math.min(Math.min.apply(Math, canton.hydropowerplants.map(function (o) { return o.production; })),
                    Math.min.apply(Math, canton.nuclearpowerplants.map(function (o) { return o.production; })),
                    Math.min.apply(Math, canton.windenergyplants.map(function (o) { return o.production; })))
                );
            });
        return Math.min.apply(Math, localmin);
    },
    globalMax: function(obj) {
        var localmax = [];
        obj.cantons.forEach(function (canton) {
            //if(canton.highestprodfacility && !Object.getOwnPropertyNames(canton.highestprodfacility).length > 0)
            if(canton.highestprodfacility)
                localmax.push(canton.highestprodfacility.production);
        });
        return Math.max.apply(Math, localmax);
    },
    getCantonByAbbr: function(dataView, abbr, condensed) {
        condensed = (typeof condensed === 'undefined') ? false : condensed;
        var result;
        dataView.cantons.some(function(canton){
            if(canton.abbr == abbr) {
                if(condensed) {
                    var cantonCondensed = {name: canton.name, abbr: canton.abbr, hydropowerproduction: canton.hydropowerproduction,
                        nuclearenergyproduction: canton.nuclearenergyproduction, windenergyproduction: canton.windenergyproduction};
                    result = cantonCondensed;
                    return true;
                }
                result = canton;
                return true;
            }
        });
        return result;
    }
};