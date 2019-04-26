import {Vector3} from "three"

export function get3dPosition(lng: number, lat: number, radius: number): Vector3 {
  const Lat = lat * Math.PI / 180;
  const Lon = lng * Math.PI / 180;
  return new Vector3(
      Math.sin(Lon) * Math.cos(Lat) * radius,
      Math.sin(Lat) * radius,
      Math.cos(Lon) * Math.cos(Lat) * radius
  )
}