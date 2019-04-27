import {
  Geometry,
  Group,
  LineBasicMaterial,
  LineSegments, Mesh,
  MeshBasicMaterial,
  SphereGeometry
} from 'three';
import {range, pairs} from "d3-array";
import {FileLoader} from "three"
import {get3dPosition} from './util';
import * as topoJson from "topojson";

export default class WordSegment extends Group {
  radius: number = 200;
  isLoad: boolean = false;

  constructor(radius: number) {
    super();
    this.radius = radius
  }

  init() {
    this.addSphere();
    new FileLoader().load('./public/data/world.json', (data: string) => {
      let dataSet = JSON.parse(data);
      this.add(wireframe(graticule10(), 200, new LineBasicMaterial({color: 0x444444})));
      this.add(wireframe(topoJson.mesh(dataSet), 200.5, new LineBasicMaterial({color: 0x34ace0})));
      this.isLoad = true;
    }, (progressInfo) => {
      console.log("下载world.json", progressInfo.loaded / progressInfo.total)
    }, (errorInfo) => {
      console.error("下载world.json失败")
    });
  }
  addSphere(){
   this.add(new Mesh(new SphereGeometry(this.radius,100,100),new MeshBasicMaterial({color:0x555555})));
  }
}

function wireframe(multilinestring, radius, material) {
  let geometry = new Geometry;
  multilinestring.coordinates.forEach(function (line) {
    pairs(
        line.map((d) => get3dPosition(d[0], d[1], radius)),
        (a, b)=>{geometry.vertices.push(a, b);}
        );
  });
  return new LineSegments(geometry, material);
}

function graticule10() {
  let epsilon = 1e-6,
      x1 = 180, x0 = -x1, y1 = 80, y0 = -y1, dx = 10, dy = 10,
      X1 = 180, X0 = -X1, Y1 = 90, Y0 = -Y1, DX = 90, DY = 360,
      x = graticuleX(y0, y1, 2.5), y = graticuleY(x0, x1, 2.5),
      X = graticuleX(Y0, Y1, 2.5), Y = graticuleY(X0, X1, 2.5);

  function graticuleX(y0, y1, dy) {
    let y = range(y0, y1 - epsilon, dy).concat(y1);
    return function (x) {
      return y.map(function (y) {
        return [x, y];
      });
    };
  }

  function graticuleY(x0, x1, dx) {
    let x = range(x0, x1 - epsilon, dx).concat(x1);
    return function (y) {
      return x.map(function (x) {
        return [x, y];
      });
    };
  }

  return {
    type: "MultiLineString",
    coordinates: range(Math.ceil(X0 / DX) * DX, X1, DX).map(X)
    .concat(range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y))
    .concat(range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function (x) {
      return Math.abs(x % DX) > epsilon;
    }).map(x))
    .concat(range(Math.ceil(y0 / dy) * dy, y1 + epsilon, dy).filter(function (y) {
      return Math.abs(y % DY) > epsilon;
    }).map(y))
  };
}