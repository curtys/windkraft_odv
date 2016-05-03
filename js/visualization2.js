/**
 * Created by sc on 4/30/16.
 */

window.addEventListener('load', function(){

    var width = window.innerWidth-20,
        height = window.innerHeight-20,
        padding = 5, // separation between same-color circles
        clusterPadding = 30, // separation between different-color circles
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

    d3.json('data/data.json', function (err, json) {

        var data = json;
        var productionMinimum = 0;
        var configuration1 = {}, configuration2 = {};


        var l_converter = d3.scale.sqrt().domain(data.valuedomain).nice().range([3, 75]);

        // second visualisation
        (function() {

            var target = '#vis', classN = 'vis2', clusters = [], nodes = [], clusterid = 0, expectedNumClusters = 3;


            function createNode(pivot, plant) {
                var node = dataViewUtility.clone(plant);
                node.clusterid = clusterid;
                node.radius = l_converter(plant.production);
                //node.x = Math.cos(clusterid / expectedNumClusters * 2 * Math.PI) * 200 + width / 2 + Math.random();
                //node.y = Math.sin(clusterid / expectedNumClusters * 2 * Math.PI) * 200 + height / 2 + Math.random();
                nodes.push(node);
                if(node.id == pivot.id) clusters.push(node);
            }

            var hydroplants = dataViewUtility.createJointArray(data, 'hydropowerplants'),
                windplants = dataViewUtility.createJointArray(data, 'windenergyplants'),
                nuclearplants = dataViewUtility.createJointArray(data, 'nuclearpowerplants');

            hydroplants.forEach(function(plant) {
                createNode(data.globalHPFacilityHydro, plant);
            });
            clusterid++;
            windplants.forEach(function(plant) {
                createNode(data.globalHPFacilityWind, plant);
            });
            clusterid++;
            nuclearplants.forEach(function(plant) {
                createNode(data.globalHPFacilityNuclear, plant);
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
                    infoEle.innerHTML =
                        'Node Info:<br>' + 'Plant ID: ' + d.id + '<br>' + 'Production: ' + d.production + 'GWh';
                }
            })();

            configuration2 = createConfiguration(2, target, classN, nodes, clusters, clickController);
            //visualise(target, classN, nodes, clusters, clickController);

        })();

        var vis = visualise(configuration2);


    });

    function createConfiguration(configID, target, className, nodes, clusters, clickcontroller) {
        return {configID: configID, target: target, className: className, nodes: nodes, clusters: clusters, clickcontroller: clickcontroller};
    }

    function visualise(configuration) {
        var target = configuration.target,
            className = configuration.className,
            nodes = configuration.nodes,
            clusters = configuration.clusters,
            clickController = configuration.clickcontroller;

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


        function tick(e) {
            circle
                .each(cluster(10 * e.alpha * e.alpha, clusters))
                .each(collide(.5, nodes))
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        }

        return {configID: configuration.configID, force: force, svg: svg, circle: circle};

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