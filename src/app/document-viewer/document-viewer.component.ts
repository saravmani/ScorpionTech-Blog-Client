import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import * as mermaid from 'mermaid';

import { ServerApiService } from '../services/server-api.service';
import { Feedback } from '../Model/Feedback';



// declare var mermaid: any;

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
})
export class DocumentViewerComponent implements OnInit {
  public inProgress = false;
  public Response: any = {};

  public postId = '';
  public feedbackText = '';
  public feedback: Feedback = {};
  public documentBaseURL = environment.documentBaseURL;

  public isLiked = false;
  public isDisLiked = false;
  public isDocLoaded = false;

  // @ViewChild('mermaid') mermass: ElementRef | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private serverApiService: ServerApiService,
    private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {



    this.activatedRoute.params.subscribe(a => {
      this.postId = a.docid;
      this.feedback.postId = a.docid;
      this.serverApiService.GetBologDetailsById(a.docid).subscribe(rslt => {
        this.meta.addTag({ name: 'description', content: rslt.postDescription });
        this.meta.addTag({ name: 'keywords', content: rslt.Tags });
        this.title.setTitle(rslt.postTitle);
      });

    });
  }
  onMarkDownDocLoad(): void {
    this.isDocLoaded = true;

    const config = {

      theme: 'default',
      logLevel: 1,

      startOnLoad: true,
      flowchart: {
        useMaxWidth: false,
        htmlLabels: false,
        curve: 'linear',

      },
      securityLevel: 'loose',
    };

    const mm: any = mermaid;
    mm.initialize(config);
    mm.init();


  }

  public PostFeedback(): void {


    if (this.feedback.feedbackText && this.feedback.feedbackText !== '') {
      this.inProgress = true;
      this.Response.ResponseMessage = 'Posting .. ';
      this.Response.MessageClass = 'text-primary';

      this.serverApiService.PostFeedback(this.feedback).subscribe((a) => {
        this.inProgress = false;
        this.Response.ResponseMessage = 'Feedback Posted Successfully !!';
        this.Response.MessageClass = 'text-success';
      }, (error) => {
        this.inProgress = false;
        this.Response.ResponseMessage = 'Something went wrong. Please mail your feedback to admin@fullstack-lab.co.in';
        this.Response.MessageClass = 'text-danger';
      });
    }
    else {
      this.Response.ResponseMessage = 'Please fill feedback text box then click button Or Mail your feedback to admin@fullstack-lab.co.in';
      this.Response.MessageClass = 'text-danger';
    }
  }

  public likePost(): void {




    if (!this.isLiked) {
      this.isLiked = true;
      this.isDisLiked = false;
      this.serverApiService.PostBlogLiking({
        postId: this.postId,
        LikeCount: 1
      }).subscribe();
    }
  }

  public disLikePost(): void {
    if (!this.isDisLiked) {
      this.isDisLiked = true;
      this.isLiked = false;
      this.serverApiService.PostBlogLiking({
        postId: this.postId,
        DislikeCount: 1
      }).subscribe();
    }
  }

}
