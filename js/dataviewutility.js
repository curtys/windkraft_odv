/**
 * Created by sc on 5/1/16.
 */

var dataViewUtility = {

    createJointArray: function(dataView, propertyName) {
        'use strict';
        var jArr = [];
        dataView.cantons.forEach(function(item) {
            jArr = jArr.concat(item[propertyName]);
        });
        return jArr;
    },
    getMaxProdFacility: function(arr) {
        'use strict';
        var max = Math.max.apply(Math,arr.map(function(o){return o.production;}));
        return arr.find(function(o) { return o.production == max; });
    },
    getCantonalMaxProdFacility: function(obj) {
        'use strict';
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
        'use strict';
        var minHydro = Math.min.apply(Math,obj.hydropowerplants.map(function(o){return o.production;})),
            minNuclear = Math.min.apply(Math,obj.nuclearpowerplants.map(function(o){return o.production;})),
            minWind = Math.min.apply(Math,obj.windenergyplants.map(function(o){return o.production;})),
            min = Math.min(minHydro, minNuclear, minWind);

        var faHydro = obj.hydropowerplants.find(function(o){ return o.production == min; }),
            faNuclear = obj.nuclearpowerplants.find(function(o){ return o.production == min; }),
            faWind = obj.windenergyplants.find(function(o){ return o.production == min; });

        return faHydro || faNuclear || faWind;
    },
    getFacilityType: function(view, facility) {
        'use strict';
        var type;
        view.cantons.some(function(canton) {
            var faHydro = canton.hydropowerplants.find(function(o){ return o.id == facility.id; }),
                  faNuclear = canton.nuclearpowerplants.find(function(o){ return o.id == facility.id; }),
                  faWind = canton.windenergyplants.find(function(o){ return o.id == facility.id; });
            if(faHydro) { type = 'Wasserkraftwerk'; return true; }
            if(faNuclear) { type = 'Kernkraftwerk'; return true; }
            if(faWind) { type = 'Windenergieanlage'; return true; }
        });
        return type;
    },
    globalMin: function(obj) {
        'use strict';
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
        'use strict';
        var localmax = [];
        obj.cantons.forEach(function (canton) {
            //if(canton.highestprodfacility && !Object.getOwnPropertyNames(canton.highestprodfacility).length > 0)
            if(canton.highestprodfacility)
                localmax.push(canton.highestprodfacility.production);
        });
        return Math.max.apply(Math, localmax);
    },
    getCantonByAbbr: function(dataView, abbr, condensed) {
        'use strict';
        condensed = (typeof condensed === 'undefined') ? false : condensed;
        var result;
        dataView.cantons.some(function(canton){
            if(canton.abbr == abbr) {
                if(condensed) {
                    result = {name: canton.name, abbr: canton.abbr, hydropowerproduction: canton.hydropowerproduction,
                        nuclearenergyproduction: canton.nuclearenergyproduction, windenergyproduction: canton.windenergyproduction};
                    return true;
                }
                result = canton;
                return true;
            }
        });
        return result;
    },
    getCantonByPlantId: function(view, plantId, condensed) {
        'use strict';
        condensed = (typeof condensed === 'undefined') ? false : condensed;
        var result;
        view.cantons.some(function(canton) {
            var faHydro = canton.hydropowerplants.find(function(o){ return o.id == plantId; }),
                faNuclear = canton.nuclearpowerplants.find(function(o){ return o.id == plantId; }),
                faWind = canton.windenergyplants.find(function(o){ return o.id == plantId; });
            if(faHydro || faNuclear || faWind) {
                if(condensed) {
                    result = {name: canton.name, abbr: canton.abbr, hydropowerproduction: canton.hydropowerproduction,
                        nuclearenergyproduction: canton.nuclearenergyproduction, windenergyproduction: canton.windenergyproduction};
                    return true;
                }
                result = canton;
                return true;
            }
        });
        return result;
    },
    clone: function (obj) {
        'use strict';
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
};