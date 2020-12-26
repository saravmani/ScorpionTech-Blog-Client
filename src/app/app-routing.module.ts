import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ContactComponent } from './contact/contact.component';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';

const routes: Routes = [

  {
    path: 'contact',
    pathMatch: 'full',
    component: ContactComponent
  },
  {
    path: ':docid',
    pathMatch: 'full',
    component: DocumentViewerComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: BlogListComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
