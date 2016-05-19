<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Windkraft</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/vis.css">
    <!--    <link rel='stylesheet' href='css/nprogress.css'/>-->
    <!--    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min.js"></script>-->
    <script src="http://d3js.org/d3.v3.min.js"></script>
<!--    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>-->
<!--    <script src="/js/tipso.min.js"></script>-->
    <!--    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js'></script>-->
    <!--    <script src='js/modernizr.js'></script>-->
    <!--    <script src='js/nprogress.js'></script>-->
    <!--    <script src='js/dynamicpage.js'></script>-->
    <script src="js/d3-tip.js"></script>
    <script src="js/dataviewutility.js"></script>
    <script src="js/visualization.js"></script>

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
    <a href="index.php"><div id="nav-back">&#10148;</div></a>
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
    

    
<!--<a href="vis2.php">Produktion von Wasserkraft, Kernkraft und Windenergie</a>-->

<div id="vis-cont">
    <div class="spacer"></div>
    <div id="vis"></div>
    <div id="descr"></div>
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
</html>