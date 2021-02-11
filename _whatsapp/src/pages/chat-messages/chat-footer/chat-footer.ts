import { Component, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { ChatMessageHttpProvider } from '../../../providers/http/chat-message-http';
import { TextInput, ItemSliding, AlertController, ToastController } from 'ionic-angular';
import Timer from 'easytimer.js/dist/easytimer.min';
import { AudioRecorderProvider } from '../../../providers/audio-recorder/audio-recorder';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';
import { ChatGroup } from '../../../app/model';
import { HttpErrorResponse } from '@angular/common/http';
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
  recording = false;
  subjectReleaseAudioButton = new Subject();
  sending = false;

  @Input() chatGroup: ChatGroup;
  @Output() onTextAreaClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCreateMessageFinished: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('inputTextArea') inputTextArea: TextInput;
  @ViewChild('inputFileImage') InputFileImage: TextInput;
  @ViewChild('itemSliding') itemSliding: ItemSliding;

  constructor(private chatMessageHttp: ChatMessageHttpProvider, 
              private audioRecorder: AudioRecorderProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              public element:ElementRef) {}

  ngOnInit() {
    this.onStopRecord();
  }            
  
  onDrag() {
    if(this.itemSliding.getSlidingPercent() > 0.9) {
      this.itemSliding.close();
      this.clearRecording();
      this.audioRecorder.stopRecord()
      .then(
        blob => {
          console.log('stop recording');
        }, 
        error => {
          console.log(error);
        }
      );
    }
  } 

  onStopRecord() {
    this.subjectReleaseAudioButton
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {    
        if(!this.recording) {
          return;
        }    
        if(this.itemSliding.getSlidingPercent() === 0) {
          this.clearRecording();
          this.audioRecorder.stopRecord()
            .then(
              blob => {
                this.sendMessageAudio(blob);
              }, 
              error => {
                console.log(error);
              }
            );
        }
      });
  }

  clearRecording() {
    this.timer.stop();
    this.text = '';
    this.recording = false;
  }

  holdAudioButton() {
    if(!this.audioRecorder.hasPermission) {
      this.showAlertPermission();
      return;
    }
    this.recording = true;
    this.audioRecorder.startRecord();
    this.timer.start({precision: 'seconds'});
    this.timer.addEventListener('secondsUpdated', (e) => {
      const time = this.getMinutesSeconds();
      this.text = `${time} Gravando...`;
    })
  } 

  showAlertPermission() {
    const alert = this.alertCtrl.create({
      title: 'Aviso',
      message: 'No momento você não tem permissões para gravar áudios. Deseja ativar?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.audioRecorder
              .requestPermission().then((result) => {
                console.log('permissão para gravação', result);
                if(result) {
                  this.audioRecorder.showAlertToCloseApp();
                }
              });
          }
        },
        {
          text: 'Cancelar'
        }
      ]
    });
    alert.present();
  }

  private getMinutesSeconds() {
    return this.timer.getTimeValues().toString().substring(3);
  }

  releaseAudioButton() {
    this.subjectReleaseAudioButton.next();    
  }

  sendMessageText() {
    if (!this.text.trim().length) {
      return;
    }
    this.sendMessage({content: this.text, type: 'text'});
  }

  sendMessageImage(files: FileList) {
    if(!files.length) {
      return;
    }
    if (this.verifyMaxLengthFile(files[0])) {
      const toast = this.toastCtrl.create({
        message: 'O arquivo anexo não pode ser maior que 3MB',
        duration: 4000
      });
      toast.present();
      return;
    }
    this.sendMessage({content: files[0], type: 'image'});
  }

  sendMessageAudio(blob: Blob) {
    this.sendMessage({content: blob, type: 'audio'});
  }

  sendMessage(data: {content, type}) {
    this.sending = true;
    this.chatMessageHttp
      .create(this.chatGroup.id, data)
      .subscribe(
        () => {
          this.sending = false;
          if(data.type === 'text') {
            this.text = '';
          }
          this.onCreateMessageFinished.emit(true);
        }, 
        (responseError: HttpErrorResponse) => {
          this.sending = false;
          let message = '';
          if (responseError.status == 422) {
            message = responseError.error.errors.content[0];
          }
          else {
            message = 'Houve um erro em nosso servidor, tente novamente';
          }
          const toast = this.toastCtrl.create({
            message,
            duration: 4000
          });
          toast.present();
        }
      );
  }

  selectImage(event: Event) {    
    const nativeElement: HTMLElement = this.InputFileImage.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    inputFile.click();
  }

  verifyMaxLengthFile(file: File) {
    const MAX_LENGTH_FILE = 3000000;
    if (file.size > MAX_LENGTH_FILE) {
      return true;
    }
    return false;
  }

  getIconSendMessage() {
    if(this.messageType === 'text') {
      return this.text === '' ? 'mic' : 'send';
    }
    return 'mic';
  }

  textAreaClicked() {
    this.onTextAreaClicked.emit(true);
  }

  onBlurTextArea(event: FocusEvent) {
    console.log(event);
    event.preventDefault();
    return;
  }

  autoSizeTextArea(): void {
		let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
		textArea.style.overflow = 'hidden';
		textArea.style.height 	= 'auto';
		textArea.style.height 	= textArea.scrollHeight + 'px';
		return;
  }

}
