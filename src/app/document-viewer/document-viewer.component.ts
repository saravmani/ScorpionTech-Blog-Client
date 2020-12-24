import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerApiService } from '../services/server-api.service';
import { Feedback } from '../Model/Feedback';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
})
export class DocumentViewerComponent implements OnInit {
  public documentId = '';
  public feedbackText = '';
  public feedback: Feedback = {};
  public documentBaseURL = environment.documentBaseURL;
  constructor(private activatedRoute: ActivatedRoute, private serverApiService: ServerApiService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(a => {
      this.documentId = a.docid;
    });
  }

  public PostFeedback(): void {

    this.serverApiService.PostFeedback(this.feedback).subscribe();


  }

}
