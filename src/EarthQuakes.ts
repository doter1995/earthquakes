import {Group} from "three";
import {csvParse} from "d3-dsv";
import QuakeSource from './QuakeSource';

export default class EarthQuakes extends Group {
  dataSet = [];
  current: number = 0;
  playState = "ready";
  interval;
  constructor() {
    super()
    this.getData();
  }

  getData() {
    fetch("./public/data/Earthquakes-database.csv").then(data => data.text()).then(data => {
      this.dataSet = csvParse(data);
      const date = Date.now();
      this.play();
    })
  }

  updatePoints() {
    if(this.current==this.dataSet.length){
      clearInterval(this.interval);
    }
    let currentDate = this.dataSet[this.current].Date.replace(/(\/[0-9]+\/)/,"");
    while (this.dataSet[this.current].Date.replace(/(\/[0-9]+\/)/,"") === currentDate) {
      let rowData = this.dataSet[this.current];
      this.add(new QuakeSource(rowData.Longitude, rowData.Latitude));
      this.current++;
    }
  }

  play() {
    this.interval = setInterval(() => {
      this.updatePoints();
    }, 3);
  }
}
//rowData = {
// Azimuthal Gap: ""
// Date: "01/02/1965"
// Depth: "131.6"
// Depth Error: ""
// Depth Seismic Stations: ""
// Horizontal Distance: ""
// Horizontal Error: ""
// ID: "ISCGEM860706"
// Latitude: "19.246"
// Location Source: "ISCGEM"
// Longitude: "145.616"
// Magnitude: "6"
// Magnitude Error: ""
// Magnitude Seismic Stations: ""
// Magnitude Source: "ISCGEM"
// Magnitude Type: "MW"
// Root Mean Square: ""
// Source: "ISCGEM"
// Status: "Automatic"
// Time: "13:44:18"
// Type: "Earthquake"
// }