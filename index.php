<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Windkraft</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
    <script src="http://api3.geo.admin.ch/loader.js?lang=en" type="text/javascript"></script>
    <script src="js/rest.js"></script>
<!--    <script type="text/javascript" src="http://www.openlayers.org/api/OpenLayers.js"></script>-->
<!--    <script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.3.0"></script>-->
    <script src="js/main.js" type="text/javascript"></script>
    <script src="js/map.js" type="text/javascript"></script>
<!--    <script src="js/map_topo.js" type="text/javascript"></script>-->

</head>
<body>

<div id="map" class="map">
    <div class="pseudo-filter"></div>
</div>
<!--<div id="position"></div>-->
<div id="info-cont">
    <div id="featureName"></div>
</div>
<div id="select">
    <input type="checkbox" name="wind">
    <label for="wind">Windenergieanlagen</label>
    <br>
    <input type="checkbox" name="wasser">
    <label for="wasser">Wasserkraftanlagen</label>
    <br>
    <input type="checkbox" name="kern">
    <label for="kern">Kernkraftwerke</label>
</div>

<div id="enter-vis">Show me some data!</div>
<div id="vis">
    <div id="exit-vis"><?php echo file_get_contents('img/exit.svg') ?></div>
    <div id="rest"></div>
</div>

</body>
<!--<script src="js/map.js" type="text/javascript"></script>-->
</html>