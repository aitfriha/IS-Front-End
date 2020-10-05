import React from 'react';
import PropTypes from 'prop-types';
import '../map/app.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import CountryService from '../../../Services/CountryService';
import CountryConfigService from '../../../Services/CountryConfigService';
import colors from '../../../../config/colors';
const PNF = require('google-libphonenumber').PhoneNumberFormat;

// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

class AmchartMap extends React.Component {
  componentDidMount() {
    const number = phoneUtil.parseAndKeepRawInput('1254','AD');
    console.log(number.getCountryCode());
    this.initChart();
  }

  getCountryInfo = (data) => {
    const { getCountryInfo } = this.props;
    getCountryInfo({ id: data.target.dataItem.dataContext.id, name: data.target.dataItem.dataContext.name });
    console.log(data.target.dataItem.dataContext);
  };

  initChart = () => {
    const { type } = this.props;
    let mapCountries = [];
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;
    console.log(chart.geodata);
    chart.projection = new am4maps.projections.Mercator();
    // chart.panBehavior = "rotateLong";
    // chart.geodataNames = am4geodata_lang_ES;
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = chart.colors.getIndex(0);
    polygonTemplate.tooltipText='{name}';
    polygonTemplate.propertyFields.fill = "fill";
    polygonSeries.exclude = ["AQ"];
    chart.zoomControl = new am4maps.ZoomControl();
    /*
    let labelSeries = chart.series.push(new am4maps.MapImageSeries());
    let labelTemplate = labelSeries.mapImages.template.createChild(am4core.Label);
    labelTemplate.horizontalCenter = 'left';
    labelTemplate.verticalCenter = 'bottom';
    labelTemplate.fontSize = 10;
    labelTemplate.nonScaling = true;
    labelTemplate.interactionsEnabled = false;
    polygonSeries.events.on('inited', function () {
      polygonSeries.mapPolygons.each(function (polygon) {
        let label = labelSeries.mapImages.create();
        label.propertyFields.horizontalCenter = 'middle';
        label.propertyFields.verticalCenter = "center";
        let state = polygon.dataItem.dataContext.name;

        label.latitude = polygon.visualLatitude;
        label.longitude = polygon.visualLongitude;
        label.children.getIndex(0).text = state;
      });
    });
     */
    polygonTemplate.events.on("hit", this.getCountryInfo);
    polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    polygonTemplate.cursorDownStyle =  am4core.MouseCursorStyle.grabbing;
    let hs = polygonTemplate .states.create("hover");
    hs.properties.fill = am4core.color("#FF0000");
    let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.fitExtent = true;
    this.chart = chart;
    if (!type) {
      CountryService.getCountries().then(({ data }) => {
        data.forEach((country, index) => {
          const count = country;
          const countN = {
            name: count.countryName,
            id: count.countryCode,
            fill: colors[index].hexString
          };
          mapCountries.push(countN);
        });
        if (mapCountries.length > 0) {
          polygonSeries.data = mapCountries;
        }
      });
    } else {
      CountryConfigService.getCountryConfig().then(({ data }) => {
        data.forEach((countryConfig, index) => {
          const count = countryConfig;
          const countN = {
            name: count.country.countryName + " : "  + count.leader.name,
            id: count.country.countryCode,
            fill: colors[index].hexString
          };
          mapCountries.push(countN);
        });
        if (mapCountries.length > 0) {
          polygonSeries.data = mapCountries;
        }
      });
    }
  };


  render() {
    return (
      <div id="chartdiv" style={{
        height: '500px',
        width: '100%'
      }} />
    );
  }
}
AmchartMap.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  type: PropTypes.bool.isRequired,
  getCountryInfo: PropTypes.func.isRequired
};
export default AmchartMap;
