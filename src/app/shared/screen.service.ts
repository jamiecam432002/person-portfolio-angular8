import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  screenSizeObservable: Observable<any>;
  screenSizeIsSmall: boolean;

  constructor(private breakpointObserver: BreakpointObserver) { 
    this.screenSizeObservable = Observable.create(observer => {
      return this.breakpointObserver.isMatched('(max-width: 1068px)');
    })
    this.screenSizeObservable.subscribe(val => 
      {
        
        //this.screenSizeIsSmall = val;
        console.log(val);
      });
  }

  
}
