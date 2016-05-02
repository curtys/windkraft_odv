/**
 * Created by sc on 4/30/16.
 */

window.addEventListener('load', function(){

    var width = window.innerWidth-20,
        height = window.innerHeight-20,
        padding = 2.5, // separation between same-color circles
        clusterPadding = 15, // separation between different-color circles
        maxRadius = 12;

    // Reihenfolge der Kantone:
    // ZH, BE, LU, UR, SZ, OW, NW, GL, ZG, FR, SO, (BS), BL, SH, AR, AI, SG, GR, AG, TG, TI, VD, VS, NE, GE, JU
    //['#0066CC', '#E7423F', '#248BCC', '#FFD72E', '#E7423F', '#DD3322', '#E7423F', '#E8423F', '#268BCC',
    //    '#000000', '#E8423F', '#E2001A', '#FFD72E', '#E8423F', '#010202', '#009933', '#FFD72E', '#248BCC', '#16A74E',
    //    '#E8423F', '#16A74E', '#E8423F', '#16A74E', '#FFD134', '#E8423F']

    var color = d3.scale.ordinal().range(["#18c61a", "#9817ff", "#d31911", "#24b7f1", "#fa82ce", "#736c31", "#1263e2",
        "#18c199", "#ed990a", "#f2917f", "#7b637c", "#a8b311", "#a438c0", "#d00d5e", "#1e7b1d", "#05767b", "#aaa1f9",
        "#a5aea1", "#a75312", "#026eb8", "#94b665", "#91529e", "#caa74f", "#c90392", "#a84e5d", "#6a4cf1", "#1ac463",
        "#d89ab1", "#3c764d", "#2dbdc5", "#fb78fa", "#a6a9cd", "#c1383d", "#8b614e", "#73be38", "#ff8d52", "#cea37e",
        "#b53c7e", "#656d61", "#436f90", "#5e7304", "#82b792", "#fb88a3", "#dd8df2", "#6a5cc0", "#d098d5", "#ac15dc",
        "#a4543b", "#76b4cc", "#6963a4", "#8e620d", "#77adf8", "#c9a918", "#99537d", "#acaf7d", "#7850d5", "#ae3a9f",
        "#68bd74", "#e09d60", "#1069cd", "#d50438", "#c03d17", "#79b6af", "#517430", "#db9b94", "#095cf8", "#b1b045",
        "#c0a4a9", "#bc01c1", "#906033", "#e49c3f", "#8e4db9", "#bb3a64", "#cb1478", "#776b09", "#94b743", "#763eff",
        "#1a7a3e", "#617046", "#915c62", "#ec8dc0", "#ba22ac", "#437461", "#913ddc", "#4bbda8"]);


    //var color = d3.scale.category20c()
    //    .domain(d3.range(clusters.length));

    //var drag_behavior = d3.behavior.drag()
    //    .on("drag", function() {
    //            // cancel the drag event
    //            drag_behavior.on("drag", null);
    //
    //    });

    d3.json('data/data.json', function (err, json) {

        var data = json;
        var productionMinimum = 0;


        var l_converter = d3.scale.sqrt().domain(data.valuedomain).nice().range([3, 75]);

        (function() {

            var target = '#vis1', classN = 'vis1', clusters = [], nodes = [], clusterid = 0;

            function createNode(item, plant) {
                if(plant.production < productionMinimum || plant.id == item.highestprodfacility.id) return;
                var node = plant;
                node.cluster = item.abbr;
                node.clusterid = clusterid;
                node.radius = l_converter(plant.production);
                //node.x = Math.cos(clusterid / expectedNumClusters * 2 * Math.PI) * 200 + width / 2 + Math.random();
                //node.y = Math.sin(clusterid / expectedNumClusters * 2 * Math.PI) * 200 + height / 2 + Math.random();
                nodes.push(node);
            }

            data.cantons.forEach(function (item) {
                if(!item.highestprodfacility) return;
                var cluster = item.highestprodfacility;
                cluster.cluster = item.abbr;
                cluster.clusterid = clusterid;
                cluster.radius = l_converter(item.highestprodfacility.production);
                clusters.push(cluster);
                nodes.push(clusters[clusterid]);
                item.hydropowerplants.forEach(function (plant) {
                    createNode(item, plant);
                });
                item.nuclearpowerplants.forEach(function (plant) {
                    createNode(item, plant);
                });
                item.windenergyplants.forEach(function (plant) {
                    createNode(item, plant);
                });
                clusterid++;
            });

            var clickController = (function(d){
                var currElement, prevElement, prevElementColor,
                    highlightColor = '#000', infoEle = document.querySelector(target+' #info');

                return function(d){
                    if(prevElement) {
                        d3.select(prevElement).style('fill', prevElementColor);
                        if(prevElement == this) {
                            prevElement = null;
                            infoEle.innerHTML = '';
                            return
                        }
                    }
                    prevElementColor = d3.select(this).style('fill');
                    d3.select(this).style("fill", highlightColor);
                    prevElement = this;
                    var clusterInfo = dataViewUtility.getCantonByAbbr(data, d.cluster, true);
                    infoEle.innerHTML = 'Cluster Info:<br>'
                        + clusterInfo.name + ' ' + clusterInfo.abbr + '<br>'
                        + 'Production Wasserkraft: ' + clusterInfo.hydropowerproduction + 'GWh' + '<br>'
                        + 'Produktion Kernenergie: ' + clusterInfo.nuclearenergyproduction + 'GWh' + '<br>'
                        + 'Produktion Windenergie: ' + clusterInfo.windenergyproduction + 'GWh' + '<br>'
                        + 'Node Info:<br>' + 'Plant ID: ' + d.id + '<br>' + 'Production: ' + d.production + 'GWh';
                }
            })();

            visualise(target, classN, nodes, clusters, clickController);

        })();


        // second visualisation
        //(function() {
        //
        //    var target = '#vis2', classN = 'vis2', clusters2 = [], nodes2 = [], clusterid = 0, expectedNumClusters = 3;
        //
        //
        //    function createNode2(pivot, plant) {
        //        var node = plant;
        //        node.mode = 'vis2';
        //        node.clusterid = clusterid;
        //        node.radius = l_converter(plant.production);
        //        //node.x = Math.cos(clusterid / expectedNumClusters * 2 * Math.PI) * 200 + width / 2 + Math.random();
        //        //node.y = Math.sin(clusterid / expectedNumClusters * 2 * Math.PI) * 200 + height / 2 + Math.random();
        //        nodes2.push(node);
        //        if(node.id == pivot.id) clusters2.push(node);
        //    }
        //
        //    var hydroplants = dataViewUtility.createJointArray(data, 'hydropowerplants'),
        //        windplants = dataViewUtility.createJointArray(data, 'windenergyplants'),
        //        nuclearplants = dataViewUtility.createJointArray(data, 'nuclearpowerplants');
        //
        //    hydroplants.forEach(function(plant) {
        //        createNode2(data.globalHPFacilityHydro, plant);
        //    });
        //    clusterid++;
        //    windplants.forEach(function(plant) {
        //        createNode2(data.globalHPFacilityWind, plant);
        //    });
        //    clusterid++;
        //    nuclearplants.forEach(function(plant) {
        //        createNode2(data.globalHPFacilityNuclear, plant);
        //    });
        //
        //
        //    var clickController = (function(d){
        //        var currElement, prevElement, prevElementColor,
        //            highlightColor = '#000', infoEle = document.querySelector(target+' #info');
        //
        //        return function(d){
        //            if(prevElement) {
        //                d3.select(prevElement).style('fill', prevElementColor);
        //                if(prevElement == this) {
        //                    prevElement = null;
        //                    infoEle.innerHTML = '';
        //                    return
        //                }
        //            }
        //            prevElementColor = d3.select(this).style('fill');
        //            d3.select(this).style("fill", highlightColor);
        //            prevElement = this;
        //            var clusterInfo = dataViewUtility.getCantonByAbbr(data, d.cluster, true);
        //            infoEle.innerHTML =
        //                'Node Info:<br>' + 'Plant ID: ' + d.id + '<br>' + 'Production: ' + d.production + 'GWh';
        //        }
        //    })();
        //
        //    visualise(target, classN, nodes2, clusters2, clickController);
        //
        //})();



    });

    function visualise(target, className, nodes, clusters, clickController) {

        // Use the pack layout to initialize node positions.
        d3.layout.pack()
            .sort(null)
            .size([width, height])
            .children(function(d) { return d.values; })
            .value(function(d) { return d.radius * d.radius; })
            .nodes({values: d3.nest()
                .key(function(d) { return d.cluster; })
                .entries(nodes)});

        var force = d3.layout.force()
            .nodes(nodes)
            .size([width, height])
            .gravity(.01)
            .charge(0)
            .on("tick", tick)
            .start();

        var svg = d3.select(target).append("svg").classed(className, true)
            .attr("width", width)
            .attr("height", height);

        var circle = svg.selectAll("circle."+className)
            .data(nodes)
            .enter().append('circle').classed(className, true)
            .attr("r", function(d) { return d.radius; })
            .style("fill", function(d) { return color(d.clusterid); })
            .call(force.drag)
            //.on('mousedown.drag', null)
            .on('click', clickController);

        console.log(circle);

        function tick(e) {
            circle
                .each(cluster(10 * e.alpha * e.alpha, clusters))
                .each(collide(.5, nodes))
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        }

    }
    // Move d to be adjacent to the cluster node.
    function cluster(alpha, clusters) {
        return function(d) {
            var cluster = clusters[d.clusterid],
                k = 1;

            // For cluster nodes, apply custom gravity.
            if (cluster === d) {
                cluster = {x: width / 2, y: height / 2, radius: -d.radius};
                k = .1 * Math.sqrt(d.radius);
            }

            var x = d.x - cluster.x,
                y = d.y - cluster.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + cluster.radius;
            if (l != r) {
                l = (l - r) / l * alpha * k;
                d.x -= x *= l;
                d.y -= y *= l;
                cluster.x += x;
                cluster.y += y;
            }
        };
    }

    // Resolves collisions between d and all other circles.
    function collide(alpha, nodes) {
        var quadtree = d3.geom.quadtree(nodes);
        return function(d) {
            var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    var x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }


});