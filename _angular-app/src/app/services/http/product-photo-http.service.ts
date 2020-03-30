import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product, ProductPhoto } from 'src/app/model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductPhotoHttpService {

  private beaseApi = environment.api.url;

  constructor(private http: HttpClient) { }

  list(productId: number): Observable<{product: Product, photos: ProductPhoto[]}> {
    return this.http
      .get<{data: any}>(this.getBaseUrl(productId))
      .pipe(
        map(response => response.data)
      )
  }

  create(productId: number, files: FileList): Observable<{product: Product, photos: ProductPhoto[]}> {
    const formData = new FormData();
    const filesArray = Array.from(files);
    filesArray.forEach(file => {
      formData.append('photos[]', file);
    });
    return this.http.post<any>(this.getBaseUrl(productId), formData);
  }

  private getBaseUrl(productId: number, photoId: number = null): string {
    let baseUrl = `${this.beaseApi}/products/${productId}/photos`;
    if(photoId) {
      baseUrl += `${photoId}`;
    }
    return baseUrl;
  }
}
