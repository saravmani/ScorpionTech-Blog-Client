import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Feedback } from '../Model/Feedback';
@Injectable({
  providedIn: 'root'
})
export class ServerApiService {
  private serverBaseURL = environment.serviceBaseUrl; // 'http://localhost:60923/api/';

  constructor(private objHttpClient: HttpClient) {

  }

  public GetBlogList(): Observable<any> {
    return this.objHttpClient.get<any>(this.serverBaseURL + 'BloggerClient/BlogList');

  }
  public PostFeedback(feedback: Feedback): Observable<any> {
    return this.objHttpClient.post<any>(this.serverBaseURL + 'BloggerClient/PostFeedback', feedback);

  }



}
