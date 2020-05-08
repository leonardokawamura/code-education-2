import { Injectable } from '@angular/core';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';

export interface AudioPlatformConfig {
  basePath: string;
  name: string;
  fullPath: string;
}
/*
  Generated class for the AudioRecorderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AudioRecorderProvider {

  constructor(private media: Media, 
              private file: File,
              private platform: Platform) { }

  startRecorder() {
    const platform = this.platform.is('android') ? 'android' : 'ios';
    const audioPlatformConfig = this.getAudioPlatformConfig(platform);
    console.log(audioPlatformConfig);
  }

  private getAudioPlatformConfig(platform: 'android' | 'ios'): AudioPlatformConfig {
    const android: AudioPlatformConfig = {
      basePath: this.file.externalDataDirectory,
      name: 'recording.aac',
      get fullPath() {
        return `${this.basePath}${this.name}`
      }
    }
    const ios: AudioPlatformConfig = {
      basePath: this.file.externalDataDirectory,
      name: 'recording.wav',
      get fullPath() {
        return `${this.basePath}${this.name}`
      }
    }
    return platform == 'android' ? android : ios;
  }

}
