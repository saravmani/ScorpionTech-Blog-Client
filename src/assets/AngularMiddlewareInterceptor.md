### Angular HttpInterceptor to Handle HTTP Error

*I call Interceptors as clientside middleware*

- HttpInterceptor will intercepts all the http requests which are made from angular application.
  We can able to perform any action before http request made to server
  - *Ex: We can Pass authenticaiton token (bearerToken) on each http request*
- Also we can anble to handle the response and perform the actions
  - *Ex: Handle Errors*


###### Sample HttpInterceptor
This code performs two actions
1. Intercept HttpRequest and add the Authorization token to the header
2. Handles the response fromt he server and if it finds UnAuthorised error then
    navigates the application to authenticaiton page

```javascript
import { Injectable } from '@angular/core';
import {
    HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';

@Injectable()
export class MyAppHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(objRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        objRequest = objRequest.clone({
            setHeaders: {// Adding auth token
                Authorization: `Bearer ${sessionStorage.getItem('bearerToken')}`
            }
        });
        return next.handle(objRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    // Handle Client Side Error
                    // Example If Network error we can do retry
                }
                else {
                    // Handle Server Side Error
                }
                console.log(error);
                if (error.status === 401) // Handle un UnAuthorised error
                    this.router.navigate(['authenticaiton-page']);
                return throwError(error);
            }
            ));

    }
}
```

### Ionic with Angular - Page Lifecycle

Ionic by default caches the pages. Becuase of caching mechanism we are having
some new lifecycle hooks along with Angular lifecycle hooks.

```
Note: Ionic will not destroy the pages (will not call ngOnDestroy).
      It will cache the pages and store it in stack.
      when user navigates, the previous page will move back to stack
      and next page will get visible
```

Between ngOnInit and ngOnDestroy we are having multiple Ionic view events

+ ngOnInit (angular event)
  + ionViewWillEnter  -- called when page start get visible (i.e begins transition)
  + ionViewDidEnter   -- called when page visible completed
  + ionViewWillLeave  -- called when page start leaving (i.e begins transition)
  + ionViewDidLeave   -- called when page completely invisible and other page came to visibe
+ ngOnDestroy (angular event)


---

###### Sample Code

```javascript
ionViewWillEnter() {
   this.apiService.FetchData().subscribe(a => {
     this.listOfItems = a;
   },error=>{
     console.log(error);
   });
 }
```


[//]: # (Tags- Ionic , Angular, Page Life Cycle, Page Caching, ionViewWillEnter, ionViewDidEnter, ionViewWillLeave, ionViewDidLeave)
[//]: # (ReadyState:Publish)




[//]: # (Tags- Angular, Interceptor, bearerToken, HttpInterceptor, Middleware, Handle Http Error, Handle UnAuthorised error)
[//]: # (ReadyState:Publish)
