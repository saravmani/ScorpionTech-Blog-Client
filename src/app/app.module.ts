import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule, MarkedOptions, MarkedRenderer, MarkdownService } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DocumentViewerComponent } from './document-viewer/document-viewer.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentViewerComponent,
    BlogListComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
        // useValue: {
        //   gfm: true,
        //   breaks: false,
        //   pedantic: false,
        //   smartLists: true,
        //   smartypants: false,
        // },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  renderer.image = (href: string | null, title: string | null, text: string | null): string => {
    if (href) {
      const mdTxtIndex = href.indexOf('/RefImages/');
      if (mdTxtIndex >= 0) {
        const newImgUrl = href.substr(mdTxtIndex, href.length - mdTxtIndex);
        return '<img src="https://raw.githubusercontent.com/saravmani/mycloud/master/Rem/Self' + newImgUrl + '"></img>';
      }
    }
    return '';
  };


  // To change Document link to environment specific
  // in Prod instead of ../../docname.md to docname.md
  renderer.link = (href: string | null, title: string | null, text: string | null): string => {
    if (href) {
      const mdTxtIndex = href.indexOf('.md');
      const lastIndexOfSplitter = href.lastIndexOf('/ ');
      const alteredURL = href.substr((lastIndexOfSplitter + 1), ((mdTxtIndex - 1) - lastIndexOfSplitter));
      return '<a href="' + alteredURL + '">' + text + '</a>';
    }
    return '';
  };
  renderer.code = (code: string, language: any, isEscaped: any) => {
    if (language.match(/^mermaid/)) {
      return '<div class="mermaid">' + code + '</div>';
    } else {
      return '<pre class="line-highlight language-' + language + '"><code class=" language-' + language + '">' + escapeHtml(code) + '</code></pre>';
    }
  };
  renderer.codespan = (quote: string): string => {
    return quote;
  };

  return {
    // tslint:disable-next-line:object-literal-shorthand
    renderer: renderer,
    gfm: true,
    // tables: true,
    breaks: false,
    pedantic: false,
    // sanitize: false,
    smartLists: true,
    smartypants: false
  };
}

export function escapeHtml(txt: any): any {
  return txt
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
