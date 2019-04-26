import {
  BufferAttribute,
  BufferGeometry,
  Points,
  PointsMaterial,
  TextureLoader
} from "three";
import {get3dPosition} from "./util";

export default class QuakeSource extends Points {
  constructor(lat: number, lng: number, radius: number = 200) {
    super();
    this.setGeometry(lat, lng, radius);
    this.setMaterial();
  }

  setGeometry(lng, lat, radius) {
    const v3 = get3dPosition(lng, lat, radius+1);
    this.geometry = new BufferGeometry();
    this.geometry.addAttribute("position", new BufferAttribute(new Float32Array([v3.x, v3.y, v3.z]), 3));
  }

  setMaterial() {
    let texture = new TextureLoader().load("./public/images/circle.png");
    this.material = new PointsMaterial({color: 0xff0000,size:3,map:texture,transparent: true})
  }
};
