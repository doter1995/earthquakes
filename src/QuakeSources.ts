import {
  BufferAttribute,
  BufferGeometry,
  Points,
  PointsMaterial,
  TextureLoader
} from "three";
import {get3dPosition} from "./util";

export default class QuakeSources extends Points {
  constructor(latlngs: Array<any>, radius: number = 200) {
    super();
    this.setGeometry(latlngs, radius);
    this.setMaterial();
  }

  setGeometry(latlngs: Array<any>, radius) {
    let positions = [];
    latlngs.forEach(([lat, lng]) => {
      const v3 = get3dPosition(lng, lat, radius + 1);
      positions.push(v3.x, v3.y, v3.z);
    });
    this.geometry = new BufferGeometry();
    this.geometry.addAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
  }

  setMaterial() {
    let texture = new TextureLoader().load("./public/images/circle.png");
    this.material = new PointsMaterial({color: 0xff0000, size: 3, map: texture, transparent: true})
  }
};
