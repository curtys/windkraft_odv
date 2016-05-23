<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <meta name="description"
          content="Open Data Visualisierung der Stromproduktion von Wasser-, Wind- und Kernkraftwerken">
    <title>Energieproduktion der Schweiz - FAQ</title>
    <link rel="stylesheet" type="text/css" href="css/main.min.css">
    <link rel="stylesheet" type="text/css" href="css/auxiliary.min.css">

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

    <h1>FAQ</h1>
    <div id="content">
        <section>
            <article>
                <h3>Welches ist der Stand der Visualisierungen</h3>
                <p>Stand der visualisierten Daten ist 2015</p>
            </article>
            <article>
                <h3>Woher stammen die Daten?</h3>
                <p>Die Daten zu Wind- und Wasserkraft stammen vom BFE und die Daten zur Kernkraft vom PRIS des IAEA.
                    Mehr Informationen findest du in der Dokumentation <a href="source.php"> hier</a>.</p>
            </article>
            <article>
                <h3>Wo kann ich den Quellcode finden?</h3>
                <p>Der gesamte Quellcode ist auf Github öffentlich verfügbar.
                    <a target="_blank" href="https://github.com/curtys/windkraft_odv"> zum Repository</a></p>
            </article>
            <article>
                <h3>Was sind die Grössenverhältnisse in den Visualisierungen?</h3>
                <p>Jeder Kreis repräsentiert ein Kraftwerk und die Grösse des Kreises widerspiegelt dessen ganzjährliche
                    Produktion.
                    Dementsprechend widerspiegelt die kummulierte Grösse aller Kreise einer Gruppe die ganzjährliche
                    Produktion von dieser Gruppe.</p>
            </article>
            <article>
                <h3>Kann aus der Visualisierung auf die Besitzverhältnisse von Kraftwerken geschlossen werden?</h3>
                <p>Nein, bei der Gruppierung nach Kantonen handelt es sich beim jeweiligen Kanton bloss um den Standort.
                    Ein Kanton kann auch Kraftwerke in anderen Kantonen oder im Ausland besitzen.</p>
            </article>
        </section>

    </div>
    <div id="footer">
        <div>Simon Curty | Universität Bern | Open Data</div>
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