import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/model';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

interface Profile {
  name?: string;
  email?: string;
  password?: string;
  photo?: File | false | null;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileHttpService {

  private beaseUrl = `${environment.api.url}/profile`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  update(data: Profile): Observable<{user: User, token: string}> {
    const formData = this.formDataToSend(data);    
    return this.http
      .post<{user: User, token: string}>(this.beaseUrl, formData)
      .pipe(
        tap(response => {
          this.authService.setToken(response.token);
        })
      )
  }

  private formDataToSend(data): FormData {
    const dataKeys = Object.keys(data);
    this.deletePhotoKey(dataKeys);
    const formData = new FormData();
    for (const key of dataKeys) {
      if(data[key] !== '' && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }
    if(data.photo instanceof File) {
      formData.append('photo', data.photo);
    }
    if(data.photo === null) {
      formData.append('remove_photo', '1');
    }
    formData.append('_method', 'PATCH');
    return formData;
  }

  private deletePhotoKey(array) {
    const index = array.indexOf('photo');
    if(index !== -1) {
      array.splice(index, 1);
    }
  }
  
}
