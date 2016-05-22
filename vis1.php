<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <meta name="description"
          content="Open Data Visualisierung der Stromproduktion von Wasser-, Wind- und Kernkraftwerken">
    <title>Energieproduktion der Schweiz</title>
    <link rel="stylesheet" type="text/css" href="css/main.min.css">
    <link rel="stylesheet" type="text/css" href="css/vis.min.css">
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="js/d3-tip.min.js"></script>
    <script src="js/dataviewutility.min.js"></script>
    <script src="js/visualization1.min.js"></script>

</head>
<body>
<!-- The overlay -->
<div id="nav" class="overlay">

    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    <div class="overlay-content">
        <a href="index.php">Startseite</a>
        <a href="vis1.php">Energieproduktion der Kantone</a>
        <a href="vis2.php">Produktion von Wasserkraft, Kernkraft und Windenergie</a>
        <a href="faq.php">FAQ</a>
        <a href="source.php">Datenquellen und Source Code</a>
    </div>

</div>

<nav>
    <a href="index.php">
        <div id="nav-back">&#10148;</div>
    </a>
    <div id="nav-menu" onclick="openNav()">&#9776;</div>
</nav>


<h1>Energieproduktion der Kantone</h1>
<div id="content">

    <div id="info-flex">
        <fieldset id="legend">
            <legend><h3>Legende</h3></legend>
            <ul id="legend-cont">
            </ul>
        </fieldset>
        <fieldset id="info">
            <legend><h3>Info</h3></legend>
            <div id="info-cont">
                Diese Visualisierung zeigt die Kraftwerke eines Kantons, wobei jeder Kreis ein Kraftwerk darstellt.
                Die Grösse eines Kreises widerspiegelt die Produktionsmenge des Kraftwerks.<br>
                <br>
                Tippe auf einen Kreis, um mehr über das Kraftwerk zu erfahren.
            </div>
        </fieldset>
        <fieldset id="backup-descr"></fieldset>

    </div>

    <div id="vis-cont">
        <div class="spacer"></div>
        <div id="vis"></div>
        <div id="descr"></div>
    </div>

<!--    <iframe name="framemap"-->
<!--            src="http://map.geo.admin.ch/embed.html?X=190000.00&Y=660000.00-->
<!--            &zoom=2&lang=de&topic=ech&bgLayer=ch.swisstopo.pixelkarte-farbe-->
<!--            &layers=ch.swisstopo.swissboundaries3d-land-flaeche.fill,ch.bfe.statistik-wasserkraftanlagen,ch.bfe.kernkraftwerke,ch.bfe.windenergieanlagen">-->
<!--        <!-- Map -->-->


</div>

<script>
    /* Open */
    function openNav() {
        document.getElementById("nav").style.height = "100%";
    }

    /* Close */
    function closeNav() {
        document.getElementById("nav").style.height = "0%";
    }
</script>

</body>
</html>