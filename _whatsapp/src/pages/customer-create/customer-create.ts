import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomerHttpProvider } from '../../providers/http/customer-http';
import { MainPage } from '../main/main';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the CustomerCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-create',
  templateUrl: 'customer-create.html',
})
export class CustomerCreatePage {

  form: FormGroup;
  photoPreview;
  errors = <any>{};

  @ViewChild('inputFilePhoto') inputFilePhoto: TextInput;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private customerHttp: CustomerHttpProvider,
              private authService: AuthProvider,
              private loadingCtrl: LoadingController) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      photo: null
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerCreatePage');
  }

  submit() {
    const loader = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loader.present();
    this.customerHttp
      .create(this.form.value)
      .subscribe(
        response => {
          console.log('cliente foi criado');
          loader.dismiss();
          this.authService.setToken(response.token);
          this.navCtrl.setRoot(MainPage);
        },
        responseError => {
          loader.dismiss();
          if (responseError.status == 422) {
            this.errors = responseError.error.errors
            console.log(this.errors);
          }          
        }
      );
  }

  selectPhoto() {
    const nativeElement = this.inputFilePhoto.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    inputFile.click();
  }

  onChoosePhoto(files: FileList) {
    if(!files.length) {
      return;
    }
    if (this.verifyMaxLengthFile(files[0])) {
      this.errors.photo = ['O tamanho máximo do arquivo da foto é 3MB'];
      this.form.get('photo').setErrors({'incorrect': true});
      return;
    }
    this.makePhotoPreview(files[0]);
    this.form.get('photo').setValue(files[0]);
    console.log(this.errors);
  }

  verifyMaxLengthFile(file: File) {
    const MAX_LENGTH_FILE = 3000000;
    if (file.size > MAX_LENGTH_FILE) {
      return true;
    }
    return false;
  }

  makePhotoPreview(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (event: ProgressEvent) => {
      const target = event.target;
      this.photoPreview = (<any>target).result;
    }
    this.form.get('photo').setErrors({'incorrect': false});
    delete this.errors.photo;
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }

  get errorsKeys() {
    return Object.keys(this.errors);
  }

}
