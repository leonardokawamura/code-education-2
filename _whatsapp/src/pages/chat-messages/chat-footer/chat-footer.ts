import { Component, ViewChild } from '@angular/core';
import { ChatMessageHttpProvider } from '../../../providers/http/chat-message-http';
import { TextInput } from 'ionic-angular';
import Timer from 'easytimer.js/dist/easytimer.min';
import { AudioRecorderProvider } from '../../../providers/audio-recorder/audio-recorder';
/**
 * Generated class for the ChatFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-footer',
  templateUrl: 'chat-footer.html'
})
export class ChatFooterComponent {

  text: string = '';
  messageType = 'text';
  timer = new Timer();

  @ViewChild('inputFileImage') InputFileImage: TextInput;

  constructor(private chatMessageHttp: ChatMessageHttpProvider, 
              private audioRecorder: AudioRecorderProvider) {}

  holdAudioButton() {
    this.audioRecorder.startRecorder();
    this.timer.start({precision: 'seconds'});
    this.timer.addEventListener('secondsUpdated', (e) => {
      const time = this.getMinutesSeconds();
      this.text = `${time} Gravando...`;
    })
  } 

  private getMinutesSeconds() {
    return this.timer.getTimeValues().toString().substring(3);
  }

  releaseAudioButton() {
    this.timer.stop();
    this.text = '';
  }

  sendMessageText() {
    this.sendMessage({content: this.text, type: 'text'});
  }

  sendMessageImage(files: FileList) {
    if(!files.length) {
      return;
    }
    this.sendMessage({content: files[0], type: 'image'});
  }

  sendMessage(data: {content, type}) {
    this.chatMessageHttp
      .create(1, data)
      .subscribe(() => {console.log('enviou')});
  }

  selectImage() {
    const nativeElement: HTMLElement = this.InputFileImage.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    inputFile.click();
  }

  getIconSendMessage() {
    if(this.messageType === 'text') {
      return this.text === '' ? 'mic' : 'send';
    }
    return 'mic';
  }

}
