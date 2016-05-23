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
    <link rel="stylesheet" type="text/css" href="css/vis2.min.css">
    <script src="http://d3js.org/d3.v3.min.js"></script>
    <script src="js/d3-tip.min.js"></script>
    <script src="js/dataviewutility.min.js"></script>
    <script src="js/visualization2.min.js"></script>

</head>
<body>
<div id="container">
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

    <h1>Produktion von Wasserkraft, Kernkraft und Windenergie</h1>
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
                    Diese Visualisierung zeigt eine Gruppierung aller Wasser-, Wind- und Kernkraftwerke der Schweiz,
                    wobei jeder Kreis ein Kraftwerk darstellt. Die Grösse eines Kreises widerspiegelt die
                    Produktionsmenge des Kraftwerks.<br>
                    <br>
                    Tippe auf einen Kreis, um mehr über das Kraftwerk zu erfahren.
                </div>
            </fieldset>
            <fieldset id="backup-descr"></fieldset>

        </div>


        <!--<a href="vis2.php">Produktion von Wasserkraft, Kernkraft und Windenergie</a>-->

        <div id="vis-cont">
            <div class="spacer"></div>
            <div id="vis" class="vis2"></div>
            <div id="descr"></div>
        </div>
    </div>
    <div id="footer">
        Simon Curty | Universität Bern | Open Data
    </div>
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
<!--<div id="nprogress"></div>-->
</html>