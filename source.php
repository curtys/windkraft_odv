<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <meta name="description"
          content="Open Data Visualisierung der Stromproduktion von Wasser-, Wind- und Kernkraftwerken">
    <title>Energieproduktion der Schweiz - Source</title>
    <link rel="stylesheet" type="text/css" href="css/main.min.css">
    <link rel="stylesheet" type="text/css" href="css/aux.min.css">

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
<h1>Datenquellen und Source Code</h1>
<div id="content">
    <section>
        <h2>Datenquellen</h2>
        <p>Datenstand: 2016, über das Jahr 2015.</p>
        <article>
            <h4>Wasserkraft:</h4>
            <p>Bundesamt für Energie BFE, <a
                    href="http://www.bfe.admin.ch/themen/00490/00491/index.html?lang=de&dossier_id=01049">
                    Statistik der Wasserkraftanlagen der Schweiz</a></p><br>
            <h4>Windenergie:</h4>
            <p>geocat.ch, <a
                    href="http://www.geocat.ch/geonetwork/srv/ger/md.viewer#/full_view/b11962c5-cad9-4783-9e88-d8248e90c47f">
                    Geodatenmodell</a></p><br>
            <h4>Kernkraft:</h4>
            <p>International Atomic Energy Agency IAEA, <a
                    href="https://www.iaea.org/pris/CountryStatistics/CountryDetails.aspx?current=CH">
                    Power Reactor Information System</a></p>
        </article>
    </section>
    <section>
        <h2>Source Code</h2>
        <article><p>Der Quellcode ist auf Github verfügbar. <a href=""> zum Repository</a></p>
            <p>Es steht ebenfalls der aufbereitete Datensatz zum Download zur Verfügung. Dokumentation zum Datensatz
                findest du unten.
                <a href="data/data.json"> data.json</a></p></article>

        <article>
            <h4>Datenschema</h4>
        <pre>
            <code><?php include 'data/schema.json' ?></code>
        </pre>

            <table>
                <thead>
                <tr>
                    <th>Feld</th>
                    <th>Beschreibung</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>id</td>
                    <td>Identifikationsnummer des Kraftwerks vom BFE.</td>
                </tr>
                <tr>
                    <td>production</td>
                    <td>Gesamtjährliche Energieproduktion des Kraftwerkes in GWh</td>
                </tr>
                <tr>
                    <td>type</td>
                    <td>Typ des Kraftwerks: Wasserkraftwerk, Kernkraftwerk oder Windenergieanlage</td>
                </tr>
                <tr>
                    <td>hydropowerproduction</td>
                    <td>Gesamtjährliche Energieproduktion aus Wasserkraft eines Kantons in GWh</td>
                </tr>
                <tr>
                    <td>highestprodfacility</td>
                    <td>Das am meisten produzierende Kraftwerk des Kantons</td>
                </tr>
                <tr>
                    <td>globalhydropowerproduction</td>
                    <td>Gesamtjährliche Energieproduktion aller Wasserkraftwerke der Schweiz in GWh</td>
                </tr>
                <tr>
                    <td>valuedomain</td>
                    <td>Niedrigster und hächster Produktionswert in GWh</td>
                </tr>
                <tr>
                    <td>globalHPFacilityHydro</td>
                    <td>Das Schweizweit am meisten produzierende Wasserkraftwerk</td>
                </tr>
                <tr>
                    <td>annualenergyproduction</td>
                    <td>Gesamtenergieproduktion der Schweiz in GWh</td>
                </tr>
                <tr>
                    <td>asat</td>
                    <td>Das Jahr, über welches der Datensatz Informationen enthält</td>
                </tr>

                </tbody>
            </table>

        </article>
    </section>
</div>
<div id="footer">
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