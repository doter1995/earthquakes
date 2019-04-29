import {AudioLoader, AudioListener, LoadingManager, Loader, Camera, Audio} from "three";
export default class Resource {
  bgmListener:AudioListener;
  bgmAudio: Audio;
  constructor(camera:Camera){
    this.bgmListener = new AudioListener();
    camera.add( this.bgmListener );
    this.startDownload();
    this.bgmAudio = new Audio(this.bgmListener);
  }
  private startDownload() {
    new AudioLoader().load("./public/mp3/conquestOfParadise.mp3",(audioBuffer)=>{
      this.bgmAudio.setBuffer(audioBuffer);
      this.bgmAudio.setVolume(0.5);
      // this.bgmAudio.play();
    },()=>{},()=>{})
  }
}