import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

// not needed to add providedIn: root
// need to add to app-module
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // all properties of req are readonly
    const modifiedReq = req.clone({
      withCredentials: true,
    });

    return next.handle(modifiedReq);
    // .pipe(
    //   // returns a type (actions)
    //   filter(val => val.type === HttpEventType.Sent),
    //   tap((val) => {
    //     // 0
    //     if (val.type === HttpEventType.Sent) {
    //       console.log('request was sent to server');
    //     }

    //     // 4
    //     if (val.type === HttpEventType.Response) {
    //       console.table(val);
    //     }
    //   })
    // );
  }
}
