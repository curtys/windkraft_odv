<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <meta name="description" content="Open Data Visualisierung der Stromproduktion von Wasser-, Wind- und Kernkraftwerken" >
    <title>Energieproduktion der Schweiz - Start</title>
    <link rel="stylesheet" type="text/css" href="css/main.min.css">
    <link rel="stylesheet" type="text/css" href="css/index.min.css">

</head>
<body>
<header>
    <h1>Energieproduktion der Schweiz</h1>
    <h2>Eine Visualisierung von Wind-, Wasser- und Kernkraftwerken</h2>
    <div id="features">
        <div><?php echo file_get_contents('img/wind.svg'); ?></div>
        <div><?php echo file_get_contents('img/water.svg'); ?></div>
        <div><?php echo file_get_contents('img/nuclear.svg'); ?></div>
    </div>

</header>

<div id="access">
    <article class="link-item">
        <a href="vis1.php">
            <div>
                <h3>Energieproduktion der Kantone</h3>
                <div class="inner-flex">
                    <div class="inner-item thumb">
                        <?php echo file_get_contents('img/vis1.svg'); ?>
                    </div>
                    <div class="inner-item">
                        Ein Vergleich der Elektrizitätsproduktion der verschiedenen Kantone.<br>
                        &#10148; zur Visualisierung
                    </div>

                </div>
            </div>
        </a>
    </article>
    <article class="link-item">
        <a href="vis2.php">
            <div>
                <h3>Produktion von Wasserkraft, Kernkraft und Windenergie</h3>
                <div class="inner-flex">
                    <div class="inner-item thumb">
<!--                        --><?php //echo file_get_contents('img/res/vis2.svg'); ?>
<!--                        &#9883; &apid;-->
                        &cirscir;
                    </div>
                    <div class="inner-item">
                        Ein Vergleich der Elektrizitätsproduktion des Jahres 2015 von Wind-, Wasser- und Kernkraftwerken.<br>
                        &#10148; zur Visualisierung
                    </div>

                </div>


            </div>
        </a>
    </article>
    <article class="link-item">
        <a href="faq.php">
            <div>
                <h3>FAQ</h3>
                <div class="inner-flex">
                    <div class="inner-item thumb">
                        ?
                    </div>
                    <div class="inner-item">
                        Fragen oder Unklarheiten? Schaue im FAQ vorbei.<br>
                        &#10148; FAQ
                    </div>
                </div>

            </div>
        </a>
    </article>
    <article class="link-item">
        <a href="source.php">
            <div>
                <h3>Datenquellen und Source-Code</h3>
                <div class="inner-flex">
                    <div class="inner-item thumb">
                        <\..
                    </div>
                    <div class="inner-item">
                        Dokumentation zur Datengrundlage und Source-Code.<br>
                        &#10148; zur Dokumentation
                    </div>
                </div>
            </div>
        </a>
    </article>

</div>

<div id="footer">

</div>

</body>
</html>