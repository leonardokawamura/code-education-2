import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchParams, SearchParamsBuilder } from './http-resource';
import { Observable } from 'rxjs';
import { ChatGroup, ChatGroupLinkInvitation } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupLinkInvHttpService {

  private baseApi = environment.api.url;

  constructor(private http: HttpClient) { }

  list(chatGroupId: number, searchParams: SearchParams): Observable<{data: {group: ChatGroup, link_invitations: Array<ChatGroupLinkInvitation>}, meta: any}> {    
    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams)
    })
    return this.http
      .get<{data: {group: ChatGroup, link_invitations: Array<ChatGroupLinkInvitation>}, meta: any}>(this.getBaseUrl(chatGroupId), {params});
  }

  get(chatGroupId: number, invitationId: number): Observable<ChatGroupLinkInvitation> {
    return this.http
      .get<{data: ChatGroupLinkInvitation}>(this.getBaseUrl(chatGroupId, invitationId))
        .pipe(
          map(response => response.data)
        );
  }

  create(chatGroupId: number, data: ChatGroupLinkInvitation): Observable<ChatGroupLinkInvitation> {    
    return this.http
      .post<{data: ChatGroupLinkInvitation}>(this.getBaseUrl(chatGroupId), data)
        .pipe(
          map(response => response.data)
        );

  }

  update(chatGroupId: number, invitationId: number, data: ChatGroupLinkInvitation): Observable<ChatGroupLinkInvitation> {
    return this.http
      .put<{data: ChatGroupLinkInvitation}>(this.getBaseUrl(chatGroupId, invitationId), data)
        .pipe(
          map(response => response.data)
        );
  }

  destroy(chatGroupId: number, invitationId: number): Observable<any> {
    return this.http.delete(this.getBaseUrl(chatGroupId, invitationId));
  }

  private getBaseUrl(chatGroupId: number, invitationId: number = null): string {
    let baseUrl = `${this.baseApi}/chat_groups/${chatGroupId}/link_invitations`;
    if (invitationId) {
      baseUrl += `/${invitationId}`;
    }
    return baseUrl;
  }
  
}
