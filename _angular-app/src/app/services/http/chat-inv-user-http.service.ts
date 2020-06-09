import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { SearchParams, SearchParamsBuilder } from './http-resource';
import { Observable } from 'rxjs';
import { ChatGroup, ChatInvitationUser, ChatInvitationUserStatus, ChatGroupLinkInvitation } from '../../model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatInvUserHttpService {

  private baseAPI = `${environment.api.url}`;
    constructor(private http: HttpClient, private authService: AuthService) { }
    
    list(chatGroupId: number, searchParams: SearchParams): Observable<{data: {group: ChatGroup, invitations: ChatInvitationUser[]}, meta: any}> {
      const sParams = new SearchParamsBuilder(searchParams).makeObject();
      const params = new HttpParams({
        fromObject: (<any>sParams)
      });      
      return this.http.get<{data: {group: ChatGroup, invitations: ChatInvitationUser[]}, meta: any}>(this.getBaseUrl(chatGroupId), {params});
    }

    get(chatGroupId: number, invitationId: number): Observable <ChatInvitationUser> {
      return this.http.get<{data: ChatInvitationUser}>(this.getBaseUrl(chatGroupId, invitationId))
        .pipe(
          map(response => response.data)
        );
    }

    update(chatGroupId: number, invitationId: number, status: ChatInvitationUserStatus): Observable<ChatGroupLinkInvitation> {      
      return this.http.patch<{ data: ChatGroupLinkInvitation}>(this.getBaseUrl(chatGroupId, invitationId), {status})
        .pipe(
          map(response => response.data)
        );
    }

    private getBaseUrl(chatGroupId: number, invitationId: number = null): string {
      let baseUrl = `${this.baseAPI}/chat_groups/${chatGroupId}/invitations`;
      if (invitationId) {
        baseUrl += `/${invitationId}`;
      }
      return baseUrl;
    }
}
