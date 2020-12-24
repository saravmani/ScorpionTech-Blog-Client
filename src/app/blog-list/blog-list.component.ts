import { Component, OnInit } from '@angular/core';
import { BlogList } from '../Model/BlogList';
import { ServerApiService } from '../services/server-api.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent implements OnInit {

  public blogList: BlogList;
  constructor(private objServerApiService: ServerApiService) {
    this.blogList = { };

  }

  ngOnInit(): void {
    this.objServerApiService.GetBlogList().subscribe(a => {
      this.blogList = a;
    });
  }

}
