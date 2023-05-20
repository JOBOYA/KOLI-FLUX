import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

// Themes begin
am4core.useTheme(am4themes_animated);


export default class Map extends React.Component {
    chart: any;
    componentDidMount() {
        let chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
        let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

        chart.data = [{
            "name": "Nos Clients",

            "children": [
                {
                    "name": "Toute la France",
                    "value": 90000
                },

            ]
        },
        {

            "name": "Satisfaction",
            "children": [
                {
                    "name": "très satisfait",
                    "value": 4503
                },
                {
                    "name": "satisfait",
                    "value": 45
                },
                {
                    "name": "moyen",
                    "value": 5
                }
            ]
        },
        {
            "name": "Transaction KOLICOIN",
            "children": [
                {
                    "name": "KOLICOIN effectuées",
                    "value": 1500
                },
                {
                    "name": "ITALIE",
                    "value": 2300
                },
                {
                    "name": "ESPAGNE ",
                    "value": 800
                },
                {
                    "name": "PORTUGAL",
                    "value": 4000
                },
                {
                    "name": "BELGIQUE",
                    "value": 6000
                },
                {
                    "name": "CROATIE",
                    "value": 26
                }

            ]
        },
        {
            // Logic financial fast  and easy  and secure 
            "name": "Nos Services",
            "children": [
                {
                    "name": "KOLICOIN",
                    "value": 40000
                },
                {
                    "name": "KOLIEXCHANGE",
                    "value": 100000
                },
                {
                    "name": "KOLILOAN",
                    "value": 10000
                },
                {
                    "name": "KOLIINSURANCE",
                    "value": 5000
                },
                {
                    "name": "KOLIINVEST",
                    "value": 6000
                },
            ]
        }
        ];



        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.children = "children";
        networkSeries.nodes.template.tooltipText = "{name}:{value}";
        networkSeries.nodes.template.fillOpacity = 1;

        networkSeries.nodes.template.label.text = "{name}"
        networkSeries.fontSize = 10;
        networkSeries.maxLevels = 2;
        networkSeries.maxRadius = am4core.percent(4);
        networkSeries.manyBodyStrength = -16;
        networkSeries.nodes.template.label.hideOversized = true;
        networkSeries.nodes.template.label.truncate = true;
    }

    componentWillUnmount(): void {
        if (this.chart) {
            this.chart.dispose();
        }
    }


    // Render chart
    render() {
        return (

            <div className="particle" id="chartdiv" style={{ width: "100%", height: "500px" }}></div>

        );
    }

}
