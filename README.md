# Energieproduktion der Schweiz
Open Data Visualisation von Wasser-, Wind- und Kernkraftstatistiken.

## Datenschema
Aufbereiteter Datensatz ist unter /data/data.json zu finden.

```
{
    "cantons": [
        {
            "name": Zürich,
            "abbr": ZH,
            "hydropowerplants": [
                {
                    "id": "10650",
                    "name": "Rheinau",
                    "type": "Wasserkraftwerk",
                    "production": 241.7,
                    "coordinate": [687400, 277120]
                }, ...
            "nuclearpowerplants": [...],
            "windenergyplants": [...],
            "hydropowerproduction": 634.98,
            "nuclearenergyproduction": 0,
            "windenergyproduction": 0.054,
            "highestprodfacility": {...}
        }, ...
    "globalhydropowerproduction": 33651.08,
    "globalnuclearenergyprodution": 22155.8,
    "globalwindenergyproduction": 109.713,
    "valuedomain": [0.002, 8598.52],
    "globalHPFacilityHydro": {
        "id": "504950",
        "name": "Bieudron",
        "type": "Wasserkraftwerk",
        "production": 1780,
        "coordinate": [585550, 114630]
    },
    "globalHPFacilityNuclear": {...},
    "globalHPFacilityWind": {...},
    "annualenergyproduction": 66000,
    "asat": 2015
}
```
